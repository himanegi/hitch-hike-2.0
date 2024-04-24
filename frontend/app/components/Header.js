"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import styles from "../Header.module.css"; // Import the CSS module
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
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
  const handleSignOut = () => {
    router.push();
  };

  return (
    <div className="p-0.5 pb-0.5 pl-10 pr-10 border-b-[2px] border-black flex items-center justify-between">
      <div className="flex gap-20 items-center">
        <Image src={"/carpool.svg"} height={70} width={70} alt="Logo" />
        <div className="flex gap-6 items-center">
          {headerMenu.map((item) => (
            <Link href={item.path} key={item.id}>
              <div className={styles.headerItem}>
                <Image src={item.icon} height={20} width={20} alt={item.name} />
                <h2 className="text-[14px] font-medium">{item.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <UserButton onSignOut={handleSignOut} />
    </div>
  );
}

export default Header;
