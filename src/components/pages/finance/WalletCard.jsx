/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard } from "lucide-react";

const WalletCard = ({Info}) => {
  const {bName,balance}=Info;
  return (
    <Card className="py-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-semibold">{bName}</CardTitle>
        <CreditCard className="h-8 w-8 text-orange-300" />
      </CardHeader>
      <CardContent className="mt-4">
        <div className="text-3xl font-bold flex items-center gap-2">
          <DollarSign className="h-7 w-7 text-orange-300" /> {balance}
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
