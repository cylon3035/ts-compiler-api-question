interface Pet {
  name: string;
}

class Dog implements Pet {
  name: string;
  dogProps: any;
  constructor() {
    this.name = 'mrBark';
  }
}

class Cat implements Pet {
  name: string;
  catProps: any;

  constructor() {
    this.name = 'mrMeow';
  }
}
