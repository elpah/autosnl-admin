import admin from "./firebase.js";

async function setAdmin() {
  const uid = "kfhHBGf9g4bhg5Gj1giZRPu1q232";
  await admin.auth().setCustomUserClaims(uid, { admin: true });
  console.log("Admin rights granted!");
}

setAdmin();
