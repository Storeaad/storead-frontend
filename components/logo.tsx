"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "@/public/storead_logo.svg";
import { useLoginModalStore } from "@/store/login-modal-store";

function Logo() {
  const { close } = useLoginModalStore();
  
  return (
    <div className="w-[var(--logo-width)]">
      <Link href="/" onClick={() => close()}>
        <Image
          src={logo}
          alt="storead logo"
          className="object-cover"
          priority
        />
      </Link>
    </div>
  );
}

export default Logo;
