import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Abi } from "viem";
import { CONTRACT_NAME } from "./config/index.js";

const contractAbi = await import(
  `./artifacts/contracts/${CONTRACT_NAME}.sol/${CONTRACT_NAME}.json`,
  { assert: { type: "json" } }
);

export default defineConfig({
  out: `abi/${CONTRACT_NAME.toLowerCase()}Abi.ts`,
  contracts: [
    {
      name: CONTRACT_NAME,
      abi: contractAbi.abi as Abi,
    },
  ],
  plugins: [react()],
});
