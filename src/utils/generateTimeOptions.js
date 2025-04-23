export const getClosestTime = () => {
  const now = new Date();

  const minutes = now.getMinutes();
  const closestMinute = Math.round(minutes / 15) * 15;
  now.setMinutes(closestMinute);
  now.setSeconds(0);

  // Используем toLocaleTimeString для получения времени в местной временной зоне
  return now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function formatTime(hours, minutes) {
  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  return `${h}:${m}`;
}
