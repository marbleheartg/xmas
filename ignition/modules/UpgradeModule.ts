import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

import ContractModule from "./ProxyModule.js";

const upgradeModule = buildModule("UpgradeModule", (m) => {
  const proxyAdminOwner = m.getAccount(0);

  const { proxyAdmin, proxy } = m.useModule(ContractModule);

  const newContract = m.contract("Contract");

  const encodedFunctionCall = m.encodeFunctionCall(newContract, "setName", [
    "Example Name",
  ]);

  m.call(
    proxyAdmin,
    "upgradeAndCall",
    [proxy, newContract, encodedFunctionCall],
    {
      from: proxyAdminOwner,
    },
  );

  return { proxyAdmin, proxy };
});

const newContractModule = buildModule("NewContractModule", (m) => {
  const { proxy } = m.useModule(upgradeModule);

  const contract = m.contractAt("Contract", proxy);

  return { contract };
});

export default newContractModule;
