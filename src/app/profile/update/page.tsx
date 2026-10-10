"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, ArrowLeft, Loader2, CheckCircle2, Camera, X } from "lucide-react";

interface UpdateFormProps {
  initialName: string;
  initialImage: string | null;
  email: string;
}

function UpdateForm({ initialName, initialImage, email }: UpdateFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [avatarImage, setAvatarImage] = useState<string | null>(initialImage);
  const [imageChanged, setImageChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("একটি ছবির ফাইল নির্বাচন করুন");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("ছবির ফাইল ৫ MB-এর কম হতে হবে");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 256;
      const scale = Math.min(size / image.width, size / image.height);
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(imageUrl);
        toast.error("ছবিটি প্রস্তুত করা যায়নি");
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      setAvatarImage(canvas.toDataURL("image/jpeg", 0.82));
      setImageChanged(true);
      URL.revokeObjectURL(imageUrl);
    };
    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      toast.error("ছবিটি খোলা যায়নি");
    };
    image.src = imageUrl;
  };

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
        ...(imageChanged ? { image: avatarImage } : {}),
      });

      if (res?.error) {
        const errorText = res.error.message || "তথ্য আপডেট করা যায়নি";
        setErrorMessage(errorText);
        toast.error(errorText);
      } else {
        toast.success("প্রোফাইলের তথ্য সফলভাবে পরিবর্তন করা হয়েছে!");
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
          আপনার নাম ও প্রোফাইল ছবি হালনাগাদ করুন
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-700 font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center gap-3 pb-2">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-emerald-50 bg-emerald-700 text-3xl font-bold text-white shadow-sm flex items-center justify-center">
            {avatarImage ? (
              <Image src={avatarImage} alt="প্রোফাইল ছবির প্রিভিউ" width={96} height={96} unoptimized className="h-full w-full object-cover" />
            ) : (
              name.trim().charAt(0).toUpperCase() || <User className="h-9 w-9" />
            )}
          </div>
          <p className="text-xs font-medium text-gray-600">
            নিজের ছবি যোগ করতে নিচের বাটনে চাপ দিন
          </p>
          <div className="flex items-center gap-2">
            <label
              htmlFor="profile-image"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
            >
              <Camera className="h-4 w-4" />
              ছবি যোগ / পরিবর্তন
            </label>
            {avatarImage && (
              <button
                type="button"
                onClick={() => {
                  setAvatarImage(null);
                  setImageChanged(true);
                }}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50"
              >
                <X className="h-4 w-4" />
                সরান
              </button>
            )}
          </div>
          <input id="profile-image" type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />
          <p className="text-center text-[11px] text-gray-500">সর্বোচ্চ ৫ MB; ছবিটি স্বয়ংক্রিয়ভাবে ছোট করা হবে</p>
        </div>

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
          initialImage={session.user.image || null}
          email={session.user.email || ""}
        />
      </div>
    </div>
  );
}

