/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const VerifyOTP = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data) => {
    console.log("OTP Submitted:", data.otp);
    // Handle OTP submission, e.g., API call
  };

  return (
    <Card className="mx-auto w-[400px]">
      <CardHeader>
        <CardTitle className="w-full text-2xl text-center">
          Verify-OTP
        </CardTitle>
        <CardDescription className="w-full text-center py-2">
          OTP has been sent to{" "}
          <span className="text-md text-orange-300">abc@mail.com</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="otp-input text-center"
            type="text"
            placeholder="XXXX"
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^\d{4}$/, // Regex to ensure exactly 4 digits
                message: "OTP must be exactly 4 digits",
              },
            })}
          />
          {/* Display validation errors */}
          {errors.otp && (
            <p className="text-red-500 text-xs mt-2">{errors.otp.message}</p>
          )}

          <div className="flex flex-col justify-center items-center mt-5">
            <div className="my-3 text-xs">
              <p>
                Didn't get the OTP?{" "}
                <span className="text-orange-300 underline cursor-pointer">
                  Resend
                </span>
              </p>
            </div>
            <Button type="submit">Verify</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyOTP;
