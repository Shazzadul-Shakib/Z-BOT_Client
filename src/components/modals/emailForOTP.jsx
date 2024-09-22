/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { XCircle } from "lucide-react";

const EmailForOTP = ({ onClose }) => {
  const {
    register,
    //   reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const navigate = useNavigate();

  // Handle login form submission
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div className="h-[100dvh] w-[100dvw] flex justify-center items-center">
      <Card className="mx-auto w-[400px] -mt-14 relative p-6">
        {/* Close Button */}
        <XCircle
          onClick={onClose}
          size={25}
          className="absolute right-4 top-4 hover:text-red-500 cursor-pointer"
        />
        <CardHeader>
          <CardTitle className="text-2xl">
            Forgot Password
            <p className="text-xs text-muted-foreground py-2 ">
              Enter your email to reset password
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 ">
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                {...register("userEmail", { required: true })}
                placeholder="m@example.com"
              />
              {errors.userEmail && (
                <span className=" text-xs text-destructive ">
                  Email is required*
                </span>
              )}
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailForOTP;
