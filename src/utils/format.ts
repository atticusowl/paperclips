// Number formatting utilities for Universal Paperclips

const SUFFIXES = [
  '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
  'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion',
  'decillion', 'undecillion', 'duodecillion', 'tredecillion',
  'quattuordecillion', 'quindecillion', 'sexdecillion', 'septendecillion',
  'octodecillion', 'novemdecillion', 'vigintillion'
];

/**
 * Formats large numbers with suffixes (like the original game's numberCruncher)
 */
export function formatNumber(num: number, precision = 0): string {
  if (num < 1000) {
    return precision > 0 ? num.toFixed(precision) : Math.floor(num).toString();
  }
  
  const tier = Math.floor(Math.log10(Math.abs(num)) / 3);
  
  if (tier === 0) {
    return num.toLocaleString();
  }
  
  if (tier < SUFFIXES.length) {
    const scale = Math.pow(10, tier * 3);
    const scaled = num / scale;
    return `${scaled.toFixed(2)} ${SUFFIXES[tier]}`;
  }
  
  // For extremely large numbers, use scientific notation
  return num.toExponential(2);
}

/**
 * Formats currency values
 */
export function formatMoney(num: number): string {
  if (num < 1000000) {
    return num.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  }
  return formatNumber(num, 2);
}

/**
 * Formats percentages
 */
export function formatPercent(num: number, decimals = 0): string {
  return `${num.toFixed(decimals)}%`;
}

/**
 * Formats time in seconds to human readable
 */
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds`;
  }
  if (seconds < 3600) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return secs > 0 ? `${mins}m ${secs}s` : `${mins} minutes`;
  }
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours} hours`;
}

/**
 * Formats mass (grams) with appropriate units
 */
export function formatMass(grams: number): string {
  if (grams < 1000) {
    return `${grams.toFixed(2)} g`;
  }
  if (grams < 1000000) {
    return `${(grams / 1000).toFixed(2)} kg`;
  }
  return `${formatNumber(grams)} g`;
}
