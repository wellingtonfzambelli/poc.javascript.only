const API_URL = "https://jsonplaceholder.typicode.com/todos"; // Mock API

// Fetch: Load cars from API
export async function fetchCars() {
  try
  {
    const response = await fetch(API_URL); // Async/Await: Handle async operations
    const data = await response.json();
    
    return data.map(car => ({
      id: car.id,
      brand: "BrandX", // Example placeholder data
      model: car.title,
      year: randomYear(),
      status: ((randomYear() % 2) == 0) ? "sold" : "available",
    })); 
  } 
  catch (error) 
  {
    console.error("Failed to add car:", error);
  }
}

// Save: Mock saving a car to the API
export async function saveCar(car) {
  
  try 
  {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });

    alert("Car saved with success!");

    return response.json(); // Promise: API returns a response as a promise

  } 
  catch (error) 
  {
    console.error("Failed to add car:", error);
  }
}

function randomYear() {
  return Math.floor(Math.random() * (2024 - 2005 + 1)) + 2005;
}