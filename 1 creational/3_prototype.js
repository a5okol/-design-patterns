// Прототип — это порождающий паттерн проектирования, который позволяет копировать объекты, не вдаваясь в подробности их реализации. 
// При этом с минимальными затратами. При этом, в случае необхоимости, позволяет менять некоторые парамметры под определенные нужды, не изменяя общей структуры.

//================================================================

// Пример 1.

const car = {
  wheels: 8,

  init() {
    console.log(`У меня есть ${this.wheels} колес, мой владелец ${this.owner}`);
  },
};

const carWithOwner = Object.create(car, {
  owner: {
    value: "Евгений",
  },
});

console.log(carWithOwner.__proto__ === car);
console.log(carWithOwner);

carWithOwner.init();

// Output:
// true
// У меня есть 8 колес, мой владелец Евгений

//================================================================

// Пример 2.

class TeslaCar {
  constructor(model, price, interior, autopilot) {
    this.model = model;
    this.price = price;
    this.interior = interior;
    this.autopilot = autopilot;
  }

  produce() {
    return new TeslaCar(this.model, this.price, this.interior, this.autopilot);
  }
}

// Produce base auto
const prototypeCar = new TeslaCar("S", 80000, "black", false);

// Cloning of base auto
const car1 = prototypeCar.produce();
const car2 = prototypeCar.produce();
const car3 = prototypeCar.produce();

// Changes for particular auto
car1.interior = "white";
car1.autopilot = true;

console.log(car1)
// Output: 
// TeslaCar {
//   model: 'S',
//   price: 80000,
//   interior: 'white',
//   autopilot: true
// }
