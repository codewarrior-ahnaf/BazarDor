import React from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailsClient from "./ProductDetailsClient";
import { getCategories, getProductBySlugOrId, getProducts } from "@/lib/api";
import { auth, connectMongo } from "@/lib/auth";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  await connectMongo();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/signin?redirect=${encodeURIComponent(`/product/${slug}`)}`);

  const [categories, product, allProducts] = await Promise.all([
    getCategories(),
    getProductBySlugOrId(slug),
    getProducts(),
  ]);

  if (!product) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-[#f7faf7]">
      <Navbar categories={categories} tickerProducts={allProducts} />
      <main className="flex-1">
        <ProductDetailsClient product={product} />
      </main>
      <Footer />
    </div>
  );
}
