/* eslint-disable react/prop-types */
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Controller, useForm } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import { useGetAllExpenseQuery } from "@/redux/api/finance-api";
import { useSelector } from "react-redux";
import ModalBody from "@/components/modals/modalBody/ModalBody";
import DnaLoader from "@/components/loader/loader";

const chartConfig = {
  residence: { label: "Residence", color: "hsl(var(--chart-1))" },
  food: { label: "Food", color: "hsl(var(--chart-2))" },
  vehicle: { label: "Vehicle", color: "hsl(var(--chart-3))" },
  mobile: { label: "Mobile", color: "hsl(var(--chart-4))" },
  shopping: { label: "Shopping", color: "hsl(var(--chart-5))" },
  debt: { label: "Debt", color: "hsl(var(--chart-3))" },
  savings: { label: "Savings", color: "hsl(var(--chart-2))" },
  others: { label: "Others", color: "hsl(var(--chart-1))" },
};

const months = [
  { name: "January", value: 1 },
  { name: "February", value: 2 },
  { name: "March", value: 3 },
  { name: "April", value: 4 },
  { name: "May", value: 5 },
  { name: "June", value: 6 },
  { name: "July", value: 7 },
  { name: "August", value: 8 },
  { name: "September", value: 9 },
  { name: "October", value: 10 },
  { name: "November", value: 11 },
  { name: "December", value: 12 },
];

const ExpenseSummary = () => {
  const { user } = useSelector((state) => state.user);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const handleMonthChange = async (monthValue) => {
    setMonth(monthValue);
  };

  const { control } = useForm({
    defaultValues: { month: month },
  });

  const { data: allExpensesResponse, isLoading } = useGetAllExpenseQuery({
    ownerUserId: user._id,
    month: month,
  });

  if (isLoading) {
    return <ModalBody modal={<DnaLoader />} />;
  }

  const Info = allExpensesResponse?.data;
  const summedData = Info?.reduce((acc, item) => {
    const category = item.expenseCategory.toLowerCase();
    if (!acc[category]) {
      acc[category] = { category, expenseAmount: 0 };
    }
    acc[category].expenseAmount += item.expenseAmount;
    return acc;
  }, {});

  const chartData = Object.keys(chartConfig).map((categoryKey) => ({
    category: categoryKey,
    amount: summedData[categoryKey]?.expenseAmount || 0,
    fill: chartConfig[categoryKey]?.color || "var(--color-default)",
  }));

  return (
    <Card>
      <CardHeader className="grid grid-cols-2 space-y-0">
        <CardTitle className="text-xl font-semibold">Expense Summary</CardTitle>
        <div className="flex justify-end">
          <Controller
            name="month"
            control={control}
            render={({ field }) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm py-4 rounded"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">
                      {months.find((m) => m.value === field.value)?.name ||
                        months[new Date().getMonth()].name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by month</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {months.map(({ name, value }) => (
                    <DropdownMenuCheckboxItem
                      key={value}
                      checked={field.value === value}
                      onCheckedChange={() => {
                        field.onChange(value);
                        handleMonthChange(value);
                      }}
                    >
                      {name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label || value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="amount"
              strokeWidth={2}
              radius={5}
              barSize={40}
              activeBar={({ ...props }) => (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              )}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;
