// Import GOT to make HTTP requests
import { got } from "got";
// Set the API URL
const API = "http://localhost:3000";
// Set the categories
const categories = ["confectionery", "electronics"];

// Log the usage of the command to the consol
export const log = (msg) => {
  console.log(`\n${msg}\n`);
};
// Log the error to the console
export const error = (msg) => {
  console.error(`\n${msg}\n`);
};

// Update the order with the given ID
export async function update(id, amount) {
  console.log(`Updating order ${id} with amount ${amount}`);
  try {
    if (isNaN(+amount)) {
      log("Error: <AMOUNT> must be a number");
      process.exit(1);
    }
    // Use GOT to make a POST request to the API
    await got.post(`${API}/orders/${id}`, {
      json: { amount: +amount },
    });
    // Log the result to the console
    console.log(`Order ${id} updated with amount ${amount}`);
  } catch (err) {
    // If there is an error, log it to the console and exit
    console.log(err.message);
    process.exit(1);
  }
}

// Add a new order
export async function add(...args) {
  // Destructure the arguments
  let [category, id, name, amount, info] = args;
  log(`Adding item ${id} with amount ${amount}`);
  try {
    if (isNaN(+amount)) {
      error(`Error: <AMOUNT> must be a number`);
      process.exit(1);
    }
    // Use GOT to make a POST request to the API
    await got.post(`${API}/${category}`, {
      json: {
        id,
        name,
        rrp: +amount,
        info: info.join(" "),
      },
    });
    // Log the result to the console
    log(`Item "${id}:${name}" has been added to the ${category} category`);
  } catch (err) {
    // If there is an error, log it to the console and exit
    error(err.message);
    process.exit(1);
  }
}
