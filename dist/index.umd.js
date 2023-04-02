;(function (k, D) {
  typeof exports == 'object' && typeof module < 'u'
    ? D(exports)
    : typeof define == 'function' && define.amd
    ? define(['exports'], D)
    : ((k = typeof globalThis < 'u' ? globalThis : k || self), D((k.WasmImgHash = {})))
})(this, function (k) {
  'use strict'
  let D = {}
  D.__wbindgen_placeholder__ = module.exports
  let C
  const { TextDecoder: mr } = require('util')
  let er = new mr('utf-8', { ignoreBOM: !0, fatal: !0 })
  er.decode()
  let H = null
  function nr() {
    return (H === null || H.byteLength === 0) && (H = new Uint8Array(C.memory.buffer)), H
  }
  function z(h, c) {
    return er.decode(nr().subarray(h, h + c))
  }
  const S = new Array(128).fill(void 0)
  S.push(void 0, null, !0, !1)
  let W = S.length
  function Ir(h) {
    W === S.length && S.push(S.length + 1)
    const c = W
    return (W = S[c]), (S[c] = h), c
  }
  let ir = 0
  function Fr(h, c) {
    const s = c(h.length * 1)
    return nr().set(h, s / 1), (ir = h.length), s
  }
  let Y = null
  function V() {
    return (Y === null || Y.byteLength === 0) && (Y = new Int32Array(C.memory.buffer)), Y
  }
  function Ar(h) {
    return S[h]
  }
  function Ur(h) {
    h < 132 || ((S[h] = W), (W = h))
  }
  function _r(h) {
    const c = Ar(h)
    return Ur(h), c
  }
  ;(module.exports.image_hash = function (h, c, s) {
    try {
      const A = C.__wbindgen_add_to_stack_pointer(-16),
        m = Fr(h, C.__wbindgen_malloc),
        I = ir
      C.image_hash(A, m, I, c, s)
      var l = V()[A / 4 + 0],
        w = V()[A / 4 + 1],
        a = V()[A / 4 + 2],
        p = V()[A / 4 + 3],
        o = l,
        x = w
      if (p) throw ((o = 0), (x = 0), _r(a))
      return z(o, x)
    } finally {
      C.__wbindgen_add_to_stack_pointer(16), C.__wbindgen_free(o, x)
    }
  }),
    (module.exports.__wbindgen_string_new = function (h, c) {
      const s = z(h, c)
      return Ir(s)
    }),
    (module.exports.__wbindgen_throw = function (h, c) {
      throw new Error(z(h, c))
    })
  const Rr = require('path').join(__dirname, 'wasm_phash_bg.wasm'),
    br = require('fs').readFileSync(Rr),
    Tr = new WebAssembly.Module(br)
  ;(C = new WebAssembly.Instance(Tr, D).exports), (module.exports.__wasm = C)
  var or = {},
    X = {}
  ;(X.byteLength = Mr), (X.toByteArray = Nr), (X.fromByteArray = $r)
  for (
    var b = [],
      R = [],
      Cr = typeof Uint8Array < 'u' ? Uint8Array : Array,
      K = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      $ = 0,
      Sr = K.length;
    $ < Sr;
    ++$
  )
    (b[$] = K[$]), (R[K.charCodeAt($)] = $)
  ;(R['-'.charCodeAt(0)] = 62), (R['_'.charCodeAt(0)] = 63)
  function ur(h) {
    var c = h.length
    if (c % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4')
    var s = h.indexOf('=')
    s === -1 && (s = c)
    var l = s === c ? 0 : 4 - (s % 4)
    return [s, l]
  }
  function Mr(h) {
    var c = ur(h),
      s = c[0],
      l = c[1]
    return ((s + l) * 3) / 4 - l
  }
  function Lr(h, c, s) {
    return ((c + s) * 3) / 4 - s
  }
  function Nr(h) {
    var c,
      s = ur(h),
      l = s[0],
      w = s[1],
      a = new Cr(Lr(h, l, w)),
      p = 0,
      o = w > 0 ? l - 4 : l,
      x
    for (x = 0; x < o; x += 4)
      (c =
        (R[h.charCodeAt(x)] << 18) |
        (R[h.charCodeAt(x + 1)] << 12) |
        (R[h.charCodeAt(x + 2)] << 6) |
        R[h.charCodeAt(x + 3)]),
        (a[p++] = (c >> 16) & 255),
        (a[p++] = (c >> 8) & 255),
        (a[p++] = c & 255)
    return (
      w === 2 &&
        ((c = (R[h.charCodeAt(x)] << 2) | (R[h.charCodeAt(x + 1)] >> 4)),
        (a[p++] = c & 255)),
      w === 1 &&
        ((c =
          (R[h.charCodeAt(x)] << 10) |
          (R[h.charCodeAt(x + 1)] << 4) |
          (R[h.charCodeAt(x + 2)] >> 2)),
        (a[p++] = (c >> 8) & 255),
        (a[p++] = c & 255)),
      a
    )
  }
  function kr(h) {
    return b[(h >> 18) & 63] + b[(h >> 12) & 63] + b[(h >> 6) & 63] + b[h & 63]
  }
  function Dr(h, c, s) {
    for (var l, w = [], a = c; a < s; a += 3)
      (l = ((h[a] << 16) & 16711680) + ((h[a + 1] << 8) & 65280) + (h[a + 2] & 255)),
        w.push(kr(l))
    return w.join('')
  }
  function $r(h) {
    for (
      var c, s = h.length, l = s % 3, w = [], a = 16383, p = 0, o = s - l;
      p < o;
      p += a
    )
      w.push(Dr(h, p, p + a > o ? o : p + a))
    return (
      l === 1
        ? ((c = h[s - 1]), w.push(b[c >> 2] + b[(c << 4) & 63] + '=='))
        : l === 2 &&
          ((c = (h[s - 2] << 8) + h[s - 1]),
          w.push(b[c >> 10] + b[(c >> 4) & 63] + b[(c << 2) & 63] + '=')),
      w.join('')
    )
  }
  var Z = {}
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ ;(Z.read =
    function (h, c, s, l, w) {
      var a,
        p,
        o = w * 8 - l - 1,
        x = (1 << o) - 1,
        A = x >> 1,
        m = -7,
        I = s ? w - 1 : 0,
        M = s ? -1 : 1,
        U = h[c + I]
      for (
        I += M, a = U & ((1 << -m) - 1), U >>= -m, m += o;
        m > 0;
        a = a * 256 + h[c + I], I += M, m -= 8
      );
      for (
        p = a & ((1 << -m) - 1), a >>= -m, m += l;
        m > 0;
        p = p * 256 + h[c + I], I += M, m -= 8
      );
      if (a === 0) a = 1 - A
      else {
        if (a === x) return p ? NaN : (U ? -1 : 1) * (1 / 0)
        ;(p = p + Math.pow(2, l)), (a = a - A)
      }
      return (U ? -1 : 1) * p * Math.pow(2, a - l)
    }),
    (Z.write = function (h, c, s, l, w, a) {
      var p,
        o,
        x,
        A = a * 8 - w - 1,
        m = (1 << A) - 1,
        I = m >> 1,
        M = w === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        U = l ? 0 : a - 1,
        j = l ? 1 : -1,
        q = c < 0 || (c === 0 && 1 / c < 0) ? 1 : 0
      for (
        c = Math.abs(c),
          isNaN(c) || c === 1 / 0
            ? ((o = isNaN(c) ? 1 : 0), (p = m))
            : ((p = Math.floor(Math.log(c) / Math.LN2)),
              c * (x = Math.pow(2, -p)) < 1 && (p--, (x *= 2)),
              p + I >= 1 ? (c += M / x) : (c += M * Math.pow(2, 1 - I)),
              c * x >= 2 && (p++, (x /= 2)),
              p + I >= m
                ? ((o = 0), (p = m))
                : p + I >= 1
                ? ((o = (c * x - 1) * Math.pow(2, w)), (p = p + I))
                : ((o = c * Math.pow(2, I - 1) * Math.pow(2, w)), (p = 0)));
        w >= 8;
        h[s + U] = o & 255, U += j, o /= 256, w -= 8
      );
      for (p = (p << w) | o, A += w; A > 0; h[s + U] = p & 255, U += j, p /= 256, A -= 8);
      h[s + U - j] |= q * 128
    })
  ;(function (h) {
    const c = X,
      s = Z,
      l =
        typeof Symbol == 'function' && typeof Symbol.for == 'function'
          ? Symbol.for('nodejs.util.inspect.custom')
          : null
    ;(h.Buffer = o), (h.SlowBuffer = qr), (h.INSPECT_MAX_BYTES = 50)
    const w = 2147483647
    ;(h.kMaxLength = w),
      (o.TYPED_ARRAY_SUPPORT = a()),
      !o.TYPED_ARRAY_SUPPORT &&
        typeof console < 'u' &&
        typeof console.error == 'function' &&
        console.error(
          'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
        )
    function a() {
      try {
        const e = new Uint8Array(1),
          r = {
            foo: function () {
              return 42
            },
          }
        return (
          Object.setPrototypeOf(r, Uint8Array.prototype),
          Object.setPrototypeOf(e, r),
          e.foo() === 42
        )
      } catch {
        return !1
      }
    }
    Object.defineProperty(o.prototype, 'parent', {
      enumerable: !0,
      get: function () {
        if (o.isBuffer(this)) return this.buffer
      },
    }),
      Object.defineProperty(o.prototype, 'offset', {
        enumerable: !0,
        get: function () {
          if (o.isBuffer(this)) return this.byteOffset
        },
      })
    function p(e) {
      if (e > w)
        throw new RangeError('The value "' + e + '" is invalid for option "size"')
      const r = new Uint8Array(e)
      return Object.setPrototypeOf(r, o.prototype), r
    }
    function o(e, r, t) {
      if (typeof e == 'number') {
        if (typeof r == 'string')
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          )
        return I(e)
      }
      return x(e, r, t)
    }
    o.poolSize = 8192
    function x(e, r, t) {
      if (typeof e == 'string') return M(e, r)
      if (ArrayBuffer.isView(e)) return j(e)
      if (e == null)
        throw new TypeError(
          'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
            typeof e
        )
      if (
        T(e, ArrayBuffer) ||
        (e && T(e.buffer, ArrayBuffer)) ||
        (typeof SharedArrayBuffer < 'u' &&
          (T(e, SharedArrayBuffer) || (e && T(e.buffer, SharedArrayBuffer))))
      )
        return q(e, r, t)
      if (typeof e == 'number')
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        )
      const n = e.valueOf && e.valueOf()
      if (n != null && n !== e) return o.from(n, r, t)
      const i = jr(e)
      if (i) return i
      if (
        typeof Symbol < 'u' &&
        Symbol.toPrimitive != null &&
        typeof e[Symbol.toPrimitive] == 'function'
      )
        return o.from(e[Symbol.toPrimitive]('string'), r, t)
      throw new TypeError(
        'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
          typeof e
      )
    }
    ;(o.from = function (e, r, t) {
      return x(e, r, t)
    }),
      Object.setPrototypeOf(o.prototype, Uint8Array.prototype),
      Object.setPrototypeOf(o, Uint8Array)
    function A(e) {
      if (typeof e != 'number')
        throw new TypeError('"size" argument must be of type number')
      if (e < 0)
        throw new RangeError('The value "' + e + '" is invalid for option "size"')
    }
    function m(e, r, t) {
      return (
        A(e),
        e <= 0
          ? p(e)
          : r !== void 0
          ? typeof t == 'string'
            ? p(e).fill(r, t)
            : p(e).fill(r)
          : p(e)
      )
    }
    o.alloc = function (e, r, t) {
      return m(e, r, t)
    }
    function I(e) {
      return A(e), p(e < 0 ? 0 : Q(e) | 0)
    }
    ;(o.allocUnsafe = function (e) {
      return I(e)
    }),
      (o.allocUnsafeSlow = function (e) {
        return I(e)
      })
    function M(e, r) {
      if (((typeof r != 'string' || r === '') && (r = 'utf8'), !o.isEncoding(r)))
        throw new TypeError('Unknown encoding: ' + r)
      const t = hr(e, r) | 0
      let n = p(t)
      const i = n.write(e, r)
      return i !== t && (n = n.slice(0, i)), n
    }
    function U(e) {
      const r = e.length < 0 ? 0 : Q(e.length) | 0,
        t = p(r)
      for (let n = 0; n < r; n += 1) t[n] = e[n] & 255
      return t
    }
    function j(e) {
      if (T(e, Uint8Array)) {
        const r = new Uint8Array(e)
        return q(r.buffer, r.byteOffset, r.byteLength)
      }
      return U(e)
    }
    function q(e, r, t) {
      if (r < 0 || e.byteLength < r)
        throw new RangeError('"offset" is outside of buffer bounds')
      if (e.byteLength < r + (t || 0))
        throw new RangeError('"length" is outside of buffer bounds')
      let n
      return (
        r === void 0 && t === void 0
          ? (n = new Uint8Array(e))
          : t === void 0
          ? (n = new Uint8Array(e, r))
          : (n = new Uint8Array(e, r, t)),
        Object.setPrototypeOf(n, o.prototype),
        n
      )
    }
    function jr(e) {
      if (o.isBuffer(e)) {
        const r = Q(e.length) | 0,
          t = p(r)
        return t.length === 0 || e.copy(t, 0, 0, r), t
      }
      if (e.length !== void 0)
        return typeof e.length != 'number' || tr(e.length) ? p(0) : U(e)
      if (e.type === 'Buffer' && Array.isArray(e.data)) return U(e.data)
    }
    function Q(e) {
      if (e >= w)
        throw new RangeError(
          'Attempt to allocate Buffer larger than maximum size: 0x' +
            w.toString(16) +
            ' bytes'
        )
      return e | 0
    }
    function qr(e) {
      return +e != e && (e = 0), o.alloc(+e)
    }
    ;(o.isBuffer = function (r) {
      return r != null && r._isBuffer === !0 && r !== o.prototype
    }),
      (o.compare = function (r, t) {
        if (
          (T(r, Uint8Array) && (r = o.from(r, r.offset, r.byteLength)),
          T(t, Uint8Array) && (t = o.from(t, t.offset, t.byteLength)),
          !o.isBuffer(r) || !o.isBuffer(t))
        )
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          )
        if (r === t) return 0
        let n = r.length,
          i = t.length
        for (let u = 0, f = Math.min(n, i); u < f; ++u)
          if (r[u] !== t[u]) {
            ;(n = r[u]), (i = t[u])
            break
          }
        return n < i ? -1 : i < n ? 1 : 0
      }),
      (o.isEncoding = function (r) {
        switch (String(r).toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'latin1':
          case 'binary':
          case 'base64':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return !0
          default:
            return !1
        }
      }),
      (o.concat = function (r, t) {
        if (!Array.isArray(r))
          throw new TypeError('"list" argument must be an Array of Buffers')
        if (r.length === 0) return o.alloc(0)
        let n
        if (t === void 0) for (t = 0, n = 0; n < r.length; ++n) t += r[n].length
        const i = o.allocUnsafe(t)
        let u = 0
        for (n = 0; n < r.length; ++n) {
          let f = r[n]
          if (T(f, Uint8Array))
            u + f.length > i.length
              ? (o.isBuffer(f) || (f = o.from(f)), f.copy(i, u))
              : Uint8Array.prototype.set.call(i, f, u)
          else if (o.isBuffer(f)) f.copy(i, u)
          else throw new TypeError('"list" argument must be an Array of Buffers')
          u += f.length
        }
        return i
      })
    function hr(e, r) {
      if (o.isBuffer(e)) return e.length
      if (ArrayBuffer.isView(e) || T(e, ArrayBuffer)) return e.byteLength
      if (typeof e != 'string')
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
            typeof e
        )
      const t = e.length,
        n = arguments.length > 2 && arguments[2] === !0
      if (!n && t === 0) return 0
      let i = !1
      for (;;)
        switch (r) {
          case 'ascii':
          case 'latin1':
          case 'binary':
            return t
          case 'utf8':
          case 'utf-8':
            return rr(e).length
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return t * 2
          case 'hex':
            return t >>> 1
          case 'base64':
            return Er(e).length
          default:
            if (i) return n ? -1 : rr(e).length
            ;(r = ('' + r).toLowerCase()), (i = !0)
        }
    }
    o.byteLength = hr
    function Gr(e, r, t) {
      let n = !1
      if (
        ((r === void 0 || r < 0) && (r = 0),
        r > this.length ||
          ((t === void 0 || t > this.length) && (t = this.length), t <= 0) ||
          ((t >>>= 0), (r >>>= 0), t <= r))
      )
        return ''
      for (e || (e = 'utf8'); ; )
        switch (e) {
          case 'hex':
            return vr(this, r, t)
          case 'utf8':
          case 'utf-8':
            return pr(this, r, t)
          case 'ascii':
            return Zr(this, r, t)
          case 'latin1':
          case 'binary':
            return Qr(this, r, t)
          case 'base64':
            return zr(this, r, t)
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return rt(this, r, t)
          default:
            if (n) throw new TypeError('Unknown encoding: ' + e)
            ;(e = (e + '').toLowerCase()), (n = !0)
        }
    }
    o.prototype._isBuffer = !0
    function N(e, r, t) {
      const n = e[r]
      ;(e[r] = e[t]), (e[t] = n)
    }
    ;(o.prototype.swap16 = function () {
      const r = this.length
      if (r % 2 !== 0) throw new RangeError('Buffer size must be a multiple of 16-bits')
      for (let t = 0; t < r; t += 2) N(this, t, t + 1)
      return this
    }),
      (o.prototype.swap32 = function () {
        const r = this.length
        if (r % 4 !== 0) throw new RangeError('Buffer size must be a multiple of 32-bits')
        for (let t = 0; t < r; t += 4) N(this, t, t + 3), N(this, t + 1, t + 2)
        return this
      }),
      (o.prototype.swap64 = function () {
        const r = this.length
        if (r % 8 !== 0) throw new RangeError('Buffer size must be a multiple of 64-bits')
        for (let t = 0; t < r; t += 8)
          N(this, t, t + 7),
            N(this, t + 1, t + 6),
            N(this, t + 2, t + 5),
            N(this, t + 3, t + 4)
        return this
      }),
      (o.prototype.toString = function () {
        const r = this.length
        return r === 0
          ? ''
          : arguments.length === 0
          ? pr(this, 0, r)
          : Gr.apply(this, arguments)
      }),
      (o.prototype.toLocaleString = o.prototype.toString),
      (o.prototype.equals = function (r) {
        if (!o.isBuffer(r)) throw new TypeError('Argument must be a Buffer')
        return this === r ? !0 : o.compare(this, r) === 0
      }),
      (o.prototype.inspect = function () {
        let r = ''
        const t = h.INSPECT_MAX_BYTES
        return (
          (r = this.toString('hex', 0, t)
            .replace(/(.{2})/g, '$1 ')
            .trim()),
          this.length > t && (r += ' ... '),
          '<Buffer ' + r + '>'
        )
      }),
      l && (o.prototype[l] = o.prototype.inspect),
      (o.prototype.compare = function (r, t, n, i, u) {
        if ((T(r, Uint8Array) && (r = o.from(r, r.offset, r.byteLength)), !o.isBuffer(r)))
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
              typeof r
          )
        if (
          (t === void 0 && (t = 0),
          n === void 0 && (n = r ? r.length : 0),
          i === void 0 && (i = 0),
          u === void 0 && (u = this.length),
          t < 0 || n > r.length || i < 0 || u > this.length)
        )
          throw new RangeError('out of range index')
        if (i >= u && t >= n) return 0
        if (i >= u) return -1
        if (t >= n) return 1
        if (((t >>>= 0), (n >>>= 0), (i >>>= 0), (u >>>= 0), this === r)) return 0
        let f = u - i,
          y = n - t
        const g = Math.min(f, y),
          B = this.slice(i, u),
          E = r.slice(t, n)
        for (let d = 0; d < g; ++d)
          if (B[d] !== E[d]) {
            ;(f = B[d]), (y = E[d])
            break
          }
        return f < y ? -1 : y < f ? 1 : 0
      })
    function cr(e, r, t, n, i) {
      if (e.length === 0) return -1
      if (
        (typeof t == 'string'
          ? ((n = t), (t = 0))
          : t > 2147483647
          ? (t = 2147483647)
          : t < -2147483648 && (t = -2147483648),
        (t = +t),
        tr(t) && (t = i ? 0 : e.length - 1),
        t < 0 && (t = e.length + t),
        t >= e.length)
      ) {
        if (i) return -1
        t = e.length - 1
      } else if (t < 0)
        if (i) t = 0
        else return -1
      if ((typeof r == 'string' && (r = o.from(r, n)), o.isBuffer(r)))
        return r.length === 0 ? -1 : sr(e, r, t, n, i)
      if (typeof r == 'number')
        return (
          (r = r & 255),
          typeof Uint8Array.prototype.indexOf == 'function'
            ? i
              ? Uint8Array.prototype.indexOf.call(e, r, t)
              : Uint8Array.prototype.lastIndexOf.call(e, r, t)
            : sr(e, [r], t, n, i)
        )
      throw new TypeError('val must be string, number or Buffer')
    }
    function sr(e, r, t, n, i) {
      let u = 1,
        f = e.length,
        y = r.length
      if (
        n !== void 0 &&
        ((n = String(n).toLowerCase()),
        n === 'ucs2' || n === 'ucs-2' || n === 'utf16le' || n === 'utf-16le')
      ) {
        if (e.length < 2 || r.length < 2) return -1
        ;(u = 2), (f /= 2), (y /= 2), (t /= 2)
      }
      function g(E, d) {
        return u === 1 ? E[d] : E.readUInt16BE(d * u)
      }
      let B
      if (i) {
        let E = -1
        for (B = t; B < f; B++)
          if (g(e, B) === g(r, E === -1 ? 0 : B - E)) {
            if ((E === -1 && (E = B), B - E + 1 === y)) return E * u
          } else E !== -1 && (B -= B - E), (E = -1)
      } else
        for (t + y > f && (t = f - y), B = t; B >= 0; B--) {
          let E = !0
          for (let d = 0; d < y; d++)
            if (g(e, B + d) !== g(r, d)) {
              E = !1
              break
            }
          if (E) return B
        }
      return -1
    }
    ;(o.prototype.includes = function (r, t, n) {
      return this.indexOf(r, t, n) !== -1
    }),
      (o.prototype.indexOf = function (r, t, n) {
        return cr(this, r, t, n, !0)
      }),
      (o.prototype.lastIndexOf = function (r, t, n) {
        return cr(this, r, t, n, !1)
      })
    function Hr(e, r, t, n) {
      t = Number(t) || 0
      const i = e.length - t
      n ? ((n = Number(n)), n > i && (n = i)) : (n = i)
      const u = r.length
      n > u / 2 && (n = u / 2)
      let f
      for (f = 0; f < n; ++f) {
        const y = parseInt(r.substr(f * 2, 2), 16)
        if (tr(y)) return f
        e[t + f] = y
      }
      return f
    }
    function Yr(e, r, t, n) {
      return J(rr(r, e.length - t), e, t, n)
    }
    function Vr(e, r, t, n) {
      return J(it(r), e, t, n)
    }
    function Xr(e, r, t, n) {
      return J(Er(r), e, t, n)
    }
    function Jr(e, r, t, n) {
      return J(ot(r, e.length - t), e, t, n)
    }
    ;(o.prototype.write = function (r, t, n, i) {
      if (t === void 0) (i = 'utf8'), (n = this.length), (t = 0)
      else if (n === void 0 && typeof t == 'string') (i = t), (n = this.length), (t = 0)
      else if (isFinite(t))
        (t = t >>> 0),
          isFinite(n)
            ? ((n = n >>> 0), i === void 0 && (i = 'utf8'))
            : ((i = n), (n = void 0))
      else
        throw new Error(
          'Buffer.write(string, encoding, offset[, length]) is no longer supported'
        )
      const u = this.length - t
      if (
        ((n === void 0 || n > u) && (n = u),
        (r.length > 0 && (n < 0 || t < 0)) || t > this.length)
      )
        throw new RangeError('Attempt to write outside buffer bounds')
      i || (i = 'utf8')
      let f = !1
      for (;;)
        switch (i) {
          case 'hex':
            return Hr(this, r, t, n)
          case 'utf8':
          case 'utf-8':
            return Yr(this, r, t, n)
          case 'ascii':
          case 'latin1':
          case 'binary':
            return Vr(this, r, t, n)
          case 'base64':
            return Xr(this, r, t, n)
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return Jr(this, r, t, n)
          default:
            if (f) throw new TypeError('Unknown encoding: ' + i)
            ;(i = ('' + i).toLowerCase()), (f = !0)
        }
    }),
      (o.prototype.toJSON = function () {
        return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) }
      })
    function zr(e, r, t) {
      return r === 0 && t === e.length
        ? c.fromByteArray(e)
        : c.fromByteArray(e.slice(r, t))
    }
    function pr(e, r, t) {
      t = Math.min(e.length, t)
      const n = []
      let i = r
      for (; i < t; ) {
        const u = e[i]
        let f = null,
          y = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1
        if (i + y <= t) {
          let g, B, E, d
          switch (y) {
            case 1:
              u < 128 && (f = u)
              break
            case 2:
              ;(g = e[i + 1]),
                (g & 192) === 128 &&
                  ((d = ((u & 31) << 6) | (g & 63)), d > 127 && (f = d))
              break
            case 3:
              ;(g = e[i + 1]),
                (B = e[i + 2]),
                (g & 192) === 128 &&
                  (B & 192) === 128 &&
                  ((d = ((u & 15) << 12) | ((g & 63) << 6) | (B & 63)),
                  d > 2047 && (d < 55296 || d > 57343) && (f = d))
              break
            case 4:
              ;(g = e[i + 1]),
                (B = e[i + 2]),
                (E = e[i + 3]),
                (g & 192) === 128 &&
                  (B & 192) === 128 &&
                  (E & 192) === 128 &&
                  ((d = ((u & 15) << 18) | ((g & 63) << 12) | ((B & 63) << 6) | (E & 63)),
                  d > 65535 && d < 1114112 && (f = d))
          }
        }
        f === null
          ? ((f = 65533), (y = 1))
          : f > 65535 &&
            ((f -= 65536), n.push(((f >>> 10) & 1023) | 55296), (f = 56320 | (f & 1023))),
          n.push(f),
          (i += y)
      }
      return Kr(n)
    }
    const lr = 4096
    function Kr(e) {
      const r = e.length
      if (r <= lr) return String.fromCharCode.apply(String, e)
      let t = '',
        n = 0
      for (; n < r; ) t += String.fromCharCode.apply(String, e.slice(n, (n += lr)))
      return t
    }
    function Zr(e, r, t) {
      let n = ''
      t = Math.min(e.length, t)
      for (let i = r; i < t; ++i) n += String.fromCharCode(e[i] & 127)
      return n
    }
    function Qr(e, r, t) {
      let n = ''
      t = Math.min(e.length, t)
      for (let i = r; i < t; ++i) n += String.fromCharCode(e[i])
      return n
    }
    function vr(e, r, t) {
      const n = e.length
      ;(!r || r < 0) && (r = 0), (!t || t < 0 || t > n) && (t = n)
      let i = ''
      for (let u = r; u < t; ++u) i += ut[e[u]]
      return i
    }
    function rt(e, r, t) {
      const n = e.slice(r, t)
      let i = ''
      for (let u = 0; u < n.length - 1; u += 2)
        i += String.fromCharCode(n[u] + n[u + 1] * 256)
      return i
    }
    o.prototype.slice = function (r, t) {
      const n = this.length
      ;(r = ~~r),
        (t = t === void 0 ? n : ~~t),
        r < 0 ? ((r += n), r < 0 && (r = 0)) : r > n && (r = n),
        t < 0 ? ((t += n), t < 0 && (t = 0)) : t > n && (t = n),
        t < r && (t = r)
      const i = this.subarray(r, t)
      return Object.setPrototypeOf(i, o.prototype), i
    }
    function F(e, r, t) {
      if (e % 1 !== 0 || e < 0) throw new RangeError('offset is not uint')
      if (e + r > t) throw new RangeError('Trying to access beyond buffer length')
    }
    ;(o.prototype.readUintLE = o.prototype.readUIntLE =
      function (r, t, n) {
        ;(r = r >>> 0), (t = t >>> 0), n || F(r, t, this.length)
        let i = this[r],
          u = 1,
          f = 0
        for (; ++f < t && (u *= 256); ) i += this[r + f] * u
        return i
      }),
      (o.prototype.readUintBE = o.prototype.readUIntBE =
        function (r, t, n) {
          ;(r = r >>> 0), (t = t >>> 0), n || F(r, t, this.length)
          let i = this[r + --t],
            u = 1
          for (; t > 0 && (u *= 256); ) i += this[r + --t] * u
          return i
        }),
      (o.prototype.readUint8 = o.prototype.readUInt8 =
        function (r, t) {
          return (r = r >>> 0), t || F(r, 1, this.length), this[r]
        }),
      (o.prototype.readUint16LE = o.prototype.readUInt16LE =
        function (r, t) {
          return (r = r >>> 0), t || F(r, 2, this.length), this[r] | (this[r + 1] << 8)
        }),
      (o.prototype.readUint16BE = o.prototype.readUInt16BE =
        function (r, t) {
          return (r = r >>> 0), t || F(r, 2, this.length), (this[r] << 8) | this[r + 1]
        }),
      (o.prototype.readUint32LE = o.prototype.readUInt32LE =
        function (r, t) {
          return (
            (r = r >>> 0),
            t || F(r, 4, this.length),
            (this[r] | (this[r + 1] << 8) | (this[r + 2] << 16)) + this[r + 3] * 16777216
          )
        }),
      (o.prototype.readUint32BE = o.prototype.readUInt32BE =
        function (r, t) {
          return (
            (r = r >>> 0),
            t || F(r, 4, this.length),
            this[r] * 16777216 + ((this[r + 1] << 16) | (this[r + 2] << 8) | this[r + 3])
          )
        }),
      (o.prototype.readBigUInt64LE = L(function (r) {
        ;(r = r >>> 0), O(r, 'offset')
        const t = this[r],
          n = this[r + 7]
        ;(t === void 0 || n === void 0) && G(r, this.length - 8)
        const i = t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24,
          u = this[++r] + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + n * 2 ** 24
        return BigInt(i) + (BigInt(u) << BigInt(32))
      })),
      (o.prototype.readBigUInt64BE = L(function (r) {
        ;(r = r >>> 0), O(r, 'offset')
        const t = this[r],
          n = this[r + 7]
        ;(t === void 0 || n === void 0) && G(r, this.length - 8)
        const i = t * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r],
          u = this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + n
        return (BigInt(i) << BigInt(32)) + BigInt(u)
      })),
      (o.prototype.readIntLE = function (r, t, n) {
        ;(r = r >>> 0), (t = t >>> 0), n || F(r, t, this.length)
        let i = this[r],
          u = 1,
          f = 0
        for (; ++f < t && (u *= 256); ) i += this[r + f] * u
        return (u *= 128), i >= u && (i -= Math.pow(2, 8 * t)), i
      }),
      (o.prototype.readIntBE = function (r, t, n) {
        ;(r = r >>> 0), (t = t >>> 0), n || F(r, t, this.length)
        let i = t,
          u = 1,
          f = this[r + --i]
        for (; i > 0 && (u *= 256); ) f += this[r + --i] * u
        return (u *= 128), f >= u && (f -= Math.pow(2, 8 * t)), f
      }),
      (o.prototype.readInt8 = function (r, t) {
        return (
          (r = r >>> 0),
          t || F(r, 1, this.length),
          this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r]
        )
      }),
      (o.prototype.readInt16LE = function (r, t) {
        ;(r = r >>> 0), t || F(r, 2, this.length)
        const n = this[r] | (this[r + 1] << 8)
        return n & 32768 ? n | 4294901760 : n
      }),
      (o.prototype.readInt16BE = function (r, t) {
        ;(r = r >>> 0), t || F(r, 2, this.length)
        const n = this[r + 1] | (this[r] << 8)
        return n & 32768 ? n | 4294901760 : n
      }),
      (o.prototype.readInt32LE = function (r, t) {
        return (
          (r = r >>> 0),
          t || F(r, 4, this.length),
          this[r] | (this[r + 1] << 8) | (this[r + 2] << 16) | (this[r + 3] << 24)
        )
      }),
      (o.prototype.readInt32BE = function (r, t) {
        return (
          (r = r >>> 0),
          t || F(r, 4, this.length),
          (this[r] << 24) | (this[r + 1] << 16) | (this[r + 2] << 8) | this[r + 3]
        )
      }),
      (o.prototype.readBigInt64LE = L(function (r) {
        ;(r = r >>> 0), O(r, 'offset')
        const t = this[r],
          n = this[r + 7]
        ;(t === void 0 || n === void 0) && G(r, this.length - 8)
        const i = this[r + 4] + this[r + 5] * 2 ** 8 + this[r + 6] * 2 ** 16 + (n << 24)
        return (
          (BigInt(i) << BigInt(32)) +
          BigInt(t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24)
        )
      })),
      (o.prototype.readBigInt64BE = L(function (r) {
        ;(r = r >>> 0), O(r, 'offset')
        const t = this[r],
          n = this[r + 7]
        ;(t === void 0 || n === void 0) && G(r, this.length - 8)
        const i = (t << 24) + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r]
        return (
          (BigInt(i) << BigInt(32)) +
          BigInt(this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + n)
        )
      })),
      (o.prototype.readFloatLE = function (r, t) {
        return (r = r >>> 0), t || F(r, 4, this.length), s.read(this, r, !0, 23, 4)
      }),
      (o.prototype.readFloatBE = function (r, t) {
        return (r = r >>> 0), t || F(r, 4, this.length), s.read(this, r, !1, 23, 4)
      }),
      (o.prototype.readDoubleLE = function (r, t) {
        return (r = r >>> 0), t || F(r, 8, this.length), s.read(this, r, !0, 52, 8)
      }),
      (o.prototype.readDoubleBE = function (r, t) {
        return (r = r >>> 0), t || F(r, 8, this.length), s.read(this, r, !1, 52, 8)
      })
    function _(e, r, t, n, i, u) {
      if (!o.isBuffer(e))
        throw new TypeError('"buffer" argument must be a Buffer instance')
      if (r > i || r < u) throw new RangeError('"value" argument is out of bounds')
      if (t + n > e.length) throw new RangeError('Index out of range')
    }
    ;(o.prototype.writeUintLE = o.prototype.writeUIntLE =
      function (r, t, n, i) {
        if (((r = +r), (t = t >>> 0), (n = n >>> 0), !i)) {
          const y = Math.pow(2, 8 * n) - 1
          _(this, r, t, n, y, 0)
        }
        let u = 1,
          f = 0
        for (this[t] = r & 255; ++f < n && (u *= 256); ) this[t + f] = (r / u) & 255
        return t + n
      }),
      (o.prototype.writeUintBE = o.prototype.writeUIntBE =
        function (r, t, n, i) {
          if (((r = +r), (t = t >>> 0), (n = n >>> 0), !i)) {
            const y = Math.pow(2, 8 * n) - 1
            _(this, r, t, n, y, 0)
          }
          let u = n - 1,
            f = 1
          for (this[t + u] = r & 255; --u >= 0 && (f *= 256); )
            this[t + u] = (r / f) & 255
          return t + n
        }),
      (o.prototype.writeUint8 = o.prototype.writeUInt8 =
        function (r, t, n) {
          return (
            (r = +r),
            (t = t >>> 0),
            n || _(this, r, t, 1, 255, 0),
            (this[t] = r & 255),
            t + 1
          )
        }),
      (o.prototype.writeUint16LE = o.prototype.writeUInt16LE =
        function (r, t, n) {
          return (
            (r = +r),
            (t = t >>> 0),
            n || _(this, r, t, 2, 65535, 0),
            (this[t] = r & 255),
            (this[t + 1] = r >>> 8),
            t + 2
          )
        }),
      (o.prototype.writeUint16BE = o.prototype.writeUInt16BE =
        function (r, t, n) {
          return (
            (r = +r),
            (t = t >>> 0),
            n || _(this, r, t, 2, 65535, 0),
            (this[t] = r >>> 8),
            (this[t + 1] = r & 255),
            t + 2
          )
        }),
      (o.prototype.writeUint32LE = o.prototype.writeUInt32LE =
        function (r, t, n) {
          return (
            (r = +r),
            (t = t >>> 0),
            n || _(this, r, t, 4, 4294967295, 0),
            (this[t + 3] = r >>> 24),
            (this[t + 2] = r >>> 16),
            (this[t + 1] = r >>> 8),
            (this[t] = r & 255),
            t + 4
          )
        }),
      (o.prototype.writeUint32BE = o.prototype.writeUInt32BE =
        function (r, t, n) {
          return (
            (r = +r),
            (t = t >>> 0),
            n || _(this, r, t, 4, 4294967295, 0),
            (this[t] = r >>> 24),
            (this[t + 1] = r >>> 16),
            (this[t + 2] = r >>> 8),
            (this[t + 3] = r & 255),
            t + 4
          )
        })
    function ar(e, r, t, n, i) {
      gr(r, n, i, e, t, 7)
      let u = Number(r & BigInt(4294967295))
      ;(e[t++] = u),
        (u = u >> 8),
        (e[t++] = u),
        (u = u >> 8),
        (e[t++] = u),
        (u = u >> 8),
        (e[t++] = u)
      let f = Number((r >> BigInt(32)) & BigInt(4294967295))
      return (
        (e[t++] = f),
        (f = f >> 8),
        (e[t++] = f),
        (f = f >> 8),
        (e[t++] = f),
        (f = f >> 8),
        (e[t++] = f),
        t
      )
    }
    function yr(e, r, t, n, i) {
      gr(r, n, i, e, t, 7)
      let u = Number(r & BigInt(4294967295))
      ;(e[t + 7] = u),
        (u = u >> 8),
        (e[t + 6] = u),
        (u = u >> 8),
        (e[t + 5] = u),
        (u = u >> 8),
        (e[t + 4] = u)
      let f = Number((r >> BigInt(32)) & BigInt(4294967295))
      return (
        (e[t + 3] = f),
        (f = f >> 8),
        (e[t + 2] = f),
        (f = f >> 8),
        (e[t + 1] = f),
        (f = f >> 8),
        (e[t] = f),
        t + 8
      )
    }
    ;(o.prototype.writeBigUInt64LE = L(function (r, t = 0) {
      return ar(this, r, t, BigInt(0), BigInt('0xffffffffffffffff'))
    })),
      (o.prototype.writeBigUInt64BE = L(function (r, t = 0) {
        return yr(this, r, t, BigInt(0), BigInt('0xffffffffffffffff'))
      })),
      (o.prototype.writeIntLE = function (r, t, n, i) {
        if (((r = +r), (t = t >>> 0), !i)) {
          const g = Math.pow(2, 8 * n - 1)
          _(this, r, t, n, g - 1, -g)
        }
        let u = 0,
          f = 1,
          y = 0
        for (this[t] = r & 255; ++u < n && (f *= 256); )
          r < 0 && y === 0 && this[t + u - 1] !== 0 && (y = 1),
            (this[t + u] = (((r / f) >> 0) - y) & 255)
        return t + n
      }),
      (o.prototype.writeIntBE = function (r, t, n, i) {
        if (((r = +r), (t = t >>> 0), !i)) {
          const g = Math.pow(2, 8 * n - 1)
          _(this, r, t, n, g - 1, -g)
        }
        let u = n - 1,
          f = 1,
          y = 0
        for (this[t + u] = r & 255; --u >= 0 && (f *= 256); )
          r < 0 && y === 0 && this[t + u + 1] !== 0 && (y = 1),
            (this[t + u] = (((r / f) >> 0) - y) & 255)
        return t + n
      }),
      (o.prototype.writeInt8 = function (r, t, n) {
        return (
          (r = +r),
          (t = t >>> 0),
          n || _(this, r, t, 1, 127, -128),
          r < 0 && (r = 255 + r + 1),
          (this[t] = r & 255),
          t + 1
        )
      }),
      (o.prototype.writeInt16LE = function (r, t, n) {
        return (
          (r = +r),
          (t = t >>> 0),
          n || _(this, r, t, 2, 32767, -32768),
          (this[t] = r & 255),
          (this[t + 1] = r >>> 8),
          t + 2
        )
      }),
      (o.prototype.writeInt16BE = function (r, t, n) {
        return (
          (r = +r),
          (t = t >>> 0),
          n || _(this, r, t, 2, 32767, -32768),
          (this[t] = r >>> 8),
          (this[t + 1] = r & 255),
          t + 2
        )
      }),
      (o.prototype.writeInt32LE = function (r, t, n) {
        return (
          (r = +r),
          (t = t >>> 0),
          n || _(this, r, t, 4, 2147483647, -2147483648),
          (this[t] = r & 255),
          (this[t + 1] = r >>> 8),
          (this[t + 2] = r >>> 16),
          (this[t + 3] = r >>> 24),
          t + 4
        )
      }),
      (o.prototype.writeInt32BE = function (r, t, n) {
        return (
          (r = +r),
          (t = t >>> 0),
          n || _(this, r, t, 4, 2147483647, -2147483648),
          r < 0 && (r = 4294967295 + r + 1),
          (this[t] = r >>> 24),
          (this[t + 1] = r >>> 16),
          (this[t + 2] = r >>> 8),
          (this[t + 3] = r & 255),
          t + 4
        )
      }),
      (o.prototype.writeBigInt64LE = L(function (r, t = 0) {
        return ar(this, r, t, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
      })),
      (o.prototype.writeBigInt64BE = L(function (r, t = 0) {
        return yr(this, r, t, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
      }))
    function wr(e, r, t, n, i, u) {
      if (t + n > e.length) throw new RangeError('Index out of range')
      if (t < 0) throw new RangeError('Index out of range')
    }
    function xr(e, r, t, n, i) {
      return (
        (r = +r), (t = t >>> 0), i || wr(e, r, t, 4), s.write(e, r, t, n, 23, 4), t + 4
      )
    }
    ;(o.prototype.writeFloatLE = function (r, t, n) {
      return xr(this, r, t, !0, n)
    }),
      (o.prototype.writeFloatBE = function (r, t, n) {
        return xr(this, r, t, !1, n)
      })
    function dr(e, r, t, n, i) {
      return (
        (r = +r), (t = t >>> 0), i || wr(e, r, t, 8), s.write(e, r, t, n, 52, 8), t + 8
      )
    }
    ;(o.prototype.writeDoubleLE = function (r, t, n) {
      return dr(this, r, t, !0, n)
    }),
      (o.prototype.writeDoubleBE = function (r, t, n) {
        return dr(this, r, t, !1, n)
      }),
      (o.prototype.copy = function (r, t, n, i) {
        if (!o.isBuffer(r)) throw new TypeError('argument should be a Buffer')
        if (
          (n || (n = 0),
          !i && i !== 0 && (i = this.length),
          t >= r.length && (t = r.length),
          t || (t = 0),
          i > 0 && i < n && (i = n),
          i === n || r.length === 0 || this.length === 0)
        )
          return 0
        if (t < 0) throw new RangeError('targetStart out of bounds')
        if (n < 0 || n >= this.length) throw new RangeError('Index out of range')
        if (i < 0) throw new RangeError('sourceEnd out of bounds')
        i > this.length && (i = this.length),
          r.length - t < i - n && (i = r.length - t + n)
        const u = i - n
        return (
          this === r && typeof Uint8Array.prototype.copyWithin == 'function'
            ? this.copyWithin(t, n, i)
            : Uint8Array.prototype.set.call(r, this.subarray(n, i), t),
          u
        )
      }),
      (o.prototype.fill = function (r, t, n, i) {
        if (typeof r == 'string') {
          if (
            (typeof t == 'string'
              ? ((i = t), (t = 0), (n = this.length))
              : typeof n == 'string' && ((i = n), (n = this.length)),
            i !== void 0 && typeof i != 'string')
          )
            throw new TypeError('encoding must be a string')
          if (typeof i == 'string' && !o.isEncoding(i))
            throw new TypeError('Unknown encoding: ' + i)
          if (r.length === 1) {
            const f = r.charCodeAt(0)
            ;((i === 'utf8' && f < 128) || i === 'latin1') && (r = f)
          }
        } else
          typeof r == 'number' ? (r = r & 255) : typeof r == 'boolean' && (r = Number(r))
        if (t < 0 || this.length < t || this.length < n)
          throw new RangeError('Out of range index')
        if (n <= t) return this
        ;(t = t >>> 0), (n = n === void 0 ? this.length : n >>> 0), r || (r = 0)
        let u
        if (typeof r == 'number') for (u = t; u < n; ++u) this[u] = r
        else {
          const f = o.isBuffer(r) ? r : o.from(r, i),
            y = f.length
          if (y === 0)
            throw new TypeError('The value "' + r + '" is invalid for argument "value"')
          for (u = 0; u < n - t; ++u) this[u + t] = f[u % y]
        }
        return this
      })
    const P = {}
    function v(e, r, t) {
      P[e] = class extends t {
        constructor() {
          super(),
            Object.defineProperty(this, 'message', {
              value: r.apply(this, arguments),
              writable: !0,
              configurable: !0,
            }),
            (this.name = `${this.name} [${e}]`),
            this.stack,
            delete this.name
        }
        get code() {
          return e
        }
        set code(i) {
          Object.defineProperty(this, 'code', {
            configurable: !0,
            enumerable: !0,
            value: i,
            writable: !0,
          })
        }
        toString() {
          return `${this.name} [${e}]: ${this.message}`
        }
      }
    }
    v(
      'ERR_BUFFER_OUT_OF_BOUNDS',
      function (e) {
        return e
          ? `${e} is outside of buffer bounds`
          : 'Attempt to access memory outside buffer bounds'
      },
      RangeError
    ),
      v(
        'ERR_INVALID_ARG_TYPE',
        function (e, r) {
          return `The "${e}" argument must be of type number. Received type ${typeof r}`
        },
        TypeError
      ),
      v(
        'ERR_OUT_OF_RANGE',
        function (e, r, t) {
          let n = `The value of "${e}" is out of range.`,
            i = t
          return (
            Number.isInteger(t) && Math.abs(t) > 2 ** 32
              ? (i = Br(String(t)))
              : typeof t == 'bigint' &&
                ((i = String(t)),
                (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) &&
                  (i = Br(i)),
                (i += 'n')),
            (n += ` It must be ${r}. Received ${i}`),
            n
          )
        },
        RangeError
      )
    function Br(e) {
      let r = '',
        t = e.length
      const n = e[0] === '-' ? 1 : 0
      for (; t >= n + 4; t -= 3) r = `_${e.slice(t - 3, t)}${r}`
      return `${e.slice(0, t)}${r}`
    }
    function tt(e, r, t) {
      O(r, 'offset'), (e[r] === void 0 || e[r + t] === void 0) && G(r, e.length - (t + 1))
    }
    function gr(e, r, t, n, i, u) {
      if (e > t || e < r) {
        const f = typeof r == 'bigint' ? 'n' : ''
        let y
        throw (
          (u > 3
            ? r === 0 || r === BigInt(0)
              ? (y = `>= 0${f} and < 2${f} ** ${(u + 1) * 8}${f}`)
              : (y = `>= -(2${f} ** ${(u + 1) * 8 - 1}${f}) and < 2 ** ${
                  (u + 1) * 8 - 1
                }${f}`)
            : (y = `>= ${r}${f} and <= ${t}${f}`),
          new P.ERR_OUT_OF_RANGE('value', y, e))
        )
      }
      tt(n, i, u)
    }
    function O(e, r) {
      if (typeof e != 'number') throw new P.ERR_INVALID_ARG_TYPE(r, 'number', e)
    }
    function G(e, r, t) {
      throw Math.floor(e) !== e
        ? (O(e, t), new P.ERR_OUT_OF_RANGE(t || 'offset', 'an integer', e))
        : r < 0
        ? new P.ERR_BUFFER_OUT_OF_BOUNDS()
        : new P.ERR_OUT_OF_RANGE(t || 'offset', `>= ${t ? 1 : 0} and <= ${r}`, e)
    }
    const et = /[^+/0-9A-Za-z-_]/g
    function nt(e) {
      if (((e = e.split('=')[0]), (e = e.trim().replace(et, '')), e.length < 2)) return ''
      for (; e.length % 4 !== 0; ) e = e + '='
      return e
    }
    function rr(e, r) {
      r = r || 1 / 0
      let t
      const n = e.length
      let i = null
      const u = []
      for (let f = 0; f < n; ++f) {
        if (((t = e.charCodeAt(f)), t > 55295 && t < 57344)) {
          if (!i) {
            if (t > 56319) {
              ;(r -= 3) > -1 && u.push(239, 191, 189)
              continue
            } else if (f + 1 === n) {
              ;(r -= 3) > -1 && u.push(239, 191, 189)
              continue
            }
            i = t
            continue
          }
          if (t < 56320) {
            ;(r -= 3) > -1 && u.push(239, 191, 189), (i = t)
            continue
          }
          t = (((i - 55296) << 10) | (t - 56320)) + 65536
        } else i && (r -= 3) > -1 && u.push(239, 191, 189)
        if (((i = null), t < 128)) {
          if ((r -= 1) < 0) break
          u.push(t)
        } else if (t < 2048) {
          if ((r -= 2) < 0) break
          u.push((t >> 6) | 192, (t & 63) | 128)
        } else if (t < 65536) {
          if ((r -= 3) < 0) break
          u.push((t >> 12) | 224, ((t >> 6) & 63) | 128, (t & 63) | 128)
        } else if (t < 1114112) {
          if ((r -= 4) < 0) break
          u.push(
            (t >> 18) | 240,
            ((t >> 12) & 63) | 128,
            ((t >> 6) & 63) | 128,
            (t & 63) | 128
          )
        } else throw new Error('Invalid code point')
      }
      return u
    }
    function it(e) {
      const r = []
      for (let t = 0; t < e.length; ++t) r.push(e.charCodeAt(t) & 255)
      return r
    }
    function ot(e, r) {
      let t, n, i
      const u = []
      for (let f = 0; f < e.length && !((r -= 2) < 0); ++f)
        (t = e.charCodeAt(f)), (n = t >> 8), (i = t % 256), u.push(i), u.push(n)
      return u
    }
    function Er(e) {
      return c.toByteArray(nt(e))
    }
    function J(e, r, t, n) {
      let i
      for (i = 0; i < n && !(i + t >= r.length || i >= e.length); ++i) r[i + t] = e[i]
      return i
    }
    function T(e, r) {
      return (
        e instanceof r ||
        (e != null &&
          e.constructor != null &&
          e.constructor.name != null &&
          e.constructor.name === r.name)
      )
    }
    function tr(e) {
      return e !== e
    }
    const ut = (function () {
      const e = '0123456789abcdef',
        r = new Array(256)
      for (let t = 0; t < 16; ++t) {
        const n = t * 16
        for (let i = 0; i < 16; ++i) r[n + i] = e[t] + e[i]
      }
      return r
    })()
    function L(e) {
      return typeof BigInt > 'u' ? ft : e
    }
    function ft() {
      throw new Error('BigInt not supported')
    }
  })(or)
  async function fr(h, c) {
    let s = h,
      l = null
    if (typeof s == 'string') {
      try {
        s = new URL(s)
      } catch {
        throw new Error('Invalid URL')
      }
      l = await (await fetch(s, { mode: 'cors', ...(c || {}) })).arrayBuffer()
    } else if (s instanceof or.File || s instanceof Blob) l = await s.arrayBuffer()
    else if (Buffer.isBuffer(s))
      l = s.buffer.slice(s.byteOffset, s.byteOffset + s.byteLength)
    else if (s instanceof ArrayBuffer) l = s
    else throw new Error('Unsupported input type')
    return l
  }
  async function Pr() {
    const { default: h, Headers: c, Request: s, Response: l } = await import('node-fetch')
    ;(global.fetch = h), (global.Headers = c), (global.Request = s), (global.Response = l)
  }
  async function Or({ data: h, hashBits: c = 8, precise: s = !0, fetchOptions: l }) {
    try {
      typeof fetch > 'u' && (await Pr())
      const w = await fr(h, l)
      return (void 0)(new Uint8Array(w), c, s)
    } catch (w) {
      throw w
    }
  }
  const Wr = { hashImg: Or, getBuffer: fr }
  ;(k.default = Wr),
    Object.defineProperties(k, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: 'Module' },
    })
})
