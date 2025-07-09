import { connectToDatabase } from "../config/db.js";

const getDealers = async () => {
  try {
    const db = await connectToDatabase();
    const col = db.collection("dealers");

    const dealers = await col
      .find(
        {},
        {
          projection: {
            dealerId: 1,
            dealerName: 1,
            dealerEmail: 1,
            dealerPhone: 1,
            dealerAddress: 1,
            _id: 0,
          },
        }
      )
      .toArray();

    return dealers;
  } catch (error) {
    return {};
  }
};
export { getDealers };
