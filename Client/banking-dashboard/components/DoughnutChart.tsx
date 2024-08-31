"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

declare interface DoughnutChartProps {
  accounts: Account[];
}
type Account = {
  data: string;
  username: string
  account_number: number
  account_balance: number
  last_credited_amount: number
};



function DoughnutChart({ accounts }: DoughnutChartProps) {
  const accountNames = accounts.map((a) => a.username)
  const balances = accounts.map((a) => a.account_balance)

  const data = {
    datasets: [
      {
        label: "Banks",
        data: balances,
        backgroundColor: ["#68379c", "#be8bf3", "#be8bf3"],
      },
    ],
    labels: accountNames,
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }} />
  );
}

export default DoughnutChart
