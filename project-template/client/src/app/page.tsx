/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import getContract from "@/utils/contract";
import { useEffect, useState } from "react";

export default function page() {
  const [contract, setContract] = useState<any>(null);
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const [data, setData] = useState<string>("");
  const [owner, setOwner] = useState<string>("");

  const getOwnerBalance = async () => {
    const balance = await contract.methods.getBalance(owner).call();
    setData(balance);
  };

  useEffect(() => {
    getContract().then((c) => setContract(c));
  }, []);

  // get contract data
  useEffect(() => {
    const getData = async () => {
      const owner = await contract.methods.minter().call();
      setOwner(owner);
      await getOwnerBalance();
    };

    contract && getData();
  }, [contract, getOwnerBalance]);

  // -------------------------------------------------------
  // send token
  const handleSendToken = async () => {
    if (!contract || !amount || !receiverAddress) return;
    await contract.methods.send(receiverAddress, amount).send({ from: owner });
    await getOwnerBalance();
  };

  // sent owner balance
  const handleSetOwnerBalance = async () => {
    if (!contract || !amount) return;
    await contract.methods.setBalance(amount).send({ from: owner });
    await getOwnerBalance();
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen w-full ">
      <h1 className="text-3xl font-semibold text-center uppercase text-gradient bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded p-2">
        Blockchain token
      </h1>
      <input
        type="text"
        className="border border-pink-300 w-96 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Receiver address"
        onChange={(e) => setReceiverAddress(e.target.value)}
      />
      <input
        className="border border-pink-300 w-96 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Amount"
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <p className="text-center text-pink-600 font-semibold">
        Owner balance:{" "}
        <span className="font-bold text-green-500">{String(data)}</span>
      </p>

      <button
        className="w-96 bg-pink-500 px-10 py-2 rounded text-white font-bold hover:bg-pink-400"
        onClick={handleSendToken}
      >
        Send
      </button>
      <button
        className="w-96 bg-pink-500 px-10 py-2 rounded text-white font-bold hover:bg-pink-400"
        onClick={handleSetOwnerBalance}
      >
        Set owner balance
      </button>
    </div>
  );
}
