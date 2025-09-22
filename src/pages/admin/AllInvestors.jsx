import React from "react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function AllInvestors() {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "investors"));
        const investorList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInvestors(investorList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching investors:", err);
        setLoading(false);
      }
    };
    fetchInvestors();
  }, []);
  if (loading) {
    return <p className="text-center mt-10"> Loading investors....</p>;
  }
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">
          All Investors
        </h2>
        {investors.length === 0 ? (
          <p className="text-center text-gray-600">No investors found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Username</th>
                  <th className="p-3 border">Amount Invested</th>
                  <th className="p-3 border">Plan</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Date Added</th>
                </tr>
              </thead>
              <tbody>
                {investors.map((investor) => (
                  <tr
                    key={investor.id}
                    className="hover:bg-gray-100 text-center"
                  >
                    <td className="p-3 border">{investor.name}</td>
                    <td className="p-3 border">{investor.username}</td>
                    <td className="p-3 border">
                      ₦{Number(investor.amount).toLocaleString()}
                    </td>
                    <td className="p-3 border">{investor.plan || "N/A"}</td>

                    <td
                      className={`p-3 border font-semibold ${
                        investor.status === "Active"
                          ? "text-green-600"
                          : investor.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {investor.status}
                    </td>
                    <td className="p-3 border">
                      {investor.date?.toDate
                        ? investor.date.toDate().toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllInvestors;
