"use client";
import React, { useState } from 'react';
import { BackgroundBeamsDemo } from './screens';

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

const WidgetPage = () => {
  const [step, setStep] = useState(1);
  const [walletType, setWalletType] = useState<'personal' | 'team' | null>(null);
  const [chain, setChain] = useState<string>('');
  const [token, setToken] = useState<string>('');

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left: Stepper */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-16">
        <div className="w-full max-w-md bg-white border-2 border-black shadow-lg rounded-2xl p-8">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-black text-center">Create Wallet</h2>
              <div className="flex flex-col gap-4 mb-8">
                <button
                  className={`py-3 rounded-lg border-2 font-semibold text-lg ${walletType === 'personal' ? 'bg-[#FCD119] border-black text-black' : 'bg-gray-100 border-gray-300 text-gray-700'} transition`}
                  onClick={() => setWalletType('personal')}
                >
                  For Personal
                </button>
                <button
                  className={`py-3 rounded-lg border-2 font-semibold text-lg ${walletType === 'team' ? 'bg-[#FCD119] border-black text-black' : 'bg-gray-100 border-gray-300 text-gray-700'} transition`}
                  onClick={() => setWalletType('team')}
                >
                  For Team
                </button>
              </div>
              <button
                className="w-full py-3 bg-black text-white rounded-lg font-bold text-lg hover:bg-[#FCD119] hover:text-black border-2 border-black transition disabled:opacity-50"
                disabled={!walletType}
                onClick={() => setStep(2)}
              >
                Next
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-black text-center">Select Chain</h2>
              <select
                className="w-full p-3 rounded-lg border-2 border-black mb-8 text-lg"
                value={chain}
                onChange={e => setChain(e.target.value)}
              >
                <option value="">Select a chain</option>
                {CHAINS.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <button
                className="w-full py-3 bg-black text-white rounded-lg font-bold text-lg hover:bg-[#FCD119] hover:text-black border-2 border-black transition disabled:opacity-50"
                disabled={!chain}
                onClick={() => setStep(3)}
              >
                Next
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-black text-center">Select Token</h2>
              <select
                className="w-full p-3 rounded-lg border-2 border-black mb-8 text-lg"
                value={token}
                onChange={e => setToken(e.target.value)}
              >
                <option value="">Select a token</option>
                {TOKENS.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <button
                className="w-full py-3 bg-black text-white rounded-lg font-bold text-lg hover:bg-[#FCD119] hover:text-black border-2 border-black transition disabled:opacity-50"
                disabled={!token}
                onClick={() => alert('Continue to next step!')}
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
      {/* Right: Background Beams Demo */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative min-h-[40rem]">
        <div className="w-full h-full flex items-center justify-center">
          <BackgroundBeamsDemo />
        </div>
      </div>
    </div>
  );
};

export default WidgetPage;