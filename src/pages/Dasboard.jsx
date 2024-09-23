import DnaLoader from "@/components/loader/loader";
import ModalBody from "@/components/modals/modalBody/ModalBody";
import AddExpenseCard from "@/components/pages/finance/AddExpenseCard";
import ExpenseSummery from "@/components/pages/finance/ExpenseSummery";
import TotalAmountCard from "@/components/pages/finance/TotalAmountCard";
import { Button } from "@/components/ui/button";
import {
  useGetAllExpenseQuery,
  useGetAllWalletQuery,
} from "@/redux/api/finance-api";
import { useGetAllProjectsQuery } from "@/redux/api/projects-api";
import { CreditCard, HandCoins, PlusCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  // Fetch financial data
  const { data: allWalletsResponse, isLoading: walletIsLoading } =
    useGetAllWalletQuery(user._id);
  const { data: allExpensesResponse, isLoading: expenseIsLoading } =
    useGetAllExpenseQuery({
      ownerUserId: user._id,
      month: new Date().getMonth() + 1,
    });

  // Fetch projects data
  const { data: projectsResponse, isLoading: projectsIsLoading } =
    useGetAllProjectsQuery(user?._id);

  if (walletIsLoading || expenseIsLoading || projectsIsLoading) {
    return <ModalBody modal={<DnaLoader />} />;
  }

  const allExpenses = allExpensesResponse?.data ?? [];
  const allWallets = allWalletsResponse?.data ?? [];
  const allProjects = projectsResponse ?? [];

  // Total balance
  const totalWalletBalance = allWallets.reduce((sum, wallet) => {
    const balance = wallet?.walletBalance;
    return sum + (Number.isFinite(balance) ? balance : 0);
  }, 0);

  // Total expense
  const totalExpenseAmount = allExpenses.reduce((sum, expenseItem) => {
    const expense = expenseItem?.expenseAmount;
    return sum + (Number.isFinite(expense) ? expense : 0);
  }, 0);

  // Financial info cards
  const Info1 = { bName: "Total Balance", balance: totalWalletBalance };
  const Info2 = { bName: "Total Expense", balance: totalExpenseAmount };
  const ExInfo2 = {
    bName: "Add New Expense",
    info: "Add your expenses from your seperate wallet",
    index: 2,
  };
  return (
    <div>
      {/* Financial Overview Section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-5">
        <TotalAmountCard
          Icon={CreditCard}
          Info={Info1}
          route={"finance/wallet"}
        />
        <TotalAmountCard
          Icon={HandCoins}
          Info={Info2}
          route={"finance/expense"}
        />
      </div>

      {/* Financial Summary and Projects Section */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Expense Summary on left */}
        <ExpenseSummery />

        <div className="grid gap-6">
          {/* Projects Overview and Add Project Button on right */}
          <div className="flex flex-col gap-4 p-11 rounded-xl border-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl">Projects Overview</h2>
              {/* Add New Project Button */}
              <Link to="/projects">
                <Button size="sm" className="h-8 gap-1 mt-2 rounded">
                  <PlusCircle className="h-5 w-5" />
                  <span className="sr-only md:not-sr-only sm:whitespace-nowrap font-bold">
                    Create New Project
                  </span>
                </Button>
              </Link>
            </div>

            {/* Display Total Number of Projects */}
            <p className="font-semibold text-sm">
              You have {allProjects.length} projects.
            </p>
          </div>
          <AddExpenseCard ExInfo={ExInfo2} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
