'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CheckBalance } from '@/components/checkBalance';
import SendETH from '@/components/sendETH';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <main className="space-y-6">
      {/* 连接钱包按钮 */}
      <div className="flex justify-center">
        <ConnectButton />
      </div>
      <div className="space-y-4">
        {/* 我的钱包信息 */}
        {/* 发送ETH到另一个账户地址 */}
        {isConnected ? (
          <>
            <CheckBalance />
            <SendETH />
          </>
        ) : null}
      </div>
    </main>
  );
}
