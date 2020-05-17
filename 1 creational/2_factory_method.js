class SimpleMembership {
  constructor(name) {
    this.name = name
    this.cost = 50
  }
}

class StandardMembership {
  constructor(name) {
    this.name = name
    this.cost = 150
  }
}

class PremiumMembership {
  constructor(name) {
    this.name = name
    this.cost = 500
  }
}

class MemberFactory {
  static list = {
    simple: SimpleMembership,
    standard: StandardMembership,
    premium: PremiumMembership
  }

  create(name, type = 'simple') {
    const Membership = MemberFactory.list[type] || MemberFactory.list.simple // Membership пишется с большой буквы. потому что в него мы записываем класс
    const member = new Membership(name)
    member.type = type
    member.define = function() {
      console.log(`${this.name} (${this.type}): ${this.cost}`)
    }
    return member
  }
}

const factory = new MemberFactory()

const members = [
  factory.create('Igor', 'simple'),
  factory.create('Kseniya', 'premium'),
  factory.create('Olesya', 'standard'),
  factory.create('Anton', 'premium'),
  factory.create('Kristina')
]

members.forEach(m => {
  m.define()
})

//================================================================

// Пример 2. Factory на JavaScript

class Bmw {
	constructor(model, price, maxSpeed) {
		this.model = model;
		this.price = price;
		this.maxSpeed = maxSpeed;
	}
}

class BmwFactory {
	create(type) {
		if (type === 'X5')
			return new Bmw(type, 108000, 300);
		if (type === 'X6')
      return new Bmw(type, 111000, 320);
    if (type === 'X7')
			return new Bmw(type, 325000, 420);
	}
}

const factory2 = new BmwFactory()

const x5 = factory2.create('X5')
const x6 = factory2.create('X6')
const x7 = factory2.create('X7')

console.log(x5)
console.log(x6)
console.log(x7)

// Output: 
// Bmw { model: 'X5', price: 108000, maxSpeed: 300 }
// Bmw { model: 'X6', price: 111000, maxSpeed: 320 }
// Bmw { model: 'X7', price: 325000, maxSpeed: 420 }

//================================================================

/* Фабричный метод на TypeScript

Фабричный метод — это порождающий паттерн проектирования, который решает проблему создания различных продуктов, без указания конкретных классов продуктов.
Фабричный метод задаёт метод, который следует использовать вместо вызова оператора new для создания объектов-продуктов. Подклассы могут переопределить этот метод, чтобы изменять тип создаваемых продуктов.

Особенности паттерна на TypeScript
Применимость: Паттерн можно часто встретить в любом TypeScript-коде, где требуется гибкость при создании продуктов.
Признаки применения паттерна: Фабричный метод можно определить по создающим методам, которые возвращают объекты продуктов через абстрактные типы или интерфейсы. Это позволяет переопределять типы создаваемых продуктов в подклассах.

Концептуальный пример
Этот пример показывает структуру паттерна Фабричный метод, а именно — из каких классов он состоит, какие роли эти классы выполняют и как они взаимодействуют друг с другом.



 * Пример структуры паттерна:
 * Класс Создатель объявляет фабричный метод, который должен возвращать объект
 * класса Продукт. Подклассы Создателя обычно предоставляют реализацию этого метода.

abstract class Creator {

     * Обратите внимание, что Создатель может также обеспечить реализацию
     * фабричного метода по умолчанию.
  
    public abstract factoryMethod(): Product;

     * Также заметьте, что, несмотря на название, основная обязанность Создателя
     * не заключается в создании продуктов. Обычно он содержит некоторую базовую
     * бизнес-логику, которая основана на объектах Продуктов, возвращаемых
     * фабричным методом. Подклассы могут косвенно изменять эту бизнес-логику,
     * переопределяя фабричный метод и возвращая из него другой тип продукта.
  
    public someOperation(): string {
        // Вызываем фабричный метод, чтобы получить объект-продукт.
        const product = this.factoryMethod();
        // Далее, работаем с этим продуктом.
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}

 * Конкретные Создатели переопределяют фабричный метод для того, чтобы изменить
 * тип результирующего продукта.

class ConcreteCreator1 extends Creator {
    
     * Обратите внимание, что сигнатура метода по-прежнему использует тип
     * абстрактного продукта, хотя фактически из метода возвращается конкретный
     * продукт. Таким образом, Создатель может оставаться независимым от
     * конкретных классов продуктов.
     
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}


 * Интерфейс Продукта объявляет операции, которые должны выполнять все
 * конкретные продукты.

interface Product {
    operation(): string;
}

 * Конкретные Продукты предоставляют различные реализации интерфейса Продукта.
 
class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct1}';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct2}';
    }
}


 * Клиентский код работает с экземпляром конкретного создателя, хотя и через его
 * базовый интерфейс. Пока клиент продолжает работать с создателем через базовый
 * интерфейс, вы можете передать ему любой подкласс создателя.
 

function clientCode(creator: Creator) {
    // ...
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());
    // ...
}

 /* Приложение выбирает тип создателя в зависимости от конфигурации или среды. 

console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());


Output.txt: Результат выполнения
App: Launched with the ConcreteCreator1.
Client: I'm not aware of the creator's class, but it still works.
Creator: The same creator's code has just worked with {Result of the ConcreteProduct1}

App: Launched with the ConcreteCreator2.
Client: I'm not aware of the creator's class, but it still works.
Creator: The same creator's code has just worked with {Result of the ConcreteProduct2}

*/