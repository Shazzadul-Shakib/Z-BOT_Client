import CreateNewProjectModal from "@/components/modals/CreateNewProjectModal";
import ModalBody from "@/components/modals/modalBody/ModalBody";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import useToggle from "@/hooks/useToggle";
import { PlusCircle } from "lucide-react";

const HeaderCard = () => {
  const [isOpen, toggleOn, toggleOff,]=useToggle();

    return (
      <main className=" col-span-1 lg:col-span-2 grid">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Your Projects</CardTitle>
            <CardDescription className="max-w-lg leading-relaxed">
              Manage and organize your project more efficiently.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button size="sm" className="h-8 gap-1 mt-2 rounded" 
              onClick={toggleOn}
            >
              <PlusCircle className="h-5 w-5" />
              <span className="sr-only md:not-sr-only sm:whitespace-nowrap font-bold">
                Create New Project
              </span>
            </Button>
          </CardFooter>
        </Card>

        {
          isOpen && <ModalBody modal={<CreateNewProjectModal toggleOff={toggleOff} />}/>
        }
      </main>
    );
};

export default HeaderCard;