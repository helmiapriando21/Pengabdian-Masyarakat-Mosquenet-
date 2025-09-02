# 📘 Next.js App

Aplikasi ini dibangun menggunakan [Next.js](https://nextjs.org/) sebagai framework React modern untuk pengembangan web dengan dukungan **SSR (Server-Side Rendering)**, **SSG (Static Site Generation)**, dan **API Routes**.

---

## 🚀 Fitur Utama

- ⚡️ Fast Refresh untuk pengembangan cepat
- 📦 Routing berbasis file (Pages / App Router)
- 🔒 API Routes bawaan Next.js
- 🎨 Styled dengan Tailwind CSS (opsional, kalau kamu pakai)
- 📊 Integrasi dengan Chart.js / react-chartjs-2 (opsional, kalau ada)

---

## 📂 Struktur Folder

```
.
├── public/             # Asset statis
├── src/ atau pages/    # Halaman Next.js
│   ├── index.tsx       # Halaman utama
│   ├── api/            # API Routes
├── components/         # Reusable components
├── styles/             # Global CSS / Tailwind
├── package.json
└── next.config.js
```

---

## 🛠️ Instalasi & Menjalankan

1. **Clone repo**

   ```bash
   git clone https://github.com/helmiapriando21/Pengabdian-Masyarakat-Mosquenet-.git frontend
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Jalankan development server**

   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000) di browser.

4. **Build untuk production**

   ```bash
   npm run build
   npm start
   ```

---

## ⚙️ Script yang tersedia

Di dalam `package.json`:

- `dev` → Menjalankan Next.js development mode
- `build` → Build aplikasi untuk production
- `start` → Menjalankan hasil build production
- `lint` → Menjalankan linter (ESLint)

---

## 📦 Dependencies utama

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) (opsional)
- [Tailwind CSS](https://tailwindcss.com/) (opsional)
- [react-chartjs-2](https://react-chartjs-2.js.org/) + [Chart.js](https://www.chartjs.org/) (opsional)

---
