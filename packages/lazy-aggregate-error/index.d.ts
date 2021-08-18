import { IErrStackMeta } from 'err-stack-meta/index';
declare const SymbolErrStackMeta: unique symbol;
export { SymbolErrStackMeta };
declare const AggregateErrorExtra_base: new (...baseInstances: import("@bluelovers/extend-bases").InstancesArray<[AggregateErrorConstructor, ArrayConstructor]>) => import("@bluelovers/extend-bases").HasBases<[AggregateErrorConstructor, ArrayConstructor]>;
export declare class AggregateErrorExtra<T> extends AggregateErrorExtra_base {
    [SymbolErrStackMeta]: IErrStackMeta<this>;
    constructor(errors?: Iterable<any>, message?: string);
    get code(): string;
    set code(value: string);
    set name(value: string);
    get message(): string;
    set message(message: string);
    meta(refresh?: boolean): IErrStackMeta<this>;
    get stack(): string;
    set stack(stack: string);
    get errors(): T[];
    set errors(errors: Iterable<T>);
    toString(): string;
}
export default AggregateErrorExtra;
