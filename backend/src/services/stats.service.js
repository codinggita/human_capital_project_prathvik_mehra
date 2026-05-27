const { DataPoint } = require("../models/dataPoint.model");
const { Country } = require("../models/country.model");
const { Indicator } = require("../models/indicator.model");
const mongoose = require("mongoose");

class StatsService {
    /**
     * Get global average for an indicator across all countries in a specific year
     */
    async getGlobalAverage(indicatorCode, year) {
        const indicator = await Indicator.findOne({ indicatorCode });
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
     * Get top/bottom performing countries for a specific indicator
     */
    async getTopCountries(indicatorCode, year, limit = 10, sortOrder = -1) {
        const indicator = await Indicator.findOne({ indicatorCode });
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
                    country: "$countryDetails.countryName",
                    countryCode: "$countryDetails.countryCode",
                    value: 1,
                    year: 1,
                    month: 1
                }
            }
        ]);

        return result;
    }

    /**
     * Compare two countries for a specific indicator across a range of years
     */
    async compareCountries(countryCode1, countryCode2, indicatorCode) {
        const country1 = await Country.findOne({ countryCode: countryCode1 });
        const country2 = await Country.findOne({ countryCode: countryCode2 });
        const indicator = await Indicator.findOne({ indicatorCode });

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
                            country: "$countryDetails.countryCode",
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
