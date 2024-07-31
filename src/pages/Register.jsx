import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
    };

  return (
    <Card className="mx-auto w-[400px]">
      <CardHeader>
        <CardTitle className="text-xl mb-2">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">User Name</Label>
            <Input id="name" placeholder="Enter your name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2 ">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" type={passwordShown ? "text" : "password"} />
              <div
                className=" absolute right-3 top-2.5 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordShown ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
export default Register;
