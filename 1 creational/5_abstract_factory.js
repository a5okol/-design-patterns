// Абстрактная фабрика - это Паттер, который создает интерфейс, группирующий другие фабрики, которые логически связаны друг с другом. Условно говоря, это своеобразная абстракция для фабрики и фабричного метода.
// Абстрактная фабрика — это порождающий паттерн проектирования, который позволяет создавать семейства связанных объектов, не привязываясь к конкретным классам создаваемых объектов. 
// !! Отличие Абстрактной фабрики от Фабричного метода в том, что у фабричный метод - это 1 метод, который может создать 1 тип объекта, то есть Фабричный метод создал бы только 1 Интерфейс. В Абстрактной фабрике можно создавать множество объектов

//================================================================

// Пример 1.

function bmwProducer(kind) {
    return kind === 'sport' ? sportCarFactory : familyCarFactory;
  }
  
  function sportCarFactory() {
      return new Z4();
  }
  
  function familyCarFactory() {
      return new I3();
  }
  
  class Z4 {
      info() {
          return "Z4 is a Sport car!";
      }
  }
  
  class I3 {
      info() {
          return "i3 is a Family car!";
      }
  }
  
  // initilization Abstract factory of sport car
  const produce = bmwProducer('sport');
  
  // Car producing (Factory)
  const myCar = new produce();
  
  console.log(myCar.info()) // "Z4 is a Sport car!"

//================================================================

// Пример 2

function Developer(name)
{
  this.name = name
  this.type = "Developer"
}

function Tester(name)
{
  this.name = name
  this.type = "Tester"
}

function EmployeeFactory()
{
  this.create = (name, type) => {
    switch(type)
    {
      case 1:
        return new Developer(name)
        break
      case 2:
        return new Tester(name)
        break
    }
  }
}

function say()
{
  console.log("Hi, I am " + this.name + " and I am a " + this.type)
}

const employeeFactory = new EmployeeFactory()
const employees = []

employees.push(employeeFactory.create("Patrick", 1))
employees.push(employeeFactory.create("John", 2))
employees.push(employeeFactory.create("Jamie", 1))
employees.push(employeeFactory.create("Taylor", 1))
employees.push(employeeFactory.create("Tim", 2))

employees.forEach( emp => {
  say.call(emp)
})

// console.log(employees)

// Output: 
// Hi, I am Patrick and I am a Developer
// Hi, I am John and I am a Tester
// Hi, I am Jamie and I am a Developer
// Hi, I am Taylor and I am a Developer
// Hi, I am Tim and I am a Tester