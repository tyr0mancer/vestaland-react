export function getEtdString(etd: Date) {
  return formatDateToHHMM(etd)
}


function formatDateToHHMM(date: Date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}
