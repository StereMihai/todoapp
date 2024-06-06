import { CustomError } from "./CustomError";

export default class HandleError extends CustomError {

  private readonly _code: number;
  private readonly _logging: boolean;
  private readonly _context: { [key: string]: any };

  constructor(params: {code: number, message: string, logging?: boolean, context?: { [key: string]: any }}) {
    const { code, message, logging } = params || {};
    
    super(message);
    this._code = code;
    this._logging = logging || false;
    this._context = params?.context || {};

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, HandleError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }
}