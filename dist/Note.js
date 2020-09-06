export class Note {
    set tune(v) {
        this._tune = v;
        if (v == undefined) {
            console.error("no tune");
            //  throw "no tune";
        }
    }
    set value(v) {
        this._value = v;
        if (v == undefined) {
            console.error("no value");
            //  throw "no tune";
        }
    }
    get tune() {
        return this._tune;
    }
    get value() {
        return this._value;
    }
    constructor(tune, value) {
        this.tune = tune;
        this.value = value;
    }
    toJson() {
        return JSON.stringify({
            value: this._value,
            tune: this._tune
        });
    }
}
