import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;

if (!projectId) {
  throw new Error('请在 .env.local 中配置 NEXT_PUBLIC_WALLETCONNECT_ID');
}

// WalletConnect Project ID 必须为 32 位小写十六进制字符串
if (!/^[a-f0-9]{32}$/.test(projectId)) {
  console.warn(
    '[wagmi] NEXT_PUBLIC_WALLETCONNECT_ID 格式异常，应为 32 位小写十六进制字符串。' +
      '请前往 https://cloud.reown.com 申请有效的 Project ID。当前值：',
    projectId,
  );
}

export const config = getDefaultConfig({
  appName: 'My Dapp',
  projectId: projectId,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http('https://ethereum-rpc.publicnode.com'),
    [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
  },
  ssr: true,
});
