/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useSelector } from "react-redux";
import { useAddProjectMutation } from "@/redux/api/projects-api";
import { Loader } from "lucide-react";

const CreateNewProjectModal = ({ toggleOff }) => {
  const { user } = useSelector((state) => state.user);
  const [addProject, { isLoading }] = useAddProjectMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit handler
  const onSubmit = async (data) => {
    data.projectOwnerId = user?._id;
    const result = await addProject(data).unwrap();
    if (result?.success) {
      reset();
      toggleOff();
    }
  };

  return (
    <div className="mx-4 md:mx-0">
      <Card>
        <CardHeader>
          <CardTitle className=" mb-2">Create New Project</CardTitle>
          <CardDescription className="text-lg font-semibold pb-4">
            Let&apos;s start with a name and description for your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="mb-2">
                  Project Name
                </Label>
                <Input
                  id="name"
                  className="rounded p-4"
                  placeholder="Name of your project"
                  {...register("projectName", {
                    required: "Project Name is required",
                  })}
                />
                {errors.projectName && (
                  <p className="text-red-500 text-sm">
                    {errors.projectName.message}
                  </p>
                )}
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="description" className="mb-2">
                  Project Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Type your project description here."
                  className="w-full h-56 max-h-56 resize-none border rounded p-4"
                  {...register("projectDescription", {
                    required: "Project Description is required",
                  })}
                />
                {errors.projectDescription && (
                  <p className="text-red-500 text-sm">
                    {errors.projectDescription.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={toggleOff} className="rounded p-4" variant="outline">
            Cancel
          </Button>
          <Button
            type="submit"
            className="rounded p-4 font-bold"
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? <Loader/> : "Create"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateNewProjectModal;
