import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRegisterUserMutation } from "@/redux/api/users-api";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });
  const navigate=useNavigate();

  // Calling API for register user
  const [registerUser,{isLoading}] = useRegisterUserMutation();

  // Get OTP sent from server to verify
  const { otp: newOTP } = useSelector((state) => state.otp);
  const userInfo = newOTP?.payload;

  // Watch the OTP input field value
  const otpValue = watch("otp");

  const onSubmit = async (data) => {
    if (newOTP?.OTP && Number(data.otp) === newOTP.OTP) {
      console.log("OTP Matched");

      try {
        // Send the updated user info with verified status to the server
        const result = await registerUser({
          ...userInfo,
          verified: true,
        }).unwrap();

        // Check the result and log success or failure
        if (result) {
          console.log("Email verified");
          navigate("/login");

        } else {
          console.log("Email not verified");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else {
      console.log("OTP did not match or is undefined");
    }
  };

  return (
    <Card className="mx-auto w-[400px]">
      <CardHeader>
        <CardTitle className="w-full text-2xl text-center">
          Verify OTP
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
                Didn&apos;t get the OTP?{" "}
                <span className="text-orange-300 underline cursor-pointer">
                  Resend
                </span>
              </p>
            </div>
            <Button type="submit" disabled={otpValue.length !== 4}>
              {isLoading?"Verifying...":"Verify"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyOTP;
