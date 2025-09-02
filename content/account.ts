export type RoleStatus = {
  ketua: boolean;
  bendahara: boolean;
  sekretaris: boolean;
  pengurus: boolean;
};

export class Account {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  status: RoleStatus;

  constructor(
    id: string,
    name: string,
    email: string,
    photoUrl: string,
    status: RoleStatus
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.photoUrl = photoUrl;
    this.status = status;
  }

  static sampleData(): Account[] {
    return [
      new Account(
        "1",
        "Abdullah Ahmad Hafiz",
        "ahmad@example.com",
        "/img/avatar.jpeg",
        {
          ketua: true,
          bendahara: false,
          sekretaris: false,
          pengurus: true,
        }
      ),
      new Account(
        "2",
        "Cahyo Purnomo",
        "cahyo@example.com",
        "/img/avatar.jpeg",
        {
          ketua: false,
          bendahara: true,
          sekretaris: false,
          pengurus: true,
        }
      ),
      new Account(
        "3",
        "Helmi Apriando",
        "Helmi@example.com",
        "/img/avatar.jpeg",
        {
          ketua: false,
          bendahara: false,
          sekretaris: true,
          pengurus: true,
        }
      ),
    ];
  }
}
