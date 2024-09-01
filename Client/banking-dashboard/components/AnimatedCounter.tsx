"use client";
import React from 'react';
import CountUp from 'react-countup';

interface AnimatedCounterProps {
  account: Account
}

interface Account {
  data: string;
  username: string;
  account_number: number;
  account_balance: number;
  last_credited_amount: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ account }) => {
  return (
    <div className="text-xl font-bold text-indigo-600">
      <CountUp 
        decimals={2}
        decimal=","
        prefix="$"
        end={account.account_balance} 
      />
    </div>
  );
};

export default AnimatedCounter;
