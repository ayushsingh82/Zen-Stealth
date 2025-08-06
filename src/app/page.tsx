'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Address:', address);
    console.log('Amount:', amount);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <h1 className="text-5xl font-bold text-[#FCD119] mb-4">
          PRIVATE SEND
        </h1>
        <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
          Send transactions anonymously on Horizen blockchain with zero-knowledge technology
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Info */}
          <div className="space-y-6">
            <div className="bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6">
              <h2 className="text-2xl font-bold text-black mb-3">
                Why Choose Privacy?
              </h2>
              <p className="text-black leading-relaxed">
                In today's digital world, your financial privacy matters. Our platform uses advanced 
                cryptographic protocols to ensure your transactions remain completely anonymous while 
                maintaining full security and transparency.
              </p>
            </div>

            <div className="bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6">
              <h3 className="text-xl font-bold text-[#FCD119] mb-4 bg-black py-2 px-3 rounded inline-block">
                Features
              </h3>
              <ul className="text-black space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FCD119] rounded-full mr-3"></span>
                  Zero-knowledge proofs
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FCD119] rounded-full mr-3"></span>
                  Anonymous transactions
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FCD119] rounded-full mr-3"></span>
                  Horizen blockchain
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FCD119] rounded-full mr-3"></span>
                  Instant settlement
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Send Widget */}
          <div className="bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-bold text-[#FCD119] mb-6 text-center bg-black py-3 px-4 rounded-lg">
              SEND PRIVATELY
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
                  placeholder="Enter wallet address"
                  className="w-full px-3 py-2 border-2 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-0 focus:border-black bg-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-bold text-black mb-2">
                  Amount (ZEN)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border-2 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-0 focus:border-black bg-white"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-4 border-2 border-black rounded-md shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-sm font-bold text-black bg-[#FCD119] hover:bg-[#FCD119]/90 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCD119] transition-all duration-200 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
              >
                Send Transaction
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Info Box */}
        <div className="mt-8 bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 text-center">
          <h3 className="text-xl font-bold text-[#FCD119] mb-2 bg-black py-2 px-4 rounded-lg inline-block">
            Built on Horizen
          </h3>
          <p className="text-black mt-3">
            Leveraging the power of Horizen's zero-knowledge technology for maximum privacy and security
          </p>
        </div>
      </div>
    </div>
  );
}
