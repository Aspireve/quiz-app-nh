"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchToppers } from "@/functions/fetchToppers";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [toppers, setToppers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchToppers().then((data) => {
      if (data) {
        setToppers(data);
      }
    });
  }, []);
  return (
    <div className="relative w-[80%] md:w-full max-w-[30rem]  m-auto h-full min-h-[100dvh] mt-7">
      <div
        onClick={() => router.back()}
        className="cursor-pointer absolute top-0 left-0  bg-gray-400 h-10 w-10 flex items-center justify-center rounded-full shadow-lg"
      >
        <Image
          src="/right-arrow.png"
          height={15}
          width={15}
          alt="nirmaanhyperloop.com"
          className="rotate-180"
        />
      </div>
      <h1 className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent font-semibold text-3xl text-center">
        LEADERBOARD
      </h1>
      <p className="text-white text-center">Top 10 Winners</p>
      <Link
        href="https://nirmaanhyperloop.com"
        className="mt-7 flex flex-row gap-4 justify-between items-center px-4 py-2 backdrop-blur-md mb-4 bg-white/10 shadow-lg rounded-md cursor-pointer"
      >
        <Image
          src="https://www.nirmaanhyperloop.com/cdn/logo.png"
          height={50}
          width={50}
          alt="Nirmaan Hyperloop Logo"
        />
        <div className="w-full">
          <h1 className="text-gray-300 text-sm">To learn more</h1>
          <h3 className="text-white">Visit nirmaanhyperloop.com</h3>
        </div>
        <div className="bg-white h-10 w-20 flex items-center justify-center rounded-full shadow-lg group">
          <Image
            src="/right-arrow.png"
            height={15}
            width={15}
            alt="nirmaanhyperloop.com"
            className="transition-all duration-300 group-hover:-rotate-45"
          />
        </div>
      </Link>
      {/* Three Rankers */}
      <div className="flex flex-row gap-4 justify-around items-end mt-7">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
        >
          <div className="relative w-fit h-fit">
            <Avatar className="h-20 w-20 border-4 border-white">
              <AvatarImage
                src={
                  toppers?.[1]?.photoURL || "https://github.com/Aspireve.png"
                }
              />
              <AvatarFallback>{toppers?.[1]?.displayName}</AvatarFallback>
            </Avatar>
            <div className="shadow-lg h-10 w-10 text-sm font-semibold bg-[#acee5e] p-2 flex items-center rounded-full justify-center absolute bottom-0 right-1/2 translate-y-1/2 translate-x-1/2">
              2<sup>nd</sup>
            </div>
          </div>
          <h4 className="mt-7 text-white text-center">
            {(toppers?.[1]?.displayName || "NA").split(" ")[0]}
          </h4>
          <h4 className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent font-bold text-2xl text-center">
            {toppers?.[1]?.points || 0}
          </h4>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
        >
          <div className="relative w-fit h-fit">
            <Avatar className="h-28 w-28 border-4 border-white">
              <AvatarImage
                src={
                  toppers?.[0]?.photoURL || "https://github.com/Aspireve.png"
                }
              />
              <AvatarFallback>{toppers?.[0]?.displayName}</AvatarFallback>
            </Avatar>
            <div className="shadow-lg h-10 w-10 font-semibold bg-[#f5cc50] p-2 flex items-center rounded-full justify-center absolute bottom-0 right-1/2 translate-y-1/2 translate-x-1/2">
              1<sup>st</sup>
            </div>
          </div>
          <h4 className="mt-7 text-white text-center">
            {toppers?.[0]?.displayName.split(" ")[0]}
          </h4>
          <h4 className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent font-bold text-2xl text-center">
            {toppers?.[0]?.points}
          </h4>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 80 }}
        >
          <div className="relative w-fit h-fit">
            <Avatar className="h-20 w-20 border-4 border-white">
              <AvatarImage
                src={
                  toppers?.[2]?.photoURL || "https://github.com/Aspireve.png"
                }
              />
              <AvatarFallback>{toppers?.[2]?.displayName}</AvatarFallback>
            </Avatar>
            <div className="shadow-lg h-10 w-10  text-sm font-semibold bg-[#d5b3ff] p-2 flex items-center rounded-full justify-center absolute bottom-0 right-1/2 translate-y-1/2 translate-x-1/2">
              3<sup>rd</sup>
            </div>
          </div>
          <h4 className="mt-7 text-white text-center">
            {(toppers?.[2]?.displayName || "NA").split(" ")[0]}
          </h4>
          <h4 className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent font-bold text-2xl text-center">
            {toppers?.[2]?.points || 0}
          </h4>
        </motion.div>
      </div>
      <div className="w-full mt-7">
        {toppers?.slice(3)?.map((user, index) => (
          <motion.div
            key={index}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.7 + index * 0.1,
              type: "spring",
              stiffness: 50,
            }}
            className="flex flex-row gap-4 justify-between items-center px-4 py-2 backdrop-blur-md mb-4 bg-white/10 shadow-lg rounded-md"
          >
            <div className="flex flex-row gap-4 text-white items-center">
              <p>{index + 4}</p>
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage
                  src={user.photoURL || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{user.displayName.split(" ")[0]}</p>
            </div>
            <p className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">
              {user.points}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Page;
