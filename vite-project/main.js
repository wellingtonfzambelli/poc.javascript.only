import { CarManager } from "./entities/carManager.js";
import { fetchCars, saveCar } from "./integration/api.js";

// Initialize the CarManager
const carManager = new CarManager();

init();

async function init() {
    await loadCarsFromApi();
    await updateCarTable();
  }

// Async/Await: Load cars on page load
async function loadCarsFromApi() {
    const cars = await fetchCars(); // Fetch cars from API
    
    cars.forEach(car =>
      carManager.addCar(car.brand, car.model, car.year, car.status)
    );
  
    console.log(carManager.cars.length)
  }

  async function updateCarTable() {
    const tableBody = document.querySelector("#table-cars tbody");
    tableBody.innerHTML = "";
  
    carManager.cars.forEach(car => {
      const row = document.createElement("tr");
      
      row.innerHTML = `
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.year}</td>
        <td>${car.status}</td>
      `;
      tableBody.appendChild(row);
    });
  }

// Add a new car
document.querySelector("#addCar").addEventListener("click", async () => {
    debugger;
  const brand = document.querySelector("#brand").value;
  const model = document.querySelector("#model").value;
  const year = document.querySelector("#year").value;
  const status = ((year % 2) == 0) ? "sold" : "available";

  carManager.addCar(brand, model, year, status); // Add car locally
  const newCar = carManager.cars[carManager.cars.length - 1];
  
  await saveCar(newCar); // Save car to API
  clearFields();

  console.log("Saved car:", newCar);
});

// Filter cars by status
document.querySelector("#filter").addEventListener("change", () => {
  const status = document.querySelector("#filter").value;
  carManager.cars = carManager.getCarsByStatus(status); // Use Filter
  
  updateCarTable();

  console.log(`Filtered cars (${status}):`, carManager.cars);
});

function clearFields(){
    document.querySelector("#brand").value = '';
    document.querySelector("#model").value = '';
    document.querySelector("#year").value = '';
}