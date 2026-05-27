const getPaginationOptions = (req) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const sort = { [sortBy]: sortOrder };

    return { page, limit, skip, sort };
};

const getPaginatedPayload = (data, page, limit, totalDocs) => {
    const totalPages = Math.ceil(totalDocs / limit);
    
    return {
        data,
        pagination: {
            totalDocs,
            limit,
            page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        }
    };
};

module.exports = {
    getPaginationOptions,
    getPaginatedPayload
};
