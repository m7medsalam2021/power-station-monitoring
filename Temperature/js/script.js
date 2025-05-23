// temperature/temperature.js
// Create the temperature gauge
const temperatureGauge = new RadialGauge({
    renderTo: 'temperatureGauge',
    width: 300,
    height: 300,
    units: "°C",
    minValue: 0,
    maxValue: 100,
    majorTicks: ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
    minorTicks: 5,
    strokeTicks: true,
    highlights: [
        { from: 0, to: 30, color: "rgba(0, 200, 0, 0.5)" },
        { from: 30, to: 50, color: "rgba(255, 255, 0, 0.5)" },
        { from: 50, to: 100, color: "rgba(255, 0, 0, 0.5)" }
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
    animationDuration: 5000,
    animationRule: "bounce"
}).draw();

// Function to update the flow gauge value
function updateTemperature(value) {
    temperatureGauge.value = value;

    // Check if flow reaches 75 L/min
    const TemperatureWarningLight = document.getElementById('TemperatureWarningLight');
    if (value >= 75) {
        TemperatureWarningLight.classList.add('on');
        document.getElementById('controlButton').disabled = false;
    } else {
        TemperatureWarningLight.classList.remove('on');
    }
}   

// Function to fetch data from API
async function updateTemperatureFromAPI() {
    try {
        const value = await fetchSensorData(1);
        if (value !== null) {
            updateTemperature(value);
        } else {
            console.warn("Using simulated data");
            updateTemperature(simulateValue(0, 100));
        }
    } catch (error) {
        console.error("Failed to update Temperature:", error);
    }
}


// Simulate dynamic temperature updates
function simulateTemperature() {
    const temperature = simulateValue(0, 100); // استخدام الوظيفة العامة
    updateTemperature(temperature);
}

// Initialize the gauge with a default value
updateTemperature(0);

// Update the gauge every 2 minutes (120,000 milliseconds)
// const temperatureInterval = setInterval(simulateTemperature, 120000);
const temperatureInterval = setInterval(updateTemperatureFromAPI, 2000);
updateTemperatureFromAPI();

