import { useAccount, useBalance } from 'wagmi';
import { formatUnits } from 'viem';

export const CheckBalance = () => {
  const { chain, chainId, address } = useAccount();
  const { data: ethBalance } = useBalance({ address });
  return (
    <div>
      <div className="p-4 border rounded-lg">
        <h1 className="font-semibold mb-2">查询ETH余额</h1>
        <p>地址：{address}</p>
        <p>当前链ID：{chainId}</p>
        <p>当前链名：{chain?.name}</p>
        <p>余额：{ethBalance ? formatUnits(ethBalance?.value, 18) : '0'} ETH</p>
      </div>
    </div>
  );
};
