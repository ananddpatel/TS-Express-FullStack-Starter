export abstract class StatusMessage {
  success: boolean;
  message: string;

  expandOtherProps(other: {}): void {
    for (const key in other) {
      if (other.hasOwnProperty(key)) {
        const element = other[key];
        this[key] = element;
      }
    }
  }
}

export class SuccessMessage extends StatusMessage {
  constructor(message: string, other: {} = {}) {
    super();
    this.success = true;
    this.message = message;
    this.expandOtherProps(other)
  }
}

export class ErrorMessage extends StatusMessage {
  constructor(message: string, other: {} = {}) {
    super();
    this.success = false;
    this.message = message;
    this.expandOtherProps(other)
  }
}
