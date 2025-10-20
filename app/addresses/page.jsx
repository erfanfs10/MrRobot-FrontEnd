import getAuthData from "@/services/GetAuthData";
import AddressList from "./AddressList";

const AddressesPage = async () => {
  const addresses = await getAuthData({ url: "addresses/user/" });
  return <AddressList addresses={addresses} />;
};

export default AddressesPage;
