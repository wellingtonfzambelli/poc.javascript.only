const API_URL = "https://jsonplaceholder.typicode.com/todos"; // Mock API

// Fetch: Load cars from API
export async function fetchCars() {
  const response = await fetch(API_URL); // Async/Await: Handle async operations
  const data = await response.json();
  
  return data.map(car => ({
    id: car.id,
    brand: "BrandX", // Example placeholder data
    model: car.title,
    year: 2020,
    status: car.completed ? "sold" : "available",
  }));
}

// Save: Mock saving a car to the API
export async function saveCar(car) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
  
  return response.json(); // Promise: API returns a response as a promise
}
