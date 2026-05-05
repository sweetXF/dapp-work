import { ERC20Abi } from '@/app/ERC20Abi';
import { DECIMALS, ERC20_ADDRESS, TOKEN_SYMBOL } from '@/libs/myERC20';
import { useEffect, useRef, useState } from 'react';
import { formatUnits } from 'viem';
import { useWatchContractEvent } from 'wagmi';

export function ERC20TransferWatch() {
  const [eventList, setEventList] = useState<
    Array<{
      from: string;
      to: string;
      value: string;
      txHash: string;
    }>
  >([]);

  //   const scrollRef = useRef<HTMLDivElement>(null);

  useWatchContractEvent({
    address: ERC20_ADDRESS,
    abi: ERC20Abi,
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('onLogs', logs);
      const logsData = logs.map((log) => ({
        from: log.args.from as string,
        to: log.args.to as string,
        value: formatUnits(log.args.value ?? BigInt(0), DECIMALS),
        txHash: log.transactionHash ?? '',
      }));
      setEventList((prev) => [...logsData, ...prev]);
      console.log('EventList', eventList, logsData);
    },
  });

  //   useEffect(() => {
  //     if (scrollRef.current) {
  //       console.log('scrollRef.current', scrollRef.current);
  //       scrollRef.current.scrollTop = 0;
  //     }
  //   }, [eventList]);

  return (
    <div>
      <h3 className="font-semibold mb-2">实时 Transfer 事件</h3>
      {/* ref={scrollRef} */}
      <div className="max-h-60 overflow-auto border rounded p-3 text-sm">
        {eventList.length === 0 ? (
          <p className="text-gray-500">暂无链上转账记录</p>
        ) : (
          eventList.map((item, idx) => (
            <div key={item.txHash || idx} className="mb-3 border-b pb-2">
              <p>From: {item.from}</p>
              <p>To: {item.to}</p>
              <p>
                Amount: {item.value} {TOKEN_SYMBOL}
              </p>
              <p>Hash: {item.txHash}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
