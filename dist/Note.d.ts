export declare class Note {
    _tune: string;
    _value: string;
    set tune(v: string);
    set value(v: string);
    get tune(): string;
    get value(): string;
    constructor(tune: string, value: string);
    toJson(): string;
}
