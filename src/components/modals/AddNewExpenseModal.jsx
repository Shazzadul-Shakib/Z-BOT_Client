/* eslint-disable react/prop-types */
import { PlusCircle, XCircle, CalendarIcon, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import {
  useAddNewExpenseMutation,
  useGetAllWalletQuery,
} from "@/redux/api/finance-api";
import { Link, useNavigate } from "react-router-dom";
import ModalBody from "./modalBody/ModalBody";
import DnaLoader from "../loader/loader";

const AddNewExpenseModal = ({ onClose }) => {
  const { user } = useSelector((state) => state.user);
  const { data: allWalletsResponse, isLoading } = useGetAllWalletQuery(
    user._id
  );
  const allWallets = allWalletsResponse?.data ?? [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [addNewExpense, { isLoading: expenseIsLoading }] =
    useAddNewExpenseMutation();

  const categories = [
    { id: 1, cValue: "Residence", category: "Residence" },
    { id: 2, cValue: "Food", category: "Food" },
    { id: 3, cValue: "Vehicle", category: "Vehicle" },
    { id: 4, cValue: "Mobile", category: "Mobile" },
    { id: 5, cValue: "Shopping", category: "Shopping" },
    { id: 6, cValue: "Education", category: "Education" },
    { id: 7, cValue: "Savings", category: "Savings" },
    { id: 8, cValue: "Debt", category: "Debt" },
    { id: 9, cValue: "Others", category: "Others" },
  ];

  const onSubmit = async (data) => {
    const [walletName, walletId] = data.expenseWallet.split("|");
    data.walletName = walletName;
    data.walletId = walletId;
    data.ownerUserId = user._id;
    data.expenseDate = new Date(data.expenseDate).toLocaleDateString();
    console.log(typeof data.expenseDate);
    const result = await addNewExpense({
      ownerUserId: user._id,
      data,
    }).unwrap();
    if (result.success) {
      console.log(result.message);
      reset();
      onClose();
    } else {
      alert(result.message);
    }
  };

  if (isLoading || expenseIsLoading) {
    return <ModalBody modal={<DnaLoader />} />;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-3xl mx-4 md:mx-0 md:w-[50%]">
        <Card className="relative p-6">
          {/* Close Button */}
          <XCircle
            onClick={onClose}
            size={25}
            className="absolute right-4 top-4 hover:text-red-500 cursor-pointer"
          />
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader className="pb-8">
              <CardTitle className="text-xl font-bold">
                Add New Expense
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-6">
              {/* Expense Name */}
              <div className="w-full">
                <Input
                  placeholder="About New Expense"
                  className="p-6 rounded"
                  {...register("expenseName", {
                    required: "Expense name is required",
                  })}
                />
                {errors.expenseName && (
                  <span className="text-red-500 text-xs mt-2">
                    {errors.expenseName.message}
                  </span>
                )}
              </div>

              {/* Category and Amount */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div className="w-full">
                  <Controller
                    name="expenseCategory"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger
                          className="p-6 rounded"
                          aria-label="Select Category"
                        >
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((item) => (
                            <SelectItem key={item.id} value={item?.cValue}>
                              {item?.category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.expenseCategory && (
                    <span className="text-red-500 text-xs mt-2">
                      {errors.expenseCategory.message}
                    </span>
                  )}
                </div>
                {/* Expense Amount */}
                <div className="w-full">
                  <Input
                    placeholder="Expense Amount"
                    type="number"
                    className="p-6 rounded"
                    {...register("expenseAmount", {
                      required: "Expense amount is required",
                      min: {
                        value: 1,
                        message: "Amount must be greater than zero",
                      },
                    })}
                  />
                  {errors.expenseAmount && (
                    <span className="text-red-500 text-xs mt-2">
                      {errors.expenseAmount.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Wallet and Date Picker */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Wallet */}
                <div className="w-full">
                  <Controller
                    name="expenseWallet"
                    control={control}
                    rules={{ required: "Wallet is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => {
                          if (value === "add wallet") {
                            navigate("/finance/wallet");
                          } else {
                            field.onChange(value);
                          }
                        }}
                      >
                        <SelectTrigger
                          className="w-full p-6 rounded"
                          aria-label="Select Wallet"
                        >
                          <SelectValue placeholder="Select Wallet" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {allWallets.length > 0 ? (
                            allWallets.map((wallet) => (
                              <SelectItem
                                key={wallet._id}
                                value={`${wallet.walletName}|${wallet._id}`}
                              >
                                {wallet.walletName}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem
                              value="add wallet"
                              className="cursor-pointer"
                            >
                              <Link to="finance/wallet">Add Wallet</Link>
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.expenseWallet && (
                    <span className="text-red-500 text-xs mt-2">
                      {errors.expenseWallet.message}
                    </span>
                  )}
                </div>

                {/* Date Picker */}
                <div className="w-full">
                  <Controller
                    name="expenseDate"
                    control={control}
                    rules={{ required: "Date is required" }}
                    render={({ field }) => (
                      <Popover open={isOpen} onOpenChange={setIsOpen}>
                        <PopoverTrigger asChild>
                          <div
                            onClick={() => setIsOpen(!isOpen)}
                            className={cn(
                              "w-full p-3 border cursor-pointer text-left font-normal rounded",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 inline-block" />
                            {field.value
                              ? format(field.value, "MMM d, yyyy")
                              : "Pick a date"}
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setIsOpen(false);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.expenseDate && (
                    <span className="text-red-500 text-xs mt-2">
                      {errors.expenseDate.message}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="mt-6">
              <Button
                type="submit"
                className="w-full font-semibold flex items-center justify-center gap-2 rounded"
              >
                {expenseIsLoading ? (
                  <Loader />
                ) : (
                  <>
                    <PlusCircle className="h-5 w-5" /> Add Expense
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddNewExpenseModal;
