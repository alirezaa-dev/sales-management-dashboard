export function formatDate(date) {
  return date
    .replaceAll("-", "/")
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}