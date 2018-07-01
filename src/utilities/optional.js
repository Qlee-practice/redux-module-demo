const hasValue = value => value !== null && value !== undefined;

export class Optional {
  static of(value) {
    return new Optional(value);
  }

  constructor(value) {
    this.value = value;
  }

  ifPresent(fn) {
    if (hasValue(this.value)) fn(this.value);
    return this;
  }

  ifEmpty(fn) {
    if (!hasValue(this.value)) fn();
    return this;
  }

  map(fn) {
    return hasValue(this.value) ? Optional.of(fn(this.value)) : this;
  }

  orElse(value) {
    return hasValue(this.value) ? this.value : value;
  }

  orElseGet(fn) {
    return hasValue(this.value) ? this.value : fn();
  }

  orElseThrow(fn) {
    if (hasValue(this.value)) {
      return this.value;
    }
    throw fn();
  }
}