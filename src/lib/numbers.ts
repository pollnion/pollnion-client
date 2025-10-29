import numeral from "numeral";

/**
 * Format number into abbreviated string
 * @param number
 * @returns
 */
export const formatNum = (number = 0) => {
  // sample formatting
  // 1000 // "1k"
  // 1200 // "1.2k"
  // 200_000 // "200k"
  // 1_000_000 // "1m"
  // 1_200_000 // "1.2m"

  if (number < 1000) {
    return number.toString(); // no abbreviation, no decimal
  }

  const val = numeral(number).format("0.0a");
  return val.replace(/\.0([kmbt])$/, "$1"); // strip trailing ".0"
};
