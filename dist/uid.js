(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.uid = {}));
}(this, (function (exports) { 'use strict';

    const numsys = (() => {
        const sys = [];
        for (let i = 0; i < 36; i++) {
            sys[i] = i.toString(36);
        }
        for (let i = 10; i < 36; i++) {
            sys[i + 26] = i.toString(36).toUpperCase();
        }
        sys.push('+', '/', '!', '#', '$', '%', '&', '^', '(', ')', '\\', ':', ';', '=', '>', '?', '@', '[', ']', '{', '}', '|', '<', '>');
        function addRange(from, to) {
            for (let i = from; i <= to; i++) {
                sys.push(String.fromCharCode(i));
            }
        }
        addRange(8544, 8555);
        addRange(3840, 3850);
        addRange(4256, 4293);
        addRange(5792, 5866);
        addRange(5792, 5866);
        addRange(9312, 9449);
        addRange(12258, 12270);
        addRange(19904, 19967);
        return sys;
    })();
    function numsys2n(size) {
        function num2(num, m, n) {
            if (num == 0) {
                return '0';
            }
            if (num < 0) {
                return `-${num2(-num)}`;
            }
            if (num < 1) {
                const f = num * size;
                const i = parseInt(f);
                if (typeof m != 'number' || m < 0)
                    m = num.toString().length - 2;
                if (typeof n != 'number' || n < 0)
                    n = 0;
                n += i.toString().length;
                if (n == m)
                    return `0.${numsys[i]}`;
                return `0.${numsys[i]}${num2(f - i, m, n).substr(2)}`;
            }
            const intNum = parseInt(num);
            if (num - intNum != 0) {
                return `${num2(intNum)}${num2(num - intNum).substr(1)}`;
            }
            const mod = numsys[num % size];
            if (num >= size) {
                return `${num2(parseInt(num / size))}${mod}`;
            }
            return mod;
        }
        return num2;
    }
    const numsys_2_62 = numsys2n(62);
    function toString62(num) { return numsys_2_62(num); }
    function toStringN(num, radix) {
        if (radix == '正') {
            const z = parseInt(num / 5);
            const o = num % 5;
            const m = ['', '﹏', '丄', '上', '止'];
            return `${z == 0 ? '' : '正'}${Array(z).join('正')}${m[o]}`;
        }
        if (typeof radix != 'number')
            return num.toString();
        if (radix == 1)
            return `${num == 0 ? '' : '1'}${Array(num).join('1')}`;
        if (radix < 1 || radix > numsys.length)
            throw new RangeError(`toStringN() radix argument must be between 1 and ${numsys.length}`);
        return numsys2n(radix)(num);
    }

    let date = new Date();
    let count = 0;
    let uCount = -1;
    function uid() {
        return `${toString62(random())}${toString62(udate())}${toString62(udatecount())}`;
    }
    function udate() {
        const now = new Date();
        if (+date == +now) {
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
            getJoin: c => chain_getJoin(getList(), c),
            mapX62: () => map_chain(getNewList(), f => () => {
                const sn = f();
                return typeof sn === 'number' ? toString62(sn) : sn;
            }),
            mapXn: (r) => (map_chain(getNewList(), f => () => {
                const sn = f();
                return typeof sn === 'number' ? toStringN(sn, r) : sn;
            })),
            map: cb => map_chain(getNewList(), cb)
        };
    }
    function chain_get(list) {
        return () => list.map(fn => fn()).join('');
    }
    function chain_getJoin(list, c) {
        return () => list.map(fn => fn()).join(c);
    }

    exports.chain = chain;
    exports.random = random;
    exports.ucount = ucount;
    exports.udate = udate;
    exports.udatecount = udatecount;
    exports.uid = uid;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
