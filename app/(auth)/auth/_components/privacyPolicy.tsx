export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto flex flex-col overflow-scroll">
      <h1 className="text-2xl font-bold mb-4">Kebijakan Privasi {process.env.NEXT_PUBLIC_APP_NAME}</h1>
      <p className="mb-4">
        Selamat datang di {process.env.NEXT_PUBLIC_APP_NAME}. Kami berkomitmen untuk melindungi
        privasi Anda dan menjaga keamanan data yang Anda berikan.
      </p>
      <h2 className="text-xl font-semibold mt-4">1. Informasi yang Kami Kumpulkan</h2>
      <ul className="list-disc ml-6">
        <li>Email dan nomor telepon untuk keperluan login.</li>
        <li>Password yang telah dienkripsi untuk keamanan.</li>
        <li>Data keuangan masjid dari donasi online atau pendataan manual.</li>
        <li>Pendataan aset masjid.</li>
        <li>Informasi kegiatan, termasuk video dokumentasi, gambar, dan dokumen acara.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-4">2. Penggunaan Data</h2>
      <ul className="list-disc ml-6">
        <li>Data hanya digunakan untuk keperluan administrasi masjid.</li>
        <li>Hanya pengurus yang berwenang dapat mengakses data keuangan dan aset.</li>
        <li>Data tidak akan dibagikan kepada pihak ketiga tanpa izin.</li>
        <li>Data yang diberikan (email) akan digunakan untuk memberikan notifikasi kegiatan atau artikel yang dikirim oleh masjid domisili yang terdaftar dan berkaitan dengan email bersangkutan.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-4">3. Keamanan Data</h2>
      <ul className="list-disc ml-6">
        <li>Password disimpan dalam bentuk terenkripsi.</li>
        <li>Sistem menggunakan protokol keamanan untuk melindungi data pengguna.</li>
        <li>Akses dibatasi berdasarkan status pengguna (pengurus atau jamaah).</li>
      </ul>
      <h2 className="text-xl font-semibold mt-4">4. Hak Pengguna</h2>
      <ul className="list-disc ml-6">
        <li>Pengguna dapat memperbarui atau menghapus data pribadi mereka.</li>
        <li>Pengguna dapat meminta informasi terkait data yang disimpan.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-4">5. Perubahan Kebijakan</h2>
      <p>
        Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan akan diinformasikan melalui
        website ini.
      </p>
      <p className="mt-6">Jika ada pertanyaan lebih lanjut, silakan hubungi kami.</p>
    </div>
  );
}