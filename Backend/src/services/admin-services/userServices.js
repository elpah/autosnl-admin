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

export { getUser };
