import { network } from "hardhat";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

describe("Contract", async function () {
  const { viem } = await network.connect();
  const contract = await viem.deployContract("Whitelist");

  const publicClient = await viem.getPublicClient();
  const [defaultWallet, nonOwnerWallet] = await viem.getWalletClients();

  it("Should get whitelisted", async function () {
    await contract.write.lfg();

    const whitelisted = await contract.read.whitelisted([
      defaultWallet.account.address,
    ]);

    assert.equal(whitelisted, true);
  });
});
