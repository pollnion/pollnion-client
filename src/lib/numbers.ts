import numeral from "numeral";

/**
 * Format number into abbreviated string with smart decimal handling.
 *
 * This function converts large numbers into a more readable format by
 * abbreviating them with suffixes (k, m, b, t) and intelligently removes
 * unnecessary decimal points.
 *
 * @param number - The number to format (defaults to 0)
 * @returns A formatted string representation of the number
 *
 * @example
 * formatNum(1000)     // "1k"
 * formatNum(1200)     // "1.2k"
 * formatNum(200000)   // "200k"
 * formatNum(1000000)  // "1m"
 * formatNum(1200000)  // "1.2m"
 */
export const formatNum = (number = 0): string => {
  if (number < 1000) {
    return number.toString();
  }

  const val = numeral(number).format("0.0a");
  return val.replace(/\.0([kmbt])$/, "$1");
};
