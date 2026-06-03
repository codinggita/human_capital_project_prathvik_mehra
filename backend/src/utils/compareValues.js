// Compare two numerical values and return accurate mathematical percentage difference
const calculatePercentageDifference = (val1, val2) => {
  if (!val1 || !val2) return 0;
  return Number((((val1 - val2) / val2) * 100).toFixed(2));
};

const compareCountryData = (country1Stats, country2Stats) => {
  return {
    difference: country1Stats.avg - country2Stats.avg,
    percentage: calculatePercentageDifference(
      country1Stats.avg,
      country2Stats.avg,
    ),
  };
};

const compareYearData = (year1Avg, year2Avg) => {
  return {
    difference: year1Avg - year2Avg,
    percentage: calculatePercentageDifference(year1Avg, year2Avg),
  };
};

module.exports = {
  compareCountryData,
  compareYearData,
  calculatePercentageDifference,
};
