class ConsultError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }

  static throw(code = 500, message = '') {
    throw new ConsultError(code, message);
  }
}

exports.error = ConsultError;
