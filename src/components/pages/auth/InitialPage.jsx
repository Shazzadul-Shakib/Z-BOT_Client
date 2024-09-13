import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const InitialPage = () => {
    return (
      <div className="h-[100dvh] w-[100dvw] flex justify-center items-center">
        <div className="w-full mx-2 md:w-1/3 text-center">
          <h1 className="text-5xl leading-[1.2] mb-2">
            Archive your daily life by <br />{" "}
          </h1>
          <div className=" flex justify-center items-center my-2">
            <img className="h-[50px]" src={logo} alt="Logo" />{" "}
          </div>
          <p>
            Manage your daily tasks, finance and projects easily in our app for
            free.
          </p>
          <Link to="/login">
            <Button className="w-full my-4 text-md font-bold flex items-center gap-3">
              Register / Login
              <MoveRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    );
};

export default InitialPage;