import { toString62, toStringN } from 'num2str';

let date = new Date();
let count = 0;
let uCount = -1;
function uid() {
    return `${toString62(random())}${toString62(udate())}${toString62(udatecount())}`;
}
function udate() {
    const now = new Date();
    if (date == now) {
        count++;
    }
    else {
        count = 0;
        date = now;
    }
    return new Date().getTime();
}
function udatecount() {
    return count;
}
function random() {
    return +Math.random().toString().substr(2);
}
function ucount() {
    uCount++;
    return uCount;
}
function chain() {
    return {
        random: () => local_chain([], random),
        time: () => local_chain([], udate),
        timecount: () => local_chain([], udatecount),
        count: () => local_chain([], ucount),
        add: fn => local_chain([], fn)
    };
}
function local_chain(list, fn) {
    function getNewList() {
        return list.concat(fn);
    }
    return get_chain(getNewList, () => list);
}
function map_chain(list, cb) {
    function getNewList() {
        return list.map(cb);
    }
    return get_chain(getNewList, () => list);
}
function get_chain(getNewList, getList) {
    return {
        random: () => local_chain(getNewList(), random),
        time: () => local_chain(getNewList(), udate),
        timecount: () => local_chain(getNewList(), udatecount),
        count: () => local_chain(getNewList(), ucount),
        add: nfn => local_chain(getNewList(), nfn),
        get: () => chain_get(getList()),
        getX62: () => map_chain(getNewList(), f => () => {
            const sn = f();
            return typeof sn === 'number' ? toString62(sn) : sn;
        }).get(),
        getXn: (r) => (map_chain(getNewList(), f => () => {
            const sn = f();
            return typeof sn === 'number' ? toStringN(sn, r) : sn;
        })).get(),
        map: cb => map_chain(getNewList(), cb)
    };
}
function chain_get(list) {
    return () => list.map(fn => fn()).join('');
}

export { uid, udate, udatecount, random, ucount, chain };
