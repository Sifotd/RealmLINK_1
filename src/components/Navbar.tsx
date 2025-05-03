'use client';

import Link from "next/link";
<<<<<<< HEAD
import { ConnectButton } from "@mysten/dapp-kit";
import { WalletProvider } from "@mysten/dapp-kit";
=======
import { CustomConnectWallet } from "./ConnectWallet";

>>>>>>> 3a1b6d60c57c07fcce4f4a01a68a829de3af5b63
export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="/">首页</Link></li>
            <li><Link href="/events">浏览活动</Link></li>
            <li><Link href="/events/create">创建活动</Link></li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">门票销售平台</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/">首页</Link></li>
          <li><Link href="/events">浏览活动</Link></li>
          <li><Link href="/events/create">创建活动</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
<<<<<<< HEAD
        <button className="btn btn-primary">
          连接钱包
          <ConnectButton/>

        </button>
=======
        <CustomConnectWallet />
>>>>>>> 3a1b6d60c57c07fcce4f4a01a68a829de3af5b63
      </div>
    </div>
  );
} 