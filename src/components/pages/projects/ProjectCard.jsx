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

const ProjectCard = ({projectInfo}) => {
  const {_id:id,projectName,createdAt}=projectInfo;
  const creationDate = new Date(createdAt).toLocaleDateString();
  
  return (
    <Link to={`/projects/${id}`} state={{ projectInfo }} className="block">
      <main className="cursor-pointer">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl mb-2">{projectName}</CardTitle>
            <CardDescription className="text-xs">
              Created at - {creationDate}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <CodeXml />
          </CardFooter>
        </Card>
      </main>
    </Link>
  );
};

export default ProjectCard;
