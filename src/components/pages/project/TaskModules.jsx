import DnaLoader from "@/components/loader/loader";
import ModalBody from "@/components/modals/modalBody/ModalBody";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAddNewTaskMutation,
  useDeleteTaskMutation,
  useGetAllTasksQuery,
  useUpdateTaskCompletionStatusMutation,
} from "@/redux/api/projects-api";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Loader, MoreVertical, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";

const TaskModules = () => {
  const location = useLocation();
  const featureId = location.state || {};
  const { projectId } = useParams();
  const [addNewTask, { isLoading }] = useAddNewTaskMutation();
  const { data } = useGetAllTasksQuery({
    projectId,
    featureId,
  });
  const alltasks = data?.data;

  const [updateTaskCompletionStatus] = useUpdateTaskCompletionStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (isLoading) {
    return <ModalBody modal={<DnaLoader />} />;
  }
  // Handle toggle check
  const handleToggleCheck = async (taskId, currentStatus) => {
    const data = { completed: !currentStatus };
    await updateTaskCompletionStatus({
      data,
      projectId,
      featureId,
      taskId,
    });
  };

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    await deleteTask({ projectId, featureId, taskId });
  };

  // Handle form submission
  const onSubmit = async (data) => {
    data.featureId = featureId;
    data.projectId = projectId;
    data.completed = false;
    const result = await addNewTask(data).unwrap();
    if (result.success) {
      reset();
    }
  };
  return (
    <Card className="h-[86dvh] relative">
      {alltasks?.length === 0 ? (
        <div className=" flex justify-center items-center h-full">
          <h1 className="text-2xl">No task found!</h1>
        </div>
      ) : (
        <div className="overflow-y-auto h-[calc(86dvh-72px)]">
          <Table>
            <TableHeader className="bg-primary-foreground">
              <TableRow>
                <TableHead className="w-[100px]">STATUS</TableHead>
                <TableHead>TASKS</TableHead>
                <TableHead className="hidden md:table-cell">DATE</TableHead>
                <TableHead className="text-right">MANAGE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alltasks?.map((task) => (
                <TableRow key={task?._id}>
                  <TableCell className="font-medium">
                    <Checkbox
                      id={`terms-${task?._id}`}
                      checked={task?.completed}
                      onCheckedChange={() => {
                        handleToggleCheck(task?._id, task?.completed);
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Label htmlFor={`terms-${task?._id}`}>
                      {task?.task.charAt(0).toUpperCase() + task?.task.slice(1)}
                    </Label>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded">
                        <DropdownMenuItem
                          onClick={() => {
                            handleDeleteTask(task._id);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <CardFooter className="absolute bottom-0 left-0 right-0 p-4 bg-primary-foreground">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex w-full items-center space-x-2">
            {/* Input field for task with validation */}
            <Input
              type="text"
              className="focus-visible:ring-1 py-4 rounded"
              placeholder="Enter Your New Task..."
              {...register("task", {
                required: "Task is required",
              })}
            />
            {errors.task && (
              <span className="text-red-500 text-xs">
                {errors.task.message}
              </span>
            )}

            <Button type="submit" className="gap-2 rounded">
              <PlusCircle className="h-5 w-5" />
              <span className="hidden md:block">
                {isLoading ? <Loader /> : "Add Task"}
              </span>
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
};

export default TaskModules;
