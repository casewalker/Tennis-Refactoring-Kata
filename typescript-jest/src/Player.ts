export class Player {
  name: string;
  birthday: Date;
  score: number;

  constructor(name: string, birthday: string) {
    this.name = name;
    this.birthday = new Date(birthday);
    this.score = 0;
  }

  getAge(today: Date) {
    // Thanks stackoverflow
    let age = today.getFullYear() - this.birthday.getFullYear();
    const m = today.getMonth() - this.birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthday.getDate())) {
        age--;
    }
    return age;
  }
}
