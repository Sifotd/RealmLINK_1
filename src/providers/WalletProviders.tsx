'use client';

import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// 配置要连接的网络
const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
});

// 创建一个查询客户端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 重试次数
      staleTime: 5 * 60 * 1000, // 5分钟内数据被视为新鲜
    },
  },
});

// 钱包弹窗自定义文本
const walletModalLabels = {
  heading: '连接钱包',
  description: '选择下列钱包之一连接到门票销售平台',
  install: '安装',
  connect: '连接',
  connected: '已连接',
  getWallet: '获取钱包',
  learnMore: '了解更多',
  qrCode: {
    heading: '通过二维码连接',
    description: '使用手机扫描二维码',
  },
};

export function WalletProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
        <WalletProvider 
          autoConnect={false} // 不自动连接
          modalLabels={walletModalLabels} // 自定义文本
          preferredWallets={['Sui Wallet', 'Ethos Wallet', 'Suiet']} // 优先显示的钱包
        >
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
} 