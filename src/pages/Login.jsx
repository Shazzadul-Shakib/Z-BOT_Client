import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUserMutation } from "@/redux/api/users-api";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "@/redux/slices/userSlice";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  // Handle login form submission
  const onSubmit = async (data) => {
    const result = await loginUser(data);

    if (result?.data?.success) {
      dispatch(setUser(result?.data?.data));
      reset();
      navigate("/");
    } else {
      const errorMessage = result?.error?.data?.message || "Login failed";
      // Set error for password field with custom message
      setError("password", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  const handleDemoUserLogin = async () => {
    const data = { userEmail: "doligiy180@dawhe.com", password: "123456" };
    const result = await loginUser(data);
    if (result?.data?.success) {
      dispatch(setUser(result?.data?.data));
      navigate("/");
    }
  };

  return (
    <div className="h-[100dvh] w-[100dvw] flex justify-center items-center">
      <Card className="mx-auto w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl mb-2">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="rounded p-4"
                {...register("userEmail", { required: true })}
                placeholder="m@example.com"
              />
              {errors.userEmail && (
                <span className=" text-xs text-destructive ">
                  Email is required*
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  {...register("password", { required: true })}
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
                {errors.password && (
                  <span className=" text-xs text-destructive ">
                    {errors.password.message || "Password is required*"}
                  </span>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full rounded font-bold text-background"
            >
              {isLoading ? <Loader /> : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline text-primary">
              Sign up
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <p
            onClick={handleDemoUserLogin}
            className=" text-sm font-semibold text-primary underline cursor-pointer"
          >
            Demo Acccount
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Login;
