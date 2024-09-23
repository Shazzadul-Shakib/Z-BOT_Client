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
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });
  const navigate = useNavigate();

  // Calling API for register user
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  // Get OTP sent from server to verify
  const { otp: newOTP } = useSelector((state) => state.otp);
  const userInfo = newOTP?.payload;

  // Watch the OTP input field value
  const otpValue = watch("otp");

  const onSubmit = async (data) => {
    if (newOTP?.OTP && Number(data.otp) === newOTP.OTP) {
      try {
        // Send the updated user info with verified status to the server
        const result = await registerUser({
          ...userInfo,
          verified: true,
        }).unwrap();

        // Check the result and log success or failure
        if (result) {
          navigate("/login");
        } else {
          alert("Email not verified");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else {
      setError("otp", {
        type: "manual",
        message: "OTP did not match or is undefined",
      });
    }
  };

  return (
    <div className="h-[100dvh] w-[100dvw] flex justify-center items-center">
      <Card className="mx-auto w-[400px]">
        <CardHeader>
          <CardTitle className="w-full text-2xl text-center">
            Verify OTP
          </CardTitle>
          <CardDescription className="w-full text-center py-2">
            OTP has been sent to{" "}
            <span className="text-md text-orange-300">
              {userInfo?.userEmail}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full flex justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              className="otp-input text-center rounded p-4"
              type="text"
              placeholder="XXXX"
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^\d{4}$/,
                  message: "OTP must be exactly 4 digits",
                },
              })}
            />
            {/* Display validation errors */}
            {errors.otp && (
              <p className="text-red-500 text-xs mt-2">{errors.otp.message}</p>
            )}

            <div className="flex flex-col justify-center items-center mt-5">
              <Button
                type="submit"
                className="rounded font-bold"
                disabled={otpValue.length !== 4}
              >
                {isLoading ? <Loader /> : "Verify"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOTP;
