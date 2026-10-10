const bnDigits: { [key: string]: string } = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
  ".": ".",
  ",": ",",
};

/**
 * Converts English numbers or strings to Bengali digits.
 */
export function toBnNum(num: number | string): string {
  if (num === null || num === undefined) return "";
  const str = num.toString();
  return str.replace(/[0-9]/g, (digit) => bnDigits[digit] || digit);
}

/**
 * Formats a price with commas and Bengali digits e.g. 1850 -> ১,৮৫০
 */
export function formatBnPrice(price: number | string): string {
  if (price === null || price === undefined || isNaN(Number(price))) return "০";
  const formatted = Number(price).toLocaleString("en-IN");
  return toBnNum(formatted);
}

/**
 * Maps product unit code to Bengali readable unit string
 */
export function formatUnit(unit: string): string {
  switch (unit?.toLowerCase()) {
    case "kg":
      return "প্রতি কেজি";
    case "litre":
    case "liter":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
      return "প্রতি পিস";
    default:
      return unit ? `প্রতি ${unit}` : "প্রতি একক";
  }
}

/**
 * Short unit (e.g. কেজি, লিটার, ডজন, পিস)
 */
export function formatUnitShort(unit: string): string {
  switch (unit?.toLowerCase()) {
    case "kg":
      return "কেজি";
    case "litre":
    case "liter":
      return "লিটার";
    case "dozen":
      return "ডজন";
    case "piece":
      return "পিস";
    default:
      return unit || "একক";
  }
}

const bnDays = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const bnMonths = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

/**
 * Returns formatted Bengali Date: e.g. "শনিবার, ১০ অক্টোবর ২০২৬"
 */
export function getBanglaDate(date = new Date()): string {
  const dayName = bnDays[date.getDay()];
  const day = toBnNum(date.getDate());
  const monthName = bnMonths[date.getMonth()];
  const year = toBnNum(date.getFullYear());

  return `${dayName}, ${day} ${monthName} ${year}`;
}
