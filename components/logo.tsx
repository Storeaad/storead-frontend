"use client";

import Image from "next/image";

import logo from "@/public/storead_logo.svg";
import Link from "next/link";

function Logo() {
  return (
    <div className="w-[var(--logo-width)]">
      <Link href="/">
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
