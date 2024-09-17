import AddNewWalletCard from "@/components/pages/finance/AddNewWalletCard";
import WalletCard from "@/components/pages/finance/WalletCard";

const Wallet = () => {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6 ">
        <WalletCard/>
        <WalletCard/>
        <WalletCard/>
        <AddNewWalletCard />
      </div>
    );
};

export default Wallet;