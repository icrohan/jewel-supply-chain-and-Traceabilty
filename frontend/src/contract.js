import web3 from "./web3";
import abi from "./abi/GoldVerify.json";

const contract = new web3.eth.Contract(
  abi.abi,
  "0xbdf805A69EBF8f771882b0A50521ce6f6752c249"
);
export default contract;