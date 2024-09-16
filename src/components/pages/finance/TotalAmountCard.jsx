/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const TotalAmountCard = ({ Icon,Info }) => {
    const {bName,balance}=Info;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">{bName}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-orange-300" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold flex items-center gap-2">
          <DollarSign className="h-7 w-7 text-orange-300" /> {balance}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalAmountCard;
