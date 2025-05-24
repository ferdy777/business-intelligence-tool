interface NairaFormatOptions {
  /** Whether to show the ₦ symbol (default: true) */
  showSymbol?: boolean;
  /** Number of decimal places (default: 2) */
  decimalPlaces?: number;
  /** Whether to use comma separators (default: true) */
  useCommas?: boolean;
  /** Position of the currency symbol (default: 'before') */
  symbolPosition?: "before" | "after";
}

/**
 * Type for values that can be converted to currency
 */
type CurrencyValue = number | string | null | undefined;

/**
 * Format a number as Nigerian Naira currency
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: CurrencyValue,
  options: NairaFormatOptions = {}
): string => {
  // Default options
  const {
    showSymbol = true,
    decimalPlaces = 2,
    useCommas = true,
    symbolPosition = "before",
  } = options;

  // Convert to number and handle invalid inputs
  const numAmount = parseFloat(String(amount || 0));
  if (isNaN(numAmount)) {
    return showSymbol ? "₦0.00" : "0.00";
  }

  // Format the number
  let formatted = numAmount.toFixed(decimalPlaces);

  // Add comma separators if requested
  if (useCommas) {
    const parts = formatted.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formatted = parts.join(".");
  }

  // Add currency symbol
  if (showSymbol) {
    const symbol = "₦";
    formatted =
      symbolPosition === "before"
        ? `${symbol}${formatted}`
        : `${formatted}${symbol}`;
  }

  return formatted;
};
