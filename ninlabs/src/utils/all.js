/** */
export const getFormattedDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

export function slugifyCategory(category) {
  return category
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters
    .trim() // Remove leading/trailing whitespace
    .replace(/\s+/g, '-'); // Replace spaces with dashes
}