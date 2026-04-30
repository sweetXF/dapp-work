'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { formatUnits, parseUnits } from 'viem';
import { useAccount, useBalance, useSendTransaction } from 'wagmi';

export default function Home() {
  const { chain, chainId, isConnected, address } = useAccount();
  const { data: ethBalance } = useBalance({ address });
  const [ethToAddress, setEthToAddress] = useState('');
  const [ethAmount, setEthAmount] = useState(0);
  const [txMessage, setTxMessage] = useState('');

  const { sendTransaction, isPending, data: txHash } = useSendTransaction();

  const handleETHAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/[^0-9.]/g, ''); // 只允许数字和小数点
    console.log(val);
    const MAX_VALUE = 0.001; //限制发送ETH最大值为0.001ETH
    if (parseFloat(val) >= MAX_VALUE) val = MAX_VALUE.toString();
    if (parseFloat(val) <= 0) val = '0';
    setEthAmount(parseFloat(val));
    console.log(parseUnits(parseFloat(val).toString(), 3));
  };

  // 发送 ETH
  const handleSendETH = () => {
    if (!ethToAddress || ethAmount <= 0) {
      setTxMessage('请填写有效的接收地址和数量');
      return;
    }
    setTxMessage('');
    sendTransaction(
      {
        to: ethToAddress as `0x${string}`,
        value: parseUnits(ethAmount.toString(), 3),
      },
      {
        onSuccess: (hash) => {
          setTxMessage(`交易已提交，哈希：${hash}`);
        },
        onError: (error) => {
          console.error(error);
          setTxMessage('交易失败，请重试');
        },
      },
    );
  };

  const renderMyWallet = () => {
    return (
      <div>
        {isConnected && (
          <div className="p-4 border rounded-lg">
            <h1 className="font-semibold mb-2">查询ETH余额</h1>
            <p>地址：{address}</p>
            <p>当前链ID：{chainId}</p>
            <p>当前链名：{chain?.name}</p>
            <p>余额：{ethBalance ? formatUnits(ethBalance?.value, 18) : '0'} ETH</p>
          </div>
        )}
      </div>
    );
  };

  const renderSendTranscation = () => {
    return (
      <>
        <h1 className="font-semibold mb-2">发送 ETH</h1>
        <input
          type="text"
          placeholder="接收地址"
          className="border p-2 w-full"
          value={ethToAddress}
          onChange={(e) => setEthToAddress(e.target.value)}
        />
        <input type="number" placeholder="ETH数量" className="border p-2 w-full" value={ethAmount} onChange={handleETHAmountChange} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" disabled={isPending} onClick={handleSendETH}>
          {isPending ? '等待签名中...' : '发送ETH'}
        </button>
      </>
    );
  };

  const renderTranscationRes = () => {
    return (
      <>
        {txMessage && <p className="text-sm text-gray-700 break-all">{txMessage}</p>}
        {txHash && <p className="text-sm text-green-600 break-all">交易哈希：{txHash}</p>}
      </>
    );
  };

  return (
    <main className="space-y-6">
      {/* 连接钱包按钮 */}
      <div className="flex justify-center">
        <ConnectButton />
      </div>
      {/* 我的钱包信息 */}
      {renderMyWallet()}

      <div className="space-y-4">
        {isConnected && (
          <div className="p-4 border rounded-lg space-y-2">
            {/* 发送ETH */}
            {renderSendTranscation()}
            {/* 交易结果 */}
            {renderTranscationRes()}
          </div>
        )}
      </div>
    </main>
  );
}
