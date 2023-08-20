import Token from "@/contracts/Token.json";
import Web3 from "web3";

async function getContract() {
  // create web3 provider
  const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
  const web3 = new Web3(provider);
  // interact with smart contract we need two things
  // 1. ABI
  // 2. contract address

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Token.networks[networkId];

  // contract
  const contract = new web3.eth.Contract(Token.abi, deployedNetwork.address);

  return contract;
}

export default getContract;
