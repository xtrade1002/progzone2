import React from "react";
import { Link } from "@inertiajs/react";
import route from "@/route";

export default function MainMenu() {
  return (
    <nav className="bg-[#232323] py-4">
      <ul className="flex justify-center space-x-8 text-[#FF007A] text-lg font-semibold">
        <li>
          <Link href={route("home")} className="hover:underline">
            Főoldal
          </Link>
        </li>
        <li>
          <Link href={route("aboutme")} className="hover:underline">
            Rólam
          </Link>
        </li>
        <li>
          <Link href={route("services")} className="hover:underline">
            Szolgáltatások
          </Link>
        </li>
        <li>
          <Link href={route("prices")} className="hover:underline">
            Árak
          </Link>
        </li>
        <li>
          <Link href={route("references")} className="hover:underline">
            Referencia
          </Link>
        </li>
        <li>
          <Link href={route("studies")} className="hover:underline">
            Studies
          </Link>
        </li>
        <li>
          <Link href={route("contact")} className="hover:underline">
            Kapcsolat
          </Link>
        </li>
      </ul>
    </nav>
  );
}
