'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractConfig } from '../../config/contract';
import { ethers } from 'ethers';

export default function LaunchPage() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [stealthHash, setStealthHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transferStatus, setTransferStatus] = useState('');
  const [contractStats, setContractStats] = useState<any>(null);

  const { address: userAddress, isConnected } = useAccount();

  // Read contract data
  const { data: userTransferCount, isLoading: isLoadingCount } = useReadContract({
    ...contractConfig,
    functionName: 'getUserTransferCount',
    args: [userAddress as `0x${string}`],
    query: {
      enabled: !!userAddress,
    },
  });

  const { data: stats, isLoading: isLoadingStats } = useReadContract({
    ...contractConfig,
    functionName: 'getContractStats',
  });

  // Write contract
  const { data: hash, writeContract, isPending } = useWriteContract();

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Update contract stats when data changes
  useEffect(() => {
    if (stats) {
      setContractStats({
        totalTransfers: Number(stats[0]),
        totalVolume: ethers.formatEther(stats[1]),
        contractBalance: ethers.formatEther(stats[2]),
      });
    }
  }, [stats]);

  // Handle transfer success
  useEffect(() => {
    if (isSuccess) {
      setTransferStatus('Transfer completed successfully!');
      setIsLoading(false);
      // Reset form
      setAddress('');
      setAmount('');
      setStealthHash('');
    }
  }, [isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      setTransferStatus('Please connect your wallet first');
      return;
    }

    if (!address || !amount) {
      setTransferStatus('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      setTransferStatus('Initiating transfer...');

      // Validate address
      if (!ethers.isAddress(address)) {
        throw new Error('Invalid recipient address');
      }

      // Convert amount to wei
      const amountInWei = ethers.parseEther(amount);

      // Generate stealth hash if not provided
      const finalStealthHash = stealthHash || ethers.keccak256(ethers.toUtf8Bytes(`${address}-${amount}-${Date.now()}`));

      // Call contract
      writeContract({
        ...contractConfig,
        functionName: 'transferETH',
        args: [address as `0x${string}`, amountInWei, finalStealthHash as `0x${string}`],
        value: amountInWei, // Send ETH with the transaction
      });

    } catch (error) {
      console.error('Transfer error:', error);
      setTransferStatus(`Transfer failed: ${(error as Error).message}`);
      setIsLoading(false);
    }
  };

  const generateStealthHash = () => {
    const hash = ethers.keccak256(ethers.toUtf8Bytes(`${address}-${amount}-${Date.now()}`));
    setStealthHash(hash);
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
          
          {/* BOX 1 - Why Privacy Matters */}
          <div className="bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 rounded-lg">
            <h2 className="text-xl font-black mb-4 text-[#FCD119] bg-black px-3 py-2 rounded-lg inline-block">
              Why Privacy Matters
            </h2>
            <p className="text-sm text-black leading-relaxed">
              In the digital era, your financial privacy is non-negotiable. Our platform uses battle-tested, advanced cryptography so your transactions stay truly private—secure, anonymous, and transparent only to you.
            </p>
          </div>

          {/* BOX 2 - Zero-Knowledge Edge */}
          <div className="bg-[#FCD119] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 rounded-lg">
            <h2 className="text-xl font-black mb-4 text-white bg-black px-3 py-2 rounded-lg inline-block">
              Our Zero-Knowledge Edge
            </h2>
            <p className="text-sm text-black mb-4 leading-relaxed">
              Harness Horizen's advanced zero-knowledge proof technology for:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3 bg-black"></span>
                <span className="text-black font-semibold">Absolute transaction privacy</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3 bg-black"></span>
                <span className="text-black font-semibold">Cutting-edge cryptographic security</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3 bg-black"></span>
                <span className="text-black font-semibold">Lightning-fast settlements</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-3 bg-black"></span>
                <span className="text-black font-semibold">Decentralized, robust infrastructure</span>
              </li>
            </ul>
          </div>

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
                  className="w-full px-3 py-2 border-2 border-black rounded-md shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-0 focus:border-black bg-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-bold text-black mb-2">
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.1"
                  step="0.001"
                  min="0"
                  className="w-full px-3 py-2 border-2 border-black rounded-md shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-0 focus:border-black bg-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="stealthHash" className="block text-sm font-bold text-black mb-2">
                  Stealth Hash (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="stealthHash"
                    value={stealthHash}
                    onChange={(e) => setStealthHash(e.target.value)}
                    placeholder="Auto-generated if empty"
                    className="flex-1 px-3 py-2 border-2 border-black rounded-md shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-0 focus:border-black bg-white"
                  />
                  <button
                    type="button"
                    onClick={generateStealthHash}
                    className="px-3 py-2 bg-[#FCD119] border-2 border-black rounded-md shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-sm font-bold text-black hover:bg-[#FCD119]/90 transition-colors"
                  >
                    Generate
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || isPending || isConfirming || !isConnected}
                className="w-full py-3 px-4 border-2 border-black rounded-md shadow-[6px_6px_0_0_rgba(0,0,0,1)] text-sm font-bold text-black bg-[#FCD119] hover:bg-[#FCD119]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCD119] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading || isPending || isConfirming ? 'Processing...' : 'Send Transaction'}
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

            {/* User Stats */}
            {isConnected && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  Your transfers: {isLoadingCount ? 'Loading...' : userTransferCount?.toString() || '0'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contract Stats */}
        {contractStats && (
          <div className="mt-8 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 rounded-lg">
            <h3 className="text-xl font-black mb-4 text-[#FCD119] bg-black px-3 py-2 rounded-lg inline-block">
              Contract Statistics
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-black">{contractStats.totalTransfers}</p>
                <p className="text-sm text-gray-600">Total Transfers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-black">{contractStats.totalVolume} ETH</p>
                <p className="text-sm text-gray-600">Total Volume</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-black">{contractStats.contractBalance} ETH</p>
                <p className="text-sm text-gray-600">Contract Balance</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}