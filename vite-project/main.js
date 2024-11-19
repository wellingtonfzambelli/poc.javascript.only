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
    tableBody.innerHTML = ""; // Limpa o conteúdo existente
  
    carManager.cars.forEach(car => {
      const row = document.createElement("tr");
      
      // Cria e adiciona as células da linha
      row.innerHTML = `
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.year}</td>
      `;
      tableBody.appendChild(row); // Adiciona a linha na tabela
    });
  }

// Add a new car
document.querySelector("#addCar").addEventListener("click", async () => {
  const brand = document.querySelector("#brand").value;
  const model = document.querySelector("#model").value;
  const year = document.querySelector("#year").value;

  carManager.addCar(brand, model, year); // Add car locally
  const newCar = carManager.cars[carManager.cars.length - 1];
  
  await saveCar(newCar); // Save car to API
  console.log("Saved car:", newCar);
});

// Filter cars by status
document.querySelector("#filter").addEventListener("change", () => {
  const status = document.querySelector("#filter").value;
  const filteredCars = carManager.getCarsByStatus(status); // Use Filter
  console.log(`Filtered cars (${status}):`, filteredCars);
});

