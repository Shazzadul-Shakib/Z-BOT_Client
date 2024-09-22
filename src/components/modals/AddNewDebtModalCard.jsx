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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useAddNewDebtMutation } from "@/redux/api/finance-api";

const AddNewDebtModal = ({ onClose }) => {
  const { user } = useSelector((state) => state.user);
  const [addNewDebt, { isLoading }] = useAddNewDebtMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <ModalBody modal={<DnaLoader />} />;
  }

  const onSubmit = async (data) => {
    data.debtPaid = false;
    data.debtDate = new Date(data.debtDate).toLocaleDateString();
    data.ownerUserId = user._id;
    console.log(data);
    const result = await addNewDebt({ ownerUserId: user._id, data }).unwrap();
    if (result.success) {
      reset();
      onClose();
    }
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
              <CardTitle className="text-xl font-bold">Add New Debt</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-6">
              {/* Owner Name */}
              <div className="w-full">
                <Input
                  placeholder="Name of owner "
                  className="p-6"
                  {...register("debtOwnerName", {
                    required: "Owner name is required",
                  })}
                />
                {errors.debtOwnerName && (
                  <span className="text-red-500 text-xs mt-2">
                    {errors.debtOwnerName.message}
                  </span>
                )}
              </div>

              {/*Amount and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Expense Amount */}
                <div className="w-full">
                  <Input
                    placeholder="Debt Amount"
                    type="number"
                    className="p-6"
                    {...register("debtAmount", {
                      required: "Debt amount is required",
                      min: {
                        value: 1,
                        message: "Amount must be greater than zero",
                      },
                    })}
                  />
                  {errors.debtAmount && (
                    <span className="text-red-500 text-xs mt-2">
                      {errors.debtAmount.message}
                    </span>
                  )}
                </div>
                {/* Date Picker */}
                <div className="w-full">
                  <Controller
                    name="debtDate"
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
                              setIsOpen(false);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.debtDate && (
                    <span className="text-red-500 text-xs mt-2">
                      {errors.debtDate.message}
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
                Add Debt
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddNewDebtModal;
