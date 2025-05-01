// flow/flow.js
// Create the flow gauge
const flowGauge = new RadialGauge({
    renderTo: 'flowGauge',
    width: 300,
    height: 300,
    units: "L/min",
    minValue: 0,
    maxValue: 100,
    majorTicks: ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
    minorTicks: 5,
    strokeTicks: true,
    highlights: [
        { from: 0, to: 50, color: "rgba(0, 200, 0, 0.5)" },
        { from: 50, to: 75, color: "rgba(255, 255, 0, 0.5)" },
        { from: 75, to: 100, color: "rgba(255, 0, 0, 0.5)" }
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
    animationDuration: 500,
    animationRule: "bounce"
}).draw();

// Function to update the flow gauge value
function updateFlow(value) {
    flowGauge.value = value;

    // Check if flow reaches 75 L/min
    const flowWarningLight = document.getElementById('flowWarningLight');
    if (value >= 75) {
        flowWarningLight.classList.add('on');
        document.getElementById('controlButton').disabled = false;
    } else {
        flowWarningLight.classList.remove('on');
    }
}   

// Function to fetch data from API
async function updateFlowFromAPI() {
    try {
        const value = await fetchSensorData(5);
        if (value !== null) {
            updateFlow(value);
        } else {
            console.warn("Using simulated data");
            updateFlow(simulateValue(0, 100));
        }
    } catch (error) {
        console.error("Failed to update flow:", error);
    }
}

// Simulate dynamic flow updates
function simulateFlow() {
    const flow = simulateValue(0, 100);
    updateFlow(flow);
}

// Initialize the gauge with a default value
updateFlow(0);

// Update the gauge every 2 seconds
const flowInterval = setInterval(updateFlowFromAPI, 8000);
updateFlowFromAPI();