/* eslint-disable react/prop-types */
import AddNewExpenseModal from "@/components/modals/AddNewExpenseModal";
import AddNewWalletModal from "@/components/modals/AddNewWallet";
import ModalBody from "@/components/modals/modalBody/ModalBody";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useToggle from "@/hooks/useToggle";
import { SquarePlus } from "lucide-react";

const AddExpenseCard = ({ ExInfo }) => {
  const [isAddWalletOpen, toggleAddWalletOn, toggleAddWalletOff] = useToggle();
  const [
    isAddNewExpenseModalOpen,
    toggleAddNewExpenseModalOn,
    toggleAddNewExpenseModalOff,
  ] = useToggle();

  const { bName, info, index } = ExInfo;

  const handleAddWalletModal = async (idx) => {
    if (idx === 1) {
      toggleAddWalletOn();
    } else {
      toggleAddNewExpenseModalOn();
    }
  };

  return (
    <Card className="p-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-semibold">{bName}</CardTitle>
        <SquarePlus
          onClick={() => {
            handleAddWalletModal(index);
          }}
          className="h-10 w-10 text-orange-300"
        />
      </CardHeader>
      <CardContent className="my-4">
        <h1>{info}</h1>
      </CardContent>
      {isAddWalletOpen && (
        <ModalBody modal={<AddNewWalletModal onClose={toggleAddWalletOff} />} />
      )}
      {isAddNewExpenseModalOpen && (
        <ModalBody
          modal={<AddNewExpenseModal onClose={toggleAddNewExpenseModalOff} />}
        />
      )}
    </Card>
  );
};

export default AddExpenseCard;
