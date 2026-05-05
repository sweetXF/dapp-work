import { ERC20Abi } from '@/app/ERC20Abi';
import { ERC20_ADDRESS } from '@/libs/myERC20';
import { useState } from 'react';
import { parseEther } from 'viem';
import { useWriteContract } from 'wagmi';

export default function ERC20Transfer() {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('0');
  const [txMessage, setTxMessage] = useState('');
  const { writeContract, isPending } = useWriteContract();

  function handleTransfer() {
    if (!toAddress || Number(amount) <= 0) {
      setTxMessage('请填写接收地址和转账金额');
      return;
    } else if (Number(amount) > 1000) {
      setTxMessage('转账金额不能大于1000');
      return;
    }
    setTxMessage('');
    writeContract(
      {
        address: ERC20_ADDRESS,
        abi: ERC20Abi,
        functionName: 'transfer',
        args: [toAddress as `0x${string}`, parseEther(amount)],
      },
      {
        onSuccess: (hash) => {
          console.log('transfer', toAddress, amount, hash);
          setTxMessage(`交易成功，哈希：${hash}`);
        },
        onError: (error) => {
          console.error(error);
          setTxMessage('交易失败，请重试');
        },
      },
    );
  }

  return (
    <>
      {/* 转账功能 */}
      <div className="space-y-3">
        <h2 className="font-semibold">代币转账</h2>
        <input className="border p-2 w-full rounded" placeholder="接收地址 0x..." value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
        <input
          className="border p-2 w-full rounded"
          type="number"
          placeholder="转账数量(MTK)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleTransfer} disabled={isPending} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">
          {isPending ? '交易处理中...' : '确认转账'}
        </button>
        {txMessage && <p className="text-sm text-gray-700 break-all">{txMessage}</p>}
      </div>
    </>
  );
}
