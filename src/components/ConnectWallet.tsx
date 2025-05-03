'use client';

import { ConnectButton, useCurrentAccount, useCurrentWallet, useDisconnectWallet } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';

export function ConnectWallet() {
  // 默认使用Dapp Kit提供的ConnectButton，可根据需要调整样式
  return (
    <div className="connect-wallet-wrapper">
      <ConnectButton 
        connectText="连接钱包"
        className="sui-connect-button" 
      />
    </div>
  );
}

// 自定义钱包按钮样式
export function CustomConnectWallet() {
  const currentAccount = useCurrentAccount();
  const { isConnected } = useCurrentWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && currentAccount) {
      // 格式化钱包地址，显示前6位和后4位
      const address = currentAccount.address;
      const formatted = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
      setWalletAddress(formatted);
    } else {
      setWalletAddress(null);
    }
  }, [currentAccount, isConnected]);

  // 打开默认的连接钱包模态框
  const openConnectModal = () => {
    // 创建并触发点击ConnectButton的事件
    const connectButton = document.querySelector('.sui-connect-button');
    if (connectButton instanceof HTMLElement) {
      connectButton.click();
    } else {
      console.error('Cannot find connect button element');
    }
  };

  return (
    <div className="flex items-center">
      {/* 隐藏的原始ConnectButton用于触发钱包连接弹窗 */}
      <div className="hidden">
        <ConnectButton className="sui-connect-button" />
      </div>
      
      {isConnected ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-primary">
            {walletAddress || '已连接'}
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><button onClick={() => disconnect()}>断开连接</button></li>
          </ul>
        </div>
      ) : (
        <button onClick={openConnectModal} className="btn btn-primary">
          连接钱包
        </button>
      )}
    </div>
  );
}

// 增强版钱包连接组件，展示更多钱包信息
export function EnhancedConnectWallet() {
  const currentAccount = useCurrentAccount();
  const { currentWallet, connectionStatus } = useCurrentWallet();

  // 展示钱包信息
  const displayWalletInfo = () => {
    if (!currentWallet || !currentAccount) return null;
    
    return (
      <div className="p-4 border rounded-lg mt-4">
        <h3 className="font-bold text-lg mb-2">钱包信息</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">钱包名称:</span> {currentWallet.name}
          </p>
          <p>
            <span className="font-medium">地址:</span> 
            <span className="font-mono text-xs break-all">{currentAccount.address}</span>
          </p>
          <p>
            <span className="font-medium">状态:</span> {connectionStatus}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CustomConnectWallet />
      {currentWallet && currentAccount && displayWalletInfo()}
    </div>
  );
} 