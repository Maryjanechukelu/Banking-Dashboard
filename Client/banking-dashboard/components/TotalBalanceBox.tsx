import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';

const TotalBalanceBox: React.FC = () => {
  // Hardcoded account data
  const accounts = [
    {
      id: '1',
      availableBalance: 5000.75,
      currentBalance: 4500.00,
      officialName: 'Savings Account',
      mask: '1234',
      institutionId: 'bank_001',
      name: 'My Savings',
      type: 'savings',
      subtype: 'personal',
      appwriteItemId: 'appwrite_001',
      shareableId: 'shareable_001',
    },
    {
      id: '2',
      availableBalance: 1200.50,
      currentBalance: 1000.50,
      officialName: 'Checking Account',
      mask: '5678',
      institutionId: 'bank_002',
      name: 'My Checking',
      type: 'checking',
      subtype: 'personal',
      appwriteItemId: 'appwrite_002',
      shareableId: 'shareable_002',
    },
  ];

  // Hardcoded totals
  const totalBanks = 2;
  const totalCurrentBalance = accounts.reduce((acc, account) => acc + account.currentBalance, 0);

  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="header-2">
          Bank Accounts: {totalBanks}
        </h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">
            Total Current Balance
          </p>

          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
