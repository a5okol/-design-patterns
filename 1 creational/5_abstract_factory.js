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
  
  const produce = bmwProducer('sport');
  
  const myCar = new produce();
  
  console.log(myCar.info())

//================================================================

// Абстрактная фабрика - это Паттер, который создает интерфейс, группирующий другие фабрики, которые логически связаны друг с другом. Условно говоря, это своеобразная абстракция для фабрики и фабричного метода.
// Абстрактная фабрика — это порождающий паттерн проектирования, который позволяет создавать семейства связанных объектов, не привязываясь к конкретным классам создаваемых объектов. 
