import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUserMutation } from "@/redux/api/users-api";
import { Eye, EyeOff } from "lucide-react";
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
    formState: { errors },
  } = useForm();
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  // Handle login form submission
  const onSubmit = async (data) => {
    // login functionality
    try {
      const result = await loginUser(data);
      if (result?.data?.success) {
        dispatch(setUser(result?.data?.data));
        reset();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
              <Link to="/" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <div className="relative">
              <Input
                {...register("password", { required: true })}
                id="password"
                type={passwordShown ? "text" : "password"}
              />
              <div
                className=" absolute right-3 top-2.5 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordShown ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {errors.password && (
                <span className=" text-xs text-destructive ">
                  Password is required*
                </span>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
export default Login;
