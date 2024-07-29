import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Component } from "lucide-react";

const FeatureCard = () => {
  return (
    <div>
      <Card className="bg-primary-foreground">
        <CardHeader>
          <CardTitle className="text-center">Feature Name</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <div className="flex items-center">
              <Component size={16} className="text-primary mr-2" />
              <h3 className="text-sm font-semibold">Modules - 4</h3>
            </div>
            <div className="flex items-center my-2">
              <CheckCircle size={16} className="text-primary mr-2" />
              <h3 className="text-sm font-semibold">Completed - 3</h3>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Progress
              value={75}
              aria-label="75% increase"
              className="rounded-full h-4"
            />
            <div className="ml-6">75%</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureCard;
