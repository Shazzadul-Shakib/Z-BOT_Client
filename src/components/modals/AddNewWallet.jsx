/* eslint-disable react/prop-types */
import { PlusCircle, CircleX, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { useAddWalletMutation } from "@/redux/api/finance-api";
import { useSelector } from "react-redux";

const AddNewWalletModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useSelector((state) => state.user);

  const [addWallet, { isLoading }] = useAddWalletMutation();

  const onSubmit = async (data) => {
    data.walletOwnerId = user._id;
    data.initialBalance = data.walletBalance;
    const result = await addWallet(data).unwrap();
    if (result.success) {
      reset();
      onClose();
    }
  };

  return (
    <div className="h-[80dvh] w-full mx-4 md:w-[40%] flex justify-center items-center">
      <Card className="w-full relative">
        <CircleX
          onClick={onClose}
          size={25}
          className="absolute right-4 top-4 hover:text-red-500 cursor-pointer"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">
              Create New Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col my-4">
            <div>
              <Input
                placeholder="Name of new Wallet"
                className="p-6 rounded"
                {...register("walletName", {
                  required: "Wallet name is required",
                })}
              />
              {errors.walletName && (
                <span className="text-red-500 text-xs mt-2">
                  {errors.walletName.message}
                </span>
              )}
            </div>
            <div className="mt-4">
              <Input
                placeholder="Wallet Ballance"
                className="p-6 otp-input rounded"
                type="number"
                {...register("walletBalance", {
                  required: "Wallet balance is required",
                  min: {
                    value: 1,
                    message: "Amount must be greater than zero",
                  },
                })}
              />
              {errors.walletBalance && (
                <span className="text-red-500 text-xs mt-2">
                  {errors.walletBalance.message}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-primary text-secondary font-bold flex items-center gap-1 rounded"
            >
              {isLoading ? (
                <Loader/>
              ) : (
                <>
                  <PlusCircle className="h-5 w-5" /> Create Wallet
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddNewWalletModal;
