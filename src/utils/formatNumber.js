export function formatNumber(value) {
  if (value == null || value === "") return "";

  return value.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}

export function parseNumber(value) {
  return value
    .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    .replace(/\D/g, "");
}