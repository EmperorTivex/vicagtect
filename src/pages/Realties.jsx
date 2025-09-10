import React from "react";

function Realties() {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen text-gray-800 ">
      <section className="bg-orange-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Turn Your Savings Into Real Estate Wealth
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 font-medium">
          With Vicagtect Realties, your daily or monthly contributions grow with
          up to 30% ROI while being invested in real estate projects you can see
          and trust.
        </p>
        <button className="bg-white text-orange-600 px-6 py-3 font-bold rounded-full shadow-lg hover:bg-orange-100 hover:scale-105 transition text-lg animate-bounce">
          🤏Start Your Contribution Today
        </button>
      </section>
      <section className="py-16 max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">The Problem</h2>
          <ul className="space-y-4 text-lg">
            <li>💸Saving in banks = fees + inflation ➡️ your money shrinks.</li>
            <li>🏠Real estate = wealth, but entry point is too high.</li>
            <li>😔 Fake "investment opportunities" ruin families.</li>
          </ul>
        </div>
      </section>
      <section className="py-16  max-w-5xl mx-auto px-6">
        <div className="bg-orange-100 rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-orange-600text-center mb-8">
            {" "}
            Our Solutions
          </h2>
          <ul className="grid md:grid-cols-2 gap-6 text-lg md:text-xl">
            <li>
              ✅<span className="font-semibold"> ROI up to 30%</span>
            </li>
            <li>✅ Flexible daily/monthly contributions</li>
            <li>✅ Legal contracts before you start</li>
            <li>✅ Backed by Vicagtect Nigeria Ltd (real projects)</li>
            <li>✅ Pathway to land ownership</li>
          </ul>
        </div>
      </section>
      <section className="py-16 max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8"> Our Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-center rounded-lg overflow-hidden">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">ROI</th>
                  <th className="p-3">Minimum contribution</th>
                  <th className="p-3"> Payout</th>
                  <th className="p-3">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-orange-50 border-t">
                  <td className="p-3 font-semibold">18 Months</td>
                  <td className="p-3"> 1.5 Years</td>
                  <td className="p-3"> 11%</td>
                  <td className="p-3">₦60,000</td>
                  <td className="p-3"> At Maturity</td>
                  <td className="p-3">Quick returns</td>
                </tr>
                <tr className="bg-white border-t">
                  <td className="p-3 font-semibold">36 Months</td>
                  <td className="p-3"> 3Years</td>
                  <td className="p-3"> 20%</td>
                  <td className="p-3">₦30000</td>
                  <td className="p-3"> At Maturity</td>
                  <td className="p-3">Steady Savers</td>
                </tr>
                <tr className="bg-orange-50 border-t">
                  <td className="p-3 font-semibold">60 Months</td>
                  <td className="p-3">5 years</td>
                  <td className="p-3">30%</td>
                  <td className="p-3">₦5000</td>
                  <td className="p-3">At Maturity</td>
                  <td className="p-3">Big Wealth builders</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-8">
          Important Terms
        </h2>
        <ul className="grid md:grid-cols-2 gap-6 text-lg md:text-xl">
          <li>⏳Maturity: Payout only at the end of the plan.</li>
          <li>🚫 Early Withdrawal: 10% penalty + no ROI</li>
          <li>⏰Consistency: Late payments reduce ROI</li>
          <li>📜Transparency: Legal contract before you start.</li>
        </ul>
      </section>
      <section className="py-16 max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-orange-600 text-center mb-8">
            Why Choose Vicagtect Realties?
          </h2>
          <ul className="space-y-4 text-lg md:text-xl text-center">
            <li>📈 ROI 11–30%</li>
            <li>💰Start with ₦5,000</li>
            <li>🏠 Backed by real estate in Simawa</li>
            <li>📑Contracts that protect you</li>
            <li>🔄 Flexible payment options</li>
          </ul>
        </div>
      </section>
      <section className="py-16 bg-gray-100 max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8">FAQs</h2>
        <div className="space-y-6 text-lg md:text-xl">
          <p>
            <strong>Q:</strong> Is my money safe? <br />
            <span className="text-green-700">
              {" "}
              ✅Yes, backed by real estate & legal contract.
            </span>
          </p>
          <p>
            <strong>Q:</strong>Can I withdraw anytime? <br />
            <span className="text-red-600">
              {" "}
              ❌ Only with 10% penalty & no ROI.
            </span>
          </p>
          <p>
            <strong>Q:</strong>What if I miss payments? <br />
            <span className="text-orange-700">
              ROI reduces if inconsistent.
            </span>
          </p>
          <p>
            <strong>Q:</strong> How do I pay? <br />
            Via bank transfer/approved channels.
          </p>
          <p>
            <strong>Q:</strong> Can I buy land directly? <br />
            <span className="text-orange-700">
              {" "}
              ✅Yes, through Vicagtect Nigeria Ltd.
            </span>
          </p>
        </div>
      </section>
      <section className="bg-orange-600 text-white py-16 text-center">
        <div></div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
          🚀 Dont let your money sit idle. Turn it into real estate wealth
          today.
        </h2>
        <button className="bg-white  text-orange-600 px-8 py-4 font-bold rounded-full shadow-lg hover: bg-gray-100 hover:scale-105 transition text-lg animate-bounce">
          👉🏽 Start Your Contribution Now
        </button>
        <div className="mt-8 text-lg font-medium">
          <p> 2nd Floor Sweet Promise Plaza Lotto, Mowe, Ogun State</p>
          <p>📞 08100626704, 08035021494</p>
          <p>📧 ✉️📭info@vicagtect.com</p>
        </div>
      </section>
    </div>
  );
}
export default Realties;
