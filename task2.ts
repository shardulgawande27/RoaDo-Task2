// Define an interface to represent a single trip
interface Trip {
  pickups: string[]; // Array of pickup points
  drops: string[]; // Array of drop points
  warehouse?: string; // Optional warehouse point
}

// Define an interface to represent a shipment
interface Shipment {
  pickupPoints: string[]; // Array of pickup points for the shipment
  dropPoints: string[]; // Array of drop points for the shipment
}

// Define a function to validate whether the given set of trips is valid for the shipment
function isValidShipmentTrips(shipment: Shipment, trips: Trip[]): boolean {
  const { pickupPoints, dropPoints } = shipment;

  // Create sets for all pickup points, drop points, completed pickups, completed drops, and visited warehouses
  const allPickups = new Set(pickupPoints);
  const allDrops = new Set(dropPoints);
  const completedPickups = new Set<string>();
  const completedDrops = new Set<string>();
  const visitedWarehouses = new Set<string>();

  // Iterate over each trip
  for (const trip of trips) {
    const { pickups, drops, warehouse } = trip;

    // Validate pickups for the current trip
    pickups.forEach((pickup) => {
      if (!allPickups.has(pickup)) {
        throw new Error(`Invalid pickup point: ${pickup}`);
      }
      completedPickups.add(pickup); // Add the pickup point to the completed pickups set
    });

    // Validate drops for the current trip
    drops.forEach((drop) => {
      if (!allDrops.has(drop)) {
        throw new Error(`Invalid drop point: ${drop}`);
      }
      completedDrops.add(drop); // Add the drop point to the completed drops set
    });

    // If a warehouse is present for the current trip, add it to the visited warehouses set
    if (warehouse) {
      visitedWarehouses.add(warehouse);
    }
  }

  // Check if all pickups and drops in the shipment have been completed
  for (const pickup of allPickups) {
    if (!completedPickups.has(pickup)) {
      return false;
    }
  }

  for (const drop of allDrops) {
    if (!completedDrops.has(drop)) {
      return false;
    }
  }

  // If all pickups and drops are completed, return true indicating a valid set of trips
  return true;
}

// Example usage
const shipment: Shipment = {
  pickupPoints: ["A", "B"],
  dropPoints: ["C", "D"],
};

const validTrips: Trip[] = [
  { pickups: ["A"], drops: [], warehouse: "W" },
  { pickups: ["B"], drops: [], warehouse: "W" },
  { pickups: [], drops: ["C"], warehouse: "W" },
  { pickups: [], drops: ["D"], warehouse: "W" },
];

const invalidTrips: Trip[] = [
  { pickups: ["A"], drops: [], warehouse: "W1" },
  { pickups: ["B"], drops: [], warehouse: "W2" },
  { pickups: [], drops: ["C"], warehouse: "W3" },
  { pickups: [], drops: ["D"], warehouse: "W4" },
];

console.log(isValidShipmentTrips(shipment, validTrips)); // true
console.log(isValidShipmentTrips(shipment, invalidTrips)); // false
