class ApiResponse = {
    constructor(statusCode, success, message, data) {
        this.statusCode = statusCode;
        this.success = statusCode <400;
        this.message = message;
        this.data = data;
    }
}