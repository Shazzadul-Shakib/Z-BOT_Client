import AddNewWalletCard from "@/components/pages/finance/AddNewWalletCard";
import WalletCard from "@/components/pages/finance/WalletCard";
import useToggle from "@/hooks/useToggle";
import AddNewWalletModal from "@/components/modals/AddNewWallet";
import { useSelector } from "react-redux";
import { useGetAllWalletQuery } from "@/redux/api/finance-api";

const Wallet = () => {
  const { user } = useSelector((state) => state.user);
  
  const { data: allWalletsResponse, isLoading } = useGetAllWalletQuery(
    user._id
  );
  
  const allWallets = allWalletsResponse?.data ?? [];
  const [isWalletCardOpen, toggleWalletCardOn, toggleWalletCardOff] =
    useToggle();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6 ">
      {allWallets.map((wallet) => (
        <WalletCard key={wallet._id} Info={wallet} />
      ))}
      <AddNewWalletCard
        bName={"Add New Wallet"}
        isOpen={isWalletCardOpen}
        toggleOn={toggleWalletCardOn}
        toggleOff={toggleWalletCardOff}
        ModalCard={AddNewWalletModal}
      />
    </div>
  );
};

export default Wallet;
