const API_BASE_URL = 'https://localhost:7273/api/';

async function fetchSensorData(sensorId) {
    try {
        const response = await fetch(`${API_BASE_URL}SensorData/${sensorId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.value; // خلي بالك هنا بقى measuredValue مش value
    } catch (error) {
        console.error(`Error fetching sensor ${sensorId} data:`, error);
        return null;
    }
}

// دالة محاكاة لو مفيش داتا جاية من الباك
function simulateValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
