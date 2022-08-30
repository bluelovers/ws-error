import { IErrStackMeta } from 'err-stack-meta';
declare const SymbolErrStackMeta: unique symbol;
declare const SymbolStackInited: unique symbol;
declare const SymbolStackChanged: unique symbol;
export { SymbolErrStackMeta, SymbolStackInited, SymbolStackChanged };
export interface AggregateErrorExtra<T = Error> extends Omit<Array<T>, number | keyof AggregateError | 'toLocaleString'> {
    [k: number]: T;
}
declare const AggregateErrorExtra_base: new (...baseInstances: import("@bluelovers/extend-bases").IInstancesArray<[AggregateErrorConstructor, ArrayConstructor]>) => import("@bluelovers/extend-bases").IHasBases<[AggregateErrorConstructor, ArrayConstructor]>;
export declare class AggregateErrorExtra<T = Error> extends AggregateErrorExtra_base {
    [SymbolErrStackMeta]: IErrStackMeta<this>;
    [SymbolStackInited]: boolean;
    [SymbolStackChanged]: boolean;
    constructor(errors?: Iterable<any>, message?: string);
    get code(): string;
    set code(code: string);
    set name(value: string);
    get message(): string;
    set message(message: string);
    meta(refresh?: boolean): IErrStackMeta<this>;
    get stack(): string;
    set stack(stack: string);
    get errors(): T[];
    set errors(errors: Iterable<T>);
    toString(): string;
    /**
     * @private
     */
    protected toLocaleString(): string;
}
export default AggregateErrorExtra;
