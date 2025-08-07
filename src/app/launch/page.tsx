'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, usePublicClient, useWalletClient } from 'wagmi';
import { contractConfig } from '../../config/contract';
import { parseEther, isAddress } from 'viem';

export default function LaunchPage() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transferStatus, setTransferStatus] = useState('');
  const [contractOwner, setContractOwner] = useState<string>('');

  const { address: userAddress, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  // Read contract owner
  const { data: owner, isLoading: isLoadingOwner } = useReadContract({
    ...contractConfig,
    functionName: 'owner',
  });

  // Write contract
  const { data: hash, writeContract, isPending } = useWriteContract();

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Update contract owner when data changes
  useEffect(() => {
    if (owner) {
      setContractOwner(owner);
    }
  }, [owner]);

  // Handle transfer success (keeping for compatibility with wagmi hooks)
  useEffect(() => {
    if (isSuccess) {
      setTransferStatus('Transfer completed successfully!');
      setIsLoading(false);
      // Reset form
      setAddress('');
      setAmount('');
      setTokenAddress('');
    }
  }, [isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      setTransferStatus('Please connect your wallet first');
      return;
    }

    if (!address || !amount || !tokenAddress) {
      setTransferStatus('Please fill in all required fields');
      return;
    }

    if (!publicClient || !walletClient) {
      setTransferStatus('Wallet not ready');
      return;
    }

    try {
      setIsLoading(true);
      setTransferStatus('Initiating transfer...');

      // Validate addresses
      if (!isAddress(address)) {
        throw new Error('Invalid recipient address');
      }
      if (!isAddress(tokenAddress)) {
        throw new Error('Invalid token address');
      }

      // Convert amount to wei (assuming 18 decimals for most ERC20 tokens)
      const amountInWei = parseEther(amount);

      // Simulate the contract call first
      const { request } = await publicClient.simulateContract({
        address: contractConfig.address as `0x${string}`,
        abi: contractConfig.abi,
        functionName: 'transferToken',
        args: [tokenAddress as `0x${string}`, address as `0x${string}`, amountInWei],
        account: userAddress as `0x${string}`,
      });

      // Write to the contract
      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      setTransferStatus('Transfer completed successfully!');
      setIsLoading(false);
      
      // Reset form
      setAddress('');
      setAmount('');
      setTokenAddress('');

    } catch (error) {
      console.error('Transfer error:', error);
      setTransferStatus(`Transfer failed: ${(error as Error).message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-6xl h-64 bg-gradient-to-r from-[#FAF7C0] via-[#FCF569] to-[#FEDE27] rounded-b-[50%] shadow-2xl flex items-end justify-center pb-8">
            <div className="text-center">
              <p className="text-lg font-medium text-black mb-2">Experience the Future of</p>
              <h1 className="text-6xl font-black text-black tracking-tight mb-1">
                PRIVATE Transaction
              </h1>
              <p className="text-2xl font-light text-black italic">on Horizen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20 mt-16">
        <div className="grid md:grid-cols-3 gap-6">
          
         
       

          {/* BOX 3 - Transfer Form */}
          <div className="bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 rounded-lg">
            <h2 className="text-xl font-black mb-4 text-[#FCD119] bg-black px-3 py-2 rounded-lg inline-block">
              Send Privately
            </h2>
            
            <div className="mb-6 flex justify-center">
              <ConnectButton />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-bold text-black mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-3 py-2 border-2 border-black rounded-md shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-0 focus:border-black bg-white text-black placeholder-gray-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="tokenAddress" className="block text-sm font-bold text-black mb-2">
                  Token Contract Address
                </label>
                <input
                  type="text"
                  id="tokenAddress"
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-3 py-2 border-2 border-black rounded-md shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-0 focus:border-black bg-white text-black placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-bold text-black mb-2">
                  Amount (Tokens)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100"
                  step="0.001"
                  min="0"
                  className="w-full px-3 py-2 border-2 border-black rounded-md shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-0 focus:border-black bg-white text-black placeholder-gray-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !isConnected}
                className="w-full py-3 px-4 border-2 border-black rounded-md shadow-[6px_6px_0_0_rgba(0,0,0,1)] text-sm font-bold text-black bg-[#FCD119] hover:bg-[#FCD119]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCD119] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Send Transaction'}
              </button>
            </form>

            {/* Status Messages */}
            {transferStatus && (
              <div className={`mt-4 p-3 rounded-md text-sm font-medium ${
                transferStatus.includes('failed') || transferStatus.includes('error') 
                  ? 'bg-red-100 text-red-800 border border-red-300' 
                  : 'bg-green-100 text-green-800 border border-green-300'
              }`}>
                {transferStatus}
              </div>
            )}

            {/* Contract Owner Info */}
            {contractOwner && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  Contract Owner: {isLoadingOwner ? 'Loading...' : contractOwner}
                </p>
                {isConnected && userAddress === contractOwner && (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    ✓ You are the contract owner
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

       
      </div>
    </div>
  );
}