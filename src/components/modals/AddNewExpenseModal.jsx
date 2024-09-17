/* eslint-disable react/prop-types */
import { PlusCircle, XCircle, CalendarIcon } from "lucide-react";
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

const AddNewExpenseModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

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
                  className="p-6"
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
                          className="p-6"
                          aria-label="Select Category"
                        >
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Active</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
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
                    className="p-6"
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
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger
                          className="w-full p-6"
                          aria-label="Select Wallet"
                        >
                          <SelectValue placeholder="Select Wallet" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <SelectItem value="wallet1">Wallet 1</SelectItem>
                          <SelectItem value="wallet2">Wallet 2</SelectItem>
                          <SelectItem value="wallet3">Wallet 3</SelectItem>
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
                              "w-full p-3 border cursor-pointer text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 inline-block" />
                            {field.value
                              ? format(field.value, "MMM d, yyyy")
                              : "Pick a date"}
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setIsOpen(false); // Close the popover when a date is selected
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
                className="w-full font-semibold flex items-center justify-center gap-2"
              >
                <PlusCircle className="h-5 w-5" />
                Add Expense
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddNewExpenseModal;
