import { openDB } from "idb";

// Initialize the database
const initdb = async () => {
  try {
    const db = await openDB("jate", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("jate")) {
          db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
          console.log("jate database created");
        } else {
          console.log("jate database already exists");
        }
      },
    });
    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error; // Rethrow the error to propagate it
  }
};

// Function to add content to the database
export const putDb = async (content) => {
  console.log("Update the database");

  try {
    // Creates a connection to the database and version we want to use
    const db = await openDB("jate", 1);

    // Creates a new transaction and specify the database and data privileges
    const tx = db.transaction("jate", "readwrite");

    // Opens up the desired object store
    const store = tx.objectStore("jate");

    // The .put() method is used on the store and content passed in
    const request = store.put({ id: 1, value: content });

    // Confirmation of the request
    const result = await request;
    console.log("🚀 - data saved to the database", result);
  } catch (error) {
    console.error("Error adding data to database:", error);
    throw error; // Rethrow the error to propagate it
  }
};

// Function to retrieve content from the database
export const getDb = async () => {
  console.log("GET from the database");

  try {
    // Creates a connection to the database and version we want to use
    const db = await openDB("jate", 1);

    // Creates a new transaction and specify the database and data privileges
    const tx = db.transaction("jate", "readonly");

    // Opens up the desired object store
    const store = tx.objectStore("jate");

    // The .get() method is used on the store to grab stored data
    const request = store.get(1);

    // Confirmation of the request
    const result = await request;
    console.log("result.value", result);
    return result?.value;
  } catch (error) {
    console.error("Error retrieving data from database:", error);
    throw error; // Rethrow the error to propagate it
  }
};

// Initialize the database on application startup
initdb()
  .then(() => {
    console.log("Database initialized successfully");
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
  });