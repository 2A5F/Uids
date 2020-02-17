import { toString62, toStringN } from "num2str"

let date = new Date()
let count = 0
let uCount = -1

export function uid() {
    return `${toString62(random())}${toString62(udate())}${toString62(udatecount())}`
}

export function udate(): number {
    const now = new Date()
    if (+date == +now) {
        count++
    } else {
        count = 0
        date = now
    }
    return new Date().getTime()
}

export function udatecount(): number {
    return count
}

export function random(): number {
    return +Math.random().toString().substr(2)
}

export function ucount(): number {
    uCount++
    return uCount
}

export function chain(): UidChainFirst {
    return {
        random: () => local_chain([], random),
        time: () => local_chain([], udate),
        timecount: () => local_chain([], udatecount),
        count: () => local_chain([], ucount),
        add: fn => local_chain([], fn)
    }
}
function local_chain(list: (() => number | string)[], fn: () => number | string): UidChain {
    function getNewList() {
        return list.concat(fn)
    }
    return get_chain(getNewList, () => list)
}
function map_chain(list: (() => number | string)[], cb: (fn: () => number | string) => () => number | string): UidChain {
    function getNewList() {
        return list.map(cb)
    }
    return get_chain(getNewList, () => list)
}
function get_chain(getNewList: () => (() => string | number)[], getList: () => (() => string | number)[]): UidChain {
    return {
        random: () => local_chain(getNewList(), random),
        time: () => local_chain(getNewList(), udate),
        timecount: () => local_chain(getNewList(), udatecount),
        count: () => local_chain(getNewList(), ucount),
        add: nfn => local_chain(getNewList(), nfn),
        get: () => chain_get(getList()),
        getJoin: c => chain_getJoin(getList(), c),
        mapX62: () => map_chain(getNewList(), f => () => {
            const sn = f()
            return typeof sn === 'number' ? toString62(sn) : sn
        }),
        mapXn: (r: number) => (map_chain(getNewList(), f => () => {
            const sn = f()
            return typeof sn === 'number' ? toStringN(sn, r) : sn
        })),
        map: cb => map_chain(getNewList(), cb)
    }
}
function chain_get(list: (() => number | string)[]): () => string {
    return () => list.map(fn => fn()).join('')
}
function chain_getJoin(list: (() => number | string)[], c?: string): () => string {
    return () => list.map(fn => fn()).join(c)
}

interface UidChainFirst {
    random: () => UidChain,
    time: () => UidChain,
    timecount: () => UidChain,
    count: () => UidChain,
    add: (fn: () => number | string) => UidChain
}
interface UidChain extends UidChainFirst{
    get: () => () => string
    getJoin: (c?: string) => () => string
    mapX62: () => UidChain
    mapXn: (r: number) => UidChain
    map: (cb: (fn: () => number | string) => (() => number | string)) => UidChain
}