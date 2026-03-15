import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="rounded-xl bg-white p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">payment successful!</h1>

        <p className="text-gray-600 mb-6">
          your purchase has been completed.
        </p>

        <Link
          href="/"
          className="inline-block rounded-md bg-black px-5 py-2 text-white hover:bg-gray-800 transition"
        >
        back to home
        </Link>
      </div>
    </div>
  );
}