import { createUseReadContract, createUseSimulateContract, createUseWatchContractEvent, createUseWriteContract } from "wagmi/codegen"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Contract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const contractAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "function",
    inputs: [],
    name: "lfg",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "start",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "startWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "whitelisted",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link contractAbi}__
 */
export const useReadContract = /*#__PURE__*/ createUseReadContract({
  abi: contractAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"owner"`
 */
export const useReadContractOwner = /*#__PURE__*/ createUseReadContract({
  abi: contractAbi,
  functionName: "owner",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"start"`
 */
export const useReadContractStart = /*#__PURE__*/ createUseReadContract({
  abi: contractAbi,
  functionName: "start",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"whitelisted"`
 */
export const useReadContractWhitelisted = /*#__PURE__*/ createUseReadContract({
  abi: contractAbi,
  functionName: "whitelisted",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link contractAbi}__
 */
export const useWriteContract = /*#__PURE__*/ createUseWriteContract({
  abi: contractAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"lfg"`
 */
export const useWriteContractLfg = /*#__PURE__*/ createUseWriteContract({
  abi: contractAbi,
  functionName: "lfg",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteContractRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: contractAbi,
  functionName: "renounceOwnership",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"startWhitelist"`
 */
export const useWriteContractStartWhitelist = /*#__PURE__*/ createUseWriteContract({
  abi: contractAbi,
  functionName: "startWhitelist",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteContractTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: contractAbi,
  functionName: "transferOwnership",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link contractAbi}__
 */
export const useSimulateContract = /*#__PURE__*/ createUseSimulateContract({
  abi: contractAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"lfg"`
 */
export const useSimulateContractLfg = /*#__PURE__*/ createUseSimulateContract({
  abi: contractAbi,
  functionName: "lfg",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateContractRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: contractAbi,
  functionName: "renounceOwnership",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"startWhitelist"`
 */
export const useSimulateContractStartWhitelist = /*#__PURE__*/ createUseSimulateContract({
  abi: contractAbi,
  functionName: "startWhitelist",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateContractTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: contractAbi,
  functionName: "transferOwnership",
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link contractAbi}__
 */
export const useWatchContractEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: contractAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link contractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchContractOwnershipTransferredEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: contractAbi,
  eventName: "OwnershipTransferred",
})
