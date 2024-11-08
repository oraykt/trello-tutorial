import { textFont } from "@/app/(marketing)/page";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div
        className={cn(
          "hover:opacity-75 transition items-center gap-x-2 hidden md:flex",
          textFont.className
        )}
      >
        <Image src="/logo.svg" alt="logo" height={30} width={30} />
        <p className="text-lg text-netural-700 pb-1">Taskify</p>
      </div>
    </Link>
  );
};
