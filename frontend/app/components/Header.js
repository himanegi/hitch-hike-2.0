"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../Header.module.css";

function Header() {
  const headerMenu = [
    {
      id: 1,
      name: "Search",
      icon: "/magnifier.svg",
      path: "/search",
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
    <div className="pl-10 pr-10 flex items-center justify-between">
      <div className="flex gap-20 items-center">
        <Link href={"/"}>
          <Image src={"/map.svg"} height={70} width={70} alt="Logo" />
        </Link>
        <div className="flex gap-10 items-center">
          {headerMenu.map((item) => (
            <Link href={item.path} key={item.id}>
              <div className={styles.headerItem}>
                <Image src={item.icon} height={30} width={30} alt={item.name} />
                <h2 className="text-[15px] font-medium ml-1">{item.name}</h2>
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
