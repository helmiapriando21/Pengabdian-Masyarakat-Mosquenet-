const DASHBOARD_CONTENT = {
  FEATURE_LIST: [
    {
      title: "Dashbaord",
      url: "/v2/dashboard",
    },
    {
      title: "Manajemen Sistem",
      url: "",
      submenus: [
        {
          title: "Manajemen Akun",
          url: "/v2/dashboard/system-management/account",
        },
        { title: "Pengaturan", url: "/v2/dashboard/system-management/setting" },
      ],
    },
    {
      title: "Manajemen Aset",
      url: "/v2/dashboard/aset-management",
    },
    {
      title: "Manajemen Kegiatan",
      url: "/v2/dashboard/activity-management",
    },
    {
      title: "Manajemen Konten",
      url: "/v2/dashboard/content-management",
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
