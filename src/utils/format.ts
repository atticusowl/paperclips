// Number formatting utilities for Universal Paperclips
// Matches the original game's formatting exactly

const SUFFIXES = [
  '', '', 'million', 'billion', 'trillion', 'quadrillion',
  'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion',
  'decillion', 'undecillion', 'duodecillion', 'tredecillion',
  'quattuordecillion', 'quindecillion', 'sexdecillion', 'septendecillion',
  'octodecillion', 'novemdecillion', 'vigintillion'
];

/**
 * Formats numbers like the original game
 * - Under 1 million: use toLocaleString (e.g., "2,000", "999,999")
 * - 1 million+: use word suffixes (e.g., "1.50 million")
 */
export function formatNumber(num: number, decimals = 0): string {
  if (num < 0) {
    return '-' + formatNumber(-num, decimals);
  }
  
  // Under 1 million: use comma formatting
  if (num < 1000000) {
    if (decimals > 0) {
      return num.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }
    return Math.floor(num).toLocaleString();
  }
  
  // 1 million+: use word suffixes like original numberCruncher
  const tier = Math.floor(Math.log10(Math.abs(num)) / 3);
  
  if (tier < SUFFIXES.length && SUFFIXES[tier]) {
    const scale = Math.pow(10, tier * 3);
    const scaled = num / scale;
    return `${scaled.toFixed(2)} ${SUFFIXES[tier]}`;
  }
  
  // Fallback for extremely large numbers
  return num.toExponential(2);
}

/**
 * Formats currency values
 * Original uses toLocaleString with 2 decimal places
 */
export function formatMoney(num: number): string {
  return num.toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
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
