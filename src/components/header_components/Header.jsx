import React from "react";
import { GiPawPrint } from "react-icons/gi";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-6"
    >
      <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-300 via-red-300 to-pink-300 shadow-md dark:from-yellow-600 dark:via-pink-600 dark:to-purple-600">
        <GiPawPrint className="text-3xl text-red-600 dark:text-yellow-300 animate-bounce" />
        <h1 className="text-3xl font-extrabold text-red-700 dark:text-yellow-200 tracking-wide">
          포켓몬 도감
        </h1>
        <GiPawPrint className="text-3xl text-red-600 dark:text-yellow-300 animate-bounce" />
      </div>
    </motion.header>
  );
};

export default Header;
