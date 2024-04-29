"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import styles from "../Header.module.css";

function Header() {
  const headerMenu = [
    {
      id: 1,
      name: "Search",
      icon: "/magnifier.svg",
      path: "/",
    },
    {
      id: 2,
      name: "Share",
      icon: "/share.svg",
      path: "/share",
    },
    {
      id: 3,
      name: "Trips",
      icon: "/ride.svg",
      path: "/trips",
    },
  ];

  return (
    <div className="pl-10 pr-10 border-b-[2px] border-black flex items-center justify-between">
      <div className="flex gap-20 items-center">
        <Link href={"/"}>
          <Image src={"/carpool.svg"} height={70} width={70} alt="Logo" />
        </Link>
        <div className="flex gap-10 items-center">
          {headerMenu.map((item) => (
            <Link href={item.path} key={item.id}>
              <div className={styles.headerItem}>
                <Image src={item.icon} height={20} width={20} alt={item.name} />
                <h2 className="text-[15px] font-thin ml-1">{item.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <UserButton />
    </div>
  );
}

export default Header;
