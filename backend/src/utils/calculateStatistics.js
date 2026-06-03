// Safely calculate mathematical average from an array of numbers
const calculateAverage = (numbersArray) => {
  if (!numbersArray || !numbersArray.length) return 0;
  const sum = numbersArray.reduce((acc, curr) => acc + Number(curr), 0);
  return Number((sum / numbersArray.length).toFixed(2));
};

// Calculate percentage growth safely preventing divide-by-zero crashes
const calculateGrowth = (currentValue, previousValue) => {
  if (!previousValue || previousValue === 0) return 0;
  const growth = ((currentValue - previousValue) / previousValue) * 100;
  return Number(growth.toFixed(2));
};

// Organize array of numbers into distribution buckets for histogram graphs
const calculateDistribution = (numbersArray, bucketSize = 10) => {
  const buckets = {};
  numbersArray.forEach((num) => {
    const bucketStart = Math.floor(num / bucketSize) * bucketSize;
    const bucketRange = `${bucketStart}-${bucketStart + bucketSize - 1}`;
    buckets[bucketRange] = (buckets[bucketRange] || 0) + 1;
  });
  return buckets;
};

module.exports = { calculateAverage, calculateGrowth, calculateDistribution };
