'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';

import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

// Horizen Testnet configuration
const horizenTestnet = {
  id: 845320009,
  name: 'Horizen Testnet',
  network: 'horizen-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://horizen-rpc-testnet.appchain.base.org'] },
    default: { http: ['https://horizen-rpc-testnet.appchain.base.org'] },
  },
  blockExplorers: {
    default: { name: 'Horizen Explorer', url: 'https://horizen-explorer-testnet.appchain.base.org/' },
  },
  testnet: true,
} as const;

const config = getDefaultConfig({
  appName: 'Private Send - Horizen',
  projectId: 'YOUR_PROJECT_ID',
  chains: [horizenTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 