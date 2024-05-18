// Define a function to validate whether the given set of trips is valid for the shipment
function isValidShipmentTrips(shipment, trips) {
    var pickupPoints = shipment.pickupPoints, dropPoints = shipment.dropPoints;
    // Create sets for all pickup points, drop points, completed pickups, completed drops, and visited warehouses
    var allPickups = new Set(pickupPoints);
    var allDrops = new Set(dropPoints);
    var completedPickups = new Set();
    var completedDrops = new Set();
    var visitedWarehouses = new Set();
    // Iterate over each trip
    for (var _i = 0, trips_1 = trips; _i < trips_1.length; _i++) {
        var trip = trips_1[_i];
        var pickups = trip.pickups, drops = trip.drops, warehouse = trip.warehouse;
        // Validate pickups for the current trip
        pickups.forEach(function (pickup) {
            if (!allPickups.has(pickup)) {
                throw new Error("Invalid pickup point: ".concat(pickup));
            }
            completedPickups.add(pickup); // Add the pickup point to the completed pickups set
        });
        // Validate drops for the current trip
        drops.forEach(function (drop) {
            if (!allDrops.has(drop)) {
                throw new Error("Invalid drop point: ".concat(drop));
            }
            completedDrops.add(drop); // Add the drop point to the completed drops set
        });
        // If a warehouse is present for the current trip, add it to the visited warehouses set
        if (warehouse) {
            visitedWarehouses.add(warehouse);
        }
    }
    // Check if all pickups and drops in the shipment have been completed
    for (var _a = 0, allPickups_1 = allPickups; _a < allPickups_1.length; _a++) {
        var pickup = allPickups_1[_a];
        if (!completedPickups.has(pickup)) {
            return false;
        }
    }
    for (var _b = 0, allDrops_1 = allDrops; _b < allDrops_1.length; _b++) {
        var drop = allDrops_1[_b];
        if (!completedDrops.has(drop)) {
            return false;
        }
    }
    // If all pickups and drops are completed, return true indicating a valid set of trips
    return true;
}
// Example usage
var shipment = {
    pickupPoints: ["A", "B"],
    dropPoints: ["C", "D"],
};
var validTrips = [
    { pickups: ["A"], drops: [], warehouse: "W" },
    { pickups: ["B"], drops: [], warehouse: "W" },
    { pickups: [], drops: ["C"], warehouse: "W" },
    { pickups: [], drops: ["D"], warehouse: "W" },
];
var invalidTrips = [
    { pickups: ["A"], drops: [], warehouse: "W1" },
    { pickups: ["B"], drops: [], warehouse: "W2" },
    { pickups: [], drops: ["C"], warehouse: "W3" },
    { pickups: [], drops: ["D"], warehouse: "W4" },
];
console.log(isValidShipmentTrips(shipment, validTrips)); // true
console.log(isValidShipmentTrips(shipment, invalidTrips)); // false
