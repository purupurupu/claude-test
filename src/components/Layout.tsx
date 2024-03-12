import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function Layout({ title, children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
