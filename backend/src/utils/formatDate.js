// Consistently format native Date objects to readable standard forms
const formatDate = (dateInput) => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return null;

  return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD cleanly
};

// Generate human readable timestamp e.g. "Oct 12, 2023, 10:30 AM"
const formatTimestamp = (dateInput) => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return null;

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

module.exports = { formatDate, formatTimestamp };
