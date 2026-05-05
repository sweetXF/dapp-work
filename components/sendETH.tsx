import { useState } from 'react';
import { parseEther } from 'viem';
import { useSendTransaction } from 'wagmi';

export default function SendETH() {
  const [ethToAddress, setEthToAddress] = useState('');
  const { sendTransaction, isPending, data: txHash } = useSendTransaction();

  const [ethAmount, setEthAmount] = useState(0);
  const [txMessage, setTxMessage] = useState('');

  const handleETHAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/[^0-9.]/g, ''); // 只允许数字和小数点
    const MAX_VALUE = 0.001; //限制发送ETH最大值为0.001ETH
    if (parseFloat(val) >= MAX_VALUE) val = MAX_VALUE.toString();
    if (parseFloat(val) <= 0) val = '0';
    setEthAmount(parseFloat(val));
    console.log('input', val, parseFloat(val), parseEther(val));
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
        value: parseEther(ethAmount.toString()),
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
    <div className="space-y-4">
      <div className="p-4 border rounded-lg space-y-2">
        {/* 发送ETH */}
        {renderSendTranscation()}
        {/* 交易结果 */}
        {renderTranscationRes()}
      </div>
    </div>
  );
}
