import './globals.css'

export default function NotFound() {
  return (
    <html>
      <body className="bg-yellow-600">
        <div className="flex flex-col w-screen h-screen overflow-hidden items-center justify-center gap-4">
          <h1 className="font-bold text-5xl">404 - Halaman tidak ditemukan</h1>
          <p className="text-xl">Maaf, halaman yang anda cari tidak ditemukan</p>
          <a href="/">Kembali ke halaman utama</a>
        </div>
      </body>
    </html>
  );
}