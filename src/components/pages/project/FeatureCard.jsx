/* eslint-disable react/prop-types */
import DnaLoader from "@/components/loader/loader";
import ModalBody from "@/components/modals/modalBody/ModalBody";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetAllTasksQuery } from "@/redux/api/projects-api";
import { CheckCircle, Component } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ feature }) => {
  let { featureName, projectId, _id } = feature;
  featureName = featureName.charAt(0).toUpperCase() + featureName.slice(1);

  const { data, isLoading } = useGetAllTasksQuery({
    projectId,
    featureId: _id,
  });
  const tasks = data?.data;

  // Conditional filtering to avoid issues when tasks is undefined or empty
  const completedTasks =
    tasks?.length > 0 ? tasks.filter((task) => task.completed === true) : [];

  if (isLoading) {
    return <ModalBody modal={<DnaLoader />} />;
  }

  return (
    <Link to={`/projects/${projectId}/taskmodules`} state={_id}>
      <Card className="bg-primary-foreground">
        <CardHeader>
          <CardTitle className="text-center">{featureName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <div className="flex items-center">
              <Component size={16} className="text-primary mr-2" />
              <h3 className="text-sm font-semibold">
                Modules - {tasks?.length || 0}
              </h3>
            </div>
            <div className="flex items-center my-2">
              <CheckCircle size={16} className="text-primary mr-2" />
              <h3 className="text-sm font-semibold">
                Completed - {completedTasks.length || 0}
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Progress
              value={
                tasks?.length > 0
                  ? (completedTasks.length / tasks.length) * 100
                  : 0
              }
              aria-label={`${
                tasks?.length > 0
                  ? (completedTasks.length / tasks.length) * 100
                  : 0
              }% progress`}
              className="rounded-full h-4"
            />
            <div className="ml-6">
              {tasks?.length > 0
                ? `${Math.round((completedTasks.length / tasks.length) * 100)}%`
                : "0%"}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FeatureCard;
