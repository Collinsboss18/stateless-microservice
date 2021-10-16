class SuccessResponse {
  constructor(data, message = "Successful") {
    this.message = message;
    this.data = data;
  }
}

module.exports = SuccessResponse;
