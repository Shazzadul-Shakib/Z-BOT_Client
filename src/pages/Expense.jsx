import DnaLoader from "@/components/loader/loader";
import AddNewExpenseModal from "@/components/modals/AddNewExpenseModal";
import ModalBody from "@/components/modals/modalBody/ModalBody";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useToggle from "@/hooks/useToggle";
import {
  useDeleteSingleExpenseMutation,
  useGetAllExpenseQuery,
} from "@/redux/api/finance-api";
import { ListFilter, PlusCircle } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

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

const Expense = () => {
  const { user } = useSelector((state) => state.user);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const { data: allExpensesResponse, isLoading } = useGetAllExpenseQuery({
    ownerUserId: user._id,
    month: month,
  });
  const [deleteSingleExpense] = useDeleteSingleExpenseMutation();
  const [
    isAddNewExpenseModalOpen,
    toggleAddNewExpenseModalOn,
    toggleAddNewExpenseModalOff,
  ] = useToggle();

  const handleMonthChange = async (monthValue) => {
    setMonth(monthValue);
  };
  const { control } = useForm({
    defaultValues: { month: month },
  });

  const allExpenses = allExpensesResponse?.data;

  if (isLoading) {
    return <ModalBody modal={<DnaLoader />} />;
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex-row justify-between mr-0 md:mr-4">
          <div>
            <CardTitle className="text-sm font-normal md:text-2xl md:font-medium">
              Expense History -{" "}
              {months.find((m) => m.value === month)?.name || "Current Month"}
              2024
            </CardTitle>
            <CardDescription className="mt-2 text-xs md:text-base">
              Manage your Expenses and view their status.
            </CardDescription>
          </div>

          <div className="flex gap-3">
            <div>
              <Controller
                name="month"
                control={control}
                render={({ field }) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm py-4 px-6"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">
                          {months.find((month) => month.value === field.value)
                            ?.name || "Filter"}
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
                            handleMonthChange(value); // Log the month value
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
            <Button
              onClick={toggleAddNewExpenseModalOn}
              size="sm"
              className="h-8 gap-1"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add New Expense
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="h-[calc(100dvh-207px)] overflow-y-auto hide-scrollbar">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Wallet</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allExpenses.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-normal md:font-medium">
                    {item.expenseName}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className="px-4 py-2" variant="outline">
                      {item.walletName}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.expenseCategory}
                  </TableCell>
                  <TableCell>${item.expenseAmount}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.expenseDate}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            deleteSingleExpense({
                              ownerUserId: user._id,
                              expenseId: item._id,
                              data: {
                                walletId: item.walletId,
                                addableAmount: item.expenseAmount,
                              },
                            });
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Expense history */}
      {isAddNewExpenseModalOpen && (
        <ModalBody
          modal={<AddNewExpenseModal onClose={toggleAddNewExpenseModalOff} />}
        />
      )}
    </div>
  );
};

export default Expense;
