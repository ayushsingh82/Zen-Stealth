"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "../../components/ui/background-beams";

const CHAINS = [
  { label: 'Sei', value: 'sei' },
  { label: 'Ethereum', value: 'ethereum' },
];
const TOKENS = [
  { name: 'USDT', chain: 'sei', label: 'Tether (USDT)' },
  { name: 'USDC', chain: 'sei', label: 'USD Coin (USDC)' },
  { name: 'DAI', chain: 'sei', label: 'Dai (DAI)' },
  { name: 'USDT', chain: 'ethereum', label: 'Tether (USDT)' },
  { name: 'USDC', chain: 'ethereum', label: 'USD Coin (USDC)' },
  { name: 'DAI', chain: 'ethereum', label: 'Dai (DAI)' },
];

export function Fns() {
  const [step, setStep] = useState(1);
  const [walletType, setWalletType] = useState<'personal' | 'merchant' | null>(null);
  // For new step 2
  const [selectedChain, setSelectedChain] = useState('');
  const [selectedToken, setSelectedToken] = useState('');

  // Button requirements
  const canNextStep1 = !!walletType;
  const canNextStep2 = !!selectedChain && !!selectedToken;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-md bg-white/90 border-2 border-black border-r-8 border-b-8 rounded-3xl p-10 mt-8 md:mt-16 backdrop-blur-sm">
        {step === 1 && (
          <>
            <h2 className="text-3xl font-extrabold mb-2 text-black text-center tracking-tight">Create Account</h2>
            <p className="text-base text-gray-700 mb-8 text-center">Set up your wallet to get started</p>
            <div className="mb-2 text-lg font-semibold text-black">Wallet Type</div>
            <div className="flex flex-col gap-6 mb-8">
              <button
                className={`p-6 rounded-2xl border-4 font-semibold text-lg text-left transition shadow-md hover:shadow-xl focus:outline-none ${walletType === 'personal' ? 'bg-[#FCD119] border-black text-black' : 'bg-white border-[#FCD119] text-black hover:bg-[#FCD119]/20'}`}
                onClick={() => setWalletType('personal')}
              >
                <div className="font-bold text-xl mb-1">Personal</div>
                <div className="text-gray-700 text-base">For personal use</div>
              </button>
              <button
                className={`p-6 rounded-2xl border-4 font-semibold text-lg text-left transition shadow-md hover:shadow-xl focus:outline-none ${walletType === 'merchant' ? 'bg-[#FCD119] border-black text-black' : 'bg-white border-[#FCD119] text-black hover:bg-[#FCD119]/20'}`}
                onClick={() => setWalletType('merchant')}
              >
                <div className="font-bold text-xl mb-1">Team</div>
                <div className="text-gray-700 text-base">need pro access</div>
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-3xl font-extrabold mb-6 text-black text-center tracking-tight">Select Chain & Token</h2>
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-black">Chain</label>
              <select
                className="w-full p-3 rounded-xl border-2 border-black text-lg bg-white text-black focus:ring-2 focus:ring-[#FCD119] focus:border-[#FCD119] hover:border-[#FCD119] transition appearance-none"
                value={selectedChain}
                onChange={e => {
                  setSelectedChain(e.target.value);
                  setSelectedToken(''); // Reset token when chain changes
                }}
              >
                <option value="">Select a chain</option>
                {CHAINS.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            {selectedChain && (
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-black">Token</label>
                <select
                  className="w-full p-3 rounded-xl border-2 border-black text-lg bg-white text-black focus:ring-2 focus:ring-[#FCD119] focus:border-[#FCD119] hover:border-[#FCD119] transition appearance-none"
                  value={selectedToken}
                  onChange={e => setSelectedToken(e.target.value)}
                >
                  <option value="">Select a token</option>
                  {TOKENS.filter(t => t.chain === selectedChain).map(t => (
                    <option key={t.name} value={t.name}>{t.label}</option>
                  ))}
                </select>
              </div>
            )}
            {selectedChain && selectedToken && (
              <div className="mt-4 p-4 rounded-xl border-2 border-[#FCD119] bg-[#FCD119]/10 flex flex-col items-center">
                <div className="text-black font-bold text-lg mb-1">Selected</div>
                <div className="flex gap-4">
                  <span className="px-3 py-1 rounded bg-black text-white text-sm font-semibold">{CHAINS.find(c => c.value === selectedChain)?.label}</span>
                  <span className="px-3 py-1 rounded bg-[#FCD119] text-black text-sm font-semibold">{TOKENS.find(t => t.name === selectedToken && t.chain === selectedChain)?.label}</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {/* Navigation Buttons OUTSIDE the box, centered */}
      <div className="flex gap-6 mt-8 w-full max-w-md justify-center">
        <button
          className="px-8 py-3 rounded-xl border-2 border-black font-bold text-lg bg-white text-black hover:bg-[#FCD119] hover:text-black transition disabled:opacity-50 shadow-md"
          disabled={step === 1}
          onClick={() => setStep(step - 1)}
        >
          Back
        </button>
        <button
          className="px-8 py-3 rounded-xl border-2 border-black font-bold text-lg bg-black text-white hover:bg-[#FCD119] hover:text-black transition disabled:opacity-50 shadow-md"
          disabled={step === 1 ? !canNextStep1 : !canNextStep2}
          onClick={() => {
            if (step === 1 && canNextStep1) setStep(2);
            else if (step === 2 && canNextStep2) alert('Continue to next step!');
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 to-yellow-600  text-center font-sans font-bold">
        Private. Anonymous. Unlinkable.
        </h1>
        <p></p>
        <p className="text-white max-w-lg mx-auto my-2 text-md text-center relative z-10">
          Welcome to the world of private transaction . Everything you need is privacy and we are here to help you with this 
        </p>
       
      </div>
      <BackgroundBeams />
    </div>
  );
}


