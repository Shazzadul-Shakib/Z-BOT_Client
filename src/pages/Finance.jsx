import AddExpenseCard from "@/components/pages/finance/AddExpenseCard";
import ExpenseSummery from "@/components/pages/finance/ExpenseSummery";
import TotalAmountCard from "@/components/pages/finance/TotalAmountCard";
import { useGetAllWalletQuery } from "@/redux/api/finance-api";
import { CreditCard, HandCoins, Landmark, BadgePercent } from "lucide-react";
import { useSelector } from "react-redux";

const Finance = () => {
  const { user } = useSelector((state) => state.user);
  
  const { data: allWalletsResponse, isLoading } = useGetAllWalletQuery(
    user._id
  );
  const allWallets = allWalletsResponse?.data ?? [];
  const totalWalletBalance = allWallets.reduce((sum, wallet) => {
    const balance = wallet?.walletBalance;

    // Add to sum only if balance is a valid finite number
    return sum + (Number.isFinite(balance) ? balance : 0);
  }, 0);

  console.log(totalWalletBalance);
  const Info1 = { bName: "Total Balance", balance: totalWalletBalance };
  const Info2 = { bName: "Total Expense", balance: 1000 };
  const Info3 = { bName: "Total Savings", balance: 200 };
  const Info4 = { bName: "Total Debt", balance: 200 };
  const ExInfo1 = {
    bName: "Create New Wallet",
    info: "Add your seperate income to your new wallet",
    index: 1,
  };
  const ExInfo2 = {
    bName: "Add New Expense",
    info: "Add your expenses from your seperate wallet",
    index: 2,
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6 ">
        <TotalAmountCard Icon={CreditCard} Info={Info1} route={"wallet"} />
        <TotalAmountCard Icon={HandCoins} Info={Info2} route={"expense"} />
        <TotalAmountCard Icon={Landmark} Info={Info3} route={"savings"} />
        <TotalAmountCard Icon={BadgePercent} Info={Info4} route={"debt"} />
      </div>
      <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ExpenseSummery />
        <div className="grid grid-cols-1 gap-4">
          <AddExpenseCard ExInfo={ExInfo1} />
          <AddExpenseCard ExInfo={ExInfo2} />
        </div>
      </div>
    </div>
  );
};

export default Finance;
