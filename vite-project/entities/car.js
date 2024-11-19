export class Car {
	
	constructor (id, brand, model, year, status = "available"){
		this.id = id; // Unique ID
		this.brand = brand;
		this.model = model;
		this.year = year;
		this.status = status; // "available" or "sold"
	}
}