import DnaLoader from "@/components/loader/loader";
import ModalBody from "@/components/modals/modalBody/ModalBody";
import AddExpenseCard from "@/components/pages/finance/AddExpenseCard";
import ExpenseSummery from "@/components/pages/finance/ExpenseSummery";
import TotalAmountCard from "@/components/pages/finance/TotalAmountCard";
import {
  useGetAllDebtQuery,
  useGetAllExpenseQuery,
  useGetAllSavingsQuery,
  useGetAllWalletQuery,
} from "@/redux/api/finance-api";
import { CreditCard, HandCoins, Landmark, BadgePercent } from "lucide-react";
import { useSelector } from "react-redux";

const Finance = () => {
  const { user } = useSelector((state) => state.user);

  const { data: allWalletsResponse, isLoading } = useGetAllWalletQuery(
    user._id
  );
  
   const { data: allExpensesResponse, isLoading: expenseIsLoading } =
     useGetAllExpenseQuery({
       ownerUserId: user._id,
       month: new Date().getMonth() + 1,
     });
  const { data: allSavingsResponse, isLoading: savingsIsLoading } =
    useGetAllSavingsQuery(user._id);
  const { data: allDebtResponse, isLoading: debtIsLoading } =
    useGetAllDebtQuery(user._id);

  if (isLoading || expenseIsLoading || savingsIsLoading || debtIsLoading) {
    return <ModalBody modal={<DnaLoader />} />;
  }
  const allExpenses = allExpensesResponse?.data ?? [];
  const allWallets = allWalletsResponse?.data ?? [];
  const allSavings = allSavingsResponse?.data ?? [];
  const allDebts = allDebtResponse?.data ?? [];

  // Add total balance
  const totalWalletBalance = allWallets.reduce((sum, wallet) => {
    const balance = wallet?.walletBalance;
    return sum + (Number.isFinite(balance) ? balance : 0);
  }, 0);

  // Add total expense
  const totalExpenseAmount = allExpenses.reduce((sum, expenseItem) => {
    const expense = expenseItem?.expenseAmount;
    return sum + (Number.isFinite(expense) ? expense : 0);
  }, 0);

  // Add total expense
  const totalSavingsAmount = allSavings.reduce((sum, savingsItem) => {
    const savings = savingsItem?.expenseAmount;
    return sum + (Number.isFinite(savings) ? savings : 0);
  }, 0);

  // Add total expense
  const totalDebtsAmount = allDebts.reduce((sum, debtItem) => {
    const debt = debtItem?.debtAmount;
    return sum + (Number.isFinite(debt) ? debt : 0);
  }, 0);

  const Info1 = { bName: "Total Balance", balance: totalWalletBalance };
  const Info2 = { bName: "Total Expense", balance: totalExpenseAmount };
  const Info3 = { bName: "Total Savings", balance: totalSavingsAmount };
  const Info4 = { bName: "Total Debt", balance: totalDebtsAmount };
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

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6 ">
        <TotalAmountCard Icon={CreditCard} Info={Info1} route={"wallet"} />
        <TotalAmountCard Icon={HandCoins} Info={Info2} route={"expense"} />
        <TotalAmountCard Icon={Landmark} Info={Info3} route={"savings"} />
        <TotalAmountCard Icon={BadgePercent} Info={Info4} route={"debt"} />
      </div>
      <div className=" grid grid-cols-1 gap-4 xl:grid-cols-2">
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
