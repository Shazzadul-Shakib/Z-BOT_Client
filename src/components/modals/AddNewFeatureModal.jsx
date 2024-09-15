/* eslint-disable react/prop-types */
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
import { useForm } from "react-hook-form";
import { useAddNewFeatureMutation } from "@/redux/api/projects-api";

const AddNewFeatureModal = ({ projectId, toggleOff }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [addNewFeature, { isLoading }] = useAddNewFeatureMutation();

  const onSubmit = async (data) => {
    data.projectId = projectId;
    const result = await addNewFeature(data).unwrap();
    if (result.success) {
      reset();
      toggleOff();
    }
  };

  return (
    <div className="h-[80dvh] w-full mx-4 md:w-[30%] flex justify-center items-center">
      <Card className="w-full relative">
        <CircleX
          onClick={toggleOff}
          size={25}
          className="absolute right-4 top-4 hover:text-red-500 cursor-pointer"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">
              Add New Feature
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col my-4">
            <Input
              placeholder="Name of new Feature"
              className="p-6"
              {...register("featureName", {
                required: "Feature name is required",
              })}
            />
            {errors.featureName && (
              <span className="text-red-500 text-xs mt-2">
                {errors.featureName.message}
              </span>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-primary text-secondary font-semibold flex items-center gap-1"
            >
              <PlusCircle className="h-5 w-5" />
              {isLoading ? "Loading..." : "Add Feature"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddNewFeatureModal;
