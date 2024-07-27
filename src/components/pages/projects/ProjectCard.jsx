import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CodeXml } from "lucide-react";

const ProjectCard = () => {
    return (
      <main>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Project Name</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Progress value={25} aria-label="25% increase" />
            <div className="ml-6">25%</div>
          </CardContent>
          <CardFooter>
            <CodeXml/>
          </CardFooter>
        </Card>
      </main>
    );
};

export default ProjectCard;