import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-8">
      <h1 className="text-xl text-error p-4 bg-neutral font-bold mt-[64px]">PAGE NOT FOUND :/</h1>
      <Link href="/" className='btn ccButtonMain'>Back To Homepage</Link>
    </div>
  );
}
