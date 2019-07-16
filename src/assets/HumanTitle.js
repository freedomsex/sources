const title = {
  human: '',
  name() {
    let result = 'Парень или девушка';
    if (this.human) {
      result = this.human.sex == 2 ? 'Девушка' : 'Парень';
      if (this.human.name) {
        result = this.human.name;
      }
    }
    return result;
  },
  age() {
    return this.human && this.human.age ? this.human.age : '';
  },
  city() {
    return this.human && this.human.city ? this.human.city : '';
  },
  generate() {
    return `${this.name()} ${this.age()} ${this.city()}`;
  },
};

export default function (human) {
  title.human = human;
  return title.generate();
}
