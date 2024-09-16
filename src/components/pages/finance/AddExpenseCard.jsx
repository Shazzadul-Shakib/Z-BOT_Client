/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SquarePlus } from "lucide-react";

const AddExpenseCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">Add Expense</CardTitle>
        <SquarePlus className="h-8 w-8 text-orange-300" />
      </CardHeader>
      <CardContent className="my-4">
        <h1>Please add your expenses!</h1>
      </CardContent>
    </Card>
  );
};

export default AddExpenseCard;
