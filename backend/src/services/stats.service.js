const { DataPoint } = require("../models/dataPoint.model");
const { Country } = require("../models/country.model");
const { Indicator } = require("../models/indicator.model");

class StatsService {
    /**
     * Get global average for an indicator across all countries in a specific year.
     * Since indicator._id IS the indicatorCode string, we use findById directly.
     */
    async getGlobalAverage(indicatorCode, year) {
        // _id is the indicator code - use findById, not findOne({ indicatorCode })
        const indicator = await Indicator.findById(indicatorCode.toUpperCase());
        if (!indicator) return null;

        const matchStage = { indicator: indicator._id };
        if (year) matchStage.year = parseInt(year, 10);

        const result = await DataPoint.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: { indicator: "$indicator", year: "$year" },
                    averageValue: { $avg: "$value" },
                    minVal: { $min: "$value" },
                    maxVal: { $max: "$value" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": -1 } }
        ]);

        return result;
    }

    /**
     * Get top/bottom performing countries for a specific indicator.
     * country._id IS the countryCode string, so $lookup foreignField '_id' is correct.
     */
    async getTopCountries(indicatorCode, year, limit = 10, sortOrder = -1) {
        const indicator = await Indicator.findById(indicatorCode.toUpperCase());
        if (!indicator) return null;

        const matchStage = { indicator: indicator._id };
        if (year) matchStage.year = parseInt(year, 10);

        const result = await DataPoint.aggregate([
            { $match: matchStage },
            { $sort: { value: sortOrder } },
            { $limit: parseInt(limit, 10) },
            {
                $lookup: {
                    from: "countries",
                    localField: "country",
                    foreignField: "_id",
                    as: "countryDetails"
                }
            },
            { $unwind: "$countryDetails" },
            {
                $project: {
                    _id: 0,
                    countryCode: "$countryDetails._id",   // _id IS the code
                    countryName: "$countryDetails.name",  // name IS the country name
                    value: 1,
                    year: 1,
                    month: 1
                }
            }
        ]);

        return result;
    }

    /**
     * Compare two countries for a specific indicator across a range of years.
     * Both country and indicator _id fields ARE the string codes.
     */
    async compareCountries(countryCode1, countryCode2, indicatorCode) {
        // findById because _id IS the code
        const country1 = await Country.findById(countryCode1.toUpperCase());
        const country2 = await Country.findById(countryCode2.toUpperCase());
        const indicator = await Indicator.findById(indicatorCode.toUpperCase());

        if (!country1 || !country2 || !indicator) return null;

        const result = await DataPoint.aggregate([
            {
                $match: {
                    indicator: indicator._id,
                    country: { $in: [country1._id, country2._id] }
                }
            },
            {
                $lookup: {
                    from: "countries",
                    localField: "country",
                    foreignField: "_id",
                    as: "countryDetails"
                }
            },
            { $unwind: "$countryDetails" },
            {
                $group: {
                    _id: "$year",
                    data: {
                        $push: {
                            country: "$countryDetails._id",   // _id IS the code
                            countryName: "$countryDetails.name",
                            value: "$value"
                        }
                    }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        return result;
    }
}

module.exports = new StatsService();
