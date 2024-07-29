import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";


const HeaderTab = () => {
    return (
      <div className="my-4">
        <Tabs defaultValue="plan">
          <TabsList>
            <TabsTrigger value="plan">Project Plan</TabsTrigger>
            <TabsTrigger value="task">All Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="plan">
            Make changes to your plan here.
          </TabsContent>
          <TabsContent value="task">
            Make changes to your tasks here.
          </TabsContent>
        </Tabs>
       
      </div>
    );
};

export default HeaderTab;