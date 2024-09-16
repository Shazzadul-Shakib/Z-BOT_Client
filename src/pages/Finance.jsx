import AddExpenseCard from "@/components/pages/finance/AddExpenseCard";
import ExpenseSummery from "@/components/pages/finance/ExpenseSummery";
import TotalAmountCard from "@/components/pages/finance/TotalAmountCard";
import { CreditCard, HandCoins, Landmark, BadgePercent } from "lucide-react";


const Finance = () => {
    const Info1={bName:"Total Balance",balance:2000};
    const Info2={bName:"Total Expense",balance:1000};
    const Info3={bName:"Total Savings",balance:200};
    const Info4={bName:"Total Debt",balance:200};
    return (
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6 ">
          <TotalAmountCard Icon={CreditCard} Info={Info1} />
          <TotalAmountCard Icon={HandCoins} Info={Info2} />
          <TotalAmountCard Icon={Landmark} Info={Info3} />
          <TotalAmountCard Icon={BadgePercent} Info={Info4} />
        </div>
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ExpenseSummery />
          <div className="grid grid-cols-1 gap-4">
            <AddExpenseCard />
            <AddExpenseCard />
          </div>
        </div>
      </div>
    );
};

export default Finance;