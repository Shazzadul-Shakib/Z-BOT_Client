/* eslint-disable react/prop-types */
import { PlusCircle, CircleX } from "lucide-react";
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

const AddNewWalletModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
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
                className="p-6"
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
                className="p-6 otp-input"
                type="number"
                {...register("walletBalance", {
                  required: "Wallet balance is required",
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
              className="w-full bg-primary text-secondary font-semibold flex items-center gap-1"
            >
              <PlusCircle className="h-5 w-5" />
              Create Wallet
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddNewWalletModal;
