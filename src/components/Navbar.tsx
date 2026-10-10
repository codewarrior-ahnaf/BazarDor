"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Category, Product } from "@/types";
import { getBanglaDate, toBnNum } from "@/lib/bangla";
import PriceTicker from "./PriceTicker";
import toast from "react-hot-toast";
import { User, LogOut, Edit3, ChevronDown } from "lucide-react";

interface NavbarProps {
  categories: Category[];
  tickerProducts?: Product[];
}

export default function Navbar({ categories, tickerProducts = [] }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending: isSessionPending, error: sessionError } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [banglaDate] = useState(() => getBanglaDate());

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে");
      setDropdownOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Bangla Date */}
          <Link href="/" className="flex flex-col group py-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">🛒</span>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-800 group-hover:text-emerald-700 transition-colors">
                বাজার দর
              </span>
            </div>
            <span className="text-[11px] sm:text-xs text-gray-700 font-medium tracking-wide mt-0.5">
              {banglaDate || "দৈনিক বাজার দরের হালনাগাদ তথ্য"}
            </span>
          </Link>

          {/* Right Side: Auth buttons or User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/40 transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs overflow-hidden">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={32}
                        height={32}
                        unoptimized
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      session.user.name?.charAt(0).toUpperCase() || "ব"
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p className="max-w-32 truncate text-xs font-semibold leading-tight text-gray-800 sm:max-w-36">
                        {toBnNum(session.user.name || "ব্যবহারকারী")}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-700 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw_-_1.5rem)] rounded-2xl border border-gray-100 bg-white py-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-xs text-gray-700">লগইন করা আছে</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {toBnNum(session.user.name)}
                      </p>
                      <p className="text-xs text-gray-700 truncate">
                        {session.user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-700" />
                      আমার প্রোফাইল
                    </Link>

                    <Link
                      href="/profile/update"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-gray-700" />
                      তথ্য পরিবর্তন করুন
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      সাইন আউট
                    </button>
                  </div>
                )}
              </div>
            ) : isSessionPending && !sessionError ? (
              <div
                aria-label="সেশন যাচাই হচ্ছে"
                className="h-9 w-36 animate-pulse rounded-xl bg-gray-100"
              />
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/signin"
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50/70 rounded-xl transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-all hover:shadow"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Second Row: Category Links */}
        <div className="border-t border-gray-100 py-2 sm:py-2.5 overflow-x-auto scrollbar-none">
          <nav className="flex items-center gap-1.5 sm:gap-2 min-w-max">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                pathname === "/"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-gray-600 hover:text-emerald-800 hover:bg-emerald-50/60"
              }`}
            >
              সব পণ্য
            </Link>

            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-emerald-700 text-white shadow-xs"
                      : "text-gray-600 hover:text-emerald-800 hover:bg-emerald-50/60"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{toBnNum(cat.nameBn)}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Marquee Ticker directly below Navbar */}
      {tickerProducts.length > 0 && <PriceTicker products={tickerProducts} />}
    </header>
  );
}
