//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function e(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var t = {}, n = [], r = () => {}, i = () => !1, a = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), o = (e) => e.startsWith("onUpdate:"), s = Object.assign, c = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), d = Array.isArray, f = (e) => x(e) === "[object Map]", p = (e) => x(e) === "[object Set]", m = (e) => x(e) === "[object Date]", h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "symbol", v = (e) => typeof e == "object" && !!e, y = (e) => (v(e) || h(e)) && h(e.then) && h(e.catch), b = Object.prototype.toString, x = (e) => b.call(e), S = (e) => x(e).slice(8, -1), C = (e) => x(e) === "[object Object]", w = (e) => g(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ee = /* @__PURE__ */ e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), te = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, ne = /-\w/g, T = te((e) => e.replace(ne, (e) => e.slice(1).toUpperCase())), re = /\B([A-Z])/g, E = te((e) => e.replace(re, "-$1").toLowerCase()), ie = te((e) => e.charAt(0).toUpperCase() + e.slice(1)), ae = te((e) => e ? `on${ie(e)}` : ""), D = (e, t) => !Object.is(e, t), oe = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, se = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, ce = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, le, ue = () => le ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function de(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? he(r) : de(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (g(e) || v(e)) return e;
}
var fe = /;(?![^(]*\))/g, pe = /:([^]+)/, me = /\/\*[^]*?\*\//g;
function he(e) {
	let t = {};
	return e.replace(me, "").split(fe).forEach((e) => {
		if (e) {
			let n = e.split(pe);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function O(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = O(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var ge = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", _e = /* @__PURE__ */ e(ge);
ge + "";
function ve(e) {
	return !!e || e === "";
}
function ye(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = be(e[r], t[r]);
	return n;
}
function be(e, t) {
	if (e === t) return !0;
	let n = m(e), r = m(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = _(e), r = _(t), n || r) return e === t;
	if (n = d(e), r = d(t), n || r) return n && r ? ye(e, t) : !1;
	if (n = v(e), r = v(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !be(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
var xe = (e) => !!(e && e.__v_isRef === !0), k = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? xe(e) ? k(e.value) : JSON.stringify(e, Se, 2) : String(e), Se = (e, t) => xe(t) ? Se(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Ce(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Ce(e)) } : _(t) ? Ce(t) : v(t) && !d(t) && !C(t) ? String(t) : t, Ce = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, A, we = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && A && (A.active ? (this.parent = A, this.index = (A.scopes || (A.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].pause();
			}
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].resume();
			}
			let n = this.effects.slice();
			for (e = 0, t = n.length; e < t; e++) n[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = A;
			try {
				return A = this, e();
			} finally {
				A = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = A, A = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (A === this) A = this.prevScope;
			else {
				let e = A;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				let e = this.scopes.slice();
				for (t = 0, n = e.length; t < n; t++) e[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function Te() {
	return A;
}
var j, Ee = /* @__PURE__ */ new WeakSet(), De = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, A && (A.active ? A.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Ee.has(this) && (Ee.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || je(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Ue(this), Pe(this);
		let e = j, t = M;
		j = this, M = !0;
		try {
			return this.fn();
		} finally {
			Fe(this), j = e, M = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Re(e);
			this.deps = this.depsTail = void 0, Ue(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Ee.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Ie(this) && this.run();
	}
	get dirty() {
		return Ie(this);
	}
}, Oe = 0, ke, Ae;
function je(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Ae, Ae = e;
		return;
	}
	e.next = ke, ke = e;
}
function Me() {
	Oe++;
}
function Ne() {
	if (--Oe > 0) return;
	if (Ae) {
		let e = Ae;
		for (Ae = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; ke;) {
		let t = ke;
		for (ke = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Pe(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Fe(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Re(r), ze(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Ie(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Le(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Le(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === We) || (e.globalVersion = We, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ie(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = j, r = M;
	j = e, M = !0;
	try {
		Pe(e);
		let n = e.fn(e._value);
		(t.version === 0 || D(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		j = n, M = r, Fe(e), e.flags &= -3;
	}
}
function Re(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Re(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function ze(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var M = !0, Be = [];
function Ve() {
	Be.push(M), M = !1;
}
function He() {
	let e = Be.pop();
	M = e === void 0 || e;
}
function Ue(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = j;
		j = void 0;
		try {
			t();
		} finally {
			j = e;
		}
	}
}
var We = 0, Ge = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Ke = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!j || !M || j === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== j) t = this.activeLink = new Ge(j, this), j.deps ? (t.prevDep = j.depsTail, j.depsTail.nextDep = t, j.depsTail = t) : j.deps = j.depsTail = t, qe(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = j.depsTail, t.nextDep = void 0, j.depsTail.nextDep = t, j.depsTail = t, j.deps === t && (j.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, We++, this.notify(e);
	}
	notify(e) {
		Me();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Ne();
		}
	}
};
function qe(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) qe(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var Je = /* @__PURE__ */ new WeakMap(), Ye = /* @__PURE__ */ Symbol(""), Xe = /* @__PURE__ */ Symbol(""), Ze = /* @__PURE__ */ Symbol("");
function N(e, t, n) {
	if (M && j) {
		let t = Je.get(e);
		t || Je.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Ke()), r.map = t, r.key = n), r.track();
	}
}
function Qe(e, t, n, r, i, a) {
	let o = Je.get(e);
	if (!o) {
		We++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Me(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === Ze || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(Ze)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Ye)), f(e) && s(o.get(Xe)));
				break;
			case "delete":
				i || (s(o.get(Ye)), f(e) && s(o.get(Xe)));
				break;
			case "set": f(e) && s(o.get(Ye));
		}
	}
	Ne();
}
function $e(e) {
	let t = /* @__PURE__ */ I(e);
	return t === e ? t : (N(t, "iterate", Ze), /* @__PURE__ */ F(e) ? t : t.map(L));
}
function et(e) {
	return N(e = /* @__PURE__ */ I(e), "iterate", Ze), e;
}
function P(e, t) {
	return /* @__PURE__ */ It(e) ? zt(/* @__PURE__ */ Ft(e) ? L(t) : t) : L(t);
}
var tt = {
	__proto__: null,
	[Symbol.iterator]() {
		return nt(this, Symbol.iterator, (e) => P(this, e));
	},
	concat(...e) {
		return $e(this).concat(...e.map((e) => d(e) ? $e(e) : e));
	},
	entries() {
		return nt(this, "entries", (e) => (e[1] = P(this, e[1]), e));
	},
	every(e, t) {
		return it(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return it(this, "filter", e, t, (e) => e.map((e) => P(this, e)), arguments);
	},
	find(e, t) {
		return it(this, "find", e, t, (e) => P(this, e), arguments);
	},
	findIndex(e, t) {
		return it(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return it(this, "findLast", e, t, (e) => P(this, e), arguments);
	},
	findLastIndex(e, t) {
		return it(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return it(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return ot(this, "includes", e);
	},
	indexOf(...e) {
		return ot(this, "indexOf", e);
	},
	join(e) {
		return $e(this).join(e);
	},
	lastIndexOf(...e) {
		return ot(this, "lastIndexOf", e);
	},
	map(e, t) {
		return it(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return st(this, "pop");
	},
	push(...e) {
		return st(this, "push", e);
	},
	reduce(e, ...t) {
		return at(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return at(this, "reduceRight", e, t);
	},
	shift() {
		return st(this, "shift");
	},
	some(e, t) {
		return it(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return st(this, "splice", e);
	},
	toReversed() {
		return $e(this).toReversed();
	},
	toSorted(e) {
		return $e(this).toSorted(e);
	},
	toSpliced(...e) {
		return $e(this).toSpliced(...e);
	},
	unshift(...e) {
		return st(this, "unshift", e);
	},
	values() {
		return nt(this, "values", (e) => P(this, e));
	}
};
function nt(e, t, n) {
	let r = et(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ F(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var rt = Array.prototype;
function it(e, t, n, r, i, a) {
	let o = et(e), s = o !== e && !/* @__PURE__ */ F(e), c = o[t];
	if (c !== rt[t]) {
		let t = c.apply(e, a);
		return s ? L(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, P(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function at(e, t, n, r) {
	let i = et(e), a = i !== e && !/* @__PURE__ */ F(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = P(e, t)), n.call(this, t, P(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? P(e, c) : c;
}
function ot(e, t, n) {
	let r = /* @__PURE__ */ I(e);
	N(r, "iterate", Ze);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Lt(n[0]) ? (n[0] = /* @__PURE__ */ I(n[0]), r[t](...n)) : i;
}
function st(e, t, n = []) {
	Ve(), Me();
	let r = (/* @__PURE__ */ I(e))[t].apply(e, n);
	return Ne(), He(), r;
}
var ct = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), lt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function ut(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ I(this);
	return N(t, "has", e), t.hasOwnProperty(e);
}
var dt = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? kt : Ot : i ? Dt : Et).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = tt[t])) return e;
			if (t === "hasOwnProperty") return ut;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ R(e) ? e : n);
		if ((_(t) ? lt.has(t) : ct(t)) || (r || N(e, "get", t), i)) return o;
		if (/* @__PURE__ */ R(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ Nt(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ Nt(o) : /* @__PURE__ */ jt(o) : o;
	}
}, ft = class extends dt {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ It(i);
			if (!/* @__PURE__ */ F(n) && !/* @__PURE__ */ It(n) && (i = /* @__PURE__ */ I(i), n = /* @__PURE__ */ I(n)), !a && /* @__PURE__ */ R(i) && !/* @__PURE__ */ R(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ R(e) ? e : r);
		return e === /* @__PURE__ */ I(r) && s && (o ? D(n, i) && Qe(e, "set", t, n, i) : Qe(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && Qe(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !lt.has(t)) && N(e, "has", t), n;
	}
	ownKeys(e) {
		return N(e, "iterate", d(e) ? "length" : Ye), Reflect.ownKeys(e);
	}
}, pt = class extends dt {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, mt = /* @__PURE__ */ new ft(), ht = /* @__PURE__ */ new pt(), gt = /* @__PURE__ */ new ft(!0), _t = (e) => e, vt = (e) => Reflect.getPrototypeOf(e);
function yt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ I(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? _t : t ? zt : L;
		return !t && N(a, "iterate", l ? Xe : Ye), s(Object.create(u), { next() {
			let { value: e, done: t } = u.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: c ? [d(e[0]), d(e[1])] : d(e),
				done: t
			};
		} });
	};
}
function bt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function xt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ I(r), a = /* @__PURE__ */ I(n);
			e || (D(n, a) && N(i, "get", n), N(i, "get", a));
			let { has: o } = vt(i), s = t ? _t : e ? zt : L;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && N(/* @__PURE__ */ I(t), "iterate", Ye), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ I(n), i = /* @__PURE__ */ I(t);
			return e || (D(t, i) && N(r, "has", t), N(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ I(a), s = t ? _t : e ? zt : L;
			return !e && N(o, "iterate", Ye), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: bt("add"),
		set: bt("set"),
		delete: bt("delete"),
		clear: bt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ I(this), r = vt(n), i = /* @__PURE__ */ I(e), a = !t && !/* @__PURE__ */ F(e) && !/* @__PURE__ */ It(e) ? i : e;
			return r.has.call(n, a) || D(e, a) && r.has.call(n, e) || D(i, a) && r.has.call(n, i) || (n.add(a), Qe(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ F(n) && !/* @__PURE__ */ It(n) && (n = /* @__PURE__ */ I(n));
			let r = /* @__PURE__ */ I(this), { has: i, get: a } = vt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ I(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? D(n, s) && Qe(r, "set", e, n, s) : Qe(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ I(this), { has: n, get: r } = vt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ I(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && Qe(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ I(this), t = e.size !== 0, n = e.clear();
			return t && Qe(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = yt(r, e, t);
	}), n;
}
function St(e, t) {
	let n = xt(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var Ct = { get: /* @__PURE__ */ St(!1, !1) }, wt = { get: /* @__PURE__ */ St(!1, !0) }, Tt = { get: /* @__PURE__ */ St(!0, !1) }, Et = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ new WeakMap(), Ot = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ new WeakMap();
function At(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function jt(e) {
	return /* @__PURE__ */ It(e) ? e : Pt(e, !1, mt, Ct, Et);
}
// @__NO_SIDE_EFFECTS__
function Mt(e) {
	return Pt(e, !1, gt, wt, Dt);
}
// @__NO_SIDE_EFFECTS__
function Nt(e) {
	return Pt(e, !0, ht, Tt, Ot);
}
function Pt(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = At(S(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function Ft(e) {
	return /* @__PURE__ */ It(e) ? /* @__PURE__ */ Ft(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function It(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function F(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Lt(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function I(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ I(t) : e;
}
function Rt(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && se(e, "__v_skip", !0), e;
}
var L = (e) => v(e) ? /* @__PURE__ */ jt(e) : e, zt = (e) => v(e) ? /* @__PURE__ */ Nt(e) : e;
// @__NO_SIDE_EFFECTS__
function R(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function z(e) {
	return Bt(e, !1);
}
function Bt(e, t) {
	return /* @__PURE__ */ R(e) ? e : new Vt(e, t);
}
var Vt = class {
	constructor(e, t) {
		this.dep = new Ke(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ I(e), this._value = t ? e : L(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ F(e) || /* @__PURE__ */ It(e);
		e = n ? e : /* @__PURE__ */ I(e), D(e, t) && (this._rawValue = e, this._value = n ? e : L(e), this.dep.trigger());
	}
};
function Ht(e) {
	return /* @__PURE__ */ R(e) ? e.value : e;
}
var Ut = {
	get: (e, t, n) => t === "__v_raw" ? e : Ht(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ R(i) && !/* @__PURE__ */ R(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Wt(e) {
	return /* @__PURE__ */ Ft(e) ? e : new Proxy(e, Ut);
}
var Gt = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Ke(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = We - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && j !== this) return je(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Le(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function Kt(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new Gt(r, i, n);
}
var qt = {}, Jt = /* @__PURE__ */ new WeakMap(), Yt = void 0;
function Xt(e, t = !1, n = Yt) {
	if (n) {
		let t = Jt.get(n);
		t || Jt.set(n, t = []), t.push(e);
	}
}
function Zt(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ F(e) || o === !1 || o === 0 ? Qt(e, 1) : Qt(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ R(e) ? (g = () => e.value, y = /* @__PURE__ */ F(e)) : /* @__PURE__ */ Ft(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ Ft(e) || /* @__PURE__ */ F(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ R(e)) return e.value;
		if (/* @__PURE__ */ Ft(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			Ve();
			try {
				_();
			} finally {
				He();
			}
		}
		let t = Yt;
		Yt = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			Yt = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => Qt(e(), t);
	}
	let x = Te(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			let n = e(...t);
			return S(), n;
		};
	}
	let C = b ? Array(e.length).fill(qt) : qt, w = (e) => {
		if (m.flags & 1 && (m.dirty || e)) {
			if (n) {
				let t = m.run();
				if (e || o || y || (b ? t.some((e, t) => D(e, C[t])) : D(t, C))) {
					_ && _();
					let e = Yt;
					Yt = m;
					try {
						let e = [
							t,
							C === qt ? void 0 : b && C[0] === qt ? [] : C,
							v
						];
						C = t, f ? f(n, 3, e) : n(...e);
					} finally {
						Yt = e;
					}
				}
			} else m.run();
		}
	};
	return u && u(w), m = new De(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => Xt(e, !1, m), _ = m.onStop = () => {
		let e = Jt.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			Jt.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function Qt(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ R(e)) Qt(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) Qt(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		Qt(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) Qt(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Qt(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function $t(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		en(e, t, n);
	}
}
function B(e, t, n, r) {
	if (h(e)) {
		let i = $t(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			en(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(B(e[a], t, n, r));
		return i;
	}
}
function en(e, n, r, i = !0) {
	let a = n ? n.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = n && n.appContext.config || t;
	if (n) {
		let t = n.parent, i = n.proxy, a = `https://vuejs.org/error-reference/#runtime-${r}`;
		for (; t;) {
			let n = t.ec;
			if (n) {
				for (let t = 0; t < n.length; t++) if (n[t](e, i, a) === !1) return;
			}
			t = t.parent;
		}
		if (o) {
			Ve(), $t(o, null, 10, [
				e,
				i,
				a
			]), He();
			return;
		}
	}
	tn(e, r, a, i, s);
}
function tn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var V = [], H = -1, nn = [], rn = null, an = 0, on = /* @__PURE__ */ Promise.resolve(), sn = null;
function cn(e) {
	let t = sn || on;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function ln(e) {
	let t = H + 1, n = V.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = V[r], a = hn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function un(e) {
	if (!(e.flags & 1)) {
		let t = hn(e), n = V[V.length - 1];
		!n || !(e.flags & 2) && t >= hn(n) ? V.push(e) : V.splice(ln(t), 0, e), e.flags |= 1, dn();
	}
}
function dn() {
	sn ||= on.then(gn);
}
function fn(e) {
	if (!d(e)) rn && e.id === -1 ? rn.splice(an + 1, 0, e) : e.flags & 1 || (nn.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) nn.push(e[t]);
	dn();
}
function pn(e, t, n = H + 1) {
	for (; n < V.length; n++) {
		let t = V[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			V.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function mn(e) {
	if (nn.length) {
		let e = [...new Set(nn)].sort((e, t) => hn(e) - hn(t));
		if (nn.length = 0, rn) {
			for (let t = 0; t < e.length; t++) rn.push(e[t]);
			return;
		}
		for (rn = e, an = 0; an < rn.length; an++) {
			let e = rn[an];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		rn = null, an = 0;
	}
}
var hn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function gn(e) {
	try {
		for (H = 0; H < V.length; H++) {
			let e = V[H];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), $t(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; H < V.length; H++) {
			let e = V[H];
			e && (e.flags &= -2);
		}
		H = -1, V.length = 0, mn(e), sn = null, (V.length || nn.length) && gn(e);
	}
}
var U = null, _n = null;
function vn(e) {
	let t = U;
	return U = e, _n = e && e.type.__scopeId || null, t;
}
function yn(e, t = U, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && ii(-1);
		let i = vn(t), a = ti.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = ti.length; e > a; e--) ni();
			vn(i), r._d && ii(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function bn(e, n) {
	if (U === null) return e;
	let r = Ii(U), i = e.dirs ||= [];
	for (let e = 0; e < n.length; e++) {
		let [a, o, s, c = t] = n[e];
		a && (h(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && Qt(o), i.push({
			dir: a,
			instance: r,
			value: o,
			oldValue: void 0,
			arg: s,
			modifiers: c
		}));
	}
	return e;
}
function xn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Ve(), B(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), He());
	}
}
function Sn(e, t, n = !1) {
	let r = Ci();
	if (r || dr) {
		let i = dr ? dr._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
var Cn = /* @__PURE__ */ Symbol.for("v-scx"), wn = () => Sn(Cn);
function Tn(e, t, n) {
	return En(e, t, n);
}
function En(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (ki) {
		if (c === "sync") {
			let e = wn();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = Si;
	u.call = (e, t, n) => B(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		W(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : un(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = Zt(e, n, u);
	return ki && (f ? f.push(h) : d && h()), h;
}
var Dn = /* @__PURE__ */ new WeakMap(), On = /* @__PURE__ */ Symbol("_vte"), kn = (e) => e.__isTeleport, An = (e) => e && (e.disabled || e.disabled === ""), jn = (e) => e && (e.defer || e.defer === ""), Mn = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Nn = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Pn = (e, t) => {
	let n = e && e.to;
	return g(n) ? t ? t(n) : null : n;
}, Fn = {
	name: "Teleport",
	__isTeleport: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		let { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: m, createText: h, createComment: g, parentNode: _ } } = l, v = An(t.props), { dynamicChildren: y } = t, b = (e, t, n) => {
			e.shapeFlag & 16 && u(e.children, t, n, i, a, o, s, c);
		}, x = (e = t) => {
			let n = An(e.props), r = e.target = Pn(e.props, m), a = Bn(r, e, h, p);
			r && (o !== "svg" && Mn(r) ? o = "svg" : o !== "mathml" && Nn(r) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r), n || (b(e, r, a), zn(e, !1)));
		}, S = (e) => {
			let t = () => {
				if (Dn.get(e) === t) {
					if (Dn.delete(e), An(e.props)) {
						let t = _(e.el) || n;
						b(e, t, e.anchor), zn(e, !0);
					}
					x(e);
				}
			};
			Dn.set(e, t), W(t, a);
		};
		if (e == null) {
			let e = t.el = h(""), i = t.anchor = h("");
			if (p(e, n, r), p(i, n, r), jn(t.props) || a && a.pendingBranch) {
				S(t);
				return;
			}
			v && (b(t, n, i), zn(t, !0)), x();
		} else {
			t.el = e.el;
			let r = t.anchor = e.anchor, u = Dn.get(e);
			if (u) {
				u.flags |= 8, Dn.delete(e), S(t);
				return;
			}
			t.targetStart = e.targetStart;
			let p = t.target = e.target, h = t.targetAnchor = e.targetAnchor, g = An(e.props), _ = g ? n : p, b = g ? r : h;
			if (o === "svg" || Mn(p) ? o = "svg" : (o === "mathml" || Nn(p)) && (o = "mathml"), y ? (f(e.dynamicChildren, y, _, i, a, o, s), Gr(e, t, !0)) : c || d(e, t, _, b, i, a, o, s, !1), v) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : In(t, n, r, l, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				let e = Pn(t.props, m);
				e && (t.target = e, In(t, e, null, l, 0));
			} else g && In(t, p, h, l, 1);
			zn(t, v);
		}
	},
	remove(e, t, n, { um: r, o: { remove: i } }, a) {
		let { shapeFlag: o, children: s, anchor: c, targetStart: l, targetAnchor: u, target: d, props: f } = e, p = An(f), m = a || !p, h = Dn.get(e);
		if (h && (h.flags |= 8, Dn.delete(e)), d && (i(l), i(u)), a && i(c), !h && (p || d) && o & 16) for (let e = 0; e < s.length; e++) {
			let i = s[e];
			r(i, t, n, m, !!i.dynamicChildren);
		}
	},
	move: In,
	hydrate: Ln
};
function In(e, t, n, { o: { insert: r }, m: i }, a = 2) {
	a === 0 && r(e.targetAnchor, t, n);
	let { el: o, anchor: s, shapeFlag: c, children: l, props: u } = e, d = a === 2;
	if (d && r(o, t, n), !Dn.has(e) && (!d || An(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
	d && r(s, t, n);
}
function Ln(e, t, n, r, i, a, { o: { nextSibling: o, parentNode: s, querySelector: c, insert: l, createText: u } }, d) {
	function f(e, n) {
		let r = n;
		for (; r;) {
			if (r && r.nodeType === 8) {
				if (r.data === "teleport start anchor") t.targetStart = r;
				else if (r.data === "teleport anchor") {
					t.targetAnchor = r, e._lpa = t.targetAnchor && o(t.targetAnchor);
					break;
				}
			}
			r = o(r);
		}
	}
	function p(e, t) {
		t.anchor = d(o(e), t, s(e), n, r, i, a);
	}
	let m = t.target = Pn(t.props, c), h = An(t.props);
	if (m) {
		let c = m._lpa || m.firstChild;
		t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || Bn(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || Bn(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), zn(t, h);
	} else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
	return t.anchor && o(t.anchor);
}
var Rn = Fn;
function zn(e, t) {
	let n = e.ctx;
	if (n && n.ut) {
		let r, i;
		for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
		n.ut();
	}
}
function Bn(e, t, n, r, i = null) {
	let a = t.targetStart = n(""), o = t.targetAnchor = n("");
	return a[On] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var Vn = /* @__PURE__ */ Symbol("_leaveCb");
function Hn(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== $r) {
			t = n;
			break;
		}
	}
	return t;
}
function Un(e) {
	if (!Zn(e)) return kn(e.type) && e.children ? Hn(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && h(n.default)) return n.default();
	}
}
function Wn(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		Wn(kn(n.type) && Un(n) || n, t);
	} else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Gn(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function Kn(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var qn = /* @__PURE__ */ new WeakMap();
function Jn(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => Jn(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (Xn(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && Jn(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? Ii(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ I(v), b = v === t ? i : (e) => !Kn(_, e) && u(y, e), x = (e, t) => !(t && Kn(_, t));
	if (m != null && m !== p) {
		if (Yn(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ R(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) $t(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ R(p);
		if (t || n) {
			let i = () => {
				if (e.f) {
					let n = t ? b(p) ? v[p] : _[p] : x(p) || !e.k ? p.value : _[e.k];
					if (o) d(n) && c(n, s);
					else if (d(n)) n.includes(s) || n.push(s);
					else if (t) _[p] = [s], b(p) && (v[p] = _[p]);
					else {
						let t = [s];
						x(p, e.k) && (p.value = t), e.k && (_[e.k] = t);
					}
				} else t ? (_[p] = l, b(p) && (v[p] = l)) : n && (x(p, e.k) && (p.value = l), e.k && (_[e.k] = l));
			};
			if (l) {
				let t = () => {
					i(), qn.delete(e);
				};
				t.id = -1, qn.set(e, t), W(t, r);
			} else Yn(e), i();
		}
	}
}
function Yn(e) {
	let t = qn.get(e);
	t && (t.flags |= 8, qn.delete(e));
}
ue().requestIdleCallback, ue().cancelIdleCallback;
var Xn = (e) => !!e.type.__asyncLoader, Zn = (e) => e.type.__isKeepAlive;
function Qn(e, t, n = Si, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Ve();
			let i = Ei(n), a = B(t, n, e, r);
			return i(), He(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var $n = (e) => (t, n = Si) => {
	(!ki || e === "sp") && Qn(e, (...e) => t(...e), n);
}, er = $n("m"), tr = $n("bum"), nr = /* @__PURE__ */ Symbol.for("v-ndc");
function rr(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ Ft(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ F(e), s = /* @__PURE__ */ It(e), e = et(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? zt(L(e[n])) : L(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (v(e)) {
		if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
		else {
			let n = Object.keys(e);
			i = Array(n.length);
			for (let r = 0, o = n.length; r < o; r++) {
				let o = n[r];
				i[r] = t(e[o], o, r, a && a[r]);
			}
		}
	} else i = [];
	return n && (n[r] = i), i;
}
var ir = (e) => e ? Oi(e) ? Ii(e) : ir(e.parent) : null, ar = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => ir(e.parent),
	$root: (e) => ir(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => e.type,
	$forceUpdate: (e) => e.f ||= () => {
		un(e.update);
	},
	$nextTick: (e) => e.n ||= cn.bind(e.proxy),
	$watch: (e) => r
}), or = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), sr = {
	get({ _: e }, n) {
		if (n === "__v_skip") return !0;
		let { ctx: r, setupState: i, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (n[0] !== "$") {
			let e = s[n];
			if (e !== void 0) switch (e) {
				case 1: return i[n];
				case 2: return a[n];
				case 4: return r[n];
				case 3: return o[n];
			}
			else if (or(i, n)) return s[n] = 1, i[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else s[n] = 0;
		}
		let d = ar[n], f, p;
		if (d) return n === "$attrs" && N(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return or(i, t) ? (i[t] = n, !0) : u(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || or(t, s) || u(a, s) || u(r, s) || u(ar, s) || u(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function cr() {
	return {
		app: null,
		config: {
			isNativeTag: i,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var lr = 0;
function ur(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = cr(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: lr++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: zi,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && h(e.install) ? (a.add(e), e.install(l, ...t)) : h(e) && (a.add(e), e(l, ...t))), l;
			},
			mixin(e) {
				return l;
			},
			component(e, t) {
				return t ? (i.components[e] = t, l) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, l) : i.directives[e];
			},
			mount(a, o, s) {
				if (!c) {
					let u = l._ceVNode || di(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, Ii(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (B(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = dr;
				dr = l;
				try {
					return e();
				} finally {
					dr = t;
				}
			}
		};
		return l;
	};
}
var dr = null, fr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${T(t)}Modifiers`] || e[`${E(t)}Modifiers`];
function pr(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && fr(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = r.map(ce)));
	let c, l = i[c = ae(n)] || i[c = ae(T(n))];
	!l && o && (l = i[c = ae(E(n))]), l && B(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, B(u, e, 6, a);
	}
}
function mr(e, t, n = !1) {
	let r = t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {};
	return a ? (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o) : (v(e) && r.set(e, null), null);
}
function hr(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, E(t)) || u(e, t));
}
function gr(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = vn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = X(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = X(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : _r(c);
		}
	} catch (t) {
		ti.length = 0, en(t, e, 1), v = di($r);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = vr(y, a)), b = mi(b, y, !1, !0));
	}
	return n.dirs && (b = mi(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && Wn(kn(b.type) && Un(b) || b, n.transition), v = b, vn(_), v;
}
var _r = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, vr = (e, t) => {
	let n = {};
	for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function yr(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? br(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (xr(o, r, n) && !hr(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || br(r, o, l) : !!o;
	return !1;
}
function br(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (xr(t, e, a) && !hr(n, a)) return !0;
	}
	return !1;
}
function xr(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !be(r, i) : r !== i;
}
function Sr({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var Cr = {}, wr = () => Object.create(Cr), Tr = (e) => Object.getPrototypeOf(e) === Cr;
function Er(e, t, n, r = !1) {
	let i = {}, a = wr();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Or(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ Mt(i) : e.type.props ? i : a, e.attrs = a;
}
function Dr(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ I(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (hr(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) {
					if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
					else {
						let t = T(o);
						i[t] = kr(c, s, t, d, e, !1);
					}
				} else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		Or(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = E(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = kr(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && Qe(e.attrs, "set", "");
}
function Or(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (ee(t)) continue;
		let l = n[t], d;
		a && u(a, d = T(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : hr(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ I(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = kr(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function kr(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = u(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && h(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Ei(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === E(n)) && (r = !0));
	}
	return r;
}
function Ar(e, r, i = !1) {
	let a = r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [];
	if (!c) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = T(c[e]);
		jr(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = T(e);
		if (jr(t)) {
			let n = c[e], r = l[t] = d(n) || h(n) ? { type: n } : s({}, n), i = r.type, a = !1, o = !0;
			if (d(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = h(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				}
				n === "String" && (o = !1);
			}
			else a = h(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || u(r, "default")) && f.push(t);
		}
	}
	let p = [l, f];
	return v(e) && a.set(e, p), p;
}
function jr(e) {
	return e[0] !== "$" && !ee(e);
}
var Mr = (e) => e === "_" || e === "_ctx" || e === "$stable", Nr = (e) => d(e) ? e.map(X) : [X(e)], Pr = (e, t, n) => {
	if (t._n) return t;
	let r = yn((...e) => Nr(t(...e)), n);
	return r._c = !1, r;
}, Fr = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Mr(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = Pr(n, i, r);
		else if (i != null) {
			let e = Nr(i);
			t[n] = () => e;
		}
	}
}, Ir = (e, t) => {
	let n = Nr(t);
	e.slots.default = () => n;
}, Lr = (e, t, n) => {
	for (let r in t) (n || !Mr(r)) && (e[r] = t[r]);
}, Rr = (e, t, n) => {
	let r = e.slots = wr();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Lr(r, t, n), n && se(r, "_", e, !0)) : Fr(t, r);
	} else t && Ir(e, t);
}, zr = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : Lr(a, n, r) : (o = !n.$stable, Fr(n, a)), s = n;
	} else n && (Ir(e, n), s = { default: 1 });
	if (o) for (let e in a) !Mr(e) && s[e] == null && delete a[e];
}, W = Zr;
function Br(e) {
	return Vr(e);
}
function Vr(e, i) {
	let a = ue();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !ci(e, t) && (r = be(e), O(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Qr:
				y(e, t, n, r);
				break;
			case $r:
				b(e, t, n, r);
				break;
			case ei:
				e ?? x(t, n, r, o);
				break;
			case G:
				ae(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? D(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, Se);
		}
		u != null && i ? Jn(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && Jn(e.ref, null, a, e, !0);
	}, y = (e, t, n, r) => {
		if (e == null) o(t.el = u(t.children), n, r);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, r) => {
		e == null ? o(t.el = d(t.children || ""), n, r) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, r) => {
		let i;
		for (; e && e !== t;) i = h(e), o(e, n, r), e = i;
		o(t, n, r);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) te(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), re(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, te = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && T(e.children, d, null, r, i, Hr(e, a), s, u), _ && xn(e, null, r, "created"), ne(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !ee(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && Q(f, r, e);
		}
		_ && xn(e, null, r, "beforeMount");
		let v = Wr(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && W(() => {
			try {
				f && Q(f, r, e), v && g.enter(d), _ && xn(e, null, r, "mounted");
			} finally {}
		}, i);
	}, ne = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Xr(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ne(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, T = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? Z(e[l]) : X(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, re = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Ur(r, !1), (g = h.onVnodeBeforeUpdate) && Q(g, r, n, e), f && xn(n, e, r, "beforeUpdate"), r && Ur(r, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (u = 0, s = !1, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? E(e.dynamicChildren, d, l, r, i, Hr(n, a), o) : s || fe(e, n, l, null, r, i, Hr(n, a), o, !1), u > 0) {
			if (u & 16) ie(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && ie(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && W(() => {
			g && Q(g, r, n, e), f && xn(n, e, r, "updated");
		}, i);
	}, E = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el && (c.type === G || !ci(c, l) || c.shapeFlag & 198) ? m(c.el) : n;
			v(c, l, u, null, r, i, a, o, !0);
		}
	}, ie = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !ee(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (ee(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, ae = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), T(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (E(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Gr(e, t, !0)) : fe(e, t, n, f, i, a, s, c, l);
	}, D = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : se(t, n, r, i, a, o, c) : ce(e, t, c);
	}, se = (e, t, n, r, i, a, o) => {
		let s = e.component = xi(e, r, i);
		if (Zn(e) && (s.ctx.renderer = Se), Ai(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, le, o), !e.el) {
				let r = s.subTree = di($r);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else le(s, e, t, n, i, a, o);
	}, ce = (e, t, n) => {
		let r = t.component = e.component;
		if (yr(e, t, n)) {
			if (r.asyncDep && !r.asyncResolved) {
				de(r, t, n);
				return;
			}
			r.next = t, r.update();
		} else t.el = e.el, r.vnode = t;
	}, le = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = qr(e);
					if (n) {
						t && (t.el = c.el, de(e, t, o)), n.asyncDep.then(() => {
							W(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Ur(e, !1), t ? (t.el = c.el, de(e, t, o)) : t = c, n && oe(n), (d = t.props && t.props.onVnodeBeforeUpdate) && Q(d, s, t, c), Ur(e, !0);
				let f = gr(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), be(p), e, i, a), t.el = f.el, u === null && Sr(e, f.el), r && W(r, i), (d = t.props && t.props.onVnodeUpdated) && W(() => Q(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = Xn(t);
				if (Ur(e, !1), l && oe(l), !m && (o = c && c.onVnodeBeforeMount) && Q(o, d, t), Ur(e, !0), s && A) {
					let t = () => {
						e.subTree = gr(e), A(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = gr(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && W(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					W(() => Q(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && Xn(d.vnode) && d.vnode.shapeFlag & 256) && e.a && W(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new De(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => un(u), Ur(e, !0), l();
	}, de = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Dr(e, t.props, r, n), zr(e, t.children, n), Ve(), pn(e), He();
	}, fe = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				me(l, d, n, r, i, a, o, s, c);
				return;
			}
			if (f & 256) {
				pe(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && ye(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? me(l, d, n, r, i, a, o, s, c) : ye(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && T(d, n, r, i, a, o, s, c));
	}, pe = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p = 0;
		for (; p < f; p++) {
			let n = t[p] = l ? Z(t[p]) : X(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? ye(e, a, o, !0, !1, f) : T(t, r, i, a, o, s, c, l, f);
	}, me = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? Z(t[u]) : X(t[u]);
			if (ci(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? Z(t[p]) : X(t[p]);
			if (ci(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? Z(t[u]) : X(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) O(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? Z(t[u]) : X(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let n = e[u];
				if (y >= b) {
					O(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && ci(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? O(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Kr(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Yr(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? he(n, r, p, 2) : _--);
			}
		}
	}, he = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			he(e.component.subTree, t, n, r);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, r);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, Se);
			return;
		}
		if (c === G) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) he(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === ei) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) {
			if (r === 0) l.persisted && !a[Vn] ? o(a, t, n) : (l.beforeEnter(a), o(a, t, n), W(() => l.enter(a), i));
			else {
				let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
					e.ctx.isUnmounted ? s(a) : o(a, t, n);
				}, d = () => {
					let e = a._isLeaving || !!a[Vn];
					a._isLeaving && a[Vn](!0), l.persisted && !e ? u() : r(a, () => {
						u(), c && c();
					});
				};
				i ? i(a, u, d) : d();
			}
		} else o(a, t, n);
	}, O = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (Ve(), Jn(s, null, n, e, !0), He()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !Xn(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && Q(_, t, e), u & 6) ve(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && xn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, Se, r) : l && !l.hasOnce && (a !== G || d > 0 && d & 64) ? ye(l, t, n, !1, !0) : (a === G && d & 384 || !i && u & 16) && ye(c, t, n), r && ge(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && W(() => {
			_ && Q(_, t, e), h && xn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, ge = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === G) {
			_e(n, r);
			return;
		}
		if (t === ei) {
			C(e);
			return;
		}
		let a = () => {
			s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
		};
		if (e.shapeFlag & 1 && i && !i.persisted) {
			let { leave: t, delayLeave: r } = i, o = () => t(n, a);
			r ? r(e.el, a, o) : o();
		} else a();
	}, _e = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, ve = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Jr(c), Jr(l), r && oe(r), i.stop(), a && (a.flags |= 8, O(o, e, t, n)), s && W(s, t), W(() => {
			e.isUnmounted = !0;
		}, t);
	}, ye = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) O(e[o], t, n, r, i);
	}, be = (e) => {
		if (e.shapeFlag & 6) return be(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[On];
		return n ? h(n) : t;
	}, xe = !1, k = (e, t, n) => {
		let r;
		e == null ? t._vnode && (O(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, xe ||= (xe = !0, pn(r), mn(), !1);
	}, Se = {
		p: v,
		um: O,
		m: he,
		r: ge,
		mt: se,
		mc: T,
		pc: fe,
		pbc: E,
		n: be,
		o: e
	}, Ce, A;
	return i && ([Ce, A] = i(Se)), {
		render: k,
		hydrate: Ce,
		createApp: ur(k, Ce)
	};
}
function Hr({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ur({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Wr(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Gr(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = Z(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Gr(t, a)), a.type === Qr && (a.patchFlag === -1 && (a = i[e] = Z(a)), a.el = t.el), a.type === $r && !a.el && (a.el = t.el);
	}
}
function Kr(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function qr(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : qr(t);
}
function Jr(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Yr(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Yr(t.subTree) : null;
}
var Xr = (e) => e.__isSuspense;
function Zr(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : fn(e);
}
var G = /* @__PURE__ */ Symbol.for("v-fgt"), Qr = /* @__PURE__ */ Symbol.for("v-txt"), $r = /* @__PURE__ */ Symbol.for("v-cmt"), ei = /* @__PURE__ */ Symbol.for("v-stc"), ti = [], K = null;
function q(e = !1) {
	ti.push(K = e ? null : []);
}
function ni() {
	ti.pop(), K = ti[ti.length - 1] || null;
}
var ri = 1;
function ii(e, t = !1) {
	ri += e, e < 0 && K && t && (K.hasOnce = !0);
}
function ai(e) {
	return e.dynamicChildren = ri > 0 ? K || n : null, ni(), ri > 0 && K && K.push(e), e;
}
function J(e, t, n, r, i, a) {
	return ai(Y(e, t, n, r, i, a, !0));
}
function oi(e, t, n, r, i) {
	return ai(di(e, t, n, r, i, !0));
}
function si(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function ci(e, t) {
	return e.type === t.type && e.key === t.key;
}
var li = ({ key: e }) => e ?? null, ui = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ R(e) || h(e) ? {
	i: U,
	r: e,
	k: t,
	f: !!n
} : e);
function Y(e, t = null, n = null, r = 0, i = null, a = e === G ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && li(t),
		ref: t && ui(t),
		scopeId: _n,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: U
	};
	return s ? (_i(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), ri > 0 && !o && K && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && K.push(c), c;
}
var di = fi;
function fi(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === nr) && (e = $r), si(e)) {
		let r = mi(e, t, !0);
		return n && _i(r, n), ri > 0 && !a && K && (r.shapeFlag & 6 ? K[K.indexOf(e)] = r : K.push(r)), r.patchFlag = -2, r;
	}
	if (Li(e) && (e = e.__vccOpts), t) {
		t = pi(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = O(e)), v(n) && (/* @__PURE__ */ Lt(n) && !d(n) && (n = s({}, n)), t.style = de(n));
	}
	let o = g(e) ? 1 : Xr(e) ? 128 : kn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return Y(e, t, n, r, i, o, a, !0);
}
function pi(e) {
	return e ? /* @__PURE__ */ Lt(e) || Tr(e) ? s({}, e) : e : null;
}
function mi(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? vi(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && li(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(ui(t)) : [a, ui(t)] : ui(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== G ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && mi(e.ssContent),
		ssFallback: e.ssFallback && mi(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && Wn(u, c.clone(u)), u;
}
function hi(e = " ", t = 0) {
	return di(Qr, null, e, t);
}
function gi(e = "", t = !1) {
	return t ? (q(), oi($r, null, e)) : di($r, null, e);
}
function X(e) {
	return e == null || typeof e == "boolean" ? di($r) : d(e) ? di(G, null, e.slice()) : si(e) ? Z(e) : di(Qr, null, String(e));
}
function Z(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : mi(e);
}
function _i(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") {
		if (r & 65) {
			let n = t.default;
			n && (n._c && (n._d = !1), _i(e, n()), n._c && (n._d = !0));
			return;
		}
		{
			n = 32;
			let r = t._;
			!r && !Tr(t) ? t._ctx = U : r === 3 && U && (U.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
		}
	} else if (h(t)) {
		if (r & 65) {
			_i(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: U
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [hi(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function vi(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = O([t.class, r.class]));
		else if (e === "style") t.style = de([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !o(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function Q(e, t, n, r = null) {
	B(e, t, 7, [n, r]);
}
var yi = cr(), bi = 0;
function xi(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || yi, o = {
		uid: bi++,
		vnode: e,
		type: i,
		parent: n,
		appContext: a,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new we(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: n ? n.provides : Object.create(a.provides),
		ids: n ? n.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: Ar(i, a),
		emitsOptions: mr(i, a),
		emit: null,
		emitted: null,
		propsDefaults: t,
		inheritAttrs: i.inheritAttrs,
		ctx: t,
		data: t,
		props: t,
		attrs: t,
		slots: t,
		refs: t,
		setupState: t,
		setupContext: null,
		suspense: r,
		suspenseId: r ? r.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = pr.bind(null, o), e.ce && e.ce(o), o;
}
var Si = null, Ci = () => Si || U, wi, Ti;
{
	let e = ue(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	wi = t("__VUE_INSTANCE_SETTERS__", (e) => Si = e), Ti = t("__VUE_SSR_SETTERS__", (e) => ki = e);
}
var Ei = (e) => {
	let t = Si;
	return wi(e), e.scope.on(), () => {
		e.scope.off(), wi(t);
	};
}, Di = () => {
	Si && Si.scope.off(), wi(null);
};
function Oi(e) {
	return e.vnode.shapeFlag & 4;
}
var ki = !1;
function Ai(e, t = !1, n = !1) {
	t && Ti(t);
	let { props: r, children: i } = e.vnode, a = Oi(e);
	Er(e, r, a, t), Rr(e, i, n || t);
	let o = a ? ji(e, t) : void 0;
	return t && Ti(!1), o;
}
function ji(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, sr);
	let { setup: r } = n;
	if (r) {
		Ve();
		let n = e.setupContext = r.length > 1 ? Fi(e) : null, i = Ei(e), a = $t(r, e, 0, [e.props, n]), o = y(a);
		if (He(), i(), (o || e.sp) && !Xn(e) && Gn(e), o) {
			if (a.then(Di, Di), t) return a.then((n) => {
				Ti(!0);
				try {
					Mi(e, n, t);
				} finally {
					Ti(!1);
				}
			}).catch((t) => {
				en(t, e, 0);
			});
			e.asyncDep = a;
		} else Mi(e, a, t);
	} else Ni(e, t);
}
function Mi(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Wt(t)), Ni(e, n);
}
function Ni(e, t, n) {
	let i = e.type;
	e.render ||= i.render || r;
}
var Pi = { get(e, t) {
	return N(e, "get", ""), e[t];
} };
function Fi(e) {
	return {
		attrs: new Proxy(e.attrs, Pi),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Ii(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Wt(Rt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in ar) return ar[n](e);
		},
		has(e, t) {
			return t in e || t in ar;
		}
	}) : e.proxy;
}
function Li(e) {
	return h(e) && "__vccOpts" in e;
}
var Ri = (e, t) => /* @__PURE__ */ Kt(e, t, ki), zi = "3.5.41", Bi = void 0, Vi = typeof window < "u" && window.trustedTypes;
if (Vi) try {
	Bi = /* @__PURE__ */ Vi.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Hi = Bi ? (e) => Bi.createHTML(e) : (e) => e, Ui = "http://www.w3.org/2000/svg", Wi = "http://www.w3.org/1998/Math/MathML", Gi = typeof document < "u" ? document : null, Ki = Gi && /* @__PURE__ */ Gi.createElement("template"), qi = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Gi.createElementNS(Ui, e) : t === "mathml" ? Gi.createElementNS(Wi, e) : n ? Gi.createElement(e, { is: n }) : Gi.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Gi.createTextNode(e),
	createComment: (e) => Gi.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Gi.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling););
		else {
			Ki.innerHTML = Hi(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Ki.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Ji = /* @__PURE__ */ Symbol("_vtc");
function Yi(e, t, n) {
	let r = e[Ji];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Xi = /* @__PURE__ */ Symbol("_vod"), Zi = /* @__PURE__ */ Symbol("_vsh"), Qi = /* @__PURE__ */ Symbol(""), $i = /(?:^|;)\s*display\s*:/;
function ea(e, t, n) {
	let r = e.style, i = g(n), a = !1;
	if (n && !i) {
		if (t) {
			if (g(t)) for (let e of t.split(";")) {
				let t = e.slice(0, e.indexOf(":")).trim();
				n[t] ?? na(r, t, "");
			}
			else for (let e in t) n[e] ?? na(r, e, "");
		}
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? na(r, i, "") : oa(e, i, !g(t) && t ? t[i] : void 0, o) || na(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[Qi];
			e && (n += ";" + e), r.cssText = n, a = $i.test(n);
		}
	} else t && e.removeAttribute("style");
	Xi in e && (e[Xi] = a ? r.display : "", e[Zi] && (r.display = "none"));
}
var ta = /\s*!important$/;
function na(e, t, n) {
	if (d(n)) n.forEach((n) => na(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = aa(e, t);
		ta.test(n) ? e.setProperty(E(r), n.replace(ta, ""), "important") : e[r] = n;
	}
}
var ra = [
	"Webkit",
	"Moz",
	"ms"
], ia = {};
function aa(e, t) {
	let n = ia[t];
	if (n) return n;
	let r = T(t);
	if (r !== "filter" && r in e) return ia[t] = r;
	r = ie(r);
	for (let n = 0; n < ra.length; n++) {
		let i = ra[n] + r;
		if (i in e) return ia[t] = i;
	}
	return t;
}
function oa(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && g(r) && n === r;
}
var sa = "http://www.w3.org/1999/xlink";
function ca(e, t, n, r, i, a = _e(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(sa, t.slice(6, t.length)) : e.setAttributeNS(sa, t, n) : n == null || a && !ve(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function la(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Hi(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = ve(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function ua(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function da(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var fa = /* @__PURE__ */ Symbol("_vei");
function pa(e, t, n, r, i = null) {
	let a = e[fa] || (e[fa] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = ga(t);
		r ? ua(e, n, a[t] = ba(r, i), s) : o && (da(e, n, o, s), a[t] = void 0);
	}
}
var ma = /(Once|Passive|Capture)$/, ha = /^on:?(?:Once|Passive|Capture)$/;
function ga(e) {
	let t, n;
	for (; (n = e.match(ma)) && !ha.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : E(e.slice(2)), t];
}
var _a = 0, va = /* @__PURE__ */ Promise.resolve(), ya = () => _a ||= (va.then(() => _a = 0), Date.now());
function ba(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (d(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && B(e, t, 5, a);
			}
		} else B(r, t, 5, [e]);
	};
	return n.value = e, n.attached = ya(), n;
}
var xa = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Sa = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? Yi(e, r, c) : t === "style" ? ea(e, n, r) : a(t) ? o(t) || pa(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), 1) : t[0] === "^" ? (t = t.slice(1), 0) : Ca(e, t, r, c)) ? (la(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ca(e, t, r, c, s, t !== "value")) : e._isVueCE && (wa(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? la(e, T(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), ca(e, t, r, c));
};
function Ca(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && xa(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return xa(t) && g(n) ? !1 : t in e;
}
function wa(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = T(t);
	return Array.isArray(n) ? n.some((e) => T(e) === r) : Object.keys(n).some((e) => T(e) === r);
}
var Ta = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => oe(t, e) : t;
};
function Ea(e) {
	e.target.composing = !0;
}
function Da(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Oa = /* @__PURE__ */ Symbol("_assign"), ka = /* @__PURE__ */ Symbol("_initialValue");
function Aa(e, t, n) {
	return t && (e = e.trim()), n && (e = ce(e)), e;
}
var ja = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e.parentNode && (e.type === "text" ? e[ka] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[ka] = e.defaultValue.replace(/\r\n?/g, "\n"))), e[Oa] = Ta(i);
		let a = r || i.props && i.props.type === "number";
		ua(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Oa](Aa(e.value, n, a));
		}), (n || a) && ua(e, "change", () => {
			e.value = Aa(e.value, n, a);
		}), t || (ua(e, "compositionstart", Ea), ua(e, "compositionend", Da), ua(e, "change", Da));
	},
	mounted(e, { value: t, modifiers: { trim: n, number: r } }) {
		let i = t ?? "", a = e[ka];
		delete e[ka], a !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== a ? e[Oa](Aa(e.value, n, r)) : e.value = i;
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Oa] = Ta(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? ce(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Ma = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], Na = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => Ma.some((n) => e[`${n}Key`] && !t.includes(n))
}, Pa = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = Na[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Fa = /* @__PURE__ */ s({ patchProp: Sa }, qi), Ia;
function La() {
	return Ia ||= Br(Fa);
}
var Ra = ((...e) => {
	let t = La().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = Ba(e);
		if (!r) return;
		let i = t._component;
		!h(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, za(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function za(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Ba(e) {
	return g(e) ? document.querySelector(e) : e;
}
//#endregion
//#region src/normalizer.js
function $(e) {
	return String(e ?? "").normalize("NFKC").toLowerCase().replace(/[\s\u00a0]+/gu, " ").trim();
}
var Va;
function Ha(e) {
	let t = String(e ?? ""), n = t.normalize("NFKC");
	if (n === t) return {
		text: n,
		positionAt: (e) => e
	};
	if (typeof Intl.Segmenter == "function") {
		Va ??= new Intl.Segmenter("und", { granularity: "grapheme" });
		let e = new Uint32Array(n.length), r = 0, i = !0;
		for (let { segment: a, index: o } of Va.segment(t)) {
			let t = a.normalize("NFKC");
			if (!n.startsWith(t, r)) {
				i = !1;
				break;
			}
			for (let n = 0; n < t.length; n += 1) e[r + n] = a === t ? o + n : o;
			r += t.length;
		}
		if (i && r === n.length) return {
			text: n,
			positionAt: (n) => e[n] ?? t.length
		};
	}
	let r = [0];
	for (let e of t) r.push(r.at(-1) + e.length);
	let i = /* @__PURE__ */ new Map([[0, 0], [r.length - 1, n.length]]), a = (e) => (i.has(e) || i.set(e, t.slice(0, r[e]).normalize("NFKC").length), i.get(e));
	return {
		text: n,
		positionAt(e) {
			let t = 0, n = r.length - 1;
			for (; t < n;) {
				let r = Math.ceil((t + n) / 2);
				a(r) <= e ? t = r : n = r - 1;
			}
			return r[t];
		}
	};
}
//#endregion
//#region src/tokenizer.js
var Ua = `${String.raw`(?:(?!\p{Script=Han})[\p{L}\p{N}])`}${String.raw`(?:(?!\p{Script=Han})[\p{L}\p{N}\p{M}])`}*`, Wa = new RegExp(String.raw`\p{Script=Han}+|${Ua}(?:[-_.]${Ua})*`, "gu"), Ga = /^\p{Script=Han}+$/u;
function Ka(e, t) {
	if (!Number.isSafeInteger(e) || e < 2) throw RangeError("hanGramSize must be an integer >= 2");
	if (!Number.isSafeInteger(t) || t < 1) throw RangeError("minWordLength must be an integer >= 1");
}
function qa(e, t = {}) {
	let { hanGramSize: n = 2, minWordLength: r = 2 } = t;
	Ka(n, r);
	let { text: i, positionAt: a } = Ha(e), o = [];
	for (let e of i.matchAll(Wa)) {
		let t = e[0], i = e.index ?? 0;
		if (Ga.test(t)) {
			let e = Array.from(t);
			if (e.length < n) continue;
			let r = [], s = 0;
			for (let t of e) r.push(s), s += t.length;
			for (let t = 0; t <= e.length - n; t += 1) {
				let s = $(e.slice(t, t + n).join(""));
				o.push({
					value: s,
					position: a(i + r[t])
				});
			}
			continue;
		}
		let s = $(t);
		if (Array.from(s).length < r) continue;
		o.push({
			value: s,
			position: a(i)
		});
		let c = s.match(/^(\p{L}{2,})[-_.]?\d+$/u);
		c && Array.from(c[1]).length >= r && o.push({
			value: c[1],
			position: a(i)
		});
	}
	return o;
}
function Ja(e, t = {}) {
	let { hanGramSize: n = 2, minWordLength: r = 2 } = t;
	Ka(n, r);
	let i = String(e ?? "").normalize("NFKC"), a = [];
	for (let e of i.matchAll(Wa)) {
		let t = e[0], i = $(t);
		if (Ga.test(t)) {
			let e = Array.from(i);
			if (e.length < n) {
				a.push({
					raw: i,
					tokens: [],
					bodySearchable: !1,
					type: "han"
				});
				continue;
			}
			let t = [];
			for (let r = 0; r <= e.length - n; r += 1) t.push(e.slice(r, r + n).join(""));
			a.push({
				raw: i,
				tokens: t,
				bodySearchable: !0,
				type: "han"
			});
			continue;
		}
		let o = Array.from(i).length >= r;
		a.push({
			raw: i,
			tokens: o ? [i] : [],
			bodySearchable: o,
			type: "word"
		});
	}
	return a;
}
var Ya = Object.freeze({
	tokenize: qa,
	tokenizeQuery: Ja
}), Xa = Object.freeze({
	timestamp: -Infinity,
	year: null,
	month: null,
	day: null
});
function Za(e, t, n) {
	return t < 1 || t > 12 || n < 1 ? !1 : n <= [
		31,
		e % 4 == 0 && (e % 100 != 0 || e % 400 == 0) ? 29 : 28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	][t - 1];
}
function Qa(e) {
	if (e == null || e === "" || typeof e != "string" && typeof e != "number" && !(e instanceof Date)) return { ...Xa };
	let t = null;
	if (typeof e == "string" && (e = e.trim(), t = e.match(/^(\d{4})-(\d{2})-(\d{2})(?:[Tt](\d{2}):(\d{2}):(\d{2})(?:\.\d+)?([Zz]|([+-])(\d{2}):(\d{2})))?$/u), !t || !Za(Number(t[1]), Number(t[2]), Number(t[3])) || t[4] != null && (Number(t[4]) > 23 || Number(t[5]) > 59 || Number(t[6]) > 59 || t[9] != null && (Number(t[9]) > 23 || Number(t[10]) > 59)))) return { ...Xa };
	let n = e instanceof Date ? e : new Date(e);
	if (!Number.isFinite(n.getTime())) return { ...Xa };
	let r = t ? Number(t[1]) : n.getUTCFullYear(), i = t ? Number(t[2]) : n.getUTCMonth() + 1, a = t ? Number(t[3]) : n.getUTCDate();
	return Za(r, i, a) ? {
		timestamp: n.getTime(),
		year: r,
		month: i,
		day: a
	} : { ...Xa };
}
function $a(e, t) {
	if (e == null) return "";
	if (![
		"string",
		"number",
		"boolean"
	].includes(typeof e)) throw TypeError(`Article.${t} must be text`);
	return String(e);
}
function eo(e, t) {
	return [...new Set((e == null ? [] : Array.isArray(e) ? e : [e]).map((e) => $a(e, t).trim()).filter(Boolean))];
}
function to(e, t = 0) {
	if (typeof e != "object" || !e || Array.isArray(e) || e instanceof Date) throw TypeError(`Article at index ${t} must be an object`);
	let n = $a(e.title, "title").trim(), r = $a(e.content, "content");
	if (!n && !r.trim()) throw TypeError(`Article at index ${t} must have a non-empty title or content`);
	let i = e.id ?? t;
	if (typeof i != "string" && typeof i != "number" || typeof i == "number" && !Number.isFinite(i)) throw TypeError(`Article at index ${t} must have a string or finite numeric id`);
	let a = Qa(e.date), o = a.year == null ? null : typeof e.date == "string" ? e.date.trim() : new Date(a.timestamp).toISOString();
	return {
		...e,
		id: i,
		title: n,
		content: r,
		author: Array.isArray(e.author) ? eo(e.author, "author").join(", ") : $a(e.author, "author").trim(),
		date: o,
		categories: eo(e.categories, "categories"),
		tags: eo(e.tags, "tags"),
		url: $a(e.url, "url").trim()
	};
}
function no(e) {
	if (!Array.isArray(e)) throw TypeError("SearchEngine.load expects an Article[]");
	return Array.from(e, (e, t) => to(e, t));
}
//#endregion
//#region src/index-builder.js
function ro(e, t, n) {
	let r = e.get(t);
	r ? r.push(n) : e.set(t, [n]);
}
function io(e, t = {}) {
	let n = [], r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
	no(e).forEach((e, o) => {
		let s = {
			title: $(e.title),
			author: $(e.author),
			content: $(e.content)
		}, c = [...new Set(e.categories.map($).filter(Boolean))], l = {
			docId: o,
			externalId: e.id ?? o,
			article: e,
			normalized: s,
			date: Qa(e.date),
			categories: c
		};
		n.push(l), s.author && ro(r, s.author, o);
		for (let e of c) ro(i, e, o);
		let u = /* @__PURE__ */ new Map(), d = t.tokenizer ? t.tokenizer.tokenize(e.content, t) : qa(e.content, t);
		if (!Array.isArray(d)) throw TypeError("tokenizer.tokenize must return an array");
		for (let t of d) {
			if (!t || typeof t.value != "string" || !t.value.trim() || !Number.isSafeInteger(t.position) || t.position < 0 || t.position > e.content.length) throw TypeError("Token occurrences must contain a non-empty value and a valid UTF-16 position");
			let n = $(t.value), r = u.get(n);
			r ? (r.frequency += 1, r.positions.push(t.position)) : u.set(n, {
				articleId: o,
				frequency: 1,
				positions: [t.position]
			});
		}
		for (let [e, t] of u) {
			let n = a.get(e);
			n ? n.push(t) : a.set(e, [t]);
		}
	});
	for (let e of a.values()) e.sort((e, t) => e.articleId - t.articleId);
	return {
		documents: n,
		authorIndex: r,
		categoryIndex: i,
		bodyIndex: a
	};
}
//#endregion
//#region src/kmp.js
function ao(e) {
	let t = Array(e.length).fill(0), n = 0, r = 1;
	for (; r < e.length;) e[r] === e[n] ? (n += 1, t[r] = n, r += 1) : n > 0 ? n = t[n - 1] : r += 1;
	return t;
}
function oo(e, t) {
	if (t.length === 0) return 0;
	if (e.length === 0 || t.length > e.length) return -1;
	let n = ao(t), r = 0, i = 0;
	for (; r < e.length;) if (e[r] === t[i]) {
		if (r += 1, i += 1, i === t.length) return r - i;
	} else i > 0 ? i = n[i - 1] : r += 1;
	return -1;
}
//#endregion
//#region src/date-query.js
function so(e) {
	let t = String(e ?? "").trim(), n = t.match(/^(\d{4})$/u);
	return n ? { year: Number(n[1]) } : (n = t.match(/^(\d{4})[-/.年](\d{1,2})(?:月)?$/u), n ? Za(Number(n[1]), Number(n[2]), 1) ? {
		year: Number(n[1]),
		month: Number(n[2])
	} : null : (n = t.match(/^(\d{4})[-/.年](\d{1,2})[-/.月](\d{1,2})(?:日)?$/u), n && Za(Number(n[1]), Number(n[2]), Number(n[3])) ? {
		year: Number(n[1]),
		month: Number(n[2]),
		day: Number(n[3])
	} : null));
}
//#endregion
//#region src/set-ops.js
function co(e, t) {
	let n = [], r = 0, i = 0;
	for (; r < e.length && i < t.length;) e[r] === t[i] ? (n.push(e[r]), r += 1, i += 1) : e[r] < t[i] ? r += 1 : i += 1;
	return n;
}
//#endregion
//#region src/ranking.js
function lo({ candidate: e, document: t, query: n, coverage: r, options: i, statistics: a }) {
	let { weights: o } = i, s = 0;
	e.titleMatch === "exact" ? s += o.titleExact : e.titleMatch === "prefix" ? s += o.titlePrefix : e.titleMatch === "contains" && (s += o.titleContains), e.authorMatch === "exact" ? s += o.authorExact : e.authorMatch === "contains" && (s += o.authorContains), s += r * o.coverage;
	for (let [t, n] of e.bodyPostings) {
		let e = 1 + Math.log(n.frequency), r = Math.log((a.documentCount + 1) / (a.getDocumentFrequency(t) + 1)) + 1;
		s += e * r;
	}
	return n && oo(t.normalized.title, n) >= 0 && (s += o.titlePhrase), e.phraseInBody && (s += o.bodyPhrase), e.dateMatch && s === 0 ? 1 : s;
}
//#endregion
//#region src/formatter.js
function uo(e, t, n) {
	let r = String(e ?? "");
	if (!r.trim()) return "";
	let i = Math.max(0, Math.min(t ?? 0, r.length)), a = Math.max(0, i - Math.floor(n / 2)), o = Math.min(r.length, a + n);
	a > 0 && /[\uDC00-\uDFFF]/u.test(r[a]) && --a, o < r.length && /[\uDC00-\uDFFF]/u.test(r[o]) && (o += 1);
	let s = r.slice(a, o).replace(/\s+/gu, " ").trim();
	return `${a > 0 ? "…" : ""}${s}${o < r.length ? "…" : ""}`;
}
function fo({ candidate: e, document: t, score: n, coverage: r, options: i }) {
	return {
		article: t.article,
		documentId: t.docId,
		externalId: t.externalId,
		score: n,
		coverage: r,
		matchedFields: {
			title: e.titleMatch,
			author: e.authorMatch,
			date: e.dateMatch,
			body: e.bodyGroups.size > 0
		},
		matchedTokens: [...e.matchedTokens],
		snippet: uo(t.article.content, e.firstBodyPosition ?? 0, i.snippetLength)
	};
}
//#endregion
//#region src/options.js
var po = Object.freeze({
	hanGramSize: 2,
	minWordLength: 2,
	maxDocumentFrequencyRatio: .6,
	maxResults: 20,
	snippetLength: 110,
	matchMode: "any",
	weights: Object.freeze({
		titleExact: 20,
		titlePrefix: 15,
		titleContains: 10,
		authorExact: 8,
		authorContains: 5,
		coverage: 10,
		titlePhrase: 10,
		bodyPhrase: 5
	})
});
function mo(e, t) {
	if (typeof e != "object" || !e || Array.isArray(e)) throw TypeError(`${t} must be an object`);
}
function ho(e, t, n = 1) {
	if (!Number.isSafeInteger(e) || e < n) throw RangeError(`${t} must be an integer >= ${n}`);
}
function go(e) {
	if (e !== "any" && e !== "all") throw RangeError("matchMode must be \"any\" or \"all\"");
}
function _o(e = {}) {
	mo(e, "Search options"), e.weights !== void 0 && mo(e.weights, "weights");
	let t = {
		...po,
		tokenizer: Ya,
		ranker: lo,
		formatter: fo,
		...e,
		weights: Object.freeze({
			...po.weights,
			...e.weights
		})
	};
	ho(t.hanGramSize, "hanGramSize", 2), ho(t.minWordLength, "minWordLength"), ho(t.maxResults, "maxResults"), ho(t.snippetLength, "snippetLength"), go(t.matchMode);
	let n = t.maxDocumentFrequencyRatio;
	if (typeof n != "number" || !Number.isFinite(n) || n < 0 || n > 1) throw RangeError("maxDocumentFrequencyRatio must be between 0 and 1");
	for (let [e, n] of Object.entries(t.weights)) if (typeof n != "number" || !Number.isFinite(n) || n < 0) throw RangeError(`weights.${e} must be a finite non-negative number`);
	mo(t.tokenizer, "tokenizer");
	for (let e of ["tokenize", "tokenizeQuery"]) if (typeof t.tokenizer[e] != "function") throw TypeError(`tokenizer.${e} must be a function`);
	for (let e of ["ranker", "formatter"]) if (typeof t[e] != "function") throw TypeError(`${e} must be a function`);
	return Object.freeze(t);
}
//#endregion
//#region src/SearchEngine.js
function vo(e, t) {
	return t && e.date.year === t.year && (t.month == null || e.date.month === t.month) && (t.day == null || e.date.day === t.day);
}
function yo(e, t) {
	return !t || !e.includes(t) ? null : e === t ? "exact" : e.startsWith(t) ? "prefix" : "contains";
}
function bo(e, t, n) {
	let r = e.tokenizeQuery(t, n);
	if (!Array.isArray(r)) throw TypeError("tokenizer.tokenizeQuery must return an array");
	return r.map((e) => {
		if (!e || typeof e.raw != "string" || !Array.isArray(e.tokens) || e.tokens.some((e) => typeof e != "string" || !e.trim())) throw TypeError("Query groups must contain raw text and an array of non-empty tokens");
		let t = [...new Set(e.tokens.map($))];
		return {
			...e,
			raw: $(e.raw),
			tokens: t,
			bodySearchable: e.bodySearchable ?? t.length > 0
		};
	});
}
var xo = class {
	constructor(e = {}) {
		this.options = _o(e), this.articles = [], this.documents = [], this.authorIndex = /* @__PURE__ */ new Map(), this.categoryIndex = /* @__PURE__ */ new Map(), this.bodyIndex = /* @__PURE__ */ new Map();
	}
	load(e) {
		let t = io(e, this.options);
		return Object.assign(this, t), this.articles = t.documents.map((e) => e.article), this;
	}
	search(e, t = {}) {
		if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Search query options must be an object");
		let n = t.limit ?? this.options.maxResults, r = t.matchMode ?? this.options.matchMode;
		ho(n, "limit", 0), go(r);
		let i = $(e);
		if (!i || n === 0) return [];
		let a = this.#e(t.category);
		if (a?.size === 0) return [];
		let o = bo(this.options.tokenizer, e, this.options), s = so(e), c = /* @__PURE__ */ new Map(), l = (e) => a && !a.has(e) ? null : (c.has(e) || c.set(e, {
			docId: e,
			titleMatch: null,
			authorMatch: null,
			dateMatch: !1,
			matchedGroups: /* @__PURE__ */ new Set(),
			titleGroups: /* @__PURE__ */ new Set(),
			authorGroups: /* @__PURE__ */ new Set(),
			bodyGroups: /* @__PURE__ */ new Set(),
			matchedTokens: /* @__PURE__ */ new Set(),
			bodyPostings: /* @__PURE__ */ new Map(),
			phraseInBody: !1,
			firstBodyPosition: null
		}), c.get(e));
		for (let e of this.documents) if (!a || a.has(e.docId)) {
			for (let t of ["title", "author"]) {
				let n = e.normalized[t], r = yo(n, i);
				r && (l(e.docId)[`${t}Match`] = t === "author" && r === "prefix" ? "contains" : r), o.forEach((r, i) => {
					if (!yo(n, r.raw)) return;
					let a = l(e.docId);
					a[`${t}Match`] ??= "contains", a[`${t}Groups`].add(i), a.matchedGroups.add(i);
				});
			}
			vo(e, s) && (l(e.docId).dateMatch = !0);
		}
		this.#t(o, l);
		let u = {
			documentCount: this.documents.length,
			getDocumentFrequency: (e) => this.bodyIndex.get(e)?.length ?? 0
		}, d = [];
		for (let t of c.values()) {
			if (r === "all" && !t.dateMatch && t.matchedGroups.size < o.length) continue;
			let n = this.documents[t.docId], a = {
				article: n.article,
				document: n,
				candidate: t,
				groups: o,
				rawQuery: String(e ?? ""),
				query: i,
				coverage: o.length > 0 ? t.matchedGroups.size / o.length : 0,
				options: this.options,
				statistics: u
			}, s = this.options.ranker(a);
			if (typeof s != "number" || !Number.isFinite(s)) throw TypeError("ranker must return a finite numeric score");
			d.push({
				...a,
				score: s
			});
		}
		return d.sort((e, t) => e.score === t.score ? e.document.date.timestamp === t.document.date.timestamp ? e.document.docId - t.document.docId : e.document.date.timestamp > t.document.date.timestamp ? -1 : 1 : t.score - e.score), d.slice(0, n).map((e) => this.options.formatter(e));
	}
	#e(e) {
		if (e == null || e === "") return null;
		if (typeof e != "string") throw TypeError("category must be a string");
		return new Set(this.categoryIndex.get($(e)) ?? []);
	}
	#t(e, t) {
		let n = /* @__PURE__ */ new Map(), r = (e) => {
			if (!n.has(e)) {
				let t = this.bodyIndex.get(e);
				n.set(e, t ? {
					token: e,
					postings: t,
					byId: new Map(t.map((e) => [e.articleId, e]))
				} : null);
			}
			return n.get(e);
		};
		e.forEach((e, n) => {
			if (!e.bodySearchable || e.tokens.length === 0) return;
			let i = e.tokens.map(r);
			if (i.some((e) => e == null)) return;
			let a = i.filter(({ postings: e }) => e.length / this.documents.length <= this.options.maxDocumentFrequencyRatio), o = (a.length > 0 ? a : [...i]).sort((e, t) => e.postings.length - t.postings.length), s = o[0].postings.map((e) => e.articleId);
			for (let e = 1; e < o.length && s.length > 0; e += 1) s = co(s, o[e].postings.map((e) => e.articleId));
			for (let r of s) {
				if (!i.every(({ byId: e }) => e.has(r))) continue;
				let a = this.documents[r], o = oo(a.normalized.content, e.raw);
				if ((e.verifyPhrase ?? e.type === "han") && o < 0) continue;
				let s = t(r);
				if (s) {
					s.bodyGroups.add(n), s.matchedGroups.add(n), s.phraseInBody ||= o >= 0;
					for (let { token: e, byId: t } of i) {
						let n = t.get(r);
						s.matchedTokens.add(e), s.bodyPostings.set(e, n);
						let i = n.positions[0];
						(s.firstBodyPosition == null || i < s.firstBodyPosition) && (s.firstBodyPosition = i);
					}
				}
			}
		});
	}
}, So = /* @__PURE__ */ new WeakMap(), Co = 12e3;
function wo(e, t, n) {
	let r;
	try {
		r = new URL(e, t);
	} catch {
		throw TypeError(`${n} must be a valid URL for this site`);
	}
	if (!["http:", "https:"].includes(r.protocol) || r.origin !== t.origin) throw TypeError(`${n} must point to this site`);
	return r;
}
function To(e = "/search-index.json", t = {}) {
	if (!t || typeof t != "object" || Array.isArray(t)) throw TypeError("Search client options must be an object");
	let n = t.fetch ?? globalThis.fetch;
	if (typeof n != "function") throw TypeError("Search client requires a fetch function");
	let r = t.baseUrl ?? globalThis.location?.href ?? globalThis.window?.location?.href, i;
	try {
		i = new URL(r);
	} catch {
		throw TypeError("Search client requires an absolute baseUrl outside a browser");
	}
	if (!["http:", "https:"].includes(i.protocol)) throw TypeError("Search client baseUrl must use HTTP or HTTPS");
	let a = wo(String(e || "/search-index.json"), i, "Search index URL"), o = t.timeoutMs ?? Co;
	if (!Number.isFinite(o) || o <= 0) throw TypeError("Search client timeoutMs must be a positive number");
	if (t.engineOptions != null && (typeof t.engineOptions != "object" || Array.isArray(t.engineOptions))) throw TypeError("Search client engineOptions must be an object");
	let s = Object.keys(t).length === 0, c = JSON.stringify([i.href, a.href]), l = So.get(n);
	if (s && l?.has(c)) return l.get(c);
	let u = { ...t.engineOptions };
	u.weights && typeof u.weights == "object" && !Array.isArray(u.weights) && (u.weights = { ...u.weights });
	let d = null, f = [], p = null, m = () => {
		if (d) return Promise.resolve(d);
		if (p) return p;
		let e = new AbortController(), t, r = new Promise((n, r) => {
			t = setTimeout(() => {
				r(new DOMException("Search index request timed out", "AbortError")), e.abort();
			}, o);
		}), s = (async () => {
			let t = await n.call(globalThis, a.href, {
				headers: { Accept: "application/json" },
				cache: "no-cache",
				signal: e.signal
			});
			if (!t.ok) throw Error("Search index request failed: " + t.status);
			let r = await t.json();
			if (!Array.isArray(r) || r.some((e) => !e || typeof e != "object" || Array.isArray(e) || typeof e.url != "string" || !e.url.trim())) throw TypeError("Search index must contain valid articles");
			let o = r.map((e) => {
				let t = wo(e.url, i, "Search result URL"), n = t.pathname + t.search + t.hash;
				return {
					...e,
					url: n.startsWith("//") ? t.href : n
				};
			});
			return new xo(u).load(o);
		})();
		return p = Promise.race([s, r]).then((e) => {
			let t = /* @__PURE__ */ new Set();
			for (let n of e.articles) if (Array.isArray(n.categories)) for (let e of n.categories) {
				let n = String(e ?? "").trim();
				n && t.add(n);
			}
			return f = [...t].sort((e, t) => e.localeCompare(t, "zh-Hans-CN")), d = e, d;
		}).finally(() => {
			clearTimeout(t), p = null;
		}), p;
	}, h = {
		async search(e, t = {}) {
			return (await m()).search(e, t);
		},
		async categories() {
			return await m(), [...f];
		},
		load: m
	};
	return s && (l || So.set(n, l = /* @__PURE__ */ new Map()), l.set(c, h)), h;
}
//#endregion
//#region frontend/components/SearchPanel.vue
var Eo = { class: "qsg-search-header" }, Do = { class: "qsg-search-input-wrap" }, Oo = ["aria-activedescendant"], ko = {
	key: 0,
	class: "qsg-search-filters",
	"aria-label": "文章分类筛选"
}, Ao = ["aria-pressed"], jo = ["aria-pressed", "onClick"], Mo = {
	class: "qsg-search-status",
	role: "status",
	"aria-live": "polite",
	"aria-atomic": "true"
}, No = {
	key: 1,
	class: "qsg-search-error-actions"
}, Po = ["aria-busy"], Fo = [
	"href",
	"data-result-index",
	"id",
	"aria-selected",
	"onMouseenter",
	"onFocus"
], Io = { class: "qsg-search-result-title" }, Lo = { key: 0 }, Ro = { key: 1 }, zo = { class: "qsg-search-meta" }, Bo = { key: 0 }, Vo = { key: 1 }, Ho = {
	key: 0,
	class: "qsg-search-snippet"
}, Uo = { key: 0 }, Wo = { key: 1 }, Go = {
	__name: "SearchPanel",
	props: {
		indexUrl: {
			type: String,
			default: "/search-index.json"
		},
		engineOptions: {
			type: Object,
			default: () => ({})
		},
		resultLimit: {
			type: Number,
			default: void 0
		},
		debounceMs: {
			type: Number,
			default: 180
		}
	},
	setup(e) {
		let t = e, n = /* @__PURE__ */ z(null), r = /* @__PURE__ */ z(null), i = /* @__PURE__ */ z(null), a = /* @__PURE__ */ z(!1), o = /* @__PURE__ */ z(""), s = /* @__PURE__ */ z(""), c = /* @__PURE__ */ z([]), l = /* @__PURE__ */ z([]), u = /* @__PURE__ */ z(-1), d = /* @__PURE__ */ z(!1), f = /* @__PURE__ */ z(!1), p = /* @__PURE__ */ z(!1), m = /* @__PURE__ */ z(""), h = /* @__PURE__ */ z(!1), g = null, _ = 0, v = null, y = null, b = Ri(() => {
			let e = t.resultLimit ?? t.engineOptions.maxResults;
			return Number.isInteger(e) && e > 0 ? e : 20;
		}), x = Ri(() => Number.isFinite(t.debounceMs) && t.debounceMs >= 0 ? t.debounceMs : 180), S = To(t.indexUrl, { engineOptions: t.engineOptions }), C = Ri(() => d.value ? f.value ? "正在搜索…" : "正在准备搜索索引…" : m.value ? m.value : h.value ? "请完成关键词输入" : o.value.trim() ? l.value.length === 0 ? "没有找到与「" + o.value.trim() + "」相关的文章" : p.value ? "显示前 " + b.value + " 篇相关文章，可继续输入或筛选分类" : "找到 " + l.value.length + " 篇相关文章" : "输入标题、作者、日期或正文关键词开始搜索"), w = Ri(() => {
			let e = o.value.match(/\p{Script=Han}+|[\p{L}\p{N}]+(?:[-_.][\p{L}\p{N}]+)*/gu) ?? [];
			return [...new Set(e.map((e) => e.trim()).filter(Boolean))].sort((e, t) => t.length - e.length);
		});
		function ee(e) {
			return e.replace(/[.*+?^\x24{}()|[\]\\]/g, "\\$&");
		}
		function te(e) {
			let t = String(e ?? "");
			if (!t || w.value.length === 0) return [{
				text: t,
				highlighted: !1
			}];
			let n = w.value.map(ee).join("|"), r = RegExp("(" + n + ")", "giu"), i = [], a = 0;
			for (let e of t.matchAll(r)) {
				let n = e.index ?? 0;
				n > a && i.push({
					text: t.slice(a, n),
					highlighted: !1
				}), i.push({
					text: e[0],
					highlighted: !0
				}), a = n + e[0].length;
			}
			return a < t.length && i.push({
				text: t.slice(a),
				highlighted: !1
			}), i.length ? i : [{
				text: t,
				highlighted: !1
			}];
		}
		function ne(e) {
			let t = String(e?.date ?? "");
			return /^\d{4}-\d{2}-\d{2}/.test(t) ? t.slice(0, 10) : t;
		}
		function T(e) {
			return Array.isArray(e?.categories) ? e.categories.filter(Boolean) : [];
		}
		function re() {
			window.clearTimeout(g), g = null, _ += 1;
		}
		function E() {
			l.value = [], u.value = -1, p.value = !1;
		}
		async function ie() {
			if (re(), !a.value || h.value) return;
			let e = _, t = o.value.trim(), n = s.value;
			d.value = !0, m.value = "", E();
			try {
				let r = await S.categories();
				if (e !== _ || !a.value) return;
				c.value = r, f.value = !0;
				let i = t ? await S.search(t, {
					category: n || void 0,
					limit: b.value + 1
				}) : [];
				if (e !== _ || !a.value) return;
				p.value = i.length > b.value, l.value = i.slice(0, b.value), u.value = l.value.length ? 0 : -1;
			} catch (t) {
				if (e !== _ || !a.value) return;
				console.error("[qingshuige-search] Search failed", t), m.value = "搜索加载失败，请检查网络后重试";
			} finally {
				e === _ && (d.value = !1);
			}
		}
		function ae() {
			re(), E(), m.value = "", d.value = !1, a.value && !h.value && (o.value.trim() || !f.value) && (d.value = !0, g = window.setTimeout(ie, x.value));
		}
		function D(e) {
			for (let t of document.querySelectorAll("[data-search-trigger]")) t.setAttribute("aria-expanded", String(e));
		}
		function oe() {
			if (y || !n.value) return;
			let e = window.scrollY, t = document.body, r = {};
			for (let e of [
				"position",
				"top",
				"width",
				"overflow",
				"paddingRight"
			]) r[e] = t.style[e];
			let i = window.innerWidth - document.documentElement.clientWidth;
			i > 0 && (t.style.paddingRight = parseFloat(getComputedStyle(t).paddingRight) + i + "px"), t.style.position = "fixed", t.style.top = "-" + e + "px", t.style.width = "100%", t.style.overflow = "hidden";
			let a = [];
			function o(e) {
				for (let t of e.children) t !== n.value && (t.contains(n.value) ? o(t) : a.push({
					element: t,
					inert: t.inert
				}));
			}
			o(t);
			for (let { element: e } of a) e.inert = !0;
			y = () => {
				for (let [e, n] of Object.entries(r)) t.style[e] = n;
				for (let { element: e, inert: t } of a) e.inert = t;
				window.scrollTo({
					top: e,
					behavior: "instant"
				}), y = null;
			};
		}
		function se(e = null) {
			if (a.value) {
				i.value?.focus();
				return;
			}
			v = e instanceof HTMLElement ? e : document.activeElement, a.value = !0, h.value = !1, D(!0), ie(), cn(() => {
				a.value && (oe(), i.value?.focus({ preventScroll: !0 }));
			});
		}
		function ce() {
			a.value && (a.value = !1, h.value = !1, re(), d.value = !1, D(!1), y?.(), cn(() => {
				a.value || (v?.isConnected ? v : document.querySelector("[data-search-trigger]"))?.focus({ preventScroll: !0 });
			}));
		}
		function le(e) {
			let t = e.target instanceof Element ? e.target.closest("[data-search-trigger]") : null;
			t && !t.disabled && (e.preventDefault(), se(t));
		}
		function ue(e) {
			if (d.value || !l.value.length) return;
			let t = l.value.length, n = u.value;
			u.value = n < 0 ? e > 0 ? 0 : t - 1 : (n + e + t) % t, cn(() => {
				r.value?.querySelector("[data-result-index=\"" + u.value + "\"]")?.scrollIntoView({ block: "nearest" });
			});
		}
		function de() {
			if (d.value || h.value) return;
			let e = l.value[u.value]?.article?.url;
			e && window.location.assign(e);
		}
		function fe(e) {
			if (e.key !== "Tab" || !r.value) return;
			let t = [...r.value.querySelectorAll("button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex=\"-1\"])")].filter((e) => e.getClientRects().length && !e.closest("[inert]")), n = t[0], i = t[t.length - 1];
			n && (e.shiftKey && (document.activeElement === n || !r.value.contains(document.activeElement)) ? (e.preventDefault(), i.focus()) : !e.shiftKey && document.activeElement === i && (e.preventDefault(), n.focus()));
		}
		function pe(e) {
			if (!(e.isComposing || e.keyCode === 229 || h.value || e.defaultPrevented)) {
				if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "k") {
					e.preventDefault(), e.repeat || (a.value ? ce() : se());
					return;
				}
				if (a.value) {
					if (e.key === "Escape") {
						e.preventDefault(), ce();
						return;
					}
					document.activeElement !== i.value || e.ctrlKey || e.metaKey || e.altKey || (e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), ue(e.key === "ArrowDown" ? 1 : -1)) : e.key === "Enter" && (e.preventDefault(), g === null ? de() : ie()));
				}
			}
		}
		function me() {
			h.value = !0, re(), E(), d.value = !1;
		}
		function he(e) {
			h.value = !1, o.value = e.target.value, ae();
		}
		return Tn([o, s], ae, { flush: "sync" }), er(() => {
			document.addEventListener("click", le), window.addEventListener("keydown", pe);
		}), tr(() => {
			document.removeEventListener("click", le), window.removeEventListener("keydown", pe), re(), D(!1), y?.();
		}), (e, t) => (q(), oi(Rn, { to: "body" }, [a.value ? (q(), J("div", {
			key: 0,
			ref_key: "layer",
			ref: n,
			class: "qsg-search-layer",
			onPointerdown: Pa(ce, ["self"])
		}, [Y("section", {
			id: "qsg-search-dialog",
			ref_key: "dialog",
			ref: r,
			class: "qsg-search-dialog",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "站内搜索",
			tabindex: "-1",
			onKeydown: fe
		}, [
			Y("header", Eo, [Y("div", Do, [t[3] ||= Y("svg", {
				viewBox: "0 0 24 24",
				"aria-hidden": "true"
			}, [Y("circle", {
				cx: "11",
				cy: "11",
				r: "6.5"
			}), Y("path", { d: "m16 16 4.2 4.2" })], -1), bn(Y("input", {
				ref_key: "input",
				ref: i,
				"onUpdate:modelValue": t[0] ||= (e) => o.value = e,
				class: "qsg-search-input",
				type: "search",
				autocomplete: "off",
				spellcheck: "false",
				placeholder: "搜索标题、作者或正文…",
				"aria-label": "搜索关键词",
				role: "combobox",
				"aria-autocomplete": "list",
				"aria-controls": "qsg-search-results",
				"aria-expanded": "true",
				"aria-activedescendant": u.value >= 0 ? "qsg-search-result-" + u.value : void 0,
				onCompositionstart: me,
				onCompositionend: he
			}, null, 40, Oo), [[ja, o.value]])]), Y("button", {
				class: "qsg-search-close",
				type: "button",
				"aria-label": "关闭搜索",
				onClick: ce
			}, [...t[4] ||= [Y("span", { "aria-hidden": "true" }, "×", -1)]])]),
			c.value.length ? (q(), J("div", ko, [Y("button", {
				type: "button",
				class: O(["qsg-search-filter", { "is-active": s.value === "" }]),
				"aria-pressed": s.value === "",
				onClick: t[1] ||= (e) => s.value = ""
			}, " 全部 ", 10, Ao), (q(!0), J(G, null, rr(c.value, (e) => (q(), J("button", {
				key: e,
				type: "button",
				class: O(["qsg-search-filter", { "is-active": s.value === e }]),
				"aria-pressed": s.value === e,
				onClick: (t) => s.value = e
			}, k(e), 11, jo))), 128))])) : gi("", !0),
			Y("div", Mo, k(C.value), 1),
			m.value ? (q(), J("div", No, [Y("button", {
				type: "button",
				class: "qsg-search-filter",
				onClick: t[2] ||= (e) => {
					ie(), i.value?.focus();
				}
			}, "重试")])) : gi("", !0),
			Y("div", {
				id: "qsg-search-results",
				class: "qsg-search-results",
				role: "listbox",
				"aria-label": "搜索结果",
				"aria-busy": d.value
			}, [(q(!0), J(G, null, rr(l.value, (e, t) => (q(), J("a", {
				key: e.externalId ?? e.article.url,
				href: e.article.url,
				"data-result-index": t,
				id: "qsg-search-result-" + t,
				class: O(["qsg-search-result", { "is-selected": u.value === t }]),
				role: "option",
				"aria-selected": u.value === t,
				onMouseenter: (e) => u.value = t,
				onFocus: (e) => u.value = t
			}, [
				Y("h2", Io, [(q(!0), J(G, null, rr(te(e.article.title), (e, t) => (q(), J(G, { key: t }, [e.highlighted ? (q(), J("mark", Lo, k(e.text), 1)) : (q(), J("span", Ro, k(e.text), 1))], 64))), 128))]),
				Y("div", zo, [
					e.article.author ? (q(), J("span", Bo, k(e.article.author), 1)) : gi("", !0),
					ne(e.article) ? (q(), J("span", Vo, k(ne(e.article)), 1)) : gi("", !0),
					(q(!0), J(G, null, rr(T(e.article), (e) => (q(), J("span", { key: e }, k(e), 1))), 128))
				]),
				e.snippet ? (q(), J("p", Ho, [(q(!0), J(G, null, rr(te(e.snippet), (e, t) => (q(), J(G, { key: t }, [e.highlighted ? (q(), J("mark", Uo, k(e.text), 1)) : (q(), J("span", Wo, k(e.text), 1))], 64))), 128))])) : gi("", !0)
			], 42, Fo))), 128))], 8, Po),
			t[5] ||= Y("footer", { class: "qsg-search-footer" }, [
				Y("span", null, [
					Y("kbd", null, "↑"),
					Y("kbd", null, "↓"),
					hi(" 选择")
				]),
				Y("span", null, [Y("kbd", null, "Enter"), hi(" 打开")]),
				Y("span", null, [Y("kbd", null, "Esc"), hi(" 关闭")])
			], -1)
		], 544)], 544)) : gi("", !0)]));
	}
}, Ko = Symbol.for("qingshuige-search.vue-app"), qo = "[data-qsg-search], [data-vue-component=\"SearchPanel\"]";
function Jo(e, t) {
	let n = e.dataset[t];
	if (!n) return {};
	try {
		let e = JSON.parse(n);
		if (e && typeof e == "object" && !Array.isArray(e)) return e;
	} catch {}
	return console.warn(`[qingshuige-search] Invalid ${t} JSON; using defaults`), {};
}
function Yo(e = document) {
	let t = [...e.querySelectorAll(qo)];
	return e.matches?.(qo) && t.unshift(e), t.map((e) => {
		if (e[Ko]) return e[Ko];
		let t = Jo(e, "searchUi"), n = {
			indexUrl: e.dataset.searchIndexUrl,
			engineOptions: Jo(e, "searchOptions")
		};
		Number.isInteger(t.resultLimit) && t.resultLimit > 0 && (n.resultLimit = t.resultLimit), Number.isFinite(t.debounceMs) && t.debounceMs >= 0 && (n.debounceMs = t.debounceMs);
		let r = Ra(Go, n);
		return r.mount(e), e[Ko] = r, r.onUnmount(() => {
			delete e[Ko];
		}), r;
	});
}
//#endregion
//#region frontend/main.js
Yo();
//#endregion
