/**
 * Funcion para transformar un valor numerico a color HSL
 *
 * @param temperature
 * @returns @string
 */
export const getTempColor = (temperature: number) => {
  // Temperatura o intensidad del color basada en HSL
  var hue = 30 + (240 * (30 - temperature)) / 60;
  return `hsl(${hue}, 70%, 50%)`;
};
