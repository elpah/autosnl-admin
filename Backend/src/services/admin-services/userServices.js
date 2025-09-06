import { connectToDatabase } from "../../config/db.js";
import { randomUUID } from "crypto";

const getUser = async (firebaseUid, email) => {
  try {
    const db = await connectToDatabase();
    const userCol = db.collection("users");
    let user = await userCol.findOne(
      { firebaseUid: firebaseUid, email: email },
      { projection: { _id: 0 } }
    );

    if (user) {
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


const editUser = async (
  firebaseUid,
  email,
  firstname,
  lastname,
  profileImage
) => {
  try {
    const db = await connectToDatabase();
    const userCol = db.collection("users");

    // ✅ Find the existing user
    const existingUser = await userCol.findOne({ firebaseUid, email });

    if (!existingUser) {
      throw new Error("User not found");
    }

    // ✅ Prepare update data
    const updatedData = {
      firstname,
      lastname,
      profileImage,
      email,
      updatedAt: new Date(),
    };

    // ✅ Update the user document
    const result = await userCol.updateOne(
      { firebaseUid, email },
      { $set: updatedData }
    );

    if (result.modifiedCount > 0) {
      // ✅ Return updated user
      return {
        ...existingUser,
        ...updatedData,
      };
    }

    return existingUser; // If nothing changed, return the old one
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in editUser:", err.message);
    }
    return null;
  }
};
export { getUser, editUser };
