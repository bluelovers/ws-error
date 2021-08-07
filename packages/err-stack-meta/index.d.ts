import { ITSPickExtra } from 'ts-type';
export interface IErrStackMeta<E extends Error> {
    prefix: string;
    message: string;
    stack: string;
    error: E;
}
export declare function errStackMeta<E extends Error>(error: E): IErrStackMeta<E>;
export declare function stringifyStackMeta(meta: ITSPickExtra<IErrStackMeta<any>, 'prefix' | 'message'>, stack?: string): string;
export default errStackMeta;
