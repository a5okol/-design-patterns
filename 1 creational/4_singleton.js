// Одиночка — это порождающий паттерн проектирования, который гарантирует,
// что у класса есть только один экземпляр, и предоставляет к нему глобальную точку доступа.
//================================================================

// Пример 1

class Database {
  constructor(data) {
    if (Database.exists) {
      return Database.instance
    }
    Database.instance = this
    Database.exists = true
    this.data = data
  }

  getData() {
    return this.data
  }
}

const mongo = new Database('MongoDB')
console.log(mongo.getData())

const mysql = new Database('MySQL')
console.log(mysql.getData())

//================================================================

// Пример 2 
  
class Counter {

	constructor() {
		if (typeof Counter.instance === 'object') {
			return Counter.instance;
		}
		this.count = 0;
		Counter.instance = this;
		return this;
	}
  
	getCount() {
		return this.count;
	}
  
	increaseCount() {
		return this.count++;
	}
}
