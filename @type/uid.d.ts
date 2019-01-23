export declare function uid(): string;
export declare function udate(): number;
export declare function udatecount(): number;
export declare function random(): number;
export declare function ucount(): number;
export declare function chain(): UidChainFirst;
interface UidChainFirst {
    random: () => UidChain;
    time: () => UidChain;
    timecount: () => UidChain;
    count: () => UidChain;
    add: (fn: () => number | string) => UidChain;
}
interface UidChain extends UidChainFirst {
    get: () => () => string;
    getX62: () => () => string;
    getXn: (r: number) => () => string;
    map: (cb: (fn: () => number | string) => (() => number | string)) => UidChain;
}
export {};
