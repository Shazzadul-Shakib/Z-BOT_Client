/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CodeXml } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({projectInfo}) => {
  const {_id:id,projectName}=projectInfo;
  return (
    <Link to={`/projects/${id}`} state={{ projectInfo }} className="block">
      <main className="cursor-pointer">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">{projectName}</CardTitle>
            <CardDescription className="text-xs">
              July 27, 2024 - July 30, 2024
            </CardDescription>
          </CardHeader>
          <CardContent className="my-2 flex items-center justify-center">
            <Progress value={25} aria-label="25% increase" />
            <div className="ml-6">25%</div>
          </CardContent>
          <CardFooter>
            <CodeXml />
          </CardFooter>
        </Card>
      </main>
    </Link>
  );
};

export default ProjectCard;
