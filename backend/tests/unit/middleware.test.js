const { asyncHandler } = require('../../src/middlewares/asyncHandler');
const { errorHandler } = require('../../src/middlewares/errorHandler');
const { ApiError } = require('../../src/utils/ApiError');

describe('Middlewares: asyncHandler', () => {
    it('should resolve the promise and call next if an error occurs', async () => {
        const mockError = new Error('Async error');
        const req = {};
        const res = {};
        const next = jest.fn();
        
        const requestHandler = jest.fn().mockRejectedValue(mockError);
        const wrappedHandler = asyncHandler(requestHandler);
        
        await wrappedHandler(req, res, next);
        
        expect(requestHandler).toHaveBeenCalledWith(req, res, next);
        expect(next).toHaveBeenCalledWith(mockError);
    });
});

describe('Middlewares: errorHandler', () => {
    it('should format ApiError correctly', () => {
        const err = new ApiError(400, 'Bad Request');
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 400,
            message: 'Bad Request',
            success: false,
            errors: []
        }));
    });

    it('should format generic errors into ApiError format', () => {
        const err = new Error('Standard Error');
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 500,
            message: 'Standard Error',
            success: false
        }));
    });
});
