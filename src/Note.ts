export class Note {
  _tune: string
  _value: string

  set tune(v: string) {
    this._tune = v;
    if (v == undefined) {
      console.error("no tune");
      //  throw "no tune";
    }
  }

  set value(v: string) {
    this._value = v;
    if (v == undefined) {
      console.error("no value");
      //  throw "no tune";
    }
  }

  get tune() {
    return this._tune
  }

  get value() {
    return this._value
  }


  constructor(tune: string, value: string) {
    this.tune = tune;

    this.value = value;
  }


  toJson(): string {
    return JSON.stringify({
      value: this._value,
      tune: this._tune
    })
  }
}
