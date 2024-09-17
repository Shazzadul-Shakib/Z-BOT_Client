import AddNewWalletCard from "@/components/pages/finance/AddNewWalletCard";
import WalletCard from "@/components/pages/finance/WalletCard";
import useToggle from "@/hooks/useToggle";
import AddNewWalletModal from "@/components/modals/AddNewWallet";


const Wallet = () => {
  const [isWalletCardOpen, toggleWalletCardOn, toggleWalletCardOff] =
    useToggle();
  const Info1={bName:"Tuition",balance:2000};
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6 ">
        <WalletCard Info={Info1} />
        <WalletCard Info={Info1} />
        <WalletCard Info={Info1} />
        <AddNewWalletCard isOpen={isWalletCardOpen} toggleOn={toggleWalletCardOn} toggleOff={toggleWalletCardOff} ModalCard={AddNewWalletModal} />
      </div>
    );
};

export default Wallet;