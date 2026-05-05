'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CheckBalance } from '@/components/checkBalance';
import SendETH from '@/components/sendETH';
import { useAccount } from 'wagmi';
import ERC20Balance from '@/components/ERC20Balance';
import ERC20Transfer from '@/components/ERC20Transfer';

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <main className="space-y-6">
      {/* 连接钱包按钮 */}
      <div className="flex justify-center">
        <ConnectButton />
      </div>
      <div className="space-y-4">
        {/* 我的钱包信息（查余额） */}
        {/* 发送ETH到另一个账户地址 */}
        {isConnected ? (
          <>
            <CheckBalance />
            <SendETH />
            <ERC20Balance />
            <ERC20Transfer />
          </>
        ) : null}
      </div>
    </main>
  );
}
