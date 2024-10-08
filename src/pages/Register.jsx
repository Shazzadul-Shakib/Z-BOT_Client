import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterUserMutation } from "@/redux/api/users-api";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { setOtp } from "@/redux/slices/otpSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // calling api for register user
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle submit form and operation to send otp and user to database
  const onSubmit = async (data) => {
    const result = await registerUser(data).unwrap();
    if (result) {
      dispatch(setOtp({ otp: result?.data }));
      reset();
      navigate("/verifyotp");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="h-[100dvh] w-[100dvw] flex justify-center items-center">
      <Card className="mx-auto w-[350px] md:w-[400px]">
        <CardHeader>
          <CardTitle className="text-xl mb-2">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">User Name</Label>
              <Input
                {...register("userName", { required: true })}
                id="name"
                placeholder="Enter your name"
                className="rounded p-4"
              />
              {errors.userName && (
                <span className=" text-xs text-destructive ">
                  Name is required*
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("userEmail", { required: true })}
                id="email"
                type="email"
                placeholder="m@example.com"
                className="rounded p-4"
              />
              {errors.userEmail && (
                <span className=" text-xs text-destructive ">
                  Email is required*
                </span>
              )}
            </div>
            <div className="grid gap-2 ">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  {...register("password", {
                    required: "Password is required*",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters*",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must not exceed 20 characters*",
                    },
                  })}
                  id="password"
                  type={passwordShown ? "text" : "password"}
                  placeholder="xxxxxx"
                  className="rounded p-4"
                />
                <div
                  className=" absolute right-3 top-2.5 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordShown ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
              {errors.password && (
                <span className=" text-xs text-destructive ">
                  {errors.password.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full rounded text-background font-bold"
            >
              {isLoading ? <Loader/>: "Create an account"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline text-primary">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Register;
