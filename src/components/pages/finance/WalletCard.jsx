/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, CreditCard } from "lucide-react";

const WalletCard = ({ Info }) => {
  const { walletName, walletBalance, initialBalance } = Info;
  return (
    <Card className="py-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-semibold">{walletName}</CardTitle>
        <CreditCard className="h-8 w-8 text-orange-300" />
      </CardHeader>
      <CardContent className="mt-2">
        <div className="text-3xl font-bold flex items-center gap-2">
          <DollarSign className="h-7 w-7 text-orange-300" /> {walletBalance}
        </div>
        <div>
          <p className="text-xs font-semibold pt-2">Initial balance : $ {initialBalance}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
