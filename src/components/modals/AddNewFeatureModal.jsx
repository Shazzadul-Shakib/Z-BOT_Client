import { PlusCircle, CircleX } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";

const AddNewFeatureModal = ({ toggleOff }) => {
  return (
    <div className="h-[80dvh] w-full mx-4 md:w-[30%] flex justify-center items-center">
      <Card className="w-full relative">
        <CircleX
          onClick={toggleOff}
          size={25}
          className="absolute right-4 top-4 hover:text-red-500 cursor-pointer"
        />
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">
            Add New Feature
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col my-4">
          <Input placeholder="Name of new Feature" className="p-6" />
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-primary text-secondary font-semibold flex items-center gap-1">
            <PlusCircle className="h-5 w-5" />
            Add Feature
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddNewFeatureModal;
