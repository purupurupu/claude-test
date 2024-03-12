import Link from "next/link";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout title="404 - Not Found">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-4">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link href="/">
          <a className="text-blue-500 hover:underline">
            Go back to the homepage
          </a>
        </Link>
      </div>
    </Layout>
  );
}
