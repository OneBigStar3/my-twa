import { ContractAddress } from "./../config/constants";
import { useEffect, useState } from "react";
import { Counter } from "../contracts/counter";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract, toNano } from "@ton/core";

export function useCounterContract() {
  const client = useTonClient();
  const [val, setVal] = useState<null | number>();
  const { sender } = useTonConnect();
  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Counter(
      Address.parse(ContractAddress) // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<Counter>;
  }, [client]);

  useEffect(() => {
    if (counterContract) {
      (async () => {
        setVal(null);
        const val = await counterContract.getCounter();
        setVal(Number(val));
      })();
    }
    async function getValue() {
      if (!counterContract) return;
      setVal(null);
      const val = await counterContract.getCounter();
      setVal(Number(val));
      await sleep(5000); // sleep 5 seconds and poll value again
      getValue();
    }
    getValue();
  }, [counterContract]);

  return {
    value: val,
    address: counterContract?.address.toString(),
    sendIncrement: () => {
      return counterContract?.sendIncrease(sender, {
        increaseBy: 1,
        value: toNano('0.05'),
    });
    },
  };
}
