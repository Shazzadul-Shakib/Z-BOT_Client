/* eslint-disable react/prop-types */
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HeaderAboutCard = ({projectInfo}) => {
  return (
    <main className=" grid">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-3xl">{projectInfo.projectName}</CardTitle>
          <CardDescription className=" leading-relaxed py-2 text-base">
            {projectInfo.projectDescription}
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
};

export default HeaderAboutCard;
