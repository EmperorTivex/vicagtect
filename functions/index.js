const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

/**
 * Automatically delete a user's Firebase Auth account when their 
 * investor document is deleted from Firestore.
 */
exports.cleanupAuthOnInvestorDelete = functions.firestore
  .document("investors/{investorId}")
  .onDelete(async (snap, context) => {
    const data = snap.data();
    const uid = data.uid;

    if (!uid) {
      console.log("No UID found for deleted investor, skipping Auth cleanup.");
      return null;
    }

    try {
      await admin.auth().deleteUser(uid);
      console.log(`Successfully deleted Auth user ${uid}`);
      
      // Also cleanup any remaining transactions just in case the client-side batch failed
      const transactionsSnapshot = await admin.firestore()
        .collection("transactions")
        .where("investorId", "==", context.params.investorId)
        .get();
        
      const batch = admin.firestore().batch();
      transactionsSnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      console.log(`Cleaned up transactions for investor ${context.params.investorId}`);
      
      return null;
    } catch (error) {
      console.error(`Error deleting Auth user ${uid}:`, error);
      throw new functions.https.HttpsError("internal", "Failed to delete user account");
    }
  });

/**
 * Manual cleanup function for orphaned transactions
 */
exports.cleanupOrphanedTransactions = functions.https.onCall(async (data, context) => {
  // Ensure the caller is an admin
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError("unauthenticated", "Only admins can run cleanup.");
  }

  const transactionsSnapshot = await admin.firestore().collection("transactions").get();
  const investorsSnapshot = await admin.firestore().collection("investors").get();
  
  const investorIds = new Set(investorsSnapshot.docs.map(doc => doc.id));
  const batch = admin.firestore().batch();
  let count = 0;

  transactionsSnapshot.forEach(doc => {
    if (!investorIds.has(doc.data().investorId)) {
      batch.delete(doc.ref);
      count++;
    }
  });

  if (count > 0) {
    await batch.commit();
  }

  return { deletedCount: count };
});
