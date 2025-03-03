// scripts/dashboard.js
// Create the overall gauge
const overallGauge = new RadialGauge({
    renderTo: 'overallGauge',
    width: 300,
    height: 300,
    units: "Status",
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
    valueBox: false,
    animation: true,
    animationDuration: 500,
    animationRule: "bounce"
}).draw();

// Function to calculate the overall value
function calculateOverallValue(pressure, temperature, flow, humidity, radiation) {
    // Calculate the average of all sensor values
    const overallValue = (pressure + temperature + flow + humidity + radiation) / 5;
    return overallValue;
}

// Function to update the overall gauge
function updateOverallGauge() {
    // Simulate sensor values
    const pressure = simulateValue(0, 100);
    const temperature = simulateValue(0, 100);
    const flow = simulateValue(0, 100);
    const humidity = simulateValue(0, 100);
    const radiation = simulateValue(0, 100);

    // Calculate the overall value
    const overallValue = calculateOverallValue(pressure, temperature, flow, humidity, radiation);

    // Update the overall gauge
    overallGauge.value = overallValue;
    document.getElementById('overallValue').textContent = overallValue.toFixed(2);

    // Update the warning light
    const overallWarningLight = document.getElementById('overallWarningLight');
    if (overallValue >= 75) {
        overallWarningLight.classList.add('on');
    } else {
        overallWarningLight.classList.remove('on');
    }
}

// Simulate dynamic updates every 2 seconds
setInterval(updateOverallGauge, 2000);

// Initialize with default values
updateOverallGauge();