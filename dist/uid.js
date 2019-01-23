(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.uid = {})));
}(this, (function (exports) { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var num2str = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	const numsys = (() => {
	    const sys = [];
	    for (let i = 0; i < 36; i++) {
	        sys[i] = i.toString(36);
	    }
	    for (let i = 10; i < 36; i++) {
	        sys[i + 26] = i.toString(36).toUpperCase();
	    }
	    sys.push('!', '#', '$', '%', '&', '^', '(', ')', '/', '\\', ':', ';', '<', '=', '>', '?', '@', '[', ']', '{', '}', '|', '<', '>');
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
	function toString2(num) { return num.toString(2); }
	function toString8(num) { return num.toString(8); }
	function toString16(num) { return num.toString(16); }
	function toString32(num) { return num.toString(32); }
	function toString36(num) { return num.toString(36); }
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
	const numsys_2_64 = numsys2n(64);
	function toString64(num) { return numsys_2_64(num); }
	const numsys_2_128 = numsys2n(128);
	function toString128(num) { return numsys_2_128(num); }
	const numsys_2_256 = numsys2n(256);
	function toString256(num) { return numsys_2_256(num); }
	const numsys_2_512 = numsys2n(512);
	function toString512(num) { return numsys_2_512(num); }
	function toStringN(num, radix) {
	    if (typeof radix != 'number')
	        return num.toString();
	    if (radix < 2 || radix > numsys.length)
	        throw new RangeError(`toStringN() radix argument must be between 2 and ${numsys.length}`);
	    return numsys2n(radix)(num);
	}
	function StoString2() { return this.toString(2); }
	function StoString8() { return this.toString(8); }
	function StoString16() { return this.toString(16); }
	function StoString32() { return this.toString(32); }
	function StoString36() { return this.toString(36); }
	function StoString62() { return numsys_2_62(this); }
	function StoString64() { return numsys_2_64(this); }
	function StoString128() { return numsys_2_128(this); }
	function StoString256() { return numsys_2_256(this); }
	function StoString512() { return numsys_2_512(this); }
	function StoStringN(radix) { return toStringN(this, radix); }
	let isprototype = false;
	function enablePrototype() {
	    if (isprototype)
	        return;
	    Object.defineProperties(Number.prototype, {
	        toString2: { value: StoString2 },
	        toString8: { value: StoString8 },
	        toString16: { value: StoString16 },
	        toString32: { value: StoString32 },
	        toString36: { value: StoString36 },
	        toString62: { value: StoString62 },
	        toString64: { value: StoString64 },
	        toString128: { value: StoString128 },
	        toString256: { value: StoString256 },
	        toString512: { value: StoString512 },
	        toStringN: { value: StoStringN },
	    });
	    isprototype = true;
	}

	exports.toString2 = toString2;
	exports.toString8 = toString8;
	exports.toString16 = toString16;
	exports.toString32 = toString32;
	exports.toString36 = toString36;
	exports.toString62 = toString62;
	exports.toString64 = toString64;
	exports.toString128 = toString128;
	exports.toString256 = toString256;
	exports.toString512 = toString512;
	exports.toStringN = toStringN;
	exports.enablePrototype = enablePrototype;
	});

	unwrapExports(num2str);
	var num2str_1 = num2str.toString2;
	var num2str_2 = num2str.toString8;
	var num2str_3 = num2str.toString16;
	var num2str_4 = num2str.toString32;
	var num2str_5 = num2str.toString36;
	var num2str_6 = num2str.toString62;
	var num2str_7 = num2str.toString64;
	var num2str_8 = num2str.toString128;
	var num2str_9 = num2str.toString256;
	var num2str_10 = num2str.toString512;
	var num2str_11 = num2str.toStringN;
	var num2str_12 = num2str.enablePrototype;

	let date = new Date();
	let count = 0;
	let uCount = -1;
	function uid() {
	    return `${num2str_6(random())}${num2str_6(udate())}${num2str_6(udatecount())}`;
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
	        getJoin: c => chain_getJoin(getList(), c),
	        mapX62: () => map_chain(getNewList(), f => () => {
	            const sn = f();
	            return typeof sn === 'number' ? num2str_6(sn) : sn;
	        }),
	        mapXn: (r) => (map_chain(getNewList(), f => () => {
	            const sn = f();
	            return typeof sn === 'number' ? num2str_11(sn, r) : sn;
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

	exports.uid = uid;
	exports.udate = udate;
	exports.udatecount = udatecount;
	exports.random = random;
	exports.ucount = ucount;
	exports.chain = chain;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
