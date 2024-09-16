import TotalAmountCard from "@/components/pages/finance/TotalAmountCard";
import { CreditCard } from "lucide-react";


const Finance = () => {
    const Info1={bName:"Total Balance",balance:2000};
    const Info2={bName:"Total Expense",balance:1000};
    const Info3={bName:"Total Savings",balance:200};
    const Info4={bName:"Total Debt",balance:200};
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
        <TotalAmountCard Icon={CreditCard} Info={Info1} />
        <TotalAmountCard Icon={CreditCard} Info={Info2}/>
        <TotalAmountCard Icon={CreditCard} Info={Info3}/>
        <TotalAmountCard Icon={CreditCard} Info={Info4}/>
      </div>
    );
};

export default Finance;