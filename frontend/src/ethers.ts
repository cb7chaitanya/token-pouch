import { ethers } from "ethers";
declare global {
    interface Window {
        ethereum: any
    }
}
const provider = new ethers.BrowserProvider(window.ethereum);

provider.send("eth_requestAccounts", []).catch(() => {
  console.log("User denied account access");
});

const signer = await provider.getSigner();

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI: any[] = [
  // YOUR_CONTRACT_ABI
];

const contract = new ethers.Contract(contractAddress, contractABI, signer);

export default provider;
export { contract };
