"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  User as UserIcon,
  Calendar,
  Edit3,
  LogOut,
  ArrowLeft,
  ShieldCheck,
  Loader2,
  Camera,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে লগইন করুন");
      router.replace("/signin?redirect=/profile");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট সম্পন্ন করা যায়নি");
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f7faf7] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-700" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f7faf7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Navigation back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          হোম পেজে ফিরে যান
        </Link>

        {/* Profile Card matching Figma */}
        <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-700 text-white flex items-center justify-center text-3xl font-extrabold shadow-sm overflow-hidden border-4 border-emerald-50">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={96}
                    height={96}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                ) : (
                  session.user.name?.charAt(0).toUpperCase() || "ব"
                )}
              </div>
              <Link
                href="/profile/update"
                aria-label="প্রোফাইল ছবি যোগ বা পরিবর্তন করুন"
                title="প্রোফাইল ছবি যোগ বা পরিবর্তন করুন"
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-700 text-white shadow-md transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {session.user.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  সক্রিয় সদস্য
                </span>
              </div>
            </div>
          </div>

          {/* User Details Details Box */}
          <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 space-y-3.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
              <span className="text-gray-500 font-medium flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-gray-400" />
                পূর্ণ নাম
              </span>
              <span className="font-bold text-gray-900">{session.user.name}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-500 font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                অ্যাকাউন্ট স্ট্যাটাস
              </span>
              <span className="font-semibold text-emerald-700">ভেরিফাইড ইউজার</span>
            </div>
          </div>

          {/* Action Buttons: Challenge C3 update button */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/profile/update"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>তথ্য পরিবর্তন করুন</span>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>সাইন আউট</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
