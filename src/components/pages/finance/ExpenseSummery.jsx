/* eslint-disable react/prop-types */
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  residence: {
    label: "Residence",
    color: "hsl(var(--chart-1))",
  },
  food: {
    label: "Food",
    color: "hsl(var(--chart-2))",
  },
  vehicle: {
    label: "Vehicle",
    color: "hsl(var(--chart-3))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-4))",
  },
  shopping: {
    label: "Shopping",
    color: "hsl(var(--chart-5))",
  },
  education: {
    label: "Education",
    color: "hsl(var(--chart-6))",
  },
  debt: {
    label: "Debt",
    color: "hsl(var(--chart-3))",
  },
  savings: {
    label: "Savings",
    color: "hsl(var(--chart-2))",
  },
  others: {
    label: "Others",
    color: "hsl(var(--chart-1))",
  },
};

const ExpenseSummery = ({ Info }) => {
  // Reduce Info array to sum up visitors by category
  const summedData = Info.reduce((acc, item) => {
    const category = item.expenseCategory.toLowerCase();
    if (!acc[category]) {
      acc[category] = { category, expenseAmount: 0 };
    }
    acc[category].expenseAmount += item.expenseAmount;
    return acc;
  }, {});

  // Create chartData ensuring all categories from chartConfig are included
  const chartData = Object.keys(chartConfig).map((categoryKey) => ({
    category: categoryKey,
    amount: summedData[categoryKey]?.expenseAmount || 0,
    fill: chartConfig[categoryKey]?.color || "var(--color-default)",
  }));

  return (
    <Card>
      <CardHeader className="mb-4">
        <CardTitle className="text-xl font-semibold">
          Expense Summary - June 2024
        </CardTitle>
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
              tickFormatter={(value) => chartConfig[value]?.label || value} // Show label from config or fallback to value
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
              activeIndex={2}
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

export default ExpenseSummery;
