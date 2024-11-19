import { Car } from "./car.js";

export class CarManager {
	
	constructor (){
		this.cars = [];
	}
	
	addCar(brand, model, year) {
		const id = Date.now(); // Generate a unique ID
		const car = new Car(id, brand, model, year);
		
		this.cars.push(car);
		
		console.log(`Car added: ${car.brand} ${car.model}`);
	}
	
	  getCarsByStatus(status) {
		return this.cars.filter(car => car.status === status); // Filter: Practice filter here
	  }

	  // Map: Generate car summaries
	  getCarSummaries() {
		return this.cars.map(
		  car => `${car.year} ${car.brand} ${car.model} (${car.status})`
		); // Map: Transform each car into a summary string
	  }

	  // Reduce: Count cars by status
	  getCarCountByStatus() {
		return this.cars.reduce(
		  (counts, car) => {
			counts[car.status] = (counts[car.status] || 0) + 1;
			return counts;
		  },
		  {}
		); // Reduce: Aggregate counts by status
	  }
}