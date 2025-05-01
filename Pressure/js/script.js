// Create the gauge
const gauge = new RadialGauge({
    renderTo: 'pressureGauge', // ID of the canvas element
    width: 300,
    height: 300,
    units: "PSI", // Unit of measurement
    minValue: 0,
    maxValue: 100,
    majorTicks: ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
    minorTicks: 5,
    strokeTicks: true,
    highlights: [
        { from: 0, to: 50, color: "rgba(0, 200, 0, 0.5)" }, // Green zone
        { from: 50, to: 75, color: "rgba(255, 255, 0, 0.5)" }, // Yellow zone
        { from: 75, to: 100, color: "rgba(255, 0, 0, 0.5)" } // Red zone
    ],
    colorPlate: "#fff",
    colorMajorTicks: "#333",
    colorMinorTicks: "#666",
    colorNumbers: "#333",
    colorNeedle: "rgba(0, 0, 0, 0.8)",
    colorNeedleEnd: "rgba(0, 0, 0, 0.8)",
    colorNeedleShadowDown: "rgba(0, 0, 0, 0.2)",
    colorNeedleShadowUp: "rgba(0, 0, 0, 0.2)",
    valueBox: true,
    valueTextShadow: false,
    colorValueBoxRect: "#fff",
    colorValueBoxRectEnd: "#fff",
    colorValueBoxBackground: "#fff",
    colorValueBoxShadow: "rgba(0, 0, 0, 0.2)",
    valueDec: 0,
    valueInt: 2,
    animation: true,
    animationDuration: 5000, // سرعة تحرك الإبرة
    animationRule: "bounce"
}).draw();

// Function to update the gauge value
async function updatePressureFromAPI() {
    const sensorId = 3; // ID سينسور الضغط في الباك إند
    const value = await fetchSensorData(sensorId);
    
    if (value !== null) {
        updateGauge(value);
    } else {
        const simulatedValue = simulateValue(0, 100);
        updateGauge(simulatedValue);
    }
}


// Simulate dynamic pressure updates
function simulatePressure() {
    const pressure = Math.floor(Math.random() * 101); // Random value between 0 and 100
    updateGauge(pressure);
}

// Initialize the gauge with a default value
updateGauge(0);

// Update the gauge every 2 minutes (120,000 milliseconds)
// const interval = setInterval(simulatePressure, 120000);
const pressureInterval = setInterval(updatePressureFromAPI, 2000);
updatePressureFromAPI();

