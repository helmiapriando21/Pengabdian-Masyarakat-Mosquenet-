import Link from "next/link";

export const metadata = {
  title: "Page Not Found | "+process.env.NEXT_PUBLIC_APP_NAME
}

export default function NotFound() {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden items-center justify-center gap-4 bg-yellow-600 text-white">
      <h1 className="font-bold text-5xl">404 - Halaman tidak ditemukan</h1>
      <p className="text-xl">Maaf, halaman yang anda cari tidak ditemukan</p>
      <Link href="/" className="text-blue-700 underline">Kembali ke halaman utama</Link>
    </div>
  );
}