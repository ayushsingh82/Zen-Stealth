'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans tracking-tight">
      {/* HERO */}
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-6xl h-128 bg-gradient-to-r from-[#FAF7C0] via-[#FCF569] to-[#FEDE27] rounded-b-[50%] shadow-2xl flex items-end justify-center pb-8">
            <div className="text-center">
              <p className="text-md font-black mb-16 text-white bg-black px-3 py-2 rounded-lg inline-block">Experience the Future of</p>
              <h3 className="text-6xl font-bold font-black text-black italic mb-1">
                PRIVATE Transaction
              </h3>
              <h2 className="text-6xl font-black mb-4 text-[#FCD119] bg-black px-3 py-2 rounded-lg inline-block italic">on Horizen</h2>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 pb-20 mt-64">
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

          {/* BOX 3 - How It Works */}
          <div className="bg-[#fff] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 rounded-lg">
          <h2 className="text-xl font-black mb-4 text-[#FCD119] bg-black px-3 py-2 rounded-lg inline-block">
              How It Works
            </h2>
            <p className="text-sm text-black mb-4 leading-relaxed">
              Your path to unbreakable privacy is just three simple steps away:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-lg font-extrabold text-black mr-3">1</span>
                <div>
                  <div className="font-bold text-black mb-1 text-sm">Connect Wallet</div>
                  <div className="text-xs text-black">Securely link your digital wallet in seconds—private keys never leave your device.</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-lg font-extrabold text-black mr-3">2</span>
                <div>
                  <div className="font-bold text-black mb-1 text-sm">Enter Transaction</div>
                  <div className="text-xs text-black">Enter your recipient's address and the amount to send—no trails, no identifiers.</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-lg font-extrabold text-black mr-3">3</span>
                <div>
                  <div className="font-bold text-black mb-1 text-sm">Send Privately</div>
                  <div className="text-xs text-black">Your transaction is processed instantly, with full anonymity—powered by zero-knowledge proofs.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOX 4 - Security First */}
        {/* <div className="mt-6 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 rounded-lg">
          <h3 className="text-xl font-black mb-4 text-black">
            Security First, Always
          </h3>
          <p className="text-sm text-black leading-relaxed">
            Every move you make is locked by military-grade cryptography. Your privacy, security, and sovereignty are our unwavering promise.
          </p>
        </div> */}

        {/* WAITLIST BUTTON */}
        <div className="text-center mt-12">
          <button className="bg-[#FCD119] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-black hover:bg-[#FCD119]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]">
            Join the Waitlist
          </button>
        </div>

        {/* MORE WHITE CONTENT */}
        <div className="mt-12 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-lg">
          <h3 className="text-2xl font-black mb-4 text-[#FCD119] bg-black px-4 py-2 rounded-lg inline-block">
            The Future of Private Transactions
          </h3>
          <p className="text-black leading-relaxed mb-6">
            We're building the next generation of blockchain privacy technology. Our platform combines the power of Horizen's zero-knowledge proofs with cutting-edge cryptographic protocols to deliver truly anonymous transactions.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-bold text-[#FCD119] mb-2 bg-black px-3 py-1 rounded-lg inline-block">Advanced Privacy</h4>
              <p className="text-black text-sm mt-2">
                State-of-the-art zero-knowledge proofs ensure your transactions remain completely anonymous while maintaining full security and transparency.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#FCD119] mb-2 bg-black px-3 py-1 rounded-lg inline-block">Military-Grade Security</h4>
              <p className="text-black text-sm mt-2">
                Every transaction is protected by enterprise-level cryptographic protocols, ensuring your financial privacy is never compromised.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
