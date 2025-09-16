const DASHBOARD_CONTENT = {
  FEATURE_LIST: [
    {
      title: "Dashboard",
      url: "/dashboard/main",
    },
    {
      title: "Manajemen Sistem",
      url: "/dashboard/system",
      submenus: [
        {
          title: "Manajemen Akun",
          url: "/dashboard/system/account",
        },
        { title: "Pengaturan", url: "/dashboard/system/configuration" },
      ],
    },
    {
      title: "Manajemen Keuangan",
      url: "/dashboard/keuangan",
      submenus: [
        {
          title: "Manajemen Pemasukan",
          url: "/dashboard/keuangan/pemasukan",
        },
        {
          title: "Manajemen Pengeluaran",
          url: "/dashboard/keuangan/pengeluaran",
        },
        { title: "Laporan Keuangan", url: "/dashboard/keuangan/laporan" },
        {
          title: "List Rekening Bank",
          url: "/dashboard/keuangan/list-rekening-bank",
        },
      ],
    },
    {
      title: "Manajemen Aset",
      url: "/dashboard/aset",
    },
    {
      title: "Manajemen Kegiatan",
      url: "/dashboard/kegiatan",
    },
    {
      title: "Manajemen Konten",
      url: "/dashboard/content",
    },
  ],
  DATA_KEUANGAN: [
    {
      title: "Pemasukan",
      value: "RP. 275.000",
    },
    {
      title: "Pengeluaran",
      value: "RP. 175.000",
    },
    {
      title: "Total",
      value: "RP. 100.000",
    },
  ],
  DATA_ASET: [
    {
      item: "AC",
      kategori: "Baik",
      value: "6",
    },
    {
      item: "Karpet",
      kategori: "Baik",
      value: "15",
    },
  ],
};

export default DASHBOARD_CONTENT;
