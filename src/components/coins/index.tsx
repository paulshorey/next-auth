'use client';

// import Link from 'next/link';
import Coins from '@/src/components/coins/Coins';

export default function CryptoResultsTemplate({ coins, options }: any) {
  return (
    <div>
      <div className="flex justify-between py-3 px-4 mx-[1.44rem] border-t border-b border-stone-600">
        Options...
        {!!options.prevPageToken && (
          <a href={`?pageToken=${options.prevPageToken}`}>Previous page </a>
        )}
        {!!options.nextPageToken && <a href={`?pageToken=${options.nextPageToken}`}>Next page</a>}
      </div>
      <div className="flex my-6 w-full">
        <div className="pl-[1.44rem] inline-block">
          <Coins coins={coins} options={options} />
        </div>
        <div className="pl-[1.44rem]">Organize your Crypto playlists...</div>
      </div>
    </div>
  );
}
