'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, isAddress } from 'viem';

export default function LaunchPage() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [transferStatus, setTransferStatus] = useState('');

  const { address: userAddress, isConnected } = useAccount();

  // Send transaction
  const { 
    data: hash,
    error, 
    isPending, 
    sendTransaction 
  } = useSendTransaction();

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Handle transfer success
  useEffect(() => {
    if (isSuccess) {
      setTransferStatus('Transfer completed successfully!');
      // Reset form
      setAddress('');
      setAmount('');
    }
  }, [isSuccess]);

  // Handle error
  useEffect(() => {
    if (error) {
      setTransferStatus(`Transfer failed: ${error.message}`);
    }
  }, [error]);

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
      setTransferStatus('Initiating transfer...');

      // Validate address
      if (!isAddress(address)) {
        throw new Error('Invalid recipient address');
      }

      // Convert amount to wei
      const value = parseEther(amount);

      // Send transaction
      sendTransaction({ 
        to: address as `0x${string}`, 
        value 
      });

    } catch (error) {
      console.error('Transfer error:', error);
      setTransferStatus(`Transfer failed: ${(error as Error).message}`);
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
                  className="w-full px-3 py-2 border-2 border-black rounded-md shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-0 focus:border-black bg-white text-black placeholder-gray-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isPending || !isConnected}
                className="w-full py-3 px-4 border-2 border-black rounded-md shadow-[6px_6px_0_0_rgba(0,0,0,1)] text-sm font-bold text-black bg-[#FCD119] hover:bg-[#FCD119]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCD119] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Processing...' : 'Send Transaction'}
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

            {/* Transaction Status */}
            {hash && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-600">
                  Transaction Hash: {hash}
                </p>
              </div>
            )}
            {isConfirming && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                <p className="text-sm text-yellow-600">
                  Waiting for confirmation...
                </p>
              </div>
            )}
          </div>
        </div>

       
      </div>
    </div>
  );
}