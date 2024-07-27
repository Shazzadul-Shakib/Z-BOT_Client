import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CodeXml } from "lucide-react";

const ProjectCard = () => {
    return (
      <main>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Project Name</CardTitle>
            <CardDescription className="text-xs">
              <span className="font-semibold">Duration: </span>(July 27 , 2024 -
              July 30 , 2024)
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
    );
};

export default ProjectCard;