export function formatPrice(price) {
  if (price == null || price === "") return "";

  return Number(price).toLocaleString("fa-IR");
}

export function toEnglishNumber(value = "") {
  return value
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/,/g, "")
    .replace(/٬/g, "");
}

export function parsePrice(value) {
  return toEnglishNumber(value).replace(/\D/g, "");
}