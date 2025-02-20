document.addEventListener("DOMContentLoaded", () => {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(handleBatteryStatus);
    } else {
        alert("Battery Status API is not supported on this browser.");
    }
});

function handleBatteryStatus(battery) {
    updateBatteryStatus(battery);

    // Update the battery status whenever it changes
    battery.addEventListener('levelchange', () => updateBatteryStatus(battery));
    battery.addEventListener('chargingchange', () => updateBatteryStatus(battery));
}

function updateBatteryStatus(battery) {
    const chargeElement = document.querySelector(".charge");
    const percentageElement = document.getElementById("percentage");
    const statusElement = document.getElementById("status");
    const chargingIcon = document.getElementById("chargingIcon");

    const chargeLevel = Math.floor(battery.level * 100);
    chargeElement.style.width = chargeLevel + "%";
    percentageElement.textContent = chargeLevel + "%";

    if (battery.charging) {
        statusElement.textContent = "Charging...";
        chargingIcon.classList.remove("hidden");
    } else {
        chargingIcon.classList.add("hidden");
        if (chargeLevel === 100) {
            statusElement.textContent = "Fully Charged";
        } else {
            statusElement.textContent = "Not Charging";
        }
    }
}
