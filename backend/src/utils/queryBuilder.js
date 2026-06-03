// Build a dynamic MongoDB filter object from standard req.query
const buildQuery = (query) => {
  const filter = {};

  if (query.country) filter.countryCode = String(query.country).toUpperCase();
  if (query.year) filter.year = Number(query.year);
  if (query.month) filter.month = Number(query.month);
  if (query.indicator)
    filter.indicatorCode = String(query.indicator).toUpperCase();
  if (query.frequency) filter.frequency = String(query.frequency).toUpperCase();

  // Range Queries for values
  if (query.minValue || query.maxValue) {
    filter.value = {};
    if (query.minValue) filter.value.$gte = Number(query.minValue);
    if (query.maxValue) filter.value.$lte = Number(query.maxValue);
  }

  // Regex Text Search across names
  if (query.search) {
    filter.indicatorName = { $regex: query.search, $options: "i" };
  }

  return filter;
};

// Extract and build mongoose sort string logic
const buildSort = (query) => {
  if (query.sort) {
    // Convert 'year,value' format from query URL to 'year value' for Mongoose Engine
    return query.sort.split(",").join(" ");
  }
  // Default sort by most recent timeline
  return "-year -month";
};

module.exports = { buildQuery, buildSort };
