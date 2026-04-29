import React from "react";

import { db } from "./admin/AdminPanel";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function MigrateInvestors() {
  const handleMigrate = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "investors"));

      querySnapshot.forEach(async (docSnap) => {
        const investorRef = doc(db, "investors", docSnap.id);
        const data = docSnap.data();

        // Default fields if missing
        const updatedFields = {};
        if (!data.plan) updatedFields.plan = "N/A";
        if (!data.status) updatedFields.status = "Active";
        if (!data.amount) updatedFields.amount = 0;

        if (Object.keys(updatedFields).length > 0) {
          await updateDoc(investorRef, updatedFields);
          console.log(`✅ Updated ${docSnap.id} with`, updatedFields);
        }
      });

      alert("Migration complete! 🎉 Check your database.");
    } catch (error) {
      console.error("❌ Migration failed:", error);
      alert("Migration failed. Check console for details.");
    }
  };

  return (
    <div className="p-6 text-center">
      <button
        onClick={handleMigrate}
        className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-700"
      >
        Run Migration
      </button>
    </div>
  );
}

export default MigrateInvestors;
