// Number formatting utilities for Universal Paperclips
// Matches the original game's numberCruncher function exactly

/**
 * Formats numbers exactly like the original game's numberCruncher function
 * Original thresholds:
 * - > 999: "X.XX thousand"
 * - > 999,999: "X.XX million"
 * - > 999,999,999: "X.XX billion"
 * - etc.
 * 
 * Note: For display of clips in human phase, original uses toLocaleString directly
 */
export function numberCruncher(num: number, decimals = 2): string {
  let suffix = '';
  let precision = decimals;
  let number = num;
  
  if (number > 999999999999999999999999999999999999999999999999999) {
    number = number / 1000000000000000000000000000000000000000000000000000;
    suffix = 'sexdecillion';
  } else if (number > 999999999999999999999999999999999999999999999999) {
    number = number / 1000000000000000000000000000000000000000000000000;
    suffix = 'quindecillion';
  } else if (number > 999999999999999999999999999999999999999999999) {
    number = number / 1000000000000000000000000000000000000000000000;
    suffix = 'quattuordecillion';
  } else if (number > 999999999999999999999999999999999999999999) {
    number = number / 1000000000000000000000000000000000000000000;
    suffix = 'tredecillion';
  } else if (number > 999999999999999999999999999999999999999) {
    number = number / 1000000000000000000000000000000000000000;
    suffix = 'duodecillion';
  } else if (number > 999999999999999999999999999999999999) {
    number = number / 1000000000000000000000000000000000000;
    suffix = 'undecillion';
  } else if (number > 999999999999999999999999999999999) {
    number = number / 1000000000000000000000000000000000;
    suffix = 'decillion';
  } else if (number > 999999999999999999999999999999) {
    number = number / 1000000000000000000000000000000;
    suffix = 'nonillion';
  } else if (number > 999999999999999999999999999) {
    number = number / 1000000000000000000000000000;
    suffix = 'octillion';
  } else if (number > 999999999999999999999999) {
    number = number / 1000000000000000000000000;
    suffix = 'septillion';
  } else if (number > 999999999999999999999) {
    number = number / 1000000000000000000000;
    suffix = 'sextillion';
  } else if (number > 999999999999999999) {
    number = number / 1000000000000000000;
    suffix = 'quintillion';
  } else if (number > 999999999999999) {
    number = number / 1000000000000000;
    suffix = 'quadrillion';
  } else if (number > 999999999999) {
    number = number / 1000000000000;
    suffix = 'trillion';
  } else if (number > 999999999) {
    number = number / 1000000000;
    suffix = 'billion';
  } else if (number > 999999) {
    number = number / 1000000;
    suffix = 'million';
  } else if (number > 999) {
    number = number / 1000;
    suffix = 'thousand';
  } else if (number < 1000) {
    precision = 0;
  }
  
  return number.toFixed(precision) + ' ' + suffix;
}

/**
 * Formats numbers for display
 * - Under 1000: plain integer with commas
 * - 1000+: use numberCruncher with word suffixes
 */
export function formatNumber(num: number, decimals = 0): string {
  if (num < 0) {
    return '-' + formatNumber(-num, decimals);
  }
  
  // Under 1000: use comma formatting (original uses toLocaleString for small numbers)
  if (num < 1000) {
    if (decimals > 0) {
      return num.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }
    return Math.floor(num).toLocaleString();
  }
  
  // 1000+: use numberCruncher format
  return numberCruncher(num, 2);
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
