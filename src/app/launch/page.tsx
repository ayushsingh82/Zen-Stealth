'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function LaunchPage() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Address:', address);
    console.log('Amount:', amount);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
          <h1 className="text-2xl font-bold text-[#FCD119] mb-6 text-center bg-black py-3 px-4 rounded-lg">
            SEND PRIVATELY
          </h1>
          
          <div className="mb-6 flex justify-center">
            <ConnectButton />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-black mb-2 font-bold">
                Address / ENS
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                className="w-full px-3 py-2 border-2 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-0 focus:border-black bg-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-black mb-2 font-bold">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border-2 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-0 focus:border-black bg-white"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 border-2 border-black rounded-md shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-sm font-bold text-black bg-[#FCD119] hover:bg-[#FCD119]/90 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCD119] transition-all duration-200 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}