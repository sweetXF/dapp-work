import { ERC20Abi } from '@/app/ERC20Abi';
import { DECIMALS, ERC20_ADDRESS, TOKEN_SYMBOL } from '@/libs/myERC20';
import { formatUnits } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

export default function ERC20Balance() {
  const { address, isConnected } = useAccount();

  const { data: balanceData } = useReadContract({
    address: ERC20_ADDRESS as `0x${string}`,
    abi: ERC20Abi,
    functionName: 'balanceOf',
    args: [address ?? '0x0'],
    query: { enabled: isConnected && !!address },
  });
  const formattedBalance = balanceData ? formatUnits(balanceData, DECIMALS) : '0';
  console.log(balanceData, formattedBalance);

  return (
    <div className="space-y-3">
      <h2 className="font-semibold">代币余额</h2>
      <p className="text-xl font-medium">
        {formattedBalance} {TOKEN_SYMBOL}
      </p>
    </div>
  );
}
