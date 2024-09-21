/* eslint-disable react/prop-types */
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeXml } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({ projectInfo }) => {
  const { _id: id, projectName, createdAt } = projectInfo;
  const creationDate = new Date(createdAt).toLocaleDateString();

  return (
    <Link
      to={`/projects/${id}`}
      state={{ projectInfo }}
      className="block transform transition-transform duration-300"
    >
      <main className="cursor-pointer">
        <Card className="p-4 transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg mb-1">{projectName}</CardTitle>
            <CardDescription className="text-sm">
              Created on {creationDate}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <CodeXml className="w-5 h-5" />
          </CardFooter>
        </Card>
      </main>
    </Link>
  );
};

export default ProjectCard;
