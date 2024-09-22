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
import ModalBody from "@/components/modals/modalBody/ModalBody";
import EmailForOTP from "@/components/modals/emailForOTP";
import useToggle from "@/hooks/useToggle";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isOpen, toggleOn, toggleOff, ]=useToggle();

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [loginUser] = useLoginUserMutation();
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
                <p onClick={()=>{
                  toggleOn();
                }} className="ml-auto inline-block text-sm underline cursor-pointer">
                  Forgot your password?
                </p>
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
                    {errors.password.message || "Password is required*"}
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
      {
        isOpen && <ModalBody modal={<EmailForOTP onClose={toggleOff}/>} />
      }
    </div>
  );
};
export default Login;
