"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "../../components/ui/background-beams";

export function Fns() {
  const CHAINS = [
    { label: 'Ethereum', value: 'ethereum' },
    { label: 'Horizen', value: 'horizen' },
    { label: 'Polygon', value: 'polygon' },
  ];
  const TOKENS = [
    { label: 'ETH', value: 'eth' },
    { label: 'ZEN', value: 'zen' },
    { label: 'USDT', value: 'usdt' },
  ];
  const [step, setStep] = useState(1);
  const [walletType, setWalletType] = useState<'personal' | 'team' | null>(null);
  const [chain, setChain] = useState<string>('');
  const [token, setToken] = useState<string>('');

  return (
    <div className="w-full max-w-md bg-white/80 border-2 border-black shadow-2xl rounded-3xl p-10 mt-8 md:mt-16 backdrop-blur-sm">
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-black text-center">Create Wallet</h2>
          <div className="flex flex-col gap-4 mb-8">
            <button
              className={`py-3 rounded-xl border-2 font-semibold text-lg ${walletType === 'personal' ? 'bg-[#FCD119] border-black text-black' : 'bg-gray-100 border-gray-300 text-gray-700'} transition`}
              onClick={() => setWalletType('personal')}
            >
              For Personal
            </button>
            <button
              className={`py-3 rounded-xl border-2 font-semibold text-lg ${walletType === 'team' ? 'bg-[#FCD119] border-black text-black' : 'bg-gray-100 border-gray-300 text-gray-700'} transition`}
              onClick={() => setWalletType('team')}
            >
              For Team
            </button>
          </div>
          <button
            className="w-full py-3 bg-black text-white rounded-xl font-bold text-lg hover:bg-[#FCD119] hover:text-black border-2 border-black transition disabled:opacity-50"
            disabled={!walletType}
            onClick={() => setStep(2)}
          >
            Next
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-black text-center">Select Chain & Token</h2>
          <div className="mb-8 flex flex-col gap-6">
            <div>
              <label className="block mb-2 font-semibold text-black">Chain</label>
              <select
                className="w-full p-3 rounded-xl border-2 border-black text-lg bg-white text-black focus:ring-2 focus:ring-[#FCD119] focus:border-[#FCD119] hover:border-[#FCD119] transition appearance-none"
                value={chain}
                onChange={e => setChain(e.target.value)}
              >
                <option value="" className="text-black bg-white">Select a chain</option>
                {CHAINS.map(c => (
                  <option key={c.value} value={c.value} className="text-black bg-white">{c.label}</option>
                ))}
              </select>
            </div>
            <div className="h-2" />
            <div className="border-t border-dashed border-gray-300 my-2" />
            <div>
              <label className="block mb-2 font-semibold text-black">Token</label>
              <select
                className="w-full p-3 rounded-xl border-2 border-black text-lg bg-white text-black focus:ring-2 focus:ring-[#FCD119] focus:border-[#FCD119] hover:border-[#FCD119] transition appearance-none"
                value={token}
                onChange={e => setToken(e.target.value)}
              >
                <option value="" className="text-black bg-white">Select a token</option>
                {TOKENS.map(t => (
                  <option key={t.value} value={t.value} className="text-black bg-white">{t.label}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            className="w-full py-3 bg-black text-white rounded-xl font-bold text-lg hover:bg-[#FCD119] hover:text-black border-2 border-black transition disabled:opacity-50"
            disabled={!chain || !token}
            onClick={() => alert('Continue to next step!')}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to the world of pritransaction . Everything you need is privacy and we are here to help you with this 
        </p>
       
      </div>
      <BackgroundBeams />
    </div>
  );
}


