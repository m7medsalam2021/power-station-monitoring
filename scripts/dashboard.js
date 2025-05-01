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

async function getRealTimeData() {
    try {
        const response = await fetch(`${API_BASE_URL}SensorData`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const allData = await response.json();
        
        // نفترض أن البيانات تأتي مصنفة حسب الـ Sensor IDs
        const pressure = allData.find(d => d.sensorId === 3)?.value || 0;
        const temperature = allData.find(d => d.sensorId === 1)?.value || 0;
        const flow = allData.find(d => d.sensorId === 5)?.value || 0;
        const humidity = allData.find(d => d.sensorId === 4)?.value || 0;
        const radiation = allData.find(d => d.sensorId === 2)?.value || 0;

        return { pressure, temperature, flow, humidity, radiation };
    } catch (error) {
        console.error('Error fetching all sensors data:', error);
        return null;
    }
}

// Function to update the overall gauge
async function updateOverallGauge() {
    const realData = await getRealTimeData();
    
    if (realData) {
        const { pressure, temperature, flow, humidity, radiation } = realData;
        const overallValue = calculateOverallValue(pressure, temperature, flow, humidity, radiation);
        
        overallGauge.value = overallValue;
        document.getElementById('overallValue').textContent = overallValue.toFixed(2);
    } else {
        // استخدام البيانات المحاكاة إذا فشل الاتصال بالباك إند
        const pressure = simulateValue(0, 100);
        const temperature = simulateValue(0, 100);
        const flow = simulateValue(0, 100);
        const humidity = simulateValue(0, 100);
        const radiation = simulateValue(0, 100);

        const overallValue = calculateOverallValue(pressure, temperature, flow, humidity, radiation);
        
        overallGauge.value = overallValue;
        document.getElementById('overallValue').textContent = overallValue.toFixed(2);
    }

    // تحديث لمبة التحذير
    const overallWarningLight = document.getElementById('overallWarningLight');
    overallWarningLight.classList.toggle('on', overallGauge.value >= 75);
}


// Simulate dynamic updates every 2 seconds
setInterval(updateOverallGauge, 120000);

// Initialize with default values
updateOverallGauge();
