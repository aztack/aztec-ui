export type ValueOf<T> = T[keyof T];
export type PermutationOfCombination<T extends string, U extends string = T> =
    T extends any ? (T | `${T} ${PermutationOfCombination<Exclude<U, T>>}`) : never;
