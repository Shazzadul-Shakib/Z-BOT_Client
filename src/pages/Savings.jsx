import AddNewSavingSchemeModalCard from "@/components/modals/AdNewSavingSchemeModalCard";
import AddNewWalletCard from "@/components/pages/finance/AddNewWalletCard";
import WalletCard from "@/components/pages/finance/WalletCard";
import useToggle from "@/hooks/useToggle";

const Savings = () => {
    const [isavingsCardOpen, toggleSavingsCardOn, toggleSavingsCardOff] =
      useToggle();
    const Info1 = { bName: "Emergency ", balance: 2000 };
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6 ">
        <WalletCard Info={Info1} />
        <AddNewWalletCard
          isOpen={isavingsCardOpen}
          toggleOn={toggleSavingsCardOn}
          toggleOff={toggleSavingsCardOff}
          ModalCard={AddNewSavingSchemeModalCard}
        />
      </div>
    );
};

export default Savings;