var md = Object.defineProperty;
var Sc = (e) => {
  throw TypeError(e);
};
var Od = (e, f, t) => f in e ? md(e, f, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[f] = t;
var ge = (e, f, t) => Od(e, typeof f != "symbol" ? f + "" : f, t), Kn = (e, f, t) => f.has(e) || Sc("Cannot " + t);
var T = (e, f, t) => (Kn(e, f, "read from private field"), t ? t.call(e) : f.get(e)), Oe = (e, f, t) => f.has(e) ? Sc("Cannot add the same private member more than once") : f instanceof WeakSet ? f.add(e) : f.set(e, t), Ne = (e, f, t, u) => (Kn(e, f, "write to private field"), u ? u.call(e, t) : f.set(e, t), t), De = (e, f, t) => (Kn(e, f, "access private method"), t);
var ar = (e, f, t, u) => ({
  set _(r) {
    Ne(e, f, r, t);
  },
  get _() {
    return T(e, f, u);
  }
});
import xt, { app as yn, ipcMain as Dn, BrowserWindow as Jt } from "electron";
import fr, { fileURLToPath as wd } from "url";
import ze from "fs";
import xe from "path";
import Nt from "os";
import ot from "crypto";
import St from "events";
import Pd from "net";
import Dd from "buffer";
import Ph from "string_decoder";
import Fn from "zlib";
import Dh from "tls";
import Bt from "stream";
import Uh from "tty";
import Mn from "util";
import Ud from "constants";
import Lh from "assert";
import zr from "child_process";
import bh from "http";
import Ld from "https";
var dt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function qo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var It = { exports: {} };
const bd = "16.4.7", yd = {
  version: bd
};
var Rc;
function vd() {
  if (Rc) return It.exports;
  Rc = 1;
  const e = ze, f = xe, t = Nt, u = ot, s = yd.version, a = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
  function o(R) {
    const O = {};
    let D = R.toString();
    D = D.replace(/\r\n?/mg, `
`);
    let m;
    for (; (m = a.exec(D)) != null; ) {
      const B = m[1];
      let v = m[2] || "";
      v = v.trim();
      const M = v[0];
      v = v.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), M === '"' && (v = v.replace(/\\n/g, `
`), v = v.replace(/\\r/g, "\r")), O[B] = v;
    }
    return O;
  }
  function n(R) {
    const O = p(R), D = L.configDotenv({ path: O });
    if (!D.parsed) {
      const M = new Error(`MISSING_DATA: Cannot parse ${O} for an unknown reason`);
      throw M.code = "MISSING_DATA", M;
    }
    const m = _(R).split(","), B = m.length;
    let v;
    for (let M = 0; M < B; M++)
      try {
        const F = m[M].trim(), I = d(D, F);
        v = L.decrypt(I.ciphertext, I.key);
        break;
      } catch (F) {
        if (M + 1 >= B)
          throw F;
      }
    return L.parse(v);
  }
  function c(R) {
    console.log(`[dotenv@${s}][INFO] ${R}`);
  }
  function i(R) {
    console.log(`[dotenv@${s}][WARN] ${R}`);
  }
  function l(R) {
    console.log(`[dotenv@${s}][DEBUG] ${R}`);
  }
  function _(R) {
    return R && R.DOTENV_KEY && R.DOTENV_KEY.length > 0 ? R.DOTENV_KEY : process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0 ? process.env.DOTENV_KEY : "";
  }
  function d(R, O) {
    let D;
    try {
      D = new URL(O);
    } catch (F) {
      if (F.code === "ERR_INVALID_URL") {
        const I = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
        throw I.code = "INVALID_DOTENV_KEY", I;
      }
      throw F;
    }
    const m = D.password;
    if (!m) {
      const F = new Error("INVALID_DOTENV_KEY: Missing key part");
      throw F.code = "INVALID_DOTENV_KEY", F;
    }
    const B = D.searchParams.get("environment");
    if (!B) {
      const F = new Error("INVALID_DOTENV_KEY: Missing environment part");
      throw F.code = "INVALID_DOTENV_KEY", F;
    }
    const v = `DOTENV_VAULT_${B.toUpperCase()}`, M = R.parsed[v];
    if (!M) {
      const F = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${v} in your .env.vault file.`);
      throw F.code = "NOT_FOUND_DOTENV_ENVIRONMENT", F;
    }
    return { ciphertext: M, key: m };
  }
  function p(R) {
    let O = null;
    if (R && R.path && R.path.length > 0)
      if (Array.isArray(R.path))
        for (const D of R.path)
          e.existsSync(D) && (O = D.endsWith(".vault") ? D : `${D}.vault`);
      else
        O = R.path.endsWith(".vault") ? R.path : `${R.path}.vault`;
    else
      O = f.resolve(process.cwd(), ".env.vault");
    return e.existsSync(O) ? O : null;
  }
  function E(R) {
    return R[0] === "~" ? f.join(t.homedir(), R.slice(1)) : R;
  }
  function h(R) {
    c("Loading env from encrypted .env.vault");
    const O = L._parseVault(R);
    let D = process.env;
    return R && R.processEnv != null && (D = R.processEnv), L.populate(D, O, R), { parsed: O };
  }
  function N(R) {
    const O = f.resolve(process.cwd(), ".env");
    let D = "utf8";
    const m = !!(R && R.debug);
    R && R.encoding ? D = R.encoding : m && l("No encoding is specified. UTF-8 is used by default");
    let B = [O];
    if (R && R.path)
      if (!Array.isArray(R.path))
        B = [E(R.path)];
      else {
        B = [];
        for (const I of R.path)
          B.push(E(I));
      }
    let v;
    const M = {};
    for (const I of B)
      try {
        const w = L.parse(e.readFileSync(I, { encoding: D }));
        L.populate(M, w, R);
      } catch (w) {
        m && l(`Failed to load ${I} ${w.message}`), v = w;
      }
    let F = process.env;
    return R && R.processEnv != null && (F = R.processEnv), L.populate(F, M, R), v ? { parsed: M, error: v } : { parsed: M };
  }
  function A(R) {
    if (_(R).length === 0)
      return L.configDotenv(R);
    const O = p(R);
    return O ? L._configVault(R) : (i(`You set DOTENV_KEY but you are missing a .env.vault file at ${O}. Did you forget to build it?`), L.configDotenv(R));
  }
  function C(R, O) {
    const D = Buffer.from(O.slice(-64), "hex");
    let m = Buffer.from(R, "base64");
    const B = m.subarray(0, 12), v = m.subarray(-16);
    m = m.subarray(12, -16);
    try {
      const M = u.createDecipheriv("aes-256-gcm", D, B);
      return M.setAuthTag(v), `${M.update(m)}${M.final()}`;
    } catch (M) {
      const F = M instanceof RangeError, I = M.message === "Invalid key length", w = M.message === "Unsupported state or unable to authenticate data";
      if (F || I) {
        const x = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
        throw x.code = "INVALID_DOTENV_KEY", x;
      } else if (w) {
        const x = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
        throw x.code = "DECRYPTION_FAILED", x;
      } else
        throw M;
    }
  }
  function g(R, O, D = {}) {
    const m = !!(D && D.debug), B = !!(D && D.override);
    if (typeof O != "object") {
      const v = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
      throw v.code = "OBJECT_REQUIRED", v;
    }
    for (const v of Object.keys(O))
      Object.prototype.hasOwnProperty.call(R, v) ? (B === !0 && (R[v] = O[v]), m && l(B === !0 ? `"${v}" is already defined and WAS overwritten` : `"${v}" is already defined and was NOT overwritten`)) : R[v] = O[v];
  }
  const L = {
    configDotenv: N,
    _configVault: h,
    _parseVault: n,
    config: A,
    decrypt: C,
    parse: o,
    populate: g
  };
  return It.exports.configDotenv = L.configDotenv, It.exports._configVault = L._configVault, It.exports._parseVault = L._parseVault, It.exports.config = L.config, It.exports.decrypt = L.decrypt, It.exports.parse = L.parse, It.exports.populate = L.populate, It.exports = L, It.exports;
}
var Fd = vd(), gt = {}, zn = {};
const Md = "3.4.0", xd = { node: ">= 14" }, xn = {
  version: Md,
  engines: xd
};
var Cc;
function Bd() {
  if (Cc) return zn;
  Cc = 1;
  const e = function(r, s) {
    const a = r.split("."), o = s.split("."), n = Number(a[0]), c = Number(o[0]);
    if (n > c) return !0;
    if (n < c) return !1;
    if (o.length === 1) return !0;
    const i = Number(a[1]), l = Number(o[1]);
    return i >= l;
  };
  zn.hasMinVersion = e;
  const t = xn.engines.node.replace(">=", "").trim(), u = process.version.replace("v", "");
  return e(u, t) || (console.error(`please upgrade node: mariadb requires at least version ${t}`), process.exit(1)), zn;
}
var Xn, Tc;
function yh() {
  if (Tc) return Xn;
  Tc = 1;
  function e(f, u) {
    var u = u || {};
    this._capacity = u.capacity, this._head = 0, this._tail = 0, Array.isArray(f) ? this._fromArray(f) : (this._capacityMask = 3, this._list = new Array(4));
  }
  return e.prototype.peekAt = function(t) {
    var u = t;
    if (u === (u | 0)) {
      var r = this.size();
      if (!(u >= r || u < -r))
        return u < 0 && (u += r), u = this._head + u & this._capacityMask, this._list[u];
    }
  }, e.prototype.get = function(t) {
    return this.peekAt(t);
  }, e.prototype.peek = function() {
    if (this._head !== this._tail)
      return this._list[this._head];
  }, e.prototype.peekFront = function() {
    return this.peek();
  }, e.prototype.peekBack = function() {
    return this.peekAt(-1);
  }, Object.defineProperty(e.prototype, "length", {
    get: function() {
      return this.size();
    }
  }), e.prototype.size = function() {
    return this._head === this._tail ? 0 : this._head < this._tail ? this._tail - this._head : this._capacityMask + 1 - (this._head - this._tail);
  }, e.prototype.unshift = function(t) {
    if (arguments.length === 0) return this.size();
    var u = this._list.length;
    return this._head = this._head - 1 + u & this._capacityMask, this._list[this._head] = t, this._tail === this._head && this._growArray(), this._capacity && this.size() > this._capacity && this.pop(), this._head < this._tail ? this._tail - this._head : this._capacityMask + 1 - (this._head - this._tail);
  }, e.prototype.shift = function() {
    var t = this._head;
    if (t !== this._tail) {
      var u = this._list[t];
      return this._list[t] = void 0, this._head = t + 1 & this._capacityMask, t < 2 && this._tail > 1e4 && this._tail <= this._list.length >>> 2 && this._shrinkArray(), u;
    }
  }, e.prototype.push = function(t) {
    if (arguments.length === 0) return this.size();
    var u = this._tail;
    return this._list[u] = t, this._tail = u + 1 & this._capacityMask, this._tail === this._head && this._growArray(), this._capacity && this.size() > this._capacity && this.shift(), this._head < this._tail ? this._tail - this._head : this._capacityMask + 1 - (this._head - this._tail);
  }, e.prototype.pop = function() {
    var t = this._tail;
    if (t !== this._head) {
      var u = this._list.length;
      this._tail = t - 1 + u & this._capacityMask;
      var r = this._list[this._tail];
      return this._list[this._tail] = void 0, this._head < 2 && t > 1e4 && t <= u >>> 2 && this._shrinkArray(), r;
    }
  }, e.prototype.removeOne = function(t) {
    var u = t;
    if (u === (u | 0) && this._head !== this._tail) {
      var r = this.size(), s = this._list.length;
      if (!(u >= r || u < -r)) {
        u < 0 && (u += r), u = this._head + u & this._capacityMask;
        var a = this._list[u], o;
        if (t < r / 2) {
          for (o = t; o > 0; o--)
            this._list[u] = this._list[u = u - 1 + s & this._capacityMask];
          this._list[u] = void 0, this._head = this._head + 1 + s & this._capacityMask;
        } else {
          for (o = r - 1 - t; o > 0; o--)
            this._list[u] = this._list[u = u + 1 + s & this._capacityMask];
          this._list[u] = void 0, this._tail = this._tail - 1 + s & this._capacityMask;
        }
        return a;
      }
    }
  }, e.prototype.remove = function(t, u) {
    var r = t, s, a = u;
    if (r === (r | 0) && this._head !== this._tail) {
      var o = this.size(), n = this._list.length;
      if (!(r >= o || r < -o || u < 1)) {
        if (r < 0 && (r += o), u === 1 || !u)
          return s = new Array(1), s[0] = this.removeOne(r), s;
        if (r === 0 && r + u >= o)
          return s = this.toArray(), this.clear(), s;
        r + u > o && (u = o - r);
        var c;
        for (s = new Array(u), c = 0; c < u; c++)
          s[c] = this._list[this._head + r + c & this._capacityMask];
        if (r = this._head + r & this._capacityMask, t + u === o) {
          for (this._tail = this._tail - u + n & this._capacityMask, c = u; c > 0; c--)
            this._list[r = r + 1 + n & this._capacityMask] = void 0;
          return s;
        }
        if (t === 0) {
          for (this._head = this._head + u + n & this._capacityMask, c = u - 1; c > 0; c--)
            this._list[r = r + 1 + n & this._capacityMask] = void 0;
          return s;
        }
        if (r < o / 2) {
          for (this._head = this._head + t + u + n & this._capacityMask, c = t; c > 0; c--)
            this.unshift(this._list[r = r - 1 + n & this._capacityMask]);
          for (r = this._head - 1 + n & this._capacityMask; a > 0; )
            this._list[r = r - 1 + n & this._capacityMask] = void 0, a--;
          t < 0 && (this._tail = r);
        } else {
          for (this._tail = r, r = r + u + n & this._capacityMask, c = o - (u + t); c > 0; c--)
            this.push(this._list[r++]);
          for (r = this._tail; a > 0; )
            this._list[r = r + 1 + n & this._capacityMask] = void 0, a--;
        }
        return this._head < 2 && this._tail > 1e4 && this._tail <= n >>> 2 && this._shrinkArray(), s;
      }
    }
  }, e.prototype.splice = function(t, u) {
    var r = t;
    if (r === (r | 0)) {
      var s = this.size();
      if (r < 0 && (r += s), !(r > s))
        if (arguments.length > 2) {
          var a, o, n, c = arguments.length, i = this._list.length, l = 2;
          if (!s || r < s / 2) {
            for (o = new Array(r), a = 0; a < r; a++)
              o[a] = this._list[this._head + a & this._capacityMask];
            for (u === 0 ? (n = [], r > 0 && (this._head = this._head + r + i & this._capacityMask)) : (n = this.remove(r, u), this._head = this._head + r + i & this._capacityMask); c > l; )
              this.unshift(arguments[--c]);
            for (a = r; a > 0; a--)
              this.unshift(o[a - 1]);
          } else {
            o = new Array(s - (r + u));
            var _ = o.length;
            for (a = 0; a < _; a++)
              o[a] = this._list[this._head + r + u + a & this._capacityMask];
            for (u === 0 ? (n = [], r != s && (this._tail = this._head + r + i & this._capacityMask)) : (n = this.remove(r, u), this._tail = this._tail - _ + i & this._capacityMask); l < c; )
              this.push(arguments[l++]);
            for (a = 0; a < _; a++)
              this.push(o[a]);
          }
          return n;
        } else
          return this.remove(r, u);
    }
  }, e.prototype.clear = function() {
    this._list = new Array(this._list.length), this._head = 0, this._tail = 0;
  }, e.prototype.isEmpty = function() {
    return this._head === this._tail;
  }, e.prototype.toArray = function() {
    return this._copyArray(!1);
  }, e.prototype._fromArray = function(t) {
    var u = t.length, r = this._nextPowerOf2(u);
    this._list = new Array(r), this._capacityMask = r - 1, this._tail = u;
    for (var s = 0; s < u; s++) this._list[s] = t[s];
  }, e.prototype._copyArray = function(t, u) {
    var r = this._list, s = r.length, a = this.length;
    if (u = u | a, u == a && this._head < this._tail)
      return this._list.slice(this._head, this._tail);
    var o = new Array(u), n = 0, c;
    if (t || this._head > this._tail) {
      for (c = this._head; c < s; c++) o[n++] = r[c];
      for (c = 0; c < this._tail; c++) o[n++] = r[c];
    } else
      for (c = this._head; c < this._tail; c++) o[n++] = r[c];
    return o;
  }, e.prototype._growArray = function() {
    if (this._head != 0) {
      var t = this._copyArray(!0, this._list.length << 1);
      this._tail = this._list.length, this._head = 0, this._list = t;
    } else
      this._tail = this._list.length, this._list.length <<= 1;
    this._capacityMask = this._capacityMask << 1 | 1;
  }, e.prototype._shrinkArray = function() {
    this._list.length >>>= 1, this._capacityMask >>>= 1;
  }, e.prototype._nextPowerOf2 = function(t) {
    var u = Math.log(t) / Math.log(2), r = 1 << u + 1;
    return Math.max(r, 4);
  }, Xn = e, Xn;
}
var Un = { exports: {} }, Qn = {}, gc;
function kd() {
  if (gc) return Qn;
  gc = 1;
  let e = {};
  return e[120] = "HA_ERR_KEY_NOT_FOUND", e[121] = "HA_ERR_FOUND_DUPP_KEY", e[122] = "HA_ERR_INTERNAL_ERROR", e[123] = "HA_ERR_RECORD_CHANGED", e[124] = "HA_ERR_WRONG_INDEX", e[126] = "HA_ERR_CRASHED", e[127] = "HA_ERR_WRONG_IN_RECORD", e[128] = "HA_ERR_OUT_OF_MEM", e[130] = "HA_ERR_NOT_A_TABLE", e[131] = "HA_ERR_WRONG_COMMAND", e[132] = "HA_ERR_OLD_FILE", e[133] = "HA_ERR_NO_ACTIVE_RECORD", e[134] = "HA_ERR_RECORD_DELETED", e[135] = "HA_ERR_RECORD_FILE_FULL", e[136] = "HA_ERR_INDEX_FILE_FULL", e[137] = "HA_ERR_END_OF_FILE", e[138] = "HA_ERR_UNSUPPORTED", e[139] = "HA_ERR_TO_BIG_ROW", e[140] = "HA_WRONG_CREATE_OPTION", e[141] = "HA_ERR_FOUND_DUPP_UNIQUE", e[142] = "HA_ERR_UNKNOWN_CHARSET", e[143] = "HA_ERR_WRONG_MRG_TABLE_DEF", e[144] = "HA_ERR_CRASHED_ON_REPAIR", e[145] = "HA_ERR_CRASHED_ON_USAGE", e[146] = "HA_ERR_LOCK_WAIT_TIMEOUT", e[147] = "HA_ERR_LOCK_TABLE_FULL", e[148] = "HA_ERR_READ_ONLY_TRANSACTION", e[149] = "HA_ERR_LOCK_DEADLOCK", e[150] = "HA_ERR_CANNOT_ADD_FOREIGN", e[151] = "HA_ERR_NO_REFERENCED_ROW", e[152] = "HA_ERR_ROW_IS_REFERENCED", e[153] = "HA_ERR_NO_SAVEPOINT", e[154] = "HA_ERR_NON_UNIQUE_BLOCK_SIZE", e[155] = "HA_ERR_NO_SUCH_TABLE", e[156] = "HA_ERR_TABLE_EXIST", e[157] = "HA_ERR_NO_CONNECTION", e[158] = "HA_ERR_NULL_IN_SPATIAL", e[159] = "HA_ERR_TABLE_DEF_CHANGED", e[160] = "HA_ERR_NO_PARTITION_FOUND", e[161] = "HA_ERR_RBR_LOGGING_FAILED", e[162] = "HA_ERR_DROP_INDEX_FK", e[163] = "HA_ERR_FOREIGN_DUPLICATE_KEY", e[164] = "HA_ERR_TABLE_NEEDS_UPGRADE", e[165] = "HA_ERR_TABLE_READONLY", e[166] = "HA_ERR_AUTOINC_READ_FAILED", e[167] = "HA_ERR_AUTOINC_ERANGE", e[168] = "HA_ERR_GENERIC", e[169] = "HA_ERR_RECORD_IS_THE_SAME", e[170] = "HA_ERR_LOGGING_IMPOSSIBLE", e[171] = "HA_ERR_CORRUPT_EVENT", e[172] = "HA_ERR_NEW_FILE", e[173] = "HA_ERR_ROWS_EVENT_APPLY", e[174] = "HA_ERR_INITIALIZATION", e[175] = "HA_ERR_FILE_TOO_SHORT", e[176] = "HA_ERR_WRONG_CRC", e[177] = "HA_ERR_TOO_MANY_CONCURRENT_TRXS", e[178] = "HA_ERR_NOT_IN_LOCK_PARTITIONS", e[179] = "HA_ERR_INDEX_COL_TOO_LONG", e[180] = "HA_ERR_INDEX_CORRUPT", e[181] = "HA_ERR_UNDO_REC_TOO_BIG", e[182] = "HA_FTS_INVALID_DOCID", e[184] = "HA_ERR_TABLESPACE_EXISTS", e[185] = "HA_ERR_TOO_MANY_FIELDS", e[186] = "HA_ERR_ROW_IN_WRONG_PARTITION", e[187] = "HA_ERR_ROW_NOT_VISIBLE", e[188] = "HA_ERR_ABORTED_BY_USER", e[189] = "HA_ERR_DISK_FULL", e[190] = "HA_ERR_INCOMPATIBLE_DEFINITION", e[191] = "HA_ERR_FTS_TOO_MANY_WORDS_IN_PHRASE", e[192] = "HA_ERR_DECRYPTION_FAILED", e[193] = "HA_ERR_FK_DEPTH_EXCEEDED", e[194] = "HA_ERR_TABLESPACE_MISSING", e[195] = "HA_ERR_SEQUENCE_INVALID_DATA", e[196] = "HA_ERR_SEQUENCE_RUN_OUT", e[197] = "HA_ERR_COMMIT_ERROR", e[198] = "HA_ERR_PARTITION_LIST", e[1e3] = "ER_HASHCHK", e[1001] = "ER_NISAMCHK", e[1002] = "ER_NO", e[1003] = "ER_YES", e[1004] = "ER_CANT_CREATE_FILE", e[1005] = "ER_CANT_CREATE_TABLE", e[1006] = "ER_CANT_CREATE_DB", e[1007] = "ER_DB_CREATE_EXISTS", e[1008] = "ER_DB_DROP_EXISTS", e[1009] = "ER_DB_DROP_DELETE", e[1010] = "ER_DB_DROP_RMDIR", e[1011] = "ER_CANT_DELETE_FILE", e[1012] = "ER_CANT_FIND_SYSTEM_REC", e[1013] = "ER_CANT_GET_STAT", e[1014] = "ER_CANT_GET_WD", e[1015] = "ER_CANT_LOCK", e[1016] = "ER_CANT_OPEN_FILE", e[1017] = "ER_FILE_NOT_FOUND", e[1018] = "ER_CANT_READ_DIR", e[1019] = "ER_CANT_SET_WD", e[1020] = "ER_CHECKREAD", e[1021] = "ER_DISK_FULL", e[1022] = "ER_DUP_KEY", e[1023] = "ER_ERROR_ON_CLOSE", e[1024] = "ER_ERROR_ON_READ", e[1025] = "ER_ERROR_ON_RENAME", e[1026] = "ER_ERROR_ON_WRITE", e[1027] = "ER_FILE_USED", e[1028] = "ER_FILSORT_ABORT", e[1029] = "ER_FORM_NOT_FOUND", e[1030] = "ER_GET_ERRNO", e[1031] = "ER_ILLEGAL_HA", e[1032] = "ER_KEY_NOT_FOUND", e[1033] = "ER_NOT_FORM_FILE", e[1034] = "ER_NOT_KEYFILE", e[1035] = "ER_OLD_KEYFILE", e[1036] = "ER_OPEN_AS_READONLY", e[1037] = "ER_OUTOFMEMORY", e[1038] = "ER_OUT_OF_SORTMEMORY", e[1039] = "ER_UNEXPECTED_EOF", e[1040] = "ER_CON_COUNT_ERROR", e[1041] = "ER_OUT_OF_RESOURCES", e[1042] = "ER_BAD_HOST_ERROR", e[1043] = "ER_HANDSHAKE_ERROR", e[1044] = "ER_DBACCESS_DENIED_ERROR", e[1045] = "ER_ACCESS_DENIED_ERROR", e[1046] = "ER_NO_DB_ERROR", e[1047] = "ER_UNKNOWN_COM_ERROR", e[1048] = "ER_BAD_NULL_ERROR", e[1049] = "ER_BAD_DB_ERROR", e[1050] = "ER_TABLE_EXISTS_ERROR", e[1051] = "ER_BAD_TABLE_ERROR", e[1052] = "ER_NON_UNIQ_ERROR", e[1053] = "ER_SERVER_SHUTDOWN", e[1054] = "ER_BAD_FIELD_ERROR", e[1055] = "ER_WRONG_FIELD_WITH_GROUP", e[1056] = "ER_WRONG_GROUP_FIELD", e[1057] = "ER_WRONG_SUM_SELECT", e[1058] = "ER_WRONG_VALUE_COUNT", e[1059] = "ER_TOO_LONG_IDENT", e[1060] = "ER_DUP_FIELDNAME", e[1061] = "ER_DUP_KEYNAME", e[1062] = "ER_DUP_ENTRY", e[1063] = "ER_WRONG_FIELD_SPEC", e[1064] = "ER_PARSE_ERROR", e[1065] = "ER_EMPTY_QUERY", e[1066] = "ER_NONUNIQ_TABLE", e[1067] = "ER_INVALID_DEFAULT", e[1068] = "ER_MULTIPLE_PRI_KEY", e[1069] = "ER_TOO_MANY_KEYS", e[1070] = "ER_TOO_MANY_KEY_PARTS", e[1071] = "ER_TOO_LONG_KEY", e[1072] = "ER_KEY_COLUMN_DOES_NOT_EXIST", e[1073] = "ER_BLOB_USED_AS_KEY", e[1074] = "ER_TOO_BIG_FIELDLENGTH", e[1075] = "ER_WRONG_AUTO_KEY", e[1076] = "ER_BINLOG_CANT_DELETE_GTID_DOMAIN", e[1077] = "ER_NORMAL_SHUTDOWN", e[1078] = "ER_GOT_SIGNAL", e[1079] = "ER_SHUTDOWN_COMPLETE", e[1080] = "ER_FORCING_CLOSE", e[1081] = "ER_IPSOCK_ERROR", e[1082] = "ER_NO_SUCH_INDEX", e[1083] = "ER_WRONG_FIELD_TERMINATORS", e[1084] = "ER_BLOBS_AND_NO_TERMINATED", e[1085] = "ER_TEXTFILE_NOT_READABLE", e[1086] = "ER_FILE_EXISTS_ERROR", e[1087] = "ER_LOAD_INFO", e[1088] = "ER_ALTER_INFO", e[1089] = "ER_WRONG_SUB_KEY", e[1090] = "ER_CANT_REMOVE_ALL_FIELDS", e[1091] = "ER_CANT_DROP_FIELD_OR_KEY", e[1092] = "ER_INSERT_INFO", e[1093] = "ER_UPDATE_TABLE_USED", e[1094] = "ER_NO_SUCH_THREAD", e[1095] = "ER_KILL_DENIED_ERROR", e[1096] = "ER_NO_TABLES_USED", e[1097] = "ER_TOO_BIG_SET", e[1098] = "ER_NO_UNIQUE_LOGFILE", e[1099] = "ER_TABLE_NOT_LOCKED_FOR_WRITE", e[1100] = "ER_TABLE_NOT_LOCKED", e[1101] = "ER_UNUSED_17", e[1102] = "ER_WRONG_DB_NAME", e[1103] = "ER_WRONG_TABLE_NAME", e[1104] = "ER_TOO_BIG_SELECT", e[1105] = "ER_UNKNOWN_ERROR", e[1106] = "ER_UNKNOWN_PROCEDURE", e[1107] = "ER_WRONG_PARAMCOUNT_TO_PROCEDURE", e[1108] = "ER_WRONG_PARAMETERS_TO_PROCEDURE", e[1109] = "ER_UNKNOWN_TABLE", e[1110] = "ER_FIELD_SPECIFIED_TWICE", e[1111] = "ER_INVALID_GROUP_FUNC_USE", e[1112] = "ER_UNSUPPORTED_EXTENSION", e[1113] = "ER_TABLE_MUST_HAVE_COLUMNS", e[1114] = "ER_RECORD_FILE_FULL", e[1115] = "ER_UNKNOWN_CHARACTER_SET", e[1116] = "ER_TOO_MANY_TABLES", e[1117] = "ER_TOO_MANY_FIELDS", e[1118] = "ER_TOO_BIG_ROWSIZE", e[1119] = "ER_STACK_OVERRUN", e[1120] = "ER_WRONG_OUTER_JOIN", e[1121] = "ER_NULL_COLUMN_IN_INDEX", e[1122] = "ER_CANT_FIND_UDF", e[1123] = "ER_CANT_INITIALIZE_UDF", e[1124] = "ER_UDF_NO_PATHS", e[1125] = "ER_UDF_EXISTS", e[1126] = "ER_CANT_OPEN_LIBRARY", e[1127] = "ER_CANT_FIND_DL_ENTRY", e[1128] = "ER_FUNCTION_NOT_DEFINED", e[1129] = "ER_HOST_IS_BLOCKED", e[1130] = "ER_HOST_NOT_PRIVILEGED", e[1131] = "ER_PASSWORD_ANONYMOUS_USER", e[1132] = "ER_PASSWORD_NOT_ALLOWED", e[1133] = "ER_PASSWORD_NO_MATCH", e[1134] = "ER_UPDATE_INFO", e[1135] = "ER_CANT_CREATE_THREAD", e[1136] = "ER_WRONG_VALUE_COUNT_ON_ROW", e[1137] = "ER_CANT_REOPEN_TABLE", e[1138] = "ER_INVALID_USE_OF_NULL", e[1139] = "ER_REGEXP_ERROR", e[1140] = "ER_MIX_OF_GROUP_FUNC_AND_FIELDS", e[1141] = "ER_NONEXISTING_GRANT", e[1142] = "ER_TABLEACCESS_DENIED_ERROR", e[1143] = "ER_COLUMNACCESS_DENIED_ERROR", e[1144] = "ER_ILLEGAL_GRANT_FOR_TABLE", e[1145] = "ER_GRANT_WRONG_HOST_OR_USER", e[1146] = "ER_NO_SUCH_TABLE", e[1147] = "ER_NONEXISTING_TABLE_GRANT", e[1148] = "ER_NOT_ALLOWED_COMMAND", e[1149] = "ER_SYNTAX_ERROR", e[1150] = "ER_DELAYED_CANT_CHANGE_LOCK", e[1151] = "ER_TOO_MANY_DELAYED_THREADS", e[1152] = "ER_ABORTING_CONNECTION", e[1153] = "ER_NET_PACKET_TOO_LARGE", e[1154] = "ER_NET_READ_ERROR_FROM_PIPE", e[1155] = "ER_NET_FCNTL_ERROR", e[1156] = "ER_NET_PACKETS_OUT_OF_ORDER", e[1157] = "ER_NET_UNCOMPRESS_ERROR", e[1158] = "ER_NET_READ_ERROR", e[1159] = "ER_NET_READ_INTERRUPTED", e[1160] = "ER_NET_ERROR_ON_WRITE", e[1161] = "ER_NET_WRITE_INTERRUPTED", e[1162] = "ER_TOO_LONG_STRING", e[1163] = "ER_TABLE_CANT_HANDLE_BLOB", e[1164] = "ER_TABLE_CANT_HANDLE_AUTO_INCREMENT", e[1165] = "ER_DELAYED_INSERT_TABLE_LOCKED", e[1166] = "ER_WRONG_COLUMN_NAME", e[1167] = "ER_WRONG_KEY_COLUMN", e[1168] = "ER_WRONG_MRG_TABLE", e[1169] = "ER_DUP_UNIQUE", e[1170] = "ER_BLOB_KEY_WITHOUT_LENGTH", e[1171] = "ER_PRIMARY_CANT_HAVE_NULL", e[1172] = "ER_TOO_MANY_ROWS", e[1173] = "ER_REQUIRES_PRIMARY_KEY", e[1174] = "ER_NO_RAID_COMPILED", e[1175] = "ER_UPDATE_WITHOUT_KEY_IN_SAFE_MODE", e[1176] = "ER_KEY_DOES_NOT_EXISTS", e[1177] = "ER_CHECK_NO_SUCH_TABLE", e[1178] = "ER_CHECK_NOT_IMPLEMENTED", e[1179] = "ER_CANT_DO_THIS_DURING_AN_TRANSACTION", e[1180] = "ER_ERROR_DURING_COMMIT", e[1181] = "ER_ERROR_DURING_ROLLBACK", e[1182] = "ER_ERROR_DURING_FLUSH_LOGS", e[1183] = "ER_ERROR_DURING_CHECKPOINT", e[1184] = "ER_NEW_ABORTING_CONNECTION", e[1185] = "ER_UNUSED_10", e[1186] = "ER_FLUSH_MASTER_BINLOG_CLOSED", e[1187] = "ER_INDEX_REBUILD", e[1188] = "ER_MASTER", e[1189] = "ER_MASTER_NET_READ", e[1190] = "ER_MASTER_NET_WRITE", e[1191] = "ER_FT_MATCHING_KEY_NOT_FOUND", e[1192] = "ER_LOCK_OR_ACTIVE_TRANSACTION", e[1193] = "ER_UNKNOWN_SYSTEM_VARIABLE", e[1194] = "ER_CRASHED_ON_USAGE", e[1195] = "ER_CRASHED_ON_REPAIR", e[1196] = "ER_WARNING_NOT_COMPLETE_ROLLBACK", e[1197] = "ER_TRANS_CACHE_FULL", e[1198] = "ER_SLAVE_MUST_STOP", e[1199] = "ER_SLAVE_NOT_RUNNING", e[1200] = "ER_BAD_SLAVE", e[1201] = "ER_MASTER_INFO", e[1202] = "ER_SLAVE_THREAD", e[1203] = "ER_TOO_MANY_USER_CONNECTIONS", e[1204] = "ER_SET_CONSTANTS_ONLY", e[1205] = "ER_LOCK_WAIT_TIMEOUT", e[1206] = "ER_LOCK_TABLE_FULL", e[1207] = "ER_READ_ONLY_TRANSACTION", e[1208] = "ER_DROP_DB_WITH_READ_LOCK", e[1209] = "ER_CREATE_DB_WITH_READ_LOCK", e[1210] = "ER_WRONG_ARGUMENTS", e[1211] = "ER_NO_PERMISSION_TO_CREATE_USER", e[1212] = "ER_UNION_TABLES_IN_DIFFERENT_DIR", e[1213] = "ER_LOCK_DEADLOCK", e[1214] = "ER_TABLE_CANT_HANDLE_FT", e[1215] = "ER_CANNOT_ADD_FOREIGN", e[1216] = "ER_NO_REFERENCED_ROW", e[1217] = "ER_ROW_IS_REFERENCED", e[1218] = "ER_CONNECT_TO_MASTER", e[1219] = "ER_QUERY_ON_MASTER", e[1220] = "ER_ERROR_WHEN_EXECUTING_COMMAND", e[1221] = "ER_WRONG_USAGE", e[1222] = "ER_WRONG_NUMBER_OF_COLUMNS_IN_SELECT", e[1223] = "ER_CANT_UPDATE_WITH_READLOCK", e[1224] = "ER_MIXING_NOT_ALLOWED", e[1225] = "ER_DUP_ARGUMENT", e[1226] = "ER_USER_LIMIT_REACHED", e[1227] = "ER_SPECIFIC_ACCESS_DENIED_ERROR", e[1228] = "ER_LOCAL_VARIABLE", e[1229] = "ER_GLOBAL_VARIABLE", e[1230] = "ER_NO_DEFAULT", e[1231] = "ER_WRONG_VALUE_FOR_VAR", e[1232] = "ER_WRONG_TYPE_FOR_VAR", e[1233] = "ER_VAR_CANT_BE_READ", e[1234] = "ER_CANT_USE_OPTION_HERE", e[1235] = "ER_NOT_SUPPORTED_YET", e[1236] = "ER_MASTER_FATAL_ERROR_READING_BINLOG", e[1237] = "ER_SLAVE_IGNORED_TABLE", e[1238] = "ER_INCORRECT_GLOBAL_LOCAL_VAR", e[1239] = "ER_WRONG_FK_DEF", e[1240] = "ER_KEY_REF_DO_NOT_MATCH_TABLE_REF", e[1241] = "ER_OPERAND_COLUMNS", e[1242] = "ER_SUBQUERY_NO_1_ROW", e[1243] = "ER_UNKNOWN_STMT_HANDLER", e[1244] = "ER_CORRUPT_HELP_DB", e[1245] = "ER_CYCLIC_REFERENCE", e[1246] = "ER_AUTO_CONVERT", e[1247] = "ER_ILLEGAL_REFERENCE", e[1248] = "ER_DERIVED_MUST_HAVE_ALIAS", e[1249] = "ER_SELECT_REDUCED", e[1250] = "ER_TABLENAME_NOT_ALLOWED_HERE", e[1251] = "ER_NOT_SUPPORTED_AUTH_MODE", e[1252] = "ER_SPATIAL_CANT_HAVE_NULL", e[1253] = "ER_COLLATION_CHARSET_MISMATCH", e[1254] = "ER_SLAVE_WAS_RUNNING", e[1255] = "ER_SLAVE_WAS_NOT_RUNNING", e[1256] = "ER_TOO_BIG_FOR_UNCOMPRESS", e[1257] = "ER_ZLIB_Z_MEM_ERROR", e[1258] = "ER_ZLIB_Z_BUF_ERROR", e[1259] = "ER_ZLIB_Z_DATA_ERROR", e[1260] = "ER_CUT_VALUE_GROUP_CONCAT", e[1261] = "ER_WARN_TOO_FEW_RECORDS", e[1262] = "ER_WARN_TOO_MANY_RECORDS", e[1263] = "ER_WARN_NULL_TO_NOTNULL", e[1264] = "ER_WARN_DATA_OUT_OF_RANGE", e[1265] = "WARN_DATA_TRUNCATED", e[1266] = "ER_WARN_USING_OTHER_HANDLER", e[1267] = "ER_CANT_AGGREGATE_2COLLATIONS", e[1268] = "ER_DROP_USER", e[1269] = "ER_REVOKE_GRANTS", e[1270] = "ER_CANT_AGGREGATE_3COLLATIONS", e[1271] = "ER_CANT_AGGREGATE_NCOLLATIONS", e[1272] = "ER_VARIABLE_IS_NOT_STRUCT", e[1273] = "ER_UNKNOWN_COLLATION", e[1274] = "ER_SLAVE_IGNORED_SSL_PARAMS", e[1275] = "ER_SERVER_IS_IN_SECURE_AUTH_MODE", e[1276] = "ER_WARN_FIELD_RESOLVED", e[1277] = "ER_BAD_SLAVE_UNTIL_COND", e[1278] = "ER_MISSING_SKIP_SLAVE", e[1279] = "ER_UNTIL_COND_IGNORED", e[1280] = "ER_WRONG_NAME_FOR_INDEX", e[1281] = "ER_WRONG_NAME_FOR_CATALOG", e[1282] = "ER_WARN_QC_RESIZE", e[1283] = "ER_BAD_FT_COLUMN", e[1284] = "ER_UNKNOWN_KEY_CACHE", e[1285] = "ER_WARN_HOSTNAME_WONT_WORK", e[1286] = "ER_UNKNOWN_STORAGE_ENGINE", e[1287] = "ER_WARN_DEPRECATED_SYNTAX", e[1288] = "ER_NON_UPDATABLE_TABLE", e[1289] = "ER_FEATURE_DISABLED", e[1290] = "ER_OPTION_PREVENTS_STATEMENT", e[1291] = "ER_DUPLICATED_VALUE_IN_TYPE", e[1292] = "ER_TRUNCATED_WRONG_VALUE", e[1293] = "ER_TOO_MUCH_AUTO_TIMESTAMP_COLS", e[1294] = "ER_INVALID_ON_UPDATE", e[1295] = "ER_UNSUPPORTED_PS", e[1296] = "ER_GET_ERRMSG", e[1297] = "ER_GET_TEMPORARY_ERRMSG", e[1298] = "ER_UNKNOWN_TIME_ZONE", e[1299] = "ER_WARN_INVALID_TIMESTAMP", e[1300] = "ER_INVALID_CHARACTER_STRING", e[1301] = "ER_WARN_ALLOWED_PACKET_OVERFLOWED", e[1302] = "ER_CONFLICTING_DECLARATIONS", e[1303] = "ER_SP_NO_RECURSIVE_CREATE", e[1304] = "ER_SP_ALREADY_EXISTS", e[1305] = "ER_SP_DOES_NOT_EXIST", e[1306] = "ER_SP_DROP_FAILED", e[1307] = "ER_SP_STORE_FAILED", e[1308] = "ER_SP_LILABEL_MISMATCH", e[1309] = "ER_SP_LABEL_REDEFINE", e[1310] = "ER_SP_LABEL_MISMATCH", e[1311] = "ER_SP_UNINIT_VAR", e[1312] = "ER_SP_BADSELECT", e[1313] = "ER_SP_BADRETURN", e[1314] = "ER_SP_BADSTATEMENT", e[1315] = "ER_UPDATE_LOG_DEPRECATED_IGNORED", e[1316] = "ER_UPDATE_LOG_DEPRECATED_TRANSLATED", e[1317] = "ER_QUERY_INTERRUPTED", e[1318] = "ER_SP_WRONG_NO_OF_ARGS", e[1319] = "ER_SP_COND_MISMATCH", e[1320] = "ER_SP_NORETURN", e[1321] = "ER_SP_NORETURNEND", e[1322] = "ER_SP_BAD_CURSOR_QUERY", e[1323] = "ER_SP_BAD_CURSOR_SELECT", e[1324] = "ER_SP_CURSOR_MISMATCH", e[1325] = "ER_SP_CURSOR_ALREADY_OPEN", e[1326] = "ER_SP_CURSOR_NOT_OPEN", e[1327] = "ER_SP_UNDECLARED_VAR", e[1328] = "ER_SP_WRONG_NO_OF_FETCH_ARGS", e[1329] = "ER_SP_FETCH_NO_DATA", e[1330] = "ER_SP_DUP_PARAM", e[1331] = "ER_SP_DUP_VAR", e[1332] = "ER_SP_DUP_COND", e[1333] = "ER_SP_DUP_CURS", e[1334] = "ER_SP_CANT_ALTER", e[1335] = "ER_SP_SUBSELECT_NYI", e[1336] = "ER_STMT_NOT_ALLOWED_IN_SF_OR_TRG", e[1337] = "ER_SP_VARCOND_AFTER_CURSHNDLR", e[1338] = "ER_SP_CURSOR_AFTER_HANDLER", e[1339] = "ER_SP_CASE_NOT_FOUND", e[1340] = "ER_FPARSER_TOO_BIG_FILE", e[1341] = "ER_FPARSER_BAD_HEADER", e[1342] = "ER_FPARSER_EOF_IN_COMMENT", e[1343] = "ER_FPARSER_ERROR_IN_PARAMETER", e[1344] = "ER_FPARSER_EOF_IN_UNKNOWN_PARAMETER", e[1345] = "ER_VIEW_NO_EXPLAIN", e[1346] = "ER_FRM_UNKNOWN_TYPE", e[1347] = "ER_WRONG_OBJECT", e[1348] = "ER_NONUPDATEABLE_COLUMN", e[1349] = "ER_VIEW_SELECT_DERIVED", e[1350] = "ER_VIEW_SELECT_CLAUSE", e[1351] = "ER_VIEW_SELECT_VARIABLE", e[1352] = "ER_VIEW_SELECT_TMPTABLE", e[1353] = "ER_VIEW_WRONG_LIST", e[1354] = "ER_WARN_VIEW_MERGE", e[1355] = "ER_WARN_VIEW_WITHOUT_KEY", e[1356] = "ER_VIEW_INVALID", e[1357] = "ER_SP_NO_DROP_SP", e[1358] = "ER_SP_GOTO_IN_HNDLR", e[1359] = "ER_TRG_ALREADY_EXISTS", e[1360] = "ER_TRG_DOES_NOT_EXIST", e[1361] = "ER_TRG_ON_VIEW_OR_TEMP_TABLE", e[1362] = "ER_TRG_CANT_CHANGE_ROW", e[1363] = "ER_TRG_NO_SUCH_ROW_IN_TRG", e[1364] = "ER_NO_DEFAULT_FOR_FIELD", e[1365] = "ER_DIVISION_BY_ZERO", e[1366] = "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD", e[1367] = "ER_ILLEGAL_VALUE_FOR_TYPE", e[1368] = "ER_VIEW_NONUPD_CHECK", e[1369] = "ER_VIEW_CHECK_FAILED", e[1370] = "ER_PROCACCESS_DENIED_ERROR", e[1371] = "ER_RELAY_LOG_FAIL", e[1372] = "ER_PASSWD_LENGTH", e[1373] = "ER_UNKNOWN_TARGET_BINLOG", e[1374] = "ER_IO_ERR_LOG_INDEX_READ", e[1375] = "ER_BINLOG_PURGE_PROHIBITED", e[1376] = "ER_FSEEK_FAIL", e[1377] = "ER_BINLOG_PURGE_FATAL_ERR", e[1378] = "ER_LOG_IN_USE", e[1379] = "ER_LOG_PURGE_UNKNOWN_ERR", e[1380] = "ER_RELAY_LOG_INIT", e[1381] = "ER_NO_BINARY_LOGGING", e[1382] = "ER_RESERVED_SYNTAX", e[1383] = "ER_WSAS_FAILED", e[1384] = "ER_DIFF_GROUPS_PROC", e[1385] = "ER_NO_GROUP_FOR_PROC", e[1386] = "ER_ORDER_WITH_PROC", e[1387] = "ER_LOGGING_PROHIBIT_CHANGING_OF", e[1388] = "ER_NO_FILE_MAPPING", e[1389] = "ER_WRONG_MAGIC", e[1390] = "ER_PS_MANY_PARAM", e[1391] = "ER_KEY_PART_0", e[1392] = "ER_VIEW_CHECKSUM", e[1393] = "ER_VIEW_MULTIUPDATE", e[1394] = "ER_VIEW_NO_INSERT_FIELD_LIST", e[1395] = "ER_VIEW_DELETE_MERGE_VIEW", e[1396] = "ER_CANNOT_USER", e[1397] = "ER_XAER_NOTA", e[1398] = "ER_XAER_INVAL", e[1399] = "ER_XAER_RMFAIL", e[1400] = "ER_XAER_OUTSIDE", e[1401] = "ER_XAER_RMERR", e[1402] = "ER_XA_RBROLLBACK", e[1403] = "ER_NONEXISTING_PROC_GRANT", e[1404] = "ER_PROC_AUTO_GRANT_FAIL", e[1405] = "ER_PROC_AUTO_REVOKE_FAIL", e[1406] = "ER_DATA_TOO_LONG", e[1407] = "ER_SP_BAD_SQLSTATE", e[1408] = "ER_STARTUP", e[1409] = "ER_LOAD_FROM_FIXED_SIZE_ROWS_TO_VAR", e[1410] = "ER_CANT_CREATE_USER_WITH_GRANT", e[1411] = "ER_WRONG_VALUE_FOR_TYPE", e[1412] = "ER_TABLE_DEF_CHANGED", e[1413] = "ER_SP_DUP_HANDLER", e[1414] = "ER_SP_NOT_VAR_ARG", e[1415] = "ER_SP_NO_RETSET", e[1416] = "ER_CANT_CREATE_GEOMETRY_OBJECT", e[1417] = "ER_FAILED_ROUTINE_BREAK_BINLOG", e[1418] = "ER_BINLOG_UNSAFE_ROUTINE", e[1419] = "ER_BINLOG_CREATE_ROUTINE_NEED_SUPER", e[1420] = "ER_EXEC_STMT_WITH_OPEN_CURSOR", e[1421] = "ER_STMT_HAS_NO_OPEN_CURSOR", e[1422] = "ER_COMMIT_NOT_ALLOWED_IN_SF_OR_TRG", e[1423] = "ER_NO_DEFAULT_FOR_VIEW_FIELD", e[1424] = "ER_SP_NO_RECURSION", e[1425] = "ER_TOO_BIG_SCALE", e[1426] = "ER_TOO_BIG_PRECISION", e[1427] = "ER_M_BIGGER_THAN_D", e[1428] = "ER_WRONG_LOCK_OF_SYSTEM_TABLE", e[1429] = "ER_CONNECT_TO_FOREIGN_DATA_SOURCE", e[1430] = "ER_QUERY_ON_FOREIGN_DATA_SOURCE", e[1431] = "ER_FOREIGN_DATA_SOURCE_DOESNT_EXIST", e[1432] = "ER_FOREIGN_DATA_STRING_INVALID_CANT_CREATE", e[1433] = "ER_FOREIGN_DATA_STRING_INVALID", e[1434] = "ER_CANT_CREATE_FEDERATED_TABLE", e[1435] = "ER_TRG_IN_WRONG_SCHEMA", e[1436] = "ER_STACK_OVERRUN_NEED_MORE", e[1437] = "ER_TOO_LONG_BODY", e[1438] = "ER_WARN_CANT_DROP_DEFAULT_KEYCACHE", e[1439] = "ER_TOO_BIG_DISPLAYWIDTH", e[1440] = "ER_XAER_DUPID", e[1441] = "ER_DATETIME_FUNCTION_OVERFLOW", e[1442] = "ER_CANT_UPDATE_USED_TABLE_IN_SF_OR_TRG", e[1443] = "ER_VIEW_PREVENT_UPDATE", e[1444] = "ER_PS_NO_RECURSION", e[1445] = "ER_SP_CANT_SET_AUTOCOMMIT", e[1446] = "ER_MALFORMED_DEFINER", e[1447] = "ER_VIEW_FRM_NO_USER", e[1448] = "ER_VIEW_OTHER_USER", e[1449] = "ER_NO_SUCH_USER", e[1450] = "ER_FORBID_SCHEMA_CHANGE", e[1451] = "ER_ROW_IS_REFERENCED_2", e[1452] = "ER_NO_REFERENCED_ROW_2", e[1453] = "ER_SP_BAD_VAR_SHADOW", e[1454] = "ER_TRG_NO_DEFINER", e[1455] = "ER_OLD_FILE_FORMAT", e[1456] = "ER_SP_RECURSION_LIMIT", e[1457] = "ER_SP_PROC_TABLE_CORRUPT", e[1458] = "ER_SP_WRONG_NAME", e[1459] = "ER_TABLE_NEEDS_UPGRADE", e[1460] = "ER_SP_NO_AGGREGATE", e[1461] = "ER_MAX_PREPARED_STMT_COUNT_REACHED", e[1462] = "ER_VIEW_RECURSIVE", e[1463] = "ER_NON_GROUPING_FIELD_USED", e[1464] = "ER_TABLE_CANT_HANDLE_SPKEYS", e[1465] = "ER_NO_TRIGGERS_ON_SYSTEM_SCHEMA", e[1466] = "ER_REMOVED_SPACES", e[1467] = "ER_AUTOINC_READ_FAILED", e[1468] = "ER_USERNAME", e[1469] = "ER_HOSTNAME", e[1470] = "ER_WRONG_STRING_LENGTH", e[1471] = "ER_NON_INSERTABLE_TABLE", e[1472] = "ER_ADMIN_WRONG_MRG_TABLE", e[1473] = "ER_TOO_HIGH_LEVEL_OF_NESTING_FOR_SELECT", e[1474] = "ER_NAME_BECOMES_EMPTY", e[1475] = "ER_AMBIGUOUS_FIELD_TERM", e[1476] = "ER_FOREIGN_SERVER_EXISTS", e[1477] = "ER_FOREIGN_SERVER_DOESNT_EXIST", e[1478] = "ER_ILLEGAL_HA_CREATE_OPTION", e[1479] = "ER_PARTITION_REQUIRES_VALUES_ERROR", e[1480] = "ER_PARTITION_WRONG_VALUES_ERROR", e[1481] = "ER_PARTITION_MAXVALUE_ERROR", e[1482] = "ER_PARTITION_SUBPARTITION_ERROR", e[1483] = "ER_PARTITION_SUBPART_MIX_ERROR", e[1484] = "ER_PARTITION_WRONG_NO_PART_ERROR", e[1485] = "ER_PARTITION_WRONG_NO_SUBPART_ERROR", e[1486] = "ER_WRONG_EXPR_IN_PARTITION_FUNC_ERROR", e[1487] = "ER_NOT_CONSTANT_EXPRESSION", e[1488] = "ER_FIELD_NOT_FOUND_PART_ERROR", e[1489] = "ER_LIST_OF_FIELDS_ONLY_IN_HASH_ERROR", e[1490] = "ER_INCONSISTENT_PARTITION_INFO_ERROR", e[1491] = "ER_PARTITION_FUNC_NOT_ALLOWED_ERROR", e[1492] = "ER_PARTITIONS_MUST_BE_DEFINED_ERROR", e[1493] = "ER_RANGE_NOT_INCREASING_ERROR", e[1494] = "ER_INCONSISTENT_TYPE_OF_FUNCTIONS_ERROR", e[1495] = "ER_MULTIPLE_DEF_CONST_IN_LIST_PART_ERROR", e[1496] = "ER_PARTITION_ENTRY_ERROR", e[1497] = "ER_MIX_HANDLER_ERROR", e[1498] = "ER_PARTITION_NOT_DEFINED_ERROR", e[1499] = "ER_TOO_MANY_PARTITIONS_ERROR", e[1500] = "ER_SUBPARTITION_ERROR", e[1501] = "ER_CANT_CREATE_HANDLER_FILE", e[1502] = "ER_BLOB_FIELD_IN_PART_FUNC_ERROR", e[1503] = "ER_UNIQUE_KEY_NEED_ALL_FIELDS_IN_PF", e[1504] = "ER_NO_PARTS_ERROR", e[1505] = "ER_PARTITION_MGMT_ON_NONPARTITIONED", e[1506] = "ER_FEATURE_NOT_SUPPORTED_WITH_PARTITIONING", e[1507] = "ER_PARTITION_DOES_NOT_EXIST", e[1508] = "ER_DROP_LAST_PARTITION", e[1509] = "ER_COALESCE_ONLY_ON_HASH_PARTITION", e[1510] = "ER_REORG_HASH_ONLY_ON_SAME_NO", e[1511] = "ER_REORG_NO_PARAM_ERROR", e[1512] = "ER_ONLY_ON_RANGE_LIST_PARTITION", e[1513] = "ER_ADD_PARTITION_SUBPART_ERROR", e[1514] = "ER_ADD_PARTITION_NO_NEW_PARTITION", e[1515] = "ER_COALESCE_PARTITION_NO_PARTITION", e[1516] = "ER_REORG_PARTITION_NOT_EXIST", e[1517] = "ER_SAME_NAME_PARTITION", e[1518] = "ER_NO_BINLOG_ERROR", e[1519] = "ER_CONSECUTIVE_REORG_PARTITIONS", e[1520] = "ER_REORG_OUTSIDE_RANGE", e[1521] = "ER_PARTITION_FUNCTION_FAILURE", e[1522] = "ER_PART_STATE_ERROR", e[1523] = "ER_LIMITED_PART_RANGE", e[1524] = "ER_PLUGIN_IS_NOT_LOADED", e[1525] = "ER_WRONG_VALUE", e[1526] = "ER_NO_PARTITION_FOR_GIVEN_VALUE", e[1527] = "ER_FILEGROUP_OPTION_ONLY_ONCE", e[1528] = "ER_CREATE_FILEGROUP_FAILED", e[1529] = "ER_DROP_FILEGROUP_FAILED", e[1530] = "ER_TABLESPACE_AUTO_EXTEND_ERROR", e[1531] = "ER_WRONG_SIZE_NUMBER", e[1532] = "ER_SIZE_OVERFLOW_ERROR", e[1533] = "ER_ALTER_FILEGROUP_FAILED", e[1534] = "ER_BINLOG_ROW_LOGGING_FAILED", e[1535] = "ER_BINLOG_ROW_WRONG_TABLE_DEF", e[1536] = "ER_BINLOG_ROW_RBR_TO_SBR", e[1537] = "ER_EVENT_ALREADY_EXISTS", e[1538] = "ER_EVENT_STORE_FAILED", e[1539] = "ER_EVENT_DOES_NOT_EXIST", e[1540] = "ER_EVENT_CANT_ALTER", e[1541] = "ER_EVENT_DROP_FAILED", e[1542] = "ER_EVENT_INTERVAL_NOT_POSITIVE_OR_TOO_BIG", e[1543] = "ER_EVENT_ENDS_BEFORE_STARTS", e[1544] = "ER_EVENT_EXEC_TIME_IN_THE_PAST", e[1545] = "ER_EVENT_OPEN_TABLE_FAILED", e[1546] = "ER_EVENT_NEITHER_M_EXPR_NOR_M_AT", e[1547] = "ER_UNUSED_2", e[1548] = "ER_UNUSED_3", e[1549] = "ER_EVENT_CANNOT_DELETE", e[1550] = "ER_EVENT_COMPILE_ERROR", e[1551] = "ER_EVENT_SAME_NAME", e[1552] = "ER_EVENT_DATA_TOO_LONG", e[1553] = "ER_DROP_INDEX_FK", e[1554] = "ER_WARN_DEPRECATED_SYNTAX_WITH_VER", e[1555] = "ER_CANT_WRITE_LOCK_LOG_TABLE", e[1556] = "ER_CANT_LOCK_LOG_TABLE", e[1557] = "ER_UNUSED_4", e[1558] = "ER_COL_COUNT_DOESNT_MATCH_PLEASE_UPDATE", e[1559] = "ER_TEMP_TABLE_PREVENTS_SWITCH_OUT_OF_RBR", e[1560] = "ER_STORED_FUNCTION_PREVENTS_SWITCH_BINLOG_FORMAT", e[1561] = "ER_UNUSED_13", e[1562] = "ER_PARTITION_NO_TEMPORARY", e[1563] = "ER_PARTITION_CONST_DOMAIN_ERROR", e[1564] = "ER_PARTITION_FUNCTION_IS_NOT_ALLOWED", e[1565] = "ER_DDL_LOG_ERROR", e[1566] = "ER_NULL_IN_VALUES_LESS_THAN", e[1567] = "ER_WRONG_PARTITION_NAME", e[1568] = "ER_CANT_CHANGE_TX_CHARACTERISTICS", e[1569] = "ER_DUP_ENTRY_AUTOINCREMENT_CASE", e[1570] = "ER_EVENT_MODIFY_QUEUE_ERROR", e[1571] = "ER_EVENT_SET_VAR_ERROR", e[1572] = "ER_PARTITION_MERGE_ERROR", e[1573] = "ER_CANT_ACTIVATE_LOG", e[1574] = "ER_RBR_NOT_AVAILABLE", e[1575] = "ER_BASE64_DECODE_ERROR", e[1576] = "ER_EVENT_RECURSION_FORBIDDEN", e[1577] = "ER_EVENTS_DB_ERROR", e[1578] = "ER_ONLY_INTEGERS_ALLOWED", e[1579] = "ER_UNSUPORTED_LOG_ENGINE", e[1580] = "ER_BAD_LOG_STATEMENT", e[1581] = "ER_CANT_RENAME_LOG_TABLE", e[1582] = "ER_WRONG_PARAMCOUNT_TO_NATIVE_FCT", e[1583] = "ER_WRONG_PARAMETERS_TO_NATIVE_FCT", e[1584] = "ER_WRONG_PARAMETERS_TO_STORED_FCT", e[1585] = "ER_NATIVE_FCT_NAME_COLLISION", e[1586] = "ER_DUP_ENTRY_WITH_KEY_NAME", e[1587] = "ER_BINLOG_PURGE_EMFILE", e[1588] = "ER_EVENT_CANNOT_CREATE_IN_THE_PAST", e[1589] = "ER_EVENT_CANNOT_ALTER_IN_THE_PAST", e[1590] = "ER_SLAVE_INCIDENT", e[1591] = "ER_NO_PARTITION_FOR_GIVEN_VALUE_SILENT", e[1592] = "ER_BINLOG_UNSAFE_STATEMENT", e[1593] = "ER_SLAVE_FATAL_ERROR", e[1594] = "ER_SLAVE_RELAY_LOG_READ_FAILURE", e[1595] = "ER_SLAVE_RELAY_LOG_WRITE_FAILURE", e[1596] = "ER_SLAVE_CREATE_EVENT_FAILURE", e[1597] = "ER_SLAVE_MASTER_COM_FAILURE", e[1598] = "ER_BINLOG_LOGGING_IMPOSSIBLE", e[1599] = "ER_VIEW_NO_CREATION_CTX", e[1600] = "ER_VIEW_INVALID_CREATION_CTX", e[1601] = "ER_SR_INVALID_CREATION_CTX", e[1602] = "ER_TRG_CORRUPTED_FILE", e[1603] = "ER_TRG_NO_CREATION_CTX", e[1604] = "ER_TRG_INVALID_CREATION_CTX", e[1605] = "ER_EVENT_INVALID_CREATION_CTX", e[1606] = "ER_TRG_CANT_OPEN_TABLE", e[1607] = "ER_CANT_CREATE_SROUTINE", e[1608] = "ER_UNUSED_11", e[1609] = "ER_NO_FORMAT_DESCRIPTION_EVENT_BEFORE_BINLOG_STATEMENT", e[1610] = "ER_SLAVE_CORRUPT_EVENT", e[1611] = "ER_LOAD_DATA_INVALID_COLUMN", e[1612] = "ER_LOG_PURGE_NO_FILE", e[1613] = "ER_XA_RBTIMEOUT", e[1614] = "ER_XA_RBDEADLOCK", e[1615] = "ER_NEED_REPREPARE", e[1616] = "ER_DELAYED_NOT_SUPPORTED", e[1617] = "WARN_NO_MASTER_INFO", e[1618] = "WARN_OPTION_IGNORED", e[1619] = "ER_PLUGIN_DELETE_BUILTIN", e[1620] = "WARN_PLUGIN_BUSY", e[1621] = "ER_VARIABLE_IS_READONLY", e[1622] = "ER_WARN_ENGINE_TRANSACTION_ROLLBACK", e[1623] = "ER_SLAVE_HEARTBEAT_FAILURE", e[1624] = "ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE", e[1625] = "ER_UNUSED_14", e[1626] = "ER_CONFLICT_FN_PARSE_ERROR", e[1627] = "ER_EXCEPTIONS_WRITE_ERROR", e[1628] = "ER_TOO_LONG_TABLE_COMMENT", e[1629] = "ER_TOO_LONG_FIELD_COMMENT", e[1630] = "ER_FUNC_INEXISTENT_NAME_COLLISION", e[1631] = "ER_DATABASE_NAME", e[1632] = "ER_TABLE_NAME", e[1633] = "ER_PARTITION_NAME", e[1634] = "ER_SUBPARTITION_NAME", e[1635] = "ER_TEMPORARY_NAME", e[1636] = "ER_RENAMED_NAME", e[1637] = "ER_TOO_MANY_CONCURRENT_TRXS", e[1638] = "WARN_NON_ASCII_SEPARATOR_NOT_IMPLEMENTED", e[1639] = "ER_DEBUG_SYNC_TIMEOUT", e[1640] = "ER_DEBUG_SYNC_HIT_LIMIT", e[1641] = "ER_DUP_SIGNAL_SET", e[1642] = "ER_SIGNAL_WARN", e[1643] = "ER_SIGNAL_NOT_FOUND", e[1644] = "ER_SIGNAL_EXCEPTION", e[1645] = "ER_RESIGNAL_WITHOUT_ACTIVE_HANDLER", e[1646] = "ER_SIGNAL_BAD_CONDITION_TYPE", e[1647] = "WARN_COND_ITEM_TRUNCATED", e[1648] = "ER_COND_ITEM_TOO_LONG", e[1649] = "ER_UNKNOWN_LOCALE", e[1650] = "ER_SLAVE_IGNORE_SERVER_IDS", e[1651] = "ER_QUERY_CACHE_DISABLED", e[1652] = "ER_SAME_NAME_PARTITION_FIELD", e[1653] = "ER_PARTITION_COLUMN_LIST_ERROR", e[1654] = "ER_WRONG_TYPE_COLUMN_VALUE_ERROR", e[1655] = "ER_TOO_MANY_PARTITION_FUNC_FIELDS_ERROR", e[1656] = "ER_MAXVALUE_IN_VALUES_IN", e[1657] = "ER_TOO_MANY_VALUES_ERROR", e[1658] = "ER_ROW_SINGLE_PARTITION_FIELD_ERROR", e[1659] = "ER_FIELD_TYPE_NOT_ALLOWED_AS_PARTITION_FIELD", e[1660] = "ER_PARTITION_FIELDS_TOO_LONG", e[1661] = "ER_BINLOG_ROW_ENGINE_AND_STMT_ENGINE", e[1662] = "ER_BINLOG_ROW_MODE_AND_STMT_ENGINE", e[1663] = "ER_BINLOG_UNSAFE_AND_STMT_ENGINE", e[1664] = "ER_BINLOG_ROW_INJECTION_AND_STMT_ENGINE", e[1665] = "ER_BINLOG_STMT_MODE_AND_ROW_ENGINE", e[1666] = "ER_BINLOG_ROW_INJECTION_AND_STMT_MODE", e[1667] = "ER_BINLOG_MULTIPLE_ENGINES_AND_SELF_LOGGING_ENGINE", e[1668] = "ER_BINLOG_UNSAFE_LIMIT", e[1669] = "ER_BINLOG_UNSAFE_INSERT_DELAYED", e[1670] = "ER_BINLOG_UNSAFE_SYSTEM_TABLE", e[1671] = "ER_BINLOG_UNSAFE_AUTOINC_COLUMNS", e[1672] = "ER_BINLOG_UNSAFE_UDF", e[1673] = "ER_BINLOG_UNSAFE_SYSTEM_VARIABLE", e[1674] = "ER_BINLOG_UNSAFE_SYSTEM_FUNCTION", e[1675] = "ER_BINLOG_UNSAFE_NONTRANS_AFTER_TRANS", e[1676] = "ER_MESSAGE_AND_STATEMENT", e[1677] = "ER_SLAVE_CONVERSION_FAILED", e[1678] = "ER_SLAVE_CANT_CREATE_CONVERSION", e[1679] = "ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_BINLOG_FORMAT", e[1680] = "ER_PATH_LENGTH", e[1681] = "ER_WARN_DEPRECATED_SYNTAX_NO_REPLACEMENT", e[1682] = "ER_WRONG_NATIVE_TABLE_STRUCTURE", e[1683] = "ER_WRONG_PERFSCHEMA_USAGE", e[1684] = "ER_WARN_I_S_SKIPPED_TABLE", e[1685] = "ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_BINLOG_DIRECT", e[1686] = "ER_STORED_FUNCTION_PREVENTS_SWITCH_BINLOG_DIRECT", e[1687] = "ER_SPATIAL_MUST_HAVE_GEOM_COL", e[1688] = "ER_TOO_LONG_INDEX_COMMENT", e[1689] = "ER_LOCK_ABORTED", e[1690] = "ER_DATA_OUT_OF_RANGE", e[1691] = "ER_WRONG_SPVAR_TYPE_IN_LIMIT", e[1692] = "ER_BINLOG_UNSAFE_MULTIPLE_ENGINES_AND_SELF_LOGGING_ENGINE", e[1693] = "ER_BINLOG_UNSAFE_MIXED_STATEMENT", e[1694] = "ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_SQL_LOG_BIN", e[1695] = "ER_STORED_FUNCTION_PREVENTS_SWITCH_SQL_LOG_BIN", e[1696] = "ER_FAILED_READ_FROM_PAR_FILE", e[1697] = "ER_VALUES_IS_NOT_INT_TYPE_ERROR", e[1698] = "ER_ACCESS_DENIED_NO_PASSWORD_ERROR", e[1699] = "ER_SET_PASSWORD_AUTH_PLUGIN", e[1700] = "ER_GRANT_PLUGIN_USER_EXISTS", e[1701] = "ER_TRUNCATE_ILLEGAL_FK", e[1702] = "ER_PLUGIN_IS_PERMANENT", e[1703] = "ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE_MIN", e[1704] = "ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE_MAX", e[1705] = "ER_STMT_CACHE_FULL", e[1706] = "ER_MULTI_UPDATE_KEY_CONFLICT", e[1707] = "ER_TABLE_NEEDS_REBUILD", e[1708] = "WARN_OPTION_BELOW_LIMIT", e[1709] = "ER_INDEX_COLUMN_TOO_LONG", e[1710] = "ER_ERROR_IN_TRIGGER_BODY", e[1711] = "ER_ERROR_IN_UNKNOWN_TRIGGER_BODY", e[1712] = "ER_INDEX_CORRUPT", e[1713] = "ER_UNDO_RECORD_TOO_BIG", e[1714] = "ER_BINLOG_UNSAFE_INSERT_IGNORE_SELECT", e[1715] = "ER_BINLOG_UNSAFE_INSERT_SELECT_UPDATE", e[1716] = "ER_BINLOG_UNSAFE_REPLACE_SELECT", e[1717] = "ER_BINLOG_UNSAFE_CREATE_IGNORE_SELECT", e[1718] = "ER_BINLOG_UNSAFE_CREATE_REPLACE_SELECT", e[1719] = "ER_BINLOG_UNSAFE_UPDATE_IGNORE", e[1720] = "ER_UNUSED_15", e[1721] = "ER_UNUSED_16", e[1722] = "ER_BINLOG_UNSAFE_WRITE_AUTOINC_SELECT", e[1723] = "ER_BINLOG_UNSAFE_CREATE_SELECT_AUTOINC", e[1724] = "ER_BINLOG_UNSAFE_INSERT_TWO_KEYS", e[1725] = "ER_UNUSED_28", e[1726] = "ER_VERS_NOT_ALLOWED", e[1727] = "ER_BINLOG_UNSAFE_AUTOINC_NOT_FIRST", e[1728] = "ER_CANNOT_LOAD_FROM_TABLE_V2", e[1729] = "ER_MASTER_DELAY_VALUE_OUT_OF_RANGE", e[1730] = "ER_ONLY_FD_AND_RBR_EVENTS_ALLOWED_IN_BINLOG_STATEMENT", e[1731] = "ER_PARTITION_EXCHANGE_DIFFERENT_OPTION", e[1732] = "ER_PARTITION_EXCHANGE_PART_TABLE", e[1733] = "ER_PARTITION_EXCHANGE_TEMP_TABLE", e[1734] = "ER_PARTITION_INSTEAD_OF_SUBPARTITION", e[1735] = "ER_UNKNOWN_PARTITION", e[1736] = "ER_TABLES_DIFFERENT_METADATA", e[1737] = "ER_ROW_DOES_NOT_MATCH_PARTITION", e[1738] = "ER_BINLOG_CACHE_SIZE_GREATER_THAN_MAX", e[1739] = "ER_WARN_INDEX_NOT_APPLICABLE", e[1740] = "ER_PARTITION_EXCHANGE_FOREIGN_KEY", e[1741] = "ER_NO_SUCH_KEY_VALUE", e[1742] = "ER_VALUE_TOO_LONG", e[1743] = "ER_NETWORK_READ_EVENT_CHECKSUM_FAILURE", e[1744] = "ER_BINLOG_READ_EVENT_CHECKSUM_FAILURE", e[1745] = "ER_BINLOG_STMT_CACHE_SIZE_GREATER_THAN_MAX", e[1746] = "ER_CANT_UPDATE_TABLE_IN_CREATE_TABLE_SELECT", e[1747] = "ER_PARTITION_CLAUSE_ON_NONPARTITIONED", e[1748] = "ER_ROW_DOES_NOT_MATCH_GIVEN_PARTITION_SET", e[1749] = "ER_UNUSED_5", e[1750] = "ER_CHANGE_RPL_INFO_REPOSITORY_FAILURE", e[1751] = "ER_WARNING_NOT_COMPLETE_ROLLBACK_WITH_CREATED_TEMP_TABLE", e[1752] = "ER_WARNING_NOT_COMPLETE_ROLLBACK_WITH_DROPPED_TEMP_TABLE", e[1753] = "ER_MTS_FEATURE_IS_NOT_SUPPORTED", e[1754] = "ER_MTS_UPDATED_DBS_GREATER_MAX", e[1755] = "ER_MTS_CANT_PARALLEL", e[1756] = "ER_MTS_INCONSISTENT_DATA", e[1757] = "ER_FULLTEXT_NOT_SUPPORTED_WITH_PARTITIONING", e[1758] = "ER_DA_INVALID_CONDITION_NUMBER", e[1759] = "ER_INSECURE_PLAIN_TEXT", e[1760] = "ER_INSECURE_CHANGE_MASTER", e[1761] = "ER_FOREIGN_DUPLICATE_KEY_WITH_CHILD_INFO", e[1762] = "ER_FOREIGN_DUPLICATE_KEY_WITHOUT_CHILD_INFO", e[1763] = "ER_SQLTHREAD_WITH_SECURE_SLAVE", e[1764] = "ER_TABLE_HAS_NO_FT", e[1765] = "ER_VARIABLE_NOT_SETTABLE_IN_SF_OR_TRIGGER", e[1766] = "ER_VARIABLE_NOT_SETTABLE_IN_TRANSACTION", e[1767] = "ER_GTID_NEXT_IS_NOT_IN_GTID_NEXT_LIST", e[1768] = "ER_CANT_CHANGE_GTID_NEXT_IN_TRANSACTION_WHEN_GTID_NEXT_LIST_IS_NULL", e[1769] = "ER_SET_STATEMENT_CANNOT_INVOKE_FUNCTION", e[1770] = "ER_GTID_NEXT_CANT_BE_AUTOMATIC_IF_GTID_NEXT_LIST_IS_NON_NULL", e[1771] = "ER_SKIPPING_LOGGED_TRANSACTION", e[1772] = "ER_MALFORMED_GTID_SET_SPECIFICATION", e[1773] = "ER_MALFORMED_GTID_SET_ENCODING", e[1774] = "ER_MALFORMED_GTID_SPECIFICATION", e[1775] = "ER_GNO_EXHAUSTED", e[1776] = "ER_BAD_SLAVE_AUTO_POSITION", e[1777] = "ER_AUTO_POSITION_REQUIRES_GTID_MODE_ON", e[1778] = "ER_CANT_DO_IMPLICIT_COMMIT_IN_TRX_WHEN_GTID_NEXT_IS_SET", e[1779] = "ER_GTID_MODE_2_OR_3_REQUIRES_ENFORCE_GTID_CONSISTENCY_ON", e[1780] = "ER_GTID_MODE_REQUIRES_BINLOG", e[1781] = "ER_CANT_SET_GTID_NEXT_TO_GTID_WHEN_GTID_MODE_IS_OFF", e[1782] = "ER_CANT_SET_GTID_NEXT_TO_ANONYMOUS_WHEN_GTID_MODE_IS_ON", e[1783] = "ER_CANT_SET_GTID_NEXT_LIST_TO_NON_NULL_WHEN_GTID_MODE_IS_OFF", e[1784] = "ER_FOUND_GTID_EVENT_WHEN_GTID_MODE_IS_OFF", e[1785] = "ER_GTID_UNSAFE_NON_TRANSACTIONAL_TABLE", e[1786] = "ER_GTID_UNSAFE_CREATE_SELECT", e[1787] = "ER_GTID_UNSAFE_CREATE_DROP_TEMPORARY_TABLE_IN_TRANSACTION", e[1788] = "ER_GTID_MODE_CAN_ONLY_CHANGE_ONE_STEP_AT_A_TIME", e[1789] = "ER_MASTER_HAS_PURGED_REQUIRED_GTIDS", e[1790] = "ER_CANT_SET_GTID_NEXT_WHEN_OWNING_GTID", e[1791] = "ER_UNKNOWN_EXPLAIN_FORMAT", e[1792] = "ER_CANT_EXECUTE_IN_READ_ONLY_TRANSACTION", e[1793] = "ER_TOO_LONG_TABLE_PARTITION_COMMENT", e[1794] = "ER_SLAVE_CONFIGURATION", e[1795] = "ER_INNODB_FT_LIMIT", e[1796] = "ER_INNODB_NO_FT_TEMP_TABLE", e[1797] = "ER_INNODB_FT_WRONG_DOCID_COLUMN", e[1798] = "ER_INNODB_FT_WRONG_DOCID_INDEX", e[1799] = "ER_INNODB_ONLINE_LOG_TOO_BIG", e[1800] = "ER_UNKNOWN_ALTER_ALGORITHM", e[1801] = "ER_UNKNOWN_ALTER_LOCK", e[1802] = "ER_MTS_CHANGE_MASTER_CANT_RUN_WITH_GAPS", e[1803] = "ER_MTS_RECOVERY_FAILURE", e[1804] = "ER_MTS_RESET_WORKERS", e[1805] = "ER_COL_COUNT_DOESNT_MATCH_CORRUPTED_V2", e[1806] = "ER_SLAVE_SILENT_RETRY_TRANSACTION", e[1807] = "ER_UNUSED_22", e[1808] = "ER_TABLE_SCHEMA_MISMATCH", e[1809] = "ER_TABLE_IN_SYSTEM_TABLESPACE", e[1810] = "ER_IO_READ_ERROR", e[1811] = "ER_IO_WRITE_ERROR", e[1812] = "ER_TABLESPACE_MISSING", e[1813] = "ER_TABLESPACE_EXISTS", e[1814] = "ER_TABLESPACE_DISCARDED", e[1815] = "ER_INTERNAL_ERROR", e[1816] = "ER_INNODB_IMPORT_ERROR", e[1817] = "ER_INNODB_INDEX_CORRUPT", e[1818] = "ER_INVALID_YEAR_COLUMN_LENGTH", e[1819] = "ER_NOT_VALID_PASSWORD", e[1820] = "ER_MUST_CHANGE_PASSWORD", e[1821] = "ER_FK_NO_INDEX_CHILD", e[1822] = "ER_FK_NO_INDEX_PARENT", e[1823] = "ER_FK_FAIL_ADD_SYSTEM", e[1824] = "ER_FK_CANNOT_OPEN_PARENT", e[1825] = "ER_FK_INCORRECT_OPTION", e[1826] = "ER_DUP_CONSTRAINT_NAME", e[1827] = "ER_PASSWORD_FORMAT", e[1828] = "ER_FK_COLUMN_CANNOT_DROP", e[1829] = "ER_FK_COLUMN_CANNOT_DROP_CHILD", e[1830] = "ER_FK_COLUMN_NOT_NULL", e[1831] = "ER_DUP_INDEX", e[1832] = "ER_FK_COLUMN_CANNOT_CHANGE", e[1833] = "ER_FK_COLUMN_CANNOT_CHANGE_CHILD", e[1834] = "ER_FK_CANNOT_DELETE_PARENT", e[1835] = "ER_MALFORMED_PACKET", e[1836] = "ER_READ_ONLY_MODE", e[1837] = "ER_GTID_NEXT_TYPE_UNDEFINED_GROUP", e[1838] = "ER_VARIABLE_NOT_SETTABLE_IN_SP", e[1839] = "ER_CANT_SET_GTID_PURGED_WHEN_GTID_MODE_IS_OFF", e[1840] = "ER_CANT_SET_GTID_PURGED_WHEN_GTID_EXECUTED_IS_NOT_EMPTY", e[1841] = "ER_CANT_SET_GTID_PURGED_WHEN_OWNED_GTIDS_IS_NOT_EMPTY", e[1842] = "ER_GTID_PURGED_WAS_CHANGED", e[1843] = "ER_GTID_EXECUTED_WAS_CHANGED", e[1844] = "ER_BINLOG_STMT_MODE_AND_NO_REPL_TABLES", e[1845] = "ER_ALTER_OPERATION_NOT_SUPPORTED", e[1846] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON", e[1847] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COPY", e[1848] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_PARTITION", e[1849] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FK_RENAME", e[1850] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COLUMN_TYPE", e[1851] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FK_CHECK", e[1852] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_IGNORE", e[1853] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_NOPK", e[1854] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_AUTOINC", e[1855] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_HIDDEN_FTS", e[1856] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_CHANGE_FTS", e[1857] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FTS", e[1858] = "ER_SQL_SLAVE_SKIP_COUNTER_NOT_SETTABLE_IN_GTID_MODE", e[1859] = "ER_DUP_UNKNOWN_IN_INDEX", e[1860] = "ER_IDENT_CAUSES_TOO_LONG_PATH", e[1861] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_NOT_NULL", e[1862] = "ER_MUST_CHANGE_PASSWORD_LOGIN", e[1863] = "ER_ROW_IN_WRONG_PARTITION", e[1864] = "ER_MTS_EVENT_BIGGER_PENDING_JOBS_SIZE_MAX", e[1865] = "ER_INNODB_NO_FT_USES_PARSER", e[1866] = "ER_BINLOG_LOGICAL_CORRUPTION", e[1867] = "ER_WARN_PURGE_LOG_IN_USE", e[1868] = "ER_WARN_PURGE_LOG_IS_ACTIVE", e[1869] = "ER_AUTO_INCREMENT_CONFLICT", e[1870] = "WARN_ON_BLOCKHOLE_IN_RBR", e[1871] = "ER_SLAVE_MI_INIT_REPOSITORY", e[1872] = "ER_SLAVE_RLI_INIT_REPOSITORY", e[1873] = "ER_ACCESS_DENIED_CHANGE_USER_ERROR", e[1874] = "ER_INNODB_READ_ONLY", e[1875] = "ER_STOP_SLAVE_SQL_THREAD_TIMEOUT", e[1876] = "ER_STOP_SLAVE_IO_THREAD_TIMEOUT", e[1877] = "ER_TABLE_CORRUPT", e[1878] = "ER_TEMP_FILE_WRITE_FAILURE", e[1879] = "ER_INNODB_FT_AUX_NOT_HEX_ID", e[1880] = "ER_LAST_MYSQL_ERROR_MESSAGE", e[1900] = "ER_UNUSED_18", e[1901] = "ER_GENERATED_COLUMN_FUNCTION_IS_NOT_ALLOWED", e[1902] = "ER_UNUSED_19", e[1903] = "ER_PRIMARY_KEY_BASED_ON_GENERATED_COLUMN", e[1904] = "ER_KEY_BASED_ON_GENERATED_VIRTUAL_COLUMN", e[1905] = "ER_WRONG_FK_OPTION_FOR_GENERATED_COLUMN", e[1906] = "ER_WARNING_NON_DEFAULT_VALUE_FOR_GENERATED_COLUMN", e[1907] = "ER_UNSUPPORTED_ACTION_ON_GENERATED_COLUMN", e[1908] = "ER_UNUSED_20", e[1909] = "ER_UNUSED_21", e[1910] = "ER_UNSUPPORTED_ENGINE_FOR_GENERATED_COLUMNS", e[1911] = "ER_UNKNOWN_OPTION", e[1912] = "ER_BAD_OPTION_VALUE", e[1913] = "ER_UNUSED_6", e[1914] = "ER_UNUSED_7", e[1915] = "ER_UNUSED_8", e[1916] = "ER_DATA_OVERFLOW", e[1917] = "ER_DATA_TRUNCATED", e[1918] = "ER_BAD_DATA", e[1919] = "ER_DYN_COL_WRONG_FORMAT", e[1920] = "ER_DYN_COL_IMPLEMENTATION_LIMIT", e[1921] = "ER_DYN_COL_DATA", e[1922] = "ER_DYN_COL_WRONG_CHARSET", e[1923] = "ER_ILLEGAL_SUBQUERY_OPTIMIZER_SWITCHES", e[1924] = "ER_QUERY_CACHE_IS_DISABLED", e[1925] = "ER_QUERY_CACHE_IS_GLOBALY_DISABLED", e[1926] = "ER_VIEW_ORDERBY_IGNORED", e[1927] = "ER_CONNECTION_KILLED", e[1928] = "ER_UNUSED_12", e[1929] = "ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_SKIP_REPLICATION", e[1930] = "ER_STORED_FUNCTION_PREVENTS_SWITCH_SKIP_REPLICATION", e[1931] = "ER_QUERY_EXCEEDED_ROWS_EXAMINED_LIMIT", e[1932] = "ER_NO_SUCH_TABLE_IN_ENGINE", e[1933] = "ER_TARGET_NOT_EXPLAINABLE", e[1934] = "ER_CONNECTION_ALREADY_EXISTS", e[1935] = "ER_MASTER_LOG_PREFIX", e[1936] = "ER_CANT_START_STOP_SLAVE", e[1937] = "ER_SLAVE_STARTED", e[1938] = "ER_SLAVE_STOPPED", e[1939] = "ER_SQL_DISCOVER_ERROR", e[1940] = "ER_FAILED_GTID_STATE_INIT", e[1941] = "ER_INCORRECT_GTID_STATE", e[1942] = "ER_CANNOT_UPDATE_GTID_STATE", e[1943] = "ER_DUPLICATE_GTID_DOMAIN", e[1944] = "ER_GTID_OPEN_TABLE_FAILED", e[1945] = "ER_GTID_POSITION_NOT_FOUND_IN_BINLOG", e[1946] = "ER_CANNOT_LOAD_SLAVE_GTID_STATE", e[1947] = "ER_MASTER_GTID_POS_CONFLICTS_WITH_BINLOG", e[1948] = "ER_MASTER_GTID_POS_MISSING_DOMAIN", e[1949] = "ER_UNTIL_REQUIRES_USING_GTID", e[1950] = "ER_GTID_STRICT_OUT_OF_ORDER", e[1951] = "ER_GTID_START_FROM_BINLOG_HOLE", e[1952] = "ER_SLAVE_UNEXPECTED_MASTER_SWITCH", e[1953] = "ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_GTID_DOMAIN_ID_SEQ_NO", e[1954] = "ER_STORED_FUNCTION_PREVENTS_SWITCH_GTID_DOMAIN_ID_SEQ_NO", e[1955] = "ER_GTID_POSITION_NOT_FOUND_IN_BINLOG2", e[1956] = "ER_BINLOG_MUST_BE_EMPTY", e[1957] = "ER_NO_SUCH_QUERY", e[1958] = "ER_BAD_BASE64_DATA", e[1959] = "ER_INVALID_ROLE", e[1960] = "ER_INVALID_CURRENT_USER", e[1961] = "ER_CANNOT_GRANT_ROLE", e[1962] = "ER_CANNOT_REVOKE_ROLE", e[1963] = "ER_CHANGE_SLAVE_PARALLEL_THREADS_ACTIVE", e[1964] = "ER_PRIOR_COMMIT_FAILED", e[1965] = "ER_IT_IS_A_VIEW", e[1966] = "ER_SLAVE_SKIP_NOT_IN_GTID", e[1967] = "ER_TABLE_DEFINITION_TOO_BIG", e[1968] = "ER_PLUGIN_INSTALLED", e[1969] = "ER_STATEMENT_TIMEOUT", e[1970] = "ER_SUBQUERIES_NOT_SUPPORTED", e[1971] = "ER_SET_STATEMENT_NOT_SUPPORTED", e[1972] = "ER_UNUSED_9", e[1973] = "ER_USER_CREATE_EXISTS", e[1974] = "ER_USER_DROP_EXISTS", e[1975] = "ER_ROLE_CREATE_EXISTS", e[1976] = "ER_ROLE_DROP_EXISTS", e[1977] = "ER_CANNOT_CONVERT_CHARACTER", e[1978] = "ER_INVALID_DEFAULT_VALUE_FOR_FIELD", e[1979] = "ER_KILL_QUERY_DENIED_ERROR", e[1980] = "ER_NO_EIS_FOR_FIELD", e[1981] = "ER_WARN_AGGFUNC_DEPENDENCE", e[1982] = "WARN_INNODB_PARTITION_OPTION_IGNORED", e[3e3] = "ER_FILE_CORRUPT", e[3001] = "ER_ERROR_ON_MASTER", e[3002] = "ER_INCONSISTENT_ERROR", e[3003] = "ER_STORAGE_ENGINE_NOT_LOADED", e[3004] = "ER_GET_STACKED_DA_WITHOUT_ACTIVE_HANDLER", e[3005] = "ER_WARN_LEGACY_SYNTAX_CONVERTED", e[3006] = "ER_BINLOG_UNSAFE_FULLTEXT_PLUGIN", e[3007] = "ER_CANNOT_DISCARD_TEMPORARY_TABLE", e[3008] = "ER_FK_DEPTH_EXCEEDED", e[3009] = "ER_COL_COUNT_DOESNT_MATCH_PLEASE_UPDATE_V2", e[3010] = "ER_WARN_TRIGGER_DOESNT_HAVE_CREATED", e[3011] = "ER_REFERENCED_TRG_DOES_NOT_EXIST_MYSQL", e[3012] = "ER_EXPLAIN_NOT_SUPPORTED", e[3013] = "ER_INVALID_FIELD_SIZE", e[3014] = "ER_MISSING_HA_CREATE_OPTION", e[3015] = "ER_ENGINE_OUT_OF_MEMORY", e[3016] = "ER_PASSWORD_EXPIRE_ANONYMOUS_USER", e[3017] = "ER_SLAVE_SQL_THREAD_MUST_STOP", e[3018] = "ER_NO_FT_MATERIALIZED_SUBQUERY", e[3019] = "ER_INNODB_UNDO_LOG_FULL", e[3020] = "ER_INVALID_ARGUMENT_FOR_LOGARITHM", e[3021] = "ER_SLAVE_CHANNEL_IO_THREAD_MUST_STOP", e[3022] = "ER_WARN_OPEN_TEMP_TABLES_MUST_BE_ZERO", e[3023] = "ER_WARN_ONLY_MASTER_LOG_FILE_NO_POS", e[3024] = "ER_QUERY_TIMEOUT", e[3025] = "ER_NON_RO_SELECT_DISABLE_TIMER", e[3026] = "ER_DUP_LIST_ENTRY", e[3027] = "ER_SQL_MODE_NO_EFFECT", e[3028] = "ER_AGGREGATE_ORDER_FOR_UNION", e[3029] = "ER_AGGREGATE_ORDER_NON_AGG_QUERY", e[3030] = "ER_SLAVE_WORKER_STOPPED_PREVIOUS_THD_ERROR", e[3031] = "ER_DONT_SUPPORT_SLAVE_PRESERVE_COMMIT_ORDER", e[3032] = "ER_SERVER_OFFLINE_MODE", e[3033] = "ER_GIS_DIFFERENT_SRIDS", e[3034] = "ER_GIS_UNSUPPORTED_ARGUMENT", e[3035] = "ER_GIS_UNKNOWN_ERROR", e[3036] = "ER_GIS_UNKNOWN_EXCEPTION", e[3037] = "ER_GIS_INVALID_DATA", e[3038] = "ER_BOOST_GEOMETRY_EMPTY_INPUT_EXCEPTION", e[3039] = "ER_BOOST_GEOMETRY_CENTROID_EXCEPTION", e[3040] = "ER_BOOST_GEOMETRY_OVERLAY_INVALID_INPUT_EXCEPTION", e[3041] = "ER_BOOST_GEOMETRY_TURN_INFO_EXCEPTION", e[3042] = "ER_BOOST_GEOMETRY_SELF_INTERSECTION_POINT_EXCEPTION", e[3043] = "ER_BOOST_GEOMETRY_UNKNOWN_EXCEPTION", e[3044] = "ER_STD_BAD_ALLOC_ERROR", e[3045] = "ER_STD_DOMAIN_ERROR", e[3046] = "ER_STD_LENGTH_ERROR", e[3047] = "ER_STD_INVALID_ARGUMENT", e[3048] = "ER_STD_OUT_OF_RANGE_ERROR", e[3049] = "ER_STD_OVERFLOW_ERROR", e[3050] = "ER_STD_RANGE_ERROR", e[3051] = "ER_STD_UNDERFLOW_ERROR", e[3052] = "ER_STD_LOGIC_ERROR", e[3053] = "ER_STD_RUNTIME_ERROR", e[3054] = "ER_STD_UNKNOWN_EXCEPTION", e[3055] = "ER_GIS_DATA_WRONG_ENDIANESS", e[3056] = "ER_CHANGE_MASTER_PASSWORD_LENGTH", e[3057] = "ER_USER_LOCK_WRONG_NAME", e[3058] = "ER_USER_LOCK_DEADLOCK", e[3059] = "ER_REPLACE_INACCESSIBLE_ROWS", e[3060] = "ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_GIS", e[4e3] = "ER_UNUSED_26", e[4001] = "ER_UNUSED_27", e[4002] = "ER_WITH_COL_WRONG_LIST", e[4003] = "ER_TOO_MANY_DEFINITIONS_IN_WITH_CLAUSE", e[4004] = "ER_DUP_QUERY_NAME", e[4005] = "ER_RECURSIVE_WITHOUT_ANCHORS", e[4006] = "ER_UNACCEPTABLE_MUTUAL_RECURSION", e[4007] = "ER_REF_TO_RECURSIVE_WITH_TABLE_IN_DERIVED", e[4008] = "ER_NOT_STANDARD_COMPLIANT_RECURSIVE", e[4009] = "ER_WRONG_WINDOW_SPEC_NAME", e[4010] = "ER_DUP_WINDOW_NAME", e[4011] = "ER_PARTITION_LIST_IN_REFERENCING_WINDOW_SPEC", e[4012] = "ER_ORDER_LIST_IN_REFERENCING_WINDOW_SPEC", e[4013] = "ER_WINDOW_FRAME_IN_REFERENCED_WINDOW_SPEC", e[4014] = "ER_BAD_COMBINATION_OF_WINDOW_FRAME_BOUND_SPECS", e[4015] = "ER_WRONG_PLACEMENT_OF_WINDOW_FUNCTION", e[4016] = "ER_WINDOW_FUNCTION_IN_WINDOW_SPEC", e[4017] = "ER_NOT_ALLOWED_WINDOW_FRAME", e[4018] = "ER_NO_ORDER_LIST_IN_WINDOW_SPEC", e[4019] = "ER_RANGE_FRAME_NEEDS_SIMPLE_ORDERBY", e[4020] = "ER_WRONG_TYPE_FOR_ROWS_FRAME", e[4021] = "ER_WRONG_TYPE_FOR_RANGE_FRAME", e[4022] = "ER_FRAME_EXCLUSION_NOT_SUPPORTED", e[4023] = "ER_WINDOW_FUNCTION_DONT_HAVE_FRAME", e[4024] = "ER_INVALID_NTILE_ARGUMENT", e[4025] = "ER_CONSTRAINT_FAILED", e[4026] = "ER_EXPRESSION_IS_TOO_BIG", e[4027] = "ER_ERROR_EVALUATING_EXPRESSION", e[4028] = "ER_CALCULATING_DEFAULT_VALUE", e[4029] = "ER_EXPRESSION_REFERS_TO_UNINIT_FIELD", e[4030] = "ER_PARTITION_DEFAULT_ERROR", e[4031] = "ER_REFERENCED_TRG_DOES_NOT_EXIST", e[4032] = "ER_INVALID_DEFAULT_PARAM", e[4033] = "ER_BINLOG_NON_SUPPORTED_BULK", e[4034] = "ER_BINLOG_UNCOMPRESS_ERROR", e[4035] = "ER_JSON_BAD_CHR", e[4036] = "ER_JSON_NOT_JSON_CHR", e[4037] = "ER_JSON_EOS", e[4038] = "ER_JSON_SYNTAX", e[4039] = "ER_JSON_ESCAPING", e[4040] = "ER_JSON_DEPTH", e[4041] = "ER_JSON_PATH_EOS", e[4042] = "ER_JSON_PATH_SYNTAX", e[4043] = "ER_JSON_PATH_DEPTH", e[4044] = "ER_JSON_PATH_NO_WILDCARD", e[4045] = "ER_JSON_PATH_ARRAY", e[4046] = "ER_JSON_ONE_OR_ALL", e[4047] = "ER_UNSUPPORTED_COMPRESSED_TABLE", e[4048] = "ER_GEOJSON_INCORRECT", e[4049] = "ER_GEOJSON_TOO_FEW_POINTS", e[4050] = "ER_GEOJSON_NOT_CLOSED", e[4051] = "ER_JSON_PATH_EMPTY", e[4052] = "ER_SLAVE_SAME_ID", e[4053] = "ER_FLASHBACK_NOT_SUPPORTED", e[4054] = "ER_KEYS_OUT_OF_ORDER", e[4055] = "ER_OVERLAPPING_KEYS", e[4056] = "ER_REQUIRE_ROW_BINLOG_FORMAT", e[4057] = "ER_ISOLATION_MODE_NOT_SUPPORTED", e[4058] = "ER_ON_DUPLICATE_DISABLED", e[4059] = "ER_UPDATES_WITH_CONSISTENT_SNAPSHOT", e[4060] = "ER_ROLLBACK_ONLY", e[4061] = "ER_ROLLBACK_TO_SAVEPOINT", e[4062] = "ER_ISOLATION_LEVEL_WITH_CONSISTENT_SNAPSHOT", e[4063] = "ER_UNSUPPORTED_COLLATION", e[4064] = "ER_METADATA_INCONSISTENCY", e[4065] = "ER_CF_DIFFERENT", e[4066] = "ER_RDB_TTL_DURATION_FORMAT", e[4067] = "ER_RDB_STATUS_GENERAL", e[4068] = "ER_RDB_STATUS_MSG", e[4069] = "ER_RDB_TTL_UNSUPPORTED", e[4070] = "ER_RDB_TTL_COL_FORMAT", e[4071] = "ER_PER_INDEX_CF_DEPRECATED", e[4072] = "ER_KEY_CREATE_DURING_ALTER", e[4073] = "ER_SK_POPULATE_DURING_ALTER", e[4074] = "ER_SUM_FUNC_WITH_WINDOW_FUNC_AS_ARG", e[4075] = "ER_NET_OK_PACKET_TOO_LARGE", e[4076] = "ER_GEOJSON_EMPTY_COORDINATES", e[4077] = "ER_MYROCKS_CANT_NOPAD_COLLATION", e[4078] = "ER_ILLEGAL_PARAMETER_DATA_TYPES2_FOR_OPERATION", e[4079] = "ER_ILLEGAL_PARAMETER_DATA_TYPE_FOR_OPERATION", e[4080] = "ER_WRONG_PARAMCOUNT_TO_CURSOR", e[4081] = "ER_UNKNOWN_STRUCTURED_VARIABLE", e[4082] = "ER_ROW_VARIABLE_DOES_NOT_HAVE_FIELD", e[4083] = "ER_END_IDENTIFIER_DOES_NOT_MATCH", e[4084] = "ER_SEQUENCE_RUN_OUT", e[4085] = "ER_SEQUENCE_INVALID_DATA", e[4086] = "ER_SEQUENCE_INVALID_TABLE_STRUCTURE", e[4087] = "ER_SEQUENCE_ACCESS_ERROR", e[4088] = "ER_SEQUENCE_BINLOG_FORMAT", e[4089] = "ER_NOT_SEQUENCE", e[4090] = "ER_NOT_SEQUENCE2", e[4091] = "ER_UNKNOWN_SEQUENCES", e[4092] = "ER_UNKNOWN_VIEW", e[4093] = "ER_WRONG_INSERT_INTO_SEQUENCE", e[4094] = "ER_SP_STACK_TRACE", e[4095] = "ER_PACKAGE_ROUTINE_IN_SPEC_NOT_DEFINED_IN_BODY", e[4096] = "ER_PACKAGE_ROUTINE_FORWARD_DECLARATION_NOT_DEFINED", e[4097] = "ER_COMPRESSED_COLUMN_USED_AS_KEY", e[4098] = "ER_UNKNOWN_COMPRESSION_METHOD", e[4099] = "ER_WRONG_NUMBER_OF_VALUES_IN_TVC", e[4100] = "ER_FIELD_REFERENCE_IN_TVC", e[4101] = "ER_WRONG_TYPE_FOR_PERCENTILE_FUNC", e[4102] = "ER_ARGUMENT_NOT_CONSTANT", e[4103] = "ER_ARGUMENT_OUT_OF_RANGE", e[4104] = "ER_WRONG_TYPE_OF_ARGUMENT", e[4105] = "ER_NOT_AGGREGATE_FUNCTION", e[4106] = "ER_INVALID_AGGREGATE_FUNCTION", e[4107] = "ER_INVALID_VALUE_TO_LIMIT", e[4108] = "ER_INVISIBLE_NOT_NULL_WITHOUT_DEFAULT", e[4109] = "ER_UPDATE_INFO_WITH_SYSTEM_VERSIONING", e[4110] = "ER_VERS_FIELD_WRONG_TYPE", e[4111] = "ER_VERS_ENGINE_UNSUPPORTED", e[4112] = "ER_UNUSED_23", e[4113] = "ER_PARTITION_WRONG_TYPE", e[4114] = "WARN_VERS_PART_FULL", e[4115] = "WARN_VERS_PARAMETERS", e[4116] = "ER_VERS_DROP_PARTITION_INTERVAL", e[4117] = "ER_UNUSED_25", e[4118] = "WARN_VERS_PART_NON_HISTORICAL", e[4119] = "ER_VERS_ALTER_NOT_ALLOWED", e[4120] = "ER_VERS_ALTER_ENGINE_PROHIBITED", e[4121] = "ER_VERS_RANGE_PROHIBITED", e[4122] = "ER_CONFLICTING_FOR_SYSTEM_TIME", e[4123] = "ER_VERS_TABLE_MUST_HAVE_COLUMNS", e[4124] = "ER_VERS_NOT_VERSIONED", e[4125] = "ER_MISSING", e[4126] = "ER_VERS_PERIOD_COLUMNS", e[4127] = "ER_PART_WRONG_VALUE", e[4128] = "ER_VERS_WRONG_PARTS", e[4129] = "ER_VERS_NO_TRX_ID", e[4130] = "ER_VERS_ALTER_SYSTEM_FIELD", e[4131] = "ER_DROP_VERSIONING_SYSTEM_TIME_PARTITION", e[4132] = "ER_VERS_DB_NOT_SUPPORTED", e[4133] = "ER_VERS_TRT_IS_DISABLED", e[4134] = "ER_VERS_DUPLICATE_ROW_START_END", e[4135] = "ER_VERS_ALREADY_VERSIONED", e[4136] = "ER_UNUSED_24", e[4137] = "ER_VERS_NOT_SUPPORTED", e[4138] = "ER_VERS_TRX_PART_HISTORIC_ROW_NOT_SUPPORTED", e[4139] = "ER_INDEX_FILE_FULL", e[4140] = "ER_UPDATED_COLUMN_ONLY_ONCE", e[4141] = "ER_EMPTY_ROW_IN_TVC", e[4142] = "ER_VERS_QUERY_IN_PARTITION", e[4143] = "ER_KEY_DOESNT_SUPPORT", e[4144] = "ER_ALTER_OPERATION_TABLE_OPTIONS_NEED_REBUILD", e[4145] = "ER_BACKUP_LOCK_IS_ACTIVE", e[4146] = "ER_BACKUP_NOT_RUNNING", e[4147] = "ER_BACKUP_WRONG_STAGE", e[4148] = "ER_BACKUP_STAGE_FAILED", e[4149] = "ER_BACKUP_UNKNOWN_STAGE", e[4150] = "ER_USER_IS_BLOCKED", e[4151] = "ER_ACCOUNT_HAS_BEEN_LOCKED", e[4152] = "ER_PERIOD_TEMPORARY_NOT_ALLOWED", e[4153] = "ER_PERIOD_TYPES_MISMATCH", e[4154] = "ER_MORE_THAN_ONE_PERIOD", e[4155] = "ER_PERIOD_FIELD_WRONG_ATTRIBUTES", e[4156] = "ER_PERIOD_NOT_FOUND", e[4157] = "ER_PERIOD_COLUMNS_UPDATED", e[4158] = "ER_PERIOD_CONSTRAINT_DROP", e[4159] = "ER_TOO_LONG_KEYPART", e[4160] = "ER_TOO_LONG_DATABASE_COMMENT", e[4161] = "ER_UNKNOWN_DATA_TYPE", e[4162] = "ER_UNKNOWN_OPERATOR", e[4163] = "ER_WARN_HISTORY_ROW_START_TIME", e[4164] = "ER_PART_STARTS_BEYOND_INTERVAL", e[4165] = "ER_GALERA_REPLICATION_NOT_SUPPORTED", e[4166] = "ER_LOAD_INFILE_CAPABILITY_DISABLED", e[4167] = "ER_NO_SECURE_TRANSPORTS_CONFIGURED", e[4168] = "ER_SLAVE_IGNORED_SHARED_TABLE", e[4169] = "ER_NO_AUTOINCREMENT_WITH_UNIQUE", e[4170] = "ER_KEY_CONTAINS_PERIOD_FIELDS", e[4171] = "ER_KEY_CANT_HAVE_WITHOUT_OVERLAPS", e[4172] = "ER_NOT_ALLOWED_IN_THIS_CONTEXT", e[4173] = "ER_DATA_WAS_COMMITED_UNDER_ROLLBACK", e[4174] = "ER_PK_INDEX_CANT_BE_IGNORED", e[4175] = "ER_BINLOG_UNSAFE_SKIP_LOCKED", e[4176] = "ER_JSON_TABLE_ERROR_ON_FIELD", e[4177] = "ER_JSON_TABLE_ALIAS_REQUIRED", e[4178] = "ER_JSON_TABLE_SCALAR_EXPECTED", e[4179] = "ER_JSON_TABLE_MULTIPLE_MATCHES", e[4180] = "ER_WITH_TIES_NEEDS_ORDER", e[4181] = "ER_REMOVED_ORPHAN_TRIGGER", e[4182] = "ER_STORAGE_ENGINE_DISABLED", e[4183] = "WARN_SFORMAT_ERROR", e[4184] = "ER_PARTITION_CONVERT_SUBPARTITIONED", e[4185] = "ER_PROVIDER_NOT_LOADED", e[4186] = "ER_JSON_HISTOGRAM_PARSE_FAILED", e[4187] = "ER_SF_OUT_INOUT_ARG_NOT_ALLOWED", e[4188] = "ER_INCONSISTENT_SLAVE_TEMP_TABLE", e[4189] = "ER_VERS_HIST_PART_FAILED", Qn.codes = e, Qn;
}
Un.exports;
var mc;
function qe() {
  return mc || (mc = 1, function(e) {
    const f = kd();
    class t extends Error {
      constructor(a, o, n, c, i, l, _, d = void 0, p) {
        super(
          (d !== !1 ? `(conn:${c && c.threadId ? c.threadId : -1}, no: ${l || -1}, SQLState: ${i}) ` : "") + a + (o ? `
sql: ` + o : ""),
          p
        ), this.name = "SqlError", this.sqlMessage = a, this.sql = o, this.fatal = n, this.errno = l, this.sqlState = i, l > 45e3 && l < 46e3 ? this.code = r[l] || "UNKNOWN" : this.code = f.codes[this.errno] || "UNKNOWN", _ && (this.stack += `
 From event:
` + _.substring(_.indexOf(`
`) + 1));
      }
      get text() {
        return this.sqlMessage;
      }
    }
    e.exports.createError = function(s, a, o = null, n = "HY000", c = null, i = !1, l = void 0, _ = void 0, d = void 0) {
      return d ? new t(s, c, i, o, n, a, l, _, { cause: d }) : new t(s, c, i, o, n, a, l, _, d);
    }, e.exports.createFatalError = function(s, a, o = null, n = "08S01", c = null, i = void 0, l = void 0) {
      return new t(s, c, !0, o, n, a, i, l);
    }, e.exports.ER_CONNECTION_ALREADY_CLOSED = 45001, e.exports.ER_MYSQL_CHANGE_USER_BUG = 45003, e.exports.ER_CMD_NOT_EXECUTED_DESTROYED = 45004, e.exports.ER_NULL_CHAR_ESCAPEID = 45005, e.exports.ER_NULL_ESCAPEID = 45006, e.exports.ER_NOT_IMPLEMENTED_FORMAT = 45007, e.exports.ER_NODE_NOT_SUPPORTED_TLS = 45008, e.exports.ER_SOCKET_UNEXPECTED_CLOSE = 45009, e.exports.ER_UNEXPECTED_PACKET = 45011, e.exports.ER_CONNECTION_TIMEOUT = 45012, e.exports.ER_CMD_CONNECTION_CLOSED = 45013, e.exports.ER_CHANGE_USER_BAD_PACKET = 45014, e.exports.ER_PING_BAD_PACKET = 45015, e.exports.ER_MISSING_PARAMETER = 45016, e.exports.ER_PARAMETER_UNDEFINED = 45017, e.exports.ER_PLACEHOLDER_UNDEFINED = 45018, e.exports.ER_SOCKET = 45019, e.exports.ER_EOF_EXPECTED = 45020, e.exports.ER_LOCAL_INFILE_DISABLED = 45021, e.exports.ER_LOCAL_INFILE_NOT_READABLE = 45022, e.exports.ER_SERVER_SSL_DISABLED = 45023, e.exports.ER_AUTHENTICATION_BAD_PACKET = 45024, e.exports.ER_AUTHENTICATION_PLUGIN_NOT_SUPPORTED = 45025, e.exports.ER_SOCKET_TIMEOUT = 45026, e.exports.ER_POOL_ALREADY_CLOSED = 45027, e.exports.ER_GET_CONNECTION_TIMEOUT = 45028, e.exports.ER_SETTING_SESSION_ERROR = 45029, e.exports.ER_INITIAL_SQL_ERROR = 45030, e.exports.ER_BATCH_WITH_NO_VALUES = 45031, e.exports.ER_RESET_BAD_PACKET = 45032, e.exports.ER_WRONG_IANA_TIMEZONE = 45033, e.exports.ER_LOCAL_INFILE_WRONG_FILENAME = 45034, e.exports.ER_ADD_CONNECTION_CLOSED_POOL = 45035, e.exports.ER_WRONG_AUTO_TIMEZONE = 45036, e.exports.ER_CLOSING_POOL = 45037, e.exports.ER_TIMEOUT_NOT_SUPPORTED = 45038, e.exports.ER_INITIAL_TIMEOUT_ERROR = 45039, e.exports.ER_DUPLICATE_FIELD = 45040, e.exports.ER_PING_TIMEOUT = 45042, e.exports.ER_BAD_PARAMETER_VALUE = 45043, e.exports.ER_CANNOT_RETRIEVE_RSA_KEY = 45044, e.exports.ER_MINIMUM_NODE_VERSION_REQUIRED = 45045, e.exports.ER_MAX_ALLOWED_PACKET = 45046, e.exports.ER_NOT_SUPPORTED_AUTH_PLUGIN = 45047, e.exports.ER_COMPRESSION_NOT_SUPPORTED = 45048, e.exports.ER_UNDEFINED_SQL = 45049, e.exports.ER_PARSING_PRECISION = 45050, e.exports.ER_PREPARE_CLOSED = 45051, e.exports.ER_MISSING_SQL_PARAMETER = 45052, e.exports.ER_MISSING_SQL_FILE = 45053, e.exports.ER_SQL_FILE_ERROR = 45054, e.exports.ER_MISSING_DATABASE_PARAMETER = 45055, e.exports.ER_SELF_SIGNED = 45056, e.exports.ER_SELF_SIGNED_NO_PWD = 45057, e.exports.ER_PRIVATE_FIELDS_USE = 45058, e.exports.ER_TLS_IDENTITY_ERROR = 45059;
    const u = Object.keys(e.exports), r = {};
    for (let s = 0; s < u.length; s++) {
      const a = u[s];
      a !== "createError" && (r[e.exports[a]] = a);
    }
    e.exports.SqlError = t;
  }(Un)), Un.exports;
}
var Jn, Oc;
function vh() {
  if (Oc) return Jn;
  Oc = 1;
  const e = qe();
  class f {
    update(r, s, a) {
      return this.buf = r, this.pos = s, this.end = a, this;
    }
    skip(r) {
      this.pos += r;
    }
    readGeometry(r) {
      const s = this.readBufferLengthEncoded();
      if (s === null || s.length === 0)
        return r;
      let a = 4;
      return n(!1);
      function o(i) {
        a += 16;
        const l = i ? s.readDoubleLE(a - 16) : s.readDoubleBE(a - 16), _ = i ? s.readDoubleLE(a - 8) : s.readDoubleBE(a - 8);
        return [l, _];
      }
      function n(i) {
        const l = s[a++], _ = l ? s.readInt32LE(a) : s.readInt32BE(a);
        switch (a += 4, _) {
          case 1:
            const d = o(l);
            return i ? d : {
              type: "Point",
              coordinates: d
            };
          case 2:
            const p = l ? s.readInt32LE(a) : s.readInt32BE(a);
            a += 4;
            let E = [];
            for (let A = 0; A < p; A++)
              E.push(o(l));
            return i ? E : {
              type: "LineString",
              coordinates: E
            };
          case 3:
            let h = [];
            const N = l ? s.readInt32LE(a) : s.readInt32BE(a);
            a += 4;
            for (let A = 0; A < N; A++) {
              const C = l ? s.readInt32LE(a) : s.readInt32BE(a);
              a += 4;
              let g = [];
              for (let L = 0; L < C; L++)
                g.push(o(l));
              h.push(g);
            }
            return i ? h : {
              type: "Polygon",
              coordinates: h
            };
          case 4:
            return {
              type: "MultiPoint",
              coordinates: c(l, !0)
            };
          case 5:
            return {
              type: "MultiLineString",
              coordinates: c(l, !0)
            };
          case 6:
            return {
              type: "MultiPolygon",
              coordinates: c(l, !0)
            };
          case 7:
            return {
              type: "GeometryCollection",
              geometries: c(l, !1)
            };
        }
        return null;
      }
      function c(i, l) {
        let _ = [];
        const d = i ? s.readInt32LE(a) : s.readInt32BE(a);
        a += 4;
        for (let p = 0; p < d; p++)
          _.push(n(l));
        return _;
      }
    }
    peek() {
      return this.buf[this.pos];
    }
    remaining() {
      return this.end - this.pos > 0;
    }
    readInt8() {
      const r = this.buf[this.pos++];
      return r | (r & 2 ** 7) * 33554430;
    }
    readUInt8() {
      return this.buf[this.pos++];
    }
    readInt16() {
      const r = this.buf[this.pos++], s = this.buf[this.pos++], a = r + s * 2 ** 8;
      return a | (a & 2 ** 15) * 131070;
    }
    readUInt16() {
      return this.buf[this.pos++] + this.buf[this.pos++] * 2 ** 8;
    }
    readInt24() {
      const r = this.buf[this.pos], s = this.buf[this.pos + 2], a = r + this.buf[this.pos + 1] * 2 ** 8 + s * 2 ** 16;
      return this.pos += 3, a | (a & 2 ** 23) * 510;
    }
    readUInt24() {
      return this.buf[this.pos++] + this.buf[this.pos++] * 2 ** 8 + this.buf[this.pos++] * 2 ** 16;
    }
    readUInt32() {
      return this.buf[this.pos++] + this.buf[this.pos++] * 2 ** 8 + this.buf[this.pos++] * 2 ** 16 + this.buf[this.pos++] * 2 ** 24;
    }
    readInt32() {
      return this.buf[this.pos++] + this.buf[this.pos++] * 2 ** 8 + this.buf[this.pos++] * 2 ** 16 + (this.buf[this.pos++] << 24);
    }
    readBigInt64() {
      const r = this.buf.readBigInt64LE(this.pos);
      return this.pos += 8, r;
    }
    readBigUInt64() {
      const r = this.buf.readBigUInt64LE(this.pos);
      return this.pos += 8, r;
    }
    /**
     * Metadata are length encoded, but cannot have length > 256, so simplified readUnsignedLength
     * @returns {number}
     */
    readMetadataLength() {
      const r = this.buf[this.pos++];
      return r < 251 ? r : this.readUInt16();
    }
    readUnsignedLength() {
      const r = this.buf[this.pos++];
      if (r < 251) return r;
      switch (r) {
        case 251:
          return null;
        case 252:
          return this.buf[this.pos++] + this.buf[this.pos++] * 2 ** 8;
        case 253:
          return this.buf[this.pos++] + this.buf[this.pos++] * 2 ** 8 + this.buf[this.pos++] * 2 ** 16;
        case 254:
          return Number(this.readBigInt64());
      }
    }
    readBuffer(r) {
      return this.pos += r, this.buf.subarray(this.pos - r, this.pos);
    }
    readBufferRemaining() {
      let r = this.buf.subarray(this.pos, this.end);
      return this.pos = this.end, r;
    }
    readBufferLengthEncoded() {
      const r = this.readUnsignedLength();
      return r === null ? null : (this.pos += r, this.buf.subarray(this.pos - r, this.pos));
    }
    readStringNullEnded() {
      let r = this.pos, s = 0;
      for (; this.remaining() > 0 && this.buf[this.pos++] !== 0; )
        s++;
      return this.buf.toString(void 0, r, r + s);
    }
    /**
     * Return unsigned Bigint.
     *
     * Could be used for reading other kind of value than InsertId, if reading possible null value
     * @returns {bigint}
     */
    readInsertId() {
      const r = this.buf[this.pos++];
      if (r < 251) return BigInt(r);
      switch (r) {
        case 252:
          return BigInt(this.buf[this.pos++] + this.buf[this.pos++] * 2 ** 8);
        case 253:
          return BigInt(this.buf[this.pos++] + this.buf[this.pos++] * 2 ** 8 + this.buf[this.pos++] * 2 ** 16);
        case 254:
          return this.readBigInt64();
      }
    }
    readAsciiStringLengthEncoded() {
      const r = this.readUnsignedLength();
      return r === null ? null : (this.pos += r, this.buf.toString("ascii", this.pos - r, this.pos));
    }
    readStringLengthEncoded() {
      throw new Error("code is normally superseded by Node encoder or Iconv depending on charset used");
    }
    readBigIntLengthEncoded() {
      const r = this.buf[this.pos++];
      return r < 16 ? BigInt(this._atoi(r)) : r === 251 ? null : this.readBigIntFromLen(r);
    }
    readBigIntFromLen(r) {
      let s = 0n, a = !1, o = this.pos;
      for (r > 0 && this.buf[o] === 45 && (a = !0, o++); o < this.pos + r; o++)
        s = s * 10n + BigInt(this.buf[o] - 48);
      return this.pos += r, a ? -1n * s : s;
    }
    readDecimalLengthEncoded() {
      const r = this.buf[this.pos++];
      return r === 251 ? null : (this.pos += r, this.buf.toString("ascii", this.pos - r, this.pos));
    }
    readDate() {
      const r = this.buf[this.pos++];
      if (r === 251) return null;
      let s = [], a = 0, o = this.pos;
      for (this.pos += r; o < this.pos; ) {
        const n = this.buf[o++];
        n === 45 ? (s.push(a), a = 0) : a = a * 10 + n - 48;
      }
      return s.push(a), s[0] === 0 && s[1] === 0 && s[2] === 0 ? null : new Date(s[0], s[1] - 1, s[2]);
    }
    readBinaryDate(r) {
      const s = this.buf[this.pos++];
      let a = 0, o = 0, n = 0;
      return s > 0 && (a = this.readInt16(), s > 2 && (o = this.readUInt8() - 1, s > 3 && (n = this.readUInt8()))), a === 0 && o === 0 && n === 0 ? r.dateStrings ? "0000-00-00" : null : r.dateStrings ? `${t(a, 4)}-${t(o + 1, 2)}-${t(n, 2)}` : new Date(a, o, n);
    }
    readDateTime() {
      const r = this.buf[this.pos++];
      if (r === 251) return null;
      this.pos += r;
      const s = this.buf.toString("ascii", this.pos - r, this.pos);
      return s.startsWith("0000-00-00 00:00:00") ? null : new Date(s);
    }
    readBinaryDateTime() {
      const r = this.buf[this.pos++];
      let s = 0, a = 0, o = 0, n = 0, c = 0, i = 0, l = 0;
      return r > 0 && (s = this.readInt16(), r > 2 && (a = this.readUInt8(), r > 3 && (o = this.readUInt8(), r > 4 && (n = this.readUInt8(), c = this.readUInt8(), i = this.readUInt8(), r > 7 && (l = this.readUInt32()))))), s === 0 && a === 0 && o === 0 && n === 0 && c === 0 && i === 0 && l === 0 ? null : new Date(s, a - 1, o, n, c, i, l / 1e3);
    }
    readBinaryDateTimeAsString(r) {
      const s = this.buf[this.pos++];
      let a = 0, o = 0, n = 0, c = 0, i = 0, l = 0, _ = 0;
      return s > 0 && (a = this.readInt16(), s > 2 && (o = this.readUInt8(), s > 3 && (n = this.readUInt8(), s > 4 && (c = this.readUInt8(), i = this.readUInt8(), l = this.readUInt8(), s > 7 && (_ = this.readUInt32()))))), a === 0 && o === 0 && n === 0 && c === 0 && i === 0 && l === 0 && _ === 0 ? "0000-00-00 00:00:00" + (r > 0 ? ".000000".substring(0, r + 1) : "") : t(a, 4) + "-" + t(o, 2) + "-" + t(n, 2) + " " + t(c, 2) + ":" + t(i, 2) + ":" + t(l, 2) + (_ > 0 ? r > 0 ? "." + t(_, 6).substring(0, r) : "." + t(_, 6) : r > 0 ? "." + t(_, 6).substring(0, r) : "");
    }
    readBinaryTime() {
      const r = this.buf[this.pos++];
      let s = !1, a = 0, o = 0, n = 0, c = 0;
      r > 0 && (s = this.buf[this.pos++] === 1, a = this.readUInt32() * 24 + this.readUInt8(), o = this.readUInt8(), n = this.readUInt8(), r > 8 && (c = this.readUInt32()));
      let i = t(a, 2) + ":" + t(o, 2) + ":" + t(n, 2);
      return c > 0 && (i += "." + t(c, 6)), s ? "-" + i : i;
    }
    readFloat() {
      const r = this.buf.readFloatLE(this.pos);
      return this.pos += 4, r;
    }
    readDouble() {
      const r = this.buf.readDoubleLE(this.pos);
      return this.pos += 8, r;
    }
    readIntLengthEncoded() {
      const r = this.buf[this.pos++];
      return r === 251 ? null : this._atoi(r);
    }
    _atoi(r) {
      let s = 0, a = !1, o = this.pos;
      for (r > 0 && this.buf[o] === 45 && (a = !0, o++); o < this.pos + r; o++)
        s = s * 10 + (this.buf[o] - 48);
      return this.pos += r, a ? -1 * s : s;
    }
    readFloatLengthCoded() {
      const r = this.readUnsignedLength();
      return r === null ? null : (this.pos += r, +this.buf.toString("ascii", this.pos - r, this.pos));
    }
    skipLengthCodedNumber() {
      const r = this.buf[this.pos++];
      switch (r) {
        case 251:
          return;
        case 252:
          this.pos += 2 + (65535 & this.buf[this.pos] + (this.buf[this.pos + 1] << 8));
          return;
        case 253:
          this.pos += 3 + (16777215 & this.buf[this.pos] + (this.buf[this.pos + 1] << 8) + (this.buf[this.pos + 2] << 16));
          return;
        case 254:
          this.pos += 8 + Number(this.buf.readBigUInt64LE(this.pos));
          return;
        default:
          this.pos += r;
          return;
      }
    }
    length() {
      return this.end - this.pos;
    }
    subPacketLengthEncoded(r) {
    }
    /**
     * Parse ERR_Packet : https://mariadb.com/kb/en/library/err_packet/
     *
     * @param info              current connection info
     * @param sql               command sql
     * @param stack             additional stack trace
     * @returns {Error}
     */
    readError(r, s, a) {
      this.skip(1);
      let o = this.readUInt16(), n, c;
      this.peek() === 35 ? (this.skip(6), n = this.buf.toString(void 0, this.pos - 5, this.pos), c = this.readStringNullEnded()) : (n = "HY000", c = this.buf.toString(void 0, this.pos, this.end));
      let i = n.startsWith("08") || n === "70100";
      return e.createError(c, o, r, n, s, i, a);
    }
  }
  const t = (u, r) => {
    let s = u.toString();
    for (; s.length < r; )
      s = "0" + s;
    return s;
  };
  return Jn = f, Jn;
}
var Zn, wc;
function Hd() {
  if (wc) return Zn;
  wc = 1;
  const e = vh();
  class f extends e {
    constructor(u) {
      super(), this.encoding = u === "utf8" ? void 0 : u;
    }
    readStringLengthEncoded() {
      const u = this.readUnsignedLength();
      return u === null ? null : (this.pos += u, this.buf.toString(this.encoding, this.pos - u, this.pos));
    }
    static readString(u, r, s, a) {
      return r.toString(u, s, s + a);
    }
    subPacketLengthEncoded(u) {
      return this.skip(u), new f(this.encoding).update(this.buf, this.pos - u, this.pos);
    }
    readStringRemaining() {
      const u = this.buf.toString(this.encoding, this.pos, this.end);
      return this.pos = this.end, u;
    }
  }
  return Zn = f, Zn;
}
var ei = { exports: {} }, ti, Pc;
function kt() {
  if (Pc) return ti;
  Pc = 1;
  var e = Dd, f = e.Buffer, t = {}, u;
  for (u in e)
    e.hasOwnProperty(u) && (u === "SlowBuffer" || u === "Buffer" || (t[u] = e[u]));
  var r = t.Buffer = {};
  for (u in f)
    f.hasOwnProperty(u) && (u === "allocUnsafe" || u === "allocUnsafeSlow" || (r[u] = f[u]));
  if (t.Buffer.prototype = f.prototype, (!r.from || r.from === Uint8Array.from) && (r.from = function(s, a, o) {
    if (typeof s == "number")
      throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof s);
    if (s && typeof s.length > "u")
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof s);
    return f(s, a, o);
  }), r.alloc || (r.alloc = function(s, a, o) {
    if (typeof s != "number")
      throw new TypeError('The "size" argument must be of type number. Received type ' + typeof s);
    if (s < 0 || s >= 2 * (1 << 30))
      throw new RangeError('The value "' + s + '" is invalid for option "size"');
    var n = f(s);
    return !a || a.length === 0 ? n.fill(0) : typeof o == "string" ? n.fill(a, o) : n.fill(a), n;
  }), !t.kStringMaxLength)
    try {
      t.kStringMaxLength = process.binding("buffer").kStringMaxLength;
    } catch {
    }
  return t.constants || (t.constants = {
    MAX_LENGTH: t.kMaxLength
  }, t.kStringMaxLength && (t.constants.MAX_STRING_LENGTH = t.kStringMaxLength)), ti = t, ti;
}
var fn = {}, Dc;
function Gd() {
  if (Dc) return fn;
  Dc = 1;
  var e = "\uFEFF";
  fn.PrependBOM = f;
  function f(u, r) {
    this.encoder = u, this.addBOM = !0;
  }
  f.prototype.write = function(u) {
    return this.addBOM && (u = e + u, this.addBOM = !1), this.encoder.write(u);
  }, f.prototype.end = function() {
    return this.encoder.end();
  }, fn.StripBOM = t;
  function t(u, r) {
    this.decoder = u, this.pass = !1, this.options = r || {};
  }
  return t.prototype.write = function(u) {
    var r = this.decoder.write(u);
    return this.pass || !r || (r[0] === e && (r = r.slice(1), typeof this.options.stripBOM == "function" && this.options.stripBOM()), this.pass = !0), r;
  }, t.prototype.end = function() {
    return this.decoder.end();
  }, fn;
}
var ri = {}, ni, Uc;
function qd() {
  if (Uc) return ni;
  Uc = 1;
  var e = kt().Buffer;
  ni = {
    // Encodings
    utf8: { type: "_internal", bomAware: !0 },
    cesu8: { type: "_internal", bomAware: !0 },
    unicode11utf8: "utf8",
    ucs2: { type: "_internal", bomAware: !0 },
    utf16le: "ucs2",
    binary: { type: "_internal" },
    base64: { type: "_internal" },
    hex: { type: "_internal" },
    // Codec.
    _internal: f
  };
  function f(n, c) {
    this.enc = n.encodingName, this.bomAware = n.bomAware, this.enc === "base64" ? this.encoder = s : this.enc === "cesu8" && (this.enc = "utf8", this.encoder = a, e.from("eda0bdedb2a9", "hex").toString() !== "💩" && (this.decoder = o, this.defaultCharUnicode = c.defaultCharUnicode));
  }
  f.prototype.encoder = r, f.prototype.decoder = u;
  var t = Ph.StringDecoder;
  t.prototype.end || (t.prototype.end = function() {
  });
  function u(n, c) {
    this.decoder = new t(c.enc);
  }
  u.prototype.write = function(n) {
    return e.isBuffer(n) || (n = e.from(n)), this.decoder.write(n);
  }, u.prototype.end = function() {
    return this.decoder.end();
  };
  function r(n, c) {
    this.enc = c.enc;
  }
  r.prototype.write = function(n) {
    return e.from(n, this.enc);
  }, r.prototype.end = function() {
  };
  function s(n, c) {
    this.prevStr = "";
  }
  s.prototype.write = function(n) {
    n = this.prevStr + n;
    var c = n.length - n.length % 4;
    return this.prevStr = n.slice(c), n = n.slice(0, c), e.from(n, "base64");
  }, s.prototype.end = function() {
    return e.from(this.prevStr, "base64");
  };
  function a(n, c) {
  }
  a.prototype.write = function(n) {
    for (var c = e.alloc(n.length * 3), i = 0, l = 0; l < n.length; l++) {
      var _ = n.charCodeAt(l);
      _ < 128 ? c[i++] = _ : _ < 2048 ? (c[i++] = 192 + (_ >>> 6), c[i++] = 128 + (_ & 63)) : (c[i++] = 224 + (_ >>> 12), c[i++] = 128 + (_ >>> 6 & 63), c[i++] = 128 + (_ & 63));
    }
    return c.slice(0, i);
  }, a.prototype.end = function() {
  };
  function o(n, c) {
    this.acc = 0, this.contBytes = 0, this.accBytes = 0, this.defaultCharUnicode = c.defaultCharUnicode;
  }
  return o.prototype.write = function(n) {
    for (var c = this.acc, i = this.contBytes, l = this.accBytes, _ = "", d = 0; d < n.length; d++) {
      var p = n[d];
      (p & 192) !== 128 ? (i > 0 && (_ += this.defaultCharUnicode, i = 0), p < 128 ? _ += String.fromCharCode(p) : p < 224 ? (c = p & 31, i = 1, l = 1) : p < 240 ? (c = p & 15, i = 2, l = 1) : _ += this.defaultCharUnicode) : i > 0 ? (c = c << 6 | p & 63, i--, l++, i === 0 && (l === 2 && c < 128 && c > 0 ? _ += this.defaultCharUnicode : l === 3 && c < 2048 ? _ += this.defaultCharUnicode : _ += String.fromCharCode(c))) : _ += this.defaultCharUnicode;
    }
    return this.acc = c, this.contBytes = i, this.accBytes = l, _;
  }, o.prototype.end = function() {
    var n = 0;
    return this.contBytes > 0 && (n += this.defaultCharUnicode), n;
  }, ni;
}
var mt = {}, Lc;
function $d() {
  if (Lc) return mt;
  Lc = 1;
  var e = kt().Buffer;
  mt._utf32 = f;
  function f(c, i) {
    this.iconv = i, this.bomAware = !0, this.isLE = c.isLE;
  }
  mt.utf32le = { type: "_utf32", isLE: !0 }, mt.utf32be = { type: "_utf32", isLE: !1 }, mt.ucs4le = "utf32le", mt.ucs4be = "utf32be", f.prototype.encoder = t, f.prototype.decoder = u;
  function t(c, i) {
    this.isLE = i.isLE, this.highSurrogate = 0;
  }
  t.prototype.write = function(c) {
    for (var i = e.from(c, "ucs2"), l = e.alloc(i.length * 2), _ = this.isLE ? l.writeUInt32LE : l.writeUInt32BE, d = 0, p = 0; p < i.length; p += 2) {
      var E = i.readUInt16LE(p), h = 55296 <= E && E < 56320, N = 56320 <= E && E < 57344;
      if (this.highSurrogate)
        if (h || !N)
          _.call(l, this.highSurrogate, d), d += 4;
        else {
          var A = (this.highSurrogate - 55296 << 10 | E - 56320) + 65536;
          _.call(l, A, d), d += 4, this.highSurrogate = 0;
          continue;
        }
      h ? this.highSurrogate = E : (_.call(l, E, d), d += 4, this.highSurrogate = 0);
    }
    return d < l.length && (l = l.slice(0, d)), l;
  }, t.prototype.end = function() {
    if (this.highSurrogate) {
      var c = e.alloc(4);
      return this.isLE ? c.writeUInt32LE(this.highSurrogate, 0) : c.writeUInt32BE(this.highSurrogate, 0), this.highSurrogate = 0, c;
    }
  };
  function u(c, i) {
    this.isLE = i.isLE, this.badChar = i.iconv.defaultCharUnicode.charCodeAt(0), this.overflow = [];
  }
  u.prototype.write = function(c) {
    if (c.length === 0)
      return "";
    var i = 0, l = 0, _ = e.alloc(c.length + 4), d = 0, p = this.isLE, E = this.overflow, h = this.badChar;
    if (E.length > 0) {
      for (; i < c.length && E.length < 4; i++)
        E.push(c[i]);
      E.length === 4 && (p ? l = E[i] | E[i + 1] << 8 | E[i + 2] << 16 | E[i + 3] << 24 : l = E[i + 3] | E[i + 2] << 8 | E[i + 1] << 16 | E[i] << 24, E.length = 0, d = r(_, d, l, h));
    }
    for (; i < c.length - 3; i += 4)
      p ? l = c[i] | c[i + 1] << 8 | c[i + 2] << 16 | c[i + 3] << 24 : l = c[i + 3] | c[i + 2] << 8 | c[i + 1] << 16 | c[i] << 24, d = r(_, d, l, h);
    for (; i < c.length; i++)
      E.push(c[i]);
    return _.slice(0, d).toString("ucs2");
  };
  function r(c, i, l, _) {
    if ((l < 0 || l > 1114111) && (l = _), l >= 65536) {
      l -= 65536;
      var d = 55296 | l >> 10;
      c[i++] = d & 255, c[i++] = d >> 8;
      var l = 56320 | l & 1023;
    }
    return c[i++] = l & 255, c[i++] = l >> 8, i;
  }
  u.prototype.end = function() {
    this.overflow.length = 0;
  }, mt.utf32 = s, mt.ucs4 = "utf32";
  function s(c, i) {
    this.iconv = i;
  }
  s.prototype.encoder = a, s.prototype.decoder = o;
  function a(c, i) {
    c = c || {}, c.addBOM === void 0 && (c.addBOM = !0), this.encoder = i.iconv.getEncoder(c.defaultEncoding || "utf-32le", c);
  }
  a.prototype.write = function(c) {
    return this.encoder.write(c);
  }, a.prototype.end = function() {
    return this.encoder.end();
  };
  function o(c, i) {
    this.decoder = null, this.initialBufs = [], this.initialBufsLen = 0, this.options = c || {}, this.iconv = i.iconv;
  }
  o.prototype.write = function(c) {
    if (!this.decoder) {
      if (this.initialBufs.push(c), this.initialBufsLen += c.length, this.initialBufsLen < 32)
        return "";
      var i = n(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(i, this.options);
      for (var l = "", _ = 0; _ < this.initialBufs.length; _++)
        l += this.decoder.write(this.initialBufs[_]);
      return this.initialBufs.length = this.initialBufsLen = 0, l;
    }
    return this.decoder.write(c);
  }, o.prototype.end = function() {
    if (!this.decoder) {
      var c = n(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(c, this.options);
      for (var i = "", l = 0; l < this.initialBufs.length; l++)
        i += this.decoder.write(this.initialBufs[l]);
      var _ = this.decoder.end();
      return _ && (i += _), this.initialBufs.length = this.initialBufsLen = 0, i;
    }
    return this.decoder.end();
  };
  function n(c, i) {
    var l = [], _ = 0, d = 0, p = 0, E = 0, h = 0;
    e:
      for (var N = 0; N < c.length; N++)
        for (var A = c[N], C = 0; C < A.length; C++)
          if (l.push(A[C]), l.length === 4) {
            if (_ === 0) {
              if (l[0] === 255 && l[1] === 254 && l[2] === 0 && l[3] === 0)
                return "utf-32le";
              if (l[0] === 0 && l[1] === 0 && l[2] === 254 && l[3] === 255)
                return "utf-32be";
            }
            if ((l[0] !== 0 || l[1] > 16) && p++, (l[3] !== 0 || l[2] > 16) && d++, l[0] === 0 && l[1] === 0 && (l[2] !== 0 || l[3] !== 0) && h++, (l[0] !== 0 || l[1] !== 0) && l[2] === 0 && l[3] === 0 && E++, l.length = 0, _++, _ >= 100)
              break e;
          }
    return h - p > E - d ? "utf-32be" : h - p < E - d ? "utf-32le" : i || "utf-32le";
  }
  return mt;
}
var hn = {}, bc;
function Vd() {
  if (bc) return hn;
  bc = 1;
  var e = kt().Buffer;
  hn.utf16be = f;
  function f() {
  }
  f.prototype.encoder = t, f.prototype.decoder = u, f.prototype.bomAware = !0;
  function t() {
  }
  t.prototype.write = function(n) {
    for (var c = e.from(n, "ucs2"), i = 0; i < c.length; i += 2) {
      var l = c[i];
      c[i] = c[i + 1], c[i + 1] = l;
    }
    return c;
  }, t.prototype.end = function() {
  };
  function u() {
    this.overflowByte = -1;
  }
  u.prototype.write = function(n) {
    if (n.length == 0)
      return "";
    var c = e.alloc(n.length + 1), i = 0, l = 0;
    for (this.overflowByte !== -1 && (c[0] = n[0], c[1] = this.overflowByte, i = 1, l = 2); i < n.length - 1; i += 2, l += 2)
      c[l] = n[i + 1], c[l + 1] = n[i];
    return this.overflowByte = i == n.length - 1 ? n[n.length - 1] : -1, c.slice(0, l).toString("ucs2");
  }, u.prototype.end = function() {
    this.overflowByte = -1;
  }, hn.utf16 = r;
  function r(n, c) {
    this.iconv = c;
  }
  r.prototype.encoder = s, r.prototype.decoder = a;
  function s(n, c) {
    n = n || {}, n.addBOM === void 0 && (n.addBOM = !0), this.encoder = c.iconv.getEncoder("utf-16le", n);
  }
  s.prototype.write = function(n) {
    return this.encoder.write(n);
  }, s.prototype.end = function() {
    return this.encoder.end();
  };
  function a(n, c) {
    this.decoder = null, this.initialBufs = [], this.initialBufsLen = 0, this.options = n || {}, this.iconv = c.iconv;
  }
  a.prototype.write = function(n) {
    if (!this.decoder) {
      if (this.initialBufs.push(n), this.initialBufsLen += n.length, this.initialBufsLen < 16)
        return "";
      var c = o(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(c, this.options);
      for (var i = "", l = 0; l < this.initialBufs.length; l++)
        i += this.decoder.write(this.initialBufs[l]);
      return this.initialBufs.length = this.initialBufsLen = 0, i;
    }
    return this.decoder.write(n);
  }, a.prototype.end = function() {
    if (!this.decoder) {
      var n = o(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(n, this.options);
      for (var c = "", i = 0; i < this.initialBufs.length; i++)
        c += this.decoder.write(this.initialBufs[i]);
      var l = this.decoder.end();
      return l && (c += l), this.initialBufs.length = this.initialBufsLen = 0, c;
    }
    return this.decoder.end();
  };
  function o(n, c) {
    var i = [], l = 0, _ = 0, d = 0;
    e:
      for (var p = 0; p < n.length; p++)
        for (var E = n[p], h = 0; h < E.length; h++)
          if (i.push(E[h]), i.length === 2) {
            if (l === 0) {
              if (i[0] === 255 && i[1] === 254) return "utf-16le";
              if (i[0] === 254 && i[1] === 255) return "utf-16be";
            }
            if (i[0] === 0 && i[1] !== 0 && d++, i[0] !== 0 && i[1] === 0 && _++, i.length = 0, l++, l >= 100)
              break e;
          }
    return d > _ ? "utf-16be" : d < _ ? "utf-16le" : c || "utf-16le";
  }
  return hn;
}
var Cr = {}, yc;
function Wd() {
  if (yc) return Cr;
  yc = 1;
  var e = kt().Buffer;
  Cr.utf7 = f, Cr.unicode11utf7 = "utf7";
  function f(E, h) {
    this.iconv = h;
  }
  f.prototype.encoder = u, f.prototype.decoder = r, f.prototype.bomAware = !0;
  var t = /[^A-Za-z0-9'\(\),-\.\/:\? \n\r\t]+/g;
  function u(E, h) {
    this.iconv = h.iconv;
  }
  u.prototype.write = function(E) {
    return e.from(E.replace(t, (function(h) {
      return "+" + (h === "+" ? "" : this.iconv.encode(h, "utf16-be").toString("base64").replace(/=+$/, "")) + "-";
    }).bind(this)));
  }, u.prototype.end = function() {
  };
  function r(E, h) {
    this.iconv = h.iconv, this.inBase64 = !1, this.base64Accum = "";
  }
  for (var s = /[A-Za-z0-9\/+]/, a = [], o = 0; o < 256; o++)
    a[o] = s.test(String.fromCharCode(o));
  var n = 43, c = 45, i = 38;
  r.prototype.write = function(E) {
    for (var h = "", N = 0, A = this.inBase64, C = this.base64Accum, g = 0; g < E.length; g++)
      if (!A)
        E[g] == n && (h += this.iconv.decode(E.slice(N, g), "ascii"), N = g + 1, A = !0);
      else if (!a[E[g]]) {
        if (g == N && E[g] == c)
          h += "+";
        else {
          var L = C + this.iconv.decode(E.slice(N, g), "ascii");
          h += this.iconv.decode(e.from(L, "base64"), "utf16-be");
        }
        E[g] != c && g--, N = g + 1, A = !1, C = "";
      }
    if (!A)
      h += this.iconv.decode(E.slice(N), "ascii");
    else {
      var L = C + this.iconv.decode(E.slice(N), "ascii"), R = L.length - L.length % 8;
      C = L.slice(R), L = L.slice(0, R), h += this.iconv.decode(e.from(L, "base64"), "utf16-be");
    }
    return this.inBase64 = A, this.base64Accum = C, h;
  }, r.prototype.end = function() {
    var E = "";
    return this.inBase64 && this.base64Accum.length > 0 && (E = this.iconv.decode(e.from(this.base64Accum, "base64"), "utf16-be")), this.inBase64 = !1, this.base64Accum = "", E;
  }, Cr.utf7imap = l;
  function l(E, h) {
    this.iconv = h;
  }
  l.prototype.encoder = _, l.prototype.decoder = d, l.prototype.bomAware = !0;
  function _(E, h) {
    this.iconv = h.iconv, this.inBase64 = !1, this.base64Accum = e.alloc(6), this.base64AccumIdx = 0;
  }
  _.prototype.write = function(E) {
    for (var h = this.inBase64, N = this.base64Accum, A = this.base64AccumIdx, C = e.alloc(E.length * 5 + 10), g = 0, L = 0; L < E.length; L++) {
      var R = E.charCodeAt(L);
      32 <= R && R <= 126 ? (h && (A > 0 && (g += C.write(N.slice(0, A).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), g), A = 0), C[g++] = c, h = !1), h || (C[g++] = R, R === i && (C[g++] = c))) : (h || (C[g++] = i, h = !0), h && (N[A++] = R >> 8, N[A++] = R & 255, A == N.length && (g += C.write(N.toString("base64").replace(/\//g, ","), g), A = 0)));
    }
    return this.inBase64 = h, this.base64AccumIdx = A, C.slice(0, g);
  }, _.prototype.end = function() {
    var E = e.alloc(10), h = 0;
    return this.inBase64 && (this.base64AccumIdx > 0 && (h += E.write(this.base64Accum.slice(0, this.base64AccumIdx).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), h), this.base64AccumIdx = 0), E[h++] = c, this.inBase64 = !1), E.slice(0, h);
  };
  function d(E, h) {
    this.iconv = h.iconv, this.inBase64 = !1, this.base64Accum = "";
  }
  var p = a.slice();
  return p[44] = !0, d.prototype.write = function(E) {
    for (var h = "", N = 0, A = this.inBase64, C = this.base64Accum, g = 0; g < E.length; g++)
      if (!A)
        E[g] == i && (h += this.iconv.decode(E.slice(N, g), "ascii"), N = g + 1, A = !0);
      else if (!p[E[g]]) {
        if (g == N && E[g] == c)
          h += "&";
        else {
          var L = C + this.iconv.decode(E.slice(N, g), "ascii").replace(/,/g, "/");
          h += this.iconv.decode(e.from(L, "base64"), "utf16-be");
        }
        E[g] != c && g--, N = g + 1, A = !1, C = "";
      }
    if (!A)
      h += this.iconv.decode(E.slice(N), "ascii");
    else {
      var L = C + this.iconv.decode(E.slice(N), "ascii").replace(/,/g, "/"), R = L.length - L.length % 8;
      C = L.slice(R), L = L.slice(0, R), h += this.iconv.decode(e.from(L, "base64"), "utf16-be");
    }
    return this.inBase64 = A, this.base64Accum = C, h;
  }, d.prototype.end = function() {
    var E = "";
    return this.inBase64 && this.base64Accum.length > 0 && (E = this.iconv.decode(e.from(this.base64Accum, "base64"), "utf16-be")), this.inBase64 = !1, this.base64Accum = "", E;
  }, Cr;
}
var ii = {}, vc;
function jd() {
  if (vc) return ii;
  vc = 1;
  var e = kt().Buffer;
  ii._sbcs = f;
  function f(r, s) {
    if (!r)
      throw new Error("SBCS codec is called without the data.");
    if (!r.chars || r.chars.length !== 128 && r.chars.length !== 256)
      throw new Error("Encoding '" + r.type + "' has incorrect 'chars' (must be of len 128 or 256)");
    if (r.chars.length === 128) {
      for (var a = "", o = 0; o < 128; o++)
        a += String.fromCharCode(o);
      r.chars = a + r.chars;
    }
    this.decodeBuf = e.from(r.chars, "ucs2");
    for (var n = e.alloc(65536, s.defaultCharSingleByte.charCodeAt(0)), o = 0; o < r.chars.length; o++)
      n[r.chars.charCodeAt(o)] = o;
    this.encodeBuf = n;
  }
  f.prototype.encoder = t, f.prototype.decoder = u;
  function t(r, s) {
    this.encodeBuf = s.encodeBuf;
  }
  t.prototype.write = function(r) {
    for (var s = e.alloc(r.length), a = 0; a < r.length; a++)
      s[a] = this.encodeBuf[r.charCodeAt(a)];
    return s;
  }, t.prototype.end = function() {
  };
  function u(r, s) {
    this.decodeBuf = s.decodeBuf;
  }
  return u.prototype.write = function(r) {
    for (var s = this.decodeBuf, a = e.alloc(r.length * 2), o = 0, n = 0, c = 0; c < r.length; c++)
      o = r[c] * 2, n = c * 2, a[n] = s[o], a[n + 1] = s[o + 1];
    return a.toString("ucs2");
  }, u.prototype.end = function() {
  }, ii;
}
var si, Fc;
function Yd() {
  return Fc || (Fc = 1, si = {
    // Not supported by iconv, not sure why.
    10029: "maccenteuro",
    maccenteuro: {
      type: "_sbcs",
      chars: "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ"
    },
    808: "cp808",
    ibm808: "cp808",
    cp808: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№€■ "
    },
    mik: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя└┴┬├─┼╣║╚╔╩╦╠═╬┐░▒▓│┤№§╗╝┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    cp720: {
      type: "_sbcs",
      chars: "éâàçêëèïîّْô¤ـûùءآأؤ£إئابةتثجحخدذرزسشص«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ضطظعغفµقكلمنهوىي≡ًٌٍَُِ≈°∙·√ⁿ²■ "
    },
    // Aliases of generated encodings.
    ascii8bit: "ascii",
    usascii: "ascii",
    ansix34: "ascii",
    ansix341968: "ascii",
    ansix341986: "ascii",
    csascii: "ascii",
    cp367: "ascii",
    ibm367: "ascii",
    isoir6: "ascii",
    iso646us: "ascii",
    iso646irv: "ascii",
    us: "ascii",
    latin1: "iso88591",
    latin2: "iso88592",
    latin3: "iso88593",
    latin4: "iso88594",
    latin5: "iso88599",
    latin6: "iso885910",
    latin7: "iso885913",
    latin8: "iso885914",
    latin9: "iso885915",
    latin10: "iso885916",
    csisolatin1: "iso88591",
    csisolatin2: "iso88592",
    csisolatin3: "iso88593",
    csisolatin4: "iso88594",
    csisolatincyrillic: "iso88595",
    csisolatinarabic: "iso88596",
    csisolatingreek: "iso88597",
    csisolatinhebrew: "iso88598",
    csisolatin5: "iso88599",
    csisolatin6: "iso885910",
    l1: "iso88591",
    l2: "iso88592",
    l3: "iso88593",
    l4: "iso88594",
    l5: "iso88599",
    l6: "iso885910",
    l7: "iso885913",
    l8: "iso885914",
    l9: "iso885915",
    l10: "iso885916",
    isoir14: "iso646jp",
    isoir57: "iso646cn",
    isoir100: "iso88591",
    isoir101: "iso88592",
    isoir109: "iso88593",
    isoir110: "iso88594",
    isoir144: "iso88595",
    isoir127: "iso88596",
    isoir126: "iso88597",
    isoir138: "iso88598",
    isoir148: "iso88599",
    isoir157: "iso885910",
    isoir166: "tis620",
    isoir179: "iso885913",
    isoir199: "iso885914",
    isoir203: "iso885915",
    isoir226: "iso885916",
    cp819: "iso88591",
    ibm819: "iso88591",
    cyrillic: "iso88595",
    arabic: "iso88596",
    arabic8: "iso88596",
    ecma114: "iso88596",
    asmo708: "iso88596",
    greek: "iso88597",
    greek8: "iso88597",
    ecma118: "iso88597",
    elot928: "iso88597",
    hebrew: "iso88598",
    hebrew8: "iso88598",
    turkish: "iso88599",
    turkish8: "iso88599",
    thai: "iso885911",
    thai8: "iso885911",
    celtic: "iso885914",
    celtic8: "iso885914",
    isoceltic: "iso885914",
    tis6200: "tis620",
    tis62025291: "tis620",
    tis62025330: "tis620",
    1e4: "macroman",
    10006: "macgreek",
    10007: "maccyrillic",
    10079: "maciceland",
    10081: "macturkish",
    cspc8codepage437: "cp437",
    cspc775baltic: "cp775",
    cspc850multilingual: "cp850",
    cspcp852: "cp852",
    cspc862latinhebrew: "cp862",
    cpgr: "cp869",
    msee: "cp1250",
    mscyrl: "cp1251",
    msansi: "cp1252",
    msgreek: "cp1253",
    msturk: "cp1254",
    mshebr: "cp1255",
    msarab: "cp1256",
    winbaltrim: "cp1257",
    cp20866: "koi8r",
    20866: "koi8r",
    ibm878: "koi8r",
    cskoi8r: "koi8r",
    cp21866: "koi8u",
    21866: "koi8u",
    ibm1168: "koi8u",
    strk10482002: "rk1048",
    tcvn5712: "tcvn",
    tcvn57121: "tcvn",
    gb198880: "iso646cn",
    cn: "iso646cn",
    csiso14jisc6220ro: "iso646jp",
    jisc62201969ro: "iso646jp",
    jp: "iso646jp",
    cshproman8: "hproman8",
    r8: "hproman8",
    roman8: "hproman8",
    xroman8: "hproman8",
    ibm1051: "hproman8",
    mac: "macintosh",
    csmacintosh: "macintosh"
  }), si;
}
var ai, Mc;
function Kd() {
  return Mc || (Mc = 1, ai = {
    437: "cp437",
    737: "cp737",
    775: "cp775",
    850: "cp850",
    852: "cp852",
    855: "cp855",
    856: "cp856",
    857: "cp857",
    858: "cp858",
    860: "cp860",
    861: "cp861",
    862: "cp862",
    863: "cp863",
    864: "cp864",
    865: "cp865",
    866: "cp866",
    869: "cp869",
    874: "windows874",
    922: "cp922",
    1046: "cp1046",
    1124: "cp1124",
    1125: "cp1125",
    1129: "cp1129",
    1133: "cp1133",
    1161: "cp1161",
    1162: "cp1162",
    1163: "cp1163",
    1250: "windows1250",
    1251: "windows1251",
    1252: "windows1252",
    1253: "windows1253",
    1254: "windows1254",
    1255: "windows1255",
    1256: "windows1256",
    1257: "windows1257",
    1258: "windows1258",
    28591: "iso88591",
    28592: "iso88592",
    28593: "iso88593",
    28594: "iso88594",
    28595: "iso88595",
    28596: "iso88596",
    28597: "iso88597",
    28598: "iso88598",
    28599: "iso88599",
    28600: "iso885910",
    28601: "iso885911",
    28603: "iso885913",
    28604: "iso885914",
    28605: "iso885915",
    28606: "iso885916",
    windows874: {
      type: "_sbcs",
      chars: "€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    win874: "windows874",
    cp874: "windows874",
    windows1250: {
      type: "_sbcs",
      chars: "€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
    },
    win1250: "windows1250",
    cp1250: "windows1250",
    windows1251: {
      type: "_sbcs",
      chars: "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    win1251: "windows1251",
    cp1251: "windows1251",
    windows1252: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    win1252: "windows1252",
    cp1252: "windows1252",
    windows1253: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
    },
    win1253: "windows1253",
    cp1253: "windows1253",
    windows1254: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
    },
    win1254: "windows1254",
    cp1254: "windows1254",
    windows1255: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹֺֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
    },
    win1255: "windows1255",
    cp1255: "windows1255",
    windows1256: {
      type: "_sbcs",
      chars: "€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے"
    },
    win1256: "windows1256",
    cp1256: "windows1256",
    windows1257: {
      type: "_sbcs",
      chars: "€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙"
    },
    win1257: "windows1257",
    cp1257: "windows1257",
    windows1258: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    win1258: "windows1258",
    cp1258: "windows1258",
    iso88591: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    cp28591: "iso88591",
    iso88592: {
      type: "_sbcs",
      chars: " Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
    },
    cp28592: "iso88592",
    iso88593: {
      type: "_sbcs",
      chars: " Ħ˘£¤�Ĥ§¨İŞĞĴ­�Ż°ħ²³´µĥ·¸ışğĵ½�żÀÁÂ�ÄĊĈÇÈÉÊËÌÍÎÏ�ÑÒÓÔĠÖ×ĜÙÚÛÜŬŜßàáâ�äċĉçèéêëìíîï�ñòóôġö÷ĝùúûüŭŝ˙"
    },
    cp28593: "iso88593",
    iso88594: {
      type: "_sbcs",
      chars: " ĄĸŖ¤ĨĻ§¨ŠĒĢŦ­Ž¯°ą˛ŗ´ĩļˇ¸šēģŧŊžŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎĪĐŅŌĶÔÕÖ×ØŲÚÛÜŨŪßāáâãäåæįčéęëėíîīđņōķôõö÷øųúûüũū˙"
    },
    cp28594: "iso88594",
    iso88595: {
      type: "_sbcs",
      chars: " ЁЂЃЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђѓєѕіїјљњћќ§ўџ"
    },
    cp28595: "iso88595",
    iso88596: {
      type: "_sbcs",
      chars: " ���¤�������،­�������������؛���؟�ءآأؤإئابةتثجحخدذرزسشصضطظعغ�����ـفقكلمنهوىيًٌٍَُِّْ�������������"
    },
    cp28596: "iso88596",
    iso88597: {
      type: "_sbcs",
      chars: " ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
    },
    cp28597: "iso88597",
    iso88598: {
      type: "_sbcs",
      chars: " �¢£¤¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾��������������������������������‗אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
    },
    cp28598: "iso88598",
    iso88599: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
    },
    cp28599: "iso88599",
    iso885910: {
      type: "_sbcs",
      chars: " ĄĒĢĪĨĶ§ĻĐŠŦŽ­ŪŊ°ąēģīĩķ·ļđšŧž―ūŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎÏÐŅŌÓÔÕÖŨØŲÚÛÜÝÞßāáâãäåæįčéęëėíîïðņōóôõöũøųúûüýþĸ"
    },
    cp28600: "iso885910",
    iso885911: {
      type: "_sbcs",
      chars: " กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    cp28601: "iso885911",
    iso885913: {
      type: "_sbcs",
      chars: " ”¢£¤„¦§Ø©Ŗ«¬­®Æ°±²³“µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž’"
    },
    cp28603: "iso885913",
    iso885914: {
      type: "_sbcs",
      chars: " Ḃḃ£ĊċḊ§Ẁ©ẂḋỲ­®ŸḞḟĠġṀṁ¶ṖẁṗẃṠỳẄẅṡÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŴÑÒÓÔÕÖṪØÙÚÛÜÝŶßàáâãäåæçèéêëìíîïŵñòóôõöṫøùúûüýŷÿ"
    },
    cp28604: "iso885914",
    iso885915: {
      type: "_sbcs",
      chars: " ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    cp28605: "iso885915",
    iso885916: {
      type: "_sbcs",
      chars: " ĄąŁ€„Š§š©Ș«Ź­źŻ°±ČłŽ”¶·žčș»ŒœŸżÀÁÂĂÄĆÆÇÈÉÊËÌÍÎÏĐŃÒÓÔŐÖŚŰÙÚÛÜĘȚßàáâăäćæçèéêëìíîïđńòóôőöśűùúûüęțÿ"
    },
    cp28606: "iso885916",
    cp437: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm437: "cp437",
    csibm437: "cp437",
    cp737: {
      type: "_sbcs",
      chars: "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ "
    },
    ibm737: "cp737",
    csibm737: "cp737",
    cp775: {
      type: "_sbcs",
      chars: "ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ "
    },
    ibm775: "cp775",
    csibm775: "cp775",
    cp850: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm850: "cp850",
    csibm850: "cp850",
    cp852: {
      type: "_sbcs",
      chars: "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ "
    },
    ibm852: "cp852",
    csibm852: "cp852",
    cp855: {
      type: "_sbcs",
      chars: "ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ "
    },
    ibm855: "cp855",
    csibm855: "cp855",
    cp856: {
      type: "_sbcs",
      chars: "אבגדהוזחטיךכלםמןנסעףפץצקרשת�£�×����������®¬½¼�«»░▒▓│┤���©╣║╗╝¢¥┐└┴┬├─┼��╚╔╩╦╠═╬¤���������┘┌█▄¦�▀������µ�������¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm856: "cp856",
    csibm856: "cp856",
    cp857: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ "
    },
    ibm857: "cp857",
    csibm857: "cp857",
    cp858: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm858: "cp858",
    csibm858: "cp858",
    cp860: {
      type: "_sbcs",
      chars: "ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm860: "cp860",
    csibm860: "cp860",
    cp861: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm861: "cp861",
    csibm861: "cp861",
    cp862: {
      type: "_sbcs",
      chars: "אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm862: "cp862",
    csibm862: "cp862",
    cp863: {
      type: "_sbcs",
      chars: "ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm863: "cp863",
    csibm863: "cp863",
    cp864: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�`
    },
    ibm864: "cp864",
    csibm864: "cp864",
    cp865: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm865: "cp865",
    csibm865: "cp865",
    cp866: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ "
    },
    ibm866: "cp866",
    csibm866: "cp866",
    cp869: {
      type: "_sbcs",
      chars: "������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ "
    },
    ibm869: "cp869",
    csibm869: "cp869",
    cp922: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ"
    },
    ibm922: "cp922",
    csibm922: "cp922",
    cp1046: {
      type: "_sbcs",
      chars: "ﺈ×÷ﹱ■│─┐┌└┘ﹹﹻﹽﹿﹷﺊﻰﻳﻲﻎﻏﻐﻶﻸﻺﻼ ¤ﺋﺑﺗﺛﺟﺣ،­ﺧﺳ٠١٢٣٤٥٦٧٨٩ﺷ؛ﺻﺿﻊ؟ﻋءآأؤإئابةتثجحخدذرزسشصضطﻇعغﻌﺂﺄﺎﻓـفقكلمنهوىيًٌٍَُِّْﻗﻛﻟﻵﻷﻹﻻﻣﻧﻬﻩ�"
    },
    ibm1046: "cp1046",
    csibm1046: "cp1046",
    cp1124: {
      type: "_sbcs",
      chars: " ЁЂҐЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђґєѕіїјљњћќ§ўџ"
    },
    ibm1124: "cp1124",
    csibm1124: "cp1124",
    cp1125: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ "
    },
    ibm1125: "cp1125",
    csibm1125: "cp1125",
    cp1129: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    ibm1129: "cp1129",
    csibm1129: "cp1129",
    cp1133: {
      type: "_sbcs",
      chars: " ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ���ຯະາຳິີຶືຸູຼັົຽ���ເແໂໃໄ່້໊໋໌ໍໆ�ໜໝ₭����������������໐໑໒໓໔໕໖໗໘໙��¢¬¦�"
    },
    ibm1133: "cp1133",
    csibm1133: "cp1133",
    cp1161: {
      type: "_sbcs",
      chars: "��������������������������������่กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู้๊๋€฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛¢¬¦ "
    },
    ibm1161: "cp1161",
    csibm1161: "cp1161",
    cp1162: {
      type: "_sbcs",
      chars: "€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    ibm1162: "cp1162",
    csibm1162: "cp1162",
    cp1163: {
      type: "_sbcs",
      chars: " ¡¢£€¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    ibm1163: "cp1163",
    csibm1163: "cp1163",
    maccroatian: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊�©⁄¤‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ"
    },
    maccyrillic: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
    },
    macgreek: {
      type: "_sbcs",
      chars: "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�"
    },
    maciceland: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macroman: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macromania: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂŞ∞±≤≥¥µ∂∑∏π∫ªºΩăş¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›Ţţ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macthai: {
      type: "_sbcs",
      chars: "«»…“”�•‘’� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู\uFEFF​–—฿เแโใไๅๆ็่้๊๋์ํ™๏๐๑๒๓๔๕๖๗๘๙®©����"
    },
    macturkish: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macukraine: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
    },
    koi8r: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ё╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡Ё╢╣╤╥╦╧╨╩╪╫╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8u: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґ╝╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪Ґ╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8ru: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґў╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪ҐЎ©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8t: {
      type: "_sbcs",
      chars: "қғ‚Ғ„…†‡�‰ҳ‹ҲҷҶ�Қ‘’“”•–—�™�›�����ӯӮё¤ӣ¦§���«¬­®�°±²Ё�Ӣ¶·�№�»���©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    armscii8: {
      type: "_sbcs",
      chars: " �և։)(»«—.՝,-֊…՜՛՞ԱաԲբԳգԴդԵեԶզԷէԸըԹթԺժԻիԼլԽխԾծԿկՀհՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռՍսՎվՏտՐրՑցՒւՓփՔքՕօՖֆ՚�"
    },
    rk1048: {
      type: "_sbcs",
      chars: "ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    tcvn: {
      type: "_sbcs",
      chars: `\0ÚỤỪỬỮ\x07\b	
\v\f\rỨỰỲỶỸÝỴ\x1B !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~ÀẢÃÁẠẶẬÈẺẼÉẸỆÌỈĨÍỊÒỎÕÓỌỘỜỞỠỚỢÙỦŨ ĂÂÊÔƠƯĐăâêôơưđẶ̀̀̉̃́àảãáạẲằẳẵắẴẮẦẨẪẤỀặầẩẫấậèỂẻẽéẹềểễếệìỉỄẾỒĩíịòỔỏõóọồổỗốộờởỡớợùỖủũúụừửữứựỳỷỹýỵỐ`
    },
    georgianacademy: {
      type: "_sbcs",
      chars: "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    georgianps: {
      type: "_sbcs",
      chars: "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    pt154: {
      type: "_sbcs",
      chars: "ҖҒӮғ„…ҶҮҲүҠӢҢҚҺҸҗ‘’“”•–—ҳҷҡӣңқһҹ ЎўЈӨҘҰ§Ё©Ә«¬ӯ®Ҝ°ұІіҙө¶·ё№ә»јҪҫҝАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    viscii: {
      type: "_sbcs",
      chars: `\0ẲẴẪ\x07\b	
\v\f\rỶỸ\x1BỴ !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~ẠẮẰẶẤẦẨẬẼẸẾỀỂỄỆỐỒỔỖỘỢỚỜỞỊỎỌỈỦŨỤỲÕắằặấầẩậẽẹếềểễệốồổỗỠƠộờởịỰỨỪỬơớƯÀÁÂÃẢĂẳẵÈÉÊẺÌÍĨỳĐứÒÓÔạỷừửÙÚỹỵÝỡưàáâãảăữẫèéêẻìíĩỉđựòóôõỏọụùúũủýợỮ`
    },
    iso646cn: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#¥%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������`
    },
    iso646jp: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[¥]^_\`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������`
    },
    hproman8: {
      type: "_sbcs",
      chars: " ÀÂÈÊËÎÏ´ˋˆ¨˜ÙÛ₤¯Ýý°ÇçÑñ¡¿¤£¥§ƒ¢âêôûáéóúàèòùäëöüÅîØÆåíøæÄìÖÜÉïßÔÁÃãÐðÍÌÓÒÕõŠšÚŸÿÞþ·µ¶¾—¼½ªº«■»±�"
    },
    macintosh: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    ascii: {
      type: "_sbcs",
      chars: "��������������������������������������������������������������������������������������������������������������������������������"
    },
    tis620: {
      type: "_sbcs",
      chars: "���������������������������������กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    }
  }), ai;
}
var oi = {}, xc;
function zd() {
  if (xc) return oi;
  xc = 1;
  var e = kt().Buffer;
  oi._dbcs = n;
  for (var f = -1, t = -2, u = -10, r = -1e3, s = new Array(256), a = -1, o = 0; o < 256; o++)
    s[o] = f;
  function n(_, d) {
    if (this.encodingName = _.encodingName, !_)
      throw new Error("DBCS codec is called without the data.");
    if (!_.table)
      throw new Error("Encoding '" + this.encodingName + "' has no data.");
    var p = _.table();
    this.decodeTables = [], this.decodeTables[0] = s.slice(0), this.decodeTableSeq = [];
    for (var E = 0; E < p.length; E++)
      this._addDecodeChunk(p[E]);
    if (typeof _.gb18030 == "function") {
      this.gb18030 = _.gb18030();
      var h = this.decodeTables.length;
      this.decodeTables.push(s.slice(0));
      var N = this.decodeTables.length;
      this.decodeTables.push(s.slice(0));
      for (var A = this.decodeTables[0], E = 129; E <= 254; E++)
        for (var C = this.decodeTables[r - A[E]], g = 48; g <= 57; g++) {
          if (C[g] === f)
            C[g] = r - h;
          else if (C[g] > r)
            throw new Error("gb18030 decode tables conflict at byte 2");
          for (var L = this.decodeTables[r - C[g]], R = 129; R <= 254; R++) {
            if (L[R] === f)
              L[R] = r - N;
            else {
              if (L[R] === r - N)
                continue;
              if (L[R] > r)
                throw new Error("gb18030 decode tables conflict at byte 3");
            }
            for (var O = this.decodeTables[r - L[R]], D = 48; D <= 57; D++)
              O[D] === f && (O[D] = t);
          }
        }
    }
    this.defaultCharUnicode = d.defaultCharUnicode, this.encodeTable = [], this.encodeTableSeq = [];
    var m = {};
    if (_.encodeSkipVals)
      for (var E = 0; E < _.encodeSkipVals.length; E++) {
        var B = _.encodeSkipVals[E];
        if (typeof B == "number")
          m[B] = !0;
        else
          for (var g = B.from; g <= B.to; g++)
            m[g] = !0;
      }
    if (this._fillEncodeTable(0, 0, m), _.encodeAdd)
      for (var v in _.encodeAdd)
        Object.prototype.hasOwnProperty.call(_.encodeAdd, v) && this._setEncodeChar(v.charCodeAt(0), _.encodeAdd[v]);
    this.defCharSB = this.encodeTable[0][d.defaultCharSingleByte.charCodeAt(0)], this.defCharSB === f && (this.defCharSB = this.encodeTable[0]["?"]), this.defCharSB === f && (this.defCharSB = 63);
  }
  n.prototype.encoder = c, n.prototype.decoder = i, n.prototype._getDecodeTrieNode = function(_) {
    for (var d = []; _ > 0; _ >>>= 8)
      d.push(_ & 255);
    d.length == 0 && d.push(0);
    for (var p = this.decodeTables[0], E = d.length - 1; E > 0; E--) {
      var h = p[d[E]];
      if (h == f)
        p[d[E]] = r - this.decodeTables.length, this.decodeTables.push(p = s.slice(0));
      else if (h <= r)
        p = this.decodeTables[r - h];
      else
        throw new Error("Overwrite byte in " + this.encodingName + ", addr: " + _.toString(16));
    }
    return p;
  }, n.prototype._addDecodeChunk = function(_) {
    var d = parseInt(_[0], 16), p = this._getDecodeTrieNode(d);
    d = d & 255;
    for (var E = 1; E < _.length; E++) {
      var h = _[E];
      if (typeof h == "string")
        for (var N = 0; N < h.length; ) {
          var A = h.charCodeAt(N++);
          if (55296 <= A && A < 56320) {
            var C = h.charCodeAt(N++);
            if (56320 <= C && C < 57344)
              p[d++] = 65536 + (A - 55296) * 1024 + (C - 56320);
            else
              throw new Error("Incorrect surrogate pair in " + this.encodingName + " at chunk " + _[0]);
          } else if (4080 < A && A <= 4095) {
            for (var g = 4095 - A + 2, L = [], R = 0; R < g; R++)
              L.push(h.charCodeAt(N++));
            p[d++] = u - this.decodeTableSeq.length, this.decodeTableSeq.push(L);
          } else
            p[d++] = A;
        }
      else if (typeof h == "number")
        for (var O = p[d - 1] + 1, N = 0; N < h; N++)
          p[d++] = O++;
      else
        throw new Error("Incorrect type '" + typeof h + "' given in " + this.encodingName + " at chunk " + _[0]);
    }
    if (d > 255)
      throw new Error("Incorrect chunk in " + this.encodingName + " at addr " + _[0] + ": too long" + d);
  }, n.prototype._getEncodeBucket = function(_) {
    var d = _ >> 8;
    return this.encodeTable[d] === void 0 && (this.encodeTable[d] = s.slice(0)), this.encodeTable[d];
  }, n.prototype._setEncodeChar = function(_, d) {
    var p = this._getEncodeBucket(_), E = _ & 255;
    p[E] <= u ? this.encodeTableSeq[u - p[E]][a] = d : p[E] == f && (p[E] = d);
  }, n.prototype._setEncodeSequence = function(_, d) {
    var p = _[0], E = this._getEncodeBucket(p), h = p & 255, N;
    E[h] <= u ? N = this.encodeTableSeq[u - E[h]] : (N = {}, E[h] !== f && (N[a] = E[h]), E[h] = u - this.encodeTableSeq.length, this.encodeTableSeq.push(N));
    for (var A = 1; A < _.length - 1; A++) {
      var C = N[p];
      typeof C == "object" ? N = C : (N = N[p] = {}, C !== void 0 && (N[a] = C));
    }
    p = _[_.length - 1], N[p] = d;
  }, n.prototype._fillEncodeTable = function(_, d, p) {
    for (var E = this.decodeTables[_], h = !1, N = {}, A = 0; A < 256; A++) {
      var C = E[A], g = d + A;
      if (!p[g])
        if (C >= 0)
          this._setEncodeChar(C, g), h = !0;
        else if (C <= r) {
          var L = r - C;
          if (!N[L]) {
            var R = g << 8 >>> 0;
            this._fillEncodeTable(L, R, p) ? h = !0 : N[L] = !0;
          }
        } else C <= u && (this._setEncodeSequence(this.decodeTableSeq[u - C], g), h = !0);
    }
    return h;
  };
  function c(_, d) {
    this.leadSurrogate = -1, this.seqObj = void 0, this.encodeTable = d.encodeTable, this.encodeTableSeq = d.encodeTableSeq, this.defaultCharSingleByte = d.defCharSB, this.gb18030 = d.gb18030;
  }
  c.prototype.write = function(_) {
    for (var d = e.alloc(_.length * (this.gb18030 ? 4 : 3)), p = this.leadSurrogate, E = this.seqObj, h = -1, N = 0, A = 0; ; ) {
      if (h === -1) {
        if (N == _.length) break;
        var C = _.charCodeAt(N++);
      } else {
        var C = h;
        h = -1;
      }
      if (55296 <= C && C < 57344)
        if (C < 56320)
          if (p === -1) {
            p = C;
            continue;
          } else
            p = C, C = f;
        else
          p !== -1 ? (C = 65536 + (p - 55296) * 1024 + (C - 56320), p = -1) : C = f;
      else p !== -1 && (h = C, C = f, p = -1);
      var g = f;
      if (E !== void 0 && C != f) {
        var L = E[C];
        if (typeof L == "object") {
          E = L;
          continue;
        } else typeof L == "number" ? g = L : L == null && (L = E[a], L !== void 0 && (g = L, h = C));
        E = void 0;
      } else if (C >= 0) {
        var R = this.encodeTable[C >> 8];
        if (R !== void 0 && (g = R[C & 255]), g <= u) {
          E = this.encodeTableSeq[u - g];
          continue;
        }
        if (g == f && this.gb18030) {
          var O = l(this.gb18030.uChars, C);
          if (O != -1) {
            var g = this.gb18030.gbChars[O] + (C - this.gb18030.uChars[O]);
            d[A++] = 129 + Math.floor(g / 12600), g = g % 12600, d[A++] = 48 + Math.floor(g / 1260), g = g % 1260, d[A++] = 129 + Math.floor(g / 10), g = g % 10, d[A++] = 48 + g;
            continue;
          }
        }
      }
      g === f && (g = this.defaultCharSingleByte), g < 256 ? d[A++] = g : g < 65536 ? (d[A++] = g >> 8, d[A++] = g & 255) : g < 16777216 ? (d[A++] = g >> 16, d[A++] = g >> 8 & 255, d[A++] = g & 255) : (d[A++] = g >>> 24, d[A++] = g >>> 16 & 255, d[A++] = g >>> 8 & 255, d[A++] = g & 255);
    }
    return this.seqObj = E, this.leadSurrogate = p, d.slice(0, A);
  }, c.prototype.end = function() {
    if (!(this.leadSurrogate === -1 && this.seqObj === void 0)) {
      var _ = e.alloc(10), d = 0;
      if (this.seqObj) {
        var p = this.seqObj[a];
        p !== void 0 && (p < 256 ? _[d++] = p : (_[d++] = p >> 8, _[d++] = p & 255)), this.seqObj = void 0;
      }
      return this.leadSurrogate !== -1 && (_[d++] = this.defaultCharSingleByte, this.leadSurrogate = -1), _.slice(0, d);
    }
  }, c.prototype.findIdx = l;
  function i(_, d) {
    this.nodeIdx = 0, this.prevBytes = [], this.decodeTables = d.decodeTables, this.decodeTableSeq = d.decodeTableSeq, this.defaultCharUnicode = d.defaultCharUnicode, this.gb18030 = d.gb18030;
  }
  i.prototype.write = function(_) {
    for (var d = e.alloc(_.length * 2), p = this.nodeIdx, E = this.prevBytes, h = this.prevBytes.length, N = -this.prevBytes.length, A, C = 0, g = 0; C < _.length; C++) {
      var L = C >= 0 ? _[C] : E[C + h], A = this.decodeTables[p][L];
      if (!(A >= 0)) if (A === f)
        A = this.defaultCharUnicode.charCodeAt(0), C = N;
      else if (A === t) {
        if (C >= 3)
          var R = (_[C - 3] - 129) * 12600 + (_[C - 2] - 48) * 1260 + (_[C - 1] - 129) * 10 + (L - 48);
        else
          var R = (E[C - 3 + h] - 129) * 12600 + ((C - 2 >= 0 ? _[C - 2] : E[C - 2 + h]) - 48) * 1260 + ((C - 1 >= 0 ? _[C - 1] : E[C - 1 + h]) - 129) * 10 + (L - 48);
        var O = l(this.gb18030.gbChars, R);
        A = this.gb18030.uChars[O] + R - this.gb18030.gbChars[O];
      } else if (A <= r) {
        p = r - A;
        continue;
      } else if (A <= u) {
        for (var D = this.decodeTableSeq[u - A], m = 0; m < D.length - 1; m++)
          A = D[m], d[g++] = A & 255, d[g++] = A >> 8;
        A = D[D.length - 1];
      } else
        throw new Error("iconv-lite internal error: invalid decoding table value " + A + " at " + p + "/" + L);
      if (A >= 65536) {
        A -= 65536;
        var B = 55296 | A >> 10;
        d[g++] = B & 255, d[g++] = B >> 8, A = 56320 | A & 1023;
      }
      d[g++] = A & 255, d[g++] = A >> 8, p = 0, N = C + 1;
    }
    return this.nodeIdx = p, this.prevBytes = N >= 0 ? Array.prototype.slice.call(_, N) : E.slice(N + h).concat(Array.prototype.slice.call(_)), d.slice(0, g).toString("ucs2");
  }, i.prototype.end = function() {
    for (var _ = ""; this.prevBytes.length > 0; ) {
      _ += this.defaultCharUnicode;
      var d = this.prevBytes.slice(1);
      this.prevBytes = [], this.nodeIdx = 0, d.length > 0 && (_ += this.write(d));
    }
    return this.prevBytes = [], this.nodeIdx = 0, _;
  };
  function l(_, d) {
    if (_[0] > d)
      return -1;
    for (var p = 0, E = _.length; p < E - 1; ) {
      var h = p + (E - p + 1 >> 1);
      _[h] <= d ? p = h : E = h;
    }
    return p;
  }
  return oi;
}
const Xd = [
  [
    "0",
    "\0",
    128
  ],
  [
    "a1",
    "｡",
    62
  ],
  [
    "8140",
    "　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
    9,
    "＋－±×"
  ],
  [
    "8180",
    "÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓"
  ],
  [
    "81b8",
    "∈∋⊆⊇⊂⊃∪∩"
  ],
  [
    "81c8",
    "∧∨￢⇒⇔∀∃"
  ],
  [
    "81da",
    "∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
  ],
  [
    "81f0",
    "Å‰♯♭♪†‡¶"
  ],
  [
    "81fc",
    "◯"
  ],
  [
    "824f",
    "０",
    9
  ],
  [
    "8260",
    "Ａ",
    25
  ],
  [
    "8281",
    "ａ",
    25
  ],
  [
    "829f",
    "ぁ",
    82
  ],
  [
    "8340",
    "ァ",
    62
  ],
  [
    "8380",
    "ム",
    22
  ],
  [
    "839f",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "83bf",
    "α",
    16,
    "σ",
    6
  ],
  [
    "8440",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "8470",
    "а",
    5,
    "ёж",
    7
  ],
  [
    "8480",
    "о",
    17
  ],
  [
    "849f",
    "─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
  ],
  [
    "8740",
    "①",
    19,
    "Ⅰ",
    9
  ],
  [
    "875f",
    "㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
  ],
  [
    "877e",
    "㍻"
  ],
  [
    "8780",
    "〝〟№㏍℡㊤",
    4,
    "㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
  ],
  [
    "889f",
    "亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
  ],
  [
    "8940",
    "院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円"
  ],
  [
    "8980",
    "園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
  ],
  [
    "8a40",
    "魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫"
  ],
  [
    "8a80",
    "橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
  ],
  [
    "8b40",
    "機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救"
  ],
  [
    "8b80",
    "朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
  ],
  [
    "8c40",
    "掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨"
  ],
  [
    "8c80",
    "劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
  ],
  [
    "8d40",
    "后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降"
  ],
  [
    "8d80",
    "項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
  ],
  [
    "8e40",
    "察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止"
  ],
  [
    "8e80",
    "死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
  ],
  [
    "8f40",
    "宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳"
  ],
  [
    "8f80",
    "準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
  ],
  [
    "9040",
    "拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨"
  ],
  [
    "9080",
    "逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
  ],
  [
    "9140",
    "繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻"
  ],
  [
    "9180",
    "操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
  ],
  [
    "9240",
    "叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄"
  ],
  [
    "9280",
    "逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
  ],
  [
    "9340",
    "邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬"
  ],
  [
    "9380",
    "凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
  ],
  [
    "9440",
    "如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅"
  ],
  [
    "9480",
    "楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
  ],
  [
    "9540",
    "鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷"
  ],
  [
    "9580",
    "斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
  ],
  [
    "9640",
    "法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆"
  ],
  [
    "9680",
    "摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
  ],
  [
    "9740",
    "諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲"
  ],
  [
    "9780",
    "沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
  ],
  [
    "9840",
    "蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
  ],
  [
    "989f",
    "弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
  ],
  [
    "9940",
    "僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭"
  ],
  [
    "9980",
    "凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
  ],
  [
    "9a40",
    "咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸"
  ],
  [
    "9a80",
    "噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
  ],
  [
    "9b40",
    "奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀"
  ],
  [
    "9b80",
    "它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
  ],
  [
    "9c40",
    "廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠"
  ],
  [
    "9c80",
    "怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
  ],
  [
    "9d40",
    "戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫"
  ],
  [
    "9d80",
    "捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
  ],
  [
    "9e40",
    "曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎"
  ],
  [
    "9e80",
    "梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
  ],
  [
    "9f40",
    "檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯"
  ],
  [
    "9f80",
    "麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
  ],
  [
    "e040",
    "漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝"
  ],
  [
    "e080",
    "烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
  ],
  [
    "e140",
    "瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿"
  ],
  [
    "e180",
    "痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
  ],
  [
    "e240",
    "磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰"
  ],
  [
    "e280",
    "窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
  ],
  [
    "e340",
    "紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷"
  ],
  [
    "e380",
    "縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
  ],
  [
    "e440",
    "隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤"
  ],
  [
    "e480",
    "艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
  ],
  [
    "e540",
    "蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬"
  ],
  [
    "e580",
    "蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
  ],
  [
    "e640",
    "襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧"
  ],
  [
    "e680",
    "諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
  ],
  [
    "e740",
    "蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜"
  ],
  [
    "e780",
    "轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
  ],
  [
    "e840",
    "錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙"
  ],
  [
    "e880",
    "閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
  ],
  [
    "e940",
    "顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃"
  ],
  [
    "e980",
    "騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
  ],
  [
    "ea40",
    "鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯"
  ],
  [
    "ea80",
    "黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙"
  ],
  [
    "ed40",
    "纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏"
  ],
  [
    "ed80",
    "塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
  ],
  [
    "ee40",
    "犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙"
  ],
  [
    "ee80",
    "蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ],
  [
    "eeef",
    "ⅰ",
    9,
    "￢￤＇＂"
  ],
  [
    "f040",
    "",
    62
  ],
  [
    "f080",
    "",
    124
  ],
  [
    "f140",
    "",
    62
  ],
  [
    "f180",
    "",
    124
  ],
  [
    "f240",
    "",
    62
  ],
  [
    "f280",
    "",
    124
  ],
  [
    "f340",
    "",
    62
  ],
  [
    "f380",
    "",
    124
  ],
  [
    "f440",
    "",
    62
  ],
  [
    "f480",
    "",
    124
  ],
  [
    "f540",
    "",
    62
  ],
  [
    "f580",
    "",
    124
  ],
  [
    "f640",
    "",
    62
  ],
  [
    "f680",
    "",
    124
  ],
  [
    "f740",
    "",
    62
  ],
  [
    "f780",
    "",
    124
  ],
  [
    "f840",
    "",
    62
  ],
  [
    "f880",
    "",
    124
  ],
  [
    "f940",
    ""
  ],
  [
    "fa40",
    "ⅰ",
    9,
    "Ⅰ",
    9,
    "￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊"
  ],
  [
    "fa80",
    "兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯"
  ],
  [
    "fb40",
    "涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神"
  ],
  [
    "fb80",
    "祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙"
  ],
  [
    "fc40",
    "髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ]
], Qd = /* @__PURE__ */ JSON.parse('[["0","\\u0000",127],["8ea1","｡",62],["a1a1","　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",9,"＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇"],["a2a1","◆□■△▲▽▼※〒→←↑↓〓"],["a2ba","∈∋⊆⊇⊂⊃∪∩"],["a2ca","∧∨￢⇒⇔∀∃"],["a2dc","∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"],["a2f2","Å‰♯♭♪†‡¶"],["a2fe","◯"],["a3b0","０",9],["a3c1","Ａ",25],["a3e1","ａ",25],["a4a1","ぁ",82],["a5a1","ァ",85],["a6a1","Α",16,"Σ",6],["a6c1","α",16,"σ",6],["a7a1","А",5,"ЁЖ",25],["a7d1","а",5,"ёж",25],["a8a1","─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"],["ada1","①",19,"Ⅰ",9],["adc0","㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"],["addf","㍻〝〟№㏍℡㊤",4,"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"],["b0a1","亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"],["b1a1","院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応"],["b2a1","押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"],["b3a1","魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱"],["b4a1","粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"],["b5a1","機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京"],["b6a1","供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"],["b7a1","掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲"],["b8a1","検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"],["b9a1","后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込"],["baa1","此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"],["bba1","察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時"],["bca1","次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"],["bda1","宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償"],["bea1","勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"],["bfa1","拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾"],["c0a1","澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"],["c1a1","繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎"],["c2a1","臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"],["c3a1","叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵"],["c4a1","帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"],["c5a1","邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到"],["c6a1","董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"],["c7a1","如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦"],["c8a1","函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"],["c9a1","鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服"],["caa1","福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"],["cba1","法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満"],["cca1","漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"],["cda1","諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃"],["cea1","痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"],["cfa1","蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"],["d0a1","弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"],["d1a1","僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨"],["d2a1","辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"],["d3a1","咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉"],["d4a1","圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"],["d5a1","奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓"],["d6a1","屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"],["d7a1","廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚"],["d8a1","悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"],["d9a1","戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼"],["daa1","據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"],["dba1","曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍"],["dca1","棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"],["dda1","檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾"],["dea1","沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"],["dfa1","漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼"],["e0a1","燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"],["e1a1","瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰"],["e2a1","癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"],["e3a1","磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐"],["e4a1","筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"],["e5a1","紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺"],["e6a1","罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"],["e7a1","隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙"],["e8a1","茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"],["e9a1","蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙"],["eaa1","蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"],["eba1","襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫"],["eca1","譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"],["eda1","蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸"],["eea1","遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"],["efa1","錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞"],["f0a1","陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"],["f1a1","顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷"],["f2a1","髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"],["f3a1","鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠"],["f4a1","堯槇遙瑤凜熙"],["f9a1","纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德"],["faa1","忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"],["fba1","犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚"],["fca1","釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"],["fcf1","ⅰ",9,"￢￤＇＂"],["8fa2af","˘ˇ¸˙˝¯˛˚～΄΅"],["8fa2c2","¡¦¿"],["8fa2eb","ºª©®™¤№"],["8fa6e1","ΆΈΉΊΪ"],["8fa6e7","Ό"],["8fa6e9","ΎΫ"],["8fa6ec","Ώ"],["8fa6f1","άέήίϊΐόςύϋΰώ"],["8fa7c2","Ђ",10,"ЎЏ"],["8fa7f2","ђ",10,"ўџ"],["8fa9a1","ÆĐ"],["8fa9a4","Ħ"],["8fa9a6","Ĳ"],["8fa9a8","ŁĿ"],["8fa9ab","ŊØŒ"],["8fa9af","ŦÞ"],["8fa9c1","æđðħıĳĸłŀŉŋøœßŧþ"],["8faaa1","ÁÀÄÂĂǍĀĄÅÃĆĈČÇĊĎÉÈËÊĚĖĒĘ"],["8faaba","ĜĞĢĠĤÍÌÏÎǏİĪĮĨĴĶĹĽĻŃŇŅÑÓÒÖÔǑŐŌÕŔŘŖŚŜŠŞŤŢÚÙÜÛŬǓŰŪŲŮŨǗǛǙǕŴÝŸŶŹŽŻ"],["8faba1","áàäâăǎāąåãćĉčçċďéèëêěėēęǵĝğ"],["8fabbd","ġĥíìïîǐ"],["8fabc5","īįĩĵķĺľļńňņñóòöôǒőōõŕřŗśŝšşťţúùüûŭǔűūųůũǘǜǚǖŵýÿŷźžż"],["8fb0a1","丂丄丅丌丒丟丣两丨丫丮丯丰丵乀乁乄乇乑乚乜乣乨乩乴乵乹乿亍亖亗亝亯亹仃仐仚仛仠仡仢仨仯仱仳仵份仾仿伀伂伃伈伋伌伒伕伖众伙伮伱你伳伵伷伹伻伾佀佂佈佉佋佌佒佔佖佘佟佣佪佬佮佱佷佸佹佺佽佾侁侂侄"],["8fb1a1","侅侉侊侌侎侐侒侓侔侗侙侚侞侟侲侷侹侻侼侽侾俀俁俅俆俈俉俋俌俍俏俒俜俠俢俰俲俼俽俿倀倁倄倇倊倌倎倐倓倗倘倛倜倝倞倢倧倮倰倲倳倵偀偁偂偅偆偊偌偎偑偒偓偗偙偟偠偢偣偦偧偪偭偰偱倻傁傃傄傆傊傎傏傐"],["8fb2a1","傒傓傔傖傛傜傞",4,"傪傯傰傹傺傽僀僃僄僇僌僎僐僓僔僘僜僝僟僢僤僦僨僩僯僱僶僺僾儃儆儇儈儋儌儍儎僲儐儗儙儛儜儝儞儣儧儨儬儭儯儱儳儴儵儸儹兂兊兏兓兕兗兘兟兤兦兾冃冄冋冎冘冝冡冣冭冸冺冼冾冿凂"],["8fb3a1","凈减凑凒凓凕凘凞凢凥凮凲凳凴凷刁刂刅划刓刕刖刘刢刨刱刲刵刼剅剉剕剗剘剚剜剟剠剡剦剮剷剸剹劀劂劅劊劌劓劕劖劗劘劚劜劤劥劦劧劯劰劶劷劸劺劻劽勀勄勆勈勌勏勑勔勖勛勜勡勥勨勩勪勬勰勱勴勶勷匀匃匊匋"],["8fb4a1","匌匑匓匘匛匜匞匟匥匧匨匩匫匬匭匰匲匵匼匽匾卂卌卋卙卛卡卣卥卬卭卲卹卾厃厇厈厎厓厔厙厝厡厤厪厫厯厲厴厵厷厸厺厽叀叅叏叒叓叕叚叝叞叠另叧叵吂吓吚吡吧吨吪启吱吴吵呃呄呇呍呏呞呢呤呦呧呩呫呭呮呴呿"],["8fb5a1","咁咃咅咈咉咍咑咕咖咜咟咡咦咧咩咪咭咮咱咷咹咺咻咿哆哊响哎哠哪哬哯哶哼哾哿唀唁唅唈唉唌唍唎唕唪唫唲唵唶唻唼唽啁啇啉啊啍啐啑啘啚啛啞啠啡啤啦啿喁喂喆喈喎喏喑喒喓喔喗喣喤喭喲喿嗁嗃嗆嗉嗋嗌嗎嗑嗒"],["8fb6a1","嗓嗗嗘嗛嗞嗢嗩嗶嗿嘅嘈嘊嘍",5,"嘙嘬嘰嘳嘵嘷嘹嘻嘼嘽嘿噀噁噃噄噆噉噋噍噏噔噞噠噡噢噣噦噩噭噯噱噲噵嚄嚅嚈嚋嚌嚕嚙嚚嚝嚞嚟嚦嚧嚨嚩嚫嚬嚭嚱嚳嚷嚾囅囉囊囋囏囐囌囍囙囜囝囟囡囤",4,"囱囫园"],["8fb7a1","囶囷圁圂圇圊圌圑圕圚圛圝圠圢圣圤圥圩圪圬圮圯圳圴圽圾圿坅坆坌坍坒坢坥坧坨坫坭",4,"坳坴坵坷坹坺坻坼坾垁垃垌垔垗垙垚垜垝垞垟垡垕垧垨垩垬垸垽埇埈埌埏埕埝埞埤埦埧埩埭埰埵埶埸埽埾埿堃堄堈堉埡"],["8fb8a1","堌堍堛堞堟堠堦堧堭堲堹堿塉塌塍塏塐塕塟塡塤塧塨塸塼塿墀墁墇墈墉墊墌墍墏墐墔墖墝墠墡墢墦墩墱墲壄墼壂壈壍壎壐壒壔壖壚壝壡壢壩壳夅夆夋夌夒夓夔虁夝夡夣夤夨夯夰夳夵夶夿奃奆奒奓奙奛奝奞奟奡奣奫奭"],["8fb9a1","奯奲奵奶她奻奼妋妌妎妒妕妗妟妤妧妭妮妯妰妳妷妺妼姁姃姄姈姊姍姒姝姞姟姣姤姧姮姯姱姲姴姷娀娄娌娍娎娒娓娞娣娤娧娨娪娭娰婄婅婇婈婌婐婕婞婣婥婧婭婷婺婻婾媋媐媓媖媙媜媞媟媠媢媧媬媱媲媳媵媸媺媻媿"],["8fbaa1","嫄嫆嫈嫏嫚嫜嫠嫥嫪嫮嫵嫶嫽嬀嬁嬈嬗嬴嬙嬛嬝嬡嬥嬭嬸孁孋孌孒孖孞孨孮孯孼孽孾孿宁宄宆宊宎宐宑宓宔宖宨宩宬宭宯宱宲宷宺宼寀寁寍寏寖",4,"寠寯寱寴寽尌尗尞尟尣尦尩尫尬尮尰尲尵尶屙屚屜屢屣屧屨屩"],["8fbba1","屭屰屴屵屺屻屼屽岇岈岊岏岒岝岟岠岢岣岦岪岲岴岵岺峉峋峒峝峗峮峱峲峴崁崆崍崒崫崣崤崦崧崱崴崹崽崿嵂嵃嵆嵈嵕嵑嵙嵊嵟嵠嵡嵢嵤嵪嵭嵰嵹嵺嵾嵿嶁嶃嶈嶊嶒嶓嶔嶕嶙嶛嶟嶠嶧嶫嶰嶴嶸嶹巃巇巋巐巎巘巙巠巤"],["8fbca1","巩巸巹帀帇帍帒帔帕帘帟帠帮帨帲帵帾幋幐幉幑幖幘幛幜幞幨幪",4,"幰庀庋庎庢庤庥庨庪庬庱庳庽庾庿廆廌廋廎廑廒廔廕廜廞廥廫异弆弇弈弎弙弜弝弡弢弣弤弨弫弬弮弰弴弶弻弽弿彀彄彅彇彍彐彔彘彛彠彣彤彧"],["8fbda1","彯彲彴彵彸彺彽彾徉徍徏徖徜徝徢徧徫徤徬徯徰徱徸忄忇忈忉忋忐",4,"忞忡忢忨忩忪忬忭忮忯忲忳忶忺忼怇怊怍怓怔怗怘怚怟怤怭怳怵恀恇恈恉恌恑恔恖恗恝恡恧恱恾恿悂悆悈悊悎悑悓悕悘悝悞悢悤悥您悰悱悷"],["8fbea1","悻悾惂惄惈惉惊惋惎惏惔惕惙惛惝惞惢惥惲惵惸惼惽愂愇愊愌愐",4,"愖愗愙愜愞愢愪愫愰愱愵愶愷愹慁慅慆慉慞慠慬慲慸慻慼慿憀憁憃憄憋憍憒憓憗憘憜憝憟憠憥憨憪憭憸憹憼懀懁懂懎懏懕懜懝懞懟懡懢懧懩懥"],["8fbfa1","懬懭懯戁戃戄戇戓戕戜戠戢戣戧戩戫戹戽扂扃扄扆扌扐扑扒扔扖扚扜扤扭扯扳扺扽抍抎抏抐抦抨抳抶抷抺抾抿拄拎拕拖拚拪拲拴拼拽挃挄挊挋挍挐挓挖挘挩挪挭挵挶挹挼捁捂捃捄捆捊捋捎捒捓捔捘捛捥捦捬捭捱捴捵"],["8fc0a1","捸捼捽捿掂掄掇掊掐掔掕掙掚掞掤掦掭掮掯掽揁揅揈揎揑揓揔揕揜揠揥揪揬揲揳揵揸揹搉搊搐搒搔搘搞搠搢搤搥搩搪搯搰搵搽搿摋摏摑摒摓摔摚摛摜摝摟摠摡摣摭摳摴摻摽撅撇撏撐撑撘撙撛撝撟撡撣撦撨撬撳撽撾撿"],["8fc1a1","擄擉擊擋擌擎擐擑擕擗擤擥擩擪擭擰擵擷擻擿攁攄攈攉攊攏攓攔攖攙攛攞攟攢攦攩攮攱攺攼攽敃敇敉敐敒敔敟敠敧敫敺敽斁斅斊斒斕斘斝斠斣斦斮斲斳斴斿旂旈旉旎旐旔旖旘旟旰旲旴旵旹旾旿昀昄昈昉昍昑昒昕昖昝"],["8fc2a1","昞昡昢昣昤昦昩昪昫昬昮昰昱昳昹昷晀晅晆晊晌晑晎晗晘晙晛晜晠晡曻晪晫晬晾晳晵晿晷晸晹晻暀晼暋暌暍暐暒暙暚暛暜暟暠暤暭暱暲暵暻暿曀曂曃曈曌曎曏曔曛曟曨曫曬曮曺朅朇朎朓朙朜朠朢朳朾杅杇杈杌杔杕杝"],["8fc3a1","杦杬杮杴杶杻极构枎枏枑枓枖枘枙枛枰枱枲枵枻枼枽柹柀柂柃柅柈柉柒柗柙柜柡柦柰柲柶柷桒栔栙栝栟栨栧栬栭栯栰栱栳栻栿桄桅桊桌桕桗桘桛桫桮",4,"桵桹桺桻桼梂梄梆梈梖梘梚梜梡梣梥梩梪梮梲梻棅棈棌棏"],["8fc4a1","棐棑棓棖棙棜棝棥棨棪棫棬棭棰棱棵棶棻棼棽椆椉椊椐椑椓椖椗椱椳椵椸椻楂楅楉楎楗楛楣楤楥楦楨楩楬楰楱楲楺楻楿榀榍榒榖榘榡榥榦榨榫榭榯榷榸榺榼槅槈槑槖槗槢槥槮槯槱槳槵槾樀樁樃樏樑樕樚樝樠樤樨樰樲"],["8fc5a1","樴樷樻樾樿橅橆橉橊橎橐橑橒橕橖橛橤橧橪橱橳橾檁檃檆檇檉檋檑檛檝檞檟檥檫檯檰檱檴檽檾檿櫆櫉櫈櫌櫐櫔櫕櫖櫜櫝櫤櫧櫬櫰櫱櫲櫼櫽欂欃欆欇欉欏欐欑欗欛欞欤欨欫欬欯欵欶欻欿歆歊歍歒歖歘歝歠歧歫歮歰歵歽"],["8fc6a1","歾殂殅殗殛殟殠殢殣殨殩殬殭殮殰殸殹殽殾毃毄毉毌毖毚毡毣毦毧毮毱毷毹毿氂氄氅氉氍氎氐氒氙氟氦氧氨氬氮氳氵氶氺氻氿汊汋汍汏汒汔汙汛汜汫汭汯汴汶汸汹汻沅沆沇沉沔沕沗沘沜沟沰沲沴泂泆泍泏泐泑泒泔泖"],["8fc7a1","泚泜泠泧泩泫泬泮泲泴洄洇洊洎洏洑洓洚洦洧洨汧洮洯洱洹洼洿浗浞浟浡浥浧浯浰浼涂涇涑涒涔涖涗涘涪涬涴涷涹涽涿淄淈淊淎淏淖淛淝淟淠淢淥淩淯淰淴淶淼渀渄渞渢渧渲渶渹渻渼湄湅湈湉湋湏湑湒湓湔湗湜湝湞"],["8fc8a1","湢湣湨湳湻湽溍溓溙溠溧溭溮溱溳溻溿滀滁滃滇滈滊滍滎滏滫滭滮滹滻滽漄漈漊漌漍漖漘漚漛漦漩漪漯漰漳漶漻漼漭潏潑潒潓潗潙潚潝潞潡潢潨潬潽潾澃澇澈澋澌澍澐澒澓澔澖澚澟澠澥澦澧澨澮澯澰澵澶澼濅濇濈濊"],["8fc9a1","濚濞濨濩濰濵濹濼濽瀀瀅瀆瀇瀍瀗瀠瀣瀯瀴瀷瀹瀼灃灄灈灉灊灋灔灕灝灞灎灤灥灬灮灵灶灾炁炅炆炔",4,"炛炤炫炰炱炴炷烊烑烓烔烕烖烘烜烤烺焃",4,"焋焌焏焞焠焫焭焯焰焱焸煁煅煆煇煊煋煐煒煗煚煜煞煠"],["8fcaa1","煨煹熀熅熇熌熒熚熛熠熢熯熰熲熳熺熿燀燁燄燋燌燓燖燙燚燜燸燾爀爇爈爉爓爗爚爝爟爤爫爯爴爸爹牁牂牃牅牎牏牐牓牕牖牚牜牞牠牣牨牫牮牯牱牷牸牻牼牿犄犉犍犎犓犛犨犭犮犱犴犾狁狇狉狌狕狖狘狟狥狳狴狺狻"],["8fcba1","狾猂猄猅猇猋猍猒猓猘猙猞猢猤猧猨猬猱猲猵猺猻猽獃獍獐獒獖獘獝獞獟獠獦獧獩獫獬獮獯獱獷獹獼玀玁玃玅玆玎玐玓玕玗玘玜玞玟玠玢玥玦玪玫玭玵玷玹玼玽玿珅珆珉珋珌珏珒珓珖珙珝珡珣珦珧珩珴珵珷珹珺珻珽"],["8fcca1","珿琀琁琄琇琊琑琚琛琤琦琨",9,"琹瑀瑃瑄瑆瑇瑋瑍瑑瑒瑗瑝瑢瑦瑧瑨瑫瑭瑮瑱瑲璀璁璅璆璇璉璏璐璑璒璘璙璚璜璟璠璡璣璦璨璩璪璫璮璯璱璲璵璹璻璿瓈瓉瓌瓐瓓瓘瓚瓛瓞瓟瓤瓨瓪瓫瓯瓴瓺瓻瓼瓿甆"],["8fcda1","甒甖甗甠甡甤甧甩甪甯甶甹甽甾甿畀畃畇畈畎畐畒畗畞畟畡畯畱畹",5,"疁疅疐疒疓疕疙疜疢疤疴疺疿痀痁痄痆痌痎痏痗痜痟痠痡痤痧痬痮痯痱痹瘀瘂瘃瘄瘇瘈瘊瘌瘏瘒瘓瘕瘖瘙瘛瘜瘝瘞瘣瘥瘦瘩瘭瘲瘳瘵瘸瘹"],["8fcea1","瘺瘼癊癀癁癃癄癅癉癋癕癙癟癤癥癭癮癯癱癴皁皅皌皍皕皛皜皝皟皠皢",6,"皪皭皽盁盅盉盋盌盎盔盙盠盦盨盬盰盱盶盹盼眀眆眊眎眒眔眕眗眙眚眜眢眨眭眮眯眴眵眶眹眽眾睂睅睆睊睍睎睏睒睖睗睜睞睟睠睢"],["8fcfa1","睤睧睪睬睰睲睳睴睺睽瞀瞄瞌瞍瞔瞕瞖瞚瞟瞢瞧瞪瞮瞯瞱瞵瞾矃矉矑矒矕矙矞矟矠矤矦矪矬矰矱矴矸矻砅砆砉砍砎砑砝砡砢砣砭砮砰砵砷硃硄硇硈硌硎硒硜硞硠硡硣硤硨硪确硺硾碊碏碔碘碡碝碞碟碤碨碬碭碰碱碲碳"],["8fd0a1","碻碽碿磇磈磉磌磎磒磓磕磖磤磛磟磠磡磦磪磲磳礀磶磷磺磻磿礆礌礐礚礜礞礟礠礥礧礩礭礱礴礵礻礽礿祄祅祆祊祋祏祑祔祘祛祜祧祩祫祲祹祻祼祾禋禌禑禓禔禕禖禘禛禜禡禨禩禫禯禱禴禸离秂秄秇秈秊秏秔秖秚秝秞"],["8fd1a1","秠秢秥秪秫秭秱秸秼稂稃稇稉稊稌稑稕稛稞稡稧稫稭稯稰稴稵稸稹稺穄穅穇穈穌穕穖穙穜穝穟穠穥穧穪穭穵穸穾窀窂窅窆窊窋窐窑窔窞窠窣窬窳窵窹窻窼竆竉竌竎竑竛竨竩竫竬竱竴竻竽竾笇笔笟笣笧笩笪笫笭笮笯笰"],["8fd2a1","笱笴笽笿筀筁筇筎筕筠筤筦筩筪筭筯筲筳筷箄箉箎箐箑箖箛箞箠箥箬箯箰箲箵箶箺箻箼箽篂篅篈篊篔篖篗篙篚篛篨篪篲篴篵篸篹篺篼篾簁簂簃簄簆簉簋簌簎簏簙簛簠簥簦簨簬簱簳簴簶簹簺籆籊籕籑籒籓籙",5],["8fd3a1","籡籣籧籩籭籮籰籲籹籼籽粆粇粏粔粞粠粦粰粶粷粺粻粼粿糄糇糈糉糍糏糓糔糕糗糙糚糝糦糩糫糵紃紇紈紉紏紑紒紓紖紝紞紣紦紪紭紱紼紽紾絀絁絇絈絍絑絓絗絙絚絜絝絥絧絪絰絸絺絻絿綁綂綃綅綆綈綋綌綍綑綖綗綝"],["8fd4a1","綞綦綧綪綳綶綷綹緂",4,"緌緍緎緗緙縀緢緥緦緪緫緭緱緵緶緹緺縈縐縑縕縗縜縝縠縧縨縬縭縯縳縶縿繄繅繇繎繐繒繘繟繡繢繥繫繮繯繳繸繾纁纆纇纊纍纑纕纘纚纝纞缼缻缽缾缿罃罄罇罏罒罓罛罜罝罡罣罤罥罦罭"],["8fd5a1","罱罽罾罿羀羋羍羏羐羑羖羗羜羡羢羦羪羭羴羼羿翀翃翈翎翏翛翟翣翥翨翬翮翯翲翺翽翾翿耇耈耊耍耎耏耑耓耔耖耝耞耟耠耤耦耬耮耰耴耵耷耹耺耼耾聀聄聠聤聦聭聱聵肁肈肎肜肞肦肧肫肸肹胈胍胏胒胔胕胗胘胠胭胮"],["8fd6a1","胰胲胳胶胹胺胾脃脋脖脗脘脜脞脠脤脧脬脰脵脺脼腅腇腊腌腒腗腠腡腧腨腩腭腯腷膁膐膄膅膆膋膎膖膘膛膞膢膮膲膴膻臋臃臅臊臎臏臕臗臛臝臞臡臤臫臬臰臱臲臵臶臸臹臽臿舀舃舏舓舔舙舚舝舡舢舨舲舴舺艃艄艅艆"],["8fd7a1","艋艎艏艑艖艜艠艣艧艭艴艻艽艿芀芁芃芄芇芉芊芎芑芔芖芘芚芛芠芡芣芤芧芨芩芪芮芰芲芴芷芺芼芾芿苆苐苕苚苠苢苤苨苪苭苯苶苷苽苾茀茁茇茈茊茋荔茛茝茞茟茡茢茬茭茮茰茳茷茺茼茽荂荃荄荇荍荎荑荕荖荗荰荸"],["8fd8a1","荽荿莀莂莄莆莍莒莔莕莘莙莛莜莝莦莧莩莬莾莿菀菇菉菏菐菑菔菝荓菨菪菶菸菹菼萁萆萊萏萑萕萙莭萯萹葅葇葈葊葍葏葑葒葖葘葙葚葜葠葤葥葧葪葰葳葴葶葸葼葽蒁蒅蒒蒓蒕蒞蒦蒨蒩蒪蒯蒱蒴蒺蒽蒾蓀蓂蓇蓈蓌蓏蓓"],["8fd9a1","蓜蓧蓪蓯蓰蓱蓲蓷蔲蓺蓻蓽蔂蔃蔇蔌蔎蔐蔜蔞蔢蔣蔤蔥蔧蔪蔫蔯蔳蔴蔶蔿蕆蕏",4,"蕖蕙蕜",6,"蕤蕫蕯蕹蕺蕻蕽蕿薁薅薆薉薋薌薏薓薘薝薟薠薢薥薧薴薶薷薸薼薽薾薿藂藇藊藋藎薭藘藚藟藠藦藨藭藳藶藼"],["8fdaa1","藿蘀蘄蘅蘍蘎蘐蘑蘒蘘蘙蘛蘞蘡蘧蘩蘶蘸蘺蘼蘽虀虂虆虒虓虖虗虘虙虝虠",4,"虩虬虯虵虶虷虺蚍蚑蚖蚘蚚蚜蚡蚦蚧蚨蚭蚱蚳蚴蚵蚷蚸蚹蚿蛀蛁蛃蛅蛑蛒蛕蛗蛚蛜蛠蛣蛥蛧蚈蛺蛼蛽蜄蜅蜇蜋蜎蜏蜐蜓蜔蜙蜞蜟蜡蜣"],["8fdba1","蜨蜮蜯蜱蜲蜹蜺蜼蜽蜾蝀蝃蝅蝍蝘蝝蝡蝤蝥蝯蝱蝲蝻螃",6,"螋螌螐螓螕螗螘螙螞螠螣螧螬螭螮螱螵螾螿蟁蟈蟉蟊蟎蟕蟖蟙蟚蟜蟟蟢蟣蟤蟪蟫蟭蟱蟳蟸蟺蟿蠁蠃蠆蠉蠊蠋蠐蠙蠒蠓蠔蠘蠚蠛蠜蠞蠟蠨蠭蠮蠰蠲蠵"],["8fdca1","蠺蠼衁衃衅衈衉衊衋衎衑衕衖衘衚衜衟衠衤衩衱衹衻袀袘袚袛袜袟袠袨袪袺袽袾裀裊",4,"裑裒裓裛裞裧裯裰裱裵裷褁褆褍褎褏褕褖褘褙褚褜褠褦褧褨褰褱褲褵褹褺褾襀襂襅襆襉襏襒襗襚襛襜襡襢襣襫襮襰襳襵襺"],["8fdda1","襻襼襽覉覍覐覔覕覛覜覟覠覥覰覴覵覶覷覼觔",4,"觥觩觫觭觱觳觶觹觽觿訄訅訇訏訑訒訔訕訞訠訢訤訦訫訬訯訵訷訽訾詀詃詅詇詉詍詎詓詖詗詘詜詝詡詥詧詵詶詷詹詺詻詾詿誀誃誆誋誏誐誒誖誗誙誟誧誩誮誯誳"],["8fdea1","誶誷誻誾諃諆諈諉諊諑諓諔諕諗諝諟諬諰諴諵諶諼諿謅謆謋謑謜謞謟謊謭謰謷謼譂",4,"譈譒譓譔譙譍譞譣譭譶譸譹譼譾讁讄讅讋讍讏讔讕讜讞讟谸谹谽谾豅豇豉豋豏豑豓豔豗豘豛豝豙豣豤豦豨豩豭豳豵豶豻豾貆"],["8fdfa1","貇貋貐貒貓貙貛貜貤貹貺賅賆賉賋賏賖賕賙賝賡賨賬賯賰賲賵賷賸賾賿贁贃贉贒贗贛赥赩赬赮赿趂趄趈趍趐趑趕趞趟趠趦趫趬趯趲趵趷趹趻跀跅跆跇跈跊跎跑跔跕跗跙跤跥跧跬跰趼跱跲跴跽踁踄踅踆踋踑踔踖踠踡踢"],["8fe0a1","踣踦踧踱踳踶踷踸踹踽蹀蹁蹋蹍蹎蹏蹔蹛蹜蹝蹞蹡蹢蹩蹬蹭蹯蹰蹱蹹蹺蹻躂躃躉躐躒躕躚躛躝躞躢躧躩躭躮躳躵躺躻軀軁軃軄軇軏軑軔軜軨軮軰軱軷軹軺軭輀輂輇輈輏輐輖輗輘輞輠輡輣輥輧輨輬輭輮輴輵輶輷輺轀轁"],["8fe1a1","轃轇轏轑",4,"轘轝轞轥辝辠辡辤辥辦辵辶辸达迀迁迆迊迋迍运迒迓迕迠迣迤迨迮迱迵迶迻迾适逄逈逌逘逛逨逩逯逪逬逭逳逴逷逿遃遄遌遛遝遢遦遧遬遰遴遹邅邈邋邌邎邐邕邗邘邙邛邠邡邢邥邰邲邳邴邶邽郌邾郃"],["8fe2a1","郄郅郇郈郕郗郘郙郜郝郟郥郒郶郫郯郰郴郾郿鄀鄄鄅鄆鄈鄍鄐鄔鄖鄗鄘鄚鄜鄞鄠鄥鄢鄣鄧鄩鄮鄯鄱鄴鄶鄷鄹鄺鄼鄽酃酇酈酏酓酗酙酚酛酡酤酧酭酴酹酺酻醁醃醅醆醊醎醑醓醔醕醘醞醡醦醨醬醭醮醰醱醲醳醶醻醼醽醿"],["8fe3a1","釂釃釅釓釔釗釙釚釞釤釥釩釪釬",5,"釷釹釻釽鈀鈁鈄鈅鈆鈇鈉鈊鈌鈐鈒鈓鈖鈘鈜鈝鈣鈤鈥鈦鈨鈮鈯鈰鈳鈵鈶鈸鈹鈺鈼鈾鉀鉂鉃鉆鉇鉊鉍鉎鉏鉑鉘鉙鉜鉝鉠鉡鉥鉧鉨鉩鉮鉯鉰鉵",4,"鉻鉼鉽鉿銈銉銊銍銎銒銗"],["8fe4a1","銙銟銠銤銥銧銨銫銯銲銶銸銺銻銼銽銿",4,"鋅鋆鋇鋈鋋鋌鋍鋎鋐鋓鋕鋗鋘鋙鋜鋝鋟鋠鋡鋣鋥鋧鋨鋬鋮鋰鋹鋻鋿錀錂錈錍錑錔錕錜錝錞錟錡錤錥錧錩錪錳錴錶錷鍇鍈鍉鍐鍑鍒鍕鍗鍘鍚鍞鍤鍥鍧鍩鍪鍭鍯鍰鍱鍳鍴鍶"],["8fe5a1","鍺鍽鍿鎀鎁鎂鎈鎊鎋鎍鎏鎒鎕鎘鎛鎞鎡鎣鎤鎦鎨鎫鎴鎵鎶鎺鎩鏁鏄鏅鏆鏇鏉",4,"鏓鏙鏜鏞鏟鏢鏦鏧鏹鏷鏸鏺鏻鏽鐁鐂鐄鐈鐉鐍鐎鐏鐕鐖鐗鐟鐮鐯鐱鐲鐳鐴鐻鐿鐽鑃鑅鑈鑊鑌鑕鑙鑜鑟鑡鑣鑨鑫鑭鑮鑯鑱鑲钄钃镸镹"],["8fe6a1","镾閄閈閌閍閎閝閞閟閡閦閩閫閬閴閶閺閽閿闆闈闉闋闐闑闒闓闙闚闝闞闟闠闤闦阝阞阢阤阥阦阬阱阳阷阸阹阺阼阽陁陒陔陖陗陘陡陮陴陻陼陾陿隁隂隃隄隉隑隖隚隝隟隤隥隦隩隮隯隳隺雊雒嶲雘雚雝雞雟雩雯雱雺霂"],["8fe7a1","霃霅霉霚霛霝霡霢霣霨霱霳靁靃靊靎靏靕靗靘靚靛靣靧靪靮靳靶靷靸靻靽靿鞀鞉鞕鞖鞗鞙鞚鞞鞟鞢鞬鞮鞱鞲鞵鞶鞸鞹鞺鞼鞾鞿韁韄韅韇韉韊韌韍韎韐韑韔韗韘韙韝韞韠韛韡韤韯韱韴韷韸韺頇頊頙頍頎頔頖頜頞頠頣頦"],["8fe8a1","頫頮頯頰頲頳頵頥頾顄顇顊顑顒顓顖顗顙顚顢顣顥顦顪顬颫颭颮颰颴颷颸颺颻颿飂飅飈飌飡飣飥飦飧飪飳飶餂餇餈餑餕餖餗餚餛餜餟餢餦餧餫餱",4,"餹餺餻餼饀饁饆饇饈饍饎饔饘饙饛饜饞饟饠馛馝馟馦馰馱馲馵"],["8fe9a1","馹馺馽馿駃駉駓駔駙駚駜駞駧駪駫駬駰駴駵駹駽駾騂騃騄騋騌騐騑騖騞騠騢騣騤騧騭騮騳騵騶騸驇驁驄驊驋驌驎驑驔驖驝骪骬骮骯骲骴骵骶骹骻骾骿髁髃髆髈髎髐髒髕髖髗髛髜髠髤髥髧髩髬髲髳髵髹髺髽髿",4],["8feaa1","鬄鬅鬈鬉鬋鬌鬍鬎鬐鬒鬖鬙鬛鬜鬠鬦鬫鬭鬳鬴鬵鬷鬹鬺鬽魈魋魌魕魖魗魛魞魡魣魥魦魨魪",4,"魳魵魷魸魹魿鮀鮄鮅鮆鮇鮉鮊鮋鮍鮏鮐鮔鮚鮝鮞鮦鮧鮩鮬鮰鮱鮲鮷鮸鮻鮼鮾鮿鯁鯇鯈鯎鯐鯗鯘鯝鯟鯥鯧鯪鯫鯯鯳鯷鯸"],["8feba1","鯹鯺鯽鯿鰀鰂鰋鰏鰑鰖鰘鰙鰚鰜鰞鰢鰣鰦",4,"鰱鰵鰶鰷鰽鱁鱃鱄鱅鱉鱊鱎鱏鱐鱓鱔鱖鱘鱛鱝鱞鱟鱣鱩鱪鱜鱫鱨鱮鱰鱲鱵鱷鱻鳦鳲鳷鳹鴋鴂鴑鴗鴘鴜鴝鴞鴯鴰鴲鴳鴴鴺鴼鵅鴽鵂鵃鵇鵊鵓鵔鵟鵣鵢鵥鵩鵪鵫鵰鵶鵷鵻"],["8feca1","鵼鵾鶃鶄鶆鶊鶍鶎鶒鶓鶕鶖鶗鶘鶡鶪鶬鶮鶱鶵鶹鶼鶿鷃鷇鷉鷊鷔鷕鷖鷗鷚鷞鷟鷠鷥鷧鷩鷫鷮鷰鷳鷴鷾鸊鸂鸇鸎鸐鸑鸒鸕鸖鸙鸜鸝鹺鹻鹼麀麂麃麄麅麇麎麏麖麘麛麞麤麨麬麮麯麰麳麴麵黆黈黋黕黟黤黧黬黭黮黰黱黲黵"],["8feda1","黸黿鼂鼃鼉鼏鼐鼑鼒鼔鼖鼗鼙鼚鼛鼟鼢鼦鼪鼫鼯鼱鼲鼴鼷鼹鼺鼼鼽鼿齁齃",4,"齓齕齖齗齘齚齝齞齨齩齭",4,"齳齵齺齽龏龐龑龒龔龖龗龞龡龢龣龥"]]'), ci = /* @__PURE__ */ JSON.parse('[["0","\\u0000",127,"€"],["8140","丂丄丅丆丏丒丗丟丠両丣並丩丮丯丱丳丵丷丼乀乁乂乄乆乊乑乕乗乚乛乢乣乤乥乧乨乪",5,"乲乴",9,"乿",6,"亇亊"],["8180","亐亖亗亙亜亝亞亣亪亯亰亱亴亶亷亸亹亼亽亾仈仌仏仐仒仚仛仜仠仢仦仧仩仭仮仯仱仴仸仹仺仼仾伀伂",6,"伋伌伒",4,"伜伝伡伣伨伩伬伭伮伱伳伵伷伹伻伾",4,"佄佅佇",5,"佒佔佖佡佢佦佨佪佫佭佮佱佲併佷佸佹佺佽侀侁侂侅來侇侊侌侎侐侒侓侕侖侘侙侚侜侞侟価侢"],["8240","侤侫侭侰",4,"侶",8,"俀俁係俆俇俈俉俋俌俍俒",4,"俙俛俠俢俤俥俧俫俬俰俲俴俵俶俷俹俻俼俽俿",11],["8280","個倎倐們倓倕倖倗倛倝倞倠倢倣値倧倫倯",10,"倻倽倿偀偁偂偄偅偆偉偊偋偍偐",4,"偖偗偘偙偛偝",7,"偦",5,"偭",8,"偸偹偺偼偽傁傂傃傄傆傇傉傊傋傌傎",20,"傤傦傪傫傭",4,"傳",6,"傼"],["8340","傽",17,"僐",5,"僗僘僙僛",10,"僨僩僪僫僯僰僱僲僴僶",4,"僼",9,"儈"],["8380","儉儊儌",5,"儓",13,"儢",28,"兂兇兊兌兎兏児兒兓兗兘兙兛兝",4,"兣兤兦內兩兪兯兲兺兾兿冃冄円冇冊冋冎冏冐冑冓冔冘冚冝冞冟冡冣冦",4,"冭冮冴冸冹冺冾冿凁凂凃凅凈凊凍凎凐凒",5],["8440","凘凙凚凜凞凟凢凣凥",5,"凬凮凱凲凴凷凾刄刅刉刋刌刏刐刓刔刕刜刞刟刡刢刣別刦刧刪刬刯刱刲刴刵刼刾剄",5,"剋剎剏剒剓剕剗剘"],["8480","剙剚剛剝剟剠剢剣剤剦剨剫剬剭剮剰剱剳",9,"剾劀劃",4,"劉",6,"劑劒劔",6,"劜劤劥劦劧劮劯劰労",9,"勀勁勂勄勅勆勈勊勌勍勎勏勑勓勔動勗務",5,"勠勡勢勣勥",10,"勱",7,"勻勼勽匁匂匃匄匇匉匊匋匌匎"],["8540","匑匒匓匔匘匛匜匞匟匢匤匥匧匨匩匫匬匭匯",9,"匼匽區卂卄卆卋卌卍卐協単卙卛卝卥卨卪卬卭卲卶卹卻卼卽卾厀厁厃厇厈厊厎厏"],["8580","厐",4,"厖厗厙厛厜厞厠厡厤厧厪厫厬厭厯",6,"厷厸厹厺厼厽厾叀參",4,"収叏叐叒叓叕叚叜叝叞叡叢叧叴叺叾叿吀吂吅吇吋吔吘吙吚吜吢吤吥吪吰吳吶吷吺吽吿呁呂呄呅呇呉呌呍呎呏呑呚呝",4,"呣呥呧呩",7,"呴呹呺呾呿咁咃咅咇咈咉咊咍咑咓咗咘咜咞咟咠咡"],["8640","咢咥咮咰咲咵咶咷咹咺咼咾哃哅哊哋哖哘哛哠",4,"哫哬哯哰哱哴",5,"哻哾唀唂唃唄唅唈唊",4,"唒唓唕",5,"唜唝唞唟唡唥唦"],["8680","唨唩唫唭唲唴唵唶唸唹唺唻唽啀啂啅啇啈啋",4,"啑啒啓啔啗",4,"啝啞啟啠啢啣啨啩啫啯",5,"啹啺啽啿喅喆喌喍喎喐喒喓喕喖喗喚喛喞喠",6,"喨",8,"喲喴営喸喺喼喿",4,"嗆嗇嗈嗊嗋嗎嗏嗐嗕嗗",4,"嗞嗠嗢嗧嗩嗭嗮嗰嗱嗴嗶嗸",4,"嗿嘂嘃嘄嘅"],["8740","嘆嘇嘊嘋嘍嘐",7,"嘙嘚嘜嘝嘠嘡嘢嘥嘦嘨嘩嘪嘫嘮嘯嘰嘳嘵嘷嘸嘺嘼嘽嘾噀",11,"噏",4,"噕噖噚噛噝",4],["8780","噣噥噦噧噭噮噯噰噲噳噴噵噷噸噹噺噽",7,"嚇",6,"嚐嚑嚒嚔",14,"嚤",10,"嚰",6,"嚸嚹嚺嚻嚽",12,"囋",8,"囕囖囘囙囜団囥",5,"囬囮囯囲図囶囷囸囻囼圀圁圂圅圇國",6],["8840","園",9,"圝圞圠圡圢圤圥圦圧圫圱圲圴",4,"圼圽圿坁坃坄坅坆坈坉坋坒",4,"坘坙坢坣坥坧坬坮坰坱坲坴坵坸坹坺坽坾坿垀"],["8880","垁垇垈垉垊垍",4,"垔",6,"垜垝垞垟垥垨垪垬垯垰垱垳垵垶垷垹",8,"埄",6,"埌埍埐埑埓埖埗埛埜埞埡埢埣埥",7,"埮埰埱埲埳埵埶執埻埼埾埿堁堃堄堅堈堉堊堌堎堏堐堒堓堔堖堗堘堚堛堜堝堟堢堣堥",4,"堫",4,"報堲堳場堶",7],["8940","堾",5,"塅",6,"塎塏塐塒塓塕塖塗塙",4,"塟",5,"塦",4,"塭",16,"塿墂墄墆墇墈墊墋墌"],["8980","墍",4,"墔",4,"墛墜墝墠",7,"墪",17,"墽墾墿壀壂壃壄壆",10,"壒壓壔壖",13,"壥",5,"壭壯壱売壴壵壷壸壺",7,"夃夅夆夈",4,"夎夐夑夒夓夗夘夛夝夞夠夡夢夣夦夨夬夰夲夳夵夶夻"],["8a40","夽夾夿奀奃奅奆奊奌奍奐奒奓奙奛",4,"奡奣奤奦",12,"奵奷奺奻奼奾奿妀妅妉妋妌妎妏妐妑妔妕妘妚妛妜妝妟妠妡妢妦"],["8a80","妧妬妭妰妱妳",5,"妺妼妽妿",6,"姇姈姉姌姍姎姏姕姖姙姛姞",4,"姤姦姧姩姪姫姭",11,"姺姼姽姾娀娂娊娋娍娎娏娐娒娔娕娖娗娙娚娛娝娞娡娢娤娦娧娨娪",6,"娳娵娷",4,"娽娾娿婁",4,"婇婈婋",9,"婖婗婘婙婛",5],["8b40","婡婣婤婥婦婨婩婫",8,"婸婹婻婼婽婾媀",17,"媓",6,"媜",13,"媫媬"],["8b80","媭",4,"媴媶媷媹",4,"媿嫀嫃",5,"嫊嫋嫍",4,"嫓嫕嫗嫙嫚嫛嫝嫞嫟嫢嫤嫥嫧嫨嫪嫬",4,"嫲",22,"嬊",11,"嬘",25,"嬳嬵嬶嬸",7,"孁",6],["8c40","孈",7,"孒孖孞孠孡孧孨孫孭孮孯孲孴孶孷學孹孻孼孾孿宂宆宊宍宎宐宑宒宔宖実宧宨宩宬宭宮宯宱宲宷宺宻宼寀寁寃寈寉寊寋寍寎寏"],["8c80","寑寔",8,"寠寢寣實寧審",4,"寯寱",6,"寽対尀専尃尅將專尋尌對導尐尒尓尗尙尛尞尟尠尡尣尦尨尩尪尫尭尮尯尰尲尳尵尶尷屃屄屆屇屌屍屒屓屔屖屗屘屚屛屜屝屟屢層屧",6,"屰屲",6,"屻屼屽屾岀岃",4,"岉岊岋岎岏岒岓岕岝",4,"岤",4],["8d40","岪岮岯岰岲岴岶岹岺岻岼岾峀峂峃峅",5,"峌",5,"峓",5,"峚",6,"峢峣峧峩峫峬峮峯峱",9,"峼",4],["8d80","崁崄崅崈",5,"崏",4,"崕崗崘崙崚崜崝崟",4,"崥崨崪崫崬崯",4,"崵",7,"崿",7,"嵈嵉嵍",10,"嵙嵚嵜嵞",10,"嵪嵭嵮嵰嵱嵲嵳嵵",12,"嶃",21,"嶚嶛嶜嶞嶟嶠"],["8e40","嶡",21,"嶸",12,"巆",6,"巎",12,"巜巟巠巣巤巪巬巭"],["8e80","巰巵巶巸",4,"巿帀帄帇帉帊帋帍帎帒帓帗帞",7,"帨",4,"帯帰帲",4,"帹帺帾帿幀幁幃幆",5,"幍",6,"幖",4,"幜幝幟幠幣",14,"幵幷幹幾庁庂広庅庈庉庌庍庎庒庘庛庝庡庢庣庤庨",4,"庮",4,"庴庺庻庼庽庿",6],["8f40","廆廇廈廋",5,"廔廕廗廘廙廚廜",11,"廩廫",8,"廵廸廹廻廼廽弅弆弇弉弌弍弎弐弒弔弖弙弚弜弝弞弡弢弣弤"],["8f80","弨弫弬弮弰弲",6,"弻弽弾弿彁",14,"彑彔彙彚彛彜彞彟彠彣彥彧彨彫彮彯彲彴彵彶彸彺彽彾彿徃徆徍徎徏徑従徔徖徚徛徝從徟徠徢",5,"復徫徬徯",5,"徶徸徹徺徻徾",4,"忇忈忊忋忎忓忔忕忚忛応忞忟忢忣忥忦忨忩忬忯忰忲忳忴忶忷忹忺忼怇"],["9040","怈怉怋怌怐怑怓怗怘怚怞怟怢怣怤怬怭怮怰",4,"怶",4,"怽怾恀恄",6,"恌恎恏恑恓恔恖恗恘恛恜恞恟恠恡恥恦恮恱恲恴恵恷恾悀"],["9080","悁悂悅悆悇悈悊悋悎悏悐悑悓悕悗悘悙悜悞悡悢悤悥悧悩悪悮悰悳悵悶悷悹悺悽",7,"惇惈惉惌",4,"惒惓惔惖惗惙惛惞惡",4,"惪惱惲惵惷惸惻",4,"愂愃愄愅愇愊愋愌愐",4,"愖愗愘愙愛愜愝愞愡愢愥愨愩愪愬",18,"慀",6],["9140","慇慉態慍慏慐慒慓慔慖",6,"慞慟慠慡慣慤慥慦慩",6,"慱慲慳慴慶慸",18,"憌憍憏",4,"憕"],["9180","憖",6,"憞",8,"憪憫憭",9,"憸",5,"憿懀懁懃",4,"應懌",4,"懓懕",16,"懧",13,"懶",8,"戀",5,"戇戉戓戔戙戜戝戞戠戣戦戧戨戩戫戭戯戰戱戲戵戶戸",4,"扂扄扅扆扊"],["9240","扏扐払扖扗扙扚扜",6,"扤扥扨扱扲扴扵扷扸扺扻扽抁抂抃抅抆抇抈抋",5,"抔抙抜抝択抣抦抧抩抪抭抮抯抰抲抳抴抶抷抸抺抾拀拁"],["9280","拃拋拏拑拕拝拞拠拡拤拪拫拰拲拵拸拹拺拻挀挃挄挅挆挊挋挌挍挏挐挒挓挔挕挗挘挙挜挦挧挩挬挭挮挰挱挳",5,"挻挼挾挿捀捁捄捇捈捊捑捒捓捔捖",7,"捠捤捥捦捨捪捫捬捯捰捲捳捴捵捸捹捼捽捾捿掁掃掄掅掆掋掍掑掓掔掕掗掙",6,"採掤掦掫掯掱掲掵掶掹掻掽掿揀"],["9340","揁揂揃揅揇揈揊揋揌揑揓揔揕揗",6,"揟揢揤",4,"揫揬揮揯揰揱揳揵揷揹揺揻揼揾搃搄搆",4,"損搎搑搒搕",5,"搝搟搢搣搤"],["9380","搥搧搨搩搫搮",5,"搵",4,"搻搼搾摀摂摃摉摋",6,"摓摕摖摗摙",4,"摟",7,"摨摪摫摬摮",9,"摻",6,"撃撆撈",8,"撓撔撗撘撚撛撜撝撟",4,"撥撦撧撨撪撫撯撱撲撳撴撶撹撻撽撾撿擁擃擄擆",6,"擏擑擓擔擕擖擙據"],["9440","擛擜擝擟擠擡擣擥擧",24,"攁",7,"攊",7,"攓",4,"攙",8],["9480","攢攣攤攦",4,"攬攭攰攱攲攳攷攺攼攽敀",4,"敆敇敊敋敍敎敐敒敓敔敗敘敚敜敟敠敡敤敥敧敨敩敪敭敮敯敱敳敵敶數",14,"斈斉斊斍斎斏斒斔斕斖斘斚斝斞斠斢斣斦斨斪斬斮斱",7,"斺斻斾斿旀旂旇旈旉旊旍旐旑旓旔旕旘",7,"旡旣旤旪旫"],["9540","旲旳旴旵旸旹旻",4,"昁昄昅昇昈昉昋昍昐昑昒昖昗昘昚昛昜昞昡昢昣昤昦昩昪昫昬昮昰昲昳昷",4,"昽昿晀時晄",6,"晍晎晐晑晘"],["9580","晙晛晜晝晞晠晢晣晥晧晩",4,"晱晲晳晵晸晹晻晼晽晿暀暁暃暅暆暈暉暊暋暍暎暏暐暒暓暔暕暘",4,"暞",8,"暩",4,"暯",4,"暵暶暷暸暺暻暼暽暿",25,"曚曞",7,"曧曨曪",5,"曱曵曶書曺曻曽朁朂會"],["9640","朄朅朆朇朌朎朏朑朒朓朖朘朙朚朜朞朠",5,"朧朩朮朰朲朳朶朷朸朹朻朼朾朿杁杄杅杇杊杋杍杒杔杕杗",4,"杝杢杣杤杦杧杫杬杮東杴杶"],["9680","杸杹杺杻杽枀枂枃枅枆枈枊枌枍枎枏枑枒枓枔枖枙枛枟枠枡枤枦枩枬枮枱枲枴枹",7,"柂柅",9,"柕柖柗柛柟柡柣柤柦柧柨柪柫柭柮柲柵",7,"柾栁栂栃栄栆栍栐栒栔栕栘",4,"栞栟栠栢",6,"栫",6,"栴栵栶栺栻栿桇桋桍桏桒桖",5],["9740","桜桝桞桟桪桬",7,"桵桸",8,"梂梄梇",7,"梐梑梒梔梕梖梘",9,"梣梤梥梩梪梫梬梮梱梲梴梶梷梸"],["9780","梹",6,"棁棃",5,"棊棌棎棏棐棑棓棔棖棗棙棛",4,"棡棢棤",9,"棯棲棳棴棶棷棸棻棽棾棿椀椂椃椄椆",4,"椌椏椑椓",11,"椡椢椣椥",7,"椮椯椱椲椳椵椶椷椸椺椻椼椾楀楁楃",16,"楕楖楘楙楛楜楟"],["9840","楡楢楤楥楧楨楩楪楬業楯楰楲",4,"楺楻楽楾楿榁榃榅榊榋榌榎",5,"榖榗榙榚榝",9,"榩榪榬榮榯榰榲榳榵榶榸榹榺榼榽"],["9880","榾榿槀槂",7,"構槍槏槑槒槓槕",5,"槜槝槞槡",11,"槮槯槰槱槳",9,"槾樀",9,"樋",11,"標",5,"樠樢",5,"権樫樬樭樮樰樲樳樴樶",6,"樿",4,"橅橆橈",7,"橑",6,"橚"],["9940","橜",4,"橢橣橤橦",10,"橲",6,"橺橻橽橾橿檁檂檃檅",8,"檏檒",4,"檘",7,"檡",5],["9980","檧檨檪檭",114,"欥欦欨",6],["9a40","欯欰欱欳欴欵欶欸欻欼欽欿歀歁歂歄歅歈歊歋歍",11,"歚",7,"歨歩歫",13,"歺歽歾歿殀殅殈"],["9a80","殌殎殏殐殑殔殕殗殘殙殜",4,"殢",7,"殫",7,"殶殸",6,"毀毃毄毆",4,"毌毎毐毑毘毚毜",4,"毢",7,"毬毭毮毰毱毲毴毶毷毸毺毻毼毾",6,"氈",4,"氎氒気氜氝氞氠氣氥氫氬氭氱氳氶氷氹氺氻氼氾氿汃汄汅汈汋",4,"汑汒汓汖汘"],["9b40","汙汚汢汣汥汦汧汫",4,"汱汳汵汷汸決汻汼汿沀沄沇沊沋沍沎沑沒沕沖沗沘沚沜沝沞沠沢沨沬沯沰沴沵沶沷沺泀況泂泃泆泇泈泋泍泎泏泑泒泘"],["9b80","泙泚泜泝泟泤泦泧泩泬泭泲泴泹泿洀洂洃洅洆洈洉洊洍洏洐洑洓洔洕洖洘洜洝洟",5,"洦洨洩洬洭洯洰洴洶洷洸洺洿浀浂浄浉浌浐浕浖浗浘浛浝浟浡浢浤浥浧浨浫浬浭浰浱浲浳浵浶浹浺浻浽",4,"涃涄涆涇涊涋涍涏涐涒涖",4,"涜涢涥涬涭涰涱涳涴涶涷涹",5,"淁淂淃淈淉淊"],["9c40","淍淎淏淐淒淓淔淕淗淚淛淜淟淢淣淥淧淨淩淪淭淯淰淲淴淵淶淸淺淽",7,"渆渇済渉渋渏渒渓渕渘渙減渜渞渟渢渦渧渨渪測渮渰渱渳渵"],["9c80","渶渷渹渻",7,"湅",7,"湏湐湑湒湕湗湙湚湜湝湞湠",10,"湬湭湯",14,"満溁溂溄溇溈溊",4,"溑",6,"溙溚溛溝溞溠溡溣溤溦溨溩溫溬溭溮溰溳溵溸溹溼溾溿滀滃滄滅滆滈滉滊滌滍滎滐滒滖滘滙滛滜滝滣滧滪",5],["9d40","滰滱滲滳滵滶滷滸滺",7,"漃漄漅漇漈漊",4,"漐漑漒漖",9,"漡漢漣漥漦漧漨漬漮漰漲漴漵漷",6,"漿潀潁潂"],["9d80","潃潄潅潈潉潊潌潎",9,"潙潚潛潝潟潠潡潣潤潥潧",5,"潯潰潱潳潵潶潷潹潻潽",6,"澅澆澇澊澋澏",12,"澝澞澟澠澢",4,"澨",10,"澴澵澷澸澺",5,"濁濃",5,"濊",6,"濓",10,"濟濢濣濤濥"],["9e40","濦",7,"濰",32,"瀒",7,"瀜",6,"瀤",6],["9e80","瀫",9,"瀶瀷瀸瀺",17,"灍灎灐",13,"灟",11,"灮灱灲灳灴灷灹灺灻災炁炂炃炄炆炇炈炋炌炍炏炐炑炓炗炘炚炛炞",12,"炰炲炴炵炶為炾炿烄烅烆烇烉烋",12,"烚"],["9f40","烜烝烞烠烡烢烣烥烪烮烰",6,"烸烺烻烼烾",10,"焋",4,"焑焒焔焗焛",10,"焧",7,"焲焳焴"],["9f80","焵焷",13,"煆煇煈煉煋煍煏",12,"煝煟",4,"煥煩",4,"煯煰煱煴煵煶煷煹煻煼煾",5,"熅",4,"熋熌熍熎熐熑熒熓熕熖熗熚",4,"熡",6,"熩熪熫熭",5,"熴熶熷熸熺",8,"燄",9,"燏",4],["a040","燖",9,"燡燢燣燤燦燨",5,"燯",9,"燺",11,"爇",19],["a080","爛爜爞",9,"爩爫爭爮爯爲爳爴爺爼爾牀",6,"牉牊牋牎牏牐牑牓牔牕牗牘牚牜牞牠牣牤牥牨牪牫牬牭牰牱牳牴牶牷牸牻牼牽犂犃犅",4,"犌犎犐犑犓",11,"犠",11,"犮犱犲犳犵犺",6,"狅狆狇狉狊狋狌狏狑狓狔狕狖狘狚狛"],["a1a1","　、。·ˉˇ¨〃々—～‖…‘’“”〔〕〈",7,"〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓"],["a2a1","ⅰ",9],["a2b1","⒈",19,"⑴",19,"①",9],["a2e5","㈠",9],["a2f1","Ⅰ",11],["a3a1","！＂＃￥％",88,"￣"],["a4a1","ぁ",82],["a5a1","ァ",85],["a6a1","Α",16,"Σ",6],["a6c1","α",16,"σ",6],["a6e0","︵︶︹︺︿﹀︽︾﹁﹂﹃﹄"],["a6ee","︻︼︷︸︱"],["a6f4","︳︴"],["a7a1","А",5,"ЁЖ",25],["a7d1","а",5,"ёж",25],["a840","ˊˋ˙–―‥‵℅℉↖↗↘↙∕∟∣≒≦≧⊿═",35,"▁",6],["a880","█",7,"▓▔▕▼▽◢◣◤◥☉⊕〒〝〞"],["a8a1","āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüêɑ"],["a8bd","ńň"],["a8c0","ɡ"],["a8c5","ㄅ",36],["a940","〡",8,"㊣㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕︰￢￤"],["a959","℡㈱"],["a95c","‐"],["a960","ー゛゜ヽヾ〆ゝゞ﹉",9,"﹔﹕﹖﹗﹙",8],["a980","﹢",4,"﹨﹩﹪﹫"],["a996","〇"],["a9a4","─",75],["aa40","狜狝狟狢",5,"狪狫狵狶狹狽狾狿猀猂猄",5,"猋猌猍猏猐猑猒猔猘猙猚猟猠猣猤猦猧猨猭猯猰猲猳猵猶猺猻猼猽獀",8],["aa80","獉獊獋獌獎獏獑獓獔獕獖獘",7,"獡",10,"獮獰獱"],["ab40","獲",11,"獿",4,"玅玆玈玊玌玍玏玐玒玓玔玕玗玘玙玚玜玝玞玠玡玣",5,"玪玬玭玱玴玵玶玸玹玼玽玾玿珁珃",4],["ab80","珋珌珎珒",6,"珚珛珜珝珟珡珢珣珤珦珨珪珫珬珮珯珰珱珳",4],["ac40","珸",10,"琄琇琈琋琌琍琎琑",8,"琜",5,"琣琤琧琩琫琭琯琱琲琷",4,"琽琾琿瑀瑂",11],["ac80","瑎",6,"瑖瑘瑝瑠",12,"瑮瑯瑱",4,"瑸瑹瑺"],["ad40","瑻瑼瑽瑿璂璄璅璆璈璉璊璌璍璏璑",10,"璝璟",7,"璪",15,"璻",12],["ad80","瓈",9,"瓓",8,"瓝瓟瓡瓥瓧",6,"瓰瓱瓲"],["ae40","瓳瓵瓸",6,"甀甁甂甃甅",7,"甎甐甒甔甕甖甗甛甝甞甠",4,"甦甧甪甮甴甶甹甼甽甿畁畂畃畄畆畇畉畊畍畐畑畒畓畕畖畗畘"],["ae80","畝",7,"畧畨畩畫",6,"畳畵當畷畺",4,"疀疁疂疄疅疇"],["af40","疈疉疊疌疍疎疐疓疕疘疛疜疞疢疦",4,"疭疶疷疺疻疿痀痁痆痋痌痎痏痐痑痓痗痙痚痜痝痟痠痡痥痩痬痭痮痯痲痳痵痶痷痸痺痻痽痾瘂瘄瘆瘇"],["af80","瘈瘉瘋瘍瘎瘏瘑瘒瘓瘔瘖瘚瘜瘝瘞瘡瘣瘧瘨瘬瘮瘯瘱瘲瘶瘷瘹瘺瘻瘽癁療癄"],["b040","癅",6,"癎",5,"癕癗",4,"癝癟癠癡癢癤",6,"癬癭癮癰",7,"癹発發癿皀皁皃皅皉皊皌皍皏皐皒皔皕皗皘皚皛"],["b080","皜",7,"皥",8,"皯皰皳皵",9,"盀盁盃啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥"],["b140","盄盇盉盋盌盓盕盙盚盜盝盞盠",4,"盦",7,"盰盳盵盶盷盺盻盽盿眀眂眃眅眆眊県眎",10,"眛眜眝眞眡眣眤眥眧眪眫"],["b180","眬眮眰",4,"眹眻眽眾眿睂睄睅睆睈",7,"睒",7,"睜薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳"],["b240","睝睞睟睠睤睧睩睪睭",11,"睺睻睼瞁瞂瞃瞆",5,"瞏瞐瞓",11,"瞡瞣瞤瞦瞨瞫瞭瞮瞯瞱瞲瞴瞶",4],["b280","瞼瞾矀",12,"矎",8,"矘矙矚矝",4,"矤病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖"],["b340","矦矨矪矯矰矱矲矴矵矷矹矺矻矼砃",5,"砊砋砎砏砐砓砕砙砛砞砠砡砢砤砨砪砫砮砯砱砲砳砵砶砽砿硁硂硃硄硆硈硉硊硋硍硏硑硓硔硘硙硚"],["b380","硛硜硞",11,"硯",7,"硸硹硺硻硽",6,"场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚"],["b440","碄碅碆碈碊碋碏碐碒碔碕碖碙碝碞碠碢碤碦碨",7,"碵碶碷碸確碻碼碽碿磀磂磃磄磆磇磈磌磍磎磏磑磒磓磖磗磘磚",9],["b480","磤磥磦磧磩磪磫磭",4,"磳磵磶磸磹磻",5,"礂礃礄礆",6,"础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮"],["b540","礍",5,"礔",9,"礟",4,"礥",14,"礵",4,"礽礿祂祃祄祅祇祊",8,"祔祕祘祙祡祣"],["b580","祤祦祩祪祫祬祮祰",6,"祹祻",4,"禂禃禆禇禈禉禋禌禍禎禐禑禒怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠"],["b640","禓",6,"禛",11,"禨",10,"禴",4,"禼禿秂秄秅秇秈秊秌秎秏秐秓秔秖秗秙",5,"秠秡秢秥秨秪"],["b680","秬秮秱",6,"秹秺秼秾秿稁稄稅稇稈稉稊稌稏",4,"稕稖稘稙稛稜丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二"],["b740","稝稟稡稢稤",14,"稴稵稶稸稺稾穀",5,"穇",9,"穒",4,"穘",16],["b780","穩",6,"穱穲穳穵穻穼穽穾窂窅窇窉窊窋窌窎窏窐窓窔窙窚窛窞窡窢贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服"],["b840","窣窤窧窩窪窫窮",4,"窴",10,"竀",10,"竌",9,"竗竘竚竛竜竝竡竢竤竧",5,"竮竰竱竲竳"],["b880","竴",4,"竻竼竾笀笁笂笅笇笉笌笍笎笐笒笓笖笗笘笚笜笝笟笡笢笣笧笩笭浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹"],["b940","笯笰笲笴笵笶笷笹笻笽笿",5,"筆筈筊筍筎筓筕筗筙筜筞筟筡筣",10,"筯筰筳筴筶筸筺筼筽筿箁箂箃箄箆",6,"箎箏"],["b980","箑箒箓箖箘箙箚箛箞箟箠箣箤箥箮箯箰箲箳箵箶箷箹",7,"篂篃範埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈"],["ba40","篅篈築篊篋篍篎篏篐篒篔",4,"篛篜篞篟篠篢篣篤篧篨篩篫篬篭篯篰篲",4,"篸篹篺篻篽篿",7,"簈簉簊簍簎簐",5,"簗簘簙"],["ba80","簚",4,"簠",5,"簨簩簫",12,"簹",5,"籂骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖"],["bb40","籃",9,"籎",36,"籵",5,"籾",9],["bb80","粈粊",6,"粓粔粖粙粚粛粠粡粣粦粧粨粩粫粬粭粯粰粴",4,"粺粻弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕"],["bc40","粿糀糂糃糄糆糉糋糎",6,"糘糚糛糝糞糡",6,"糩",5,"糰",7,"糹糺糼",13,"紋",5],["bc80","紑",14,"紡紣紤紥紦紨紩紪紬紭紮細",6,"肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件"],["bd40","紷",54,"絯",7],["bd80","絸",32,"健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸"],["be40","継",12,"綧",6,"綯",42],["be80","線",32,"尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻"],["bf40","緻",62],["bf80","縺縼",4,"繂",4,"繈",21,"俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀"],["c040","繞",35,"纃",23,"纜纝纞"],["c080","纮纴纻纼绖绤绬绹缊缐缞缷缹缻",6,"罃罆",9,"罒罓馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐"],["c140","罖罙罛罜罝罞罠罣",4,"罫罬罭罯罰罳罵罶罷罸罺罻罼罽罿羀羂",7,"羋羍羏",4,"羕",4,"羛羜羠羢羣羥羦羨",6,"羱"],["c180","羳",4,"羺羻羾翀翂翃翄翆翇翈翉翋翍翏",4,"翖翗翙",5,"翢翣痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿"],["c240","翤翧翨翪翫翬翭翯翲翴",6,"翽翾翿耂耇耈耉耊耎耏耑耓耚耛耝耞耟耡耣耤耫",5,"耲耴耹耺耼耾聀聁聄聅聇聈聉聎聏聐聑聓聕聖聗"],["c280","聙聛",13,"聫",5,"聲",11,"隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫"],["c340","聾肁肂肅肈肊肍",5,"肔肕肗肙肞肣肦肧肨肬肰肳肵肶肸肹肻胅胇",4,"胏",6,"胘胟胠胢胣胦胮胵胷胹胻胾胿脀脁脃脄脅脇脈脋"],["c380","脌脕脗脙脛脜脝脟",12,"脭脮脰脳脴脵脷脹",4,"脿谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸"],["c440","腀",5,"腇腉腍腎腏腒腖腗腘腛",4,"腡腢腣腤腦腨腪腫腬腯腲腳腵腶腷腸膁膃",4,"膉膋膌膍膎膐膒",5,"膙膚膞",4,"膤膥"],["c480","膧膩膫",7,"膴",5,"膼膽膾膿臄臅臇臈臉臋臍",6,"摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁"],["c540","臔",14,"臤臥臦臨臩臫臮",4,"臵",5,"臽臿舃與",4,"舎舏舑舓舕",5,"舝舠舤舥舦舧舩舮舲舺舼舽舿"],["c580","艀艁艂艃艅艆艈艊艌艍艎艐",7,"艙艛艜艝艞艠",7,"艩拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗"],["c640","艪艫艬艭艱艵艶艷艸艻艼芀芁芃芅芆芇芉芌芐芓芔芕芖芚芛芞芠芢芣芧芲芵芶芺芻芼芿苀苂苃苅苆苉苐苖苙苚苝苢苧苨苩苪苬苭苮苰苲苳苵苶苸"],["c680","苺苼",4,"茊茋茍茐茒茓茖茘茙茝",9,"茩茪茮茰茲茷茻茽啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐"],["c740","茾茿荁荂荄荅荈荊",4,"荓荕",4,"荝荢荰",6,"荹荺荾",6,"莇莈莊莋莌莍莏莐莑莔莕莖莗莙莚莝莟莡",6,"莬莭莮"],["c780","莯莵莻莾莿菂菃菄菆菈菉菋菍菎菐菑菒菓菕菗菙菚菛菞菢菣菤菦菧菨菫菬菭恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠"],["c840","菮華菳",4,"菺菻菼菾菿萀萂萅萇萈萉萊萐萒",5,"萙萚萛萞",5,"萩",7,"萲",5,"萹萺萻萾",7,"葇葈葉"],["c880","葊",6,"葒",4,"葘葝葞葟葠葢葤",4,"葪葮葯葰葲葴葷葹葻葼取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁"],["c940","葽",4,"蒃蒄蒅蒆蒊蒍蒏",7,"蒘蒚蒛蒝蒞蒟蒠蒢",12,"蒰蒱蒳蒵蒶蒷蒻蒼蒾蓀蓂蓃蓅蓆蓇蓈蓋蓌蓎蓏蓒蓔蓕蓗"],["c980","蓘",4,"蓞蓡蓢蓤蓧",4,"蓭蓮蓯蓱",10,"蓽蓾蔀蔁蔂伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳"],["ca40","蔃",8,"蔍蔎蔏蔐蔒蔔蔕蔖蔘蔙蔛蔜蔝蔞蔠蔢",8,"蔭",9,"蔾",4,"蕄蕅蕆蕇蕋",10],["ca80","蕗蕘蕚蕛蕜蕝蕟",4,"蕥蕦蕧蕩",8,"蕳蕵蕶蕷蕸蕼蕽蕿薀薁省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱"],["cb40","薂薃薆薈",6,"薐",10,"薝",6,"薥薦薧薩薫薬薭薱",5,"薸薺",6,"藂",6,"藊",4,"藑藒"],["cb80","藔藖",5,"藝",6,"藥藦藧藨藪",14,"恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔"],["cc40","藹藺藼藽藾蘀",4,"蘆",10,"蘒蘓蘔蘕蘗",15,"蘨蘪",13,"蘹蘺蘻蘽蘾蘿虀"],["cc80","虁",11,"虒虓處",4,"虛虜虝號虠虡虣",7,"獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃"],["cd40","虭虯虰虲",6,"蚃",6,"蚎",4,"蚔蚖",5,"蚞",4,"蚥蚦蚫蚭蚮蚲蚳蚷蚸蚹蚻",4,"蛁蛂蛃蛅蛈蛌蛍蛒蛓蛕蛖蛗蛚蛜"],["cd80","蛝蛠蛡蛢蛣蛥蛦蛧蛨蛪蛫蛬蛯蛵蛶蛷蛺蛻蛼蛽蛿蜁蜄蜅蜆蜋蜌蜎蜏蜐蜑蜔蜖汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威"],["ce40","蜙蜛蜝蜟蜠蜤蜦蜧蜨蜪蜫蜬蜭蜯蜰蜲蜳蜵蜶蜸蜹蜺蜼蜽蝀",6,"蝊蝋蝍蝏蝐蝑蝒蝔蝕蝖蝘蝚",5,"蝡蝢蝦",7,"蝯蝱蝲蝳蝵"],["ce80","蝷蝸蝹蝺蝿螀螁螄螆螇螉螊螌螎",4,"螔螕螖螘",6,"螠",4,"巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺"],["cf40","螥螦螧螩螪螮螰螱螲螴螶螷螸螹螻螼螾螿蟁",4,"蟇蟈蟉蟌",4,"蟔",6,"蟜蟝蟞蟟蟡蟢蟣蟤蟦蟧蟨蟩蟫蟬蟭蟯",9],["cf80","蟺蟻蟼蟽蟿蠀蠁蠂蠄",5,"蠋",7,"蠔蠗蠘蠙蠚蠜",4,"蠣稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓"],["d040","蠤",13,"蠳",5,"蠺蠻蠽蠾蠿衁衂衃衆",5,"衎",5,"衕衖衘衚",6,"衦衧衪衭衯衱衳衴衵衶衸衹衺"],["d080","衻衼袀袃袆袇袉袊袌袎袏袐袑袓袔袕袗",4,"袝",4,"袣袥",5,"小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄"],["d140","袬袮袯袰袲",4,"袸袹袺袻袽袾袿裀裃裄裇裈裊裋裌裍裏裐裑裓裖裗裚",4,"裠裡裦裧裩",6,"裲裵裶裷裺裻製裿褀褁褃",5],["d180","褉褋",4,"褑褔",4,"褜",4,"褢褣褤褦褧褨褩褬褭褮褯褱褲褳褵褷选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶"],["d240","褸",8,"襂襃襅",24,"襠",5,"襧",19,"襼"],["d280","襽襾覀覂覄覅覇",26,"摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐"],["d340","覢",30,"觃觍觓觔觕觗觘觙觛觝觟觠觡觢觤觧觨觩觪觬觭觮觰觱觲觴",6],["d380","觻",4,"訁",5,"計",21,"印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉"],["d440","訞",31,"訿",8,"詉",21],["d480","詟",25,"詺",6,"浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧"],["d540","誁",7,"誋",7,"誔",46],["d580","諃",32,"铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政"],["d640","諤",34,"謈",27],["d680","謤謥謧",30,"帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑"],["d740","譆",31,"譧",4,"譭",25],["d780","讇",24,"讬讱讻诇诐诪谉谞住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座"],["d840","谸",8,"豂豃豄豅豈豊豋豍",7,"豖豗豘豙豛",5,"豣",6,"豬",6,"豴豵豶豷豻",6,"貃貄貆貇"],["d880","貈貋貍",6,"貕貖貗貙",20,"亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝"],["d940","貮",62],["d980","賭",32,"佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼"],["da40","贎",14,"贠赑赒赗赟赥赨赩赪赬赮赯赱赲赸",8,"趂趃趆趇趈趉趌",4,"趒趓趕",9,"趠趡"],["da80","趢趤",12,"趲趶趷趹趻趽跀跁跂跅跇跈跉跊跍跐跒跓跔凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺"],["db40","跕跘跙跜跠跡跢跥跦跧跩跭跮跰跱跲跴跶跼跾",6,"踆踇踈踋踍踎踐踑踒踓踕",7,"踠踡踤",4,"踫踭踰踲踳踴踶踷踸踻踼踾"],["db80","踿蹃蹅蹆蹌",4,"蹓",5,"蹚",11,"蹧蹨蹪蹫蹮蹱邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝"],["dc40","蹳蹵蹷",4,"蹽蹾躀躂躃躄躆躈",6,"躑躒躓躕",6,"躝躟",11,"躭躮躰躱躳",6,"躻",7],["dc80","軃",10,"軏",21,"堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥"],["dd40","軥",62],["dd80","輤",32,"荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺"],["de40","轅",32,"轪辀辌辒辝辠辡辢辤辥辦辧辪辬辭辮辯農辳辴辵辷辸辺辻込辿迀迃迆"],["de80","迉",4,"迏迒迖迗迚迠迡迣迧迬迯迱迲迴迵迶迺迻迼迾迿逇逈逌逎逓逕逘蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖"],["df40","這逜連逤逥逧",5,"逰",4,"逷逹逺逽逿遀遃遅遆遈",4,"過達違遖遙遚遜",5,"遤遦遧適遪遫遬遯",4,"遶",6,"遾邁"],["df80","還邅邆邇邉邊邌",4,"邒邔邖邘邚邜邞邟邠邤邥邧邨邩邫邭邲邷邼邽邿郀摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼"],["e040","郂郃郆郈郉郋郌郍郒郔郕郖郘郙郚郞郟郠郣郤郥郩郪郬郮郰郱郲郳郵郶郷郹郺郻郼郿鄀鄁鄃鄅",19,"鄚鄛鄜"],["e080","鄝鄟鄠鄡鄤",10,"鄰鄲",6,"鄺",8,"酄唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼"],["e140","酅酇酈酑酓酔酕酖酘酙酛酜酟酠酦酧酨酫酭酳酺酻酼醀",4,"醆醈醊醎醏醓",6,"醜",5,"醤",5,"醫醬醰醱醲醳醶醷醸醹醻"],["e180","醼",10,"釈釋釐釒",9,"針",8,"帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺"],["e240","釦",62],["e280","鈥",32,"狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧",5,"饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂"],["e340","鉆",45,"鉵",16],["e380","銆",7,"銏",24,"恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾"],["e440","銨",5,"銯",24,"鋉",31],["e480","鋩",32,"洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑"],["e540","錊",51,"錿",10],["e580","鍊",31,"鍫濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣"],["e640","鍬",34,"鎐",27],["e680","鎬",29,"鏋鏌鏍妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩"],["e740","鏎",7,"鏗",54],["e780","鐎",32,"纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡",6,"缪缫缬缭缯",4,"缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬"],["e840","鐯",14,"鐿",43,"鑬鑭鑮鑯"],["e880","鑰",20,"钑钖钘铇铏铓铔铚铦铻锜锠琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹"],["e940","锧锳锽镃镈镋镕镚镠镮镴镵長",7,"門",42],["e980","閫",32,"椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋"],["ea40","闌",27,"闬闿阇阓阘阛阞阠阣",6,"阫阬阭阯阰阷阸阹阺阾陁陃陊陎陏陑陒陓陖陗"],["ea80","陘陙陚陜陝陞陠陣陥陦陫陭",4,"陳陸",12,"隇隉隊辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰"],["eb40","隌階隑隒隓隕隖隚際隝",9,"隨",7,"隱隲隴隵隷隸隺隻隿雂雃雈雊雋雐雑雓雔雖",9,"雡",6,"雫"],["eb80","雬雭雮雰雱雲雴雵雸雺電雼雽雿霂霃霅霊霋霌霐霑霒霔霕霗",4,"霝霟霠搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻"],["ec40","霡",8,"霫霬霮霯霱霳",4,"霺霻霼霽霿",18,"靔靕靗靘靚靜靝靟靣靤靦靧靨靪",7],["ec80","靲靵靷",4,"靽",7,"鞆",4,"鞌鞎鞏鞐鞓鞕鞖鞗鞙",4,"臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐"],["ed40","鞞鞟鞡鞢鞤",6,"鞬鞮鞰鞱鞳鞵",46],["ed80","韤韥韨韮",4,"韴韷",23,"怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨"],["ee40","頏",62],["ee80","顎",32,"睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶",4,"钼钽钿铄铈",6,"铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪"],["ef40","顯",5,"颋颎颒颕颙颣風",37,"飏飐飔飖飗飛飜飝飠",4],["ef80","飥飦飩",30,"铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒",4,"锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤",8,"镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔"],["f040","餈",4,"餎餏餑",28,"餯",26],["f080","饊",9,"饖",12,"饤饦饳饸饹饻饾馂馃馉稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨",4,"鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦",6,"鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙"],["f140","馌馎馚",10,"馦馧馩",47],["f180","駙",32,"瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃"],["f240","駺",62],["f280","騹",32,"颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒"],["f340","驚",17,"驲骃骉骍骎骔骕骙骦骩",6,"骲骳骴骵骹骻骽骾骿髃髄髆",4,"髍髎髏髐髒體髕髖髗髙髚髛髜"],["f380","髝髞髠髢髣髤髥髧髨髩髪髬髮髰",8,"髺髼",6,"鬄鬅鬆蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋"],["f440","鬇鬉",5,"鬐鬑鬒鬔",10,"鬠鬡鬢鬤",10,"鬰鬱鬳",7,"鬽鬾鬿魀魆魊魋魌魎魐魒魓魕",5],["f480","魛",32,"簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤"],["f540","魼",62],["f580","鮻",32,"酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜"],["f640","鯜",62],["f680","鰛",32,"觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅",5,"龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞",5,"鲥",4,"鲫鲭鲮鲰",7,"鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋"],["f740","鰼",62],["f780","鱻鱽鱾鲀鲃鲄鲉鲊鲌鲏鲓鲖鲗鲘鲙鲝鲪鲬鲯鲹鲾",4,"鳈鳉鳑鳒鳚鳛鳠鳡鳌",4,"鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄"],["f840","鳣",62],["f880","鴢",32],["f940","鵃",62],["f980","鶂",32],["fa40","鶣",62],["fa80","鷢",32],["fb40","鸃",27,"鸤鸧鸮鸰鸴鸻鸼鹀鹍鹐鹒鹓鹔鹖鹙鹝鹟鹠鹡鹢鹥鹮鹯鹲鹴",9,"麀"],["fb80","麁麃麄麅麆麉麊麌",5,"麔",8,"麞麠",5,"麧麨麩麪"],["fc40","麫",8,"麵麶麷麹麺麼麿",4,"黅黆黇黈黊黋黌黐黒黓黕黖黗黙黚點黡黣黤黦黨黫黬黭黮黰",8,"黺黽黿",6],["fc80","鼆",4,"鼌鼏鼑鼒鼔鼕鼖鼘鼚",5,"鼡鼣",8,"鼭鼮鼰鼱"],["fd40","鼲",4,"鼸鼺鼼鼿",4,"齅",10,"齒",38],["fd80","齹",5,"龁龂龍",11,"龜龝龞龡",4,"郎凉秊裏隣"],["fe40","兀嗀﨎﨏﨑﨓﨔礼﨟蘒﨡﨣﨤﨧﨨﨩"]]'), Bc = [
  [
    "a140",
    "",
    62
  ],
  [
    "a180",
    "",
    32
  ],
  [
    "a240",
    "",
    62
  ],
  [
    "a280",
    "",
    32
  ],
  [
    "a2ab",
    "",
    5
  ],
  [
    "a2e3",
    "€"
  ],
  [
    "a2ef",
    ""
  ],
  [
    "a2fd",
    ""
  ],
  [
    "a340",
    "",
    62
  ],
  [
    "a380",
    "",
    31,
    "　"
  ],
  [
    "a440",
    "",
    62
  ],
  [
    "a480",
    "",
    32
  ],
  [
    "a4f4",
    "",
    10
  ],
  [
    "a540",
    "",
    62
  ],
  [
    "a580",
    "",
    32
  ],
  [
    "a5f7",
    "",
    7
  ],
  [
    "a640",
    "",
    62
  ],
  [
    "a680",
    "",
    32
  ],
  [
    "a6b9",
    "",
    7
  ],
  [
    "a6d9",
    "",
    6
  ],
  [
    "a6ec",
    ""
  ],
  [
    "a6f3",
    ""
  ],
  [
    "a6f6",
    "",
    8
  ],
  [
    "a740",
    "",
    62
  ],
  [
    "a780",
    "",
    32
  ],
  [
    "a7c2",
    "",
    14
  ],
  [
    "a7f2",
    "",
    12
  ],
  [
    "a896",
    "",
    10
  ],
  [
    "a8bc",
    "ḿ"
  ],
  [
    "a8bf",
    "ǹ"
  ],
  [
    "a8c1",
    ""
  ],
  [
    "a8ea",
    "",
    20
  ],
  [
    "a958",
    ""
  ],
  [
    "a95b",
    ""
  ],
  [
    "a95d",
    ""
  ],
  [
    "a989",
    "〾⿰",
    11
  ],
  [
    "a997",
    "",
    12
  ],
  [
    "a9f0",
    "",
    14
  ],
  [
    "aaa1",
    "",
    93
  ],
  [
    "aba1",
    "",
    93
  ],
  [
    "aca1",
    "",
    93
  ],
  [
    "ada1",
    "",
    93
  ],
  [
    "aea1",
    "",
    93
  ],
  [
    "afa1",
    "",
    93
  ],
  [
    "d7fa",
    "",
    4
  ],
  [
    "f8a1",
    "",
    93
  ],
  [
    "f9a1",
    "",
    93
  ],
  [
    "faa1",
    "",
    93
  ],
  [
    "fba1",
    "",
    93
  ],
  [
    "fca1",
    "",
    93
  ],
  [
    "fda1",
    "",
    93
  ],
  [
    "fe50",
    "⺁⺄㑳㑇⺈⺋㖞㘚㘎⺌⺗㥮㤘㧏㧟㩳㧐㭎㱮㳠⺧⺪䁖䅟⺮䌷⺳⺶⺷䎱䎬⺻䏝䓖䙡䙌"
  ],
  [
    "fe80",
    "䜣䜩䝼䞍⻊䥇䥺䥽䦂䦃䦅䦆䦟䦛䦷䦶䲣䲟䲠䲡䱷䲢䴓",
    6,
    "䶮",
    93
  ],
  [
    "8135f437",
    ""
  ]
], Jd = [128, 165, 169, 178, 184, 216, 226, 235, 238, 244, 248, 251, 253, 258, 276, 284, 300, 325, 329, 334, 364, 463, 465, 467, 469, 471, 473, 475, 477, 506, 594, 610, 712, 716, 730, 930, 938, 962, 970, 1026, 1104, 1106, 8209, 8215, 8218, 8222, 8231, 8241, 8244, 8246, 8252, 8365, 8452, 8454, 8458, 8471, 8482, 8556, 8570, 8596, 8602, 8713, 8720, 8722, 8726, 8731, 8737, 8740, 8742, 8748, 8751, 8760, 8766, 8777, 8781, 8787, 8802, 8808, 8816, 8854, 8858, 8870, 8896, 8979, 9322, 9372, 9548, 9588, 9616, 9622, 9634, 9652, 9662, 9672, 9676, 9680, 9702, 9735, 9738, 9793, 9795, 11906, 11909, 11913, 11917, 11928, 11944, 11947, 11951, 11956, 11960, 11964, 11979, 12284, 12292, 12312, 12319, 12330, 12351, 12436, 12447, 12535, 12543, 12586, 12842, 12850, 12964, 13200, 13215, 13218, 13253, 13263, 13267, 13270, 13384, 13428, 13727, 13839, 13851, 14617, 14703, 14801, 14816, 14964, 15183, 15471, 15585, 16471, 16736, 17208, 17325, 17330, 17374, 17623, 17997, 18018, 18212, 18218, 18301, 18318, 18760, 18811, 18814, 18820, 18823, 18844, 18848, 18872, 19576, 19620, 19738, 19887, 40870, 59244, 59336, 59367, 59413, 59417, 59423, 59431, 59437, 59443, 59452, 59460, 59478, 59493, 63789, 63866, 63894, 63976, 63986, 64016, 64018, 64021, 64025, 64034, 64037, 64042, 65074, 65093, 65107, 65112, 65127, 65132, 65375, 65510, 65536], Zd = [0, 36, 38, 45, 50, 81, 89, 95, 96, 100, 103, 104, 105, 109, 126, 133, 148, 172, 175, 179, 208, 306, 307, 308, 309, 310, 311, 312, 313, 341, 428, 443, 544, 545, 558, 741, 742, 749, 750, 805, 819, 820, 7922, 7924, 7925, 7927, 7934, 7943, 7944, 7945, 7950, 8062, 8148, 8149, 8152, 8164, 8174, 8236, 8240, 8262, 8264, 8374, 8380, 8381, 8384, 8388, 8390, 8392, 8393, 8394, 8396, 8401, 8406, 8416, 8419, 8424, 8437, 8439, 8445, 8482, 8485, 8496, 8521, 8603, 8936, 8946, 9046, 9050, 9063, 9066, 9076, 9092, 9100, 9108, 9111, 9113, 9131, 9162, 9164, 9218, 9219, 11329, 11331, 11334, 11336, 11346, 11361, 11363, 11366, 11370, 11372, 11375, 11389, 11682, 11686, 11687, 11692, 11694, 11714, 11716, 11723, 11725, 11730, 11736, 11982, 11989, 12102, 12336, 12348, 12350, 12384, 12393, 12395, 12397, 12510, 12553, 12851, 12962, 12973, 13738, 13823, 13919, 13933, 14080, 14298, 14585, 14698, 15583, 15847, 16318, 16434, 16438, 16481, 16729, 17102, 17122, 17315, 17320, 17402, 17418, 17859, 17909, 17911, 17915, 17916, 17936, 17939, 17961, 18664, 18703, 18814, 18962, 19043, 33469, 33470, 33471, 33484, 33485, 33490, 33497, 33501, 33505, 33513, 33520, 33536, 33550, 37845, 37921, 37948, 38029, 38038, 38064, 38065, 38066, 38069, 38075, 38076, 38078, 39108, 39109, 39113, 39114, 39115, 39116, 39265, 39394, 189e3], eE = {
  uChars: Jd,
  gbChars: Zd
}, tE = /* @__PURE__ */ JSON.parse('[["0","\\u0000",127],["8141","갂갃갅갆갋",4,"갘갞갟갡갢갣갥",6,"갮갲갳갴"],["8161","갵갶갷갺갻갽갾갿걁",9,"걌걎",5,"걕"],["8181","걖걗걙걚걛걝",18,"걲걳걵걶걹걻",4,"겂겇겈겍겎겏겑겒겓겕",6,"겞겢",5,"겫겭겮겱",6,"겺겾겿곀곂곃곅곆곇곉곊곋곍",7,"곖곘",7,"곢곣곥곦곩곫곭곮곲곴곷",4,"곾곿괁괂괃괅괇",4,"괎괐괒괓"],["8241","괔괕괖괗괙괚괛괝괞괟괡",7,"괪괫괮",5],["8261","괶괷괹괺괻괽",6,"굆굈굊",5,"굑굒굓굕굖굗"],["8281","굙",7,"굢굤",7,"굮굯굱굲굷굸굹굺굾궀궃",4,"궊궋궍궎궏궑",10,"궞",5,"궥",17,"궸",7,"귂귃귅귆귇귉",6,"귒귔",7,"귝귞귟귡귢귣귥",18],["8341","귺귻귽귾긂",5,"긊긌긎",5,"긕",7],["8361","긝",18,"긲긳긵긶긹긻긼"],["8381","긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗",4,"깞깢깣깤깦깧깪깫깭깮깯깱",6,"깺깾",5,"꺆",5,"꺍",46,"꺿껁껂껃껅",6,"껎껒",5,"껚껛껝",8],["8441","껦껧껩껪껬껮",5,"껵껶껷껹껺껻껽",8],["8461","꼆꼉꼊꼋꼌꼎꼏꼑",18],["8481","꼤",7,"꼮꼯꼱꼳꼵",6,"꼾꽀꽄꽅꽆꽇꽊",5,"꽑",10,"꽞",5,"꽦",18,"꽺",5,"꾁꾂꾃꾅꾆꾇꾉",6,"꾒꾓꾔꾖",5,"꾝",26,"꾺꾻꾽꾾"],["8541","꾿꿁",5,"꿊꿌꿏",4,"꿕",6,"꿝",4],["8561","꿢",5,"꿪",5,"꿲꿳꿵꿶꿷꿹",6,"뀂뀃"],["8581","뀅",6,"뀍뀎뀏뀑뀒뀓뀕",6,"뀞",9,"뀩",26,"끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞",29,"끾끿낁낂낃낅",6,"낎낐낒",5,"낛낝낞낣낤"],["8641","낥낦낧낪낰낲낶낷낹낺낻낽",6,"냆냊",5,"냒"],["8661","냓냕냖냗냙",6,"냡냢냣냤냦",10],["8681","냱",22,"넊넍넎넏넑넔넕넖넗넚넞",4,"넦넧넩넪넫넭",6,"넶넺",5,"녂녃녅녆녇녉",6,"녒녓녖녗녙녚녛녝녞녟녡",22,"녺녻녽녾녿놁놃",4,"놊놌놎놏놐놑놕놖놗놙놚놛놝"],["8741","놞",9,"놩",15],["8761","놹",18,"뇍뇎뇏뇑뇒뇓뇕"],["8781","뇖",5,"뇞뇠",7,"뇪뇫뇭뇮뇯뇱",7,"뇺뇼뇾",5,"눆눇눉눊눍",6,"눖눘눚",5,"눡",18,"눵",6,"눽",26,"뉙뉚뉛뉝뉞뉟뉡",6,"뉪",4],["8841","뉯",4,"뉶",5,"뉽",6,"늆늇늈늊",4],["8861","늏늒늓늕늖늗늛",4,"늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷"],["8881","늸",15,"닊닋닍닎닏닑닓",4,"닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉",6,"댒댖",5,"댝",54,"덗덙덚덝덠덡덢덣"],["8941","덦덨덪덬덭덯덲덳덵덶덷덹",6,"뎂뎆",5,"뎍"],["8961","뎎뎏뎑뎒뎓뎕",10,"뎢",5,"뎩뎪뎫뎭"],["8981","뎮",21,"돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩",18,"돽",18,"됑",6,"됙됚됛됝됞됟됡",6,"됪됬",7,"됵",15],["8a41","둅",10,"둒둓둕둖둗둙",6,"둢둤둦"],["8a61","둧",4,"둭",18,"뒁뒂"],["8a81","뒃",4,"뒉",19,"뒞",5,"뒥뒦뒧뒩뒪뒫뒭",7,"뒶뒸뒺",5,"듁듂듃듅듆듇듉",6,"듑듒듓듔듖",5,"듞듟듡듢듥듧",4,"듮듰듲",5,"듹",26,"딖딗딙딚딝"],["8b41","딞",5,"딦딫",4,"딲딳딵딶딷딹",6,"땂땆"],["8b61","땇땈땉땊땎땏땑땒땓땕",6,"땞땢",8],["8b81","땫",52,"떢떣떥떦떧떩떬떭떮떯떲떶",4,"떾떿뗁뗂뗃뗅",6,"뗎뗒",5,"뗙",18,"뗭",18],["8c41","똀",15,"똒똓똕똖똗똙",4],["8c61","똞",6,"똦",5,"똭",6,"똵",5],["8c81","똻",12,"뙉",26,"뙥뙦뙧뙩",50,"뚞뚟뚡뚢뚣뚥",5,"뚭뚮뚯뚰뚲",16],["8d41","뛃",16,"뛕",8],["8d61","뛞",17,"뛱뛲뛳뛵뛶뛷뛹뛺"],["8d81","뛻",4,"뜂뜃뜄뜆",33,"뜪뜫뜭뜮뜱",6,"뜺뜼",7,"띅띆띇띉띊띋띍",6,"띖",9,"띡띢띣띥띦띧띩",6,"띲띴띶",5,"띾띿랁랂랃랅",6,"랎랓랔랕랚랛랝랞"],["8e41","랟랡",6,"랪랮",5,"랶랷랹",8],["8e61","럂",4,"럈럊",19],["8e81","럞",13,"럮럯럱럲럳럵",6,"럾렂",4,"렊렋렍렎렏렑",6,"렚렜렞",5,"렦렧렩렪렫렭",6,"렶렺",5,"롁롂롃롅",11,"롒롔",7,"롞롟롡롢롣롥",6,"롮롰롲",5,"롹롺롻롽",7],["8f41","뢅",7,"뢎",17],["8f61","뢠",7,"뢩",6,"뢱뢲뢳뢵뢶뢷뢹",4],["8f81","뢾뢿룂룄룆",5,"룍룎룏룑룒룓룕",7,"룞룠룢",5,"룪룫룭룮룯룱",6,"룺룼룾",5,"뤅",18,"뤙",6,"뤡",26,"뤾뤿륁륂륃륅",6,"륍륎륐륒",5],["9041","륚륛륝륞륟륡",6,"륪륬륮",5,"륶륷륹륺륻륽"],["9061","륾",5,"릆릈릋릌릏",15],["9081","릟",12,"릮릯릱릲릳릵",6,"릾맀맂",5,"맊맋맍맓",4,"맚맜맟맠맢맦맧맩맪맫맭",6,"맶맻",4,"먂",5,"먉",11,"먖",33,"먺먻먽먾먿멁멃멄멅멆"],["9141","멇멊멌멏멐멑멒멖멗멙멚멛멝",6,"멦멪",5],["9161","멲멳멵멶멷멹",9,"몆몈몉몊몋몍",5],["9181","몓",20,"몪몭몮몯몱몳",4,"몺몼몾",5,"뫅뫆뫇뫉",14,"뫚",33,"뫽뫾뫿묁묂묃묅",7,"묎묐묒",5,"묙묚묛묝묞묟묡",6],["9241","묨묪묬",7,"묷묹묺묿",4,"뭆뭈뭊뭋뭌뭎뭑뭒"],["9261","뭓뭕뭖뭗뭙",7,"뭢뭤",7,"뭭",4],["9281","뭲",21,"뮉뮊뮋뮍뮎뮏뮑",18,"뮥뮦뮧뮩뮪뮫뮭",6,"뮵뮶뮸",7,"믁믂믃믅믆믇믉",6,"믑믒믔",35,"믺믻믽믾밁"],["9341","밃",4,"밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵"],["9361","밶밷밹",6,"뱂뱆뱇뱈뱊뱋뱎뱏뱑",8],["9381","뱚뱛뱜뱞",37,"벆벇벉벊벍벏",4,"벖벘벛",4,"벢벣벥벦벩",6,"벲벶",5,"벾벿볁볂볃볅",7,"볎볒볓볔볖볗볙볚볛볝",22,"볷볹볺볻볽"],["9441","볾",5,"봆봈봊",5,"봑봒봓봕",8],["9461","봞",5,"봥",6,"봭",12],["9481","봺",5,"뵁",6,"뵊뵋뵍뵎뵏뵑",6,"뵚",9,"뵥뵦뵧뵩",22,"붂붃붅붆붋",4,"붒붔붖붗붘붛붝",6,"붥",10,"붱",6,"붹",24],["9541","뷒뷓뷖뷗뷙뷚뷛뷝",11,"뷪",5,"뷱"],["9561","뷲뷳뷵뷶뷷뷹",6,"븁븂븄븆",5,"븎븏븑븒븓"],["9581","븕",6,"븞븠",35,"빆빇빉빊빋빍빏",4,"빖빘빜빝빞빟빢빣빥빦빧빩빫",4,"빲빶",4,"빾빿뺁뺂뺃뺅",6,"뺎뺒",5,"뺚",13,"뺩",14],["9641","뺸",23,"뻒뻓"],["9661","뻕뻖뻙",6,"뻡뻢뻦",5,"뻭",8],["9681","뻶",10,"뼂",5,"뼊",13,"뼚뼞",33,"뽂뽃뽅뽆뽇뽉",6,"뽒뽓뽔뽖",44],["9741","뾃",16,"뾕",8],["9761","뾞",17,"뾱",7],["9781","뾹",11,"뿆",5,"뿎뿏뿑뿒뿓뿕",6,"뿝뿞뿠뿢",89,"쀽쀾쀿"],["9841","쁀",16,"쁒",5,"쁙쁚쁛"],["9861","쁝쁞쁟쁡",6,"쁪",15],["9881","쁺",21,"삒삓삕삖삗삙",6,"삢삤삦",5,"삮삱삲삷",4,"삾샂샃샄샆샇샊샋샍샎샏샑",6,"샚샞",5,"샦샧샩샪샫샭",6,"샶샸샺",5,"섁섂섃섅섆섇섉",6,"섑섒섓섔섖",5,"섡섢섥섨섩섪섫섮"],["9941","섲섳섴섵섷섺섻섽섾섿셁",6,"셊셎",5,"셖셗"],["9961","셙셚셛셝",6,"셦셪",5,"셱셲셳셵셶셷셹셺셻"],["9981","셼",8,"솆",5,"솏솑솒솓솕솗",4,"솞솠솢솣솤솦솧솪솫솭솮솯솱",11,"솾",5,"쇅쇆쇇쇉쇊쇋쇍",6,"쇕쇖쇙",6,"쇡쇢쇣쇥쇦쇧쇩",6,"쇲쇴",7,"쇾쇿숁숂숃숅",6,"숎숐숒",5,"숚숛숝숞숡숢숣"],["9a41","숤숥숦숧숪숬숮숰숳숵",16],["9a61","쉆쉇쉉",6,"쉒쉓쉕쉖쉗쉙",6,"쉡쉢쉣쉤쉦"],["9a81","쉧",4,"쉮쉯쉱쉲쉳쉵",6,"쉾슀슂",5,"슊",5,"슑",6,"슙슚슜슞",5,"슦슧슩슪슫슮",5,"슶슸슺",33,"싞싟싡싢싥",5,"싮싰싲싳싴싵싷싺싽싾싿쌁",6,"쌊쌋쌎쌏"],["9b41","쌐쌑쌒쌖쌗쌙쌚쌛쌝",6,"쌦쌧쌪",8],["9b61","쌳",17,"썆",7],["9b81","썎",25,"썪썫썭썮썯썱썳",4,"썺썻썾",5,"쎅쎆쎇쎉쎊쎋쎍",50,"쏁",22,"쏚"],["9c41","쏛쏝쏞쏡쏣",4,"쏪쏫쏬쏮",5,"쏶쏷쏹",5],["9c61","쏿",8,"쐉",6,"쐑",9],["9c81","쐛",8,"쐥",6,"쐭쐮쐯쐱쐲쐳쐵",6,"쐾",9,"쑉",26,"쑦쑧쑩쑪쑫쑭",6,"쑶쑷쑸쑺",5,"쒁",18,"쒕",6,"쒝",12],["9d41","쒪",13,"쒹쒺쒻쒽",8],["9d61","쓆",25],["9d81","쓠",8,"쓪",5,"쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂",9,"씍씎씏씑씒씓씕",6,"씝",10,"씪씫씭씮씯씱",6,"씺씼씾",5,"앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩",6,"앲앶",5,"앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔"],["9e41","얖얙얚얛얝얞얟얡",7,"얪",9,"얶"],["9e61","얷얺얿",4,"엋엍엏엒엓엕엖엗엙",6,"엢엤엦엧"],["9e81","엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑",6,"옚옝",6,"옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉",6,"왒왖",5,"왞왟왡",10,"왭왮왰왲",5,"왺왻왽왾왿욁",6,"욊욌욎",5,"욖욗욙욚욛욝",6,"욦"],["9f41","욨욪",5,"욲욳욵욶욷욻",4,"웂웄웆",5,"웎"],["9f61","웏웑웒웓웕",6,"웞웟웢",5,"웪웫웭웮웯웱웲"],["9f81","웳",4,"웺웻웼웾",5,"윆윇윉윊윋윍",6,"윖윘윚",5,"윢윣윥윦윧윩",6,"윲윴윶윸윹윺윻윾윿읁읂읃읅",4,"읋읎읐읙읚읛읝읞읟읡",6,"읩읪읬",7,"읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛",4,"잢잧",4,"잮잯잱잲잳잵잶잷"],["a041","잸잹잺잻잾쟂",5,"쟊쟋쟍쟏쟑",6,"쟙쟚쟛쟜"],["a061","쟞",5,"쟥쟦쟧쟩쟪쟫쟭",13],["a081","쟻",4,"젂젃젅젆젇젉젋",4,"젒젔젗",4,"젞젟젡젢젣젥",6,"젮젰젲",5,"젹젺젻젽젾젿졁",6,"졊졋졎",5,"졕",26,"졲졳졵졶졷졹졻",4,"좂좄좈좉좊좎",5,"좕",7,"좞좠좢좣좤"],["a141","좥좦좧좩",18,"좾좿죀죁"],["a161","죂죃죅죆죇죉죊죋죍",6,"죖죘죚",5,"죢죣죥"],["a181","죦",14,"죶",5,"죾죿줁줂줃줇",4,"줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈",9,"±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢"],["a241","줐줒",5,"줙",18],["a261","줭",6,"줵",18],["a281","쥈",7,"쥒쥓쥕쥖쥗쥙",6,"쥢쥤",7,"쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®"],["a341","쥱쥲쥳쥵",6,"쥽",10,"즊즋즍즎즏"],["a361","즑",6,"즚즜즞",16],["a381","즯",16,"짂짃짅짆짉짋",4,"짒짔짗짘짛！",58,"￦］",32,"￣"],["a441","짞짟짡짣짥짦짨짩짪짫짮짲",5,"짺짻짽짾짿쨁쨂쨃쨄"],["a461","쨅쨆쨇쨊쨎",5,"쨕쨖쨗쨙",12],["a481","쨦쨧쨨쨪",28,"ㄱ",93],["a541","쩇",4,"쩎쩏쩑쩒쩓쩕",6,"쩞쩢",5,"쩩쩪"],["a561","쩫",17,"쩾",5,"쪅쪆"],["a581","쪇",16,"쪙",14,"ⅰ",9],["a5b0","Ⅰ",9],["a5c1","Α",16,"Σ",6],["a5e1","α",16,"σ",6],["a641","쪨",19,"쪾쪿쫁쫂쫃쫅"],["a661","쫆",5,"쫎쫐쫒쫔쫕쫖쫗쫚",5,"쫡",6],["a681","쫨쫩쫪쫫쫭",6,"쫵",18,"쬉쬊─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃",7],["a741","쬋",4,"쬑쬒쬓쬕쬖쬗쬙",6,"쬢",7],["a761","쬪",22,"쭂쭃쭄"],["a781","쭅쭆쭇쭊쭋쭍쭎쭏쭑",6,"쭚쭛쭜쭞",5,"쭥",7,"㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙",9,"㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰",9,"㎀",4,"㎺",5,"㎐",4,"Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆"],["a841","쭭",10,"쭺",14],["a861","쮉",18,"쮝",6],["a881","쮤",19,"쮹",11,"ÆÐªĦ"],["a8a6","Ĳ"],["a8a8","ĿŁØŒºÞŦŊ"],["a8b1","㉠",27,"ⓐ",25,"①",14,"½⅓⅔¼¾⅛⅜⅝⅞"],["a941","쯅",14,"쯕",10],["a961","쯠쯡쯢쯣쯥쯦쯨쯪",18],["a981","쯽",14,"찎찏찑찒찓찕",6,"찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀",27,"⒜",25,"⑴",14,"¹²³⁴ⁿ₁₂₃₄"],["aa41","찥찦찪찫찭찯찱",6,"찺찿",4,"챆챇챉챊챋챍챎"],["aa61","챏",4,"챖챚",5,"챡챢챣챥챧챩",6,"챱챲"],["aa81","챳챴챶",29,"ぁ",82],["ab41","첔첕첖첗첚첛첝첞첟첡",6,"첪첮",5,"첶첷첹"],["ab61","첺첻첽",6,"쳆쳈쳊",5,"쳑쳒쳓쳕",5],["ab81","쳛",8,"쳥",6,"쳭쳮쳯쳱",12,"ァ",85],["ac41","쳾쳿촀촂",5,"촊촋촍촎촏촑",6,"촚촜촞촟촠"],["ac61","촡촢촣촥촦촧촩촪촫촭",11,"촺",4],["ac81","촿",28,"쵝쵞쵟А",5,"ЁЖ",25],["acd1","а",5,"ёж",25],["ad41","쵡쵢쵣쵥",6,"쵮쵰쵲",5,"쵹",7],["ad61","춁",6,"춉",10,"춖춗춙춚춛춝춞춟"],["ad81","춠춡춢춣춦춨춪",5,"춱",18,"췅"],["ae41","췆",5,"췍췎췏췑",16],["ae61","췢",5,"췩췪췫췭췮췯췱",6,"췺췼췾",4],["ae81","츃츅츆츇츉츊츋츍",6,"츕츖츗츘츚",5,"츢츣츥츦츧츩츪츫"],["af41","츬츭츮츯츲츴츶",19],["af61","칊",13,"칚칛칝칞칢",5,"칪칬"],["af81","칮",5,"칶칷칹칺칻칽",6,"캆캈캊",5,"캒캓캕캖캗캙"],["b041","캚",5,"캢캦",5,"캮",12],["b061","캻",5,"컂",19],["b081","컖",13,"컦컧컩컪컭",6,"컶컺",5,"가각간갇갈갉갊감",7,"같",4,"갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆"],["b141","켂켃켅켆켇켉",6,"켒켔켖",5,"켝켞켟켡켢켣"],["b161","켥",6,"켮켲",5,"켹",11],["b181","콅",14,"콖콗콙콚콛콝",6,"콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸"],["b241","콭콮콯콲콳콵콶콷콹",6,"쾁쾂쾃쾄쾆",5,"쾍"],["b261","쾎",18,"쾢",5,"쾩"],["b281","쾪",5,"쾱",18,"쿅",6,"깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙"],["b341","쿌",19,"쿢쿣쿥쿦쿧쿩"],["b361","쿪",5,"쿲쿴쿶",5,"쿽쿾쿿퀁퀂퀃퀅",5],["b381","퀋",5,"퀒",5,"퀙",19,"끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫",4,"낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝"],["b441","퀮",5,"퀶퀷퀹퀺퀻퀽",6,"큆큈큊",5],["b461","큑큒큓큕큖큗큙",6,"큡",10,"큮큯"],["b481","큱큲큳큵",6,"큾큿킀킂",18,"뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫",4,"닳담답닷",4,"닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥"],["b541","킕",14,"킦킧킩킪킫킭",5],["b561","킳킶킸킺",5,"탂탃탅탆탇탊",5,"탒탖",4],["b581","탛탞탟탡탢탣탥",6,"탮탲",5,"탹",11,"덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸"],["b641","턅",7,"턎",17],["b661","턠",15,"턲턳턵턶턷턹턻턼턽턾"],["b681","턿텂텆",5,"텎텏텑텒텓텕",6,"텞텠텢",5,"텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗"],["b741","텮",13,"텽",6,"톅톆톇톉톊"],["b761","톋",20,"톢톣톥톦톧"],["b781","톩",6,"톲톴톶톷톸톹톻톽톾톿퇁",14,"래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩"],["b841","퇐",7,"퇙",17],["b861","퇫",8,"퇵퇶퇷퇹",13],["b881","툈툊",5,"툑",24,"륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많",4,"맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼"],["b941","툪툫툮툯툱툲툳툵",6,"툾퉀퉂",5,"퉉퉊퉋퉌"],["b961","퉍",14,"퉝",6,"퉥퉦퉧퉨"],["b981","퉩",22,"튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바",4,"받",4,"밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗"],["ba41","튍튎튏튒튓튔튖",5,"튝튞튟튡튢튣튥",6,"튭"],["ba61","튮튯튰튲",5,"튺튻튽튾틁틃",4,"틊틌",5],["ba81","틒틓틕틖틗틙틚틛틝",6,"틦",9,"틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤"],["bb41","틻",4,"팂팄팆",5,"팏팑팒팓팕팗",4,"팞팢팣"],["bb61","팤팦팧팪팫팭팮팯팱",6,"팺팾",5,"퍆퍇퍈퍉"],["bb81","퍊",31,"빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤"],["bc41","퍪",17,"퍾퍿펁펂펃펅펆펇"],["bc61","펈펉펊펋펎펒",5,"펚펛펝펞펟펡",6,"펪펬펮"],["bc81","펯",4,"펵펶펷펹펺펻펽",6,"폆폇폊",5,"폑",5,"샥샨샬샴샵샷샹섀섄섈섐섕서",4,"섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭"],["bd41","폗폙",7,"폢폤",7,"폮폯폱폲폳폵폶폷"],["bd61","폸폹폺폻폾퐀퐂",5,"퐉",13],["bd81","퐗",5,"퐞",25,"숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰"],["be41","퐸",7,"푁푂푃푅",14],["be61","푔",7,"푝푞푟푡푢푣푥",7,"푮푰푱푲"],["be81","푳",4,"푺푻푽푾풁풃",4,"풊풌풎",5,"풕",8,"쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄",6,"엌엎"],["bf41","풞",10,"풪",14],["bf61","풹",18,"퓍퓎퓏퓑퓒퓓퓕"],["bf81","퓖",5,"퓝퓞퓠",7,"퓩퓪퓫퓭퓮퓯퓱",6,"퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염",5,"옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨"],["c041","퓾",5,"픅픆픇픉픊픋픍",6,"픖픘",5],["c061","픞",25],["c081","픸픹픺픻픾픿핁핂핃핅",6,"핎핐핒",5,"핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응",7,"읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊"],["c141","핤핦핧핪핬핮",5,"핶핷핹핺핻핽",6,"햆햊햋"],["c161","햌햍햎햏햑",19,"햦햧"],["c181","햨",31,"점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓"],["c241","헊헋헍헎헏헑헓",4,"헚헜헞",5,"헦헧헩헪헫헭헮"],["c261","헯",4,"헶헸헺",5,"혂혃혅혆혇혉",6,"혒"],["c281","혖",5,"혝혞혟혡혢혣혥",7,"혮",9,"혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻"],["c341","혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝",4],["c361","홢",4,"홨홪",5,"홲홳홵",11],["c381","횁횂횄횆",5,"횎횏횑횒횓횕",7,"횞횠횢",5,"횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층"],["c441","횫횭횮횯횱",7,"횺횼",7,"훆훇훉훊훋"],["c461","훍훎훏훐훒훓훕훖훘훚",5,"훡훢훣훥훦훧훩",4],["c481","훮훯훱훲훳훴훶",5,"훾훿휁휂휃휅",11,"휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼"],["c541","휕휖휗휚휛휝휞휟휡",6,"휪휬휮",5,"휶휷휹"],["c561","휺휻휽",6,"흅흆흈흊",5,"흒흓흕흚",4],["c581","흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵",6,"흾흿힀힂",5,"힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜"],["c641","힍힎힏힑",6,"힚힜힞",5],["c6a1","퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁"],["c7a1","퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠"],["c8a1","혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝"],["caa1","伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕"],["cba1","匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢"],["cca1","瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械"],["cda1","棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜"],["cea1","科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾"],["cfa1","區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴"],["d0a1","鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣"],["d1a1","朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩",5,"那樂",4,"諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉"],["d2a1","納臘蠟衲囊娘廊",4,"乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧",5,"駑魯",10,"濃籠聾膿農惱牢磊腦賂雷尿壘",7,"嫩訥杻紐勒",5,"能菱陵尼泥匿溺多茶"],["d3a1","丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃"],["d4a1","棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅"],["d5a1","蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣"],["d6a1","煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼"],["d7a1","遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬"],["d8a1","立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅"],["d9a1","蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文"],["daa1","汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑"],["dba1","發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖"],["dca1","碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦"],["dda1","孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥"],["dea1","脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索"],["dfa1","傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署"],["e0a1","胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬"],["e1a1","聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁"],["e2a1","戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧"],["e3a1","嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁"],["e4a1","沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額"],["e5a1","櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬"],["e6a1","旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒"],["e7a1","簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳"],["e8a1","烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療"],["e9a1","窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓"],["eaa1","運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜"],["eba1","濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼"],["eca1","議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄"],["eda1","立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長"],["eea1","障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱"],["efa1","煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖"],["f0a1","靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫"],["f1a1","踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只"],["f2a1","咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯"],["f3a1","鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策"],["f4a1","責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢"],["f5a1","椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃"],["f6a1","贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託"],["f7a1","鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑"],["f8a1","阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃"],["f9a1","品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航"],["faa1","行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型"],["fba1","形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵"],["fca1","禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆"],["fda1","爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰"]]'), kc = /* @__PURE__ */ JSON.parse('[["0","\\u0000",127],["a140","　，、。．‧；：？！︰…‥﹐﹑﹒·﹔﹕﹖﹗｜–︱—︳╴︴﹏（）︵︶｛｝︷︸〔〕︹︺【】︻︼《》︽︾〈〉︿﹀「」﹁﹂『』﹃﹄﹙﹚"],["a1a1","﹛﹜﹝﹞‘’“”〝〞‵′＃＆＊※§〃○●△▲◎☆★◇◆□■▽▼㊣℅¯￣＿ˍ﹉﹊﹍﹎﹋﹌﹟﹠﹡＋－×÷±√＜＞＝≦≧≠∞≒≡﹢",4,"～∩∪⊥∠∟⊿㏒㏑∫∮∵∴♀♂⊕⊙↑↓←→↖↗↙↘∥∣／"],["a240","＼∕﹨＄￥〒￠￡％＠℃℉﹩﹪﹫㏕㎜㎝㎞㏎㎡㎎㎏㏄°兙兛兞兝兡兣嗧瓩糎▁",7,"▏▎▍▌▋▊▉┼┴┬┤├▔─│▕┌┐└┘╭"],["a2a1","╮╰╯═╞╪╡◢◣◥◤╱╲╳０",9,"Ⅰ",9,"〡",8,"十卄卅Ａ",25,"ａ",21],["a340","ｗｘｙｚΑ",16,"Σ",6,"α",16,"σ",6,"ㄅ",10],["a3a1","ㄐ",25,"˙ˉˊˇˋ"],["a3e1","€"],["a440","一乙丁七乃九了二人儿入八几刀刁力匕十卜又三下丈上丫丸凡久么也乞于亡兀刃勺千叉口土士夕大女子孑孓寸小尢尸山川工己已巳巾干廾弋弓才"],["a4a1","丑丐不中丰丹之尹予云井互五亢仁什仃仆仇仍今介仄元允內六兮公冗凶分切刈勻勾勿化匹午升卅卞厄友及反壬天夫太夭孔少尤尺屯巴幻廿弔引心戈戶手扎支文斗斤方日曰月木欠止歹毋比毛氏水火爪父爻片牙牛犬王丙"],["a540","世丕且丘主乍乏乎以付仔仕他仗代令仙仞充兄冉冊冬凹出凸刊加功包匆北匝仟半卉卡占卯卮去可古右召叮叩叨叼司叵叫另只史叱台句叭叻四囚外"],["a5a1","央失奴奶孕它尼巨巧左市布平幼弁弘弗必戊打扔扒扑斥旦朮本未末札正母民氐永汁汀氾犯玄玉瓜瓦甘生用甩田由甲申疋白皮皿目矛矢石示禾穴立丞丟乒乓乩亙交亦亥仿伉伙伊伕伍伐休伏仲件任仰仳份企伋光兇兆先全"],["a640","共再冰列刑划刎刖劣匈匡匠印危吉吏同吊吐吁吋各向名合吃后吆吒因回囝圳地在圭圬圯圩夙多夷夸妄奸妃好她如妁字存宇守宅安寺尖屹州帆并年"],["a6a1","式弛忙忖戎戌戍成扣扛托收早旨旬旭曲曳有朽朴朱朵次此死氖汝汗汙江池汐汕污汛汍汎灰牟牝百竹米糸缶羊羽老考而耒耳聿肉肋肌臣自至臼舌舛舟艮色艾虫血行衣西阡串亨位住佇佗佞伴佛何估佐佑伽伺伸佃佔似但佣"],["a740","作你伯低伶余佝佈佚兌克免兵冶冷別判利刪刨劫助努劬匣即卵吝吭吞吾否呎吧呆呃吳呈呂君吩告吹吻吸吮吵吶吠吼呀吱含吟听囪困囤囫坊坑址坍"],["a7a1","均坎圾坐坏圻壯夾妝妒妨妞妣妙妖妍妤妓妊妥孝孜孚孛完宋宏尬局屁尿尾岐岑岔岌巫希序庇床廷弄弟彤形彷役忘忌志忍忱快忸忪戒我抄抗抖技扶抉扭把扼找批扳抒扯折扮投抓抑抆改攻攸旱更束李杏材村杜杖杞杉杆杠"],["a840","杓杗步每求汞沙沁沈沉沅沛汪決沐汰沌汨沖沒汽沃汲汾汴沆汶沍沔沘沂灶灼災灸牢牡牠狄狂玖甬甫男甸皂盯矣私秀禿究系罕肖肓肝肘肛肚育良芒"],["a8a1","芋芍見角言谷豆豕貝赤走足身車辛辰迂迆迅迄巡邑邢邪邦那酉釆里防阮阱阪阬並乖乳事些亞享京佯依侍佳使佬供例來侃佰併侈佩佻侖佾侏侑佺兔兒兕兩具其典冽函刻券刷刺到刮制剁劾劻卒協卓卑卦卷卸卹取叔受味呵"],["a940","咖呸咕咀呻呷咄咒咆呼咐呱呶和咚呢周咋命咎固垃坷坪坩坡坦坤坼夜奉奇奈奄奔妾妻委妹妮姑姆姐姍始姓姊妯妳姒姅孟孤季宗定官宜宙宛尚屈居"],["a9a1","屆岷岡岸岩岫岱岳帘帚帖帕帛帑幸庚店府底庖延弦弧弩往征彿彼忝忠忽念忿怏怔怯怵怖怪怕怡性怩怫怛或戕房戾所承拉拌拄抿拂抹拒招披拓拔拋拈抨抽押拐拙拇拍抵拚抱拘拖拗拆抬拎放斧於旺昔易昌昆昂明昀昏昕昊"],["aa40","昇服朋杭枋枕東果杳杷枇枝林杯杰板枉松析杵枚枓杼杪杲欣武歧歿氓氛泣注泳沱泌泥河沽沾沼波沫法泓沸泄油況沮泗泅泱沿治泡泛泊沬泯泜泖泠"],["aaa1","炕炎炒炊炙爬爭爸版牧物狀狎狙狗狐玩玨玟玫玥甽疝疙疚的盂盲直知矽社祀祁秉秈空穹竺糾罔羌羋者肺肥肢肱股肫肩肴肪肯臥臾舍芳芝芙芭芽芟芹花芬芥芯芸芣芰芾芷虎虱初表軋迎返近邵邸邱邶采金長門阜陀阿阻附"],["ab40","陂隹雨青非亟亭亮信侵侯便俠俑俏保促侶俘俟俊俗侮俐俄係俚俎俞侷兗冒冑冠剎剃削前剌剋則勇勉勃勁匍南卻厚叛咬哀咨哎哉咸咦咳哇哂咽咪品"],["aba1","哄哈咯咫咱咻咩咧咿囿垂型垠垣垢城垮垓奕契奏奎奐姜姘姿姣姨娃姥姪姚姦威姻孩宣宦室客宥封屎屏屍屋峙峒巷帝帥帟幽庠度建弈弭彥很待徊律徇後徉怒思怠急怎怨恍恰恨恢恆恃恬恫恪恤扁拜挖按拼拭持拮拽指拱拷"],["ac40","拯括拾拴挑挂政故斫施既春昭映昧是星昨昱昤曷柿染柱柔某柬架枯柵柩柯柄柑枴柚查枸柏柞柳枰柙柢柝柒歪殃殆段毒毗氟泉洋洲洪流津洌洱洞洗"],["aca1","活洽派洶洛泵洹洧洸洩洮洵洎洫炫為炳炬炯炭炸炮炤爰牲牯牴狩狠狡玷珊玻玲珍珀玳甚甭畏界畎畋疫疤疥疢疣癸皆皇皈盈盆盃盅省盹相眉看盾盼眇矜砂研砌砍祆祉祈祇禹禺科秒秋穿突竿竽籽紂紅紀紉紇約紆缸美羿耄"],["ad40","耐耍耑耶胖胥胚胃胄背胡胛胎胞胤胝致舢苧范茅苣苛苦茄若茂茉苒苗英茁苜苔苑苞苓苟苯茆虐虹虻虺衍衫要觔計訂訃貞負赴赳趴軍軌述迦迢迪迥"],["ada1","迭迫迤迨郊郎郁郃酋酊重閂限陋陌降面革韋韭音頁風飛食首香乘亳倌倍倣俯倦倥俸倩倖倆值借倚倒們俺倀倔倨俱倡個候倘俳修倭倪俾倫倉兼冤冥冢凍凌准凋剖剜剔剛剝匪卿原厝叟哨唐唁唷哼哥哲唆哺唔哩哭員唉哮哪"],["ae40","哦唧唇哽唏圃圄埂埔埋埃堉夏套奘奚娑娘娜娟娛娓姬娠娣娩娥娌娉孫屘宰害家宴宮宵容宸射屑展屐峭峽峻峪峨峰島崁峴差席師庫庭座弱徒徑徐恙"],["aea1","恣恥恐恕恭恩息悄悟悚悍悔悌悅悖扇拳挈拿捎挾振捕捂捆捏捉挺捐挽挪挫挨捍捌效敉料旁旅時晉晏晃晒晌晅晁書朔朕朗校核案框桓根桂桔栩梳栗桌桑栽柴桐桀格桃株桅栓栘桁殊殉殷氣氧氨氦氤泰浪涕消涇浦浸海浙涓"],["af40","浬涉浮浚浴浩涌涊浹涅浥涔烊烘烤烙烈烏爹特狼狹狽狸狷玆班琉珮珠珪珞畔畝畜畚留疾病症疲疳疽疼疹痂疸皋皰益盍盎眩真眠眨矩砰砧砸砝破砷"],["afa1","砥砭砠砟砲祕祐祠祟祖神祝祗祚秤秣秧租秦秩秘窄窈站笆笑粉紡紗紋紊素索純紐紕級紜納紙紛缺罟羔翅翁耆耘耕耙耗耽耿胱脂胰脅胭胴脆胸胳脈能脊胼胯臭臬舀舐航舫舨般芻茫荒荔荊茸荐草茵茴荏茲茹茶茗荀茱茨荃"],["b040","虔蚊蚪蚓蚤蚩蚌蚣蚜衰衷袁袂衽衹記訐討訌訕訊託訓訖訏訑豈豺豹財貢起躬軒軔軏辱送逆迷退迺迴逃追逅迸邕郡郝郢酒配酌釘針釗釜釙閃院陣陡"],["b0a1","陛陝除陘陞隻飢馬骨高鬥鬲鬼乾偺偽停假偃偌做偉健偶偎偕偵側偷偏倏偯偭兜冕凰剪副勒務勘動匐匏匙匿區匾參曼商啪啦啄啞啡啃啊唱啖問啕唯啤唸售啜唬啣唳啁啗圈國圉域堅堊堆埠埤基堂堵執培夠奢娶婁婉婦婪婀"],["b140","娼婢婚婆婊孰寇寅寄寂宿密尉專將屠屜屝崇崆崎崛崖崢崑崩崔崙崤崧崗巢常帶帳帷康庸庶庵庾張強彗彬彩彫得徙從徘御徠徜恿患悉悠您惋悴惦悽"],["b1a1","情悻悵惜悼惘惕惆惟悸惚惇戚戛扈掠控捲掖探接捷捧掘措捱掩掉掃掛捫推掄授掙採掬排掏掀捻捩捨捺敝敖救教敗啟敏敘敕敔斜斛斬族旋旌旎晝晚晤晨晦晞曹勗望梁梯梢梓梵桿桶梱梧梗械梃棄梭梆梅梔條梨梟梡梂欲殺"],["b240","毫毬氫涎涼淳淙液淡淌淤添淺清淇淋涯淑涮淞淹涸混淵淅淒渚涵淚淫淘淪深淮淨淆淄涪淬涿淦烹焉焊烽烯爽牽犁猜猛猖猓猙率琅琊球理現琍瓠瓶"],["b2a1","瓷甜產略畦畢異疏痔痕疵痊痍皎盔盒盛眷眾眼眶眸眺硫硃硎祥票祭移窒窕笠笨笛第符笙笞笮粒粗粕絆絃統紮紹紼絀細紳組累終紲紱缽羞羚翌翎習耜聊聆脯脖脣脫脩脰脤舂舵舷舶船莎莞莘荸莢莖莽莫莒莊莓莉莠荷荻荼"],["b340","莆莧處彪蛇蛀蚶蛄蚵蛆蛋蚱蚯蛉術袞袈被袒袖袍袋覓規訪訝訣訥許設訟訛訢豉豚販責貫貨貪貧赧赦趾趺軛軟這逍通逗連速逝逐逕逞造透逢逖逛途"],["b3a1","部郭都酗野釵釦釣釧釭釩閉陪陵陳陸陰陴陶陷陬雀雪雩章竟頂頃魚鳥鹵鹿麥麻傢傍傅備傑傀傖傘傚最凱割剴創剩勞勝勛博厥啻喀喧啼喊喝喘喂喜喪喔喇喋喃喳單喟唾喲喚喻喬喱啾喉喫喙圍堯堪場堤堰報堡堝堠壹壺奠"],["b440","婷媚婿媒媛媧孳孱寒富寓寐尊尋就嵌嵐崴嵇巽幅帽幀幃幾廊廁廂廄弼彭復循徨惑惡悲悶惠愜愣惺愕惰惻惴慨惱愎惶愉愀愒戟扉掣掌描揀揩揉揆揍"],["b4a1","插揣提握揖揭揮捶援揪換摒揚揹敞敦敢散斑斐斯普晰晴晶景暑智晾晷曾替期朝棺棕棠棘棗椅棟棵森棧棹棒棲棣棋棍植椒椎棉棚楮棻款欺欽殘殖殼毯氮氯氬港游湔渡渲湧湊渠渥渣減湛湘渤湖湮渭渦湯渴湍渺測湃渝渾滋"],["b540","溉渙湎湣湄湲湩湟焙焚焦焰無然煮焜牌犄犀猶猥猴猩琺琪琳琢琥琵琶琴琯琛琦琨甥甦畫番痢痛痣痙痘痞痠登發皖皓皴盜睏短硝硬硯稍稈程稅稀窘"],["b5a1","窗窖童竣等策筆筐筒答筍筋筏筑粟粥絞結絨絕紫絮絲絡給絢絰絳善翔翕耋聒肅腕腔腋腑腎脹腆脾腌腓腴舒舜菩萃菸萍菠菅萋菁華菱菴著萊菰萌菌菽菲菊萸萎萄菜萇菔菟虛蛟蛙蛭蛔蛛蛤蛐蛞街裁裂袱覃視註詠評詞証詁"],["b640","詔詛詐詆訴診訶詖象貂貯貼貳貽賁費賀貴買貶貿貸越超趁跎距跋跚跑跌跛跆軻軸軼辜逮逵週逸進逶鄂郵鄉郾酣酥量鈔鈕鈣鈉鈞鈍鈐鈇鈑閔閏開閑"],["b6a1","間閒閎隊階隋陽隅隆隍陲隄雁雅雄集雇雯雲韌項順須飧飪飯飩飲飭馮馭黃黍黑亂傭債傲傳僅傾催傷傻傯僇剿剷剽募勦勤勢勣匯嗟嗨嗓嗦嗎嗜嗇嗑嗣嗤嗯嗚嗡嗅嗆嗥嗉園圓塞塑塘塗塚塔填塌塭塊塢塒塋奧嫁嫉嫌媾媽媼"],["b740","媳嫂媲嵩嵯幌幹廉廈弒彙徬微愚意慈感想愛惹愁愈慎慌慄慍愾愴愧愍愆愷戡戢搓搾搞搪搭搽搬搏搜搔損搶搖搗搆敬斟新暗暉暇暈暖暄暘暍會榔業"],["b7a1","楚楷楠楔極椰概楊楨楫楞楓楹榆楝楣楛歇歲毀殿毓毽溢溯滓溶滂源溝滇滅溥溘溼溺溫滑準溜滄滔溪溧溴煎煙煩煤煉照煜煬煦煌煥煞煆煨煖爺牒猷獅猿猾瑯瑚瑕瑟瑞瑁琿瑙瑛瑜當畸瘀痰瘁痲痱痺痿痴痳盞盟睛睫睦睞督"],["b840","睹睪睬睜睥睨睢矮碎碰碗碘碌碉硼碑碓硿祺祿禁萬禽稜稚稠稔稟稞窟窠筷節筠筮筧粱粳粵經絹綑綁綏絛置罩罪署義羨群聖聘肆肄腱腰腸腥腮腳腫"],["b8a1","腹腺腦舅艇蒂葷落萱葵葦葫葉葬葛萼萵葡董葩葭葆虞虜號蛹蜓蜈蜇蜀蛾蛻蜂蜃蜆蜊衙裟裔裙補裘裝裡裊裕裒覜解詫該詳試詩詰誇詼詣誠話誅詭詢詮詬詹詻訾詨豢貊貉賊資賈賄貲賃賂賅跡跟跨路跳跺跪跤跦躲較載軾輊"],["b940","辟農運遊道遂達逼違遐遇遏過遍遑逾遁鄒鄗酬酪酩釉鈷鉗鈸鈽鉀鈾鉛鉋鉤鉑鈴鉉鉍鉅鈹鈿鉚閘隘隔隕雍雋雉雊雷電雹零靖靴靶預頑頓頊頒頌飼飴"],["b9a1","飽飾馳馱馴髡鳩麂鼎鼓鼠僧僮僥僖僭僚僕像僑僱僎僩兢凳劃劂匱厭嗾嘀嘛嘗嗽嘔嘆嘉嘍嘎嗷嘖嘟嘈嘐嗶團圖塵塾境墓墊塹墅塽壽夥夢夤奪奩嫡嫦嫩嫗嫖嫘嫣孵寞寧寡寥實寨寢寤察對屢嶄嶇幛幣幕幗幔廓廖弊彆彰徹慇"],["ba40","愿態慷慢慣慟慚慘慵截撇摘摔撤摸摟摺摑摧搴摭摻敲斡旗旖暢暨暝榜榨榕槁榮槓構榛榷榻榫榴槐槍榭槌榦槃榣歉歌氳漳演滾漓滴漩漾漠漬漏漂漢"],["baa1","滿滯漆漱漸漲漣漕漫漯澈漪滬漁滲滌滷熔熙煽熊熄熒爾犒犖獄獐瑤瑣瑪瑰瑭甄疑瘧瘍瘋瘉瘓盡監瞄睽睿睡磁碟碧碳碩碣禎福禍種稱窪窩竭端管箕箋筵算箝箔箏箸箇箄粹粽精綻綰綜綽綾綠緊綴網綱綺綢綿綵綸維緒緇綬"],["bb40","罰翠翡翟聞聚肇腐膀膏膈膊腿膂臧臺與舔舞艋蓉蒿蓆蓄蒙蒞蒲蒜蓋蒸蓀蓓蒐蒼蓑蓊蜿蜜蜻蜢蜥蜴蜘蝕蜷蜩裳褂裴裹裸製裨褚裯誦誌語誣認誡誓誤"],["bba1","說誥誨誘誑誚誧豪貍貌賓賑賒赫趙趕跼輔輒輕輓辣遠遘遜遣遙遞遢遝遛鄙鄘鄞酵酸酷酴鉸銀銅銘銖鉻銓銜銨鉼銑閡閨閩閣閥閤隙障際雌雒需靼鞅韶頗領颯颱餃餅餌餉駁骯骰髦魁魂鳴鳶鳳麼鼻齊億儀僻僵價儂儈儉儅凜"],["bc40","劇劈劉劍劊勰厲嘮嘻嘹嘲嘿嘴嘩噓噎噗噴嘶嘯嘰墀墟增墳墜墮墩墦奭嬉嫻嬋嫵嬌嬈寮寬審寫層履嶝嶔幢幟幡廢廚廟廝廣廠彈影德徵慶慧慮慝慕憂"],["bca1","慼慰慫慾憧憐憫憎憬憚憤憔憮戮摩摯摹撞撲撈撐撰撥撓撕撩撒撮播撫撚撬撙撢撳敵敷數暮暫暴暱樣樟槨樁樞標槽模樓樊槳樂樅槭樑歐歎殤毅毆漿潼澄潑潦潔澆潭潛潸潮澎潺潰潤澗潘滕潯潠潟熟熬熱熨牖犛獎獗瑩璋璃"],["bd40","瑾璀畿瘠瘩瘟瘤瘦瘡瘢皚皺盤瞎瞇瞌瞑瞋磋磅確磊碾磕碼磐稿稼穀稽稷稻窯窮箭箱範箴篆篇篁箠篌糊締練緯緻緘緬緝編緣線緞緩綞緙緲緹罵罷羯"],["bda1","翩耦膛膜膝膠膚膘蔗蔽蔚蓮蔬蔭蔓蔑蔣蔡蔔蓬蔥蓿蔆螂蝴蝶蝠蝦蝸蝨蝙蝗蝌蝓衛衝褐複褒褓褕褊誼諒談諄誕請諸課諉諂調誰論諍誶誹諛豌豎豬賠賞賦賤賬賭賢賣賜質賡赭趟趣踫踐踝踢踏踩踟踡踞躺輝輛輟輩輦輪輜輞"],["be40","輥適遮遨遭遷鄰鄭鄧鄱醇醉醋醃鋅銻銷鋪銬鋤鋁銳銼鋒鋇鋰銲閭閱霄霆震霉靠鞍鞋鞏頡頫頜颳養餓餒餘駝駐駟駛駑駕駒駙骷髮髯鬧魅魄魷魯鴆鴉"],["bea1","鴃麩麾黎墨齒儒儘儔儐儕冀冪凝劑劓勳噙噫噹噩噤噸噪器噥噱噯噬噢噶壁墾壇壅奮嬝嬴學寰導彊憲憑憩憊懍憶憾懊懈戰擅擁擋撻撼據擄擇擂操撿擒擔撾整曆曉暹曄曇暸樽樸樺橙橫橘樹橄橢橡橋橇樵機橈歙歷氅濂澱澡"],["bf40","濃澤濁澧澳激澹澶澦澠澴熾燉燐燒燈燕熹燎燙燜燃燄獨璜璣璘璟璞瓢甌甍瘴瘸瘺盧盥瞠瞞瞟瞥磨磚磬磧禦積穎穆穌穋窺篙簑築篤篛篡篩篦糕糖縊"],["bfa1","縑縈縛縣縞縝縉縐罹羲翰翱翮耨膳膩膨臻興艘艙蕊蕙蕈蕨蕩蕃蕉蕭蕪蕞螃螟螞螢融衡褪褲褥褫褡親覦諦諺諫諱謀諜諧諮諾謁謂諷諭諳諶諼豫豭貓賴蹄踱踴蹂踹踵輻輯輸輳辨辦遵遴選遲遼遺鄴醒錠錶鋸錳錯錢鋼錫錄錚"],["c040","錐錦錡錕錮錙閻隧隨險雕霎霑霖霍霓霏靛靜靦鞘頰頸頻頷頭頹頤餐館餞餛餡餚駭駢駱骸骼髻髭鬨鮑鴕鴣鴦鴨鴒鴛默黔龍龜優償儡儲勵嚎嚀嚐嚅嚇"],["c0a1","嚏壕壓壑壎嬰嬪嬤孺尷屨嶼嶺嶽嶸幫彌徽應懂懇懦懋戲戴擎擊擘擠擰擦擬擱擢擭斂斃曙曖檀檔檄檢檜櫛檣橾檗檐檠歜殮毚氈濘濱濟濠濛濤濫濯澀濬濡濩濕濮濰燧營燮燦燥燭燬燴燠爵牆獰獲璩環璦璨癆療癌盪瞳瞪瞰瞬"],["c140","瞧瞭矯磷磺磴磯礁禧禪穗窿簇簍篾篷簌篠糠糜糞糢糟糙糝縮績繆縷縲繃縫總縱繅繁縴縹繈縵縿縯罄翳翼聱聲聰聯聳臆臃膺臂臀膿膽臉膾臨舉艱薪"],["c1a1","薄蕾薜薑薔薯薛薇薨薊虧蟀蟑螳蟒蟆螫螻螺蟈蟋褻褶襄褸褽覬謎謗謙講謊謠謝謄謐豁谿豳賺賽購賸賻趨蹉蹋蹈蹊轄輾轂轅輿避遽還邁邂邀鄹醣醞醜鍍鎂錨鍵鍊鍥鍋錘鍾鍬鍛鍰鍚鍔闊闋闌闈闆隱隸雖霜霞鞠韓顆颶餵騁"],["c240","駿鮮鮫鮪鮭鴻鴿麋黏點黜黝黛鼾齋叢嚕嚮壙壘嬸彝懣戳擴擲擾攆擺擻擷斷曜朦檳檬櫃檻檸櫂檮檯歟歸殯瀉瀋濾瀆濺瀑瀏燻燼燾燸獷獵璧璿甕癖癘"],["c2a1","癒瞽瞿瞻瞼礎禮穡穢穠竄竅簫簧簪簞簣簡糧織繕繞繚繡繒繙罈翹翻職聶臍臏舊藏薩藍藐藉薰薺薹薦蟯蟬蟲蟠覆覲觴謨謹謬謫豐贅蹙蹣蹦蹤蹟蹕軀轉轍邇邃邈醫醬釐鎔鎊鎖鎢鎳鎮鎬鎰鎘鎚鎗闔闖闐闕離雜雙雛雞霤鞣鞦"],["c340","鞭韹額顏題顎顓颺餾餿餽餮馥騎髁鬃鬆魏魎魍鯊鯉鯽鯈鯀鵑鵝鵠黠鼕鼬儳嚥壞壟壢寵龐廬懲懷懶懵攀攏曠曝櫥櫝櫚櫓瀛瀟瀨瀚瀝瀕瀘爆爍牘犢獸"],["c3a1","獺璽瓊瓣疇疆癟癡矇礙禱穫穩簾簿簸簽簷籀繫繭繹繩繪羅繳羶羹羸臘藩藝藪藕藤藥藷蟻蠅蠍蟹蟾襠襟襖襞譁譜識證譚譎譏譆譙贈贊蹼蹲躇蹶蹬蹺蹴轔轎辭邊邋醱醮鏡鏑鏟鏃鏈鏜鏝鏖鏢鏍鏘鏤鏗鏨關隴難霪霧靡韜韻類"],["c440","願顛颼饅饉騖騙鬍鯨鯧鯖鯛鶉鵡鵲鵪鵬麒麗麓麴勸嚨嚷嚶嚴嚼壤孀孃孽寶巉懸懺攘攔攙曦朧櫬瀾瀰瀲爐獻瓏癢癥礦礪礬礫竇競籌籃籍糯糰辮繽繼"],["c4a1","纂罌耀臚艦藻藹蘑藺蘆蘋蘇蘊蠔蠕襤覺觸議譬警譯譟譫贏贍躉躁躅躂醴釋鐘鐃鏽闡霰飄饒饑馨騫騰騷騵鰓鰍鹹麵黨鼯齟齣齡儷儸囁囀囂夔屬巍懼懾攝攜斕曩櫻欄櫺殲灌爛犧瓖瓔癩矓籐纏續羼蘗蘭蘚蠣蠢蠡蠟襪襬覽譴"],["c540","護譽贓躊躍躋轟辯醺鐮鐳鐵鐺鐸鐲鐫闢霸霹露響顧顥饗驅驃驀騾髏魔魑鰭鰥鶯鶴鷂鶸麝黯鼙齜齦齧儼儻囈囊囉孿巔巒彎懿攤權歡灑灘玀瓤疊癮癬"],["c5a1","禳籠籟聾聽臟襲襯觼讀贖贗躑躓轡酈鑄鑑鑒霽霾韃韁顫饕驕驍髒鬚鱉鰱鰾鰻鷓鷗鼴齬齪龔囌巖戀攣攫攪曬欐瓚竊籤籣籥纓纖纔臢蘸蘿蠱變邐邏鑣鑠鑤靨顯饜驚驛驗髓體髑鱔鱗鱖鷥麟黴囑壩攬灞癱癲矗罐羈蠶蠹衢讓讒"],["c640","讖艷贛釀鑪靂靈靄韆顰驟鬢魘鱟鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻觀躡釁鑲鑰顱饞髖鬣黌灤矚讚鑷韉驢驥纜讜躪釅鑽鑾鑼鱷鱸黷豔鑿鸚爨驪鬱鸛鸞籲"],["c940","乂乜凵匚厂万丌乇亍囗兀屮彳丏冇与丮亓仂仉仈冘勼卬厹圠夃夬尐巿旡殳毌气爿丱丼仨仜仩仡仝仚刌匜卌圢圣夗夯宁宄尒尻屴屳帄庀庂忉戉扐氕"],["c9a1","氶汃氿氻犮犰玊禸肊阞伎优伬仵伔仱伀价伈伝伂伅伢伓伄仴伒冱刓刉刐劦匢匟卍厊吇囡囟圮圪圴夼妀奼妅奻奾奷奿孖尕尥屼屺屻屾巟幵庄异弚彴忕忔忏扜扞扤扡扦扢扙扠扚扥旯旮朾朹朸朻机朿朼朳氘汆汒汜汏汊汔汋"],["ca40","汌灱牞犴犵玎甪癿穵网艸艼芀艽艿虍襾邙邗邘邛邔阢阤阠阣佖伻佢佉体佤伾佧佒佟佁佘伭伳伿佡冏冹刜刞刡劭劮匉卣卲厎厏吰吷吪呔呅吙吜吥吘"],["caa1","吽呏呁吨吤呇囮囧囥坁坅坌坉坋坒夆奀妦妘妠妗妎妢妐妏妧妡宎宒尨尪岍岏岈岋岉岒岊岆岓岕巠帊帎庋庉庌庈庍弅弝彸彶忒忑忐忭忨忮忳忡忤忣忺忯忷忻怀忴戺抃抌抎抏抔抇扱扻扺扰抁抈扷扽扲扴攷旰旴旳旲旵杅杇"],["cb40","杙杕杌杈杝杍杚杋毐氙氚汸汧汫沄沋沏汱汯汩沚汭沇沕沜汦汳汥汻沎灴灺牣犿犽狃狆狁犺狅玕玗玓玔玒町甹疔疕皁礽耴肕肙肐肒肜芐芏芅芎芑芓"],["cba1","芊芃芄豸迉辿邟邡邥邞邧邠阰阨阯阭丳侘佼侅佽侀侇佶佴侉侄佷佌侗佪侚佹侁佸侐侜侔侞侒侂侕佫佮冞冼冾刵刲刳剆刱劼匊匋匼厒厔咇呿咁咑咂咈呫呺呾呥呬呴呦咍呯呡呠咘呣呧呤囷囹坯坲坭坫坱坰坶垀坵坻坳坴坢"],["cc40","坨坽夌奅妵妺姏姎妲姌姁妶妼姃姖妱妽姀姈妴姇孢孥宓宕屄屇岮岤岠岵岯岨岬岟岣岭岢岪岧岝岥岶岰岦帗帔帙弨弢弣弤彔徂彾彽忞忥怭怦怙怲怋"],["cca1","怴怊怗怳怚怞怬怢怍怐怮怓怑怌怉怜戔戽抭抴拑抾抪抶拊抮抳抯抻抩抰抸攽斨斻昉旼昄昒昈旻昃昋昍昅旽昑昐曶朊枅杬枎枒杶杻枘枆构杴枍枌杺枟枑枙枃杽极杸杹枔欥殀歾毞氝沓泬泫泮泙沶泔沭泧沷泐泂沺泃泆泭泲"],["cd40","泒泝沴沊沝沀泞泀洰泍泇沰泹泏泩泑炔炘炅炓炆炄炑炖炂炚炃牪狖狋狘狉狜狒狔狚狌狑玤玡玭玦玢玠玬玝瓝瓨甿畀甾疌疘皯盳盱盰盵矸矼矹矻矺"],["cda1","矷祂礿秅穸穻竻籵糽耵肏肮肣肸肵肭舠芠苀芫芚芘芛芵芧芮芼芞芺芴芨芡芩苂芤苃芶芢虰虯虭虮豖迒迋迓迍迖迕迗邲邴邯邳邰阹阽阼阺陃俍俅俓侲俉俋俁俔俜俙侻侳俛俇俖侺俀侹俬剄剉勀勂匽卼厗厖厙厘咺咡咭咥哏"],["ce40","哃茍咷咮哖咶哅哆咠呰咼咢咾呲哞咰垵垞垟垤垌垗垝垛垔垘垏垙垥垚垕壴复奓姡姞姮娀姱姝姺姽姼姶姤姲姷姛姩姳姵姠姾姴姭宨屌峐峘峌峗峋峛"],["cea1","峞峚峉峇峊峖峓峔峏峈峆峎峟峸巹帡帢帣帠帤庰庤庢庛庣庥弇弮彖徆怷怹恔恲恞恅恓恇恉恛恌恀恂恟怤恄恘恦恮扂扃拏挍挋拵挎挃拫拹挏挌拸拶挀挓挔拺挕拻拰敁敃斪斿昶昡昲昵昜昦昢昳昫昺昝昴昹昮朏朐柁柲柈枺"],["cf40","柜枻柸柘柀枷柅柫柤柟枵柍枳柷柶柮柣柂枹柎柧柰枲柼柆柭柌枮柦柛柺柉柊柃柪柋欨殂殄殶毖毘毠氠氡洨洴洭洟洼洿洒洊泚洳洄洙洺洚洑洀洝浂"],["cfa1","洁洘洷洃洏浀洇洠洬洈洢洉洐炷炟炾炱炰炡炴炵炩牁牉牊牬牰牳牮狊狤狨狫狟狪狦狣玅珌珂珈珅玹玶玵玴珫玿珇玾珃珆玸珋瓬瓮甮畇畈疧疪癹盄眈眃眄眅眊盷盻盺矧矨砆砑砒砅砐砏砎砉砃砓祊祌祋祅祄秕种秏秖秎窀"],["d040","穾竑笀笁籺籸籹籿粀粁紃紈紁罘羑羍羾耇耎耏耔耷胘胇胠胑胈胂胐胅胣胙胜胊胕胉胏胗胦胍臿舡芔苙苾苹茇苨茀苕茺苫苖苴苬苡苲苵茌苻苶苰苪"],["d0a1","苤苠苺苳苭虷虴虼虳衁衎衧衪衩觓訄訇赲迣迡迮迠郱邽邿郕郅邾郇郋郈釔釓陔陏陑陓陊陎倞倅倇倓倢倰倛俵俴倳倷倬俶俷倗倜倠倧倵倯倱倎党冔冓凊凄凅凈凎剡剚剒剞剟剕剢勍匎厞唦哢唗唒哧哳哤唚哿唄唈哫唑唅哱"],["d140","唊哻哷哸哠唎唃唋圁圂埌堲埕埒垺埆垽垼垸垶垿埇埐垹埁夎奊娙娖娭娮娕娏娗娊娞娳孬宧宭宬尃屖屔峬峿峮峱峷崀峹帩帨庨庮庪庬弳弰彧恝恚恧"],["d1a1","恁悢悈悀悒悁悝悃悕悛悗悇悜悎戙扆拲挐捖挬捄捅挶捃揤挹捋捊挼挩捁挴捘捔捙挭捇挳捚捑挸捗捀捈敊敆旆旃旄旂晊晟晇晑朒朓栟栚桉栲栳栻桋桏栖栱栜栵栫栭栯桎桄栴栝栒栔栦栨栮桍栺栥栠欬欯欭欱欴歭肂殈毦毤"],["d240","毨毣毢毧氥浺浣浤浶洍浡涒浘浢浭浯涑涍淯浿涆浞浧浠涗浰浼浟涂涘洯浨涋浾涀涄洖涃浻浽浵涐烜烓烑烝烋缹烢烗烒烞烠烔烍烅烆烇烚烎烡牂牸"],["d2a1","牷牶猀狺狴狾狶狳狻猁珓珙珥珖玼珧珣珩珜珒珛珔珝珚珗珘珨瓞瓟瓴瓵甡畛畟疰痁疻痄痀疿疶疺皊盉眝眛眐眓眒眣眑眕眙眚眢眧砣砬砢砵砯砨砮砫砡砩砳砪砱祔祛祏祜祓祒祑秫秬秠秮秭秪秜秞秝窆窉窅窋窌窊窇竘笐"],["d340","笄笓笅笏笈笊笎笉笒粄粑粊粌粈粍粅紞紝紑紎紘紖紓紟紒紏紌罜罡罞罠罝罛羖羒翃翂翀耖耾耹胺胲胹胵脁胻脀舁舯舥茳茭荄茙荑茥荖茿荁茦茜茢"],["d3a1","荂荎茛茪茈茼荍茖茤茠茷茯茩荇荅荌荓茞茬荋茧荈虓虒蚢蚨蚖蚍蚑蚞蚇蚗蚆蚋蚚蚅蚥蚙蚡蚧蚕蚘蚎蚝蚐蚔衃衄衭衵衶衲袀衱衿衯袃衾衴衼訒豇豗豻貤貣赶赸趵趷趶軑軓迾迵适迿迻逄迼迶郖郠郙郚郣郟郥郘郛郗郜郤酐"],["d440","酎酏釕釢釚陜陟隼飣髟鬯乿偰偪偡偞偠偓偋偝偲偈偍偁偛偊偢倕偅偟偩偫偣偤偆偀偮偳偗偑凐剫剭剬剮勖勓匭厜啵啶唼啍啐唴唪啑啢唶唵唰啒啅"],["d4a1","唌唲啥啎唹啈唭唻啀啋圊圇埻堔埢埶埜埴堀埭埽堈埸堋埳埏堇埮埣埲埥埬埡堎埼堐埧堁堌埱埩埰堍堄奜婠婘婕婧婞娸娵婭婐婟婥婬婓婤婗婃婝婒婄婛婈媎娾婍娹婌婰婩婇婑婖婂婜孲孮寁寀屙崞崋崝崚崠崌崨崍崦崥崏"],["d540","崰崒崣崟崮帾帴庱庴庹庲庳弶弸徛徖徟悊悐悆悾悰悺惓惔惏惤惙惝惈悱惛悷惊悿惃惍惀挲捥掊掂捽掽掞掭掝掗掫掎捯掇掐据掯捵掜捭掮捼掤挻掟"],["d5a1","捸掅掁掑掍捰敓旍晥晡晛晙晜晢朘桹梇梐梜桭桮梮梫楖桯梣梬梩桵桴梲梏桷梒桼桫桲梪梀桱桾梛梖梋梠梉梤桸桻梑梌梊桽欶欳欷欸殑殏殍殎殌氪淀涫涴涳湴涬淩淢涷淶淔渀淈淠淟淖涾淥淜淝淛淴淊涽淭淰涺淕淂淏淉"],["d640","淐淲淓淽淗淍淣涻烺焍烷焗烴焌烰焄烳焐烼烿焆焓焀烸烶焋焂焎牾牻牼牿猝猗猇猑猘猊猈狿猏猞玈珶珸珵琄琁珽琇琀珺珼珿琌琋珴琈畤畣痎痒痏"],["d6a1","痋痌痑痐皏皉盓眹眯眭眱眲眴眳眽眥眻眵硈硒硉硍硊硌砦硅硐祤祧祩祪祣祫祡离秺秸秶秷窏窔窐笵筇笴笥笰笢笤笳笘笪笝笱笫笭笯笲笸笚笣粔粘粖粣紵紽紸紶紺絅紬紩絁絇紾紿絊紻紨罣羕羜羝羛翊翋翍翐翑翇翏翉耟"],["d740","耞耛聇聃聈脘脥脙脛脭脟脬脞脡脕脧脝脢舑舸舳舺舴舲艴莐莣莨莍荺荳莤荴莏莁莕莙荵莔莩荽莃莌莝莛莪莋荾莥莯莈莗莰荿莦莇莮荶莚虙虖蚿蚷"],["d7a1","蛂蛁蛅蚺蚰蛈蚹蚳蚸蛌蚴蚻蚼蛃蚽蚾衒袉袕袨袢袪袚袑袡袟袘袧袙袛袗袤袬袌袓袎覂觖觙觕訰訧訬訞谹谻豜豝豽貥赽赻赹趼跂趹趿跁軘軞軝軜軗軠軡逤逋逑逜逌逡郯郪郰郴郲郳郔郫郬郩酖酘酚酓酕釬釴釱釳釸釤釹釪"],["d840","釫釷釨釮镺閆閈陼陭陫陱陯隿靪頄飥馗傛傕傔傞傋傣傃傌傎傝偨傜傒傂傇兟凔匒匑厤厧喑喨喥喭啷噅喢喓喈喏喵喁喣喒喤啽喌喦啿喕喡喎圌堩堷"],["d8a1","堙堞堧堣堨埵塈堥堜堛堳堿堶堮堹堸堭堬堻奡媯媔媟婺媢媞婸媦婼媥媬媕媮娷媄媊媗媃媋媩婻婽媌媜媏媓媝寪寍寋寔寑寊寎尌尰崷嵃嵫嵁嵋崿崵嵑嵎嵕崳崺嵒崽崱嵙嵂崹嵉崸崼崲崶嵀嵅幄幁彘徦徥徫惉悹惌惢惎惄愔"],["d940","惲愊愖愅惵愓惸惼惾惁愃愘愝愐惿愄愋扊掔掱掰揎揥揨揯揃撝揳揊揠揶揕揲揵摡揟掾揝揜揄揘揓揂揇揌揋揈揰揗揙攲敧敪敤敜敨敥斌斝斞斮旐旒"],["d9a1","晼晬晻暀晱晹晪晲朁椌棓椄棜椪棬棪棱椏棖棷棫棤棶椓椐棳棡椇棌椈楰梴椑棯棆椔棸棐棽棼棨椋椊椗棎棈棝棞棦棴棑椆棔棩椕椥棇欹欻欿欼殔殗殙殕殽毰毲毳氰淼湆湇渟湉溈渼渽湅湢渫渿湁湝湳渜渳湋湀湑渻渃渮湞"],["da40","湨湜湡渱渨湠湱湫渹渢渰湓湥渧湸湤湷湕湹湒湦渵渶湚焠焞焯烻焮焱焣焥焢焲焟焨焺焛牋牚犈犉犆犅犋猒猋猰猢猱猳猧猲猭猦猣猵猌琮琬琰琫琖"],["daa1","琚琡琭琱琤琣琝琩琠琲瓻甯畯畬痧痚痡痦痝痟痤痗皕皒盚睆睇睄睍睅睊睎睋睌矞矬硠硤硥硜硭硱硪确硰硩硨硞硢祴祳祲祰稂稊稃稌稄窙竦竤筊笻筄筈筌筎筀筘筅粢粞粨粡絘絯絣絓絖絧絪絏絭絜絫絒絔絩絑絟絎缾缿罥"],["db40","罦羢羠羡翗聑聏聐胾胔腃腊腒腏腇脽腍脺臦臮臷臸臹舄舼舽舿艵茻菏菹萣菀菨萒菧菤菼菶萐菆菈菫菣莿萁菝菥菘菿菡菋菎菖菵菉萉萏菞萑萆菂菳"],["dba1","菕菺菇菑菪萓菃菬菮菄菻菗菢萛菛菾蛘蛢蛦蛓蛣蛚蛪蛝蛫蛜蛬蛩蛗蛨蛑衈衖衕袺裗袹袸裀袾袶袼袷袽袲褁裉覕覘覗觝觚觛詎詍訹詙詀詗詘詄詅詒詈詑詊詌詏豟貁貀貺貾貰貹貵趄趀趉跘跓跍跇跖跜跏跕跙跈跗跅軯軷軺"],["dc40","軹軦軮軥軵軧軨軶軫軱軬軴軩逭逴逯鄆鄬鄄郿郼鄈郹郻鄁鄀鄇鄅鄃酡酤酟酢酠鈁鈊鈥鈃鈚鈦鈏鈌鈀鈒釿釽鈆鈄鈧鈂鈜鈤鈙鈗鈅鈖镻閍閌閐隇陾隈"],["dca1","隉隃隀雂雈雃雱雰靬靰靮頇颩飫鳦黹亃亄亶傽傿僆傮僄僊傴僈僂傰僁傺傱僋僉傶傸凗剺剸剻剼嗃嗛嗌嗐嗋嗊嗝嗀嗔嗄嗩喿嗒喍嗏嗕嗢嗖嗈嗲嗍嗙嗂圔塓塨塤塏塍塉塯塕塎塝塙塥塛堽塣塱壼嫇嫄嫋媺媸媱媵媰媿嫈媻嫆"],["dd40","媷嫀嫊媴媶嫍媹媐寖寘寙尟尳嵱嵣嵊嵥嵲嵬嵞嵨嵧嵢巰幏幎幊幍幋廅廌廆廋廇彀徯徭惷慉慊愫慅愶愲愮慆愯慏愩慀戠酨戣戥戤揅揱揫搐搒搉搠搤"],["dda1","搳摃搟搕搘搹搷搢搣搌搦搰搨摁搵搯搊搚摀搥搧搋揧搛搮搡搎敯斒旓暆暌暕暐暋暊暙暔晸朠楦楟椸楎楢楱椿楅楪椹楂楗楙楺楈楉椵楬椳椽楥棰楸椴楩楀楯楄楶楘楁楴楌椻楋椷楜楏楑椲楒椯楻椼歆歅歃歂歈歁殛嗀毻毼"],["de40","毹毷毸溛滖滈溏滀溟溓溔溠溱溹滆滒溽滁溞滉溷溰滍溦滏溲溾滃滜滘溙溒溎溍溤溡溿溳滐滊溗溮溣煇煔煒煣煠煁煝煢煲煸煪煡煂煘煃煋煰煟煐煓"],["dea1","煄煍煚牏犍犌犑犐犎猼獂猻猺獀獊獉瑄瑊瑋瑒瑑瑗瑀瑏瑐瑎瑂瑆瑍瑔瓡瓿瓾瓽甝畹畷榃痯瘏瘃痷痾痼痹痸瘐痻痶痭痵痽皙皵盝睕睟睠睒睖睚睩睧睔睙睭矠碇碚碔碏碄碕碅碆碡碃硹碙碀碖硻祼禂祽祹稑稘稙稒稗稕稢稓"],["df40","稛稐窣窢窞竫筦筤筭筴筩筲筥筳筱筰筡筸筶筣粲粴粯綈綆綀綍絿綅絺綎絻綃絼綌綔綄絽綒罭罫罧罨罬羦羥羧翛翜耡腤腠腷腜腩腛腢腲朡腞腶腧腯"],["dfa1","腄腡舝艉艄艀艂艅蓱萿葖葶葹蒏蒍葥葑葀蒆葧萰葍葽葚葙葴葳葝蔇葞萷萺萴葺葃葸萲葅萩菙葋萯葂萭葟葰萹葎葌葒葯蓅蒎萻葇萶萳葨葾葄萫葠葔葮葐蜋蜄蛷蜌蛺蛖蛵蝍蛸蜎蜉蜁蛶蜍蜅裖裋裍裎裞裛裚裌裐覅覛觟觥觤"],["e040","觡觠觢觜触詶誆詿詡訿詷誂誄詵誃誁詴詺谼豋豊豥豤豦貆貄貅賌赨赩趑趌趎趏趍趓趔趐趒跰跠跬跱跮跐跩跣跢跧跲跫跴輆軿輁輀輅輇輈輂輋遒逿"],["e0a1","遄遉逽鄐鄍鄏鄑鄖鄔鄋鄎酮酯鉈鉒鈰鈺鉦鈳鉥鉞銃鈮鉊鉆鉭鉬鉏鉠鉧鉯鈶鉡鉰鈱鉔鉣鉐鉲鉎鉓鉌鉖鈲閟閜閞閛隒隓隑隗雎雺雽雸雵靳靷靸靲頏頍頎颬飶飹馯馲馰馵骭骫魛鳪鳭鳧麀黽僦僔僗僨僳僛僪僝僤僓僬僰僯僣僠"],["e140","凘劀劁勩勫匰厬嘧嘕嘌嘒嗼嘏嘜嘁嘓嘂嗺嘝嘄嗿嗹墉塼墐墘墆墁塿塴墋塺墇墑墎塶墂墈塻墔墏壾奫嫜嫮嫥嫕嫪嫚嫭嫫嫳嫢嫠嫛嫬嫞嫝嫙嫨嫟孷寠"],["e1a1","寣屣嶂嶀嵽嶆嵺嶁嵷嶊嶉嶈嵾嵼嶍嵹嵿幘幙幓廘廑廗廎廜廕廙廒廔彄彃彯徶愬愨慁慞慱慳慒慓慲慬憀慴慔慺慛慥愻慪慡慖戩戧戫搫摍摛摝摴摶摲摳摽摵摦撦摎撂摞摜摋摓摠摐摿搿摬摫摙摥摷敳斠暡暠暟朅朄朢榱榶槉"],["e240","榠槎榖榰榬榼榑榙榎榧榍榩榾榯榿槄榽榤槔榹槊榚槏榳榓榪榡榞槙榗榐槂榵榥槆歊歍歋殞殟殠毃毄毾滎滵滱漃漥滸漷滻漮漉潎漙漚漧漘漻漒滭漊"],["e2a1","漶潳滹滮漭潀漰漼漵滫漇漎潃漅滽滶漹漜滼漺漟漍漞漈漡熇熐熉熀熅熂熏煻熆熁熗牄牓犗犕犓獃獍獑獌瑢瑳瑱瑵瑲瑧瑮甀甂甃畽疐瘖瘈瘌瘕瘑瘊瘔皸瞁睼瞅瞂睮瞀睯睾瞃碲碪碴碭碨硾碫碞碥碠碬碢碤禘禊禋禖禕禔禓"],["e340","禗禈禒禐稫穊稰稯稨稦窨窫窬竮箈箜箊箑箐箖箍箌箛箎箅箘劄箙箤箂粻粿粼粺綧綷緂綣綪緁緀緅綝緎緄緆緋緌綯綹綖綼綟綦綮綩綡緉罳翢翣翥翞"],["e3a1","耤聝聜膉膆膃膇膍膌膋舕蒗蒤蒡蒟蒺蓎蓂蒬蒮蒫蒹蒴蓁蓍蒪蒚蒱蓐蒝蒧蒻蒢蒔蓇蓌蒛蒩蒯蒨蓖蒘蒶蓏蒠蓗蓔蓒蓛蒰蒑虡蜳蜣蜨蝫蝀蜮蜞蜡蜙蜛蝃蜬蝁蜾蝆蜠蜲蜪蜭蜼蜒蜺蜱蜵蝂蜦蜧蜸蜤蜚蜰蜑裷裧裱裲裺裾裮裼裶裻"],["e440","裰裬裫覝覡覟覞觩觫觨誫誙誋誒誏誖谽豨豩賕賏賗趖踉踂跿踍跽踊踃踇踆踅跾踀踄輐輑輎輍鄣鄜鄠鄢鄟鄝鄚鄤鄡鄛酺酲酹酳銥銤鉶銛鉺銠銔銪銍"],["e4a1","銦銚銫鉹銗鉿銣鋮銎銂銕銢鉽銈銡銊銆銌銙銧鉾銇銩銝銋鈭隞隡雿靘靽靺靾鞃鞀鞂靻鞄鞁靿韎韍頖颭颮餂餀餇馝馜駃馹馻馺駂馽駇骱髣髧鬾鬿魠魡魟鳱鳲鳵麧僿儃儰僸儆儇僶僾儋儌僽儊劋劌勱勯噈噂噌嘵噁噊噉噆噘"],["e540","噚噀嘳嘽嘬嘾嘸嘪嘺圚墫墝墱墠墣墯墬墥墡壿嫿嫴嫽嫷嫶嬃嫸嬂嫹嬁嬇嬅嬏屧嶙嶗嶟嶒嶢嶓嶕嶠嶜嶡嶚嶞幩幝幠幜緳廛廞廡彉徲憋憃慹憱憰憢憉"],["e5a1","憛憓憯憭憟憒憪憡憍慦憳戭摮摰撖撠撅撗撜撏撋撊撌撣撟摨撱撘敶敺敹敻斲斳暵暰暩暲暷暪暯樀樆樗槥槸樕槱槤樠槿槬槢樛樝槾樧槲槮樔槷槧橀樈槦槻樍槼槫樉樄樘樥樏槶樦樇槴樖歑殥殣殢殦氁氀毿氂潁漦潾澇濆澒"],["e640","澍澉澌潢潏澅潚澖潶潬澂潕潲潒潐潗澔澓潝漀潡潫潽潧澐潓澋潩潿澕潣潷潪潻熲熯熛熰熠熚熩熵熝熥熞熤熡熪熜熧熳犘犚獘獒獞獟獠獝獛獡獚獙"],["e6a1","獢璇璉璊璆璁瑽璅璈瑼瑹甈甇畾瘥瘞瘙瘝瘜瘣瘚瘨瘛皜皝皞皛瞍瞏瞉瞈磍碻磏磌磑磎磔磈磃磄磉禚禡禠禜禢禛歶稹窲窴窳箷篋箾箬篎箯箹篊箵糅糈糌糋緷緛緪緧緗緡縃緺緦緶緱緰緮緟罶羬羰羭翭翫翪翬翦翨聤聧膣膟"],["e740","膞膕膢膙膗舖艏艓艒艐艎艑蔤蔻蔏蔀蔩蔎蔉蔍蔟蔊蔧蔜蓻蔫蓺蔈蔌蓴蔪蓲蔕蓷蓫蓳蓼蔒蓪蓩蔖蓾蔨蔝蔮蔂蓽蔞蓶蔱蔦蓧蓨蓰蓯蓹蔘蔠蔰蔋蔙蔯虢"],["e7a1","蝖蝣蝤蝷蟡蝳蝘蝔蝛蝒蝡蝚蝑蝞蝭蝪蝐蝎蝟蝝蝯蝬蝺蝮蝜蝥蝏蝻蝵蝢蝧蝩衚褅褌褔褋褗褘褙褆褖褑褎褉覢覤覣觭觰觬諏諆誸諓諑諔諕誻諗誾諀諅諘諃誺誽諙谾豍貏賥賟賙賨賚賝賧趠趜趡趛踠踣踥踤踮踕踛踖踑踙踦踧"],["e840","踔踒踘踓踜踗踚輬輤輘輚輠輣輖輗遳遰遯遧遫鄯鄫鄩鄪鄲鄦鄮醅醆醊醁醂醄醀鋐鋃鋄鋀鋙銶鋏鋱鋟鋘鋩鋗鋝鋌鋯鋂鋨鋊鋈鋎鋦鋍鋕鋉鋠鋞鋧鋑鋓"],["e8a1","銵鋡鋆銴镼閬閫閮閰隤隢雓霅霈霂靚鞊鞎鞈韐韏頞頝頦頩頨頠頛頧颲餈飺餑餔餖餗餕駜駍駏駓駔駎駉駖駘駋駗駌骳髬髫髳髲髱魆魃魧魴魱魦魶魵魰魨魤魬鳼鳺鳽鳿鳷鴇鴀鳹鳻鴈鴅鴄麃黓鼏鼐儜儓儗儚儑凞匴叡噰噠噮"],["e940","噳噦噣噭噲噞噷圜圛壈墽壉墿墺壂墼壆嬗嬙嬛嬡嬔嬓嬐嬖嬨嬚嬠嬞寯嶬嶱嶩嶧嶵嶰嶮嶪嶨嶲嶭嶯嶴幧幨幦幯廩廧廦廨廥彋徼憝憨憖懅憴懆懁懌憺"],["e9a1","憿憸憌擗擖擐擏擉撽撉擃擛擳擙攳敿敼斢曈暾曀曊曋曏暽暻暺曌朣樴橦橉橧樲橨樾橝橭橶橛橑樨橚樻樿橁橪橤橐橏橔橯橩橠樼橞橖橕橍橎橆歕歔歖殧殪殫毈毇氄氃氆澭濋澣濇澼濎濈潞濄澽澞濊澨瀄澥澮澺澬澪濏澿澸"],["ea40","澢濉澫濍澯澲澰燅燂熿熸燖燀燁燋燔燊燇燏熽燘熼燆燚燛犝犞獩獦獧獬獥獫獪瑿璚璠璔璒璕璡甋疀瘯瘭瘱瘽瘳瘼瘵瘲瘰皻盦瞚瞝瞡瞜瞛瞢瞣瞕瞙"],["eaa1","瞗磝磩磥磪磞磣磛磡磢磭磟磠禤穄穈穇窶窸窵窱窷篞篣篧篝篕篥篚篨篹篔篪篢篜篫篘篟糒糔糗糐糑縒縡縗縌縟縠縓縎縜縕縚縢縋縏縖縍縔縥縤罃罻罼罺羱翯耪耩聬膱膦膮膹膵膫膰膬膴膲膷膧臲艕艖艗蕖蕅蕫蕍蕓蕡蕘"],["eb40","蕀蕆蕤蕁蕢蕄蕑蕇蕣蔾蕛蕱蕎蕮蕵蕕蕧蕠薌蕦蕝蕔蕥蕬虣虥虤螛螏螗螓螒螈螁螖螘蝹螇螣螅螐螑螝螄螔螜螚螉褞褦褰褭褮褧褱褢褩褣褯褬褟觱諠"],["eba1","諢諲諴諵諝謔諤諟諰諈諞諡諨諿諯諻貑貒貐賵賮賱賰賳赬赮趥趧踳踾踸蹀蹅踶踼踽蹁踰踿躽輶輮輵輲輹輷輴遶遹遻邆郺鄳鄵鄶醓醐醑醍醏錧錞錈錟錆錏鍺錸錼錛錣錒錁鍆錭錎錍鋋錝鋺錥錓鋹鋷錴錂錤鋿錩錹錵錪錔錌"],["ec40","錋鋾錉錀鋻錖閼闍閾閹閺閶閿閵閽隩雔霋霒霐鞙鞗鞔韰韸頵頯頲餤餟餧餩馞駮駬駥駤駰駣駪駩駧骹骿骴骻髶髺髹髷鬳鮀鮅鮇魼魾魻鮂鮓鮒鮐魺鮕"],["eca1","魽鮈鴥鴗鴠鴞鴔鴩鴝鴘鴢鴐鴙鴟麈麆麇麮麭黕黖黺鼒鼽儦儥儢儤儠儩勴嚓嚌嚍嚆嚄嚃噾嚂噿嚁壖壔壏壒嬭嬥嬲嬣嬬嬧嬦嬯嬮孻寱寲嶷幬幪徾徻懃憵憼懧懠懥懤懨懞擯擩擣擫擤擨斁斀斶旚曒檍檖檁檥檉檟檛檡檞檇檓檎"],["ed40","檕檃檨檤檑橿檦檚檅檌檒歛殭氉濌澩濴濔濣濜濭濧濦濞濲濝濢濨燡燱燨燲燤燰燢獳獮獯璗璲璫璐璪璭璱璥璯甐甑甒甏疄癃癈癉癇皤盩瞵瞫瞲瞷瞶"],["eda1","瞴瞱瞨矰磳磽礂磻磼磲礅磹磾礄禫禨穜穛穖穘穔穚窾竀竁簅簏篲簀篿篻簎篴簋篳簂簉簃簁篸篽簆篰篱簐簊糨縭縼繂縳顈縸縪繉繀繇縩繌縰縻縶繄縺罅罿罾罽翴翲耬膻臄臌臊臅臇膼臩艛艚艜薃薀薏薧薕薠薋薣蕻薤薚薞"],["ee40","蕷蕼薉薡蕺蕸蕗薎薖薆薍薙薝薁薢薂薈薅蕹蕶薘薐薟虨螾螪螭蟅螰螬螹螵螼螮蟉蟃蟂蟌螷螯蟄蟊螴螶螿螸螽蟞螲褵褳褼褾襁襒褷襂覭覯覮觲觳謞"],["eea1","謘謖謑謅謋謢謏謒謕謇謍謈謆謜謓謚豏豰豲豱豯貕貔賹赯蹎蹍蹓蹐蹌蹇轃轀邅遾鄸醚醢醛醙醟醡醝醠鎡鎃鎯鍤鍖鍇鍼鍘鍜鍶鍉鍐鍑鍠鍭鎏鍌鍪鍹鍗鍕鍒鍏鍱鍷鍻鍡鍞鍣鍧鎀鍎鍙闇闀闉闃闅閷隮隰隬霠霟霘霝霙鞚鞡鞜"],["ef40","鞞鞝韕韔韱顁顄顊顉顅顃餥餫餬餪餳餲餯餭餱餰馘馣馡騂駺駴駷駹駸駶駻駽駾駼騃骾髾髽鬁髼魈鮚鮨鮞鮛鮦鮡鮥鮤鮆鮢鮠鮯鴳鵁鵧鴶鴮鴯鴱鴸鴰"],["efa1","鵅鵂鵃鴾鴷鵀鴽翵鴭麊麉麍麰黈黚黻黿鼤鼣鼢齔龠儱儭儮嚘嚜嚗嚚嚝嚙奰嬼屩屪巀幭幮懘懟懭懮懱懪懰懫懖懩擿攄擽擸攁攃擼斔旛曚曛曘櫅檹檽櫡櫆檺檶檷櫇檴檭歞毉氋瀇瀌瀍瀁瀅瀔瀎濿瀀濻瀦濼濷瀊爁燿燹爃燽獶"],["f040","璸瓀璵瓁璾璶璻瓂甔甓癜癤癙癐癓癗癚皦皽盬矂瞺磿礌礓礔礉礐礒礑禭禬穟簜簩簙簠簟簭簝簦簨簢簥簰繜繐繖繣繘繢繟繑繠繗繓羵羳翷翸聵臑臒"],["f0a1","臐艟艞薴藆藀藃藂薳薵薽藇藄薿藋藎藈藅薱薶藒蘤薸薷薾虩蟧蟦蟢蟛蟫蟪蟥蟟蟳蟤蟔蟜蟓蟭蟘蟣螤蟗蟙蠁蟴蟨蟝襓襋襏襌襆襐襑襉謪謧謣謳謰謵譇謯謼謾謱謥謷謦謶謮謤謻謽謺豂豵貙貘貗賾贄贂贀蹜蹢蹠蹗蹖蹞蹥蹧"],["f140","蹛蹚蹡蹝蹩蹔轆轇轈轋鄨鄺鄻鄾醨醥醧醯醪鎵鎌鎒鎷鎛鎝鎉鎧鎎鎪鎞鎦鎕鎈鎙鎟鎍鎱鎑鎲鎤鎨鎴鎣鎥闒闓闑隳雗雚巂雟雘雝霣霢霥鞬鞮鞨鞫鞤鞪"],["f1a1","鞢鞥韗韙韖韘韺顐顑顒颸饁餼餺騏騋騉騍騄騑騊騅騇騆髀髜鬈鬄鬅鬩鬵魊魌魋鯇鯆鯃鮿鯁鮵鮸鯓鮶鯄鮹鮽鵜鵓鵏鵊鵛鵋鵙鵖鵌鵗鵒鵔鵟鵘鵚麎麌黟鼁鼀鼖鼥鼫鼪鼩鼨齌齕儴儵劖勷厴嚫嚭嚦嚧嚪嚬壚壝壛夒嬽嬾嬿巃幰"],["f240","徿懻攇攐攍攉攌攎斄旞旝曞櫧櫠櫌櫑櫙櫋櫟櫜櫐櫫櫏櫍櫞歠殰氌瀙瀧瀠瀖瀫瀡瀢瀣瀩瀗瀤瀜瀪爌爊爇爂爅犥犦犤犣犡瓋瓅璷瓃甖癠矉矊矄矱礝礛"],["f2a1","礡礜礗礞禰穧穨簳簼簹簬簻糬糪繶繵繸繰繷繯繺繲繴繨罋罊羃羆羷翽翾聸臗臕艤艡艣藫藱藭藙藡藨藚藗藬藲藸藘藟藣藜藑藰藦藯藞藢蠀蟺蠃蟶蟷蠉蠌蠋蠆蟼蠈蟿蠊蠂襢襚襛襗襡襜襘襝襙覈覷覶觶譐譈譊譀譓譖譔譋譕"],["f340","譑譂譒譗豃豷豶貚贆贇贉趬趪趭趫蹭蹸蹳蹪蹯蹻軂轒轑轏轐轓辴酀鄿醰醭鏞鏇鏏鏂鏚鏐鏹鏬鏌鏙鎩鏦鏊鏔鏮鏣鏕鏄鏎鏀鏒鏧镽闚闛雡霩霫霬霨霦"],["f3a1","鞳鞷鞶韝韞韟顜顙顝顗颿颽颻颾饈饇饃馦馧騚騕騥騝騤騛騢騠騧騣騞騜騔髂鬋鬊鬎鬌鬷鯪鯫鯠鯞鯤鯦鯢鯰鯔鯗鯬鯜鯙鯥鯕鯡鯚鵷鶁鶊鶄鶈鵱鶀鵸鶆鶋鶌鵽鵫鵴鵵鵰鵩鶅鵳鵻鶂鵯鵹鵿鶇鵨麔麑黀黼鼭齀齁齍齖齗齘匷嚲"],["f440","嚵嚳壣孅巆巇廮廯忀忁懹攗攖攕攓旟曨曣曤櫳櫰櫪櫨櫹櫱櫮櫯瀼瀵瀯瀷瀴瀱灂瀸瀿瀺瀹灀瀻瀳灁爓爔犨獽獼璺皫皪皾盭矌矎矏矍矲礥礣礧礨礤礩"],["f4a1","禲穮穬穭竷籉籈籊籇籅糮繻繾纁纀羺翿聹臛臙舋艨艩蘢藿蘁藾蘛蘀藶蘄蘉蘅蘌藽蠙蠐蠑蠗蠓蠖襣襦覹觷譠譪譝譨譣譥譧譭趮躆躈躄轙轖轗轕轘轚邍酃酁醷醵醲醳鐋鐓鏻鐠鐏鐔鏾鐕鐐鐨鐙鐍鏵鐀鏷鐇鐎鐖鐒鏺鐉鏸鐊鏿"],["f540","鏼鐌鏶鐑鐆闞闠闟霮霯鞹鞻韽韾顠顢顣顟飁飂饐饎饙饌饋饓騲騴騱騬騪騶騩騮騸騭髇髊髆鬐鬒鬑鰋鰈鯷鰅鰒鯸鱀鰇鰎鰆鰗鰔鰉鶟鶙鶤鶝鶒鶘鶐鶛"],["f5a1","鶠鶔鶜鶪鶗鶡鶚鶢鶨鶞鶣鶿鶩鶖鶦鶧麙麛麚黥黤黧黦鼰鼮齛齠齞齝齙龑儺儹劘劗囃嚽嚾孈孇巋巏廱懽攛欂櫼欃櫸欀灃灄灊灈灉灅灆爝爚爙獾甗癪矐礭礱礯籔籓糲纊纇纈纋纆纍罍羻耰臝蘘蘪蘦蘟蘣蘜蘙蘧蘮蘡蘠蘩蘞蘥"],["f640","蠩蠝蠛蠠蠤蠜蠫衊襭襩襮襫觺譹譸譅譺譻贐贔趯躎躌轞轛轝酆酄酅醹鐿鐻鐶鐩鐽鐼鐰鐹鐪鐷鐬鑀鐱闥闤闣霵霺鞿韡顤飉飆飀饘饖騹騽驆驄驂驁騺"],["f6a1","騿髍鬕鬗鬘鬖鬺魒鰫鰝鰜鰬鰣鰨鰩鰤鰡鶷鶶鶼鷁鷇鷊鷏鶾鷅鷃鶻鶵鷎鶹鶺鶬鷈鶱鶭鷌鶳鷍鶲鹺麜黫黮黭鼛鼘鼚鼱齎齥齤龒亹囆囅囋奱孋孌巕巑廲攡攠攦攢欋欈欉氍灕灖灗灒爞爟犩獿瓘瓕瓙瓗癭皭礵禴穰穱籗籜籙籛籚"],["f740","糴糱纑罏羇臞艫蘴蘵蘳蘬蘲蘶蠬蠨蠦蠪蠥襱覿覾觻譾讄讂讆讅譿贕躕躔躚躒躐躖躗轠轢酇鑌鑐鑊鑋鑏鑇鑅鑈鑉鑆霿韣顪顩飋饔饛驎驓驔驌驏驈驊"],["f7a1","驉驒驐髐鬙鬫鬻魖魕鱆鱈鰿鱄鰹鰳鱁鰼鰷鰴鰲鰽鰶鷛鷒鷞鷚鷋鷐鷜鷑鷟鷩鷙鷘鷖鷵鷕鷝麶黰鼵鼳鼲齂齫龕龢儽劙壨壧奲孍巘蠯彏戁戃戄攩攥斖曫欑欒欏毊灛灚爢玂玁玃癰矔籧籦纕艬蘺虀蘹蘼蘱蘻蘾蠰蠲蠮蠳襶襴襳觾"],["f840","讌讎讋讈豅贙躘轤轣醼鑢鑕鑝鑗鑞韄韅頀驖驙鬞鬟鬠鱒鱘鱐鱊鱍鱋鱕鱙鱌鱎鷻鷷鷯鷣鷫鷸鷤鷶鷡鷮鷦鷲鷰鷢鷬鷴鷳鷨鷭黂黐黲黳鼆鼜鼸鼷鼶齃齏"],["f8a1","齱齰齮齯囓囍孎屭攭曭曮欓灟灡灝灠爣瓛瓥矕礸禷禶籪纗羉艭虃蠸蠷蠵衋讔讕躞躟躠躝醾醽釂鑫鑨鑩雥靆靃靇韇韥驞髕魙鱣鱧鱦鱢鱞鱠鸂鷾鸇鸃鸆鸅鸀鸁鸉鷿鷽鸄麠鼞齆齴齵齶囔攮斸欘欙欗欚灢爦犪矘矙礹籩籫糶纚"],["f940","纘纛纙臠臡虆虇虈襹襺襼襻觿讘讙躥躤躣鑮鑭鑯鑱鑳靉顲饟鱨鱮鱭鸋鸍鸐鸏鸒鸑麡黵鼉齇齸齻齺齹圞灦籯蠼趲躦釃鑴鑸鑶鑵驠鱴鱳鱱鱵鸔鸓黶鼊"],["f9a1","龤灨灥糷虪蠾蠽蠿讞貜躩軉靋顳顴飌饡馫驤驦驧鬤鸕鸗齈戇欞爧虌躨钂钀钁驩驨鬮鸙爩虋讟钃鱹麷癵驫鱺鸝灩灪麤齾齉龘碁銹裏墻恒粧嫺╔╦╗╠╬╣╚╩╝╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜║═╭╮╰╯▓"]]'), rE = [
  [
    "8740",
    "䏰䰲䘃䖦䕸𧉧䵷䖳𧲱䳢𧳅㮕䜶䝄䱇䱀𤊿𣘗𧍒𦺋𧃒䱗𪍑䝏䗚䲅𧱬䴇䪤䚡𦬣爥𥩔𡩣𣸆𣽡晍囻"
  ],
  [
    "8767",
    "綕夝𨮹㷴霴𧯯寛𡵞媤㘥𩺰嫑宷峼杮薓𩥅瑡璝㡵𡵓𣚞𦀡㻬"
  ],
  [
    "87a1",
    "𥣞㫵竼龗𤅡𨤍𣇪𠪊𣉞䌊蒄龖鐯䤰蘓墖靊鈘秐稲晠権袝瑌篅枂稬剏遆㓦珄𥶹瓆鿇垳䤯呌䄱𣚎堘穲𧭥讏䚮𦺈䆁𥶙箮𢒼鿈𢓁𢓉𢓌鿉蔄𣖻䂴鿊䓡𪷿拁灮鿋"
  ],
  [
    "8840",
    "㇀",
    4,
    "𠄌㇅𠃑𠃍㇆㇇𠃋𡿨㇈𠃊㇉㇊㇋㇌𠄎㇍㇎ĀÁǍÀĒÉĚÈŌÓǑÒ࿿Ê̄Ế࿿Ê̌ỀÊāáǎàɑēéěèīíǐìōóǒòūúǔùǖǘǚ"
  ],
  [
    "88a1",
    "ǜü࿿ê̄ế࿿ê̌ềêɡ⏚⏛"
  ],
  [
    "8940",
    "𪎩𡅅"
  ],
  [
    "8943",
    "攊"
  ],
  [
    "8946",
    "丽滝鵎釟"
  ],
  [
    "894c",
    "𧜵撑会伨侨兖兴农凤务动医华发变团声处备夲头学实実岚庆总斉柾栄桥济炼电纤纬纺织经统缆缷艺苏药视设询车轧轮"
  ],
  [
    "89a1",
    "琑糼緍楆竉刧"
  ],
  [
    "89ab",
    "醌碸酞肼"
  ],
  [
    "89b0",
    "贋胶𠧧"
  ],
  [
    "89b5",
    "肟黇䳍鷉鸌䰾𩷶𧀎鸊𪄳㗁"
  ],
  [
    "89c1",
    "溚舾甙"
  ],
  [
    "89c5",
    "䤑马骏龙禇𨑬𡷊𠗐𢫦两亁亀亇亿仫伷㑌侽㹈倃傈㑽㒓㒥円夅凛凼刅争剹劐匧㗇厩㕑厰㕓参吣㕭㕲㚁咓咣咴咹哐哯唘唣唨㖘唿㖥㖿嗗㗅"
  ],
  [
    "8a40",
    "𧶄唥"
  ],
  [
    "8a43",
    "𠱂𠴕𥄫喐𢳆㧬𠍁蹆𤶸𩓥䁓𨂾睺𢰸㨴䟕𨅝𦧲𤷪擝𠵼𠾴𠳕𡃴撍蹾𠺖𠰋𠽤𢲩𨉖𤓓"
  ],
  [
    "8a64",
    "𠵆𩩍𨃩䟴𤺧𢳂骲㩧𩗴㿭㔆𥋇𩟔𧣈𢵄鵮頕"
  ],
  [
    "8a76",
    "䏙𦂥撴哣𢵌𢯊𡁷㧻𡁯"
  ],
  [
    "8aa1",
    "𦛚𦜖𧦠擪𥁒𠱃蹨𢆡𨭌𠜱"
  ],
  [
    "8aac",
    "䠋𠆩㿺塳𢶍"
  ],
  [
    "8ab2",
    "𤗈𠓼𦂗𠽌𠶖啹䂻䎺"
  ],
  [
    "8abb",
    "䪴𢩦𡂝膪飵𠶜捹㧾𢝵跀嚡摼㹃"
  ],
  [
    "8ac9",
    "𪘁𠸉𢫏𢳉"
  ],
  [
    "8ace",
    "𡃈𣧂㦒㨆𨊛㕸𥹉𢃇噒𠼱𢲲𩜠㒼氽𤸻"
  ],
  [
    "8adf",
    "𧕴𢺋𢈈𪙛𨳍𠹺𠰴𦠜羓𡃏𢠃𢤹㗻𥇣𠺌𠾍𠺪㾓𠼰𠵇𡅏𠹌"
  ],
  [
    "8af6",
    "𠺫𠮩𠵈𡃀𡄽㿹𢚖搲𠾭"
  ],
  [
    "8b40",
    "𣏴𧘹𢯎𠵾𠵿𢱑𢱕㨘𠺘𡃇𠼮𪘲𦭐𨳒𨶙𨳊閪哌苄喹"
  ],
  [
    "8b55",
    "𩻃鰦骶𧝞𢷮煀腭胬尜𦕲脴㞗卟𨂽醶𠻺𠸏𠹷𠻻㗝𤷫㘉𠳖嚯𢞵𡃉𠸐𠹸𡁸𡅈𨈇𡑕𠹹𤹐𢶤婔𡀝𡀞𡃵𡃶垜𠸑"
  ],
  [
    "8ba1",
    "𧚔𨋍𠾵𠹻𥅾㜃𠾶𡆀𥋘𪊽𤧚𡠺𤅷𨉼墙剨㘚𥜽箲孨䠀䬬鼧䧧鰟鮍𥭴𣄽嗻㗲嚉丨夂𡯁屮靑𠂆乛亻㔾尣彑忄㣺扌攵歺氵氺灬爫丬犭𤣩罒礻糹罓𦉪㓁"
  ],
  [
    "8bde",
    "𦍋耂肀𦘒𦥑卝衤见𧢲讠贝钅镸长门𨸏韦页风飞饣𩠐鱼鸟黄歯龜丷𠂇阝户钢"
  ],
  [
    "8c40",
    "倻淾𩱳龦㷉袏𤅎灷峵䬠𥇍㕙𥴰愢𨨲辧釶熑朙玺𣊁𪄇㲋𡦀䬐磤琂冮𨜏䀉橣𪊺䈣蘏𠩯稪𩥇𨫪靕灍匤𢁾鏴盙𨧣龧矝亣俰傼丯众龨吴綋墒壐𡶶庒庙忂𢜒斋"
  ],
  [
    "8ca1",
    "𣏹椙橃𣱣泿"
  ],
  [
    "8ca7",
    "爀𤔅玌㻛𤨓嬕璹讃𥲤𥚕窓篬糃繬苸薗龩袐龪躹龫迏蕟駠鈡龬𨶹𡐿䁱䊢娚"
  ],
  [
    "8cc9",
    "顨杫䉶圽"
  ],
  [
    "8cce",
    "藖𤥻芿𧄍䲁𦵴嵻𦬕𦾾龭龮宖龯曧繛湗秊㶈䓃𣉖𢞖䎚䔶"
  ],
  [
    "8ce6",
    "峕𣬚諹屸㴒𣕑嵸龲煗䕘𤃬𡸣䱷㥸㑊𠆤𦱁諌侴𠈹妿腬顖𩣺弻"
  ],
  [
    "8d40",
    "𠮟"
  ],
  [
    "8d42",
    "𢇁𨥭䄂䚻𩁹㼇龳𪆵䃸㟖䛷𦱆䅼𨚲𧏿䕭㣔𥒚䕡䔛䶉䱻䵶䗪㿈𤬏㙡䓞䒽䇭崾嵈嵖㷼㠏嶤嶹㠠㠸幂庽弥徃㤈㤔㤿㥍惗愽峥㦉憷憹懏㦸戬抐拥挘㧸嚱"
  ],
  [
    "8da1",
    "㨃揢揻搇摚㩋擀崕嘡龟㪗斆㪽旿晓㫲暒㬢朖㭂枤栀㭘桊梄㭲㭱㭻椉楃牜楤榟榅㮼槖㯝橥橴橱檂㯬檙㯲檫檵櫔櫶殁毁毪汵沪㳋洂洆洦涁㳯涤涱渕渘温溆𨧀溻滢滚齿滨滩漤漴㵆𣽁澁澾㵪㵵熷岙㶊瀬㶑灐灔灯灿炉𠌥䏁㗱𠻘"
  ],
  [
    "8e40",
    "𣻗垾𦻓焾𥟠㙎榢𨯩孴穉𥣡𩓙穥穽𥦬窻窰竂竃燑𦒍䇊竚竝竪䇯咲𥰁笋筕笩𥌎𥳾箢筯莜𥮴𦱿篐萡箒箸𥴠㶭𥱥蒒篺簆簵𥳁籄粃𤢂粦晽𤕸糉糇糦籴糳糵糎"
  ],
  [
    "8ea1",
    "繧䔝𦹄絝𦻖璍綉綫焵綳緒𤁗𦀩緤㴓緵𡟹緥𨍭縝𦄡𦅚繮纒䌫鑬縧罀罁罇礶𦋐駡羗𦍑羣𡙡𠁨䕜𣝦䔃𨌺翺𦒉者耈耝耨耯𪂇𦳃耻耼聡𢜔䦉𦘦𣷣𦛨朥肧𨩈脇脚墰𢛶汿𦒘𤾸擧𡒊舘𡡞橓𤩥𤪕䑺舩𠬍𦩒𣵾俹𡓽蓢荢𦬊𤦧𣔰𡝳𣷸芪椛芳䇛"
  ],
  [
    "8f40",
    "蕋苐茚𠸖𡞴㛁𣅽𣕚艻苢茘𣺋𦶣𦬅𦮗𣗎㶿茝嗬莅䔋𦶥莬菁菓㑾𦻔橗蕚㒖𦹂𢻯葘𥯤葱㷓䓤檧葊𣲵祘蒨𦮖𦹷𦹃蓞萏莑䒠蒓蓤𥲑䉀𥳀䕃蔴嫲𦺙䔧蕳䔖枿蘖"
  ],
  [
    "8fa1",
    "𨘥𨘻藁𧂈蘂𡖂𧃍䕫䕪蘨㙈𡢢号𧎚虾蝱𪃸蟮𢰧螱蟚蠏噡虬桖䘏衅衆𧗠𣶹𧗤衞袜䙛袴袵揁装睷𧜏覇覊覦覩覧覼𨨥觧𧤤𧪽誜瞓釾誐𧩙竩𧬺𣾏䜓𧬸煼謌謟𥐰𥕥謿譌譍誩𤩺讐讛誯𡛟䘕衏貛𧵔𧶏貫㜥𧵓賖𧶘𧶽贒贃𡤐賛灜贑𤳉㻐起"
  ],
  [
    "9040",
    "趩𨀂𡀔𤦊㭼𨆼𧄌竧躭躶軃鋔輙輭𨍥𨐒辥錃𪊟𠩐辳䤪𨧞𨔽𣶻廸𣉢迹𪀔𨚼𨔁𢌥㦀𦻗逷𨔼𧪾遡𨕬𨘋邨𨜓郄𨛦邮都酧㫰醩釄粬𨤳𡺉鈎沟鉁鉢𥖹銹𨫆𣲛𨬌𥗛"
  ],
  [
    "90a1",
    "𠴱錬鍫𨫡𨯫炏嫃𨫢𨫥䥥鉄𨯬𨰹𨯿鍳鑛躼閅閦鐦閠濶䊹𢙺𨛘𡉼𣸮䧟氜陻隖䅬隣𦻕懚隶磵𨫠隽双䦡𦲸𠉴𦐐𩂯𩃥𤫑𡤕𣌊霱虂霶䨏䔽䖅𤫩灵孁霛靜𩇕靗孊𩇫靟鐥僐𣂷𣂼鞉鞟鞱鞾韀韒韠𥑬韮琜𩐳響韵𩐝𧥺䫑頴頳顋顦㬎𧅵㵑𠘰𤅜"
  ],
  [
    "9140",
    "𥜆飊颷飈飇䫿𦴧𡛓喰飡飦飬鍸餹𤨩䭲𩡗𩤅駵騌騻騐驘𥜥㛄𩂱𩯕髠髢𩬅髴䰎鬔鬭𨘀倴鬴𦦨㣃𣁽魐魀𩴾婅𡡣鮎𤉋鰂鯿鰌𩹨鷔𩾷𪆒𪆫𪃡𪄣𪇟鵾鶃𪄴鸎梈"
  ],
  [
    "91a1",
    "鷄𢅛𪆓𪈠𡤻𪈳鴹𪂹𪊴麐麕麞麢䴴麪麯𤍤黁㭠㧥㴝伲㞾𨰫鼂鼈䮖鐤𦶢鼗鼖鼹嚟嚊齅馸𩂋韲葿齢齩竜龎爖䮾𤥵𤦻煷𤧸𤍈𤩑玞𨯚𡣺禟𨥾𨸶鍩鏳𨩄鋬鎁鏋𨥬𤒹爗㻫睲穃烐𤑳𤏸煾𡟯炣𡢾𣖙㻇𡢅𥐯𡟸㜢𡛻𡠹㛡𡝴𡣑𥽋㜣𡛀坛𤨥𡏾𡊨"
  ],
  [
    "9240",
    "𡏆𡒶蔃𣚦蔃葕𤦔𧅥𣸱𥕜𣻻𧁒䓴𣛮𩦝𦼦柹㜳㰕㷧塬𡤢栐䁗𣜿𤃡𤂋𤄏𦰡哋嚞𦚱嚒𠿟𠮨𠸍鏆𨬓鎜仸儫㠙𤐶亼𠑥𠍿佋侊𥙑婨𠆫𠏋㦙𠌊𠐔㐵伩𠋀𨺳𠉵諚𠈌亘"
  ],
  [
    "92a1",
    "働儍侢伃𤨎𣺊佂倮偬傁俌俥偘僼兙兛兝兞湶𣖕𣸹𣺿浲𡢄𣺉冨凃𠗠䓝𠒣𠒒𠒑赺𨪜𠜎剙劤𠡳勡鍮䙺熌𤎌𠰠𤦬𡃤槑𠸝瑹㻞璙琔瑖玘䮎𤪼𤂍叐㖄爏𤃉喴𠍅响𠯆圝鉝雴鍦埝垍坿㘾壋媙𨩆𡛺𡝯𡜐娬妸銏婾嫏娒𥥆𡧳𡡡𤊕㛵洅瑃娡𥺃"
  ],
  [
    "9340",
    "媁𨯗𠐓鏠璌𡌃焅䥲鐈𨧻鎽㞠尞岞幞幈𡦖𡥼𣫮廍孏𡤃𡤄㜁𡢠㛝𡛾㛓脪𨩇𡶺𣑲𨦨弌弎𡤧𡞫婫𡜻孄蘔𧗽衠恾𢡠𢘫忛㺸𢖯𢖾𩂈𦽳懀𠀾𠁆𢘛憙憘恵𢲛𢴇𤛔𩅍"
  ],
  [
    "93a1",
    "摱𤙥𢭪㨩𢬢𣑐𩣪𢹸挷𪑛撶挱揑𤧣𢵧护𢲡搻敫楲㯴𣂎𣊭𤦉𣊫唍𣋠𡣙𩐿曎𣊉𣆳㫠䆐𥖄𨬢𥖏𡛼𥕛𥐥磮𣄃𡠪𣈴㑤𣈏𣆂𤋉暎𦴤晫䮓昰𧡰𡷫晣𣋒𣋡昞𥡲㣑𣠺𣞼㮙𣞢𣏾瓐㮖枏𤘪梶栞㯄檾㡣𣟕𤒇樳橒櫉欅𡤒攑梘橌㯗橺歗𣿀𣲚鎠鋲𨯪𨫋"
  ],
  [
    "9440",
    "銉𨀞𨧜鑧涥漋𤧬浧𣽿㶏渄𤀼娽渊塇洤硂焻𤌚𤉶烱牐犇犔𤞏𤜥兹𤪤𠗫瑺𣻸𣙟𤩊𤤗𥿡㼆㺱𤫟𨰣𣼵悧㻳瓌琼鎇琷䒟𦷪䕑疃㽣𤳙𤴆㽘畕癳𪗆㬙瑨𨫌𤦫𤦎㫻"
  ],
  [
    "94a1",
    "㷍𤩎㻿𤧅𤣳釺圲鍂𨫣𡡤僟𥈡𥇧睸𣈲眎眏睻𤚗𣞁㩞𤣰琸璛㺿𤪺𤫇䃈𤪖𦆮錇𥖁砞碍碈磒珐祙𧝁𥛣䄎禛蒖禥樭𣻺稺秴䅮𡛦䄲鈵秱𠵌𤦌𠊙𣶺𡝮㖗啫㕰㚪𠇔𠰍竢婙𢛵𥪯𥪜娍𠉛磰娪𥯆竾䇹籝籭䈑𥮳𥺼𥺦糍𤧹𡞰粎籼粮檲緜縇緓罎𦉡"
  ],
  [
    "9540",
    "𦅜𧭈綗𥺂䉪𦭵𠤖柖𠁎𣗏埄𦐒𦏸𤥢翝笧𠠬𥫩𥵃笌𥸎駦虅驣樜𣐿㧢𤧷𦖭騟𦖠蒀𧄧𦳑䓪脷䐂胆脉腂𦞴飃𦩂艢艥𦩑葓𦶧蘐𧈛媆䅿𡡀嬫𡢡嫤𡣘蚠蜨𣶏蠭𧐢娂"
  ],
  [
    "95a1",
    "衮佅袇袿裦襥襍𥚃襔𧞅𧞄𨯵𨯙𨮜𨧹㺭蒣䛵䛏㟲訽訜𩑈彍鈫𤊄旔焩烄𡡅鵭貟賩𧷜妚矃姰䍮㛔踪躧𤰉輰轊䋴汘澻𢌡䢛潹溋𡟚鯩㚵𤤯邻邗啱䤆醻鐄𨩋䁢𨫼鐧𨰝𨰻蓥訫閙閧閗閖𨴴瑅㻂𤣿𤩂𤏪㻧𣈥随𨻧𨹦𨹥㻌𤧭𤩸𣿮琒瑫㻼靁𩂰"
  ],
  [
    "9640",
    "桇䨝𩂓𥟟靝鍨𨦉𨰦𨬯𦎾銺嬑譩䤼珹𤈛鞛靱餸𠼦巁𨯅𤪲頟𩓚鋶𩗗釥䓀𨭐𤩧𨭤飜𨩅㼀鈪䤥萔餻饍𧬆㷽馛䭯馪驜𨭥𥣈檏騡嫾騯𩣱䮐𩥈馼䮽䮗鍽塲𡌂堢𤦸"
  ],
  [
    "96a1",
    "𡓨硄𢜟𣶸棅㵽鑘㤧慐𢞁𢥫愇鱏鱓鱻鰵鰐魿鯏𩸭鮟𪇵𪃾鴡䲮𤄄鸘䲰鴌𪆴𪃭𪃳𩤯鶥蒽𦸒𦿟𦮂藼䔳𦶤𦺄𦷰萠藮𦸀𣟗𦁤秢𣖜𣙀䤭𤧞㵢鏛銾鍈𠊿碹鉷鑍俤㑀遤𥕝砽硔碶硋𡝗𣇉𤥁㚚佲濚濙瀞瀞吔𤆵垻壳垊鴖埗焴㒯𤆬燫𦱀𤾗嬨𡞵𨩉"
  ],
  [
    "9740",
    "愌嫎娋䊼𤒈㜬䭻𨧼鎻鎸𡣖𠼝葲𦳀𡐓𤋺𢰦𤏁妔𣶷𦝁綨𦅛𦂤𤦹𤦋𨧺鋥珢㻩璴𨭣𡢟㻡𤪳櫘珳珻㻖𤨾𤪔𡟙𤩦𠎧𡐤𤧥瑈𤤖炥𤥶銄珦鍟𠓾錱𨫎𨨖鎆𨯧𥗕䤵𨪂煫"
  ],
  [
    "97a1",
    "𤥃𠳿嚤𠘚𠯫𠲸唂秄𡟺緾𡛂𤩐𡡒䔮鐁㜊𨫀𤦭妰𡢿𡢃𧒄媡㛢𣵛㚰鉟婹𨪁𡡢鍴㳍𠪴䪖㦊僴㵩㵌𡎜煵䋻𨈘渏𩃤䓫浗𧹏灧沯㳖𣿭𣸭渂漌㵯𠏵畑㚼㓈䚀㻚䡱姄鉮䤾轁𨰜𦯀堒埈㛖𡑒烾𤍢𤩱𢿣𡊰𢎽梹楧𡎘𣓥𧯴𣛟𨪃𣟖𣏺𤲟樚𣚭𦲷萾䓟䓎"
  ],
  [
    "9840",
    "𦴦𦵑𦲂𦿞漗𧄉茽𡜺菭𦲀𧁓𡟛妉媂𡞳婡婱𡤅𤇼㜭姯𡜼㛇熎鎐暚𤊥婮娫𤊓樫𣻹𧜶𤑛𤋊焝𤉙𨧡侰𦴨峂𤓎𧹍𤎽樌𤉖𡌄炦焳𤏩㶥泟勇𤩏繥姫崯㷳彜𤩝𡟟綤萦"
  ],
  [
    "98a1",
    "咅𣫺𣌀𠈔坾𠣕𠘙㿥𡾞𪊶瀃𩅛嵰玏糓𨩙𩐠俈翧狍猐𧫴猸猹𥛶獁獈㺩𧬘遬燵𤣲珡臶㻊県㻑沢国琙琞琟㻢㻰㻴㻺瓓㼎㽓畂畭畲疍㽼痈痜㿀癍㿗癴㿜発𤽜熈嘣覀塩䀝睃䀹条䁅㗛瞘䁪䁯属瞾矋売砘点砜䂨砹硇硑硦葈𥔵礳栃礲䄃"
  ],
  [
    "9940",
    "䄉禑禙辻稆込䅧窑䆲窼艹䇄竏竛䇏両筢筬筻簒簛䉠䉺类粜䊌粸䊔糭输烀𠳏総緔緐緽羮羴犟䎗耠耥笹耮耱联㷌垴炠肷胩䏭脌猪脎脒畠脔䐁㬹腖腙腚"
  ],
  [
    "99a1",
    "䐓堺腼膄䐥膓䐭膥埯臁臤艔䒏芦艶苊苘苿䒰荗险榊萅烵葤惣蒈䔄蒾蓡蓸蔐蔸蕒䔻蕯蕰藠䕷虲蚒蚲蛯际螋䘆䘗袮裿褤襇覑𧥧訩訸誔誴豑賔賲贜䞘塟跃䟭仮踺嗘坔蹱嗵躰䠷軎転軤軭軲辷迁迊迌逳駄䢭飠鈓䤞鈨鉘鉫銱銮銿"
  ],
  [
    "9a40",
    "鋣鋫鋳鋴鋽鍃鎄鎭䥅䥑麿鐗匁鐝鐭鐾䥪鑔鑹锭関䦧间阳䧥枠䨤靀䨵鞲韂噔䫤惨颹䬙飱塄餎餙冴餜餷饂饝饢䭰駅䮝騼鬏窃魩鮁鯝鯱鯴䱭鰠㝯𡯂鵉鰺"
  ],
  [
    "9aa1",
    "黾噐鶓鶽鷀鷼银辶鹻麬麱麽黆铜黢黱黸竈齄𠂔𠊷𠎠椚铃妬𠓗塀铁㞹𠗕𠘕𠙶𡚺块煳𠫂𠫍𠮿呪吆𠯋咞𠯻𠰻𠱓𠱥𠱼惧𠲍噺𠲵𠳝𠳭𠵯𠶲𠷈楕鰯螥𠸄𠸎𠻗𠾐𠼭𠹳尠𠾼帋𡁜𡁏𡁶朞𡁻𡂈𡂖㙇𡂿𡃓𡄯𡄻卤蒭𡋣𡍵𡌶讁𡕷𡘙𡟃𡟇乸炻𡠭𡥪"
  ],
  [
    "9b40",
    "𡨭𡩅𡰪𡱰𡲬𡻈拃𡻕𡼕熘桕𢁅槩㛈𢉼𢏗𢏺𢜪𢡱𢥏苽𢥧𢦓𢫕覥𢫨辠𢬎鞸𢬿顇骽𢱌"
  ],
  [
    "9b62",
    "𢲈𢲷𥯨𢴈𢴒𢶷𢶕𢹂𢽴𢿌𣀳𣁦𣌟𣏞徱晈暿𧩹𣕧𣗳爁𤦺矗𣘚𣜖纇𠍆墵朎"
  ],
  [
    "9ba1",
    "椘𣪧𧙗𥿢𣸑𣺹𧗾𢂚䣐䪸𤄙𨪚𤋮𤌍𤀻𤌴𤎖𤩅𠗊凒𠘑妟𡺨㮾𣳿𤐄𤓖垈𤙴㦛𤜯𨗨𩧉㝢𢇃譞𨭎駖𤠒𤣻𤨕爉𤫀𠱸奥𤺥𤾆𠝹軚𥀬劏圿煱𥊙𥐙𣽊𤪧喼𥑆𥑮𦭒釔㑳𥔿𧘲𥕞䜘𥕢𥕦𥟇𤤿𥡝偦㓻𣏌惞𥤃䝼𨥈𥪮𥮉𥰆𡶐垡煑澶𦄂𧰒遖𦆲𤾚譢𦐂𦑊"
  ],
  [
    "9c40",
    "嵛𦯷輶𦒄𡤜諪𤧶𦒈𣿯𦔒䯀𦖿𦚵𢜛鑥𥟡憕娧晉侻嚹𤔡𦛼乪𤤴陖涏𦲽㘘襷𦞙𦡮𦐑𦡞營𦣇筂𩃀𠨑𦤦鄄𦤹穅鷰𦧺騦𦨭㙟𦑩𠀡禃𦨴𦭛崬𣔙菏𦮝䛐𦲤画补𦶮墶"
  ],
  [
    "9ca1",
    "㜜𢖍𧁋𧇍㱔𧊀𧊅銁𢅺𧊋錰𧋦𤧐氹钟𧑐𠻸蠧裵𢤦𨑳𡞱溸𤨪𡠠㦤㚹尐秣䔿暶𩲭𩢤襃𧟌𧡘囖䃟𡘊㦡𣜯𨃨𡏅熭荦𧧝𩆨婧䲷𧂯𨦫𧧽𧨊𧬋𧵦𤅺筃祾𨀉澵𪋟樃𨌘厢𦸇鎿栶靝𨅯𨀣𦦵𡏭𣈯𨁈嶅𨰰𨂃圕頣𨥉嶫𤦈斾槕叒𤪥𣾁㰑朶𨂐𨃴𨄮𡾡𨅏"
  ],
  [
    "9d40",
    "𨆉𨆯𨈚𨌆𨌯𨎊㗊𨑨𨚪䣺揦𨥖砈鉕𨦸䏲𨧧䏟𨧨𨭆𨯔姸𨰉輋𨿅𩃬筑𩄐𩄼㷷𩅞𤫊运犏嚋𩓧𩗩𩖰𩖸𩜲𩣑𩥉𩥪𩧃𩨨𩬎𩵚𩶛纟𩻸𩼣䲤镇𪊓熢𪋿䶑递𪗋䶜𠲜达嗁"
  ],
  [
    "9da1",
    "辺𢒰边𤪓䔉繿潖檱仪㓤𨬬𧢝㜺躀𡟵𨀤𨭬𨮙𧨾𦚯㷫𧙕𣲷𥘵𥥖亚𥺁𦉘嚿𠹭踎孭𣺈𤲞揞拐𡟶𡡻攰嘭𥱊吚𥌑㷆𩶘䱽嘢嘞罉𥻘奵𣵀蝰东𠿪𠵉𣚺脗鵞贘瘻鱅癎瞹鍅吲腈苷嘥脲萘肽嗪祢噃吖𠺝㗎嘅嗱曱𨋢㘭甴嗰喺咗啲𠱁𠲖廐𥅈𠹶𢱢"
  ],
  [
    "9e40",
    "𠺢麫絚嗞𡁵抝靭咔賍燶酶揼掹揾啩𢭃鱲𢺳冚㓟𠶧冧呍唞唓癦踭𦢊疱肶蠄螆裇膶萜𡃁䓬猄𤜆宐茋𦢓噻𢛴𧴯𤆣𧵳𦻐𧊶酰𡇙鈈𣳼𪚩𠺬𠻹牦𡲢䝎𤿂𧿹𠿫䃺"
  ],
  [
    "9ea1",
    "鱝攟𢶠䣳𤟠𩵼𠿬𠸊恢𧖣𠿭"
  ],
  [
    "9ead",
    "𦁈𡆇熣纎鵐业丄㕷嬍沲卧㚬㧜卽㚥𤘘墚𤭮舭呋垪𥪕𠥹"
  ],
  [
    "9ec5",
    "㩒𢑥獴𩺬䴉鯭𣳾𩼰䱛𤾩𩖞𩿞葜𣶶𧊲𦞳𣜠挮紥𣻷𣸬㨪逈勌㹴㙺䗩𠒎癀嫰𠺶硺𧼮墧䂿噼鮋嵴癔𪐴麅䳡痹㟻愙𣃚𤏲"
  ],
  [
    "9ef5",
    "噝𡊩垧𤥣𩸆刴𧂮㖭汊鵼"
  ],
  [
    "9f40",
    "籖鬹埞𡝬屓擓𩓐𦌵𧅤蚭𠴨𦴢𤫢𠵱"
  ],
  [
    "9f4f",
    "凾𡼏嶎霃𡷑麁遌笟鬂峑箣扨挵髿篏鬪籾鬮籂粆鰕篼鬉鼗鰛𤤾齚啳寃俽麘俲剠㸆勑坧偖妷帒韈鶫轜呩鞴饀鞺匬愰"
  ],
  [
    "9fa1",
    "椬叚鰊鴂䰻陁榀傦畆𡝭駚剳"
  ],
  [
    "9fae",
    "酙隁酜"
  ],
  [
    "9fb2",
    "酑𨺗捿𦴣櫊嘑醎畺抅𠏼獏籰𥰡𣳽"
  ],
  [
    "9fc1",
    "𤤙盖鮝个𠳔莾衂"
  ],
  [
    "9fc9",
    "届槀僭坺刟巵从氱𠇲伹咜哚劚趂㗾弌㗳"
  ],
  [
    "9fdb",
    "歒酼龥鮗頮颴骺麨麄煺笔"
  ],
  [
    "9fe7",
    "毺蠘罸"
  ],
  [
    "9feb",
    "嘠𪙊蹷齓"
  ],
  [
    "9ff0",
    "跔蹏鸜踁抂𨍽踨蹵竓𤩷稾磘泪詧瘇"
  ],
  [
    "a040",
    "𨩚鼦泎蟖痃𪊲硓咢贌狢獱謭猂瓱賫𤪻蘯徺袠䒷"
  ],
  [
    "a055",
    "𡠻𦸅"
  ],
  [
    "a058",
    "詾𢔛"
  ],
  [
    "a05b",
    "惽癧髗鵄鍮鮏蟵"
  ],
  [
    "a063",
    "蠏賷猬霡鮰㗖犲䰇籑饊𦅙慙䰄麖慽"
  ],
  [
    "a073",
    "坟慯抦戹拎㩜懢厪𣏵捤栂㗒"
  ],
  [
    "a0a1",
    "嵗𨯂迚𨸹"
  ],
  [
    "a0a6",
    "僙𡵆礆匲阸𠼻䁥"
  ],
  [
    "a0ae",
    "矾"
  ],
  [
    "a0b0",
    "糂𥼚糚稭聦聣絍甅瓲覔舚朌聢𧒆聛瓰脃眤覉𦟌畓𦻑螩蟎臈螌詉貭譃眫瓸蓚㘵榲趦"
  ],
  [
    "a0d4",
    "覩瑨涹蟁𤀑瓧㷛煶悤憜㳑煢恷"
  ],
  [
    "a0e2",
    "罱𨬭牐惩䭾删㰘𣳇𥻗𧙖𥔱𡥄𡋾𩤃𦷜𧂭峁𦆭𨨏𣙷𠃮𦡆𤼎䕢嬟𦍌齐麦𦉫"
  ],
  [
    "a3c0",
    "␀",
    31,
    "␡"
  ],
  [
    "c6a1",
    "①",
    9,
    "⑴",
    9,
    "ⅰ",
    9,
    "丶丿亅亠冂冖冫勹匸卩厶夊宀巛⼳广廴彐彡攴无疒癶辵隶¨ˆヽヾゝゞ〃仝々〆〇ー［］✽ぁ",
    23
  ],
  [
    "c740",
    "す",
    58,
    "ァアィイ"
  ],
  [
    "c7a1",
    "ゥ",
    81,
    "А",
    5,
    "ЁЖ",
    4
  ],
  [
    "c840",
    "Л",
    26,
    "ёж",
    25,
    "⇧↸↹㇏𠃌乚𠂊刂䒑"
  ],
  [
    "c8a1",
    "龰冈龱𧘇"
  ],
  [
    "c8cd",
    "￢￤＇＂㈱№℡゛゜⺀⺄⺆⺇⺈⺊⺌⺍⺕⺜⺝⺥⺧⺪⺬⺮⺶⺼⺾⻆⻊⻌⻍⻏⻖⻗⻞⻣"
  ],
  [
    "c8f5",
    "ʃɐɛɔɵœøŋʊɪ"
  ],
  [
    "f9fe",
    "￭"
  ],
  [
    "fa40",
    "𠕇鋛𠗟𣿅蕌䊵珯况㙉𤥂𨧤鍄𡧛苮𣳈砼杄拟𤤳𨦪𠊠𦮳𡌅侫𢓭倈𦴩𧪄𣘀𤪱𢔓倩𠍾徤𠎀𠍇滛𠐟偽儁㑺儎顬㝃萖𤦤𠒇兠𣎴兪𠯿𢃼𠋥𢔰𠖎𣈳𡦃宂蝽𠖳𣲙冲冸"
  ],
  [
    "faa1",
    "鴴凉减凑㳜凓𤪦决凢卂凭菍椾𣜭彻刋刦刼劵剗劔効勅簕蕂勠蘍𦬓包𨫞啉滙𣾀𠥔𣿬匳卄𠯢泋𡜦栛珕恊㺪㣌𡛨燝䒢卭却𨚫卾卿𡖖𡘓矦厓𨪛厠厫厮玧𥝲㽙玜叁叅汉义埾叙㪫𠮏叠𣿫𢶣叶𠱷吓灹唫晗浛呭𦭓𠵴啝咏咤䞦𡜍𠻝㶴𠵍"
  ],
  [
    "fb40",
    "𨦼𢚘啇䳭启琗喆喩嘅𡣗𤀺䕒𤐵暳𡂴嘷曍𣊊暤暭噍噏磱囱鞇叾圀囯园𨭦㘣𡉏坆𤆥汮炋坂㚱𦱾埦𡐖堃𡑔𤍣堦𤯵塜墪㕡壠壜𡈼壻寿坃𪅐𤉸鏓㖡够梦㛃湙"
  ],
  [
    "fba1",
    "𡘾娤啓𡚒蔅姉𠵎𦲁𦴪𡟜姙𡟻𡞲𦶦浱𡠨𡛕姹𦹅媫婣㛦𤦩婷㜈媖瑥嫓𦾡𢕔㶅𡤑㜲𡚸広勐孶斈孼𧨎䀄䡝𠈄寕慠𡨴𥧌𠖥寳宝䴐尅𡭄尓珎尔𡲥𦬨屉䣝岅峩峯嶋𡷹𡸷崐崘嵆𡺤岺巗苼㠭𤤁𢁉𢅳芇㠶㯂帮檊幵幺𤒼𠳓厦亷廐厨𡝱帉廴𨒂"
  ],
  [
    "fc40",
    "廹廻㢠廼栾鐛弍𠇁弢㫞䢮𡌺强𦢈𢏐彘𢑱彣鞽𦹮彲鍀𨨶徧嶶㵟𥉐𡽪𧃸𢙨釖𠊞𨨩怱暅𡡷㥣㷇㘹垐𢞴祱㹀悞悤悳𤦂𤦏𧩓璤僡媠慤萤慂慈𦻒憁凴𠙖憇宪𣾷"
  ],
  [
    "fca1",
    "𢡟懓𨮝𩥝懐㤲𢦀𢣁怣慜攞掋𠄘担𡝰拕𢸍捬𤧟㨗搸揸𡎎𡟼撐澊𢸶頔𤂌𥜝擡擥鑻㩦携㩗敍漖𤨨𤨣斅敭敟𣁾斵𤥀䬷旑䃘𡠩无旣忟𣐀昘𣇷𣇸晄𣆤𣆥晋𠹵晧𥇦晳晴𡸽𣈱𨗴𣇈𥌓矅𢣷馤朂𤎜𤨡㬫槺𣟂杞杧杢𤇍𩃭柗䓩栢湐鈼栁𣏦𦶠桝"
  ],
  [
    "fd40",
    "𣑯槡樋𨫟楳棃𣗍椁椀㴲㨁𣘼㮀枬楡𨩊䋼椶榘㮡𠏉荣傐槹𣙙𢄪橅𣜃檝㯳枱櫈𩆜㰍欝𠤣惞欵歴𢟍溵𣫛𠎵𡥘㝀吡𣭚毡𣻼毜氷𢒋𤣱𦭑汚舦汹𣶼䓅𣶽𤆤𤤌𤤀"
  ],
  [
    "fda1",
    "𣳉㛥㳫𠴲鮃𣇹𢒑羏样𦴥𦶡𦷫涖浜湼漄𤥿𤂅𦹲蔳𦽴凇沜渝萮𨬡港𣸯瑓𣾂秌湏媑𣁋濸㜍澝𣸰滺𡒗𤀽䕕鏰潄潜㵎潴𩅰㴻澟𤅄濓𤂑𤅕𤀹𣿰𣾴𤄿凟𤅖𤅗𤅀𦇝灋灾炧炁烌烕烖烟䄄㷨熴熖𤉷焫煅媈煊煮岜𤍥煏鍢𤋁焬𤑚𤨧𤨢熺𨯨炽爎"
  ],
  [
    "fe40",
    "鑂爕夑鑃爤鍁𥘅爮牀𤥴梽牕牗㹕𣁄栍漽犂猪猫𤠣𨠫䣭𨠄猨献珏玪𠰺𦨮珉瑉𤇢𡛧𤨤昣㛅𤦷𤦍𤧻珷琕椃𤨦琹𠗃㻗瑜𢢭瑠𨺲瑇珤瑶莹瑬㜰瑴鏱樬璂䥓𤪌"
  ],
  [
    "fea1",
    "𤅟𤩹𨮏孆𨰃𡢞瓈𡦈甎瓩甞𨻙𡩋寗𨺬鎅畍畊畧畮𤾂㼄𤴓疎瑝疞疴瘂瘬癑癏癯癶𦏵皐臯㟸𦤑𦤎皡皥皷盌𦾟葢𥂝𥅽𡸜眞眦着撯𥈠睘𣊬瞯𨥤𨥨𡛁矴砉𡍶𤨒棊碯磇磓隥礮𥗠磗礴碱𧘌辸袄𨬫𦂃𢘜禆褀椂禀𥡗禝𧬹礼禩渪𧄦㺨秆𩄍秔"
  ]
];
var ui, Hc;
function nE() {
  return Hc || (Hc = 1, ui = {
    // == Japanese/ShiftJIS ====================================================
    // All japanese encodings are based on JIS X set of standards:
    // JIS X 0201 - Single-byte encoding of ASCII + ¥ + Kana chars at 0xA1-0xDF.
    // JIS X 0208 - Main set of 6879 characters, placed in 94x94 plane, to be encoded by 2 bytes. 
    //              Has several variations in 1978, 1983, 1990 and 1997.
    // JIS X 0212 - Supplementary plane of 6067 chars in 94x94 plane. 1990. Effectively dead.
    // JIS X 0213 - Extension and modern replacement of 0208 and 0212. Total chars: 11233.
    //              2 planes, first is superset of 0208, second - revised 0212.
    //              Introduced in 2000, revised 2004. Some characters are in Unicode Plane 2 (0x2xxxx)
    // Byte encodings are:
    //  * Shift_JIS: Compatible with 0201, uses not defined chars in top half as lead bytes for double-byte
    //               encoding of 0208. Lead byte ranges: 0x81-0x9F, 0xE0-0xEF; Trail byte ranges: 0x40-0x7E, 0x80-0x9E, 0x9F-0xFC.
    //               Windows CP932 is a superset of Shift_JIS. Some companies added more chars, notably KDDI.
    //  * EUC-JP:    Up to 3 bytes per character. Used mostly on *nixes.
    //               0x00-0x7F       - lower part of 0201
    //               0x8E, 0xA1-0xDF - upper part of 0201
    //               (0xA1-0xFE)x2   - 0208 plane (94x94).
    //               0x8F, (0xA1-0xFE)x2 - 0212 plane (94x94).
    //  * JIS X 208: 7-bit, direct encoding of 0208. Byte ranges: 0x21-0x7E (94 values). Uncommon.
    //               Used as-is in ISO2022 family.
    //  * ISO2022-JP: Stateful encoding, with escape sequences to switch between ASCII, 
    //                0201-1976 Roman, 0208-1978, 0208-1983.
    //  * ISO2022-JP-1: Adds esc seq for 0212-1990.
    //  * ISO2022-JP-2: Adds esc seq for GB2313-1980, KSX1001-1992, ISO8859-1, ISO8859-7.
    //  * ISO2022-JP-3: Adds esc seq for 0201-1976 Kana set, 0213-2000 Planes 1, 2.
    //  * ISO2022-JP-2004: Adds 0213-2004 Plane 1.
    //
    // After JIS X 0213 appeared, Shift_JIS-2004, EUC-JISX0213 and ISO2022-JP-2004 followed, with just changing the planes.
    //
    // Overall, it seems that it's a mess :( http://www8.plala.or.jp/tkubota1/unicode-symbols-map2.html
    shiftjis: {
      type: "_dbcs",
      table: function() {
        return Xd;
      },
      encodeAdd: { "¥": 92, "‾": 126 },
      encodeSkipVals: [{ from: 60736, to: 63808 }]
    },
    csshiftjis: "shiftjis",
    mskanji: "shiftjis",
    sjis: "shiftjis",
    windows31j: "shiftjis",
    ms31j: "shiftjis",
    xsjis: "shiftjis",
    windows932: "shiftjis",
    ms932: "shiftjis",
    932: "shiftjis",
    cp932: "shiftjis",
    eucjp: {
      type: "_dbcs",
      table: function() {
        return Qd;
      },
      encodeAdd: { "¥": 92, "‾": 126 }
    },
    // TODO: KDDI extension to Shift_JIS
    // TODO: IBM CCSID 942 = CP932, but F0-F9 custom chars and other char changes.
    // TODO: IBM CCSID 943 = Shift_JIS = CP932 with original Shift_JIS lower 128 chars.
    // == Chinese/GBK ==========================================================
    // http://en.wikipedia.org/wiki/GBK
    // We mostly implement W3C recommendation: https://www.w3.org/TR/encoding/#gbk-encoder
    // Oldest GB2312 (1981, ~7600 chars) is a subset of CP936
    gb2312: "cp936",
    gb231280: "cp936",
    gb23121980: "cp936",
    csgb2312: "cp936",
    csiso58gb231280: "cp936",
    euccn: "cp936",
    // Microsoft's CP936 is a subset and approximation of GBK.
    windows936: "cp936",
    ms936: "cp936",
    936: "cp936",
    cp936: {
      type: "_dbcs",
      table: function() {
        return ci;
      }
    },
    // GBK (~22000 chars) is an extension of CP936 that added user-mapped chars and some other.
    gbk: {
      type: "_dbcs",
      table: function() {
        return ci.concat(Bc);
      }
    },
    xgbk: "gbk",
    isoir58: "gbk",
    // GB18030 is an algorithmic extension of GBK.
    // Main source: https://www.w3.org/TR/encoding/#gbk-encoder
    // http://icu-project.org/docs/papers/gb18030.html
    // http://source.icu-project.org/repos/icu/data/trunk/charset/data/xml/gb-18030-2000.xml
    // http://www.khngai.com/chinese/charmap/tblgbk.php?page=0
    gb18030: {
      type: "_dbcs",
      table: function() {
        return ci.concat(Bc);
      },
      gb18030: function() {
        return eE;
      },
      encodeSkipVals: [128],
      encodeAdd: { "€": 41699 }
    },
    chinese: "gb18030",
    // == Korean ===============================================================
    // EUC-KR, KS_C_5601 and KS X 1001 are exactly the same.
    windows949: "cp949",
    ms949: "cp949",
    949: "cp949",
    cp949: {
      type: "_dbcs",
      table: function() {
        return tE;
      }
    },
    cseuckr: "cp949",
    csksc56011987: "cp949",
    euckr: "cp949",
    isoir149: "cp949",
    korean: "cp949",
    ksc56011987: "cp949",
    ksc56011989: "cp949",
    ksc5601: "cp949",
    // == Big5/Taiwan/Hong Kong ================================================
    // There are lots of tables for Big5 and cp950. Please see the following links for history:
    // http://moztw.org/docs/big5/  http://www.haible.de/bruno/charsets/conversion-tables/Big5.html
    // Variations, in roughly number of defined chars:
    //  * Windows CP 950: Microsoft variant of Big5. Canonical: http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP950.TXT
    //  * Windows CP 951: Microsoft variant of Big5-HKSCS-2001. Seems to be never public. http://me.abelcheung.org/articles/research/what-is-cp951/
    //  * Big5-2003 (Taiwan standard) almost superset of cp950.
    //  * Unicode-at-on (UAO) / Mozilla 1.8. Falling out of use on the Web. Not supported by other browsers.
    //  * Big5-HKSCS (-2001, -2004, -2008). Hong Kong standard. 
    //    many unicode code points moved from PUA to Supplementary plane (U+2XXXX) over the years.
    //    Plus, it has 4 combining sequences.
    //    Seems that Mozilla refused to support it for 10 yrs. https://bugzilla.mozilla.org/show_bug.cgi?id=162431 https://bugzilla.mozilla.org/show_bug.cgi?id=310299
    //    because big5-hkscs is the only encoding to include astral characters in non-algorithmic way.
    //    Implementations are not consistent within browsers; sometimes labeled as just big5.
    //    MS Internet Explorer switches from big5 to big5-hkscs when a patch applied.
    //    Great discussion & recap of what's going on https://bugzilla.mozilla.org/show_bug.cgi?id=912470#c31
    //    In the encoder, it might make sense to support encoding old PUA mappings to Big5 bytes seq-s.
    //    Official spec: http://www.ogcio.gov.hk/en/business/tech_promotion/ccli/terms/doc/2003cmp_2008.txt
    //                   http://www.ogcio.gov.hk/tc/business/tech_promotion/ccli/terms/doc/hkscs-2008-big5-iso.txt
    // 
    // Current understanding of how to deal with Big5(-HKSCS) is in the Encoding Standard, http://encoding.spec.whatwg.org/#big5-encoder
    // Unicode mapping (http://www.unicode.org/Public/MAPPINGS/OBSOLETE/EASTASIA/OTHER/BIG5.TXT) is said to be wrong.
    windows950: "cp950",
    ms950: "cp950",
    950: "cp950",
    cp950: {
      type: "_dbcs",
      table: function() {
        return kc;
      }
    },
    // Big5 has many variations and is an extension of cp950. We use Encoding Standard's as a consensus.
    big5: "big5hkscs",
    big5hkscs: {
      type: "_dbcs",
      table: function() {
        return kc.concat(rE);
      },
      encodeSkipVals: [
        // Although Encoding Standard says we should avoid encoding to HKSCS area (See Step 1 of
        // https://encoding.spec.whatwg.org/#index-big5-pointer), we still do it to increase compatibility with ICU.
        // But if a single unicode point can be encoded both as HKSCS and regular Big5, we prefer the latter.
        36457,
        36463,
        36478,
        36523,
        36532,
        36557,
        36560,
        36695,
        36713,
        36718,
        36811,
        36862,
        36973,
        36986,
        37060,
        37084,
        37105,
        37311,
        37551,
        37552,
        37553,
        37554,
        37585,
        37959,
        38090,
        38361,
        38652,
        39285,
        39798,
        39800,
        39803,
        39878,
        39902,
        39916,
        39926,
        40002,
        40019,
        40034,
        40040,
        40043,
        40055,
        40124,
        40125,
        40144,
        40279,
        40282,
        40388,
        40431,
        40443,
        40617,
        40687,
        40701,
        40800,
        40907,
        41079,
        41180,
        41183,
        36812,
        37576,
        38468,
        38637,
        // Step 2 of https://encoding.spec.whatwg.org/#index-big5-pointer: Use last pointer for U+2550, U+255E, U+2561, U+256A, U+5341, or U+5345
        41636,
        41637,
        41639,
        41638,
        41676,
        41678
      ]
    },
    cnbig5: "big5hkscs",
    csbig5: "big5hkscs",
    xxbig5: "big5hkscs"
  }), ui;
}
var Gc;
function iE() {
  return Gc || (Gc = 1, function(e) {
    for (var f = [
      qd(),
      $d(),
      Vd(),
      Wd(),
      jd(),
      Yd(),
      Kd(),
      zd(),
      nE()
    ], t = 0; t < f.length; t++) {
      var u = f[t];
      for (var r in u)
        Object.prototype.hasOwnProperty.call(u, r) && (e[r] = u[r]);
    }
  }(ri)), ri;
}
var li, qc;
function sE() {
  if (qc) return li;
  qc = 1;
  var e = kt().Buffer;
  return li = function(f) {
    var t = f.Transform;
    function u(s, a) {
      this.conv = s, a = a || {}, a.decodeStrings = !1, t.call(this, a);
    }
    u.prototype = Object.create(t.prototype, {
      constructor: { value: u }
    }), u.prototype._transform = function(s, a, o) {
      if (typeof s != "string")
        return o(new Error("Iconv encoding stream needs strings as its input."));
      try {
        var n = this.conv.write(s);
        n && n.length && this.push(n), o();
      } catch (c) {
        o(c);
      }
    }, u.prototype._flush = function(s) {
      try {
        var a = this.conv.end();
        a && a.length && this.push(a), s();
      } catch (o) {
        s(o);
      }
    }, u.prototype.collect = function(s) {
      var a = [];
      return this.on("error", s), this.on("data", function(o) {
        a.push(o);
      }), this.on("end", function() {
        s(null, e.concat(a));
      }), this;
    };
    function r(s, a) {
      this.conv = s, a = a || {}, a.encoding = this.encoding = "utf8", t.call(this, a);
    }
    return r.prototype = Object.create(t.prototype, {
      constructor: { value: r }
    }), r.prototype._transform = function(s, a, o) {
      if (!e.isBuffer(s) && !(s instanceof Uint8Array))
        return o(new Error("Iconv decoding stream needs buffers as its input."));
      try {
        var n = this.conv.write(s);
        n && n.length && this.push(n, this.encoding), o();
      } catch (c) {
        o(c);
      }
    }, r.prototype._flush = function(s) {
      try {
        var a = this.conv.end();
        a && a.length && this.push(a, this.encoding), s();
      } catch (o) {
        s(o);
      }
    }, r.prototype.collect = function(s) {
      var a = "";
      return this.on("error", s), this.on("data", function(o) {
        a += o;
      }), this.on("end", function() {
        s(null, a);
      }), this;
    }, {
      IconvLiteEncoderStream: u,
      IconvLiteDecoderStream: r
    };
  }, li;
}
var $c;
function Xr() {
  return $c || ($c = 1, function(e) {
    var f = kt().Buffer, t = Gd(), u = e.exports;
    u.encodings = null, u.defaultCharUnicode = "�", u.defaultCharSingleByte = "?", u.encode = function(a, o, n) {
      a = "" + (a || "");
      var c = u.getEncoder(o, n), i = c.write(a), l = c.end();
      return l && l.length > 0 ? f.concat([i, l]) : i;
    }, u.decode = function(a, o, n) {
      typeof a == "string" && (u.skipDecodeWarning || (console.error("Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding"), u.skipDecodeWarning = !0), a = f.from("" + (a || ""), "binary"));
      var c = u.getDecoder(o, n), i = c.write(a), l = c.end();
      return l ? i + l : i;
    }, u.encodingExists = function(a) {
      try {
        return u.getCodec(a), !0;
      } catch {
        return !1;
      }
    }, u.toEncoding = u.encode, u.fromEncoding = u.decode, u._codecDataCache = {}, u.getCodec = function(a) {
      u.encodings || (u.encodings = iE());
      for (var o = u._canonicalizeEncoding(a), n = {}; ; ) {
        var c = u._codecDataCache[o];
        if (c)
          return c;
        var i = u.encodings[o];
        switch (typeof i) {
          case "string":
            o = i;
            break;
          case "object":
            for (var l in i)
              n[l] = i[l];
            n.encodingName || (n.encodingName = o), o = i.type;
            break;
          case "function":
            return n.encodingName || (n.encodingName = o), c = new i(n, u), u._codecDataCache[n.encodingName] = c, c;
          default:
            throw new Error("Encoding not recognized: '" + a + "' (searched as: '" + o + "')");
        }
      }
    }, u._canonicalizeEncoding = function(s) {
      return ("" + s).toLowerCase().replace(/:\d{4}$|[^0-9a-z]/g, "");
    }, u.getEncoder = function(a, o) {
      var n = u.getCodec(a), c = new n.encoder(o, n);
      return n.bomAware && o && o.addBOM && (c = new t.PrependBOM(c, o)), c;
    }, u.getDecoder = function(a, o) {
      var n = u.getCodec(a), c = new n.decoder(o, n);
      return n.bomAware && !(o && o.stripBOM === !1) && (c = new t.StripBOM(c, o)), c;
    }, u.enableStreamingAPI = function(a) {
      if (!u.supportsStreams) {
        var o = sE()(a);
        u.IconvLiteEncoderStream = o.IconvLiteEncoderStream, u.IconvLiteDecoderStream = o.IconvLiteDecoderStream, u.encodeStream = function(c, i) {
          return new u.IconvLiteEncoderStream(u.getEncoder(c, i), i);
        }, u.decodeStream = function(c, i) {
          return new u.IconvLiteDecoderStream(u.getDecoder(c, i), i);
        }, u.supportsStreams = !0;
      }
    };
    var r;
    try {
      r = require("stream");
    } catch {
    }
    r && r.Transform ? u.enableStreamingAPI(r) : u.encodeStream = u.decodeStream = function() {
      throw new Error("iconv-lite Streaming API is not enabled. Use iconv.enableStreamingAPI(require('stream')); to enable it.");
    };
  }(ei)), ei.exports;
}
var _i, Vc;
function aE() {
  if (Vc) return _i;
  Vc = 1;
  const e = vh(), f = Xr();
  class t extends e {
    constructor(r) {
      super(), this.encoding = r;
    }
    readStringLengthEncoded() {
      const r = this.readUnsignedLength();
      return r === null ? null : (this.pos += r, f.decode(this.buf.subarray(this.pos - r, this.pos), this.encoding));
    }
    static readString(r, s, a, o) {
      return f.decode(s.subarray(a, a + o), r);
    }
    subPacketLengthEncoded(r) {
      return this.skip(r), new t(this.encoding).update(this.buf, this.pos - r, this.pos);
    }
    readStringRemaining() {
      const r = f.decode(this.buf.subarray(this.pos, this.end), this.encoding);
      return this.pos = this.end, r;
    }
  }
  return _i = t, _i;
}
var fi, Wc;
function wt() {
  if (Wc) return fi;
  Wc = 1;
  let e = [], f = [];
  class t {
    constructor(r, s, a, o) {
      this.index = r, this.name = s, this.charset = a, this.maxLength = o;
    }
    static fromCharset(r) {
      return f[r === "utf8mb3" ? "utf8" : r];
    }
    static fromIndex(r) {
      if (!(r >= e.length))
        return e[r];
    }
    static fromName(r) {
      for (let a = 0; a < e.length; a++) {
        let o = e[a];
        if (o && o.name === r)
          return o;
      }
      const s = r.replace("UTF8_", "UTF8MB4_");
      for (let a = 0; a < e.length; a++) {
        let o = e[a];
        if (o && o.name === s)
          return o;
      }
    }
  }
  e[1] = new t(1, "BIG5_CHINESE_CI", "big5", 2), e[2] = new t(2, "LATIN2_CZECH_CS", "latin2", 1), e[3] = new t(3, "DEC8_SWEDISH_CI", "dec8", 1), e[4] = new t(4, "CP850_GENERAL_CI", "cp850", 1), e[5] = new t(5, "LATIN1_GERMAN1_CI", "latin1", 1), e[6] = new t(6, "HP8_ENGLISH_CI", "hp8", 1), e[7] = new t(7, "KOI8R_GENERAL_CI", "koi8r", 1), e[8] = new t(8, "LATIN1_SWEDISH_CI", "latin1", 1), e[9] = new t(9, "LATIN2_GENERAL_CI", "latin2", 1), e[10] = new t(10, "SWE7_SWEDISH_CI", "swe7", 1), e[11] = new t(11, "ASCII_GENERAL_CI", "ascii", 1), e[12] = new t(12, "UJIS_JAPANESE_CI", "ujis", 3), e[13] = new t(13, "SJIS_JAPANESE_CI", "sjis", 2), e[14] = new t(14, "CP1251_BULGARIAN_CI", "cp1251", 1), e[15] = new t(15, "LATIN1_DANISH_CI", "latin1", 1), e[16] = new t(16, "HEBREW_GENERAL_CI", "hebrew", 1), e[18] = new t(18, "TIS620_THAI_CI", "tis620", 1), e[19] = new t(19, "EUCKR_KOREAN_CI", "euckr", 2), e[20] = new t(20, "LATIN7_ESTONIAN_CS", "latin7", 1), e[21] = new t(21, "LATIN2_HUNGARIAN_CI", "latin2", 1), e[22] = new t(22, "KOI8U_GENERAL_CI", "koi8u", 1), e[23] = new t(23, "CP1251_UKRAINIAN_CI", "cp1251", 1), e[24] = new t(24, "GB2312_CHINESE_CI", "gb2312", 2), e[25] = new t(25, "GREEK_GENERAL_CI", "greek", 1), e[26] = new t(26, "CP1250_GENERAL_CI", "cp1250", 1), e[27] = new t(27, "LATIN2_CROATIAN_CI", "latin2", 1), e[28] = new t(28, "GBK_CHINESE_CI", "gbk", 2), e[29] = new t(29, "CP1257_LITHUANIAN_CI", "cp1257", 1), e[30] = new t(30, "LATIN5_TURKISH_CI", "latin5", 1), e[31] = new t(31, "LATIN1_GERMAN2_CI", "latin1", 1), e[32] = new t(32, "ARMSCII8_GENERAL_CI", "armscii8", 1), e[33] = new t(33, "UTF8MB3_GENERAL_CI", "utf8", 3), e[34] = new t(34, "CP1250_CZECH_CS", "cp1250", 1), e[35] = new t(35, "UCS2_GENERAL_CI", "ucs2", 2), e[36] = new t(36, "CP866_GENERAL_CI", "cp866", 1), e[37] = new t(37, "KEYBCS2_GENERAL_CI", "keybcs2", 1), e[38] = new t(38, "MACCE_GENERAL_CI", "macce", 1), e[39] = new t(39, "MACROMAN_GENERAL_CI", "macroman", 1), e[40] = new t(40, "CP852_GENERAL_CI", "cp852", 1), e[41] = new t(41, "LATIN7_GENERAL_CI", "latin7", 1), e[42] = new t(42, "LATIN7_GENERAL_CS", "latin7", 1), e[43] = new t(43, "MACCE_BIN", "macce", 1), e[44] = new t(44, "CP1250_CROATIAN_CI", "cp1250", 1), e[45] = new t(45, "UTF8MB4_GENERAL_CI", "utf8", 4), e[46] = new t(46, "UTF8MB4_BIN", "utf8", 4), e[47] = new t(47, "LATIN1_BIN", "latin1", 1), e[48] = new t(48, "LATIN1_GENERAL_CI", "latin1", 1), e[49] = new t(49, "LATIN1_GENERAL_CS", "latin1", 1), e[50] = new t(50, "CP1251_BIN", "cp1251", 1), e[51] = new t(51, "CP1251_GENERAL_CI", "cp1251", 1), e[52] = new t(52, "CP1251_GENERAL_CS", "cp1251", 1), e[53] = new t(53, "MACROMAN_BIN", "macroman", 1), e[54] = new t(54, "UTF16_GENERAL_CI", "utf16", 4), e[55] = new t(55, "UTF16_BIN", "utf16", 4), e[56] = new t(56, "UTF16LE_GENERAL_CI", "utf16le", 4), e[57] = new t(57, "CP1256_GENERAL_CI", "cp1256", 1), e[58] = new t(58, "CP1257_BIN", "cp1257", 1), e[59] = new t(59, "CP1257_GENERAL_CI", "cp1257", 1), e[60] = new t(60, "UTF32_GENERAL_CI", "utf32", 4), e[61] = new t(61, "UTF32_BIN", "utf32", 4), e[62] = new t(62, "UTF16LE_BIN", "utf16le", 4), e[63] = new t(63, "BINARY", "binary", 1), e[64] = new t(64, "ARMSCII8_BIN", "armscii8", 1), e[65] = new t(65, "ASCII_BIN", "ascii", 1), e[66] = new t(66, "CP1250_BIN", "cp1250", 1), e[67] = new t(67, "CP1256_BIN", "cp1256", 1), e[68] = new t(68, "CP866_BIN", "cp866", 1), e[69] = new t(69, "DEC8_BIN", "dec8", 1), e[70] = new t(70, "GREEK_BIN", "greek", 1), e[71] = new t(71, "HEBREW_BIN", "hebrew", 1), e[72] = new t(72, "HP8_BIN", "hp8", 1), e[73] = new t(73, "KEYBCS2_BIN", "keybcs2", 1), e[74] = new t(74, "KOI8R_BIN", "koi8r", 1), e[75] = new t(75, "KOI8U_BIN", "koi8u", 1), e[76] = new t(76, "UTF8_TOLOWER_CI", "utf8", 3), e[77] = new t(77, "LATIN2_BIN", "latin2", 1), e[78] = new t(78, "LATIN5_BIN", "latin5", 1), e[79] = new t(79, "LATIN7_BIN", "latin7", 1), e[80] = new t(80, "CP850_BIN", "cp850", 1), e[81] = new t(81, "CP852_BIN", "cp852", 1), e[82] = new t(82, "SWE7_BIN", "swe7", 1), e[83] = new t(83, "UTF8MB3_BIN", "utf8", 3), e[84] = new t(84, "BIG5_BIN", "big5", 2), e[85] = new t(85, "EUCKR_BIN", "euckr", 2), e[86] = new t(86, "GB2312_BIN", "gb2312", 2), e[87] = new t(87, "GBK_BIN", "gbk", 2), e[88] = new t(88, "SJIS_BIN", "sjis", 2), e[89] = new t(89, "TIS620_BIN", "tis620", 1), e[90] = new t(90, "UCS2_BIN", "ucs2", 2), e[91] = new t(91, "UJIS_BIN", "ujis", 3), e[92] = new t(92, "GEOSTD8_GENERAL_CI", "geostd8", 1), e[93] = new t(93, "GEOSTD8_BIN", "geostd8", 1), e[94] = new t(94, "LATIN1_SPANISH_CI", "latin1", 1), e[95] = new t(95, "CP932_JAPANESE_CI", "cp932", 2), e[96] = new t(96, "CP932_BIN", "cp932", 2), e[97] = new t(97, "EUCJPMS_JAPANESE_CI", "eucjpms", 3), e[98] = new t(98, "EUCJPMS_BIN", "eucjpms", 3), e[99] = new t(99, "CP1250_POLISH_CI", "cp1250", 1), e[101] = new t(101, "UTF16_UNICODE_CI", "utf16", 4), e[102] = new t(102, "UTF16_ICELANDIC_CI", "utf16", 4), e[103] = new t(103, "UTF16_LATVIAN_CI", "utf16", 4), e[104] = new t(104, "UTF16_ROMANIAN_CI", "utf16", 4), e[105] = new t(105, "UTF16_SLOVENIAN_CI", "utf16", 4), e[106] = new t(106, "UTF16_POLISH_CI", "utf16", 4), e[107] = new t(107, "UTF16_ESTONIAN_CI", "utf16", 4), e[108] = new t(108, "UTF16_SPANISH_CI", "utf16", 4), e[109] = new t(109, "UTF16_SWEDISH_CI", "utf16", 4), e[110] = new t(110, "UTF16_TURKISH_CI", "utf16", 4), e[111] = new t(111, "UTF16_CZECH_CI", "utf16", 4), e[112] = new t(112, "UTF16_DANISH_CI", "utf16", 4), e[113] = new t(113, "UTF16_LITHUANIAN_CI", "utf16", 4), e[114] = new t(114, "UTF16_SLOVAK_CI", "utf16", 4), e[115] = new t(115, "UTF16_SPANISH2_CI", "utf16", 4), e[116] = new t(116, "UTF16_ROMAN_CI", "utf16", 4), e[117] = new t(117, "UTF16_PERSIAN_CI", "utf16", 4), e[118] = new t(118, "UTF16_ESPERANTO_CI", "utf16", 4), e[119] = new t(119, "UTF16_HUNGARIAN_CI", "utf16", 4), e[120] = new t(120, "UTF16_SINHALA_CI", "utf16", 4), e[121] = new t(121, "UTF16_GERMAN2_CI", "utf16", 4), e[122] = new t(122, "UTF16_CROATIAN_MYSQL561_CI", "utf16", 4), e[123] = new t(123, "UTF16_UNICODE_520_CI", "utf16", 4), e[124] = new t(124, "UTF16_VIETNAMESE_CI", "utf16", 4), e[128] = new t(128, "UCS2_UNICODE_CI", "ucs2", 2), e[129] = new t(129, "UCS2_ICELANDIC_CI", "ucs2", 2), e[130] = new t(130, "UCS2_LATVIAN_CI", "ucs2", 2), e[131] = new t(131, "UCS2_ROMANIAN_CI", "ucs2", 2), e[132] = new t(132, "UCS2_SLOVENIAN_CI", "ucs2", 2), e[133] = new t(133, "UCS2_POLISH_CI", "ucs2", 2), e[134] = new t(134, "UCS2_ESTONIAN_CI", "ucs2", 2), e[135] = new t(135, "UCS2_SPANISH_CI", "ucs2", 2), e[136] = new t(136, "UCS2_SWEDISH_CI", "ucs2", 2), e[137] = new t(137, "UCS2_TURKISH_CI", "ucs2", 2), e[138] = new t(138, "UCS2_CZECH_CI", "ucs2", 2), e[139] = new t(139, "UCS2_DANISH_CI", "ucs2", 2), e[140] = new t(140, "UCS2_LITHUANIAN_CI", "ucs2", 2), e[141] = new t(141, "UCS2_SLOVAK_CI", "ucs2", 2), e[142] = new t(142, "UCS2_SPANISH2_CI", "ucs2", 2), e[143] = new t(143, "UCS2_ROMAN_CI", "ucs2", 2), e[144] = new t(144, "UCS2_PERSIAN_CI", "ucs2", 2), e[145] = new t(145, "UCS2_ESPERANTO_CI", "ucs2", 2), e[146] = new t(146, "UCS2_HUNGARIAN_CI", "ucs2", 2), e[147] = new t(147, "UCS2_SINHALA_CI", "ucs2", 2), e[148] = new t(148, "UCS2_GERMAN2_CI", "ucs2", 2), e[149] = new t(149, "UCS2_CROATIAN_MYSQL561_CI", "ucs2", 2), e[150] = new t(150, "UCS2_UNICODE_520_CI", "ucs2", 2), e[151] = new t(151, "UCS2_VIETNAMESE_CI", "ucs2", 2), e[159] = new t(159, "UCS2_GENERAL_MYSQL500_CI", "ucs2", 2), e[160] = new t(160, "UTF32_UNICODE_CI", "utf32", 4), e[161] = new t(161, "UTF32_ICELANDIC_CI", "utf32", 4), e[162] = new t(162, "UTF32_LATVIAN_CI", "utf32", 4), e[163] = new t(163, "UTF32_ROMANIAN_CI", "utf32", 4), e[164] = new t(164, "UTF32_SLOVENIAN_CI", "utf32", 4), e[165] = new t(165, "UTF32_POLISH_CI", "utf32", 4), e[166] = new t(166, "UTF32_ESTONIAN_CI", "utf32", 4), e[167] = new t(167, "UTF32_SPANISH_CI", "utf32", 4), e[168] = new t(168, "UTF32_SWEDISH_CI", "utf32", 4), e[169] = new t(169, "UTF32_TURKISH_CI", "utf32", 4), e[170] = new t(170, "UTF32_CZECH_CI", "utf32", 4), e[171] = new t(171, "UTF32_DANISH_CI", "utf32", 4), e[172] = new t(172, "UTF32_LITHUANIAN_CI", "utf32", 4), e[173] = new t(173, "UTF32_SLOVAK_CI", "utf32", 4), e[174] = new t(174, "UTF32_SPANISH2_CI", "utf32", 4), e[175] = new t(175, "UTF32_ROMAN_CI", "utf32", 4), e[176] = new t(176, "UTF32_PERSIAN_CI", "utf32", 4), e[177] = new t(177, "UTF32_ESPERANTO_CI", "utf32", 4), e[178] = new t(178, "UTF32_HUNGARIAN_CI", "utf32", 4), e[179] = new t(179, "UTF32_SINHALA_CI", "utf32", 4), e[180] = new t(180, "UTF32_GERMAN2_CI", "utf32", 4), e[181] = new t(181, "UTF32_CROATIAN_MYSQL561_CI", "utf32", 4), e[182] = new t(182, "UTF32_UNICODE_520_CI", "utf32", 4), e[183] = new t(183, "UTF32_VIETNAMESE_CI", "utf32", 4), e[192] = new t(192, "UTF8MB3_UNICODE_CI", "utf8", 3), e[193] = new t(193, "UTF8MB3_ICELANDIC_CI", "utf8", 3), e[194] = new t(194, "UTF8MB3_LATVIAN_CI", "utf8", 3), e[195] = new t(195, "UTF8MB3_ROMANIAN_CI", "utf8", 3), e[196] = new t(196, "UTF8MB3_SLOVENIAN_CI", "utf8", 3), e[197] = new t(197, "UTF8MB3_POLISH_CI", "utf8", 3), e[198] = new t(198, "UTF8MB3_ESTONIAN_CI", "utf8", 3), e[199] = new t(199, "UTF8MB3_SPANISH_CI", "utf8", 3), e[200] = new t(200, "UTF8MB3_SWEDISH_CI", "utf8", 3), e[201] = new t(201, "UTF8MB3_TURKISH_CI", "utf8", 3), e[202] = new t(202, "UTF8MB3_CZECH_CI", "utf8", 3), e[203] = new t(203, "UTF8MB3_DANISH_CI", "utf8", 3), e[204] = new t(204, "UTF8MB3_LITHUANIAN_CI", "utf8", 3), e[205] = new t(205, "UTF8MB3_SLOVAK_CI", "utf8", 3), e[206] = new t(206, "UTF8MB3_SPANISH2_CI", "utf8", 3), e[207] = new t(207, "UTF8MB3_ROMAN_CI", "utf8", 3), e[208] = new t(208, "UTF8MB3_PERSIAN_CI", "utf8", 3), e[209] = new t(209, "UTF8MB3_ESPERANTO_CI", "utf8", 3), e[210] = new t(210, "UTF8MB3_HUNGARIAN_CI", "utf8", 3), e[211] = new t(211, "UTF8MB3_SINHALA_CI", "utf8", 3), e[212] = new t(212, "UTF8MB3_GERMAN2_CI", "utf8", 3), e[213] = new t(213, "UTF8MB3_CROATIAN_MYSQL561_CI", "utf8", 3), e[214] = new t(214, "UTF8MB3_UNICODE_520_CI", "utf8", 3), e[215] = new t(215, "UTF8MB3_VIETNAMESE_CI", "utf8", 3), e[223] = new t(223, "UTF8MB3_GENERAL_MYSQL500_CI", "utf8", 3), e[224] = new t(224, "UTF8MB4_UNICODE_CI", "utf8", 4), e[225] = new t(225, "UTF8MB4_ICELANDIC_CI", "utf8", 4), e[226] = new t(226, "UTF8MB4_LATVIAN_CI", "utf8", 4), e[227] = new t(227, "UTF8MB4_ROMANIAN_CI", "utf8", 4), e[228] = new t(228, "UTF8MB4_SLOVENIAN_CI", "utf8", 4), e[229] = new t(229, "UTF8MB4_POLISH_CI", "utf8", 4), e[230] = new t(230, "UTF8MB4_ESTONIAN_CI", "utf8", 4), e[231] = new t(231, "UTF8MB4_SPANISH_CI", "utf8", 4), e[232] = new t(232, "UTF8MB4_SWEDISH_CI", "utf8", 4), e[233] = new t(233, "UTF8MB4_TURKISH_CI", "utf8", 4), e[234] = new t(234, "UTF8MB4_CZECH_CI", "utf8", 4), e[235] = new t(235, "UTF8MB4_DANISH_CI", "utf8", 4), e[236] = new t(236, "UTF8MB4_LITHUANIAN_CI", "utf8", 4), e[237] = new t(237, "UTF8MB4_SLOVAK_CI", "utf8", 4), e[238] = new t(238, "UTF8MB4_SPANISH2_CI", "utf8", 4), e[239] = new t(239, "UTF8MB4_ROMAN_CI", "utf8", 4), e[240] = new t(240, "UTF8MB4_PERSIAN_CI", "utf8", 4), e[241] = new t(241, "UTF8MB4_ESPERANTO_CI", "utf8", 4), e[242] = new t(242, "UTF8MB4_HUNGARIAN_CI", "utf8", 4), e[243] = new t(243, "UTF8MB4_SINHALA_CI", "utf8", 4), e[244] = new t(244, "UTF8MB4_GERMAN2_CI", "utf8", 4), e[245] = new t(245, "UTF8MB4_CROATIAN_MYSQL561_CI", "utf8", 4), e[246] = new t(246, "UTF8MB4_UNICODE_520_CI", "utf8", 4), e[247] = new t(247, "UTF8MB4_VIETNAMESE_CI", "utf8", 4), e[248] = new t(248, "GB18030_CHINESE_CI", "gb18030", 4), e[249] = new t(249, "GB18030_BIN", "gb18030", 4), e[250] = new t(250, "GB18030_UNICODE_520_CI", "gb18030", 4), e[255] = new t(255, "UTF8MB4_0900_AI_CI", "utf8", 4), e[256] = new t(256, "UTF8MB4_DE_PB_0900_AI_CI", "utf8", 4), e[257] = new t(257, "UTF8MB4_IS_0900_AI_CI", "utf8", 4), e[258] = new t(258, "UTF8MB4_LV_0900_AI_CI", "utf8", 4), e[259] = new t(259, "UTF8MB4_RO_0900_AI_CI", "utf8", 4), e[260] = new t(260, "UTF8MB4_SL_0900_AI_CI", "utf8", 4), e[261] = new t(261, "UTF8MB4_PL_0900_AI_CI", "utf8", 4), e[262] = new t(262, "UTF8MB4_ET_0900_AI_CI", "utf8", 4), e[263] = new t(263, "UTF8MB4_ES_0900_AI_CI", "utf8", 4), e[264] = new t(264, "UTF8MB4_SV_0900_AI_CI", "utf8", 4), e[265] = new t(265, "UTF8MB4_TR_0900_AI_CI", "utf8", 4), e[266] = new t(266, "UTF8MB4_CS_0900_AI_CI", "utf8", 4), e[267] = new t(267, "UTF8MB4_DA_0900_AI_CI", "utf8", 4), e[268] = new t(268, "UTF8MB4_LT_0900_AI_CI", "utf8", 4), e[269] = new t(269, "UTF8MB4_SK_0900_AI_CI", "utf8", 4), e[270] = new t(270, "UTF8MB4_ES_TRAD_0900_AI_CI", "utf8", 4), e[271] = new t(271, "UTF8MB4_LA_0900_AI_CI", "utf8", 4), e[273] = new t(273, "UTF8MB4_EO_0900_AI_CI", "utf8", 4), e[274] = new t(274, "UTF8MB4_HU_0900_AI_CI", "utf8", 4), e[275] = new t(275, "UTF8MB4_HR_0900_AI_CI", "utf8", 4), e[277] = new t(277, "UTF8MB4_VI_0900_AI_CI", "utf8", 4), e[278] = new t(278, "UTF8MB4_0900_AS_CS", "utf8", 4), e[279] = new t(279, "UTF8MB4_DE_PB_0900_AS_CS", "utf8", 4), e[280] = new t(280, "UTF8MB4_IS_0900_AS_CS", "utf8", 4), e[281] = new t(281, "UTF8MB4_LV_0900_AS_CS", "utf8", 4), e[282] = new t(282, "UTF8MB4_RO_0900_AS_CS", "utf8", 4), e[283] = new t(283, "UTF8MB4_SL_0900_AS_CS", "utf8", 4), e[284] = new t(284, "UTF8MB4_PL_0900_AS_CS", "utf8", 4), e[285] = new t(285, "UTF8MB4_ET_0900_AS_CS", "utf8", 4), e[286] = new t(286, "UTF8MB4_ES_0900_AS_CS", "utf8", 4), e[287] = new t(287, "UTF8MB4_SV_0900_AS_CS", "utf8", 4), e[288] = new t(288, "UTF8MB4_TR_0900_AS_CS", "utf8", 4), e[289] = new t(289, "UTF8MB4_CS_0900_AS_CS", "utf8", 4), e[290] = new t(290, "UTF8MB4_DA_0900_AS_CS", "utf8", 4), e[291] = new t(291, "UTF8MB4_LT_0900_AS_CS", "utf8", 4), e[292] = new t(292, "UTF8MB4_SK_0900_AS_CS", "utf8", 4), e[293] = new t(293, "UTF8MB4_ES_TRAD_0900_AS_CS", "utf8", 4), e[294] = new t(294, "UTF8MB4_LA_0900_AS_CS", "utf8", 4), e[296] = new t(296, "UTF8MB4_EO_0900_AS_CS", "utf8", 4), e[297] = new t(297, "UTF8MB4_HU_0900_AS_CS", "utf8", 4), e[298] = new t(298, "UTF8MB4_HR_0900_AS_CS", "utf8", 4), e[300] = new t(300, "UTF8MB4_VI_0900_AS_CS", "utf8", 4), e[303] = new t(303, "UTF8MB4_JA_0900_AS_CS", "utf8", 4), e[304] = new t(304, "UTF8MB4_JA_0900_AS_CS_KS", "utf8", 4), e[305] = new t(305, "UTF8MB4_0900_AS_CI", "utf8", 4), e[306] = new t(306, "UTF8MB4_RU_0900_AI_CI", "utf8", 4), e[307] = new t(307, "UTF8MB4_RU_0900_AS_CS", "utf8", 4), e[308] = new t(308, "UTF8MB4_ZH_0900_AS_CS", "utf8", 4), e[309] = new t(309, "UTF8MB4_0900_BIN", "utf8", 4), e[576] = new t(576, "UTF8MB3_CROATIAN_CI", "utf8", 3), e[577] = new t(577, "UTF8MB3_MYANMAR_CI", "utf8", 3), e[578] = new t(578, "UTF8MB3_THAI_520_W2", "utf8", 3), e[608] = new t(608, "UTF8MB4_CROATIAN_CI", "utf8", 4), e[609] = new t(609, "UTF8MB4_MYANMAR_CI", "utf8", 4), e[610] = new t(610, "UTF8MB4_THAI_520_W2", "utf8", 4), e[640] = new t(640, "UCS2_CROATIAN_CI", "ucs2", 2), e[641] = new t(641, "UCS2_MYANMAR_CI", "ucs2", 2), e[642] = new t(642, "UCS2_THAI_520_W2", "ucs2", 2), e[672] = new t(672, "UTF16_CROATIAN_CI", "utf16", 4), e[673] = new t(673, "UTF16_MYANMAR_CI", "utf16", 4), e[674] = new t(674, "UTF16_THAI_520_W2", "utf16", 4), e[736] = new t(736, "UTF32_CROATIAN_CI", "utf32", 4), e[737] = new t(737, "UTF32_MYANMAR_CI", "utf32", 4), e[738] = new t(738, "UTF32_THAI_520_W2", "utf32", 4), e[1025] = new t(1025, "BIG5_CHINESE_NOPAD_CI", "big5", 2), e[1027] = new t(1027, "DEC8_SWEDISH_NOPAD_CI", "dec8", 1), e[1028] = new t(1028, "CP850_GENERAL_NOPAD_CI", "cp850", 1), e[1030] = new t(1030, "HP8_ENGLISH_NOPAD_CI", "hp8", 1), e[1031] = new t(1031, "KOI8R_GENERAL_NOPAD_CI", "koi8r", 1), e[1032] = new t(1032, "LATIN1_SWEDISH_NOPAD_CI", "latin1", 1), e[1033] = new t(1033, "LATIN2_GENERAL_NOPAD_CI", "latin2", 1), e[1034] = new t(1034, "SWE7_SWEDISH_NOPAD_CI", "swe7", 1), e[1035] = new t(1035, "ASCII_GENERAL_NOPAD_CI", "ascii", 1), e[1036] = new t(1036, "UJIS_JAPANESE_NOPAD_CI", "ujis", 3), e[1037] = new t(1037, "SJIS_JAPANESE_NOPAD_CI", "sjis", 2), e[1040] = new t(1040, "HEBREW_GENERAL_NOPAD_CI", "hebrew", 1), e[1042] = new t(1042, "TIS620_THAI_NOPAD_CI", "tis620", 1), e[1043] = new t(1043, "EUCKR_KOREAN_NOPAD_CI", "euckr", 2), e[1046] = new t(1046, "KOI8U_GENERAL_NOPAD_CI", "koi8u", 1), e[1048] = new t(1048, "GB2312_CHINESE_NOPAD_CI", "gb2312", 2), e[1049] = new t(1049, "GREEK_GENERAL_NOPAD_CI", "greek", 1), e[1050] = new t(1050, "CP1250_GENERAL_NOPAD_CI", "cp1250", 1), e[1052] = new t(1052, "GBK_CHINESE_NOPAD_CI", "gbk", 2), e[1054] = new t(1054, "LATIN5_TURKISH_NOPAD_CI", "latin5", 1), e[1056] = new t(1056, "ARMSCII8_GENERAL_NOPAD_CI", "armscii8", 1), e[1057] = new t(1057, "UTF8MB3_GENERAL_NOPAD_CI", "utf8", 3), e[1059] = new t(1059, "UCS2_GENERAL_NOPAD_CI", "ucs2", 2), e[1060] = new t(1060, "CP866_GENERAL_NOPAD_CI", "cp866", 1), e[1061] = new t(1061, "KEYBCS2_GENERAL_NOPAD_CI", "keybcs2", 1), e[1062] = new t(1062, "MACCE_GENERAL_NOPAD_CI", "macce", 1), e[1063] = new t(1063, "MACROMAN_GENERAL_NOPAD_CI", "macroman", 1), e[1064] = new t(1064, "CP852_GENERAL_NOPAD_CI", "cp852", 1), e[1065] = new t(1065, "LATIN7_GENERAL_NOPAD_CI", "latin7", 1), e[1067] = new t(1067, "MACCE_NOPAD_BIN", "macce", 1), e[1069] = new t(1069, "UTF8MB4_GENERAL_NOPAD_CI", "utf8", 4), e[1070] = new t(1070, "UTF8MB4_NOPAD_BIN", "utf8", 4), e[1071] = new t(1071, "LATIN1_NOPAD_BIN", "latin1", 1), e[1074] = new t(1074, "CP1251_NOPAD_BIN", "cp1251", 1), e[1075] = new t(1075, "CP1251_GENERAL_NOPAD_CI", "cp1251", 1), e[1077] = new t(1077, "MACROMAN_NOPAD_BIN", "macroman", 1), e[1078] = new t(1078, "UTF16_GENERAL_NOPAD_CI", "utf16", 4), e[1079] = new t(1079, "UTF16_NOPAD_BIN", "utf16", 4), e[1080] = new t(1080, "UTF16LE_GENERAL_NOPAD_CI", "utf16le", 4), e[1081] = new t(1081, "CP1256_GENERAL_NOPAD_CI", "cp1256", 1), e[1082] = new t(1082, "CP1257_NOPAD_BIN", "cp1257", 1), e[1083] = new t(1083, "CP1257_GENERAL_NOPAD_CI", "cp1257", 1), e[1084] = new t(1084, "UTF32_GENERAL_NOPAD_CI", "utf32", 4), e[1085] = new t(1085, "UTF32_NOPAD_BIN", "utf32", 4), e[1086] = new t(1086, "UTF16LE_NOPAD_BIN", "utf16le", 4), e[1088] = new t(1088, "ARMSCII8_NOPAD_BIN", "armscii8", 1), e[1089] = new t(1089, "ASCII_NOPAD_BIN", "ascii", 1), e[1090] = new t(1090, "CP1250_NOPAD_BIN", "cp1250", 1), e[1091] = new t(1091, "CP1256_NOPAD_BIN", "cp1256", 1), e[1092] = new t(1092, "CP866_NOPAD_BIN", "cp866", 1), e[1093] = new t(1093, "DEC8_NOPAD_BIN", "dec8", 1), e[1094] = new t(1094, "GREEK_NOPAD_BIN", "greek", 1), e[1095] = new t(1095, "HEBREW_NOPAD_BIN", "hebrew", 1), e[1096] = new t(1096, "HP8_NOPAD_BIN", "hp8", 1), e[1097] = new t(1097, "KEYBCS2_NOPAD_BIN", "keybcs2", 1), e[1098] = new t(1098, "KOI8R_NOPAD_BIN", "koi8r", 1), e[1099] = new t(1099, "KOI8U_NOPAD_BIN", "koi8u", 1), e[1101] = new t(1101, "LATIN2_NOPAD_BIN", "latin2", 1), e[1102] = new t(1102, "LATIN5_NOPAD_BIN", "latin5", 1), e[1103] = new t(1103, "LATIN7_NOPAD_BIN", "latin7", 1), e[1104] = new t(1104, "CP850_NOPAD_BIN", "cp850", 1), e[1105] = new t(1105, "CP852_NOPAD_BIN", "cp852", 1), e[1106] = new t(1106, "SWE7_NOPAD_BIN", "swe7", 1), e[1107] = new t(1107, "UTF8MB3_NOPAD_BIN", "utf8", 3), e[1108] = new t(1108, "BIG5_NOPAD_BIN", "big5", 2), e[1109] = new t(1109, "EUCKR_NOPAD_BIN", "euckr", 2), e[1110] = new t(1110, "GB2312_NOPAD_BIN", "gb2312", 2), e[1111] = new t(1111, "GBK_NOPAD_BIN", "gbk", 2), e[1112] = new t(1112, "SJIS_NOPAD_BIN", "sjis", 2), e[1113] = new t(1113, "TIS620_NOPAD_BIN", "tis620", 1), e[1114] = new t(1114, "UCS2_NOPAD_BIN", "ucs2", 2), e[1115] = new t(1115, "UJIS_NOPAD_BIN", "ujis", 3), e[1116] = new t(1116, "GEOSTD8_GENERAL_NOPAD_CI", "geostd8", 1), e[1117] = new t(1117, "GEOSTD8_NOPAD_BIN", "geostd8", 1), e[1119] = new t(1119, "CP932_JAPANESE_NOPAD_CI", "cp932", 2), e[1120] = new t(1120, "CP932_NOPAD_BIN", "cp932", 2), e[1121] = new t(1121, "EUCJPMS_JAPANESE_NOPAD_CI", "eucjpms", 3), e[1122] = new t(1122, "EUCJPMS_NOPAD_BIN", "eucjpms", 3), e[1125] = new t(1125, "UTF16_UNICODE_NOPAD_CI", "utf16", 4), e[1147] = new t(1147, "UTF16_UNICODE_520_NOPAD_CI", "utf16", 4), e[1152] = new t(1152, "UCS2_UNICODE_NOPAD_CI", "ucs2", 2), e[1174] = new t(1174, "UCS2_UNICODE_520_NOPAD_CI", "ucs2", 2), e[1184] = new t(1184, "UTF32_UNICODE_NOPAD_CI", "utf32", 4), e[1206] = new t(1206, "UTF32_UNICODE_520_NOPAD_CI", "utf32", 4), e[1216] = new t(1216, "UTF8MB3_UNICODE_NOPAD_CI", "utf8", 3), e[1238] = new t(1238, "UTF8MB3_UNICODE_520_NOPAD_CI", "utf8", 3), e[1248] = new t(1248, "UTF8MB4_UNICODE_NOPAD_CI", "utf8", 4), e[1270] = new t(1270, "UTF8MB4_UNICODE_520_NOPAD_CI", "utf8", 4), e[2048] = new t(2048, "UCA1400_AI_CI", "utf8", 3), e[2049] = new t(2049, "UCA1400_AI_CS", "utf8", 3), e[2050] = new t(2050, "UCA1400_AS_CI", "utf8", 3), e[2051] = new t(2051, "UCA1400_AS_CS", "utf8", 3), e[2052] = new t(2052, "UCA1400_NOPAD_AI_CI", "utf8", 3), e[2053] = new t(2053, "UCA1400_NOPAD_AI_CS", "utf8", 3), e[2054] = new t(2054, "UCA1400_NOPAD_AS_CI", "utf8", 3), e[2055] = new t(2055, "UCA1400_NOPAD_AS_CS", "utf8", 3), e[2056] = new t(2056, "UCA1400_ICELANDIC_AI_CI", "utf8", 3), e[2057] = new t(2057, "UCA1400_ICELANDIC_AI_CS", "utf8", 3), e[2058] = new t(2058, "UCA1400_ICELANDIC_AS_CI", "utf8", 3), e[2059] = new t(2059, "UCA1400_ICELANDIC_AS_CS", "utf8", 3), e[2060] = new t(2060, "UCA1400_ICELANDIC_NOPAD_AI_CI", "utf8", 3), e[2061] = new t(2061, "UCA1400_ICELANDIC_NOPAD_AI_CS", "utf8", 3), e[2062] = new t(2062, "UCA1400_ICELANDIC_NOPAD_AS_CI", "utf8", 3), e[2063] = new t(2063, "UCA1400_ICELANDIC_NOPAD_AS_CS", "utf8", 3), e[2064] = new t(2064, "UCA1400_LATVIAN_AI_CI", "utf8", 3), e[2065] = new t(2065, "UCA1400_LATVIAN_AI_CS", "utf8", 3), e[2066] = new t(2066, "UCA1400_LATVIAN_AS_CI", "utf8", 3), e[2067] = new t(2067, "UCA1400_LATVIAN_AS_CS", "utf8", 3), e[2068] = new t(2068, "UCA1400_LATVIAN_NOPAD_AI_CI", "utf8", 3), e[2069] = new t(2069, "UCA1400_LATVIAN_NOPAD_AI_CS", "utf8", 3), e[2070] = new t(2070, "UCA1400_LATVIAN_NOPAD_AS_CI", "utf8", 3), e[2071] = new t(2071, "UCA1400_LATVIAN_NOPAD_AS_CS", "utf8", 3), e[2072] = new t(2072, "UCA1400_ROMANIAN_AI_CI", "utf8", 3), e[2073] = new t(2073, "UCA1400_ROMANIAN_AI_CS", "utf8", 3), e[2074] = new t(2074, "UCA1400_ROMANIAN_AS_CI", "utf8", 3), e[2075] = new t(2075, "UCA1400_ROMANIAN_AS_CS", "utf8", 3), e[2076] = new t(2076, "UCA1400_ROMANIAN_NOPAD_AI_CI", "utf8", 3), e[2077] = new t(2077, "UCA1400_ROMANIAN_NOPAD_AI_CS", "utf8", 3), e[2078] = new t(2078, "UCA1400_ROMANIAN_NOPAD_AS_CI", "utf8", 3), e[2079] = new t(2079, "UCA1400_ROMANIAN_NOPAD_AS_CS", "utf8", 3), e[2080] = new t(2080, "UCA1400_SLOVENIAN_AI_CI", "utf8", 3), e[2081] = new t(2081, "UCA1400_SLOVENIAN_AI_CS", "utf8", 3), e[2082] = new t(2082, "UCA1400_SLOVENIAN_AS_CI", "utf8", 3), e[2083] = new t(2083, "UCA1400_SLOVENIAN_AS_CS", "utf8", 3), e[2084] = new t(2084, "UCA1400_SLOVENIAN_NOPAD_AI_CI", "utf8", 3), e[2085] = new t(2085, "UCA1400_SLOVENIAN_NOPAD_AI_CS", "utf8", 3), e[2086] = new t(2086, "UCA1400_SLOVENIAN_NOPAD_AS_CI", "utf8", 3), e[2087] = new t(2087, "UCA1400_SLOVENIAN_NOPAD_AS_CS", "utf8", 3), e[2088] = new t(2088, "UCA1400_POLISH_AI_CI", "utf8", 3), e[2089] = new t(2089, "UCA1400_POLISH_AI_CS", "utf8", 3), e[2090] = new t(2090, "UCA1400_POLISH_AS_CI", "utf8", 3), e[2091] = new t(2091, "UCA1400_POLISH_AS_CS", "utf8", 3), e[2092] = new t(2092, "UCA1400_POLISH_NOPAD_AI_CI", "utf8", 3), e[2093] = new t(2093, "UCA1400_POLISH_NOPAD_AI_CS", "utf8", 3), e[2094] = new t(2094, "UCA1400_POLISH_NOPAD_AS_CI", "utf8", 3), e[2095] = new t(2095, "UCA1400_POLISH_NOPAD_AS_CS", "utf8", 3), e[2096] = new t(2096, "UCA1400_ESTONIAN_AI_CI", "utf8", 3), e[2097] = new t(2097, "UCA1400_ESTONIAN_AI_CS", "utf8", 3), e[2098] = new t(2098, "UCA1400_ESTONIAN_AS_CI", "utf8", 3), e[2099] = new t(2099, "UCA1400_ESTONIAN_AS_CS", "utf8", 3), e[2100] = new t(2100, "UCA1400_ESTONIAN_NOPAD_AI_CI", "utf8", 3), e[2101] = new t(2101, "UCA1400_ESTONIAN_NOPAD_AI_CS", "utf8", 3), e[2102] = new t(2102, "UCA1400_ESTONIAN_NOPAD_AS_CI", "utf8", 3), e[2103] = new t(2103, "UCA1400_ESTONIAN_NOPAD_AS_CS", "utf8", 3), e[2104] = new t(2104, "UCA1400_SPANISH_AI_CI", "utf8", 3), e[2105] = new t(2105, "UCA1400_SPANISH_AI_CS", "utf8", 3), e[2106] = new t(2106, "UCA1400_SPANISH_AS_CI", "utf8", 3), e[2107] = new t(2107, "UCA1400_SPANISH_AS_CS", "utf8", 3), e[2108] = new t(2108, "UCA1400_SPANISH_NOPAD_AI_CI", "utf8", 3), e[2109] = new t(2109, "UCA1400_SPANISH_NOPAD_AI_CS", "utf8", 3), e[2110] = new t(2110, "UCA1400_SPANISH_NOPAD_AS_CI", "utf8", 3), e[2111] = new t(2111, "UCA1400_SPANISH_NOPAD_AS_CS", "utf8", 3), e[2112] = new t(2112, "UCA1400_SWEDISH_AI_CI", "utf8", 3), e[2113] = new t(2113, "UCA1400_SWEDISH_AI_CS", "utf8", 3), e[2114] = new t(2114, "UCA1400_SWEDISH_AS_CI", "utf8", 3), e[2115] = new t(2115, "UCA1400_SWEDISH_AS_CS", "utf8", 3), e[2116] = new t(2116, "UCA1400_SWEDISH_NOPAD_AI_CI", "utf8", 3), e[2117] = new t(2117, "UCA1400_SWEDISH_NOPAD_AI_CS", "utf8", 3), e[2118] = new t(2118, "UCA1400_SWEDISH_NOPAD_AS_CI", "utf8", 3), e[2119] = new t(2119, "UCA1400_SWEDISH_NOPAD_AS_CS", "utf8", 3), e[2120] = new t(2120, "UCA1400_TURKISH_AI_CI", "utf8", 3), e[2121] = new t(2121, "UCA1400_TURKISH_AI_CS", "utf8", 3), e[2122] = new t(2122, "UCA1400_TURKISH_AS_CI", "utf8", 3), e[2123] = new t(2123, "UCA1400_TURKISH_AS_CS", "utf8", 3), e[2124] = new t(2124, "UCA1400_TURKISH_NOPAD_AI_CI", "utf8", 3), e[2125] = new t(2125, "UCA1400_TURKISH_NOPAD_AI_CS", "utf8", 3), e[2126] = new t(2126, "UCA1400_TURKISH_NOPAD_AS_CI", "utf8", 3), e[2127] = new t(2127, "UCA1400_TURKISH_NOPAD_AS_CS", "utf8", 3), e[2128] = new t(2128, "UCA1400_CZECH_AI_CI", "utf8", 3), e[2129] = new t(2129, "UCA1400_CZECH_AI_CS", "utf8", 3), e[2130] = new t(2130, "UCA1400_CZECH_AS_CI", "utf8", 3), e[2131] = new t(2131, "UCA1400_CZECH_AS_CS", "utf8", 3), e[2132] = new t(2132, "UCA1400_CZECH_NOPAD_AI_CI", "utf8", 3), e[2133] = new t(2133, "UCA1400_CZECH_NOPAD_AI_CS", "utf8", 3), e[2134] = new t(2134, "UCA1400_CZECH_NOPAD_AS_CI", "utf8", 3), e[2135] = new t(2135, "UCA1400_CZECH_NOPAD_AS_CS", "utf8", 3), e[2136] = new t(2136, "UCA1400_DANISH_AI_CI", "utf8", 3), e[2137] = new t(2137, "UCA1400_DANISH_AI_CS", "utf8", 3), e[2138] = new t(2138, "UCA1400_DANISH_AS_CI", "utf8", 3), e[2139] = new t(2139, "UCA1400_DANISH_AS_CS", "utf8", 3), e[2140] = new t(2140, "UCA1400_DANISH_NOPAD_AI_CI", "utf8", 3), e[2141] = new t(2141, "UCA1400_DANISH_NOPAD_AI_CS", "utf8", 3), e[2142] = new t(2142, "UCA1400_DANISH_NOPAD_AS_CI", "utf8", 3), e[2143] = new t(2143, "UCA1400_DANISH_NOPAD_AS_CS", "utf8", 3), e[2144] = new t(2144, "UCA1400_LITHUANIAN_AI_CI", "utf8", 3), e[2145] = new t(2145, "UCA1400_LITHUANIAN_AI_CS", "utf8", 3), e[2146] = new t(2146, "UCA1400_LITHUANIAN_AS_CI", "utf8", 3), e[2147] = new t(2147, "UCA1400_LITHUANIAN_AS_CS", "utf8", 3), e[2148] = new t(2148, "UCA1400_LITHUANIAN_NOPAD_AI_CI", "utf8", 3), e[2149] = new t(2149, "UCA1400_LITHUANIAN_NOPAD_AI_CS", "utf8", 3), e[2150] = new t(2150, "UCA1400_LITHUANIAN_NOPAD_AS_CI", "utf8", 3), e[2151] = new t(2151, "UCA1400_LITHUANIAN_NOPAD_AS_CS", "utf8", 3), e[2152] = new t(2152, "UCA1400_SLOVAK_AI_CI", "utf8", 3), e[2153] = new t(2153, "UCA1400_SLOVAK_AI_CS", "utf8", 3), e[2154] = new t(2154, "UCA1400_SLOVAK_AS_CI", "utf8", 3), e[2155] = new t(2155, "UCA1400_SLOVAK_AS_CS", "utf8", 3), e[2156] = new t(2156, "UCA1400_SLOVAK_NOPAD_AI_CI", "utf8", 3), e[2157] = new t(2157, "UCA1400_SLOVAK_NOPAD_AI_CS", "utf8", 3), e[2158] = new t(2158, "UCA1400_SLOVAK_NOPAD_AS_CI", "utf8", 3), e[2159] = new t(2159, "UCA1400_SLOVAK_NOPAD_AS_CS", "utf8", 3), e[2160] = new t(2160, "UCA1400_SPANISH2_AI_CI", "utf8", 3), e[2161] = new t(2161, "UCA1400_SPANISH2_AI_CS", "utf8", 3), e[2162] = new t(2162, "UCA1400_SPANISH2_AS_CI", "utf8", 3), e[2163] = new t(2163, "UCA1400_SPANISH2_AS_CS", "utf8", 3), e[2164] = new t(2164, "UCA1400_SPANISH2_NOPAD_AI_CI", "utf8", 3), e[2165] = new t(2165, "UCA1400_SPANISH2_NOPAD_AI_CS", "utf8", 3), e[2166] = new t(2166, "UCA1400_SPANISH2_NOPAD_AS_CI", "utf8", 3), e[2167] = new t(2167, "UCA1400_SPANISH2_NOPAD_AS_CS", "utf8", 3), e[2168] = new t(2168, "UCA1400_ROMAN_AI_CI", "utf8", 3), e[2169] = new t(2169, "UCA1400_ROMAN_AI_CS", "utf8", 3), e[2170] = new t(2170, "UCA1400_ROMAN_AS_CI", "utf8", 3), e[2171] = new t(2171, "UCA1400_ROMAN_AS_CS", "utf8", 3), e[2172] = new t(2172, "UCA1400_ROMAN_NOPAD_AI_CI", "utf8", 3), e[2173] = new t(2173, "UCA1400_ROMAN_NOPAD_AI_CS", "utf8", 3), e[2174] = new t(2174, "UCA1400_ROMAN_NOPAD_AS_CI", "utf8", 3), e[2175] = new t(2175, "UCA1400_ROMAN_NOPAD_AS_CS", "utf8", 3), e[2176] = new t(2176, "UCA1400_PERSIAN_AI_CI", "utf8", 3), e[2177] = new t(2177, "UCA1400_PERSIAN_AI_CS", "utf8", 3), e[2178] = new t(2178, "UCA1400_PERSIAN_AS_CI", "utf8", 3), e[2179] = new t(2179, "UCA1400_PERSIAN_AS_CS", "utf8", 3), e[2180] = new t(2180, "UCA1400_PERSIAN_NOPAD_AI_CI", "utf8", 3), e[2181] = new t(2181, "UCA1400_PERSIAN_NOPAD_AI_CS", "utf8", 3), e[2182] = new t(2182, "UCA1400_PERSIAN_NOPAD_AS_CI", "utf8", 3), e[2183] = new t(2183, "UCA1400_PERSIAN_NOPAD_AS_CS", "utf8", 3), e[2184] = new t(2184, "UCA1400_ESPERANTO_AI_CI", "utf8", 3), e[2185] = new t(2185, "UCA1400_ESPERANTO_AI_CS", "utf8", 3), e[2186] = new t(2186, "UCA1400_ESPERANTO_AS_CI", "utf8", 3), e[2187] = new t(2187, "UCA1400_ESPERANTO_AS_CS", "utf8", 3), e[2188] = new t(2188, "UCA1400_ESPERANTO_NOPAD_AI_CI", "utf8", 3), e[2189] = new t(2189, "UCA1400_ESPERANTO_NOPAD_AI_CS", "utf8", 3), e[2190] = new t(2190, "UCA1400_ESPERANTO_NOPAD_AS_CI", "utf8", 3), e[2191] = new t(2191, "UCA1400_ESPERANTO_NOPAD_AS_CS", "utf8", 3), e[2192] = new t(2192, "UCA1400_HUNGARIAN_AI_CI", "utf8", 3), e[2193] = new t(2193, "UCA1400_HUNGARIAN_AI_CS", "utf8", 3), e[2194] = new t(2194, "UCA1400_HUNGARIAN_AS_CI", "utf8", 3), e[2195] = new t(2195, "UCA1400_HUNGARIAN_AS_CS", "utf8", 3), e[2196] = new t(2196, "UCA1400_HUNGARIAN_NOPAD_AI_CI", "utf8", 3), e[2197] = new t(2197, "UCA1400_HUNGARIAN_NOPAD_AI_CS", "utf8", 3), e[2198] = new t(2198, "UCA1400_HUNGARIAN_NOPAD_AS_CI", "utf8", 3), e[2199] = new t(2199, "UCA1400_HUNGARIAN_NOPAD_AS_CS", "utf8", 3), e[2200] = new t(2200, "UCA1400_SINHALA_AI_CI", "utf8", 3), e[2201] = new t(2201, "UCA1400_SINHALA_AI_CS", "utf8", 3), e[2202] = new t(2202, "UCA1400_SINHALA_AS_CI", "utf8", 3), e[2203] = new t(2203, "UCA1400_SINHALA_AS_CS", "utf8", 3), e[2204] = new t(2204, "UCA1400_SINHALA_NOPAD_AI_CI", "utf8", 3), e[2205] = new t(2205, "UCA1400_SINHALA_NOPAD_AI_CS", "utf8", 3), e[2206] = new t(2206, "UCA1400_SINHALA_NOPAD_AS_CI", "utf8", 3), e[2207] = new t(2207, "UCA1400_SINHALA_NOPAD_AS_CS", "utf8", 3), e[2208] = new t(2208, "UCA1400_GERMAN2_AI_CI", "utf8", 3), e[2209] = new t(2209, "UCA1400_GERMAN2_AI_CS", "utf8", 3), e[2210] = new t(2210, "UCA1400_GERMAN2_AS_CI", "utf8", 3), e[2211] = new t(2211, "UCA1400_GERMAN2_AS_CS", "utf8", 3), e[2212] = new t(2212, "UCA1400_GERMAN2_NOPAD_AI_CI", "utf8", 3), e[2213] = new t(2213, "UCA1400_GERMAN2_NOPAD_AI_CS", "utf8", 3), e[2214] = new t(2214, "UCA1400_GERMAN2_NOPAD_AS_CI", "utf8", 3), e[2215] = new t(2215, "UCA1400_GERMAN2_NOPAD_AS_CS", "utf8", 3), e[2232] = new t(2232, "UCA1400_VIETNAMESE_AI_CI", "utf8", 3), e[2233] = new t(2233, "UCA1400_VIETNAMESE_AI_CS", "utf8", 3), e[2234] = new t(2234, "UCA1400_VIETNAMESE_AS_CI", "utf8", 3), e[2235] = new t(2235, "UCA1400_VIETNAMESE_AS_CS", "utf8", 3), e[2236] = new t(2236, "UCA1400_VIETNAMESE_NOPAD_AI_CI", "utf8", 3), e[2237] = new t(2237, "UCA1400_VIETNAMESE_NOPAD_AI_CS", "utf8", 3), e[2238] = new t(2238, "UCA1400_VIETNAMESE_NOPAD_AS_CI", "utf8", 3), e[2239] = new t(2239, "UCA1400_VIETNAMESE_NOPAD_AS_CS", "utf8", 3), e[2240] = new t(2240, "UCA1400_CROATIAN_AI_CI", "utf8", 3), e[2241] = new t(2241, "UCA1400_CROATIAN_AI_CS", "utf8", 3), e[2242] = new t(2242, "UCA1400_CROATIAN_AS_CI", "utf8", 3), e[2243] = new t(2243, "UCA1400_CROATIAN_AS_CS", "utf8", 3), e[2244] = new t(2244, "UCA1400_CROATIAN_NOPAD_AI_CI", "utf8", 3), e[2245] = new t(2245, "UCA1400_CROATIAN_NOPAD_AI_CS", "utf8", 3), e[2246] = new t(2246, "UCA1400_CROATIAN_NOPAD_AS_CI", "utf8", 3), e[2247] = new t(2247, "UCA1400_CROATIAN_NOPAD_AS_CS", "utf8", 3), e[2304] = new t(2304, "UCA1400_AI_CI", "utf8", 4), e[2305] = new t(2305, "UCA1400_AI_CS", "utf8", 4), e[2306] = new t(2306, "UCA1400_AS_CI", "utf8", 4), e[2307] = new t(2307, "UCA1400_AS_CS", "utf8", 4), e[2308] = new t(2308, "UCA1400_NOPAD_AI_CI", "utf8", 4), e[2309] = new t(2309, "UCA1400_NOPAD_AI_CS", "utf8", 4), e[2310] = new t(2310, "UCA1400_NOPAD_AS_CI", "utf8", 4), e[2311] = new t(2311, "UCA1400_NOPAD_AS_CS", "utf8", 4), e[2312] = new t(2312, "UCA1400_ICELANDIC_AI_CI", "utf8", 4), e[2313] = new t(2313, "UCA1400_ICELANDIC_AI_CS", "utf8", 4), e[2314] = new t(2314, "UCA1400_ICELANDIC_AS_CI", "utf8", 4), e[2315] = new t(2315, "UCA1400_ICELANDIC_AS_CS", "utf8", 4), e[2316] = new t(2316, "UCA1400_ICELANDIC_NOPAD_AI_CI", "utf8", 4), e[2317] = new t(2317, "UCA1400_ICELANDIC_NOPAD_AI_CS", "utf8", 4), e[2318] = new t(2318, "UCA1400_ICELANDIC_NOPAD_AS_CI", "utf8", 4), e[2319] = new t(2319, "UCA1400_ICELANDIC_NOPAD_AS_CS", "utf8", 4), e[2320] = new t(2320, "UCA1400_LATVIAN_AI_CI", "utf8", 4), e[2321] = new t(2321, "UCA1400_LATVIAN_AI_CS", "utf8", 4), e[2322] = new t(2322, "UCA1400_LATVIAN_AS_CI", "utf8", 4), e[2323] = new t(2323, "UCA1400_LATVIAN_AS_CS", "utf8", 4), e[2324] = new t(2324, "UCA1400_LATVIAN_NOPAD_AI_CI", "utf8", 4), e[2325] = new t(2325, "UCA1400_LATVIAN_NOPAD_AI_CS", "utf8", 4), e[2326] = new t(2326, "UCA1400_LATVIAN_NOPAD_AS_CI", "utf8", 4), e[2327] = new t(2327, "UCA1400_LATVIAN_NOPAD_AS_CS", "utf8", 4), e[2328] = new t(2328, "UCA1400_ROMANIAN_AI_CI", "utf8", 4), e[2329] = new t(2329, "UCA1400_ROMANIAN_AI_CS", "utf8", 4), e[2330] = new t(2330, "UCA1400_ROMANIAN_AS_CI", "utf8", 4), e[2331] = new t(2331, "UCA1400_ROMANIAN_AS_CS", "utf8", 4), e[2332] = new t(2332, "UCA1400_ROMANIAN_NOPAD_AI_CI", "utf8", 4), e[2333] = new t(2333, "UCA1400_ROMANIAN_NOPAD_AI_CS", "utf8", 4), e[2334] = new t(2334, "UCA1400_ROMANIAN_NOPAD_AS_CI", "utf8", 4), e[2335] = new t(2335, "UCA1400_ROMANIAN_NOPAD_AS_CS", "utf8", 4), e[2336] = new t(2336, "UCA1400_SLOVENIAN_AI_CI", "utf8", 4), e[2337] = new t(2337, "UCA1400_SLOVENIAN_AI_CS", "utf8", 4), e[2338] = new t(2338, "UCA1400_SLOVENIAN_AS_CI", "utf8", 4), e[2339] = new t(2339, "UCA1400_SLOVENIAN_AS_CS", "utf8", 4), e[2340] = new t(2340, "UCA1400_SLOVENIAN_NOPAD_AI_CI", "utf8", 4), e[2341] = new t(2341, "UCA1400_SLOVENIAN_NOPAD_AI_CS", "utf8", 4), e[2342] = new t(2342, "UCA1400_SLOVENIAN_NOPAD_AS_CI", "utf8", 4), e[2343] = new t(2343, "UCA1400_SLOVENIAN_NOPAD_AS_CS", "utf8", 4), e[2344] = new t(2344, "UCA1400_POLISH_AI_CI", "utf8", 4), e[2345] = new t(2345, "UCA1400_POLISH_AI_CS", "utf8", 4), e[2346] = new t(2346, "UCA1400_POLISH_AS_CI", "utf8", 4), e[2347] = new t(2347, "UCA1400_POLISH_AS_CS", "utf8", 4), e[2348] = new t(2348, "UCA1400_POLISH_NOPAD_AI_CI", "utf8", 4), e[2349] = new t(2349, "UCA1400_POLISH_NOPAD_AI_CS", "utf8", 4), e[2350] = new t(2350, "UCA1400_POLISH_NOPAD_AS_CI", "utf8", 4), e[2351] = new t(2351, "UCA1400_POLISH_NOPAD_AS_CS", "utf8", 4), e[2352] = new t(2352, "UCA1400_ESTONIAN_AI_CI", "utf8", 4), e[2353] = new t(2353, "UCA1400_ESTONIAN_AI_CS", "utf8", 4), e[2354] = new t(2354, "UCA1400_ESTONIAN_AS_CI", "utf8", 4), e[2355] = new t(2355, "UCA1400_ESTONIAN_AS_CS", "utf8", 4), e[2356] = new t(2356, "UCA1400_ESTONIAN_NOPAD_AI_CI", "utf8", 4), e[2357] = new t(2357, "UCA1400_ESTONIAN_NOPAD_AI_CS", "utf8", 4), e[2358] = new t(2358, "UCA1400_ESTONIAN_NOPAD_AS_CI", "utf8", 4), e[2359] = new t(2359, "UCA1400_ESTONIAN_NOPAD_AS_CS", "utf8", 4), e[2360] = new t(2360, "UCA1400_SPANISH_AI_CI", "utf8", 4), e[2361] = new t(2361, "UCA1400_SPANISH_AI_CS", "utf8", 4), e[2362] = new t(2362, "UCA1400_SPANISH_AS_CI", "utf8", 4), e[2363] = new t(2363, "UCA1400_SPANISH_AS_CS", "utf8", 4), e[2364] = new t(2364, "UCA1400_SPANISH_NOPAD_AI_CI", "utf8", 4), e[2365] = new t(2365, "UCA1400_SPANISH_NOPAD_AI_CS", "utf8", 4), e[2366] = new t(2366, "UCA1400_SPANISH_NOPAD_AS_CI", "utf8", 4), e[2367] = new t(2367, "UCA1400_SPANISH_NOPAD_AS_CS", "utf8", 4), e[2368] = new t(2368, "UCA1400_SWEDISH_AI_CI", "utf8", 4), e[2369] = new t(2369, "UCA1400_SWEDISH_AI_CS", "utf8", 4), e[2370] = new t(2370, "UCA1400_SWEDISH_AS_CI", "utf8", 4), e[2371] = new t(2371, "UCA1400_SWEDISH_AS_CS", "utf8", 4), e[2372] = new t(2372, "UCA1400_SWEDISH_NOPAD_AI_CI", "utf8", 4), e[2373] = new t(2373, "UCA1400_SWEDISH_NOPAD_AI_CS", "utf8", 4), e[2374] = new t(2374, "UCA1400_SWEDISH_NOPAD_AS_CI", "utf8", 4), e[2375] = new t(2375, "UCA1400_SWEDISH_NOPAD_AS_CS", "utf8", 4), e[2376] = new t(2376, "UCA1400_TURKISH_AI_CI", "utf8", 4), e[2377] = new t(2377, "UCA1400_TURKISH_AI_CS", "utf8", 4), e[2378] = new t(2378, "UCA1400_TURKISH_AS_CI", "utf8", 4), e[2379] = new t(2379, "UCA1400_TURKISH_AS_CS", "utf8", 4), e[2380] = new t(2380, "UCA1400_TURKISH_NOPAD_AI_CI", "utf8", 4), e[2381] = new t(2381, "UCA1400_TURKISH_NOPAD_AI_CS", "utf8", 4), e[2382] = new t(2382, "UCA1400_TURKISH_NOPAD_AS_CI", "utf8", 4), e[2383] = new t(2383, "UCA1400_TURKISH_NOPAD_AS_CS", "utf8", 4), e[2384] = new t(2384, "UCA1400_CZECH_AI_CI", "utf8", 4), e[2385] = new t(2385, "UCA1400_CZECH_AI_CS", "utf8", 4), e[2386] = new t(2386, "UCA1400_CZECH_AS_CI", "utf8", 4), e[2387] = new t(2387, "UCA1400_CZECH_AS_CS", "utf8", 4), e[2388] = new t(2388, "UCA1400_CZECH_NOPAD_AI_CI", "utf8", 4), e[2389] = new t(2389, "UCA1400_CZECH_NOPAD_AI_CS", "utf8", 4), e[2390] = new t(2390, "UCA1400_CZECH_NOPAD_AS_CI", "utf8", 4), e[2391] = new t(2391, "UCA1400_CZECH_NOPAD_AS_CS", "utf8", 4), e[2392] = new t(2392, "UCA1400_DANISH_AI_CI", "utf8", 4), e[2393] = new t(2393, "UCA1400_DANISH_AI_CS", "utf8", 4), e[2394] = new t(2394, "UCA1400_DANISH_AS_CI", "utf8", 4), e[2395] = new t(2395, "UCA1400_DANISH_AS_CS", "utf8", 4), e[2396] = new t(2396, "UCA1400_DANISH_NOPAD_AI_CI", "utf8", 4), e[2397] = new t(2397, "UCA1400_DANISH_NOPAD_AI_CS", "utf8", 4), e[2398] = new t(2398, "UCA1400_DANISH_NOPAD_AS_CI", "utf8", 4), e[2399] = new t(2399, "UCA1400_DANISH_NOPAD_AS_CS", "utf8", 4), e[2400] = new t(2400, "UCA1400_LITHUANIAN_AI_CI", "utf8", 4), e[2401] = new t(2401, "UCA1400_LITHUANIAN_AI_CS", "utf8", 4), e[2402] = new t(2402, "UCA1400_LITHUANIAN_AS_CI", "utf8", 4), e[2403] = new t(2403, "UCA1400_LITHUANIAN_AS_CS", "utf8", 4), e[2404] = new t(2404, "UCA1400_LITHUANIAN_NOPAD_AI_CI", "utf8", 4), e[2405] = new t(2405, "UCA1400_LITHUANIAN_NOPAD_AI_CS", "utf8", 4), e[2406] = new t(2406, "UCA1400_LITHUANIAN_NOPAD_AS_CI", "utf8", 4), e[2407] = new t(2407, "UCA1400_LITHUANIAN_NOPAD_AS_CS", "utf8", 4), e[2408] = new t(2408, "UCA1400_SLOVAK_AI_CI", "utf8", 4), e[2409] = new t(2409, "UCA1400_SLOVAK_AI_CS", "utf8", 4), e[2410] = new t(2410, "UCA1400_SLOVAK_AS_CI", "utf8", 4), e[2411] = new t(2411, "UCA1400_SLOVAK_AS_CS", "utf8", 4), e[2412] = new t(2412, "UCA1400_SLOVAK_NOPAD_AI_CI", "utf8", 4), e[2413] = new t(2413, "UCA1400_SLOVAK_NOPAD_AI_CS", "utf8", 4), e[2414] = new t(2414, "UCA1400_SLOVAK_NOPAD_AS_CI", "utf8", 4), e[2415] = new t(2415, "UCA1400_SLOVAK_NOPAD_AS_CS", "utf8", 4), e[2416] = new t(2416, "UCA1400_SPANISH2_AI_CI", "utf8", 4), e[2417] = new t(2417, "UCA1400_SPANISH2_AI_CS", "utf8", 4), e[2418] = new t(2418, "UCA1400_SPANISH2_AS_CI", "utf8", 4), e[2419] = new t(2419, "UCA1400_SPANISH2_AS_CS", "utf8", 4), e[2420] = new t(2420, "UCA1400_SPANISH2_NOPAD_AI_CI", "utf8", 4), e[2421] = new t(2421, "UCA1400_SPANISH2_NOPAD_AI_CS", "utf8", 4), e[2422] = new t(2422, "UCA1400_SPANISH2_NOPAD_AS_CI", "utf8", 4), e[2423] = new t(2423, "UCA1400_SPANISH2_NOPAD_AS_CS", "utf8", 4), e[2424] = new t(2424, "UCA1400_ROMAN_AI_CI", "utf8", 4), e[2425] = new t(2425, "UCA1400_ROMAN_AI_CS", "utf8", 4), e[2426] = new t(2426, "UCA1400_ROMAN_AS_CI", "utf8", 4), e[2427] = new t(2427, "UCA1400_ROMAN_AS_CS", "utf8", 4), e[2428] = new t(2428, "UCA1400_ROMAN_NOPAD_AI_CI", "utf8", 4), e[2429] = new t(2429, "UCA1400_ROMAN_NOPAD_AI_CS", "utf8", 4), e[2430] = new t(2430, "UCA1400_ROMAN_NOPAD_AS_CI", "utf8", 4), e[2431] = new t(2431, "UCA1400_ROMAN_NOPAD_AS_CS", "utf8", 4), e[2432] = new t(2432, "UCA1400_PERSIAN_AI_CI", "utf8", 4), e[2433] = new t(2433, "UCA1400_PERSIAN_AI_CS", "utf8", 4), e[2434] = new t(2434, "UCA1400_PERSIAN_AS_CI", "utf8", 4), e[2435] = new t(2435, "UCA1400_PERSIAN_AS_CS", "utf8", 4), e[2436] = new t(2436, "UCA1400_PERSIAN_NOPAD_AI_CI", "utf8", 4), e[2437] = new t(2437, "UCA1400_PERSIAN_NOPAD_AI_CS", "utf8", 4), e[2438] = new t(2438, "UCA1400_PERSIAN_NOPAD_AS_CI", "utf8", 4), e[2439] = new t(2439, "UCA1400_PERSIAN_NOPAD_AS_CS", "utf8", 4), e[2440] = new t(2440, "UCA1400_ESPERANTO_AI_CI", "utf8", 4), e[2441] = new t(2441, "UCA1400_ESPERANTO_AI_CS", "utf8", 4), e[2442] = new t(2442, "UCA1400_ESPERANTO_AS_CI", "utf8", 4), e[2443] = new t(2443, "UCA1400_ESPERANTO_AS_CS", "utf8", 4), e[2444] = new t(2444, "UCA1400_ESPERANTO_NOPAD_AI_CI", "utf8", 4), e[2445] = new t(2445, "UCA1400_ESPERANTO_NOPAD_AI_CS", "utf8", 4), e[2446] = new t(2446, "UCA1400_ESPERANTO_NOPAD_AS_CI", "utf8", 4), e[2447] = new t(2447, "UCA1400_ESPERANTO_NOPAD_AS_CS", "utf8", 4), e[2448] = new t(2448, "UCA1400_HUNGARIAN_AI_CI", "utf8", 4), e[2449] = new t(2449, "UCA1400_HUNGARIAN_AI_CS", "utf8", 4), e[2450] = new t(2450, "UCA1400_HUNGARIAN_AS_CI", "utf8", 4), e[2451] = new t(2451, "UCA1400_HUNGARIAN_AS_CS", "utf8", 4), e[2452] = new t(2452, "UCA1400_HUNGARIAN_NOPAD_AI_CI", "utf8", 4), e[2453] = new t(2453, "UCA1400_HUNGARIAN_NOPAD_AI_CS", "utf8", 4), e[2454] = new t(2454, "UCA1400_HUNGARIAN_NOPAD_AS_CI", "utf8", 4), e[2455] = new t(2455, "UCA1400_HUNGARIAN_NOPAD_AS_CS", "utf8", 4), e[2456] = new t(2456, "UCA1400_SINHALA_AI_CI", "utf8", 4), e[2457] = new t(2457, "UCA1400_SINHALA_AI_CS", "utf8", 4), e[2458] = new t(2458, "UCA1400_SINHALA_AS_CI", "utf8", 4), e[2459] = new t(2459, "UCA1400_SINHALA_AS_CS", "utf8", 4), e[2460] = new t(2460, "UCA1400_SINHALA_NOPAD_AI_CI", "utf8", 4), e[2461] = new t(2461, "UCA1400_SINHALA_NOPAD_AI_CS", "utf8", 4), e[2462] = new t(2462, "UCA1400_SINHALA_NOPAD_AS_CI", "utf8", 4), e[2463] = new t(2463, "UCA1400_SINHALA_NOPAD_AS_CS", "utf8", 4), e[2464] = new t(2464, "UCA1400_GERMAN2_AI_CI", "utf8", 4), e[2465] = new t(2465, "UCA1400_GERMAN2_AI_CS", "utf8", 4), e[2466] = new t(2466, "UCA1400_GERMAN2_AS_CI", "utf8", 4), e[2467] = new t(2467, "UCA1400_GERMAN2_AS_CS", "utf8", 4), e[2468] = new t(2468, "UCA1400_GERMAN2_NOPAD_AI_CI", "utf8", 4), e[2469] = new t(2469, "UCA1400_GERMAN2_NOPAD_AI_CS", "utf8", 4), e[2470] = new t(2470, "UCA1400_GERMAN2_NOPAD_AS_CI", "utf8", 4), e[2471] = new t(2471, "UCA1400_GERMAN2_NOPAD_AS_CS", "utf8", 4), e[2488] = new t(2488, "UCA1400_VIETNAMESE_AI_CI", "utf8", 4), e[2489] = new t(2489, "UCA1400_VIETNAMESE_AI_CS", "utf8", 4), e[2490] = new t(2490, "UCA1400_VIETNAMESE_AS_CI", "utf8", 4), e[2491] = new t(2491, "UCA1400_VIETNAMESE_AS_CS", "utf8", 4), e[2492] = new t(2492, "UCA1400_VIETNAMESE_NOPAD_AI_CI", "utf8", 4), e[2493] = new t(2493, "UCA1400_VIETNAMESE_NOPAD_AI_CS", "utf8", 4), e[2494] = new t(2494, "UCA1400_VIETNAMESE_NOPAD_AS_CI", "utf8", 4), e[2495] = new t(2495, "UCA1400_VIETNAMESE_NOPAD_AS_CS", "utf8", 4), e[2496] = new t(2496, "UCA1400_CROATIAN_AI_CI", "utf8", 4), e[2497] = new t(2497, "UCA1400_CROATIAN_AI_CS", "utf8", 4), e[2498] = new t(2498, "UCA1400_CROATIAN_AS_CI", "utf8", 4), e[2499] = new t(2499, "UCA1400_CROATIAN_AS_CS", "utf8", 4), e[2500] = new t(2500, "UCA1400_CROATIAN_NOPAD_AI_CI", "utf8", 4), e[2501] = new t(2501, "UCA1400_CROATIAN_NOPAD_AI_CS", "utf8", 4), e[2502] = new t(2502, "UCA1400_CROATIAN_NOPAD_AS_CI", "utf8", 4), e[2503] = new t(2503, "UCA1400_CROATIAN_NOPAD_AS_CS", "utf8", 4), e[2560] = new t(2560, "UCA1400_AI_CI", "ucs2", 2), e[2561] = new t(2561, "UCA1400_AI_CS", "ucs2", 2), e[2562] = new t(2562, "UCA1400_AS_CI", "ucs2", 2), e[2563] = new t(2563, "UCA1400_AS_CS", "ucs2", 2), e[2564] = new t(2564, "UCA1400_NOPAD_AI_CI", "ucs2", 2), e[2565] = new t(2565, "UCA1400_NOPAD_AI_CS", "ucs2", 2), e[2566] = new t(2566, "UCA1400_NOPAD_AS_CI", "ucs2", 2), e[2567] = new t(2567, "UCA1400_NOPAD_AS_CS", "ucs2", 2), e[2568] = new t(2568, "UCA1400_ICELANDIC_AI_CI", "ucs2", 2), e[2569] = new t(2569, "UCA1400_ICELANDIC_AI_CS", "ucs2", 2), e[2570] = new t(2570, "UCA1400_ICELANDIC_AS_CI", "ucs2", 2), e[2571] = new t(2571, "UCA1400_ICELANDIC_AS_CS", "ucs2", 2), e[2572] = new t(2572, "UCA1400_ICELANDIC_NOPAD_AI_CI", "ucs2", 2), e[2573] = new t(2573, "UCA1400_ICELANDIC_NOPAD_AI_CS", "ucs2", 2), e[2574] = new t(2574, "UCA1400_ICELANDIC_NOPAD_AS_CI", "ucs2", 2), e[2575] = new t(2575, "UCA1400_ICELANDIC_NOPAD_AS_CS", "ucs2", 2), e[2576] = new t(2576, "UCA1400_LATVIAN_AI_CI", "ucs2", 2), e[2577] = new t(2577, "UCA1400_LATVIAN_AI_CS", "ucs2", 2), e[2578] = new t(2578, "UCA1400_LATVIAN_AS_CI", "ucs2", 2), e[2579] = new t(2579, "UCA1400_LATVIAN_AS_CS", "ucs2", 2), e[2580] = new t(2580, "UCA1400_LATVIAN_NOPAD_AI_CI", "ucs2", 2), e[2581] = new t(2581, "UCA1400_LATVIAN_NOPAD_AI_CS", "ucs2", 2), e[2582] = new t(2582, "UCA1400_LATVIAN_NOPAD_AS_CI", "ucs2", 2), e[2583] = new t(2583, "UCA1400_LATVIAN_NOPAD_AS_CS", "ucs2", 2), e[2584] = new t(2584, "UCA1400_ROMANIAN_AI_CI", "ucs2", 2), e[2585] = new t(2585, "UCA1400_ROMANIAN_AI_CS", "ucs2", 2), e[2586] = new t(2586, "UCA1400_ROMANIAN_AS_CI", "ucs2", 2), e[2587] = new t(2587, "UCA1400_ROMANIAN_AS_CS", "ucs2", 2), e[2588] = new t(2588, "UCA1400_ROMANIAN_NOPAD_AI_CI", "ucs2", 2), e[2589] = new t(2589, "UCA1400_ROMANIAN_NOPAD_AI_CS", "ucs2", 2), e[2590] = new t(2590, "UCA1400_ROMANIAN_NOPAD_AS_CI", "ucs2", 2), e[2591] = new t(2591, "UCA1400_ROMANIAN_NOPAD_AS_CS", "ucs2", 2), e[2592] = new t(2592, "UCA1400_SLOVENIAN_AI_CI", "ucs2", 2), e[2593] = new t(2593, "UCA1400_SLOVENIAN_AI_CS", "ucs2", 2), e[2594] = new t(2594, "UCA1400_SLOVENIAN_AS_CI", "ucs2", 2), e[2595] = new t(2595, "UCA1400_SLOVENIAN_AS_CS", "ucs2", 2), e[2596] = new t(2596, "UCA1400_SLOVENIAN_NOPAD_AI_CI", "ucs2", 2), e[2597] = new t(2597, "UCA1400_SLOVENIAN_NOPAD_AI_CS", "ucs2", 2), e[2598] = new t(2598, "UCA1400_SLOVENIAN_NOPAD_AS_CI", "ucs2", 2), e[2599] = new t(2599, "UCA1400_SLOVENIAN_NOPAD_AS_CS", "ucs2", 2), e[2600] = new t(2600, "UCA1400_POLISH_AI_CI", "ucs2", 2), e[2601] = new t(2601, "UCA1400_POLISH_AI_CS", "ucs2", 2), e[2602] = new t(2602, "UCA1400_POLISH_AS_CI", "ucs2", 2), e[2603] = new t(2603, "UCA1400_POLISH_AS_CS", "ucs2", 2), e[2604] = new t(2604, "UCA1400_POLISH_NOPAD_AI_CI", "ucs2", 2), e[2605] = new t(2605, "UCA1400_POLISH_NOPAD_AI_CS", "ucs2", 2), e[2606] = new t(2606, "UCA1400_POLISH_NOPAD_AS_CI", "ucs2", 2), e[2607] = new t(2607, "UCA1400_POLISH_NOPAD_AS_CS", "ucs2", 2), e[2608] = new t(2608, "UCA1400_ESTONIAN_AI_CI", "ucs2", 2), e[2609] = new t(2609, "UCA1400_ESTONIAN_AI_CS", "ucs2", 2), e[2610] = new t(2610, "UCA1400_ESTONIAN_AS_CI", "ucs2", 2), e[2611] = new t(2611, "UCA1400_ESTONIAN_AS_CS", "ucs2", 2), e[2612] = new t(2612, "UCA1400_ESTONIAN_NOPAD_AI_CI", "ucs2", 2), e[2613] = new t(2613, "UCA1400_ESTONIAN_NOPAD_AI_CS", "ucs2", 2), e[2614] = new t(2614, "UCA1400_ESTONIAN_NOPAD_AS_CI", "ucs2", 2), e[2615] = new t(2615, "UCA1400_ESTONIAN_NOPAD_AS_CS", "ucs2", 2), e[2616] = new t(2616, "UCA1400_SPANISH_AI_CI", "ucs2", 2), e[2617] = new t(2617, "UCA1400_SPANISH_AI_CS", "ucs2", 2), e[2618] = new t(2618, "UCA1400_SPANISH_AS_CI", "ucs2", 2), e[2619] = new t(2619, "UCA1400_SPANISH_AS_CS", "ucs2", 2), e[2620] = new t(2620, "UCA1400_SPANISH_NOPAD_AI_CI", "ucs2", 2), e[2621] = new t(2621, "UCA1400_SPANISH_NOPAD_AI_CS", "ucs2", 2), e[2622] = new t(2622, "UCA1400_SPANISH_NOPAD_AS_CI", "ucs2", 2), e[2623] = new t(2623, "UCA1400_SPANISH_NOPAD_AS_CS", "ucs2", 2), e[2624] = new t(2624, "UCA1400_SWEDISH_AI_CI", "ucs2", 2), e[2625] = new t(2625, "UCA1400_SWEDISH_AI_CS", "ucs2", 2), e[2626] = new t(2626, "UCA1400_SWEDISH_AS_CI", "ucs2", 2), e[2627] = new t(2627, "UCA1400_SWEDISH_AS_CS", "ucs2", 2), e[2628] = new t(2628, "UCA1400_SWEDISH_NOPAD_AI_CI", "ucs2", 2), e[2629] = new t(2629, "UCA1400_SWEDISH_NOPAD_AI_CS", "ucs2", 2), e[2630] = new t(2630, "UCA1400_SWEDISH_NOPAD_AS_CI", "ucs2", 2), e[2631] = new t(2631, "UCA1400_SWEDISH_NOPAD_AS_CS", "ucs2", 2), e[2632] = new t(2632, "UCA1400_TURKISH_AI_CI", "ucs2", 2), e[2633] = new t(2633, "UCA1400_TURKISH_AI_CS", "ucs2", 2), e[2634] = new t(2634, "UCA1400_TURKISH_AS_CI", "ucs2", 2), e[2635] = new t(2635, "UCA1400_TURKISH_AS_CS", "ucs2", 2), e[2636] = new t(2636, "UCA1400_TURKISH_NOPAD_AI_CI", "ucs2", 2), e[2637] = new t(2637, "UCA1400_TURKISH_NOPAD_AI_CS", "ucs2", 2), e[2638] = new t(2638, "UCA1400_TURKISH_NOPAD_AS_CI", "ucs2", 2), e[2639] = new t(2639, "UCA1400_TURKISH_NOPAD_AS_CS", "ucs2", 2), e[2640] = new t(2640, "UCA1400_CZECH_AI_CI", "ucs2", 2), e[2641] = new t(2641, "UCA1400_CZECH_AI_CS", "ucs2", 2), e[2642] = new t(2642, "UCA1400_CZECH_AS_CI", "ucs2", 2), e[2643] = new t(2643, "UCA1400_CZECH_AS_CS", "ucs2", 2), e[2644] = new t(2644, "UCA1400_CZECH_NOPAD_AI_CI", "ucs2", 2), e[2645] = new t(2645, "UCA1400_CZECH_NOPAD_AI_CS", "ucs2", 2), e[2646] = new t(2646, "UCA1400_CZECH_NOPAD_AS_CI", "ucs2", 2), e[2647] = new t(2647, "UCA1400_CZECH_NOPAD_AS_CS", "ucs2", 2), e[2648] = new t(2648, "UCA1400_DANISH_AI_CI", "ucs2", 2), e[2649] = new t(2649, "UCA1400_DANISH_AI_CS", "ucs2", 2), e[2650] = new t(2650, "UCA1400_DANISH_AS_CI", "ucs2", 2), e[2651] = new t(2651, "UCA1400_DANISH_AS_CS", "ucs2", 2), e[2652] = new t(2652, "UCA1400_DANISH_NOPAD_AI_CI", "ucs2", 2), e[2653] = new t(2653, "UCA1400_DANISH_NOPAD_AI_CS", "ucs2", 2), e[2654] = new t(2654, "UCA1400_DANISH_NOPAD_AS_CI", "ucs2", 2), e[2655] = new t(2655, "UCA1400_DANISH_NOPAD_AS_CS", "ucs2", 2), e[2656] = new t(2656, "UCA1400_LITHUANIAN_AI_CI", "ucs2", 2), e[2657] = new t(2657, "UCA1400_LITHUANIAN_AI_CS", "ucs2", 2), e[2658] = new t(2658, "UCA1400_LITHUANIAN_AS_CI", "ucs2", 2), e[2659] = new t(2659, "UCA1400_LITHUANIAN_AS_CS", "ucs2", 2), e[2660] = new t(2660, "UCA1400_LITHUANIAN_NOPAD_AI_CI", "ucs2", 2), e[2661] = new t(2661, "UCA1400_LITHUANIAN_NOPAD_AI_CS", "ucs2", 2), e[2662] = new t(2662, "UCA1400_LITHUANIAN_NOPAD_AS_CI", "ucs2", 2), e[2663] = new t(2663, "UCA1400_LITHUANIAN_NOPAD_AS_CS", "ucs2", 2), e[2664] = new t(2664, "UCA1400_SLOVAK_AI_CI", "ucs2", 2), e[2665] = new t(2665, "UCA1400_SLOVAK_AI_CS", "ucs2", 2), e[2666] = new t(2666, "UCA1400_SLOVAK_AS_CI", "ucs2", 2), e[2667] = new t(2667, "UCA1400_SLOVAK_AS_CS", "ucs2", 2), e[2668] = new t(2668, "UCA1400_SLOVAK_NOPAD_AI_CI", "ucs2", 2), e[2669] = new t(2669, "UCA1400_SLOVAK_NOPAD_AI_CS", "ucs2", 2), e[2670] = new t(2670, "UCA1400_SLOVAK_NOPAD_AS_CI", "ucs2", 2), e[2671] = new t(2671, "UCA1400_SLOVAK_NOPAD_AS_CS", "ucs2", 2), e[2672] = new t(2672, "UCA1400_SPANISH2_AI_CI", "ucs2", 2), e[2673] = new t(2673, "UCA1400_SPANISH2_AI_CS", "ucs2", 2), e[2674] = new t(2674, "UCA1400_SPANISH2_AS_CI", "ucs2", 2), e[2675] = new t(2675, "UCA1400_SPANISH2_AS_CS", "ucs2", 2), e[2676] = new t(2676, "UCA1400_SPANISH2_NOPAD_AI_CI", "ucs2", 2), e[2677] = new t(2677, "UCA1400_SPANISH2_NOPAD_AI_CS", "ucs2", 2), e[2678] = new t(2678, "UCA1400_SPANISH2_NOPAD_AS_CI", "ucs2", 2), e[2679] = new t(2679, "UCA1400_SPANISH2_NOPAD_AS_CS", "ucs2", 2), e[2680] = new t(2680, "UCA1400_ROMAN_AI_CI", "ucs2", 2), e[2681] = new t(2681, "UCA1400_ROMAN_AI_CS", "ucs2", 2), e[2682] = new t(2682, "UCA1400_ROMAN_AS_CI", "ucs2", 2), e[2683] = new t(2683, "UCA1400_ROMAN_AS_CS", "ucs2", 2), e[2684] = new t(2684, "UCA1400_ROMAN_NOPAD_AI_CI", "ucs2", 2), e[2685] = new t(2685, "UCA1400_ROMAN_NOPAD_AI_CS", "ucs2", 2), e[2686] = new t(2686, "UCA1400_ROMAN_NOPAD_AS_CI", "ucs2", 2), e[2687] = new t(2687, "UCA1400_ROMAN_NOPAD_AS_CS", "ucs2", 2), e[2688] = new t(2688, "UCA1400_PERSIAN_AI_CI", "ucs2", 2), e[2689] = new t(2689, "UCA1400_PERSIAN_AI_CS", "ucs2", 2), e[2690] = new t(2690, "UCA1400_PERSIAN_AS_CI", "ucs2", 2), e[2691] = new t(2691, "UCA1400_PERSIAN_AS_CS", "ucs2", 2), e[2692] = new t(2692, "UCA1400_PERSIAN_NOPAD_AI_CI", "ucs2", 2), e[2693] = new t(2693, "UCA1400_PERSIAN_NOPAD_AI_CS", "ucs2", 2), e[2694] = new t(2694, "UCA1400_PERSIAN_NOPAD_AS_CI", "ucs2", 2), e[2695] = new t(2695, "UCA1400_PERSIAN_NOPAD_AS_CS", "ucs2", 2), e[2696] = new t(2696, "UCA1400_ESPERANTO_AI_CI", "ucs2", 2), e[2697] = new t(2697, "UCA1400_ESPERANTO_AI_CS", "ucs2", 2), e[2698] = new t(2698, "UCA1400_ESPERANTO_AS_CI", "ucs2", 2), e[2699] = new t(2699, "UCA1400_ESPERANTO_AS_CS", "ucs2", 2), e[2700] = new t(2700, "UCA1400_ESPERANTO_NOPAD_AI_CI", "ucs2", 2), e[2701] = new t(2701, "UCA1400_ESPERANTO_NOPAD_AI_CS", "ucs2", 2), e[2702] = new t(2702, "UCA1400_ESPERANTO_NOPAD_AS_CI", "ucs2", 2), e[2703] = new t(2703, "UCA1400_ESPERANTO_NOPAD_AS_CS", "ucs2", 2), e[2704] = new t(2704, "UCA1400_HUNGARIAN_AI_CI", "ucs2", 2), e[2705] = new t(2705, "UCA1400_HUNGARIAN_AI_CS", "ucs2", 2), e[2706] = new t(2706, "UCA1400_HUNGARIAN_AS_CI", "ucs2", 2), e[2707] = new t(2707, "UCA1400_HUNGARIAN_AS_CS", "ucs2", 2), e[2708] = new t(2708, "UCA1400_HUNGARIAN_NOPAD_AI_CI", "ucs2", 2), e[2709] = new t(2709, "UCA1400_HUNGARIAN_NOPAD_AI_CS", "ucs2", 2), e[2710] = new t(2710, "UCA1400_HUNGARIAN_NOPAD_AS_CI", "ucs2", 2), e[2711] = new t(2711, "UCA1400_HUNGARIAN_NOPAD_AS_CS", "ucs2", 2), e[2712] = new t(2712, "UCA1400_SINHALA_AI_CI", "ucs2", 2), e[2713] = new t(2713, "UCA1400_SINHALA_AI_CS", "ucs2", 2), e[2714] = new t(2714, "UCA1400_SINHALA_AS_CI", "ucs2", 2), e[2715] = new t(2715, "UCA1400_SINHALA_AS_CS", "ucs2", 2), e[2716] = new t(2716, "UCA1400_SINHALA_NOPAD_AI_CI", "ucs2", 2), e[2717] = new t(2717, "UCA1400_SINHALA_NOPAD_AI_CS", "ucs2", 2), e[2718] = new t(2718, "UCA1400_SINHALA_NOPAD_AS_CI", "ucs2", 2), e[2719] = new t(2719, "UCA1400_SINHALA_NOPAD_AS_CS", "ucs2", 2), e[2720] = new t(2720, "UCA1400_GERMAN2_AI_CI", "ucs2", 2), e[2721] = new t(2721, "UCA1400_GERMAN2_AI_CS", "ucs2", 2), e[2722] = new t(2722, "UCA1400_GERMAN2_AS_CI", "ucs2", 2), e[2723] = new t(2723, "UCA1400_GERMAN2_AS_CS", "ucs2", 2), e[2724] = new t(2724, "UCA1400_GERMAN2_NOPAD_AI_CI", "ucs2", 2), e[2725] = new t(2725, "UCA1400_GERMAN2_NOPAD_AI_CS", "ucs2", 2), e[2726] = new t(2726, "UCA1400_GERMAN2_NOPAD_AS_CI", "ucs2", 2), e[2727] = new t(2727, "UCA1400_GERMAN2_NOPAD_AS_CS", "ucs2", 2), e[2744] = new t(2744, "UCA1400_VIETNAMESE_AI_CI", "ucs2", 2), e[2745] = new t(2745, "UCA1400_VIETNAMESE_AI_CS", "ucs2", 2), e[2746] = new t(2746, "UCA1400_VIETNAMESE_AS_CI", "ucs2", 2), e[2747] = new t(2747, "UCA1400_VIETNAMESE_AS_CS", "ucs2", 2), e[2748] = new t(2748, "UCA1400_VIETNAMESE_NOPAD_AI_CI", "ucs2", 2), e[2749] = new t(2749, "UCA1400_VIETNAMESE_NOPAD_AI_CS", "ucs2", 2), e[2750] = new t(2750, "UCA1400_VIETNAMESE_NOPAD_AS_CI", "ucs2", 2), e[2751] = new t(2751, "UCA1400_VIETNAMESE_NOPAD_AS_CS", "ucs2", 2), e[2752] = new t(2752, "UCA1400_CROATIAN_AI_CI", "ucs2", 2), e[2753] = new t(2753, "UCA1400_CROATIAN_AI_CS", "ucs2", 2), e[2754] = new t(2754, "UCA1400_CROATIAN_AS_CI", "ucs2", 2), e[2755] = new t(2755, "UCA1400_CROATIAN_AS_CS", "ucs2", 2), e[2756] = new t(2756, "UCA1400_CROATIAN_NOPAD_AI_CI", "ucs2", 2), e[2757] = new t(2757, "UCA1400_CROATIAN_NOPAD_AI_CS", "ucs2", 2), e[2758] = new t(2758, "UCA1400_CROATIAN_NOPAD_AS_CI", "ucs2", 2), e[2759] = new t(2759, "UCA1400_CROATIAN_NOPAD_AS_CS", "ucs2", 2), e[2816] = new t(2816, "UCA1400_AI_CI", "utf16", 4), e[2817] = new t(2817, "UCA1400_AI_CS", "utf16", 4), e[2818] = new t(2818, "UCA1400_AS_CI", "utf16", 4), e[2819] = new t(2819, "UCA1400_AS_CS", "utf16", 4), e[2820] = new t(2820, "UCA1400_NOPAD_AI_CI", "utf16", 4), e[2821] = new t(2821, "UCA1400_NOPAD_AI_CS", "utf16", 4), e[2822] = new t(2822, "UCA1400_NOPAD_AS_CI", "utf16", 4), e[2823] = new t(2823, "UCA1400_NOPAD_AS_CS", "utf16", 4), e[2824] = new t(2824, "UCA1400_ICELANDIC_AI_CI", "utf16", 4), e[2825] = new t(2825, "UCA1400_ICELANDIC_AI_CS", "utf16", 4), e[2826] = new t(2826, "UCA1400_ICELANDIC_AS_CI", "utf16", 4), e[2827] = new t(2827, "UCA1400_ICELANDIC_AS_CS", "utf16", 4), e[2828] = new t(2828, "UCA1400_ICELANDIC_NOPAD_AI_CI", "utf16", 4), e[2829] = new t(2829, "UCA1400_ICELANDIC_NOPAD_AI_CS", "utf16", 4), e[2830] = new t(2830, "UCA1400_ICELANDIC_NOPAD_AS_CI", "utf16", 4), e[2831] = new t(2831, "UCA1400_ICELANDIC_NOPAD_AS_CS", "utf16", 4), e[2832] = new t(2832, "UCA1400_LATVIAN_AI_CI", "utf16", 4), e[2833] = new t(2833, "UCA1400_LATVIAN_AI_CS", "utf16", 4), e[2834] = new t(2834, "UCA1400_LATVIAN_AS_CI", "utf16", 4), e[2835] = new t(2835, "UCA1400_LATVIAN_AS_CS", "utf16", 4), e[2836] = new t(2836, "UCA1400_LATVIAN_NOPAD_AI_CI", "utf16", 4), e[2837] = new t(2837, "UCA1400_LATVIAN_NOPAD_AI_CS", "utf16", 4), e[2838] = new t(2838, "UCA1400_LATVIAN_NOPAD_AS_CI", "utf16", 4), e[2839] = new t(2839, "UCA1400_LATVIAN_NOPAD_AS_CS", "utf16", 4), e[2840] = new t(2840, "UCA1400_ROMANIAN_AI_CI", "utf16", 4), e[2841] = new t(2841, "UCA1400_ROMANIAN_AI_CS", "utf16", 4), e[2842] = new t(2842, "UCA1400_ROMANIAN_AS_CI", "utf16", 4), e[2843] = new t(2843, "UCA1400_ROMANIAN_AS_CS", "utf16", 4), e[2844] = new t(2844, "UCA1400_ROMANIAN_NOPAD_AI_CI", "utf16", 4), e[2845] = new t(2845, "UCA1400_ROMANIAN_NOPAD_AI_CS", "utf16", 4), e[2846] = new t(2846, "UCA1400_ROMANIAN_NOPAD_AS_CI", "utf16", 4), e[2847] = new t(2847, "UCA1400_ROMANIAN_NOPAD_AS_CS", "utf16", 4), e[2848] = new t(2848, "UCA1400_SLOVENIAN_AI_CI", "utf16", 4), e[2849] = new t(2849, "UCA1400_SLOVENIAN_AI_CS", "utf16", 4), e[2850] = new t(2850, "UCA1400_SLOVENIAN_AS_CI", "utf16", 4), e[2851] = new t(2851, "UCA1400_SLOVENIAN_AS_CS", "utf16", 4), e[2852] = new t(2852, "UCA1400_SLOVENIAN_NOPAD_AI_CI", "utf16", 4), e[2853] = new t(2853, "UCA1400_SLOVENIAN_NOPAD_AI_CS", "utf16", 4), e[2854] = new t(2854, "UCA1400_SLOVENIAN_NOPAD_AS_CI", "utf16", 4), e[2855] = new t(2855, "UCA1400_SLOVENIAN_NOPAD_AS_CS", "utf16", 4), e[2856] = new t(2856, "UCA1400_POLISH_AI_CI", "utf16", 4), e[2857] = new t(2857, "UCA1400_POLISH_AI_CS", "utf16", 4), e[2858] = new t(2858, "UCA1400_POLISH_AS_CI", "utf16", 4), e[2859] = new t(2859, "UCA1400_POLISH_AS_CS", "utf16", 4), e[2860] = new t(2860, "UCA1400_POLISH_NOPAD_AI_CI", "utf16", 4), e[2861] = new t(2861, "UCA1400_POLISH_NOPAD_AI_CS", "utf16", 4), e[2862] = new t(2862, "UCA1400_POLISH_NOPAD_AS_CI", "utf16", 4), e[2863] = new t(2863, "UCA1400_POLISH_NOPAD_AS_CS", "utf16", 4), e[2864] = new t(2864, "UCA1400_ESTONIAN_AI_CI", "utf16", 4), e[2865] = new t(2865, "UCA1400_ESTONIAN_AI_CS", "utf16", 4), e[2866] = new t(2866, "UCA1400_ESTONIAN_AS_CI", "utf16", 4), e[2867] = new t(2867, "UCA1400_ESTONIAN_AS_CS", "utf16", 4), e[2868] = new t(2868, "UCA1400_ESTONIAN_NOPAD_AI_CI", "utf16", 4), e[2869] = new t(2869, "UCA1400_ESTONIAN_NOPAD_AI_CS", "utf16", 4), e[2870] = new t(2870, "UCA1400_ESTONIAN_NOPAD_AS_CI", "utf16", 4), e[2871] = new t(2871, "UCA1400_ESTONIAN_NOPAD_AS_CS", "utf16", 4), e[2872] = new t(2872, "UCA1400_SPANISH_AI_CI", "utf16", 4), e[2873] = new t(2873, "UCA1400_SPANISH_AI_CS", "utf16", 4), e[2874] = new t(2874, "UCA1400_SPANISH_AS_CI", "utf16", 4), e[2875] = new t(2875, "UCA1400_SPANISH_AS_CS", "utf16", 4), e[2876] = new t(2876, "UCA1400_SPANISH_NOPAD_AI_CI", "utf16", 4), e[2877] = new t(2877, "UCA1400_SPANISH_NOPAD_AI_CS", "utf16", 4), e[2878] = new t(2878, "UCA1400_SPANISH_NOPAD_AS_CI", "utf16", 4), e[2879] = new t(2879, "UCA1400_SPANISH_NOPAD_AS_CS", "utf16", 4), e[2880] = new t(2880, "UCA1400_SWEDISH_AI_CI", "utf16", 4), e[2881] = new t(2881, "UCA1400_SWEDISH_AI_CS", "utf16", 4), e[2882] = new t(2882, "UCA1400_SWEDISH_AS_CI", "utf16", 4), e[2883] = new t(2883, "UCA1400_SWEDISH_AS_CS", "utf16", 4), e[2884] = new t(2884, "UCA1400_SWEDISH_NOPAD_AI_CI", "utf16", 4), e[2885] = new t(2885, "UCA1400_SWEDISH_NOPAD_AI_CS", "utf16", 4), e[2886] = new t(2886, "UCA1400_SWEDISH_NOPAD_AS_CI", "utf16", 4), e[2887] = new t(2887, "UCA1400_SWEDISH_NOPAD_AS_CS", "utf16", 4), e[2888] = new t(2888, "UCA1400_TURKISH_AI_CI", "utf16", 4), e[2889] = new t(2889, "UCA1400_TURKISH_AI_CS", "utf16", 4), e[2890] = new t(2890, "UCA1400_TURKISH_AS_CI", "utf16", 4), e[2891] = new t(2891, "UCA1400_TURKISH_AS_CS", "utf16", 4), e[2892] = new t(2892, "UCA1400_TURKISH_NOPAD_AI_CI", "utf16", 4), e[2893] = new t(2893, "UCA1400_TURKISH_NOPAD_AI_CS", "utf16", 4), e[2894] = new t(2894, "UCA1400_TURKISH_NOPAD_AS_CI", "utf16", 4), e[2895] = new t(2895, "UCA1400_TURKISH_NOPAD_AS_CS", "utf16", 4), e[2896] = new t(2896, "UCA1400_CZECH_AI_CI", "utf16", 4), e[2897] = new t(2897, "UCA1400_CZECH_AI_CS", "utf16", 4), e[2898] = new t(2898, "UCA1400_CZECH_AS_CI", "utf16", 4), e[2899] = new t(2899, "UCA1400_CZECH_AS_CS", "utf16", 4), e[2900] = new t(2900, "UCA1400_CZECH_NOPAD_AI_CI", "utf16", 4), e[2901] = new t(2901, "UCA1400_CZECH_NOPAD_AI_CS", "utf16", 4), e[2902] = new t(2902, "UCA1400_CZECH_NOPAD_AS_CI", "utf16", 4), e[2903] = new t(2903, "UCA1400_CZECH_NOPAD_AS_CS", "utf16", 4), e[2904] = new t(2904, "UCA1400_DANISH_AI_CI", "utf16", 4), e[2905] = new t(2905, "UCA1400_DANISH_AI_CS", "utf16", 4), e[2906] = new t(2906, "UCA1400_DANISH_AS_CI", "utf16", 4), e[2907] = new t(2907, "UCA1400_DANISH_AS_CS", "utf16", 4), e[2908] = new t(2908, "UCA1400_DANISH_NOPAD_AI_CI", "utf16", 4), e[2909] = new t(2909, "UCA1400_DANISH_NOPAD_AI_CS", "utf16", 4), e[2910] = new t(2910, "UCA1400_DANISH_NOPAD_AS_CI", "utf16", 4), e[2911] = new t(2911, "UCA1400_DANISH_NOPAD_AS_CS", "utf16", 4), e[2912] = new t(2912, "UCA1400_LITHUANIAN_AI_CI", "utf16", 4), e[2913] = new t(2913, "UCA1400_LITHUANIAN_AI_CS", "utf16", 4), e[2914] = new t(2914, "UCA1400_LITHUANIAN_AS_CI", "utf16", 4), e[2915] = new t(2915, "UCA1400_LITHUANIAN_AS_CS", "utf16", 4), e[2916] = new t(2916, "UCA1400_LITHUANIAN_NOPAD_AI_CI", "utf16", 4), e[2917] = new t(2917, "UCA1400_LITHUANIAN_NOPAD_AI_CS", "utf16", 4), e[2918] = new t(2918, "UCA1400_LITHUANIAN_NOPAD_AS_CI", "utf16", 4), e[2919] = new t(2919, "UCA1400_LITHUANIAN_NOPAD_AS_CS", "utf16", 4), e[2920] = new t(2920, "UCA1400_SLOVAK_AI_CI", "utf16", 4), e[2921] = new t(2921, "UCA1400_SLOVAK_AI_CS", "utf16", 4), e[2922] = new t(2922, "UCA1400_SLOVAK_AS_CI", "utf16", 4), e[2923] = new t(2923, "UCA1400_SLOVAK_AS_CS", "utf16", 4), e[2924] = new t(2924, "UCA1400_SLOVAK_NOPAD_AI_CI", "utf16", 4), e[2925] = new t(2925, "UCA1400_SLOVAK_NOPAD_AI_CS", "utf16", 4), e[2926] = new t(2926, "UCA1400_SLOVAK_NOPAD_AS_CI", "utf16", 4), e[2927] = new t(2927, "UCA1400_SLOVAK_NOPAD_AS_CS", "utf16", 4), e[2928] = new t(2928, "UCA1400_SPANISH2_AI_CI", "utf16", 4), e[2929] = new t(2929, "UCA1400_SPANISH2_AI_CS", "utf16", 4), e[2930] = new t(2930, "UCA1400_SPANISH2_AS_CI", "utf16", 4), e[2931] = new t(2931, "UCA1400_SPANISH2_AS_CS", "utf16", 4), e[2932] = new t(2932, "UCA1400_SPANISH2_NOPAD_AI_CI", "utf16", 4), e[2933] = new t(2933, "UCA1400_SPANISH2_NOPAD_AI_CS", "utf16", 4), e[2934] = new t(2934, "UCA1400_SPANISH2_NOPAD_AS_CI", "utf16", 4), e[2935] = new t(2935, "UCA1400_SPANISH2_NOPAD_AS_CS", "utf16", 4), e[2936] = new t(2936, "UCA1400_ROMAN_AI_CI", "utf16", 4), e[2937] = new t(2937, "UCA1400_ROMAN_AI_CS", "utf16", 4), e[2938] = new t(2938, "UCA1400_ROMAN_AS_CI", "utf16", 4), e[2939] = new t(2939, "UCA1400_ROMAN_AS_CS", "utf16", 4), e[2940] = new t(2940, "UCA1400_ROMAN_NOPAD_AI_CI", "utf16", 4), e[2941] = new t(2941, "UCA1400_ROMAN_NOPAD_AI_CS", "utf16", 4), e[2942] = new t(2942, "UCA1400_ROMAN_NOPAD_AS_CI", "utf16", 4), e[2943] = new t(2943, "UCA1400_ROMAN_NOPAD_AS_CS", "utf16", 4), e[2944] = new t(2944, "UCA1400_PERSIAN_AI_CI", "utf16", 4), e[2945] = new t(2945, "UCA1400_PERSIAN_AI_CS", "utf16", 4), e[2946] = new t(2946, "UCA1400_PERSIAN_AS_CI", "utf16", 4), e[2947] = new t(2947, "UCA1400_PERSIAN_AS_CS", "utf16", 4), e[2948] = new t(2948, "UCA1400_PERSIAN_NOPAD_AI_CI", "utf16", 4), e[2949] = new t(2949, "UCA1400_PERSIAN_NOPAD_AI_CS", "utf16", 4), e[2950] = new t(2950, "UCA1400_PERSIAN_NOPAD_AS_CI", "utf16", 4), e[2951] = new t(2951, "UCA1400_PERSIAN_NOPAD_AS_CS", "utf16", 4), e[2952] = new t(2952, "UCA1400_ESPERANTO_AI_CI", "utf16", 4), e[2953] = new t(2953, "UCA1400_ESPERANTO_AI_CS", "utf16", 4), e[2954] = new t(2954, "UCA1400_ESPERANTO_AS_CI", "utf16", 4), e[2955] = new t(2955, "UCA1400_ESPERANTO_AS_CS", "utf16", 4), e[2956] = new t(2956, "UCA1400_ESPERANTO_NOPAD_AI_CI", "utf16", 4), e[2957] = new t(2957, "UCA1400_ESPERANTO_NOPAD_AI_CS", "utf16", 4), e[2958] = new t(2958, "UCA1400_ESPERANTO_NOPAD_AS_CI", "utf16", 4), e[2959] = new t(2959, "UCA1400_ESPERANTO_NOPAD_AS_CS", "utf16", 4), e[2960] = new t(2960, "UCA1400_HUNGARIAN_AI_CI", "utf16", 4), e[2961] = new t(2961, "UCA1400_HUNGARIAN_AI_CS", "utf16", 4), e[2962] = new t(2962, "UCA1400_HUNGARIAN_AS_CI", "utf16", 4), e[2963] = new t(2963, "UCA1400_HUNGARIAN_AS_CS", "utf16", 4), e[2964] = new t(2964, "UCA1400_HUNGARIAN_NOPAD_AI_CI", "utf16", 4), e[2965] = new t(2965, "UCA1400_HUNGARIAN_NOPAD_AI_CS", "utf16", 4), e[2966] = new t(2966, "UCA1400_HUNGARIAN_NOPAD_AS_CI", "utf16", 4), e[2967] = new t(2967, "UCA1400_HUNGARIAN_NOPAD_AS_CS", "utf16", 4), e[2968] = new t(2968, "UCA1400_SINHALA_AI_CI", "utf16", 4), e[2969] = new t(2969, "UCA1400_SINHALA_AI_CS", "utf16", 4), e[2970] = new t(2970, "UCA1400_SINHALA_AS_CI", "utf16", 4), e[2971] = new t(2971, "UCA1400_SINHALA_AS_CS", "utf16", 4), e[2972] = new t(2972, "UCA1400_SINHALA_NOPAD_AI_CI", "utf16", 4), e[2973] = new t(2973, "UCA1400_SINHALA_NOPAD_AI_CS", "utf16", 4), e[2974] = new t(2974, "UCA1400_SINHALA_NOPAD_AS_CI", "utf16", 4), e[2975] = new t(2975, "UCA1400_SINHALA_NOPAD_AS_CS", "utf16", 4), e[2976] = new t(2976, "UCA1400_GERMAN2_AI_CI", "utf16", 4), e[2977] = new t(2977, "UCA1400_GERMAN2_AI_CS", "utf16", 4), e[2978] = new t(2978, "UCA1400_GERMAN2_AS_CI", "utf16", 4), e[2979] = new t(2979, "UCA1400_GERMAN2_AS_CS", "utf16", 4), e[2980] = new t(2980, "UCA1400_GERMAN2_NOPAD_AI_CI", "utf16", 4), e[2981] = new t(2981, "UCA1400_GERMAN2_NOPAD_AI_CS", "utf16", 4), e[2982] = new t(2982, "UCA1400_GERMAN2_NOPAD_AS_CI", "utf16", 4), e[2983] = new t(2983, "UCA1400_GERMAN2_NOPAD_AS_CS", "utf16", 4), e[3e3] = new t(3e3, "UCA1400_VIETNAMESE_AI_CI", "utf16", 4), e[3001] = new t(3001, "UCA1400_VIETNAMESE_AI_CS", "utf16", 4), e[3002] = new t(3002, "UCA1400_VIETNAMESE_AS_CI", "utf16", 4), e[3003] = new t(3003, "UCA1400_VIETNAMESE_AS_CS", "utf16", 4), e[3004] = new t(3004, "UCA1400_VIETNAMESE_NOPAD_AI_CI", "utf16", 4), e[3005] = new t(3005, "UCA1400_VIETNAMESE_NOPAD_AI_CS", "utf16", 4), e[3006] = new t(3006, "UCA1400_VIETNAMESE_NOPAD_AS_CI", "utf16", 4), e[3007] = new t(3007, "UCA1400_VIETNAMESE_NOPAD_AS_CS", "utf16", 4), e[3008] = new t(3008, "UCA1400_CROATIAN_AI_CI", "utf16", 4), e[3009] = new t(3009, "UCA1400_CROATIAN_AI_CS", "utf16", 4), e[3010] = new t(3010, "UCA1400_CROATIAN_AS_CI", "utf16", 4), e[3011] = new t(3011, "UCA1400_CROATIAN_AS_CS", "utf16", 4), e[3012] = new t(3012, "UCA1400_CROATIAN_NOPAD_AI_CI", "utf16", 4), e[3013] = new t(3013, "UCA1400_CROATIAN_NOPAD_AI_CS", "utf16", 4), e[3014] = new t(3014, "UCA1400_CROATIAN_NOPAD_AS_CI", "utf16", 4), e[3015] = new t(3015, "UCA1400_CROATIAN_NOPAD_AS_CS", "utf16", 4), e[3072] = new t(3072, "UCA1400_AI_CI", "utf32", 4), e[3073] = new t(3073, "UCA1400_AI_CS", "utf32", 4), e[3074] = new t(3074, "UCA1400_AS_CI", "utf32", 4), e[3075] = new t(3075, "UCA1400_AS_CS", "utf32", 4), e[3076] = new t(3076, "UCA1400_NOPAD_AI_CI", "utf32", 4), e[3077] = new t(3077, "UCA1400_NOPAD_AI_CS", "utf32", 4), e[3078] = new t(3078, "UCA1400_NOPAD_AS_CI", "utf32", 4), e[3079] = new t(3079, "UCA1400_NOPAD_AS_CS", "utf32", 4), e[3080] = new t(3080, "UCA1400_ICELANDIC_AI_CI", "utf32", 4), e[3081] = new t(3081, "UCA1400_ICELANDIC_AI_CS", "utf32", 4), e[3082] = new t(3082, "UCA1400_ICELANDIC_AS_CI", "utf32", 4), e[3083] = new t(3083, "UCA1400_ICELANDIC_AS_CS", "utf32", 4), e[3084] = new t(3084, "UCA1400_ICELANDIC_NOPAD_AI_CI", "utf32", 4), e[3085] = new t(3085, "UCA1400_ICELANDIC_NOPAD_AI_CS", "utf32", 4), e[3086] = new t(3086, "UCA1400_ICELANDIC_NOPAD_AS_CI", "utf32", 4), e[3087] = new t(3087, "UCA1400_ICELANDIC_NOPAD_AS_CS", "utf32", 4), e[3088] = new t(3088, "UCA1400_LATVIAN_AI_CI", "utf32", 4), e[3089] = new t(3089, "UCA1400_LATVIAN_AI_CS", "utf32", 4), e[3090] = new t(3090, "UCA1400_LATVIAN_AS_CI", "utf32", 4), e[3091] = new t(3091, "UCA1400_LATVIAN_AS_CS", "utf32", 4), e[3092] = new t(3092, "UCA1400_LATVIAN_NOPAD_AI_CI", "utf32", 4), e[3093] = new t(3093, "UCA1400_LATVIAN_NOPAD_AI_CS", "utf32", 4), e[3094] = new t(3094, "UCA1400_LATVIAN_NOPAD_AS_CI", "utf32", 4), e[3095] = new t(3095, "UCA1400_LATVIAN_NOPAD_AS_CS", "utf32", 4), e[3096] = new t(3096, "UCA1400_ROMANIAN_AI_CI", "utf32", 4), e[3097] = new t(3097, "UCA1400_ROMANIAN_AI_CS", "utf32", 4), e[3098] = new t(3098, "UCA1400_ROMANIAN_AS_CI", "utf32", 4), e[3099] = new t(3099, "UCA1400_ROMANIAN_AS_CS", "utf32", 4), e[3100] = new t(3100, "UCA1400_ROMANIAN_NOPAD_AI_CI", "utf32", 4), e[3101] = new t(3101, "UCA1400_ROMANIAN_NOPAD_AI_CS", "utf32", 4), e[3102] = new t(3102, "UCA1400_ROMANIAN_NOPAD_AS_CI", "utf32", 4), e[3103] = new t(3103, "UCA1400_ROMANIAN_NOPAD_AS_CS", "utf32", 4), e[3104] = new t(3104, "UCA1400_SLOVENIAN_AI_CI", "utf32", 4), e[3105] = new t(3105, "UCA1400_SLOVENIAN_AI_CS", "utf32", 4), e[3106] = new t(3106, "UCA1400_SLOVENIAN_AS_CI", "utf32", 4), e[3107] = new t(3107, "UCA1400_SLOVENIAN_AS_CS", "utf32", 4), e[3108] = new t(3108, "UCA1400_SLOVENIAN_NOPAD_AI_CI", "utf32", 4), e[3109] = new t(3109, "UCA1400_SLOVENIAN_NOPAD_AI_CS", "utf32", 4), e[3110] = new t(3110, "UCA1400_SLOVENIAN_NOPAD_AS_CI", "utf32", 4), e[3111] = new t(3111, "UCA1400_SLOVENIAN_NOPAD_AS_CS", "utf32", 4), e[3112] = new t(3112, "UCA1400_POLISH_AI_CI", "utf32", 4), e[3113] = new t(3113, "UCA1400_POLISH_AI_CS", "utf32", 4), e[3114] = new t(3114, "UCA1400_POLISH_AS_CI", "utf32", 4), e[3115] = new t(3115, "UCA1400_POLISH_AS_CS", "utf32", 4), e[3116] = new t(3116, "UCA1400_POLISH_NOPAD_AI_CI", "utf32", 4), e[3117] = new t(3117, "UCA1400_POLISH_NOPAD_AI_CS", "utf32", 4), e[3118] = new t(3118, "UCA1400_POLISH_NOPAD_AS_CI", "utf32", 4), e[3119] = new t(3119, "UCA1400_POLISH_NOPAD_AS_CS", "utf32", 4), e[3120] = new t(3120, "UCA1400_ESTONIAN_AI_CI", "utf32", 4), e[3121] = new t(3121, "UCA1400_ESTONIAN_AI_CS", "utf32", 4), e[3122] = new t(3122, "UCA1400_ESTONIAN_AS_CI", "utf32", 4), e[3123] = new t(3123, "UCA1400_ESTONIAN_AS_CS", "utf32", 4), e[3124] = new t(3124, "UCA1400_ESTONIAN_NOPAD_AI_CI", "utf32", 4), e[3125] = new t(3125, "UCA1400_ESTONIAN_NOPAD_AI_CS", "utf32", 4), e[3126] = new t(3126, "UCA1400_ESTONIAN_NOPAD_AS_CI", "utf32", 4), e[3127] = new t(3127, "UCA1400_ESTONIAN_NOPAD_AS_CS", "utf32", 4), e[3128] = new t(3128, "UCA1400_SPANISH_AI_CI", "utf32", 4), e[3129] = new t(3129, "UCA1400_SPANISH_AI_CS", "utf32", 4), e[3130] = new t(3130, "UCA1400_SPANISH_AS_CI", "utf32", 4), e[3131] = new t(3131, "UCA1400_SPANISH_AS_CS", "utf32", 4), e[3132] = new t(3132, "UCA1400_SPANISH_NOPAD_AI_CI", "utf32", 4), e[3133] = new t(3133, "UCA1400_SPANISH_NOPAD_AI_CS", "utf32", 4), e[3134] = new t(3134, "UCA1400_SPANISH_NOPAD_AS_CI", "utf32", 4), e[3135] = new t(3135, "UCA1400_SPANISH_NOPAD_AS_CS", "utf32", 4), e[3136] = new t(3136, "UCA1400_SWEDISH_AI_CI", "utf32", 4), e[3137] = new t(3137, "UCA1400_SWEDISH_AI_CS", "utf32", 4), e[3138] = new t(3138, "UCA1400_SWEDISH_AS_CI", "utf32", 4), e[3139] = new t(3139, "UCA1400_SWEDISH_AS_CS", "utf32", 4), e[3140] = new t(3140, "UCA1400_SWEDISH_NOPAD_AI_CI", "utf32", 4), e[3141] = new t(3141, "UCA1400_SWEDISH_NOPAD_AI_CS", "utf32", 4), e[3142] = new t(3142, "UCA1400_SWEDISH_NOPAD_AS_CI", "utf32", 4), e[3143] = new t(3143, "UCA1400_SWEDISH_NOPAD_AS_CS", "utf32", 4), e[3144] = new t(3144, "UCA1400_TURKISH_AI_CI", "utf32", 4), e[3145] = new t(3145, "UCA1400_TURKISH_AI_CS", "utf32", 4), e[3146] = new t(3146, "UCA1400_TURKISH_AS_CI", "utf32", 4), e[3147] = new t(3147, "UCA1400_TURKISH_AS_CS", "utf32", 4), e[3148] = new t(3148, "UCA1400_TURKISH_NOPAD_AI_CI", "utf32", 4), e[3149] = new t(3149, "UCA1400_TURKISH_NOPAD_AI_CS", "utf32", 4), e[3150] = new t(3150, "UCA1400_TURKISH_NOPAD_AS_CI", "utf32", 4), e[3151] = new t(3151, "UCA1400_TURKISH_NOPAD_AS_CS", "utf32", 4), e[3152] = new t(3152, "UCA1400_CZECH_AI_CI", "utf32", 4), e[3153] = new t(3153, "UCA1400_CZECH_AI_CS", "utf32", 4), e[3154] = new t(3154, "UCA1400_CZECH_AS_CI", "utf32", 4), e[3155] = new t(3155, "UCA1400_CZECH_AS_CS", "utf32", 4), e[3156] = new t(3156, "UCA1400_CZECH_NOPAD_AI_CI", "utf32", 4), e[3157] = new t(3157, "UCA1400_CZECH_NOPAD_AI_CS", "utf32", 4), e[3158] = new t(3158, "UCA1400_CZECH_NOPAD_AS_CI", "utf32", 4), e[3159] = new t(3159, "UCA1400_CZECH_NOPAD_AS_CS", "utf32", 4), e[3160] = new t(3160, "UCA1400_DANISH_AI_CI", "utf32", 4), e[3161] = new t(3161, "UCA1400_DANISH_AI_CS", "utf32", 4), e[3162] = new t(3162, "UCA1400_DANISH_AS_CI", "utf32", 4), e[3163] = new t(3163, "UCA1400_DANISH_AS_CS", "utf32", 4), e[3164] = new t(3164, "UCA1400_DANISH_NOPAD_AI_CI", "utf32", 4), e[3165] = new t(3165, "UCA1400_DANISH_NOPAD_AI_CS", "utf32", 4), e[3166] = new t(3166, "UCA1400_DANISH_NOPAD_AS_CI", "utf32", 4), e[3167] = new t(3167, "UCA1400_DANISH_NOPAD_AS_CS", "utf32", 4), e[3168] = new t(3168, "UCA1400_LITHUANIAN_AI_CI", "utf32", 4), e[3169] = new t(3169, "UCA1400_LITHUANIAN_AI_CS", "utf32", 4), e[3170] = new t(3170, "UCA1400_LITHUANIAN_AS_CI", "utf32", 4), e[3171] = new t(3171, "UCA1400_LITHUANIAN_AS_CS", "utf32", 4), e[3172] = new t(3172, "UCA1400_LITHUANIAN_NOPAD_AI_CI", "utf32", 4), e[3173] = new t(3173, "UCA1400_LITHUANIAN_NOPAD_AI_CS", "utf32", 4), e[3174] = new t(3174, "UCA1400_LITHUANIAN_NOPAD_AS_CI", "utf32", 4), e[3175] = new t(3175, "UCA1400_LITHUANIAN_NOPAD_AS_CS", "utf32", 4), e[3176] = new t(3176, "UCA1400_SLOVAK_AI_CI", "utf32", 4), e[3177] = new t(3177, "UCA1400_SLOVAK_AI_CS", "utf32", 4), e[3178] = new t(3178, "UCA1400_SLOVAK_AS_CI", "utf32", 4), e[3179] = new t(3179, "UCA1400_SLOVAK_AS_CS", "utf32", 4), e[3180] = new t(3180, "UCA1400_SLOVAK_NOPAD_AI_CI", "utf32", 4), e[3181] = new t(3181, "UCA1400_SLOVAK_NOPAD_AI_CS", "utf32", 4), e[3182] = new t(3182, "UCA1400_SLOVAK_NOPAD_AS_CI", "utf32", 4), e[3183] = new t(3183, "UCA1400_SLOVAK_NOPAD_AS_CS", "utf32", 4), e[3184] = new t(3184, "UCA1400_SPANISH2_AI_CI", "utf32", 4), e[3185] = new t(3185, "UCA1400_SPANISH2_AI_CS", "utf32", 4), e[3186] = new t(3186, "UCA1400_SPANISH2_AS_CI", "utf32", 4), e[3187] = new t(3187, "UCA1400_SPANISH2_AS_CS", "utf32", 4), e[3188] = new t(3188, "UCA1400_SPANISH2_NOPAD_AI_CI", "utf32", 4), e[3189] = new t(3189, "UCA1400_SPANISH2_NOPAD_AI_CS", "utf32", 4), e[3190] = new t(3190, "UCA1400_SPANISH2_NOPAD_AS_CI", "utf32", 4), e[3191] = new t(3191, "UCA1400_SPANISH2_NOPAD_AS_CS", "utf32", 4), e[3192] = new t(3192, "UCA1400_ROMAN_AI_CI", "utf32", 4), e[3193] = new t(3193, "UCA1400_ROMAN_AI_CS", "utf32", 4), e[3194] = new t(3194, "UCA1400_ROMAN_AS_CI", "utf32", 4), e[3195] = new t(3195, "UCA1400_ROMAN_AS_CS", "utf32", 4), e[3196] = new t(3196, "UCA1400_ROMAN_NOPAD_AI_CI", "utf32", 4), e[3197] = new t(3197, "UCA1400_ROMAN_NOPAD_AI_CS", "utf32", 4), e[3198] = new t(3198, "UCA1400_ROMAN_NOPAD_AS_CI", "utf32", 4), e[3199] = new t(3199, "UCA1400_ROMAN_NOPAD_AS_CS", "utf32", 4), e[3200] = new t(3200, "UCA1400_PERSIAN_AI_CI", "utf32", 4), e[3201] = new t(3201, "UCA1400_PERSIAN_AI_CS", "utf32", 4), e[3202] = new t(3202, "UCA1400_PERSIAN_AS_CI", "utf32", 4), e[3203] = new t(3203, "UCA1400_PERSIAN_AS_CS", "utf32", 4), e[3204] = new t(3204, "UCA1400_PERSIAN_NOPAD_AI_CI", "utf32", 4), e[3205] = new t(3205, "UCA1400_PERSIAN_NOPAD_AI_CS", "utf32", 4), e[3206] = new t(3206, "UCA1400_PERSIAN_NOPAD_AS_CI", "utf32", 4), e[3207] = new t(3207, "UCA1400_PERSIAN_NOPAD_AS_CS", "utf32", 4), e[3208] = new t(3208, "UCA1400_ESPERANTO_AI_CI", "utf32", 4), e[3209] = new t(3209, "UCA1400_ESPERANTO_AI_CS", "utf32", 4), e[3210] = new t(3210, "UCA1400_ESPERANTO_AS_CI", "utf32", 4), e[3211] = new t(3211, "UCA1400_ESPERANTO_AS_CS", "utf32", 4), e[3212] = new t(3212, "UCA1400_ESPERANTO_NOPAD_AI_CI", "utf32", 4), e[3213] = new t(3213, "UCA1400_ESPERANTO_NOPAD_AI_CS", "utf32", 4), e[3214] = new t(3214, "UCA1400_ESPERANTO_NOPAD_AS_CI", "utf32", 4), e[3215] = new t(3215, "UCA1400_ESPERANTO_NOPAD_AS_CS", "utf32", 4), e[3216] = new t(3216, "UCA1400_HUNGARIAN_AI_CI", "utf32", 4), e[3217] = new t(3217, "UCA1400_HUNGARIAN_AI_CS", "utf32", 4), e[3218] = new t(3218, "UCA1400_HUNGARIAN_AS_CI", "utf32", 4), e[3219] = new t(3219, "UCA1400_HUNGARIAN_AS_CS", "utf32", 4), e[3220] = new t(3220, "UCA1400_HUNGARIAN_NOPAD_AI_CI", "utf32", 4), e[3221] = new t(3221, "UCA1400_HUNGARIAN_NOPAD_AI_CS", "utf32", 4), e[3222] = new t(3222, "UCA1400_HUNGARIAN_NOPAD_AS_CI", "utf32", 4), e[3223] = new t(3223, "UCA1400_HUNGARIAN_NOPAD_AS_CS", "utf32", 4), e[3224] = new t(3224, "UCA1400_SINHALA_AI_CI", "utf32", 4), e[3225] = new t(3225, "UCA1400_SINHALA_AI_CS", "utf32", 4), e[3226] = new t(3226, "UCA1400_SINHALA_AS_CI", "utf32", 4), e[3227] = new t(3227, "UCA1400_SINHALA_AS_CS", "utf32", 4), e[3228] = new t(3228, "UCA1400_SINHALA_NOPAD_AI_CI", "utf32", 4), e[3229] = new t(3229, "UCA1400_SINHALA_NOPAD_AI_CS", "utf32", 4), e[3230] = new t(3230, "UCA1400_SINHALA_NOPAD_AS_CI", "utf32", 4), e[3231] = new t(3231, "UCA1400_SINHALA_NOPAD_AS_CS", "utf32", 4), e[3232] = new t(3232, "UCA1400_GERMAN2_AI_CI", "utf32", 4), e[3233] = new t(3233, "UCA1400_GERMAN2_AI_CS", "utf32", 4), e[3234] = new t(3234, "UCA1400_GERMAN2_AS_CI", "utf32", 4), e[3235] = new t(3235, "UCA1400_GERMAN2_AS_CS", "utf32", 4), e[3236] = new t(3236, "UCA1400_GERMAN2_NOPAD_AI_CI", "utf32", 4), e[3237] = new t(3237, "UCA1400_GERMAN2_NOPAD_AI_CS", "utf32", 4), e[3238] = new t(3238, "UCA1400_GERMAN2_NOPAD_AS_CI", "utf32", 4), e[3239] = new t(3239, "UCA1400_GERMAN2_NOPAD_AS_CS", "utf32", 4), e[3256] = new t(3256, "UCA1400_VIETNAMESE_AI_CI", "utf32", 4), e[3257] = new t(3257, "UCA1400_VIETNAMESE_AI_CS", "utf32", 4), e[3258] = new t(3258, "UCA1400_VIETNAMESE_AS_CI", "utf32", 4), e[3259] = new t(3259, "UCA1400_VIETNAMESE_AS_CS", "utf32", 4), e[3260] = new t(3260, "UCA1400_VIETNAMESE_NOPAD_AI_CI", "utf32", 4), e[3261] = new t(3261, "UCA1400_VIETNAMESE_NOPAD_AI_CS", "utf32", 4), e[3262] = new t(3262, "UCA1400_VIETNAMESE_NOPAD_AS_CI", "utf32", 4), e[3263] = new t(3263, "UCA1400_VIETNAMESE_NOPAD_AS_CS", "utf32", 4), e[3264] = new t(3264, "UCA1400_CROATIAN_AI_CI", "utf32", 4), e[3265] = new t(3265, "UCA1400_CROATIAN_AI_CS", "utf32", 4), e[3266] = new t(3266, "UCA1400_CROATIAN_AS_CI", "utf32", 4), e[3267] = new t(3267, "UCA1400_CROATIAN_AS_CS", "utf32", 4), e[3268] = new t(3268, "UCA1400_CROATIAN_NOPAD_AI_CI", "utf32", 4), e[3269] = new t(3269, "UCA1400_CROATIAN_NOPAD_AI_CS", "utf32", 4), e[3270] = new t(3270, "UCA1400_CROATIAN_NOPAD_AS_CI", "utf32", 4), e[3271] = new t(3271, "UCA1400_CROATIAN_NOPAD_AS_CS", "utf32", 4);
  for (let u = 0; u < e.length; u++) {
    let r = e[u];
    r && (t.prototype[r.name] = r);
  }
  return f.big5 = e[1], f.dec8 = e[3], f.cp850 = e[4], f.hp8 = e[6], f.koi8r = e[7], f.latin1 = e[8], f.latin2 = e[9], f.swe7 = e[10], f.ascii = e[11], f.ujis = e[12], f.sjis = e[13], f.hebrew = e[16], f.tis620 = e[18], f.euckr = e[19], f.koi8u = e[22], f.gb2312 = e[24], f.greek = e[25], f.cp1250 = e[26], f.gbk = e[28], f.latin5 = e[30], f.armscii8 = e[32], f.utf8 = e[33], f.ucs2 = e[35], f.cp866 = e[36], f.keybcs2 = e[37], f.macce = e[38], f.macroman = e[39], f.cp852 = e[40], f.latin7 = e[41], f.utf8mb4 = e[45], f.cp1251 = e[51], f.utf16 = e[54], f.utf16le = e[56], f.cp1256 = e[57], f.cp1257 = e[59], f.utf32 = e[60], f.binary = e[63], f.geostd8 = e[92], f.cp932 = e[95], f.eucjpms = e[97], f.gb18030 = e[248], fi = t, fi;
}
var or = {}, hi, jc;
function Fh() {
  if (jc) return hi;
  jc = 1;
  const e = 39, f = function(u, r) {
    let s = `${u}`;
    for (; s.length < r; ) s = "0" + s;
    return s;
  };
  class t {
    /**
     * Write (and escape) current parameter value to output writer
     *
     * @param out     output writer
     * @param value   current parameter. Expected to be non-null
     * @param opts    connection options
     * @param info    connection information
     */
    static writeParam(r, s, a, o) {
      switch (typeof s) {
        case "boolean":
          r.writeStringAscii(s ? "true" : "false");
          break;
        case "bigint":
        case "number":
          r.writeStringAscii(`${s}`);
          break;
        case "string":
          r.writeStringEscapeQuote(s);
          break;
        case "object":
          if (Object.prototype.toString.call(s) === "[object Date]")
            r.writeStringAscii(t.getLocalDate(s));
          else if (Buffer.isBuffer(s))
            r.writeStringAscii("_BINARY '"), r.writeBufferEscape(s), r.writeInt8(e);
          else if (typeof s.toSqlString == "function")
            r.writeStringEscapeQuote(String(s.toSqlString()));
          else if (Array.isArray(s)) {
            a.arrayParenthesis && r.writeStringAscii("(");
            for (let n = 0; n < s.length; n++)
              n !== 0 && r.writeStringAscii(","), s[n] == null ? r.writeStringAscii("NULL") : t.writeParam(r, s[n], a, o);
            a.arrayParenthesis && r.writeStringAscii(")");
          } else if (s.type != null && [
            "Point",
            "LineString",
            "Polygon",
            "MultiPoint",
            "MultiLineString",
            "MultiPolygon",
            "GeometryCollection"
          ].includes(s.type)) {
            let n = o.isMariaDB() && o.hasMinVersion(10, 1, 4) || !o.isMariaDB() && o.hasMinVersion(5, 7, 6) ? "ST_" : "";
            switch (s.type) {
              case "Point":
                r.writeStringAscii(
                  n + "PointFromText('POINT(" + t.geoPointToString(s.coordinates) + ")')"
                );
                break;
              case "LineString":
                r.writeStringAscii(
                  n + "LineFromText('LINESTRING(" + t.geoArrayPointToString(s.coordinates) + ")')"
                );
                break;
              case "Polygon":
                r.writeStringAscii(
                  n + "PolygonFromText('POLYGON(" + t.geoMultiArrayPointToString(s.coordinates) + ")')"
                );
                break;
              case "MultiPoint":
                r.writeStringAscii(
                  n + "MULTIPOINTFROMTEXT('MULTIPOINT(" + t.geoArrayPointToString(s.coordinates) + ")')"
                );
                break;
              case "MultiLineString":
                r.writeStringAscii(
                  n + "MLineFromText('MULTILINESTRING(" + t.geoMultiArrayPointToString(s.coordinates) + ")')"
                );
                break;
              case "MultiPolygon":
                r.writeStringAscii(
                  n + "MPolyFromText('MULTIPOLYGON(" + t.geoMultiPolygonToString(s.coordinates) + ")')"
                );
                break;
              case "GeometryCollection":
                r.writeStringAscii(
                  n + "GeomCollFromText('GEOMETRYCOLLECTION(" + t.geometricCollectionToString(s.geometries) + ")')"
                );
                break;
            }
          } else if (String === s.constructor) {
            r.writeStringEscapeQuote(s);
            break;
          } else if (a.permitSetMultiParamEntries) {
            let n = !0;
            for (let c in s) {
              const i = s[c];
              typeof i != "function" && (n ? n = !1 : r.writeStringAscii(","), r.writeString("`" + c + "`"), i == null ? r.writeStringAscii("=NULL") : (r.writeStringAscii("="), t.writeParam(r, i, a, o)));
            }
            n && r.writeStringEscapeQuote(JSON.stringify(s));
          } else
            r.writeStringEscapeQuote(JSON.stringify(s));
          break;
      }
    }
    static geometricCollectionToString(r) {
      if (!r) return "";
      let s = "";
      for (let a = 0; a < r.length; a++)
        switch (s += a !== 0 ? "," : "", r[a].type) {
          case "Point":
            s += `POINT(${t.geoPointToString(r[a].coordinates)})`;
            break;
          case "LineString":
            s += `LINESTRING(${t.geoArrayPointToString(r[a].coordinates)})`;
            break;
          case "Polygon":
            s += `POLYGON(${t.geoMultiArrayPointToString(r[a].coordinates)})`;
            break;
          case "MultiPoint":
            s += `MULTIPOINT(${t.geoArrayPointToString(r[a].coordinates)})`;
            break;
          case "MultiLineString":
            s += `MULTILINESTRING(${t.geoMultiArrayPointToString(r[a].coordinates)})`;
            break;
          case "MultiPolygon":
            s += `MULTIPOLYGON(${t.geoMultiPolygonToString(r[a].coordinates)})`;
            break;
        }
      return s;
    }
    static geoMultiPolygonToString(r) {
      if (!r) return "";
      let s = "";
      for (let a = 0; a < r.length; a++)
        s += (a !== 0 ? ",(" : "(") + t.geoMultiArrayPointToString(r[a]) + ")";
      return s;
    }
    static geoMultiArrayPointToString(r) {
      if (!r) return "";
      let s = "";
      for (let a = 0; a < r.length; a++)
        s += (a !== 0 ? ",(" : "(") + t.geoArrayPointToString(r[a]) + ")";
      return s;
    }
    static geoArrayPointToString(r) {
      if (!r) return "";
      let s = "";
      for (let a = 0; a < r.length; a++)
        s += (a !== 0 ? "," : "") + t.geoPointToString(r[a]);
      return s;
    }
    static geoPointToString(r) {
      return r ? (isNaN(r[0]) ? "" : r[0]) + " " + (isNaN(r[1]) ? "" : r[1]) : "";
    }
    static getLocalDate(r) {
      const s = r.getMilliseconds();
      let a = "'" + r.getFullYear() + "-" + (r.getMonth() + 1) + "-" + r.getDate() + " " + r.getHours() + ":" + r.getMinutes() + ":" + r.getSeconds();
      if (s === 0) return a + "'";
      let o = `${s}`;
      for (; o.length < 3; ) o = "0" + o;
      return a + "." + o + "'";
    }
    static getFixedFormatDate(r) {
      const s = r.getFullYear(), a = r.getMonth() + 1, o = r.getDate(), n = r.getHours(), c = r.getMinutes(), i = r.getSeconds(), l = r.getMilliseconds();
      return "'" + f(s, 4) + "-" + f(a, 2) + "-" + f(o, 2) + " " + f(n, 2) + ":" + f(c, 2) + ":" + f(i, 2) + (l > 0 ? "." + f(l, 3) : "") + "'";
    }
  }
  return hi = t, hi;
}
var Yc;
function Zt() {
  if (Yc) return or;
  Yc = 1;
  const e = "0123456789ABCDEF".split(""), f = qe(), t = Xr(), u = Fh();
  or.log = function(n, c, i, l, _) {
    let d = [];
    if (!c) return "";
    i == null && (i = 0), l == null && (l = c.length);
    let p = new Array(16);
    p[8] = " ";
    let E = _ !== void 0, h = i || 0;
    const N = Math.min(E ? n.debugLen - _.length : n.debugLen, l - h), A = l - h > N;
    let C, g = 0, L = 0;
    if (d.push(
      `+--------------------------------------------------+
|  0  1  2  3  4  5  6  7   8  9  a  b  c  d  e  f |
+--------------------------------------------------+------------------+
`
    ), E)
      for (; L < _.length; )
        g === 0 && d.push("| "), C = _[L++] & 255, d.push(e[C >>> 4], e[C & 15], " "), p[g++] = C > 31 && C < 127 ? String.fromCharCode(C) : ".", g === 8 && d.push(" ");
    for (L = h; L < N + h; )
      g === 0 && d.push("| "), C = c[L] & 255, d.push(e[C >>> 4], e[C & 15], " "), p[g++] = C > 31 && C < 127 ? String.fromCharCode(C) : ".", g === 8 && d.push(" "), g === 16 && (d.push("| ", p.join(""), ` |
`), g = 0), L++;
    let R = g;
    if (R > 0) {
      if (R < 8) {
        for (; R < 8; R++)
          d.push("   "), p[g++] = " ";
        d.push(" ");
      }
      for (; R < 16; R++)
        d.push("   "), p[g++] = " ";
      d.push("| ", p.join(""), A ? ` |...
` : ` |
`);
    } else A && (d[d.length - 1] = ` |...
`);
    return d.push(`+--------------------------------------------------+------------------+
`), d.join("");
  }, or.toHexString = (n) => Array.from(n, (c) => ("0" + (c & 255).toString(16)).slice(-2)).join(""), or.escapeId = (n, c, i) => {
    if (!i || i === "")
      throw f.createError("Cannot escape empty ID value", f.ER_NULL_ESCAPEID, c, "0A000");
    if (i.includes("\0"))
      throw f.createError(
        "Cannot escape ID with null character (u0000)",
        f.ER_NULL_CHAR_ESCAPEID,
        c,
        "0A000"
      );
    return "`" + i.replace(/`/g, "``") + "`";
  };
  const r = (n, c, i) => {
    if (i == null) return "NULL";
    switch (typeof i) {
      case "boolean":
        return i ? "true" : "false";
      case "bigint":
      case "number":
        return `${i}`;
      case "object":
        if (Object.prototype.toString.call(i) === "[object Date]")
          return u.getFixedFormatDate(i);
        if (Buffer.isBuffer(i)) {
          let l;
          return Buffer.isEncoding(c.collation.charset) ? l = i.toString(c.collation.charset, 0, i.length) : l = t.decode(i, c.collation.charset), "_binary'" + o(l) + "'";
        } else {
          if (typeof i.toSqlString == "function")
            return "'" + o(String(i.toSqlString())) + "'";
          if (Array.isArray(i)) {
            let l = n.arrayParenthesis ? "(" : "";
            for (let _ = 0; _ < i.length; _++)
              _ !== 0 && (l += ","), l += r(n, c, i[_]);
            return n.arrayParenthesis && (l += ")"), l;
          } else if (i.type != null && [
            "Point",
            "LineString",
            "Polygon",
            "MultiPoint",
            "MultiLineString",
            "MultiPolygon",
            "GeometryCollection"
          ].includes(i.type)) {
            let l = c && (c.isMariaDB() && c.hasMinVersion(10, 1, 4) || !c.isMariaDB() && c.hasMinVersion(5, 7, 6)) ? "ST_" : "";
            switch (i.type) {
              case "Point":
                return l + "PointFromText('POINT(" + u.geoPointToString(i.coordinates) + ")')";
              case "LineString":
                return l + "LineFromText('LINESTRING(" + u.geoArrayPointToString(i.coordinates) + ")')";
              case "Polygon":
                return l + "PolygonFromText('POLYGON(" + u.geoMultiArrayPointToString(i.coordinates) + ")')";
              case "MultiPoint":
                return l + "MULTIPOINTFROMTEXT('MULTIPOINT(" + u.geoArrayPointToString(i.coordinates) + ")')";
              case "MultiLineString":
                return l + "MLineFromText('MULTILINESTRING(" + u.geoMultiArrayPointToString(i.coordinates) + ")')";
              case "MultiPolygon":
                return l + "MPolyFromText('MULTIPOLYGON(" + u.geoMultiPolygonToString(i.coordinates) + ")')";
              case "GeometryCollection":
                return l + "GeomCollFromText('GEOMETRYCOLLECTION(" + u.geometricCollectionToString(i.geometries) + ")')";
            }
          } else if (n.permitSetMultiParamEntries) {
            let l = "", _ = !0;
            for (let d in i) {
              const p = i[d];
              typeof p != "function" && (_ ? _ = !1 : l += ",", l += "`" + d + "`=", l += this.escape(n, c, p));
            }
            return l === "" ? "'" + o(JSON.stringify(i)) + "'" : l;
          } else
            return "'" + o(JSON.stringify(i)) + "'";
        }
      default:
        return "'" + o(i) + "'";
    }
  }, s = {
    "\0": "\\0",
    "'": "\\'",
    '"': '\\"',
    "\b": "\\b",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t",
    "": "\\Z",
    "\\": "\\\\"
  }, a = /[\000\032"'\\\b\n\r\t]/g, o = (n) => {
    let c = 0, i = "", l;
    for (; l = a.exec(n); )
      i += n.substring(c, l.index), i += s[l[0]], c = a.lastIndex;
    return c === 0 ? n : (c < n.length && (i += n.substring(c)), i);
  };
  return or.escape = r, or;
}
var di, Kc;
function oE() {
  if (Kc) return di;
  Kc = 1;
  const e = Hd(), f = aE(), t = wt(), u = Zt();
  class r {
    constructor(a, o, n, c, i) {
      this.unexpectedPacket = a, this.opts = c, this.receiveQueue = o, this.info = i, this.out = n, this.header = Buffer.allocUnsafe(4), this.headerLen = 0, this.packetLen = null, this.remainingLen = null, this.parts = null, this.partsTotalLen = 0, this.changeEncoding(this.opts.collation ? this.opts.collation : t.fromIndex(224)), this.changeDebug(this.opts.debug), this.opts.on("collation", this.changeEncoding.bind(this)), this.opts.on("debug", this.changeDebug.bind(this));
    }
    changeEncoding(a) {
      this.encoding = a.charset, this.packet = Buffer.isEncoding(this.encoding) ? new e(this.encoding) : new f(this.encoding);
    }
    changeDebug(a) {
      this.receivePacket = a ? this.receivePacketDebug : this.receivePacketBasic;
    }
    receivePacketDebug(a) {
      let o = this.currentCmd();
      if (this.header[0] = this.packetLen, this.header[1] = this.packetLen >> 8, this.header[2] = this.packetLen >> 16, this.header[3] = this.sequenceNo, a && this.opts.logger.network(
        `<== conn:${this.info.threadId ? this.info.threadId : -1} ${o ? o.onPacketReceive ? o.constructor.name + "." + o.onPacketReceive.name : o.constructor.name : "no command"} (${a.pos},${a.end})
${u.log(this.opts, a.buf, a.pos, a.end, this.header)}`
      ), !o) {
        this.unexpectedPacket(a);
        return;
      }
      o.sequenceNo = this.sequenceNo, o.onPacketReceive(a, this.out, this.opts, this.info), o.onPacketReceive || this.receiveQueue.shift();
    }
    receivePacketBasic(a) {
      let o = this.currentCmd();
      if (!o) {
        this.unexpectedPacket(a);
        return;
      }
      o.sequenceNo = this.sequenceNo, o.onPacketReceive(a, this.out, this.opts, this.info), o.onPacketReceive || this.receiveQueue.shift();
    }
    resetHeader() {
      this.remainingLen = null, this.headerLen = 0;
    }
    currentCmd() {
      let a;
      for (; a = this.receiveQueue.peek(); ) {
        if (a.onPacketReceive) return a;
        this.receiveQueue.shift();
      }
      return null;
    }
    onData(a) {
      let o = 0, n;
      const c = a.length;
      do {
        if (this.remainingLen)
          n = this.remainingLen;
        else if (this.headerLen === 0 && c - o >= 4)
          this.packetLen = a[o] + (a[o + 1] << 8) + (a[o + 2] << 16), this.sequenceNo = a[o + 3], o += 4, n = this.packetLen;
        else
          for (n = null; c - o > 0; )
            if (this.header[this.headerLen++] = a[o++], this.headerLen === 4) {
              this.packetLen = this.header[0] + (this.header[1] << 8) + (this.header[2] << 16), this.sequenceNo = this.header[3], n = this.packetLen;
              break;
            }
        if (n)
          if (c - o >= n) {
            if (o += n, this.parts) {
              if (this.parts.push(a.subarray(o - n, o)), this.partsTotalLen += n, this.packetLen < 16777215) {
                let i = Buffer.concat(this.parts, this.partsTotalLen);
                this.parts = null, this.receivePacket(this.packet.update(i, 0, this.partsTotalLen));
              }
            } else if (this.packetLen < 16777215)
              for (this.receivePacket(this.packet.update(a, o - n, o)); o + 4 < c; )
                if (this.packetLen = a[o] + (a[o + 1] << 8) + (a[o + 2] << 16), this.sequenceNo = a[o + 3], o += 4, c - o >= this.packetLen)
                  if (o += this.packetLen, this.packetLen < 16777215)
                    this.receivePacket(this.packet.update(a, o - this.packetLen, o));
                  else {
                    this.parts = [a.subarray(o - this.packetLen, o)], this.partsTotalLen = this.packetLen;
                    break;
                  }
                else {
                  const i = a.subarray(o, c);
                  this.parts ? (this.parts.push(i), this.partsTotalLen += c - o) : (this.parts = [i], this.partsTotalLen = c - o), this.remainingLen = this.packetLen - (c - o);
                  return;
                }
            else
              this.parts = [a.subarray(o - n, o)], this.partsTotalLen = n;
            this.resetHeader();
          } else {
            const i = a.subarray(o, c);
            this.parts ? (this.parts.push(i), this.partsTotalLen += c - o) : (this.parts = [i], this.partsTotalLen = c - o), this.remainingLen = n - (c - o);
            return;
          }
      } while (o < c);
    }
  }
  return di = r, di;
}
var Ei, zc;
function cE() {
  if (zc) return Ei;
  zc = 1;
  const e = Xr(), f = Zt(), t = qe(), u = wt(), r = 39, s = 34, a = 0, o = 92, n = 256, c = 16384, i = 131072, l = 1048576, _ = 16777219, d = /[\000\032"'\\\n\r\t]/g;
  class p {
    constructor(h, N) {
      this.opts = h, this.info = N, this.pos = 4, this.markPos = -1, this.bufContainDataAfterMark = !1, this.cmdLength = 0, this.buf = Buffer.allocUnsafe(n), this.maxAllowedPacket = h.maxAllowedPacket || 16777216, this.maxPacketLength = Math.min(_, this.maxAllowedPacket + 4), this.changeEncoding(this.opts.collation ? this.opts.collation : u.fromIndex(224)), this.changeDebug(this.opts.debug), this.opts.on("collation", this.changeEncoding.bind(this)), this.opts.on("debug", this.changeDebug.bind(this));
    }
    changeEncoding(h) {
      this.encoding = h.charset, this.encoding === "utf8" ? (this.writeString = this.writeDefaultBufferString, this.encodeString = this.encodeNodeString, this.writeLengthEncodedString = this.writeDefaultBufferLengthEncodedString, this.writeStringEscapeQuote = this.writeUtf8StringEscapeQuote) : Buffer.isEncoding(this.encoding) ? (this.writeString = this.writeDefaultBufferString, this.encodeString = this.encodeNodeString, this.writeLengthEncodedString = this.writeDefaultBufferLengthEncodedString, this.writeStringEscapeQuote = this.writeDefaultStringEscapeQuote) : (this.writeString = this.writeDefaultIconvString, this.encodeString = this.encodeIconvString, this.writeLengthEncodedString = this.writeDefaultIconvLengthEncodedString, this.writeStringEscapeQuote = this.writeDefaultStringEscapeQuote);
    }
    changeDebug(h) {
      this.debug = h, this.flushBuffer = h ? this.flushBufferDebug : this.flushBufferBasic, this.fastFlush = h ? this.fastFlushDebug : this.fastFlushBasic;
    }
    setStream(h) {
      this.stream = h;
    }
    growBuffer(h) {
      let N;
      if (h + this.pos < c ? N = c : h + this.pos < i ? N = i : h + this.pos < l ? N = l : this.bufContainDataAfterMark ? N = h + this.pos : N = _, h + this.pos > N && this.markPos !== -1)
        return this.flushBufferStopAtMark(), h + this.pos <= this.buf.length ? void 0 : this.growBuffer(h);
      let A = Buffer.allocUnsafe(N);
      this.buf.copy(A, 0, 0, this.pos), this.buf = A;
    }
    mark() {
      this.markPos = this.pos;
    }
    isMarked() {
      return this.markPos !== -1;
    }
    hasFlushed() {
      return this.cmd.sequenceNo !== -1;
    }
    bufIsDataAfterMark() {
      return this.bufContainDataAfterMark;
    }
    bufIsAfterMaxPacketLength() {
      return this.pos > this.maxPacketLength;
    }
    /**
     * Reset mark flag and send bytes after mark flag.
     *
     * @return buffer after mark flag
     */
    resetMark() {
      if (this.pos = this.markPos, this.markPos = -1, this.bufContainDataAfterMark) {
        const h = Buffer.allocUnsafe(this.pos - 4);
        return this.buf.copy(h, 0, 4, this.pos), this.cmd.sequenceNo = -1, this.cmd.compressSequenceNo = -1, this.bufContainDataAfterMark = !1, h;
      }
      return null;
    }
    /**
     * Send packet to socket.
     *
     * @throws IOException if socket error occur.
     */
    flush() {
      this.flushBuffer(!0, 0), this.buf = Buffer.allocUnsafe(n), this.cmd.sequenceNo = -1, this.cmd.compressSequenceNo = -1, this.cmdLength = 0, this.markPos = -1;
    }
    flushPacket() {
      this.flushBuffer(!1, 0), this.buf = Buffer.allocUnsafe(n), this.cmdLength = 0, this.markPos = -1;
    }
    startPacket(h) {
      this.cmd = h, this.pos = 4;
    }
    writeInt8(h) {
      this.pos + 1 >= this.buf.length && (this.pos >= _ && !this.bufContainDataAfterMark ? this.flushBuffer(!1, 1) : this.growBuffer(1)), this.buf[this.pos++] = h;
    }
    writeInt16(h) {
      if (this.pos + 2 >= this.buf.length) {
        let N = Buffer.allocUnsafe(2);
        N[0] = h, N[1] = h >>> 8, this.writeBuffer(N, 0, 2);
        return;
      }
      this.buf[this.pos] = h, this.buf[this.pos + 1] = h >> 8, this.pos += 2;
    }
    writeInt16AtPos(h) {
      this.buf[h] = this.pos - h - 2, this.buf[h + 1] = this.pos - h - 2 >> 8;
    }
    writeInt24(h) {
      if (this.pos + 3 >= this.buf.length) {
        let N = Buffer.allocUnsafe(3);
        N[0] = h, N[1] = h >> 8, N[2] = h >> 16, this.writeBuffer(N, 0, 3);
        return;
      }
      this.buf[this.pos] = h, this.buf[this.pos + 1] = h >> 8, this.buf[this.pos + 2] = h >> 16, this.pos += 3;
    }
    writeInt32(h) {
      if (this.pos + 4 >= this.buf.length) {
        let N = Buffer.allocUnsafe(4);
        N.writeInt32LE(h, 0), this.writeBuffer(N, 0, 4);
        return;
      }
      this.buf[this.pos] = h, this.buf[this.pos + 1] = h >> 8, this.buf[this.pos + 2] = h >> 16, this.buf[this.pos + 3] = h >> 24, this.pos += 4;
    }
    writeBigInt(h) {
      if (this.pos + 8 >= this.buf.length) {
        let N = Buffer.allocUnsafe(8);
        N.writeBigInt64LE(h, 0), this.writeBuffer(N, 0, 8);
        return;
      }
      this.buf.writeBigInt64LE(h, this.pos), this.pos += 8;
    }
    writeDouble(h) {
      if (this.pos + 8 >= this.buf.length) {
        let N = Buffer.allocUnsafe(8);
        N.writeDoubleLE(h, 0), this.writeBuffer(N, 0, 8);
        return;
      }
      this.buf.writeDoubleLE(h, this.pos), this.pos += 8;
    }
    writeLengthCoded(h) {
      if (h < 251) {
        this.writeInt8(h);
        return;
      }
      h < 65536 ? (this.writeInt8(252), this.writeInt16(h)) : h < 16777216 ? (this.writeInt8(253), this.writeInt24(h)) : (this.writeInt8(254), this.writeBigInt(BigInt(h)));
    }
    writeBuffer(h, N, A) {
      if (A > this.buf.length - this.pos && (this.buf.length !== _ && this.growBuffer(A), A > this.buf.length - this.pos && (this.markPos !== -1 && (this.growBuffer(A), this.markPos !== -1 && this.flushBufferStopAtMark()), A > this.buf.length - this.pos))) {
        let C = A;
        for (; ; ) {
          let g = Math.min(_ - this.pos, C);
          if (h.copy(this.buf, this.pos, N, N + g), C -= g, N += g, this.pos += g, C === 0) return;
          this.flushBuffer(!1, C);
        }
      }
      if (A > 50)
        h.copy(this.buf, this.pos, N, N + A), this.pos += A;
      else
        for (let C = 0; C < A; )
          this.buf[this.pos++] = h[N + C++];
    }
    /**
     * Write ascii string to socket (no escaping)
     *
     * @param str                string
     */
    writeStringAscii(h) {
      let N = h.length;
      if (N >= this.buf.length - this.pos) {
        let A = Buffer.from(h, "ascii");
        this.writeBuffer(A, 0, A.length);
        return;
      }
      for (let A = 0; A < N; )
        this.buf[this.pos++] = h.charCodeAt(A++);
    }
    writeLengthEncodedBuffer(h) {
      const N = h.length;
      this.writeLengthCoded(N), this.writeBuffer(h, 0, N);
    }
    writeUtf8StringEscapeQuote(h) {
      const N = h.length;
      if (N * 3 + 2 >= this.buf.length - this.pos) {
        const g = Buffer.from(h, "utf8");
        this.writeInt8(r), this.writeBufferEscape(g), this.writeInt8(r);
        return;
      }
      let A = 0, C;
      for (this.buf[this.pos++] = r; A < N && (C = h.charCodeAt(A)) < 128; A++)
        (C === o || C === r || C === a || C === s) && (this.buf[this.pos++] = o), this.buf[this.pos++] = C;
      for (; A < N; )
        if (C = h.charCodeAt(A++), C < 128)
          (C === o || C === r || C === a || C === s) && (this.buf[this.pos++] = o), this.buf[this.pos++] = C;
        else if (C < 2048)
          this.buf[this.pos++] = 192 | C >> 6, this.buf[this.pos++] = 128 | C & 63;
        else if (C >= 55296 && C < 57344)
          if (C < 56320)
            if (A + 1 > N)
              this.buf[this.pos++] = 63;
            else {
              const g = h.charCodeAt(A);
              if (g >= 56320 && g < 57344) {
                const L = (C << 10) + g + -56613888;
                this.buf[this.pos++] = 240 | L >> 18, this.buf[this.pos++] = 128 | L >> 12 & 63, this.buf[this.pos++] = 128 | L >> 6 & 63, this.buf[this.pos++] = 128 | L & 63, A++;
              } else
                this.buf[this.pos++] = 63;
            }
          else
            this.buf[this.pos++] = 63;
        else
          this.buf[this.pos++] = 224 | C >> 12, this.buf[this.pos++] = 128 | C >> 6 & 63, this.buf[this.pos++] = 128 | C & 63;
      this.buf[this.pos++] = r;
    }
    encodeIconvString(h) {
      return e.encode(h, this.encoding);
    }
    encodeNodeString(h) {
      return Buffer.from(h, this.encoding);
    }
    writeDefaultBufferString(h) {
      if (h.length * 3 < this.buf.length - this.pos) {
        this.pos += this.buf.write(h, this.pos, this.encoding);
        return;
      }
      let N = Buffer.byteLength(h, this.encoding);
      if (N > this.buf.length - this.pos && (this.buf.length < _ && this.growBuffer(N), N > this.buf.length - this.pos)) {
        let A = Buffer.from(h, this.encoding);
        this.writeBuffer(A, 0, A.length);
        return;
      }
      this.pos += this.buf.write(h, this.pos, this.encoding);
    }
    writeDefaultBufferLengthEncodedString(h) {
      let N = Buffer.byteLength(h, this.encoding);
      if (this.writeLengthCoded(N), N > this.buf.length - this.pos && (this.buf.length < _ && this.growBuffer(N), N > this.buf.length - this.pos)) {
        let A = Buffer.from(h, this.encoding);
        this.writeBuffer(A, 0, A.length);
        return;
      }
      this.pos += this.buf.write(h, this.pos, this.encoding);
    }
    writeDefaultIconvString(h) {
      let N = e.encode(h, this.encoding);
      this.writeBuffer(N, 0, N.length);
    }
    writeDefaultIconvLengthEncodedString(h) {
      let N = e.encode(h, this.encoding);
      this.writeLengthCoded(N.length), this.writeBuffer(N, 0, N.length);
    }
    /**
     * Parameters need to be properly escaped :
     * following characters are to be escaped by "\" :
     * - \0
     * - \\
     * - \'
     * - \"
     * - \032
     * regex split part of string writing part, and escaping special char.
     * Those chars are <= 7f meaning that this will work even with multibyte encoding
     *
     * @param str string to escape.
     */
    writeDefaultStringEscapeQuote(h) {
      this.writeInt8(r);
      let N, A = 0;
      for (; (N = d.exec(h)) !== null; )
        this.writeString(h.slice(A, N.index)), this.writeInt8(o), this.writeInt8(N[0].charCodeAt(0)), A = d.lastIndex;
      if (A === 0) {
        this.writeString(h), this.writeInt8(r);
        return;
      }
      A < h.length && this.writeString(h.slice(A)), this.writeInt8(r);
    }
    writeBinaryDate(h) {
      const N = h.getFullYear(), A = h.getMonth() + 1, C = h.getDate(), g = h.getHours(), L = h.getMinutes(), R = h.getSeconds(), O = h.getMilliseconds();
      let D = O === 0 ? 7 : 11;
      if (D + 1 > this.buf.length - this.pos) {
        let m = Buffer.allocUnsafe(D + 1);
        if (m[0] = D, m[1] = N, m[2] = N >>> 8, m[3] = A, m[4] = C, m[5] = g, m[6] = L, m[7] = R, O !== 0) {
          const B = O * 1e3;
          m[8] = B, m[9] = B >>> 8, m[10] = B >>> 16, m[11] = B >>> 24;
        }
        this.writeBuffer(m, 0, D + 1);
        return;
      }
      if (this.buf[this.pos] = D, this.buf[this.pos + 1] = N, this.buf[this.pos + 2] = N >>> 8, this.buf[this.pos + 3] = A, this.buf[this.pos + 4] = C, this.buf[this.pos + 5] = g, this.buf[this.pos + 6] = L, this.buf[this.pos + 7] = R, O !== 0) {
        const m = O * 1e3;
        this.buf[this.pos + 8] = m, this.buf[this.pos + 9] = m >>> 8, this.buf[this.pos + 10] = m >>> 16, this.buf[this.pos + 11] = m >>> 24;
      }
      this.pos += D + 1;
    }
    writeBufferEscape(h) {
      let N = h.length;
      if (N * 2 > this.buf.length - this.pos && (this.buf.length !== _ && this.growBuffer(N * 2), N * 2 > this.buf.length - this.pos)) {
        for (let A = 0; A < N; A++) {
          switch (h[A]) {
            case r:
            case o:
            case s:
            case a:
              this.pos >= this.buf.length && this.flushBuffer(!1, (N - A) * 2), this.buf[this.pos++] = o;
          }
          this.pos >= this.buf.length && this.flushBuffer(!1, (N - A) * 2), this.buf[this.pos++] = h[A];
        }
        return;
      }
      for (let A = 0; A < N; A++) {
        switch (h[A]) {
          case r:
          case o:
          case s:
          case a:
            this.buf[this.pos++] = o;
        }
        this.buf[this.pos++] = h[A];
      }
    }
    /**
     * Count query size. If query size is greater than max_allowed_packet and nothing has been already
     * send, throw an exception to avoid having the connection closed.
     *
     * @param length additional length to query size
     * @param info current connection information
     * @throws Error if query has not to be sent.
     */
    checkMaxAllowedLength(h, N) {
      return this.opts.maxAllowedPacket && this.cmdLength + h >= this.maxAllowedPacket ? t.createError(
        `query size (${this.cmdLength + h}) is >= to max_allowed_packet (${this.maxAllowedPacket})`,
        t.ER_MAX_ALLOWED_PACKET,
        N
      ) : null;
    }
    /**
     * Indicate if buffer contain any data.
     * @returns {boolean}
     */
    isEmpty() {
      return this.pos <= 4;
    }
    /**
     * Flush the internal buffer.
     */
    flushBufferDebug(h, N) {
      this.pos > 4 && (this.buf[0] = this.pos - 4, this.buf[1] = this.pos - 4 >>> 8, this.buf[2] = this.pos - 4 >>> 16, this.buf[3] = ++this.cmd.sequenceNo, this.stream.writeBuf(this.buf.subarray(0, this.pos), this.cmd), this.stream.flush(!0, this.cmd), this.cmdLength += this.pos - 4, this.opts.logger.network(
        `==> conn:${this.info.threadId ? this.info.threadId : -1} ${this.cmd.constructor.name + "(0," + this.pos + ")"}
${f.log(this.opts, this.buf, 0, this.pos)}`
      ), h && this.pos === _ && this.writeEmptyPacket(), this.buf = this.createBufferWithMinSize(N), this.pos = 4);
    }
    /**
     * Flush to last mark.
     */
    flushBufferStopAtMark() {
      const h = this.pos;
      this.pos = this.markPos;
      const N = Buffer.allocUnsafe(Math.max(n, h + 4 - this.pos));
      this.buf.copy(N, 4, this.markPos, h), this.flushBuffer(!0, h - this.pos), this.cmdLength = 0, this.buf = N, this.pos = 4 + h - this.markPos, this.markPos = -1, this.bufContainDataAfterMark = !0;
    }
    flushBufferBasic(h, N) {
      this.buf[0] = this.pos - 4, this.buf[1] = this.pos - 4 >>> 8, this.buf[2] = this.pos - 4 >>> 16, this.buf[3] = ++this.cmd.sequenceNo, this.stream.writeBuf(this.buf.subarray(0, this.pos), this.cmd), this.stream.flush(!0, this.cmd), this.cmdLength += this.pos - 4, h && this.pos === _ && this.writeEmptyPacket(), this.buf = this.createBufferWithMinSize(N), this.pos = 4;
    }
    createBufferWithMinSize(h) {
      let N;
      return h + 4 < n ? N = n : h + 4 < c ? N = c : h + 4 < i ? N = i : h + 4 < l ? N = l : N = _, Buffer.allocUnsafe(N);
    }
    fastFlushDebug(h, N) {
      this.stream.writeBuf(N, h), this.stream.flush(!0, h), this.cmdLength += N.length, this.opts.logger.network(
        `==> conn:${this.info.threadId ? this.info.threadId : -1} ${h.constructor.name + "(0," + N.length + ")"}
${f.log(this.opts, N, 0, N.length)}`
      ), this.cmdLength = 0, this.markPos = -1;
    }
    fastFlushBasic(h, N) {
      this.stream.writeBuf(N, h), this.stream.flush(!0, h), this.cmdLength = 0, this.markPos = -1;
    }
    writeEmptyPacket() {
      const h = Buffer.from([0, 0, 0, ++this.cmd.sequenceNo]);
      this.debug && this.opts.logger.network(
        `==> conn:${this.info.threadId ? this.info.threadId : -1} ${this.cmd.constructor.name}(0,4)
${f.log(
          this.opts,
          h,
          0,
          4
        )}`
      ), this.stream.writeBuf(h, this.cmd), this.stream.flush(!0, this.cmd), this.cmdLength = 0;
    }
  }
  return Ei = p, Ei;
}
var Ai, Xc;
function uE() {
  if (Xc) return Ai;
  Xc = 1;
  const e = Fn, f = Zt();
  class t {
    constructor(r, s, a, o) {
      this.reader = r, this.receiveQueue = s, this.info = o, this.opts = a, this.header = Buffer.allocUnsafe(7), this.headerLen = 0, this.compressPacketLen = null, this.packetLen = null, this.remainingLen = null, this.parts = null, this.partsTotalLen = 0;
    }
    receivePacket(r) {
      let s = this.currentCmd();
      if (this.opts.debugCompress && this.opts.logger.network(
        `<== conn:${this.info.threadId ? this.info.threadId : -1} ${s ? s.onPacketReceive ? s.constructor.name + "." + s.onPacketReceive.name : s.constructor.name : "no command"} (compress)
${f.log(this.opts, r, 0, r.length, this.header)}`
      ), s && (s.compressSequenceNo = this.header[3]), (this.header[4] | this.header[5] << 8 | this.header[6] << 16) === 0)
        this.reader.onData(r);
      else {
        const o = e.inflateSync(r);
        this.reader.onData(o);
      }
    }
    currentCmd() {
      let r;
      for (; r = this.receiveQueue.peek(); ) {
        if (r.onPacketReceive) return r;
        this.receiveQueue.shift();
      }
      return null;
    }
    resetHeader() {
      this.remainingLen = null, this.headerLen = 0;
    }
    onData(r) {
      let s = 0, a;
      const o = r.length;
      do {
        if (this.remainingLen)
          a = this.remainingLen;
        else if (this.headerLen === 0 && o - s >= 7)
          this.header[0] = r[s], this.header[1] = r[s + 1], this.header[2] = r[s + 2], this.header[3] = r[s + 3], this.header[4] = r[s + 4], this.header[5] = r[s + 5], this.header[6] = r[s + 6], this.headerLen = 7, s += 7, this.compressPacketLen = this.header[0] + (this.header[1] << 8) + (this.header[2] << 16), this.packetLen = this.header[4] | this.header[5] << 8 | this.header[6] << 16, this.packetLen === 0 && (this.packetLen = this.compressPacketLen), a = this.compressPacketLen;
        else
          for (a = null; o - s > 0; )
            if (this.header[this.headerLen++] = r[s++], this.headerLen === 7) {
              this.compressPacketLen = this.header[0] + (this.header[1] << 8) + (this.header[2] << 16), this.packetLen = this.header[4] | this.header[5] << 8 | this.header[6] << 16, this.packetLen === 0 && (this.packetLen = this.compressPacketLen), a = this.compressPacketLen;
              break;
            }
        if (a)
          if (o - s >= a) {
            const n = r.subarray(s, s + a);
            if (s += a, this.parts) {
              if (this.parts.push(n), this.partsTotalLen += a, this.compressPacketLen < 16777215) {
                let c = Buffer.concat(this.parts, this.partsTotalLen);
                this.parts = null, this.receivePacket(c);
              }
            } else
              this.compressPacketLen < 16777215 ? this.receivePacket(n) : (this.parts = [n], this.partsTotalLen = a);
            this.resetHeader();
          } else {
            const n = r.subarray(s, o);
            this.parts ? (this.parts.push(n), this.partsTotalLen += o - s) : (this.parts = [n], this.partsTotalLen = o - s), this.remainingLen = a - (o - s);
            return;
          }
      } while (s < o);
    }
  }
  return Ai = t, Ai;
}
var pi, Qc;
function lE() {
  if (Qc) return pi;
  Qc = 1;
  const e = Zt(), f = Fn, t = 2048, u = 131072, r = 1048576, s = 16777222;
  class a {
    /**
     * Constructor
     *
     * @param socket    current socket
     * @param opts      current connection options
     * @param info      current connection information
     * @constructor
     */
    constructor(n, c, i) {
      this.info = i, this.opts = c, this.pos = 7, this.header = Buffer.allocUnsafe(7), this.buf = Buffer.allocUnsafe(t), this.writer = (l) => {
        n.write(l);
      };
    }
    growBuffer(n) {
      let c;
      n + this.pos < u ? c = u : n + this.pos < r ? c = r : c = s;
      let i = Buffer.allocUnsafe(c);
      this.buf.copy(i, 0, 0, this.pos), this.buf = i;
    }
    writeBuf(n, c) {
      let i = 0, l = n.length;
      if (n instanceof Uint8Array && (n = Buffer.from(n)), l > this.buf.length - this.pos && (this.buf.length !== s && this.growBuffer(l), l > this.buf.length - this.pos)) {
        let _ = l;
        for (; ; ) {
          let d = Math.min(s - this.pos, _);
          if (n.copy(this.buf, this.pos, i, i + d), _ -= d, i += d, this.pos += d, _ === 0) return;
          this.flush(!1, c, _);
        }
      }
      n.copy(this.buf, this.pos, i, i + l), this.pos += l;
    }
    /**
     * Flush the internal buffer.
     */
    flush(n, c, i) {
      if (this.pos < 1536)
        this.buf[0] = this.pos - 7, this.buf[1] = this.pos - 7 >>> 8, this.buf[2] = this.pos - 7 >>> 16, this.buf[3] = ++c.compressSequenceNo, this.buf[4] = 0, this.buf[5] = 0, this.buf[6] = 0, this.opts.debugCompress && this.opts.logger.network(
          `==> conn:${this.info.threadId ? this.info.threadId : -1} ${c ? c.constructor.name + "(0," + this.pos + ")" : "unknown"} (compress)
${e.log(this.opts, this.buf, 0, this.pos)}`
        ), this.writer(this.buf.subarray(0, this.pos));
      else {
        const l = f.deflateSync(this.buf.subarray(7, this.pos)), _ = l.length;
        this.header[0] = _, this.header[1] = _ >>> 8, this.header[2] = _ >>> 16, this.header[3] = ++c.compressSequenceNo, this.header[4] = this.pos - 7, this.header[5] = this.pos - 7 >>> 8, this.header[6] = this.pos - 7 >>> 16, this.opts.debugCompress && this.opts.logger.network(
          `==> conn:${this.info.threadId ? this.info.threadId : -1} ${c ? c.constructor.name + "(0," + this.pos + "=>" + _ + ")" : "unknown"} (compress)
${e.log(this.opts, l, 0, _, this.header)}`
        ), this.writer(this.header), this.writer(l), n && _ === s && this.writeEmptyPacket(c), this.header = Buffer.allocUnsafe(7);
      }
      this.buf = i ? a.allocateBuffer(i) : Buffer.allocUnsafe(t), this.pos = 7;
    }
    static allocateBuffer(n) {
      return n + 4 < t ? Buffer.allocUnsafe(t) : n + 4 < u ? Buffer.allocUnsafe(u) : n + 4 < r ? Buffer.allocUnsafe(r) : Buffer.allocUnsafe(s);
    }
    writeEmptyPacket(n) {
      const c = Buffer.from([0, 0, 0, n.compressSequenceNo, 0, 0, 0]);
      this.opts.debugCompress && this.opts.logger.network(
        `==> conn:${this.info.threadId ? this.info.threadId : -1} ${n ? n.constructor.name + "(0," + this.pos + ")" : "unknown"} (compress)
${e.log(this.opts, c, 0, 7)}`
      ), this.writer(c);
    }
  }
  return pi = a, pi;
}
var et = {}, Jc;
function hr() {
  return Jc || (Jc = 1, et.STATUS_IN_TRANS = 1, et.STATUS_AUTOCOMMIT = 2, et.MORE_RESULTS_EXISTS = 8, et.QUERY_NO_GOOD_INDEX_USED = 16, et.QUERY_NO_INDEX_USED = 32, et.STATUS_CURSOR_EXISTS = 64, et.STATUS_LAST_ROW_SENT = 128, et.STATUS_DB_DROPPED = 256, et.STATUS_NO_BACKSLASH_ESCAPES = 512, et.STATUS_METADATA_CHANGED = 1024, et.QUERY_WAS_SLOW = 2048, et.PS_OUT_PARAMS = 4096, et.STATUS_IN_TRANS_READONLY = 8192, et.SESSION_STATE_CHANGED = 16384), et;
}
var Ii, Zc;
function Mh() {
  var f;
  if (Zc) return Ii;
  Zc = 1;
  class e {
    constructor(u, r) {
      Oe(this, f);
      this.threadId = -1, this.status = null, this.serverVersion = null, this.serverCapabilities = null, this.database = u.database, this.port = u.port, Ne(this, f, r), this.redirectRequest = null;
    }
    hasMinVersion(u, r, s) {
      if (!this.serverVersion) throw new Error("cannot know if server version until connection is established");
      if (!u) throw new Error("a major version must be set");
      r || (r = 0), s || (s = 0);
      let a = this.serverVersion;
      return a.major > u || a.major === u && a.minor > r || a.major === u && a.minor === r && a.patch >= s;
    }
    redirect(u, r) {
      return T(this, f).call(this, u, r);
    }
    isMariaDB() {
      if (!this.serverVersion) throw new Error("cannot know if server is MariaDB until connection is established");
      return this.serverVersion.mariaDb;
    }
    /**
     * Parse raw info to set server major/minor/patch values
     * @param info
     */
    static parseVersionString(u) {
      let r, s = 0, a = 0, o = 0;
      for (; s < u.serverVersion.raw.length; s++)
        if (r = u.serverVersion.raw.charCodeAt(s), r < 48 || r > 57) {
          switch (a) {
            case 0:
              u.serverVersion.major = o;
              break;
            case 1:
              u.serverVersion.minor = o;
              break;
            case 2:
              u.serverVersion.patch = o;
              return;
          }
          a++, o = 0;
        } else
          o = o * 10 + r - 48;
      a === 2 && (u.serverVersion.patch = o);
    }
  }
  return f = new WeakMap(), Ii = e, Ii;
}
var Be = {}, eu;
function Ht() {
  return eu || (eu = 1, Be.MYSQL = 1n, Be.FOUND_ROWS = 2n, Be.LONG_FLAG = 4n, Be.CONNECT_WITH_DB = 8n, Be.NO_SCHEMA = 1n << 4n, Be.COMPRESS = 1n << 5n, Be.ODBC = 1n << 6n, Be.LOCAL_FILES = 1n << 7n, Be.IGNORE_SPACE = 1n << 8n, Be.PROTOCOL_41 = 1n << 9n, Be.INTERACTIVE = 1n << 10n, Be.SSL = 1n << 11n, Be.IGNORE_SIGPIPE = 1n << 12n, Be.TRANSACTIONS = 1n << 13n, Be.RESERVED = 1n << 14n, Be.SECURE_CONNECTION = 1n << 15n, Be.MULTI_STATEMENTS = 1n << 16n, Be.MULTI_RESULTS = 1n << 17n, Be.PS_MULTI_RESULTS = 1n << 18n, Be.PLUGIN_AUTH = 1n << 19n, Be.CONNECT_ATTRS = 1n << 20n, Be.PLUGIN_AUTH_LENENC_CLIENT_DATA = 1n << 21n, Be.CAN_HANDLE_EXPIRED_PASSWORDS = 1n << 22n, Be.SESSION_TRACK = 1n << 23n, Be.DEPRECATE_EOF = 1n << 24n, Be.SSL_VERIFY_SERVER_CERT = 1n << 30n, Be.MARIADB_CLIENT_STMT_BULK_OPERATIONS = 1n << 34n, Be.MARIADB_CLIENT_EXTENDED_TYPE_INFO = 1n << 35n, Be.MARIADB_CLIENT_CACHE_METADATA = 1n << 36n), Be;
}
var Ni, tu;
function vn() {
  if (tu) return Ni;
  tu = 1;
  const e = wt(), f = /mariadb:\/\/(([^/@:]+)?(:([^/]+))?@)?(([^/:]+)(:([0-9]+))?)\/([^?]+)(\?(.*))?$/;
  class t {
    constructor(r) {
      if (typeof r == "string" && (r = t.parse(r)), r || (r = {}), this.host = r.host || "localhost", this.port = r.port || 3306, this.keepEof = r.keepEof || !1, this.user = r.user || process.env.USERNAME, this.password = r.password, this.database = r.database, this.stream = r.stream, this.debug = r.debug || !1, this.debugCompress = r.debugCompress || !1, this.debugLen = r.debugLen || 256, this.logParam = r.logParam === void 0 ? !0 : r.logParam === !0, r.logger ? typeof r.logger == "function" ? this.logger = {
        network: r.logger,
        query: r.logger,
        error: r.logger,
        warning: r.logger
      } : (this.logger = {
        network: r.logger.network,
        query: r.logger.query,
        error: r.logger.error,
        warning: r.logger.warning || console.log
      }, r.logger.logParam !== void 0 && (this.logParam = r.logger.logParam)) : this.logger = {
        network: this.debug || this.debugCompress ? console.log : null,
        query: null,
        error: null,
        warning: console.log
      }, this.debug = !!this.logger.network, r.charset && typeof r.charset == "string")
        this.collation = e.fromCharset(r.charset.toLowerCase()), this.collation === void 0 && (this.collation = e.fromName(r.charset.toUpperCase()), this.collation !== void 0 ? this.logger.warning(
          "warning: please use option 'collation' in replacement of 'charset' when using a collation name ('" + r.charset + `')
(collation looks like 'UTF8MB4_UNICODE_CI', charset like 'utf8').`
        ) : this.charset = r.charset);
      else if (r.collation && typeof r.collation == "string") {
        if (this.collation = e.fromName(r.collation.toUpperCase()), this.collation === void 0) throw new RangeError("Unknown collation '" + r.collation + "'");
      } else
        this.collation = r.charsetNumber ? e.fromIndex(r.charsetNumber) : void 0;
      if (this.permitRedirect = r.permitRedirect === void 0 ? !0 : r.permitRedirect, this.initSql = r.initSql, this.connectTimeout = r.connectTimeout === void 0 ? 1e3 : r.connectTimeout, this.connectAttributes = r.connectAttributes || !1, this.compress = r.compress || !1, this.rsaPublicKey = r.rsaPublicKey, this.cachingRsaPublicKey = r.cachingRsaPublicKey, this.allowPublicKeyRetrieval = r.allowPublicKeyRetrieval || !1, this.forceVersionCheck = r.forceVersionCheck || !1, this.maxAllowedPacket = r.maxAllowedPacket, this.permitConnectionWhenExpired = r.permitConnectionWhenExpired || !1, this.pipelining = r.pipelining, this.timezone = r.timezone || "local", this.socketPath = r.socketPath, this.sessionVariables = r.sessionVariables, this.infileStreamFactory = r.infileStreamFactory, this.ssl = r.ssl, r.ssl && typeof r.ssl != "boolean" && typeof r.ssl != "string" && (this.ssl.rejectUnauthorized = r.ssl.rejectUnauthorized !== !1), this.queryTimeout = r.queryTimeout === void 0 ? 0 : r.queryTimeout, this.socketTimeout = r.socketTimeout === void 0 ? 0 : r.socketTimeout, this.keepAliveDelay = r.keepAliveDelay === void 0 ? 0 : r.keepAliveDelay, r.keepAliveDelay || r.enableKeepAlive === !0 && r.keepAliveInitialDelay !== void 0 && (this.keepAliveDelay = r.keepAliveInitialDelay), this.trace = r.trace || !1, this.checkDuplicate = r.checkDuplicate === void 0 ? !0 : r.checkDuplicate, this.dateStrings = r.dateStrings || !1, this.foundRows = r.foundRows === void 0 || r.foundRows, this.metaAsArray = r.metaAsArray || !1, this.metaEnumerable = r.metaEnumerable || !1, this.multipleStatements = r.multipleStatements || !1, this.namedPlaceholders = r.namedPlaceholders || !1, this.nestTables = r.nestTables, this.autoJsonMap = r.autoJsonMap === void 0 ? !0 : r.autoJsonMap, this.jsonStrings = r.jsonStrings || !1, r.jsonStrings !== void 0 && (this.autoJsonMap = !this.jsonStrings), this.bitOneIsBoolean = r.bitOneIsBoolean === void 0 ? !0 : r.bitOneIsBoolean, this.arrayParenthesis = r.arrayParenthesis || !1, this.permitSetMultiParamEntries = r.permitSetMultiParamEntries || !1, this.rowsAsArray = r.rowsAsArray || !1, this.typeCast = r.typeCast, this.typeCast !== void 0 && typeof this.typeCast != "function" && (this.typeCast = void 0), this.bulk = r.bulk === void 0 || r.bulk, this.checkNumberRange = r.checkNumberRange || !1, r.pipelining === void 0)
        this.permitLocalInfile = r.permitLocalInfile || !1, this.pipelining = !this.permitLocalInfile;
      else {
        if (this.pipelining = r.pipelining, r.permitLocalInfile === !0 && this.pipelining)
          throw new Error(
            "enabling options `permitLocalInfile` and `pipelining` is not possible, options are incompatible."
          );
        this.permitLocalInfile = this.pipelining ? !1 : r.permitLocalInfile || !1;
      }
      if (this.prepareCacheLength = r.prepareCacheLength === void 0 ? 256 : r.prepareCacheLength, this.restrictedAuth = r.restrictedAuth, this.restrictedAuth != null && (Array.isArray(this.restrictedAuth) || (this.restrictedAuth = this.restrictedAuth.split(","))), this.bigIntAsNumber = r.bigIntAsNumber || !1, this.insertIdAsNumber = r.insertIdAsNumber || !1, this.decimalAsNumber = r.decimalAsNumber || !1, this.supportBigNumbers = r.supportBigNumbers || !1, this.bigNumberStrings = r.bigNumberStrings || !1, this.maxAllowedPacket && !Number.isInteger(this.maxAllowedPacket))
        throw new RangeError("maxAllowedPacket must be an integer. was '" + this.maxAllowedPacket + "'");
    }
    /**
     * When parsing from String, correcting type.
     *
     * @param opts options
     * @return {opts}
     */
    static parseOptionDataType(r) {
      return r.bulk && (r.bulk = r.bulk === "true"), r.allowPublicKeyRetrieval && (r.allowPublicKeyRetrieval = r.allowPublicKeyRetrieval === "true"), r.insertIdAsNumber && (r.insertIdAsNumber = r.insertIdAsNumber === "true"), r.decimalAsNumber && (r.decimalAsNumber = r.decimalAsNumber === "true"), r.bigIntAsNumber && (r.bigIntAsNumber = r.bigIntAsNumber === "true"), r.charsetNumber && !isNaN(Number.parseInt(r.charsetNumber)) && (r.charsetNumber = Number.parseInt(r.charsetNumber)), r.permitRedirect && (r.permitRedirect = r.permitRedirect === "true"), r.logParam && (r.logParam = r.logParam === "true"), r.compress && (r.compress = r.compress === "true"), r.connectAttributes && (r.connectAttributes = JSON.parse(r.connectAttributes)), r.connectTimeout && (r.connectTimeout = parseInt(r.connectTimeout)), r.keepAliveDelay && (r.keepAliveDelay = parseInt(r.keepAliveDelay)), r.socketTimeout && (r.socketTimeout = parseInt(r.socketTimeout)), r.dateStrings && (r.dateStrings = r.dateStrings === "true"), r.debug && (r.debug = r.debug === "true"), r.autoJsonMap && (r.autoJsonMap = r.autoJsonMap === "true"), r.arrayParenthesis && (r.arrayParenthesis = r.arrayParenthesis === "true"), r.checkDuplicate && (r.checkDuplicate = r.checkDuplicate === "true"), r.debugCompress && (r.debugCompress = r.debugCompress === "true"), r.debugLen && (r.debugLen = parseInt(r.debugLen)), r.prepareCacheLength && (r.prepareCacheLength = parseInt(r.prepareCacheLength)), r.queryTimeout && (r.queryTimeout = parseInt(r.queryTimeout)), r.foundRows && (r.foundRows = r.foundRows === "true"), r.maxAllowedPacket && !isNaN(Number.parseInt(r.maxAllowedPacket)) && (r.maxAllowedPacket = parseInt(r.maxAllowedPacket)), r.metaAsArray && (r.metaAsArray = r.metaAsArray === "true"), r.metaEnumerable && (r.metaEnumerable = r.metaEnumerable === "true"), r.multipleStatements && (r.multipleStatements = r.multipleStatements === "true"), r.namedPlaceholders && (r.namedPlaceholders = r.namedPlaceholders === "true"), r.nestTables && (r.nestTables = r.nestTables === "true"), r.permitSetMultiParamEntries && (r.permitSetMultiParamEntries = r.permitSetMultiParamEntries === "true"), r.pipelining && (r.pipelining = r.pipelining === "true"), r.forceVersionCheck && (r.forceVersionCheck = r.forceVersionCheck === "true"), r.rowsAsArray && (r.rowsAsArray = r.rowsAsArray === "true"), r.trace && (r.trace = r.trace === "true"), r.ssl && (r.ssl === "true" || r.ssl === "false") && (r.ssl = r.ssl === "true"), r.bitOneIsBoolean && (r.bitOneIsBoolean = r.bitOneIsBoolean === "true"), r.jsonStrings && (r.jsonStrings = r.jsonStrings === "true"), r.enableKeepAlive && (r.enableKeepAlive = r.enableKeepAlive === "true"), r.keepAliveInitialDelay && (r.keepAliveInitialDelay = parseInt(r.keepAliveInitialDelay)), r;
    }
    static parse(r) {
      const s = r.match(f);
      if (!s)
        throw new Error(
          `error parsing connection string '${r}'. format must be 'mariadb://[<user>[:<password>]@]<host>[:<port>]/[<db>[?<opt1>=<value1>[&<opt2>=<value2>]]]'`
        );
      const a = {
        user: s[2] ? decodeURIComponent(s[2]) : void 0,
        password: s[4] ? decodeURIComponent(s[4]) : void 0,
        host: s[6] ? decodeURIComponent(s[6]) : s[6],
        port: s[8] ? parseInt(s[8]) : void 0,
        database: s[9] ? decodeURIComponent(s[9]) : s[9]
      }, o = s[11];
      return o && o.split("&").forEach(function(c) {
        const i = c.indexOf("=");
        if (i !== 1) {
          let l = c.substring(i + 1);
          l = l ? decodeURIComponent(l) : void 0, a[c.substring(0, i)] = l;
        }
      }), this.parseOptionDataType(a);
    }
  }
  return Ni = t, Ni;
}
var Si, ru;
function er() {
  if (ru) return Si;
  ru = 1;
  const e = St, f = qe();
  class t extends e {
    constructor(r, s, a) {
      super(), this.cmdParam = r, this.sequenceNo = -1, this.compressSequenceNo = -1, this.resolve = s, this.reject = a, this.sending = !1, this.unexpectedError = this.throwUnexpectedError.bind(this);
    }
    displaySql() {
      return null;
    }
    /**
     * Throw an unexpected error.
     * server exchange will still be read to keep connection in a good state, but promise will be rejected.
     *
     * @param msg message
     * @param fatal is error fatal for connection
     * @param info current server state information
     * @param sqlState error sqlState
     * @param errno error number
     */
    throwUnexpectedError(r, s, a, o, n) {
      const c = f.createError(
        r,
        n,
        a,
        o,
        this.opts && this.opts.logParam ? this.displaySql() : this.sql,
        s,
        this.cmdParam ? this.cmdParam.stack : null,
        !1
      );
      return this.reject && (process.nextTick(this.reject, c), this.resolve = null, this.reject = null), c;
    }
    /**
     * Create and throw new Error from error information
     * only first called throwing an error or successfully end will be executed.
     *
     * @param msg message
     * @param fatal is error fatal for connection
     * @param info current server state information
     * @param sqlState error sqlState
     * @param errno error number
     */
    throwNewError(r, s, a, o, n) {
      this.onPacketReceive = null;
      const c = this.throwUnexpectedError(r, s, a, o, n);
      return this.emit("end"), c;
    }
    /**
     * When command cannot be sent due to error.
     * (this is only on start command)
     *
     * @param msg error message
     * @param errno error number
     * @param info connection information
     */
    sendCancelled(r, s, a) {
      const o = f.createError(r, s, a, "HY000", this.opts.logParam ? this.displaySql() : this.sql);
      this.emit("send_end"), this.throwError(o, a);
    }
    /**
     * Throw Error
     *  only first called throwing an error or successfully end will be executed.
     *
     * @param err error to be thrown
     * @param info current server state information
     */
    throwError(r, s) {
      this.onPacketReceive = null, this.reject && (this.cmdParam && this.cmdParam.stack && (r = f.createError(
        r.text ? r.text : r.message,
        r.errno,
        s,
        r.sqlState,
        r.sql,
        r.fatal,
        this.cmdParam.stack,
        !1
      )), this.resolve = null, process.nextTick(this.reject, r), this.reject = null), this.emit("end", r);
    }
    /**
     * Successfully end command.
     * only first called throwing an error or successfully end will be executed.
     *
     * @param val return value.
     */
    successEnd(r) {
      this.onPacketReceive = null, this.resolve && (this.reject = null, process.nextTick(this.resolve, r), this.resolve = null), this.emit("end");
    }
  }
  return Si = t, Si;
}
var Ri, nu;
function Gt() {
  if (nu) return Ri;
  nu = 1;
  const e = er();
  class f extends e {
    constructor(u, r, s) {
      super(u, r, s), this.onPacketReceive = r;
    }
    permitHash() {
      return !0;
    }
    hash(u) {
      return null;
    }
  }
  return Ri = f, Ri;
}
var Ci, iu;
function _E() {
  if (iu) return Ci;
  iu = 1;
  const e = Ht(), f = wt(), t = Mh();
  class u {
    constructor(s, a) {
      s.skip(1), a.serverVersion = {}, a.serverVersion.raw = s.readStringNullEnded(), a.threadId = s.readUInt32();
      let o = s.readBuffer(8);
      s.skip(1);
      let n = BigInt(s.readUInt16());
      a.collation = f.fromIndex(s.readUInt8()), a.status = s.readUInt16(), n += BigInt(s.readUInt16()) << 16n;
      let c = 0;
      if (n & e.PLUGIN_AUTH ? c = Math.max(12, s.readUInt8() - 9) : s.skip(1), n & e.MYSQL ? s.skip(10) : (s.skip(6), n += BigInt(s.readUInt32()) << 32n), n & e.SECURE_CONNECTION) {
        let i = s.readBuffer(c);
        a.seed = Buffer.concat([o, i]);
      } else
        a.seed = o;
      s.skip(1), a.serverCapabilities = n, a.serverVersion.raw.startsWith("5.5.5-") ? (a.serverVersion.mariaDb = !0, a.serverVersion.raw = a.serverVersion.raw.substring(6)) : a.serverVersion.mariaDb = a.serverVersion.raw.includes("MariaDB") || (n & e.MYSQL) === 0n, n & e.PLUGIN_AUTH ? this.pluginName = s.readStringNullEnded() : this.pluginName = "", t.parseVersionString(a);
    }
  }
  return Ci = u, Ci;
}
var Ti = {}, su;
function fE() {
  if (su) return Ti;
  su = 1;
  const e = Ht();
  return Ti.init = function(f, t) {
    let u = e.IGNORE_SPACE | e.PROTOCOL_41 | e.TRANSACTIONS | e.SECURE_CONNECTION | e.MULTI_RESULTS | e.PS_MULTI_RESULTS | e.SESSION_TRACK | e.CONNECT_ATTRS | e.PLUGIN_AUTH_LENENC_CLIENT_DATA | e.MARIADB_CLIENT_EXTENDED_TYPE_INFO | e.PLUGIN_AUTH;
    f.foundRows && (u |= e.FOUND_ROWS), f.permitLocalInfile && (u |= e.LOCAL_FILES), f.multipleStatements && (u |= e.MULTI_STATEMENTS), t.eofDeprecated = !f.keepEof && (t.serverCapabilities & e.DEPRECATE_EOF) > 0, t.eofDeprecated && (u |= e.DEPRECATE_EOF), f.database && t.serverCapabilities & e.CONNECT_WITH_DB && (u |= e.CONNECT_WITH_DB), t.serverPermitSkipMeta = (t.serverCapabilities & e.MARIADB_CLIENT_CACHE_METADATA) > 0, t.serverPermitSkipMeta && (u |= e.MARIADB_CLIENT_CACHE_METADATA), f.compress && (t.serverCapabilities & e.COMPRESS ? u |= e.COMPRESS : f.compress = !1), f.bulk && t.serverCapabilities & e.MARIADB_CLIENT_STMT_BULK_OPERATIONS && (u |= e.MARIADB_CLIENT_STMT_BULK_OPERATIONS), f.permitConnectionWhenExpired && (u |= e.CAN_HANDLE_EXPIRED_PASSWORDS), t.clientCapabilities = u & t.serverCapabilities;
  }, Ti;
}
var gi = {}, au;
function hE() {
  if (au) return gi;
  au = 1;
  const e = Ht();
  return gi.send = function(t, u, r, s) {
    u.startPacket(t), u.writeInt32(Number(r.clientCapabilities & BigInt(4294967295))), u.writeInt32(1024 * 1024 * 1024), u.writeInt8(s.collation && s.collation.index <= 255 ? s.collation.index : 224);
    for (let a = 0; a < 19; a++)
      u.writeInt8(0);
    r.serverCapabilities & e.MYSQL ? u.writeInt32(0) : u.writeInt32(Number(r.clientCapabilities >> 32n)), u.flushPacket();
  }, gi;
}
var mi, ou;
function $o() {
  if (ou) return mi;
  ou = 1;
  const e = Gt(), f = ot;
  class t extends e {
    constructor(r, s, a, o, n, c) {
      super(o, c, n), this.pluginData = a, this.sequenceNo = r, this.compressSequenceNo = s;
    }
    start(r, s, a) {
      const o = this.pluginData.slice(0, 20);
      let n = t.encryptSha1Password(s.password, o);
      r.startPacket(this), n.length > 0 ? (r.writeBuffer(n, 0, n.length), r.flushPacket()) : r.writeEmptyPacket(!0), this.emit("send_end");
    }
    static encryptSha1Password(r, s) {
      if (!r) return Buffer.alloc(0);
      let a = f.createHash("sha1"), o = a.update(r, "utf8").digest();
      a = f.createHash("sha1");
      let n = a.update(o).digest();
      a = f.createHash("sha1"), a.update(s), a.update(n);
      let c = a.digest(), i = Buffer.allocUnsafe(c.length);
      for (let l = 0; l < c.length; l++)
        i[l] = o[l] ^ c[l];
      return i;
    }
    permitHash() {
      return !0;
    }
    hash(r) {
      let s = f.createHash("sha1"), a = s.update(r.password, "utf8").digest();
      return s = f.createHash("sha1"), s.update(a).digest();
    }
  }
  return mi = t, mi;
}
var Oi, cu;
function dE() {
  if (cu) return Oi;
  cu = 1;
  const e = Gt(), f = _E(), t = fE(), u = Ht(), r = hE(), s = qe(), a = $o(), o = Nt, n = Xr(), c = ot, i = xn.version;
  class l extends e {
    constructor(d, p, E, h) {
      super(null, E, h), this.sequenceNo = 0, this.compressSequenceNo = 0, this.auth = d, this.getSocket = p, this.counter = 0, this.onPacketReceive = this.parseHandshakeInit;
    }
    start(d, p, E) {
    }
    parseHandshakeInit(d, p, E, h) {
      if (d.peek() === 255) {
        const A = d.readError(h);
        return A.fatal = !0, this.throwError(A, h);
      }
      let N = new f(d, h);
      if (t.init(E, h), this.pluginName = N.pluginName, E.ssl)
        if (h.serverCapabilities & u.SSL)
          h.clientCapabilities |= u.SSL, r.send(this, p, h, E), this.auth._createSecureContext(h, () => {
            const A = this.getSocket();
            h.selfSignedCertificate = !A.authorized, h.tlsAuthorizationError = A.authorizationError;
            const C = A.getPeerCertificate(!1);
            h.tlsCert = C, h.tlsFingerprint = C ? C.fingerprint256.replace(/:/gi, "").toLowerCase() : null, l.send.call(this, this, p, E, N.pluginName, h);
          });
        else
          return this.throwNewError(
            "Trying to connect with ssl, but ssl not enabled in the server",
            !0,
            h,
            "08S01",
            s.ER_SERVER_SSL_DISABLED
          );
      else
        l.send(this, p, E, N.pluginName, h);
      this.onPacketReceive = this.auth.handshakeResult.bind(this.auth);
    }
    permitHash() {
      return this.pluginName !== "mysql_clear_password";
    }
    hash(d) {
      let p = c.createHash("sha1"), E = p.update(d.password, "utf8").digest();
      return p = c.createHash("sha1"), p.update(E).digest();
    }
    /**
     * Send Handshake response packet
     * see https://mariadb.com/kb/en/library/1-connecting-connecting/#handshake-response-packet
     *
     * @param cmd         current handshake command
     * @param out         output writer
     * @param opts        connection options
     * @param pluginName  plugin name
     * @param info        connection information
     */
    static send(d, p, E, h, N) {
      p.startPacket(d), N.defaultPluginName = h;
      const A = Array.isArray(E.password) ? E.password[0] : E.password;
      let C, g;
      switch (h) {
        case "mysql_clear_password":
          C = Buffer.from(A), g = "mysql_clear_password";
          break;
        default:
          C = a.encryptSha1Password(A, N.seed), g = "mysql_native_password";
          break;
      }
      p.writeInt32(Number(N.clientCapabilities & BigInt(4294967295))), p.writeInt32(1024 * 1024 * 1024), p.writeInt8(E.collation && E.collation.index <= 255 ? E.collation.index : 224);
      for (let L = 0; L < 19; L++)
        p.writeInt8(0);
      if (p.writeInt32(Number(N.clientCapabilities >> 32n)), p.writeString(E.user || ""), p.writeInt8(0), N.serverCapabilities & u.PLUGIN_AUTH_LENENC_CLIENT_DATA ? (p.writeLengthCoded(C.length), p.writeBuffer(C, 0, C.length)) : N.serverCapabilities & u.SECURE_CONNECTION ? (p.writeInt8(C.length), p.writeBuffer(C, 0, C.length)) : (p.writeBuffer(C, 0, C.length), p.writeInt8(0)), N.clientCapabilities & u.CONNECT_WITH_DB && (p.writeString(E.database), p.writeInt8(0), N.database = E.database), N.clientCapabilities & u.PLUGIN_AUTH && (p.writeString(g), p.writeInt8(0)), N.clientCapabilities & u.CONNECT_ATTRS) {
        p.writeInt8(252);
        let L = p.pos;
        p.writeInt16(0);
        const R = N.collation ? N.collation.charset : "utf8";
        l.writeAttribute(p, "_client_name", R), l.writeAttribute(p, "MariaDB connector/Node", R), l.writeAttribute(p, "_client_version", R), l.writeAttribute(p, i, R);
        const O = d.getSocket().address().address;
        if (O && (l.writeAttribute(p, "_server_host", R), l.writeAttribute(p, O, R)), l.writeAttribute(p, "_os", R), l.writeAttribute(p, process.platform, R), l.writeAttribute(p, "_client_host", R), l.writeAttribute(p, o.hostname(), R), l.writeAttribute(p, "_node_version", R), l.writeAttribute(p, process.versions.node, R), E.connectAttributes !== !0) {
          let D = Object.keys(E.connectAttributes);
          for (let m = 0; m < D.length; ++m)
            l.writeAttribute(p, D[m], R), l.writeAttribute(p, E.connectAttributes[D[m]], R);
        }
        p.writeInt16AtPos(L);
      }
      p.flushPacket();
    }
    static writeAttribute(d, p, E) {
      let h = Buffer.isEncoding(E) ? Buffer.from(p, E) : n.encode(p, E);
      d.writeLengthCoded(h.length), d.writeBuffer(h, 0, h.length);
    }
  }
  return Oi = l, Oi;
}
var Lt = {}, uu;
function xh() {
  return uu || (uu = 1, Lt.SESSION_TRACK_SYSTEM_VARIABLES = 0, Lt.SESSION_TRACK_SCHEMA = 1, Lt.SESSION_TRACK_STATE_CHANGE = 2, Lt.SESSION_TRACK_GTIDS = 3, Lt.SESSION_TRACK_TRANSACTION_CHARACTERISTICS = 4, Lt.SESSION_TRACK_TRANSACTION_STATE = 5), Lt;
}
var wi, lu;
function EE() {
  if (lu) return wi;
  lu = 1;
  const e = Gt();
  class f extends e {
    constructor(u, r, s, a, o, n) {
      super(a, n, o), this.sequenceNo = u, this.compressSequenceNo = r, this.counter = 0, this.multiAuthResolver = n;
    }
    start(u, r, s) {
      u.startPacket(this);
      const a = r.password;
      a && (Array.isArray(a) ? u.writeString(a[this.counter++]) : u.writeString(a)), u.writeInt8(0), u.flushPacket(), this.onPacketReceive = this.response;
    }
    response(u, r, s, a) {
      switch (u.peek()) {
        //*********************************************************************************************************
        //* OK_Packet and Err_Packet ending packet
        //*********************************************************************************************************
        case 0:
        case 255:
          return this.emit("send_end"), this.multiAuthResolver(u, r, s, a);
        default:
          u.readBuffer(), r.startPacket(this), r.writeString("password"), r.writeInt8(0), r.flushPacket();
      }
    }
  }
  return wi = f, wi;
}
var Pi, _u;
function Bh() {
  if (_u) return Pi;
  _u = 1;
  const e = Gt(), f = ot;
  class t extends e {
    constructor(M, F, I, w, x, V) {
      super(w, V, x), this.pluginData = I, this.sequenceNo = M, this.compressSequenceNo = F;
    }
    start(M, F, I) {
      const w = this.pluginData, x = t.encryptPassword(F.password, w);
      M.startPacket(this), M.writeBuffer(x, 0, x.length), M.flushPacket(), this.emit("send_end");
    }
    static encryptPassword(M, F) {
      if (!M) return Buffer.alloc(0);
      let I, w, x = [u(), u(), u(), u()];
      const V = Buffer.alloc(96), z = Buffer.from(M);
      let j = f.createHash("sha512");
      const J = j.update(z).digest();
      for (J[0] &= 248, J[31] &= 127, J[31] |= 64, I = 0; I < 32; I++) V[64 + I] = F[I];
      for (I = 0; I < 32; I++) V[32 + I] = J[32 + I];
      j = f.createHash("sha512");
      const fe = j.update(V.subarray(32, 96)).digest();
      i(fe), _(x, fe), h(V, x), x = [u(), u(), u(), u()], _(x, J);
      const Ce = Buffer.alloc(32);
      for (h(Ce, x), I = 32; I < 64; I++) V[I] = Ce[I - 32];
      j = f.createHash("sha512");
      const b = j.update(V).digest();
      i(b);
      const k = new Float64Array(64);
      for (I = 0; I < 64; I++) k[I] = 0;
      for (I = 0; I < 32; I++) k[I] = fe[I];
      for (I = 0; I < 32; I++)
        for (w = 0; w < 32; w++)
          k[I + w] += b[I] * J[w];
      return l(V.subarray(32), k), V.subarray(0, 64);
    }
    permitHash() {
      return !0;
    }
    hash(M) {
      let F, I = [u(), u(), u(), u()];
      const w = Buffer.alloc(96), x = Buffer.from(M.password);
      let V = f.createHash("sha512");
      const z = V.update(x).digest();
      for (z[0] &= 248, z[31] &= 127, z[31] |= 64, F = 0; F < 32; F++) w[64 + F] = seed[F];
      for (F = 0; F < 32; F++) w[32 + F] = z[32 + F];
      V = f.createHash("sha512");
      const j = V.update(w.subarray(32, 96)).digest();
      return i(j), _(I, j), j;
    }
  }
  const u = function(v) {
    const M = new Float64Array(16);
    if (v) for (let F = 0; F < v.length; F++) M[F] = v[F];
    return M;
  }, r = u(), s = u([1]), a = u([
    61785,
    9906,
    39828,
    60374,
    45398,
    33411,
    5274,
    224,
    53552,
    61171,
    33010,
    6542,
    64743,
    22239,
    55772,
    9222
  ]), o = u([
    54554,
    36645,
    11616,
    51542,
    42930,
    38181,
    51040,
    26924,
    56412,
    64982,
    57905,
    49316,
    21502,
    52590,
    14035,
    8553
  ]), n = u([
    26200,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214
  ]), c = new Float64Array([
    237,
    211,
    245,
    92,
    26,
    99,
    18,
    88,
    214,
    156,
    247,
    162,
    222,
    249,
    222,
    20,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    16
  ]);
  function i(v) {
    const M = new Float64Array(64);
    let F;
    for (F = 0; F < 64; F++) M[F] = v[F];
    for (F = 0; F < 64; F++) v[F] = 0;
    l(v, M);
  }
  function l(v, M) {
    let F, I, w, x;
    for (I = 63; I >= 32; --I) {
      for (F = 0, w = I - 32, x = I - 12; w < x; ++w)
        M[w] += F - 16 * M[I] * c[w - (I - 32)], F = M[w] + 128 >> 8, M[w] -= F * 256;
      M[w] += F, M[I] = 0;
    }
    for (F = 0, w = 0; w < 32; w++)
      M[w] += F - (M[31] >> 4) * c[w], F = M[w] >> 8, M[w] &= 255;
    for (w = 0; w < 32; w++) M[w] -= F * c[w];
    for (I = 0; I < 32; I++)
      M[I + 1] += M[I] >> 8, v[I] = M[I] & 255;
  }
  function _(v, M) {
    const F = [u(), u(), u(), u()];
    d(F[0], o), d(F[1], n), d(F[2], s), p(F[3], o, n), E(v, F, M);
  }
  function d(v, M) {
    for (let F = 0; F < 16; F++) v[F] = M[F] | 0;
  }
  function p(v, M, F) {
    let I, w, x = 0, V = 0, z = 0, j = 0, J = 0, fe = 0, Ce = 0, b = 0, k = 0, W = 0, X = 0, U = 0, P = 0, K = 0, $ = 0, he = 0, de = 0, Se = 0, Re = 0, me = 0, be = 0, Ue = 0, ke = 0, Ye = 0, $e = 0, S = 0, ne = 0, ce = 0, Te = 0, ie = 0, q = 0;
    const H = F[0], Y = F[1], te = F[2], ee = F[3], ae = F[4], ue = F[5], pe = F[6], y = F[7], Z = F[8], re = F[9], se = F[10], oe = F[11], le = F[12], Ie = F[13], Ae = F[14], _e = F[15];
    I = M[0], x += I * H, V += I * Y, z += I * te, j += I * ee, J += I * ae, fe += I * ue, Ce += I * pe, b += I * y, k += I * Z, W += I * re, X += I * se, U += I * oe, P += I * le, K += I * Ie, $ += I * Ae, he += I * _e, I = M[1], V += I * H, z += I * Y, j += I * te, J += I * ee, fe += I * ae, Ce += I * ue, b += I * pe, k += I * y, W += I * Z, X += I * re, U += I * se, P += I * oe, K += I * le, $ += I * Ie, he += I * Ae, de += I * _e, I = M[2], z += I * H, j += I * Y, J += I * te, fe += I * ee, Ce += I * ae, b += I * ue, k += I * pe, W += I * y, X += I * Z, U += I * re, P += I * se, K += I * oe, $ += I * le, he += I * Ie, de += I * Ae, Se += I * _e, I = M[3], j += I * H, J += I * Y, fe += I * te, Ce += I * ee, b += I * ae, k += I * ue, W += I * pe, X += I * y, U += I * Z, P += I * re, K += I * se, $ += I * oe, he += I * le, de += I * Ie, Se += I * Ae, Re += I * _e, I = M[4], J += I * H, fe += I * Y, Ce += I * te, b += I * ee, k += I * ae, W += I * ue, X += I * pe, U += I * y, P += I * Z, K += I * re, $ += I * se, he += I * oe, de += I * le, Se += I * Ie, Re += I * Ae, me += I * _e, I = M[5], fe += I * H, Ce += I * Y, b += I * te, k += I * ee, W += I * ae, X += I * ue, U += I * pe, P += I * y, K += I * Z, $ += I * re, he += I * se, de += I * oe, Se += I * le, Re += I * Ie, me += I * Ae, be += I * _e, I = M[6], Ce += I * H, b += I * Y, k += I * te, W += I * ee, X += I * ae, U += I * ue, P += I * pe, K += I * y, $ += I * Z, he += I * re, de += I * se, Se += I * oe, Re += I * le, me += I * Ie, be += I * Ae, Ue += I * _e, I = M[7], b += I * H, k += I * Y, W += I * te, X += I * ee, U += I * ae, P += I * ue, K += I * pe, $ += I * y, he += I * Z, de += I * re, Se += I * se, Re += I * oe, me += I * le, be += I * Ie, Ue += I * Ae, ke += I * _e, I = M[8], k += I * H, W += I * Y, X += I * te, U += I * ee, P += I * ae, K += I * ue, $ += I * pe, he += I * y, de += I * Z, Se += I * re, Re += I * se, me += I * oe, be += I * le, Ue += I * Ie, ke += I * Ae, Ye += I * _e, I = M[9], W += I * H, X += I * Y, U += I * te, P += I * ee, K += I * ae, $ += I * ue, he += I * pe, de += I * y, Se += I * Z, Re += I * re, me += I * se, be += I * oe, Ue += I * le, ke += I * Ie, Ye += I * Ae, $e += I * _e, I = M[10], X += I * H, U += I * Y, P += I * te, K += I * ee, $ += I * ae, he += I * ue, de += I * pe, Se += I * y, Re += I * Z, me += I * re, be += I * se, Ue += I * oe, ke += I * le, Ye += I * Ie, $e += I * Ae, S += I * _e, I = M[11], U += I * H, P += I * Y, K += I * te, $ += I * ee, he += I * ae, de += I * ue, Se += I * pe, Re += I * y, me += I * Z, be += I * re, Ue += I * se, ke += I * oe, Ye += I * le, $e += I * Ie, S += I * Ae, ne += I * _e, I = M[12], P += I * H, K += I * Y, $ += I * te, he += I * ee, de += I * ae, Se += I * ue, Re += I * pe, me += I * y, be += I * Z, Ue += I * re, ke += I * se, Ye += I * oe, $e += I * le, S += I * Ie, ne += I * Ae, ce += I * _e, I = M[13], K += I * H, $ += I * Y, he += I * te, de += I * ee, Se += I * ae, Re += I * ue, me += I * pe, be += I * y, Ue += I * Z, ke += I * re, Ye += I * se, $e += I * oe, S += I * le, ne += I * Ie, ce += I * Ae, Te += I * _e, I = M[14], $ += I * H, he += I * Y, de += I * te, Se += I * ee, Re += I * ae, me += I * ue, be += I * pe, Ue += I * y, ke += I * Z, Ye += I * re, $e += I * se, S += I * oe, ne += I * le, ce += I * Ie, Te += I * Ae, ie += I * _e, I = M[15], he += I * H, de += I * Y, Se += I * te, Re += I * ee, me += I * ae, be += I * ue, Ue += I * pe, ke += I * y, Ye += I * Z, $e += I * re, S += I * se, ne += I * oe, ce += I * le, Te += I * Ie, ie += I * Ae, q += I * _e, x += 38 * de, V += 38 * Se, z += 38 * Re, j += 38 * me, J += 38 * be, fe += 38 * Ue, Ce += 38 * ke, b += 38 * Ye, k += 38 * $e, W += 38 * S, X += 38 * ne, U += 38 * ce, P += 38 * Te, K += 38 * ie, $ += 38 * q, w = 1, I = x + w + 65535, w = Math.floor(I / 65536), x = I - w * 65536, I = V + w + 65535, w = Math.floor(I / 65536), V = I - w * 65536, I = z + w + 65535, w = Math.floor(I / 65536), z = I - w * 65536, I = j + w + 65535, w = Math.floor(I / 65536), j = I - w * 65536, I = J + w + 65535, w = Math.floor(I / 65536), J = I - w * 65536, I = fe + w + 65535, w = Math.floor(I / 65536), fe = I - w * 65536, I = Ce + w + 65535, w = Math.floor(I / 65536), Ce = I - w * 65536, I = b + w + 65535, w = Math.floor(I / 65536), b = I - w * 65536, I = k + w + 65535, w = Math.floor(I / 65536), k = I - w * 65536, I = W + w + 65535, w = Math.floor(I / 65536), W = I - w * 65536, I = X + w + 65535, w = Math.floor(I / 65536), X = I - w * 65536, I = U + w + 65535, w = Math.floor(I / 65536), U = I - w * 65536, I = P + w + 65535, w = Math.floor(I / 65536), P = I - w * 65536, I = K + w + 65535, w = Math.floor(I / 65536), K = I - w * 65536, I = $ + w + 65535, w = Math.floor(I / 65536), $ = I - w * 65536, I = he + w + 65535, w = Math.floor(I / 65536), he = I - w * 65536, x += w - 1 + 37 * (w - 1), w = 1, I = x + w + 65535, w = Math.floor(I / 65536), x = I - w * 65536, I = V + w + 65535, w = Math.floor(I / 65536), V = I - w * 65536, I = z + w + 65535, w = Math.floor(I / 65536), z = I - w * 65536, I = j + w + 65535, w = Math.floor(I / 65536), j = I - w * 65536, I = J + w + 65535, w = Math.floor(I / 65536), J = I - w * 65536, I = fe + w + 65535, w = Math.floor(I / 65536), fe = I - w * 65536, I = Ce + w + 65535, w = Math.floor(I / 65536), Ce = I - w * 65536, I = b + w + 65535, w = Math.floor(I / 65536), b = I - w * 65536, I = k + w + 65535, w = Math.floor(I / 65536), k = I - w * 65536, I = W + w + 65535, w = Math.floor(I / 65536), W = I - w * 65536, I = X + w + 65535, w = Math.floor(I / 65536), X = I - w * 65536, I = U + w + 65535, w = Math.floor(I / 65536), U = I - w * 65536, I = P + w + 65535, w = Math.floor(I / 65536), P = I - w * 65536, I = K + w + 65535, w = Math.floor(I / 65536), K = I - w * 65536, I = $ + w + 65535, w = Math.floor(I / 65536), $ = I - w * 65536, I = he + w + 65535, w = Math.floor(I / 65536), he = I - w * 65536, x += w - 1 + 37 * (w - 1), v[0] = x, v[1] = V, v[2] = z, v[3] = j, v[4] = J, v[5] = fe, v[6] = Ce, v[7] = b, v[8] = k, v[9] = W, v[10] = X, v[11] = U, v[12] = P, v[13] = K, v[14] = $, v[15] = he;
  }
  function E(v, M, F) {
    let I, w;
    for (d(v[0], r), d(v[1], s), d(v[2], s), d(v[3], r), w = 255; w >= 0; --w)
      I = F[w / 8 | 0] >> (w & 7) & 1, R(v, M, I), m(M, v), m(v, v), R(v, M, I);
  }
  function h(v, M) {
    const F = u(), I = u(), w = u();
    N(w, M[2]), p(F, M[0], w), p(I, M[1], w), L(v, I), v[31] ^= C(F) << 7;
  }
  function N(v, M) {
    const F = u();
    let I;
    for (I = 0; I < 16; I++) F[I] = M[I];
    for (I = 253; I >= 0; I--)
      A(F, F), I !== 2 && I !== 4 && p(F, F, M);
    for (I = 0; I < 16; I++) v[I] = F[I];
  }
  function A(v, M) {
    p(v, M, M);
  }
  function C(v) {
    const M = new Uint8Array(32);
    return L(M, v), M[0] & 1;
  }
  function g(v) {
    let M, F, I = 1;
    for (M = 0; M < 16; M++)
      F = v[M] + I + 65535, I = Math.floor(F / 65536), v[M] = F - I * 65536;
    v[0] += I - 1 + 37 * (I - 1);
  }
  function L(v, M) {
    let F, I, w;
    const x = u(), V = u();
    for (F = 0; F < 16; F++) V[F] = M[F];
    for (g(V), g(V), g(V), I = 0; I < 2; I++) {
      for (x[0] = V[0] - 65517, F = 1; F < 15; F++)
        x[F] = V[F] - 65535 - (x[F - 1] >> 16 & 1), x[F - 1] &= 65535;
      x[15] = V[15] - 32767 - (x[14] >> 16 & 1), w = x[15] >> 16 & 1, x[14] &= 65535, B(V, x, 1 - w);
    }
    for (F = 0; F < 16; F++)
      v[2 * F] = V[F] & 255, v[2 * F + 1] = V[F] >> 8;
  }
  function R(v, M, F) {
    for (let I = 0; I < 4; I++)
      B(v[I], M[I], F);
  }
  function O(v, M, F) {
    for (let I = 0; I < 16; I++) v[I] = M[I] + F[I];
  }
  function D(v, M, F) {
    for (let I = 0; I < 16; I++) v[I] = M[I] - F[I];
  }
  function m(v, M) {
    const F = u(), I = u(), w = u(), x = u(), V = u(), z = u(), j = u(), J = u(), fe = u();
    D(F, v[1], v[0]), D(fe, M[1], M[0]), p(F, F, fe), O(I, v[0], v[1]), O(fe, M[0], M[1]), p(I, I, fe), p(w, v[3], M[3]), p(w, w, a), p(x, v[2], M[2]), O(x, x, x), D(V, I, F), D(z, x, w), O(j, x, w), O(J, I, F), p(v[0], V, z), p(v[1], J, j), p(v[2], j, z), p(v[3], V, J);
  }
  function B(v, M, F) {
    const I = ~(F - 1);
    let w;
    for (let x = 0; x < 16; x++)
      w = I & (v[x] ^ M[x]), v[x] ^= w, M[x] ^= w;
  }
  return Pi = t, Pi;
}
var Di, fu;
function AE() {
  if (fu) return Di;
  fu = 1;
  const e = Gt(), f = ot, t = qe();
  class u extends e {
    constructor(a, o, n, c, i, l) {
      super(c, l, i), this.multiAuthResolver = l, this.pluginData = n, this.sequenceNo = a, this.compressSequenceNo = o;
    }
    start(a, o, n) {
      n.extSalt ? (this.parseExtSalt(Buffer.from(n.extSalt, "hex"), n), this.sendScramble(a, o, n)) : (a.startPacket(this), a.writeEmptyPacket(!0), this.onPacketReceive = this.requestForSalt);
    }
    requestForSalt(a, o, n, c) {
      this.parseExtSalt(a.readBufferRemaining(), c), this.sendScramble(o, n, c);
    }
    parseExtSalt(a, o) {
      if (a.length < 2 || a[0] !== 80 || a[1] > 3)
        return this.throwError(
          t.createFatalError("Wrong parsec authentication format", t.ER_AUTHENTICATION_BAD_PACKET, o),
          o
        );
      this.iterations = a[1], this.salt = a.slice(2);
    }
    sendScramble(a, o, n) {
      const c = f.pbkdf2Sync(o.password || "", this.salt, 1024 << this.iterations, 32, "sha512"), i = r(c), l = f.randomBytes(32), _ = Buffer.concat([this.pluginData, l]), d = f.sign(null, _, i);
      a.startPacket(this), a.writeBuffer(l, 0, 32), a.writeBuffer(d, 0, 64), a.flushPacket(), this.emit("send_end"), this.onPacketReceive = this.multiAuthResolver;
    }
  }
  const r = (s) => {
    const a = Buffer.from("302e020100300506032b657004220420", "hex"), o = Buffer.concat([a, s]);
    return f.createPrivateKey({ key: o, format: "der", type: "pkcs8" });
  };
  return Di = u, Di;
}
var Ui, hu;
function pE() {
  if (hu) return Ui;
  hu = 1;
  const e = Gt();
  class f extends e {
    constructor(u, r, s, a, o, n) {
      super(a, n, o), this.pluginData = s, this.sequenceNo = u, this.compressSequenceNo = r, this.counter = 0, this.multiAuthResolver = n;
    }
    start(u, r, s) {
      this.exchange(this.pluginData, u, r, s), this.onPacketReceive = this.response;
    }
    exchange(u, r, s, a) {
      r.startPacket(this);
      let o;
      Array.isArray(s.password) ? (o = s.password[this.counter], this.counter++) : o = s.password, o && r.writeString(o), r.writeInt8(0), r.flushPacket();
    }
    response(u, r, s, a) {
      switch (u.peek()) {
        //*********************************************************************************************************
        //* OK_Packet and Err_Packet ending packet
        //*********************************************************************************************************
        case 0:
        case 255:
          return this.emit("send_end"), this.multiAuthResolver(u, r, s, a);
        default:
          let n = u.readBuffer();
          this.exchange(n, r, s, a), this.onPacketReceive = this.response;
      }
    }
  }
  return Ui = f, Ui;
}
var Li, du;
function kh() {
  if (du) return Li;
  du = 1;
  const e = Gt(), f = ze, t = ot, u = qe(), r = ot;
  class s extends e {
    constructor(o, n, c, i, l, _) {
      super(i, _, l), this.pluginData = c, this.sequenceNo = o, this.compressSequenceNo = n, this.counter = 0, this.counter = 0, this.initialState = !0, this.multiAuthResolver = _;
    }
    start(o, n, c) {
      this.exchange(this.pluginData, o, n, c), this.onPacketReceive = this.response;
    }
    exchange(o, n, c, i) {
      if (this.initialState) {
        if (c.password)
          if (c.ssl) {
            n.startPacket(this), c.password && n.writeString(c.password), n.writeInt8(0), n.flushPacket();
            return;
          } else if (c.rsaPublicKey)
            try {
              let l = c.rsaPublicKey;
              l.includes("-----BEGIN") || (l = f.readFileSync(l, "utf8")), this.publicKey = s.retrievePublicKey(l);
            } catch (l) {
              return this.throwError(l, i);
            }
          else {
            if (!c.allowPublicKeyRetrieval)
              return this.throwError(
                u.createFatalError(
                  "RSA public key is not available client side. Either set option `rsaPublicKey` to indicate public key path, or allow public key retrieval with option `allowPublicKeyRetrieval`",
                  u.ER_CANNOT_RETRIEVE_RSA_KEY,
                  i
                ),
                i
              );
            this.initialState = !1, n.startPacket(this), n.writeInt8(1), n.flushPacket();
            return;
          }
        else {
          n.startPacket(this), n.writeEmptyPacket(!0);
          return;
        }
        s.sendSha256PwdPacket(this, this.pluginData, this.publicKey, c.password, n);
      } else
        this.publicKey = s.retrievePublicKey(o.toString("utf8", 1)), s.sendSha256PwdPacket(this, this.pluginData, this.publicKey, c.password, n);
    }
    static retrievePublicKey(o) {
      return o.replace("(-+BEGIN PUBLIC KEY-+\\r?\\n|\\n?-+END PUBLIC KEY-+\\r?\\n?)", "");
    }
    static sendSha256PwdPacket(o, n, c, i, l) {
      const _ = n.slice(0, n.length - 1);
      l.startPacket(o);
      const d = s.encrypt(_, i, c);
      l.writeBuffer(d, 0, d.length), l.flushPacket();
    }
    static encryptSha256Password(o, n) {
      if (!o) return Buffer.alloc(0);
      let c = r.createHash("sha256"), i = c.update(o, "utf8").digest();
      c = r.createHash("sha256");
      let l = c.update(i).digest();
      c = r.createHash("sha256"), c.update(l), c.update(n);
      let _ = c.digest(), d = Buffer.allocUnsafe(_.length);
      for (let p = 0; p < _.length; p++)
        d[p] = i[p] ^ _[p];
      return d;
    }
    // encrypt password with public key
    static encrypt(o, n, c) {
      const i = Buffer.from(n + "\0"), l = Buffer.allocUnsafe(i.length), _ = o.length;
      for (let d = 0; d < l.length; d++)
        l[d] = i[d] ^ o[d % _];
      return t.publicEncrypt({ key: c, padding: t.constants.RSA_PKCS1_OAEP_PADDING }, l);
    }
    response(o, n, c, i) {
      switch (o.peek()) {
        //*********************************************************************************************************
        //* OK_Packet and Err_Packet ending packet
        //*********************************************************************************************************
        case 0:
        case 255:
          return this.emit("send_end"), this.multiAuthResolver(o, n, c, i);
        default:
          let _ = o.readBufferRemaining();
          this.exchange(_, n, c, i), this.onPacketReceive = this.response;
      }
    }
  }
  return Li = s, Li;
}
var bi, Eu;
function IE() {
  if (Eu) return bi;
  Eu = 1;
  const e = Gt(), f = ze, t = qe(), u = kh(), r = {
    INIT: "INIT",
    FAST_AUTH_RESULT: "FAST_AUTH_RESULT",
    REQUEST_SERVER_KEY: "REQUEST_SERVER_KEY",
    SEND_AUTH: "SEND_AUTH"
  };
  class s extends e {
    constructor(o, n, c, i, l, _) {
      super(i, _, l), this.multiAuthResolver = _, this.pluginData = c, this.sequenceNo = o, this.compressSequenceNo = n, this.counter = 0, this.state = r.INIT;
    }
    start(o, n, c) {
      this.exchange(this.pluginData, o, n, c), this.onPacketReceive = this.response;
    }
    exchange(o, n, c, i) {
      switch (this.state) {
        case r.INIT:
          const l = this.pluginData.slice(0, this.pluginData.length - 1), _ = u.encryptSha256Password(c.password, l);
          n.startPacket(this), _.length > 0 ? (n.writeBuffer(_, 0, _.length), n.flushPacket()) : n.writeEmptyPacket(!0), this.state = r.FAST_AUTH_RESULT;
          return;
        case r.FAST_AUTH_RESULT:
          switch (o[1]) {
            case 3:
              return;
            case 4:
              if (c.ssl) {
                n.startPacket(this), n.writeString(c.password), n.writeInt8(0), n.flushPacket();
                return;
              }
              if (c.cachingRsaPublicKey) {
                try {
                  let p = c.cachingRsaPublicKey;
                  p.includes("-----BEGIN") || (p = f.readFileSync(p, "utf8")), this.publicKey = u.retrievePublicKey(p);
                } catch (p) {
                  return this.throwError(p, i);
                }
                u.sendSha256PwdPacket(this, this.pluginData, this.publicKey, c.password, n);
              } else {
                if (!c.allowPublicKeyRetrieval)
                  return this.throwError(
                    t.createFatalError(
                      "RSA public key is not available client side. Either set option `cachingRsaPublicKey` to indicate public key path, or allow public key retrieval with option `allowPublicKeyRetrieval`",
                      t.ER_CANNOT_RETRIEVE_RSA_KEY,
                      i
                    ),
                    i
                  );
                this.state = r.REQUEST_SERVER_KEY, n.startPacket(this), n.writeInt8(2), n.flushPacket();
              }
          }
          return;
        case r.REQUEST_SERVER_KEY:
          this.publicKey = u.retrievePublicKey(o.toString(void 0, 1)), this.state = r.SEND_AUTH, u.sendSha256PwdPacket(this, this.pluginData, this.publicKey, c.password, n);
          return;
      }
    }
    response(o, n, c, i) {
      switch (o.peek()) {
        //*********************************************************************************************************
        //* OK_Packet and Err_Packet ending packet
        //*********************************************************************************************************
        case 0:
        case 255:
          return this.emit("send_end"), this.multiAuthResolver(o, n, c, i);
        default:
          let _ = o.readBufferRemaining();
          this.exchange(_, n, c, i), this.onPacketReceive = this.response;
      }
    }
  }
  return bi = s, bi;
}
var yi, Au;
function Hh() {
  if (Au) return yi;
  Au = 1;
  const e = er(), f = qe(), t = Ht(), u = dE(), r = hr(), s = xh(), a = wt(), o = ot, n = Zt(), c = Dh, i = {
    mysql_native_password: $o(),
    mysql_clear_password: EE(),
    client_ed25519: Bh(),
    parsec: AE(),
    dialog: pE(),
    sha256_password: kh(),
    caching_sha2_password: IE()
  };
  class l extends e {
    constructor(d, p, E, h, N) {
      super(d, p, E), this.cmdParam = d, this._createSecureContext = h, this.getSocket = N, this.plugin = new u(this, N, this.handshakeResult, E);
    }
    onPacketReceive(d, p, E, h) {
      this.plugin.sequenceNo = this.sequenceNo, this.plugin.compressSequenceNo = this.compressSequenceNo, this.plugin.onPacketReceive(d, p, E, h);
    }
    /**
     * Fast-path handshake results :
     *  - if plugin was the one expected by server, server will send OK_Packet / ERR_Packet.
     *  - if not, server send an AuthSwitchRequest packet, indicating the specific PLUGIN to use with this user.
     *    dispatching to plugin handler then.
     *
     * @param packet    current packet
     * @param out       output buffer
     * @param opts      options
     * @param info      connection info
     * @returns {*}     return null if authentication succeed, depending on plugin conversation if not finished
     */
    handshakeResult(d, p, E, h) {
      const N = d.peek();
      switch (N) {
        //*********************************************************************************************************
        //* AuthSwitchRequest packet
        //*********************************************************************************************************
        case 254:
          this.dispatchAuthSwitchRequest(d, p, E, h);
          return;
        //*********************************************************************************************************
        //* OK_Packet - authentication succeeded
        //*********************************************************************************************************
        case 0:
          if (this.plugin.onPacketReceive = null, d.skip(1), d.skipLengthCodedNumber(), d.skipLengthCodedNumber(), h.status = d.readUInt16(), h.requireValidCert) {
            if (h.selfSignedCertificate) {
              if (d.skip(2), d.remaining()) {
                const g = d.readBufferLengthEncoded();
                if (g.length > 0) {
                  if (!this.plugin.permitHash() || !this.cmdParam.opts.password || this.cmdParam.opts.password === "")
                    return this.throwNewError(
                      "Self signed certificates. Either set `ssl: { rejectUnauthorized: false }` (trust mode) or provide server certificate to client",
                      !0,
                      h,
                      "08000",
                      f.ER_SELF_SIGNED_NO_PWD
                    );
                  if (this.validateFingerPrint(g, h))
                    return this.successEnd();
                }
              }
              return this.throwNewError("self-signed certificate", !0, h, "08000", f.ER_SELF_SIGNED);
            } else if (h.requireIdentifyCheck) {
              const g = c.checkServerIdentity(E.host, h.tlsCert);
              if (g)
                return this.throwNewError(
                  "certificate identify Error: " + g.message,
                  !0,
                  h,
                  "08000",
                  f.ER_TLS_IDENTITY_ERROR
                );
            }
          }
          let A = !1;
          if (h.status & r.SESSION_STATE_CHANGED)
            for (d.skip(2), d.skipLengthCodedNumber(); d.remaining(); ) {
              const g = d.readUnsignedLength();
              if (g > 0) {
                const L = d.subPacketLengthEncoded(g);
                for (; L.remaining(); )
                  switch (L.readUInt8()) {
                    case s.SESSION_TRACK_SYSTEM_VARIABLES:
                      let O;
                      do {
                        O = L.subPacketLengthEncoded(L.readUnsignedLength());
                        const m = O.readStringLengthEncoded(), B = O.readStringLengthEncoded();
                        switch (m) {
                          case "character_set_client":
                            if (h.collation = a.fromCharset(B), h.collation === void 0) {
                              this.throwError(new Error("unknown charset : '" + B + "'"), h);
                              return;
                            }
                            E.emit("collation", h.collation);
                            break;
                          case "redirect_url":
                            B !== "" && (A = !0, h.redirect(B, this.successEnd));
                            break;
                          case "maxscale":
                            h.maxscaleVersion = B;
                            break;
                          case "connection_id":
                            h.threadId = parseInt(B);
                            break;
                        }
                      } while (O.remaining() > 0);
                      break;
                    case s.SESSION_TRACK_SCHEMA:
                      const D = L.subPacketLengthEncoded(L.readUnsignedLength());
                      h.database = D.readStringLengthEncoded();
                      break;
                  }
              }
            }
          A || this.successEnd();
          return;
        //*********************************************************************************************************
        //* ERR_Packet
        //*********************************************************************************************************
        case 255:
          this.plugin.onPacketReceive = null;
          const C = d.readError(h, this.displaySql(), void 0);
          return C.fatal = !0, h.requireValidCert && h.selfSignedCertificate ? this.plugin.throwNewError(
            "Self signed certificates. Either set `ssl: { rejectUnauthorized: false }` (trust mode) or provide server certificate to client",
            !0,
            h,
            "08000",
            f.ER_SELF_SIGNED_NO_PWD
          ) : this.plugin.throwError(C, h);
        //*********************************************************************************************************
        //* unexpected
        //*********************************************************************************************************
        default:
          this.throwNewError(
            `Unexpected type of packet during handshake phase : ${N}`,
            !0,
            h,
            "42000",
            f.ER_AUTHENTICATION_BAD_PACKET
          );
      }
    }
    validateFingerPrint(d, p) {
      if (d.length === 0 || !p.tlsFingerprint) return !1;
      if (d[0] !== 1) {
        const g = f.createFatalError(
          "Unexpected hash format for fingerprint hash encoding",
          f.ER_UNEXPECTED_PACKET,
          this.info
        );
        return this.opts.logger.error && this.opts.logger.error(g), !1;
      }
      const E = this.plugin.hash(this.cmdParam.opts);
      let N = o.createHash("sha256").update(E).update(p.seed).update(Buffer.from(p.tlsFingerprint, "hex")).digest();
      const A = n.toHexString(N), C = d.toString("ascii", 1, d.length).toLowerCase();
      return A === C;
    }
    /**
     * Handle authentication switch request : dispatch to plugin handler.
     *
     * @param packet  packet
     * @param out     output writer
     * @param opts    options
     * @param info    connection information
     */
    dispatchAuthSwitchRequest(d, p, E, h) {
      let N, A;
      if (h.clientCapabilities & t.PLUGIN_AUTH ? (d.skip(1), d.remaining() ? (N = d.readStringNullEnded(), A = d.readBufferRemaining()) : (N = "mysql_old_password", A = h.seed.subarray(0, 8))) : (N = d.readStringNullEnded("ascii"), A = d.readBufferRemaining()), E.restrictedAuth && !E.restrictedAuth.includes(N)) {
        this.throwNewError(
          `Unsupported authentication plugin ${N}. Authorized plugin: ${E.restrictedAuth.toString()}`,
          !0,
          h,
          "42000",
          f.ER_NOT_SUPPORTED_AUTH_PLUGIN
        );
        return;
      }
      try {
        this.plugin.emit("end"), this.plugin.onPacketReceive = null, this.plugin = l.pluginHandler(
          N,
          this.plugin.sequenceNo,
          this.plugin.compressSequenceNo,
          A,
          h,
          E,
          p,
          this.cmdParam,
          this.reject,
          this.handshakeResult.bind(this)
        ), this.plugin.start(p, E, h);
      } catch (C) {
        this.reject(C);
      }
    }
    static pluginHandler(d, p, E, h, N, A, C, g, L, R) {
      let O = i[d];
      if (!O)
        throw f.createFatalError(
          `Client does not support authentication protocol '${d}' requested by server.`,
          f.ER_AUTHENTICATION_PLUGIN_NOT_SUPPORTED,
          N,
          "08004"
        );
      return new O(p, E, h, g, L, R);
    }
  }
  return yi = l, yi;
}
var vi, pu;
function NE() {
  if (pu) return vi;
  pu = 1;
  const e = er(), f = new Uint8Array([1, 0, 0, 0, 1]);
  class t extends e {
    constructor(r, s, a) {
      super(r, s, a);
    }
    start(r, s, a) {
      s.logger.query && s.logger.query("QUIT"), this.onPacketReceive = this.skipResults, r.fastFlush(this, f), this.emit("send_end"), this.successEnd();
    }
    skipResults(r, s, a, o) {
    }
  }
  return vi = t, vi;
}
var Fi, Iu;
function SE() {
  if (Iu) return Fi;
  Iu = 1;
  const e = er(), f = hr(), t = new Uint8Array([1, 0, 0, 0, 14]);
  class u extends e {
    constructor(s, a, o) {
      super(s, a, o);
    }
    start(s, a, o) {
      a.logger.query && a.logger.query("PING"), this.onPacketReceive = this.readPingResponsePacket, s.fastFlush(this, t), this.emit("send_end");
    }
    /**
     * Read ping response packet.
     * packet can be :
     * - an ERR_Packet
     * - an OK_Packet
     *
     * @param packet  query response
     * @param out     output writer
     * @param opts    connection options
     * @param info    connection info
     */
    readPingResponsePacket(s, a, o, n) {
      s.skip(1), s.skipLengthCodedNumber(), s.skipLengthCodedNumber(), n.status = s.readUInt16(), n.redirectRequest && (n.status & f.STATUS_IN_TRANS) === 0 ? n.redirect(n.redirectRequest, this.successEnd.bind(this, null)) : this.successEnd(null);
    }
  }
  return Fi = u, Fi;
}
var Mi, Nu;
function RE() {
  if (Nu) return Mi;
  Nu = 1;
  const e = er(), f = hr(), t = new Uint8Array([1, 0, 0, 0, 31]);
  class u extends e {
    constructor(s, a, o) {
      super(s, a, o);
    }
    start(s, a, o) {
      a.logger.query && a.logger.query("RESET"), this.onPacketReceive = this.readResetResponsePacket, s.fastFlush(this, t), this.emit("send_end");
    }
    /**
     * Read response packet.
     * packet can be :
     * - an ERR_Packet
     * - a OK_Packet
     *
     * @param packet  query response
     * @param out     output writer
     * @param opts    connection options
     * @param info    connection info
     */
    readResetResponsePacket(s, a, o, n) {
      s.skip(1), s.skipLengthCodedNumber(), s.skipLengthCodedNumber(), n.status = s.readUInt16(), n.redirectRequest && (n.status & f.STATUS_IN_TRANS) === 0 ? n.redirect(n.redirectRequest, this.successEnd.bind(this)) : this.successEnd();
    }
  }
  return Mi = u, Mi;
}
var Me = {}, Su;
function Qr() {
  if (Su) return Me;
  Su = 1, Me.DECIMAL = 0, Me.TINY = 1, Me.SHORT = 2, Me.INT = 3, Me.FLOAT = 4, Me.DOUBLE = 5, Me.NULL = 6, Me.TIMESTAMP = 7, Me.BIGINT = 8, Me.INT24 = 9, Me.DATE = 10, Me.TIME = 11, Me.DATETIME = 12, Me.YEAR = 13, Me.NEWDATE = 14, Me.VARCHAR = 15, Me.BIT = 16, Me.TIMESTAMP2 = 17, Me.DATETIME2 = 18, Me.TIME2 = 19, Me.JSON = 245, Me.NEWDECIMAL = 246, Me.ENUM = 247, Me.SET = 248, Me.TINY_BLOB = 249, Me.MEDIUM_BLOB = 250, Me.LONG_BLOB = 251, Me.BLOB = 252, Me.VAR_STRING = 253, Me.STRING = 254, Me.GEOMETRY = 255;
  const e = [];
  return e[0] = "DECIMAL", e[1] = "TINY", e[2] = "SHORT", e[3] = "INT", e[4] = "FLOAT", e[5] = "DOUBLE", e[6] = "NULL", e[7] = "TIMESTAMP", e[8] = "BIGINT", e[9] = "INT24", e[10] = "DATE", e[11] = "TIME", e[12] = "DATETIME", e[13] = "YEAR", e[14] = "NEWDATE", e[15] = "VARCHAR", e[16] = "BIT", e[17] = "TIMESTAMP2", e[18] = "DATETIME2", e[19] = "TIME2", e[245] = "JSON", e[246] = "NEWDECIMAL", e[247] = "ENUM", e[248] = "SET", e[249] = "TINY_BLOB", e[250] = "MEDIUM_BLOB", e[251] = "LONG_BLOB", e[252] = "BLOB", e[253] = "VAR_STRING", e[254] = "STRING", e[255] = "GEOMETRY", Me.TYPES = e, Me;
}
var Qe = {}, Ru;
function CE() {
  return Ru || (Ru = 1, Qe.NOT_NULL = 1, Qe.PRIMARY_KEY = 2, Qe.UNIQUE_KEY = 4, Qe.MULTIPLE_KEY = 8, Qe.BLOB = 16, Qe.UNSIGNED = 32, Qe.ZEROFILL_FLAG = 64, Qe.BINARY_COLLATION = 128, Qe.ENUM = 256, Qe.AUTO_INCREMENT = 512, Qe.TIMESTAMP = 1024, Qe.SET = 2048, Qe.NO_DEFAULT_VALUE_FLAG = 4096, Qe.ON_UPDATE_NOW_FLAG = 8192, Qe.NUM_FLAG = 16384), Qe;
}
var xi, Cu;
function Gh() {
  var n;
  if (Cu) return xi;
  Cu = 1;
  const e = wt(), f = Qr(), t = CE(), u = Ht();
  class r {
    constructor(i, l, _) {
      Oe(this, n);
      if (Ne(this, n, _ ? new a(i) : new o(i)), l.clientCapabilities & u.MARIADB_CLIENT_EXTENDED_TYPE_INFO) {
        const d = i.readUnsignedLength();
        if (d > 0) {
          const p = i.subPacketLengthEncoded(d);
          for (; p.remaining(); )
            switch (p.readUInt8()) {
              case 0:
                this.dataTypeName = p.readAsciiStringLengthEncoded();
                break;
              case 1:
                this.dataTypeFormat = p.readAsciiStringLengthEncoded();
                break;
              default:
                p.skip(p.readUnsignedLength());
                break;
            }
        }
      }
      i.skip(1), this.collation = e.fromIndex(i.readUInt16()), this.columnLength = i.readUInt32(), this.columnType = i.readUInt8(), this.flags = i.readUInt16(), this.scale = i.readUInt8(), this.type = f.TYPES[this.columnType];
    }
    __getDefaultGeomVal() {
      if (this.dataTypeName)
        switch (this.dataTypeName) {
          case "point":
            return { type: "Point" };
          case "linestring":
            return { type: "LineString" };
          case "polygon":
            return { type: "Polygon" };
          case "multipoint":
            return { type: "MultiPoint" };
          case "multilinestring":
            return { type: "MultiLineString" };
          case "multipolygon":
            return { type: "MultiPolygon" };
          default:
            return { type: this.dataTypeName };
        }
      return null;
    }
    db() {
      return T(this, n).db();
    }
    schema() {
      return T(this, n).schema();
    }
    table() {
      return T(this, n).table();
    }
    orgTable() {
      return T(this, n).orgTable();
    }
    name() {
      return T(this, n).name();
    }
    orgName() {
      return T(this, n).orgName();
    }
    signed() {
      return (this.flags & t.UNSIGNED) === 0;
    }
    isSet() {
      return (this.flags & t.SET) !== 0;
    }
  }
  n = new WeakMap();
  class s {
    constructor(i, l, _, d) {
      this.buf = _, this.encoding = i, this.readString = l, this.initialPos = d;
    }
    _readIdentifier(i) {
      let l = this.initialPos;
      for (; i-- > 0; ) {
        const p = this.buf[l++];
        l += p < 251 ? p : 2 + this.buf[l] + this.buf[l + 1] * 2 ** 8;
      }
      let _;
      const d = this.buf[l++];
      return _ = d < 251 ? d : this.buf[l++] + this.buf[l++] * 2 ** 8, this.readString(this.encoding, this.buf, l, _);
    }
    name() {
      return this._readIdentifier(3);
    }
    db() {
      return this._readIdentifier(0);
    }
    schema() {
      return this.db();
    }
    table() {
      return this._readIdentifier(1);
    }
    orgTable() {
      return this._readIdentifier(2);
    }
    orgName() {
      return this._readIdentifier(4);
    }
  }
  class a extends s {
    constructor(i) {
      i.skip(i.readMetadataLength());
      const l = i.pos;
      i.skip(i.readMetadataLength()), i.skip(i.readMetadataLength()), i.skip(i.readMetadataLength()), i.skip(i.readMetadataLength()), i.skip(i.readMetadataLength()), super(i.encoding, i.constructor.readString, i.buf, l);
    }
  }
  class o extends s {
    constructor(l) {
      l.skip(l.readMetadataLength());
      const _ = l.pos;
      l.skip(l.readMetadataLength()), l.skip(l.readMetadataLength()), l.skip(l.readMetadataLength());
      const d = l.readStringLengthEncoded();
      l.skip(l.readMetadataLength());
      super(l.encoding, l.constructor.readString, l.buf, _);
      ge(this, "colName");
      this.colName = d;
    }
    name() {
      return this.colName;
    }
  }
  return xi = r, xi;
}
var Yt = {}, Tu;
function Jr() {
  if (Tu) return Yt;
  Tu = 1;
  const e = qe(), f = {
    Normal: 1,
    String: 2,
    SlashStarComment: 3,
    Escape: 4,
    EOLComment: 5,
    Backtick: 6
    /* found backtick */
  }, t = 47, u = 42, r = 92, s = 35, a = 45, o = 10, n = 34, c = 39, i = 96, l = 63, _ = 58, d = 59;
  return Yt.splitQuery = function(p) {
    let E = [], h = f.Normal, N = 0, A = !1;
    const C = p.length;
    for (let g = 0; g < C; g++) {
      if (h === f.Escape && !(p[g] === c && A || p[g] === n && !A)) {
        h = f.String, N = p[g];
        continue;
      }
      switch (p[g]) {
        case u:
          h === f.Normal && N === t && (h = f.SlashStarComment);
          break;
        case t:
          h === f.SlashStarComment && N === u ? h = f.Normal : h === f.Normal && N === t && (h = f.EOLComment);
          break;
        case s:
          h === f.Normal && (h = f.EOLComment);
          break;
        case a:
          h === f.Normal && N === a && (h = f.EOLComment);
          break;
        case o:
          h === f.EOLComment && (h = f.Normal);
          break;
        case n:
          h === f.Normal ? (h = f.String, A = !1) : h === f.String && !A ? h = f.Normal : h === f.Escape && (h = f.String);
          break;
        case c:
          h === f.Normal ? (h = f.String, A = !0) : h === f.String && A ? h = f.Normal : h === f.Escape && (h = f.String);
          break;
        case r:
          h === f.String && (h = f.Escape);
          break;
        case l:
          h === f.Normal && E.push(g, ++g);
          break;
        case i:
          h === f.Backtick ? h = f.Normal : h === f.Normal && (h = f.Backtick);
          break;
      }
      N = p[g];
    }
    return E;
  }, Yt.splitQueryPlaceholder = function(p, E, h, N) {
    let A = [], C = [], g = f.Normal, L = 0, R = !1, O;
    const D = p.length;
    for (let m = 0; m < D; m++) {
      if (O = p[m], g === f.Escape && !(O === c && R || O === n && !R)) {
        g = f.String, L = O;
        continue;
      }
      switch (O) {
        case u:
          g === f.Normal && L === t && (g = f.SlashStarComment);
          break;
        case t:
          g === f.SlashStarComment && L === u ? g = f.Normal : g === f.Normal && L === t && (g = f.EOLComment);
          break;
        case s:
          g === f.Normal && (g = f.EOLComment);
          break;
        case a:
          g === f.Normal && L === a && (g = f.EOLComment);
          break;
        case o:
          g === f.EOLComment && (g = f.Normal);
          break;
        case n:
          g === f.Normal ? (g = f.String, R = !1) : g === f.String && !R ? g = f.Normal : g === f.Escape && (g = f.String);
          break;
        case c:
          g === f.Normal ? (g = f.String, R = !0) : g === f.String && R ? g = f.Normal : g === f.Escape && (g = f.String);
          break;
        case r:
          g === f.String && (g = f.Escape);
          break;
        case l:
          g === f.Normal && (A.push(m), A.push(++m));
          break;
        case _:
          if (g === f.Normal) {
            let B = 1;
            for (; m + B < D && p[m + B] >= 48 && p[m + B] <= 57 || p[m + B] >= 65 && p[m + B] <= 90 || p[m + B] >= 97 && p[m + B] <= 122 || p[m + B] === 45 || p[m + B] === 95; )
              B++;
            A.push(m, m + B);
            const v = p.toString("utf8", m + 1, m + B);
            m += B;
            const M = h[v];
            if (M === void 0)
              throw e.createError(
                `Placeholder '${v}' is not defined`,
                e.ER_PLACEHOLDER_UNDEFINED,
                E,
                "HY000",
                N.call()
              );
            C.push(M);
          }
          break;
        case i:
          g === f.Backtick ? g = f.Normal : g === f.Normal && (g = f.Backtick);
          break;
      }
      L = O;
    }
    return { paramPositions: A, values: C };
  }, Yt.searchPlaceholder = function(p) {
    let E = "", h = [], N = f.Normal, A = "\0", C = !1, g = 0, L = 0, R = p.charAt(L++), O;
    for (; R !== ""; ) {
      if (N === f.Escape && !(R === "'" && C || R === '"' && !C)) {
        N = f.String, A = R, R = p.charAt(L++);
        continue;
      }
      switch (R) {
        case "*":
          N === f.Normal && A === "/" && (N = f.SlashStarComment);
          break;
        case "/":
          N === f.SlashStarComment && A === "*" && (N = f.Normal);
          break;
        case "#":
          N === f.Normal && (N = f.EOLComment);
          break;
        case "-":
          N === f.Normal && A === "-" && (N = f.EOLComment);
          break;
        case `
`:
          N === f.EOLComment && (N = f.Normal);
          break;
        case '"':
          N === f.Normal ? (N = f.String, C = !1) : N === f.String && !C ? N = f.Normal : N === f.Escape && !C && (N = f.String);
          break;
        case "'":
          N === f.Normal ? (N = f.String, C = !0) : N === f.String && C ? (N = f.Normal, C = !1) : N === f.Escape && C && (N = f.String);
          break;
        case "\\":
          N === f.String && (N = f.Escape);
          break;
        case ":":
          if (N === f.Normal) {
            for (E += p.substring(g, L - 1) + "?", O = ""; (R = p.charAt(L++)) !== "" && R >= "0" && R <= "9" || R >= "A" && R <= "Z" || R >= "a" && R <= "z" || R === "-" || R === "_"; )
              O += R;
            L--, h.push(O), g = L;
          }
          break;
        case "`":
          N === f.Backtick ? N = f.Normal : N === f.Normal && (N = f.Backtick);
      }
      A = R, R = p.charAt(L++);
    }
    return g === 0 ? E = p : E += p.substring(g), { sql: E, placeHolderIndex: h };
  }, Yt.validateFileName = function(p, E, h) {
    let N = new RegExp(
      "^(\\s*\\/\\*([^\\*]|\\*[^\\/])*\\*\\/)*\\s*LOAD\\s+DATA\\s+((LOW_PRIORITY|CONCURRENT)\\s+)?LOCAL\\s+INFILE\\s+'" + h.replace(/\\/g, "\\\\\\\\").replace(".", "\\.") + "'",
      "i"
    );
    return N.test(p) ? !0 : E != null && (N = new RegExp(
      "^(\\s*\\/\\*([^\\*]|\\*[^\\/])*\\*\\/)*\\s*LOAD\\s+DATA\\s+((LOW_PRIORITY|CONCURRENT)\\s+)?LOCAL\\s+INFILE\\s+\\?",
      "i"
    ), N.test(p) && E.length > 0) ? Array.isArray(E) ? E[0].toLowerCase() === h.toLowerCase() : E.toLowerCase() === h.toLowerCase() : !1;
  }, Yt.parseQueries = function(p) {
    let E = f.Normal, h = 0, N, A = [], C = !1;
    for (let g = p.offset; g < p.end; g++) {
      if (N = p.buffer[g], E === f.Escape && !(N === c && C || N === n && !C)) {
        E = f.String, h = N;
        continue;
      }
      switch (N) {
        case u:
          E === f.Normal && h === t && (E = f.SlashStarComment);
          break;
        case t:
          E === f.SlashStarComment && h === u ? E = f.Normal : E === f.Normal && h === t && (E = f.EOLComment);
          break;
        case s:
          E === f.Normal && (E = f.EOLComment);
          break;
        case a:
          E === f.Normal && h === a && (E = f.EOLComment);
          break;
        case o:
          E === f.EOLComment && (E = f.Normal);
          break;
        case n:
          E === f.Normal ? (E = f.String, C = !1) : E === f.String && !C ? E = f.Normal : E === f.Escape && (E = f.String);
          break;
        case c:
          E === f.Normal ? (E = f.String, C = !0) : E === f.String && C ? E = f.Normal : E === f.Escape && (E = f.String);
          break;
        case r:
          E === f.String && (E = f.Escape);
          break;
        case d:
          E === f.Normal && (A.push(p.buffer.toString("utf8", p.offset, g)), p.offset = g + 1);
          break;
        case i:
          E === f.Backtick ? E = f.Normal : E === f.Normal && (E = f.Backtick);
          break;
      }
      h = N;
    }
    return A;
  }, Yt;
}
var Tr = {}, gu;
function TE() {
  if (gu) return Tr;
  gu = 1;
  const e = Qr(), f = qe();
  Tr.newRow = function(w, x) {
    w.skip(1);
    const V = ~~((x.length + 9) / 8), z = new Array(V);
    for (let j = 0; j < V; j++) z[j] = w.readUInt8();
    return z;
  }, Tr.castWrapper = function(w, x, V, z, j) {
    w.string = () => t(j, z) ? null : x.readStringLengthEncoded(), w.buffer = () => t(j, z) ? null : x.readBufferLengthEncoded(), w.float = () => t(j, z) ? null : x.readFloat(), w.tiny = () => t(j, z) ? null : w.signed() ? x.readInt8() : x.readUInt8(), w.short = () => t(j, z) ? null : w.signed() ? x.readInt16() : x.readUInt16(), w.int = () => t(j, z) ? null : x.readInt32(), w.long = () => t(j, z) ? null : x.readBigInt64(), w.decimal = () => t(j, z) ? null : x.readDecimalLengthEncoded(), w.date = () => t(j, z) ? null : x.readBinaryDate(V), w.datetime = () => t(j, z) ? null : x.readBinaryDateTime(), w.geometry = () => {
      let J = null;
      if (w.dataTypeName)
        switch (w.dataTypeName) {
          case "point":
            J = { type: "Point" };
            break;
          case "linestring":
            J = { type: "LineString" };
            break;
          case "polygon":
            J = { type: "Polygon" };
            break;
          case "multipoint":
            J = { type: "MultiPoint" };
            break;
          case "multilinestring":
            J = { type: "MultiLineString" };
            break;
          case "multipolygon":
            J = { type: "MultiPolygon" };
            break;
          default:
            J = { type: w.dataTypeName };
            break;
        }
      return t(j, z) ? J : x.readGeometry(J);
    };
  }, Tr.parser = function(w, x) {
    const V = w.signed() ? F[w.columnType] : I[w.columnType];
    if (V) return V;
    switch (w.columnType) {
      case e.BIGINT:
        return w.signed() ? x.bigIntAsNumber || x.supportBigNumbers ? h : p : x.bigIntAsNumber || x.supportBigNumbers ? E : d;
      case e.DATETIME:
      case e.TIMESTAMP:
        return x.dateStrings ? g.bind(null, w.scale) : C;
      case e.DECIMAL:
      case e.NEWDECIMAL:
        return w.scale === 0 ? R : O;
      case e.GEOMETRY:
        let z = w.__getDefaultGeomVal();
        return N.bind(null, z);
      case e.BIT:
        return w.columnLength === 1 && x.bitOneIsBoolean ? m : B;
      case e.JSON:
        return x.jsonStrings ? M : D;
      default:
        return w.dataTypeFormat && w.dataTypeFormat === "json" && x.autoJsonMap ? D : w.collation.index === 63 ? B : w.isSet() ? v : M;
    }
  };
  const t = (w, x) => (x[~~((w + 2) / 8)] & 1 << (w + 2) % 8) > 0, u = (w, x, V, z, j) => t(j, z) ? null : w.readInt8(), r = (w, x, V, z, j) => t(j, z) ? null : w.readUInt8(), s = (w, x, V, z, j) => t(j, z) ? null : w.readInt16(), a = (w, x, V, z, j) => t(j, z) ? null : w.readUInt16(), o = (w, x, V, z, j) => {
    if (t(j, z))
      return null;
    const J = w.readInt24();
    return w.skip(1), J;
  }, n = (w, x, V, z, j) => {
    if (t(j, z))
      return null;
    const J = w.readUInt24();
    return w.skip(1), J;
  }, c = (w, x, V, z, j) => t(j, z) ? null : w.readInt32(), i = (w, x, V, z, j) => t(j, z) ? null : w.readUInt32(), l = (w, x, V, z, j) => t(j, z) ? null : w.readFloat(), _ = (w, x, V, z, j) => t(j, z) ? null : w.readDouble(), d = function(w, x, V, z, j) {
    return t(j, z) ? null : w.readBigUInt64();
  }, p = function(w, x, V, z, j) {
    return t(j, z) ? null : w.readBigInt64();
  }, E = function(w, x, V, z, j) {
    if (t(j, z)) return null;
    const J = w.readBigUInt64();
    return x.bigIntAsNumber && x.checkNumberRange && !Number.isSafeInteger(Number(J)) ? V(
      `value ${J} can't safely be converted to number`,
      !1,
      null,
      "42000",
      f.ER_PARSING_PRECISION
    ) : x.supportBigNumbers && (x.bigNumberStrings || !Number.isSafeInteger(Number(J))) ? J.toString() : Number(J);
  }, h = function(w, x, V, z, j) {
    if (t(j, z)) return null;
    const J = w.readBigInt64();
    return x.bigIntAsNumber && x.checkNumberRange && !Number.isSafeInteger(Number(J)) ? V(
      `value ${J} can't safely be converted to number`,
      !1,
      null,
      "42000",
      f.ER_PARSING_PRECISION
    ) : x.supportBigNumbers && (x.bigNumberStrings || !Number.isSafeInteger(Number(J))) ? J.toString() : Number(J);
  }, N = (w, x, V, z, j, J) => t(J, j) ? w : x.readGeometry(w), A = (w, x, V, z, j) => t(j, z) ? null : w.readBinaryDate(x), C = (w, x, V, z, j) => t(j, z) ? null : w.readBinaryDateTime(), g = (w, x, V, z, j, J) => t(J, j) ? null : x.readBinaryDateTimeAsString(w), L = (w, x, V, z, j) => t(j, z) ? null : w.readBinaryTime(), R = (w, x, V, z, j) => {
    if (t(j, z)) return null;
    const J = w.readDecimalLengthEncoded();
    return J != null && (x.decimalAsNumber || x.supportBigNumbers) ? x.decimalAsNumber && x.checkNumberRange && !Number.isSafeInteger(Number(J)) ? V(
      `value ${J} can't safely be converted to number`,
      !1,
      null,
      "42000",
      f.ER_PARSING_PRECISION
    ) : x.supportBigNumbers && (x.bigNumberStrings || !Number.isSafeInteger(Number(J))) ? J : Number(J) : J;
  }, O = (w, x, V, z, j) => {
    if (t(j, z)) return null;
    const J = w.readDecimalLengthEncoded();
    if (J != null && (x.decimalAsNumber || x.supportBigNumbers)) {
      const fe = Number(J);
      return x.supportBigNumbers && (x.bigNumberStrings || Number.isInteger(fe) && !Number.isSafeInteger(fe)) ? J : fe;
    }
    return J;
  }, D = (w, x, V, z, j) => t(j, z) ? null : JSON.parse(w.readStringLengthEncoded()), m = (w, x, V, z, j) => t(j, z) ? null : w.readBufferLengthEncoded()[0] === 1, B = (w, x, V, z, j) => t(j, z) ? null : w.readBufferLengthEncoded(), v = (w, x, V, z, j) => {
    if (t(j, z)) return null;
    const J = w.readStringLengthEncoded();
    return J == null ? null : J === "" ? [] : J.split(",");
  }, M = (w, x, V, z, j) => t(j, z) ? null : w.readStringLengthEncoded(), F = Array(256);
  F[e.TINY] = u, F[e.YEAR] = s, F[e.SHORT] = s, F[e.INT24] = o, F[e.INT] = c, F[e.FLOAT] = l, F[e.DOUBLE] = _, F[e.DATE] = A, F[e.TIME] = L;
  const I = Array(256);
  return I[e.TINY] = r, I[e.YEAR] = a, I[e.SHORT] = a, I[e.INT24] = n, I[e.INT] = i, I[e.FLOAT] = l, I[e.DOUBLE] = _, I[e.DATE] = A, I[e.TIME] = L, Tr;
}
var dn = {}, mu;
function gE() {
  if (mu) return dn;
  mu = 1;
  const e = Qr(), f = qe();
  dn.parser = function(A, C) {
    const g = N[A.columnType];
    if (g) return g;
    switch (A.columnType) {
      case e.DECIMAL:
      case e.NEWDECIMAL:
        return A.scale === 0 ? n : c;
      case e.BIGINT:
        return C.bigIntAsNumber || C.supportBigNumbers ? o : a;
      case e.GEOMETRY:
        let L = A.__getDefaultGeomVal();
        return t.bind(null, L);
      case e.BIT:
        return A.columnLength === 1 && C.bitOneIsBoolean ? d : p;
      case e.JSON:
        return C.jsonStrings ? r : E;
      default:
        return A.dataTypeFormat && A.dataTypeFormat === "json" && C.autoJsonMap ? E : A.collation.index === 63 ? p : A.isSet() ? h : r;
    }
  }, dn.castWrapper = function(A, C, g, L, R) {
    A.string = () => C.readStringLengthEncoded(), A.buffer = () => C.readBufferLengthEncoded(), A.float = () => C.readFloatLengthCoded(), A.tiny = () => C.readIntLengthEncoded(), A.short = () => C.readIntLengthEncoded(), A.int = () => C.readIntLengthEncoded(), A.long = () => C.readBigIntLengthEncoded(), A.decimal = () => C.readDecimalLengthEncoded(), A.date = () => C.readDate(g), A.datetime = () => C.readDateTime(), A.geometry = () => {
      let O = null;
      if (A.dataTypeName)
        switch (A.dataTypeName) {
          case "point":
            O = { type: "Point" };
            break;
          case "linestring":
            O = { type: "LineString" };
            break;
          case "polygon":
            O = { type: "Polygon" };
            break;
          case "multipoint":
            O = { type: "MultiPoint" };
            break;
          case "multilinestring":
            O = { type: "MultiLineString" };
            break;
          case "multipolygon":
            O = { type: "MultiPolygon" };
            break;
          default:
            O = { type: A.dataTypeName };
            break;
        }
      return C.readGeometry(O);
    };
  };
  const t = (A, C, g, L) => C.readGeometry(A), u = (A, C, g) => A.readIntLengthEncoded(), r = (A, C, g) => A.readStringLengthEncoded(), s = (A, C, g) => A.readFloatLengthCoded(), a = (A, C, g) => A.readBigIntLengthEncoded(), o = (A, C, g) => {
    const L = A.readUnsignedLength();
    if (L === null) return null;
    if (L < 16) {
      const O = A._atoi(L);
      return C.supportBigNumbers && C.bigNumberStrings ? `${O}` : O;
    }
    const R = A.readBigIntFromLen(L);
    return C.bigIntAsNumber && C.checkNumberRange && !Number.isSafeInteger(Number(R)) ? g(
      `value ${R} can't safely be converted to number`,
      !1,
      null,
      "42000",
      f.ER_PARSING_PRECISION
    ) : C.supportBigNumbers && (C.bigNumberStrings || !Number.isSafeInteger(Number(R))) ? R.toString() : Number(R);
  }, n = (A, C, g) => {
    const L = A.readDecimalLengthEncoded();
    return L != null && (C.decimalAsNumber || C.supportBigNumbers) ? C.decimalAsNumber && C.checkNumberRange && !Number.isSafeInteger(Number(L)) ? g(
      `value ${L} can't safely be converted to number`,
      !1,
      null,
      "42000",
      f.ER_PARSING_PRECISION
    ) : C.supportBigNumbers && (C.bigNumberStrings || !Number.isSafeInteger(Number(L))) ? L : Number(L) : L;
  }, c = (A, C, g) => {
    const L = A.readDecimalLengthEncoded();
    if (L != null && (C.decimalAsNumber || C.supportBigNumbers)) {
      const R = Number(L);
      return C.supportBigNumbers && (C.bigNumberStrings || Number.isInteger(R) && !Number.isSafeInteger(R)) ? L : R;
    }
    return L;
  }, i = (A, C, g) => C.dateStrings ? A.readAsciiStringLengthEncoded() : A.readDate(), l = (A, C, g) => C.dateStrings ? A.readAsciiStringLengthEncoded() : A.readDateTime(), _ = (A, C, g) => A.readAsciiStringLengthEncoded(), d = (A, C, g) => {
    const L = A.readBufferLengthEncoded();
    return L == null ? null : L[0] === 1;
  }, p = (A, C, g) => A.readBufferLengthEncoded(), E = (A, C, g) => JSON.parse(A.readStringLengthEncoded()), h = (A, C, g) => {
    const L = A.readStringLengthEncoded();
    return L == null ? null : L === "" ? [] : L.split(",");
  }, N = Array(256);
  return N[e.TINY] = u, N[e.SHORT] = u, N[e.INT] = u, N[e.INT24] = u, N[e.YEAR] = u, N[e.FLOAT] = s, N[e.DOUBLE] = s, N[e.DATE] = i, N[e.DATETIME] = l, N[e.TIMESTAMP] = l, N[e.TIME] = _, dn;
}
var Bi, Ou;
function Vo() {
  if (Ou) return Bi;
  Ou = 1;
  class e {
    constructor(t, u, r) {
      this.affectedRows = t, this.insertId = u, this.warningStatus = r;
    }
  }
  return Bi = e, Bi;
}
var ki, wu;
function Zr() {
  if (wu) return ki;
  wu = 1;
  const e = er(), f = hr(), t = Gh(), u = qe(), r = ze, s = Jr(), a = TE(), o = gE(), n = Vo(), c = xh(), i = wt();
  class l extends e {
    constructor(E, h, N, A) {
      super(A, E, h), this._responseIndex = 0, this._rows = [], this.opts = A.opts ? Object.assign({}, N, A.opts) : N, this.sql = A.sql, this.initialValues = A.values, this.canSkipMeta = !1;
    }
    /**
     * Read Query response packet.
     * packet can be :
     * - a result-set
     * - an ERR_Packet
     * - a OK_Packet
     * - LOCAL_INFILE Packet
     *
     * @param packet  query response
     * @param out     output writer
     * @param opts    connection options
     * @param info    connection info
     */
    readResponsePacket(E, h, N, A) {
      switch (E.peek()) {
        //*********************************************************************************************************
        //* OK response
        //*********************************************************************************************************
        case 0:
          return this.readOKPacket(E, h, N, A);
        //*********************************************************************************************************
        //* ERROR response
        //*********************************************************************************************************
        case 255:
          this._columns = null, this._rows = [];
          const C = E.readError(A, N.logParam ? this.displaySql() : this.sql, this.cmdParam.stack);
          return A.status |= f.STATUS_IN_TRANS, this.throwError(C, A);
        //*********************************************************************************************************
        //* LOCAL INFILE response
        //*********************************************************************************************************
        case 251:
          return this.readLocalInfile(E, h, N, A);
        //*********************************************************************************************************
        //* Parser
        //*********************************************************************************************************
        default:
          return this.readResultSet(E, A);
      }
    }
    /**
     * Read result-set packets :
     * see https://mariadb.com/kb/en/library/resultset/
     *
     * @param packet    Column count packet
     * @param info      current connection information
     * @returns {Parser.readColumn} next packet handler
     */
    readResultSet(E, h) {
      if (this._columnCount = E.readUnsignedLength(), this._rows.push([]), this.canSkipMeta && h.serverPermitSkipMeta && E.readUInt8() === 0)
        return this._columns = this.prepare.columns, this.emit("fields", this._columns), this.setParser(), this.onPacketReceive = h.eofDeprecated ? this.readResultSetRow : this.readIntermediateEOF;
      this._columns = [], this.onPacketReceive = this.readColumn;
    }
    /**
     * Read OK_Packet.
     * see https://mariadb.com/kb/en/library/ok_packet/
     *
     * @param packet    OK_Packet
     * @param opts      connection options
     * @param info      connection information
     * @param out       output writer
     * @returns {*}     null or {Result.readResponsePacket} in case of multi-result-set
     */
    readOKPacket(E, h, N, A) {
      E.skip(1);
      const C = E.readUnsignedLength();
      let g = E.readInsertId();
      if (A.status = E.readUInt16(), this.opts.supportBigNumbers || this.opts.insertIdAsNumber) {
        if (this.opts.insertIdAsNumber && this.opts.checkNumberRange && !Number.isSafeInteger(Number(g))) {
          this.onPacketReceive = A.status & f.MORE_RESULTS_EXISTS ? this.readResponsePacket : null, this.throwUnexpectedError(
            `last insert id value ${g} can't safely be converted to number`,
            !1,
            A,
            "42000",
            u.ER_PARSING_PRECISION
          );
          return;
        }
        this.opts.supportBigNumbers && (this.opts.bigNumberStrings || !Number.isSafeInteger(Number(g))) ? g = g.toString() : g = Number(g);
      }
      const L = new n(C, g, E.readUInt16());
      let R = !1;
      if (A.status & f.SESSION_STATE_CHANGED)
        for (E.skipLengthCodedNumber(); E.remaining(); ) {
          const O = E.readUnsignedLength();
          if (O > 0) {
            const D = E.subPacketLengthEncoded(O);
            for (; D.remaining(); )
              switch (D.readUInt8()) {
                case c.SESSION_TRACK_SYSTEM_VARIABLES:
                  let B;
                  do {
                    B = D.subPacketLengthEncoded(D.readUnsignedLength());
                    const M = B.readStringLengthEncoded(), F = B.readStringLengthEncoded();
                    switch (M) {
                      case "character_set_client":
                        if (A.collation = i.fromCharset(F), A.collation === void 0) {
                          this.throwError(new Error("unknown charset : '" + F + "'"), A);
                          return;
                        }
                        N.emit("collation", A.collation);
                        break;
                      case "redirect_url":
                        F !== "" && (R = !0, A.redirect(F, this.okPacketSuccess.bind(this, L, A)));
                        break;
                      case "connection_id":
                        A.threadId = parseInt(F);
                        break;
                    }
                  } while (B.remaining() > 0);
                  break;
                case c.SESSION_TRACK_SCHEMA:
                  const v = D.subPacketLengthEncoded(D.readUnsignedLength());
                  A.database = v.readStringLengthEncoded();
                  break;
              }
          }
        }
      this.inStream && this.handleNewRows(L), R || (A.redirectRequest && (A.status & f.STATUS_IN_TRANS) === 0 && (A.status & f.MORE_RESULTS_EXISTS) === 0 ? A.redirect(A.redirectRequest, this.okPacketSuccess.bind(this, L, A)) : this.okPacketSuccess(L, A));
    }
    okPacketSuccess(E, h) {
      if (this._responseIndex === 0)
        return h.status & f.MORE_RESULTS_EXISTS ? (this._rows.push(E), this._responseIndex++, this.onPacketReceive = this.readResponsePacket) : this.success(this.opts.metaAsArray ? [E, []] : E);
      if (this._rows.push(E), h.status & f.MORE_RESULTS_EXISTS)
        return this._responseIndex++, this.onPacketReceive = this.readResponsePacket;
      this.opts.metaAsArray ? (this._meta || (this._meta = new Array(this._responseIndex)), this._meta[this._responseIndex] = null, this.success([this._rows, this._meta])) : this.success(this._rows);
    }
    success(E) {
      this.successEnd(E), this._columns = null, this._rows = [];
    }
    /**
     * Read column information metadata
     * see https://mariadb.com/kb/en/library/resultset/#column-definition-packet
     *
     * @param packet    column definition packet
     * @param out       output writer
     * @param opts      connection options
     * @param info      connection information
     * @returns {*}
     */
    readColumn(E, h, N, A) {
      if (this._columns.push(new t(E, A, this.opts.rowsAsArray)), this._columns.length === this._columnCount)
        return this.setParser(), this.canSkipMeta && A.serverPermitSkipMeta && this.prepare != null && (this.prepare.columns = this._columns), this.emit("fields", this._columns), this.onPacketReceive = A.eofDeprecated ? this.readResultSetRow : this.readIntermediateEOF;
    }
    setParser() {
      if (this._parseFunction = new Array(this._columnCount), this.opts.typeCast)
        for (let E = 0; E < this._columnCount; E++)
          this._parseFunction[E] = this.readCastValue.bind(this, this._columns[E]);
      else {
        const E = this.binary ? a.parser : o.parser;
        for (let h = 0; h < this._columnCount; h++)
          this._parseFunction[h] = E(this._columns[h], this.opts);
      }
      if (this.opts.rowsAsArray)
        this.parseRow = this.parseRowAsArray;
      else if (this.tableHeader = new Array(this._columnCount), this.parseRow = this.binary ? this.parseRowStdBinary : this.parseRowStdText, this.opts.nestTables) {
        if (typeof this.opts.nestTables == "string") {
          for (let E = 0; E < this._columnCount; E++)
            this.tableHeader[E] = this._columns[E].table() + this.opts.nestTables + this._columns[E].name();
          this.checkDuplicates();
        } else if (this.opts.nestTables === !0) {
          this.parseRow = this.parseRowNested;
          for (let E = 0; E < this._columnCount; E++)
            this.tableHeader[E] = [this._columns[E].table(), this._columns[E].name()];
          this.checkNestTablesDuplicatesAndPrivateFields();
        }
      } else {
        for (let E = 0; E < this._columnCount; E++)
          this.tableHeader[E] = this._columns[E].name();
        this.checkDuplicates();
      }
    }
    checkDuplicates() {
      if (this.opts.checkDuplicate) {
        for (let E = 0; E < this._columnCount; E++)
          if (this.tableHeader.indexOf(this.tableHeader[E], E + 1) > 0) {
            const h = this.tableHeader.reduce(
              (N, A, C, g) => g.indexOf(A) !== C && N.indexOf(A) === -1 ? N.concat(A) : N,
              []
            );
            this.throwUnexpectedError(
              `Error in results, duplicate field name \`${h[0]}\`.
(see option \`checkDuplicate\`)`,
              !1,
              null,
              "42000",
              u.ER_DUPLICATE_FIELD
            );
          }
      }
    }
    checkNestTablesDuplicatesAndPrivateFields() {
      if (this.opts.checkDuplicate)
        for (let E = 0; E < this._columnCount; E++)
          for (let h = 0; h < E; h++)
            this.tableHeader[h][0] === this.tableHeader[E][0] && this.tableHeader[h][1] === this.tableHeader[E][1] && this.throwUnexpectedError(
              `Error in results, duplicate field name \`${this.tableHeader[E][0]}\`.\`${this.tableHeader[E][1]}\`
(see option \`checkDuplicate\`)`,
              !1,
              null,
              "42000",
              u.ER_DUPLICATE_FIELD
            );
      for (let E = 0; E < this._columnCount; E++)
        d.has(this.tableHeader[E][0]) && (this.throwUnexpectedError(
          `Use of \`${this.tableHeader[E][0]}\` is not permitted with option \`nestTables\``,
          !1,
          null,
          "42000",
          u.ER_PRIVATE_FIELDS_USE
        ), this.parseRow = () => ({}));
    }
    /**
     * Read intermediate EOF.
     * _only for server before MariaDB 10.2 / MySQL 5.7 that doesn't have CLIENT_DEPRECATE_EOF capability_
     * see https://mariadb.com/kb/en/library/eof_packet/
     *
     * @param packet    EOF Packet
     * @param out       output writer
     * @param opts      connection options
     * @param info      connection information
     * @returns {*}
     */
    readIntermediateEOF(E, h, N, A) {
      if (E.peek() !== 254)
        return this.throwNewError("Error in protocol, expected EOF packet", !0, A, "42000", u.ER_EOF_EXPECTED);
      E.skip(3), A.status = E.readUInt16(), this.isOutParameter = A.status & f.PS_OUT_PARAMS, this.onPacketReceive = this.readResultSetRow;
    }
    handleNewRows(E) {
      this._rows[this._responseIndex].push(E);
    }
    /**
     * Check if packet is result-set end = EOF of OK_Packet with EOF header according to CLIENT_DEPRECATE_EOF capability
     * or a result-set row
     *
     * @param packet    current packet
     * @param out       output writer
     * @param opts      connection options
     * @param info      connection information
     * @returns {*}
     */
    readResultSetRow(E, h, N, A) {
      if (E.peek() >= 254) {
        if (E.peek() === 255)
          return A.status |= f.STATUS_IN_TRANS, this.throwError(
            E.readError(A, this.opts.logParam ? this.displaySql() : this.sql, this.cmdParam.err),
            A
          );
        if (!A.eofDeprecated && E.length() < 13 || A.eofDeprecated && E.length() < 16777215) {
          A.eofDeprecated ? (E.skip(1), E.skipLengthCodedNumber(), E.skipLengthCodedNumber(), A.status = E.readUInt16()) : (E.skip(3), A.status = E.readUInt16()), A.redirectRequest && (A.status & f.STATUS_IN_TRANS) === 0 && (A.status & f.MORE_RESULTS_EXISTS) === 0 ? A.redirect(A.redirectRequest, this.resultSetEndingPacketResult.bind(this, A)) : this.resultSetEndingPacketResult(A);
          return;
        }
      }
      this.handleNewRows(this.parseRow(E));
    }
    resultSetEndingPacketResult(E) {
      if (this.opts.metaAsArray) {
        if (E.status & f.MORE_RESULTS_EXISTS || this.isOutParameter)
          return this._meta || (this._meta = []), this._meta[this._responseIndex] = this._columns, this._responseIndex++, this.onPacketReceive = this.readResponsePacket;
        this._responseIndex === 0 ? this.success([this._rows[0], this._columns]) : (this._meta || (this._meta = []), this._meta[this._responseIndex] = this._columns, this.success([this._rows, this._meta]));
      } else {
        if (Object.defineProperty(this._rows[this._responseIndex], "meta", {
          value: this._columns,
          writable: !0,
          enumerable: this.opts.metaEnumerable
        }), E.status & f.MORE_RESULTS_EXISTS || this.isOutParameter)
          return this._responseIndex++, this.onPacketReceive = this.readResponsePacket;
        this.success(this._responseIndex === 0 ? this._rows[0] : this._rows);
      }
    }
    /**
     * Display current SQL with parameters (truncated if too big)
     *
     * @returns {string}
     */
    displaySql() {
      if (this.opts && this.initialValues) {
        if (this.sql.length > this.opts.debugLen)
          return this.sql.substring(0, this.opts.debugLen) + "...";
        let E = this.sql + " - parameters:";
        return l.logParameters(this.opts, E, this.initialValues);
      }
      return this.sql.length > this.opts.debugLen ? this.sql.substring(0, this.opts.debugLen) + "... - parameters:[]" : this.sql + " - parameters:[]";
    }
    static logParameters(E, h, N) {
      if (E.namedPlaceholders) {
        h += "{";
        let A = !0;
        for (let C in N) {
          A ? A = !1 : h += ",", h += "'" + C + "':";
          let g = N[C];
          if (h = l.logParam(h, g), h.length > E.debugLen)
            return h.substring(0, E.debugLen) + "...";
        }
        h += "}";
      } else {
        if (h += "[", Array.isArray(N))
          for (let A = 0; A < N.length; A++) {
            A !== 0 && (h += ",");
            let C = N[A];
            if (h = l.logParam(h, C), h.length > E.debugLen)
              return h.substring(0, E.debugLen) + "...";
          }
        else if (h = l.logParam(h, N), h.length > E.debugLen)
          return h.substring(0, E.debugLen) + "...";
        h += "]";
      }
      return h;
    }
    parseRowAsArray(E) {
      const h = new Array(this._columnCount), N = this.binary ? a.newRow(E, this._columns) : null;
      for (let A = 0; A < this._columnCount; A++)
        h[A] = this._parseFunction[A](E, this.opts, this.unexpectedError, N, A);
      return h;
    }
    parseRowNested(E) {
      const h = {}, N = this.binary ? a.newRow(E, this._columns) : null;
      for (let A = 0; A < this._columnCount; A++)
        h[this.tableHeader[A][0]] || (h[this.tableHeader[A][0]] = {}), h[this.tableHeader[A][0]][this.tableHeader[A][1]] = this._parseFunction[A](
          E,
          this.opts,
          this.unexpectedError,
          N,
          A
        );
      return h;
    }
    parseRowStdText(E) {
      const h = {};
      for (let N = 0; N < this._columnCount; N++)
        h[this.tableHeader[N]] = this._parseFunction[N](E, this.opts, this.unexpectedError);
      return h;
    }
    parseRowStdBinary(E) {
      const h = a.newRow(E, this._columns), N = {};
      for (let A = 0; A < this._columnCount; A++)
        N[this.tableHeader[A]] = this._parseFunction[A](E, this.opts, this.unexpectedError, h, A);
      return N;
    }
    readCastValue(E, h, N, A, C, g) {
      this.binary ? a.castWrapper(E, h, N, C, g) : o.castWrapper(E, h, N, C, g);
      const L = this.binary ? a.parser : o.parser;
      return N.typeCast(E, L(E, N).bind(null, h, N, A, C, g));
    }
    readLocalInfile(E, h, N, A) {
      E.skip(1), h.startPacket(this);
      const C = E.readStringRemaining();
      if (!s.validateFileName(this.sql, this.initialValues, C)) {
        h.writeEmptyPacket();
        const L = u.createError(
          "LOCAL INFILE wrong filename. '" + C + "' doesn't correspond to query " + this.sql + ". Query cancelled. Check for malicious server / proxy",
          u.ER_LOCAL_INFILE_WRONG_FILENAME,
          A,
          "HY000",
          this.sql
        );
        return process.nextTick(this.reject, L), this.reject = null, this.resolve = null, this.onPacketReceive = this.readResponsePacket;
      }
      let g;
      try {
        g = this.opts.infileStreamFactory ? this.opts.infileStreamFactory(C) : r.createReadStream(C);
      } catch (L) {
        h.writeEmptyPacket();
        const R = u.createError(
          "LOCAL INFILE infileStreamFactory failed",
          u.ER_LOCAL_INFILE_NOT_READABLE,
          A,
          "22000",
          this.opts.logParam ? this.displaySql() : this.sql
        );
        return R.cause = L, process.nextTick(this.reject, R), this.reject = null, this.resolve = null, this.onPacketReceive = this.readResponsePacket;
      }
      g.on(
        "error",
        (function(L) {
          h.writeEmptyPacket();
          const R = u.createError(
            `LOCAL INFILE command failed: ${L.message}`,
            u.ER_LOCAL_INFILE_NOT_READABLE,
            A,
            "22000",
            this.sql
          );
          process.nextTick(this.reject, R), this.reject = null, this.resolve = null;
        }).bind(this)
      ), g.on("data", (L) => {
        h.writeBuffer(L, 0, L.length);
      }), g.on("end", () => {
        h.isEmpty() || h.flushBuffer(!1), h.writeEmptyPacket();
      }), this.onPacketReceive = this.readResponsePacket;
    }
    static logParam(E, h) {
      if (h == null)
        E += h === void 0 ? "undefined" : "null";
      else
        switch (h.constructor.name) {
          case "Buffer":
            E += "0x" + h.toString("hex", 0, Math.min(1024, h.length));
            break;
          case "String":
            E += "'" + h + "'";
            break;
          case "Date":
            E += _(h);
            break;
          case "Object":
            E += JSON.stringify(h);
            break;
          default:
            E += h.toString();
        }
      return E;
    }
  }
  function _(p) {
    return "'" + ("00" + (p.getMonth() + 1)).slice(-2) + "/" + ("00" + p.getDate()).slice(-2) + "/" + p.getFullYear() + " " + ("00" + p.getHours()).slice(-2) + ":" + ("00" + p.getMinutes()).slice(-2) + ":" + ("00" + p.getSeconds()).slice(-2) + "." + ("000" + p.getMilliseconds()).slice(-3) + "'";
  }
  const d = /* @__PURE__ */ new Set([
    "__defineGetter__",
    "__defineSetter__",
    "__lookupGetter__",
    "__lookupSetter__",
    "__proto__"
  ]);
  return ki = l, ki;
}
var Hi, Pu;
function Wo() {
  if (Pu) return Hi;
  Pu = 1;
  const e = Zr(), f = qe(), t = Jr(), u = Fh(), { Readable: r } = Bt, s = 39;
  class a extends e {
    constructor(n, c, i, l) {
      super(n, c, i, l), this.binary = !1;
    }
    /**
     * Send COM_QUERY
     *
     * @param out   output writer
     * @param opts  connection options
     * @param info  connection information
     */
    start(n, c, i) {
      if (c.logger.query && c.logger.query(`QUERY: ${c.logParam ? this.displaySql() : this.sql}`), this.onPacketReceive = this.readResponsePacket, this.initialValues === void 0) {
        if (n.startPacket(this), n.writeInt8(3), !this.handleTimeout(n, i)) return;
        n.writeString(this.sql), n.flush(), this.emit("send_end");
        return;
      }
      if (this.encodedSql = n.encodeString(this.sql), this.opts.namedPlaceholders)
        try {
          const _ = t.splitQueryPlaceholder(
            this.encodedSql,
            i,
            this.initialValues,
            this.opts.logParam ? this.displaySql.bind(this) : () => this.sql
          );
          this.paramPositions = _.paramPositions, this.values = _.values;
        } catch (_) {
          return this.emit("send_end"), this.throwError(_, i);
        }
      else if (this.paramPositions = t.splitQuery(this.encodedSql), this.values = Array.isArray(this.initialValues) ? this.initialValues : [this.initialValues], !this.validateParameters(i)) return;
      if (n.startPacket(this), n.writeInt8(3), !this.handleTimeout(n, i)) return;
      this.paramPos = 0, this.sqlPos = 0;
      const l = this.paramPositions.length / 2;
      for (this.valueIdx = 0; this.valueIdx < l; ) {
        n.writeBuffer(this.encodedSql, this.sqlPos, this.paramPositions[this.paramPos++] - this.sqlPos), this.sqlPos = this.paramPositions[this.paramPos++];
        const _ = this.values[this.valueIdx++];
        if (_ == null) {
          n.writeStringAscii("NULL");
          continue;
        }
        switch (typeof _) {
          case "boolean":
            n.writeStringAscii(_ ? "true" : "false");
            break;
          case "bigint":
          case "number":
            n.writeStringAscii(`${_}`);
            break;
          case "string":
            n.writeStringEscapeQuote(_);
            break;
          case "object":
            if (typeof _.pipe == "function" && typeof _.read == "function") {
              this.sending = !0, this.paramWritten = this._paramWritten.bind(this, n, i), n.writeInt8(s), _.on("data", n.writeBufferEscape.bind(n)), _.on(
                "end",
                (function() {
                  n.writeInt8(s), this.paramWritten();
                }).bind(this)
              );
              return;
            }
            if (Object.prototype.toString.call(_) === "[object Date]")
              n.writeStringAscii(u.getLocalDate(_));
            else if (Buffer.isBuffer(_))
              n.writeStringAscii("_BINARY '"), n.writeBufferEscape(_), n.writeInt8(s);
            else if (typeof _.toSqlString == "function")
              n.writeStringEscapeQuote(String(_.toSqlString()));
            else if (Array.isArray(_)) {
              c.arrayParenthesis && n.writeStringAscii("(");
              for (let d = 0; d < _.length; d++)
                d !== 0 && n.writeStringAscii(","), _[d] == null ? n.writeStringAscii("NULL") : u.writeParam(n, _[d], c, i);
              c.arrayParenthesis && n.writeStringAscii(")");
            } else if (_.type != null && [
              "Point",
              "LineString",
              "Polygon",
              "MultiPoint",
              "MultiLineString",
              "MultiPolygon",
              "GeometryCollection"
            ].includes(_.type)) {
              let d = i.isMariaDB() && i.hasMinVersion(10, 1, 4) || !i.isMariaDB() && i.hasMinVersion(5, 7, 6) ? "ST_" : "";
              switch (_.type) {
                case "Point":
                  n.writeStringAscii(
                    d + "PointFromText('POINT(" + u.geoPointToString(_.coordinates) + ")')"
                  );
                  break;
                case "LineString":
                  n.writeStringAscii(
                    d + "LineFromText('LINESTRING(" + u.geoArrayPointToString(_.coordinates) + ")')"
                  );
                  break;
                case "Polygon":
                  n.writeStringAscii(
                    d + "PolygonFromText('POLYGON(" + u.geoMultiArrayPointToString(_.coordinates) + ")')"
                  );
                  break;
                case "MultiPoint":
                  n.writeStringAscii(
                    d + "MULTIPOINTFROMTEXT('MULTIPOINT(" + u.geoArrayPointToString(_.coordinates) + ")')"
                  );
                  break;
                case "MultiLineString":
                  n.writeStringAscii(
                    d + "MLineFromText('MULTILINESTRING(" + u.geoMultiArrayPointToString(_.coordinates) + ")')"
                  );
                  break;
                case "MultiPolygon":
                  n.writeStringAscii(
                    d + "MPolyFromText('MULTIPOLYGON(" + u.geoMultiPolygonToString(_.coordinates) + ")')"
                  );
                  break;
                case "GeometryCollection":
                  n.writeStringAscii(
                    d + "GeomCollFromText('GEOMETRYCOLLECTION(" + u.geometricCollectionToString(_.geometries) + ")')"
                  );
                  break;
              }
            } else if (String === _.constructor) {
              n.writeStringEscapeQuote(_);
              break;
            } else if (c.permitSetMultiParamEntries) {
              let d = !0;
              for (let p in _) {
                const E = _[p];
                typeof E != "function" && (d ? d = !1 : n.writeStringAscii(","), n.writeString("`" + p + "`"), E == null ? n.writeStringAscii("=NULL") : (n.writeStringAscii("="), u.writeParam(n, E, c, i)));
              }
              d && n.writeStringEscapeQuote(JSON.stringify(_));
            } else
              n.writeStringEscapeQuote(JSON.stringify(_));
            break;
        }
      }
      n.writeBuffer(this.encodedSql, this.sqlPos, this.encodedSql.length - this.sqlPos), n.flush(), this.emit("send_end");
    }
    /**
     * If timeout is set, prepend query with SET STATEMENT max_statement_time=xx FOR, or throw an error
     * @param out buffer
     * @param info server information
     * @returns {boolean} false if an error has been thrown
     */
    handleTimeout(n, c) {
      return this.opts.timeout ? c.isMariaDB() ? c.hasMinVersion(10, 1, 2) ? (n.writeString(`SET STATEMENT max_statement_time=${this.opts.timeout / 1e3} FOR `), !0) : (this.sendCancelled(
        `Cannot use timeout for xpand/MariaDB server before 10.1.2. timeout value: ${this.opts.timeout}`,
        f.ER_TIMEOUT_NOT_SUPPORTED,
        c
      ), !1) : (this.sendCancelled(
        `Cannot use timeout for MySQL server. timeout value: ${this.opts.timeout}`,
        f.ER_TIMEOUT_NOT_SUPPORTED,
        c
      ), !1) : !0;
    }
    /**
     * Validate that parameters exists and are defined.
     *
     * @param info        connection info
     * @returns {boolean} return false if any error occur.
     */
    validateParameters(n) {
      return this.paramPositions.length / 2 > this.values.length ? (this.sendCancelled(
        `Parameter at position ${this.values.length + 1} is not set`,
        f.ER_MISSING_PARAMETER,
        n
      ), !1) : !0;
    }
    _paramWritten(n, c) {
      for (; ; )
        if (this.valueIdx === this.paramPositions.length / 2) {
          n.writeBuffer(this.encodedSql, this.sqlPos, this.encodedSql.length - this.sqlPos), n.flush(), this.sending = !1, this.emit("send_end");
          return;
        } else {
          const i = this.values[this.valueIdx++];
          if (n.writeBuffer(this.encodedSql, this.sqlPos, this.paramPositions[this.paramPos++] - this.sqlPos), this.sqlPos = this.paramPositions[this.paramPos++], i == null) {
            n.writeStringAscii("NULL");
            continue;
          }
          if (typeof i == "object" && typeof i.pipe == "function" && typeof i.read == "function") {
            n.writeInt8(s), i.once(
              "end",
              (function() {
                n.writeInt8(s), this._paramWritten(n, c);
              }).bind(this)
            ), i.on("data", n.writeBufferEscape.bind(n));
            return;
          }
          u.writeParam(n, i, this.opts, c);
        }
    }
    _stream(n, c) {
      return this.socket = n, c = c || {}, c.objectMode = !0, c.read = () => {
        this.socket.resume();
      }, this.inStream = new r(c), this.on("fields", function(i) {
        this.inStream.emit("fields", i);
      }), this.on("error", function(i) {
        this.inStream.emit("error", i);
      }), this.on("close", function(i) {
        this.inStream.emit("error", i);
      }), this.on("end", function(i) {
        i && this.inStream.emit("error", i), this.socket.resume(), this.inStream.push(null);
      }), this.inStream.close = (function() {
        this.handleNewRows = () => {
        }, this.socket.resume();
      }).bind(this), this.handleNewRows = function(i) {
        this.inStream.push(i) || this.socket.pause();
      }, this.inStream;
    }
  }
  return Hi = a, Hi;
}
var Gi, Du;
function jo() {
  if (Du) return Gi;
  Du = 1;
  class e {
    /**
     * Write (and escape) current parameter value to output writer
     *
     * @param out     output writer
     * @param value   current parameter
     * @param opts    connection options
     * @param info    connection information
     */
    static writeParam(t, u, r, s) {
      switch (typeof u) {
        case "boolean":
          t.writeInt8(u ? 1 : 0);
          break;
        case "bigint":
          u >= 2n ** 63n ? t.writeLengthEncodedString(u.toString()) : t.writeBigInt(u);
          break;
        case "number":
          if (Number.isInteger(u) && u >= -2147483648 && u < 2147483647) {
            t.writeInt32(u);
            break;
          }
          t.writeDouble(u);
          break;
        case "string":
          t.writeLengthEncodedString(u);
          break;
        case "object":
          Object.prototype.toString.call(u) === "[object Date]" ? t.writeBinaryDate(u) : Buffer.isBuffer(u) ? t.writeLengthEncodedBuffer(u) : typeof u.toSqlString == "function" ? t.writeLengthEncodedString(String(u.toSqlString())) : t.writeLengthEncodedString(JSON.stringify(u));
          break;
        default:
          t.writeLengthEncodedBuffer(u);
      }
    }
    static getBufferFromGeometryValue(t, u) {
      let r, s, a;
      if (u) {
        switch (u) {
          case "MultiPoint":
            return t && Array.isArray(t) && t.length >= 2 && !isNaN(t[0]) && !isNaN(t[1]) ? (r = Buffer.allocUnsafe(21), r.writeInt8(1, 0), r.writeInt32LE(1, 1), r.writeDoubleLE(t[0], 5), r.writeDoubleLE(t[1], 13), r) : null;
          case "MultiLineString":
            if (t && Array.isArray(t)) {
              const o = t.length;
              r = Buffer.allocUnsafe(9 + 16 * o), r.writeInt8(1, 0), r.writeInt32LE(2, 1), r.writeInt32LE(o, 5);
              for (let n = 0; n < o; n++)
                if (t[n] && Array.isArray(t[n]) && t[n].length >= 2 && !isNaN(t[n][0]) && !isNaN(t[n][1]))
                  r.writeDoubleLE(t[n][0], 9 + 16 * n), r.writeDoubleLE(t[n][1], 17 + 16 * n);
                else
                  return null;
              return r;
            }
            return null;
          case "MultiPolygon":
            if (t && Array.isArray(t)) {
              const o = t.length;
              let n = 0;
              for (let c = 0; c < o; c++)
                n += 4 + 16 * t[c].length;
              r = Buffer.allocUnsafe(9 + n), r.writeInt8(1, 0), r.writeInt32LE(3, 1), r.writeInt32LE(o, 5), s = 9;
              for (let c = 0; c < o; c++) {
                const i = t[c];
                if (i && Array.isArray(i)) {
                  r.writeInt32LE(i.length, s), s += 4;
                  for (let l = 0; l < i.length; l++)
                    if (i[l] && Array.isArray(i[l]) && i[l].length >= 2 && !isNaN(i[l][0]) && !isNaN(i[l][1]))
                      r.writeDoubleLE(i[l][0], s), r.writeDoubleLE(i[l][1], s + 8), s += 16;
                    else
                      return null;
                }
              }
              return r;
            }
            return null;
        }
        return null;
      } else {
        switch (t.type) {
          case "Point":
            return r = Buffer.allocUnsafe(21), r.writeInt8(1, 0), r.writeInt32LE(1, 1), t.coordinates && Array.isArray(t.coordinates) && t.coordinates.length >= 2 && !isNaN(t.coordinates[0]) && !isNaN(t.coordinates[1]) ? (r.writeDoubleLE(t.coordinates[0], 5), r.writeDoubleLE(t.coordinates[1], 13), r) : null;
          case "LineString":
            if (t.coordinates && Array.isArray(t.coordinates)) {
              const o = t.coordinates.length;
              r = Buffer.allocUnsafe(9 + 16 * o), r.writeInt8(1, 0), r.writeInt32LE(2, 1), r.writeInt32LE(o, 5);
              for (let n = 0; n < o; n++)
                if (t.coordinates[n] && Array.isArray(t.coordinates[n]) && t.coordinates[n].length >= 2 && !isNaN(t.coordinates[n][0]) && !isNaN(t.coordinates[n][1]))
                  r.writeDoubleLE(t.coordinates[n][0], 9 + 16 * n), r.writeDoubleLE(t.coordinates[n][1], 17 + 16 * n);
                else
                  return null;
              return r;
            } else
              return null;
          case "Polygon":
            if (t.coordinates && Array.isArray(t.coordinates)) {
              const o = t.coordinates.length;
              let n = 0;
              for (let c = 0; c < o; c++)
                n += 4 + 16 * t.coordinates[c].length;
              r = Buffer.allocUnsafe(9 + n), r.writeInt8(1, 0), r.writeInt32LE(3, 1), r.writeInt32LE(o, 5), s = 9;
              for (let c = 0; c < o; c++) {
                const i = t.coordinates[c];
                if (i && Array.isArray(i)) {
                  r.writeInt32LE(i.length, s), s += 4;
                  for (let l = 0; l < i.length; l++)
                    if (i[l] && Array.isArray(i[l]) && i[l].length >= 2 && !isNaN(i[l][0]) && !isNaN(i[l][1]))
                      r.writeDoubleLE(i[l][0], s), r.writeDoubleLE(i[l][1], s + 8), s += 16;
                    else
                      return null;
                }
              }
              return r;
            } else
              return null;
          case "MultiPoint":
            a = "MultiPoint", r = Buffer.allocUnsafe(9), r.writeInt8(1, 0), r.writeInt32LE(4, 1);
            break;
          case "MultiLineString":
            a = "MultiLineString", r = Buffer.allocUnsafe(9), r.writeInt8(1, 0), r.writeInt32LE(5, 1);
            break;
          case "MultiPolygon":
            a = "MultiPolygon", r = Buffer.allocUnsafe(9), r.writeInt8(1, 0), r.writeInt32LE(6, 1);
            break;
          case "GeometryCollection":
            if (r = Buffer.allocUnsafe(9), r.writeInt8(1, 0), r.writeInt32LE(7, 1), t.geometries && Array.isArray(t.geometries)) {
              const o = t.geometries.length, n = [r];
              for (let c = 0; c < o; c++) {
                const i = this.getBufferFromGeometryValue(t.geometries[c]);
                if (i == null) break;
                n.push(i);
              }
              return r.writeInt32LE(n.length - 1, 5), Buffer.concat(n);
            } else
              return r.writeInt32LE(0, 5), r;
          default:
            return null;
        }
        if (t.coordinates && Array.isArray(t.coordinates)) {
          const o = t.coordinates.length, n = [r];
          for (let c = 0; c < o; c++) {
            const i = this.getBufferFromGeometryValue(t.coordinates[c], a);
            if (i == null) break;
            n.push(i);
          }
          return r.writeInt32LE(n.length - 1, 5), Buffer.concat(n);
        } else
          return r.writeInt32LE(0, 5), r;
      }
    }
  }
  return Gi = e, Gi;
}
var qi, Uu;
function mE() {
  var f, t, u, r;
  if (Uu) return qi;
  Uu = 1;
  class e {
    constructor(a, o) {
      Oe(this, f, !1);
      Oe(this, t);
      Oe(this, u);
      Oe(this, r);
      Ne(this, t, a), Ne(this, u, o), Ne(this, r, o.conn), this.execute = T(this, u).execute, this.executeStream = T(this, u).executeStream;
    }
    get conn() {
      return T(this, r);
    }
    get id() {
      return T(this, u).id;
    }
    get parameterCount() {
      return T(this, u).parameterCount;
    }
    get _placeHolderIndex() {
      return T(this, u)._placeHolderIndex;
    }
    get columns() {
      return T(this, u).columns;
    }
    set columns(a) {
      T(this, u).columns = a;
    }
    get database() {
      return T(this, u).database;
    }
    get query() {
      return T(this, u).query;
    }
    isClose() {
      return T(this, f);
    }
    close() {
      T(this, f) || (Ne(this, f, !0), T(this, t).decrementUse());
    }
    toString() {
      return "PrepareWrapper{closed:" + T(this, f) + ",cache:" + T(this, t) + "}";
    }
  }
  return f = new WeakMap(), t = new WeakMap(), u = new WeakMap(), r = new WeakMap(), qi = e, qi;
}
var $i, Lu;
function OE() {
  var t, u, r;
  if (Lu) return $i;
  Lu = 1;
  const e = mE();
  class f {
    constructor(a) {
      Oe(this, t, 0);
      Oe(this, u);
      Oe(this, r);
      Ne(this, r, a), Ne(this, u, !0);
    }
    incrementUse() {
      return Ne(this, t, T(this, t) + 1), new e(this, T(this, r));
    }
    unCache() {
      Ne(this, u, !1), T(this, t) === 0 && T(this, r).close();
    }
    decrementUse() {
      Ne(this, t, T(this, t) - 1), T(this, t) === 0 && !T(this, u) && T(this, r).close();
    }
    toString() {
      return "Prepare{use:" + T(this, t) + ",cached:" + T(this, u) + "}";
    }
  }
  return t = new WeakMap(), u = new WeakMap(), r = new WeakMap(), $i = f, $i;
}
var Vi, bu;
function qh() {
  if (bu) return Vi;
  bu = 1;
  const e = Zr(), f = qe(), t = jo(), u = Qr(), r = Jr();
  class s extends e {
    constructor(R, O, D, m, B) {
      super(R, O, D, m), this.binary = !0, this.prepare = B, this.canSkipMeta = !0;
    }
    /**
     * Send COM_QUERY
     *
     * @param out   output writer
     * @param opts  connection options
     * @param info  connection information
     */
    start(R, O, D) {
      if (this.onPacketReceive = this.readResponsePacket, this.values = [], this.opts.namedPlaceholders) {
        if (this.prepare)
          this.values = new Array(this.prepare.parameterCount), this.placeHolderIndex = this.prepare._placeHolderIndex;
        else {
          const v = r.searchPlaceholder(this.sql);
          this.placeHolderIndex = v.placeHolderIndex, this.values = new Array(this.placeHolderIndex.length);
        }
        if (this.initialValues)
          for (let v = 0; v < this.placeHolderIndex.length; v++)
            this.values[v] = this.initialValues[this.placeHolderIndex[v]];
      } else
        this.initialValues && (this.values = Array.isArray(this.initialValues) ? this.initialValues : [this.initialValues]);
      if (this.parameterCount = this.prepare ? this.prepare.parameterCount : this.values.length, !this.validateParameters(D)) return;
      this.parametersType = new Array(this.parameterCount);
      let m = !1, B;
      for (let v = 0; v < this.parameterCount; v++) {
        if (B = this.values[v], B && B.type != null && [
          "Point",
          "LineString",
          "Polygon",
          "MultiPoint",
          "MultiLineString",
          "MultiPolygon",
          "GeometryCollection"
        ].includes(B.type)) {
          const M = t.getBufferFromGeometryValue(B);
          M == null ? (this.values[v] = null, B = null) : (this.values[v] = Buffer.concat([
            Buffer.from([0, 0, 0, 0]),
            // SRID
            M
            // WKB
          ]), B = this.values[v]);
        }
        if (B == null)
          this.parametersType[v] = o;
        else
          switch (typeof B) {
            case "boolean":
              this.parametersType[v] = n;
              break;
            case "bigint":
              B >= 2n ** 63n ? this.parametersType[v] = c : this.parametersType[v] = i;
              break;
            case "number":
              if (Number.isInteger(B) && B >= -2147483648 && B < 2147483647) {
                this.parametersType[v] = l;
                break;
              }
              this.parametersType[v] = _;
              break;
            case "string":
              this.parametersType[v] = d;
              break;
            case "object":
              Object.prototype.toString.call(B) === "[object Date]" ? this.parametersType[v] = E : Buffer.isBuffer(B) ? B.length < 16384 || !this.prepare ? this.parametersType[v] = h : (this.parametersType[v] = N, m = !0) : typeof B.toSqlString == "function" ? this.parametersType[v] = A : typeof B.pipe == "function" && typeof B.read == "function" ? (m = !0, this.parametersType[v] = C) : String === B.constructor ? this.parametersType[v] = p : this.parametersType[v] = g;
              break;
          }
      }
      if (this.longDataStep = !1, m) {
        for (let v = 0; v < this.parameterCount; v++)
          if (this.parametersType[v].isLongData()) {
            O.logger.query && O.logger.query(
              `EXECUTE: (${this.prepare ? this.prepare.id : -1}) sql: ${O.logParam ? this.displaySql() : this.sql}`
            ), this.longDataStep || (this.longDataStep = !0, this.registerStreamSendEvent(R, D), this.currentParam = v), this.sendComStmtLongData(R, D, this.values[v]);
            return;
          }
      }
      this.longDataStep || (O.logger.query && O.logger.query(
        `EXECUTE: (${this.prepare ? this.prepare.id : -1}) sql: ${O.logParam ? this.displaySql() : this.sql}`
      ), this.sendComStmtExecute(R, D));
    }
    /**
     * Validate that parameters exists and are defined.
     *
     * @param info        connection info
     * @returns {boolean} return false if any error occur.
     */
    validateParameters(R) {
      if (this.parameterCount > this.values.length)
        return this.sendCancelled(
          `Parameter at position ${this.values.length} is not set\\nsql: ${this.opts.logParam ? this.displaySql() : this.sql}`,
          f.ER_MISSING_PARAMETER,
          R
        ), !1;
      if (this.opts.namedPlaceholders && this.placeHolderIndex) {
        for (let O = 0; O < this.parameterCount; O++)
          if (this.values[O] === void 0) {
            let D = `Parameter named ${this.placeHolderIndex[O]} is not set`;
            return this.placeHolderIndex.length < this.parameterCount && (D = `Command expect ${this.parameterCount} parameters, but found only ${this.placeHolderIndex.length} named parameters. You probably use question mark in place of named parameters`), this.sendCancelled(D, f.ER_PARAMETER_UNDEFINED, R), !1;
          }
      }
      return !0;
    }
    sendComStmtLongData(R, O, D) {
      if (R.startPacket(this), R.writeInt8(24), R.writeInt32(this.prepare.id), R.writeInt16(this.currentParam), Buffer.isBuffer(D))
        return R.writeBuffer(D, 0, D.length), R.flush(), this.currentParam++, this.paramWritten();
      this.sending = !0, D.on("data", function(m) {
        R.writeBuffer(m, 0, m.length);
      }), D.on(
        "end",
        (function() {
          R.flush(), this.currentParam++, this.paramWritten();
        }).bind(this)
      );
    }
    /**
     * Send a COM_STMT_EXECUTE
     * @param out
     * @param info
     */
    sendComStmtExecute(R, O) {
      let D = ~~((this.parameterCount + 7) / 8);
      const m = Buffer.alloc(D);
      for (let B = 0; B < this.parameterCount; B++)
        this.values[B] == null && (m[~~(B / 8)] |= 1 << B % 8);
      R.startPacket(this), R.writeInt8(23), R.writeInt32(this.prepare ? this.prepare.id : -1), R.writeInt8(0), R.writeInt32(1), R.writeBuffer(m, 0, D), R.writeInt8(1);
      for (let B = 0; B < this.parameterCount; B++)
        R.writeInt8(this.parametersType[B].type), R.writeInt8(0);
      for (let B = 0; B < this.parameterCount; B++) {
        const v = this.parametersType[B];
        v.encoder && v.encoder(R, this.values[B]);
      }
      R.flush(), this.sending = !1, this.emit("send_end");
    }
    /**
     * Define params events.
     * Each parameter indicate that he is written to socket,
     * emitting event so next stream parameter can be written.
     */
    registerStreamSendEvent(R, O) {
      this.paramWritten = (function() {
        if (this.longDataStep) {
          for (; this.currentParam < this.parameterCount; this.currentParam++)
            if (this.parametersType[this.currentParam].isLongData()) {
              const D = this.values[this.currentParam];
              this.sendComStmtLongData(R, O, D);
              return;
            }
          this.longDataStep = !1;
        }
        this.longDataStep || this.sendComStmtExecute(R, O);
      }).bind(this);
    }
  }
  class a {
    constructor(R, O, D = !1, m = !1) {
      this.pipe = D, this.type = R, this.encoder = O, this.isNull = m;
    }
    isLongData() {
      return this.encoder === null && !this.isNull;
    }
  }
  const o = new a(u.VAR_STRING, null, !1, !0), n = new a(u.TINY, (L, R) => L.writeInt8(R ? 1 : 0)), c = new a(
    u.NEWDECIMAL,
    (L, R) => L.writeLengthEncodedString(R.toString())
  ), i = new a(u.BIGINT, (L, R) => L.writeBigInt(R)), l = new a(u.INT, (L, R) => L.writeInt32(R)), _ = new a(u.DOUBLE, (L, R) => L.writeDouble(R)), d = new a(u.VAR_STRING, (L, R) => L.writeLengthEncodedString(R)), p = new a(
    u.VAR_STRING,
    (L, R) => L.writeLengthEncodedString(R.toString())
  ), E = new a(u.DATETIME, (L, R) => L.writeBinaryDate(R)), h = new a(u.BLOB, (L, R) => L.writeLengthEncodedBuffer(R)), N = new a(u.BLOB, null), A = new a(
    u.VAR_STRING,
    (L, R) => L.writeLengthEncodedString(String(R.toSqlString()))
  ), C = new a(u.BLOB, null, !0), g = new a(
    u.VAR_STRING,
    (L, R) => L.writeLengthEncodedString(JSON.stringify(R))
  );
  return Vi = s, Vi;
}
var Wi, yu;
function wE() {
  if (yu) return Wi;
  yu = 1;
  const e = qh(), { Readable: f } = Bt;
  class t extends e {
    constructor(r, s, a, o) {
      super(
        () => {
        },
        () => {
        },
        s,
        r,
        a
      ), this.socket = o, this.inStream = new f({
        objectMode: !0,
        read: () => {
          this.socket.resume();
        }
      }), this.on("fields", function(n) {
        this.inStream.emit("fields", n);
      }), this.on("error", function(n) {
        this.inStream.emit("error", n);
      }), this.on("close", function(n) {
        this.inStream.emit("error", n);
      }), this.on("end", function(n) {
        n && this.inStream.emit("error", n), this.socket.resume(), this.inStream.push(null);
      }), this.inStream.close = (function() {
        this.handleNewRows = () => {
        }, this.socket.resume();
      }).bind(this);
    }
    handleNewRows(r) {
      this.inStream.push(r) || this.socket.pause();
    }
  }
  return Wi = t, Wi;
}
var ji, vu;
function PE() {
  var r;
  if (vu) return ji;
  vu = 1;
  const e = qe(), f = wE(), t = Zr();
  class u {
    constructor(a, o, n, c, i, l, _) {
      Oe(this, r);
      this.id = a, this.parameterCount = o, this.columns = n, this.database = c, this.query = i, this.closed = !1, this._placeHolderIndex = l, Ne(this, r, _);
    }
    get conn() {
      return T(this, r);
    }
    execute(a, o, n, c) {
      let i = o, l = n;
      if (typeof i == "function" && (l = i, i = void 0), this.isClose()) {
        let E = this.query;
        if (this.conn.opts.logParam)
          if (this.query.length > this.conn.opts.debugLen)
            E = this.query.substring(0, this.conn.opts.debugLen) + "...";
          else {
            let N = this.query + " - parameters:";
            E = t.logParameters(this.conn.opts, N, a);
          }
        const h = e.createError(
          "Execute fails, prepare command as already been closed",
          e.ER_PREPARE_CLOSED,
          null,
          "22000",
          E
        );
        if (l) {
          l(h);
          return;
        } else
          return Promise.reject(h);
      }
      const _ = {
        sql: this.query,
        values: a,
        opts: i,
        callback: l
      };
      c && (_.stack = c);
      const d = this.conn, p = new Promise((E, h) => d.executePromise.call(d, _, this, E, h));
      if (l)
        p.then((E) => {
          l && l(null, E, null);
        }).catch(l || function(E) {
        });
      else
        return p;
    }
    executeStream(a, o, n, c) {
      let i = o, l = n;
      if (typeof i == "function" && (l = i, i = void 0), this.isClose()) {
        const p = e.createError(
          "Execute fails, prepare command as already been closed",
          e.ER_PREPARE_CLOSED,
          null,
          "22000",
          this.query
        );
        if (l) {
          l(p);
          return;
        } else
          throw p;
      }
      const _ = {
        sql: this.query,
        values: a,
        opts: i,
        callback: l
      };
      c && (_.stack = c);
      const d = new f(_, this.conn.opts, this, this.conn.socket);
      return this.conn.opts.logger.error && d.on("error", this.conn.opts.logger.error), this.conn.addCommand(d, !0), d.inStream;
    }
    isClose() {
      return this.closed;
    }
    close() {
      this.closed || (this.closed = !0, T(this, r).emit("close_prepare", this));
    }
    toString() {
      return "Prepare{closed:" + this.closed + "}";
    }
  }
  return r = new WeakMap(), ji = u, ji;
}
var Yi, Fu;
function DE() {
  if (Fu) return Yi;
  Fu = 1;
  const e = Zr(), f = Jr(), t = jo(), u = OE(), r = PE(), s = hr(), a = qe(), o = Gh();
  class n extends e {
    constructor(i, l, _, d, p) {
      super(i, l, _, d), this.encoder = new t(this.opts), this.binary = !0, this.conn = p, this.executeCommand = d.executeCommand;
    }
    /**
     * Send COM_STMT_PREPARE
     *
     * @param out   output writer
     * @param opts  connection options
     * @param info  connection information
     */
    start(i, l, _) {
      if (this.conn.prepareCache) {
        let d = this.conn.prepareCache.get(this.sql);
        if (d)
          return this.emit("send_end"), this.successEnd(d);
      }
      if (l.logger.query && l.logger.query(`PREPARE: ${this.sql}`), this.onPacketReceive = this.readPrepareResultPacket, this.opts.namedPlaceholders) {
        const d = f.searchPlaceholder(this.sql);
        this.sql = d.sql, this.placeHolderIndex = d.placeHolderIndex;
      }
      i.startPacket(this), i.writeInt8(22), i.writeString(this.sql), i.flush(), this.emit("send_end");
    }
    successPrepare(i, l) {
      let _ = new r(
        this.statementId,
        this.parameterCount,
        this._columns,
        i.database,
        this.sql,
        this.placeHolderIndex,
        this.conn
      );
      if (this.conn.prepareCache) {
        let d = new u(_);
        this.conn.prepareCache.set(this.sql, d);
        const p = d.incrementUse();
        return this.executeCommand && (this.executeCommand.prepare = p), this.successEnd(p);
      }
      this.executeCommand && (this.executeCommand.prepare = _), this.successEnd(_);
    }
    /**
     * Read COM_STMT_PREPARE response Packet.
     * see https://mariadb.com/kb/en/library/com_stmt_prepare/#com_stmt_prepare-response
     *
     * @param packet    COM_STMT_PREPARE_OK packet
     * @param opts      connection options
     * @param info      connection information
     * @param out       output writer
     * @returns {*}     null or {Result.readResponsePacket} in case of multi-result-set
     */
    readPrepareResultPacket(i, l, _, d) {
      switch (i.peek()) {
        //*********************************************************************************************************
        //* PREPARE response
        //*********************************************************************************************************
        case 0:
          return i.skip(1), this.statementId = i.readInt32(), this.columnNo = i.readUInt16(), this.parameterCount = i.readUInt16(), this._parameterNo = this.parameterCount, this._columns = [], this._parameterNo > 0 ? this.onPacketReceive = this.skipPrepareParameterPacket : this.columnNo > 0 ? this.onPacketReceive = this.readPrepareColumnsPacket : this.successPrepare(d, _);
        //*********************************************************************************************************
        //* ERROR response
        //*********************************************************************************************************
        case 255:
          const p = i.readError(d, this.displaySql(), this.stack);
          return d.status |= s.STATUS_IN_TRANS, this.onPacketReceive = this.readResponsePacket, this.throwError(p, d);
        //*********************************************************************************************************
        //* Unexpected response
        //*********************************************************************************************************
        default:
          return d.status |= s.STATUS_IN_TRANS, this.onPacketReceive = this.readResponsePacket, this.throwError(a.ER_UNEXPECTED_PACKET, d);
      }
    }
    readPrepareColumnsPacket(i, l, _, d) {
      if (this.columnNo--, this._columns.push(new o(i, d, _.rowsAsArray)), this.columnNo === 0) {
        if (d.eofDeprecated)
          return this.successPrepare(d, _);
        this.onPacketReceive = this.skipEofPacket;
      }
    }
    skipEofPacket(i, l, _, d) {
      if (this.columnNo > 0) return this.onPacketReceive = this.readPrepareColumnsPacket;
      this.successPrepare(d, _);
    }
    skipPrepareParameterPacket(i, l, _, d) {
      if (this._parameterNo--, this._parameterNo === 0) {
        if (d.eofDeprecated)
          return this.columnNo > 0 ? this.onPacketReceive = this.readPrepareColumnsPacket : this.successPrepare(d, _);
        this.onPacketReceive = this.skipEofPacket;
      }
    }
    /**
     * Display current SQL with parameters (truncated if too big)
     *
     * @returns {string}
     */
    displaySql() {
      return this.opts && this.sql.length > this.opts.debugLen ? this.sql.substring(0, this.opts.debugLen) + "..." : this.sql;
    }
  }
  return Yi = n, Yi;
}
var Ki, Mu;
function UE() {
  if (Mu) return Ki;
  Mu = 1;
  const e = er();
  class f extends e {
    constructor(u, r, s, a) {
      super(u, r, s), this.prepare = a;
    }
    start(u, r, s) {
      r.logger.query && r.logger.query(`CLOSE PREPARE: (${this.prepare.id}) ${this.prepare.query}`);
      const a = new Uint8Array([
        5,
        0,
        0,
        0,
        25,
        this.prepare.id,
        this.prepare.id >> 8,
        this.prepare.id >> 16,
        this.prepare.id >> 24
      ]);
      u.fastFlush(this, a), this.onPacketReceive = null, this.emit("send_end"), this.emit("end");
    }
  }
  return Ki = f, Ki;
}
var zi, xu;
function LE() {
  if (xu) return zi;
  xu = 1;
  const e = Zr(), f = qe(), t = jo(), u = Qr(), r = Vo();
  class s extends e {
    constructor(o, n, c, i, l) {
      super(o, n, c, l), this.cmdOpts = l.opts, this.binary = !0, this.prepare = i, this.canSkipMeta = !0;
    }
    /**
     * Send COM_STMT_BULK_EXECUTE
     *
     * @param out   output writer
     * @param opts  connection options
     * @param info  connection information
     */
    start(o, n, c) {
      if (this.info = c, this.values = this.initialValues, this.cmdOpts && this.cmdOpts.timeout)
        return this.bulkPacketNo = 1, this.sending = !1, this.sendCancelled("Cannot use timeout for Batch statement", f.ER_TIMEOUT_NOT_SUPPORTED);
      if (this.onPacketReceive = this.readResponsePacket, this.opts.namedPlaceholders && this.prepare._placeHolderIndex) {
        if (this.values = [], this.initialValues)
          for (let i = 0; i < this.initialValues.length; i++) {
            let l = this.initialValues[i];
            this.values[i] = new Array(this.prepare.parameterCount);
            for (let _ = 0; _ < this.prepare._placeHolderIndex.length; _++)
              this.values[i][_] = l[this.prepare._placeHolderIndex[_]];
          }
      } else
        this.values = this.initialValues;
      this.validateParameters(c) && this.sendComStmtBulkExecute(o, n, c);
    }
    /**
     * Set header type
     * @param value current value
     * @param parameterCount parameter number
     * @returns {*[]} header type array
     */
    parameterHeaderFromValue(o, n) {
      const c = new Array(n);
      for (let i = 0; i < n; i++) {
        const l = o[i];
        if (l != null)
          switch (typeof l) {
            case "boolean":
              c[i] = u.TINY;
              break;
            case "bigint":
              l >= 2n ** 63n ? c[i] = u.NEWDECIMAL : c[i] = u.BIGINT;
              break;
            case "number":
              if (Number.isInteger(l) && l >= -2147483648 && l < 2147483647) {
                c[i] = u.INT;
                break;
              }
              c[i] = u.DOUBLE;
              break;
            case "string":
              c[i] = u.VAR_STRING;
              break;
            case "object":
              Object.prototype.toString.call(l) === "[object Date]" ? c[i] = u.DATETIME : Buffer.isBuffer(l) ? c[i] = u.BLOB : typeof l.toSqlString == "function" ? c[i] = u.VAR_STRING : l.type != null && [
                "Point",
                "LineString",
                "Polygon",
                "MultiPoint",
                "MultiLineString",
                "MultiPolygon",
                "GeometryCollection"
              ].includes(l.type) ? c[i] = u.BLOB : c[i] = u.VAR_STRING;
              break;
            default:
              c[i] = u.BLOB;
              break;
          }
        else
          c[i] = u.VAR_STRING;
      }
      return c;
    }
    /**
     * Check current value has same header than set in initial BULK header
     *
     * @param parameterHeaderType current header
     * @param value current value
     * @param parameterCount number of parameter
     * @returns {boolean} true if identical
     */
    checkSameHeader(o, n, c) {
      let i;
      for (let l = 0; l < c; l++)
        if ((i = n[l]) != null)
          switch (typeof i) {
            case "boolean":
              if (o[l] !== u.TINY) return !1;
              break;
            case "bigint":
              if (i >= 2n ** 63n) {
                if (o[l] !== u.VAR_STRING) return !1;
              } else if (o[l] !== u.BIGINT) return !1;
              break;
            case "number":
              if (Number.isInteger(i) && i >= -2147483648 && i < 2147483647) {
                if (o[l] !== u.INT) return !1;
                break;
              }
              if (o[l] !== u.DOUBLE) return !1;
              break;
            case "string":
              if (o[l] !== u.VAR_STRING) return !1;
              break;
            case "object":
              if (Object.prototype.toString.call(i) === "[object Date]") {
                if (o[l] !== u.TIMESTAMP) return !1;
              } else if (Buffer.isBuffer(i)) {
                if (o[l] !== u.BLOB) return !1;
              } else if (typeof i.toSqlString == "function") {
                if (o[l] !== u.VAR_STRING) return !1;
              } else if (i.type != null && [
                "Point",
                "LineString",
                "Polygon",
                "MultiPoint",
                "MultiLineString",
                "MultiPolygon",
                "GeometryCollection"
              ].includes(i.type)) {
                if (o[l] !== u.BLOB) return !1;
              } else if (o[l] !== u.VAR_STRING) return !1;
              break;
            default:
              if (o[l] !== u.BLOB) return !1;
              break;
          }
      return !0;
    }
    /**
     * Send a COM_STMT_BULK_EXECUTE
     * @param out output packet writer
     * @param opts options
     * @param info information
     */
    sendComStmtBulkExecute(o, n, c) {
      n.logger.query && n.logger.query(`BULK: (${this.prepare.id}) sql: ${n.logParam ? this.displaySql() : this.sql}`);
      const i = this.prepare.parameterCount;
      this.rowIdx = 0, this.vals = this.values[this.rowIdx++];
      let l = this.parameterHeaderFromValue(this.vals, i), _ = null;
      this.bulkPacketNo = 0, this.sending = !0;
      e: for (; ; ) {
        this.bulkPacketNo++, o.startPacket(this), o.writeInt8(250), o.writeInt32(this.prepare.id), o.writeInt16(128);
        for (let d = 0; d < i; d++)
          o.writeInt16(l[d]);
        if (_ != null) {
          const d = o.checkMaxAllowedLength(_.length, c);
          if (d) {
            this.sending = !1, this.throwError(d, c);
            return;
          }
          if (o.writeBuffer(_, 0, _.length), o.mark(), _ = null, this.rowIdx >= this.values.length)
            break;
          this.vals = this.values[this.rowIdx++];
        }
        t: for (; ; ) {
          for (let d = 0; d < i; d++) {
            let p = this.vals[d];
            if (p != null)
              if (p.type != null && [
                "Point",
                "LineString",
                "Polygon",
                "MultiPoint",
                "MultiLineString",
                "MultiPolygon",
                "GeometryCollection"
              ].includes(p.type)) {
                const E = t.getBufferFromGeometryValue(p);
                E == null ? o.writeInt8(1) : (o.writeInt8(0), p = Buffer.concat([
                  Buffer.from([0, 0, 0, 0]),
                  // SRID
                  E
                  // WKB
                ]), t.writeParam(o, p, this.opts, c));
              } else
                o.writeInt8(0), t.writeParam(o, p, this.opts, c);
            else
              o.writeInt8(1);
          }
          if (!o.bufIsDataAfterMark() && !o.isMarked() && o.hasFlushed()) {
            if (o.flush(), !this.rowIdx >= this.values.length)
              break e;
            this.vals = this.values[this.rowIdx++], l = this.parameterHeaderFromValue(this.vals, i);
            break t;
          }
          if (o.isMarked() && o.bufIsAfterMaxPacketLength()) {
            o.flushBufferStopAtMark(), o.mark(), _ = o.resetMark();
            break;
          }
          if (o.mark(), o.bufIsDataAfterMark()) {
            _ = o.resetMark();
            break;
          }
          if (this.rowIdx >= this.values.length)
            break e;
          if (this.vals = this.values[this.rowIdx++], !this.checkSameHeader(l, this.vals, i)) {
            o.flush(), l = this.parameterHeaderFromValue(this.vals, i);
            break t;
          }
        }
      }
      o.flush(), this.sending = !1, this.emit("send_end");
    }
    displaySql() {
      if (this.sql.length > this.opts.debugLen)
        return this.sql.substring(0, this.opts.debugLen) + "...";
      let o = this.sql + " - parameters:[";
      for (let n = 0; n < this.initialValues.length; n++) {
        n !== 0 && (o += ",");
        let c = this.initialValues[n];
        if (o = e.logParameters(this.opts, o, c), o.length > this.opts.debugLen)
          return o.substring(0, this.opts.debugLen) + "...";
      }
      return o += "]", o;
    }
    success(o) {
      if (this.bulkPacketNo--, this._responseIndex === 0 && (this.opts.metaAsArray ? o[0] instanceof r && this._rows.push(o[0]) : o instanceof r && this._rows.push(o)), !this.sending && this.bulkPacketNo === 0) {
        if (this.packet = null, this.firstError)
          this.resolve = null, this.onPacketReceive = null, this._columns = null, this._rows = null, process.nextTick(this.reject, this.firstError), this.reject = null, this.emit("end", this.firstError);
        else {
          if (this._rows[0].affectedRows !== void 0) {
            let n = 0;
            this._rows.forEach((i) => {
              n += i.affectedRows;
            });
            const c = new r(
              n,
              this._rows[0].insertId,
              this._rows[this._rows.length - 1].warningStatus
            );
            this.successEnd(this.opts.metaAsArray ? [c, []] : c);
          } else if (this._rows.length === 1 && this.successEnd(this.opts.metaAsArray ? [this._rows[0], this._columns] : this._rows[0]), this.opts.metaAsArray)
            if (this._rows.length === 1)
              this.successEnd([this._rows[0], this._columns]);
            else {
              const n = [];
              this._rows.forEach((c) => {
                n.push(...c);
              }), this.successEnd([n, this._columns]);
            }
          else if (this._rows.length === 1)
            this.successEnd(this._rows[0]);
          else {
            const n = [];
            this._rows.forEach((c) => {
              n.push(...c);
            }), Object.defineProperty(n, "meta", {
              value: this._columns,
              writable: !0,
              enumerable: this.opts.metaEnumerable
            }), this.successEnd(n);
          }
          this._columns = null, this._rows = null;
        }
        return;
      }
      this.firstError || (this._responseIndex++, this.onPacketReceive = this.readResponsePacket);
    }
    throwError(o, n) {
      this.bulkPacketNo--, this.firstError || (o.fatal && (this.bulkPacketNo = 0), this.cmdParam.stack && (o = f.createError(
        o.message,
        o.errno,
        n,
        o.sqlState,
        this.sql,
        o.fatal,
        this.cmdParam.stack,
        !1
      )), this.firstError = o), !this.sending && this.bulkPacketNo === 0 ? (this.resolve = null, this.emit("send_end"), process.nextTick(this.reject, this.firstError), this.reject = null, this.onPacketReceive = null, this.emit("end", this.firstError)) : (this._responseIndex++, this.onPacketReceive = this.readResponsePacket);
    }
    /**
     * Validate that parameters exists and are defined.
     *
     * @param info        connection info
     * @returns {boolean} return false if any error occur.
     */
    validateParameters(o) {
      const n = this.prepare.parameterCount;
      for (let c = 0; c < this.values.length; c++)
        if (Array.isArray(this.values[c]) || (this.values[c] = [this.values[c]]), this.values[c].length < n)
          return this.emit("send_end"), this.throwNewError(
            `Expect ${n} parameters, but at index ${c}, parameters only contains ${this.values[c].length}
 ${this.opts.logParam ? this.displaySql() : this.sql}`,
            !1,
            o,
            "HY000",
            f.ER_PARAMETER_UNDEFINED
          ), !1;
      return !0;
    }
  }
  return zi = s, zi;
}
var Xi, Bu;
function bE() {
  if (Bu) return Xi;
  Bu = 1;
  const e = Xr(), f = Ht(), t = Bh(), u = $o(), r = wt(), s = Hh();
  class a extends s {
    constructor(c, i, l, _, d) {
      super(c, l, _, () => {
      }, d), this.configAssign(i, c.opts);
    }
    start(c, i, l) {
      i.logger.query && i.logger.query(`CHANGE USER to '${this.opts.user || ""}'`);
      let _;
      const d = Array.isArray(this.opts.password) ? this.opts.password[0] : this.opts.password;
      switch (l.defaultPluginName) {
        case "mysql_native_password":
        case "":
          _ = u.encryptSha1Password(d, l.seed);
          break;
        case "client_ed25519":
          _ = t.encryptPassword(d, l.seed);
          break;
        default:
          _ = Buffer.alloc(0);
          break;
      }
      if (c.startPacket(this), c.writeInt8(17), c.writeString(this.opts.user || ""), c.writeInt8(0), l.serverCapabilities & f.SECURE_CONNECTION ? (c.writeInt8(_.length), c.writeBuffer(_, 0, _.length)) : (c.writeBuffer(_, 0, _.length), c.writeInt8(0)), l.clientCapabilities & f.CONNECT_WITH_DB && (c.writeString(this.opts.database), c.writeInt8(0), l.database = this.opts.database), this.opts.collation ? (!this.opts.charset || l.collation.charset !== this.opts.collation.charset) && (l.collation = this.opts.collation) : (l.collation.charset !== "utf8" || l.collation.maxLength === 3) && (l.collation = r.fromIndex(224)), c.writeInt16(l.collation.index), l.clientCapabilities & f.PLUGIN_AUTH && (c.writeString(l.defaultPluginName), c.writeInt8(0)), l.clientCapabilities & f.CONNECT_ATTRS) {
        c.writeInt8(252);
        let p = c.pos;
        c.writeInt16(0);
        const E = l.collation.charset;
        o(c, "_client_name", E), o(c, "MariaDB connector/Node", E);
        let h = xn;
        if (o(c, "_client_version", E), o(c, h.version, E), o(c, "_node_version", E), o(c, process.versions.node, E), i.connectAttributes !== !0) {
          let N = Object.keys(this.opts.connectAttributes);
          for (let A = 0; A < N.length; ++A)
            o(c, N[A], E), o(c, this.opts.connectAttributes[N[A]], E);
        }
        c.writeInt16AtPos(p);
      }
      c.flush(), this.plugin.onPacketReceive = this.handshakeResult.bind(this);
    }
    /**
     * Assign global configuration option used by result-set to current query option.
     * a little faster than Object.assign() since doest copy all information
     *
     * @param connOpts  connection global configuration
     * @param cmdOpts   current options
     */
    configAssign(c, i) {
      if (!i) {
        this.opts = c;
        return;
      }
      if (this.opts = i ? Object.assign({}, c, i) : c, i.charset && typeof i.charset == "string") {
        if (this.opts.collation = r.fromCharset(i.charset.toLowerCase()), this.opts.collation === void 0 && (this.opts.collation = r.fromName(i.charset.toUpperCase()), this.opts.collation !== void 0 && this.opts.logger.warning(
          "warning: please use option 'collation' in replacement of 'charset' when using a collation name ('" + i.charset + `')
(collation looks like 'UTF8MB4_UNICODE_CI', charset like 'utf8').`
        )), this.opts.collation === void 0) throw new RangeError("Unknown charset '" + i.charset + "'");
      } else if (i.collation && typeof i.collation == "string") {
        const l = i.collation;
        if (this.opts.collation = r.fromName(l.toUpperCase()), this.opts.collation === void 0) throw new RangeError("Unknown collation '" + l + "'");
      } else
        this.opts.collation = r.fromIndex(i.charsetNumber) || c.collation;
      c.password = i.password;
    }
  }
  function o(n, c, i) {
    let l = Buffer.isEncoding(i) ? Buffer.from(c, i) : e.encode(c, i);
    n.writeLengthCoded(l.length), n.writeBuffer(l, 0, l.length);
  }
  return Xi = a, Xi;
}
var Qi = {}, ku;
function $h() {
  if (ku) return Qi;
  ku = 1;
  const e = {
    NOT_CONNECTED: 1,
    CONNECTING: 2,
    AUTHENTICATING: 3,
    INIT_CMD: 4,
    CONNECTED: 5,
    CLOSING: 6,
    CLOSED: 7
  };
  return Qi.Status = e, Qi;
}
var gr = {}, Hu;
function yE() {
  var _, d, E, h, N, A, C, g, L, R, O, D, m, B, v, M, F, I, w, x, V, z, j, J, fe, Ce, b, k, xo, X, U, P, K, Vh, he, de, Se, vt, Ft, Bo, Ln, bn, Ge, ko, Yr, Mt, Ho;
  if (Hu) return gr;
  Hu = 1, Object.defineProperty(gr, "__esModule", { value: !0 }), gr.LRUCache = void 0;
  const e = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date, f = /* @__PURE__ */ new Set(), t = typeof process == "object" && process ? process : {}, u = (ie, q, H, Y) => {
    typeof t.emitWarning == "function" ? t.emitWarning(ie, q, H, Y) : console.error(`[${H}] ${q}: ${ie}`);
  };
  let r = globalThis.AbortController, s = globalThis.AbortSignal;
  if (typeof r > "u") {
    s = class {
      constructor() {
        ge(this, "onabort");
        ge(this, "_onabort", []);
        ge(this, "reason");
        ge(this, "aborted", !1);
      }
      addEventListener(Y, te) {
        this._onabort.push(te);
      }
    }, r = class {
      constructor() {
        ge(this, "signal", new s());
        q();
      }
      abort(Y) {
        var te, ee;
        if (!this.signal.aborted) {
          this.signal.reason = Y, this.signal.aborted = !0;
          for (const ae of this.signal._onabort)
            ae(Y);
          (ee = (te = this.signal).onabort) == null || ee.call(te, Y);
        }
      }
    };
    let ie = ((_ = t.env) == null ? void 0 : _.LRU_CACHE_IGNORE_AC_WARNING) !== "1";
    const q = () => {
      ie && (ie = !1, u("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", q));
    };
  }
  const a = (ie) => !f.has(ie), o = (ie) => ie && ie === Math.floor(ie) && ie > 0 && isFinite(ie), n = (ie) => o(ie) ? ie <= Math.pow(2, 8) ? Uint8Array : ie <= Math.pow(2, 16) ? Uint16Array : ie <= Math.pow(2, 32) ? Uint32Array : ie <= Number.MAX_SAFE_INTEGER ? c : null : null;
  class c extends Array {
    constructor(q) {
      super(q), this.fill(0);
    }
  }
  const p = class p {
    constructor(q, H) {
      ge(this, "heap");
      ge(this, "length");
      if (!T(p, d))
        throw new TypeError("instantiate Stack using Stack.create(n)");
      this.heap = new H(q), this.length = 0;
    }
    static create(q) {
      const H = n(q);
      if (!H)
        return [];
      Ne(p, d, !0);
      const Y = new p(q, H);
      return Ne(p, d, !1), Y;
    }
    push(q) {
      this.heap[this.length++] = q;
    }
    pop() {
      return this.heap[--this.length];
    }
  };
  d = new WeakMap(), // private constructor
  Oe(p, d, !1);
  let i = p;
  const Te = class Te {
    constructor(q) {
      Oe(this, k);
      // options that cannot be changed without disaster
      Oe(this, N);
      Oe(this, A);
      Oe(this, C);
      Oe(this, g);
      Oe(this, L);
      Oe(this, R);
      /**
       * {@link LRUCache.OptionsBase.ttl}
       */
      ge(this, "ttl");
      /**
       * {@link LRUCache.OptionsBase.ttlResolution}
       */
      ge(this, "ttlResolution");
      /**
       * {@link LRUCache.OptionsBase.ttlAutopurge}
       */
      ge(this, "ttlAutopurge");
      /**
       * {@link LRUCache.OptionsBase.updateAgeOnGet}
       */
      ge(this, "updateAgeOnGet");
      /**
       * {@link LRUCache.OptionsBase.updateAgeOnHas}
       */
      ge(this, "updateAgeOnHas");
      /**
       * {@link LRUCache.OptionsBase.allowStale}
       */
      ge(this, "allowStale");
      /**
       * {@link LRUCache.OptionsBase.noDisposeOnSet}
       */
      ge(this, "noDisposeOnSet");
      /**
       * {@link LRUCache.OptionsBase.noUpdateTTL}
       */
      ge(this, "noUpdateTTL");
      /**
       * {@link LRUCache.OptionsBase.maxEntrySize}
       */
      ge(this, "maxEntrySize");
      /**
       * {@link LRUCache.OptionsBase.sizeCalculation}
       */
      ge(this, "sizeCalculation");
      /**
       * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
       */
      ge(this, "noDeleteOnFetchRejection");
      /**
       * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
       */
      ge(this, "noDeleteOnStaleGet");
      /**
       * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
       */
      ge(this, "allowStaleOnFetchAbort");
      /**
       * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
       */
      ge(this, "allowStaleOnFetchRejection");
      /**
       * {@link LRUCache.OptionsBase.ignoreFetchAbort}
       */
      ge(this, "ignoreFetchAbort");
      // computed properties
      Oe(this, O);
      Oe(this, D);
      Oe(this, m);
      Oe(this, B);
      Oe(this, v);
      Oe(this, M);
      Oe(this, F);
      Oe(this, I);
      Oe(this, w);
      Oe(this, x);
      Oe(this, V);
      Oe(this, z);
      Oe(this, j);
      Oe(this, J);
      Oe(this, fe);
      Oe(this, Ce);
      Oe(this, b);
      // conditionally set private methods related to TTL
      Oe(this, X, () => {
      });
      Oe(this, U, () => {
      });
      Oe(this, P, () => {
      });
      /* c8 ignore stop */
      Oe(this, K, () => !1);
      Oe(this, he, (q) => {
      });
      Oe(this, de, (q, H, Y) => {
      });
      Oe(this, Se, (q, H, Y, te) => {
        if (Y || te)
          throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
        return 0;
      });
      /**
       * A String value that is used in the creation of the default string
       * description of an object. Called by the built-in method
       * `Object.prototype.toString`.
       */
      ge(this, E, "LRUCache");
      const { max: H = 0, ttl: Y, ttlResolution: te = 1, ttlAutopurge: ee, updateAgeOnGet: ae, updateAgeOnHas: ue, allowStale: pe, dispose: y, disposeAfter: Z, noDisposeOnSet: re, noUpdateTTL: se, maxSize: oe = 0, maxEntrySize: le = 0, sizeCalculation: Ie, fetchMethod: Ae, memoMethod: _e, noDeleteOnFetchRejection: we, noDeleteOnStaleGet: ye, allowStaleOnFetchRejection: Fe, allowStaleOnFetchAbort: Le, ignoreFetchAbort: ut } = q;
      if (H !== 0 && !o(H))
        throw new TypeError("max option must be a nonnegative integer");
      const je = H ? n(H) : Array;
      if (!je)
        throw new Error("invalid max value: " + H);
      if (Ne(this, N, H), Ne(this, A, oe), this.maxEntrySize = le || T(this, A), this.sizeCalculation = Ie, this.sizeCalculation) {
        if (!T(this, A) && !this.maxEntrySize)
          throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
        if (typeof this.sizeCalculation != "function")
          throw new TypeError("sizeCalculation set to non-function");
      }
      if (_e !== void 0 && typeof _e != "function")
        throw new TypeError("memoMethod must be a function if defined");
      if (Ne(this, R, _e), Ae !== void 0 && typeof Ae != "function")
        throw new TypeError("fetchMethod must be a function if specified");
      if (Ne(this, L, Ae), Ne(this, Ce, !!Ae), Ne(this, m, /* @__PURE__ */ new Map()), Ne(this, B, new Array(H).fill(void 0)), Ne(this, v, new Array(H).fill(void 0)), Ne(this, M, new je(H)), Ne(this, F, new je(H)), Ne(this, I, 0), Ne(this, w, 0), Ne(this, x, i.create(H)), Ne(this, O, 0), Ne(this, D, 0), typeof y == "function" && Ne(this, C, y), typeof Z == "function" ? (Ne(this, g, Z), Ne(this, V, [])) : (Ne(this, g, void 0), Ne(this, V, void 0)), Ne(this, fe, !!T(this, C)), Ne(this, b, !!T(this, g)), this.noDisposeOnSet = !!re, this.noUpdateTTL = !!se, this.noDeleteOnFetchRejection = !!we, this.allowStaleOnFetchRejection = !!Fe, this.allowStaleOnFetchAbort = !!Le, this.ignoreFetchAbort = !!ut, this.maxEntrySize !== 0) {
        if (T(this, A) !== 0 && !o(T(this, A)))
          throw new TypeError("maxSize must be a positive integer if specified");
        if (!o(this.maxEntrySize))
          throw new TypeError("maxEntrySize must be a positive integer if specified");
        De(this, k, Vh).call(this);
      }
      if (this.allowStale = !!pe, this.noDeleteOnStaleGet = !!ye, this.updateAgeOnGet = !!ae, this.updateAgeOnHas = !!ue, this.ttlResolution = o(te) || te === 0 ? te : 1, this.ttlAutopurge = !!ee, this.ttl = Y || 0, this.ttl) {
        if (!o(this.ttl))
          throw new TypeError("ttl must be a positive integer if specified");
        De(this, k, xo).call(this);
      }
      if (T(this, N) === 0 && this.ttl === 0 && T(this, A) === 0)
        throw new TypeError("At least one of max, maxSize, or ttl is required");
      if (!this.ttlAutopurge && !T(this, N) && !T(this, A)) {
        const lt = "LRU_CACHE_UNBOUNDED";
        a(lt) && (f.add(lt), u("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", lt, Te));
      }
    }
    /**
     * Do not call this method unless you need to inspect the
     * inner workings of the cache.  If anything returned by this
     * object is modified in any way, strange breakage may occur.
     *
     * These fields are private for a reason!
     *
     * @internal
     */
    static unsafeExposeInternals(q) {
      return {
        // properties
        starts: T(q, j),
        ttls: T(q, J),
        sizes: T(q, z),
        keyMap: T(q, m),
        keyList: T(q, B),
        valList: T(q, v),
        next: T(q, M),
        prev: T(q, F),
        get head() {
          return T(q, I);
        },
        get tail() {
          return T(q, w);
        },
        free: T(q, x),
        // methods
        isBackgroundFetch: (H) => {
          var Y;
          return De(Y = q, k, Ge).call(Y, H);
        },
        backgroundFetch: (H, Y, te, ee) => {
          var ae;
          return De(ae = q, k, bn).call(ae, H, Y, te, ee);
        },
        moveToTail: (H) => {
          var Y;
          return De(Y = q, k, Yr).call(Y, H);
        },
        indexes: (H) => {
          var Y;
          return De(Y = q, k, vt).call(Y, H);
        },
        rindexes: (H) => {
          var Y;
          return De(Y = q, k, Ft).call(Y, H);
        },
        isStale: (H) => {
          var Y;
          return T(Y = q, K).call(Y, H);
        }
      };
    }
    // Protected read-only members
    /**
     * {@link LRUCache.OptionsBase.max} (read-only)
     */
    get max() {
      return T(this, N);
    }
    /**
     * {@link LRUCache.OptionsBase.maxSize} (read-only)
     */
    get maxSize() {
      return T(this, A);
    }
    /**
     * The total computed size of items in the cache (read-only)
     */
    get calculatedSize() {
      return T(this, D);
    }
    /**
     * The number of items stored in the cache (read-only)
     */
    get size() {
      return T(this, O);
    }
    /**
     * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
     */
    get fetchMethod() {
      return T(this, L);
    }
    get memoMethod() {
      return T(this, R);
    }
    /**
     * {@link LRUCache.OptionsBase.dispose} (read-only)
     */
    get dispose() {
      return T(this, C);
    }
    /**
     * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
     */
    get disposeAfter() {
      return T(this, g);
    }
    /**
     * Return the number of ms left in the item's TTL. If item is not in cache,
     * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
     */
    getRemainingTTL(q) {
      return T(this, m).has(q) ? 1 / 0 : 0;
    }
    /**
     * Return a generator yielding `[key, value]` pairs,
     * in order from most recently used to least recently used.
     */
    *entries() {
      for (const q of De(this, k, vt).call(this))
        T(this, v)[q] !== void 0 && T(this, B)[q] !== void 0 && !De(this, k, Ge).call(this, T(this, v)[q]) && (yield [T(this, B)[q], T(this, v)[q]]);
    }
    /**
     * Inverse order version of {@link LRUCache.entries}
     *
     * Return a generator yielding `[key, value]` pairs,
     * in order from least recently used to most recently used.
     */
    *rentries() {
      for (const q of De(this, k, Ft).call(this))
        T(this, v)[q] !== void 0 && T(this, B)[q] !== void 0 && !De(this, k, Ge).call(this, T(this, v)[q]) && (yield [T(this, B)[q], T(this, v)[q]]);
    }
    /**
     * Return a generator yielding the keys in the cache,
     * in order from most recently used to least recently used.
     */
    *keys() {
      for (const q of De(this, k, vt).call(this)) {
        const H = T(this, B)[q];
        H !== void 0 && !De(this, k, Ge).call(this, T(this, v)[q]) && (yield H);
      }
    }
    /**
     * Inverse order version of {@link LRUCache.keys}
     *
     * Return a generator yielding the keys in the cache,
     * in order from least recently used to most recently used.
     */
    *rkeys() {
      for (const q of De(this, k, Ft).call(this)) {
        const H = T(this, B)[q];
        H !== void 0 && !De(this, k, Ge).call(this, T(this, v)[q]) && (yield H);
      }
    }
    /**
     * Return a generator yielding the values in the cache,
     * in order from most recently used to least recently used.
     */
    *values() {
      for (const q of De(this, k, vt).call(this))
        T(this, v)[q] !== void 0 && !De(this, k, Ge).call(this, T(this, v)[q]) && (yield T(this, v)[q]);
    }
    /**
     * Inverse order version of {@link LRUCache.values}
     *
     * Return a generator yielding the values in the cache,
     * in order from least recently used to most recently used.
     */
    *rvalues() {
      for (const q of De(this, k, Ft).call(this))
        T(this, v)[q] !== void 0 && !De(this, k, Ge).call(this, T(this, v)[q]) && (yield T(this, v)[q]);
    }
    /**
     * Iterating over the cache itself yields the same results as
     * {@link LRUCache.entries}
     */
    [(h = Symbol.iterator, E = Symbol.toStringTag, h)]() {
      return this.entries();
    }
    /**
     * Find a value for which the supplied fn method returns a truthy value,
     * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
     */
    find(q, H = {}) {
      for (const Y of De(this, k, vt).call(this)) {
        const te = T(this, v)[Y], ee = De(this, k, Ge).call(this, te) ? te.__staleWhileFetching : te;
        if (ee !== void 0 && q(ee, T(this, B)[Y], this))
          return this.get(T(this, B)[Y], H);
      }
    }
    /**
     * Call the supplied function on each item in the cache, in order from most
     * recently used to least recently used.
     *
     * `fn` is called as `fn(value, key, cache)`.
     *
     * If `thisp` is provided, function will be called in the `this`-context of
     * the provided object, or the cache if no `thisp` object is provided.
     *
     * Does not update age or recenty of use, or iterate over stale values.
     */
    forEach(q, H = this) {
      for (const Y of De(this, k, vt).call(this)) {
        const te = T(this, v)[Y], ee = De(this, k, Ge).call(this, te) ? te.__staleWhileFetching : te;
        ee !== void 0 && q.call(H, ee, T(this, B)[Y], this);
      }
    }
    /**
     * The same as {@link LRUCache.forEach} but items are iterated over in
     * reverse order.  (ie, less recently used items are iterated over first.)
     */
    rforEach(q, H = this) {
      for (const Y of De(this, k, Ft).call(this)) {
        const te = T(this, v)[Y], ee = De(this, k, Ge).call(this, te) ? te.__staleWhileFetching : te;
        ee !== void 0 && q.call(H, ee, T(this, B)[Y], this);
      }
    }
    /**
     * Delete any stale entries. Returns true if anything was removed,
     * false otherwise.
     */
    purgeStale() {
      let q = !1;
      for (const H of De(this, k, Ft).call(this, { allowStale: !0 }))
        T(this, K).call(this, H) && (De(this, k, Mt).call(this, T(this, B)[H], "expire"), q = !0);
      return q;
    }
    /**
     * Get the extended info about a given entry, to get its value, size, and
     * TTL info simultaneously. Returns `undefined` if the key is not present.
     *
     * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
     * serialization, the `start` value is always the current timestamp, and the
     * `ttl` is a calculated remaining time to live (negative if expired).
     *
     * Always returns stale values, if their info is found in the cache, so be
     * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
     * if relevant.
     */
    info(q) {
      const H = T(this, m).get(q);
      if (H === void 0)
        return;
      const Y = T(this, v)[H], te = De(this, k, Ge).call(this, Y) ? Y.__staleWhileFetching : Y;
      if (te === void 0)
        return;
      const ee = { value: te };
      if (T(this, J) && T(this, j)) {
        const ae = T(this, J)[H], ue = T(this, j)[H];
        if (ae && ue) {
          const pe = ae - (e.now() - ue);
          ee.ttl = pe, ee.start = Date.now();
        }
      }
      return T(this, z) && (ee.size = T(this, z)[H]), ee;
    }
    /**
     * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
     * passed to {@link LRLUCache#load}.
     *
     * The `start` fields are calculated relative to a portable `Date.now()`
     * timestamp, even if `performance.now()` is available.
     *
     * Stale entries are always included in the `dump`, even if
     * {@link LRUCache.OptionsBase.allowStale} is false.
     *
     * Note: this returns an actual array, not a generator, so it can be more
     * easily passed around.
     */
    dump() {
      const q = [];
      for (const H of De(this, k, vt).call(this, { allowStale: !0 })) {
        const Y = T(this, B)[H], te = T(this, v)[H], ee = De(this, k, Ge).call(this, te) ? te.__staleWhileFetching : te;
        if (ee === void 0 || Y === void 0)
          continue;
        const ae = { value: ee };
        if (T(this, J) && T(this, j)) {
          ae.ttl = T(this, J)[H];
          const ue = e.now() - T(this, j)[H];
          ae.start = Math.floor(Date.now() - ue);
        }
        T(this, z) && (ae.size = T(this, z)[H]), q.unshift([Y, ae]);
      }
      return q;
    }
    /**
     * Reset the cache and load in the items in entries in the order listed.
     *
     * The shape of the resulting cache may be different if the same options are
     * not used in both caches.
     *
     * The `start` fields are assumed to be calculated relative to a portable
     * `Date.now()` timestamp, even if `performance.now()` is available.
     */
    load(q) {
      this.clear();
      for (const [H, Y] of q) {
        if (Y.start) {
          const te = Date.now() - Y.start;
          Y.start = e.now() - te;
        }
        this.set(H, Y.value, Y);
      }
    }
    /**
     * Add a value to the cache.
     *
     * Note: if `undefined` is specified as a value, this is an alias for
     * {@link LRUCache#delete}
     *
     * Fields on the {@link LRUCache.SetOptions} options param will override
     * their corresponding values in the constructor options for the scope
     * of this single `set()` operation.
     *
     * If `start` is provided, then that will set the effective start
     * time for the TTL calculation. Note that this must be a previous
     * value of `performance.now()` if supported, or a previous value of
     * `Date.now()` if not.
     *
     * Options object may also include `size`, which will prevent
     * calling the `sizeCalculation` function and just use the specified
     * number if it is a positive integer, and `noDisposeOnSet` which
     * will prevent calling a `dispose` function in the case of
     * overwrites.
     *
     * If the `size` (or return value of `sizeCalculation`) for a given
     * entry is greater than `maxEntrySize`, then the item will not be
     * added to the cache.
     *
     * Will update the recency of the entry.
     *
     * If the value is `undefined`, then this is an alias for
     * `cache.delete(key)`. `undefined` is never stored in the cache.
     */
    set(q, H, Y = {}) {
      var se, oe, le, Ie, Ae;
      if (H === void 0)
        return this.delete(q), this;
      const { ttl: te = this.ttl, start: ee, noDisposeOnSet: ae = this.noDisposeOnSet, sizeCalculation: ue = this.sizeCalculation, status: pe } = Y;
      let { noUpdateTTL: y = this.noUpdateTTL } = Y;
      const Z = T(this, Se).call(this, q, H, Y.size || 0, ue);
      if (this.maxEntrySize && Z > this.maxEntrySize)
        return pe && (pe.set = "miss", pe.maxEntrySizeExceeded = !0), De(this, k, Mt).call(this, q, "set"), this;
      let re = T(this, O) === 0 ? void 0 : T(this, m).get(q);
      if (re === void 0)
        re = T(this, O) === 0 ? T(this, w) : T(this, x).length !== 0 ? T(this, x).pop() : T(this, O) === T(this, N) ? De(this, k, Ln).call(this, !1) : T(this, O), T(this, B)[re] = q, T(this, v)[re] = H, T(this, m).set(q, re), T(this, M)[T(this, w)] = re, T(this, F)[re] = T(this, w), Ne(this, w, re), ar(this, O)._++, T(this, de).call(this, re, Z, pe), pe && (pe.set = "add"), y = !1;
      else {
        De(this, k, Yr).call(this, re);
        const _e = T(this, v)[re];
        if (H !== _e) {
          if (T(this, Ce) && De(this, k, Ge).call(this, _e)) {
            _e.__abortController.abort(new Error("replaced"));
            const { __staleWhileFetching: we } = _e;
            we !== void 0 && !ae && (T(this, fe) && ((se = T(this, C)) == null || se.call(this, we, q, "set")), T(this, b) && ((oe = T(this, V)) == null || oe.push([we, q, "set"])));
          } else ae || (T(this, fe) && ((le = T(this, C)) == null || le.call(this, _e, q, "set")), T(this, b) && ((Ie = T(this, V)) == null || Ie.push([_e, q, "set"])));
          if (T(this, he).call(this, re), T(this, de).call(this, re, Z, pe), T(this, v)[re] = H, pe) {
            pe.set = "replace";
            const we = _e && De(this, k, Ge).call(this, _e) ? _e.__staleWhileFetching : _e;
            we !== void 0 && (pe.oldValue = we);
          }
        } else pe && (pe.set = "update");
      }
      if (te !== 0 && !T(this, J) && De(this, k, xo).call(this), T(this, J) && (y || T(this, P).call(this, re, te, ee), pe && T(this, U).call(this, pe, re)), !ae && T(this, b) && T(this, V)) {
        const _e = T(this, V);
        let we;
        for (; we = _e == null ? void 0 : _e.shift(); )
          (Ae = T(this, g)) == null || Ae.call(this, ...we);
      }
      return this;
    }
    /**
     * Evict the least recently used item, returning its value or
     * `undefined` if cache is empty.
     */
    pop() {
      var q;
      try {
        for (; T(this, O); ) {
          const H = T(this, v)[T(this, I)];
          if (De(this, k, Ln).call(this, !0), De(this, k, Ge).call(this, H)) {
            if (H.__staleWhileFetching)
              return H.__staleWhileFetching;
          } else if (H !== void 0)
            return H;
        }
      } finally {
        if (T(this, b) && T(this, V)) {
          const H = T(this, V);
          let Y;
          for (; Y = H == null ? void 0 : H.shift(); )
            (q = T(this, g)) == null || q.call(this, ...Y);
        }
      }
    }
    /**
     * Check if a key is in the cache, without updating the recency of use.
     * Will return false if the item is stale, even though it is technically
     * in the cache.
     *
     * Check if a key is in the cache, without updating the recency of
     * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
     * to `true` in either the options or the constructor.
     *
     * Will return `false` if the item is stale, even though it is technically in
     * the cache. The difference can be determined (if it matters) by using a
     * `status` argument, and inspecting the `has` field.
     *
     * Will not update item age unless
     * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
     */
    has(q, H = {}) {
      const { updateAgeOnHas: Y = this.updateAgeOnHas, status: te } = H, ee = T(this, m).get(q);
      if (ee !== void 0) {
        const ae = T(this, v)[ee];
        if (De(this, k, Ge).call(this, ae) && ae.__staleWhileFetching === void 0)
          return !1;
        if (T(this, K).call(this, ee))
          te && (te.has = "stale", T(this, U).call(this, te, ee));
        else return Y && T(this, X).call(this, ee), te && (te.has = "hit", T(this, U).call(this, te, ee)), !0;
      } else te && (te.has = "miss");
      return !1;
    }
    /**
     * Like {@link LRUCache#get} but doesn't update recency or delete stale
     * items.
     *
     * Returns `undefined` if the item is stale, unless
     * {@link LRUCache.OptionsBase.allowStale} is set.
     */
    peek(q, H = {}) {
      const { allowStale: Y = this.allowStale } = H, te = T(this, m).get(q);
      if (te === void 0 || !Y && T(this, K).call(this, te))
        return;
      const ee = T(this, v)[te];
      return De(this, k, Ge).call(this, ee) ? ee.__staleWhileFetching : ee;
    }
    async fetch(q, H = {}) {
      const {
        // get options
        allowStale: Y = this.allowStale,
        updateAgeOnGet: te = this.updateAgeOnGet,
        noDeleteOnStaleGet: ee = this.noDeleteOnStaleGet,
        // set options
        ttl: ae = this.ttl,
        noDisposeOnSet: ue = this.noDisposeOnSet,
        size: pe = 0,
        sizeCalculation: y = this.sizeCalculation,
        noUpdateTTL: Z = this.noUpdateTTL,
        // fetch exclusive options
        noDeleteOnFetchRejection: re = this.noDeleteOnFetchRejection,
        allowStaleOnFetchRejection: se = this.allowStaleOnFetchRejection,
        ignoreFetchAbort: oe = this.ignoreFetchAbort,
        allowStaleOnFetchAbort: le = this.allowStaleOnFetchAbort,
        context: Ie,
        forceRefresh: Ae = !1,
        status: _e,
        signal: we
      } = H;
      if (!T(this, Ce))
        return _e && (_e.fetch = "get"), this.get(q, {
          allowStale: Y,
          updateAgeOnGet: te,
          noDeleteOnStaleGet: ee,
          status: _e
        });
      const ye = {
        allowStale: Y,
        updateAgeOnGet: te,
        noDeleteOnStaleGet: ee,
        ttl: ae,
        noDisposeOnSet: ue,
        size: pe,
        sizeCalculation: y,
        noUpdateTTL: Z,
        noDeleteOnFetchRejection: re,
        allowStaleOnFetchRejection: se,
        allowStaleOnFetchAbort: le,
        ignoreFetchAbort: oe,
        status: _e,
        signal: we
      };
      let Fe = T(this, m).get(q);
      if (Fe === void 0) {
        _e && (_e.fetch = "miss");
        const Le = De(this, k, bn).call(this, q, Fe, ye, Ie);
        return Le.__returned = Le;
      } else {
        const Le = T(this, v)[Fe];
        if (De(this, k, Ge).call(this, Le)) {
          const sn = Y && Le.__staleWhileFetching !== void 0;
          return _e && (_e.fetch = "inflight", sn && (_e.returnedStale = !0)), sn ? Le.__staleWhileFetching : Le.__returned = Le;
        }
        const ut = T(this, K).call(this, Fe);
        if (!Ae && !ut)
          return _e && (_e.fetch = "hit"), De(this, k, Yr).call(this, Fe), te && T(this, X).call(this, Fe), _e && T(this, U).call(this, _e, Fe), Le;
        const je = De(this, k, bn).call(this, q, Fe, ye, Ie), Nr = je.__staleWhileFetching !== void 0 && Y;
        return _e && (_e.fetch = ut ? "stale" : "refresh", Nr && ut && (_e.returnedStale = !0)), Nr ? je.__staleWhileFetching : je.__returned = je;
      }
    }
    async forceFetch(q, H = {}) {
      const Y = await this.fetch(q, H);
      if (Y === void 0)
        throw new Error("fetch() returned undefined");
      return Y;
    }
    memo(q, H = {}) {
      const Y = T(this, R);
      if (!Y)
        throw new Error("no memoMethod provided to constructor");
      const { context: te, forceRefresh: ee, ...ae } = H, ue = this.get(q, ae);
      if (!ee && ue !== void 0)
        return ue;
      const pe = Y(q, ue, {
        options: ae,
        context: te
      });
      return this.set(q, pe, ae), pe;
    }
    /**
     * Return a value from the cache. Will update the recency of the cache
     * entry found.
     *
     * If the key is not found, get() will return `undefined`.
     */
    get(q, H = {}) {
      const { allowStale: Y = this.allowStale, updateAgeOnGet: te = this.updateAgeOnGet, noDeleteOnStaleGet: ee = this.noDeleteOnStaleGet, status: ae } = H, ue = T(this, m).get(q);
      if (ue !== void 0) {
        const pe = T(this, v)[ue], y = De(this, k, Ge).call(this, pe);
        return ae && T(this, U).call(this, ae, ue), T(this, K).call(this, ue) ? (ae && (ae.get = "stale"), y ? (ae && Y && pe.__staleWhileFetching !== void 0 && (ae.returnedStale = !0), Y ? pe.__staleWhileFetching : void 0) : (ee || De(this, k, Mt).call(this, q, "expire"), ae && Y && (ae.returnedStale = !0), Y ? pe : void 0)) : (ae && (ae.get = "hit"), y ? pe.__staleWhileFetching : (De(this, k, Yr).call(this, ue), te && T(this, X).call(this, ue), pe));
      } else ae && (ae.get = "miss");
    }
    /**
     * Deletes a key out of the cache.
     *
     * Returns true if the key was deleted, false otherwise.
     */
    delete(q) {
      return De(this, k, Mt).call(this, q, "delete");
    }
    /**
     * Clear the cache entirely, throwing away all values.
     */
    clear() {
      return De(this, k, Ho).call(this, "delete");
    }
  };
  N = new WeakMap(), A = new WeakMap(), C = new WeakMap(), g = new WeakMap(), L = new WeakMap(), R = new WeakMap(), O = new WeakMap(), D = new WeakMap(), m = new WeakMap(), B = new WeakMap(), v = new WeakMap(), M = new WeakMap(), F = new WeakMap(), I = new WeakMap(), w = new WeakMap(), x = new WeakMap(), V = new WeakMap(), z = new WeakMap(), j = new WeakMap(), J = new WeakMap(), fe = new WeakMap(), Ce = new WeakMap(), b = new WeakMap(), k = new WeakSet(), xo = function() {
    const q = new c(T(this, N)), H = new c(T(this, N));
    Ne(this, J, q), Ne(this, j, H), Ne(this, P, (ee, ae, ue = e.now()) => {
      if (H[ee] = ae !== 0 ? ue : 0, q[ee] = ae, ae !== 0 && this.ttlAutopurge) {
        const pe = setTimeout(() => {
          T(this, K).call(this, ee) && De(this, k, Mt).call(this, T(this, B)[ee], "expire");
        }, ae + 1);
        pe.unref && pe.unref();
      }
    }), Ne(this, X, (ee) => {
      H[ee] = q[ee] !== 0 ? e.now() : 0;
    }), Ne(this, U, (ee, ae) => {
      if (q[ae]) {
        const ue = q[ae], pe = H[ae];
        if (!ue || !pe)
          return;
        ee.ttl = ue, ee.start = pe, ee.now = Y || te();
        const y = ee.now - pe;
        ee.remainingTTL = ue - y;
      }
    });
    let Y = 0;
    const te = () => {
      const ee = e.now();
      if (this.ttlResolution > 0) {
        Y = ee;
        const ae = setTimeout(() => Y = 0, this.ttlResolution);
        ae.unref && ae.unref();
      }
      return ee;
    };
    this.getRemainingTTL = (ee) => {
      const ae = T(this, m).get(ee);
      if (ae === void 0)
        return 0;
      const ue = q[ae], pe = H[ae];
      if (!ue || !pe)
        return 1 / 0;
      const y = (Y || te()) - pe;
      return ue - y;
    }, Ne(this, K, (ee) => {
      const ae = H[ee], ue = q[ee];
      return !!ue && !!ae && (Y || te()) - ae > ue;
    });
  }, X = new WeakMap(), U = new WeakMap(), P = new WeakMap(), K = new WeakMap(), Vh = function() {
    const q = new c(T(this, N));
    Ne(this, D, 0), Ne(this, z, q), Ne(this, he, (H) => {
      Ne(this, D, T(this, D) - q[H]), q[H] = 0;
    }), Ne(this, Se, (H, Y, te, ee) => {
      if (De(this, k, Ge).call(this, Y))
        return 0;
      if (!o(te))
        if (ee) {
          if (typeof ee != "function")
            throw new TypeError("sizeCalculation must be a function");
          if (te = ee(Y, H), !o(te))
            throw new TypeError("sizeCalculation return invalid (expect positive integer)");
        } else
          throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
      return te;
    }), Ne(this, de, (H, Y, te) => {
      if (q[H] = Y, T(this, A)) {
        const ee = T(this, A) - q[H];
        for (; T(this, D) > ee; )
          De(this, k, Ln).call(this, !0);
      }
      Ne(this, D, T(this, D) + q[H]), te && (te.entrySize = Y, te.totalCalculatedSize = T(this, D));
    });
  }, he = new WeakMap(), de = new WeakMap(), Se = new WeakMap(), vt = function* ({ allowStale: q = this.allowStale } = {}) {
    if (T(this, O))
      for (let H = T(this, w); !(!De(this, k, Bo).call(this, H) || ((q || !T(this, K).call(this, H)) && (yield H), H === T(this, I))); )
        H = T(this, F)[H];
  }, Ft = function* ({ allowStale: q = this.allowStale } = {}) {
    if (T(this, O))
      for (let H = T(this, I); !(!De(this, k, Bo).call(this, H) || ((q || !T(this, K).call(this, H)) && (yield H), H === T(this, w))); )
        H = T(this, M)[H];
  }, Bo = function(q) {
    return q !== void 0 && T(this, m).get(T(this, B)[q]) === q;
  }, Ln = function(q) {
    var ee, ae;
    const H = T(this, I), Y = T(this, B)[H], te = T(this, v)[H];
    return T(this, Ce) && De(this, k, Ge).call(this, te) ? te.__abortController.abort(new Error("evicted")) : (T(this, fe) || T(this, b)) && (T(this, fe) && ((ee = T(this, C)) == null || ee.call(this, te, Y, "evict")), T(this, b) && ((ae = T(this, V)) == null || ae.push([te, Y, "evict"]))), T(this, he).call(this, H), q && (T(this, B)[H] = void 0, T(this, v)[H] = void 0, T(this, x).push(H)), T(this, O) === 1 ? (Ne(this, I, Ne(this, w, 0)), T(this, x).length = 0) : Ne(this, I, T(this, M)[H]), T(this, m).delete(Y), ar(this, O)._--, H;
  }, bn = function(q, H, Y, te) {
    const ee = H === void 0 ? void 0 : T(this, v)[H];
    if (De(this, k, Ge).call(this, ee))
      return ee;
    const ae = new r(), { signal: ue } = Y;
    ue == null || ue.addEventListener("abort", () => ae.abort(ue.reason), {
      signal: ae.signal
    });
    const pe = {
      signal: ae.signal,
      options: Y,
      context: te
    }, y = (Ie, Ae = !1) => {
      const { aborted: _e } = ae.signal, we = Y.ignoreFetchAbort && Ie !== void 0;
      if (Y.status && (_e && !Ae ? (Y.status.fetchAborted = !0, Y.status.fetchError = ae.signal.reason, we && (Y.status.fetchAbortIgnored = !0)) : Y.status.fetchResolved = !0), _e && !we && !Ae)
        return re(ae.signal.reason);
      const ye = oe;
      return T(this, v)[H] === oe && (Ie === void 0 ? ye.__staleWhileFetching ? T(this, v)[H] = ye.__staleWhileFetching : De(this, k, Mt).call(this, q, "fetch") : (Y.status && (Y.status.fetchUpdated = !0), this.set(q, Ie, pe.options))), Ie;
    }, Z = (Ie) => (Y.status && (Y.status.fetchRejected = !0, Y.status.fetchError = Ie), re(Ie)), re = (Ie) => {
      const { aborted: Ae } = ae.signal, _e = Ae && Y.allowStaleOnFetchAbort, we = _e || Y.allowStaleOnFetchRejection, ye = we || Y.noDeleteOnFetchRejection, Fe = oe;
      if (T(this, v)[H] === oe && (!ye || Fe.__staleWhileFetching === void 0 ? De(this, k, Mt).call(this, q, "fetch") : _e || (T(this, v)[H] = Fe.__staleWhileFetching)), we)
        return Y.status && Fe.__staleWhileFetching !== void 0 && (Y.status.returnedStale = !0), Fe.__staleWhileFetching;
      if (Fe.__returned === Fe)
        throw Ie;
    }, se = (Ie, Ae) => {
      var we;
      const _e = (we = T(this, L)) == null ? void 0 : we.call(this, q, ee, pe);
      _e && _e instanceof Promise && _e.then((ye) => Ie(ye === void 0 ? void 0 : ye), Ae), ae.signal.addEventListener("abort", () => {
        (!Y.ignoreFetchAbort || Y.allowStaleOnFetchAbort) && (Ie(void 0), Y.allowStaleOnFetchAbort && (Ie = (ye) => y(ye, !0)));
      });
    };
    Y.status && (Y.status.fetchDispatched = !0);
    const oe = new Promise(se).then(y, Z), le = Object.assign(oe, {
      __abortController: ae,
      __staleWhileFetching: ee,
      __returned: void 0
    });
    return H === void 0 ? (this.set(q, le, { ...pe.options, status: void 0 }), H = T(this, m).get(q)) : T(this, v)[H] = le, le;
  }, Ge = function(q) {
    if (!T(this, Ce))
      return !1;
    const H = q;
    return !!H && H instanceof Promise && H.hasOwnProperty("__staleWhileFetching") && H.__abortController instanceof r;
  }, ko = function(q, H) {
    T(this, F)[H] = q, T(this, M)[q] = H;
  }, Yr = function(q) {
    q !== T(this, w) && (q === T(this, I) ? Ne(this, I, T(this, M)[q]) : De(this, k, ko).call(this, T(this, F)[q], T(this, M)[q]), De(this, k, ko).call(this, T(this, w), q), Ne(this, w, q));
  }, Mt = function(q, H) {
    var te, ee, ae, ue;
    let Y = !1;
    if (T(this, O) !== 0) {
      const pe = T(this, m).get(q);
      if (pe !== void 0)
        if (Y = !0, T(this, O) === 1)
          De(this, k, Ho).call(this, H);
        else {
          T(this, he).call(this, pe);
          const y = T(this, v)[pe];
          if (De(this, k, Ge).call(this, y) ? y.__abortController.abort(new Error("deleted")) : (T(this, fe) || T(this, b)) && (T(this, fe) && ((te = T(this, C)) == null || te.call(this, y, q, H)), T(this, b) && ((ee = T(this, V)) == null || ee.push([y, q, H]))), T(this, m).delete(q), T(this, B)[pe] = void 0, T(this, v)[pe] = void 0, pe === T(this, w))
            Ne(this, w, T(this, F)[pe]);
          else if (pe === T(this, I))
            Ne(this, I, T(this, M)[pe]);
          else {
            const Z = T(this, F)[pe];
            T(this, M)[Z] = T(this, M)[pe];
            const re = T(this, M)[pe];
            T(this, F)[re] = T(this, F)[pe];
          }
          ar(this, O)._--, T(this, x).push(pe);
        }
    }
    if (T(this, b) && ((ae = T(this, V)) != null && ae.length)) {
      const pe = T(this, V);
      let y;
      for (; y = pe == null ? void 0 : pe.shift(); )
        (ue = T(this, g)) == null || ue.call(this, ...y);
    }
    return Y;
  }, Ho = function(q) {
    var H, Y, te;
    for (const ee of De(this, k, Ft).call(this, { allowStale: !0 })) {
      const ae = T(this, v)[ee];
      if (De(this, k, Ge).call(this, ae))
        ae.__abortController.abort(new Error("deleted"));
      else {
        const ue = T(this, B)[ee];
        T(this, fe) && ((H = T(this, C)) == null || H.call(this, ae, ue, q)), T(this, b) && ((Y = T(this, V)) == null || Y.push([ae, ue, q]));
      }
    }
    if (T(this, m).clear(), T(this, v).fill(void 0), T(this, B).fill(void 0), T(this, J) && T(this, j) && (T(this, J).fill(0), T(this, j).fill(0)), T(this, z) && T(this, z).fill(0), Ne(this, I, 0), Ne(this, w, 0), T(this, x).length = 0, Ne(this, D, 0), Ne(this, O, 0), T(this, b) && T(this, V)) {
      const ee = T(this, V);
      let ae;
      for (; ae = ee == null ? void 0 : ee.shift(); )
        (te = T(this, g)) == null || te.call(this, ...ae);
    }
  };
  let l = Te;
  return gr.LRUCache = l, gr;
}
var Ji, Gu;
function vE() {
  var t, u;
  if (Gu) return Ji;
  Gu = 1;
  const e = /* @__PURE__ */ yE();
  class f {
    constructor(s, a) {
      Oe(this, t);
      Oe(this, u);
      Ne(this, u, s), Ne(this, t, new e.LRUCache({
        max: a,
        dispose: (o, n) => o.unCache()
      }));
    }
    get(s) {
      const a = T(this, u).database + "|" + s, o = T(this, t).get(a);
      return o ? o.incrementUse() : null;
    }
    set(s, a) {
      const o = T(this, u).database + "|" + s;
      T(this, t).set(o, a);
    }
    toString() {
      let s = "";
      for (const a of T(this, t).keys())
        s += "[" + a + "],";
      return s.length > 1 && (s = s.substring(0, s.length - 1)), "info{cache:" + s + "}";
    }
    reset() {
      T(this, t).clear();
    }
  }
  return t = new WeakMap(), u = new WeakMap(), Ji = f, Ji;
}
var Zi, qu;
function Wh() {
  var j, J;
  if (qu) return Zi;
  qu = 1;
  const e = St, f = yh(), t = Pd, u = oE(), r = cE(), s = uE(), a = lE(), o = hr(), n = Mh(), c = Dh, i = qe(), l = Zt(), _ = Ht(), d = vn(), p = Hh(), E = NE(), h = SE(), N = RE(), A = Wo(), C = DE(), g = Vo(), L = qh(), R = UE(), O = LE(), D = bE(), { Status: m } = $h(), B = vE(), v = ze.promises, M = Jr(), F = wt(), I = vn(), w = function(fe, Ce) {
    if (fe === "UTC" || fe === "Etc/UTC" || fe === "Z" || fe === "Etc/GMT")
      return "+00:00";
    if (fe.startsWith("Etc/GMT") || fe.startsWith("GMT")) {
      let b, k;
      fe.startsWith("Etc/GMT") ? (b = fe.substring(7), k = !b.startsWith("-")) : (b = fe.substring(3), k = b.startsWith("-"));
      let W = parseInt(b.substring(1));
      if (isNaN(W))
        throw i.createFatalError(
          `Automatic timezone setting fails. wrong Server timezone '${fe}' conversion to +/-HH:00 conversion.`,
          i.ER_WRONG_AUTO_TIMEZONE,
          Ce.info
        );
      return (k ? "-" : "+") + (W >= 10 ? W : "0" + W) + ":00";
    }
    return fe;
  }, x = /(mariadb|mysql):\/\/(([^/@:]+)?(:([^/]+))?@)?(([^/:]+)(:([0-9]+))?)(\/([^?]+)(\?(.*))?)?$/;
  class V extends e {
    constructor(b) {
      super();
      ge(this, "opts");
      ge(this, "sendQueue", new f());
      ge(this, "receiveQueue", new f());
      ge(this, "waitingAuthenticationQueue", new f());
      ge(this, "status", m.NOT_CONNECTED);
      ge(this, "socket", null);
      ge(this, "timeout", null);
      ge(this, "addCommand");
      ge(this, "streamOut");
      ge(this, "streamIn");
      ge(this, "info");
      ge(this, "prepareCache");
      this.opts = Object.assign(new e(), b), this.info = new n(this.opts, this.redirect.bind(this)), this.prepareCache = this.opts.prepareCacheLength > 0 ? new B(this.info, this.opts.prepareCacheLength) : null, this.addCommand = this.addCommandQueue, this.streamOut = new r(this.opts, this.info), this.streamIn = new u(
        this.unexpectedPacket.bind(this),
        this.receiveQueue,
        this.streamOut,
        this.opts,
        this.info
      ), this.on("close_prepare", this._closePrepare.bind(this)), this.escape = l.escape.bind(this, this.opts, this.info), this.escapeId = l.escapeId.bind(this, this.opts, this.info);
    }
    //*****************************************************************
    // public methods
    //*****************************************************************
    /**
     * Connect event
     *
     * @returns {Promise} promise
     */
    connect() {
      const b = this;
      this.status = m.CONNECTING;
      const k = {
        opts: this.opts
      };
      return new Promise(function(W, X) {
        b.connectRejectFct = X, b.connectResolveFct = W;
        const U = new p(
          k,
          b.authSucceedHandler.bind(b),
          b.authFailHandler.bind(b),
          b.createSecureContext.bind(b),
          b.getSocket.bind(b)
        );
        Error.captureStackTrace(U), U.once("end", () => {
          b.receiveQueue.shift(), !b.opts.collation && b.info.collation && b.opts.emit("collation", b.info.collation), process.nextTick(b.nextSendCmd.bind(b));
        }), b.receiveQueue.push(U), b.streamInitSocket.call(b);
      });
    }
    executePromise(b, k, W, X) {
      const U = new L(W, this._logAndReject.bind(this, X), this.opts, b, k);
      this.addCommand(U, !0);
    }
    batch(b) {
      if (!b.sql) {
        const k = i.createError(
          "sql parameter is mandatory",
          i.ER_UNDEFINED_SQL,
          this.info,
          "HY000",
          null,
          !1,
          b.stack
        );
        return this.opts.logger.error && this.opts.logger.error(k), Promise.reject(k);
      }
      if (!b.values) {
        const k = i.createError(
          "Batch must have values set",
          i.ER_BATCH_WITH_NO_VALUES,
          this.info,
          "HY000",
          b.sql.length > this.opts.debugLen ? b.sql.substring(0, this.opts.debugLen) + "..." : b.sql,
          !1,
          b.stack
        );
        return this.opts.logger.error && this.opts.logger.error(k), Promise.reject(k);
      }
      return new Promise(this.prepare.bind(this, b)).then((k) => {
        const W = b.opts && b.opts.namedPlaceholders || this.opts.namedPlaceholders;
        let X;
        if (Array.isArray(b.values))
          if (W)
            X = b.values;
          else if (Array.isArray(b.values[0]))
            X = b.values;
          else if (k.parameterCount === 1) {
            X = [];
            for (let P = 0; P < b.values.length; P++)
              X.push([b.values[P]]);
          } else
            X = [b.values];
        else
          X = [[b.values]];
        if (b.values = X, this._canUseBulk(X, b.opts))
          return new Promise(this.executeBulkPromise.bind(this, b, k, this.opts));
        {
          const P = [], K = Object.assign({}, this.opts, b.opts);
          for (let $ = 0; $ < X.length; $++)
            P.push(k.execute(X[$], b.opts, null, b.stack));
          return Promise.all(P).then(
            (function($) {
              if (b.opts && b.opts.fullResult)
                return Promise.resolve($);
              {
                let he = $[0];
                if (K.metaAsArray && (he = he[0]), he instanceof g) {
                  let de = 0;
                  const Se = he.insertId, Re = he.warningStatus;
                  if (K.metaAsArray) {
                    for (let me = 0; me < $.length; me++)
                      de += $[me][0].affectedRows;
                    return Promise.resolve([new g(de, Se, Re), []]);
                  } else {
                    for (let me = 0; me < $.length; me++)
                      de += $[me].affectedRows;
                    return Promise.resolve(new g(de, Se, Re));
                  }
                } else if (K.metaAsArray) {
                  const de = [];
                  return $.forEach((Se) => {
                    de.push(...Se[0]);
                  }), Promise.resolve([de, $[0][1]]);
                } else {
                  const de = [];
                  return $.forEach((Se) => {
                    de.push(...Se);
                  }), Object.defineProperty(de, "meta", {
                    value: $[0].meta,
                    writable: !0,
                    enumerable: this.opts.metaEnumerable
                  }), Promise.resolve(de);
                }
              }
            }).bind(this)
          ).finally(() => k.close());
        }
      });
    }
    executeBulkPromise(b, k, W, X, U) {
      const P = new O(
        (K) => (k.close(), X(K)),
        function(K) {
          k.close(), W.logger.error && W.logger.error(K), U(K);
        },
        W,
        k,
        b
      );
      this.addCommand(P, !0);
    }
    /**
     * Send an empty MySQL packet to ensure connection is active, and reset @@wait_timeout
     * @param cmdParam command context
     * @param resolve success function
     * @param reject rejection function
     */
    ping(b, k, W) {
      if (b.opts && b.opts.timeout) {
        if (b.opts.timeout < 0) {
          const U = i.createError(
            "Ping cannot have negative timeout value",
            i.ER_BAD_PARAMETER_VALUE,
            this.info,
            "0A000"
          );
          this.opts.logger.error && this.opts.logger.error(U), W(U);
          return;
        }
        let X = setTimeout(
          (function() {
            X = void 0;
            const U = i.createFatalError("Ping timeout", i.ER_PING_TIMEOUT, this.info, "0A000");
            this.opts.logger.error && this.opts.logger.error(U), this.addCommand = this.addCommandDisabled, clearTimeout(this.timeout), this.status !== m.CLOSING && this.status !== m.CLOSED && (this.sendQueue.clear(), this.status = m.CLOSED, this.socket.destroy()), this.clear(), W(U);
          }).bind(this),
          b.opts.timeout
        );
        this.addCommand(
          new h(
            b,
            () => {
              X && (clearTimeout(X), k());
            },
            (U) => {
              this.opts.logger.error && this.opts.logger.error(U), clearTimeout(X), W(U);
            }
          ),
          !0
        );
        return;
      }
      this.addCommand(new h(b, k, W), !0);
    }
    /**
     * Send a reset command that will
     * - rollback any open transaction
     * - reset transaction isolation level
     * - reset session variables
     * - delete user variables
     * - remove temporary tables
     * - remove all PREPARE statement
     */
    reset(b, k, W) {
      if (this.info.isMariaDB() && this.info.hasMinVersion(10, 2, 4) || !this.info.isMariaDB() && this.info.hasMinVersion(5, 7, 3)) {
        const U = this, P = new N(
          b,
          () => {
            U.prepareCache && U.prepareCache.reset(), Promise.resolve().then(U.handleCharset.bind(U)).then(U.handleTimezone.bind(U)).then(U.executeInitQuery.bind(U)).then(U.executeSessionTimeout.bind(U)).then(k).catch(W);
          },
          W
        );
        this.addCommand(P, !0);
        return;
      }
      const X = new Error(
        `Reset command not permitted for server ${this.info.serverVersion.raw} (requires server MariaDB version 10.2.4+ or MySQL 5.7.3+)`
      );
      X.stack = b.stack, this.opts.logger.error && this.opts.logger.error(X), W(X);
    }
    /**
     * Indicates the state of the connection as the driver knows it
     * @returns {boolean}
     */
    isValid() {
      return this.status === m.CONNECTED;
    }
    /**
     * Terminate connection gracefully.
     */
    end(b, k, W) {
      if (this.addCommand = this.addCommandDisabled, clearTimeout(this.timeout), this.status < m.CLOSING && this.status !== m.NOT_CONNECTED) {
        this.status = m.CLOSING;
        const X = () => {
          this.status = m.CLOSED, this.socket.destroy(), this.socket.unref(), this.clear(), this.receiveQueue.clear(), k();
        }, U = new E(b, X, X);
        this.sendQueue.push(U), this.receiveQueue.push(U), this.sendQueue.length === 1 && process.nextTick(this.nextSendCmd.bind(this));
      } else k();
    }
    /**
     * Force connection termination by closing the underlying socket and killing server process if any.
     */
    destroy() {
      if (this.addCommand = this.addCommandDisabled, clearTimeout(this.timeout), this.status < m.CLOSING)
        if (this.status = m.CLOSING, this.sendQueue.clear(), this.receiveQueue.length > 0) {
          const b = this, k = this.socket.remoteAddress, W = k ? Object.assign({}, this.opts, { host: k }) : this.opts, X = new V(W);
          X.connect().then(() => {
            new Promise(X.query.bind(X, { sql: `KILL ${b.info.threadId}` })).finally((U) => {
              const P = i.createFatalError(
                "Connection destroyed, command was killed",
                i.ER_CMD_NOT_EXECUTED_DESTROYED,
                b.info
              );
              if (b.opts.logger.error && b.opts.logger.error(P), b.socketErrorDispatchToQueries(P), b.socket) {
                const K = b.socket;
                process.nextTick(() => {
                  K.destroy();
                });
              }
              b.status = m.CLOSED, b.clear(), new Promise(X.end.bind(X)).catch(() => {
              });
            });
          }).catch(() => {
            const U = () => {
              let K = b.socket;
              b.clear(), b.status = m.CLOSED, K.destroy(), b.receiveQueue.clear();
            }, P = new E(U, U);
            b.sendQueue.push(P), b.receiveQueue.push(P), b.sendQueue.length === 1 && process.nextTick(b.nextSendCmd.bind(b));
          });
        } else
          this.status = m.CLOSED, this.socket.destroy(), this.clear();
    }
    pause() {
      this.socket.pause();
    }
    resume() {
      this.socket.resume();
    }
    format(b, k) {
      const W = i.createError(
        '"Connection.format intentionally not implemented. please use Connection.query(sql, values), it will be more secure and faster',
        i.ER_NOT_IMPLEMENTED_FORMAT,
        this.info,
        "0A000"
      );
      throw this.opts.logger.error && this.opts.logger.error(W), W;
    }
    //*****************************************************************
    // additional public methods
    //*****************************************************************
    /**
     * return current connected server version information.
     *
     * @returns {*}
     */
    serverVersion() {
      if (!this.info.serverVersion) {
        const b = new Error("cannot know if server information until connection is established");
        throw this.opts.logger.error && this.opts.logger.error(b), b;
      }
      return this.info.serverVersion.raw;
    }
    /**
     * Change option "debug" during connection.
     * @param val   debug value
     */
    debug(b) {
      typeof b == "boolean" ? b && !this.opts.logger.network && (this.opts.logger.network = console.log) : typeof b == "function" && (this.opts.logger.network = b), this.opts.emit("debug", b);
    }
    debugCompress(b) {
      b ? typeof b == "boolean" ? (this.opts.debugCompress = b, b && !this.opts.logger.network && (this.opts.logger.network = console.log)) : typeof b == "function" && (this.opts.debugCompress = !0, this.opts.logger.network = b) : this.opts.debugCompress = !1;
    }
    //*****************************************************************
    // internal public testing methods
    //*****************************************************************
    get __tests() {
      return new z(this.info.collation, this.socket);
    }
    //*****************************************************************
    // internal methods
    //*****************************************************************
    /**
     * Use multiple COM_STMT_EXECUTE or COM_STMT_BULK_EXECUTE
     *
     * @param values current batch values
     * @param _options batch option
     * @return {boolean} indicating if can use bulk command
     */
    _canUseBulk(b, k) {
      if (k && k.fullResult) return !1;
      const W = k == null ? this.opts.bulk : k.bulk !== void 0 && k.bulk !== null ? k.bulk : this.opts.bulk;
      if (this.info.serverVersion && this.info.serverVersion.mariaDb && this.info.hasMinVersion(10, 2, 7) && W && (this.info.serverCapabilities & _.MARIADB_CLIENT_STMT_BULK_OPERATIONS) > 0n) {
        if (b !== void 0)
          if (this.opts.namedPlaceholders)
            for (let X = 0; X < b.length; X++) {
              let U = b[X];
              const P = Object.keys(U);
              for (let K = 0; K < P.length; K++) {
                const $ = U[P[K]];
                if ($ != null && typeof $ == "object" && typeof $.pipe == "function" && typeof $.read == "function")
                  return !1;
              }
            }
          else {
            const X = Array.isArray(b[0]) ? b[0].length : b[0] ? 1 : 0;
            if (X === 0) return !1;
            for (let U = 0; U < b.length; U++) {
              let P = b[U];
              if (Array.isArray(P) || (P = [P]), X !== P.length)
                return !1;
              for (let K = 0; K < X; K++) {
                const $ = P[K];
                if ($ != null && typeof $ == "object" && typeof $.pipe == "function" && typeof $.read == "function")
                  return !1;
              }
            }
          }
        return !0;
      }
      return !1;
    }
    executeSessionVariableQuery() {
      if (this.opts.sessionVariables) {
        const b = [];
        let k = "set ", W = Object.keys(this.opts.sessionVariables);
        if (W.length > 0) {
          for (let X = 0; X < W.length; ++X)
            k += (X !== 0 ? "," : "") + "@@" + W[X].replace(/[^a-z0-9_]/gi, "") + "=?", b.push(this.opts.sessionVariables[W[X]]);
          return new Promise(
            this.query.bind(this, {
              sql: k,
              values: b
            })
          ).catch((X) => {
            const U = i.createFatalError(
              `Error setting session variable (value ${JSON.stringify(this.opts.sessionVariables)}). Error: ${X.message}`,
              i.ER_SETTING_SESSION_ERROR,
              this.info,
              "08S01",
              k
            );
            return this.opts.logger.error && this.opts.logger.error(U), Promise.reject(U);
          });
        }
      }
      return Promise.resolve();
    }
    /**
     * set charset to charset/collation if set or utf8mb4 if not.
     * @returns {Promise<void>}
     * @private
     */
    handleCharset() {
      if (this.opts.collation) {
        if (this.opts.collation.index <= 255) return Promise.resolve();
        const k = this.opts.collation.charset === "utf8" && this.opts.collation.maxLength === 4 ? "utf8mb4" : this.opts.collation.charset;
        return new Promise(
          this.query.bind(this, {
            sql: `SET NAMES ${k} COLLATE ${this.opts.collation.name}`
          })
        );
      }
      if (!this.opts.charset && this.info.collation && this.info.collation.charset === "utf8" && this.info.collation.maxLength === 4)
        return this.info.collation = F.fromCharset("utf8mb4"), Promise.resolve();
      const b = this.opts.charset ? this.opts.charset : "utf8mb4";
      return this.info.collation = F.fromCharset(b), new Promise(
        this.query.bind(this, {
          sql: `SET NAMES ${b}`
        })
      );
    }
    /**
     * Asking server timezone if not set in case of 'auto'
     * @returns {Promise<void>}
     * @private
     */
    handleTimezone() {
      const b = this;
      return this.opts.timezone === "local" && (this.opts.timezone = void 0), this.opts.timezone === "auto" ? new Promise(
        this.query.bind(this, {
          sql: "SELECT @@system_time_zone stz, @@time_zone tz"
        })
      ).then((k) => {
        const W = k[0].tz === "SYSTEM" ? k[0].stz : k[0].tz, X = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return W === X || w(W, b) === w(X, b) ? (this.opts.timezone = X, Promise.resolve()) : this._setSessionTimezone(w(X, b));
      }) : this.opts.timezone ? this._setSessionTimezone(w(this.opts.timezone, b)) : Promise.resolve();
    }
    _setSessionTimezone(b) {
      return new Promise(
        this.query.bind(this, {
          sql: "SET time_zone=?",
          values: [b]
        })
      ).catch((k) => {
        const W = i.createFatalError(
          `setting timezone '${b}' fails on server.
 look at https://mariadb.com/kb/en/mysql_tzinfo_to_sql/ to load IANA timezone. `,
          i.ER_WRONG_IANA_TIMEZONE,
          this.info
        );
        return this.opts.logger.error && this.opts.logger.error(W), Promise.reject(W);
      });
    }
    checkServerVersion() {
      return this.opts.forceVersionCheck ? new Promise(
        this.query.bind(this, {
          sql: "SELECT @@VERSION AS v"
        })
      ).then(
        (function(b) {
          return this.info.serverVersion.raw = b[0].v, this.info.serverVersion.mariaDb = this.info.serverVersion.raw.includes("MariaDB"), n.parseVersionString(this.info), Promise.resolve();
        }).bind(this)
      ) : Promise.resolve();
    }
    executeInitQuery() {
      if (this.opts.initSql) {
        const b = Array.isArray(this.opts.initSql) ? this.opts.initSql : [this.opts.initSql], k = [];
        return b.forEach((W) => {
          k.push(
            new Promise(
              this.query.bind(this, {
                sql: W
              })
            )
          );
        }), Promise.all(k).catch((W) => {
          const X = i.createFatalError(
            `Error executing initial sql command: ${W.message}`,
            i.ER_INITIAL_SQL_ERROR,
            this.info
          );
          return this.opts.logger.error && this.opts.logger.error(X), Promise.reject(X);
        });
      }
      return Promise.resolve();
    }
    executeSessionTimeout() {
      if (this.opts.queryTimeout)
        if (this.info.isMariaDB() && this.info.hasMinVersion(10, 1, 2)) {
          const b = `SET max_statement_time=${this.opts.queryTimeout / 1e3}`;
          new Promise(
            this.query.bind(this, {
              sql: b
            })
          ).catch(
            (function(k) {
              const W = i.createFatalError(
                `Error setting session queryTimeout: ${k.message}`,
                i.ER_INITIAL_TIMEOUT_ERROR,
                this.info,
                "08S01",
                b
              );
              return this.opts.logger.error && this.opts.logger.error(W), Promise.reject(W);
            }).bind(this)
          );
        } else {
          const b = i.createError(
            `Can only use queryTimeout for MariaDB server after 10.1.1. queryTimeout value: ${this.opts.queryTimeout}`,
            i.ER_TIMEOUT_NOT_SUPPORTED,
            this.info,
            "HY000",
            this.opts.queryTimeout
          );
          return this.opts.logger.error && this.opts.logger.error(b), Promise.reject(b);
        }
      return Promise.resolve();
    }
    getSocket() {
      return this.socket;
    }
    /**
     * Initialize socket and associate events.
     * @private
     */
    streamInitSocket() {
      if (this.opts.connectTimeout && (this.timeout = setTimeout(this.connectTimeoutReached.bind(this), this.opts.connectTimeout, Date.now())), this.opts.socketPath)
        this.socket = t.connect(this.opts.socketPath), this.opts.enableKeepAlive && this.stream.on("connect", () => {
          this.stream.setKeepAlive(!0, this.opts.keepAliveInitialDelay);
        });
      else if (this.opts.stream) {
        if (typeof this.opts.stream == "function") {
          const b = this.opts.stream(
            (function(k, W) {
              if (k) {
                this.authFailHandler(k);
                return;
              }
              this.socket = W || t.connect(this.opts.port, this.opts.host), this.socketInit();
            }).bind(this)
          );
          b && (this.socket = b, this.socketInit());
        } else
          this.authFailHandler(
            i.createError(
              "stream option is not a function. stream must be a function with (error, callback) parameter",
              i.ER_BAD_PARAMETER_VALUE,
              this.info
            )
          );
        return;
      } else
        this.socket = t.connect(this.opts.port, this.opts.host), this.socket.setNoDelay(!0);
      this.socketInit();
    }
    socketInit() {
      this.socket.on("data", this.streamIn.onData.bind(this.streamIn)), this.socket.on("error", this.socketErrorHandler.bind(this)), this.socket.on("end", this.socketErrorHandler.bind(this)), this.socket.on(
        "connect",
        (function() {
          this.status === m.CONNECTING && (this.status = m.AUTHENTICATING, this.socket.setTimeout(this.opts.socketTimeout, this.socketTimeoutReached.bind(this)), this.socket.setNoDelay(!0), this.opts.keepAliveDelay && this.socket.setKeepAlive(!0, this.opts.keepAliveDelay));
        }).bind(this)
      ), this.socket.writeBuf = (b) => this.socket.write(b), this.socket.flush = () => {
      }, this.streamOut.setStream(this.socket);
    }
    /**
     * Authentication success result handler.
     *
     * @private
     */
    authSucceedHandler() {
      this.opts.compress && (this.info.serverCapabilities & _.COMPRESS ? (this.streamOut.setStream(new a(this.socket, this.opts, this.info)), this.streamIn = new s(this.streamIn, this.receiveQueue, this.opts, this.info), this.socket.removeAllListeners("data"), this.socket.on("data", this.streamIn.onData.bind(this.streamIn))) : this.opts.logger.error && this.opts.logger.error(
        i.createError(
          "connection is configured to use packet compression, but the server doesn't have this capability",
          i.ER_COMPRESSION_NOT_SUPPORTED,
          this.info
        )
      )), this.addCommand = this.opts.pipelining ? this.addCommandEnablePipeline : this.addCommandEnable;
      const b = this;
      this.status = m.INIT_CMD, this.executeSessionVariableQuery().then(b.handleCharset.bind(b)).then(this.handleTimezone.bind(this)).then(this.checkServerVersion.bind(this)).then(this.executeInitQuery.bind(this)).then(this.executeSessionTimeout.bind(this)).then(() => {
        clearTimeout(this.timeout), b.status = m.CONNECTED, process.nextTick(b.connectResolveFct, b), b.waitingAuthenticationQueue.toArray().forEach((W) => {
          b.addCommand(W, !0);
        }), b.waitingAuthenticationQueue = null, b.connectRejectFct = null, b.connectResolveFct = null;
      }).catch((k) => {
        if (k.fatal)
          b.authFailHandler.call(b, k);
        else {
          const W = () => {
            b.authFailHandler.call(b, k);
          };
          b.end(W, W);
        }
        return Promise.reject(k);
      });
    }
    /**
     * Authentication failed result handler.
     *
     * @private
     */
    authFailHandler(b) {
      clearTimeout(this.timeout), this.connectRejectFct && (this.opts.logger.error && this.opts.logger.error(b), this.receiveQueue.shift(), this.fatalError(b, !0), process.nextTick(this.connectRejectFct, b), this.connectRejectFct = null);
    }
    /**
     * Create TLS socket and associate events.
     *
     * @param info current connection information
     * @param callback  callback function when done
     * @private
     */
    createSecureContext(b, k) {
      b.requireValidCert = this.opts.ssl === !0 || this.opts.ssl.rejectUnauthorized === void 0 || this.opts.ssl.rejectUnauthorized === !0, b.requireIdentifyCheck = this.opts.ssl === !0 || this.opts.ssl.checkServerIdentity === void 0;
      const W = {
        servername: this.opts.host,
        socket: this.socket,
        rejectUnauthorized: !1,
        checkServerIdentity: () => {
        }
      }, X = this.opts.ssl === !0 ? W : Object.assign({}, this.opts.ssl, W);
      try {
        const U = c.connect(X, k);
        U.on("data", this.streamIn.onData.bind(this.streamIn)), U.on("error", this.socketErrorHandler.bind(this)), U.on("end", this.socketErrorHandler.bind(this)), U.writeBuf = (P) => U.write(P), U.flush = () => {
        }, this.socket.removeAllListeners("data"), this.socket = U, this.streamOut.setStream(U);
      } catch (U) {
        this.socketErrorHandler(U);
      }
    }
    /**
     * Handle packet when no packet is expected.
     * (there can be an ERROR packet send by server/proxy to inform that connection is ending).
     *
     * @param packet  packet
     * @private
     */
    unexpectedPacket(b) {
      if (b && b.peek() === 255) {
        let k = b.readError(this.info);
        k.fatal && this.status < m.CLOSING && (this.emit("error", k), this.opts.logger.error && this.opts.logger.error(k), this.end(
          () => {
          },
          () => {
          }
        ));
      } else if (this.status < m.CLOSING) {
        const k = i.createFatalError(
          `receiving packet from server without active commands
conn:${this.info.threadId ? this.info.threadId : -1}(${b.pos},${b.end})
${l.log(this.opts, b.buf, b.pos, b.end)}`,
          i.ER_UNEXPECTED_PACKET,
          this.info
        );
        this.opts.logger.error && this.opts.logger.error(k), this.emit("error", k), this.destroy();
      }
    }
    /**
     * Handle connection timeout.
     *
     * @private
     */
    connectTimeoutReached(b) {
      this.timeout = null;
      const k = this.receiveQueue.peekFront(), W = i.createFatalError(
        `Connection timeout: failed to create socket after ${Date.now() - b}ms`,
        i.ER_CONNECTION_TIMEOUT,
        this.info,
        "08S01",
        null,
        k ? k.stack : null
      );
      this.opts.logger.error && this.opts.logger.error(W), this.authFailHandler(W);
    }
    /**
     * Handle socket timeout.
     *
     * @private
     */
    socketTimeoutReached() {
      const b = i.createFatalError("socket timeout", i.ER_SOCKET_TIMEOUT, this.info);
      this.opts.logger.error && this.opts.logger.error(b), this.fatalError(b, !0);
    }
    /**
     * Add command to waiting queue until authentication.
     *
     * @param cmd         command
     * @private
     */
    addCommandQueue(b) {
      this.waitingAuthenticationQueue.push(b);
    }
    /**
     * Add command to command sending and receiving queue.
     *
     * @param cmd         command
     * @param expectResponse queue command response
     * @private
     */
    addCommandEnable(b, k) {
      b.once("end", this._sendNextCmdImmediate.bind(this)), this.sendQueue.isEmpty() && this.receiveQueue.isEmpty() ? (k && this.receiveQueue.push(b), b.start(this.streamOut, this.opts, this.info)) : (k && this.receiveQueue.push(b), this.sendQueue.push(b));
    }
    /**
     * Add command to command sending and receiving queue using pipelining
     *
     * @param cmd             command
     * @param expectResponse queue command response
     * @private
     */
    addCommandEnablePipeline(b, k) {
      b.once("send_end", this._sendNextCmdImmediate.bind(this)), k && this.receiveQueue.push(b), this.sendQueue.isEmpty() ? (b.start(this.streamOut, this.opts, this.info), b.sending && (this.sendQueue.push(b), b.prependOnceListener("send_end", this.sendQueue.shift.bind(this.sendQueue)))) : this.sendQueue.push(b);
    }
    /**
     * Replacing command when connection is closing or closed to send a proper error message.
     *
     * @param cmd         command
     * @private
     */
    addCommandDisabled(b) {
      const k = b.throwNewError(
        "Cannot execute new commands: connection closed",
        !0,
        this.info,
        "08S01",
        i.ER_CMD_CONNECTION_CLOSED
      );
      this.opts.logger.error && this.opts.logger.error(k);
    }
    /**
     * Handle socket error.
     *
     * @param err               socket error
     * @private
     */
    socketErrorHandler(b) {
      if (!(this.status >= m.CLOSING))
        switch (this.socket && (this.socket.writeBuf = () => {
        }, this.socket.flush = () => {
        }), b ? (b.fatal = !0, b.sqlState = "HY000") : b = i.createFatalError(
          "socket has unexpectedly been closed",
          i.ER_SOCKET_UNEXPECTED_CLOSE,
          this.info
        ), this.status) {
          case m.CONNECTING:
          case m.AUTHENTICATING:
            const k = this.receiveQueue.peekFront();
            k && k.stack && b && (b.stack += `
 From event:
` + k.stack.substring(k.stack.indexOf(`
`) + 1)), this.authFailHandler(b);
            break;
          default:
            this.fatalError(b, !1);
        }
    }
    /**
     * Fatal unexpected error : closing connection, and throw exception.
     */
    fatalError(b, k) {
      if (this.status >= m.CLOSING) {
        this.socketErrorDispatchToQueries(b);
        return;
      }
      const W = this.status !== m.CONNECTING;
      this.status = m.CLOSING, this.addCommand = this.addCommandDisabled, this.socket && (this.socket.removeAllListeners("error"), this.socket.removeAllListeners("timeout"), this.socket.removeAllListeners("close"), this.socket.removeAllListeners("data"), this.socket.destroyed || this.socket.destroy(), this.socket = void 0), this.status = m.CLOSED;
      const X = this.socketErrorDispatchToQueries(b);
      if (W) {
        if (this.opts.logger.error && this.opts.logger.error(b), this.listenerCount("error") > 0)
          this.emit("error", b), this.emit("end"), this.clear();
        else if (this.emit("end"), this.clear(), !k && !X) throw b;
      } else
        this.clear();
    }
    /**
     * Dispatch fatal error to current running queries.
     *
     * @param err        the fatal error
     * @return {boolean} return if error has been relayed to queries
     */
    socketErrorDispatchToQueries(b) {
      let k, W = !1;
      for (; k = this.receiveQueue.shift(); )
        k && k.onPacketReceive && (W = !0, setImmediate(k.throwError.bind(k, b, this.info)));
      return W;
    }
    /**
     * Will send next command in queue if any.
     *
     * @private
     */
    nextSendCmd() {
      let b;
      (b = this.sendQueue.shift()) && (b.sending ? this.sendQueue.unshift(b) : (b.start(this.streamOut, this.opts, this.info), b.sending && (this.sendQueue.unshift(b), b.prependOnceListener("send_end", this.sendQueue.shift.bind(this.sendQueue)))));
    }
    /**
     * Change transaction state.
     *
     * @param cmdParam command parameter
     * @param resolve success function to call
     * @param reject error function to call
     * @private
     */
    changeTransaction(b, k, W) {
      if (this.status >= m.CLOSING) {
        const X = i.createFatalError(
          "Cannot execute new commands: connection closed",
          i.ER_CMD_CONNECTION_CLOSED,
          this.info,
          "08S01",
          b.sql
        );
        this.opts.logger.error && this.opts.logger.error(X), W(X);
        return;
      }
      if (this.receiveQueue.peekFront() || this.info.status & o.STATUS_IN_TRANS) {
        const X = new A(
          k,
          (U) => {
            this.opts.logger.error && this.opts.logger.error(U), W(U);
          },
          this.opts,
          b
        );
        this.addCommand(X, !0);
      } else k();
    }
    changeUser(b, k, W) {
      if (!this.info.isMariaDB()) {
        const U = i.createError(
          "method changeUser not available for MySQL server due to Bug #83472",
          i.ER_MYSQL_CHANGE_USER_BUG,
          this.info,
          "0A000"
        );
        this.opts.logger.error && this.opts.logger.error(U), W(U);
        return;
      }
      this.status < m.CLOSING && (this.addCommand = this.addCommandEnable);
      let X = this;
      if (b.opts && b.opts.collation && typeof b.opts.collation == "string") {
        const U = b.opts.collation.toUpperCase();
        if (b.opts.collation = F.fromName(b.opts.collation.toUpperCase()), b.opts.collation === void 0) return W(new RangeError(`Unknown collation '${U}'`));
      }
      this.addCommand(
        new D(
          b,
          this.opts,
          (U) => {
            X.status < m.CLOSING && X.opts.pipelining && (X.addCommand = X.addCommandEnablePipeline), b.opts && b.opts.collation && (X.opts.collation = b.opts.collation), X.handleCharset().then(() => {
              b.opts && b.opts.collation && (X.info.collation = b.opts.collation, X.opts.emit("collation", b.opts.collation)), k(U);
            }).catch((P) => {
              const K = () => X.authFailHandler.call(X, P);
              P.fatal ? K() : X.end(K, K), W(P);
            });
          },
          this.authFailHandler.bind(this, W),
          this.getSocket.bind(this)
        ),
        !0
      );
    }
    query(b, k, W) {
      if (!b.sql)
        return W(
          i.createError(
            "sql parameter is mandatory",
            i.ER_UNDEFINED_SQL,
            this.info,
            "HY000",
            null,
            !1,
            b.stack
          )
        );
      const X = new A(
        k,
        (U) => {
          this.opts.logger.error && this.opts.logger.error(U), W(U);
        },
        this.opts,
        b
      );
      this.addCommand(X, !0);
    }
    prepare(b, k, W) {
      if (!b.sql)
        return W(i.createError("sql parameter is mandatory", i.ER_UNDEFINED_SQL, this.info, "HY000"));
      if (this.prepareCache && (this.sendQueue.isEmpty() || !this.receiveQueue.peekFront())) {
        const U = this.prepareCache.get(b.sql);
        if (U)
          return k(U);
      }
      const X = new C(
        k,
        (U) => {
          this.opts.logger.error && this.opts.logger.error(U), W(U);
        },
        this.opts,
        b,
        this
      );
      this.addCommand(X, !0);
    }
    prepareExecute(b) {
      if (!b.sql)
        return Promise.reject(
          i.createError("sql parameter is mandatory", i.ER_UNDEFINED_SQL, this.info, "HY000")
        );
      if (this.prepareCache && (this.sendQueue.isEmpty() || !this.receiveQueue.peekFront())) {
        const W = this.prepareCache.get(b.sql);
        if (W)
          return new Promise(this.executePromise.bind(this, b, W)).finally(
            () => W.close()
          );
      }
      const k = this;
      if (this.opts.pipelining && this.info.isMariaDB() && this.info.hasMinVersion(10, 2, 4)) {
        let W = !1;
        const X = b.values ? Array.isArray(b.values) ? b.values : [b.values] : [];
        for (let U = 0; U < X.length; U++) {
          const P = X[U];
          P != null && typeof P == "object" && typeof P.pipe == "function" && typeof P.read == "function" && (W = !0);
        }
        if (!W)
          return new Promise((U, P) => {
            let K = 0;
            const $ = new L(
              (de) => {
                K++ === 0 && ($.prepare.close(), U(de));
              },
              (de) => {
                K++ === 0 && (k.opts.logger.error && k.opts.logger.error(de), P(de), $.prepare && $.prepare.close());
              },
              k.opts,
              b,
              null
            );
            b.executeCommand = $;
            const he = new C(
              (de) => {
                K > 0 && de.close();
              },
              (de) => {
                K++ === 0 && (k.opts.logger.error && k.opts.logger.error(de), P(de));
              },
              k.opts,
              b,
              k
            );
            k.addCommand(he, !0), k.addCommand($, !0);
          });
      }
      return new Promise((W, X) => {
        const U = new C(W, X, this.opts, b, k);
        k.addCommand(U, !0);
      }).then((W) => new Promise(function(X, U) {
        k.executePromise.call(k, b, W, X, U);
      }).finally(() => W.close())).catch((W) => {
        throw k.opts.logger.error && k.opts.logger.error(W), W;
      });
    }
    importFile(b, k, W) {
      const X = this;
      if (!b || !b.file)
        return W(
          i.createError(
            "SQL file parameter is mandatory",
            i.ER_MISSING_SQL_PARAMETER,
            X.info,
            "HY000",
            null,
            !1,
            b.stack
          )
        );
      const U = this.addCommand.bind(X);
      this.waitingAuthenticationQueue = new f(), this.addCommand = this.addCommandQueue;
      const P = function($, he, de) {
        const Se = new A(
          he,
          (Re) => {
            X.opts.logger.error && X.opts.logger.error(Re), de(Re);
          },
          X.opts,
          {
            sql: $,
            opts: {}
          }
        );
        U(Se, !0);
      };
      let K = null;
      return (b.skipDbCheck ? Promise.resolve() : new Promise(P.bind(X, "SELECT DATABASE() as db"))).then(($) => (K = $ ? $[0].db : null, b.skipDbCheck && !X.opts.database || !b.skipDbCheck && !b.database && !K ? W(
        i.createError(
          "Database parameter is not set and no database is selected",
          i.ER_MISSING_DATABASE_PARAMETER,
          X.info,
          "HY000",
          null,
          !1,
          b.stack
        )
      ) : (b.database ? new Promise(P.bind(X, `USE \`${b.database.replace(/`/gi, "``")}\``)) : Promise.resolve()).then(() => {
        const de = () => {
          X.status < m.CLOSING && (X.addCommand = X.addCommandEnable.bind(X), X.status < m.CLOSING && X.opts.pipelining && (X.addCommand = X.addCommandEnablePipeline.bind(X)), X.waitingAuthenticationQueue.toArray().forEach((Re) => X.addCommand(Re, !0)), X.waitingAuthenticationQueue = null);
        };
        return v.open(b.file, "r").then(async (Se) => {
          const Re = {
            buffer: Buffer.allocUnsafe(16384),
            offset: 0,
            end: 0
          }, me = [];
          let be = null;
          for (; !be; )
            try {
              const Ue = await Se.read(Re.buffer, Re.end, Re.buffer.length - Re.end, null);
              if (Ue.bytesRead === 0) {
                if (Se.close().catch(() => {
                }), be) {
                  de(), W(be);
                  return;
                }
                await Promise.allSettled(me).then(() => !b.skipDbCheck && K && b.database && b.database !== K ? new Promise(P.bind(X, `USE \`${K.replace(/`/gi, "``")}\``)) : Promise.resolve()).then(() => {
                  de(), be && W(be), k();
                }).catch((ke) => {
                  de(), W(ke);
                });
                return;
              } else {
                Re.end += Ue.bytesRead;
                const Ye = M.parseQueries(Re).flatMap(($e) => new Promise(P.bind(X, $e)).catch((S) => {
                  be = S;
                }));
                if (me.push(...Ye), Re.offset === Re.end)
                  Re.offset = 0, Re.end = 0;
                else if (Re.offset > 8192)
                  Re.buffer.copy(Re.buffer, 0, Re.offset, Re.end), Re.end -= Re.offset, Re.offset = 0;
                else if (Re.buffer.length - Re.end < 8192) {
                  const $e = Buffer.allocUnsafe(Re.buffer.length << 1);
                  Re.buffer.copy($e, 0, Re.offset, Re.end), Re.buffer = $e, Re.end -= Re.offset, Re.offset = 0;
                }
              }
            } catch (Ue) {
              return Se.close().catch(() => {
              }), de(), Promise.allSettled(me).catch(() => {
              }), W(
                i.createError(
                  Ue.message,
                  i.ER_SQL_FILE_ERROR,
                  X.info,
                  "HY000",
                  null,
                  !1,
                  b.stack
                )
              );
            }
          be && (de(), W(be));
        }).catch((Se) => (de(), Se.code === "ENOENT" ? W(
          i.createError(
            `SQL file parameter '${b.file}' doesn't exists`,
            i.ER_MISSING_SQL_FILE,
            X.info,
            "HY000",
            null,
            !1,
            b.stack
          )
        ) : W(
          i.createError(Se.message, i.ER_SQL_FILE_ERROR, X.info, "HY000", null, !1, b.stack)
        )));
      })));
    }
    /**
     * Clearing connection variables when ending.
     *
     * @private
     */
    clear() {
      this.sendQueue.clear(), this.opts.removeAllListeners(), this.streamOut = void 0, this.socket = void 0;
    }
    /**
     * Redirecting connection to server indicated value.
     * @param value server host string
     * @param resolve promise result when done
     */
    redirect(b, k) {
      if (this.opts.permitRedirect && b)
        if (this.receiveQueue.length <= 1 && (this.info.status & o.STATUS_IN_TRANS) === 0) {
          this.info.redirectRequest = null;
          const W = b.match(x);
          if (!W)
            return this.opts.logger.error && this.opts.logger.error(
              new Error(
                `error parsing redirection string '${b}'. format must be 'mariadb/mysql://[<user>[:<password>]@]<host>[:<port>]/[<db>[?<opt1>=<value1>[&<opt2>=<value2>]]]'`
              )
            ), k();
          const X = {
            host: W[7] ? decodeURIComponent(W[7]) : W[6],
            port: W[9] ? parseInt(W[9]) : 3306
          };
          if (X.host === this.opts.host && X.port === this.opts.port)
            return k();
          W[3] && (X.user = W[3]), W[5] && (X.password = W[5]);
          const U = d.parseOptionDataType(X), P = new I(Object.assign({}, this.opts, U)), K = new V(P);
          K.connect().then(
            (async function() {
              await new Promise(this.end.bind(this, {})), this.status = m.CONNECTED, this.info = K.info, this.opts = K.opts, this.socket = K.socket, this.prepareCache && this.prepareCache.reset(), this.streamOut = K.streamOut, this.streamIn = K.streamIn, k();
            }).bind(this)
          ).catch(
            (function($) {
              if (this.opts.logger.error) {
                const he = new Error(`fail to redirect to '${b}'`);
                he.cause = $, this.opts.logger.error(he);
              }
              k();
            }).bind(this)
          );
        } else
          this.info.redirectRequest = b, k();
      else
        this.info.redirectRequest = null, k();
    }
    get threadId() {
      return this.info ? this.info.threadId : null;
    }
    _sendNextCmdImmediate() {
      this.sendQueue.isEmpty() || setImmediate(this.nextSendCmd.bind(this));
    }
    _closePrepare(b) {
      this.addCommand(
        new R(
          {},
          () => {
          },
          () => {
          },
          b
        ),
        !1
      );
    }
    _logAndReject(b, k) {
      this.opts.logger.error && this.opts.logger.error(k), b(k);
    }
  }
  class z {
    constructor(Ce, b) {
      Oe(this, j);
      Oe(this, J);
      Ne(this, j, Ce), Ne(this, J, b);
    }
    getCollation() {
      return T(this, j);
    }
    getSocket() {
      return T(this, J);
    }
  }
  return j = new WeakMap(), J = new WeakMap(), Zi = V, Zi;
}
var En = { exports: {} }, es, $u;
function FE() {
  if ($u) return es;
  $u = 1;
  const e = Wo(), { Readable: f } = Bt;
  class t extends e {
    constructor(r, s, a) {
      super(
        () => {
        },
        () => {
        },
        s,
        r
      ), this.socket = a, this.inStream = new f({
        objectMode: !0,
        read: () => {
          this.socket.resume();
        }
      }), this.on("fields", function(o) {
        this.inStream.emit("fields", o);
      }), this.on("error", function(o) {
        this.inStream.emit("error", o);
      }), this.on("close", function(o) {
        this.inStream.emit("error", o);
      }), this.on("end", function(o) {
        o && this.inStream.emit("error", o), this.socket.resume(), this.inStream.push(null);
      }), this.inStream.close = (function() {
        this.handleNewRows = () => {
        }, this.socket.resume();
      }).bind(this);
    }
    handleNewRows(r) {
      this.inStream.push(r) || this.socket.pause();
    }
  }
  return es = t, es;
}
var Vu;
function jh() {
  var r, s;
  if (Vu) return En.exports;
  Vu = 1;
  const e = FE(), f = qe();
  class t {
    constructor(o) {
      Oe(this, r);
      Oe(this, s);
      Ne(this, r, o), Ne(this, s, o.opts.trace ? Error.captureStackTrace : () => {
      });
    }
    get threadId() {
      return T(this, r).threadId;
    }
    get info() {
      return T(this, r).info;
    }
    get prepareCache() {
      return T(this, r).prepareCache;
    }
    /**
     * Permit to change user during connection.
     * All user variables will be reset, Prepare commands will be released.
     * !!! mysql has a bug when CONNECT_ATTRS capability is set, that is default !!!!
     *
     * @param options   connection options
     * @returns {Promise} promise
     */
    changeUser(o) {
      const n = { opts: o };
      return T(this, s).call(this, n), new Promise(T(this, r).changeUser.bind(T(this, r), n));
    }
    /**
     * Start transaction
     *
     * @returns {Promise} promise
     */
    beginTransaction() {
      const o = { sql: "START TRANSACTION" };
      return T(this, s).call(this, o), new Promise(T(this, r).query.bind(T(this, r), o));
    }
    /**
     * Commit a transaction.
     *
     * @returns {Promise} command if commit was needed only
     */
    commit() {
      const o = { sql: "COMMIT" };
      return T(this, s).call(this, o), new Promise(T(this, r).changeTransaction.bind(T(this, r), o));
    }
    /**
     * Roll back a transaction.
     *
     * @returns {Promise} promise
     */
    rollback() {
      const o = { sql: "ROLLBACK" };
      return T(this, s).call(this, o), new Promise(T(this, r).changeTransaction.bind(T(this, r), o));
    }
    /**
     * Execute query using text protocol.
     *
     * @param sql     sql parameter Object can be used to supersede default option.
     *                Object must then have sql property.
     * @param values  object / array of placeholder values (not mandatory)
     * @returns {Promise} promise
     */
    query(o, n) {
      const c = u(o, n);
      return T(this, s).call(this, c), new Promise(T(this, r).query.bind(T(this, r), c));
    }
    static _PARAM_DEF(o, n) {
      return typeof o == "object" ? { sql: o.sql, values: o.values ? o.values : n, opts: o } : { sql: o, values: n };
    }
    execute(o, n) {
      const c = u(o, n);
      return T(this, s).call(this, c), T(this, r).prepareExecute(c);
    }
    static _EXECUTE_CMD(o, n) {
      return o.prepareExecute(n);
    }
    prepare(o) {
      let n;
      return typeof o == "object" ? n = { sql: o.sql, opts: o } : n = { sql: o }, T(this, s).call(this, n), new Promise(T(this, r).prepare.bind(T(this, r), n));
    }
    /**
     * Execute batch using text protocol.
     *
     * @param sql     sql parameter Object can be used to supersede default option.
     *                Object must then have sql property.
     * @param values  object / array of placeholder values
     * @returns {Promise} promise
     */
    batch(o, n) {
      const c = u(o, n);
      return T(this, s).call(this, c), T(this, r).batch(c);
    }
    static _BATCH_CMD(o, n) {
      return o.batch(n);
    }
    /**
     * Import sql file.
     *
     * @param opts JSON array with 2 possible fields: file and database
     */
    importFile(o) {
      return !o || !o.file ? Promise.reject(
        f.createError(
          "SQL file parameter is mandatory",
          f.ER_MISSING_SQL_PARAMETER,
          T(this, r).info,
          "HY000",
          null,
          !1,
          null
        )
      ) : new Promise(T(this, r).importFile.bind(T(this, r), { file: o.file, database: o.database }));
    }
    /**
     * Execute query returning a Readable Object that will emit columns/data/end/error events
     * to permit streaming big result-set
     *
     * @param sql     sql parameter Object can be used to supersede default option.
     *                Object must then have sql property.
     * @param values  object / array of placeholder values (not mandatory)
     * @returns {Readable}
     */
    queryStream(o, n) {
      const c = u(o, n);
      T(this, s).call(this, c);
      const i = new e(c, T(this, r).opts, T(this, r).socket);
      return T(this, r).opts.logger.error && i.on("error", T(this, r).opts.logger.error), T(this, r).addCommand(i, !0), i.inStream;
    }
    /**
     * Send an empty MySQL packet to ensure connection is active, and reset @@wait_timeout
     * @param timeout (optional) timeout value in ms. If reached, throw error and close connection
     * @returns {Promise} promise
     */
    ping(o) {
      const n = {
        opts: { timeout: o }
      };
      return T(this, s).call(this, n), new Promise(T(this, r).ping.bind(T(this, r), n));
    }
    /**
     * Send a reset command that will
     * - rollback any open transaction
     * - reset transaction isolation level
     * - reset session variables
     * - delete user variables
     * - remove temporary tables
     * - remove all PREPARE statement
     *
     * @returns {Promise} promise
     */
    reset() {
      const o = {};
      return T(this, s).call(this, o), new Promise(T(this, r).reset.bind(T(this, r), o));
    }
    /**
     * Indicates the state of the connection as the driver knows it
     * @returns {boolean}
     */
    isValid() {
      return T(this, r).isValid();
    }
    /**
     * Terminate connection gracefully.
     *
     * @returns {Promise} promise
     */
    end() {
      const o = {};
      return T(this, s).call(this, o), new Promise(T(this, r).end.bind(T(this, r), o));
    }
    /**
     * Alias for destroy.
     */
    close() {
      this.destroy();
    }
    /**
     * Force connection termination by closing the underlying socket and killing server process if any.
     */
    destroy() {
      T(this, r).destroy();
    }
    pause() {
      T(this, r).pause();
    }
    resume() {
      T(this, r).resume();
    }
    format(o, n) {
      T(this, r).format(o, n);
    }
    /**
     * return current connected server version information.
     *
     * @returns {*}
     */
    serverVersion() {
      return T(this, r).serverVersion();
    }
    /**
     * Change option "debug" during connection.
     * @param val   debug value
     */
    debug(o) {
      return T(this, r).debug(o);
    }
    debugCompress(o) {
      return T(this, r).debugCompress(o);
    }
    escape(o) {
      return T(this, r).escape(o);
    }
    escapeId(o) {
      return T(this, r).escapeId(o);
    }
    //*****************************************************************
    // EventEmitter proxy methods
    //*****************************************************************
    on(o, n) {
      return T(this, r).on.call(T(this, r), o, n), this;
    }
    off(o, n) {
      return T(this, r).off.call(T(this, r), o, n), this;
    }
    once(o, n) {
      return T(this, r).once.call(T(this, r), o, n), this;
    }
    listeners(o) {
      return T(this, r).listeners.call(T(this, r), o);
    }
    addListener(o, n) {
      return T(this, r).addListener.call(T(this, r), o, n), this;
    }
    eventNames() {
      return T(this, r).eventNames.call(T(this, r));
    }
    getMaxListeners() {
      return T(this, r).getMaxListeners.call(T(this, r));
    }
    listenerCount(o, n) {
      return T(this, r).listenerCount.call(T(this, r), o, n);
    }
    prependListener(o, n) {
      return T(this, r).prependListener.call(T(this, r), o, n), this;
    }
    prependOnceListener(o, n) {
      return T(this, r).prependOnceListener.call(T(this, r), o, n), this;
    }
    removeAllListeners(o, n) {
      return T(this, r).removeAllListeners.call(T(this, r), o, n), this;
    }
    removeListener(o, n) {
      return T(this, r).removeListener.call(T(this, r), o, n), this;
    }
    setMaxListeners(o) {
      return T(this, r).setMaxListeners.call(T(this, r), o), this;
    }
    rawListeners(o) {
      return T(this, r).rawListeners.call(T(this, r), o);
    }
    //*****************************************************************
    // internal public testing methods
    //*****************************************************************
    get __tests() {
      return T(this, r).__tests;
    }
  }
  r = new WeakMap(), s = new WeakMap();
  const u = function(a, o) {
    return typeof a == "object" ? { sql: a.sql, values: a.values ? a.values : o, opts: a } : { sql: a, values: o };
  };
  return En.exports = t, En.exports.paramSetter = u, En.exports;
}
var ts, Wu;
function Yh() {
  var o, n, c, i, l, _, d, p, E, h;
  if (Wu) return ts;
  Wu = 1;
  const { EventEmitter: e } = St, f = yh(), t = qe(), u = Zt(), r = Wh();
  class s extends e {
    constructor(C) {
      super();
      ge(this, "opts");
      Oe(this, o, !1);
      Oe(this, n, !1);
      Oe(this, c, null);
      Oe(this, i, new f());
      Oe(this, l, {});
      Oe(this, _, new f());
      Oe(this, d);
      Oe(this, p);
      Oe(this, E, 0);
      Oe(this, h, !1);
      ge(this, "_sizeHandlerTimeout");
      this.opts = C, this.on("_idle", this._requestsHandler), this.on("validateSize", this._sizeHandler), this._sizeHandler();
    }
    //*****************************************************************
    // pool automatic handlers
    //*****************************************************************
    _doCreateConnection(C, g, L) {
      this._createConnection(L).then((R) => {
        if (T(this, o)) {
          R.forceEnd(
            null,
            () => {
            },
            () => {
            }
          ), g(
            new t.createFatalError(
              "Cannot create new connection to pool, pool closed",
              t.ER_ADD_CONNECTION_CLOSED_POOL
            )
          );
          return;
        }
        R.lastUse = Date.now();
        const O = R.destroy.bind(R), D = this;
        R.destroy = function() {
          D._endLeak(R), delete T(D, l)[R.threadId], O(), D.emit("validateSize");
        }, R.once("error", function() {
          let m = 0, B;
          for (D._endLeak(R), delete T(D, l)[R.threadId]; B = T(D, i).peekAt(m); ) {
            if (B === R) {
              T(D, i).removeOne(m);
              continue;
            }
            B.lastUse = Math.min(B.lastUse, Date.now() - D.opts.minDelayValidation), m++;
          }
          setTimeout(() => {
            T(D, _).isEmpty() || D._sizeHandler();
          }, 0);
        }), T(this, i).push(R), Ne(this, n, !1), this.emit("_idle"), this.emit("connection", R), C(R);
      }).catch((R) => {
        if (R instanceof AggregateError && (R = R.errors[0]), T(this, o) || R.errno && (R.errno === 1524 || R.errno === 1045 || R.errno === 1698) || L < Date.now()) {
          R.message = R.message + this._errorMsgAddon(), g(R);
          return;
        }
        setTimeout(this._doCreateConnection.bind(this, C, g, L), 500);
      });
    }
    _destroy(C) {
      this._endLeak(C), delete T(this, l)[C.threadId], C.lastUse = Date.now(), C.forceEnd(
        null,
        () => {
        },
        () => {
        }
      ), this.totalConnections() === 0 && this._stopReaping(), this.emit("validateSize");
    }
    release(C) {
      T(this, l)[C.threadId] && (this._endLeak(C), T(this, l)[C.threadId] = null, C.lastUse = Date.now(), T(this, o) ? C.forceEnd(
        null,
        () => {
        },
        () => {
        }
      ) : C.isValid() ? (this.emit("release", C), T(this, i).push(C), process.nextTick(this.emit.bind(this, "_idle"))) : this.emit("validateSize"));
    }
    _checkLeak(C) {
      C.lastUse = Date.now(), C.leaked = !1, C.leakProcess = setTimeout(
        (g) => {
          g.leaked = !0, g.opts.logger.warning(
            `A possible connection leak on the thread ${g.info.threadId} (the connection not returned to the pool since ${Date.now() - g.lastUse} ms). Has the connection.release() been called ?` + this._errorMsgAddon()
          );
        },
        this.opts.leakDetectionTimeout,
        C
      );
    }
    _endLeak(C) {
      C.leakProcess && (clearTimeout(C.leakProcess), C.leakProcess = null, C.leaked && C.opts.logger.warning(
        `Previous possible leak connection with thread ${C.info.threadId} was returned to pool`
      ));
    }
    /**
     * Permit to remove idle connection if unused for some time.
     */
    _startReaping() {
      !T(this, d) && this.opts.idleTimeout > 0 && Ne(this, d, setInterval(this._reaper.bind(this), 500));
    }
    _stopReaping() {
      T(this, d) && this.totalConnections() === 0 && clearInterval(T(this, d));
    }
    _reaper() {
      const C = Date.now() - this.opts.idleTimeout * 1e3;
      let g = Math.max(0, T(this, i).length - this.opts.minimumIdle);
      for (; g > 0; ) {
        const L = T(this, i).peek();
        if (g--, L && L.lastUse < C) {
          T(this, i).shift(), L.forceEnd(
            null,
            () => {
            },
            () => {
            }
          );
          continue;
        }
        break;
      }
      this.totalConnections() === 0 && this._stopReaping(), this.emit("validateSize");
    }
    _shouldCreateMoreConnections() {
      return !T(this, n) && T(this, i).length < this.opts.minimumIdle && this.totalConnections() < this.opts.connectionLimit && !T(this, o);
    }
    /**
     * Grow pool connections until reaching connection limit.
     */
    _sizeHandler() {
      this._shouldCreateMoreConnections() && !this._sizeHandlerTimeout && (Ne(this, n, !0), setImmediate(
        (function() {
          const C = Date.now() + this.opts.initializationTimeout;
          new Promise((g, L) => {
            this._doCreateConnection(g, L, C);
          }).then(() => {
            Ne(this, h, !0), Ne(this, c, null), Ne(this, E, 0), this._shouldCreateMoreConnections() && this.emit("validateSize"), this._startReaping();
          }).catch((g) => {
            Ne(this, n, !1), T(this, o) || (T(this, h) ? g.message = "Pool fails to create connection: " + g.message : g.message = "Error during pool initialization: " + g.message, Ne(this, c, g), this.emit("error", g), this._sizeHandlerTimeout = setTimeout(
              (function() {
                this._sizeHandlerTimeout = null, T(this, _).isEmpty() || this._sizeHandler();
              }).bind(this),
              Math.min(++ar(this, E)._ * 500, 1e4)
            ));
          });
        }).bind(this)
      ));
    }
    /**
     * Launch next waiting task request if available connections.
     */
    _requestsHandler() {
      clearTimeout(T(this, p)), Ne(this, p, null);
      const C = T(this, _).shift();
      if (C) {
        const g = T(this, i).shift();
        g ? (this.opts.leakDetectionTimeout > 0 && this._checkLeak(g), this.emit("acquire", g), T(this, l)[g.threadId] = g, C.resolver(g)) : T(this, _).unshift(C), this._requestTimeoutHandler();
      }
    }
    _hasIdleConnection() {
      return !T(this, i).isEmpty();
    }
    /**
     * Return an idle Connection.
     * If connection has not been used for some time ( minDelayValidation), validate connection status.
     *
     * @returns {Promise<Connection>} connection of null of no valid idle connection.
     */
    async _doAcquire() {
      if (!this._hasIdleConnection() || T(this, o)) return Promise.reject();
      let C, g = !1;
      for (; (C = T(this, i).shift()) != null; ) {
        if (C.isValid()) {
          if (T(this, l)[C.threadId] = C, this.opts.minDelayValidation <= 0 || Date.now() - C.lastUse > this.opts.minDelayValidation)
            try {
              const L = {
                opts: { timeout: this.opts.pingTimeout }
              };
              await new Promise(C.ping.bind(C, L));
            } catch {
              delete T(this, l)[C.threadId];
              continue;
            }
          return this.opts.leakDetectionTimeout > 0 && this._checkLeak(C), g && setImmediate(this.emit.bind(this, "validateSize")), Promise.resolve(C);
        }
        g = !0;
      }
      return setImmediate(this.emit.bind(this, "validateSize")), Promise.reject();
    }
    _requestTimeoutHandler() {
      Ne(this, p, null);
      const C = Date.now();
      let g;
      for (; g = T(this, _).peekFront(); )
        if (g.timeout <= C) {
          T(this, _).shift();
          let L = this.activeConnections() === 0 ? T(this, c) : null, R = t.createError(
            `retrieve connection from pool timeout after ${Math.abs(
              Date.now() - (g.timeout - this.opts.acquireTimeout)
            )}ms${this._errorMsgAddon()}`,
            t.ER_GET_CONNECTION_TIMEOUT,
            null,
            "HY000",
            null,
            !1,
            g.stack,
            null,
            L
          );
          g.reject(R);
        } else {
          Ne(this, p, setTimeout(this._requestTimeoutHandler.bind(this), g.timeout - C));
          return;
        }
    }
    /**
     * Search info object of an existing connection. to know server type and version.
     * @returns information object if connection available.
     */
    _searchInfo() {
      let C = null, g = T(this, i).get(0);
      if (!g) {
        for (const L in Object.keys(T(this, l)))
          if (g = T(this, l)[L], !g)
            break;
      }
      return g && (C = g.info), C;
    }
    async _createConnection(C) {
      const g = Math.max(1, C - 100), L = !this.opts.connOptions.connectTimeout || this.opts.connOptions.connectTimeout > g ? Object.assign({}, this.opts.connOptions, { connectTimeout: g }) : this.opts.connOptions, R = new r(L);
      await R.connect();
      const O = this;
      return R.forceEnd = R.end, R.release = function(D) {
        if (T(O, o) || !R.isValid()) {
          O._destroy(R), D();
          return;
        }
        if (O.opts.noControlAfterUse) {
          O.release(R), D();
          return;
        }
        let m;
        O.opts.resetAfterUse && R.info.isMariaDB() && (R.info.serverVersion.minor === 2 && R.info.hasMinVersion(10, 2, 22) || R.info.hasMinVersion(10, 3, 13)) ? m = R.reset.bind(R, {}) : m = R.changeTransaction.bind(R, { sql: "ROLLBACK" }), new Promise(m).then(O.release.bind(O, R), O._destroy.bind(O, R)).finally(D);
      }, R.end = R.release, R;
    }
    _leakedConnections() {
      let C = 0;
      for (const g of Object.values(T(this, l)))
        g && g.leaked && C++;
      return C;
    }
    _errorMsgAddon() {
      return this.opts.leakDetectionTimeout > 0 ? `
    (pool connections: active=${this.activeConnections()} idle=${this.idleConnections()} leak=${this._leakedConnections()} limit=${this.opts.connectionLimit})` : `
    (pool connections: active=${this.activeConnections()} idle=${this.idleConnections()} limit=${this.opts.connectionLimit})`;
    }
    toString() {
      return `active=${this.activeConnections()} idle=${this.idleConnections()} limit=${this.opts.connectionLimit}`;
    }
    //*****************************************************************
    // public methods
    //*****************************************************************
    get closed() {
      return T(this, o);
    }
    /**
     * Get current total connection number.
     * @return {number}
     */
    totalConnections() {
      return this.activeConnections() + this.idleConnections();
    }
    /**
     * Get current active connections.
     * @return {number}
     */
    activeConnections() {
      let C = 0;
      for (const g of Object.values(T(this, l)))
        g && C++;
      return C;
    }
    /**
     * Get current idle connection number.
     * @return {number}
     */
    idleConnections() {
      return T(this, i).length;
    }
    /**
     * Get current stacked connection request.
     * @return {number}
     */
    taskQueueSize() {
      return T(this, _).length;
    }
    escape(C) {
      return u.escape(this.opts.connOptions, this._searchInfo(), C);
    }
    escapeId(C) {
      return u.escapeId(this.opts.connOptions, this._searchInfo(), C);
    }
    //*****************************************************************
    // promise methods
    //*****************************************************************
    /**
     * Retrieve a connection from pool.
     * Create a new one, if limit is not reached.
     * wait until acquireTimeout.
     * @param cmdParam for stackTrace error
     * @return {Promise}
     */
    getConnection(C) {
      return T(this, o) ? Promise.reject(
        t.createError(
          "pool is closed",
          t.ER_POOL_ALREADY_CLOSED,
          null,
          "HY000",
          C === null ? null : C.sql,
          !1,
          C.stack
        )
      ) : this._doAcquire().then(
        (g) => (this.emit("acquire", g), g),
        () => {
          if (T(this, o))
            throw t.createError(
              "Cannot add request to pool, pool is closed",
              t.ER_POOL_ALREADY_CLOSED,
              null,
              "HY000",
              C === null ? null : C.sql,
              !1,
              C.stack
            );
          return setImmediate(this.emit.bind(this, "validateSize")), new Promise(
            (function(g, L) {
              setImmediate(this.emit.bind(this, "enqueue"));
              const R = new a(Date.now() + this.opts.acquireTimeout, C.stack, g, L);
              T(this, _).push(R), T(this, p) || Ne(this, p, setTimeout(this._requestTimeoutHandler.bind(this), this.opts.acquireTimeout));
            }).bind(this)
          );
        }
      );
    }
    /**
     * Close all connection in pool
     * Ends in multiple step :
     * - close idle connections
     * - ensure that no new request is possible
     *   (active connection release are automatically closed on release)
     * - if remaining, after 10 seconds, close remaining active connections
     *
     * @return Promise
     */
    end() {
      if (T(this, o))
        return Promise.reject(t.createError("pool is already closed", t.ER_POOL_ALREADY_CLOSED));
      Ne(this, o, !0), clearInterval(T(this, d)), clearInterval(this._sizeHandlerTimeout);
      const C = {};
      this.opts.trace && Error.captureStackTrace(C);
      const g = [];
      let L;
      for (; L = T(this, i).shift(); )
        g.push(new Promise(L.forceEnd.bind(L, C)));
      if (clearTimeout(T(this, p)), Ne(this, p, null), !T(this, _).isEmpty()) {
        const O = t.createError(
          "pool is ending, connection request aborted",
          t.ER_CLOSING_POOL,
          null,
          "HY000",
          null,
          !1,
          C.stack
        );
        let D;
        for (; D = T(this, _).shift(); )
          D.reject(O);
      }
      const R = this;
      return Promise.all(g).then(async () => {
        if (R.activeConnections() > 0) {
          let O = 100;
          for (; O-- > 0; )
            R.activeConnections() > 0 && await new Promise((D) => setTimeout(() => D(), 100));
          for (const D of Object.values(T(R, l)))
            D && D.destroy();
        }
        return Promise.resolve();
      });
    }
  }
  o = new WeakMap(), n = new WeakMap(), c = new WeakMap(), i = new WeakMap(), l = new WeakMap(), _ = new WeakMap(), d = new WeakMap(), p = new WeakMap(), E = new WeakMap(), h = new WeakMap();
  class a {
    constructor(A, C, g, L) {
      this.timeout = A, this.stack = C, this.resolver = g, this.rejecter = L;
    }
    reject(A) {
      process.nextTick(this.rejecter, A);
    }
  }
  return ts = s, ts;
}
var rs, ju;
function Kh() {
  var s;
  if (ju) return rs;
  ju = 1;
  const { EventEmitter: e } = St, f = Yh(), t = jh(), u = qe();
  class r extends e {
    constructor(n) {
      super();
      Oe(this, s);
      Ne(this, s, new f(n)), T(this, s).on("acquire", this.emit.bind(this, "acquire")), T(this, s).on("connection", this.emit.bind(this, "connection")), T(this, s).on("enqueue", this.emit.bind(this, "enqueue")), T(this, s).on("release", this.emit.bind(this, "release")), T(this, s).on("error", this.emit.bind(this, "error"));
    }
    get closed() {
      return T(this, s).closed;
    }
    /**
     * Get current total connection number.
     * @return {number}
     */
    totalConnections() {
      return T(this, s).totalConnections();
    }
    /**
     * Get current active connections.
     * @return {number}
     */
    activeConnections() {
      return T(this, s).activeConnections();
    }
    /**
     * Get current idle connection number.
     * @return {number}
     */
    idleConnections() {
      return T(this, s).idleConnections();
    }
    /**
     * Get current stacked connection request.
     * @return {number}
     */
    taskQueueSize() {
      return T(this, s).taskQueueSize();
    }
    escape(n) {
      return T(this, s).escape(n);
    }
    escapeId(n) {
      return T(this, s).escapeId(n);
    }
    /**
     * Ends pool
     *
     * @return Promise
     **/
    end() {
      return T(this, s).end();
    }
    /**
     * Retrieve a connection from pool.
     * Create a new one, if limit is not reached.
     * wait until acquireTimeout.
     *
     */
    async getConnection() {
      const n = {};
      T(this, s).opts.connOptions.trace && Error.captureStackTrace(n);
      const c = await T(this, s).getConnection(n), i = new t(c);
      return i.release = () => new Promise(c.release), i.end = i.release, i.close = i.release, i;
    }
    /**
     * Execute query using text protocol with callback emit columns/data/end/error
     * events to permit streaming big result-set
     *
     * @param sql     sql parameter Object can be used to supersede default option.
     *                Object must then have sql property.
     * @param values  object / array of placeholder values (not mandatory)
     */
    query(n, c) {
      const i = t.paramSetter(n, c);
      return T(this, s).opts.connOptions.trace && Error.captureStackTrace(i), T(this, s).getConnection(i).then((l) => new Promise(l.query.bind(l, i)).finally(() => {
        T(this, s).release(l);
      }));
    }
    /**
     * Execute query using binary protocol with callback emit columns/data/end/error
     * events to permit streaming big result-set
     *
     * @param sql     sql parameter Object can be used to supersede default option.
     *                Object must then have sql property.
     * @param values  object / array of placeholder values (not mandatory)
     */
    execute(n, c) {
      const i = t.paramSetter(n, c);
      return T(this, s).opts.connOptions.trace && Error.captureStackTrace(i), T(this, s).getConnection(i).then((l) => t._EXECUTE_CMD(l, i).finally(() => {
        T(this, s).release(l);
      }));
    }
    /**
     * execute a batch
     *
     * @param sql     sql parameter Object can be used to supersede default option.
     *                Object must then have sql property.
     * @param values  array of placeholder values
     */
    batch(n, c) {
      const i = t.paramSetter(n, c);
      return T(this, s).opts.connOptions.trace && Error.captureStackTrace(i), T(this, s).getConnection(i).then((l) => t._BATCH_CMD(l, i).finally(() => {
        T(this, s).release(l);
      }));
    }
    /**
     * Import sql file.
     *
     * @param opts JSON array with 2 possible fields: file and database
     */
    importFile(n) {
      return n ? T(this, s).getConnection({}).then((c) => new Promise(c.importFile.bind(c, { file: n.file, database: n.database })).finally(
        () => {
          T(this, s).release(c);
        }
      )) : Promise.reject(
        u.createError(
          "SQL file parameter is mandatory",
          u.ER_MISSING_SQL_PARAMETER,
          null,
          "HY000",
          null,
          !1,
          null
        )
      );
    }
    toString() {
      return "poolPromise(" + T(this, s).toString() + ")";
    }
  }
  return s = new WeakMap(), rs = r, rs;
}
var ns, Yu;
function zh() {
  if (Yu) return ns;
  Yu = 1;
  class e {
    constructor(t) {
      t ? (this.canRetry = t.canRetry === void 0 ? !0 : t.canRetry, this.removeNodeErrorCount = t.removeNodeErrorCount || 1 / 0, this.restoreNodeTimeout = t.restoreNodeTimeout || 1e3, this.defaultSelector = t.defaultSelector || "RR") : (this.canRetry = !0, this.removeNodeErrorCount = 1 / 0, this.restoreNodeTimeout = 1e3, this.defaultSelector = "RR");
    }
  }
  return ns = e, ns;
}
var is, Ku;
function Xh() {
  if (Ku) return is;
  Ku = 1;
  let e = vn();
  class f {
    constructor(u) {
      typeof u == "string" && (u = e.parse(u), u.acquireTimeout && (u.acquireTimeout = parseInt(u.acquireTimeout)), u.connectionLimit && (u.connectionLimit = parseInt(u.connectionLimit)), u.idleTimeout && (u.idleTimeout = parseInt(u.idleTimeout)), u.leakDetectionTimeout && (u.leakDetectionTimeout = parseInt(u.leakDetectionTimeout)), u.initializationTimeout && (u.initializationTimeout = parseInt(u.initializationTimeout)), u.minDelayValidation && (u.minDelayValidation = parseInt(u.minDelayValidation)), u.minimumIdle && (u.minimumIdle = parseInt(u.minimumIdle)), u.noControlAfterUse && (u.noControlAfterUse = u.noControlAfterUse === "true"), u.resetAfterUse && (u.resetAfterUse = u.resetAfterUse === "true"), u.pingTimeout && (u.pingTimeout = parseInt(u.pingTimeout))), this.acquireTimeout = u.acquireTimeout === void 0 ? 1e4 : u.acquireTimeout, this.connectionLimit = u.connectionLimit === void 0 ? 10 : u.connectionLimit, this.idleTimeout = u.idleTimeout === void 0 ? 1800 : u.idleTimeout, this.leakDetectionTimeout = u.leakDetectionTimeout || 0, this.initializationTimeout = u.initializationTimeout === void 0 ? Math.max(100, this.acquireTimeout - 100) : u.initializationTimeout, this.minDelayValidation = u.minDelayValidation === void 0 ? 500 : u.minDelayValidation, this.minimumIdle = u.minimumIdle === void 0 ? this.connectionLimit : Math.min(u.minimumIdle, this.connectionLimit), this.noControlAfterUse = u.noControlAfterUse || !1, this.resetAfterUse = u.resetAfterUse || !1, this.pingTimeout = u.pingTimeout || 250, this.connOptions = new e(u), this.acquireTimeout > 0 && this.connOptions.connectTimeout > this.acquireTimeout && (this.connOptions.connectTimeout = this.acquireTimeout);
    }
  }
  return is = f, is;
}
var ss, zu;
function ME() {
  var r, s;
  if (zu) return ss;
  zu = 1;
  const e = qe(), { Status: f } = $h(), t = Wo(), a = class a {
    constructor(n) {
      Oe(this, r);
      Oe(this, s, () => {
      });
      ge(this, "release", (n) => {
        T(this, r).release(() => {
          n && n();
        });
      });
      Ne(this, r, n);
    }
    get threadId() {
      return T(this, r).info ? T(this, r).info.threadId : null;
    }
    get info() {
      return T(this, r).info;
    }
    /**
     * Permit to change user during connection.
     * All user variables will be reset, Prepare commands will be released.
     * !!! mysql has a bug when CONNECT_ATTRS capability is set, that is default !!!!
     *
     * @param options   connection options
     * @param callback  callback function
     */
    changeUser(n, c) {
      let i, l;
      typeof n == "function" ? (l = n, i = void 0) : (i = n, l = c);
      const _ = {
        opts: i,
        callback: l
      };
      T(this, r).opts.trace && Error.captureStackTrace(_), new Promise(T(this, r).changeUser.bind(T(this, r), _)).then(() => {
        _.callback && _.callback(null, null, null);
      }).catch(_.callback || T(this, s));
    }
    /**
     * Start transaction
     *
     * @param callback  callback function
     */
    beginTransaction(n) {
      this.query("START TRANSACTION", null, n);
    }
    /**
     * Commit a transaction.
     *
     * @param callback  callback function
     */
    commit(n) {
      T(this, r).changeTransaction(
        { sql: "COMMIT" },
        () => {
          n && n(null, null, null);
        },
        n || T(this, s)
      );
    }
    /**
     * Roll back a transaction.
     *
     * @param callback  callback function
     */
    rollback(n) {
      T(this, r).changeTransaction(
        { sql: "ROLLBACK" },
        () => {
          n && n(null, null, null);
        },
        n || T(this, s)
      );
    }
    /**
     * Execute query using text protocol with callback emit columns/data/end/error
     * events to permit streaming big result-set
     *
     * @param sql     sql parameter Object can be used to supersede default option.
     *                Object must then have sql property.
     * @param values  object / array of placeholder values (not mandatory)
     * @param callback  callback function
     */
    query(n, c, i) {
      const l = a._PARAM(T(this, r).opts, n, c, i);
      return a._QUERY_CMD(T(this, r), l);
    }
    static _QUERY_CMD(n, c) {
      let i;
      return c.callback ? (c.opts = c.opts ? Object.assign(c.opts, { metaAsArray: !0 }) : { metaAsArray: !0 }, i = new t(
        ([l, _]) => {
          c.callback(null, l, _);
        },
        c.callback,
        n.opts,
        c
      )) : i = new t(
        () => {
        },
        () => {
        },
        n.opts,
        c
      ), i.handleNewRows = (l) => {
        i._rows[i._responseIndex].push(l), i.emit("data", l);
      }, n.addCommand(i, !0), i.stream = (l) => i._stream(n.socket, l), i;
    }
    execute(n, c, i) {
      const l = a._PARAM(T(this, r).opts, n, c, i);
      l.opts = l.opts ? Object.assign(l.opts, { metaAsArray: !0 }) : { metaAsArray: !0 }, T(this, r).prepareExecute(l).then(([_, d]) => {
        l.callback && l.callback(null, _, d);
      }).catch((_) => {
        l.callback && l.callback(_);
      });
    }
    static _PARAM(n, c, i, l) {
      let _, d, p = i, E = l;
      typeof i == "function" && (E = i, p = void 0), typeof c == "object" ? (_ = c, d = _.sql, _.values && (p = _.values)) : d = c;
      const h = {
        sql: d,
        values: p,
        opts: _,
        callback: E
      };
      return n.trace && Error.captureStackTrace(h, a._PARAM), h;
    }
    static _EXECUTE_CMD(n, c) {
      new Promise(n.prepare.bind(n, c)).then((i) => {
        const l = c.opts ? Object.assign(c.opts, { metaAsArray: !0 }) : { metaAsArray: !0 };
        return i.execute(c.values, l, null, c.stack).then(([_, d]) => {
          c.callback && c.callback(null, _, d);
        }).finally(() => i.close());
      }).catch((i) => {
        n.opts.logger.error && n.opts.logger.error(i), c.callback && c.callback(i);
      });
    }
    prepare(n, c) {
      let i, l;
      typeof n == "object" ? (i = n, l = i.sql) : l = n;
      const _ = {
        sql: l,
        opts: i,
        callback: c
      };
      return T(this, r).opts.trace && Error.captureStackTrace(_), new Promise(T(this, r).prepare.bind(T(this, r), _)).then((d) => {
        c && c(null, d, null);
      }).catch(c || T(this, s));
    }
    /**
     * Execute a batch
     * events to permit streaming big result-set
     *
     * @param sql     sql parameter Object can be used to supersede default option.
     *                Object must then have sql property.
     * @param values  object / array of placeholder values (not mandatory)
     * @param callback callback
     */
    batch(n, c, i) {
      const l = a._PARAM(T(this, r).opts, n, c, i);
      return a._BATCH_CMD(T(this, r), l);
    }
    static _BATCH_CMD(n, c) {
      n.batch(c).then((i) => {
        c.callback && c.callback(null, i);
      }).catch((i) => {
        c.callback && c.callback(i);
      });
    }
    /**
     * Import sql file.
     *
     * @param opts JSON array with 2 possible fields: file and database
     * @param cb callback
     */
    importFile(n, c) {
      if (!n || !n.file) {
        c && c(
          e.createError(
            "SQL file parameter is mandatory",
            e.ER_MISSING_SQL_PARAMETER,
            T(this, r).info,
            "HY000",
            null,
            !1,
            null
          )
        );
        return;
      }
      new Promise(T(this, r).importFile.bind(T(this, r), { file: n.file, database: n.database })).then(() => {
        c && c();
      }).catch((i) => {
        c && c(i);
      });
    }
    /**
     * Send an empty MySQL packet to ensure connection is active, and reset @@wait_timeout
     * @param timeout (optional) timeout value in ms. If reached, throw error and close connection
     * @param callback callback
     */
    ping(n, c) {
      let i = {}, l;
      typeof n == "function" ? l = n : (i.timeout = n, l = c);
      const _ = {
        opts: i,
        callback: l
      };
      T(this, r).opts.trace && Error.captureStackTrace(_), new Promise(T(this, r).ping.bind(T(this, r), _)).then(l || T(this, s)).catch(l || T(this, s));
    }
    /**
     * Send a reset command that will
     * - rollback any open transaction
     * - reset transaction isolation level
     * - reset session variables
     * - delete user variables
     * - remove temporary tables
     * - remove all PREPARE statement
     *
     * @param callback callback
     */
    reset(n) {
      const c = {};
      return T(this, r).opts.trace && Error.captureStackTrace(c), new Promise(T(this, r).reset.bind(T(this, r), c)).then(n || T(this, s)).catch(n || T(this, s));
    }
    /**
     * Indicates the state of the connection as the driver knows it
     * @returns {boolean}
     */
    isValid() {
      return T(this, r).isValid();
    }
    /**
     * Terminate connection gracefully.
     *
     * @param callback callback
     */
    end(n) {
      const c = {};
      T(this, r).opts.trace && Error.captureStackTrace(c), new Promise(T(this, r).end.bind(T(this, r), c)).then(() => {
        n && n();
      }).catch(n || T(this, s));
    }
    /**
     * Alias for destroy.
     */
    close() {
      this.destroy();
    }
    /**
     * Force connection termination by closing the underlying socket and killing server process if any.
     */
    destroy() {
      T(this, r).destroy();
    }
    pause() {
      T(this, r).pause();
    }
    resume() {
      T(this, r).resume();
    }
    format(n, c) {
      T(this, r).format(n, c);
    }
    /**
     * return current connected server version information.
     *
     * @returns {*}
     */
    serverVersion() {
      return T(this, r).serverVersion();
    }
    /**
     * Change option "debug" during connection.
     * @param val   debug value
     */
    debug(n) {
      return T(this, r).debug(n);
    }
    debugCompress(n) {
      return T(this, r).debugCompress(n);
    }
    escape(n) {
      return T(this, r).escape(n);
    }
    escapeId(n) {
      return T(this, r).escapeId(n);
    }
    //*****************************************************************
    // internal public testing methods
    //*****************************************************************
    get __tests() {
      return T(this, r).__tests;
    }
    connect(n) {
      if (!n)
        throw new e.createError(
          "missing mandatory callback parameter",
          e.ER_MISSING_PARAMETER,
          T(this, r).info
        );
      switch (T(this, r).status) {
        case f.NOT_CONNECTED:
        case f.CONNECTING:
        case f.AUTHENTICATING:
        case f.INIT_CMD:
          this.once("connect", n);
          break;
        case f.CONNECTED:
          n.call(this);
          break;
        case f.CLOSING:
        case f.CLOSED:
          n.call(
            this,
            e.createError(
              "Connection closed",
              e.ER_CONNECTION_ALREADY_CLOSED,
              T(this, r).info,
              "08S01",
              null,
              !0
            )
          );
          break;
      }
    }
    //*****************************************************************
    // EventEmitter proxy methods
    //*****************************************************************
    on(n, c) {
      return T(this, r).on.call(T(this, r), n, c), this;
    }
    off(n, c) {
      return T(this, r).off.call(T(this, r), n, c), this;
    }
    once(n, c) {
      return T(this, r).once.call(T(this, r), n, c), this;
    }
    listeners(n) {
      return T(this, r).listeners.call(T(this, r), n);
    }
    addListener(n, c) {
      return T(this, r).addListener.call(T(this, r), n, c), this;
    }
    eventNames() {
      return T(this, r).eventNames.call(T(this, r));
    }
    getMaxListeners() {
      return T(this, r).getMaxListeners.call(T(this, r));
    }
    listenerCount(n, c) {
      return T(this, r).listenerCount.call(T(this, r), n, c);
    }
    prependListener(n, c) {
      return T(this, r).prependListener.call(T(this, r), n, c), this;
    }
    prependOnceListener(n, c) {
      return T(this, r).prependOnceListener.call(T(this, r), n, c), this;
    }
    removeAllListeners(n, c) {
      return T(this, r).removeAllListeners.call(T(this, r), n, c), this;
    }
    removeListener(n, c) {
      return T(this, r).removeListener.call(T(this, r), n, c), this;
    }
    setMaxListeners(n) {
      return T(this, r).setMaxListeners.call(T(this, r), n), this;
    }
    rawListeners(n) {
      return T(this, r).rawListeners.call(T(this, r), n);
    }
  };
  r = new WeakMap(), s = new WeakMap();
  let u = a;
  return ss = u, ss;
}
var as, Xu;
function xE() {
  var s, a;
  if (Xu) return as;
  Xu = 1;
  const { EventEmitter: e } = St, f = Yh(), t = qe(), u = ME();
  class r extends e {
    constructor(c) {
      super();
      Oe(this, s);
      Oe(this, a, () => {
      });
      Ne(this, s, new f(c)), T(this, s).on("acquire", this.emit.bind(this, "acquire")), T(this, s).on("connection", this.emit.bind(this, "connection")), T(this, s).on("enqueue", this.emit.bind(this, "enqueue")), T(this, s).on("release", this.emit.bind(this, "release")), T(this, s).on("error", this.emit.bind(this, "error"));
    }
    get closed() {
      return T(this, s).closed;
    }
    /**
     * Get current total connection number.
     * @return {number}
     */
    totalConnections() {
      return T(this, s).totalConnections();
    }
    /**
     * Get current active connections.
     * @return {number}
     */
    activeConnections() {
      return T(this, s).activeConnections();
    }
    /**
     * Get current idle connection number.
     * @return {number}
     */
    idleConnections() {
      return T(this, s).idleConnections();
    }
    /**
     * Get current stacked connection request.
     * @return {number}
     */
    taskQueueSize() {
      return T(this, s).taskQueueSize();
    }
    escape(c) {
      return T(this, s).escape(c);
    }
    escapeId(c) {
      return T(this, s).escapeId(c);
    }
    /**
     * Ends pool
     *
     * @param callback
     */
    end(c) {
      T(this, s).end().then(() => {
        c && c(null);
      }).catch(c || T(this, a));
    }
    /**
     * Retrieve a connection from pool.
     * Create a new one, if limit is not reached.
     * wait until acquireTimeout.
     *
     * @param cb callback
     */
    getConnection(c) {
      if (!c)
        throw new t.createError("missing mandatory callback parameter", t.ER_MISSING_PARAMETER);
      const i = {};
      T(this, s).opts.connOptions.trace && Error.captureStackTrace(i), T(this, s).getConnection(i).then((l) => {
        const _ = new u(l);
        _.end = (d) => _.release(d), _.close = (d) => _.release(d), c(null, _);
      }).catch(c);
    }
    /**
     * Execute query using text protocol with callback emit columns/data/end/error
     * events to permit streaming big result-set
     *
     * @param sql     sql parameter Object can be used to supersede default option.
     *                Object must then have sql property.
     * @param values  object / array of placeholder values (not mandatory)
     * @param cb      callback
     */
    query(c, i, l) {
      const _ = u._PARAM(T(this, s).opts.connOptions, c, i, l);
      T(this, s).getConnection(_).then((d) => {
        const p = _.callback;
        _.callback = (E, h, N) => {
          T(this, s).release(d), p && p(E, h, N);
        }, u._QUERY_CMD(d, _);
      }).catch((d) => {
        _.callback && _.callback(d);
      });
    }
    /**
     * Execute query using binary protocol with callback emit columns/data/end/error
     * events to permit streaming big result-set
     *
     * @param sql     sql parameter Object can be used to supersede default option.
     *                Object must then have sql property.
     * @param values  object / array of placeholder values (not mandatory)
     * @param cb      callback
     */
    execute(c, i, l) {
      const _ = u._PARAM(T(this, s).opts.connOptions, c, i, l);
      T(this, s).getConnection(_).then((d) => {
        const p = _.callback;
        _.callback = (E, h, N) => {
          T(this, s).release(d), p && p(E, h, N);
        }, u._EXECUTE_CMD(d, _);
      }).catch((d) => {
        _.callback && _.callback(d);
      });
    }
    /**
     * execute a batch
     *
     * @param sql     sql parameter Object can be used to supersede default option.
     *                Object must then have sql property.
     * @param values  array of placeholder values
     * @param cb      callback
     */
    batch(c, i, l) {
      const _ = u._PARAM(T(this, s).opts.connOptions, c, i, l);
      T(this, s).getConnection(_).then((d) => {
        const p = _.callback;
        _.callback = (E, h, N) => {
          T(this, s).release(d), p && p(E, h, N);
        }, u._BATCH_CMD(d, _);
      }).catch((d) => {
        _.callback && _.callback(d);
      });
    }
    /**
     * Import sql file.
     *
     * @param opts JSON array with 2 possible fields: file and database
     * @param cb callback
     */
    importFile(c, i) {
      if (!c) {
        i && i(
          t.createError(
            "SQL file parameter is mandatory",
            t.ER_MISSING_SQL_PARAMETER,
            null,
            "HY000",
            null,
            !1,
            null
          )
        );
        return;
      }
      T(this, s).getConnection({}).then((l) => new Promise(l.importFile.bind(l, { file: c.file, database: c.database })).finally(
        () => {
          T(this, s).release(l);
        }
      )).then(() => {
        i && i();
      }).catch((l) => {
        i && i(l);
      });
    }
    toString() {
      return "poolCallback(" + T(this, s).toString() + ")";
    }
  }
  return s = new WeakMap(), a = new WeakMap(), as = r, as;
}
var os, Qu;
function BE() {
  var f, t, u;
  if (Qu) return os;
  Qu = 1;
  class e {
    constructor(s, a, o) {
      Oe(this, f);
      Oe(this, t);
      Oe(this, u);
      Ne(this, f, s), Ne(this, t, a), Ne(this, u, o);
    }
    /**
     * Get a connection according to previously indicated pattern and selector.
     *
     * @return {Promise}
     */
    getConnection() {
      return T(this, f).getConnection(T(this, t), T(this, u));
    }
    /**
     * Execute a text query on one connection from available pools matching pattern
     * in cluster.
     *
     * @param sql   sql command
     * @param value parameter value of sql command (not mandatory)
     * @return {Promise}
     */
    query(s, a) {
      return T(this, f).getConnection(T(this, t), T(this, u)).then((o) => o.query(s, a).then((n) => (o.release(), n)).catch((n) => (o.release(), Promise.reject(n)))).catch((o) => Promise.reject(o));
    }
    /**
     * Execute a binary query on one connection from available pools matching pattern
     * in cluster.
     *
     * @param sql   sql command
     * @param value parameter value of sql command (not mandatory)
     * @return {Promise}
     */
    execute(s, a) {
      return T(this, f).getConnection(T(this, t), T(this, u)).then((o) => o.execute(s, a).then((n) => (o.release(), n)).catch((n) => (o.release(), Promise.reject(n)))).catch((o) => Promise.reject(o));
    }
    /**
     * Execute a batch on one connection from available pools matching pattern
     * in cluster.
     *
     * @param sql   sql command
     * @param value parameter value of sql command
     * @return {Promise}
     */
    batch(s, a) {
      return T(this, f).getConnection(T(this, t), T(this, u)).then((o) => o.batch(s, a).then((n) => (o.release(), n)).catch((n) => (o.release(), Promise.reject(n)))).catch((o) => Promise.reject(o));
    }
  }
  return f = new WeakMap(), t = new WeakMap(), u = new WeakMap(), os = e, os;
}
var cs, Ju;
function kE() {
  var l, _, d, p, E;
  if (Ju) return cs;
  Ju = 1;
  const e = zh(), f = Xh(), t = xE(), u = Kh(), r = BE(), s = St;
  class a extends s {
    constructor(A) {
      super();
      Oe(this, l);
      Oe(this, _, {});
      Oe(this, d, {});
      Oe(this, p, 0);
      Ne(this, l, new e(A));
    }
    /**
     * Add a new pool node to cluster.
     *
     * @param id      identifier
     * @param config  pool configuration
     */
    add(A, C) {
      let g;
      if (typeof A == "string" || A instanceof String) {
        if (g = A, T(this, _)[g]) throw new Error(`Node identifier '${g}' already exist !`);
      } else
        g = "PoolNode-" + ar(this, p)._++, C = A;
      const L = new f(C);
      T(this, _)[g] = this._createPool(L);
    }
    /**
     * End cluster (and underlying pools).
     *
     * @return {Promise<any[]>}
     */
    end() {
      const A = this;
      Ne(this, d, {});
      const C = [];
      return Object.keys(T(this, _)).forEach((g) => {
        const L = T(A, _)[g].end();
        L && C.push(L);
      }), Ne(this, _, null), Promise.all(C);
    }
    of(A, C) {
      return new r(this, A, C);
    }
    /**
     * Remove nodes according to pattern.
     *
     * @param pattern  pattern
     */
    remove(A) {
      if (!A) throw new Error("pattern parameter in Cluster.remove(pattern)  is mandatory");
      const C = RegExp(A);
      Object.keys(T(this, _)).forEach(
        (function(g) {
          C.test(g) && (T(this, _)[g].end(), delete T(this, _)[g], Ne(this, d, {}));
        }).bind(this)
      );
    }
    /**
     * Get connection from available pools matching pattern, according to selector
     *
     * @param pattern       pattern filter (not mandatory)
     * @param selector      node selector ('RR','RANDOM' or 'ORDER')
     * @return {Promise}
     */
    getConnection(A, C) {
      return this._getConnection(A, C, void 0, void 0, void 0);
    }
    /**
     * Force using callback methods.
     */
    _setCallback() {
      this.getConnection = this._getConnectionCallback, this._createPool = this._createPoolCallback;
    }
    /**
     * Get connection from available pools matching pattern, according to selector
     * with additional parameter to avoid reusing failing node
     *
     * @param pattern       pattern filter (not mandatory)
     * @param selector      node selector ('RR','RANDOM' or 'ORDER')
     * @param avoidNodeKey  failing node
     * @param lastError     last error
     * @param remainingRetry remaining possible retry
     * @return {Promise}
     * @private
     */
    _getConnection(A, C, g, L, R) {
      const O = this._matchingNodes(A || /^/);
      if (O.length === 0) {
        if (Object.keys(T(this, _)).length === 0 && !R)
          return Promise.reject(
            new Error("No node have been added to cluster or nodes have been removed due to too much connection error")
          );
        if (L === void 0) return Promise.reject(new Error(`No node found for pattern '${A}'`));
        const m = `No Connection available for '${A}'${R ? ". Last connection error was: " + R.message : ""}`;
        return Promise.reject(new Error(m));
      }
      g === void 0 && (g = O.length);
      const D = --g >= 0 ? this._getConnection.bind(this, A, C, g) : null;
      try {
        const m = this._selectPool(O, C, L);
        return this._handleConnectionError(O, m, D);
      } catch (m) {
        return Promise.reject(m);
      }
    }
    _createPool(A) {
      const C = new u(A);
      return C.on("error", (g) => {
      }), C;
    }
    _createPoolCallback(A) {
      const C = new t(A);
      return C.on("error", (g) => {
      }), C;
    }
    /**
     * Get connection from available pools matching pattern, according to selector
     * with additional parameter to avoid reusing failing node
     *
     * @param pattern       pattern filter (not mandatory)
     * @param selector      node selector ('RR','RANDOM' or 'ORDER')
     * @param callback      callback function
     * @param avoidNodeKey  failing node
     * @param lastError     last error
     * @private
     */
    _getConnectionCallback(A, C, g, L, R) {
      const O = this._matchingNodes(A || /^/);
      if (O.length === 0) {
        if (Object.keys(T(this, _)).length === 0 && !R) {
          g(
            new Error("No node have been added to cluster or nodes have been removed due to too much connection error")
          );
          return;
        }
        L === void 0 && g(new Error(`No node found for pattern '${A}'`));
        const m = `No Connection available for '${A}'${R ? ". Last connection error was: " + R.message : ""}`;
        g(new Error(m));
        return;
      }
      const D = this._getConnectionCallback.bind(this, A, C, g);
      try {
        const m = this._selectPool(O, C, L);
        this._handleConnectionCallbackError(O, m, D, g);
      } catch (m) {
        g(m);
      }
    }
    /**
     * Selecting nodes according to pattern.
     *
     * @param pattern pattern
     * @return {*}
     * @private
     */
    _matchingNodes(A) {
      if (T(this, d)[A]) return T(this, d)[A];
      const C = RegExp(A), g = [];
      return Object.keys(T(this, _)).forEach((L) => {
        C.test(L) && g.push(L);
      }), T(this, d)[A] = g, g;
    }
    /**
     * Select next node to be chosen in nodeList according to selector and failed nodes.
     *
     * @param nodeList        current node list
     * @param selectorParam   selector
     * @param avoidNodeKey    last failing node to avoid selecting this one.
     * @return {Promise}
     * @private
     */
    _selectPool(A, C, g) {
      const L = C || T(this, l).defaultSelector;
      let R;
      switch (L) {
        case "RR":
          R = n;
          break;
        case "RANDOM":
          R = c;
          break;
        case "ORDER":
          R = i;
          break;
        default:
          throw new Error(`Wrong selector value '${L}'. Possible values are 'RR','RANDOM' or 'ORDER'`);
      }
      let O = 0, D = R(A, O);
      for (; (g === D || T(this, _)[D].blacklistedUntil && T(this, _)[D].blacklistedUntil > Date.now()) && O < A.length - 1; )
        O++, D = R(A, O);
      if (g === D)
        for (O = 0; g === D && O < A.length - 1; )
          O++, D = R(A, O);
      return D;
    }
    /**
     * Connect, or if fail handle retry / set timeout error
     *
     * @param nodeList    current node list
     * @param nodeKey     node name to connect
     * @param retryFct    retry function
     * @return {Promise}
     * @private
     */
    _handleConnectionError(A, C, g) {
      const L = this, R = T(this, _)[C];
      return R.getConnection().then((O) => (R.blacklistedUntil = null, R.errorCount = 0, Promise.resolve(O))).catch((O) => (R.errorCount = R.errorCount ? R.errorCount + 1 : 1, R.blacklistedUntil = Date.now() + T(L, l).restoreNodeTimeout, T(L, l).removeNodeErrorCount && R.errorCount >= T(L, l).removeNodeErrorCount && T(L, _)[C] && (delete T(L, _)[C], Ne(L, d, {}), delete A.lastRrIdx, setImmediate(L.emit.bind(L, "remove", C)), R.end().catch((D) => {
      })), A.length !== 0 && T(L, l).canRetry && g ? g(C, O) : Promise.reject(O)));
    }
    /**
     * Connect, or if fail handle retry / set timeout error
     *
     * @param nodeList    current node list
     * @param nodeKey     node name to connect
     * @param retryFct    retry function
     * @param callback    callback function
     * @private
     */
    _handleConnectionCallbackError(A, C, g, L) {
      const R = this, O = T(this, _)[C];
      O.getConnection((D, m) => {
        if (D) {
          if (O.errorCount = O.errorCount ? O.errorCount + 1 : 1, O.blacklistedUntil = Date.now() + T(R, l).restoreNodeTimeout, T(R, l).removeNodeErrorCount && O.errorCount >= T(R, l).removeNodeErrorCount && T(R, _)[C] && (delete T(R, _)[C], Ne(R, d, {}), delete A.lastRrIdx, setImmediate(R.emit.bind(R, "remove", C)), O.end(() => {
          })), A.length !== 0 && T(R, l).canRetry && g)
            return g(C, D);
          L(D);
        } else
          O.errorCount = 0, L(null, m);
      });
    }
    //*****************************************************************
    // internal public testing methods
    //*****************************************************************
    get __tests() {
      return new o(T(this, _));
    }
  }
  l = new WeakMap(), _ = new WeakMap(), d = new WeakMap(), p = new WeakMap();
  class o {
    constructor(N) {
      Oe(this, E);
      Ne(this, E, N);
    }
    getNodes() {
      return T(this, E);
    }
  }
  E = new WeakMap();
  const n = (h) => {
    let N = h.lastRrIdx;
    return N === void 0 && (N = -1), ++N >= h.length && (N = 0), h.lastRrIdx = N, h[N];
  }, c = (h) => {
    let N = ~~(Math.random() * h.length);
    return h[N];
  }, i = (h, N) => h[N];
  return cs = a, cs;
}
var Zu;
function HE() {
  if (Zu) return gt;
  Zu = 1, Bd();
  const e = Wh(), f = jh(), t = Kh(), u = kE(), r = vn(), s = Xh(), a = zh();
  return gt.version = xn.version, gt.SqlError = qe().SqlError, gt.defaultOptions = function(n) {
    const c = new r(n), i = {};
    for (const [l, _] of Object.entries(c))
      l.startsWith("_") || (i[l] = _);
    return i;
  }, gt.createConnection = function(n) {
    try {
      const c = new r(n), i = new e(c), l = new f(i);
      return i.connect().then(() => Promise.resolve(l));
    } catch (c) {
      return Promise.reject(c);
    }
  }, gt.createPool = function(n) {
    const c = new s(n), i = new t(c);
    return i.on("error", (l) => {
    }), i;
  }, gt.createPoolCluster = function(n) {
    const c = new a(n);
    return new u(c);
  }, gt.importFile = function(n) {
    try {
      const c = new r(n), i = new e(c);
      return i.connect().then(() => new Promise(i.importFile.bind(i, Object.assign({ skipDbCheck: !0 }, n)))).finally(() => {
        new Promise(i.end.bind(i, {})).catch(console.log);
      });
    } catch (c) {
      return Promise.reject(c);
    }
  }, gt;
}
var GE = HE();
const qE = /* @__PURE__ */ qo(GE), $E = qE.createPool({
  host: "49.142.106.218",
  user: "root",
  port: "31306",
  password: "3415",
  database: "bluedash",
  connectionLimit: 50
});
async function VE(e, f = {}) {
  let t;
  try {
    t = await $E.getConnection(), console.log("MariaDB 연결 성공");
    const u = Object.values(f), r = await t.query(e, u);
    return t.commit(), r;
  } catch (u) {
    throw console.error("쿼리 실행 실패:", u), u;
  } finally {
    t && t.release();
  }
}
var us = {}, ls = {}, Kt = {}, el;
function Yo() {
  if (el) return Kt;
  el = 1, Object.defineProperty(Kt, "__esModule", { value: !0 }), Kt.CancellationError = Kt.CancellationToken = void 0;
  const e = St;
  let f = class extends e.EventEmitter {
    get cancelled() {
      return this._cancelled || this._parent != null && this._parent.cancelled;
    }
    set parent(r) {
      this.removeParentCancelHandler(), this._parent = r, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
    }
    // babel cannot compile ... correctly for super calls
    constructor(r) {
      super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, r != null && (this.parent = r);
    }
    cancel() {
      this._cancelled = !0, this.emit("cancel");
    }
    onCancel(r) {
      this.cancelled ? r() : this.once("cancel", r);
    }
    createPromise(r) {
      if (this.cancelled)
        return Promise.reject(new t());
      const s = () => {
        if (a != null)
          try {
            this.removeListener("cancel", a), a = null;
          } catch {
          }
      };
      let a = null;
      return new Promise((o, n) => {
        let c = null;
        if (a = () => {
          try {
            c != null && (c(), c = null);
          } finally {
            n(new t());
          }
        }, this.cancelled) {
          a();
          return;
        }
        this.onCancel(a), r(o, n, (i) => {
          c = i;
        });
      }).then((o) => (s(), o)).catch((o) => {
        throw s(), o;
      });
    }
    removeParentCancelHandler() {
      const r = this._parent;
      r != null && this.parentCancelHandler != null && (r.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
    }
    dispose() {
      try {
        this.removeParentCancelHandler();
      } finally {
        this.removeAllListeners(), this._parent = null;
      }
    }
  };
  Kt.CancellationToken = f;
  class t extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return Kt.CancellationError = t, Kt;
}
var tt = {}, An = { exports: {} }, pn = { exports: {} }, _s, tl;
function WE() {
  if (tl) return _s;
  tl = 1;
  var e = 1e3, f = e * 60, t = f * 60, u = t * 24, r = u * 7, s = u * 365.25;
  _s = function(i, l) {
    l = l || {};
    var _ = typeof i;
    if (_ === "string" && i.length > 0)
      return a(i);
    if (_ === "number" && isFinite(i))
      return l.long ? n(i) : o(i);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(i)
    );
  };
  function a(i) {
    if (i = String(i), !(i.length > 100)) {
      var l = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        i
      );
      if (l) {
        var _ = parseFloat(l[1]), d = (l[2] || "ms").toLowerCase();
        switch (d) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return _ * s;
          case "weeks":
          case "week":
          case "w":
            return _ * r;
          case "days":
          case "day":
          case "d":
            return _ * u;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return _ * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return _ * f;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return _ * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return _;
          default:
            return;
        }
      }
    }
  }
  function o(i) {
    var l = Math.abs(i);
    return l >= u ? Math.round(i / u) + "d" : l >= t ? Math.round(i / t) + "h" : l >= f ? Math.round(i / f) + "m" : l >= e ? Math.round(i / e) + "s" : i + "ms";
  }
  function n(i) {
    var l = Math.abs(i);
    return l >= u ? c(i, l, u, "day") : l >= t ? c(i, l, t, "hour") : l >= f ? c(i, l, f, "minute") : l >= e ? c(i, l, e, "second") : i + " ms";
  }
  function c(i, l, _, d) {
    var p = l >= _ * 1.5;
    return Math.round(i / _) + " " + d + (p ? "s" : "");
  }
  return _s;
}
var fs, rl;
function Qh() {
  if (rl) return fs;
  rl = 1;
  function e(f) {
    u.debug = u, u.default = u, u.coerce = c, u.disable = o, u.enable = s, u.enabled = n, u.humanize = WE(), u.destroy = i, Object.keys(f).forEach((l) => {
      u[l] = f[l];
    }), u.names = [], u.skips = [], u.formatters = {};
    function t(l) {
      let _ = 0;
      for (let d = 0; d < l.length; d++)
        _ = (_ << 5) - _ + l.charCodeAt(d), _ |= 0;
      return u.colors[Math.abs(_) % u.colors.length];
    }
    u.selectColor = t;
    function u(l) {
      let _, d = null, p, E;
      function h(...N) {
        if (!h.enabled)
          return;
        const A = h, C = Number(/* @__PURE__ */ new Date()), g = C - (_ || C);
        A.diff = g, A.prev = _, A.curr = C, _ = C, N[0] = u.coerce(N[0]), typeof N[0] != "string" && N.unshift("%O");
        let L = 0;
        N[0] = N[0].replace(/%([a-zA-Z%])/g, (O, D) => {
          if (O === "%%")
            return "%";
          L++;
          const m = u.formatters[D];
          if (typeof m == "function") {
            const B = N[L];
            O = m.call(A, B), N.splice(L, 1), L--;
          }
          return O;
        }), u.formatArgs.call(A, N), (A.log || u.log).apply(A, N);
      }
      return h.namespace = l, h.useColors = u.useColors(), h.color = u.selectColor(l), h.extend = r, h.destroy = u.destroy, Object.defineProperty(h, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => d !== null ? d : (p !== u.namespaces && (p = u.namespaces, E = u.enabled(l)), E),
        set: (N) => {
          d = N;
        }
      }), typeof u.init == "function" && u.init(h), h;
    }
    function r(l, _) {
      const d = u(this.namespace + (typeof _ > "u" ? ":" : _) + l);
      return d.log = this.log, d;
    }
    function s(l) {
      u.save(l), u.namespaces = l, u.names = [], u.skips = [];
      const _ = (typeof l == "string" ? l : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const d of _)
        d[0] === "-" ? u.skips.push(d.slice(1)) : u.names.push(d);
    }
    function a(l, _) {
      let d = 0, p = 0, E = -1, h = 0;
      for (; d < l.length; )
        if (p < _.length && (_[p] === l[d] || _[p] === "*"))
          _[p] === "*" ? (E = p, h = d, p++) : (d++, p++);
        else if (E !== -1)
          p = E + 1, h++, d = h;
        else
          return !1;
      for (; p < _.length && _[p] === "*"; )
        p++;
      return p === _.length;
    }
    function o() {
      const l = [
        ...u.names,
        ...u.skips.map((_) => "-" + _)
      ].join(",");
      return u.enable(""), l;
    }
    function n(l) {
      for (const _ of u.skips)
        if (a(l, _))
          return !1;
      for (const _ of u.names)
        if (a(l, _))
          return !0;
      return !1;
    }
    function c(l) {
      return l instanceof Error ? l.stack || l.message : l;
    }
    function i() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return u.enable(u.load()), u;
  }
  return fs = e, fs;
}
var nl;
function jE() {
  return nl || (nl = 1, function(e, f) {
    f.formatArgs = u, f.save = r, f.load = s, f.useColors = t, f.storage = a(), f.destroy = /* @__PURE__ */ (() => {
      let n = !1;
      return () => {
        n || (n = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), f.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function t() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let n;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (n = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(n[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function u(n) {
      if (n[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + n[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const c = "color: " + this.color;
      n.splice(1, 0, c, "color: inherit");
      let i = 0, l = 0;
      n[0].replace(/%[a-zA-Z%]/g, (_) => {
        _ !== "%%" && (i++, _ === "%c" && (l = i));
      }), n.splice(l, 0, c);
    }
    f.log = console.debug || console.log || (() => {
    });
    function r(n) {
      try {
        n ? f.storage.setItem("debug", n) : f.storage.removeItem("debug");
      } catch {
      }
    }
    function s() {
      let n;
      try {
        n = f.storage.getItem("debug");
      } catch {
      }
      return !n && typeof process < "u" && "env" in process && (n = process.env.DEBUG), n;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = Qh()(f);
    const { formatters: o } = e.exports;
    o.j = function(n) {
      try {
        return JSON.stringify(n);
      } catch (c) {
        return "[UnexpectedJSONParseError]: " + c.message;
      }
    };
  }(pn, pn.exports)), pn.exports;
}
var In = { exports: {} }, hs, il;
function YE() {
  return il || (il = 1, hs = (e, f = process.argv) => {
    const t = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", u = f.indexOf(t + e), r = f.indexOf("--");
    return u !== -1 && (r === -1 || u < r);
  }), hs;
}
var ds, sl;
function KE() {
  if (sl) return ds;
  sl = 1;
  const e = Nt, f = Uh, t = YE(), { env: u } = process;
  let r;
  t("no-color") || t("no-colors") || t("color=false") || t("color=never") ? r = 0 : (t("color") || t("colors") || t("color=true") || t("color=always")) && (r = 1), "FORCE_COLOR" in u && (u.FORCE_COLOR === "true" ? r = 1 : u.FORCE_COLOR === "false" ? r = 0 : r = u.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(u.FORCE_COLOR, 10), 3));
  function s(n) {
    return n === 0 ? !1 : {
      level: n,
      hasBasic: !0,
      has256: n >= 2,
      has16m: n >= 3
    };
  }
  function a(n, c) {
    if (r === 0)
      return 0;
    if (t("color=16m") || t("color=full") || t("color=truecolor"))
      return 3;
    if (t("color=256"))
      return 2;
    if (n && !c && r === void 0)
      return 0;
    const i = r || 0;
    if (u.TERM === "dumb")
      return i;
    if (process.platform === "win32") {
      const l = e.release().split(".");
      return Number(l[0]) >= 10 && Number(l[2]) >= 10586 ? Number(l[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in u)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((l) => l in u) || u.CI_NAME === "codeship" ? 1 : i;
    if ("TEAMCITY_VERSION" in u)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(u.TEAMCITY_VERSION) ? 1 : 0;
    if (u.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in u) {
      const l = parseInt((u.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (u.TERM_PROGRAM) {
        case "iTerm.app":
          return l >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(u.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(u.TERM) || "COLORTERM" in u ? 1 : i;
  }
  function o(n) {
    const c = a(n, n && n.isTTY);
    return s(c);
  }
  return ds = {
    supportsColor: o,
    stdout: s(a(!0, f.isatty(1))),
    stderr: s(a(!0, f.isatty(2)))
  }, ds;
}
var al;
function zE() {
  return al || (al = 1, function(e, f) {
    const t = Uh, u = Mn;
    f.init = i, f.log = o, f.formatArgs = s, f.save = n, f.load = c, f.useColors = r, f.destroy = u.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), f.colors = [6, 2, 3, 4, 5, 1];
    try {
      const _ = KE();
      _ && (_.stderr || _).level >= 2 && (f.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    f.inspectOpts = Object.keys(process.env).filter((_) => /^debug_/i.test(_)).reduce((_, d) => {
      const p = d.substring(6).toLowerCase().replace(/_([a-z])/g, (h, N) => N.toUpperCase());
      let E = process.env[d];
      return /^(yes|on|true|enabled)$/i.test(E) ? E = !0 : /^(no|off|false|disabled)$/i.test(E) ? E = !1 : E === "null" ? E = null : E = Number(E), _[p] = E, _;
    }, {});
    function r() {
      return "colors" in f.inspectOpts ? !!f.inspectOpts.colors : t.isatty(process.stderr.fd);
    }
    function s(_) {
      const { namespace: d, useColors: p } = this;
      if (p) {
        const E = this.color, h = "\x1B[3" + (E < 8 ? E : "8;5;" + E), N = `  ${h};1m${d} \x1B[0m`;
        _[0] = N + _[0].split(`
`).join(`
` + N), _.push(h + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        _[0] = a() + d + " " + _[0];
    }
    function a() {
      return f.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function o(..._) {
      return process.stderr.write(u.formatWithOptions(f.inspectOpts, ..._) + `
`);
    }
    function n(_) {
      _ ? process.env.DEBUG = _ : delete process.env.DEBUG;
    }
    function c() {
      return process.env.DEBUG;
    }
    function i(_) {
      _.inspectOpts = {};
      const d = Object.keys(f.inspectOpts);
      for (let p = 0; p < d.length; p++)
        _.inspectOpts[d[p]] = f.inspectOpts[d[p]];
    }
    e.exports = Qh()(f);
    const { formatters: l } = e.exports;
    l.o = function(_) {
      return this.inspectOpts.colors = this.useColors, u.inspect(_, this.inspectOpts).split(`
`).map((d) => d.trim()).join(" ");
    }, l.O = function(_) {
      return this.inspectOpts.colors = this.useColors, u.inspect(_, this.inspectOpts);
    };
  }(In, In.exports)), In.exports;
}
var ol;
function XE() {
  return ol || (ol = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? An.exports = jE() : An.exports = zE()), An.exports;
}
var Nn = {}, cl;
function Bn() {
  if (cl) return Nn;
  cl = 1, Object.defineProperty(Nn, "__esModule", { value: !0 }), Nn.newError = e;
  function e(f, t) {
    const u = new Error(f);
    return u.code = t, u;
  }
  return Nn;
}
var mr = {}, ul;
function Jh() {
  if (ul) return mr;
  ul = 1, Object.defineProperty(mr, "__esModule", { value: !0 }), mr.ProgressCallbackTransform = void 0;
  const e = Bt;
  let f = class extends e.Transform {
    constructor(u, r, s) {
      super(), this.total = u, this.cancellationToken = r, this.onProgress = s, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(u, r, s) {
      if (this.cancellationToken.cancelled) {
        s(new Error("cancelled"), null);
        return;
      }
      this.transferred += u.length, this.delta += u.length;
      const a = Date.now();
      a >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = a + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((a - this.start) / 1e3))
      }), this.delta = 0), s(null, u);
    }
    _flush(u) {
      if (this.cancellationToken.cancelled) {
        u(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, u(null);
    }
  };
  return mr.ProgressCallbackTransform = f, mr;
}
var ll;
function QE() {
  if (ll) return tt;
  ll = 1, Object.defineProperty(tt, "__esModule", { value: !0 }), tt.DigestTransform = tt.HttpExecutor = tt.HttpError = void 0, tt.createHttpError = c, tt.parseJson = _, tt.configureRequestOptionsFromUrl = p, tt.configureRequestUrl = E, tt.safeGetHeader = A, tt.configureRequestOptions = g, tt.safeStringifyJson = L;
  const e = ot, f = XE(), t = ze, u = Bt, r = fr, s = Yo(), a = Bn(), o = Jh(), n = (0, f.default)("electron-builder");
  function c(R, O = null) {
    return new l(R.statusCode || -1, `${R.statusCode} ${R.statusMessage}` + (O == null ? "" : `
` + JSON.stringify(O, null, "  ")) + `
Headers: ` + L(R.headers), O);
  }
  const i = /* @__PURE__ */ new Map([
    [429, "Too many requests"],
    [400, "Bad request"],
    [403, "Forbidden"],
    [404, "Not found"],
    [405, "Method not allowed"],
    [406, "Not acceptable"],
    [408, "Request timeout"],
    [413, "Request entity too large"],
    [500, "Internal server error"],
    [502, "Bad gateway"],
    [503, "Service unavailable"],
    [504, "Gateway timeout"],
    [505, "HTTP version not supported"]
  ]);
  class l extends Error {
    constructor(O, D = `HTTP error: ${i.get(O) || O}`, m = null) {
      super(D), this.statusCode = O, this.description = m, this.name = "HttpError", this.code = `HTTP_ERROR_${O}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  tt.HttpError = l;
  function _(R) {
    return R.then((O) => O == null || O.length === 0 ? null : JSON.parse(O));
  }
  class d {
    constructor() {
      this.maxRedirects = 10;
    }
    request(O, D = new s.CancellationToken(), m) {
      g(O);
      const B = m == null ? void 0 : JSON.stringify(m), v = B ? Buffer.from(B) : void 0;
      if (v != null) {
        n(B);
        const { headers: M, ...F } = O;
        O = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": v.length,
            ...M
          },
          ...F
        };
      }
      return this.doApiRequest(O, D, (M) => M.end(v));
    }
    doApiRequest(O, D, m, B = 0) {
      return n.enabled && n(`Request: ${L(O)}`), D.createPromise((v, M, F) => {
        const I = this.createRequest(O, (w) => {
          try {
            this.handleResponse(w, O, D, v, M, B, m);
          } catch (x) {
            M(x);
          }
        });
        this.addErrorAndTimeoutHandlers(I, M, O.timeout), this.addRedirectHandlers(I, O, M, B, (w) => {
          this.doApiRequest(w, D, m, B).then(v).catch(M);
        }), m(I, M), F(() => I.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(O, D, m, B, v) {
    }
    addErrorAndTimeoutHandlers(O, D, m = 60 * 1e3) {
      this.addTimeOutHandler(O, D, m), O.on("error", D), O.on("aborted", () => {
        D(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(O, D, m, B, v, M, F) {
      var I;
      if (n.enabled && n(`Response: ${O.statusCode} ${O.statusMessage}, request options: ${L(D)}`), O.statusCode === 404) {
        v(c(O, `method: ${D.method || "GET"} url: ${D.protocol || "https:"}//${D.hostname}${D.port ? `:${D.port}` : ""}${D.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (O.statusCode === 204) {
        B();
        return;
      }
      const w = (I = O.statusCode) !== null && I !== void 0 ? I : 0, x = w >= 300 && w < 400, V = A(O, "location");
      if (x && V != null) {
        if (M > this.maxRedirects) {
          v(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(d.prepareRedirectUrlOptions(V, D), m, F, M).then(B).catch(v);
        return;
      }
      O.setEncoding("utf8");
      let z = "";
      O.on("error", v), O.on("data", (j) => z += j), O.on("end", () => {
        try {
          if (O.statusCode != null && O.statusCode >= 400) {
            const j = A(O, "content-type"), J = j != null && (Array.isArray(j) ? j.find((fe) => fe.includes("json")) != null : j.includes("json"));
            v(c(O, `method: ${D.method || "GET"} url: ${D.protocol || "https:"}//${D.hostname}${D.port ? `:${D.port}` : ""}${D.path}

          Data:
          ${J ? JSON.stringify(JSON.parse(z)) : z}
          `));
          } else
            B(z.length === 0 ? null : z);
        } catch (j) {
          v(j);
        }
      });
    }
    async downloadToBuffer(O, D) {
      return await D.cancellationToken.createPromise((m, B, v) => {
        const M = [], F = {
          headers: D.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        E(O, F), g(F), this.doDownload(F, {
          destination: null,
          options: D,
          onCancel: v,
          callback: (I) => {
            I == null ? m(Buffer.concat(M)) : B(I);
          },
          responseHandler: (I, w) => {
            let x = 0;
            I.on("data", (V) => {
              if (x += V.length, x > 524288e3) {
                w(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              M.push(V);
            }), I.on("end", () => {
              w(null);
            });
          }
        }, 0);
      });
    }
    doDownload(O, D, m) {
      const B = this.createRequest(O, (v) => {
        if (v.statusCode >= 400) {
          D.callback(new Error(`Cannot download "${O.protocol || "https:"}//${O.hostname}${O.path}", status ${v.statusCode}: ${v.statusMessage}`));
          return;
        }
        v.on("error", D.callback);
        const M = A(v, "location");
        if (M != null) {
          m < this.maxRedirects ? this.doDownload(d.prepareRedirectUrlOptions(M, O), D, m++) : D.callback(this.createMaxRedirectError());
          return;
        }
        D.responseHandler == null ? C(D, v) : D.responseHandler(v, D.callback);
      });
      this.addErrorAndTimeoutHandlers(B, D.callback, O.timeout), this.addRedirectHandlers(B, O, D.callback, m, (v) => {
        this.doDownload(v, D, m++);
      }), B.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(O, D, m) {
      O.on("socket", (B) => {
        B.setTimeout(m, () => {
          O.abort(), D(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(O, D) {
      const m = p(O, { ...D }), B = m.headers;
      if (B != null && B.authorization) {
        const v = new r.URL(O);
        (v.hostname.endsWith(".amazonaws.com") || v.searchParams.has("X-Amz-Credential")) && delete B.authorization;
      }
      return m;
    }
    static retryOnServerError(O, D = 3) {
      for (let m = 0; ; m++)
        try {
          return O();
        } catch (B) {
          if (m < D && (B instanceof l && B.isServerError() || B.code === "EPIPE"))
            continue;
          throw B;
        }
    }
  }
  tt.HttpExecutor = d;
  function p(R, O) {
    const D = g(O);
    return E(new r.URL(R), D), D;
  }
  function E(R, O) {
    O.protocol = R.protocol, O.hostname = R.hostname, R.port ? O.port = R.port : O.port && delete O.port, O.path = R.pathname + R.search;
  }
  class h extends u.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(O, D = "sha512", m = "base64") {
      super(), this.expected = O, this.algorithm = D, this.encoding = m, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, e.createHash)(D);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(O, D, m) {
      this.digester.update(O), m(null, O);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(O) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (D) {
          O(D);
          return;
        }
      O(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, a.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, a.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  tt.DigestTransform = h;
  function N(R, O, D) {
    return R != null && O != null && R !== O ? (D(new Error(`checksum mismatch: expected ${O} but got ${R} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function A(R, O) {
    const D = R.headers[O];
    return D == null ? null : Array.isArray(D) ? D.length === 0 ? null : D[D.length - 1] : D;
  }
  function C(R, O) {
    if (!N(A(O, "X-Checksum-Sha2"), R.options.sha2, R.callback))
      return;
    const D = [];
    if (R.options.onProgress != null) {
      const M = A(O, "content-length");
      M != null && D.push(new o.ProgressCallbackTransform(parseInt(M, 10), R.options.cancellationToken, R.options.onProgress));
    }
    const m = R.options.sha512;
    m != null ? D.push(new h(m, "sha512", m.length === 128 && !m.includes("+") && !m.includes("Z") && !m.includes("=") ? "hex" : "base64")) : R.options.sha2 != null && D.push(new h(R.options.sha2, "sha256", "hex"));
    const B = (0, t.createWriteStream)(R.destination);
    D.push(B);
    let v = O;
    for (const M of D)
      M.on("error", (F) => {
        B.close(), R.options.cancellationToken.cancelled || R.callback(F);
      }), v = v.pipe(M);
    B.on("finish", () => {
      B.close(R.callback);
    });
  }
  function g(R, O, D) {
    D != null && (R.method = D), R.headers = { ...R.headers };
    const m = R.headers;
    return O != null && (m.authorization = O.startsWith("Basic") || O.startsWith("Bearer") ? O : `token ${O}`), m["User-Agent"] == null && (m["User-Agent"] = "electron-builder"), (D == null || D === "GET" || m["Cache-Control"] == null) && (m["Cache-Control"] = "no-cache"), R.protocol == null && process.versions.electron != null && (R.protocol = "https:"), R;
  }
  function L(R, O) {
    return JSON.stringify(R, (D, m) => D.endsWith("Authorization") || D.endsWith("authorization") || D.endsWith("Password") || D.endsWith("PASSWORD") || D.endsWith("Token") || D.includes("password") || D.includes("token") || O != null && O.has(D) ? "<stripped sensitive data>" : m, 2);
  }
  return tt;
}
var Or = {}, _l;
function JE() {
  if (_l) return Or;
  _l = 1, Object.defineProperty(Or, "__esModule", { value: !0 }), Or.githubUrl = e, Or.getS3LikeProviderBaseUrl = f;
  function e(s, a = "github.com") {
    return `${s.protocol || "https"}://${s.host || a}`;
  }
  function f(s) {
    const a = s.provider;
    if (a === "s3")
      return t(s);
    if (a === "spaces")
      return r(s);
    throw new Error(`Not supported provider: ${a}`);
  }
  function t(s) {
    let a;
    if (s.accelerate == !0)
      a = `https://${s.bucket}.s3-accelerate.amazonaws.com`;
    else if (s.endpoint != null)
      a = `${s.endpoint}/${s.bucket}`;
    else if (s.bucket.includes(".")) {
      if (s.region == null)
        throw new Error(`Bucket name "${s.bucket}" includes a dot, but S3 region is missing`);
      s.region === "us-east-1" ? a = `https://s3.amazonaws.com/${s.bucket}` : a = `https://s3-${s.region}.amazonaws.com/${s.bucket}`;
    } else s.region === "cn-north-1" ? a = `https://${s.bucket}.s3.${s.region}.amazonaws.com.cn` : a = `https://${s.bucket}.s3.amazonaws.com`;
    return u(a, s.path);
  }
  function u(s, a) {
    return a != null && a.length > 0 && (a.startsWith("/") || (s += "/"), s += a), s;
  }
  function r(s) {
    if (s.name == null)
      throw new Error("name is missing");
    if (s.region == null)
      throw new Error("region is missing");
    return u(`https://${s.name}.${s.region}.digitaloceanspaces.com`, s.path);
  }
  return Or;
}
var Sn = {}, fl;
function ZE() {
  if (fl) return Sn;
  fl = 1, Object.defineProperty(Sn, "__esModule", { value: !0 }), Sn.parseDn = e;
  function e(f) {
    let t = !1, u = null, r = "", s = 0;
    f = f.trim();
    const a = /* @__PURE__ */ new Map();
    for (let o = 0; o <= f.length; o++) {
      if (o === f.length) {
        u !== null && a.set(u, r);
        break;
      }
      const n = f[o];
      if (t) {
        if (n === '"') {
          t = !1;
          continue;
        }
      } else {
        if (n === '"') {
          t = !0;
          continue;
        }
        if (n === "\\") {
          o++;
          const c = parseInt(f.slice(o, o + 2), 16);
          Number.isNaN(c) ? r += f[o] : (o++, r += String.fromCharCode(c));
          continue;
        }
        if (u === null && n === "=") {
          u = r, r = "";
          continue;
        }
        if (n === "," || n === ";" || n === "+") {
          u !== null && a.set(u, r), u = null, r = "";
          continue;
        }
      }
      if (n === " " && !t) {
        if (r.length === 0)
          continue;
        if (o > s) {
          let c = o;
          for (; f[c] === " "; )
            c++;
          s = c;
        }
        if (s >= f.length || f[s] === "," || f[s] === ";" || u === null && f[s] === "=" || u !== null && f[s] === "+") {
          o = s - 1;
          continue;
        }
      }
      r += n;
    }
    return a;
  }
  return Sn;
}
var zt = {}, hl;
function e1() {
  if (hl) return zt;
  hl = 1, Object.defineProperty(zt, "__esModule", { value: !0 }), zt.nil = zt.UUID = void 0;
  const e = ot, f = Bn(), t = "options.name must be either a string or a Buffer", u = (0, e.randomBytes)(16);
  u[0] = u[0] | 1;
  const r = {}, s = [];
  for (let l = 0; l < 256; l++) {
    const _ = (l + 256).toString(16).substr(1);
    r[_] = l, s[l] = _;
  }
  class a {
    constructor(_) {
      this.ascii = null, this.binary = null;
      const d = a.check(_);
      if (!d)
        throw new Error("not a UUID");
      this.version = d.version, d.format === "ascii" ? this.ascii = _ : this.binary = _;
    }
    static v5(_, d) {
      return c(_, "sha1", 80, d);
    }
    toString() {
      return this.ascii == null && (this.ascii = i(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(_, d = 0) {
      if (typeof _ == "string")
        return _ = _.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(_) ? _ === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (r[_[14] + _[15]] & 240) >> 4,
          variant: o((r[_[19] + _[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(_)) {
        if (_.length < d + 16)
          return !1;
        let p = 0;
        for (; p < 16 && _[d + p] === 0; p++)
          ;
        return p === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (_[d + 6] & 240) >> 4,
          variant: o((_[d + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, f.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(_) {
      const d = Buffer.allocUnsafe(16);
      let p = 0;
      for (let E = 0; E < 16; E++)
        d[E] = r[_[p++] + _[p++]], (E === 3 || E === 5 || E === 7 || E === 9) && (p += 1);
      return d;
    }
  }
  zt.UUID = a, a.OID = a.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function o(l) {
    switch (l) {
      case 0:
      case 1:
      case 3:
        return "ncs";
      case 4:
      case 5:
        return "rfc4122";
      case 6:
        return "microsoft";
      default:
        return "future";
    }
  }
  var n;
  (function(l) {
    l[l.ASCII = 0] = "ASCII", l[l.BINARY = 1] = "BINARY", l[l.OBJECT = 2] = "OBJECT";
  })(n || (n = {}));
  function c(l, _, d, p, E = n.ASCII) {
    const h = (0, e.createHash)(_);
    if (typeof l != "string" && !Buffer.isBuffer(l))
      throw (0, f.newError)(t, "ERR_INVALID_UUID_NAME");
    h.update(p), h.update(l);
    const A = h.digest();
    let C;
    switch (E) {
      case n.BINARY:
        A[6] = A[6] & 15 | d, A[8] = A[8] & 63 | 128, C = A;
        break;
      case n.OBJECT:
        A[6] = A[6] & 15 | d, A[8] = A[8] & 63 | 128, C = new a(A);
        break;
      default:
        C = s[A[0]] + s[A[1]] + s[A[2]] + s[A[3]] + "-" + s[A[4]] + s[A[5]] + "-" + s[A[6] & 15 | d] + s[A[7]] + "-" + s[A[8] & 63 | 128] + s[A[9]] + "-" + s[A[10]] + s[A[11]] + s[A[12]] + s[A[13]] + s[A[14]] + s[A[15]];
        break;
    }
    return C;
  }
  function i(l) {
    return s[l[0]] + s[l[1]] + s[l[2]] + s[l[3]] + "-" + s[l[4]] + s[l[5]] + "-" + s[l[6]] + s[l[7]] + "-" + s[l[8]] + s[l[9]] + "-" + s[l[10]] + s[l[11]] + s[l[12]] + s[l[13]] + s[l[14]] + s[l[15]];
  }
  return zt.nil = new a("00000000-0000-0000-0000-000000000000"), zt;
}
var cr = {}, Es = {}, dl;
function t1() {
  return dl || (dl = 1, function(e) {
    (function(f) {
      f.parser = function(U, P) {
        return new u(U, P);
      }, f.SAXParser = u, f.SAXStream = i, f.createStream = c, f.MAX_BUFFER_LENGTH = 64 * 1024;
      var t = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      f.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function u(U, P) {
        if (!(this instanceof u))
          return new u(U, P);
        var K = this;
        s(K), K.q = K.c = "", K.bufferCheckPosition = f.MAX_BUFFER_LENGTH, K.opt = P || {}, K.opt.lowercase = K.opt.lowercase || K.opt.lowercasetags, K.looseCase = K.opt.lowercase ? "toLowerCase" : "toUpperCase", K.tags = [], K.closed = K.closedRoot = K.sawRoot = !1, K.tag = K.error = null, K.strict = !!U, K.noscript = !!(U || K.opt.noscript), K.state = m.BEGIN, K.strictEntities = K.opt.strictEntities, K.ENTITIES = K.strictEntities ? Object.create(f.XML_ENTITIES) : Object.create(f.ENTITIES), K.attribList = [], K.opt.xmlns && (K.ns = Object.create(E)), K.opt.unquotedAttributeValues === void 0 && (K.opt.unquotedAttributeValues = !U), K.trackPosition = K.opt.position !== !1, K.trackPosition && (K.position = K.line = K.column = 0), v(K, "onready");
      }
      Object.create || (Object.create = function(U) {
        function P() {
        }
        P.prototype = U;
        var K = new P();
        return K;
      }), Object.keys || (Object.keys = function(U) {
        var P = [];
        for (var K in U) U.hasOwnProperty(K) && P.push(K);
        return P;
      });
      function r(U) {
        for (var P = Math.max(f.MAX_BUFFER_LENGTH, 10), K = 0, $ = 0, he = t.length; $ < he; $++) {
          var de = U[t[$]].length;
          if (de > P)
            switch (t[$]) {
              case "textNode":
                F(U);
                break;
              case "cdata":
                M(U, "oncdata", U.cdata), U.cdata = "";
                break;
              case "script":
                M(U, "onscript", U.script), U.script = "";
                break;
              default:
                w(U, "Max buffer length exceeded: " + t[$]);
            }
          K = Math.max(K, de);
        }
        var Se = f.MAX_BUFFER_LENGTH - K;
        U.bufferCheckPosition = Se + U.position;
      }
      function s(U) {
        for (var P = 0, K = t.length; P < K; P++)
          U[t[P]] = "";
      }
      function a(U) {
        F(U), U.cdata !== "" && (M(U, "oncdata", U.cdata), U.cdata = ""), U.script !== "" && (M(U, "onscript", U.script), U.script = "");
      }
      u.prototype = {
        end: function() {
          x(this);
        },
        write: X,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          a(this);
        }
      };
      var o;
      try {
        o = require("stream").Stream;
      } catch {
        o = function() {
        };
      }
      o || (o = function() {
      });
      var n = f.EVENTS.filter(function(U) {
        return U !== "error" && U !== "end";
      });
      function c(U, P) {
        return new i(U, P);
      }
      function i(U, P) {
        if (!(this instanceof i))
          return new i(U, P);
        o.apply(this), this._parser = new u(U, P), this.writable = !0, this.readable = !0;
        var K = this;
        this._parser.onend = function() {
          K.emit("end");
        }, this._parser.onerror = function($) {
          K.emit("error", $), K._parser.error = null;
        }, this._decoder = null, n.forEach(function($) {
          Object.defineProperty(K, "on" + $, {
            get: function() {
              return K._parser["on" + $];
            },
            set: function(he) {
              if (!he)
                return K.removeAllListeners($), K._parser["on" + $] = he, he;
              K.on($, he);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      i.prototype = Object.create(o.prototype, {
        constructor: {
          value: i
        }
      }), i.prototype.write = function(U) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(U)) {
          if (!this._decoder) {
            var P = Ph.StringDecoder;
            this._decoder = new P("utf8");
          }
          U = this._decoder.write(U);
        }
        return this._parser.write(U.toString()), this.emit("data", U), !0;
      }, i.prototype.end = function(U) {
        return U && U.length && this.write(U), this._parser.end(), !0;
      }, i.prototype.on = function(U, P) {
        var K = this;
        return !K._parser["on" + U] && n.indexOf(U) !== -1 && (K._parser["on" + U] = function() {
          var $ = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          $.splice(0, 0, U), K.emit.apply(K, $);
        }), o.prototype.on.call(K, U, P);
      };
      var l = "[CDATA[", _ = "DOCTYPE", d = "http://www.w3.org/XML/1998/namespace", p = "http://www.w3.org/2000/xmlns/", E = { xml: d, xmlns: p }, h = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, N = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, A = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, C = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function g(U) {
        return U === " " || U === `
` || U === "\r" || U === "	";
      }
      function L(U) {
        return U === '"' || U === "'";
      }
      function R(U) {
        return U === ">" || g(U);
      }
      function O(U, P) {
        return U.test(P);
      }
      function D(U, P) {
        return !O(U, P);
      }
      var m = 0;
      f.STATE = {
        BEGIN: m++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: m++,
        // leading whitespace
        TEXT: m++,
        // general stuff
        TEXT_ENTITY: m++,
        // &amp and such.
        OPEN_WAKA: m++,
        // <
        SGML_DECL: m++,
        // <!BLARG
        SGML_DECL_QUOTED: m++,
        // <!BLARG foo "bar
        DOCTYPE: m++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: m++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: m++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: m++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: m++,
        // <!-
        COMMENT: m++,
        // <!--
        COMMENT_ENDING: m++,
        // <!-- blah -
        COMMENT_ENDED: m++,
        // <!-- blah --
        CDATA: m++,
        // <![CDATA[ something
        CDATA_ENDING: m++,
        // ]
        CDATA_ENDING_2: m++,
        // ]]
        PROC_INST: m++,
        // <?hi
        PROC_INST_BODY: m++,
        // <?hi there
        PROC_INST_ENDING: m++,
        // <?hi "there" ?
        OPEN_TAG: m++,
        // <strong
        OPEN_TAG_SLASH: m++,
        // <strong /
        ATTRIB: m++,
        // <a
        ATTRIB_NAME: m++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: m++,
        // <a foo _
        ATTRIB_VALUE: m++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: m++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: m++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: m++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: m++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: m++,
        // <foo bar=&quot
        CLOSE_TAG: m++,
        // </a
        CLOSE_TAG_SAW_WHITE: m++,
        // </a   >
        SCRIPT: m++,
        // <script> ...
        SCRIPT_ENDING: m++
        // <script> ... <
      }, f.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, f.ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'",
        AElig: 198,
        Aacute: 193,
        Acirc: 194,
        Agrave: 192,
        Aring: 197,
        Atilde: 195,
        Auml: 196,
        Ccedil: 199,
        ETH: 208,
        Eacute: 201,
        Ecirc: 202,
        Egrave: 200,
        Euml: 203,
        Iacute: 205,
        Icirc: 206,
        Igrave: 204,
        Iuml: 207,
        Ntilde: 209,
        Oacute: 211,
        Ocirc: 212,
        Ograve: 210,
        Oslash: 216,
        Otilde: 213,
        Ouml: 214,
        THORN: 222,
        Uacute: 218,
        Ucirc: 219,
        Ugrave: 217,
        Uuml: 220,
        Yacute: 221,
        aacute: 225,
        acirc: 226,
        aelig: 230,
        agrave: 224,
        aring: 229,
        atilde: 227,
        auml: 228,
        ccedil: 231,
        eacute: 233,
        ecirc: 234,
        egrave: 232,
        eth: 240,
        euml: 235,
        iacute: 237,
        icirc: 238,
        igrave: 236,
        iuml: 239,
        ntilde: 241,
        oacute: 243,
        ocirc: 244,
        ograve: 242,
        oslash: 248,
        otilde: 245,
        ouml: 246,
        szlig: 223,
        thorn: 254,
        uacute: 250,
        ucirc: 251,
        ugrave: 249,
        uuml: 252,
        yacute: 253,
        yuml: 255,
        copy: 169,
        reg: 174,
        nbsp: 160,
        iexcl: 161,
        cent: 162,
        pound: 163,
        curren: 164,
        yen: 165,
        brvbar: 166,
        sect: 167,
        uml: 168,
        ordf: 170,
        laquo: 171,
        not: 172,
        shy: 173,
        macr: 175,
        deg: 176,
        plusmn: 177,
        sup1: 185,
        sup2: 178,
        sup3: 179,
        acute: 180,
        micro: 181,
        para: 182,
        middot: 183,
        cedil: 184,
        ordm: 186,
        raquo: 187,
        frac14: 188,
        frac12: 189,
        frac34: 190,
        iquest: 191,
        times: 215,
        divide: 247,
        OElig: 338,
        oelig: 339,
        Scaron: 352,
        scaron: 353,
        Yuml: 376,
        fnof: 402,
        circ: 710,
        tilde: 732,
        Alpha: 913,
        Beta: 914,
        Gamma: 915,
        Delta: 916,
        Epsilon: 917,
        Zeta: 918,
        Eta: 919,
        Theta: 920,
        Iota: 921,
        Kappa: 922,
        Lambda: 923,
        Mu: 924,
        Nu: 925,
        Xi: 926,
        Omicron: 927,
        Pi: 928,
        Rho: 929,
        Sigma: 931,
        Tau: 932,
        Upsilon: 933,
        Phi: 934,
        Chi: 935,
        Psi: 936,
        Omega: 937,
        alpha: 945,
        beta: 946,
        gamma: 947,
        delta: 948,
        epsilon: 949,
        zeta: 950,
        eta: 951,
        theta: 952,
        iota: 953,
        kappa: 954,
        lambda: 955,
        mu: 956,
        nu: 957,
        xi: 958,
        omicron: 959,
        pi: 960,
        rho: 961,
        sigmaf: 962,
        sigma: 963,
        tau: 964,
        upsilon: 965,
        phi: 966,
        chi: 967,
        psi: 968,
        omega: 969,
        thetasym: 977,
        upsih: 978,
        piv: 982,
        ensp: 8194,
        emsp: 8195,
        thinsp: 8201,
        zwnj: 8204,
        zwj: 8205,
        lrm: 8206,
        rlm: 8207,
        ndash: 8211,
        mdash: 8212,
        lsquo: 8216,
        rsquo: 8217,
        sbquo: 8218,
        ldquo: 8220,
        rdquo: 8221,
        bdquo: 8222,
        dagger: 8224,
        Dagger: 8225,
        bull: 8226,
        hellip: 8230,
        permil: 8240,
        prime: 8242,
        Prime: 8243,
        lsaquo: 8249,
        rsaquo: 8250,
        oline: 8254,
        frasl: 8260,
        euro: 8364,
        image: 8465,
        weierp: 8472,
        real: 8476,
        trade: 8482,
        alefsym: 8501,
        larr: 8592,
        uarr: 8593,
        rarr: 8594,
        darr: 8595,
        harr: 8596,
        crarr: 8629,
        lArr: 8656,
        uArr: 8657,
        rArr: 8658,
        dArr: 8659,
        hArr: 8660,
        forall: 8704,
        part: 8706,
        exist: 8707,
        empty: 8709,
        nabla: 8711,
        isin: 8712,
        notin: 8713,
        ni: 8715,
        prod: 8719,
        sum: 8721,
        minus: 8722,
        lowast: 8727,
        radic: 8730,
        prop: 8733,
        infin: 8734,
        ang: 8736,
        and: 8743,
        or: 8744,
        cap: 8745,
        cup: 8746,
        int: 8747,
        there4: 8756,
        sim: 8764,
        cong: 8773,
        asymp: 8776,
        ne: 8800,
        equiv: 8801,
        le: 8804,
        ge: 8805,
        sub: 8834,
        sup: 8835,
        nsub: 8836,
        sube: 8838,
        supe: 8839,
        oplus: 8853,
        otimes: 8855,
        perp: 8869,
        sdot: 8901,
        lceil: 8968,
        rceil: 8969,
        lfloor: 8970,
        rfloor: 8971,
        lang: 9001,
        rang: 9002,
        loz: 9674,
        spades: 9824,
        clubs: 9827,
        hearts: 9829,
        diams: 9830
      }, Object.keys(f.ENTITIES).forEach(function(U) {
        var P = f.ENTITIES[U], K = typeof P == "number" ? String.fromCharCode(P) : P;
        f.ENTITIES[U] = K;
      });
      for (var B in f.STATE)
        f.STATE[f.STATE[B]] = B;
      m = f.STATE;
      function v(U, P, K) {
        U[P] && U[P](K);
      }
      function M(U, P, K) {
        U.textNode && F(U), v(U, P, K);
      }
      function F(U) {
        U.textNode = I(U.opt, U.textNode), U.textNode && v(U, "ontext", U.textNode), U.textNode = "";
      }
      function I(U, P) {
        return U.trim && (P = P.trim()), U.normalize && (P = P.replace(/\s+/g, " ")), P;
      }
      function w(U, P) {
        return F(U), U.trackPosition && (P += `
Line: ` + U.line + `
Column: ` + U.column + `
Char: ` + U.c), P = new Error(P), U.error = P, v(U, "onerror", P), U;
      }
      function x(U) {
        return U.sawRoot && !U.closedRoot && V(U, "Unclosed root tag"), U.state !== m.BEGIN && U.state !== m.BEGIN_WHITESPACE && U.state !== m.TEXT && w(U, "Unexpected end"), F(U), U.c = "", U.closed = !0, v(U, "onend"), u.call(U, U.strict, U.opt), U;
      }
      function V(U, P) {
        if (typeof U != "object" || !(U instanceof u))
          throw new Error("bad call to strictFail");
        U.strict && w(U, P);
      }
      function z(U) {
        U.strict || (U.tagName = U.tagName[U.looseCase]());
        var P = U.tags[U.tags.length - 1] || U, K = U.tag = { name: U.tagName, attributes: {} };
        U.opt.xmlns && (K.ns = P.ns), U.attribList.length = 0, M(U, "onopentagstart", K);
      }
      function j(U, P) {
        var K = U.indexOf(":"), $ = K < 0 ? ["", U] : U.split(":"), he = $[0], de = $[1];
        return P && U === "xmlns" && (he = "xmlns", de = ""), { prefix: he, local: de };
      }
      function J(U) {
        if (U.strict || (U.attribName = U.attribName[U.looseCase]()), U.attribList.indexOf(U.attribName) !== -1 || U.tag.attributes.hasOwnProperty(U.attribName)) {
          U.attribName = U.attribValue = "";
          return;
        }
        if (U.opt.xmlns) {
          var P = j(U.attribName, !0), K = P.prefix, $ = P.local;
          if (K === "xmlns")
            if ($ === "xml" && U.attribValue !== d)
              V(
                U,
                "xml: prefix must be bound to " + d + `
Actual: ` + U.attribValue
              );
            else if ($ === "xmlns" && U.attribValue !== p)
              V(
                U,
                "xmlns: prefix must be bound to " + p + `
Actual: ` + U.attribValue
              );
            else {
              var he = U.tag, de = U.tags[U.tags.length - 1] || U;
              he.ns === de.ns && (he.ns = Object.create(de.ns)), he.ns[$] = U.attribValue;
            }
          U.attribList.push([U.attribName, U.attribValue]);
        } else
          U.tag.attributes[U.attribName] = U.attribValue, M(U, "onattribute", {
            name: U.attribName,
            value: U.attribValue
          });
        U.attribName = U.attribValue = "";
      }
      function fe(U, P) {
        if (U.opt.xmlns) {
          var K = U.tag, $ = j(U.tagName);
          K.prefix = $.prefix, K.local = $.local, K.uri = K.ns[$.prefix] || "", K.prefix && !K.uri && (V(U, "Unbound namespace prefix: " + JSON.stringify(U.tagName)), K.uri = $.prefix);
          var he = U.tags[U.tags.length - 1] || U;
          K.ns && he.ns !== K.ns && Object.keys(K.ns).forEach(function(ne) {
            M(U, "onopennamespace", {
              prefix: ne,
              uri: K.ns[ne]
            });
          });
          for (var de = 0, Se = U.attribList.length; de < Se; de++) {
            var Re = U.attribList[de], me = Re[0], be = Re[1], Ue = j(me, !0), ke = Ue.prefix, Ye = Ue.local, $e = ke === "" ? "" : K.ns[ke] || "", S = {
              name: me,
              value: be,
              prefix: ke,
              local: Ye,
              uri: $e
            };
            ke && ke !== "xmlns" && !$e && (V(U, "Unbound namespace prefix: " + JSON.stringify(ke)), S.uri = ke), U.tag.attributes[me] = S, M(U, "onattribute", S);
          }
          U.attribList.length = 0;
        }
        U.tag.isSelfClosing = !!P, U.sawRoot = !0, U.tags.push(U.tag), M(U, "onopentag", U.tag), P || (!U.noscript && U.tagName.toLowerCase() === "script" ? U.state = m.SCRIPT : U.state = m.TEXT, U.tag = null, U.tagName = ""), U.attribName = U.attribValue = "", U.attribList.length = 0;
      }
      function Ce(U) {
        if (!U.tagName) {
          V(U, "Weird empty close tag."), U.textNode += "</>", U.state = m.TEXT;
          return;
        }
        if (U.script) {
          if (U.tagName !== "script") {
            U.script += "</" + U.tagName + ">", U.tagName = "", U.state = m.SCRIPT;
            return;
          }
          M(U, "onscript", U.script), U.script = "";
        }
        var P = U.tags.length, K = U.tagName;
        U.strict || (K = K[U.looseCase]());
        for (var $ = K; P--; ) {
          var he = U.tags[P];
          if (he.name !== $)
            V(U, "Unexpected close tag");
          else
            break;
        }
        if (P < 0) {
          V(U, "Unmatched closing tag: " + U.tagName), U.textNode += "</" + U.tagName + ">", U.state = m.TEXT;
          return;
        }
        U.tagName = K;
        for (var de = U.tags.length; de-- > P; ) {
          var Se = U.tag = U.tags.pop();
          U.tagName = U.tag.name, M(U, "onclosetag", U.tagName);
          var Re = {};
          for (var me in Se.ns)
            Re[me] = Se.ns[me];
          var be = U.tags[U.tags.length - 1] || U;
          U.opt.xmlns && Se.ns !== be.ns && Object.keys(Se.ns).forEach(function(Ue) {
            var ke = Se.ns[Ue];
            M(U, "onclosenamespace", { prefix: Ue, uri: ke });
          });
        }
        P === 0 && (U.closedRoot = !0), U.tagName = U.attribValue = U.attribName = "", U.attribList.length = 0, U.state = m.TEXT;
      }
      function b(U) {
        var P = U.entity, K = P.toLowerCase(), $, he = "";
        return U.ENTITIES[P] ? U.ENTITIES[P] : U.ENTITIES[K] ? U.ENTITIES[K] : (P = K, P.charAt(0) === "#" && (P.charAt(1) === "x" ? (P = P.slice(2), $ = parseInt(P, 16), he = $.toString(16)) : (P = P.slice(1), $ = parseInt(P, 10), he = $.toString(10))), P = P.replace(/^0+/, ""), isNaN($) || he.toLowerCase() !== P ? (V(U, "Invalid character entity"), "&" + U.entity + ";") : String.fromCodePoint($));
      }
      function k(U, P) {
        P === "<" ? (U.state = m.OPEN_WAKA, U.startTagPosition = U.position) : g(P) || (V(U, "Non-whitespace before first tag."), U.textNode = P, U.state = m.TEXT);
      }
      function W(U, P) {
        var K = "";
        return P < U.length && (K = U.charAt(P)), K;
      }
      function X(U) {
        var P = this;
        if (this.error)
          throw this.error;
        if (P.closed)
          return w(
            P,
            "Cannot write after close. Assign an onready handler."
          );
        if (U === null)
          return x(P);
        typeof U == "object" && (U = U.toString());
        for (var K = 0, $ = ""; $ = W(U, K++), P.c = $, !!$; )
          switch (P.trackPosition && (P.position++, $ === `
` ? (P.line++, P.column = 0) : P.column++), P.state) {
            case m.BEGIN:
              if (P.state = m.BEGIN_WHITESPACE, $ === "\uFEFF")
                continue;
              k(P, $);
              continue;
            case m.BEGIN_WHITESPACE:
              k(P, $);
              continue;
            case m.TEXT:
              if (P.sawRoot && !P.closedRoot) {
                for (var he = K - 1; $ && $ !== "<" && $ !== "&"; )
                  $ = W(U, K++), $ && P.trackPosition && (P.position++, $ === `
` ? (P.line++, P.column = 0) : P.column++);
                P.textNode += U.substring(he, K - 1);
              }
              $ === "<" && !(P.sawRoot && P.closedRoot && !P.strict) ? (P.state = m.OPEN_WAKA, P.startTagPosition = P.position) : (!g($) && (!P.sawRoot || P.closedRoot) && V(P, "Text data outside of root node."), $ === "&" ? P.state = m.TEXT_ENTITY : P.textNode += $);
              continue;
            case m.SCRIPT:
              $ === "<" ? P.state = m.SCRIPT_ENDING : P.script += $;
              continue;
            case m.SCRIPT_ENDING:
              $ === "/" ? P.state = m.CLOSE_TAG : (P.script += "<" + $, P.state = m.SCRIPT);
              continue;
            case m.OPEN_WAKA:
              if ($ === "!")
                P.state = m.SGML_DECL, P.sgmlDecl = "";
              else if (!g($)) if (O(h, $))
                P.state = m.OPEN_TAG, P.tagName = $;
              else if ($ === "/")
                P.state = m.CLOSE_TAG, P.tagName = "";
              else if ($ === "?")
                P.state = m.PROC_INST, P.procInstName = P.procInstBody = "";
              else {
                if (V(P, "Unencoded <"), P.startTagPosition + 1 < P.position) {
                  var de = P.position - P.startTagPosition;
                  $ = new Array(de).join(" ") + $;
                }
                P.textNode += "<" + $, P.state = m.TEXT;
              }
              continue;
            case m.SGML_DECL:
              if (P.sgmlDecl + $ === "--") {
                P.state = m.COMMENT, P.comment = "", P.sgmlDecl = "";
                continue;
              }
              P.doctype && P.doctype !== !0 && P.sgmlDecl ? (P.state = m.DOCTYPE_DTD, P.doctype += "<!" + P.sgmlDecl + $, P.sgmlDecl = "") : (P.sgmlDecl + $).toUpperCase() === l ? (M(P, "onopencdata"), P.state = m.CDATA, P.sgmlDecl = "", P.cdata = "") : (P.sgmlDecl + $).toUpperCase() === _ ? (P.state = m.DOCTYPE, (P.doctype || P.sawRoot) && V(
                P,
                "Inappropriately located doctype declaration"
              ), P.doctype = "", P.sgmlDecl = "") : $ === ">" ? (M(P, "onsgmldeclaration", P.sgmlDecl), P.sgmlDecl = "", P.state = m.TEXT) : (L($) && (P.state = m.SGML_DECL_QUOTED), P.sgmlDecl += $);
              continue;
            case m.SGML_DECL_QUOTED:
              $ === P.q && (P.state = m.SGML_DECL, P.q = ""), P.sgmlDecl += $;
              continue;
            case m.DOCTYPE:
              $ === ">" ? (P.state = m.TEXT, M(P, "ondoctype", P.doctype), P.doctype = !0) : (P.doctype += $, $ === "[" ? P.state = m.DOCTYPE_DTD : L($) && (P.state = m.DOCTYPE_QUOTED, P.q = $));
              continue;
            case m.DOCTYPE_QUOTED:
              P.doctype += $, $ === P.q && (P.q = "", P.state = m.DOCTYPE);
              continue;
            case m.DOCTYPE_DTD:
              $ === "]" ? (P.doctype += $, P.state = m.DOCTYPE) : $ === "<" ? (P.state = m.OPEN_WAKA, P.startTagPosition = P.position) : L($) ? (P.doctype += $, P.state = m.DOCTYPE_DTD_QUOTED, P.q = $) : P.doctype += $;
              continue;
            case m.DOCTYPE_DTD_QUOTED:
              P.doctype += $, $ === P.q && (P.state = m.DOCTYPE_DTD, P.q = "");
              continue;
            case m.COMMENT:
              $ === "-" ? P.state = m.COMMENT_ENDING : P.comment += $;
              continue;
            case m.COMMENT_ENDING:
              $ === "-" ? (P.state = m.COMMENT_ENDED, P.comment = I(P.opt, P.comment), P.comment && M(P, "oncomment", P.comment), P.comment = "") : (P.comment += "-" + $, P.state = m.COMMENT);
              continue;
            case m.COMMENT_ENDED:
              $ !== ">" ? (V(P, "Malformed comment"), P.comment += "--" + $, P.state = m.COMMENT) : P.doctype && P.doctype !== !0 ? P.state = m.DOCTYPE_DTD : P.state = m.TEXT;
              continue;
            case m.CDATA:
              $ === "]" ? P.state = m.CDATA_ENDING : P.cdata += $;
              continue;
            case m.CDATA_ENDING:
              $ === "]" ? P.state = m.CDATA_ENDING_2 : (P.cdata += "]" + $, P.state = m.CDATA);
              continue;
            case m.CDATA_ENDING_2:
              $ === ">" ? (P.cdata && M(P, "oncdata", P.cdata), M(P, "onclosecdata"), P.cdata = "", P.state = m.TEXT) : $ === "]" ? P.cdata += "]" : (P.cdata += "]]" + $, P.state = m.CDATA);
              continue;
            case m.PROC_INST:
              $ === "?" ? P.state = m.PROC_INST_ENDING : g($) ? P.state = m.PROC_INST_BODY : P.procInstName += $;
              continue;
            case m.PROC_INST_BODY:
              if (!P.procInstBody && g($))
                continue;
              $ === "?" ? P.state = m.PROC_INST_ENDING : P.procInstBody += $;
              continue;
            case m.PROC_INST_ENDING:
              $ === ">" ? (M(P, "onprocessinginstruction", {
                name: P.procInstName,
                body: P.procInstBody
              }), P.procInstName = P.procInstBody = "", P.state = m.TEXT) : (P.procInstBody += "?" + $, P.state = m.PROC_INST_BODY);
              continue;
            case m.OPEN_TAG:
              O(N, $) ? P.tagName += $ : (z(P), $ === ">" ? fe(P) : $ === "/" ? P.state = m.OPEN_TAG_SLASH : (g($) || V(P, "Invalid character in tag name"), P.state = m.ATTRIB));
              continue;
            case m.OPEN_TAG_SLASH:
              $ === ">" ? (fe(P, !0), Ce(P)) : (V(P, "Forward-slash in opening tag not followed by >"), P.state = m.ATTRIB);
              continue;
            case m.ATTRIB:
              if (g($))
                continue;
              $ === ">" ? fe(P) : $ === "/" ? P.state = m.OPEN_TAG_SLASH : O(h, $) ? (P.attribName = $, P.attribValue = "", P.state = m.ATTRIB_NAME) : V(P, "Invalid attribute name");
              continue;
            case m.ATTRIB_NAME:
              $ === "=" ? P.state = m.ATTRIB_VALUE : $ === ">" ? (V(P, "Attribute without value"), P.attribValue = P.attribName, J(P), fe(P)) : g($) ? P.state = m.ATTRIB_NAME_SAW_WHITE : O(N, $) ? P.attribName += $ : V(P, "Invalid attribute name");
              continue;
            case m.ATTRIB_NAME_SAW_WHITE:
              if ($ === "=")
                P.state = m.ATTRIB_VALUE;
              else {
                if (g($))
                  continue;
                V(P, "Attribute without value"), P.tag.attributes[P.attribName] = "", P.attribValue = "", M(P, "onattribute", {
                  name: P.attribName,
                  value: ""
                }), P.attribName = "", $ === ">" ? fe(P) : O(h, $) ? (P.attribName = $, P.state = m.ATTRIB_NAME) : (V(P, "Invalid attribute name"), P.state = m.ATTRIB);
              }
              continue;
            case m.ATTRIB_VALUE:
              if (g($))
                continue;
              L($) ? (P.q = $, P.state = m.ATTRIB_VALUE_QUOTED) : (P.opt.unquotedAttributeValues || w(P, "Unquoted attribute value"), P.state = m.ATTRIB_VALUE_UNQUOTED, P.attribValue = $);
              continue;
            case m.ATTRIB_VALUE_QUOTED:
              if ($ !== P.q) {
                $ === "&" ? P.state = m.ATTRIB_VALUE_ENTITY_Q : P.attribValue += $;
                continue;
              }
              J(P), P.q = "", P.state = m.ATTRIB_VALUE_CLOSED;
              continue;
            case m.ATTRIB_VALUE_CLOSED:
              g($) ? P.state = m.ATTRIB : $ === ">" ? fe(P) : $ === "/" ? P.state = m.OPEN_TAG_SLASH : O(h, $) ? (V(P, "No whitespace between attributes"), P.attribName = $, P.attribValue = "", P.state = m.ATTRIB_NAME) : V(P, "Invalid attribute name");
              continue;
            case m.ATTRIB_VALUE_UNQUOTED:
              if (!R($)) {
                $ === "&" ? P.state = m.ATTRIB_VALUE_ENTITY_U : P.attribValue += $;
                continue;
              }
              J(P), $ === ">" ? fe(P) : P.state = m.ATTRIB;
              continue;
            case m.CLOSE_TAG:
              if (P.tagName)
                $ === ">" ? Ce(P) : O(N, $) ? P.tagName += $ : P.script ? (P.script += "</" + P.tagName, P.tagName = "", P.state = m.SCRIPT) : (g($) || V(P, "Invalid tagname in closing tag"), P.state = m.CLOSE_TAG_SAW_WHITE);
              else {
                if (g($))
                  continue;
                D(h, $) ? P.script ? (P.script += "</" + $, P.state = m.SCRIPT) : V(P, "Invalid tagname in closing tag.") : P.tagName = $;
              }
              continue;
            case m.CLOSE_TAG_SAW_WHITE:
              if (g($))
                continue;
              $ === ">" ? Ce(P) : V(P, "Invalid characters in closing tag");
              continue;
            case m.TEXT_ENTITY:
            case m.ATTRIB_VALUE_ENTITY_Q:
            case m.ATTRIB_VALUE_ENTITY_U:
              var Se, Re;
              switch (P.state) {
                case m.TEXT_ENTITY:
                  Se = m.TEXT, Re = "textNode";
                  break;
                case m.ATTRIB_VALUE_ENTITY_Q:
                  Se = m.ATTRIB_VALUE_QUOTED, Re = "attribValue";
                  break;
                case m.ATTRIB_VALUE_ENTITY_U:
                  Se = m.ATTRIB_VALUE_UNQUOTED, Re = "attribValue";
                  break;
              }
              if ($ === ";") {
                var me = b(P);
                P.opt.unparsedEntities && !Object.values(f.XML_ENTITIES).includes(me) ? (P.entity = "", P.state = Se, P.write(me)) : (P[Re] += me, P.entity = "", P.state = Se);
              } else O(P.entity.length ? C : A, $) ? P.entity += $ : (V(P, "Invalid character in entity name"), P[Re] += "&" + P.entity + $, P.entity = "", P.state = Se);
              continue;
            default:
              throw new Error(P, "Unknown state: " + P.state);
          }
        return P.position >= P.bufferCheckPosition && r(P), P;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      String.fromCodePoint || function() {
        var U = String.fromCharCode, P = Math.floor, K = function() {
          var $ = 16384, he = [], de, Se, Re = -1, me = arguments.length;
          if (!me)
            return "";
          for (var be = ""; ++Re < me; ) {
            var Ue = Number(arguments[Re]);
            if (!isFinite(Ue) || // `NaN`, `+Infinity`, or `-Infinity`
            Ue < 0 || // not a valid Unicode code point
            Ue > 1114111 || // not a valid Unicode code point
            P(Ue) !== Ue)
              throw RangeError("Invalid code point: " + Ue);
            Ue <= 65535 ? he.push(Ue) : (Ue -= 65536, de = (Ue >> 10) + 55296, Se = Ue % 1024 + 56320, he.push(de, Se)), (Re + 1 === me || he.length > $) && (be += U.apply(null, he), he.length = 0);
          }
          return be;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: K,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = K;
      }();
    })(e);
  }(Es)), Es;
}
var El;
function r1() {
  if (El) return cr;
  El = 1, Object.defineProperty(cr, "__esModule", { value: !0 }), cr.XElement = void 0, cr.parseXml = a;
  const e = t1(), f = Bn();
  class t {
    constructor(n) {
      if (this.name = n, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !n)
        throw (0, f.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!r(n))
        throw (0, f.newError)(`Invalid element name: ${n}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(n) {
      const c = this.attributes === null ? null : this.attributes[n];
      if (c == null)
        throw (0, f.newError)(`No attribute "${n}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return c;
    }
    removeAttribute(n) {
      this.attributes !== null && delete this.attributes[n];
    }
    element(n, c = !1, i = null) {
      const l = this.elementOrNull(n, c);
      if (l === null)
        throw (0, f.newError)(i || `No element "${n}"`, "ERR_XML_MISSED_ELEMENT");
      return l;
    }
    elementOrNull(n, c = !1) {
      if (this.elements === null)
        return null;
      for (const i of this.elements)
        if (s(i, n, c))
          return i;
      return null;
    }
    getElements(n, c = !1) {
      return this.elements === null ? [] : this.elements.filter((i) => s(i, n, c));
    }
    elementValueOrEmpty(n, c = !1) {
      const i = this.elementOrNull(n, c);
      return i === null ? "" : i.value;
    }
  }
  cr.XElement = t;
  const u = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function r(o) {
    return u.test(o);
  }
  function s(o, n, c) {
    const i = o.name;
    return i === n || c === !0 && i.length === n.length && i.toLowerCase() === n.toLowerCase();
  }
  function a(o) {
    let n = null;
    const c = e.parser(!0, {}), i = [];
    return c.onopentag = (l) => {
      const _ = new t(l.name);
      if (_.attributes = l.attributes, n === null)
        n = _;
      else {
        const d = i[i.length - 1];
        d.elements == null && (d.elements = []), d.elements.push(_);
      }
      i.push(_);
    }, c.onclosetag = () => {
      i.pop();
    }, c.ontext = (l) => {
      i.length > 0 && (i[i.length - 1].value = l);
    }, c.oncdata = (l) => {
      const _ = i[i.length - 1];
      _.value = l, _.isCData = !0;
    }, c.onerror = (l) => {
      throw l;
    }, c.write(o), n;
  }
  return cr;
}
var wr = {}, Al;
function n1() {
  if (Al) return wr;
  Al = 1, Object.defineProperty(wr, "__esModule", { value: !0 }), wr.MemoLazy = void 0;
  let e = class {
    constructor(u, r) {
      this.selector = u, this.creator = r, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const u = this.selector();
      if (this._value !== void 0 && f(this.selected, u))
        return this._value;
      this.selected = u;
      const r = this.creator(u);
      return this.value = r, r;
    }
    set value(u) {
      this._value = u;
    }
  };
  wr.MemoLazy = e;
  function f(t, u) {
    if (typeof t == "object" && t !== null && (typeof u == "object" && u !== null)) {
      const a = Object.keys(t), o = Object.keys(u);
      return a.length === o.length && a.every((n) => f(t[n], u[n]));
    }
    return t === u;
  }
  return wr;
}
var Rn = {}, pl;
function i1() {
  if (pl) return Rn;
  pl = 1, Object.defineProperty(Rn, "__esModule", { value: !0 }), Rn.retry = f;
  const e = Yo();
  async function f(t, u, r, s = 0, a = 0, o) {
    var n;
    const c = new e.CancellationToken();
    try {
      return await t();
    } catch (i) {
      if ((!((n = o == null ? void 0 : o(i)) !== null && n !== void 0) || n) && u > 0 && !c.cancelled)
        return await new Promise((l) => setTimeout(l, r + s * a)), await f(t, u - 1, r, s, a + 1, o);
      throw i;
    }
  }
  return Rn;
}
var Il;
function Je() {
  return Il || (Il = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.retry = e.MemoLazy = e.newError = e.XElement = e.parseXml = e.ProgressCallbackTransform = e.UUID = e.parseDn = e.githubUrl = e.getS3LikeProviderBaseUrl = e.configureRequestUrl = e.parseJson = e.safeStringifyJson = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.safeGetHeader = e.DigestTransform = e.HttpExecutor = e.createHttpError = e.HttpError = e.CancellationError = e.CancellationToken = void 0, e.asArray = l;
    var f = Yo();
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return f.CancellationToken;
    } }), Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
      return f.CancellationError;
    } });
    var t = QE();
    Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
      return t.HttpError;
    } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
      return t.createHttpError;
    } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
      return t.HttpExecutor;
    } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
      return t.DigestTransform;
    } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
      return t.safeGetHeader;
    } }), Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
      return t.configureRequestOptions;
    } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return t.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
      return t.safeStringifyJson;
    } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
      return t.parseJson;
    } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
      return t.configureRequestUrl;
    } });
    var u = JE();
    Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return u.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
      return u.githubUrl;
    } });
    var r = ZE();
    Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
      return r.parseDn;
    } });
    var s = e1();
    Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
      return s.UUID;
    } });
    var a = Jh();
    Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return a.ProgressCallbackTransform;
    } });
    var o = r1();
    Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
      return o.parseXml;
    } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
      return o.XElement;
    } });
    var n = Bn();
    Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
      return n.newError;
    } });
    var c = n1();
    Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
      return c.MemoLazy;
    } });
    var i = i1();
    Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
      return i.retry;
    } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function l(_) {
      return _ == null ? [] : Array.isArray(_) ? _ : [_];
    }
  }(ls)), ls;
}
var As = {}, Cn = {}, Nl;
function ct() {
  return Nl || (Nl = 1, Cn.fromCallback = function(e) {
    return Object.defineProperty(function(...f) {
      if (typeof f[f.length - 1] == "function") e.apply(this, f);
      else
        return new Promise((t, u) => {
          f.push((r, s) => r != null ? u(r) : t(s)), e.apply(this, f);
        });
    }, "name", { value: e.name });
  }, Cn.fromPromise = function(e) {
    return Object.defineProperty(function(...f) {
      const t = f[f.length - 1];
      if (typeof t != "function") return e.apply(this, f);
      f.pop(), e.apply(this, f).then((u) => t(null, u), t);
    }, "name", { value: e.name });
  }), Cn;
}
var ps, Sl;
function s1() {
  if (Sl) return ps;
  Sl = 1;
  var e = Ud, f = process.cwd, t = null, u = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return t || (t = f.call(process)), t;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var r = process.chdir;
    process.chdir = function(a) {
      t = null, r.call(process, a);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, r);
  }
  ps = s;
  function s(a) {
    e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && o(a), a.lutimes || n(a), a.chown = l(a.chown), a.fchown = l(a.fchown), a.lchown = l(a.lchown), a.chmod = c(a.chmod), a.fchmod = c(a.fchmod), a.lchmod = c(a.lchmod), a.chownSync = _(a.chownSync), a.fchownSync = _(a.fchownSync), a.lchownSync = _(a.lchownSync), a.chmodSync = i(a.chmodSync), a.fchmodSync = i(a.fchmodSync), a.lchmodSync = i(a.lchmodSync), a.stat = d(a.stat), a.fstat = d(a.fstat), a.lstat = d(a.lstat), a.statSync = p(a.statSync), a.fstatSync = p(a.fstatSync), a.lstatSync = p(a.lstatSync), a.chmod && !a.lchmod && (a.lchmod = function(h, N, A) {
      A && process.nextTick(A);
    }, a.lchmodSync = function() {
    }), a.chown && !a.lchown && (a.lchown = function(h, N, A, C) {
      C && process.nextTick(C);
    }, a.lchownSync = function() {
    }), u === "win32" && (a.rename = typeof a.rename != "function" ? a.rename : function(h) {
      function N(A, C, g) {
        var L = Date.now(), R = 0;
        h(A, C, function O(D) {
          if (D && (D.code === "EACCES" || D.code === "EPERM" || D.code === "EBUSY") && Date.now() - L < 6e4) {
            setTimeout(function() {
              a.stat(C, function(m, B) {
                m && m.code === "ENOENT" ? h(A, C, O) : g(D);
              });
            }, R), R < 100 && (R += 10);
            return;
          }
          g && g(D);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(N, h), N;
    }(a.rename)), a.read = typeof a.read != "function" ? a.read : function(h) {
      function N(A, C, g, L, R, O) {
        var D;
        if (O && typeof O == "function") {
          var m = 0;
          D = function(B, v, M) {
            if (B && B.code === "EAGAIN" && m < 10)
              return m++, h.call(a, A, C, g, L, R, D);
            O.apply(this, arguments);
          };
        }
        return h.call(a, A, C, g, L, R, D);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(N, h), N;
    }(a.read), a.readSync = typeof a.readSync != "function" ? a.readSync : /* @__PURE__ */ function(h) {
      return function(N, A, C, g, L) {
        for (var R = 0; ; )
          try {
            return h.call(a, N, A, C, g, L);
          } catch (O) {
            if (O.code === "EAGAIN" && R < 10) {
              R++;
              continue;
            }
            throw O;
          }
      };
    }(a.readSync);
    function o(h) {
      h.lchmod = function(N, A, C) {
        h.open(
          N,
          e.O_WRONLY | e.O_SYMLINK,
          A,
          function(g, L) {
            if (g) {
              C && C(g);
              return;
            }
            h.fchmod(L, A, function(R) {
              h.close(L, function(O) {
                C && C(R || O);
              });
            });
          }
        );
      }, h.lchmodSync = function(N, A) {
        var C = h.openSync(N, e.O_WRONLY | e.O_SYMLINK, A), g = !0, L;
        try {
          L = h.fchmodSync(C, A), g = !1;
        } finally {
          if (g)
            try {
              h.closeSync(C);
            } catch {
            }
          else
            h.closeSync(C);
        }
        return L;
      };
    }
    function n(h) {
      e.hasOwnProperty("O_SYMLINK") && h.futimes ? (h.lutimes = function(N, A, C, g) {
        h.open(N, e.O_SYMLINK, function(L, R) {
          if (L) {
            g && g(L);
            return;
          }
          h.futimes(R, A, C, function(O) {
            h.close(R, function(D) {
              g && g(O || D);
            });
          });
        });
      }, h.lutimesSync = function(N, A, C) {
        var g = h.openSync(N, e.O_SYMLINK), L, R = !0;
        try {
          L = h.futimesSync(g, A, C), R = !1;
        } finally {
          if (R)
            try {
              h.closeSync(g);
            } catch {
            }
          else
            h.closeSync(g);
        }
        return L;
      }) : h.futimes && (h.lutimes = function(N, A, C, g) {
        g && process.nextTick(g);
      }, h.lutimesSync = function() {
      });
    }
    function c(h) {
      return h && function(N, A, C) {
        return h.call(a, N, A, function(g) {
          E(g) && (g = null), C && C.apply(this, arguments);
        });
      };
    }
    function i(h) {
      return h && function(N, A) {
        try {
          return h.call(a, N, A);
        } catch (C) {
          if (!E(C)) throw C;
        }
      };
    }
    function l(h) {
      return h && function(N, A, C, g) {
        return h.call(a, N, A, C, function(L) {
          E(L) && (L = null), g && g.apply(this, arguments);
        });
      };
    }
    function _(h) {
      return h && function(N, A, C) {
        try {
          return h.call(a, N, A, C);
        } catch (g) {
          if (!E(g)) throw g;
        }
      };
    }
    function d(h) {
      return h && function(N, A, C) {
        typeof A == "function" && (C = A, A = null);
        function g(L, R) {
          R && (R.uid < 0 && (R.uid += 4294967296), R.gid < 0 && (R.gid += 4294967296)), C && C.apply(this, arguments);
        }
        return A ? h.call(a, N, A, g) : h.call(a, N, g);
      };
    }
    function p(h) {
      return h && function(N, A) {
        var C = A ? h.call(a, N, A) : h.call(a, N);
        return C && (C.uid < 0 && (C.uid += 4294967296), C.gid < 0 && (C.gid += 4294967296)), C;
      };
    }
    function E(h) {
      if (!h || h.code === "ENOSYS")
        return !0;
      var N = !process.getuid || process.getuid() !== 0;
      return !!(N && (h.code === "EINVAL" || h.code === "EPERM"));
    }
  }
  return ps;
}
var Is, Rl;
function a1() {
  if (Rl) return Is;
  Rl = 1;
  var e = Bt.Stream;
  Is = f;
  function f(t) {
    return {
      ReadStream: u,
      WriteStream: r
    };
    function u(s, a) {
      if (!(this instanceof u)) return new u(s, a);
      e.call(this);
      var o = this;
      this.path = s, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, a = a || {};
      for (var n = Object.keys(a), c = 0, i = n.length; c < i; c++) {
        var l = n[c];
        this[l] = a[l];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0)
          this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end)
          throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          o._read();
        });
        return;
      }
      t.open(this.path, this.flags, this.mode, function(_, d) {
        if (_) {
          o.emit("error", _), o.readable = !1;
          return;
        }
        o.fd = d, o.emit("open", d), o._read();
      });
    }
    function r(s, a) {
      if (!(this instanceof r)) return new r(s, a);
      e.call(this), this.path = s, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, a = a || {};
      for (var o = Object.keys(a), n = 0, c = o.length; n < c; n++) {
        var i = o[n];
        this[i] = a[i];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = t.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return Is;
}
var Ns, Cl;
function o1() {
  if (Cl) return Ns;
  Cl = 1, Ns = f;
  var e = Object.getPrototypeOf || function(t) {
    return t.__proto__;
  };
  function f(t) {
    if (t === null || typeof t != "object")
      return t;
    if (t instanceof Object)
      var u = { __proto__: e(t) };
    else
      var u = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(t).forEach(function(r) {
      Object.defineProperty(u, r, Object.getOwnPropertyDescriptor(t, r));
    }), u;
  }
  return Ns;
}
var Tn, Tl;
function st() {
  if (Tl) return Tn;
  Tl = 1;
  var e = ze, f = s1(), t = a1(), u = o1(), r = Mn, s, a;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (s = Symbol.for("graceful-fs.queue"), a = Symbol.for("graceful-fs.previous")) : (s = "___graceful-fs.queue", a = "___graceful-fs.previous");
  function o() {
  }
  function n(h, N) {
    Object.defineProperty(h, s, {
      get: function() {
        return N;
      }
    });
  }
  var c = o;
  if (r.debuglog ? c = r.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (c = function() {
    var h = r.format.apply(r, arguments);
    h = "GFS4: " + h.split(/\n/).join(`
GFS4: `), console.error(h);
  }), !e[s]) {
    var i = dt[s] || [];
    n(e, i), e.close = function(h) {
      function N(A, C) {
        return h.call(e, A, function(g) {
          g || p(), typeof C == "function" && C.apply(this, arguments);
        });
      }
      return Object.defineProperty(N, a, {
        value: h
      }), N;
    }(e.close), e.closeSync = function(h) {
      function N(A) {
        h.apply(e, arguments), p();
      }
      return Object.defineProperty(N, a, {
        value: h
      }), N;
    }(e.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      c(e[s]), Lh.equal(e[s].length, 0);
    });
  }
  dt[s] || n(dt, e[s]), Tn = l(u(e)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched && (Tn = l(e), e.__patched = !0);
  function l(h) {
    f(h), h.gracefulify = l, h.createReadStream = fe, h.createWriteStream = Ce;
    var N = h.readFile;
    h.readFile = A;
    function A(W, X, U) {
      return typeof X == "function" && (U = X, X = null), P(W, X, U);
      function P(K, $, he, de) {
        return N(K, $, function(Se) {
          Se && (Se.code === "EMFILE" || Se.code === "ENFILE") ? _([P, [K, $, he], Se, de || Date.now(), Date.now()]) : typeof he == "function" && he.apply(this, arguments);
        });
      }
    }
    var C = h.writeFile;
    h.writeFile = g;
    function g(W, X, U, P) {
      return typeof U == "function" && (P = U, U = null), K(W, X, U, P);
      function K($, he, de, Se, Re) {
        return C($, he, de, function(me) {
          me && (me.code === "EMFILE" || me.code === "ENFILE") ? _([K, [$, he, de, Se], me, Re || Date.now(), Date.now()]) : typeof Se == "function" && Se.apply(this, arguments);
        });
      }
    }
    var L = h.appendFile;
    L && (h.appendFile = R);
    function R(W, X, U, P) {
      return typeof U == "function" && (P = U, U = null), K(W, X, U, P);
      function K($, he, de, Se, Re) {
        return L($, he, de, function(me) {
          me && (me.code === "EMFILE" || me.code === "ENFILE") ? _([K, [$, he, de, Se], me, Re || Date.now(), Date.now()]) : typeof Se == "function" && Se.apply(this, arguments);
        });
      }
    }
    var O = h.copyFile;
    O && (h.copyFile = D);
    function D(W, X, U, P) {
      return typeof U == "function" && (P = U, U = 0), K(W, X, U, P);
      function K($, he, de, Se, Re) {
        return O($, he, de, function(me) {
          me && (me.code === "EMFILE" || me.code === "ENFILE") ? _([K, [$, he, de, Se], me, Re || Date.now(), Date.now()]) : typeof Se == "function" && Se.apply(this, arguments);
        });
      }
    }
    var m = h.readdir;
    h.readdir = v;
    var B = /^v[0-5]\./;
    function v(W, X, U) {
      typeof X == "function" && (U = X, X = null);
      var P = B.test(process.version) ? function(he, de, Se, Re) {
        return m(he, K(
          he,
          de,
          Se,
          Re
        ));
      } : function(he, de, Se, Re) {
        return m(he, de, K(
          he,
          de,
          Se,
          Re
        ));
      };
      return P(W, X, U);
      function K($, he, de, Se) {
        return function(Re, me) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? _([
            P,
            [$, he, de],
            Re,
            Se || Date.now(),
            Date.now()
          ]) : (me && me.sort && me.sort(), typeof de == "function" && de.call(this, Re, me));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var M = t(h);
      V = M.ReadStream, j = M.WriteStream;
    }
    var F = h.ReadStream;
    F && (V.prototype = Object.create(F.prototype), V.prototype.open = z);
    var I = h.WriteStream;
    I && (j.prototype = Object.create(I.prototype), j.prototype.open = J), Object.defineProperty(h, "ReadStream", {
      get: function() {
        return V;
      },
      set: function(W) {
        V = W;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(h, "WriteStream", {
      get: function() {
        return j;
      },
      set: function(W) {
        j = W;
      },
      enumerable: !0,
      configurable: !0
    });
    var w = V;
    Object.defineProperty(h, "FileReadStream", {
      get: function() {
        return w;
      },
      set: function(W) {
        w = W;
      },
      enumerable: !0,
      configurable: !0
    });
    var x = j;
    Object.defineProperty(h, "FileWriteStream", {
      get: function() {
        return x;
      },
      set: function(W) {
        x = W;
      },
      enumerable: !0,
      configurable: !0
    });
    function V(W, X) {
      return this instanceof V ? (F.apply(this, arguments), this) : V.apply(Object.create(V.prototype), arguments);
    }
    function z() {
      var W = this;
      k(W.path, W.flags, W.mode, function(X, U) {
        X ? (W.autoClose && W.destroy(), W.emit("error", X)) : (W.fd = U, W.emit("open", U), W.read());
      });
    }
    function j(W, X) {
      return this instanceof j ? (I.apply(this, arguments), this) : j.apply(Object.create(j.prototype), arguments);
    }
    function J() {
      var W = this;
      k(W.path, W.flags, W.mode, function(X, U) {
        X ? (W.destroy(), W.emit("error", X)) : (W.fd = U, W.emit("open", U));
      });
    }
    function fe(W, X) {
      return new h.ReadStream(W, X);
    }
    function Ce(W, X) {
      return new h.WriteStream(W, X);
    }
    var b = h.open;
    h.open = k;
    function k(W, X, U, P) {
      return typeof U == "function" && (P = U, U = null), K(W, X, U, P);
      function K($, he, de, Se, Re) {
        return b($, he, de, function(me, be) {
          me && (me.code === "EMFILE" || me.code === "ENFILE") ? _([K, [$, he, de, Se], me, Re || Date.now(), Date.now()]) : typeof Se == "function" && Se.apply(this, arguments);
        });
      }
    }
    return h;
  }
  function _(h) {
    c("ENQUEUE", h[0].name, h[1]), e[s].push(h), E();
  }
  var d;
  function p() {
    for (var h = Date.now(), N = 0; N < e[s].length; ++N)
      e[s][N].length > 2 && (e[s][N][3] = h, e[s][N][4] = h);
    E();
  }
  function E() {
    if (clearTimeout(d), d = void 0, e[s].length !== 0) {
      var h = e[s].shift(), N = h[0], A = h[1], C = h[2], g = h[3], L = h[4];
      if (g === void 0)
        c("RETRY", N.name, A), N.apply(null, A);
      else if (Date.now() - g >= 6e4) {
        c("TIMEOUT", N.name, A);
        var R = A.pop();
        typeof R == "function" && R.call(null, C);
      } else {
        var O = Date.now() - L, D = Math.max(L - g, 1), m = Math.min(D * 1.2, 100);
        O >= m ? (c("RETRY", N.name, A), N.apply(null, A.concat([g]))) : e[s].push(h);
      }
      d === void 0 && (d = setTimeout(E, 0));
    }
  }
  return Tn;
}
var gl;
function dr() {
  return gl || (gl = 1, function(e) {
    const f = ct().fromCallback, t = st(), u = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((r) => typeof t[r] == "function");
    Object.assign(e, t), u.forEach((r) => {
      e[r] = f(t[r]);
    }), e.exists = function(r, s) {
      return typeof s == "function" ? t.exists(r, s) : new Promise((a) => t.exists(r, a));
    }, e.read = function(r, s, a, o, n, c) {
      return typeof c == "function" ? t.read(r, s, a, o, n, c) : new Promise((i, l) => {
        t.read(r, s, a, o, n, (_, d, p) => {
          if (_) return l(_);
          i({ bytesRead: d, buffer: p });
        });
      });
    }, e.write = function(r, s, ...a) {
      return typeof a[a.length - 1] == "function" ? t.write(r, s, ...a) : new Promise((o, n) => {
        t.write(r, s, ...a, (c, i, l) => {
          if (c) return n(c);
          o({ bytesWritten: i, buffer: l });
        });
      });
    }, typeof t.writev == "function" && (e.writev = function(r, s, ...a) {
      return typeof a[a.length - 1] == "function" ? t.writev(r, s, ...a) : new Promise((o, n) => {
        t.writev(r, s, ...a, (c, i, l) => {
          if (c) return n(c);
          o({ bytesWritten: i, buffers: l });
        });
      });
    }), typeof t.realpath.native == "function" ? e.realpath.native = f(t.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(As)), As;
}
var gn = {}, Ss = {}, ml;
function c1() {
  if (ml) return Ss;
  ml = 1;
  const e = xe;
  return Ss.checkPath = function(t) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(e.parse(t).root, ""))) {
      const r = new Error(`Path contains invalid characters: ${t}`);
      throw r.code = "EINVAL", r;
    }
  }, Ss;
}
var Ol;
function u1() {
  if (Ol) return gn;
  Ol = 1;
  const e = /* @__PURE__ */ dr(), { checkPath: f } = /* @__PURE__ */ c1(), t = (u) => {
    const r = { mode: 511 };
    return typeof u == "number" ? u : { ...r, ...u }.mode;
  };
  return gn.makeDir = async (u, r) => (f(u), e.mkdir(u, {
    mode: t(r),
    recursive: !0
  })), gn.makeDirSync = (u, r) => (f(u), e.mkdirSync(u, {
    mode: t(r),
    recursive: !0
  })), gn;
}
var Rs, wl;
function Rt() {
  if (wl) return Rs;
  wl = 1;
  const e = ct().fromPromise, { makeDir: f, makeDirSync: t } = /* @__PURE__ */ u1(), u = e(f);
  return Rs = {
    mkdirs: u,
    mkdirsSync: t,
    // alias
    mkdirp: u,
    mkdirpSync: t,
    ensureDir: u,
    ensureDirSync: t
  }, Rs;
}
var Cs, Pl;
function tr() {
  if (Pl) return Cs;
  Pl = 1;
  const e = ct().fromPromise, f = /* @__PURE__ */ dr();
  function t(u) {
    return f.access(u).then(() => !0).catch(() => !1);
  }
  return Cs = {
    pathExists: e(t),
    pathExistsSync: f.existsSync
  }, Cs;
}
var Ts, Dl;
function Zh() {
  if (Dl) return Ts;
  Dl = 1;
  const e = st();
  function f(u, r, s, a) {
    e.open(u, "r+", (o, n) => {
      if (o) return a(o);
      e.futimes(n, r, s, (c) => {
        e.close(n, (i) => {
          a && a(c || i);
        });
      });
    });
  }
  function t(u, r, s) {
    const a = e.openSync(u, "r+");
    return e.futimesSync(a, r, s), e.closeSync(a);
  }
  return Ts = {
    utimesMillis: f,
    utimesMillisSync: t
  }, Ts;
}
var gs, Ul;
function Er() {
  if (Ul) return gs;
  Ul = 1;
  const e = /* @__PURE__ */ dr(), f = xe, t = Mn;
  function u(_, d, p) {
    const E = p.dereference ? (h) => e.stat(h, { bigint: !0 }) : (h) => e.lstat(h, { bigint: !0 });
    return Promise.all([
      E(_),
      E(d).catch((h) => {
        if (h.code === "ENOENT") return null;
        throw h;
      })
    ]).then(([h, N]) => ({ srcStat: h, destStat: N }));
  }
  function r(_, d, p) {
    let E;
    const h = p.dereference ? (A) => e.statSync(A, { bigint: !0 }) : (A) => e.lstatSync(A, { bigint: !0 }), N = h(_);
    try {
      E = h(d);
    } catch (A) {
      if (A.code === "ENOENT") return { srcStat: N, destStat: null };
      throw A;
    }
    return { srcStat: N, destStat: E };
  }
  function s(_, d, p, E, h) {
    t.callbackify(u)(_, d, E, (N, A) => {
      if (N) return h(N);
      const { srcStat: C, destStat: g } = A;
      if (g) {
        if (c(C, g)) {
          const L = f.basename(_), R = f.basename(d);
          return p === "move" && L !== R && L.toLowerCase() === R.toLowerCase() ? h(null, { srcStat: C, destStat: g, isChangingCase: !0 }) : h(new Error("Source and destination must not be the same."));
        }
        if (C.isDirectory() && !g.isDirectory())
          return h(new Error(`Cannot overwrite non-directory '${d}' with directory '${_}'.`));
        if (!C.isDirectory() && g.isDirectory())
          return h(new Error(`Cannot overwrite directory '${d}' with non-directory '${_}'.`));
      }
      return C.isDirectory() && i(_, d) ? h(new Error(l(_, d, p))) : h(null, { srcStat: C, destStat: g });
    });
  }
  function a(_, d, p, E) {
    const { srcStat: h, destStat: N } = r(_, d, E);
    if (N) {
      if (c(h, N)) {
        const A = f.basename(_), C = f.basename(d);
        if (p === "move" && A !== C && A.toLowerCase() === C.toLowerCase())
          return { srcStat: h, destStat: N, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (h.isDirectory() && !N.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${d}' with directory '${_}'.`);
      if (!h.isDirectory() && N.isDirectory())
        throw new Error(`Cannot overwrite directory '${d}' with non-directory '${_}'.`);
    }
    if (h.isDirectory() && i(_, d))
      throw new Error(l(_, d, p));
    return { srcStat: h, destStat: N };
  }
  function o(_, d, p, E, h) {
    const N = f.resolve(f.dirname(_)), A = f.resolve(f.dirname(p));
    if (A === N || A === f.parse(A).root) return h();
    e.stat(A, { bigint: !0 }, (C, g) => C ? C.code === "ENOENT" ? h() : h(C) : c(d, g) ? h(new Error(l(_, p, E))) : o(_, d, A, E, h));
  }
  function n(_, d, p, E) {
    const h = f.resolve(f.dirname(_)), N = f.resolve(f.dirname(p));
    if (N === h || N === f.parse(N).root) return;
    let A;
    try {
      A = e.statSync(N, { bigint: !0 });
    } catch (C) {
      if (C.code === "ENOENT") return;
      throw C;
    }
    if (c(d, A))
      throw new Error(l(_, p, E));
    return n(_, d, N, E);
  }
  function c(_, d) {
    return d.ino && d.dev && d.ino === _.ino && d.dev === _.dev;
  }
  function i(_, d) {
    const p = f.resolve(_).split(f.sep).filter((h) => h), E = f.resolve(d).split(f.sep).filter((h) => h);
    return p.reduce((h, N, A) => h && E[A] === N, !0);
  }
  function l(_, d, p) {
    return `Cannot ${p} '${_}' to a subdirectory of itself, '${d}'.`;
  }
  return gs = {
    checkPaths: s,
    checkPathsSync: a,
    checkParentPaths: o,
    checkParentPathsSync: n,
    isSrcSubdir: i,
    areIdentical: c
  }, gs;
}
var ms, Ll;
function l1() {
  if (Ll) return ms;
  Ll = 1;
  const e = st(), f = xe, t = Rt().mkdirs, u = tr().pathExists, r = Zh().utimesMillis, s = /* @__PURE__ */ Er();
  function a(v, M, F, I) {
    typeof F == "function" && !I ? (I = F, F = {}) : typeof F == "function" && (F = { filter: F }), I = I || function() {
    }, F = F || {}, F.clobber = "clobber" in F ? !!F.clobber : !0, F.overwrite = "overwrite" in F ? !!F.overwrite : F.clobber, F.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), s.checkPaths(v, M, "copy", F, (w, x) => {
      if (w) return I(w);
      const { srcStat: V, destStat: z } = x;
      s.checkParentPaths(v, V, M, "copy", (j) => j ? I(j) : F.filter ? n(o, z, v, M, F, I) : o(z, v, M, F, I));
    });
  }
  function o(v, M, F, I, w) {
    const x = f.dirname(F);
    u(x, (V, z) => {
      if (V) return w(V);
      if (z) return i(v, M, F, I, w);
      t(x, (j) => j ? w(j) : i(v, M, F, I, w));
    });
  }
  function n(v, M, F, I, w, x) {
    Promise.resolve(w.filter(F, I)).then((V) => V ? v(M, F, I, w, x) : x(), (V) => x(V));
  }
  function c(v, M, F, I, w) {
    return I.filter ? n(i, v, M, F, I, w) : i(v, M, F, I, w);
  }
  function i(v, M, F, I, w) {
    (I.dereference ? e.stat : e.lstat)(M, (V, z) => V ? w(V) : z.isDirectory() ? g(z, v, M, F, I, w) : z.isFile() || z.isCharacterDevice() || z.isBlockDevice() ? l(z, v, M, F, I, w) : z.isSymbolicLink() ? m(v, M, F, I, w) : z.isSocket() ? w(new Error(`Cannot copy a socket file: ${M}`)) : z.isFIFO() ? w(new Error(`Cannot copy a FIFO pipe: ${M}`)) : w(new Error(`Unknown file: ${M}`)));
  }
  function l(v, M, F, I, w, x) {
    return M ? _(v, F, I, w, x) : d(v, F, I, w, x);
  }
  function _(v, M, F, I, w) {
    if (I.overwrite)
      e.unlink(F, (x) => x ? w(x) : d(v, M, F, I, w));
    else return I.errorOnExist ? w(new Error(`'${F}' already exists`)) : w();
  }
  function d(v, M, F, I, w) {
    e.copyFile(M, F, (x) => x ? w(x) : I.preserveTimestamps ? p(v.mode, M, F, w) : A(F, v.mode, w));
  }
  function p(v, M, F, I) {
    return E(v) ? h(F, v, (w) => w ? I(w) : N(v, M, F, I)) : N(v, M, F, I);
  }
  function E(v) {
    return (v & 128) === 0;
  }
  function h(v, M, F) {
    return A(v, M | 128, F);
  }
  function N(v, M, F, I) {
    C(M, F, (w) => w ? I(w) : A(F, v, I));
  }
  function A(v, M, F) {
    return e.chmod(v, M, F);
  }
  function C(v, M, F) {
    e.stat(v, (I, w) => I ? F(I) : r(M, w.atime, w.mtime, F));
  }
  function g(v, M, F, I, w, x) {
    return M ? R(F, I, w, x) : L(v.mode, F, I, w, x);
  }
  function L(v, M, F, I, w) {
    e.mkdir(F, (x) => {
      if (x) return w(x);
      R(M, F, I, (V) => V ? w(V) : A(F, v, w));
    });
  }
  function R(v, M, F, I) {
    e.readdir(v, (w, x) => w ? I(w) : O(x, v, M, F, I));
  }
  function O(v, M, F, I, w) {
    const x = v.pop();
    return x ? D(v, x, M, F, I, w) : w();
  }
  function D(v, M, F, I, w, x) {
    const V = f.join(F, M), z = f.join(I, M);
    s.checkPaths(V, z, "copy", w, (j, J) => {
      if (j) return x(j);
      const { destStat: fe } = J;
      c(fe, V, z, w, (Ce) => Ce ? x(Ce) : O(v, F, I, w, x));
    });
  }
  function m(v, M, F, I, w) {
    e.readlink(M, (x, V) => {
      if (x) return w(x);
      if (I.dereference && (V = f.resolve(process.cwd(), V)), v)
        e.readlink(F, (z, j) => z ? z.code === "EINVAL" || z.code === "UNKNOWN" ? e.symlink(V, F, w) : w(z) : (I.dereference && (j = f.resolve(process.cwd(), j)), s.isSrcSubdir(V, j) ? w(new Error(`Cannot copy '${V}' to a subdirectory of itself, '${j}'.`)) : v.isDirectory() && s.isSrcSubdir(j, V) ? w(new Error(`Cannot overwrite '${j}' with '${V}'.`)) : B(V, F, w)));
      else
        return e.symlink(V, F, w);
    });
  }
  function B(v, M, F) {
    e.unlink(M, (I) => I ? F(I) : e.symlink(v, M, F));
  }
  return ms = a, ms;
}
var Os, bl;
function _1() {
  if (bl) return Os;
  bl = 1;
  const e = st(), f = xe, t = Rt().mkdirsSync, u = Zh().utimesMillisSync, r = /* @__PURE__ */ Er();
  function s(O, D, m) {
    typeof m == "function" && (m = { filter: m }), m = m || {}, m.clobber = "clobber" in m ? !!m.clobber : !0, m.overwrite = "overwrite" in m ? !!m.overwrite : m.clobber, m.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: B, destStat: v } = r.checkPathsSync(O, D, "copy", m);
    return r.checkParentPathsSync(O, B, D, "copy"), a(v, O, D, m);
  }
  function a(O, D, m, B) {
    if (B.filter && !B.filter(D, m)) return;
    const v = f.dirname(m);
    return e.existsSync(v) || t(v), n(O, D, m, B);
  }
  function o(O, D, m, B) {
    if (!(B.filter && !B.filter(D, m)))
      return n(O, D, m, B);
  }
  function n(O, D, m, B) {
    const M = (B.dereference ? e.statSync : e.lstatSync)(D);
    if (M.isDirectory()) return N(M, O, D, m, B);
    if (M.isFile() || M.isCharacterDevice() || M.isBlockDevice()) return c(M, O, D, m, B);
    if (M.isSymbolicLink()) return L(O, D, m, B);
    throw M.isSocket() ? new Error(`Cannot copy a socket file: ${D}`) : M.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${D}`) : new Error(`Unknown file: ${D}`);
  }
  function c(O, D, m, B, v) {
    return D ? i(O, m, B, v) : l(O, m, B, v);
  }
  function i(O, D, m, B) {
    if (B.overwrite)
      return e.unlinkSync(m), l(O, D, m, B);
    if (B.errorOnExist)
      throw new Error(`'${m}' already exists`);
  }
  function l(O, D, m, B) {
    return e.copyFileSync(D, m), B.preserveTimestamps && _(O.mode, D, m), E(m, O.mode);
  }
  function _(O, D, m) {
    return d(O) && p(m, O), h(D, m);
  }
  function d(O) {
    return (O & 128) === 0;
  }
  function p(O, D) {
    return E(O, D | 128);
  }
  function E(O, D) {
    return e.chmodSync(O, D);
  }
  function h(O, D) {
    const m = e.statSync(O);
    return u(D, m.atime, m.mtime);
  }
  function N(O, D, m, B, v) {
    return D ? C(m, B, v) : A(O.mode, m, B, v);
  }
  function A(O, D, m, B) {
    return e.mkdirSync(m), C(D, m, B), E(m, O);
  }
  function C(O, D, m) {
    e.readdirSync(O).forEach((B) => g(B, O, D, m));
  }
  function g(O, D, m, B) {
    const v = f.join(D, O), M = f.join(m, O), { destStat: F } = r.checkPathsSync(v, M, "copy", B);
    return o(F, v, M, B);
  }
  function L(O, D, m, B) {
    let v = e.readlinkSync(D);
    if (B.dereference && (v = f.resolve(process.cwd(), v)), O) {
      let M;
      try {
        M = e.readlinkSync(m);
      } catch (F) {
        if (F.code === "EINVAL" || F.code === "UNKNOWN") return e.symlinkSync(v, m);
        throw F;
      }
      if (B.dereference && (M = f.resolve(process.cwd(), M)), r.isSrcSubdir(v, M))
        throw new Error(`Cannot copy '${v}' to a subdirectory of itself, '${M}'.`);
      if (e.statSync(m).isDirectory() && r.isSrcSubdir(M, v))
        throw new Error(`Cannot overwrite '${M}' with '${v}'.`);
      return R(v, m);
    } else
      return e.symlinkSync(v, m);
  }
  function R(O, D) {
    return e.unlinkSync(D), e.symlinkSync(O, D);
  }
  return Os = s, Os;
}
var ws, yl;
function Ko() {
  if (yl) return ws;
  yl = 1;
  const e = ct().fromCallback;
  return ws = {
    copy: e(/* @__PURE__ */ l1()),
    copySync: /* @__PURE__ */ _1()
  }, ws;
}
var Ps, vl;
function f1() {
  if (vl) return Ps;
  vl = 1;
  const e = st(), f = xe, t = Lh, u = process.platform === "win32";
  function r(p) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((h) => {
      p[h] = p[h] || e[h], h = h + "Sync", p[h] = p[h] || e[h];
    }), p.maxBusyTries = p.maxBusyTries || 3;
  }
  function s(p, E, h) {
    let N = 0;
    typeof E == "function" && (h = E, E = {}), t(p, "rimraf: missing path"), t.strictEqual(typeof p, "string", "rimraf: path should be a string"), t.strictEqual(typeof h, "function", "rimraf: callback function required"), t(E, "rimraf: invalid options argument provided"), t.strictEqual(typeof E, "object", "rimraf: options should be object"), r(E), a(p, E, function A(C) {
      if (C) {
        if ((C.code === "EBUSY" || C.code === "ENOTEMPTY" || C.code === "EPERM") && N < E.maxBusyTries) {
          N++;
          const g = N * 100;
          return setTimeout(() => a(p, E, A), g);
        }
        C.code === "ENOENT" && (C = null);
      }
      h(C);
    });
  }
  function a(p, E, h) {
    t(p), t(E), t(typeof h == "function"), E.lstat(p, (N, A) => {
      if (N && N.code === "ENOENT")
        return h(null);
      if (N && N.code === "EPERM" && u)
        return o(p, E, N, h);
      if (A && A.isDirectory())
        return c(p, E, N, h);
      E.unlink(p, (C) => {
        if (C) {
          if (C.code === "ENOENT")
            return h(null);
          if (C.code === "EPERM")
            return u ? o(p, E, C, h) : c(p, E, C, h);
          if (C.code === "EISDIR")
            return c(p, E, C, h);
        }
        return h(C);
      });
    });
  }
  function o(p, E, h, N) {
    t(p), t(E), t(typeof N == "function"), E.chmod(p, 438, (A) => {
      A ? N(A.code === "ENOENT" ? null : h) : E.stat(p, (C, g) => {
        C ? N(C.code === "ENOENT" ? null : h) : g.isDirectory() ? c(p, E, h, N) : E.unlink(p, N);
      });
    });
  }
  function n(p, E, h) {
    let N;
    t(p), t(E);
    try {
      E.chmodSync(p, 438);
    } catch (A) {
      if (A.code === "ENOENT")
        return;
      throw h;
    }
    try {
      N = E.statSync(p);
    } catch (A) {
      if (A.code === "ENOENT")
        return;
      throw h;
    }
    N.isDirectory() ? _(p, E, h) : E.unlinkSync(p);
  }
  function c(p, E, h, N) {
    t(p), t(E), t(typeof N == "function"), E.rmdir(p, (A) => {
      A && (A.code === "ENOTEMPTY" || A.code === "EEXIST" || A.code === "EPERM") ? i(p, E, N) : A && A.code === "ENOTDIR" ? N(h) : N(A);
    });
  }
  function i(p, E, h) {
    t(p), t(E), t(typeof h == "function"), E.readdir(p, (N, A) => {
      if (N) return h(N);
      let C = A.length, g;
      if (C === 0) return E.rmdir(p, h);
      A.forEach((L) => {
        s(f.join(p, L), E, (R) => {
          if (!g) {
            if (R) return h(g = R);
            --C === 0 && E.rmdir(p, h);
          }
        });
      });
    });
  }
  function l(p, E) {
    let h;
    E = E || {}, r(E), t(p, "rimraf: missing path"), t.strictEqual(typeof p, "string", "rimraf: path should be a string"), t(E, "rimraf: missing options"), t.strictEqual(typeof E, "object", "rimraf: options should be object");
    try {
      h = E.lstatSync(p);
    } catch (N) {
      if (N.code === "ENOENT")
        return;
      N.code === "EPERM" && u && n(p, E, N);
    }
    try {
      h && h.isDirectory() ? _(p, E, null) : E.unlinkSync(p);
    } catch (N) {
      if (N.code === "ENOENT")
        return;
      if (N.code === "EPERM")
        return u ? n(p, E, N) : _(p, E, N);
      if (N.code !== "EISDIR")
        throw N;
      _(p, E, N);
    }
  }
  function _(p, E, h) {
    t(p), t(E);
    try {
      E.rmdirSync(p);
    } catch (N) {
      if (N.code === "ENOTDIR")
        throw h;
      if (N.code === "ENOTEMPTY" || N.code === "EEXIST" || N.code === "EPERM")
        d(p, E);
      else if (N.code !== "ENOENT")
        throw N;
    }
  }
  function d(p, E) {
    if (t(p), t(E), E.readdirSync(p).forEach((h) => l(f.join(p, h), E)), u) {
      const h = Date.now();
      do
        try {
          return E.rmdirSync(p, E);
        } catch {
        }
      while (Date.now() - h < 500);
    } else
      return E.rmdirSync(p, E);
  }
  return Ps = s, s.sync = l, Ps;
}
var Ds, Fl;
function kn() {
  if (Fl) return Ds;
  Fl = 1;
  const e = st(), f = ct().fromCallback, t = /* @__PURE__ */ f1();
  function u(s, a) {
    if (e.rm) return e.rm(s, { recursive: !0, force: !0 }, a);
    t(s, a);
  }
  function r(s) {
    if (e.rmSync) return e.rmSync(s, { recursive: !0, force: !0 });
    t.sync(s);
  }
  return Ds = {
    remove: f(u),
    removeSync: r
  }, Ds;
}
var Us, Ml;
function h1() {
  if (Ml) return Us;
  Ml = 1;
  const e = ct().fromPromise, f = /* @__PURE__ */ dr(), t = xe, u = /* @__PURE__ */ Rt(), r = /* @__PURE__ */ kn(), s = e(async function(n) {
    let c;
    try {
      c = await f.readdir(n);
    } catch {
      return u.mkdirs(n);
    }
    return Promise.all(c.map((i) => r.remove(t.join(n, i))));
  });
  function a(o) {
    let n;
    try {
      n = f.readdirSync(o);
    } catch {
      return u.mkdirsSync(o);
    }
    n.forEach((c) => {
      c = t.join(o, c), r.removeSync(c);
    });
  }
  return Us = {
    emptyDirSync: a,
    emptydirSync: a,
    emptyDir: s,
    emptydir: s
  }, Us;
}
var Ls, xl;
function d1() {
  if (xl) return Ls;
  xl = 1;
  const e = ct().fromCallback, f = xe, t = st(), u = /* @__PURE__ */ Rt();
  function r(a, o) {
    function n() {
      t.writeFile(a, "", (c) => {
        if (c) return o(c);
        o();
      });
    }
    t.stat(a, (c, i) => {
      if (!c && i.isFile()) return o();
      const l = f.dirname(a);
      t.stat(l, (_, d) => {
        if (_)
          return _.code === "ENOENT" ? u.mkdirs(l, (p) => {
            if (p) return o(p);
            n();
          }) : o(_);
        d.isDirectory() ? n() : t.readdir(l, (p) => {
          if (p) return o(p);
        });
      });
    });
  }
  function s(a) {
    let o;
    try {
      o = t.statSync(a);
    } catch {
    }
    if (o && o.isFile()) return;
    const n = f.dirname(a);
    try {
      t.statSync(n).isDirectory() || t.readdirSync(n);
    } catch (c) {
      if (c && c.code === "ENOENT") u.mkdirsSync(n);
      else throw c;
    }
    t.writeFileSync(a, "");
  }
  return Ls = {
    createFile: e(r),
    createFileSync: s
  }, Ls;
}
var bs, Bl;
function E1() {
  if (Bl) return bs;
  Bl = 1;
  const e = ct().fromCallback, f = xe, t = st(), u = /* @__PURE__ */ Rt(), r = tr().pathExists, { areIdentical: s } = /* @__PURE__ */ Er();
  function a(n, c, i) {
    function l(_, d) {
      t.link(_, d, (p) => {
        if (p) return i(p);
        i(null);
      });
    }
    t.lstat(c, (_, d) => {
      t.lstat(n, (p, E) => {
        if (p)
          return p.message = p.message.replace("lstat", "ensureLink"), i(p);
        if (d && s(E, d)) return i(null);
        const h = f.dirname(c);
        r(h, (N, A) => {
          if (N) return i(N);
          if (A) return l(n, c);
          u.mkdirs(h, (C) => {
            if (C) return i(C);
            l(n, c);
          });
        });
      });
    });
  }
  function o(n, c) {
    let i;
    try {
      i = t.lstatSync(c);
    } catch {
    }
    try {
      const d = t.lstatSync(n);
      if (i && s(d, i)) return;
    } catch (d) {
      throw d.message = d.message.replace("lstat", "ensureLink"), d;
    }
    const l = f.dirname(c);
    return t.existsSync(l) || u.mkdirsSync(l), t.linkSync(n, c);
  }
  return bs = {
    createLink: e(a),
    createLinkSync: o
  }, bs;
}
var ys, kl;
function A1() {
  if (kl) return ys;
  kl = 1;
  const e = xe, f = st(), t = tr().pathExists;
  function u(s, a, o) {
    if (e.isAbsolute(s))
      return f.lstat(s, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), o(n)) : o(null, {
        toCwd: s,
        toDst: s
      }));
    {
      const n = e.dirname(a), c = e.join(n, s);
      return t(c, (i, l) => i ? o(i) : l ? o(null, {
        toCwd: c,
        toDst: s
      }) : f.lstat(s, (_) => _ ? (_.message = _.message.replace("lstat", "ensureSymlink"), o(_)) : o(null, {
        toCwd: s,
        toDst: e.relative(n, s)
      })));
    }
  }
  function r(s, a) {
    let o;
    if (e.isAbsolute(s)) {
      if (o = f.existsSync(s), !o) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: s,
        toDst: s
      };
    } else {
      const n = e.dirname(a), c = e.join(n, s);
      if (o = f.existsSync(c), o)
        return {
          toCwd: c,
          toDst: s
        };
      if (o = f.existsSync(s), !o) throw new Error("relative srcpath does not exist");
      return {
        toCwd: s,
        toDst: e.relative(n, s)
      };
    }
  }
  return ys = {
    symlinkPaths: u,
    symlinkPathsSync: r
  }, ys;
}
var vs, Hl;
function p1() {
  if (Hl) return vs;
  Hl = 1;
  const e = st();
  function f(u, r, s) {
    if (s = typeof r == "function" ? r : s, r = typeof r == "function" ? !1 : r, r) return s(null, r);
    e.lstat(u, (a, o) => {
      if (a) return s(null, "file");
      r = o && o.isDirectory() ? "dir" : "file", s(null, r);
    });
  }
  function t(u, r) {
    let s;
    if (r) return r;
    try {
      s = e.lstatSync(u);
    } catch {
      return "file";
    }
    return s && s.isDirectory() ? "dir" : "file";
  }
  return vs = {
    symlinkType: f,
    symlinkTypeSync: t
  }, vs;
}
var Fs, Gl;
function I1() {
  if (Gl) return Fs;
  Gl = 1;
  const e = ct().fromCallback, f = xe, t = /* @__PURE__ */ dr(), u = /* @__PURE__ */ Rt(), r = u.mkdirs, s = u.mkdirsSync, a = /* @__PURE__ */ A1(), o = a.symlinkPaths, n = a.symlinkPathsSync, c = /* @__PURE__ */ p1(), i = c.symlinkType, l = c.symlinkTypeSync, _ = tr().pathExists, { areIdentical: d } = /* @__PURE__ */ Er();
  function p(N, A, C, g) {
    g = typeof C == "function" ? C : g, C = typeof C == "function" ? !1 : C, t.lstat(A, (L, R) => {
      !L && R.isSymbolicLink() ? Promise.all([
        t.stat(N),
        t.stat(A)
      ]).then(([O, D]) => {
        if (d(O, D)) return g(null);
        E(N, A, C, g);
      }) : E(N, A, C, g);
    });
  }
  function E(N, A, C, g) {
    o(N, A, (L, R) => {
      if (L) return g(L);
      N = R.toDst, i(R.toCwd, C, (O, D) => {
        if (O) return g(O);
        const m = f.dirname(A);
        _(m, (B, v) => {
          if (B) return g(B);
          if (v) return t.symlink(N, A, D, g);
          r(m, (M) => {
            if (M) return g(M);
            t.symlink(N, A, D, g);
          });
        });
      });
    });
  }
  function h(N, A, C) {
    let g;
    try {
      g = t.lstatSync(A);
    } catch {
    }
    if (g && g.isSymbolicLink()) {
      const D = t.statSync(N), m = t.statSync(A);
      if (d(D, m)) return;
    }
    const L = n(N, A);
    N = L.toDst, C = l(L.toCwd, C);
    const R = f.dirname(A);
    return t.existsSync(R) || s(R), t.symlinkSync(N, A, C);
  }
  return Fs = {
    createSymlink: e(p),
    createSymlinkSync: h
  }, Fs;
}
var Ms, ql;
function N1() {
  if (ql) return Ms;
  ql = 1;
  const { createFile: e, createFileSync: f } = /* @__PURE__ */ d1(), { createLink: t, createLinkSync: u } = /* @__PURE__ */ E1(), { createSymlink: r, createSymlinkSync: s } = /* @__PURE__ */ I1();
  return Ms = {
    // file
    createFile: e,
    createFileSync: f,
    ensureFile: e,
    ensureFileSync: f,
    // link
    createLink: t,
    createLinkSync: u,
    ensureLink: t,
    ensureLinkSync: u,
    // symlink
    createSymlink: r,
    createSymlinkSync: s,
    ensureSymlink: r,
    ensureSymlinkSync: s
  }, Ms;
}
var xs, $l;
function zo() {
  if ($l) return xs;
  $l = 1;
  function e(t, { EOL: u = `
`, finalEOL: r = !0, replacer: s = null, spaces: a } = {}) {
    const o = r ? u : "";
    return JSON.stringify(t, s, a).replace(/\n/g, u) + o;
  }
  function f(t) {
    return Buffer.isBuffer(t) && (t = t.toString("utf8")), t.replace(/^\uFEFF/, "");
  }
  return xs = { stringify: e, stripBom: f }, xs;
}
var Bs, Vl;
function S1() {
  if (Vl) return Bs;
  Vl = 1;
  let e;
  try {
    e = st();
  } catch {
    e = ze;
  }
  const f = ct(), { stringify: t, stripBom: u } = zo();
  async function r(l, _ = {}) {
    typeof _ == "string" && (_ = { encoding: _ });
    const d = _.fs || e, p = "throws" in _ ? _.throws : !0;
    let E = await f.fromCallback(d.readFile)(l, _);
    E = u(E);
    let h;
    try {
      h = JSON.parse(E, _ ? _.reviver : null);
    } catch (N) {
      if (p)
        throw N.message = `${l}: ${N.message}`, N;
      return null;
    }
    return h;
  }
  const s = f.fromPromise(r);
  function a(l, _ = {}) {
    typeof _ == "string" && (_ = { encoding: _ });
    const d = _.fs || e, p = "throws" in _ ? _.throws : !0;
    try {
      let E = d.readFileSync(l, _);
      return E = u(E), JSON.parse(E, _.reviver);
    } catch (E) {
      if (p)
        throw E.message = `${l}: ${E.message}`, E;
      return null;
    }
  }
  async function o(l, _, d = {}) {
    const p = d.fs || e, E = t(_, d);
    await f.fromCallback(p.writeFile)(l, E, d);
  }
  const n = f.fromPromise(o);
  function c(l, _, d = {}) {
    const p = d.fs || e, E = t(_, d);
    return p.writeFileSync(l, E, d);
  }
  return Bs = {
    readFile: s,
    readFileSync: a,
    writeFile: n,
    writeFileSync: c
  }, Bs;
}
var ks, Wl;
function R1() {
  if (Wl) return ks;
  Wl = 1;
  const e = S1();
  return ks = {
    // jsonfile exports
    readJson: e.readFile,
    readJsonSync: e.readFileSync,
    writeJson: e.writeFile,
    writeJsonSync: e.writeFileSync
  }, ks;
}
var Hs, jl;
function Xo() {
  if (jl) return Hs;
  jl = 1;
  const e = ct().fromCallback, f = st(), t = xe, u = /* @__PURE__ */ Rt(), r = tr().pathExists;
  function s(o, n, c, i) {
    typeof c == "function" && (i = c, c = "utf8");
    const l = t.dirname(o);
    r(l, (_, d) => {
      if (_) return i(_);
      if (d) return f.writeFile(o, n, c, i);
      u.mkdirs(l, (p) => {
        if (p) return i(p);
        f.writeFile(o, n, c, i);
      });
    });
  }
  function a(o, ...n) {
    const c = t.dirname(o);
    if (f.existsSync(c))
      return f.writeFileSync(o, ...n);
    u.mkdirsSync(c), f.writeFileSync(o, ...n);
  }
  return Hs = {
    outputFile: e(s),
    outputFileSync: a
  }, Hs;
}
var Gs, Yl;
function C1() {
  if (Yl) return Gs;
  Yl = 1;
  const { stringify: e } = zo(), { outputFile: f } = /* @__PURE__ */ Xo();
  async function t(u, r, s = {}) {
    const a = e(r, s);
    await f(u, a, s);
  }
  return Gs = t, Gs;
}
var qs, Kl;
function T1() {
  if (Kl) return qs;
  Kl = 1;
  const { stringify: e } = zo(), { outputFileSync: f } = /* @__PURE__ */ Xo();
  function t(u, r, s) {
    const a = e(r, s);
    f(u, a, s);
  }
  return qs = t, qs;
}
var $s, zl;
function g1() {
  if (zl) return $s;
  zl = 1;
  const e = ct().fromPromise, f = /* @__PURE__ */ R1();
  return f.outputJson = e(/* @__PURE__ */ C1()), f.outputJsonSync = /* @__PURE__ */ T1(), f.outputJSON = f.outputJson, f.outputJSONSync = f.outputJsonSync, f.writeJSON = f.writeJson, f.writeJSONSync = f.writeJsonSync, f.readJSON = f.readJson, f.readJSONSync = f.readJsonSync, $s = f, $s;
}
var Vs, Xl;
function m1() {
  if (Xl) return Vs;
  Xl = 1;
  const e = st(), f = xe, t = Ko().copy, u = kn().remove, r = Rt().mkdirp, s = tr().pathExists, a = /* @__PURE__ */ Er();
  function o(_, d, p, E) {
    typeof p == "function" && (E = p, p = {}), p = p || {};
    const h = p.overwrite || p.clobber || !1;
    a.checkPaths(_, d, "move", p, (N, A) => {
      if (N) return E(N);
      const { srcStat: C, isChangingCase: g = !1 } = A;
      a.checkParentPaths(_, C, d, "move", (L) => {
        if (L) return E(L);
        if (n(d)) return c(_, d, h, g, E);
        r(f.dirname(d), (R) => R ? E(R) : c(_, d, h, g, E));
      });
    });
  }
  function n(_) {
    const d = f.dirname(_);
    return f.parse(d).root === d;
  }
  function c(_, d, p, E, h) {
    if (E) return i(_, d, p, h);
    if (p)
      return u(d, (N) => N ? h(N) : i(_, d, p, h));
    s(d, (N, A) => N ? h(N) : A ? h(new Error("dest already exists.")) : i(_, d, p, h));
  }
  function i(_, d, p, E) {
    e.rename(_, d, (h) => h ? h.code !== "EXDEV" ? E(h) : l(_, d, p, E) : E());
  }
  function l(_, d, p, E) {
    t(_, d, {
      overwrite: p,
      errorOnExist: !0
    }, (N) => N ? E(N) : u(_, E));
  }
  return Vs = o, Vs;
}
var Ws, Ql;
function O1() {
  if (Ql) return Ws;
  Ql = 1;
  const e = st(), f = xe, t = Ko().copySync, u = kn().removeSync, r = Rt().mkdirpSync, s = /* @__PURE__ */ Er();
  function a(l, _, d) {
    d = d || {};
    const p = d.overwrite || d.clobber || !1, { srcStat: E, isChangingCase: h = !1 } = s.checkPathsSync(l, _, "move", d);
    return s.checkParentPathsSync(l, E, _, "move"), o(_) || r(f.dirname(_)), n(l, _, p, h);
  }
  function o(l) {
    const _ = f.dirname(l);
    return f.parse(_).root === _;
  }
  function n(l, _, d, p) {
    if (p) return c(l, _, d);
    if (d)
      return u(_), c(l, _, d);
    if (e.existsSync(_)) throw new Error("dest already exists.");
    return c(l, _, d);
  }
  function c(l, _, d) {
    try {
      e.renameSync(l, _);
    } catch (p) {
      if (p.code !== "EXDEV") throw p;
      return i(l, _, d);
    }
  }
  function i(l, _, d) {
    return t(l, _, {
      overwrite: d,
      errorOnExist: !0
    }), u(l);
  }
  return Ws = a, Ws;
}
var js, Jl;
function w1() {
  if (Jl) return js;
  Jl = 1;
  const e = ct().fromCallback;
  return js = {
    move: e(/* @__PURE__ */ m1()),
    moveSync: /* @__PURE__ */ O1()
  }, js;
}
var Ys, Zl;
function qt() {
  return Zl || (Zl = 1, Ys = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ dr(),
    // Export extra methods:
    .../* @__PURE__ */ Ko(),
    .../* @__PURE__ */ h1(),
    .../* @__PURE__ */ N1(),
    .../* @__PURE__ */ g1(),
    .../* @__PURE__ */ Rt(),
    .../* @__PURE__ */ w1(),
    .../* @__PURE__ */ Xo(),
    .../* @__PURE__ */ tr(),
    .../* @__PURE__ */ kn()
  }), Ys;
}
var Pr = {}, Xt = {}, rt = {}, mn = {}, bt = {}, e_;
function en() {
  if (e_) return bt;
  e_ = 1;
  function e(a) {
    return typeof a > "u" || a === null;
  }
  function f(a) {
    return typeof a == "object" && a !== null;
  }
  function t(a) {
    return Array.isArray(a) ? a : e(a) ? [] : [a];
  }
  function u(a, o) {
    var n, c, i, l;
    if (o)
      for (l = Object.keys(o), n = 0, c = l.length; n < c; n += 1)
        i = l[n], a[i] = o[i];
    return a;
  }
  function r(a, o) {
    var n = "", c;
    for (c = 0; c < o; c += 1)
      n += a;
    return n;
  }
  function s(a) {
    return a === 0 && Number.NEGATIVE_INFINITY === 1 / a;
  }
  return bt.isNothing = e, bt.isObject = f, bt.toArray = t, bt.repeat = r, bt.isNegativeZero = s, bt.extend = u, bt;
}
var Ks, t_;
function tn() {
  if (t_) return Ks;
  t_ = 1;
  function e(t, u) {
    var r = "", s = t.reason || "(unknown reason)";
    return t.mark ? (t.mark.name && (r += 'in "' + t.mark.name + '" '), r += "(" + (t.mark.line + 1) + ":" + (t.mark.column + 1) + ")", !u && t.mark.snippet && (r += `

` + t.mark.snippet), s + " " + r) : s;
  }
  function f(t, u) {
    Error.call(this), this.name = "YAMLException", this.reason = t, this.mark = u, this.message = e(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return f.prototype = Object.create(Error.prototype), f.prototype.constructor = f, f.prototype.toString = function(u) {
    return this.name + ": " + e(this, u);
  }, Ks = f, Ks;
}
var zs, r_;
function P1() {
  if (r_) return zs;
  r_ = 1;
  var e = en();
  function f(r, s, a, o, n) {
    var c = "", i = "", l = Math.floor(n / 2) - 1;
    return o - s > l && (c = " ... ", s = o - l + c.length), a - o > l && (i = " ...", a = o + l - i.length), {
      str: c + r.slice(s, a).replace(/\t/g, "→") + i,
      pos: o - s + c.length
      // relative position
    };
  }
  function t(r, s) {
    return e.repeat(" ", s - r.length) + r;
  }
  function u(r, s) {
    if (s = Object.create(s || null), !r.buffer) return null;
    s.maxLength || (s.maxLength = 79), typeof s.indent != "number" && (s.indent = 1), typeof s.linesBefore != "number" && (s.linesBefore = 3), typeof s.linesAfter != "number" && (s.linesAfter = 2);
    for (var a = /\r?\n|\r|\0/g, o = [0], n = [], c, i = -1; c = a.exec(r.buffer); )
      n.push(c.index), o.push(c.index + c[0].length), r.position <= c.index && i < 0 && (i = o.length - 2);
    i < 0 && (i = o.length - 1);
    var l = "", _, d, p = Math.min(r.line + s.linesAfter, n.length).toString().length, E = s.maxLength - (s.indent + p + 3);
    for (_ = 1; _ <= s.linesBefore && !(i - _ < 0); _++)
      d = f(
        r.buffer,
        o[i - _],
        n[i - _],
        r.position - (o[i] - o[i - _]),
        E
      ), l = e.repeat(" ", s.indent) + t((r.line - _ + 1).toString(), p) + " | " + d.str + `
` + l;
    for (d = f(r.buffer, o[i], n[i], r.position, E), l += e.repeat(" ", s.indent) + t((r.line + 1).toString(), p) + " | " + d.str + `
`, l += e.repeat("-", s.indent + p + 3 + d.pos) + `^
`, _ = 1; _ <= s.linesAfter && !(i + _ >= n.length); _++)
      d = f(
        r.buffer,
        o[i + _],
        n[i + _],
        r.position - (o[i] - o[i + _]),
        E
      ), l += e.repeat(" ", s.indent) + t((r.line + _ + 1).toString(), p) + " | " + d.str + `
`;
    return l.replace(/\n$/, "");
  }
  return zs = u, zs;
}
var Xs, n_;
function nt() {
  if (n_) return Xs;
  n_ = 1;
  var e = tn(), f = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ], t = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function u(s) {
    var a = {};
    return s !== null && Object.keys(s).forEach(function(o) {
      s[o].forEach(function(n) {
        a[String(n)] = o;
      });
    }), a;
  }
  function r(s, a) {
    if (a = a || {}, Object.keys(a).forEach(function(o) {
      if (f.indexOf(o) === -1)
        throw new e('Unknown option "' + o + '" is met in definition of "' + s + '" YAML type.');
    }), this.options = a, this.tag = s, this.kind = a.kind || null, this.resolve = a.resolve || function() {
      return !0;
    }, this.construct = a.construct || function(o) {
      return o;
    }, this.instanceOf = a.instanceOf || null, this.predicate = a.predicate || null, this.represent = a.represent || null, this.representName = a.representName || null, this.defaultStyle = a.defaultStyle || null, this.multi = a.multi || !1, this.styleAliases = u(a.styleAliases || null), t.indexOf(this.kind) === -1)
      throw new e('Unknown kind "' + this.kind + '" is specified for "' + s + '" YAML type.');
  }
  return Xs = r, Xs;
}
var Qs, i_;
function e0() {
  if (i_) return Qs;
  i_ = 1;
  var e = tn(), f = nt();
  function t(s, a) {
    var o = [];
    return s[a].forEach(function(n) {
      var c = o.length;
      o.forEach(function(i, l) {
        i.tag === n.tag && i.kind === n.kind && i.multi === n.multi && (c = l);
      }), o[c] = n;
    }), o;
  }
  function u() {
    var s = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: {
        scalar: [],
        sequence: [],
        mapping: [],
        fallback: []
      }
    }, a, o;
    function n(c) {
      c.multi ? (s.multi[c.kind].push(c), s.multi.fallback.push(c)) : s[c.kind][c.tag] = s.fallback[c.tag] = c;
    }
    for (a = 0, o = arguments.length; a < o; a += 1)
      arguments[a].forEach(n);
    return s;
  }
  function r(s) {
    return this.extend(s);
  }
  return r.prototype.extend = function(a) {
    var o = [], n = [];
    if (a instanceof f)
      n.push(a);
    else if (Array.isArray(a))
      n = n.concat(a);
    else if (a && (Array.isArray(a.implicit) || Array.isArray(a.explicit)))
      a.implicit && (o = o.concat(a.implicit)), a.explicit && (n = n.concat(a.explicit));
    else
      throw new e("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    o.forEach(function(i) {
      if (!(i instanceof f))
        throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (i.loadKind && i.loadKind !== "scalar")
        throw new e("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (i.multi)
        throw new e("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), n.forEach(function(i) {
      if (!(i instanceof f))
        throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var c = Object.create(r.prototype);
    return c.implicit = (this.implicit || []).concat(o), c.explicit = (this.explicit || []).concat(n), c.compiledImplicit = t(c, "implicit"), c.compiledExplicit = t(c, "explicit"), c.compiledTypeMap = u(c.compiledImplicit, c.compiledExplicit), c;
  }, Qs = r, Qs;
}
var Js, s_;
function t0() {
  if (s_) return Js;
  s_ = 1;
  var e = nt();
  return Js = new e("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(f) {
      return f !== null ? f : "";
    }
  }), Js;
}
var Zs, a_;
function r0() {
  if (a_) return Zs;
  a_ = 1;
  var e = nt();
  return Zs = new e("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(f) {
      return f !== null ? f : [];
    }
  }), Zs;
}
var ea, o_;
function n0() {
  if (o_) return ea;
  o_ = 1;
  var e = nt();
  return ea = new e("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(f) {
      return f !== null ? f : {};
    }
  }), ea;
}
var ta, c_;
function i0() {
  if (c_) return ta;
  c_ = 1;
  var e = e0();
  return ta = new e({
    explicit: [
      t0(),
      r0(),
      n0()
    ]
  }), ta;
}
var ra, u_;
function s0() {
  if (u_) return ra;
  u_ = 1;
  var e = nt();
  function f(r) {
    if (r === null) return !0;
    var s = r.length;
    return s === 1 && r === "~" || s === 4 && (r === "null" || r === "Null" || r === "NULL");
  }
  function t() {
    return null;
  }
  function u(r) {
    return r === null;
  }
  return ra = new e("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: f,
    construct: t,
    predicate: u,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      },
      empty: function() {
        return "";
      }
    },
    defaultStyle: "lowercase"
  }), ra;
}
var na, l_;
function a0() {
  if (l_) return na;
  l_ = 1;
  var e = nt();
  function f(r) {
    if (r === null) return !1;
    var s = r.length;
    return s === 4 && (r === "true" || r === "True" || r === "TRUE") || s === 5 && (r === "false" || r === "False" || r === "FALSE");
  }
  function t(r) {
    return r === "true" || r === "True" || r === "TRUE";
  }
  function u(r) {
    return Object.prototype.toString.call(r) === "[object Boolean]";
  }
  return na = new e("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: f,
    construct: t,
    predicate: u,
    represent: {
      lowercase: function(r) {
        return r ? "true" : "false";
      },
      uppercase: function(r) {
        return r ? "TRUE" : "FALSE";
      },
      camelcase: function(r) {
        return r ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), na;
}
var ia, __;
function o0() {
  if (__) return ia;
  __ = 1;
  var e = en(), f = nt();
  function t(n) {
    return 48 <= n && n <= 57 || 65 <= n && n <= 70 || 97 <= n && n <= 102;
  }
  function u(n) {
    return 48 <= n && n <= 55;
  }
  function r(n) {
    return 48 <= n && n <= 57;
  }
  function s(n) {
    if (n === null) return !1;
    var c = n.length, i = 0, l = !1, _;
    if (!c) return !1;
    if (_ = n[i], (_ === "-" || _ === "+") && (_ = n[++i]), _ === "0") {
      if (i + 1 === c) return !0;
      if (_ = n[++i], _ === "b") {
        for (i++; i < c; i++)
          if (_ = n[i], _ !== "_") {
            if (_ !== "0" && _ !== "1") return !1;
            l = !0;
          }
        return l && _ !== "_";
      }
      if (_ === "x") {
        for (i++; i < c; i++)
          if (_ = n[i], _ !== "_") {
            if (!t(n.charCodeAt(i))) return !1;
            l = !0;
          }
        return l && _ !== "_";
      }
      if (_ === "o") {
        for (i++; i < c; i++)
          if (_ = n[i], _ !== "_") {
            if (!u(n.charCodeAt(i))) return !1;
            l = !0;
          }
        return l && _ !== "_";
      }
    }
    if (_ === "_") return !1;
    for (; i < c; i++)
      if (_ = n[i], _ !== "_") {
        if (!r(n.charCodeAt(i)))
          return !1;
        l = !0;
      }
    return !(!l || _ === "_");
  }
  function a(n) {
    var c = n, i = 1, l;
    if (c.indexOf("_") !== -1 && (c = c.replace(/_/g, "")), l = c[0], (l === "-" || l === "+") && (l === "-" && (i = -1), c = c.slice(1), l = c[0]), c === "0") return 0;
    if (l === "0") {
      if (c[1] === "b") return i * parseInt(c.slice(2), 2);
      if (c[1] === "x") return i * parseInt(c.slice(2), 16);
      if (c[1] === "o") return i * parseInt(c.slice(2), 8);
    }
    return i * parseInt(c, 10);
  }
  function o(n) {
    return Object.prototype.toString.call(n) === "[object Number]" && n % 1 === 0 && !e.isNegativeZero(n);
  }
  return ia = new f("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: s,
    construct: a,
    predicate: o,
    represent: {
      binary: function(n) {
        return n >= 0 ? "0b" + n.toString(2) : "-0b" + n.toString(2).slice(1);
      },
      octal: function(n) {
        return n >= 0 ? "0o" + n.toString(8) : "-0o" + n.toString(8).slice(1);
      },
      decimal: function(n) {
        return n.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(n) {
        return n >= 0 ? "0x" + n.toString(16).toUpperCase() : "-0x" + n.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), ia;
}
var sa, f_;
function c0() {
  if (f_) return sa;
  f_ = 1;
  var e = en(), f = nt(), t = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function u(n) {
    return !(n === null || !t.test(n) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    n[n.length - 1] === "_");
  }
  function r(n) {
    var c, i;
    return c = n.replace(/_/g, "").toLowerCase(), i = c[0] === "-" ? -1 : 1, "+-".indexOf(c[0]) >= 0 && (c = c.slice(1)), c === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : c === ".nan" ? NaN : i * parseFloat(c, 10);
  }
  var s = /^[-+]?[0-9]+e/;
  function a(n, c) {
    var i;
    if (isNaN(n))
      switch (c) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === n)
      switch (c) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === n)
      switch (c) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (e.isNegativeZero(n))
      return "-0.0";
    return i = n.toString(10), s.test(i) ? i.replace("e", ".e") : i;
  }
  function o(n) {
    return Object.prototype.toString.call(n) === "[object Number]" && (n % 1 !== 0 || e.isNegativeZero(n));
  }
  return sa = new f("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: u,
    construct: r,
    predicate: o,
    represent: a,
    defaultStyle: "lowercase"
  }), sa;
}
var aa, h_;
function u0() {
  return h_ || (h_ = 1, aa = i0().extend({
    implicit: [
      s0(),
      a0(),
      o0(),
      c0()
    ]
  })), aa;
}
var oa, d_;
function l0() {
  return d_ || (d_ = 1, oa = u0()), oa;
}
var ca, E_;
function _0() {
  if (E_) return ca;
  E_ = 1;
  var e = nt(), f = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), t = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function u(a) {
    return a === null ? !1 : f.exec(a) !== null || t.exec(a) !== null;
  }
  function r(a) {
    var o, n, c, i, l, _, d, p = 0, E = null, h, N, A;
    if (o = f.exec(a), o === null && (o = t.exec(a)), o === null) throw new Error("Date resolve error");
    if (n = +o[1], c = +o[2] - 1, i = +o[3], !o[4])
      return new Date(Date.UTC(n, c, i));
    if (l = +o[4], _ = +o[5], d = +o[6], o[7]) {
      for (p = o[7].slice(0, 3); p.length < 3; )
        p += "0";
      p = +p;
    }
    return o[9] && (h = +o[10], N = +(o[11] || 0), E = (h * 60 + N) * 6e4, o[9] === "-" && (E = -E)), A = new Date(Date.UTC(n, c, i, l, _, d, p)), E && A.setTime(A.getTime() - E), A;
  }
  function s(a) {
    return a.toISOString();
  }
  return ca = new e("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: u,
    construct: r,
    instanceOf: Date,
    represent: s
  }), ca;
}
var ua, A_;
function f0() {
  if (A_) return ua;
  A_ = 1;
  var e = nt();
  function f(t) {
    return t === "<<" || t === null;
  }
  return ua = new e("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: f
  }), ua;
}
var la, p_;
function h0() {
  if (p_) return la;
  p_ = 1;
  var e = nt(), f = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function t(a) {
    if (a === null) return !1;
    var o, n, c = 0, i = a.length, l = f;
    for (n = 0; n < i; n++)
      if (o = l.indexOf(a.charAt(n)), !(o > 64)) {
        if (o < 0) return !1;
        c += 6;
      }
    return c % 8 === 0;
  }
  function u(a) {
    var o, n, c = a.replace(/[\r\n=]/g, ""), i = c.length, l = f, _ = 0, d = [];
    for (o = 0; o < i; o++)
      o % 4 === 0 && o && (d.push(_ >> 16 & 255), d.push(_ >> 8 & 255), d.push(_ & 255)), _ = _ << 6 | l.indexOf(c.charAt(o));
    return n = i % 4 * 6, n === 0 ? (d.push(_ >> 16 & 255), d.push(_ >> 8 & 255), d.push(_ & 255)) : n === 18 ? (d.push(_ >> 10 & 255), d.push(_ >> 2 & 255)) : n === 12 && d.push(_ >> 4 & 255), new Uint8Array(d);
  }
  function r(a) {
    var o = "", n = 0, c, i, l = a.length, _ = f;
    for (c = 0; c < l; c++)
      c % 3 === 0 && c && (o += _[n >> 18 & 63], o += _[n >> 12 & 63], o += _[n >> 6 & 63], o += _[n & 63]), n = (n << 8) + a[c];
    return i = l % 3, i === 0 ? (o += _[n >> 18 & 63], o += _[n >> 12 & 63], o += _[n >> 6 & 63], o += _[n & 63]) : i === 2 ? (o += _[n >> 10 & 63], o += _[n >> 4 & 63], o += _[n << 2 & 63], o += _[64]) : i === 1 && (o += _[n >> 2 & 63], o += _[n << 4 & 63], o += _[64], o += _[64]), o;
  }
  function s(a) {
    return Object.prototype.toString.call(a) === "[object Uint8Array]";
  }
  return la = new e("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: t,
    construct: u,
    predicate: s,
    represent: r
  }), la;
}
var _a, I_;
function d0() {
  if (I_) return _a;
  I_ = 1;
  var e = nt(), f = Object.prototype.hasOwnProperty, t = Object.prototype.toString;
  function u(s) {
    if (s === null) return !0;
    var a = [], o, n, c, i, l, _ = s;
    for (o = 0, n = _.length; o < n; o += 1) {
      if (c = _[o], l = !1, t.call(c) !== "[object Object]") return !1;
      for (i in c)
        if (f.call(c, i))
          if (!l) l = !0;
          else return !1;
      if (!l) return !1;
      if (a.indexOf(i) === -1) a.push(i);
      else return !1;
    }
    return !0;
  }
  function r(s) {
    return s !== null ? s : [];
  }
  return _a = new e("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: u,
    construct: r
  }), _a;
}
var fa, N_;
function E0() {
  if (N_) return fa;
  N_ = 1;
  var e = nt(), f = Object.prototype.toString;
  function t(r) {
    if (r === null) return !0;
    var s, a, o, n, c, i = r;
    for (c = new Array(i.length), s = 0, a = i.length; s < a; s += 1) {
      if (o = i[s], f.call(o) !== "[object Object]" || (n = Object.keys(o), n.length !== 1)) return !1;
      c[s] = [n[0], o[n[0]]];
    }
    return !0;
  }
  function u(r) {
    if (r === null) return [];
    var s, a, o, n, c, i = r;
    for (c = new Array(i.length), s = 0, a = i.length; s < a; s += 1)
      o = i[s], n = Object.keys(o), c[s] = [n[0], o[n[0]]];
    return c;
  }
  return fa = new e("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: t,
    construct: u
  }), fa;
}
var ha, S_;
function A0() {
  if (S_) return ha;
  S_ = 1;
  var e = nt(), f = Object.prototype.hasOwnProperty;
  function t(r) {
    if (r === null) return !0;
    var s, a = r;
    for (s in a)
      if (f.call(a, s) && a[s] !== null)
        return !1;
    return !0;
  }
  function u(r) {
    return r !== null ? r : {};
  }
  return ha = new e("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: t,
    construct: u
  }), ha;
}
var da, R_;
function Qo() {
  return R_ || (R_ = 1, da = l0().extend({
    implicit: [
      _0(),
      f0()
    ],
    explicit: [
      h0(),
      d0(),
      E0(),
      A0()
    ]
  })), da;
}
var C_;
function D1() {
  if (C_) return mn;
  C_ = 1;
  var e = en(), f = tn(), t = P1(), u = Qo(), r = Object.prototype.hasOwnProperty, s = 1, a = 2, o = 3, n = 4, c = 1, i = 2, l = 3, _ = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, d = /[\x85\u2028\u2029]/, p = /[,\[\]\{\}]/, E = /^(?:!|!!|![a-z\-]+!)$/i, h = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function N(S) {
    return Object.prototype.toString.call(S);
  }
  function A(S) {
    return S === 10 || S === 13;
  }
  function C(S) {
    return S === 9 || S === 32;
  }
  function g(S) {
    return S === 9 || S === 32 || S === 10 || S === 13;
  }
  function L(S) {
    return S === 44 || S === 91 || S === 93 || S === 123 || S === 125;
  }
  function R(S) {
    var ne;
    return 48 <= S && S <= 57 ? S - 48 : (ne = S | 32, 97 <= ne && ne <= 102 ? ne - 97 + 10 : -1);
  }
  function O(S) {
    return S === 120 ? 2 : S === 117 ? 4 : S === 85 ? 8 : 0;
  }
  function D(S) {
    return 48 <= S && S <= 57 ? S - 48 : -1;
  }
  function m(S) {
    return S === 48 ? "\0" : S === 97 ? "\x07" : S === 98 ? "\b" : S === 116 || S === 9 ? "	" : S === 110 ? `
` : S === 118 ? "\v" : S === 102 ? "\f" : S === 114 ? "\r" : S === 101 ? "\x1B" : S === 32 ? " " : S === 34 ? '"' : S === 47 ? "/" : S === 92 ? "\\" : S === 78 ? "" : S === 95 ? " " : S === 76 ? "\u2028" : S === 80 ? "\u2029" : "";
  }
  function B(S) {
    return S <= 65535 ? String.fromCharCode(S) : String.fromCharCode(
      (S - 65536 >> 10) + 55296,
      (S - 65536 & 1023) + 56320
    );
  }
  for (var v = new Array(256), M = new Array(256), F = 0; F < 256; F++)
    v[F] = m(F) ? 1 : 0, M[F] = m(F);
  function I(S, ne) {
    this.input = S, this.filename = ne.filename || null, this.schema = ne.schema || u, this.onWarning = ne.onWarning || null, this.legacy = ne.legacy || !1, this.json = ne.json || !1, this.listener = ne.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = S.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function w(S, ne) {
    var ce = {
      name: S.filename,
      buffer: S.input.slice(0, -1),
      // omit trailing \0
      position: S.position,
      line: S.line,
      column: S.position - S.lineStart
    };
    return ce.snippet = t(ce), new f(ne, ce);
  }
  function x(S, ne) {
    throw w(S, ne);
  }
  function V(S, ne) {
    S.onWarning && S.onWarning.call(null, w(S, ne));
  }
  var z = {
    YAML: function(ne, ce, Te) {
      var ie, q, H;
      ne.version !== null && x(ne, "duplication of %YAML directive"), Te.length !== 1 && x(ne, "YAML directive accepts exactly one argument"), ie = /^([0-9]+)\.([0-9]+)$/.exec(Te[0]), ie === null && x(ne, "ill-formed argument of the YAML directive"), q = parseInt(ie[1], 10), H = parseInt(ie[2], 10), q !== 1 && x(ne, "unacceptable YAML version of the document"), ne.version = Te[0], ne.checkLineBreaks = H < 2, H !== 1 && H !== 2 && V(ne, "unsupported YAML version of the document");
    },
    TAG: function(ne, ce, Te) {
      var ie, q;
      Te.length !== 2 && x(ne, "TAG directive accepts exactly two arguments"), ie = Te[0], q = Te[1], E.test(ie) || x(ne, "ill-formed tag handle (first argument) of the TAG directive"), r.call(ne.tagMap, ie) && x(ne, 'there is a previously declared suffix for "' + ie + '" tag handle'), h.test(q) || x(ne, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        q = decodeURIComponent(q);
      } catch {
        x(ne, "tag prefix is malformed: " + q);
      }
      ne.tagMap[ie] = q;
    }
  };
  function j(S, ne, ce, Te) {
    var ie, q, H, Y;
    if (ne < ce) {
      if (Y = S.input.slice(ne, ce), Te)
        for (ie = 0, q = Y.length; ie < q; ie += 1)
          H = Y.charCodeAt(ie), H === 9 || 32 <= H && H <= 1114111 || x(S, "expected valid JSON character");
      else _.test(Y) && x(S, "the stream contains non-printable characters");
      S.result += Y;
    }
  }
  function J(S, ne, ce, Te) {
    var ie, q, H, Y;
    for (e.isObject(ce) || x(S, "cannot merge mappings; the provided source object is unacceptable"), ie = Object.keys(ce), H = 0, Y = ie.length; H < Y; H += 1)
      q = ie[H], r.call(ne, q) || (ne[q] = ce[q], Te[q] = !0);
  }
  function fe(S, ne, ce, Te, ie, q, H, Y, te) {
    var ee, ae;
    if (Array.isArray(ie))
      for (ie = Array.prototype.slice.call(ie), ee = 0, ae = ie.length; ee < ae; ee += 1)
        Array.isArray(ie[ee]) && x(S, "nested arrays are not supported inside keys"), typeof ie == "object" && N(ie[ee]) === "[object Object]" && (ie[ee] = "[object Object]");
    if (typeof ie == "object" && N(ie) === "[object Object]" && (ie = "[object Object]"), ie = String(ie), ne === null && (ne = {}), Te === "tag:yaml.org,2002:merge")
      if (Array.isArray(q))
        for (ee = 0, ae = q.length; ee < ae; ee += 1)
          J(S, ne, q[ee], ce);
      else
        J(S, ne, q, ce);
    else
      !S.json && !r.call(ce, ie) && r.call(ne, ie) && (S.line = H || S.line, S.lineStart = Y || S.lineStart, S.position = te || S.position, x(S, "duplicated mapping key")), ie === "__proto__" ? Object.defineProperty(ne, ie, {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        value: q
      }) : ne[ie] = q, delete ce[ie];
    return ne;
  }
  function Ce(S) {
    var ne;
    ne = S.input.charCodeAt(S.position), ne === 10 ? S.position++ : ne === 13 ? (S.position++, S.input.charCodeAt(S.position) === 10 && S.position++) : x(S, "a line break is expected"), S.line += 1, S.lineStart = S.position, S.firstTabInLine = -1;
  }
  function b(S, ne, ce) {
    for (var Te = 0, ie = S.input.charCodeAt(S.position); ie !== 0; ) {
      for (; C(ie); )
        ie === 9 && S.firstTabInLine === -1 && (S.firstTabInLine = S.position), ie = S.input.charCodeAt(++S.position);
      if (ne && ie === 35)
        do
          ie = S.input.charCodeAt(++S.position);
        while (ie !== 10 && ie !== 13 && ie !== 0);
      if (A(ie))
        for (Ce(S), ie = S.input.charCodeAt(S.position), Te++, S.lineIndent = 0; ie === 32; )
          S.lineIndent++, ie = S.input.charCodeAt(++S.position);
      else
        break;
    }
    return ce !== -1 && Te !== 0 && S.lineIndent < ce && V(S, "deficient indentation"), Te;
  }
  function k(S) {
    var ne = S.position, ce;
    return ce = S.input.charCodeAt(ne), !!((ce === 45 || ce === 46) && ce === S.input.charCodeAt(ne + 1) && ce === S.input.charCodeAt(ne + 2) && (ne += 3, ce = S.input.charCodeAt(ne), ce === 0 || g(ce)));
  }
  function W(S, ne) {
    ne === 1 ? S.result += " " : ne > 1 && (S.result += e.repeat(`
`, ne - 1));
  }
  function X(S, ne, ce) {
    var Te, ie, q, H, Y, te, ee, ae, ue = S.kind, pe = S.result, y;
    if (y = S.input.charCodeAt(S.position), g(y) || L(y) || y === 35 || y === 38 || y === 42 || y === 33 || y === 124 || y === 62 || y === 39 || y === 34 || y === 37 || y === 64 || y === 96 || (y === 63 || y === 45) && (ie = S.input.charCodeAt(S.position + 1), g(ie) || ce && L(ie)))
      return !1;
    for (S.kind = "scalar", S.result = "", q = H = S.position, Y = !1; y !== 0; ) {
      if (y === 58) {
        if (ie = S.input.charCodeAt(S.position + 1), g(ie) || ce && L(ie))
          break;
      } else if (y === 35) {
        if (Te = S.input.charCodeAt(S.position - 1), g(Te))
          break;
      } else {
        if (S.position === S.lineStart && k(S) || ce && L(y))
          break;
        if (A(y))
          if (te = S.line, ee = S.lineStart, ae = S.lineIndent, b(S, !1, -1), S.lineIndent >= ne) {
            Y = !0, y = S.input.charCodeAt(S.position);
            continue;
          } else {
            S.position = H, S.line = te, S.lineStart = ee, S.lineIndent = ae;
            break;
          }
      }
      Y && (j(S, q, H, !1), W(S, S.line - te), q = H = S.position, Y = !1), C(y) || (H = S.position + 1), y = S.input.charCodeAt(++S.position);
    }
    return j(S, q, H, !1), S.result ? !0 : (S.kind = ue, S.result = pe, !1);
  }
  function U(S, ne) {
    var ce, Te, ie;
    if (ce = S.input.charCodeAt(S.position), ce !== 39)
      return !1;
    for (S.kind = "scalar", S.result = "", S.position++, Te = ie = S.position; (ce = S.input.charCodeAt(S.position)) !== 0; )
      if (ce === 39)
        if (j(S, Te, S.position, !0), ce = S.input.charCodeAt(++S.position), ce === 39)
          Te = S.position, S.position++, ie = S.position;
        else
          return !0;
      else A(ce) ? (j(S, Te, ie, !0), W(S, b(S, !1, ne)), Te = ie = S.position) : S.position === S.lineStart && k(S) ? x(S, "unexpected end of the document within a single quoted scalar") : (S.position++, ie = S.position);
    x(S, "unexpected end of the stream within a single quoted scalar");
  }
  function P(S, ne) {
    var ce, Te, ie, q, H, Y;
    if (Y = S.input.charCodeAt(S.position), Y !== 34)
      return !1;
    for (S.kind = "scalar", S.result = "", S.position++, ce = Te = S.position; (Y = S.input.charCodeAt(S.position)) !== 0; ) {
      if (Y === 34)
        return j(S, ce, S.position, !0), S.position++, !0;
      if (Y === 92) {
        if (j(S, ce, S.position, !0), Y = S.input.charCodeAt(++S.position), A(Y))
          b(S, !1, ne);
        else if (Y < 256 && v[Y])
          S.result += M[Y], S.position++;
        else if ((H = O(Y)) > 0) {
          for (ie = H, q = 0; ie > 0; ie--)
            Y = S.input.charCodeAt(++S.position), (H = R(Y)) >= 0 ? q = (q << 4) + H : x(S, "expected hexadecimal character");
          S.result += B(q), S.position++;
        } else
          x(S, "unknown escape sequence");
        ce = Te = S.position;
      } else A(Y) ? (j(S, ce, Te, !0), W(S, b(S, !1, ne)), ce = Te = S.position) : S.position === S.lineStart && k(S) ? x(S, "unexpected end of the document within a double quoted scalar") : (S.position++, Te = S.position);
    }
    x(S, "unexpected end of the stream within a double quoted scalar");
  }
  function K(S, ne) {
    var ce = !0, Te, ie, q, H = S.tag, Y, te = S.anchor, ee, ae, ue, pe, y, Z = /* @__PURE__ */ Object.create(null), re, se, oe, le;
    if (le = S.input.charCodeAt(S.position), le === 91)
      ae = 93, y = !1, Y = [];
    else if (le === 123)
      ae = 125, y = !0, Y = {};
    else
      return !1;
    for (S.anchor !== null && (S.anchorMap[S.anchor] = Y), le = S.input.charCodeAt(++S.position); le !== 0; ) {
      if (b(S, !0, ne), le = S.input.charCodeAt(S.position), le === ae)
        return S.position++, S.tag = H, S.anchor = te, S.kind = y ? "mapping" : "sequence", S.result = Y, !0;
      ce ? le === 44 && x(S, "expected the node content, but found ','") : x(S, "missed comma between flow collection entries"), se = re = oe = null, ue = pe = !1, le === 63 && (ee = S.input.charCodeAt(S.position + 1), g(ee) && (ue = pe = !0, S.position++, b(S, !0, ne))), Te = S.line, ie = S.lineStart, q = S.position, be(S, ne, s, !1, !0), se = S.tag, re = S.result, b(S, !0, ne), le = S.input.charCodeAt(S.position), (pe || S.line === Te) && le === 58 && (ue = !0, le = S.input.charCodeAt(++S.position), b(S, !0, ne), be(S, ne, s, !1, !0), oe = S.result), y ? fe(S, Y, Z, se, re, oe, Te, ie, q) : ue ? Y.push(fe(S, null, Z, se, re, oe, Te, ie, q)) : Y.push(re), b(S, !0, ne), le = S.input.charCodeAt(S.position), le === 44 ? (ce = !0, le = S.input.charCodeAt(++S.position)) : ce = !1;
    }
    x(S, "unexpected end of the stream within a flow collection");
  }
  function $(S, ne) {
    var ce, Te, ie = c, q = !1, H = !1, Y = ne, te = 0, ee = !1, ae, ue;
    if (ue = S.input.charCodeAt(S.position), ue === 124)
      Te = !1;
    else if (ue === 62)
      Te = !0;
    else
      return !1;
    for (S.kind = "scalar", S.result = ""; ue !== 0; )
      if (ue = S.input.charCodeAt(++S.position), ue === 43 || ue === 45)
        c === ie ? ie = ue === 43 ? l : i : x(S, "repeat of a chomping mode identifier");
      else if ((ae = D(ue)) >= 0)
        ae === 0 ? x(S, "bad explicit indentation width of a block scalar; it cannot be less than one") : H ? x(S, "repeat of an indentation width identifier") : (Y = ne + ae - 1, H = !0);
      else
        break;
    if (C(ue)) {
      do
        ue = S.input.charCodeAt(++S.position);
      while (C(ue));
      if (ue === 35)
        do
          ue = S.input.charCodeAt(++S.position);
        while (!A(ue) && ue !== 0);
    }
    for (; ue !== 0; ) {
      for (Ce(S), S.lineIndent = 0, ue = S.input.charCodeAt(S.position); (!H || S.lineIndent < Y) && ue === 32; )
        S.lineIndent++, ue = S.input.charCodeAt(++S.position);
      if (!H && S.lineIndent > Y && (Y = S.lineIndent), A(ue)) {
        te++;
        continue;
      }
      if (S.lineIndent < Y) {
        ie === l ? S.result += e.repeat(`
`, q ? 1 + te : te) : ie === c && q && (S.result += `
`);
        break;
      }
      for (Te ? C(ue) ? (ee = !0, S.result += e.repeat(`
`, q ? 1 + te : te)) : ee ? (ee = !1, S.result += e.repeat(`
`, te + 1)) : te === 0 ? q && (S.result += " ") : S.result += e.repeat(`
`, te) : S.result += e.repeat(`
`, q ? 1 + te : te), q = !0, H = !0, te = 0, ce = S.position; !A(ue) && ue !== 0; )
        ue = S.input.charCodeAt(++S.position);
      j(S, ce, S.position, !1);
    }
    return !0;
  }
  function he(S, ne) {
    var ce, Te = S.tag, ie = S.anchor, q = [], H, Y = !1, te;
    if (S.firstTabInLine !== -1) return !1;
    for (S.anchor !== null && (S.anchorMap[S.anchor] = q), te = S.input.charCodeAt(S.position); te !== 0 && (S.firstTabInLine !== -1 && (S.position = S.firstTabInLine, x(S, "tab characters must not be used in indentation")), !(te !== 45 || (H = S.input.charCodeAt(S.position + 1), !g(H)))); ) {
      if (Y = !0, S.position++, b(S, !0, -1) && S.lineIndent <= ne) {
        q.push(null), te = S.input.charCodeAt(S.position);
        continue;
      }
      if (ce = S.line, be(S, ne, o, !1, !0), q.push(S.result), b(S, !0, -1), te = S.input.charCodeAt(S.position), (S.line === ce || S.lineIndent > ne) && te !== 0)
        x(S, "bad indentation of a sequence entry");
      else if (S.lineIndent < ne)
        break;
    }
    return Y ? (S.tag = Te, S.anchor = ie, S.kind = "sequence", S.result = q, !0) : !1;
  }
  function de(S, ne, ce) {
    var Te, ie, q, H, Y, te, ee = S.tag, ae = S.anchor, ue = {}, pe = /* @__PURE__ */ Object.create(null), y = null, Z = null, re = null, se = !1, oe = !1, le;
    if (S.firstTabInLine !== -1) return !1;
    for (S.anchor !== null && (S.anchorMap[S.anchor] = ue), le = S.input.charCodeAt(S.position); le !== 0; ) {
      if (!se && S.firstTabInLine !== -1 && (S.position = S.firstTabInLine, x(S, "tab characters must not be used in indentation")), Te = S.input.charCodeAt(S.position + 1), q = S.line, (le === 63 || le === 58) && g(Te))
        le === 63 ? (se && (fe(S, ue, pe, y, Z, null, H, Y, te), y = Z = re = null), oe = !0, se = !0, ie = !0) : se ? (se = !1, ie = !0) : x(S, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), S.position += 1, le = Te;
      else {
        if (H = S.line, Y = S.lineStart, te = S.position, !be(S, ce, a, !1, !0))
          break;
        if (S.line === q) {
          for (le = S.input.charCodeAt(S.position); C(le); )
            le = S.input.charCodeAt(++S.position);
          if (le === 58)
            le = S.input.charCodeAt(++S.position), g(le) || x(S, "a whitespace character is expected after the key-value separator within a block mapping"), se && (fe(S, ue, pe, y, Z, null, H, Y, te), y = Z = re = null), oe = !0, se = !1, ie = !1, y = S.tag, Z = S.result;
          else if (oe)
            x(S, "can not read an implicit mapping pair; a colon is missed");
          else
            return S.tag = ee, S.anchor = ae, !0;
        } else if (oe)
          x(S, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return S.tag = ee, S.anchor = ae, !0;
      }
      if ((S.line === q || S.lineIndent > ne) && (se && (H = S.line, Y = S.lineStart, te = S.position), be(S, ne, n, !0, ie) && (se ? Z = S.result : re = S.result), se || (fe(S, ue, pe, y, Z, re, H, Y, te), y = Z = re = null), b(S, !0, -1), le = S.input.charCodeAt(S.position)), (S.line === q || S.lineIndent > ne) && le !== 0)
        x(S, "bad indentation of a mapping entry");
      else if (S.lineIndent < ne)
        break;
    }
    return se && fe(S, ue, pe, y, Z, null, H, Y, te), oe && (S.tag = ee, S.anchor = ae, S.kind = "mapping", S.result = ue), oe;
  }
  function Se(S) {
    var ne, ce = !1, Te = !1, ie, q, H;
    if (H = S.input.charCodeAt(S.position), H !== 33) return !1;
    if (S.tag !== null && x(S, "duplication of a tag property"), H = S.input.charCodeAt(++S.position), H === 60 ? (ce = !0, H = S.input.charCodeAt(++S.position)) : H === 33 ? (Te = !0, ie = "!!", H = S.input.charCodeAt(++S.position)) : ie = "!", ne = S.position, ce) {
      do
        H = S.input.charCodeAt(++S.position);
      while (H !== 0 && H !== 62);
      S.position < S.length ? (q = S.input.slice(ne, S.position), H = S.input.charCodeAt(++S.position)) : x(S, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; H !== 0 && !g(H); )
        H === 33 && (Te ? x(S, "tag suffix cannot contain exclamation marks") : (ie = S.input.slice(ne - 1, S.position + 1), E.test(ie) || x(S, "named tag handle cannot contain such characters"), Te = !0, ne = S.position + 1)), H = S.input.charCodeAt(++S.position);
      q = S.input.slice(ne, S.position), p.test(q) && x(S, "tag suffix cannot contain flow indicator characters");
    }
    q && !h.test(q) && x(S, "tag name cannot contain such characters: " + q);
    try {
      q = decodeURIComponent(q);
    } catch {
      x(S, "tag name is malformed: " + q);
    }
    return ce ? S.tag = q : r.call(S.tagMap, ie) ? S.tag = S.tagMap[ie] + q : ie === "!" ? S.tag = "!" + q : ie === "!!" ? S.tag = "tag:yaml.org,2002:" + q : x(S, 'undeclared tag handle "' + ie + '"'), !0;
  }
  function Re(S) {
    var ne, ce;
    if (ce = S.input.charCodeAt(S.position), ce !== 38) return !1;
    for (S.anchor !== null && x(S, "duplication of an anchor property"), ce = S.input.charCodeAt(++S.position), ne = S.position; ce !== 0 && !g(ce) && !L(ce); )
      ce = S.input.charCodeAt(++S.position);
    return S.position === ne && x(S, "name of an anchor node must contain at least one character"), S.anchor = S.input.slice(ne, S.position), !0;
  }
  function me(S) {
    var ne, ce, Te;
    if (Te = S.input.charCodeAt(S.position), Te !== 42) return !1;
    for (Te = S.input.charCodeAt(++S.position), ne = S.position; Te !== 0 && !g(Te) && !L(Te); )
      Te = S.input.charCodeAt(++S.position);
    return S.position === ne && x(S, "name of an alias node must contain at least one character"), ce = S.input.slice(ne, S.position), r.call(S.anchorMap, ce) || x(S, 'unidentified alias "' + ce + '"'), S.result = S.anchorMap[ce], b(S, !0, -1), !0;
  }
  function be(S, ne, ce, Te, ie) {
    var q, H, Y, te = 1, ee = !1, ae = !1, ue, pe, y, Z, re, se;
    if (S.listener !== null && S.listener("open", S), S.tag = null, S.anchor = null, S.kind = null, S.result = null, q = H = Y = n === ce || o === ce, Te && b(S, !0, -1) && (ee = !0, S.lineIndent > ne ? te = 1 : S.lineIndent === ne ? te = 0 : S.lineIndent < ne && (te = -1)), te === 1)
      for (; Se(S) || Re(S); )
        b(S, !0, -1) ? (ee = !0, Y = q, S.lineIndent > ne ? te = 1 : S.lineIndent === ne ? te = 0 : S.lineIndent < ne && (te = -1)) : Y = !1;
    if (Y && (Y = ee || ie), (te === 1 || n === ce) && (s === ce || a === ce ? re = ne : re = ne + 1, se = S.position - S.lineStart, te === 1 ? Y && (he(S, se) || de(S, se, re)) || K(S, re) ? ae = !0 : (H && $(S, re) || U(S, re) || P(S, re) ? ae = !0 : me(S) ? (ae = !0, (S.tag !== null || S.anchor !== null) && x(S, "alias node should not have any properties")) : X(S, re, s === ce) && (ae = !0, S.tag === null && (S.tag = "?")), S.anchor !== null && (S.anchorMap[S.anchor] = S.result)) : te === 0 && (ae = Y && he(S, se))), S.tag === null)
      S.anchor !== null && (S.anchorMap[S.anchor] = S.result);
    else if (S.tag === "?") {
      for (S.result !== null && S.kind !== "scalar" && x(S, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + S.kind + '"'), ue = 0, pe = S.implicitTypes.length; ue < pe; ue += 1)
        if (Z = S.implicitTypes[ue], Z.resolve(S.result)) {
          S.result = Z.construct(S.result), S.tag = Z.tag, S.anchor !== null && (S.anchorMap[S.anchor] = S.result);
          break;
        }
    } else if (S.tag !== "!") {
      if (r.call(S.typeMap[S.kind || "fallback"], S.tag))
        Z = S.typeMap[S.kind || "fallback"][S.tag];
      else
        for (Z = null, y = S.typeMap.multi[S.kind || "fallback"], ue = 0, pe = y.length; ue < pe; ue += 1)
          if (S.tag.slice(0, y[ue].tag.length) === y[ue].tag) {
            Z = y[ue];
            break;
          }
      Z || x(S, "unknown tag !<" + S.tag + ">"), S.result !== null && Z.kind !== S.kind && x(S, "unacceptable node kind for !<" + S.tag + '> tag; it should be "' + Z.kind + '", not "' + S.kind + '"'), Z.resolve(S.result, S.tag) ? (S.result = Z.construct(S.result, S.tag), S.anchor !== null && (S.anchorMap[S.anchor] = S.result)) : x(S, "cannot resolve a node with !<" + S.tag + "> explicit tag");
    }
    return S.listener !== null && S.listener("close", S), S.tag !== null || S.anchor !== null || ae;
  }
  function Ue(S) {
    var ne = S.position, ce, Te, ie, q = !1, H;
    for (S.version = null, S.checkLineBreaks = S.legacy, S.tagMap = /* @__PURE__ */ Object.create(null), S.anchorMap = /* @__PURE__ */ Object.create(null); (H = S.input.charCodeAt(S.position)) !== 0 && (b(S, !0, -1), H = S.input.charCodeAt(S.position), !(S.lineIndent > 0 || H !== 37)); ) {
      for (q = !0, H = S.input.charCodeAt(++S.position), ce = S.position; H !== 0 && !g(H); )
        H = S.input.charCodeAt(++S.position);
      for (Te = S.input.slice(ce, S.position), ie = [], Te.length < 1 && x(S, "directive name must not be less than one character in length"); H !== 0; ) {
        for (; C(H); )
          H = S.input.charCodeAt(++S.position);
        if (H === 35) {
          do
            H = S.input.charCodeAt(++S.position);
          while (H !== 0 && !A(H));
          break;
        }
        if (A(H)) break;
        for (ce = S.position; H !== 0 && !g(H); )
          H = S.input.charCodeAt(++S.position);
        ie.push(S.input.slice(ce, S.position));
      }
      H !== 0 && Ce(S), r.call(z, Te) ? z[Te](S, Te, ie) : V(S, 'unknown document directive "' + Te + '"');
    }
    if (b(S, !0, -1), S.lineIndent === 0 && S.input.charCodeAt(S.position) === 45 && S.input.charCodeAt(S.position + 1) === 45 && S.input.charCodeAt(S.position + 2) === 45 ? (S.position += 3, b(S, !0, -1)) : q && x(S, "directives end mark is expected"), be(S, S.lineIndent - 1, n, !1, !0), b(S, !0, -1), S.checkLineBreaks && d.test(S.input.slice(ne, S.position)) && V(S, "non-ASCII line breaks are interpreted as content"), S.documents.push(S.result), S.position === S.lineStart && k(S)) {
      S.input.charCodeAt(S.position) === 46 && (S.position += 3, b(S, !0, -1));
      return;
    }
    if (S.position < S.length - 1)
      x(S, "end of the stream or a document separator is expected");
    else
      return;
  }
  function ke(S, ne) {
    S = String(S), ne = ne || {}, S.length !== 0 && (S.charCodeAt(S.length - 1) !== 10 && S.charCodeAt(S.length - 1) !== 13 && (S += `
`), S.charCodeAt(0) === 65279 && (S = S.slice(1)));
    var ce = new I(S, ne), Te = S.indexOf("\0");
    for (Te !== -1 && (ce.position = Te, x(ce, "null byte is not allowed in input")), ce.input += "\0"; ce.input.charCodeAt(ce.position) === 32; )
      ce.lineIndent += 1, ce.position += 1;
    for (; ce.position < ce.length - 1; )
      Ue(ce);
    return ce.documents;
  }
  function Ye(S, ne, ce) {
    ne !== null && typeof ne == "object" && typeof ce > "u" && (ce = ne, ne = null);
    var Te = ke(S, ce);
    if (typeof ne != "function")
      return Te;
    for (var ie = 0, q = Te.length; ie < q; ie += 1)
      ne(Te[ie]);
  }
  function $e(S, ne) {
    var ce = ke(S, ne);
    if (ce.length !== 0) {
      if (ce.length === 1)
        return ce[0];
      throw new f("expected a single document in the stream, but found more");
    }
  }
  return mn.loadAll = Ye, mn.load = $e, mn;
}
var Ea = {}, T_;
function U1() {
  if (T_) return Ea;
  T_ = 1;
  var e = en(), f = tn(), t = Qo(), u = Object.prototype.toString, r = Object.prototype.hasOwnProperty, s = 65279, a = 9, o = 10, n = 13, c = 32, i = 33, l = 34, _ = 35, d = 37, p = 38, E = 39, h = 42, N = 44, A = 45, C = 58, g = 61, L = 62, R = 63, O = 64, D = 91, m = 93, B = 96, v = 123, M = 124, F = 125, I = {};
  I[0] = "\\0", I[7] = "\\a", I[8] = "\\b", I[9] = "\\t", I[10] = "\\n", I[11] = "\\v", I[12] = "\\f", I[13] = "\\r", I[27] = "\\e", I[34] = '\\"', I[92] = "\\\\", I[133] = "\\N", I[160] = "\\_", I[8232] = "\\L", I[8233] = "\\P";
  var w = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ], x = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function V(y, Z) {
    var re, se, oe, le, Ie, Ae, _e;
    if (Z === null) return {};
    for (re = {}, se = Object.keys(Z), oe = 0, le = se.length; oe < le; oe += 1)
      Ie = se[oe], Ae = String(Z[Ie]), Ie.slice(0, 2) === "!!" && (Ie = "tag:yaml.org,2002:" + Ie.slice(2)), _e = y.compiledTypeMap.fallback[Ie], _e && r.call(_e.styleAliases, Ae) && (Ae = _e.styleAliases[Ae]), re[Ie] = Ae;
    return re;
  }
  function z(y) {
    var Z, re, se;
    if (Z = y.toString(16).toUpperCase(), y <= 255)
      re = "x", se = 2;
    else if (y <= 65535)
      re = "u", se = 4;
    else if (y <= 4294967295)
      re = "U", se = 8;
    else
      throw new f("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + re + e.repeat("0", se - Z.length) + Z;
  }
  var j = 1, J = 2;
  function fe(y) {
    this.schema = y.schema || t, this.indent = Math.max(1, y.indent || 2), this.noArrayIndent = y.noArrayIndent || !1, this.skipInvalid = y.skipInvalid || !1, this.flowLevel = e.isNothing(y.flowLevel) ? -1 : y.flowLevel, this.styleMap = V(this.schema, y.styles || null), this.sortKeys = y.sortKeys || !1, this.lineWidth = y.lineWidth || 80, this.noRefs = y.noRefs || !1, this.noCompatMode = y.noCompatMode || !1, this.condenseFlow = y.condenseFlow || !1, this.quotingType = y.quotingType === '"' ? J : j, this.forceQuotes = y.forceQuotes || !1, this.replacer = typeof y.replacer == "function" ? y.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function Ce(y, Z) {
    for (var re = e.repeat(" ", Z), se = 0, oe = -1, le = "", Ie, Ae = y.length; se < Ae; )
      oe = y.indexOf(`
`, se), oe === -1 ? (Ie = y.slice(se), se = Ae) : (Ie = y.slice(se, oe + 1), se = oe + 1), Ie.length && Ie !== `
` && (le += re), le += Ie;
    return le;
  }
  function b(y, Z) {
    return `
` + e.repeat(" ", y.indent * Z);
  }
  function k(y, Z) {
    var re, se, oe;
    for (re = 0, se = y.implicitTypes.length; re < se; re += 1)
      if (oe = y.implicitTypes[re], oe.resolve(Z))
        return !0;
    return !1;
  }
  function W(y) {
    return y === c || y === a;
  }
  function X(y) {
    return 32 <= y && y <= 126 || 161 <= y && y <= 55295 && y !== 8232 && y !== 8233 || 57344 <= y && y <= 65533 && y !== s || 65536 <= y && y <= 1114111;
  }
  function U(y) {
    return X(y) && y !== s && y !== n && y !== o;
  }
  function P(y, Z, re) {
    var se = U(y), oe = se && !W(y);
    return (
      // ns-plain-safe
      (re ? (
        // c = flow-in
        se
      ) : se && y !== N && y !== D && y !== m && y !== v && y !== F) && y !== _ && !(Z === C && !oe) || U(Z) && !W(Z) && y === _ || Z === C && oe
    );
  }
  function K(y) {
    return X(y) && y !== s && !W(y) && y !== A && y !== R && y !== C && y !== N && y !== D && y !== m && y !== v && y !== F && y !== _ && y !== p && y !== h && y !== i && y !== M && y !== g && y !== L && y !== E && y !== l && y !== d && y !== O && y !== B;
  }
  function $(y) {
    return !W(y) && y !== C;
  }
  function he(y, Z) {
    var re = y.charCodeAt(Z), se;
    return re >= 55296 && re <= 56319 && Z + 1 < y.length && (se = y.charCodeAt(Z + 1), se >= 56320 && se <= 57343) ? (re - 55296) * 1024 + se - 56320 + 65536 : re;
  }
  function de(y) {
    var Z = /^\n* /;
    return Z.test(y);
  }
  var Se = 1, Re = 2, me = 3, be = 4, Ue = 5;
  function ke(y, Z, re, se, oe, le, Ie, Ae) {
    var _e, we = 0, ye = null, Fe = !1, Le = !1, ut = se !== -1, je = -1, lt = K(he(y, 0)) && $(he(y, y.length - 1));
    if (Z || Ie)
      for (_e = 0; _e < y.length; we >= 65536 ? _e += 2 : _e++) {
        if (we = he(y, _e), !X(we))
          return Ue;
        lt = lt && P(we, ye, Ae), ye = we;
      }
    else {
      for (_e = 0; _e < y.length; we >= 65536 ? _e += 2 : _e++) {
        if (we = he(y, _e), we === o)
          Fe = !0, ut && (Le = Le || // Foldable line = too long, and not more-indented.
          _e - je - 1 > se && y[je + 1] !== " ", je = _e);
        else if (!X(we))
          return Ue;
        lt = lt && P(we, ye, Ae), ye = we;
      }
      Le = Le || ut && _e - je - 1 > se && y[je + 1] !== " ";
    }
    return !Fe && !Le ? lt && !Ie && !oe(y) ? Se : le === J ? Ue : Re : re > 9 && de(y) ? Ue : Ie ? le === J ? Ue : Re : Le ? be : me;
  }
  function Ye(y, Z, re, se, oe) {
    y.dump = function() {
      if (Z.length === 0)
        return y.quotingType === J ? '""' : "''";
      if (!y.noCompatMode && (w.indexOf(Z) !== -1 || x.test(Z)))
        return y.quotingType === J ? '"' + Z + '"' : "'" + Z + "'";
      var le = y.indent * Math.max(1, re), Ie = y.lineWidth === -1 ? -1 : Math.max(Math.min(y.lineWidth, 40), y.lineWidth - le), Ae = se || y.flowLevel > -1 && re >= y.flowLevel;
      function _e(we) {
        return k(y, we);
      }
      switch (ke(
        Z,
        Ae,
        y.indent,
        Ie,
        _e,
        y.quotingType,
        y.forceQuotes && !se,
        oe
      )) {
        case Se:
          return Z;
        case Re:
          return "'" + Z.replace(/'/g, "''") + "'";
        case me:
          return "|" + $e(Z, y.indent) + S(Ce(Z, le));
        case be:
          return ">" + $e(Z, y.indent) + S(Ce(ne(Z, Ie), le));
        case Ue:
          return '"' + Te(Z) + '"';
        default:
          throw new f("impossible error: invalid scalar style");
      }
    }();
  }
  function $e(y, Z) {
    var re = de(y) ? String(Z) : "", se = y[y.length - 1] === `
`, oe = se && (y[y.length - 2] === `
` || y === `
`), le = oe ? "+" : se ? "" : "-";
    return re + le + `
`;
  }
  function S(y) {
    return y[y.length - 1] === `
` ? y.slice(0, -1) : y;
  }
  function ne(y, Z) {
    for (var re = /(\n+)([^\n]*)/g, se = function() {
      var we = y.indexOf(`
`);
      return we = we !== -1 ? we : y.length, re.lastIndex = we, ce(y.slice(0, we), Z);
    }(), oe = y[0] === `
` || y[0] === " ", le, Ie; Ie = re.exec(y); ) {
      var Ae = Ie[1], _e = Ie[2];
      le = _e[0] === " ", se += Ae + (!oe && !le && _e !== "" ? `
` : "") + ce(_e, Z), oe = le;
    }
    return se;
  }
  function ce(y, Z) {
    if (y === "" || y[0] === " ") return y;
    for (var re = / [^ ]/g, se, oe = 0, le, Ie = 0, Ae = 0, _e = ""; se = re.exec(y); )
      Ae = se.index, Ae - oe > Z && (le = Ie > oe ? Ie : Ae, _e += `
` + y.slice(oe, le), oe = le + 1), Ie = Ae;
    return _e += `
`, y.length - oe > Z && Ie > oe ? _e += y.slice(oe, Ie) + `
` + y.slice(Ie + 1) : _e += y.slice(oe), _e.slice(1);
  }
  function Te(y) {
    for (var Z = "", re = 0, se, oe = 0; oe < y.length; re >= 65536 ? oe += 2 : oe++)
      re = he(y, oe), se = I[re], !se && X(re) ? (Z += y[oe], re >= 65536 && (Z += y[oe + 1])) : Z += se || z(re);
    return Z;
  }
  function ie(y, Z, re) {
    var se = "", oe = y.tag, le, Ie, Ae;
    for (le = 0, Ie = re.length; le < Ie; le += 1)
      Ae = re[le], y.replacer && (Ae = y.replacer.call(re, String(le), Ae)), (ee(y, Z, Ae, !1, !1) || typeof Ae > "u" && ee(y, Z, null, !1, !1)) && (se !== "" && (se += "," + (y.condenseFlow ? "" : " ")), se += y.dump);
    y.tag = oe, y.dump = "[" + se + "]";
  }
  function q(y, Z, re, se) {
    var oe = "", le = y.tag, Ie, Ae, _e;
    for (Ie = 0, Ae = re.length; Ie < Ae; Ie += 1)
      _e = re[Ie], y.replacer && (_e = y.replacer.call(re, String(Ie), _e)), (ee(y, Z + 1, _e, !0, !0, !1, !0) || typeof _e > "u" && ee(y, Z + 1, null, !0, !0, !1, !0)) && ((!se || oe !== "") && (oe += b(y, Z)), y.dump && o === y.dump.charCodeAt(0) ? oe += "-" : oe += "- ", oe += y.dump);
    y.tag = le, y.dump = oe || "[]";
  }
  function H(y, Z, re) {
    var se = "", oe = y.tag, le = Object.keys(re), Ie, Ae, _e, we, ye;
    for (Ie = 0, Ae = le.length; Ie < Ae; Ie += 1)
      ye = "", se !== "" && (ye += ", "), y.condenseFlow && (ye += '"'), _e = le[Ie], we = re[_e], y.replacer && (we = y.replacer.call(re, _e, we)), ee(y, Z, _e, !1, !1) && (y.dump.length > 1024 && (ye += "? "), ye += y.dump + (y.condenseFlow ? '"' : "") + ":" + (y.condenseFlow ? "" : " "), ee(y, Z, we, !1, !1) && (ye += y.dump, se += ye));
    y.tag = oe, y.dump = "{" + se + "}";
  }
  function Y(y, Z, re, se) {
    var oe = "", le = y.tag, Ie = Object.keys(re), Ae, _e, we, ye, Fe, Le;
    if (y.sortKeys === !0)
      Ie.sort();
    else if (typeof y.sortKeys == "function")
      Ie.sort(y.sortKeys);
    else if (y.sortKeys)
      throw new f("sortKeys must be a boolean or a function");
    for (Ae = 0, _e = Ie.length; Ae < _e; Ae += 1)
      Le = "", (!se || oe !== "") && (Le += b(y, Z)), we = Ie[Ae], ye = re[we], y.replacer && (ye = y.replacer.call(re, we, ye)), ee(y, Z + 1, we, !0, !0, !0) && (Fe = y.tag !== null && y.tag !== "?" || y.dump && y.dump.length > 1024, Fe && (y.dump && o === y.dump.charCodeAt(0) ? Le += "?" : Le += "? "), Le += y.dump, Fe && (Le += b(y, Z)), ee(y, Z + 1, ye, !0, Fe) && (y.dump && o === y.dump.charCodeAt(0) ? Le += ":" : Le += ": ", Le += y.dump, oe += Le));
    y.tag = le, y.dump = oe || "{}";
  }
  function te(y, Z, re) {
    var se, oe, le, Ie, Ae, _e;
    for (oe = re ? y.explicitTypes : y.implicitTypes, le = 0, Ie = oe.length; le < Ie; le += 1)
      if (Ae = oe[le], (Ae.instanceOf || Ae.predicate) && (!Ae.instanceOf || typeof Z == "object" && Z instanceof Ae.instanceOf) && (!Ae.predicate || Ae.predicate(Z))) {
        if (re ? Ae.multi && Ae.representName ? y.tag = Ae.representName(Z) : y.tag = Ae.tag : y.tag = "?", Ae.represent) {
          if (_e = y.styleMap[Ae.tag] || Ae.defaultStyle, u.call(Ae.represent) === "[object Function]")
            se = Ae.represent(Z, _e);
          else if (r.call(Ae.represent, _e))
            se = Ae.represent[_e](Z, _e);
          else
            throw new f("!<" + Ae.tag + '> tag resolver accepts not "' + _e + '" style');
          y.dump = se;
        }
        return !0;
      }
    return !1;
  }
  function ee(y, Z, re, se, oe, le, Ie) {
    y.tag = null, y.dump = re, te(y, re, !1) || te(y, re, !0);
    var Ae = u.call(y.dump), _e = se, we;
    se && (se = y.flowLevel < 0 || y.flowLevel > Z);
    var ye = Ae === "[object Object]" || Ae === "[object Array]", Fe, Le;
    if (ye && (Fe = y.duplicates.indexOf(re), Le = Fe !== -1), (y.tag !== null && y.tag !== "?" || Le || y.indent !== 2 && Z > 0) && (oe = !1), Le && y.usedDuplicates[Fe])
      y.dump = "*ref_" + Fe;
    else {
      if (ye && Le && !y.usedDuplicates[Fe] && (y.usedDuplicates[Fe] = !0), Ae === "[object Object]")
        se && Object.keys(y.dump).length !== 0 ? (Y(y, Z, y.dump, oe), Le && (y.dump = "&ref_" + Fe + y.dump)) : (H(y, Z, y.dump), Le && (y.dump = "&ref_" + Fe + " " + y.dump));
      else if (Ae === "[object Array]")
        se && y.dump.length !== 0 ? (y.noArrayIndent && !Ie && Z > 0 ? q(y, Z - 1, y.dump, oe) : q(y, Z, y.dump, oe), Le && (y.dump = "&ref_" + Fe + y.dump)) : (ie(y, Z, y.dump), Le && (y.dump = "&ref_" + Fe + " " + y.dump));
      else if (Ae === "[object String]")
        y.tag !== "?" && Ye(y, y.dump, Z, le, _e);
      else {
        if (Ae === "[object Undefined]")
          return !1;
        if (y.skipInvalid) return !1;
        throw new f("unacceptable kind of an object to dump " + Ae);
      }
      y.tag !== null && y.tag !== "?" && (we = encodeURI(
        y.tag[0] === "!" ? y.tag.slice(1) : y.tag
      ).replace(/!/g, "%21"), y.tag[0] === "!" ? we = "!" + we : we.slice(0, 18) === "tag:yaml.org,2002:" ? we = "!!" + we.slice(18) : we = "!<" + we + ">", y.dump = we + " " + y.dump);
    }
    return !0;
  }
  function ae(y, Z) {
    var re = [], se = [], oe, le;
    for (ue(y, re, se), oe = 0, le = se.length; oe < le; oe += 1)
      Z.duplicates.push(re[se[oe]]);
    Z.usedDuplicates = new Array(le);
  }
  function ue(y, Z, re) {
    var se, oe, le;
    if (y !== null && typeof y == "object")
      if (oe = Z.indexOf(y), oe !== -1)
        re.indexOf(oe) === -1 && re.push(oe);
      else if (Z.push(y), Array.isArray(y))
        for (oe = 0, le = y.length; oe < le; oe += 1)
          ue(y[oe], Z, re);
      else
        for (se = Object.keys(y), oe = 0, le = se.length; oe < le; oe += 1)
          ue(y[se[oe]], Z, re);
  }
  function pe(y, Z) {
    Z = Z || {};
    var re = new fe(Z);
    re.noRefs || ae(y, re);
    var se = y;
    return re.replacer && (se = re.replacer.call({ "": se }, "", se)), ee(re, 0, se, !0, !0) ? re.dump + `
` : "";
  }
  return Ea.dump = pe, Ea;
}
var g_;
function Jo() {
  if (g_) return rt;
  g_ = 1;
  var e = D1(), f = U1();
  function t(u, r) {
    return function() {
      throw new Error("Function yaml." + u + " is removed in js-yaml 4. Use yaml." + r + " instead, which is now safe by default.");
    };
  }
  return rt.Type = nt(), rt.Schema = e0(), rt.FAILSAFE_SCHEMA = i0(), rt.JSON_SCHEMA = u0(), rt.CORE_SCHEMA = l0(), rt.DEFAULT_SCHEMA = Qo(), rt.load = e.load, rt.loadAll = e.loadAll, rt.dump = f.dump, rt.YAMLException = tn(), rt.types = {
    binary: h0(),
    float: c0(),
    map: n0(),
    null: s0(),
    pairs: E0(),
    set: A0(),
    timestamp: _0(),
    bool: a0(),
    int: o0(),
    merge: f0(),
    omap: d0(),
    seq: r0(),
    str: t0()
  }, rt.safeLoad = t("safeLoad", "load"), rt.safeLoadAll = t("safeLoadAll", "loadAll"), rt.safeDump = t("safeDump", "dump"), rt;
}
var Dr = {}, m_;
function L1() {
  if (m_) return Dr;
  m_ = 1, Object.defineProperty(Dr, "__esModule", { value: !0 }), Dr.Lazy = void 0;
  class e {
    constructor(t) {
      this._value = null, this.creator = t;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const t = this.creator();
      return this.value = t, t;
    }
    set value(t) {
      this._value = t, this.creator = null;
    }
  }
  return Dr.Lazy = e, Dr;
}
var On = { exports: {} }, Aa, O_;
function Hn() {
  if (O_) return Aa;
  O_ = 1;
  const e = "2.0.0", f = 256, t = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, u = 16, r = f - 6;
  return Aa = {
    MAX_LENGTH: f,
    MAX_SAFE_COMPONENT_LENGTH: u,
    MAX_SAFE_BUILD_LENGTH: r,
    MAX_SAFE_INTEGER: t,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: e,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, Aa;
}
var pa, w_;
function Gn() {
  return w_ || (w_ = 1, pa = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...f) => console.error("SEMVER", ...f) : () => {
  }), pa;
}
var P_;
function rn() {
  return P_ || (P_ = 1, function(e, f) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: t,
      MAX_SAFE_BUILD_LENGTH: u,
      MAX_LENGTH: r
    } = Hn(), s = Gn();
    f = e.exports = {};
    const a = f.re = [], o = f.safeRe = [], n = f.src = [], c = f.safeSrc = [], i = f.t = {};
    let l = 0;
    const _ = "[a-zA-Z0-9-]", d = [
      ["\\s", 1],
      ["\\d", r],
      [_, u]
    ], p = (h) => {
      for (const [N, A] of d)
        h = h.split(`${N}*`).join(`${N}{0,${A}}`).split(`${N}+`).join(`${N}{1,${A}}`);
      return h;
    }, E = (h, N, A) => {
      const C = p(N), g = l++;
      s(h, g, N), i[h] = g, n[g] = N, c[g] = C, a[g] = new RegExp(N, A ? "g" : void 0), o[g] = new RegExp(C, A ? "g" : void 0);
    };
    E("NUMERICIDENTIFIER", "0|[1-9]\\d*"), E("NUMERICIDENTIFIERLOOSE", "\\d+"), E("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${_}*`), E("MAINVERSION", `(${n[i.NUMERICIDENTIFIER]})\\.(${n[i.NUMERICIDENTIFIER]})\\.(${n[i.NUMERICIDENTIFIER]})`), E("MAINVERSIONLOOSE", `(${n[i.NUMERICIDENTIFIERLOOSE]})\\.(${n[i.NUMERICIDENTIFIERLOOSE]})\\.(${n[i.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASEIDENTIFIER", `(?:${n[i.NUMERICIDENTIFIER]}|${n[i.NONNUMERICIDENTIFIER]})`), E("PRERELEASEIDENTIFIERLOOSE", `(?:${n[i.NUMERICIDENTIFIERLOOSE]}|${n[i.NONNUMERICIDENTIFIER]})`), E("PRERELEASE", `(?:-(${n[i.PRERELEASEIDENTIFIER]}(?:\\.${n[i.PRERELEASEIDENTIFIER]})*))`), E("PRERELEASELOOSE", `(?:-?(${n[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${n[i.PRERELEASEIDENTIFIERLOOSE]})*))`), E("BUILDIDENTIFIER", `${_}+`), E("BUILD", `(?:\\+(${n[i.BUILDIDENTIFIER]}(?:\\.${n[i.BUILDIDENTIFIER]})*))`), E("FULLPLAIN", `v?${n[i.MAINVERSION]}${n[i.PRERELEASE]}?${n[i.BUILD]}?`), E("FULL", `^${n[i.FULLPLAIN]}$`), E("LOOSEPLAIN", `[v=\\s]*${n[i.MAINVERSIONLOOSE]}${n[i.PRERELEASELOOSE]}?${n[i.BUILD]}?`), E("LOOSE", `^${n[i.LOOSEPLAIN]}$`), E("GTLT", "((?:<|>)?=?)"), E("XRANGEIDENTIFIERLOOSE", `${n[i.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), E("XRANGEIDENTIFIER", `${n[i.NUMERICIDENTIFIER]}|x|X|\\*`), E("XRANGEPLAIN", `[v=\\s]*(${n[i.XRANGEIDENTIFIER]})(?:\\.(${n[i.XRANGEIDENTIFIER]})(?:\\.(${n[i.XRANGEIDENTIFIER]})(?:${n[i.PRERELEASE]})?${n[i.BUILD]}?)?)?`), E("XRANGEPLAINLOOSE", `[v=\\s]*(${n[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[i.XRANGEIDENTIFIERLOOSE]})(?:${n[i.PRERELEASELOOSE]})?${n[i.BUILD]}?)?)?`), E("XRANGE", `^${n[i.GTLT]}\\s*${n[i.XRANGEPLAIN]}$`), E("XRANGELOOSE", `^${n[i.GTLT]}\\s*${n[i.XRANGEPLAINLOOSE]}$`), E("COERCEPLAIN", `(^|[^\\d])(\\d{1,${t}})(?:\\.(\\d{1,${t}}))?(?:\\.(\\d{1,${t}}))?`), E("COERCE", `${n[i.COERCEPLAIN]}(?:$|[^\\d])`), E("COERCEFULL", n[i.COERCEPLAIN] + `(?:${n[i.PRERELEASE]})?(?:${n[i.BUILD]})?(?:$|[^\\d])`), E("COERCERTL", n[i.COERCE], !0), E("COERCERTLFULL", n[i.COERCEFULL], !0), E("LONETILDE", "(?:~>?)"), E("TILDETRIM", `(\\s*)${n[i.LONETILDE]}\\s+`, !0), f.tildeTrimReplace = "$1~", E("TILDE", `^${n[i.LONETILDE]}${n[i.XRANGEPLAIN]}$`), E("TILDELOOSE", `^${n[i.LONETILDE]}${n[i.XRANGEPLAINLOOSE]}$`), E("LONECARET", "(?:\\^)"), E("CARETTRIM", `(\\s*)${n[i.LONECARET]}\\s+`, !0), f.caretTrimReplace = "$1^", E("CARET", `^${n[i.LONECARET]}${n[i.XRANGEPLAIN]}$`), E("CARETLOOSE", `^${n[i.LONECARET]}${n[i.XRANGEPLAINLOOSE]}$`), E("COMPARATORLOOSE", `^${n[i.GTLT]}\\s*(${n[i.LOOSEPLAIN]})$|^$`), E("COMPARATOR", `^${n[i.GTLT]}\\s*(${n[i.FULLPLAIN]})$|^$`), E("COMPARATORTRIM", `(\\s*)${n[i.GTLT]}\\s*(${n[i.LOOSEPLAIN]}|${n[i.XRANGEPLAIN]})`, !0), f.comparatorTrimReplace = "$1$2$3", E("HYPHENRANGE", `^\\s*(${n[i.XRANGEPLAIN]})\\s+-\\s+(${n[i.XRANGEPLAIN]})\\s*$`), E("HYPHENRANGELOOSE", `^\\s*(${n[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${n[i.XRANGEPLAINLOOSE]})\\s*$`), E("STAR", "(<|>)?=?\\s*\\*"), E("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), E("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(On, On.exports)), On.exports;
}
var Ia, D_;
function Zo() {
  if (D_) return Ia;
  D_ = 1;
  const e = Object.freeze({ loose: !0 }), f = Object.freeze({});
  return Ia = (u) => u ? typeof u != "object" ? e : u : f, Ia;
}
var Na, U_;
function p0() {
  if (U_) return Na;
  U_ = 1;
  const e = /^[0-9]+$/, f = (u, r) => {
    const s = e.test(u), a = e.test(r);
    return s && a && (u = +u, r = +r), u === r ? 0 : s && !a ? -1 : a && !s ? 1 : u < r ? -1 : 1;
  };
  return Na = {
    compareIdentifiers: f,
    rcompareIdentifiers: (u, r) => f(r, u)
  }, Na;
}
var Sa, L_;
function it() {
  if (L_) return Sa;
  L_ = 1;
  const e = Gn(), { MAX_LENGTH: f, MAX_SAFE_INTEGER: t } = Hn(), { safeRe: u, safeSrc: r, t: s } = rn(), a = Zo(), { compareIdentifiers: o } = p0();
  class n {
    constructor(i, l) {
      if (l = a(l), i instanceof n) {
        if (i.loose === !!l.loose && i.includePrerelease === !!l.includePrerelease)
          return i;
        i = i.version;
      } else if (typeof i != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof i}".`);
      if (i.length > f)
        throw new TypeError(
          `version is longer than ${f} characters`
        );
      e("SemVer", i, l), this.options = l, this.loose = !!l.loose, this.includePrerelease = !!l.includePrerelease;
      const _ = i.trim().match(l.loose ? u[s.LOOSE] : u[s.FULL]);
      if (!_)
        throw new TypeError(`Invalid Version: ${i}`);
      if (this.raw = i, this.major = +_[1], this.minor = +_[2], this.patch = +_[3], this.major > t || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > t || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > t || this.patch < 0)
        throw new TypeError("Invalid patch version");
      _[4] ? this.prerelease = _[4].split(".").map((d) => {
        if (/^[0-9]+$/.test(d)) {
          const p = +d;
          if (p >= 0 && p < t)
            return p;
        }
        return d;
      }) : this.prerelease = [], this.build = _[5] ? _[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(i) {
      if (e("SemVer.compare", this.version, this.options, i), !(i instanceof n)) {
        if (typeof i == "string" && i === this.version)
          return 0;
        i = new n(i, this.options);
      }
      return i.version === this.version ? 0 : this.compareMain(i) || this.comparePre(i);
    }
    compareMain(i) {
      return i instanceof n || (i = new n(i, this.options)), o(this.major, i.major) || o(this.minor, i.minor) || o(this.patch, i.patch);
    }
    comparePre(i) {
      if (i instanceof n || (i = new n(i, this.options)), this.prerelease.length && !i.prerelease.length)
        return -1;
      if (!this.prerelease.length && i.prerelease.length)
        return 1;
      if (!this.prerelease.length && !i.prerelease.length)
        return 0;
      let l = 0;
      do {
        const _ = this.prerelease[l], d = i.prerelease[l];
        if (e("prerelease compare", l, _, d), _ === void 0 && d === void 0)
          return 0;
        if (d === void 0)
          return 1;
        if (_ === void 0)
          return -1;
        if (_ === d)
          continue;
        return o(_, d);
      } while (++l);
    }
    compareBuild(i) {
      i instanceof n || (i = new n(i, this.options));
      let l = 0;
      do {
        const _ = this.build[l], d = i.build[l];
        if (e("build compare", l, _, d), _ === void 0 && d === void 0)
          return 0;
        if (d === void 0)
          return 1;
        if (_ === void 0)
          return -1;
        if (_ === d)
          continue;
        return o(_, d);
      } while (++l);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(i, l, _) {
      if (i.startsWith("pre")) {
        if (!l && _ === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (l) {
          const d = new RegExp(`^${this.options.loose ? r[s.PRERELEASELOOSE] : r[s.PRERELEASE]}$`), p = `-${l}`.match(d);
          if (!p || p[1] !== l)
            throw new Error(`invalid identifier: ${l}`);
        }
      }
      switch (i) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", l, _);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", l, _);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", l, _), this.inc("pre", l, _);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", l, _), this.inc("pre", l, _);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const d = Number(_) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [d];
          else {
            let p = this.prerelease.length;
            for (; --p >= 0; )
              typeof this.prerelease[p] == "number" && (this.prerelease[p]++, p = -2);
            if (p === -1) {
              if (l === this.prerelease.join(".") && _ === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(d);
            }
          }
          if (l) {
            let p = [l, d];
            _ === !1 && (p = [l]), o(this.prerelease[0], l) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = p) : this.prerelease = p;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${i}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return Sa = n, Sa;
}
var Ra, b_;
function Ar() {
  if (b_) return Ra;
  b_ = 1;
  const e = it();
  return Ra = (t, u, r = !1) => {
    if (t instanceof e)
      return t;
    try {
      return new e(t, u);
    } catch (s) {
      if (!r)
        return null;
      throw s;
    }
  }, Ra;
}
var Ca, y_;
function b1() {
  if (y_) return Ca;
  y_ = 1;
  const e = Ar();
  return Ca = (t, u) => {
    const r = e(t, u);
    return r ? r.version : null;
  }, Ca;
}
var Ta, v_;
function y1() {
  if (v_) return Ta;
  v_ = 1;
  const e = Ar();
  return Ta = (t, u) => {
    const r = e(t.trim().replace(/^[=v]+/, ""), u);
    return r ? r.version : null;
  }, Ta;
}
var ga, F_;
function v1() {
  if (F_) return ga;
  F_ = 1;
  const e = it();
  return ga = (t, u, r, s, a) => {
    typeof r == "string" && (a = s, s = r, r = void 0);
    try {
      return new e(
        t instanceof e ? t.version : t,
        r
      ).inc(u, s, a).version;
    } catch {
      return null;
    }
  }, ga;
}
var ma, M_;
function F1() {
  if (M_) return ma;
  M_ = 1;
  const e = Ar();
  return ma = (t, u) => {
    const r = e(t, null, !0), s = e(u, null, !0), a = r.compare(s);
    if (a === 0)
      return null;
    const o = a > 0, n = o ? r : s, c = o ? s : r, i = !!n.prerelease.length;
    if (!!c.prerelease.length && !i) {
      if (!c.patch && !c.minor)
        return "major";
      if (c.compareMain(n) === 0)
        return c.minor && !c.patch ? "minor" : "patch";
    }
    const _ = i ? "pre" : "";
    return r.major !== s.major ? _ + "major" : r.minor !== s.minor ? _ + "minor" : r.patch !== s.patch ? _ + "patch" : "prerelease";
  }, ma;
}
var Oa, x_;
function M1() {
  if (x_) return Oa;
  x_ = 1;
  const e = it();
  return Oa = (t, u) => new e(t, u).major, Oa;
}
var wa, B_;
function x1() {
  if (B_) return wa;
  B_ = 1;
  const e = it();
  return wa = (t, u) => new e(t, u).minor, wa;
}
var Pa, k_;
function B1() {
  if (k_) return Pa;
  k_ = 1;
  const e = it();
  return Pa = (t, u) => new e(t, u).patch, Pa;
}
var Da, H_;
function k1() {
  if (H_) return Da;
  H_ = 1;
  const e = Ar();
  return Da = (t, u) => {
    const r = e(t, u);
    return r && r.prerelease.length ? r.prerelease : null;
  }, Da;
}
var Ua, G_;
function Et() {
  if (G_) return Ua;
  G_ = 1;
  const e = it();
  return Ua = (t, u, r) => new e(t, r).compare(new e(u, r)), Ua;
}
var La, q_;
function H1() {
  if (q_) return La;
  q_ = 1;
  const e = Et();
  return La = (t, u, r) => e(u, t, r), La;
}
var ba, $_;
function G1() {
  if ($_) return ba;
  $_ = 1;
  const e = Et();
  return ba = (t, u) => e(t, u, !0), ba;
}
var ya, V_;
function ec() {
  if (V_) return ya;
  V_ = 1;
  const e = it();
  return ya = (t, u, r) => {
    const s = new e(t, r), a = new e(u, r);
    return s.compare(a) || s.compareBuild(a);
  }, ya;
}
var va, W_;
function q1() {
  if (W_) return va;
  W_ = 1;
  const e = ec();
  return va = (t, u) => t.sort((r, s) => e(r, s, u)), va;
}
var Fa, j_;
function $1() {
  if (j_) return Fa;
  j_ = 1;
  const e = ec();
  return Fa = (t, u) => t.sort((r, s) => e(s, r, u)), Fa;
}
var Ma, Y_;
function qn() {
  if (Y_) return Ma;
  Y_ = 1;
  const e = Et();
  return Ma = (t, u, r) => e(t, u, r) > 0, Ma;
}
var xa, K_;
function tc() {
  if (K_) return xa;
  K_ = 1;
  const e = Et();
  return xa = (t, u, r) => e(t, u, r) < 0, xa;
}
var Ba, z_;
function I0() {
  if (z_) return Ba;
  z_ = 1;
  const e = Et();
  return Ba = (t, u, r) => e(t, u, r) === 0, Ba;
}
var ka, X_;
function N0() {
  if (X_) return ka;
  X_ = 1;
  const e = Et();
  return ka = (t, u, r) => e(t, u, r) !== 0, ka;
}
var Ha, Q_;
function rc() {
  if (Q_) return Ha;
  Q_ = 1;
  const e = Et();
  return Ha = (t, u, r) => e(t, u, r) >= 0, Ha;
}
var Ga, J_;
function nc() {
  if (J_) return Ga;
  J_ = 1;
  const e = Et();
  return Ga = (t, u, r) => e(t, u, r) <= 0, Ga;
}
var qa, Z_;
function S0() {
  if (Z_) return qa;
  Z_ = 1;
  const e = I0(), f = N0(), t = qn(), u = rc(), r = tc(), s = nc();
  return qa = (o, n, c, i) => {
    switch (n) {
      case "===":
        return typeof o == "object" && (o = o.version), typeof c == "object" && (c = c.version), o === c;
      case "!==":
        return typeof o == "object" && (o = o.version), typeof c == "object" && (c = c.version), o !== c;
      case "":
      case "=":
      case "==":
        return e(o, c, i);
      case "!=":
        return f(o, c, i);
      case ">":
        return t(o, c, i);
      case ">=":
        return u(o, c, i);
      case "<":
        return r(o, c, i);
      case "<=":
        return s(o, c, i);
      default:
        throw new TypeError(`Invalid operator: ${n}`);
    }
  }, qa;
}
var $a, ef;
function V1() {
  if (ef) return $a;
  ef = 1;
  const e = it(), f = Ar(), { safeRe: t, t: u } = rn();
  return $a = (s, a) => {
    if (s instanceof e)
      return s;
    if (typeof s == "number" && (s = String(s)), typeof s != "string")
      return null;
    a = a || {};
    let o = null;
    if (!a.rtl)
      o = s.match(a.includePrerelease ? t[u.COERCEFULL] : t[u.COERCE]);
    else {
      const d = a.includePrerelease ? t[u.COERCERTLFULL] : t[u.COERCERTL];
      let p;
      for (; (p = d.exec(s)) && (!o || o.index + o[0].length !== s.length); )
        (!o || p.index + p[0].length !== o.index + o[0].length) && (o = p), d.lastIndex = p.index + p[1].length + p[2].length;
      d.lastIndex = -1;
    }
    if (o === null)
      return null;
    const n = o[2], c = o[3] || "0", i = o[4] || "0", l = a.includePrerelease && o[5] ? `-${o[5]}` : "", _ = a.includePrerelease && o[6] ? `+${o[6]}` : "";
    return f(`${n}.${c}.${i}${l}${_}`, a);
  }, $a;
}
var Va, tf;
function W1() {
  if (tf) return Va;
  tf = 1;
  class e {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(t) {
      const u = this.map.get(t);
      if (u !== void 0)
        return this.map.delete(t), this.map.set(t, u), u;
    }
    delete(t) {
      return this.map.delete(t);
    }
    set(t, u) {
      if (!this.delete(t) && u !== void 0) {
        if (this.map.size >= this.max) {
          const s = this.map.keys().next().value;
          this.delete(s);
        }
        this.map.set(t, u);
      }
      return this;
    }
  }
  return Va = e, Va;
}
var Wa, rf;
function At() {
  if (rf) return Wa;
  rf = 1;
  const e = /\s+/g;
  class f {
    constructor(w, x) {
      if (x = r(x), w instanceof f)
        return w.loose === !!x.loose && w.includePrerelease === !!x.includePrerelease ? w : new f(w.raw, x);
      if (w instanceof s)
        return this.raw = w.value, this.set = [[w]], this.formatted = void 0, this;
      if (this.options = x, this.loose = !!x.loose, this.includePrerelease = !!x.includePrerelease, this.raw = w.trim().replace(e, " "), this.set = this.raw.split("||").map((V) => this.parseRange(V.trim())).filter((V) => V.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const V = this.set[0];
        if (this.set = this.set.filter((z) => !E(z[0])), this.set.length === 0)
          this.set = [V];
        else if (this.set.length > 1) {
          for (const z of this.set)
            if (z.length === 1 && h(z[0])) {
              this.set = [z];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let w = 0; w < this.set.length; w++) {
          w > 0 && (this.formatted += "||");
          const x = this.set[w];
          for (let V = 0; V < x.length; V++)
            V > 0 && (this.formatted += " "), this.formatted += x[V].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(w) {
      const V = ((this.options.includePrerelease && d) | (this.options.loose && p)) + ":" + w, z = u.get(V);
      if (z)
        return z;
      const j = this.options.loose, J = j ? n[c.HYPHENRANGELOOSE] : n[c.HYPHENRANGE];
      w = w.replace(J, M(this.options.includePrerelease)), a("hyphen replace", w), w = w.replace(n[c.COMPARATORTRIM], i), a("comparator trim", w), w = w.replace(n[c.TILDETRIM], l), a("tilde trim", w), w = w.replace(n[c.CARETTRIM], _), a("caret trim", w);
      let fe = w.split(" ").map((W) => A(W, this.options)).join(" ").split(/\s+/).map((W) => v(W, this.options));
      j && (fe = fe.filter((W) => (a("loose invalid filter", W, this.options), !!W.match(n[c.COMPARATORLOOSE])))), a("range list", fe);
      const Ce = /* @__PURE__ */ new Map(), b = fe.map((W) => new s(W, this.options));
      for (const W of b) {
        if (E(W))
          return [W];
        Ce.set(W.value, W);
      }
      Ce.size > 1 && Ce.has("") && Ce.delete("");
      const k = [...Ce.values()];
      return u.set(V, k), k;
    }
    intersects(w, x) {
      if (!(w instanceof f))
        throw new TypeError("a Range is required");
      return this.set.some((V) => N(V, x) && w.set.some((z) => N(z, x) && V.every((j) => z.every((J) => j.intersects(J, x)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(w) {
      if (!w)
        return !1;
      if (typeof w == "string")
        try {
          w = new o(w, this.options);
        } catch {
          return !1;
        }
      for (let x = 0; x < this.set.length; x++)
        if (F(this.set[x], w, this.options))
          return !0;
      return !1;
    }
  }
  Wa = f;
  const t = W1(), u = new t(), r = Zo(), s = $n(), a = Gn(), o = it(), {
    safeRe: n,
    t: c,
    comparatorTrimReplace: i,
    tildeTrimReplace: l,
    caretTrimReplace: _
  } = rn(), { FLAG_INCLUDE_PRERELEASE: d, FLAG_LOOSE: p } = Hn(), E = (I) => I.value === "<0.0.0-0", h = (I) => I.value === "", N = (I, w) => {
    let x = !0;
    const V = I.slice();
    let z = V.pop();
    for (; x && V.length; )
      x = V.every((j) => z.intersects(j, w)), z = V.pop();
    return x;
  }, A = (I, w) => (a("comp", I, w), I = R(I, w), a("caret", I), I = g(I, w), a("tildes", I), I = D(I, w), a("xrange", I), I = B(I, w), a("stars", I), I), C = (I) => !I || I.toLowerCase() === "x" || I === "*", g = (I, w) => I.trim().split(/\s+/).map((x) => L(x, w)).join(" "), L = (I, w) => {
    const x = w.loose ? n[c.TILDELOOSE] : n[c.TILDE];
    return I.replace(x, (V, z, j, J, fe) => {
      a("tilde", I, V, z, j, J, fe);
      let Ce;
      return C(z) ? Ce = "" : C(j) ? Ce = `>=${z}.0.0 <${+z + 1}.0.0-0` : C(J) ? Ce = `>=${z}.${j}.0 <${z}.${+j + 1}.0-0` : fe ? (a("replaceTilde pr", fe), Ce = `>=${z}.${j}.${J}-${fe} <${z}.${+j + 1}.0-0`) : Ce = `>=${z}.${j}.${J} <${z}.${+j + 1}.0-0`, a("tilde return", Ce), Ce;
    });
  }, R = (I, w) => I.trim().split(/\s+/).map((x) => O(x, w)).join(" "), O = (I, w) => {
    a("caret", I, w);
    const x = w.loose ? n[c.CARETLOOSE] : n[c.CARET], V = w.includePrerelease ? "-0" : "";
    return I.replace(x, (z, j, J, fe, Ce) => {
      a("caret", I, z, j, J, fe, Ce);
      let b;
      return C(j) ? b = "" : C(J) ? b = `>=${j}.0.0${V} <${+j + 1}.0.0-0` : C(fe) ? j === "0" ? b = `>=${j}.${J}.0${V} <${j}.${+J + 1}.0-0` : b = `>=${j}.${J}.0${V} <${+j + 1}.0.0-0` : Ce ? (a("replaceCaret pr", Ce), j === "0" ? J === "0" ? b = `>=${j}.${J}.${fe}-${Ce} <${j}.${J}.${+fe + 1}-0` : b = `>=${j}.${J}.${fe}-${Ce} <${j}.${+J + 1}.0-0` : b = `>=${j}.${J}.${fe}-${Ce} <${+j + 1}.0.0-0`) : (a("no pr"), j === "0" ? J === "0" ? b = `>=${j}.${J}.${fe}${V} <${j}.${J}.${+fe + 1}-0` : b = `>=${j}.${J}.${fe}${V} <${j}.${+J + 1}.0-0` : b = `>=${j}.${J}.${fe} <${+j + 1}.0.0-0`), a("caret return", b), b;
    });
  }, D = (I, w) => (a("replaceXRanges", I, w), I.split(/\s+/).map((x) => m(x, w)).join(" ")), m = (I, w) => {
    I = I.trim();
    const x = w.loose ? n[c.XRANGELOOSE] : n[c.XRANGE];
    return I.replace(x, (V, z, j, J, fe, Ce) => {
      a("xRange", I, V, z, j, J, fe, Ce);
      const b = C(j), k = b || C(J), W = k || C(fe), X = W;
      return z === "=" && X && (z = ""), Ce = w.includePrerelease ? "-0" : "", b ? z === ">" || z === "<" ? V = "<0.0.0-0" : V = "*" : z && X ? (k && (J = 0), fe = 0, z === ">" ? (z = ">=", k ? (j = +j + 1, J = 0, fe = 0) : (J = +J + 1, fe = 0)) : z === "<=" && (z = "<", k ? j = +j + 1 : J = +J + 1), z === "<" && (Ce = "-0"), V = `${z + j}.${J}.${fe}${Ce}`) : k ? V = `>=${j}.0.0${Ce} <${+j + 1}.0.0-0` : W && (V = `>=${j}.${J}.0${Ce} <${j}.${+J + 1}.0-0`), a("xRange return", V), V;
    });
  }, B = (I, w) => (a("replaceStars", I, w), I.trim().replace(n[c.STAR], "")), v = (I, w) => (a("replaceGTE0", I, w), I.trim().replace(n[w.includePrerelease ? c.GTE0PRE : c.GTE0], "")), M = (I) => (w, x, V, z, j, J, fe, Ce, b, k, W, X) => (C(V) ? x = "" : C(z) ? x = `>=${V}.0.0${I ? "-0" : ""}` : C(j) ? x = `>=${V}.${z}.0${I ? "-0" : ""}` : J ? x = `>=${x}` : x = `>=${x}${I ? "-0" : ""}`, C(b) ? Ce = "" : C(k) ? Ce = `<${+b + 1}.0.0-0` : C(W) ? Ce = `<${b}.${+k + 1}.0-0` : X ? Ce = `<=${b}.${k}.${W}-${X}` : I ? Ce = `<${b}.${k}.${+W + 1}-0` : Ce = `<=${Ce}`, `${x} ${Ce}`.trim()), F = (I, w, x) => {
    for (let V = 0; V < I.length; V++)
      if (!I[V].test(w))
        return !1;
    if (w.prerelease.length && !x.includePrerelease) {
      for (let V = 0; V < I.length; V++)
        if (a(I[V].semver), I[V].semver !== s.ANY && I[V].semver.prerelease.length > 0) {
          const z = I[V].semver;
          if (z.major === w.major && z.minor === w.minor && z.patch === w.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Wa;
}
var ja, nf;
function $n() {
  if (nf) return ja;
  nf = 1;
  const e = Symbol("SemVer ANY");
  class f {
    static get ANY() {
      return e;
    }
    constructor(i, l) {
      if (l = t(l), i instanceof f) {
        if (i.loose === !!l.loose)
          return i;
        i = i.value;
      }
      i = i.trim().split(/\s+/).join(" "), a("comparator", i, l), this.options = l, this.loose = !!l.loose, this.parse(i), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(i) {
      const l = this.options.loose ? u[r.COMPARATORLOOSE] : u[r.COMPARATOR], _ = i.match(l);
      if (!_)
        throw new TypeError(`Invalid comparator: ${i}`);
      this.operator = _[1] !== void 0 ? _[1] : "", this.operator === "=" && (this.operator = ""), _[2] ? this.semver = new o(_[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(i) {
      if (a("Comparator.test", i, this.options.loose), this.semver === e || i === e)
        return !0;
      if (typeof i == "string")
        try {
          i = new o(i, this.options);
        } catch {
          return !1;
        }
      return s(i, this.operator, this.semver, this.options);
    }
    intersects(i, l) {
      if (!(i instanceof f))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new n(i.value, l).test(this.value) : i.operator === "" ? i.value === "" ? !0 : new n(this.value, l).test(i.semver) : (l = t(l), l.includePrerelease && (this.value === "<0.0.0-0" || i.value === "<0.0.0-0") || !l.includePrerelease && (this.value.startsWith("<0.0.0") || i.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && i.operator.startsWith(">") || this.operator.startsWith("<") && i.operator.startsWith("<") || this.semver.version === i.semver.version && this.operator.includes("=") && i.operator.includes("=") || s(this.semver, "<", i.semver, l) && this.operator.startsWith(">") && i.operator.startsWith("<") || s(this.semver, ">", i.semver, l) && this.operator.startsWith("<") && i.operator.startsWith(">")));
    }
  }
  ja = f;
  const t = Zo(), { safeRe: u, t: r } = rn(), s = S0(), a = Gn(), o = it(), n = At();
  return ja;
}
var Ya, sf;
function Vn() {
  if (sf) return Ya;
  sf = 1;
  const e = At();
  return Ya = (t, u, r) => {
    try {
      u = new e(u, r);
    } catch {
      return !1;
    }
    return u.test(t);
  }, Ya;
}
var Ka, af;
function j1() {
  if (af) return Ka;
  af = 1;
  const e = At();
  return Ka = (t, u) => new e(t, u).set.map((r) => r.map((s) => s.value).join(" ").trim().split(" ")), Ka;
}
var za, of;
function Y1() {
  if (of) return za;
  of = 1;
  const e = it(), f = At();
  return za = (u, r, s) => {
    let a = null, o = null, n = null;
    try {
      n = new f(r, s);
    } catch {
      return null;
    }
    return u.forEach((c) => {
      n.test(c) && (!a || o.compare(c) === -1) && (a = c, o = new e(a, s));
    }), a;
  }, za;
}
var Xa, cf;
function K1() {
  if (cf) return Xa;
  cf = 1;
  const e = it(), f = At();
  return Xa = (u, r, s) => {
    let a = null, o = null, n = null;
    try {
      n = new f(r, s);
    } catch {
      return null;
    }
    return u.forEach((c) => {
      n.test(c) && (!a || o.compare(c) === 1) && (a = c, o = new e(a, s));
    }), a;
  }, Xa;
}
var Qa, uf;
function z1() {
  if (uf) return Qa;
  uf = 1;
  const e = it(), f = At(), t = qn();
  return Qa = (r, s) => {
    r = new f(r, s);
    let a = new e("0.0.0");
    if (r.test(a) || (a = new e("0.0.0-0"), r.test(a)))
      return a;
    a = null;
    for (let o = 0; o < r.set.length; ++o) {
      const n = r.set[o];
      let c = null;
      n.forEach((i) => {
        const l = new e(i.semver.version);
        switch (i.operator) {
          case ">":
            l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
          /* fallthrough */
          case "":
          case ">=":
            (!c || t(l, c)) && (c = l);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${i.operator}`);
        }
      }), c && (!a || t(a, c)) && (a = c);
    }
    return a && r.test(a) ? a : null;
  }, Qa;
}
var Ja, lf;
function X1() {
  if (lf) return Ja;
  lf = 1;
  const e = At();
  return Ja = (t, u) => {
    try {
      return new e(t, u).range || "*";
    } catch {
      return null;
    }
  }, Ja;
}
var Za, _f;
function ic() {
  if (_f) return Za;
  _f = 1;
  const e = it(), f = $n(), { ANY: t } = f, u = At(), r = Vn(), s = qn(), a = tc(), o = nc(), n = rc();
  return Za = (i, l, _, d) => {
    i = new e(i, d), l = new u(l, d);
    let p, E, h, N, A;
    switch (_) {
      case ">":
        p = s, E = o, h = a, N = ">", A = ">=";
        break;
      case "<":
        p = a, E = n, h = s, N = "<", A = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (r(i, l, d))
      return !1;
    for (let C = 0; C < l.set.length; ++C) {
      const g = l.set[C];
      let L = null, R = null;
      if (g.forEach((O) => {
        O.semver === t && (O = new f(">=0.0.0")), L = L || O, R = R || O, p(O.semver, L.semver, d) ? L = O : h(O.semver, R.semver, d) && (R = O);
      }), L.operator === N || L.operator === A || (!R.operator || R.operator === N) && E(i, R.semver))
        return !1;
      if (R.operator === A && h(i, R.semver))
        return !1;
    }
    return !0;
  }, Za;
}
var eo, ff;
function Q1() {
  if (ff) return eo;
  ff = 1;
  const e = ic();
  return eo = (t, u, r) => e(t, u, ">", r), eo;
}
var to, hf;
function J1() {
  if (hf) return to;
  hf = 1;
  const e = ic();
  return to = (t, u, r) => e(t, u, "<", r), to;
}
var ro, df;
function Z1() {
  if (df) return ro;
  df = 1;
  const e = At();
  return ro = (t, u, r) => (t = new e(t, r), u = new e(u, r), t.intersects(u, r)), ro;
}
var no, Ef;
function eA() {
  if (Ef) return no;
  Ef = 1;
  const e = Vn(), f = Et();
  return no = (t, u, r) => {
    const s = [];
    let a = null, o = null;
    const n = t.sort((_, d) => f(_, d, r));
    for (const _ of n)
      e(_, u, r) ? (o = _, a || (a = _)) : (o && s.push([a, o]), o = null, a = null);
    a && s.push([a, null]);
    const c = [];
    for (const [_, d] of s)
      _ === d ? c.push(_) : !d && _ === n[0] ? c.push("*") : d ? _ === n[0] ? c.push(`<=${d}`) : c.push(`${_} - ${d}`) : c.push(`>=${_}`);
    const i = c.join(" || "), l = typeof u.raw == "string" ? u.raw : String(u);
    return i.length < l.length ? i : u;
  }, no;
}
var io, Af;
function tA() {
  if (Af) return io;
  Af = 1;
  const e = At(), f = $n(), { ANY: t } = f, u = Vn(), r = Et(), s = (l, _, d = {}) => {
    if (l === _)
      return !0;
    l = new e(l, d), _ = new e(_, d);
    let p = !1;
    e: for (const E of l.set) {
      for (const h of _.set) {
        const N = n(E, h, d);
        if (p = p || N !== null, N)
          continue e;
      }
      if (p)
        return !1;
    }
    return !0;
  }, a = [new f(">=0.0.0-0")], o = [new f(">=0.0.0")], n = (l, _, d) => {
    if (l === _)
      return !0;
    if (l.length === 1 && l[0].semver === t) {
      if (_.length === 1 && _[0].semver === t)
        return !0;
      d.includePrerelease ? l = a : l = o;
    }
    if (_.length === 1 && _[0].semver === t) {
      if (d.includePrerelease)
        return !0;
      _ = o;
    }
    const p = /* @__PURE__ */ new Set();
    let E, h;
    for (const D of l)
      D.operator === ">" || D.operator === ">=" ? E = c(E, D, d) : D.operator === "<" || D.operator === "<=" ? h = i(h, D, d) : p.add(D.semver);
    if (p.size > 1)
      return null;
    let N;
    if (E && h) {
      if (N = r(E.semver, h.semver, d), N > 0)
        return null;
      if (N === 0 && (E.operator !== ">=" || h.operator !== "<="))
        return null;
    }
    for (const D of p) {
      if (E && !u(D, String(E), d) || h && !u(D, String(h), d))
        return null;
      for (const m of _)
        if (!u(D, String(m), d))
          return !1;
      return !0;
    }
    let A, C, g, L, R = h && !d.includePrerelease && h.semver.prerelease.length ? h.semver : !1, O = E && !d.includePrerelease && E.semver.prerelease.length ? E.semver : !1;
    R && R.prerelease.length === 1 && h.operator === "<" && R.prerelease[0] === 0 && (R = !1);
    for (const D of _) {
      if (L = L || D.operator === ">" || D.operator === ">=", g = g || D.operator === "<" || D.operator === "<=", E) {
        if (O && D.semver.prerelease && D.semver.prerelease.length && D.semver.major === O.major && D.semver.minor === O.minor && D.semver.patch === O.patch && (O = !1), D.operator === ">" || D.operator === ">=") {
          if (A = c(E, D, d), A === D && A !== E)
            return !1;
        } else if (E.operator === ">=" && !u(E.semver, String(D), d))
          return !1;
      }
      if (h) {
        if (R && D.semver.prerelease && D.semver.prerelease.length && D.semver.major === R.major && D.semver.minor === R.minor && D.semver.patch === R.patch && (R = !1), D.operator === "<" || D.operator === "<=") {
          if (C = i(h, D, d), C === D && C !== h)
            return !1;
        } else if (h.operator === "<=" && !u(h.semver, String(D), d))
          return !1;
      }
      if (!D.operator && (h || E) && N !== 0)
        return !1;
    }
    return !(E && g && !h && N !== 0 || h && L && !E && N !== 0 || O || R);
  }, c = (l, _, d) => {
    if (!l)
      return _;
    const p = r(l.semver, _.semver, d);
    return p > 0 ? l : p < 0 || _.operator === ">" && l.operator === ">=" ? _ : l;
  }, i = (l, _, d) => {
    if (!l)
      return _;
    const p = r(l.semver, _.semver, d);
    return p < 0 ? l : p > 0 || _.operator === "<" && l.operator === "<=" ? _ : l;
  };
  return io = s, io;
}
var so, pf;
function R0() {
  if (pf) return so;
  pf = 1;
  const e = rn(), f = Hn(), t = it(), u = p0(), r = Ar(), s = b1(), a = y1(), o = v1(), n = F1(), c = M1(), i = x1(), l = B1(), _ = k1(), d = Et(), p = H1(), E = G1(), h = ec(), N = q1(), A = $1(), C = qn(), g = tc(), L = I0(), R = N0(), O = rc(), D = nc(), m = S0(), B = V1(), v = $n(), M = At(), F = Vn(), I = j1(), w = Y1(), x = K1(), V = z1(), z = X1(), j = ic(), J = Q1(), fe = J1(), Ce = Z1(), b = eA(), k = tA();
  return so = {
    parse: r,
    valid: s,
    clean: a,
    inc: o,
    diff: n,
    major: c,
    minor: i,
    patch: l,
    prerelease: _,
    compare: d,
    rcompare: p,
    compareLoose: E,
    compareBuild: h,
    sort: N,
    rsort: A,
    gt: C,
    lt: g,
    eq: L,
    neq: R,
    gte: O,
    lte: D,
    cmp: m,
    coerce: B,
    Comparator: v,
    Range: M,
    satisfies: F,
    toComparators: I,
    maxSatisfying: w,
    minSatisfying: x,
    minVersion: V,
    validRange: z,
    outside: j,
    gtr: J,
    ltr: fe,
    intersects: Ce,
    simplifyRange: b,
    subset: k,
    SemVer: t,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: f.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: f.RELEASE_TYPES,
    compareIdentifiers: u.compareIdentifiers,
    rcompareIdentifiers: u.rcompareIdentifiers
  }, so;
}
var ur = {}, Kr = { exports: {} };
Kr.exports;
var If;
function rA() {
  return If || (If = 1, function(e, f) {
    var t = 200, u = "__lodash_hash_undefined__", r = 1, s = 2, a = 9007199254740991, o = "[object Arguments]", n = "[object Array]", c = "[object AsyncFunction]", i = "[object Boolean]", l = "[object Date]", _ = "[object Error]", d = "[object Function]", p = "[object GeneratorFunction]", E = "[object Map]", h = "[object Number]", N = "[object Null]", A = "[object Object]", C = "[object Promise]", g = "[object Proxy]", L = "[object RegExp]", R = "[object Set]", O = "[object String]", D = "[object Symbol]", m = "[object Undefined]", B = "[object WeakMap]", v = "[object ArrayBuffer]", M = "[object DataView]", F = "[object Float32Array]", I = "[object Float64Array]", w = "[object Int8Array]", x = "[object Int16Array]", V = "[object Int32Array]", z = "[object Uint8Array]", j = "[object Uint8ClampedArray]", J = "[object Uint16Array]", fe = "[object Uint32Array]", Ce = /[\\^$.*+?()[\]{}|]/g, b = /^\[object .+?Constructor\]$/, k = /^(?:0|[1-9]\d*)$/, W = {};
    W[F] = W[I] = W[w] = W[x] = W[V] = W[z] = W[j] = W[J] = W[fe] = !0, W[o] = W[n] = W[v] = W[i] = W[M] = W[l] = W[_] = W[d] = W[E] = W[h] = W[A] = W[L] = W[R] = W[O] = W[B] = !1;
    var X = typeof dt == "object" && dt && dt.Object === Object && dt, U = typeof self == "object" && self && self.Object === Object && self, P = X || U || Function("return this")(), K = f && !f.nodeType && f, $ = K && !0 && e && !e.nodeType && e, he = $ && $.exports === K, de = he && X.process, Se = function() {
      try {
        return de && de.binding && de.binding("util");
      } catch {
      }
    }(), Re = Se && Se.isTypedArray;
    function me(G, Q) {
      for (var Ee = -1, Pe = G == null ? 0 : G.length, He = 0, ve = []; ++Ee < Pe; ) {
        var We = G[Ee];
        Q(We, Ee, G) && (ve[He++] = We);
      }
      return ve;
    }
    function be(G, Q) {
      for (var Ee = -1, Pe = Q.length, He = G.length; ++Ee < Pe; )
        G[He + Ee] = Q[Ee];
      return G;
    }
    function Ue(G, Q) {
      for (var Ee = -1, Pe = G == null ? 0 : G.length; ++Ee < Pe; )
        if (Q(G[Ee], Ee, G))
          return !0;
      return !1;
    }
    function ke(G, Q) {
      for (var Ee = -1, Pe = Array(G); ++Ee < G; )
        Pe[Ee] = Q(Ee);
      return Pe;
    }
    function Ye(G) {
      return function(Q) {
        return G(Q);
      };
    }
    function $e(G, Q) {
      return G.has(Q);
    }
    function S(G, Q) {
      return G == null ? void 0 : G[Q];
    }
    function ne(G) {
      var Q = -1, Ee = Array(G.size);
      return G.forEach(function(Pe, He) {
        Ee[++Q] = [He, Pe];
      }), Ee;
    }
    function ce(G, Q) {
      return function(Ee) {
        return G(Q(Ee));
      };
    }
    function Te(G) {
      var Q = -1, Ee = Array(G.size);
      return G.forEach(function(Pe) {
        Ee[++Q] = Pe;
      }), Ee;
    }
    var ie = Array.prototype, q = Function.prototype, H = Object.prototype, Y = P["__core-js_shared__"], te = q.toString, ee = H.hasOwnProperty, ae = function() {
      var G = /[^.]+$/.exec(Y && Y.keys && Y.keys.IE_PROTO || "");
      return G ? "Symbol(src)_1." + G : "";
    }(), ue = H.toString, pe = RegExp(
      "^" + te.call(ee).replace(Ce, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), y = he ? P.Buffer : void 0, Z = P.Symbol, re = P.Uint8Array, se = H.propertyIsEnumerable, oe = ie.splice, le = Z ? Z.toStringTag : void 0, Ie = Object.getOwnPropertySymbols, Ae = y ? y.isBuffer : void 0, _e = ce(Object.keys, Object), we = sr(P, "DataView"), ye = sr(P, "Map"), Fe = sr(P, "Promise"), Le = sr(P, "Set"), ut = sr(P, "WeakMap"), je = sr(Object, "create"), lt = Wt(we), Nr = Wt(ye), sn = Wt(Fe), v0 = Wt(Le), F0 = Wt(ut), uc = Z ? Z.prototype : void 0, jn = uc ? uc.valueOf : void 0;
    function $t(G) {
      var Q = -1, Ee = G == null ? 0 : G.length;
      for (this.clear(); ++Q < Ee; ) {
        var Pe = G[Q];
        this.set(Pe[0], Pe[1]);
      }
    }
    function M0() {
      this.__data__ = je ? je(null) : {}, this.size = 0;
    }
    function x0(G) {
      var Q = this.has(G) && delete this.__data__[G];
      return this.size -= Q ? 1 : 0, Q;
    }
    function B0(G) {
      var Q = this.__data__;
      if (je) {
        var Ee = Q[G];
        return Ee === u ? void 0 : Ee;
      }
      return ee.call(Q, G) ? Q[G] : void 0;
    }
    function k0(G) {
      var Q = this.__data__;
      return je ? Q[G] !== void 0 : ee.call(Q, G);
    }
    function H0(G, Q) {
      var Ee = this.__data__;
      return this.size += this.has(G) ? 0 : 1, Ee[G] = je && Q === void 0 ? u : Q, this;
    }
    $t.prototype.clear = M0, $t.prototype.delete = x0, $t.prototype.get = B0, $t.prototype.has = k0, $t.prototype.set = H0;
    function Ct(G) {
      var Q = -1, Ee = G == null ? 0 : G.length;
      for (this.clear(); ++Q < Ee; ) {
        var Pe = G[Q];
        this.set(Pe[0], Pe[1]);
      }
    }
    function G0() {
      this.__data__ = [], this.size = 0;
    }
    function q0(G) {
      var Q = this.__data__, Ee = on(Q, G);
      if (Ee < 0)
        return !1;
      var Pe = Q.length - 1;
      return Ee == Pe ? Q.pop() : oe.call(Q, Ee, 1), --this.size, !0;
    }
    function $0(G) {
      var Q = this.__data__, Ee = on(Q, G);
      return Ee < 0 ? void 0 : Q[Ee][1];
    }
    function V0(G) {
      return on(this.__data__, G) > -1;
    }
    function W0(G, Q) {
      var Ee = this.__data__, Pe = on(Ee, G);
      return Pe < 0 ? (++this.size, Ee.push([G, Q])) : Ee[Pe][1] = Q, this;
    }
    Ct.prototype.clear = G0, Ct.prototype.delete = q0, Ct.prototype.get = $0, Ct.prototype.has = V0, Ct.prototype.set = W0;
    function Vt(G) {
      var Q = -1, Ee = G == null ? 0 : G.length;
      for (this.clear(); ++Q < Ee; ) {
        var Pe = G[Q];
        this.set(Pe[0], Pe[1]);
      }
    }
    function j0() {
      this.size = 0, this.__data__ = {
        hash: new $t(),
        map: new (ye || Ct)(),
        string: new $t()
      };
    }
    function Y0(G) {
      var Q = cn(this, G).delete(G);
      return this.size -= Q ? 1 : 0, Q;
    }
    function K0(G) {
      return cn(this, G).get(G);
    }
    function z0(G) {
      return cn(this, G).has(G);
    }
    function X0(G, Q) {
      var Ee = cn(this, G), Pe = Ee.size;
      return Ee.set(G, Q), this.size += Ee.size == Pe ? 0 : 1, this;
    }
    Vt.prototype.clear = j0, Vt.prototype.delete = Y0, Vt.prototype.get = K0, Vt.prototype.has = z0, Vt.prototype.set = X0;
    function an(G) {
      var Q = -1, Ee = G == null ? 0 : G.length;
      for (this.__data__ = new Vt(); ++Q < Ee; )
        this.add(G[Q]);
    }
    function Q0(G) {
      return this.__data__.set(G, u), this;
    }
    function J0(G) {
      return this.__data__.has(G);
    }
    an.prototype.add = an.prototype.push = Q0, an.prototype.has = J0;
    function Pt(G) {
      var Q = this.__data__ = new Ct(G);
      this.size = Q.size;
    }
    function Z0() {
      this.__data__ = new Ct(), this.size = 0;
    }
    function ed(G) {
      var Q = this.__data__, Ee = Q.delete(G);
      return this.size = Q.size, Ee;
    }
    function td(G) {
      return this.__data__.get(G);
    }
    function rd(G) {
      return this.__data__.has(G);
    }
    function nd(G, Q) {
      var Ee = this.__data__;
      if (Ee instanceof Ct) {
        var Pe = Ee.__data__;
        if (!ye || Pe.length < t - 1)
          return Pe.push([G, Q]), this.size = ++Ee.size, this;
        Ee = this.__data__ = new Vt(Pe);
      }
      return Ee.set(G, Q), this.size = Ee.size, this;
    }
    Pt.prototype.clear = Z0, Pt.prototype.delete = ed, Pt.prototype.get = td, Pt.prototype.has = rd, Pt.prototype.set = nd;
    function id(G, Q) {
      var Ee = un(G), Pe = !Ee && Nd(G), He = !Ee && !Pe && Yn(G), ve = !Ee && !Pe && !He && Ic(G), We = Ee || Pe || He || ve, Ke = We ? ke(G.length, String) : [], Xe = Ke.length;
      for (var Ve in G)
        ee.call(G, Ve) && !(We && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Ve == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        He && (Ve == "offset" || Ve == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        ve && (Ve == "buffer" || Ve == "byteLength" || Ve == "byteOffset") || // Skip index properties.
        dd(Ve, Xe))) && Ke.push(Ve);
      return Ke;
    }
    function on(G, Q) {
      for (var Ee = G.length; Ee--; )
        if (dc(G[Ee][0], Q))
          return Ee;
      return -1;
    }
    function sd(G, Q, Ee) {
      var Pe = Q(G);
      return un(G) ? Pe : be(Pe, Ee(G));
    }
    function Sr(G) {
      return G == null ? G === void 0 ? m : N : le && le in Object(G) ? fd(G) : Id(G);
    }
    function lc(G) {
      return Rr(G) && Sr(G) == o;
    }
    function _c(G, Q, Ee, Pe, He) {
      return G === Q ? !0 : G == null || Q == null || !Rr(G) && !Rr(Q) ? G !== G && Q !== Q : ad(G, Q, Ee, Pe, _c, He);
    }
    function ad(G, Q, Ee, Pe, He, ve) {
      var We = un(G), Ke = un(Q), Xe = We ? n : Dt(G), Ve = Ke ? n : Dt(Q);
      Xe = Xe == o ? A : Xe, Ve = Ve == o ? A : Ve;
      var at = Xe == A, ht = Ve == A, Ze = Xe == Ve;
      if (Ze && Yn(G)) {
        if (!Yn(Q))
          return !1;
        We = !0, at = !1;
      }
      if (Ze && !at)
        return ve || (ve = new Pt()), We || Ic(G) ? fc(G, Q, Ee, Pe, He, ve) : ld(G, Q, Xe, Ee, Pe, He, ve);
      if (!(Ee & r)) {
        var _t = at && ee.call(G, "__wrapped__"), ft = ht && ee.call(Q, "__wrapped__");
        if (_t || ft) {
          var Ut = _t ? G.value() : G, Tt = ft ? Q.value() : Q;
          return ve || (ve = new Pt()), He(Ut, Tt, Ee, Pe, ve);
        }
      }
      return Ze ? (ve || (ve = new Pt()), _d(G, Q, Ee, Pe, He, ve)) : !1;
    }
    function od(G) {
      if (!pc(G) || Ad(G))
        return !1;
      var Q = Ec(G) ? pe : b;
      return Q.test(Wt(G));
    }
    function cd(G) {
      return Rr(G) && Ac(G.length) && !!W[Sr(G)];
    }
    function ud(G) {
      if (!pd(G))
        return _e(G);
      var Q = [];
      for (var Ee in Object(G))
        ee.call(G, Ee) && Ee != "constructor" && Q.push(Ee);
      return Q;
    }
    function fc(G, Q, Ee, Pe, He, ve) {
      var We = Ee & r, Ke = G.length, Xe = Q.length;
      if (Ke != Xe && !(We && Xe > Ke))
        return !1;
      var Ve = ve.get(G);
      if (Ve && ve.get(Q))
        return Ve == Q;
      var at = -1, ht = !0, Ze = Ee & s ? new an() : void 0;
      for (ve.set(G, Q), ve.set(Q, G); ++at < Ke; ) {
        var _t = G[at], ft = Q[at];
        if (Pe)
          var Ut = We ? Pe(ft, _t, at, Q, G, ve) : Pe(_t, ft, at, G, Q, ve);
        if (Ut !== void 0) {
          if (Ut)
            continue;
          ht = !1;
          break;
        }
        if (Ze) {
          if (!Ue(Q, function(Tt, jt) {
            if (!$e(Ze, jt) && (_t === Tt || He(_t, Tt, Ee, Pe, ve)))
              return Ze.push(jt);
          })) {
            ht = !1;
            break;
          }
        } else if (!(_t === ft || He(_t, ft, Ee, Pe, ve))) {
          ht = !1;
          break;
        }
      }
      return ve.delete(G), ve.delete(Q), ht;
    }
    function ld(G, Q, Ee, Pe, He, ve, We) {
      switch (Ee) {
        case M:
          if (G.byteLength != Q.byteLength || G.byteOffset != Q.byteOffset)
            return !1;
          G = G.buffer, Q = Q.buffer;
        case v:
          return !(G.byteLength != Q.byteLength || !ve(new re(G), new re(Q)));
        case i:
        case l:
        case h:
          return dc(+G, +Q);
        case _:
          return G.name == Q.name && G.message == Q.message;
        case L:
        case O:
          return G == Q + "";
        case E:
          var Ke = ne;
        case R:
          var Xe = Pe & r;
          if (Ke || (Ke = Te), G.size != Q.size && !Xe)
            return !1;
          var Ve = We.get(G);
          if (Ve)
            return Ve == Q;
          Pe |= s, We.set(G, Q);
          var at = fc(Ke(G), Ke(Q), Pe, He, ve, We);
          return We.delete(G), at;
        case D:
          if (jn)
            return jn.call(G) == jn.call(Q);
      }
      return !1;
    }
    function _d(G, Q, Ee, Pe, He, ve) {
      var We = Ee & r, Ke = hc(G), Xe = Ke.length, Ve = hc(Q), at = Ve.length;
      if (Xe != at && !We)
        return !1;
      for (var ht = Xe; ht--; ) {
        var Ze = Ke[ht];
        if (!(We ? Ze in Q : ee.call(Q, Ze)))
          return !1;
      }
      var _t = ve.get(G);
      if (_t && ve.get(Q))
        return _t == Q;
      var ft = !0;
      ve.set(G, Q), ve.set(Q, G);
      for (var Ut = We; ++ht < Xe; ) {
        Ze = Ke[ht];
        var Tt = G[Ze], jt = Q[Ze];
        if (Pe)
          var Nc = We ? Pe(jt, Tt, Ze, Q, G, ve) : Pe(Tt, jt, Ze, G, Q, ve);
        if (!(Nc === void 0 ? Tt === jt || He(Tt, jt, Ee, Pe, ve) : Nc)) {
          ft = !1;
          break;
        }
        Ut || (Ut = Ze == "constructor");
      }
      if (ft && !Ut) {
        var ln = G.constructor, _n = Q.constructor;
        ln != _n && "constructor" in G && "constructor" in Q && !(typeof ln == "function" && ln instanceof ln && typeof _n == "function" && _n instanceof _n) && (ft = !1);
      }
      return ve.delete(G), ve.delete(Q), ft;
    }
    function hc(G) {
      return sd(G, Cd, hd);
    }
    function cn(G, Q) {
      var Ee = G.__data__;
      return Ed(Q) ? Ee[typeof Q == "string" ? "string" : "hash"] : Ee.map;
    }
    function sr(G, Q) {
      var Ee = S(G, Q);
      return od(Ee) ? Ee : void 0;
    }
    function fd(G) {
      var Q = ee.call(G, le), Ee = G[le];
      try {
        G[le] = void 0;
        var Pe = !0;
      } catch {
      }
      var He = ue.call(G);
      return Pe && (Q ? G[le] = Ee : delete G[le]), He;
    }
    var hd = Ie ? function(G) {
      return G == null ? [] : (G = Object(G), me(Ie(G), function(Q) {
        return se.call(G, Q);
      }));
    } : Td, Dt = Sr;
    (we && Dt(new we(new ArrayBuffer(1))) != M || ye && Dt(new ye()) != E || Fe && Dt(Fe.resolve()) != C || Le && Dt(new Le()) != R || ut && Dt(new ut()) != B) && (Dt = function(G) {
      var Q = Sr(G), Ee = Q == A ? G.constructor : void 0, Pe = Ee ? Wt(Ee) : "";
      if (Pe)
        switch (Pe) {
          case lt:
            return M;
          case Nr:
            return E;
          case sn:
            return C;
          case v0:
            return R;
          case F0:
            return B;
        }
      return Q;
    });
    function dd(G, Q) {
      return Q = Q ?? a, !!Q && (typeof G == "number" || k.test(G)) && G > -1 && G % 1 == 0 && G < Q;
    }
    function Ed(G) {
      var Q = typeof G;
      return Q == "string" || Q == "number" || Q == "symbol" || Q == "boolean" ? G !== "__proto__" : G === null;
    }
    function Ad(G) {
      return !!ae && ae in G;
    }
    function pd(G) {
      var Q = G && G.constructor, Ee = typeof Q == "function" && Q.prototype || H;
      return G === Ee;
    }
    function Id(G) {
      return ue.call(G);
    }
    function Wt(G) {
      if (G != null) {
        try {
          return te.call(G);
        } catch {
        }
        try {
          return G + "";
        } catch {
        }
      }
      return "";
    }
    function dc(G, Q) {
      return G === Q || G !== G && Q !== Q;
    }
    var Nd = lc(/* @__PURE__ */ function() {
      return arguments;
    }()) ? lc : function(G) {
      return Rr(G) && ee.call(G, "callee") && !se.call(G, "callee");
    }, un = Array.isArray;
    function Sd(G) {
      return G != null && Ac(G.length) && !Ec(G);
    }
    var Yn = Ae || gd;
    function Rd(G, Q) {
      return _c(G, Q);
    }
    function Ec(G) {
      if (!pc(G))
        return !1;
      var Q = Sr(G);
      return Q == d || Q == p || Q == c || Q == g;
    }
    function Ac(G) {
      return typeof G == "number" && G > -1 && G % 1 == 0 && G <= a;
    }
    function pc(G) {
      var Q = typeof G;
      return G != null && (Q == "object" || Q == "function");
    }
    function Rr(G) {
      return G != null && typeof G == "object";
    }
    var Ic = Re ? Ye(Re) : cd;
    function Cd(G) {
      return Sd(G) ? id(G) : ud(G);
    }
    function Td() {
      return [];
    }
    function gd() {
      return !1;
    }
    e.exports = Rd;
  }(Kr, Kr.exports)), Kr.exports;
}
var Nf;
function nA() {
  if (Nf) return ur;
  Nf = 1, Object.defineProperty(ur, "__esModule", { value: !0 }), ur.DownloadedUpdateHelper = void 0, ur.createTempUpdateFile = o;
  const e = ot, f = ze, t = rA(), u = /* @__PURE__ */ qt(), r = xe;
  let s = class {
    constructor(c) {
      this.cacheDir = c, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
    }
    get downloadedFileInfo() {
      return this._downloadedFileInfo;
    }
    get file() {
      return this._file;
    }
    get packageFile() {
      return this._packageFile;
    }
    get cacheDirForPendingUpdate() {
      return r.join(this.cacheDir, "pending");
    }
    async validateDownloadedPath(c, i, l, _) {
      if (this.versionInfo != null && this.file === c && this.fileInfo != null)
        return t(this.versionInfo, i) && t(this.fileInfo.info, l.info) && await (0, u.pathExists)(c) ? c : null;
      const d = await this.getValidCachedUpdateFile(l, _);
      return d === null ? null : (_.info(`Update has already been downloaded to ${c}).`), this._file = d, d);
    }
    async setDownloadedFile(c, i, l, _, d, p) {
      this._file = c, this._packageFile = i, this.versionInfo = l, this.fileInfo = _, this._downloadedFileInfo = {
        fileName: d,
        sha512: _.info.sha512,
        isAdminRightsRequired: _.info.isAdminRightsRequired === !0
      }, p && await (0, u.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, u.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(c, i) {
      const l = this.getUpdateInfoFile();
      if (!await (0, u.pathExists)(l))
        return null;
      let d;
      try {
        d = await (0, u.readJson)(l);
      } catch (N) {
        let A = "No cached update info available";
        return N.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), A += ` (error on read: ${N.message})`), i.info(A), null;
      }
      if (!((d == null ? void 0 : d.fileName) !== null))
        return i.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (c.info.sha512 !== d.sha512)
        return i.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${d.sha512}, expected: ${c.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const E = r.join(this.cacheDirForPendingUpdate, d.fileName);
      if (!await (0, u.pathExists)(E))
        return i.info("Cached update file doesn't exist"), null;
      const h = await a(E);
      return c.info.sha512 !== h ? (i.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${h}, expected: ${c.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = d, E);
    }
    getUpdateInfoFile() {
      return r.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  ur.DownloadedUpdateHelper = s;
  function a(n, c = "sha512", i = "base64", l) {
    return new Promise((_, d) => {
      const p = (0, e.createHash)(c);
      p.on("error", d).setEncoding(i), (0, f.createReadStream)(n, {
        ...l,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", d).on("end", () => {
        p.end(), _(p.read());
      }).pipe(p, { end: !1 });
    });
  }
  async function o(n, c, i) {
    let l = 0, _ = r.join(c, n);
    for (let d = 0; d < 3; d++)
      try {
        return await (0, u.unlink)(_), _;
      } catch (p) {
        if (p.code === "ENOENT")
          return _;
        i.warn(`Error on remove temp update file: ${p}`), _ = r.join(c, `${l++}-${n}`);
      }
    return _;
  }
  return ur;
}
var Ur = {}, wn = {}, Sf;
function iA() {
  if (Sf) return wn;
  Sf = 1, Object.defineProperty(wn, "__esModule", { value: !0 }), wn.getAppCacheDir = t;
  const e = xe, f = Nt;
  function t() {
    const u = (0, f.homedir)();
    let r;
    return process.platform === "win32" ? r = process.env.LOCALAPPDATA || e.join(u, "AppData", "Local") : process.platform === "darwin" ? r = e.join(u, "Library", "Caches") : r = process.env.XDG_CACHE_HOME || e.join(u, ".cache"), r;
  }
  return wn;
}
var Rf;
function sA() {
  if (Rf) return Ur;
  Rf = 1, Object.defineProperty(Ur, "__esModule", { value: !0 }), Ur.ElectronAppAdapter = void 0;
  const e = xe, f = iA();
  let t = class {
    constructor(r = xt.app) {
      this.app = r;
    }
    whenReady() {
      return this.app.whenReady();
    }
    get version() {
      return this.app.getVersion();
    }
    get name() {
      return this.app.getName();
    }
    get isPackaged() {
      return this.app.isPackaged === !0;
    }
    get appUpdateConfigPath() {
      return this.isPackaged ? e.join(process.resourcesPath, "app-update.yml") : e.join(this.app.getAppPath(), "dev-app-update.yml");
    }
    get userDataPath() {
      return this.app.getPath("userData");
    }
    get baseCachePath() {
      return (0, f.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(r) {
      this.app.once("quit", (s, a) => r(a));
    }
  };
  return Ur.ElectronAppAdapter = t, Ur;
}
var ao = {}, Cf;
function aA() {
  return Cf || (Cf = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = t;
    const f = Je();
    e.NET_SESSION_NAME = "electron-updater";
    function t() {
      return xt.session.fromPartition(e.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class u extends f.HttpExecutor {
      constructor(s) {
        super(), this.proxyLoginCallback = s, this.cachedSession = null;
      }
      async download(s, a, o) {
        return await o.cancellationToken.createPromise((n, c, i) => {
          const l = {
            headers: o.headers || void 0,
            redirect: "manual"
          };
          (0, f.configureRequestUrl)(s, l), (0, f.configureRequestOptions)(l), this.doDownload(l, {
            destination: a,
            options: o,
            onCancel: i,
            callback: (_) => {
              _ == null ? n(a) : c(_);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(s, a) {
        s.headers && s.headers.Host && (s.host = s.headers.Host, delete s.headers.Host), this.cachedSession == null && (this.cachedSession = t());
        const o = xt.net.request({
          ...s,
          session: this.cachedSession
        });
        return o.on("response", a), this.proxyLoginCallback != null && o.on("login", this.proxyLoginCallback), o;
      }
      addRedirectHandlers(s, a, o, n, c) {
        s.on("redirect", (i, l, _) => {
          s.abort(), n > this.maxRedirects ? o(this.createMaxRedirectError()) : c(f.HttpExecutor.prepareRedirectUrlOptions(_, a));
        });
      }
    }
    e.ElectronHttpExecutor = u;
  }(ao)), ao;
}
var Lr = {}, Qt = {}, oo, Tf;
function oA() {
  if (Tf) return oo;
  Tf = 1;
  var e = "[object Symbol]", f = /[\\^$.*+?()[\]{}|]/g, t = RegExp(f.source), u = typeof dt == "object" && dt && dt.Object === Object && dt, r = typeof self == "object" && self && self.Object === Object && self, s = u || r || Function("return this")(), a = Object.prototype, o = a.toString, n = s.Symbol, c = n ? n.prototype : void 0, i = c ? c.toString : void 0;
  function l(h) {
    if (typeof h == "string")
      return h;
    if (d(h))
      return i ? i.call(h) : "";
    var N = h + "";
    return N == "0" && 1 / h == -1 / 0 ? "-0" : N;
  }
  function _(h) {
    return !!h && typeof h == "object";
  }
  function d(h) {
    return typeof h == "symbol" || _(h) && o.call(h) == e;
  }
  function p(h) {
    return h == null ? "" : l(h);
  }
  function E(h) {
    return h = p(h), h && t.test(h) ? h.replace(f, "\\$&") : h;
  }
  return oo = E, oo;
}
var gf;
function rr() {
  if (gf) return Qt;
  gf = 1, Object.defineProperty(Qt, "__esModule", { value: !0 }), Qt.newBaseUrl = t, Qt.newUrlFromBase = u, Qt.getChannelFilename = r, Qt.blockmapFiles = s;
  const e = fr, f = oA();
  function t(a) {
    const o = new e.URL(a);
    return o.pathname.endsWith("/") || (o.pathname += "/"), o;
  }
  function u(a, o, n = !1) {
    const c = new e.URL(a, o), i = o.search;
    return i != null && i.length !== 0 ? c.search = i : n && (c.search = `noCache=${Date.now().toString(32)}`), c;
  }
  function r(a) {
    return `${a}.yml`;
  }
  function s(a, o, n) {
    const c = u(`${a.pathname}.blockmap`, a);
    return [u(`${a.pathname.replace(new RegExp(f(n), "g"), o)}.blockmap`, a), c];
  }
  return Qt;
}
var Ot = {}, mf;
function pt() {
  if (mf) return Ot;
  mf = 1, Object.defineProperty(Ot, "__esModule", { value: !0 }), Ot.Provider = void 0, Ot.findFile = r, Ot.parseUpdateInfo = s, Ot.getFileList = a, Ot.resolveFiles = o;
  const e = Je(), f = Jo(), t = rr();
  let u = class {
    constructor(c) {
      this.runtimeOptions = c, this.requestHeaders = null, this.executor = c.executor;
    }
    get isUseMultipleRangeRequest() {
      return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
    }
    getChannelFilePrefix() {
      if (this.runtimeOptions.platform === "linux") {
        const c = process.env.TEST_UPDATER_ARCH || process.arch;
        return "-linux" + (c === "x64" ? "" : `-${c}`);
      } else
        return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
    // due to historical reasons for windows we use channel name without platform specifier
    getDefaultChannelName() {
      return this.getCustomChannelName("latest");
    }
    getCustomChannelName(c) {
      return `${c}${this.getChannelFilePrefix()}`;
    }
    get fileExtraDownloadHeaders() {
      return null;
    }
    setRequestHeaders(c) {
      this.requestHeaders = c;
    }
    /**
     * Method to perform API request only to resolve update info, but not to download update.
     */
    httpRequest(c, i, l) {
      return this.executor.request(this.createRequestOptions(c, i), l);
    }
    createRequestOptions(c, i) {
      const l = {};
      return this.requestHeaders == null ? i != null && (l.headers = i) : l.headers = i == null ? this.requestHeaders : { ...this.requestHeaders, ...i }, (0, e.configureRequestUrl)(c, l), l;
    }
  };
  Ot.Provider = u;
  function r(n, c, i) {
    if (n.length === 0)
      throw (0, e.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const l = n.find((_) => _.url.pathname.toLowerCase().endsWith(`.${c}`));
    return l ?? (i == null ? n[0] : n.find((_) => !i.some((d) => _.url.pathname.toLowerCase().endsWith(`.${d}`))));
  }
  function s(n, c, i) {
    if (n == null)
      throw (0, e.newError)(`Cannot parse update info from ${c} in the latest release artifacts (${i}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let l;
    try {
      l = (0, f.load)(n);
    } catch (_) {
      throw (0, e.newError)(`Cannot parse update info from ${c} in the latest release artifacts (${i}): ${_.stack || _.message}, rawData: ${n}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return l;
  }
  function a(n) {
    const c = n.files;
    if (c != null && c.length > 0)
      return c;
    if (n.path != null)
      return [
        {
          url: n.path,
          sha2: n.sha2,
          sha512: n.sha512
        }
      ];
    throw (0, e.newError)(`No files provided: ${(0, e.safeStringifyJson)(n)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function o(n, c, i = (l) => l) {
    const _ = a(n).map((E) => {
      if (E.sha2 == null && E.sha512 == null)
        throw (0, e.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, e.safeStringifyJson)(E)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, t.newUrlFromBase)(i(E.url), c),
        info: E
      };
    }), d = n.packages, p = d == null ? null : d[process.arch] || d.ia32;
    return p != null && (_[0].packageInfo = {
      ...p,
      path: (0, t.newUrlFromBase)(i(p.path), c).href
    }), _;
  }
  return Ot;
}
var Of;
function C0() {
  if (Of) return Lr;
  Of = 1, Object.defineProperty(Lr, "__esModule", { value: !0 }), Lr.GenericProvider = void 0;
  const e = Je(), f = rr(), t = pt();
  let u = class extends t.Provider {
    constructor(s, a, o) {
      super(o), this.configuration = s, this.updater = a, this.baseUrl = (0, f.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const s = this.updater.channel || this.configuration.channel;
      return s == null ? this.getDefaultChannelName() : this.getCustomChannelName(s);
    }
    async getLatestVersion() {
      const s = (0, f.getChannelFilename)(this.channel), a = (0, f.newUrlFromBase)(s, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let o = 0; ; o++)
        try {
          return (0, t.parseUpdateInfo)(await this.httpRequest(a), s, a);
        } catch (n) {
          if (n instanceof e.HttpError && n.statusCode === 404)
            throw (0, e.newError)(`Cannot find channel "${s}" update info: ${n.stack || n.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (n.code === "ECONNREFUSED" && o < 3) {
            await new Promise((c, i) => {
              try {
                setTimeout(c, 1e3 * o);
              } catch (l) {
                i(l);
              }
            });
            continue;
          }
          throw n;
        }
    }
    resolveFiles(s) {
      return (0, t.resolveFiles)(s, this.baseUrl);
    }
  };
  return Lr.GenericProvider = u, Lr;
}
var br = {}, yr = {}, wf;
function cA() {
  if (wf) return yr;
  wf = 1, Object.defineProperty(yr, "__esModule", { value: !0 }), yr.BitbucketProvider = void 0;
  const e = Je(), f = rr(), t = pt();
  let u = class extends t.Provider {
    constructor(s, a, o) {
      super({
        ...o,
        isUseMultipleRangeRequest: !1
      }), this.configuration = s, this.updater = a;
      const { owner: n, slug: c } = s;
      this.baseUrl = (0, f.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${n}/${c}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const s = new e.CancellationToken(), a = (0, f.getChannelFilename)(this.getCustomChannelName(this.channel)), o = (0, f.newUrlFromBase)(a, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const n = await this.httpRequest(o, void 0, s);
        return (0, t.parseUpdateInfo)(n, a, o);
      } catch (n) {
        throw (0, e.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${n.stack || n.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(s) {
      return (0, t.resolveFiles)(s, this.baseUrl);
    }
    toString() {
      const { owner: s, slug: a } = this.configuration;
      return `Bitbucket (owner: ${s}, slug: ${a}, channel: ${this.channel})`;
    }
  };
  return yr.BitbucketProvider = u, yr;
}
var yt = {}, Pf;
function T0() {
  if (Pf) return yt;
  Pf = 1, Object.defineProperty(yt, "__esModule", { value: !0 }), yt.GitHubProvider = yt.BaseGitHubProvider = void 0, yt.computeReleaseNotes = c;
  const e = Je(), f = R0(), t = fr, u = rr(), r = pt(), s = /\/tag\/([^/]+)$/;
  class a extends r.Provider {
    constructor(l, _, d) {
      super({
        ...d,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = l, this.baseUrl = (0, u.newBaseUrl)((0, e.githubUrl)(l, _));
      const p = _ === "github.com" ? "api.github.com" : _;
      this.baseApiUrl = (0, u.newBaseUrl)((0, e.githubUrl)(l, p));
    }
    computeGithubBasePath(l) {
      const _ = this.options.host;
      return _ && !["github.com", "api.github.com"].includes(_) ? `/api/v3${l}` : l;
    }
  }
  yt.BaseGitHubProvider = a;
  let o = class extends a {
    constructor(l, _, d) {
      super(l, "github.com", d), this.options = l, this.updater = _;
    }
    get channel() {
      const l = this.updater.channel || this.options.channel;
      return l == null ? this.getDefaultChannelName() : this.getCustomChannelName(l);
    }
    async getLatestVersion() {
      var l, _, d, p, E;
      const h = new e.CancellationToken(), N = await this.httpRequest((0, u.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, h), A = (0, e.parseXml)(N);
      let C = A.element("entry", !1, "No published versions on GitHub"), g = null;
      try {
        if (this.updater.allowPrerelease) {
          const B = ((l = this.updater) === null || l === void 0 ? void 0 : l.channel) || ((_ = f.prerelease(this.updater.currentVersion)) === null || _ === void 0 ? void 0 : _[0]) || null;
          if (B === null)
            g = s.exec(C.element("link").attribute("href"))[1];
          else
            for (const v of A.getElements("entry")) {
              const M = s.exec(v.element("link").attribute("href"));
              if (M === null)
                continue;
              const F = M[1], I = ((d = f.prerelease(F)) === null || d === void 0 ? void 0 : d[0]) || null, w = !B || ["alpha", "beta"].includes(B), x = I !== null && !["alpha", "beta"].includes(String(I));
              if (w && !x && !(B === "beta" && I === "alpha")) {
                g = F;
                break;
              }
              if (I && I === B) {
                g = F;
                break;
              }
            }
        } else {
          g = await this.getLatestTagName(h);
          for (const B of A.getElements("entry"))
            if (s.exec(B.element("link").attribute("href"))[1] === g) {
              C = B;
              break;
            }
        }
      } catch (B) {
        throw (0, e.newError)(`Cannot parse releases feed: ${B.stack || B.message},
XML:
${N}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if (g == null)
        throw (0, e.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let L, R = "", O = "";
      const D = async (B) => {
        R = (0, u.getChannelFilename)(B), O = (0, u.newUrlFromBase)(this.getBaseDownloadPath(String(g), R), this.baseUrl);
        const v = this.createRequestOptions(O);
        try {
          return await this.executor.request(v, h);
        } catch (M) {
          throw M instanceof e.HttpError && M.statusCode === 404 ? (0, e.newError)(`Cannot find ${R} in the latest release artifacts (${O}): ${M.stack || M.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : M;
        }
      };
      try {
        let B = this.channel;
        this.updater.allowPrerelease && (!((p = f.prerelease(g)) === null || p === void 0) && p[0]) && (B = this.getCustomChannelName(String((E = f.prerelease(g)) === null || E === void 0 ? void 0 : E[0]))), L = await D(B);
      } catch (B) {
        if (this.updater.allowPrerelease)
          L = await D(this.getDefaultChannelName());
        else
          throw B;
      }
      const m = (0, r.parseUpdateInfo)(L, R, O);
      return m.releaseName == null && (m.releaseName = C.elementValueOrEmpty("title")), m.releaseNotes == null && (m.releaseNotes = c(this.updater.currentVersion, this.updater.fullChangelog, A, C)), {
        tag: g,
        ...m
      };
    }
    async getLatestTagName(l) {
      const _ = this.options, d = _.host == null || _.host === "github.com" ? (0, u.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new t.URL(`${this.computeGithubBasePath(`/repos/${_.owner}/${_.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const p = await this.httpRequest(d, { Accept: "application/json" }, l);
        return p == null ? null : JSON.parse(p).tag_name;
      } catch (p) {
        throw (0, e.newError)(`Unable to find latest version on GitHub (${d}), please ensure a production release exists: ${p.stack || p.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(l) {
      return (0, r.resolveFiles)(l, this.baseUrl, (_) => this.getBaseDownloadPath(l.tag, _.replace(/ /g, "-")));
    }
    getBaseDownloadPath(l, _) {
      return `${this.basePath}/download/${l}/${_}`;
    }
  };
  yt.GitHubProvider = o;
  function n(i) {
    const l = i.elementValueOrEmpty("content");
    return l === "No content." ? "" : l;
  }
  function c(i, l, _, d) {
    if (!l)
      return n(d);
    const p = [];
    for (const E of _.getElements("entry")) {
      const h = /\/tag\/v?([^/]+)$/.exec(E.element("link").attribute("href"))[1];
      f.lt(i, h) && p.push({
        version: h,
        note: n(E)
      });
    }
    return p.sort((E, h) => f.rcompare(E.version, h.version));
  }
  return yt;
}
var vr = {}, Df;
function uA() {
  if (Df) return vr;
  Df = 1, Object.defineProperty(vr, "__esModule", { value: !0 }), vr.KeygenProvider = void 0;
  const e = Je(), f = rr(), t = pt();
  let u = class extends t.Provider {
    constructor(s, a, o) {
      super({
        ...o,
        isUseMultipleRangeRequest: !1
      }), this.configuration = s, this.updater = a, this.baseUrl = (0, f.newBaseUrl)(`https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const s = new e.CancellationToken(), a = (0, f.getChannelFilename)(this.getCustomChannelName(this.channel)), o = (0, f.newUrlFromBase)(a, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const n = await this.httpRequest(o, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, s);
        return (0, t.parseUpdateInfo)(n, a, o);
      } catch (n) {
        throw (0, e.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${n.stack || n.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(s) {
      return (0, t.resolveFiles)(s, this.baseUrl);
    }
    toString() {
      const { account: s, product: a, platform: o } = this.configuration;
      return `Keygen (account: ${s}, product: ${a}, platform: ${o}, channel: ${this.channel})`;
    }
  };
  return vr.KeygenProvider = u, vr;
}
var Fr = {}, Uf;
function lA() {
  if (Uf) return Fr;
  Uf = 1, Object.defineProperty(Fr, "__esModule", { value: !0 }), Fr.PrivateGitHubProvider = void 0;
  const e = Je(), f = Jo(), t = xe, u = fr, r = rr(), s = T0(), a = pt();
  let o = class extends s.BaseGitHubProvider {
    constructor(c, i, l, _) {
      super(c, "api.github.com", _), this.updater = i, this.token = l;
    }
    createRequestOptions(c, i) {
      const l = super.createRequestOptions(c, i);
      return l.redirect = "manual", l;
    }
    async getLatestVersion() {
      const c = new e.CancellationToken(), i = (0, r.getChannelFilename)(this.getDefaultChannelName()), l = await this.getLatestVersionInfo(c), _ = l.assets.find((E) => E.name === i);
      if (_ == null)
        throw (0, e.newError)(`Cannot find ${i} in the release ${l.html_url || l.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const d = new u.URL(_.url);
      let p;
      try {
        p = (0, f.load)(await this.httpRequest(d, this.configureHeaders("application/octet-stream"), c));
      } catch (E) {
        throw E instanceof e.HttpError && E.statusCode === 404 ? (0, e.newError)(`Cannot find ${i} in the latest release artifacts (${d}): ${E.stack || E.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : E;
      }
      return p.assets = l.assets, p;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(c) {
      return {
        accept: c,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(c) {
      const i = this.updater.allowPrerelease;
      let l = this.basePath;
      i || (l = `${l}/latest`);
      const _ = (0, r.newUrlFromBase)(l, this.baseUrl);
      try {
        const d = JSON.parse(await this.httpRequest(_, this.configureHeaders("application/vnd.github.v3+json"), c));
        return i ? d.find((p) => p.prerelease) || d[0] : d;
      } catch (d) {
        throw (0, e.newError)(`Unable to find latest version on GitHub (${_}), please ensure a production release exists: ${d.stack || d.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(c) {
      return (0, a.getFileList)(c).map((i) => {
        const l = t.posix.basename(i.url).replace(/ /g, "-"), _ = c.assets.find((d) => d != null && d.name === l);
        if (_ == null)
          throw (0, e.newError)(`Cannot find asset "${l}" in: ${JSON.stringify(c.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new u.URL(_.url),
          info: i
        };
      });
    }
  };
  return Fr.PrivateGitHubProvider = o, Fr;
}
var Lf;
function _A() {
  if (Lf) return br;
  Lf = 1, Object.defineProperty(br, "__esModule", { value: !0 }), br.isUrlProbablySupportMultiRangeRequests = a, br.createClient = o;
  const e = Je(), f = cA(), t = C0(), u = T0(), r = uA(), s = lA();
  function a(n) {
    return !n.includes("s3.amazonaws.com");
  }
  function o(n, c, i) {
    if (typeof n == "string")
      throw (0, e.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const l = n.provider;
    switch (l) {
      case "github": {
        const _ = n, d = (_.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || _.token;
        return d == null ? new u.GitHubProvider(_, c, i) : new s.PrivateGitHubProvider(_, c, d, i);
      }
      case "bitbucket":
        return new f.BitbucketProvider(n, c, i);
      case "keygen":
        return new r.KeygenProvider(n, c, i);
      case "s3":
      case "spaces":
        return new t.GenericProvider({
          provider: "generic",
          url: (0, e.getS3LikeProviderBaseUrl)(n),
          channel: n.channel || null
        }, c, {
          ...i,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const _ = n;
        return new t.GenericProvider(_, c, {
          ...i,
          isUseMultipleRangeRequest: _.useMultipleRangeRequest !== !1 && a(_.url)
        });
      }
      case "custom": {
        const _ = n, d = _.updateProvider;
        if (!d)
          throw (0, e.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new d(_, c, i);
      }
      default:
        throw (0, e.newError)(`Unsupported provider: ${l}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return br;
}
var Mr = {}, xr = {}, lr = {}, _r = {}, bf;
function sc() {
  if (bf) return _r;
  bf = 1, Object.defineProperty(_r, "__esModule", { value: !0 }), _r.OperationKind = void 0, _r.computeOperations = f;
  var e;
  (function(a) {
    a[a.COPY = 0] = "COPY", a[a.DOWNLOAD = 1] = "DOWNLOAD";
  })(e || (_r.OperationKind = e = {}));
  function f(a, o, n) {
    const c = s(a.files), i = s(o.files);
    let l = null;
    const _ = o.files[0], d = [], p = _.name, E = c.get(p);
    if (E == null)
      throw new Error(`no file ${p} in old blockmap`);
    const h = i.get(p);
    let N = 0;
    const { checksumToOffset: A, checksumToOldSize: C } = r(c.get(p), E.offset, n);
    let g = _.offset;
    for (let L = 0; L < h.checksums.length; g += h.sizes[L], L++) {
      const R = h.sizes[L], O = h.checksums[L];
      let D = A.get(O);
      D != null && C.get(O) !== R && (n.warn(`Checksum ("${O}") matches, but size differs (old: ${C.get(O)}, new: ${R})`), D = void 0), D === void 0 ? (N++, l != null && l.kind === e.DOWNLOAD && l.end === g ? l.end += R : (l = {
        kind: e.DOWNLOAD,
        start: g,
        end: g + R
        // oldBlocks: null,
      }, u(l, d, O, L))) : l != null && l.kind === e.COPY && l.end === D ? l.end += R : (l = {
        kind: e.COPY,
        start: D,
        end: D + R
        // oldBlocks: [checksum]
      }, u(l, d, O, L));
    }
    return N > 0 && n.info(`File${_.name === "file" ? "" : " " + _.name} has ${N} changed blocks`), d;
  }
  const t = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function u(a, o, n, c) {
    if (t && o.length !== 0) {
      const i = o[o.length - 1];
      if (i.kind === a.kind && a.start < i.end && a.start > i.start) {
        const l = [i.start, i.end, a.start, a.end].reduce((_, d) => _ < d ? _ : d);
        throw new Error(`operation (block index: ${c}, checksum: ${n}, kind: ${e[a.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${a.start} until ${a.end}
rel: ${i.start - l} until ${i.end - l} and ${a.start - l} until ${a.end - l}`);
      }
    }
    o.push(a);
  }
  function r(a, o, n) {
    const c = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    let l = o;
    for (let _ = 0; _ < a.checksums.length; _++) {
      const d = a.checksums[_], p = a.sizes[_], E = i.get(d);
      if (E === void 0)
        c.set(d, l), i.set(d, p);
      else if (n.debug != null) {
        const h = E === p ? "(same size)" : `(size: ${E}, this size: ${p})`;
        n.debug(`${d} duplicated in blockmap ${h}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      l += p;
    }
    return { checksumToOffset: c, checksumToOldSize: i };
  }
  function s(a) {
    const o = /* @__PURE__ */ new Map();
    for (const n of a)
      o.set(n.name, n);
    return o;
  }
  return _r;
}
var yf;
function g0() {
  if (yf) return lr;
  yf = 1, Object.defineProperty(lr, "__esModule", { value: !0 }), lr.DataSplitter = void 0, lr.copyData = a;
  const e = Je(), f = ze, t = Bt, u = sc(), r = Buffer.from(`\r
\r
`);
  var s;
  (function(n) {
    n[n.INIT = 0] = "INIT", n[n.HEADER = 1] = "HEADER", n[n.BODY = 2] = "BODY";
  })(s || (s = {}));
  function a(n, c, i, l, _) {
    const d = (0, f.createReadStream)("", {
      fd: i,
      autoClose: !1,
      start: n.start,
      // end is inclusive
      end: n.end - 1
    });
    d.on("error", l), d.once("end", _), d.pipe(c, {
      end: !1
    });
  }
  let o = class extends t.Writable {
    constructor(c, i, l, _, d, p) {
      super(), this.out = c, this.options = i, this.partIndexToTaskIndex = l, this.partIndexToLength = d, this.finishHandler = p, this.partIndex = -1, this.headerListBuffer = null, this.readState = s.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = _.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(c, i, l) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${c.length} bytes`);
        return;
      }
      this.handleData(c).then(l).catch(l);
    }
    async handleData(c) {
      let i = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, e.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const l = Math.min(this.ignoreByteCount, c.length);
        this.ignoreByteCount -= l, i = l;
      } else if (this.remainingPartDataCount > 0) {
        const l = Math.min(this.remainingPartDataCount, c.length);
        this.remainingPartDataCount -= l, await this.processPartData(c, 0, l), i = l;
      }
      if (i !== c.length) {
        if (this.readState === s.HEADER) {
          const l = this.searchHeaderListEnd(c, i);
          if (l === -1)
            return;
          i = l, this.readState = s.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === s.BODY)
            this.readState = s.INIT;
          else {
            this.partIndex++;
            let p = this.partIndexToTaskIndex.get(this.partIndex);
            if (p == null)
              if (this.isFinished)
                p = this.options.end;
              else
                throw (0, e.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const E = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (E < p)
              await this.copyExistingData(E, p);
            else if (E > p)
              throw (0, e.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (i = this.searchHeaderListEnd(c, i), i === -1) {
              this.readState = s.HEADER;
              return;
            }
          }
          const l = this.partIndexToLength[this.partIndex], _ = i + l, d = Math.min(_, c.length);
          if (await this.processPartStarted(c, i, d), this.remainingPartDataCount = l - (d - i), this.remainingPartDataCount > 0)
            return;
          if (i = _ + this.boundaryLength, i >= c.length) {
            this.ignoreByteCount = this.boundaryLength - (c.length - _);
            return;
          }
        }
      }
    }
    copyExistingData(c, i) {
      return new Promise((l, _) => {
        const d = () => {
          if (c === i) {
            l();
            return;
          }
          const p = this.options.tasks[c];
          if (p.kind !== u.OperationKind.COPY) {
            _(new Error("Task kind must be COPY"));
            return;
          }
          a(p, this.out, this.options.oldFileFd, _, () => {
            c++, d();
          });
        };
        d();
      });
    }
    searchHeaderListEnd(c, i) {
      const l = c.indexOf(r, i);
      if (l !== -1)
        return l + r.length;
      const _ = i === 0 ? c : c.slice(i);
      return this.headerListBuffer == null ? this.headerListBuffer = _ : this.headerListBuffer = Buffer.concat([this.headerListBuffer, _]), -1;
    }
    onPartEnd() {
      const c = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== c)
        throw (0, e.newError)(`Expected length: ${c} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(c, i, l) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(c, i, l);
    }
    processPartData(c, i, l) {
      this.actualPartLength += l - i;
      const _ = this.out;
      return _.write(i === 0 && c.length === l ? c : c.slice(i, l)) ? Promise.resolve() : new Promise((d, p) => {
        _.on("error", p), _.once("drain", () => {
          _.removeListener("error", p), d();
        });
      });
    }
  };
  return lr.DataSplitter = o, lr;
}
var Br = {}, vf;
function fA() {
  if (vf) return Br;
  vf = 1, Object.defineProperty(Br, "__esModule", { value: !0 }), Br.executeTasksUsingMultipleRangeRequests = u, Br.checkIsRangesSupported = s;
  const e = Je(), f = g0(), t = sc();
  function u(a, o, n, c, i) {
    const l = (_) => {
      if (_ >= o.length) {
        a.fileMetadataBuffer != null && n.write(a.fileMetadataBuffer), n.end();
        return;
      }
      const d = _ + 1e3;
      r(a, {
        tasks: o,
        start: _,
        end: Math.min(o.length, d),
        oldFileFd: c
      }, n, () => l(d), i);
    };
    return l;
  }
  function r(a, o, n, c, i) {
    let l = "bytes=", _ = 0;
    const d = /* @__PURE__ */ new Map(), p = [];
    for (let N = o.start; N < o.end; N++) {
      const A = o.tasks[N];
      A.kind === t.OperationKind.DOWNLOAD && (l += `${A.start}-${A.end - 1}, `, d.set(_, N), _++, p.push(A.end - A.start));
    }
    if (_ <= 1) {
      const N = (A) => {
        if (A >= o.end) {
          c();
          return;
        }
        const C = o.tasks[A++];
        if (C.kind === t.OperationKind.COPY)
          (0, f.copyData)(C, n, o.oldFileFd, i, () => N(A));
        else {
          const g = a.createRequestOptions();
          g.headers.Range = `bytes=${C.start}-${C.end - 1}`;
          const L = a.httpExecutor.createRequest(g, (R) => {
            s(R, i) && (R.pipe(n, {
              end: !1
            }), R.once("end", () => N(A)));
          });
          a.httpExecutor.addErrorAndTimeoutHandlers(L, i), L.end();
        }
      };
      N(o.start);
      return;
    }
    const E = a.createRequestOptions();
    E.headers.Range = l.substring(0, l.length - 2);
    const h = a.httpExecutor.createRequest(E, (N) => {
      if (!s(N, i))
        return;
      const A = (0, e.safeGetHeader)(N, "content-type"), C = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(A);
      if (C == null) {
        i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${A}"`));
        return;
      }
      const g = new f.DataSplitter(n, o, d, C[1] || C[2], p, c);
      g.on("error", i), N.pipe(g), N.on("end", () => {
        setTimeout(() => {
          h.abort(), i(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    a.httpExecutor.addErrorAndTimeoutHandlers(h, i), h.end();
  }
  function s(a, o) {
    if (a.statusCode >= 400)
      return o((0, e.createHttpError)(a)), !1;
    if (a.statusCode !== 206) {
      const n = (0, e.safeGetHeader)(a, "accept-ranges");
      if (n == null || n === "none")
        return o(new Error(`Server doesn't support Accept-Ranges (response code ${a.statusCode})`)), !1;
    }
    return !0;
  }
  return Br;
}
var kr = {}, Ff;
function hA() {
  if (Ff) return kr;
  Ff = 1, Object.defineProperty(kr, "__esModule", { value: !0 }), kr.ProgressDifferentialDownloadCallbackTransform = void 0;
  const e = Bt;
  var f;
  (function(u) {
    u[u.COPY = 0] = "COPY", u[u.DOWNLOAD = 1] = "DOWNLOAD";
  })(f || (f = {}));
  let t = class extends e.Transform {
    constructor(r, s, a) {
      super(), this.progressDifferentialDownloadInfo = r, this.cancellationToken = s, this.onProgress = a, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = f.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(r, s, a) {
      if (this.cancellationToken.cancelled) {
        a(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == f.COPY) {
        a(null, r);
        return;
      }
      this.transferred += r.length, this.delta += r.length;
      const o = Date.now();
      o >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = o + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((o - this.start) / 1e3))
      }), this.delta = 0), a(null, r);
    }
    beginFileCopy() {
      this.operationType = f.COPY;
    }
    beginRangeDownload() {
      this.operationType = f.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
    }
    endRangeDownload() {
      this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      });
    }
    // Called when we are 100% done with the connection/download
    _flush(r) {
      if (this.cancellationToken.cancelled) {
        r(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, this.transferred = 0, r(null);
    }
  };
  return kr.ProgressDifferentialDownloadCallbackTransform = t, kr;
}
var Mf;
function m0() {
  if (Mf) return xr;
  Mf = 1, Object.defineProperty(xr, "__esModule", { value: !0 }), xr.DifferentialDownloader = void 0;
  const e = Je(), f = /* @__PURE__ */ qt(), t = ze, u = g0(), r = fr, s = sc(), a = fA(), o = hA();
  let n = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(_, d, p) {
      this.blockAwareFileInfo = _, this.httpExecutor = d, this.options = p, this.fileMetadataBuffer = null, this.logger = p.logger;
    }
    createRequestOptions() {
      const _ = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, e.configureRequestUrl)(this.options.newUrl, _), (0, e.configureRequestOptions)(_), _;
    }
    doDownload(_, d) {
      if (_.version !== d.version)
        throw new Error(`version is different (${_.version} - ${d.version}), full download is required`);
      const p = this.logger, E = (0, s.computeOperations)(_, d, p);
      p.debug != null && p.debug(JSON.stringify(E, null, 2));
      let h = 0, N = 0;
      for (const C of E) {
        const g = C.end - C.start;
        C.kind === s.OperationKind.DOWNLOAD ? h += g : N += g;
      }
      const A = this.blockAwareFileInfo.size;
      if (h + N + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== A)
        throw new Error(`Internal error, size mismatch: downloadSize: ${h}, copySize: ${N}, newSize: ${A}`);
      return p.info(`Full: ${c(A)}, To download: ${c(h)} (${Math.round(h / (A / 100))}%)`), this.downloadFile(E);
    }
    downloadFile(_) {
      const d = [], p = () => Promise.all(d.map((E) => (0, f.close)(E.descriptor).catch((h) => {
        this.logger.error(`cannot close file "${E.path}": ${h}`);
      })));
      return this.doDownloadFile(_, d).then(p).catch((E) => p().catch((h) => {
        try {
          this.logger.error(`cannot close files: ${h}`);
        } catch (N) {
          try {
            console.error(N);
          } catch {
          }
        }
        throw E;
      }).then(() => {
        throw E;
      }));
    }
    async doDownloadFile(_, d) {
      const p = await (0, f.open)(this.options.oldFile, "r");
      d.push({ descriptor: p, path: this.options.oldFile });
      const E = await (0, f.open)(this.options.newFile, "w");
      d.push({ descriptor: E, path: this.options.newFile });
      const h = (0, t.createWriteStream)(this.options.newFile, { fd: E });
      await new Promise((N, A) => {
        const C = [];
        let g;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const M = [];
          let F = 0;
          for (const w of _)
            w.kind === s.OperationKind.DOWNLOAD && (M.push(w.end - w.start), F += w.end - w.start);
          const I = {
            expectedByteCounts: M,
            grandTotal: F
          };
          g = new o.ProgressDifferentialDownloadCallbackTransform(I, this.options.cancellationToken, this.options.onProgress), C.push(g);
        }
        const L = new e.DigestTransform(this.blockAwareFileInfo.sha512);
        L.isValidateOnEnd = !1, C.push(L), h.on("finish", () => {
          h.close(() => {
            d.splice(1, 1);
            try {
              L.validate();
            } catch (M) {
              A(M);
              return;
            }
            N(void 0);
          });
        }), C.push(h);
        let R = null;
        for (const M of C)
          M.on("error", A), R == null ? R = M : R = R.pipe(M);
        const O = C[0];
        let D;
        if (this.options.isUseMultipleRangeRequest) {
          D = (0, a.executeTasksUsingMultipleRangeRequests)(this, _, O, p, A), D(0);
          return;
        }
        let m = 0, B = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const v = this.createRequestOptions();
        v.redirect = "manual", D = (M) => {
          var F, I;
          if (M >= _.length) {
            this.fileMetadataBuffer != null && O.write(this.fileMetadataBuffer), O.end();
            return;
          }
          const w = _[M++];
          if (w.kind === s.OperationKind.COPY) {
            g && g.beginFileCopy(), (0, u.copyData)(w, O, p, A, () => D(M));
            return;
          }
          const x = `bytes=${w.start}-${w.end - 1}`;
          v.headers.range = x, (I = (F = this.logger) === null || F === void 0 ? void 0 : F.debug) === null || I === void 0 || I.call(F, `download range: ${x}`), g && g.beginRangeDownload();
          const V = this.httpExecutor.createRequest(v, (z) => {
            z.on("error", A), z.on("aborted", () => {
              A(new Error("response has been aborted by the server"));
            }), z.statusCode >= 400 && A((0, e.createHttpError)(z)), z.pipe(O, {
              end: !1
            }), z.once("end", () => {
              g && g.endRangeDownload(), ++m === 100 ? (m = 0, setTimeout(() => D(M), 1e3)) : D(M);
            });
          });
          V.on("redirect", (z, j, J) => {
            this.logger.info(`Redirect to ${i(J)}`), B = J, (0, e.configureRequestUrl)(new r.URL(B), v), V.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers(V, A), V.end();
        }, D(0);
      });
    }
    async readRemoteBytes(_, d) {
      const p = Buffer.allocUnsafe(d + 1 - _), E = this.createRequestOptions();
      E.headers.range = `bytes=${_}-${d}`;
      let h = 0;
      if (await this.request(E, (N) => {
        N.copy(p, h), h += N.length;
      }), h !== p.length)
        throw new Error(`Received data length ${h} is not equal to expected ${p.length}`);
      return p;
    }
    request(_, d) {
      return new Promise((p, E) => {
        const h = this.httpExecutor.createRequest(_, (N) => {
          (0, a.checkIsRangesSupported)(N, E) && (N.on("error", E), N.on("aborted", () => {
            E(new Error("response has been aborted by the server"));
          }), N.on("data", d), N.on("end", () => p()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(h, E), h.end();
      });
    }
  };
  xr.DifferentialDownloader = n;
  function c(l, _ = " KB") {
    return new Intl.NumberFormat("en").format((l / 1024).toFixed(2)) + _;
  }
  function i(l) {
    const _ = l.indexOf("?");
    return _ < 0 ? l : l.substring(0, _);
  }
  return xr;
}
var xf;
function dA() {
  if (xf) return Mr;
  xf = 1, Object.defineProperty(Mr, "__esModule", { value: !0 }), Mr.GenericDifferentialDownloader = void 0;
  const e = m0();
  let f = class extends e.DifferentialDownloader {
    download(u, r) {
      return this.doDownload(u, r);
    }
  };
  return Mr.GenericDifferentialDownloader = f, Mr;
}
var Bf;
function ac() {
  if (Bf) return Xt;
  Bf = 1, Object.defineProperty(Xt, "__esModule", { value: !0 }), Xt.NoOpLogger = Xt.AppUpdater = void 0;
  const e = Je(), f = ot, t = Nt, u = St, r = /* @__PURE__ */ qt(), s = Jo(), a = L1(), o = xe, n = R0(), c = nA(), i = sA(), l = aA(), _ = C0(), d = pr(), p = _A(), E = Fn, h = rr(), N = dA();
  let A = class O0 extends u.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(R) {
      if (this._channel != null) {
        if (typeof R != "string")
          throw (0, e.newError)(`Channel must be a string, but got: ${R}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (R.length === 0)
          throw (0, e.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = R, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(R) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: R
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, l.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(R) {
      this._logger = R ?? new g();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(R) {
      this.clientPromise = null, this._appUpdateConfigPath = R, this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig());
    }
    constructor(R, O) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new d.UpdaterSignal(this), this._appUpdateConfigPath = null, this.clientPromise = null, this.stagingUserIdPromise = new a.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (B) => {
        this._logger.error(`Error: ${B.stack || B.message}`);
      }), O == null ? (this.app = new i.ElectronAppAdapter(), this.httpExecutor = new l.ElectronHttpExecutor((B, v) => this.emit("login", B, v))) : (this.app = O, this.httpExecutor = null);
      const D = this.app.version, m = (0, n.parse)(D);
      if (m == null)
        throw (0, e.newError)(`App version is not a valid semver version: "${D}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = m, this.allowPrerelease = C(m), R != null && (this.setFeedURL(R), typeof R != "string" && R.requestHeaders && (this.requestHeaders = R.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(R) {
      const O = this.createProviderRuntimeOptions();
      let D;
      typeof R == "string" ? D = new _.GenericProvider({ provider: "generic", url: R }, this, {
        ...O,
        isUseMultipleRangeRequest: (0, p.isUrlProbablySupportMultiRangeRequests)(R)
      }) : D = (0, p.createClient)(R, this, O), this.clientPromise = Promise.resolve(D);
    }
    /**
     * Asks the server whether there is an update.
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let R = this.checkForUpdatesPromise;
      if (R != null)
        return this._logger.info("Checking for update (already in progress)"), R;
      const O = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), R = this.doCheckForUpdates().then((D) => (O(), D)).catch((D) => {
        throw O(), this.emit("error", D, `Cannot check for updates: ${(D.stack || D).toString()}`), D;
      }), this.checkForUpdatesPromise = R, R;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(R) {
      return this.checkForUpdates().then((O) => O != null && O.downloadPromise ? (O.downloadPromise.then(() => {
        const D = O0.formatDownloadNotification(O.updateInfo.version, this.app.name, R);
        new xt.Notification(D).show();
      }), O) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), O));
    }
    static formatDownloadNotification(R, O, D) {
      return D == null && (D = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), D = {
        title: D.title.replace("{appName}", O).replace("{version}", R),
        body: D.body.replace("{appName}", O).replace("{version}", R)
      }, D;
    }
    async isStagingMatch(R) {
      const O = R.stagingPercentage;
      let D = O;
      if (D == null)
        return !0;
      if (D = parseInt(D, 10), isNaN(D))
        return this._logger.warn(`Staging percentage is NaN: ${O}`), !0;
      D = D / 100;
      const m = await this.stagingUserIdPromise.value, v = e.UUID.parse(m).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${D}, percentage: ${v}, user id: ${m}`), v < D;
    }
    computeFinalHeaders(R) {
      return this.requestHeaders != null && Object.assign(R, this.requestHeaders), R;
    }
    async isUpdateAvailable(R) {
      const O = (0, n.parse)(R.version);
      if (O == null)
        throw (0, e.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${R.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const D = this.currentVersion;
      if ((0, n.eq)(O, D))
        return !1;
      const m = R == null ? void 0 : R.minimumSystemVersion, B = (0, t.release)();
      if (m)
        try {
          if ((0, n.lt)(B, m))
            return this._logger.info(`Current OS version ${B} is less than the minimum OS version required ${m} for version ${B}`), !1;
        } catch (I) {
          this._logger.warn(`Failed to compare current OS version(${B}) with minimum OS version(${m}): ${(I.message || I).toString()}`);
        }
      if (!await this.isStagingMatch(R))
        return !1;
      const M = (0, n.gt)(O, D), F = (0, n.lt)(O, D);
      return M ? !0 : this.allowDowngrade && F;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((D) => (0, p.createClient)(D, this, this.createProviderRuntimeOptions())));
      const R = await this.clientPromise, O = await this.stagingUserIdPromise.value;
      return R.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": O })), {
        info: await R.getLatestVersion(),
        provider: R
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const R = await this.getUpdateInfoAndProvider(), O = R.info;
      if (!await this.isUpdateAvailable(O))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${O.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", O), {
          versionInfo: O,
          updateInfo: O
        };
      this.updateInfoAndProvider = R, this.onUpdateAvailable(O);
      const D = new e.CancellationToken();
      return {
        versionInfo: O,
        updateInfo: O,
        cancellationToken: D,
        downloadPromise: this.autoDownload ? this.downloadUpdate(D) : null
      };
    }
    onUpdateAvailable(R) {
      this._logger.info(`Found version ${R.version} (url: ${(0, e.asArray)(R.files).map((O) => O.url).join(", ")})`), this.emit("update-available", R);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(R = new e.CancellationToken()) {
      const O = this.updateInfoAndProvider;
      if (O == null) {
        const m = new Error("Please check update first");
        return this.dispatchError(m), Promise.reject(m);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, e.asArray)(O.info.files).map((m) => m.url).join(", ")}`);
      const D = (m) => {
        if (!(m instanceof e.CancellationError))
          try {
            this.dispatchError(m);
          } catch (B) {
            this._logger.warn(`Cannot dispatch error event: ${B.stack || B}`);
          }
        return m;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: O,
        requestHeaders: this.computeRequestHeaders(O.provider),
        cancellationToken: R,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((m) => {
        throw D(m);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(R) {
      this.emit("error", R, (R.stack || R).toString());
    }
    dispatchUpdateDownloaded(R) {
      this.emit(d.UPDATE_DOWNLOADED, R);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, s.load)(await (0, r.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(R) {
      const O = R.fileExtraDownloadHeaders;
      if (O != null) {
        const D = this.requestHeaders;
        return D == null ? O : {
          ...O,
          ...D
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const R = o.join(this.app.userDataPath, ".updaterId");
      try {
        const D = await (0, r.readFile)(R, "utf-8");
        if (e.UUID.check(D))
          return D;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${D}`);
      } catch (D) {
        D.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${D}`);
      }
      const O = e.UUID.v5((0, f.randomBytes)(4096), e.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${O}`);
      try {
        await (0, r.outputFile)(R, O);
      } catch (D) {
        this._logger.warn(`Couldn't write out staging user ID: ${D}`);
      }
      return O;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const R = this.requestHeaders;
      if (R == null)
        return !0;
      for (const O of Object.keys(R)) {
        const D = O.toLowerCase();
        if (D === "authorization" || D === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let R = this.downloadedUpdateHelper;
      if (R == null) {
        const O = (await this.configOnDisk.value).updaterCacheDirName, D = this._logger;
        O == null && D.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const m = o.join(this.app.baseCachePath, O || this.app.name);
        D.debug != null && D.debug(`updater cache dir: ${m}`), R = new c.DownloadedUpdateHelper(m), this.downloadedUpdateHelper = R;
      }
      return R;
    }
    async executeDownload(R) {
      const O = R.fileInfo, D = {
        headers: R.downloadUpdateOptions.requestHeaders,
        cancellationToken: R.downloadUpdateOptions.cancellationToken,
        sha2: O.info.sha2,
        sha512: O.info.sha512
      };
      this.listenerCount(d.DOWNLOAD_PROGRESS) > 0 && (D.onProgress = (b) => this.emit(d.DOWNLOAD_PROGRESS, b));
      const m = R.downloadUpdateOptions.updateInfoAndProvider.info, B = m.version, v = O.packageInfo;
      function M() {
        const b = decodeURIComponent(R.fileInfo.url.pathname);
        return b.endsWith(`.${R.fileExtension}`) ? o.basename(b) : R.fileInfo.info.url;
      }
      const F = await this.getOrCreateDownloadHelper(), I = F.cacheDirForPendingUpdate;
      await (0, r.mkdir)(I, { recursive: !0 });
      const w = M();
      let x = o.join(I, w);
      const V = v == null ? null : o.join(I, `package-${B}${o.extname(v.path) || ".7z"}`), z = async (b) => (await F.setDownloadedFile(x, V, m, O, w, b), await R.done({
        ...m,
        downloadedFile: x
      }), V == null ? [x] : [x, V]), j = this._logger, J = await F.validateDownloadedPath(x, m, O, j);
      if (J != null)
        return x = J, await z(!1);
      const fe = async () => (await F.clear().catch(() => {
      }), await (0, r.unlink)(x).catch(() => {
      })), Ce = await (0, c.createTempUpdateFile)(`temp-${w}`, I, j);
      try {
        await R.task(Ce, D, V, fe), await (0, e.retry)(() => (0, r.rename)(Ce, x), 60, 500, 0, 0, (b) => b instanceof Error && /^EBUSY:/.test(b.message));
      } catch (b) {
        throw await fe(), b instanceof e.CancellationError && (j.info("cancelled"), this.emit("update-cancelled", m)), b;
      }
      return j.info(`New version ${B} has been downloaded to ${x}`), await z(!0);
    }
    async differentialDownloadInstaller(R, O, D, m, B) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const v = (0, h.blockmapFiles)(R.url, this.app.version, O.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${v[0]}", new: ${v[1]})`);
        const M = async (w) => {
          const x = await this.httpExecutor.downloadToBuffer(w, {
            headers: O.requestHeaders,
            cancellationToken: O.cancellationToken
          });
          if (x == null || x.length === 0)
            throw new Error(`Blockmap "${w.href}" is empty`);
          try {
            return JSON.parse((0, E.gunzipSync)(x).toString());
          } catch (V) {
            throw new Error(`Cannot parse blockmap "${w.href}", error: ${V}`);
          }
        }, F = {
          newUrl: R.url,
          oldFile: o.join(this.downloadedUpdateHelper.cacheDir, B),
          logger: this._logger,
          newFile: D,
          isUseMultipleRangeRequest: m.isUseMultipleRangeRequest,
          requestHeaders: O.requestHeaders,
          cancellationToken: O.cancellationToken
        };
        this.listenerCount(d.DOWNLOAD_PROGRESS) > 0 && (F.onProgress = (w) => this.emit(d.DOWNLOAD_PROGRESS, w));
        const I = await Promise.all(v.map((w) => M(w)));
        return await new N.GenericDifferentialDownloader(R.info, this.httpExecutor, F).download(I[0], I[1]), !1;
      } catch (v) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${v.stack || v}`), this._testOnlyOptions != null)
          throw v;
        return !0;
      }
    }
  };
  Xt.AppUpdater = A;
  function C(L) {
    const R = (0, n.prerelease)(L);
    return R != null && R.length > 0;
  }
  class g {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(R) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(R) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(R) {
    }
  }
  return Xt.NoOpLogger = g, Xt;
}
var kf;
function nn() {
  if (kf) return Pr;
  kf = 1, Object.defineProperty(Pr, "__esModule", { value: !0 }), Pr.BaseUpdater = void 0;
  const e = zr, f = ac();
  let t = class extends f.AppUpdater {
    constructor(r, s) {
      super(r, s), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(r = !1, s = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(r, r ? s : this.autoRunAppAfterInstall) ? setImmediate(() => {
        xt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(r) {
      return super.executeDownload({
        ...r,
        done: (s) => (this.dispatchUpdateDownloaded(s), this.addQuitHandler(), Promise.resolve())
      });
    }
    // must be sync (because quit even handler is not async)
    install(r = !1, s = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const a = this.downloadedUpdateHelper, o = a && a.file ? process.platform === "linux" ? a.file.replace(/ /g, "\\ ") : a.file : null, n = a == null ? null : a.downloadedFileInfo;
      if (o == null || n == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${r}, isForceRunAfter: ${s}`), this.doInstall({
          installerPath: o,
          isSilent: r,
          isForceRunAfter: s,
          isAdminRightsRequired: n.isAdminRightsRequired
        });
      } catch (c) {
        return this.dispatchError(c), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((r) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (r !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${r}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    wrapSudo() {
      const { name: r } = this.app, s = `"${r} would like to update"`, a = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), o = [a];
      return /kdesudo/i.test(a) ? (o.push("--comment", s), o.push("-c")) : /gksudo/i.test(a) ? o.push("--message", s) : /pkexec/i.test(a) && o.push("--disable-internal-agent"), o.join(" ");
    }
    spawnSyncLog(r, s = [], a = {}) {
      return this._logger.info(`Executing: ${r} with args: ${s}`), (0, e.spawnSync)(r, s, {
        env: { ...process.env, ...a },
        encoding: "utf-8",
        shell: !0
      }).stdout.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(r, s = [], a = void 0, o = "ignore") {
      return this._logger.info(`Executing: ${r} with args: ${s}`), new Promise((n, c) => {
        try {
          const i = { stdio: o, env: a, detached: !0 }, l = (0, e.spawn)(r, s, i);
          l.on("error", (_) => {
            c(_);
          }), l.unref(), l.pid !== void 0 && n(!0);
        } catch (i) {
          c(i);
        }
      });
    }
  };
  return Pr.BaseUpdater = t, Pr;
}
var Hr = {}, Gr = {}, Hf;
function w0() {
  if (Hf) return Gr;
  Hf = 1, Object.defineProperty(Gr, "__esModule", { value: !0 }), Gr.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const e = /* @__PURE__ */ qt(), f = m0(), t = Fn;
  let u = class extends f.DifferentialDownloader {
    async download() {
      const o = this.blockAwareFileInfo, n = o.size, c = n - (o.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(c, n - 1);
      const i = r(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await s(this.options.oldFile), i);
    }
  };
  Gr.FileWithEmbeddedBlockMapDifferentialDownloader = u;
  function r(a) {
    return JSON.parse((0, t.inflateRawSync)(a).toString());
  }
  async function s(a) {
    const o = await (0, e.open)(a, "r");
    try {
      const n = (await (0, e.fstat)(o)).size, c = Buffer.allocUnsafe(4);
      await (0, e.read)(o, c, 0, c.length, n - c.length);
      const i = Buffer.allocUnsafe(c.readUInt32BE(0));
      return await (0, e.read)(o, i, 0, i.length, n - c.length - i.length), await (0, e.close)(o), r(i);
    } catch (n) {
      throw await (0, e.close)(o), n;
    }
  }
  return Gr;
}
var Gf;
function qf() {
  if (Gf) return Hr;
  Gf = 1, Object.defineProperty(Hr, "__esModule", { value: !0 }), Hr.AppImageUpdater = void 0;
  const e = Je(), f = zr, t = /* @__PURE__ */ qt(), u = ze, r = xe, s = nn(), a = w0(), o = pr(), n = pt();
  let c = class extends s.BaseUpdater {
    constructor(l, _) {
      super(l, _);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(l) {
      const _ = l.updateInfoAndProvider.provider, d = (0, n.findFile)(_.resolveFiles(l.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: d,
        downloadUpdateOptions: l,
        task: async (p, E) => {
          const h = process.env.APPIMAGE;
          if (h == null)
            throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          let N = !1;
          try {
            const A = {
              newUrl: d.url,
              oldFile: h,
              logger: this._logger,
              newFile: p,
              isUseMultipleRangeRequest: _.isUseMultipleRangeRequest,
              requestHeaders: l.requestHeaders,
              cancellationToken: l.cancellationToken
            };
            this.listenerCount(o.DOWNLOAD_PROGRESS) > 0 && (A.onProgress = (C) => this.emit(o.DOWNLOAD_PROGRESS, C)), await new a.FileWithEmbeddedBlockMapDifferentialDownloader(d.info, this.httpExecutor, A).download();
          } catch (A) {
            this._logger.error(`Cannot download differentially, fallback to full download: ${A.stack || A}`), N = process.platform === "linux";
          }
          N && await this.httpExecutor.download(d.url, p, E), await (0, t.chmod)(p, 493);
        }
      });
    }
    doInstall(l) {
      const _ = process.env.APPIMAGE;
      if (_ == null)
        throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, u.unlinkSync)(_);
      let d;
      const p = r.basename(_);
      r.basename(l.installerPath) === p || !/\d+\.\d+\.\d+/.test(p) ? d = _ : d = r.join(r.dirname(_), r.basename(l.installerPath)), (0, f.execFileSync)("mv", ["-f", l.installerPath, d]), d !== _ && this.emit("appimage-filename-updated", d);
      const E = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return l.isForceRunAfter ? this.spawnLog(d, [], E) : (E.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, f.execFileSync)(d, [], { env: E })), !0;
    }
  };
  return Hr.AppImageUpdater = c, Hr;
}
var qr = {}, $f;
function Vf() {
  if ($f) return qr;
  $f = 1, Object.defineProperty(qr, "__esModule", { value: !0 }), qr.DebUpdater = void 0;
  const e = nn(), f = pr(), t = pt();
  let u = class extends e.BaseUpdater {
    constructor(s, a) {
      super(s, a);
    }
    /*** @private */
    doDownloadUpdate(s) {
      const a = s.updateInfoAndProvider.provider, o = (0, t.findFile)(a.resolveFiles(s.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: o,
        downloadUpdateOptions: s,
        task: async (n, c) => {
          this.listenerCount(f.DOWNLOAD_PROGRESS) > 0 && (c.onProgress = (i) => this.emit(f.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(o.url, n, c);
        }
      });
    }
    doInstall(s) {
      const a = this.wrapSudo(), o = /pkexec/i.test(a) ? "" : '"', n = ["dpkg", "-i", s.installerPath, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(a, [`${o}/bin/bash`, "-c", `'${n.join(" ")}'${o}`]), s.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return qr.DebUpdater = u, qr;
}
var $r = {}, Wf;
function jf() {
  if (Wf) return $r;
  Wf = 1, Object.defineProperty($r, "__esModule", { value: !0 }), $r.RpmUpdater = void 0;
  const e = nn(), f = pr(), t = pt();
  let u = class extends e.BaseUpdater {
    constructor(s, a) {
      super(s, a);
    }
    /*** @private */
    doDownloadUpdate(s) {
      const a = s.updateInfoAndProvider.provider, o = (0, t.findFile)(a.resolveFiles(s.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: o,
        downloadUpdateOptions: s,
        task: async (n, c) => {
          this.listenerCount(f.DOWNLOAD_PROGRESS) > 0 && (c.onProgress = (i) => this.emit(f.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(o.url, n, c);
        }
      });
    }
    doInstall(s) {
      const a = s.installerPath, o = this.wrapSudo(), n = /pkexec/i.test(o) ? "" : '"', c = this.spawnSyncLog("which zypper");
      let i;
      return c ? i = [c, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", a] : i = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", a], this.spawnSyncLog(o, [`${n}/bin/bash`, "-c", `'${i.join(" ")}'${n}`]), s.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return $r.RpmUpdater = u, $r;
}
var Vr = {}, Yf;
function Kf() {
  if (Yf) return Vr;
  Yf = 1, Object.defineProperty(Vr, "__esModule", { value: !0 }), Vr.MacUpdater = void 0;
  const e = Je(), f = /* @__PURE__ */ qt(), t = ze, u = xe, r = bh, s = ac(), a = pt(), o = zr, n = ot;
  let c = class extends s.AppUpdater {
    constructor(l, _) {
      super(l, _), this.nativeUpdater = xt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (d) => {
        this._logger.warn(d), this.emit("error", d);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(l) {
      this._logger.debug != null && this._logger.debug(l);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((l) => {
        l && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(l) {
      let _ = l.updateInfoAndProvider.provider.resolveFiles(l.updateInfoAndProvider.info);
      const d = this._logger, p = "sysctl.proc_translated";
      let E = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), E = (0, o.execFileSync)("sysctl", [p], { encoding: "utf8" }).includes(`${p}: 1`), d.info(`Checked for macOS Rosetta environment (isRosetta=${E})`);
      } catch (L) {
        d.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${L}`);
      }
      let h = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const R = (0, o.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        d.info(`Checked 'uname -a': arm64=${R}`), h = h || R;
      } catch (L) {
        d.warn(`uname shell command to check for arm64 failed: ${L}`);
      }
      h = h || process.arch === "arm64" || E;
      const N = (L) => {
        var R;
        return L.url.pathname.includes("arm64") || ((R = L.info.url) === null || R === void 0 ? void 0 : R.includes("arm64"));
      };
      h && _.some(N) ? _ = _.filter((L) => h === N(L)) : _ = _.filter((L) => !N(L));
      const A = (0, a.findFile)(_, "zip", ["pkg", "dmg"]);
      if (A == null)
        throw (0, e.newError)(`ZIP file not provided: ${(0, e.safeStringifyJson)(_)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const C = l.updateInfoAndProvider.provider, g = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: A,
        downloadUpdateOptions: l,
        task: async (L, R) => {
          const O = u.join(this.downloadedUpdateHelper.cacheDir, g), D = () => (0, f.pathExistsSync)(O) ? !l.disableDifferentialDownload : (d.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let m = !0;
          D() && (m = await this.differentialDownloadInstaller(A, l, L, C, g)), m && await this.httpExecutor.download(A.url, L, R);
        },
        done: (L) => {
          if (!l.disableDifferentialDownload)
            try {
              const R = u.join(this.downloadedUpdateHelper.cacheDir, g);
              (0, t.copyFileSync)(L.downloadedFile, R);
            } catch (R) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${R.message}`);
            }
          return this.updateDownloaded(A, L);
        }
      });
    }
    async updateDownloaded(l, _) {
      var d;
      const p = _.downloadedFile, E = (d = l.info.size) !== null && d !== void 0 ? d : (await (0, f.stat)(p)).size, h = this._logger, N = `fileToProxy=${l.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${N})`), this.server = (0, r.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${N})`), this.server.on("close", () => {
        h.info(`Proxy server for native Squirrel.Mac is closed (${N})`);
      });
      const A = (C) => {
        const g = C.address();
        return typeof g == "string" ? g : `http://127.0.0.1:${g == null ? void 0 : g.port}`;
      };
      return await new Promise((C, g) => {
        const L = (0, n.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), R = Buffer.from(`autoupdater:${L}`, "ascii"), O = `/${(0, n.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (D, m) => {
          const B = D.url;
          if (h.info(`${B} requested`), B === "/") {
            if (!D.headers.authorization || D.headers.authorization.indexOf("Basic ") === -1) {
              m.statusCode = 401, m.statusMessage = "Invalid Authentication Credentials", m.end(), h.warn("No authenthication info");
              return;
            }
            const F = D.headers.authorization.split(" ")[1], I = Buffer.from(F, "base64").toString("ascii"), [w, x] = I.split(":");
            if (w !== "autoupdater" || x !== L) {
              m.statusCode = 401, m.statusMessage = "Invalid Authentication Credentials", m.end(), h.warn("Invalid authenthication credentials");
              return;
            }
            const V = Buffer.from(`{ "url": "${A(this.server)}${O}" }`);
            m.writeHead(200, { "Content-Type": "application/json", "Content-Length": V.length }), m.end(V);
            return;
          }
          if (!B.startsWith(O)) {
            h.warn(`${B} requested, but not supported`), m.writeHead(404), m.end();
            return;
          }
          h.info(`${O} requested by Squirrel.Mac, pipe ${p}`);
          let v = !1;
          m.on("finish", () => {
            v || (this.nativeUpdater.removeListener("error", g), C([]));
          });
          const M = (0, t.createReadStream)(p);
          M.on("error", (F) => {
            try {
              m.end();
            } catch (I) {
              h.warn(`cannot end response: ${I}`);
            }
            v = !0, this.nativeUpdater.removeListener("error", g), g(new Error(`Cannot pipe "${p}": ${F}`));
          }), m.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": E
          }), M.pipe(m);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${N})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${A(this.server)}, ${N})`), this.nativeUpdater.setFeedURL({
            url: A(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${R.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(_), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", g), this.nativeUpdater.checkForUpdates()) : C([]);
        });
      });
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists()) : (this.nativeUpdater.on("update-downloaded", () => {
        this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
      }), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return Vr.MacUpdater = c, Vr;
}
var Wr = {}, Pn = {}, zf;
function EA() {
  if (zf) return Pn;
  zf = 1, Object.defineProperty(Pn, "__esModule", { value: !0 }), Pn.verifySignature = r;
  const e = Je(), f = zr, t = Nt, u = xe;
  function r(n, c, i) {
    return new Promise((l, _) => {
      const d = c.replace(/'/g, "''");
      i.info(`Verifying signature ${d}`), (0, f.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${d}' | ConvertTo-Json -Compress"`], {
        shell: !0,
        timeout: 20 * 1e3
      }, (p, E, h) => {
        var N;
        try {
          if (p != null || h) {
            a(i, p, h, _), l(null);
            return;
          }
          const A = s(E);
          if (A.Status === 0) {
            try {
              const R = u.normalize(A.Path), O = u.normalize(c);
              if (i.info(`LiteralPath: ${R}. Update Path: ${O}`), R !== O) {
                a(i, new Error(`LiteralPath of ${R} is different than ${O}`), h, _), l(null);
                return;
              }
            } catch (R) {
              i.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(N = R.message) !== null && N !== void 0 ? N : R.stack}`);
            }
            const g = (0, e.parseDn)(A.SignerCertificate.Subject);
            let L = !1;
            for (const R of n) {
              const O = (0, e.parseDn)(R);
              if (O.size ? L = Array.from(O.keys()).every((m) => O.get(m) === g.get(m)) : R === g.get("CN") && (i.warn(`Signature validated using only CN ${R}. Please add your full Distinguished Name (DN) to publisherNames configuration`), L = !0), L) {
                l(null);
                return;
              }
            }
          }
          const C = `publisherNames: ${n.join(" | ")}, raw info: ` + JSON.stringify(A, (g, L) => g === "RawData" ? void 0 : L, 2);
          i.warn(`Sign verification failed, installer signed with incorrect certificate: ${C}`), l(C);
        } catch (A) {
          a(i, A, null, _), l(null);
          return;
        }
      });
    });
  }
  function s(n) {
    const c = JSON.parse(n);
    delete c.PrivateKey, delete c.IsOSBinary, delete c.SignatureType;
    const i = c.SignerCertificate;
    return i != null && (delete i.Archived, delete i.Extensions, delete i.Handle, delete i.HasPrivateKey, delete i.SubjectName), c;
  }
  function a(n, c, i, l) {
    if (o()) {
      n.warn(`Cannot execute Get-AuthenticodeSignature: ${c || i}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, f.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
    } catch (_) {
      n.warn(`Cannot execute ConvertTo-Json: ${_.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    c != null && l(c), i && l(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${i}. Failing signature validation due to unknown stderr.`));
  }
  function o() {
    const n = t.release();
    return n.startsWith("6.") && !n.startsWith("6.3");
  }
  return Pn;
}
var Xf;
function Qf() {
  if (Xf) return Wr;
  Xf = 1, Object.defineProperty(Wr, "__esModule", { value: !0 }), Wr.NsisUpdater = void 0;
  const e = Je(), f = xe, t = nn(), u = w0(), r = pr(), s = pt(), a = /* @__PURE__ */ qt(), o = EA(), n = fr;
  let c = class extends t.BaseUpdater {
    constructor(l, _) {
      super(l, _), this._verifyUpdateCodeSignature = (d, p) => (0, o.verifySignature)(d, p, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(l) {
      l && (this._verifyUpdateCodeSignature = l);
    }
    /*** @private */
    doDownloadUpdate(l) {
      const _ = l.updateInfoAndProvider.provider, d = (0, s.findFile)(_.resolveFiles(l.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: l,
        fileInfo: d,
        task: async (p, E, h, N) => {
          const A = d.packageInfo, C = A != null && h != null;
          if (C && l.disableWebInstaller)
            throw (0, e.newError)(`Unable to download new version ${l.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !C && !l.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (C || l.disableDifferentialDownload || await this.differentialDownloadInstaller(d, l, p, _, e.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(d.url, p, E);
          const g = await this.verifySignature(p);
          if (g != null)
            throw await N(), (0, e.newError)(`New version ${l.updateInfoAndProvider.info.version} is not signed by the application owner: ${g}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (C && await this.differentialDownloadWebPackage(l, A, h, _))
            try {
              await this.httpExecutor.download(new n.URL(A.path), h, {
                headers: l.requestHeaders,
                cancellationToken: l.cancellationToken,
                sha512: A.sha512
              });
            } catch (L) {
              try {
                await (0, a.unlink)(h);
              } catch {
              }
              throw L;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(l) {
      let _;
      try {
        if (_ = (await this.configOnDisk.value).publisherName, _ == null)
          return null;
      } catch (d) {
        if (d.code === "ENOENT")
          return null;
        throw d;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(_) ? _ : [_], l);
    }
    doInstall(l) {
      const _ = ["--updated"];
      l.isSilent && _.push("/S"), l.isForceRunAfter && _.push("--force-run"), this.installDirectory && _.push(`/D=${this.installDirectory}`);
      const d = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      d != null && _.push(`--package-file=${d}`);
      const p = () => {
        this.spawnLog(f.join(process.resourcesPath, "elevate.exe"), [l.installerPath].concat(_)).catch((E) => this.dispatchError(E));
      };
      return l.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), p(), !0) : (this.spawnLog(l.installerPath, _).catch((E) => {
        const h = E.code;
        this._logger.info(`Cannot run installer: error code: ${h}, error message: "${E.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), h === "UNKNOWN" || h === "EACCES" ? p() : h === "ENOENT" ? xt.shell.openPath(l.installerPath).catch((N) => this.dispatchError(N)) : this.dispatchError(E);
      }), !0);
    }
    async differentialDownloadWebPackage(l, _, d, p) {
      if (_.blockMapSize == null)
        return !0;
      try {
        const E = {
          newUrl: new n.URL(_.path),
          oldFile: f.join(this.downloadedUpdateHelper.cacheDir, e.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: d,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: p.isUseMultipleRangeRequest,
          cancellationToken: l.cancellationToken
        };
        this.listenerCount(r.DOWNLOAD_PROGRESS) > 0 && (E.onProgress = (h) => this.emit(r.DOWNLOAD_PROGRESS, h)), await new u.FileWithEmbeddedBlockMapDifferentialDownloader(_, this.httpExecutor, E).download();
      } catch (E) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${E.stack || E}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return Wr.NsisUpdater = c, Wr;
}
var Jf;
function pr() {
  return Jf || (Jf = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.CancellationToken = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
    const f = Je();
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return f.CancellationToken;
    } });
    const t = /* @__PURE__ */ qt(), u = xe;
    var r = nn();
    Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
      return r.BaseUpdater;
    } });
    var s = ac();
    Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
      return s.AppUpdater;
    } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
      return s.NoOpLogger;
    } });
    var a = pt();
    Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
      return a.Provider;
    } });
    var o = qf();
    Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
      return o.AppImageUpdater;
    } });
    var n = Vf();
    Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
      return n.DebUpdater;
    } });
    var c = jf();
    Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
      return c.RpmUpdater;
    } });
    var i = Kf();
    Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
      return i.MacUpdater;
    } });
    var l = Qf();
    Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
      return l.NsisUpdater;
    } });
    let _;
    function d() {
      if (process.platform === "win32")
        _ = new (Qf()).NsisUpdater();
      else if (process.platform === "darwin")
        _ = new (Kf()).MacUpdater();
      else {
        _ = new (qf()).AppImageUpdater();
        try {
          const h = u.join(process.resourcesPath, "package-type");
          if (!(0, t.existsSync)(h))
            return _;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const N = (0, t.readFileSync)(h).toString().trim();
          switch (console.info("Found package-type:", N), N) {
            case "deb":
              _ = new (Vf()).DebUpdater();
              break;
            case "rpm":
              _ = new (jf()).RpmUpdater();
              break;
            default:
              break;
          }
        } catch (h) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", h.message);
        }
      }
      return _;
    }
    Object.defineProperty(e, "autoUpdater", {
      enumerable: !0,
      get: () => _ || d()
    }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
    class p {
      constructor(N) {
        this.emitter = N;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(N) {
        E(this.emitter, "login", N);
      }
      progress(N) {
        E(this.emitter, e.DOWNLOAD_PROGRESS, N);
      }
      updateDownloaded(N) {
        E(this.emitter, e.UPDATE_DOWNLOADED, N);
      }
      updateCancelled(N) {
        E(this.emitter, "update-cancelled", N);
      }
    }
    e.UpdaterSignal = p;
    function E(h, N, A) {
      h.on(N, A);
    }
  }(us)), us;
}
var AA = pr();
const pA = /* @__PURE__ */ qo(AA);
var jr = { exports: {} }, co = { exports: {} }, Zf;
function P0() {
  return Zf || (Zf = 1, function(e) {
    let f = {};
    try {
      f = require("electron");
    } catch {
    }
    f.ipcRenderer && t(f), e.exports = t;
    function t({ contextBridge: u, ipcRenderer: r }) {
      if (!r)
        return;
      r.on("__ELECTRON_LOG_IPC__", (a, o) => {
        window.postMessage({ cmd: "message", ...o });
      }), r.invoke("__ELECTRON_LOG__", { cmd: "getOptions" }).catch((a) => console.error(new Error(
        `electron-log isn't initialized in the main process. Please call log.initialize() before. ${a.message}`
      )));
      const s = {
        sendToMain(a) {
          try {
            r.send("__ELECTRON_LOG__", a);
          } catch (o) {
            console.error("electronLog.sendToMain ", o, "data:", a), r.send("__ELECTRON_LOG__", {
              cmd: "errorHandler",
              error: { message: o == null ? void 0 : o.message, stack: o == null ? void 0 : o.stack },
              errorName: "sendToMain"
            });
          }
        },
        log(...a) {
          s.sendToMain({ data: a, level: "info" });
        }
      };
      for (const a of ["error", "warn", "info", "verbose", "debug", "silly"])
        s[a] = (...o) => s.sendToMain({
          data: o,
          level: a
        });
      if (u && process.contextIsolated)
        try {
          u.exposeInMainWorld("__electronLog", s);
        } catch {
        }
      typeof window == "object" ? window.__electronLog = s : __electronLog = s;
    }
  }(co)), co.exports;
}
var uo = { exports: {} }, lo, eh;
function IA() {
  if (eh) return lo;
  eh = 1, lo = e;
  function e(f) {
    return Object.defineProperties(t, {
      defaultLabel: { value: "", writable: !0 },
      labelPadding: { value: !0, writable: !0 },
      maxLabelLength: { value: 0, writable: !0 },
      labelLength: {
        get() {
          switch (typeof t.labelPadding) {
            case "boolean":
              return t.labelPadding ? t.maxLabelLength : 0;
            case "number":
              return t.labelPadding;
            default:
              return 0;
          }
        }
      }
    });
    function t(u) {
      t.maxLabelLength = Math.max(t.maxLabelLength, u.length);
      const r = {};
      for (const s of f.levels)
        r[s] = (...a) => f.logData(a, { level: s, scope: u });
      return r.log = r.info, r;
    }
  }
  return lo;
}
var _o, th;
function NA() {
  if (th) return _o;
  th = 1;
  class e {
    constructor({ processMessage: t }) {
      this.processMessage = t, this.buffer = [], this.enabled = !1, this.begin = this.begin.bind(this), this.commit = this.commit.bind(this), this.reject = this.reject.bind(this);
    }
    addMessage(t) {
      this.buffer.push(t);
    }
    begin() {
      this.enabled = [];
    }
    commit() {
      this.enabled = !1, this.buffer.forEach((t) => this.processMessage(t)), this.buffer = [];
    }
    reject() {
      this.enabled = !1, this.buffer = [];
    }
  }
  return _o = e, _o;
}
var fo, rh;
function D0() {
  if (rh) return fo;
  rh = 1;
  const e = IA(), f = NA(), u = class u {
    constructor({
      allowUnknownLevel: s = !1,
      dependencies: a = {},
      errorHandler: o,
      eventLogger: n,
      initializeFn: c,
      isDev: i = !1,
      levels: l = ["error", "warn", "info", "verbose", "debug", "silly"],
      logId: _,
      transportFactories: d = {},
      variables: p
    } = {}) {
      ge(this, "dependencies", {});
      ge(this, "errorHandler", null);
      ge(this, "eventLogger", null);
      ge(this, "functions", {});
      ge(this, "hooks", []);
      ge(this, "isDev", !1);
      ge(this, "levels", null);
      ge(this, "logId", null);
      ge(this, "scope", null);
      ge(this, "transports", {});
      ge(this, "variables", {});
      this.addLevel = this.addLevel.bind(this), this.create = this.create.bind(this), this.initialize = this.initialize.bind(this), this.logData = this.logData.bind(this), this.processMessage = this.processMessage.bind(this), this.allowUnknownLevel = s, this.buffering = new f(this), this.dependencies = a, this.initializeFn = c, this.isDev = i, this.levels = l, this.logId = _, this.scope = e(this), this.transportFactories = d, this.variables = p || {};
      for (const E of this.levels)
        this.addLevel(E, !1);
      this.log = this.info, this.functions.log = this.log, this.errorHandler = o, o == null || o.setOptions({ ...a, logFn: this.error }), this.eventLogger = n, n == null || n.setOptions({ ...a, logger: this });
      for (const [E, h] of Object.entries(d))
        this.transports[E] = h(this, a);
      u.instances[_] = this;
    }
    static getInstance({ logId: s }) {
      return this.instances[s] || this.instances.default;
    }
    addLevel(s, a = this.levels.length) {
      a !== !1 && this.levels.splice(a, 0, s), this[s] = (...o) => this.logData(o, { level: s }), this.functions[s] = this[s];
    }
    catchErrors(s) {
      return this.processMessage(
        {
          data: ["log.catchErrors is deprecated. Use log.errorHandler instead"],
          level: "warn"
        },
        { transports: ["console"] }
      ), this.errorHandler.startCatching(s);
    }
    create(s) {
      return typeof s == "string" && (s = { logId: s }), new u({
        dependencies: this.dependencies,
        errorHandler: this.errorHandler,
        initializeFn: this.initializeFn,
        isDev: this.isDev,
        transportFactories: this.transportFactories,
        variables: { ...this.variables },
        ...s
      });
    }
    compareLevels(s, a, o = this.levels) {
      const n = o.indexOf(s), c = o.indexOf(a);
      return c === -1 || n === -1 ? !0 : c <= n;
    }
    initialize(s = {}) {
      this.initializeFn({ logger: this, ...this.dependencies, ...s });
    }
    logData(s, a = {}) {
      this.buffering.enabled ? this.buffering.addMessage({ data: s, ...a }) : this.processMessage({ data: s, ...a });
    }
    processMessage(s, { transports: a = this.transports } = {}) {
      if (s.cmd === "errorHandler") {
        this.errorHandler.handle(s.error, {
          errorName: s.errorName,
          processType: "renderer",
          showDialog: !!s.showDialog
        });
        return;
      }
      let o = s.level;
      this.allowUnknownLevel || (o = this.levels.includes(s.level) ? s.level : "info");
      const n = {
        date: /* @__PURE__ */ new Date(),
        logId: this.logId,
        ...s,
        level: o,
        variables: {
          ...this.variables,
          ...s.variables
        }
      };
      for (const [c, i] of this.transportEntries(a))
        if (!(typeof i != "function" || i.level === !1) && this.compareLevels(i.level, s.level))
          try {
            const l = this.hooks.reduce((_, d) => _ && d(_, i, c), n);
            l && i({ ...l, data: [...l.data] });
          } catch (l) {
            this.processInternalErrorFn(l);
          }
    }
    processInternalErrorFn(s) {
    }
    transportEntries(s = this.transports) {
      return (Array.isArray(s) ? s : Object.entries(s)).map((o) => {
        switch (typeof o) {
          case "string":
            return this.transports[o] ? [o, this.transports[o]] : null;
          case "function":
            return [o.name, o];
          default:
            return Array.isArray(o) ? o : null;
        }
      }).filter(Boolean);
    }
  };
  ge(u, "instances", {});
  let t = u;
  return fo = t, fo;
}
var ho, nh;
function SA() {
  if (nh) return ho;
  nh = 1;
  const e = console.error;
  class f {
    constructor({ logFn: u = null } = {}) {
      ge(this, "logFn", null);
      ge(this, "onError", null);
      ge(this, "showDialog", !1);
      ge(this, "preventDefault", !0);
      this.handleError = this.handleError.bind(this), this.handleRejection = this.handleRejection.bind(this), this.startCatching = this.startCatching.bind(this), this.logFn = u;
    }
    handle(u, {
      logFn: r = this.logFn,
      errorName: s = "",
      onError: a = this.onError,
      showDialog: o = this.showDialog
    } = {}) {
      try {
        (a == null ? void 0 : a({ error: u, errorName: s, processType: "renderer" })) !== !1 && r({ error: u, errorName: s, showDialog: o });
      } catch {
        e(u);
      }
    }
    setOptions({ logFn: u, onError: r, preventDefault: s, showDialog: a }) {
      typeof u == "function" && (this.logFn = u), typeof r == "function" && (this.onError = r), typeof s == "boolean" && (this.preventDefault = s), typeof a == "boolean" && (this.showDialog = a);
    }
    startCatching({ onError: u, showDialog: r } = {}) {
      this.isActive || (this.isActive = !0, this.setOptions({ onError: u, showDialog: r }), window.addEventListener("error", (s) => {
        var a;
        this.preventDefault && ((a = s.preventDefault) == null || a.call(s)), this.handleError(s.error || s);
      }), window.addEventListener("unhandledrejection", (s) => {
        var a;
        this.preventDefault && ((a = s.preventDefault) == null || a.call(s)), this.handleRejection(s.reason || s);
      }));
    }
    handleError(u) {
      this.handle(u, { errorName: "Unhandled" });
    }
    handleRejection(u) {
      const r = u instanceof Error ? u : new Error(JSON.stringify(u));
      this.handle(r, { errorName: "Unhandled rejection" });
    }
  }
  return ho = f, ho;
}
var Eo, ih;
function nr() {
  if (ih) return Eo;
  ih = 1, Eo = { transform: e };
  function e({
    logger: f,
    message: t,
    transport: u,
    initialData: r = (t == null ? void 0 : t.data) || [],
    transforms: s = u == null ? void 0 : u.transforms
  }) {
    return s.reduce((a, o) => typeof o == "function" ? o({ data: a, logger: f, message: t, transport: u }) : a, r);
  }
  return Eo;
}
var Ao, sh;
function RA() {
  if (sh) return Ao;
  sh = 1;
  const { transform: e } = nr();
  Ao = t;
  const f = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    verbose: console.info,
    debug: console.debug,
    silly: console.debug,
    log: console.log
  };
  function t(r) {
    return Object.assign(s, {
      format: "{h}:{i}:{s}.{ms}{scope} › {text}",
      transforms: [u],
      writeFn({ message: { level: a, data: o } }) {
        const n = f[a] || f.info;
        setTimeout(() => n(...o));
      }
    });
    function s(a) {
      s.writeFn({
        message: { ...a, data: e({ logger: r, message: a, transport: s }) }
      });
    }
  }
  function u({
    data: r = [],
    logger: s = {},
    message: a = {},
    transport: o = {}
  }) {
    if (typeof o.format == "function")
      return o.format({
        data: r,
        level: (a == null ? void 0 : a.level) || "info",
        logger: s,
        message: a,
        transport: o
      });
    if (typeof o.format != "string")
      return r;
    r.unshift(o.format), typeof r[1] == "string" && r[1].match(/%[1cdfiOos]/) && (r = [`${r[0]} ${r[1]}`, ...r.slice(2)]);
    const n = a.date || /* @__PURE__ */ new Date();
    return r[0] = r[0].replace(/\{(\w+)}/g, (c, i) => {
      var l, _;
      switch (i) {
        case "level":
          return a.level;
        case "logId":
          return a.logId;
        case "scope": {
          const d = a.scope || ((l = s.scope) == null ? void 0 : l.defaultLabel);
          return d ? ` (${d})` : "";
        }
        case "text":
          return "";
        case "y":
          return n.getFullYear().toString(10);
        case "m":
          return (n.getMonth() + 1).toString(10).padStart(2, "0");
        case "d":
          return n.getDate().toString(10).padStart(2, "0");
        case "h":
          return n.getHours().toString(10).padStart(2, "0");
        case "i":
          return n.getMinutes().toString(10).padStart(2, "0");
        case "s":
          return n.getSeconds().toString(10).padStart(2, "0");
        case "ms":
          return n.getMilliseconds().toString(10).padStart(3, "0");
        case "iso":
          return n.toISOString();
        default:
          return ((_ = a.variables) == null ? void 0 : _[i]) || c;
      }
    }).trim(), r;
  }
  return Ao;
}
var po, ah;
function CA() {
  if (ah) return po;
  ah = 1;
  const { transform: e } = nr();
  po = t;
  const f = /* @__PURE__ */ new Set([Promise, WeakMap, WeakSet]);
  function t(s) {
    return Object.assign(a, {
      depth: 5,
      transforms: [r]
    });
    function a(o) {
      if (!window.__electronLog) {
        s.processMessage(
          {
            data: ["electron-log: logger isn't initialized in the main process"],
            level: "error"
          },
          { transports: ["console"] }
        );
        return;
      }
      try {
        const n = e({
          initialData: o,
          logger: s,
          message: o,
          transport: a
        });
        __electronLog.sendToMain(n);
      } catch (n) {
        s.transports.console({
          data: ["electronLog.transports.ipc", n, "data:", o.data],
          level: "error"
        });
      }
    }
  }
  function u(s) {
    return Object(s) !== s;
  }
  function r({
    data: s,
    depth: a,
    seen: o = /* @__PURE__ */ new WeakSet(),
    transport: n = {}
  } = {}) {
    const c = a || n.depth || 5;
    return o.has(s) ? "[Circular]" : c < 1 ? u(s) ? s : Array.isArray(s) ? "[Array]" : `[${typeof s}]` : ["function", "symbol"].includes(typeof s) ? s.toString() : u(s) ? s : f.has(s.constructor) ? `[${s.constructor.name}]` : Array.isArray(s) ? s.map((i) => r({
      data: i,
      depth: c - 1,
      seen: o
    })) : s instanceof Date ? s.toISOString() : s instanceof Error ? s.stack : s instanceof Map ? new Map(
      Array.from(s).map(([i, l]) => [
        r({ data: i, depth: c - 1, seen: o }),
        r({ data: l, depth: c - 1, seen: o })
      ])
    ) : s instanceof Set ? new Set(
      Array.from(s).map(
        (i) => r({ data: i, depth: c - 1, seen: o })
      )
    ) : (o.add(s), Object.fromEntries(
      Object.entries(s).map(
        ([i, l]) => [
          i,
          r({ data: l, depth: c - 1, seen: o })
        ]
      )
    ));
  }
  return po;
}
var oh;
function TA() {
  return oh || (oh = 1, function(e) {
    const f = D0(), t = SA(), u = RA(), r = CA();
    e.exports = s(), e.exports.Logger = f, e.exports.default = e.exports;
    function s() {
      const a = new f({
        allowUnknownLevel: !0,
        errorHandler: new t(),
        initializeFn: () => {
        },
        logId: "default",
        transportFactories: {
          console: u,
          ipc: r
        },
        variables: {
          processType: "renderer"
        }
      });
      return a.errorHandler.setOptions({
        logFn({ error: o, errorName: n, showDialog: c }) {
          a.transports.console({
            data: [n, o].filter(Boolean),
            level: "error"
          }), a.transports.ipc({
            cmd: "errorHandler",
            error: {
              cause: o == null ? void 0 : o.cause,
              code: o == null ? void 0 : o.code,
              name: o == null ? void 0 : o.name,
              message: o == null ? void 0 : o.message,
              stack: o == null ? void 0 : o.stack
            },
            errorName: n,
            logId: a.logId,
            showDialog: c
          });
        }
      }), typeof window == "object" && window.addEventListener("message", (o) => {
        const { cmd: n, logId: c, ...i } = o.data || {}, l = f.getInstance({ logId: c });
        n === "message" && l.processMessage(i, { transports: ["console"] });
      }), new Proxy(a, {
        get(o, n) {
          return typeof o[n] < "u" ? o[n] : (...c) => a.logData(c, { level: n });
        }
      });
    }
  }(uo)), uo.exports;
}
var Io, ch;
function gA() {
  if (ch) return Io;
  ch = 1;
  const e = ze, f = xe;
  Io = {
    findAndReadPackageJson: t,
    tryReadJsonAt: u
  };
  function t() {
    return u(a()) || u(s()) || u(process.resourcesPath, "app.asar") || u(process.resourcesPath, "app") || u(process.cwd()) || { name: void 0, version: void 0 };
  }
  function u(...o) {
    if (o[0])
      try {
        const n = f.join(...o), c = r("package.json", n);
        if (!c)
          return;
        const i = JSON.parse(e.readFileSync(c, "utf8")), l = (i == null ? void 0 : i.productName) || (i == null ? void 0 : i.name);
        return !l || l.toLowerCase() === "electron" ? void 0 : l ? { name: l, version: i == null ? void 0 : i.version } : void 0;
      } catch {
        return;
      }
  }
  function r(o, n) {
    let c = n;
    for (; ; ) {
      const i = f.parse(c), l = i.root, _ = i.dir;
      if (e.existsSync(f.join(c, o)))
        return f.resolve(f.join(c, o));
      if (c === l)
        return null;
      c = _;
    }
  }
  function s() {
    const o = process.argv.filter((c) => c.indexOf("--user-data-dir=") === 0);
    return o.length === 0 || typeof o[0] != "string" ? null : o[0].replace("--user-data-dir=", "");
  }
  function a() {
    var o;
    try {
      return (o = require.main) == null ? void 0 : o.filename;
    } catch {
      return;
    }
  }
  return Io;
}
var No, uh;
function U0() {
  if (uh) return No;
  uh = 1;
  const e = zr, f = Nt, t = xe, u = gA();
  class r {
    constructor() {
      ge(this, "appName");
      ge(this, "appPackageJson");
      ge(this, "platform", process.platform);
    }
    getAppLogPath(a = this.getAppName()) {
      return this.platform === "darwin" ? t.join(this.getSystemPathHome(), "Library/Logs", a) : t.join(this.getAppUserDataPath(a), "logs");
    }
    getAppName() {
      var o;
      const a = this.appName || ((o = this.getAppPackageJson()) == null ? void 0 : o.name);
      if (!a)
        throw new Error(
          "electron-log can't determine the app name. It tried these methods:\n1. Use `electron.app.name`\n2. Use productName or name from the nearest package.json`\nYou can also set it through log.transports.file.setAppName()"
        );
      return a;
    }
    /**
     * @private
     * @returns {undefined}
     */
    getAppPackageJson() {
      return typeof this.appPackageJson != "object" && (this.appPackageJson = u.findAndReadPackageJson()), this.appPackageJson;
    }
    getAppUserDataPath(a = this.getAppName()) {
      return a ? t.join(this.getSystemPathAppData(), a) : void 0;
    }
    getAppVersion() {
      var a;
      return (a = this.getAppPackageJson()) == null ? void 0 : a.version;
    }
    getElectronLogPath() {
      return this.getAppLogPath();
    }
    getMacOsVersion() {
      const a = Number(f.release().split(".")[0]);
      return a <= 19 ? `10.${a - 4}` : a - 9;
    }
    /**
     * @protected
     * @returns {string}
     */
    getOsVersion() {
      let a = f.type().replace("_", " "), o = f.release();
      return a === "Darwin" && (a = "macOS", o = this.getMacOsVersion()), `${a} ${o}`;
    }
    /**
     * @return {PathVariables}
     */
    getPathVariables() {
      const a = this.getAppName(), o = this.getAppVersion(), n = this;
      return {
        appData: this.getSystemPathAppData(),
        appName: a,
        appVersion: o,
        get electronDefaultDir() {
          return n.getElectronLogPath();
        },
        home: this.getSystemPathHome(),
        libraryDefaultDir: this.getAppLogPath(a),
        libraryTemplate: this.getAppLogPath("{appName}"),
        temp: this.getSystemPathTemp(),
        userData: this.getAppUserDataPath(a)
      };
    }
    getSystemPathAppData() {
      const a = this.getSystemPathHome();
      switch (this.platform) {
        case "darwin":
          return t.join(a, "Library/Application Support");
        case "win32":
          return process.env.APPDATA || t.join(a, "AppData/Roaming");
        default:
          return process.env.XDG_CONFIG_HOME || t.join(a, ".config");
      }
    }
    getSystemPathHome() {
      var a;
      return ((a = f.homedir) == null ? void 0 : a.call(f)) || process.env.HOME;
    }
    getSystemPathTemp() {
      return f.tmpdir();
    }
    getVersions() {
      return {
        app: `${this.getAppName()} ${this.getAppVersion()}`,
        electron: void 0,
        os: this.getOsVersion()
      };
    }
    isDev() {
      return process.env.NODE_ENV === "development" || process.env.ELECTRON_IS_DEV === "1";
    }
    isElectron() {
      return !!process.versions.electron;
    }
    onAppEvent(a, o) {
    }
    onAppReady(a) {
      a();
    }
    onEveryWebContentsEvent(a, o) {
    }
    /**
     * Listen to async messages sent from opposite process
     * @param {string} channel
     * @param {function} listener
     */
    onIpc(a, o) {
    }
    onIpcInvoke(a, o) {
    }
    /**
     * @param {string} url
     * @param {Function} [logFunction]
     */
    openUrl(a, o = console.error) {
      const c = { darwin: "open", win32: "start", linux: "xdg-open" }[process.platform] || "xdg-open";
      e.exec(`${c} ${a}`, {}, (i) => {
        i && o(i);
      });
    }
    setAppName(a) {
      this.appName = a;
    }
    setPlatform(a) {
      this.platform = a;
    }
    setPreloadFileForSessions({
      filePath: a,
      // eslint-disable-line no-unused-vars
      includeFutureSession: o = !0,
      // eslint-disable-line no-unused-vars
      getSessions: n = () => []
      // eslint-disable-line no-unused-vars
    }) {
    }
    /**
     * Sent a message to opposite process
     * @param {string} channel
     * @param {any} message
     */
    sendIpc(a, o) {
    }
    showErrorBox(a, o) {
    }
  }
  return No = r, No;
}
var So, lh;
function mA() {
  if (lh) return So;
  lh = 1;
  const e = xe, f = U0();
  class t extends f {
    /**
     * @param {object} options
     * @param {typeof Electron} [options.electron]
     */
    constructor({ electron: s } = {}) {
      super();
      /**
       * @type {typeof Electron}
       */
      ge(this, "electron");
      this.electron = s;
    }
    getAppName() {
      var a, o;
      let s;
      try {
        s = this.appName || ((a = this.electron.app) == null ? void 0 : a.name) || ((o = this.electron.app) == null ? void 0 : o.getName());
      } catch {
      }
      return s || super.getAppName();
    }
    getAppUserDataPath(s) {
      return this.getPath("userData") || super.getAppUserDataPath(s);
    }
    getAppVersion() {
      var a;
      let s;
      try {
        s = (a = this.electron.app) == null ? void 0 : a.getVersion();
      } catch {
      }
      return s || super.getAppVersion();
    }
    getElectronLogPath() {
      return this.getPath("logs") || super.getElectronLogPath();
    }
    /**
     * @private
     * @param {any} name
     * @returns {string|undefined}
     */
    getPath(s) {
      var a;
      try {
        return (a = this.electron.app) == null ? void 0 : a.getPath(s);
      } catch {
        return;
      }
    }
    getVersions() {
      return {
        app: `${this.getAppName()} ${this.getAppVersion()}`,
        electron: `Electron ${process.versions.electron}`,
        os: this.getOsVersion()
      };
    }
    getSystemPathAppData() {
      return this.getPath("appData") || super.getSystemPathAppData();
    }
    isDev() {
      var s;
      return ((s = this.electron.app) == null ? void 0 : s.isPackaged) !== void 0 ? !this.electron.app.isPackaged : typeof process.execPath == "string" ? e.basename(process.execPath).toLowerCase().startsWith("electron") : super.isDev();
    }
    onAppEvent(s, a) {
      var o;
      return (o = this.electron.app) == null || o.on(s, a), () => {
        var n;
        (n = this.electron.app) == null || n.off(s, a);
      };
    }
    onAppReady(s) {
      var a, o, n;
      (a = this.electron.app) != null && a.isReady() ? s() : (o = this.electron.app) != null && o.once ? (n = this.electron.app) == null || n.once("ready", s) : s();
    }
    onEveryWebContentsEvent(s, a) {
      var n, c, i;
      return (c = (n = this.electron.webContents) == null ? void 0 : n.getAllWebContents()) == null || c.forEach((l) => {
        l.on(s, a);
      }), (i = this.electron.app) == null || i.on("web-contents-created", o), () => {
        var l, _;
        (l = this.electron.webContents) == null || l.getAllWebContents().forEach((d) => {
          d.off(s, a);
        }), (_ = this.electron.app) == null || _.off("web-contents-created", o);
      };
      function o(l, _) {
        _.on(s, a);
      }
    }
    /**
     * Listen to async messages sent from opposite process
     * @param {string} channel
     * @param {function} listener
     */
    onIpc(s, a) {
      var o;
      (o = this.electron.ipcMain) == null || o.on(s, a);
    }
    onIpcInvoke(s, a) {
      var o, n;
      (n = (o = this.electron.ipcMain) == null ? void 0 : o.handle) == null || n.call(o, s, a);
    }
    /**
     * @param {string} url
     * @param {Function} [logFunction]
     */
    openUrl(s, a = console.error) {
      var o;
      (o = this.electron.shell) == null || o.openExternal(s).catch(a);
    }
    setPreloadFileForSessions({
      filePath: s,
      includeFutureSession: a = !0,
      getSessions: o = () => {
        var n;
        return [(n = this.electron.session) == null ? void 0 : n.defaultSession];
      }
    }) {
      for (const c of o().filter(Boolean))
        n(c);
      a && this.onAppEvent("session-created", (c) => {
        n(c);
      });
      function n(c) {
        typeof c.registerPreloadScript == "function" ? c.registerPreloadScript({
          filePath: s,
          id: "electron-log-preload",
          type: "frame"
        }) : c.setPreloads([...c.getPreloads(), s]);
      }
    }
    /**
     * Sent a message to opposite process
     * @param {string} channel
     * @param {any} message
     */
    sendIpc(s, a) {
      var o, n;
      (n = (o = this.electron.BrowserWindow) == null ? void 0 : o.getAllWindows()) == null || n.forEach((c) => {
        var i, l;
        ((i = c.webContents) == null ? void 0 : i.isDestroyed()) === !1 && ((l = c.webContents) == null ? void 0 : l.isCrashed()) === !1 && c.webContents.send(s, a);
      });
    }
    showErrorBox(s, a) {
      var o;
      (o = this.electron.dialog) == null || o.showErrorBox(s, a);
    }
  }
  return So = t, So;
}
var Ro, _h;
function OA() {
  if (_h) return Ro;
  _h = 1;
  const e = ze, f = Nt, t = xe, u = P0();
  Ro = {
    initialize({
      externalApi: a,
      getSessions: o,
      includeFutureSession: n,
      logger: c,
      preload: i = !0,
      spyRendererConsole: l = !1
    }) {
      a.onAppReady(() => {
        try {
          i && r({
            externalApi: a,
            getSessions: o,
            includeFutureSession: n,
            preloadOption: i
          }), l && s({ externalApi: a, logger: c });
        } catch (_) {
          c.warn(_);
        }
      });
    }
  };
  function r({
    externalApi: a,
    getSessions: o,
    includeFutureSession: n,
    preloadOption: c
  }) {
    let i = typeof c == "string" ? c : void 0;
    try {
      i = t.resolve(
        __dirname,
        "../renderer/electron-log-preload.js"
      );
    } catch {
    }
    if (!i || !e.existsSync(i)) {
      i = t.join(
        a.getAppUserDataPath() || f.tmpdir(),
        "electron-log-preload.js"
      );
      const l = `
      try {
        (${u.toString()})(require('electron'));
      } catch(e) {
        console.error(e);
      }
    `;
      e.writeFileSync(i, l, "utf8");
    }
    a.setPreloadFileForSessions({
      filePath: i,
      includeFutureSession: n,
      getSessions: o
    });
  }
  function s({ externalApi: a, logger: o }) {
    const n = ["verbose", "info", "warning", "error"];
    a.onEveryWebContentsEvent(
      "console-message",
      (c, i, l) => {
        o.processMessage({
          data: [l],
          level: n[i],
          variables: { processType: "renderer" }
        });
      }
    );
  }
  return Ro;
}
var Co, fh;
function wA() {
  if (fh) return Co;
  fh = 1;
  class e {
    constructor({
      externalApi: u,
      logFn: r = void 0,
      onError: s = void 0,
      showDialog: a = void 0
    } = {}) {
      ge(this, "externalApi");
      ge(this, "isActive", !1);
      ge(this, "logFn");
      ge(this, "onError");
      ge(this, "showDialog", !0);
      this.createIssue = this.createIssue.bind(this), this.handleError = this.handleError.bind(this), this.handleRejection = this.handleRejection.bind(this), this.setOptions({ externalApi: u, logFn: r, onError: s, showDialog: a }), this.startCatching = this.startCatching.bind(this), this.stopCatching = this.stopCatching.bind(this);
    }
    handle(u, {
      logFn: r = this.logFn,
      onError: s = this.onError,
      processType: a = "browser",
      showDialog: o = this.showDialog,
      errorName: n = ""
    } = {}) {
      var c;
      u = f(u);
      try {
        if (typeof s == "function") {
          const i = ((c = this.externalApi) == null ? void 0 : c.getVersions()) || {}, l = this.createIssue;
          if (s({
            createIssue: l,
            error: u,
            errorName: n,
            processType: a,
            versions: i
          }) === !1)
            return;
        }
        n ? r(n, u) : r(u), o && !n.includes("rejection") && this.externalApi && this.externalApi.showErrorBox(
          `A JavaScript error occurred in the ${a} process`,
          u.stack
        );
      } catch {
        console.error(u);
      }
    }
    setOptions({ externalApi: u, logFn: r, onError: s, showDialog: a }) {
      typeof u == "object" && (this.externalApi = u), typeof r == "function" && (this.logFn = r), typeof s == "function" && (this.onError = s), typeof a == "boolean" && (this.showDialog = a);
    }
    startCatching({ onError: u, showDialog: r } = {}) {
      this.isActive || (this.isActive = !0, this.setOptions({ onError: u, showDialog: r }), process.on("uncaughtException", this.handleError), process.on("unhandledRejection", this.handleRejection));
    }
    stopCatching() {
      this.isActive = !1, process.removeListener("uncaughtException", this.handleError), process.removeListener("unhandledRejection", this.handleRejection);
    }
    createIssue(u, r) {
      var s;
      (s = this.externalApi) == null || s.openUrl(
        `${u}?${new URLSearchParams(r).toString()}`
      );
    }
    handleError(u) {
      this.handle(u, { errorName: "Unhandled" });
    }
    handleRejection(u) {
      const r = u instanceof Error ? u : new Error(JSON.stringify(u));
      this.handle(r, { errorName: "Unhandled rejection" });
    }
  }
  function f(t) {
    if (t instanceof Error)
      return t;
    if (t && typeof t == "object") {
      if (t.message)
        return Object.assign(new Error(t.message), t);
      try {
        return new Error(JSON.stringify(t));
      } catch (u) {
        return new Error(`Couldn't normalize error ${String(t)}: ${u}`);
      }
    }
    return new Error(`Can't normalize error ${String(t)}`);
  }
  return Co = e, Co;
}
var To, hh;
function PA() {
  if (hh) return To;
  hh = 1;
  class e {
    constructor(t = {}) {
      ge(this, "disposers", []);
      ge(this, "format", "{eventSource}#{eventName}:");
      ge(this, "formatters", {
        app: {
          "certificate-error": ({ args: t }) => this.arrayToObject(t.slice(1, 4), [
            "url",
            "error",
            "certificate"
          ]),
          "child-process-gone": ({ args: t }) => t.length === 1 ? t[0] : t,
          "render-process-gone": ({ args: [t, u] }) => u && typeof u == "object" ? { ...u, ...this.getWebContentsDetails(t) } : []
        },
        webContents: {
          "console-message": ({ args: [t, u, r, s] }) => {
            if (!(t < 3))
              return { message: u, source: `${s}:${r}` };
          },
          "did-fail-load": ({ args: t }) => this.arrayToObject(t, [
            "errorCode",
            "errorDescription",
            "validatedURL",
            "isMainFrame",
            "frameProcessId",
            "frameRoutingId"
          ]),
          "did-fail-provisional-load": ({ args: t }) => this.arrayToObject(t, [
            "errorCode",
            "errorDescription",
            "validatedURL",
            "isMainFrame",
            "frameProcessId",
            "frameRoutingId"
          ]),
          "plugin-crashed": ({ args: t }) => this.arrayToObject(t, ["name", "version"]),
          "preload-error": ({ args: t }) => this.arrayToObject(t, ["preloadPath", "error"])
        }
      });
      ge(this, "events", {
        app: {
          "certificate-error": !0,
          "child-process-gone": !0,
          "render-process-gone": !0
        },
        webContents: {
          // 'console-message': true,
          "did-fail-load": !0,
          "did-fail-provisional-load": !0,
          "plugin-crashed": !0,
          "preload-error": !0,
          unresponsive: !0
        }
      });
      ge(this, "externalApi");
      ge(this, "level", "error");
      ge(this, "scope", "");
      this.setOptions(t);
    }
    setOptions({
      events: t,
      externalApi: u,
      level: r,
      logger: s,
      format: a,
      formatters: o,
      scope: n
    }) {
      typeof t == "object" && (this.events = t), typeof u == "object" && (this.externalApi = u), typeof r == "string" && (this.level = r), typeof s == "object" && (this.logger = s), (typeof a == "string" || typeof a == "function") && (this.format = a), typeof o == "object" && (this.formatters = o), typeof n == "string" && (this.scope = n);
    }
    startLogging(t = {}) {
      this.setOptions(t), this.disposeListeners();
      for (const u of this.getEventNames(this.events.app))
        this.disposers.push(
          this.externalApi.onAppEvent(u, (...r) => {
            this.handleEvent({ eventSource: "app", eventName: u, handlerArgs: r });
          })
        );
      for (const u of this.getEventNames(this.events.webContents))
        this.disposers.push(
          this.externalApi.onEveryWebContentsEvent(
            u,
            (...r) => {
              this.handleEvent(
                { eventSource: "webContents", eventName: u, handlerArgs: r }
              );
            }
          )
        );
    }
    stopLogging() {
      this.disposeListeners();
    }
    arrayToObject(t, u) {
      const r = {};
      return u.forEach((s, a) => {
        r[s] = t[a];
      }), t.length > u.length && (r.unknownArgs = t.slice(u.length)), r;
    }
    disposeListeners() {
      this.disposers.forEach((t) => t()), this.disposers = [];
    }
    formatEventLog({ eventName: t, eventSource: u, handlerArgs: r }) {
      var l;
      const [s, ...a] = r;
      if (typeof this.format == "function")
        return this.format({ args: a, event: s, eventName: t, eventSource: u });
      const o = (l = this.formatters[u]) == null ? void 0 : l[t];
      let n = a;
      if (typeof o == "function" && (n = o({ args: a, event: s, eventName: t, eventSource: u })), !n)
        return;
      const c = {};
      return Array.isArray(n) ? c.args = n : typeof n == "object" && Object.assign(c, n), u === "webContents" && Object.assign(c, this.getWebContentsDetails(s == null ? void 0 : s.sender)), [this.format.replace("{eventSource}", u === "app" ? "App" : "WebContents").replace("{eventName}", t), c];
    }
    getEventNames(t) {
      return !t || typeof t != "object" ? [] : Object.entries(t).filter(([u, r]) => r).map(([u]) => u);
    }
    getWebContentsDetails(t) {
      if (!(t != null && t.loadURL))
        return {};
      try {
        return {
          webContents: {
            id: t.id,
            url: t.getURL()
          }
        };
      } catch {
        return {};
      }
    }
    handleEvent({ eventName: t, eventSource: u, handlerArgs: r }) {
      var a;
      const s = this.formatEventLog({ eventName: t, eventSource: u, handlerArgs: r });
      if (s) {
        const o = this.scope ? this.logger.scope(this.scope) : this.logger;
        (a = o == null ? void 0 : o[this.level]) == null || a.call(o, ...s);
      }
    }
  }
  return To = e, To;
}
var go, dh;
function L0() {
  if (dh) return go;
  dh = 1;
  const { transform: e } = nr();
  go = {
    concatFirstStringElements: f,
    formatScope: u,
    formatText: s,
    formatVariables: r,
    timeZoneFromOffset: t,
    format({ message: a, logger: o, transport: n, data: c = a == null ? void 0 : a.data }) {
      switch (typeof n.format) {
        case "string":
          return e({
            message: a,
            logger: o,
            transforms: [r, u, s],
            transport: n,
            initialData: [n.format, ...c]
          });
        case "function":
          return n.format({
            data: c,
            level: (a == null ? void 0 : a.level) || "info",
            logger: o,
            message: a,
            transport: n
          });
        default:
          return c;
      }
    }
  };
  function f({ data: a }) {
    return typeof a[0] != "string" || typeof a[1] != "string" || a[0].match(/%[1cdfiOos]/) ? a : [`${a[0]} ${a[1]}`, ...a.slice(2)];
  }
  function t(a) {
    const o = Math.abs(a), n = a > 0 ? "-" : "+", c = Math.floor(o / 60).toString().padStart(2, "0"), i = (o % 60).toString().padStart(2, "0");
    return `${n}${c}:${i}`;
  }
  function u({ data: a, logger: o, message: n }) {
    const { defaultLabel: c, labelLength: i } = (o == null ? void 0 : o.scope) || {}, l = a[0];
    let _ = n.scope;
    _ || (_ = c);
    let d;
    return _ === "" ? d = i > 0 ? "".padEnd(i + 3) : "" : typeof _ == "string" ? d = ` (${_})`.padEnd(i + 3) : d = "", a[0] = l.replace("{scope}", d), a;
  }
  function r({ data: a, message: o }) {
    let n = a[0];
    if (typeof n != "string")
      return a;
    n = n.replace("{level}]", `${o.level}]`.padEnd(6, " "));
    const c = o.date || /* @__PURE__ */ new Date();
    return a[0] = n.replace(/\{(\w+)}/g, (i, l) => {
      var _;
      switch (l) {
        case "level":
          return o.level || "info";
        case "logId":
          return o.logId;
        case "y":
          return c.getFullYear().toString(10);
        case "m":
          return (c.getMonth() + 1).toString(10).padStart(2, "0");
        case "d":
          return c.getDate().toString(10).padStart(2, "0");
        case "h":
          return c.getHours().toString(10).padStart(2, "0");
        case "i":
          return c.getMinutes().toString(10).padStart(2, "0");
        case "s":
          return c.getSeconds().toString(10).padStart(2, "0");
        case "ms":
          return c.getMilliseconds().toString(10).padStart(3, "0");
        case "z":
          return t(c.getTimezoneOffset());
        case "iso":
          return c.toISOString();
        default:
          return ((_ = o.variables) == null ? void 0 : _[l]) || i;
      }
    }).trim(), a;
  }
  function s({ data: a }) {
    const o = a[0];
    if (typeof o != "string")
      return a;
    if (o.lastIndexOf("{text}") === o.length - 6)
      return a[0] = o.replace(/\s?{text}/, ""), a[0] === "" && a.shift(), a;
    const c = o.split("{text}");
    let i = [];
    return c[0] !== "" && i.push(c[0]), i = i.concat(a.slice(1)), c[1] !== "" && i.push(c[1]), i;
  }
  return go;
}
var mo = { exports: {} }, Eh;
function Wn() {
  return Eh || (Eh = 1, function(e) {
    const f = Mn;
    e.exports = {
      serialize: u,
      maxDepth({ data: r, transport: s, depth: a = (s == null ? void 0 : s.depth) ?? 6 }) {
        if (!r)
          return r;
        if (a < 1)
          return Array.isArray(r) ? "[array]" : typeof r == "object" && r ? "[object]" : r;
        if (Array.isArray(r))
          return r.map((n) => e.exports.maxDepth({
            data: n,
            depth: a - 1
          }));
        if (typeof r != "object" || r && typeof r.toISOString == "function")
          return r;
        if (r === null)
          return null;
        if (r instanceof Error)
          return r;
        const o = {};
        for (const n in r)
          Object.prototype.hasOwnProperty.call(r, n) && (o[n] = e.exports.maxDepth({
            data: r[n],
            depth: a - 1
          }));
        return o;
      },
      toJSON({ data: r }) {
        return JSON.parse(JSON.stringify(r, t()));
      },
      toString({ data: r, transport: s }) {
        const a = (s == null ? void 0 : s.inspectOptions) || {}, o = r.map((n) => {
          if (n !== void 0)
            try {
              const c = JSON.stringify(n, t(), "  ");
              return c === void 0 ? void 0 : JSON.parse(c);
            } catch {
              return n;
            }
        });
        return f.formatWithOptions(a, ...o);
      }
    };
    function t(r = {}) {
      const s = /* @__PURE__ */ new WeakSet();
      return function(a, o) {
        if (typeof o == "object" && o !== null) {
          if (s.has(o))
            return;
          s.add(o);
        }
        return u(a, o, r);
      };
    }
    function u(r, s, a = {}) {
      const o = (a == null ? void 0 : a.serializeMapAndSet) !== !1;
      return s instanceof Error ? s.stack : s && (typeof s == "function" ? `[function] ${s.toString()}` : s instanceof Date ? s.toISOString() : o && s instanceof Map && Object.fromEntries ? Object.fromEntries(s) : o && s instanceof Set && Array.from ? Array.from(s) : s);
    }
  }(mo)), mo.exports;
}
var Oo, Ah;
function oc() {
  if (Ah) return Oo;
  Ah = 1, Oo = {
    transformStyles: u,
    applyAnsiStyles({ data: r }) {
      return u(r, f, t);
    },
    removeStyles({ data: r }) {
      return u(r, () => "");
    }
  };
  const e = {
    unset: "\x1B[0m",
    black: "\x1B[30m",
    red: "\x1B[31m",
    green: "\x1B[32m",
    yellow: "\x1B[33m",
    blue: "\x1B[34m",
    magenta: "\x1B[35m",
    cyan: "\x1B[36m",
    white: "\x1B[37m"
  };
  function f(r) {
    const s = r.replace(/color:\s*(\w+).*/, "$1").toLowerCase();
    return e[s] || "";
  }
  function t(r) {
    return r + e.unset;
  }
  function u(r, s, a) {
    const o = {};
    return r.reduce((n, c, i, l) => {
      if (o[i])
        return n;
      if (typeof c == "string") {
        let _ = i, d = !1;
        c = c.replace(/%[1cdfiOos]/g, (p) => {
          if (_ += 1, p !== "%c")
            return p;
          const E = l[_];
          return typeof E == "string" ? (o[_] = !0, d = !0, s(E, c)) : p;
        }), d && a && (c = a(c));
      }
      return n.push(c), n;
    }, []);
  }
  return Oo;
}
var wo, ph;
function DA() {
  if (ph) return wo;
  ph = 1;
  const {
    concatFirstStringElements: e,
    format: f
  } = L0(), { maxDepth: t, toJSON: u } = Wn(), {
    applyAnsiStyles: r,
    removeStyles: s
  } = oc(), { transform: a } = nr(), o = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    verbose: console.info,
    debug: console.debug,
    silly: console.debug,
    log: console.log
  };
  wo = i;
  const c = `%c{h}:{i}:{s}.{ms}{scope}%c ${process.platform === "win32" ? ">" : "›"} {text}`;
  Object.assign(i, {
    DEFAULT_FORMAT: c
  });
  function i(E) {
    return Object.assign(h, {
      format: c,
      level: "silly",
      transforms: [
        l,
        f,
        d,
        e,
        t,
        u
      ],
      useStyles: process.env.FORCE_STYLES,
      writeFn({ message: N }) {
        (o[N.level] || o.info)(...N.data);
      }
    });
    function h(N) {
      const A = a({ logger: E, message: N, transport: h });
      h.writeFn({
        message: { ...N, data: A }
      });
    }
  }
  function l({ data: E, message: h, transport: N }) {
    return N.format !== c ? E : [`color:${p(h.level)}`, "color:unset", ...E];
  }
  function _(E, h) {
    if (typeof E == "boolean")
      return E;
    const A = h === "error" || h === "warn" ? process.stderr : process.stdout;
    return A && A.isTTY;
  }
  function d(E) {
    const { message: h, transport: N } = E;
    return (_(N.useStyles, h.level) ? r : s)(E);
  }
  function p(E) {
    const h = { error: "red", warn: "yellow", info: "cyan", default: "unset" };
    return h[E] || h.default;
  }
  return wo;
}
var Po, Ih;
function b0() {
  if (Ih) return Po;
  Ih = 1;
  const e = St, f = ze, t = Nt;
  class u extends e {
    constructor({
      path: o,
      writeOptions: n = { encoding: "utf8", flag: "a", mode: 438 },
      writeAsync: c = !1
    }) {
      super();
      ge(this, "asyncWriteQueue", []);
      ge(this, "bytesWritten", 0);
      ge(this, "hasActiveAsyncWriting", !1);
      ge(this, "path", null);
      ge(this, "initialSize");
      ge(this, "writeOptions", null);
      ge(this, "writeAsync", !1);
      this.path = o, this.writeOptions = n, this.writeAsync = c;
    }
    get size() {
      return this.getSize();
    }
    clear() {
      try {
        return f.writeFileSync(this.path, "", {
          mode: this.writeOptions.mode,
          flag: "w"
        }), this.reset(), !0;
      } catch (o) {
        return o.code === "ENOENT" ? !0 : (this.emit("error", o, this), !1);
      }
    }
    crop(o) {
      try {
        const n = r(this.path, o || 4096);
        this.clear(), this.writeLine(`[log cropped]${t.EOL}${n}`);
      } catch (n) {
        this.emit(
          "error",
          new Error(`Couldn't crop file ${this.path}. ${n.message}`),
          this
        );
      }
    }
    getSize() {
      if (this.initialSize === void 0)
        try {
          const o = f.statSync(this.path);
          this.initialSize = o.size;
        } catch {
          this.initialSize = 0;
        }
      return this.initialSize + this.bytesWritten;
    }
    increaseBytesWrittenCounter(o) {
      this.bytesWritten += Buffer.byteLength(o, this.writeOptions.encoding);
    }
    isNull() {
      return !1;
    }
    nextAsyncWrite() {
      const o = this;
      if (this.hasActiveAsyncWriting || this.asyncWriteQueue.length === 0)
        return;
      const n = this.asyncWriteQueue.join("");
      this.asyncWriteQueue = [], this.hasActiveAsyncWriting = !0, f.writeFile(this.path, n, this.writeOptions, (c) => {
        o.hasActiveAsyncWriting = !1, c ? o.emit(
          "error",
          new Error(`Couldn't write to ${o.path}. ${c.message}`),
          this
        ) : o.increaseBytesWrittenCounter(n), o.nextAsyncWrite();
      });
    }
    reset() {
      this.initialSize = void 0, this.bytesWritten = 0;
    }
    toString() {
      return this.path;
    }
    writeLine(o) {
      if (o += t.EOL, this.writeAsync) {
        this.asyncWriteQueue.push(o), this.nextAsyncWrite();
        return;
      }
      try {
        f.writeFileSync(this.path, o, this.writeOptions), this.increaseBytesWrittenCounter(o);
      } catch (n) {
        this.emit(
          "error",
          new Error(`Couldn't write to ${this.path}. ${n.message}`),
          this
        );
      }
    }
  }
  Po = u;
  function r(s, a) {
    const o = Buffer.alloc(a), n = f.statSync(s), c = Math.min(n.size, a), i = Math.max(0, n.size - a), l = f.openSync(s, "r"), _ = f.readSync(l, o, 0, c, i);
    return f.closeSync(l), o.toString("utf8", 0, _);
  }
  return Po;
}
var Do, Nh;
function UA() {
  if (Nh) return Do;
  Nh = 1;
  const e = b0();
  class f extends e {
    clear() {
    }
    crop() {
    }
    getSize() {
      return 0;
    }
    isNull() {
      return !0;
    }
    writeLine() {
    }
  }
  return Do = f, Do;
}
var Uo, Sh;
function LA() {
  if (Sh) return Uo;
  Sh = 1;
  const e = St, f = ze, t = xe, u = b0(), r = UA();
  class s extends e {
    constructor() {
      super();
      ge(this, "store", {});
      this.emitError = this.emitError.bind(this);
    }
    /**
     * Provide a File object corresponding to the filePath
     * @param {string} filePath
     * @param {WriteOptions} [writeOptions]
     * @param {boolean} [writeAsync]
     * @return {File}
     */
    provide({ filePath: n, writeOptions: c = {}, writeAsync: i = !1 }) {
      let l;
      try {
        if (n = t.resolve(n), this.store[n])
          return this.store[n];
        l = this.createFile({ filePath: n, writeOptions: c, writeAsync: i });
      } catch (_) {
        l = new r({ path: n }), this.emitError(_, l);
      }
      return l.on("error", this.emitError), this.store[n] = l, l;
    }
    /**
     * @param {string} filePath
     * @param {WriteOptions} writeOptions
     * @param {boolean} async
     * @return {File}
     * @private
     */
    createFile({ filePath: n, writeOptions: c, writeAsync: i }) {
      return this.testFileWriting({ filePath: n, writeOptions: c }), new u({ path: n, writeOptions: c, writeAsync: i });
    }
    /**
     * @param {Error} error
     * @param {File} file
     * @private
     */
    emitError(n, c) {
      this.emit("error", n, c);
    }
    /**
     * @param {string} filePath
     * @param {WriteOptions} writeOptions
     * @private
     */
    testFileWriting({ filePath: n, writeOptions: c }) {
      f.mkdirSync(t.dirname(n), { recursive: !0 }), f.writeFileSync(n, "", { flag: "a", mode: c.mode });
    }
  }
  return Uo = s, Uo;
}
var Lo, Rh;
function bA() {
  if (Rh) return Lo;
  Rh = 1;
  const e = ze, f = Nt, t = xe, u = LA(), { transform: r } = nr(), { removeStyles: s } = oc(), {
    format: a,
    concatFirstStringElements: o
  } = L0(), { toString: n } = Wn();
  Lo = i;
  const c = new u();
  function i(_, { registry: d = c, externalApi: p } = {}) {
    let E;
    return d.listenerCount("error") < 1 && d.on("error", (L, R) => {
      A(`Can't write to ${R}`, L);
    }), Object.assign(h, {
      fileName: l(_.variables.processType),
      format: "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}",
      getFile: C,
      inspectOptions: { depth: 5 },
      level: "silly",
      maxSize: 1024 ** 2,
      readAllLogs: g,
      sync: !0,
      transforms: [s, a, o, n],
      writeOptions: { flag: "a", mode: 438, encoding: "utf8" },
      archiveLogFn(L) {
        const R = L.toString(), O = t.parse(R);
        try {
          e.renameSync(R, t.join(O.dir, `${O.name}.old${O.ext}`));
        } catch (D) {
          A("Could not rotate log", D);
          const m = Math.round(h.maxSize / 4);
          L.crop(Math.min(m, 256 * 1024));
        }
      },
      resolvePathFn(L) {
        return t.join(L.libraryDefaultDir, L.fileName);
      },
      setAppName(L) {
        _.dependencies.externalApi.setAppName(L);
      }
    });
    function h(L) {
      const R = C(L);
      h.maxSize > 0 && R.size > h.maxSize && (h.archiveLogFn(R), R.reset());
      const D = r({ logger: _, message: L, transport: h });
      R.writeLine(D);
    }
    function N() {
      E || (E = Object.create(
        Object.prototype,
        {
          ...Object.getOwnPropertyDescriptors(
            p.getPathVariables()
          ),
          fileName: {
            get() {
              return h.fileName;
            },
            enumerable: !0
          }
        }
      ), typeof h.archiveLog == "function" && (h.archiveLogFn = h.archiveLog, A("archiveLog is deprecated. Use archiveLogFn instead")), typeof h.resolvePath == "function" && (h.resolvePathFn = h.resolvePath, A("resolvePath is deprecated. Use resolvePathFn instead")));
    }
    function A(L, R = null, O = "error") {
      const D = [`electron-log.transports.file: ${L}`];
      R && D.push(R), _.transports.console({ data: D, date: /* @__PURE__ */ new Date(), level: O });
    }
    function C(L) {
      N();
      const R = h.resolvePathFn(E, L);
      return d.provide({
        filePath: R,
        writeAsync: !h.sync,
        writeOptions: h.writeOptions
      });
    }
    function g({ fileFilter: L = (R) => R.endsWith(".log") } = {}) {
      N();
      const R = t.dirname(h.resolvePathFn(E));
      return e.existsSync(R) ? e.readdirSync(R).map((O) => t.join(R, O)).filter(L).map((O) => {
        try {
          return {
            path: O,
            lines: e.readFileSync(O, "utf8").split(f.EOL)
          };
        } catch {
          return null;
        }
      }).filter(Boolean) : [];
    }
  }
  function l(_ = process.type) {
    switch (_) {
      case "renderer":
        return "renderer.log";
      case "worker":
        return "worker.log";
      default:
        return "main.log";
    }
  }
  return Lo;
}
var bo, Ch;
function yA() {
  if (Ch) return bo;
  Ch = 1;
  const { maxDepth: e, toJSON: f } = Wn(), { transform: t } = nr();
  bo = u;
  function u(r, { externalApi: s }) {
    return Object.assign(a, {
      depth: 3,
      eventId: "__ELECTRON_LOG_IPC__",
      level: r.isDev ? "silly" : !1,
      transforms: [f, e]
    }), s != null && s.isElectron() ? a : void 0;
    function a(o) {
      var n;
      ((n = o == null ? void 0 : o.variables) == null ? void 0 : n.processType) !== "renderer" && (s == null || s.sendIpc(a.eventId, {
        ...o,
        data: t({ logger: r, message: o, transport: a })
      }));
    }
  }
  return bo;
}
var yo, Th;
function vA() {
  if (Th) return yo;
  Th = 1;
  const e = bh, f = Ld, { transform: t } = nr(), { removeStyles: u } = oc(), { toJSON: r, maxDepth: s } = Wn();
  yo = a;
  function a(o) {
    return Object.assign(n, {
      client: { name: "electron-application" },
      depth: 6,
      level: !1,
      requestOptions: {},
      transforms: [u, r, s],
      makeBodyFn({ message: c }) {
        return JSON.stringify({
          client: n.client,
          data: c.data,
          date: c.date.getTime(),
          level: c.level,
          scope: c.scope,
          variables: c.variables
        });
      },
      processErrorFn({ error: c }) {
        o.processMessage(
          {
            data: [`electron-log: can't POST ${n.url}`, c],
            level: "warn"
          },
          { transports: ["console", "file"] }
        );
      },
      sendRequestFn({ serverUrl: c, requestOptions: i, body: l }) {
        const d = (c.startsWith("https:") ? f : e).request(c, {
          method: "POST",
          ...i,
          headers: {
            "Content-Type": "application/json",
            "Content-Length": l.length,
            ...i.headers
          }
        });
        return d.write(l), d.end(), d;
      }
    });
    function n(c) {
      if (!n.url)
        return;
      const i = n.makeBodyFn({
        logger: o,
        message: { ...c, data: t({ logger: o, message: c, transport: n }) },
        transport: n
      }), l = n.sendRequestFn({
        serverUrl: n.url,
        requestOptions: n.requestOptions,
        body: Buffer.from(i, "utf8")
      });
      l.on("error", (_) => n.processErrorFn({
        error: _,
        logger: o,
        message: c,
        request: l,
        transport: n
      }));
    }
  }
  return yo;
}
var vo, gh;
function y0() {
  if (gh) return vo;
  gh = 1;
  const e = D0(), f = wA(), t = PA(), u = DA(), r = bA(), s = yA(), a = vA();
  vo = o;
  function o({ dependencies: n, initializeFn: c }) {
    var l;
    const i = new e({
      dependencies: n,
      errorHandler: new f(),
      eventLogger: new t(),
      initializeFn: c,
      isDev: (l = n.externalApi) == null ? void 0 : l.isDev(),
      logId: "default",
      transportFactories: {
        console: u,
        file: r,
        ipc: s,
        remote: a
      },
      variables: {
        processType: "main"
      }
    });
    return i.default = i, i.Logger = e, i.processInternalErrorFn = (_) => {
      i.transports.console.writeFn({
        message: {
          data: ["Unhandled electron-log error", _],
          level: "error"
        }
      });
    }, i;
  }
  return vo;
}
var Fo, mh;
function FA() {
  if (mh) return Fo;
  mh = 1;
  const e = xt, f = mA(), { initialize: t } = OA(), u = y0(), r = new f({ electron: e }), s = u({
    dependencies: { externalApi: r },
    initializeFn: t
  });
  Fo = s, r.onIpc("__ELECTRON_LOG__", (o, n) => {
    n.scope && s.Logger.getInstance(n).scope(n.scope);
    const c = new Date(n.date);
    a({
      ...n,
      date: c.getTime() ? c : /* @__PURE__ */ new Date()
    });
  }), r.onIpcInvoke("__ELECTRON_LOG__", (o, { cmd: n = "", logId: c }) => {
    switch (n) {
      case "getOptions":
        return {
          levels: s.Logger.getInstance({ logId: c }).levels,
          logId: c
        };
      default:
        return a({ data: [`Unknown cmd '${n}'`], level: "error" }), {};
    }
  });
  function a(o) {
    var n;
    (n = s.Logger.getInstance(o)) == null || n.processMessage(o);
  }
  return Fo;
}
var Mo, Oh;
function MA() {
  if (Oh) return Mo;
  Oh = 1;
  const e = U0(), f = y0(), t = new e();
  return Mo = f({
    dependencies: { externalApi: t }
  }), Mo;
}
var wh;
function xA() {
  if (wh) return jr.exports;
  wh = 1;
  const e = typeof process > "u" || process.type === "renderer" || process.type === "worker", f = typeof process == "object" && process.type === "browser";
  return e ? (P0(), jr.exports = TA()) : f ? jr.exports = FA() : jr.exports = MA(), jr.exports;
}
var BA = xA();
const Ir = /* @__PURE__ */ qo(BA), { autoUpdater: ir } = pA, kA = wd(import.meta.url), Go = xe.dirname(kA);
Fd.config({ path: xe.join(Go, `../../.env.${process.env.NODE_ENV}`) });
const cc = !yn.isPackaged, HA = cc ? "../preload/preload.js" : "preload.mjs", GA = cc ? "../renderer/index.html" : "renderer/index.html";
async function qA() {
  const e = new Jt({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: xe.join(Go, HA),
      contextIsolation: !0,
      nodeIntegration: !1,
      devTools: !1,
      webSecurity: !0
    },
    frame: !1
  });
  cc ? (e.loadURL(`${process.env.VITE_APP_URL}:${process.env.VITE_APP_PORT}`), e.webContents.openDevTools()) : e.loadFile(xe.join(Go, GA)), Dn.on("max-window", () => {
    e.maximize();
  }), Dn.on("unmax-window", () => {
    e.unmaximize();
  }), Dn.on("min-window", () => {
    e.minimize();
  });
}
Dn.handle("getData:date", async (e, f) => {
  console.log(f);
  const t = `
    with staticViwers as (
      select ts.NAME, count(vs.ID) as STATIC_VIWERS, tb.BROADCAST_DATE from tb_daily_view_scores vs
      left join tb_users tu on vs.USER_ID = tu.ID
      left join tb_broadcasts tb on vs.BROADCAST_ID = tb.ID
      left join tb_streamers ts on ts.ID = tb.STREAMER_ID
      where tb.BROADCAST_DATE = '${f}' and vs.TOTAL_VIEW_TIME > (tb.DURATION/2) 
      group by ts.NAME
    )
    select ts.NAME, count(vs.ID) as VIWERS, sv.static_viwers as STATIC_VIWERS, tb.BROADCAST_DATE from tb_daily_view_scores vs
    left join tb_users tu on vs.USER_ID = tu.ID
    left join tb_broadcasts tb on vs.BROADCAST_ID = tb.ID
    left join tb_streamers ts on ts.ID = tb.STREAMER_ID
    left join staticViwers sv on sv.NAME = ts.NAME
    where tb.BROADCAST_DATE = '${f}'
    group by ts.NAME;
  `;
  return await VE(t);
});
yn.on("ready", () => {
  qA(), ir.checkForUpdates();
});
yn.on("window-all-closed", () => {
  yn.quit();
});
ir.on("checking-for-update", () => {
  var e;
  Ir.info("업데이트 확인 중..."), (e = Jt.getAllWindows()[0]) == null || e.webContents.send("update:checking");
});
ir.on("update-available", (e) => {
  var f;
  Ir.info("업데이트가 가능합니다."), (f = Jt.getAllWindows()[0]) == null || f.webContents.send("update:available");
});
ir.on("update-not-available", (e) => {
  var f;
  Ir.info("현재 최신버전입니다."), (f = Jt.getAllWindows()[0]) == null || f.webContents.send("update:not-available");
});
ir.on("error", (e) => {
  var f;
  Ir.info("에러가 발생하였습니다. 에러내용 : " + e), (f = Jt.getAllWindows()[0]) == null || f.webContents.send("update:error", e);
});
ir.on("download-progress", (e) => {
  var t;
  let f = "다운로드 속도: " + e.bytesPerSecond;
  f = f + " - 현재 " + e.percent + "%", f = f + " (" + e.transferred + "/" + e.total + ")", (t = Jt.getAllWindows()[0]) == null || t.webContents.send("update:progress", e), Ir.info(f);
});
ir.on("update-downloaded", (e) => {
  var f;
  Ir.info("업데이트가 완료되었습니다."), (f = Jt.getAllWindows()[0]) == null || f.webContents.send("update:downloaded");
});
