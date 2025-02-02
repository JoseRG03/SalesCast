export function formatISOToCustomDate(isoString: string) {
  const date = new Date(isoString);
  const day = date.getDate();
  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} de ${month} del ${year}`;
}