const { ApiError } = require('../../src/utils/ApiError');
const { ApiResponse } = require('../../src/utils/apiResponse');

describe('Utils: ApiError', () => {
    it('should create an ApiError instance with correct properties', () => {
        const error = new ApiError(404, 'Not Found', ['Item not found']);
        
        expect(error).toBeInstanceOf(Error);
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe('Not Found');
        expect(error.errors).toEqual(['Item not found']);
        expect(error.success).toBe(false);
        expect(error.data).toBeNull();
    });

    it('should use default message if none is provided', () => {
        const error = new ApiError(500);
        expect(error.message).toBe('Something went wrong');
    });
});

describe('Utils: ApiResponse', () => {
    it('should create an ApiResponse instance for successful operations', () => {
        const response = new ApiResponse(200, { id: 1 }, 'Fetched successfully');
        
        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual({ id: 1 });
        expect(response.message).toBe('Fetched successfully');
        expect(response.success).toBe(true);
    });

    it('should use default message "Success" if none is provided', () => {
        const response = new ApiResponse(201, { name: 'Test' });
        expect(response.message).toBe('Success');
    });
});
