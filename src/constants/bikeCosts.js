/**
 * Constants for bike and vehicle costs used in the cost comparison calculator
 * All values are in USD and represent annual costs unless otherwise specified
 */

// Base costs for different vehicle types with source URLs
export const CAR_COSTS = {
  // Initial purchase price average for a new car
  purchase: 48500, // Average between $48,401 - $48,641
  purchaseSource: "https://spectrumlocalnews.com/us/national/transportation/2024/09/06/average-annual-cost-to-own-and-operate-a-car-grows-to--12-297",

  // Annual maintenance including oil changes, tires, and regular service
  maintenance: 900, // Range from $583 - $1,623 per year, average at $900
  maintenanceSource: "https://www.consumeraffairs.com/automotive/average-car-maintenance-costs.html",

  // Annual fuel costs based on average usage
  fuel: 2500, // Mid-range estimate from $500 - $8,250 per year
  fuelSource: "https://www.energy.gov/eere/vehicles/articles/fotw-1245-july-4-2022-epa-estimated-annual-fuel-cost-model-year-2022-light",

  // Annual insurance premium
  insurance: 1800, // Mid-range estimate from $631 - $2,685 per year
  insuranceSource: "https://www.forbes.com/advisor/car-insurance/average-cost-of-car-insurance/",

  // Secondary insurance source
  insuranceSource2: "https://www.bankrate.com/insurance/car/average-cost-of-car-insurance/"
};

// Costs for different bike types
export const BIKE_COSTS = {
  // Regular non-electric bicycle
  'regular-bike': {
    purchase: 800,
    maintenance: 150,
    fuel: 0,
    insurance: 0
  },
  // Electric commuter bicycle
  'commuter-ebike': {
    purchase: 2500,
    maintenance: 250,
    fuel: 50, // Electricity cost
    insurance: 100
  },
  // Traditional cargo bicycle (non-electric)
  'cargo-bike': {
    purchase: 1800,
    maintenance: 200,
    fuel: 0,
    insurance: 100
  },
  // Electric cargo bicycle with bucket/box design
  'cargo-ebike': {
    purchase: 4500,
    maintenance: 350,
    fuel: 75, // Electricity cost
    insurance: 150
  },
  // Non-electric longtail cargo bicycle
  'longtail-bike': {
    purchase: 2000, // Based on Yuba Mundo Lux ($1,999)
    maintenance: 250,
    fuel: 0,
    insurance: 100
  },
  // Electric longtail cargo bicycle designed for passengers
  'longtail-ebike': {
    purchase: 5000,
    maintenance: 400,
    fuel: 100, // Electricity cost
    insurance: 200
  },
  // Default fallback values
  'default': {
    purchase: 1000,
    maintenance: 150,
    fuel: 0,
    insurance: 0
  }
};