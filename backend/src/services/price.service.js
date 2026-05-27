const { DataPoint } = require("../models/dataPoint.model");

class PriceService {
    /**
     * Build MongoDB filter object based on query parameters
     */
    buildFilter(query) {
        const filter = {};

        if (query.country) {
            filter.country = query.country;
        }

        if (query.indicator) {
            filter.indicator = query.indicator;
        }

        if (query.year) {
            filter.year = parseInt(query.year, 10);
        }

        if (query.month) {
            filter.month = parseInt(query.month, 10);
        }

        if (query.frequency) {
            filter.frequency = query.frequency;
        }

        // Handle value range filtering
        if (query.minValue !== undefined || query.maxValue !== undefined) {
            filter.value = {};
            if (query.minValue !== undefined) filter.value.$gte = parseFloat(query.minValue);
            if (query.maxValue !== undefined) filter.value.$lte = parseFloat(query.maxValue);
        }

        // Handle year range filtering
        if (query.startYear || query.endYear) {
            filter.year = {};
            if (query.startYear) filter.year.$gte = parseInt(query.startYear, 10);
            if (query.endYear) filter.year.$lte = parseInt(query.endYear, 10);
        }

        return filter;
    }

    /**
     * Get paginated prices based on filters
     */
    async getPrices(filter, options) {
        const { skip, limit, sort } = options;
        
        const data = await DataPoint.find(filter)
            .populate('country', 'countryCode countryName')
            .populate('indicator', 'indicatorCode indicatorLabel')
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean();

        const totalDocs = await DataPoint.countDocuments(filter);

        return { data, totalDocs };
    }
}

module.exports = new PriceService();
