import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogListing } from "@/components/sections/BlogListing";
import { getAllPostMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — John K. Johansen",
  description:
    "Practical insights on integrating autonomous AI agents into startup technical strategy — without handing your IP to cloud providers. 40+ years of engineering perspective on the AI transition.",
  openGraph: {
    title: "Blog — John K. Johansen",
    description:
      "Practical insights on integrating autonomous AI agents into startup technical strategy — without handing your IP to cloud providers.",
    url: "https://johnkjohansen.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPostMeta();
  return (
    <>
      <Header />
      <main className="pt-24">
        <BlogListing posts={posts} />
      </main>
      <Footer />
    </>
  );
}
