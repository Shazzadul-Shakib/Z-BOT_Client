/* eslint-disable react/prop-types */
import ModalBody from "@/components/modals/modalBody/ModalBody";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

const AddNewWalletCard = ({ isOpen, toggleOn, toggleOff,ModalCard }) => {
  

  return (
    <div>
      <Card className="flex items-center justify-center py-11">
        <CardContent className="pt-6">
          <Button size="sm" className="h-8 gap-1 mt-2" onClick={toggleOn}>
            <PlusCircle className="h-5 w-5" />
            <span className="sr-only md:not-sr-only sm:whitespace-nowrap">
              Add New Wallet
            </span>
          </Button>
        </CardContent>
      </Card>
      {isOpen && <ModalBody modal={<ModalCard onClose={toggleOff} />} />}
    </div>
  );
};

export default AddNewWalletCard;
