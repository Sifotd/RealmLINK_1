'use client';

import { ConnectButton, useConnectWallet, useCurrentAccount, useCurrentWallet, useWallets } from '@mysten/dapp-kit';
import { EnhancedConnectWallet } from '@/components/ConnectWallet';
import { useState } from 'react';

export default function WalletTestPage() {
  const currentAccount = useCurrentAccount();
  const { currentWallet, connectionStatus } = useCurrentWallet();
  const wallets = useWallets();
  const { mutate: connect } = useConnectWallet();
  const [selectedWalletName, setSelectedWalletName] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">钱包功能测试页面</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">默认 ConnectButton</h2>
            <p className="mb-4">官方提供的ConnectButton组件：</p>
            <div className="flex justify-center">
              <ConnectButton connectText="连接钱包" />
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">增强版 ConnectWallet</h2>
            <p className="mb-4">自定义样式并展示钱包信息：</p>
            <EnhancedConnectWallet />
          </div>
        </div>
      </div>
      
      <div className="card bg-base-100 shadow-xl mt-8">
        <div className="card-body">
          <h2 className="card-title">可用钱包列表</h2>
          <p className="mb-4">查看所有支持的钱包并连接特定钱包：</p>
          
          {wallets.length === 0 ? (
            <div className="alert alert-warning">未检测到支持的钱包</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {wallets.map((wallet) => (
                <div 
                  key={wallet.name}
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                    selectedWalletName === wallet.name ? 'border-primary bg-primary/10' : 'hover:border-gray-400'
                  }`}
                  onClick={() => setSelectedWalletName(wallet.name)}
                >
                  <div className="flex items-center mb-2">
                    {wallet.icon && (
                      <img 
                        src={wallet.icon} 
                        alt={`${wallet.name} icon`} 
                        className="w-6 h-6 mr-2" 
                      />
                    )}
                    <span className="font-medium">{wallet.name}</span>
                  </div>
                  <div className="text-xs text-gray-500">版本: {wallet.version}</div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-center">
            <button 
              className="btn btn-primary" 
              disabled={!selectedWalletName || connectionStatus === 'connecting'}
              onClick={() => {
                const wallet = wallets.find(w => w.name === selectedWalletName);
                if (wallet) {
                  connect({ wallet });
                }
              }}
            >
              {connectionStatus === 'connecting' ? '连接中...' : `连接到 ${selectedWalletName || '选中的钱包'}`}
            </button>
          </div>
        </div>
      </div>
      
      {currentAccount && (
        <div className="card bg-base-100 shadow-xl mt-8">
          <div className="card-body">
            <h2 className="card-title">当前账户信息</h2>
            <div className="overflow-x-auto">
              <table className="table">
                <tbody>
                  <tr>
                    <td className="font-medium">地址</td>
                    <td className="font-mono text-xs break-all">{currentAccount.address}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">钱包</td>
                    <td>{currentWallet?.name}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">状态</td>
                    <td>{connectionStatus}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">功能</td>
                    <td>{currentAccount.features.join(', ')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 