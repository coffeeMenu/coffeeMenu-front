import { pb } from '@/modules/pocketbase';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [showList, setShowList] = useState<any>();
  const loadList = () => {
    pb.collection('stores')
      .getList(1, 50)
      .then((res) => {
        setShowList(res.items);
      });
  };
  return (
    <>
      <Head>
        <title>coffeeMenu</title>
        {/* TODO: dynamic */}
        <meta name="description" content="coffeeMenu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />\
        {/* TODO: dynamic */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-center items-center h-screen">
        <h1>Hi there</h1>
        <h2>Welcome to coffeeMenu</h2>
        <button
          className="p-4 mt-2 w-1/6 text-white bg-blue-500 rounded-full"
          onClick={() => {
            return showList === undefined ? loadList() : setShowList(undefined);
          }}
        >
          {showList ? 'hide' : 'showcase'}
        </button>
        {showList &&
          showList !== undefined &&
          showList.map((item: any) => {
            return (
              <Link key={item.id} href={item.username}>
                {item.name}{' '}
                <span className="text-gray-400">(@{item.username})</span>
              </Link>
            );
          })}
      </main>
    </>
  );
}
