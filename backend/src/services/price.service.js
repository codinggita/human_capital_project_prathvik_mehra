const { DataPoint } = require("../models/dataPoint.model");

class PriceService {
    /**
     * Build MongoDB filter object based on query parameters
     * country/indicator fields in DataPoint schema are Strings matching _id of Country/Indicator
     */
    buildFilter(query) {
        const filter = {};

        // country and indicator are stored as String _id values (e.g. "IND", "FAO_CP_23012")
        if (query.country) {
            filter.country = typeof query.country === 'string'
                ? query.country.toUpperCase()
                : query.country; // ObjectId passed directly from controller lookup
        }

        if (query.indicator) {
            filter.indicator = query.indicator.toString().toUpperCase();
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

        // Handle year range filtering (overrides single year)
        if (query.startYear || query.endYear) {
            filter.year = {};
            if (query.startYear) filter.year.$gte = parseInt(query.startYear, 10);
            if (query.endYear) filter.year.$lte = parseInt(query.endYear, 10);
        }

        return filter;
    }

    /**
     * Get paginated prices based on filters.
     * Since country._id and indicator._id ARE the string codes, populate works
     * with 'name' and 'label' which are the actual field names in schema.
     */
    async getPrices(filter, options) {
        const { skip, limit, sort } = options;

        const data = await DataPoint.find(filter)
            .populate('country', 'name')     // schema field is 'name' (not countryName)
            .populate('indicator', 'label')  // schema field is 'label' (not indicatorLabel)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean({ virtuals: true });       // include virtuals so countryCode/countryName appear

        const totalDocs = await DataPoint.countDocuments(filter);

        return { data, totalDocs };
    }
}

module.exports = new PriceService();
