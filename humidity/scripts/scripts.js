// humidity/humidity.js
// Create the humidity gauge
const humidityGauge = new RadialGauge({
    renderTo: 'humidityGauge',
    width: 300,
    height: 300,
    units: "%", // وحدة القياس (نسبة مئوية)
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
    animationDuration: 500,
    animationRule: "bounce"
}).draw();

// Function to update the humidity gauge value
function updateHumidity(value) {
    humidityGauge.value = value;

    // Check if humidity reaches 75%
    const humidityWarningLight = document.getElementById('humidityWarningLight');
    if (value >= 75) {
        humidityWarningLight.classList.add('on');
        document.getElementById('controlButton').disabled = false;
    } else {
        humidityWarningLight.classList.remove('on');
    }
}

// Simulate dynamic humidity updates
function simulateHumidity() {
    const humidity = simulateValue(0, 100); // استخدام الوظيفة العامة
    updateHumidity(humidity);
}

// Initialize the gauge with a default value
updateHumidity(0);

// Update the gauge every 2 minutes (120,000 milliseconds)
const humidityInterval = setInterval(simulateHumidity, 1200);

// Control button logic
document.getElementById('controlButton').addEventListener('click', () => {
    clearInterval(humidityInterval);
    alert("تم التحكم في الرطوبة!");
    document.getElementById('controlButton').disabled = true;
});