"use client"
import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

interface Account {
  data: string
  username: string
  account_number: number
  account_balance: number
  last_credited_amount: number
}

interface DoughnutChartProps {
  account: Account[]
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ account }) => {
  // Static data for demo purposes
  const staticAccounts: Account[] = [
    {
      data: "token1",
      username: "User A",
      account_number: 12345678,
      account_balance: 5000,
      last_credited_amount: 1500,
    },
    {
      data: "token2",
      username: "User B",
      account_number: 87654321,
      account_balance: 3000,
      last_credited_amount: 800,
    },
    {
      data: "token3",
      username: "User C",
      account_number: 56781234,
      account_balance: 7000,
      last_credited_amount: 1200,
    },
  ]

  const accountNames = staticAccounts.map((a) => a.username)
  const balances = staticAccounts.map((a) => a.account_balance)

  const data = {
    datasets: [
      {
        label: "Balances",
        data: balances,
        backgroundColor: ["#68379c", "#be8bf3", "#c3b4f2"],
      },
    ],
    labels: accountNames,
  }

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
      }}
    />
  )
}

export default DoughnutChart
