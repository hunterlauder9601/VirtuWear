import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <h1 className="mt-[64px] bg-neutral p-4 text-xl font-bold text-error">
        PAGE NOT FOUND :/
      </h1>
      <Link href="/" className="ccButtonMain btn">
        Back To Homepage
      </Link>
    </div>
  );
}
