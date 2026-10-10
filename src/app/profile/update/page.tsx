"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

interface UpdateFormProps {
  initialName: string;
  email: string;
}

function UpdateForm({ initialName, email }: UpdateFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      const msg = "অনুগ্রহ করে আপনার নাম লিখুন";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      // Calling BetterAuth updateUser method according to documentation
      const res = await updateUser({
        name: name.trim(),
      });

      if (res?.error) {
        const errorText = res.error.message || "তথ্য আপডেট করা যায়নি";
        setErrorMessage(errorText);
        toast.error(errorText);
      } else {
        toast.success("নাম সফলভাবে পরিবর্তন করা হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch (err: unknown) {
      const errObj = err as { message?: string };
      const msg = errObj?.message || "তথ্য আপডেট সম্পন্ন করা সম্ভব হয়নি";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          তথ্য পরিবর্তন করুন
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          আপনার প্রোফাইলের নাম হালনাগাদ করতে নিচের ফর্মটি ব্যবহার করুন
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-700 font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1"
          >
            নতুন নাম (Name)
          </label>
          <div className="relative rounded-xl shadow-2xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <User className="w-4 h-4" />
            </div>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="block w-full pl-10 pr-3.5 py-2.5 sm:py-3 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
            ইমেইল ঠিকানা (Email)
          </label>
          <input
            type="email"
            disabled
            value={email}
            className="block w-full px-3.5 py-2.5 sm:py-3 border border-gray-100 bg-gray-50 rounded-xl text-xs sm:text-sm text-gray-500 cursor-not-allowed"
          />
          <p className="text-[11px] text-gray-400 mt-1">
            ইমেইল পরিবর্তন বর্তমানে সংরক্ষিত রয়েছে
          </p>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-xs hover:shadow transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>আপডেট হচ্ছে...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Update Information (তথ্য আপডেট করুন)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("তথ্য পরিবর্তন করতে অনুগ্রহ করে লগইন করুন");
      router.replace("/signin?redirect=/profile/update");
    }
  }, [session, isPending, router]);

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
      <div className="max-w-md mx-auto space-y-6">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          প্রোফাইলে ফিরে যান
        </Link>

        <UpdateForm
          initialName={session.user.name || ""}
          email={session.user.email || ""}
        />
      </div>
    </div>
  );
}

