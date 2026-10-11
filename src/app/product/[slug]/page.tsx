import React from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailsClient from "./ProductDetailsClient";
import { getCategories, getProductBySlugOrId, getProducts } from "@/lib/api";
import { getAuth, connectMongo } from "@/lib/auth";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlugOrId(slug);
  if (!product) notFound();

  await connectMongo();
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session) {
    redirect(
      `/signin?redirect=${encodeURIComponent(`/product/${slug}`)}&reason=auth-required`,
    );
  }

  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f7faf7]">
      <Navbar categories={categories} tickerProducts={allProducts} initialAuthenticated />
      <main className="flex-1">
        <ProductDetailsClient product={product} />
      </main>
      <Footer />
    </div>
  );
}
