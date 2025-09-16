import React from "react";
import { Link } from "@inertiajs/react";
import route from "@/route";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-6 mt-12">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <p className="mb-4 sm:mb-0">
          &copy; {new Date().getFullYear()} Progzone. All rights reserved.
        </p>
        <div className="flex space-x-6">
          
          <Link href={route("privacy")} className="hover:text-pink-400">
            Adatvédelmi szerződés
          </Link>
          <Link href={route("terms")} className="hover:text-pink-400">
            ÁSZF
          </Link>
          <Link href={route("impressum")} className="hover:text-pink-400">
            Impresszum
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
