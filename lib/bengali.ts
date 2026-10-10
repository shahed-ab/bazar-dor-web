const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

const BANGLA_DAYS = [
  'রবিবার',
  'সোমবার',
  'মঙ্গলবার',
  'বুধবার',
  'বৃহস্পতিবার',
  'শুক্রবার',
  'শনিবার',
];

const BANGLA_MONTHS = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];


export function toBengaliDigits(
  input: number | string | null | undefined,
  formatThousands: boolean = false
): string {
  if (input === null || input === undefined) return '';

  let str: string;
  if (typeof input === 'number') {
    if (formatThousands) {
      const [intPart, decPart] = input.toString().split('.');
      const formattedInt = Number(intPart).toLocaleString('en-US');
      str = decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
    } else {
      str = input.toString();
    }
  } else {
    str = input;
  }

  return str.replace(/[0-9]/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)]);
}


export function fromBengaliDigits(input: string | null | undefined): number {
  if (!input) return 0;
  const normalized = input
    .replace(/[০-৯]/g, (char) => {
      const idx = BENGALI_DIGITS.indexOf(char);
      return idx !== -1 ? String(idx) : char;
    })
    .replace(/[^0-9.-]/g, '');

  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}


export function formatPrice(price: number | string | null | undefined): string {
  if (price === null || price === undefined) return '০ টাকা';
  const num = typeof price === 'number' ? price : fromBengaliDigits(String(price));
  return `${toBengaliDigits(num, true)} টাকা`;
}


export function formatUnit(unit: string | null | undefined): string {
  switch (unit) {
    case 'kg':
      return 'প্রতি কেজি';
    case 'litre':
      return 'প্রতি লিটার';
    case 'dozen':
      return 'প্রতি ডজন';
    case 'piece':
      return 'প্রতি পিস';
    default:
      return unit ? `প্রতি ${unit}` : '';
  }
}


export function formatTickerUnit(unit: string | null | undefined): string {
  switch (unit) {
    case 'kg':
      return 'টাকা/কেজি';
    case 'litre':
      return 'টাকা/লিটার';
    case 'dozen':
      return 'টাকা/ডজন';
    case 'piece':
      return 'টাকা/পিস';
    default:
      return unit ? `টাকা/${unit}` : 'টাকা';
  }
}


export function getBengaliDate(date: Date = new Date()): string {
  const dayName = BANGLA_DAYS[date.getDay()];
  const day = toBengaliDigits(date.getDate());
  const monthName = BANGLA_MONTHS[date.getMonth()];
  const year = toBengaliDigits(date.getFullYear());

  return `${dayName}, ${day} ${monthName}, ${year}`;
}
