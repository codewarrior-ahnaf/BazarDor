# 🛒 বাজার দর (BazarDor) - নিত্যপণ্যের দৈনিক বাজারদর প্ল্যাটফর্ম

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-Enabled-emerald?style=for-the-badge)](https://better-auth.com/)

**বাজার দর (BazarDor)** হলো একটি আধুনিক, নির্ভরযোগ্য এবং সম্পূর্ণ রেসপনসিভ নিত্যপ্রয়োজনীয় পণ্যের বাজারদর মনিটরিং ওয়েব অ্যাপ্লিকেশন। এর মাধ্যমে ব্যবহারকারীরা প্রতিদিনের চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ এবং মসলার নির্ভরযোগ্য বাজারমূল্য, মূল্যের হ্রাস-বৃদ্ধি এবং দেশের প্রধান পাইকারি ও খুচরা বাজারসমূহের তুলনামূলক বিশ্লেষণ এক নজরে জানতে পারেন।

---

## 🌟 মূল বৈশিষ্ট্যসমূহ (Key Features)

1. **রিয়েল-টাইম প্রাইস টিকার (Live Price Ticker Marquee):**  
   ওয়েবসাইটের শীর্ষে স্বয়ংক্রিয়ভাবে চলমান ইনফিনিট মারকুই স্ট্রিপ, যেখানে প্রতিটি পণ্যের আইকন, নাম, একক প্রতি আজকের দাম এবং মূল্য বৃদ্ধির/হ্রাসের শতকরা হার (▲ ২.১% / ▼ ১.৫%) প্রদর্শিত হয়। মাউস হভার করলে টিকারটি থেমে যায়।

2. **উন্নত ক্যাটাগরি ও সংখ্যাভিত্তিক সর্টিং (Challenge C1):**  
   ক্যাটাগরি পেজে যেকোনো ক্যাটাগরির (চাল, ডাল, তেল, সবজি ইত্যাদি) পণ্যসমূহ ব্রাউজ করার পাশাপাশি **সাজান:** ড্রপডাউন (ডিফল্ট, দাম: কম থেকে বেশি, দাম: বেশি থেকে কম) ব্যবহার করে পণ্য সাজানো যায়। এটি নিখুঁত সংখ্যাগত মানের ওপর ভিত্তি করে সাজানো নিশ্চিত করে।

3. **শীর্ষ দর পরিবর্তন সেকশন (Top Risers & Fallers):**  
   হোম পেজে আজকের সবচেয়ে বেশি দাম বৃদ্ধি পাওয়া শীর্ষ ৬টি পণ্য (“আজ দাম বেড়েছে ▲”) এবং সবচেয়ে বেশি দাম কমা শীর্ষ ৬টি পণ্য (“আজ দাম কমেছে ▼”) আলাদা হাইলাইট সেকশনে প্রদর্শিত হয়।

4. **বাজারভিত্তিক তুলনামূলক বিশ্লেষণ ও সুরক্ষিত রাউট (Protected Details Page):**  
   পণ্যের বিস্তারিত পেজটি (`/product/[slug]`) অথেন্টিকেশন দ্বারা সুরক্ষিত। লগইন করা ব্যবহারকারীরা পণ্যের আজকের জাতীয় গড় দর, সর্বনিম্ন দর, সর্বোচ্চ দর এবং রাজধানী ঢাকাসহ সারাদেশের বিভিন্ন পাইকারি ও খুচরা বাজারের বিস্তারিত তুলনামূলক তালিকা দেখতে পারেন। অননুমোদিত ব্যবহারকারীদের স্বয়ংক্রিয় টোস্ট সতর্কতাসহ লগইন পেজে রিডাইরেক্ট করা হয়।

5. **প্রোফাইল ও তথ্য আপডেট ফিচার (Challenge C3):**  
   ব্যবহারকারী লগইন করার পর প্রোফাইল মেনু ও প্রোফাইল পেজ (`/profile`) অ্যাক্সেস করতে পারেন। Challenge C3 অনুসারে, প্রোফাইল পেজের "তথ্য পরিবর্তন" বাটনে ক্লিক করে ডেডিকেটেড রুটে (`/profile/update`) গিয়ে ব্যবহারকারী তার নাম হালনাগাদ (Update Information) করতে পারেন, যা BetterAuth-এর `updateUser` API দ্বারা পরিচালিত।

6. **সম্পূর্ণ বাংলা লোকালাইজেশন ও রেসপনসিভ ডিজাইন:**  
   সমস্ত মূল্য, শতকরা হার এবং তারিখ বাংলা সংখ্যায় (যেমন: ১৪৮ টাকা, ১,৮৫০ টাকা) প্রদর্শিত। মোবাইল, ট্যাবলেট এবং ডেস্কটপ সব ডিভাইসে ফ্লুইড রেসপনসিভ লেআউট।

7. **কাস্টম ফ্রেন্ডলি ৪০৪ ও লোডিং কঙ্কাল (Loading Skeleton):**  
   যেকোনো ভুল রাউট বা অনুপস্থিত পণ্যের জন্য ফ্রেন্ডলি ৪০৪ পেজ এবং ডেটা ফেচিংয়ের সময়ে মসৃণ স্কেলিটন অ্যানিমেশন।

---

## 🛠️ ব্যবহৃত প্রযুক্তিসমূহ (Technologies Used)

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components & Client Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [BetterAuth](https://better-auth.com/) (Email/Password, Google & GitHub Social Login, User Update)
- **Database:** SQLite (Better-SQLite3)
- **Notification / Feedback:** [react-hot-toast](https://react-hot-toast.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📡 এপিআই অ্যান্ডপয়েন্টসমূহ (API Endpoints)

- **Base URL 1:** `https://api.api-store.workers.dev/api/bazardor`
- **Base URL 2 (Alternative):** `https://api.abcz.workers.dev/api/bazardor`

| মেথড | অ্যান্ডপয়েন্ট | বিবরণ |
|------|-------------|-------|
| `GET` | `/categories` | সকল ক্যাটাগরির তালিকা |
| `GET` | `/categories/:slug` | নির্দিষ্ট একটি ক্যাটাগরির তথ্য |
| `GET` | `/products` | সকল পণ্যের তালিকা |
| `GET` | `/products?category=:slug` | নির্দিষ্ট ক্যাটাগরির পণ্য ফিল্টার |
| `GET` | `/products/:id` | নির্দিষ্ট একটি পণ্যের বিশদ বাজারদর |

> *সিস্টেমটি দুটি API অ্যান্ডপয়েন্ট ছাড়াও স্বয়ংক্রিয় ফলব্যাক ক্যাশ ধারণ করে, ফলে যেকোনো সার্ভার সমস্যাতেও অ্যাপ নিরবচ্ছিন্নভাবে চালু থাকে।*

---

## 🚀 লোকাল সেটআপ ও ইনস্টলেশন (Getting Started)

### ১. ক্লোন ও নির্ভরতাসমূহ ইনস্টল করুন:
```bash
git clone <repository-url>
cd BazarDor
npm install
```

### ২. এনভায়রনমেন্ট ভেরিয়েবল সেটআপ:
`.env.local` ফাইলে নিচের কনফিগারেশন যোগ করুন:
```env
BETTER_AUTH_SECRET=bazardor-super-secret-key-at-least-32-chars-long-2026
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### ৩. ডেভেলপমেন্ট সার্ভার চালু করুন:
```bash
npm run dev
```
ব্রাউজারে [http://localhost:3000](http://localhost:3000) ওপেন করুন।

### ৪. প্রোডাকশন বিল্ড তৈরি করুন:
```bash
npm run build
npm start
```

---

## 🧪 ডেমো অ্যাকাউন্ট (পরীক্ষার সুবিধার জন্য)
লগইন পেজে এক ক্লিকেই পূরণ করার জন্য **"ডেমো ক্রেডেনশিয়াল পূরণ করুন"** বাটন রয়েছে:
- **ইমেইল:** `demo@bazardor.com`
- **পাসওয়ার্ড:** `bazardor123`

---

## 📄 লাইসেন্স (License)
প্রকল্পটি MIT লাইসেন্সের অধীনে উন্মুক্ত।
