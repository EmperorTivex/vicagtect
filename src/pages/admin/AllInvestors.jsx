import React from "react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function AllInvestors() {
  const [investors, setInvestors] = useState([]);
  const [filteredInvestors, setFilteredInvestors] = useState([]);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchInvestors = async () => {
    const querySnapshot = await getDocs(collection(db, "investors"));
    const investorList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setInvestors(investorList);
    setFilteredInvestors(investorList);
  };
  useEffect(() => {
    fetchInvestors();
  }, []);

  useEffect(() => {
    let results = investors;
    if (search) {
      results = results.filter(
        (inv) =>
          inv.name?.toLowerCase().includes(search.toLowerCase()) ||
          inv.username?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterPlan !== "All") {
      results = results.filter((inv) => inv.plan === filterPlan);
    }

    if (filterStatus !== "All") {
      results = results.filter((inv) => inv.status === filterStatus);
    }

    setFilteredInvestors(results);
  }, [search, filterPlan, filterStatus, investors]);

  const handleSave = async () => {
    try {
      const investorRef = doc(db, "investors", selectedInvestor.id);
      await updateDoc(investorRef, {
        amount: Number(selectedInvestor.amount),
        plan: selectedInvestor.plan,
        status: selectedInvestor.status,
      });
      setModalOpen(false);
      setSelectedInvestor(null);
      fetchInvestors();
    } catch (err) {
      console.error("Error updating investor:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this investor?")) {
      try {
        await deleteDoc(doc(db, "investors", id));
        fetchInvestors();
      } catch (err) {
        console.error("Error deleting investor:", err);
      }
    }
  };
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
        All Investors
      </h2>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or username"
          className="w-full md:w-1/3 px-4 py-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-3">
          <select
            classNamename="px-4 py-2 border rounded"
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
          >
            <option value="All"> All Plans</option>
            <option value="18 Months"> 18 Months</option>
            <option value="36 Months"> 36 Months</option>
            <option value="60 Months">60 Months</option>
          </select>
          <select
            className="px-4 py-2 border rounded"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All" All Status></option>
            <option value="Active"> Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive"> Inactive</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-center">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Username</th>
              <th className="p-3">Amount Invested</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Status</th>
              <th className="p-3"> Date Added</th>
              <th className="p-3"> Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvestors.map((inv) => (
              <tr key={inv.id} className="border-t">
                <td className="p-3">{inv.name}</td>
                <td className="p-3">{inv.username}</td>
                <td className="p-3">₦{inv.amount?.toLocaleString()}</td>
                <td className="p-3">{inv.plan || "N/A"}</td>
                <td className="p-3 text-green-600">{inv.status}</td>
                <td className="p-3">
                  {inv.date?.toDate
                    ? inv.date.toDate().toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="p-3 space-x-2">
                  {" "}
                  <button
                    onClick={() => {
                      setSelectedInvestor(inv);
                      setModalOpen(true);
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    {" "}
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(inv.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && selectedInvestor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Edit Investor</h3>
            <input
              type="number"
              placeholder="Amount Invested"
              className="w-full mb-3 px-4 py-2 border-rounded"
              value={selectedInvestor.amount}
              onChange={(e) => {
                setSelectedInvestor({
                  ...selectedInvestor,
                  amount: e.target.value,
                });
              }}
            />
            <select
              className="w-full mb-3 px-4 py-2 borer rounded"
              value={selectedInvestor.plan}
              onChange={(e) =>
                setSelectedInvestor({
                  ...selectedInvestor,
                  plan: e.target.value,
                })
              }
            >
              <option value="18 Months"> 18 Months</option>
              <option value="36 Months"> 36 Months</option>
              <option value="60 Months"> 60 Months</option>
            </select>
            <select
              className="w-full mb-4 px-4 py-2 border rounded"
              value={selectedInvestor.status}
              onChange={(e) =>
                setSelectedInvestor({
                  ...selectedInvestor,
                  status: e.target.value,
                })
              }
            >
              <option value="Active"> Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setModalOpen(false)}
                className=" px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllInvestors;
