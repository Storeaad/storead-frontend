"use client";

import Image from "next/image";

import logo from "@/public/storead_logo.svg";

function Logo() {
  return (
    <div className="w-[var(--logo-width)]">
      <a href="/">
        <Image
          src={logo}
          alt="storead logo"
          className="object-cover"
          priority
        />
      </a>
    </div>
  );
}

export default Logo;
