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

const CreateNewProjectModal = () => {
  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle className=" mb-2">Create New project</CardTitle>
          <CardDescription className="text-lg font-semibold pb-4">
            Let&apos;s start with a name and description for your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="mb-2">
                  Project Name
                </Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="description" className="mb-2">
                  Project Description
                </Label>
                <Textarea
                  placeholder="Type your project description here."
                  id="description"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateNewProjectModal;
