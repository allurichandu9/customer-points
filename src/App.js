import React, { useState } from "react";
const transactions = [
  { customer: "Customer A", amount: 120, date: "2023-08-31" },
  { customer: "Customer B", amount: 75, date: "2023-08-30" },
  { customer: "Customer C", amount: 275, date: "2023-08-30" },
  { customer: "Customer D", amount: 175, date: "2023-08-31" }
];
const calculateRewardPoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2;
  }
  if (amount >= 50 && amount <= 100) {
    points += amount - 50;
  }
  return points;
};
function App() {
  const [rewardPoints, setRewardPoints] = useState({});

  const calculateTotalPoints = (transactions) => {
    const pointsByCustomer = {};
    transactions.forEach((transaction) => {
      const { customer, amount, date } = transaction;
      const transactionDate = new Date(date);
      const monthYear = `${
        transactionDate.getMonth() + 1
      }-${transactionDate.getFullYear()}`;
      const points = calculateRewardPoints(amount);

      if (!pointsByCustomer[customer]) {
        pointsByCustomer[customer] = {};
      }

      if (!pointsByCustomer[customer][monthYear]) {
        pointsByCustomer[customer][monthYear] = 0;
      }

      pointsByCustomer[customer][monthYear] += points;
    });

    return pointsByCustomer;
  };

  const handleCalculatePoints = () => {
    const calculatedPoints = calculateTotalPoints(transactions);
    setRewardPoints(calculatedPoints);
  };

  return (
    <div>
      <button onClick={handleCalculatePoints}>Calculate Points</button>
      {Object.keys(rewardPoints).map((customer) => (
        <div key={customer}>
          <h2>{customer}</h2>
          {Object.keys(rewardPoints[customer]).map((monthYear) => (
            <p key={monthYear}>
              {monthYear}: {rewardPoints[customer][monthYear]} points
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
