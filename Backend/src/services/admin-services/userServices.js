import { connectToDatabase } from "../../config/db.js";
import { randomUUID } from "crypto";
import { deleteCloudinaryImage } from "./cloudinary.js";

const getUser = async (firebaseUid, email) => {
  try {
    const db = await connectToDatabase();
    const userCol = db.collection("users");
    let user = await userCol.findOne(
      { firebaseUid: firebaseUid, email: email },
      { projection: { _id: 0 } }
    );

    if (user) {
      if (user.profileImage && user.profileImage.url) {
        user.profileImage = user.profileImage.url;
      }
      return user;
    }

    const newUser = {
      email: email,
      userId: randomUUID(),
      firebaseUid: firebaseUid,
      createdAt: new Date(),
      profileImage: "",
      firstname: "",
      lastname: "",
    };
    const result = await userCol.insertOne(newUser);
    if (result.acknowledged) {
      return newUser;
    }

    return null;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in getUserFunction:", err.message);
    }
    return null;
  }
};

const editUser = async ({
  firebaseUid,
  email,
  firstname,
  lastname,
  profileImage, // Expecting { public_id, url }
}) => {
  try {
    const db = await connectToDatabase();
    const userCol = db.collection("users");

    const existingUser = await userCol.findOne({ firebaseUid, email });
    if (!existingUser)
      return { success: false, message: "Failed to update: user not found" };

    const updatedData = {};
    if (firstname) updatedData.firstname = firstname;
    if (lastname) updatedData.lastname = lastname;

    if (profileImage && profileImage.public_id && profileImage.url) {
      if (existingUser.profileImage && existingUser.profileImage.public_id) {
        try {
          await deleteCloudinaryImage(existingUser.profileImage.public_id);
        } catch (err) {
          console.error("⚠️ Failed to delete old image:", err.message);
        }
      }

      updatedData.profileImage = profileImage;
    }

    if (Object.keys(updatedData).length === 0)
      return { success: true, user: existingUser };

    updatedData.updatedAt = new Date();
    const result = await userCol.updateOne(
      { firebaseUid, email },
      { $set: updatedData }
    );

    if (result.modifiedCount > 0) {
      const updatedUser = { ...existingUser, ...updatedData };
      if (updatedUser.profileImage && updatedUser.profileImage.url) {
        updatedUser.profileImage = updatedUser.profileImage.url;
      }

      return { success: true, user: updatedUser };
    } else {
      return {
        success: false,
        message: "Failed to update: no changes applied",
      };
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in editUser:", err.message);
    }
    return { success: false, message: "Failed to update" };
  }
};

export { getUser, editUser };
