var cf = Object.defineProperty;
var ff = (o, h, f) => h in o ? cf(o, h, { enumerable: !0, configurable: !0, writable: !0, value: f }) : o[h] = f;
var Ae = (o, h, f) => ff(o, typeof h != "symbol" ? h + "" : h, f);
import mt, { app as Mr, BrowserWindow as df } from "electron";
import Ut, { fileURLToPath as hf } from "url";
import Ve from "fs";
import be from "path";
import ut from "os";
import kt from "crypto";
import Br from "events";
import Du from "tty";
import jr from "util";
import mr from "stream";
import pf from "string_decoder";
import mf from "constants";
import Pu from "assert";
import gr from "child_process";
import Iu from "zlib";
import Nu from "http";
import gf from "https";
var Ze = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function vf(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var nt = { exports: {} };
const yf = "16.4.7", Ef = {
  version: yf
};
var ts;
function wf() {
  if (ts) return nt.exports;
  ts = 1;
  const o = Ve, h = be, f = ut, d = kt, r = Ef.version, e = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
  function n(w) {
    const _ = {};
    let S = w.toString();
    S = S.replace(/\r\n?/mg, `
`);
    let E;
    for (; (E = e.exec(S)) != null; ) {
      const q = E[1];
      let F = E[2] || "";
      F = F.trim();
      const N = F[0];
      F = F.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), N === '"' && (F = F.replace(/\\n/g, `
`), F = F.replace(/\\r/g, "\r")), _[q] = F;
    }
    return _;
  }
  function t(w) {
    const _ = g(w), S = $.configDotenv({ path: _ });
    if (!S.parsed) {
      const N = new Error(`MISSING_DATA: Cannot parse ${_} for an unknown reason`);
      throw N.code = "MISSING_DATA", N;
    }
    const E = s(w).split(","), q = E.length;
    let F;
    for (let N = 0; N < q; N++)
      try {
        const k = E[N].trim(), P = p(S, k);
        F = $.decrypt(P.ciphertext, P.key);
        break;
      } catch (k) {
        if (N + 1 >= q)
          throw k;
      }
    return $.parse(F);
  }
  function a(w) {
    console.log(`[dotenv@${r}][INFO] ${w}`);
  }
  function i(w) {
    console.log(`[dotenv@${r}][WARN] ${w}`);
  }
  function l(w) {
    console.log(`[dotenv@${r}][DEBUG] ${w}`);
  }
  function s(w) {
    return w && w.DOTENV_KEY && w.DOTENV_KEY.length > 0 ? w.DOTENV_KEY : process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0 ? process.env.DOTENV_KEY : "";
  }
  function p(w, _) {
    let S;
    try {
      S = new URL(_);
    } catch (k) {
      if (k.code === "ERR_INVALID_URL") {
        const P = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
        throw P.code = "INVALID_DOTENV_KEY", P;
      }
      throw k;
    }
    const E = S.password;
    if (!E) {
      const k = new Error("INVALID_DOTENV_KEY: Missing key part");
      throw k.code = "INVALID_DOTENV_KEY", k;
    }
    const q = S.searchParams.get("environment");
    if (!q) {
      const k = new Error("INVALID_DOTENV_KEY: Missing environment part");
      throw k.code = "INVALID_DOTENV_KEY", k;
    }
    const F = `DOTENV_VAULT_${q.toUpperCase()}`, N = w.parsed[F];
    if (!N) {
      const k = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${F} in your .env.vault file.`);
      throw k.code = "NOT_FOUND_DOTENV_ENVIRONMENT", k;
    }
    return { ciphertext: N, key: E };
  }
  function g(w) {
    let _ = null;
    if (w && w.path && w.path.length > 0)
      if (Array.isArray(w.path))
        for (const S of w.path)
          o.existsSync(S) && (_ = S.endsWith(".vault") ? S : `${S}.vault`);
      else
        _ = w.path.endsWith(".vault") ? w.path : `${w.path}.vault`;
    else
      _ = h.resolve(process.cwd(), ".env.vault");
    return o.existsSync(_) ? _ : null;
  }
  function v(w) {
    return w[0] === "~" ? h.join(f.homedir(), w.slice(1)) : w;
  }
  function m(w) {
    a("Loading env from encrypted .env.vault");
    const _ = $._parseVault(w);
    let S = process.env;
    return w && w.processEnv != null && (S = w.processEnv), $.populate(S, _, w), { parsed: _ };
  }
  function b(w) {
    const _ = h.resolve(process.cwd(), ".env");
    let S = "utf8";
    const E = !!(w && w.debug);
    w && w.encoding ? S = w.encoding : E && l("No encoding is specified. UTF-8 is used by default");
    let q = [_];
    if (w && w.path)
      if (!Array.isArray(w.path))
        q = [v(w.path)];
      else {
        q = [];
        for (const P of w.path)
          q.push(v(P));
      }
    let F;
    const N = {};
    for (const P of q)
      try {
        const I = $.parse(o.readFileSync(P, { encoding: S }));
        $.populate(N, I, w);
      } catch (I) {
        E && l(`Failed to load ${P} ${I.message}`), F = I;
      }
    let k = process.env;
    return w && w.processEnv != null && (k = w.processEnv), $.populate(k, N, w), F ? { parsed: N, error: F } : { parsed: N };
  }
  function R(w) {
    if (s(w).length === 0)
      return $.configDotenv(w);
    const _ = g(w);
    return _ ? $._configVault(w) : (i(`You set DOTENV_KEY but you are missing a .env.vault file at ${_}. Did you forget to build it?`), $.configDotenv(w));
  }
  function O(w, _) {
    const S = Buffer.from(_.slice(-64), "hex");
    let E = Buffer.from(w, "base64");
    const q = E.subarray(0, 12), F = E.subarray(-16);
    E = E.subarray(12, -16);
    try {
      const N = d.createDecipheriv("aes-256-gcm", S, q);
      return N.setAuthTag(F), `${N.update(E)}${N.final()}`;
    } catch (N) {
      const k = N instanceof RangeError, P = N.message === "Invalid key length", I = N.message === "Unsupported state or unable to authenticate data";
      if (k || P) {
        const L = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
        throw L.code = "INVALID_DOTENV_KEY", L;
      } else if (I) {
        const L = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
        throw L.code = "DECRYPTION_FAILED", L;
      } else
        throw N;
    }
  }
  function D(w, _, S = {}) {
    const E = !!(S && S.debug), q = !!(S && S.override);
    if (typeof _ != "object") {
      const F = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
      throw F.code = "OBJECT_REQUIRED", F;
    }
    for (const F of Object.keys(_))
      Object.prototype.hasOwnProperty.call(w, F) ? (q === !0 && (w[F] = _[F]), E && l(q === !0 ? `"${F}" is already defined and WAS overwritten` : `"${F}" is already defined and was NOT overwritten`)) : w[F] = _[F];
  }
  const $ = {
    configDotenv: b,
    _configVault: m,
    _parseVault: t,
    config: R,
    decrypt: O,
    parse: n,
    populate: D
  };
  return nt.exports.configDotenv = $.configDotenv, nt.exports._configVault = $._configVault, nt.exports._parseVault = $._parseVault, nt.exports.config = $.config, nt.exports.decrypt = $.decrypt, nt.exports.parse = $.parse, nt.exports.populate = $.populate, nt.exports = $, nt.exports;
}
var _f = wf(), Zr = {}, en = {}, At = {}, rs;
function Do() {
  if (rs) return At;
  rs = 1, Object.defineProperty(At, "__esModule", { value: !0 }), At.CancellationError = At.CancellationToken = void 0;
  const o = Br;
  let h = class extends o.EventEmitter {
    get cancelled() {
      return this._cancelled || this._parent != null && this._parent.cancelled;
    }
    set parent(c) {
      this.removeParentCancelHandler(), this._parent = c, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
    }
    // babel cannot compile ... correctly for super calls
    constructor(c) {
      super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, c != null && (this.parent = c);
    }
    cancel() {
      this._cancelled = !0, this.emit("cancel");
    }
    onCancel(c) {
      this.cancelled ? c() : this.once("cancel", c);
    }
    createPromise(c) {
      if (this.cancelled)
        return Promise.reject(new f());
      const r = () => {
        if (e != null)
          try {
            this.removeListener("cancel", e), e = null;
          } catch {
          }
      };
      let e = null;
      return new Promise((n, t) => {
        let a = null;
        if (e = () => {
          try {
            a != null && (a(), a = null);
          } finally {
            t(new f());
          }
        }, this.cancelled) {
          e();
          return;
        }
        this.onCancel(e), c(n, t, (i) => {
          a = i;
        });
      }).then((n) => (r(), n)).catch((n) => {
        throw r(), n;
      });
    }
    removeParentCancelHandler() {
      const c = this._parent;
      c != null && this.parentCancelHandler != null && (c.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
    }
    dispose() {
      try {
        this.removeParentCancelHandler();
      } finally {
        this.removeAllListeners(), this._parent = null;
      }
    }
  };
  At.CancellationToken = h;
  class f extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return At.CancellationError = f, At;
}
var Be = {}, Cr = { exports: {} }, Or = { exports: {} }, tn, ns;
function Sf() {
  if (ns) return tn;
  ns = 1;
  var o = 1e3, h = o * 60, f = h * 60, d = f * 24, c = d * 7, r = d * 365.25;
  tn = function(i, l) {
    l = l || {};
    var s = typeof i;
    if (s === "string" && i.length > 0)
      return e(i);
    if (s === "number" && isFinite(i))
      return l.long ? t(i) : n(i);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(i)
    );
  };
  function e(i) {
    if (i = String(i), !(i.length > 100)) {
      var l = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        i
      );
      if (l) {
        var s = parseFloat(l[1]), p = (l[2] || "ms").toLowerCase();
        switch (p) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return s * r;
          case "weeks":
          case "week":
          case "w":
            return s * c;
          case "days":
          case "day":
          case "d":
            return s * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return s * f;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return s * h;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return s * o;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return s;
          default:
            return;
        }
      }
    }
  }
  function n(i) {
    var l = Math.abs(i);
    return l >= d ? Math.round(i / d) + "d" : l >= f ? Math.round(i / f) + "h" : l >= h ? Math.round(i / h) + "m" : l >= o ? Math.round(i / o) + "s" : i + "ms";
  }
  function t(i) {
    var l = Math.abs(i);
    return l >= d ? a(i, l, d, "day") : l >= f ? a(i, l, f, "hour") : l >= h ? a(i, l, h, "minute") : l >= o ? a(i, l, o, "second") : i + " ms";
  }
  function a(i, l, s, p) {
    var g = l >= s * 1.5;
    return Math.round(i / s) + " " + p + (g ? "s" : "");
  }
  return tn;
}
var rn, is;
function Fu() {
  if (is) return rn;
  is = 1;
  function o(h) {
    d.debug = d, d.default = d, d.coerce = a, d.disable = n, d.enable = r, d.enabled = t, d.humanize = Sf(), d.destroy = i, Object.keys(h).forEach((l) => {
      d[l] = h[l];
    }), d.names = [], d.skips = [], d.formatters = {};
    function f(l) {
      let s = 0;
      for (let p = 0; p < l.length; p++)
        s = (s << 5) - s + l.charCodeAt(p), s |= 0;
      return d.colors[Math.abs(s) % d.colors.length];
    }
    d.selectColor = f;
    function d(l) {
      let s, p = null, g, v;
      function m(...b) {
        if (!m.enabled)
          return;
        const R = m, O = Number(/* @__PURE__ */ new Date()), D = O - (s || O);
        R.diff = D, R.prev = s, R.curr = O, s = O, b[0] = d.coerce(b[0]), typeof b[0] != "string" && b.unshift("%O");
        let $ = 0;
        b[0] = b[0].replace(/%([a-zA-Z%])/g, (_, S) => {
          if (_ === "%%")
            return "%";
          $++;
          const E = d.formatters[S];
          if (typeof E == "function") {
            const q = b[$];
            _ = E.call(R, q), b.splice($, 1), $--;
          }
          return _;
        }), d.formatArgs.call(R, b), (R.log || d.log).apply(R, b);
      }
      return m.namespace = l, m.useColors = d.useColors(), m.color = d.selectColor(l), m.extend = c, m.destroy = d.destroy, Object.defineProperty(m, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => p !== null ? p : (g !== d.namespaces && (g = d.namespaces, v = d.enabled(l)), v),
        set: (b) => {
          p = b;
        }
      }), typeof d.init == "function" && d.init(m), m;
    }
    function c(l, s) {
      const p = d(this.namespace + (typeof s > "u" ? ":" : s) + l);
      return p.log = this.log, p;
    }
    function r(l) {
      d.save(l), d.namespaces = l, d.names = [], d.skips = [];
      const s = (typeof l == "string" ? l : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const p of s)
        p[0] === "-" ? d.skips.push(p.slice(1)) : d.names.push(p);
    }
    function e(l, s) {
      let p = 0, g = 0, v = -1, m = 0;
      for (; p < l.length; )
        if (g < s.length && (s[g] === l[p] || s[g] === "*"))
          s[g] === "*" ? (v = g, m = p, g++) : (p++, g++);
        else if (v !== -1)
          g = v + 1, m++, p = m;
        else
          return !1;
      for (; g < s.length && s[g] === "*"; )
        g++;
      return g === s.length;
    }
    function n() {
      const l = [
        ...d.names,
        ...d.skips.map((s) => "-" + s)
      ].join(",");
      return d.enable(""), l;
    }
    function t(l) {
      for (const s of d.skips)
        if (e(l, s))
          return !1;
      for (const s of d.names)
        if (e(l, s))
          return !0;
      return !1;
    }
    function a(l) {
      return l instanceof Error ? l.stack || l.message : l;
    }
    function i() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return d.enable(d.load()), d;
  }
  return rn = o, rn;
}
var os;
function Af() {
  return os || (os = 1, function(o, h) {
    h.formatArgs = d, h.save = c, h.load = r, h.useColors = f, h.storage = e(), h.destroy = /* @__PURE__ */ (() => {
      let t = !1;
      return () => {
        t || (t = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), h.colors = [
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
    function f() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let t;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (t = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(t[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function d(t) {
      if (t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + o.exports.humanize(this.diff), !this.useColors)
        return;
      const a = "color: " + this.color;
      t.splice(1, 0, a, "color: inherit");
      let i = 0, l = 0;
      t[0].replace(/%[a-zA-Z%]/g, (s) => {
        s !== "%%" && (i++, s === "%c" && (l = i));
      }), t.splice(l, 0, a);
    }
    h.log = console.debug || console.log || (() => {
    });
    function c(t) {
      try {
        t ? h.storage.setItem("debug", t) : h.storage.removeItem("debug");
      } catch {
      }
    }
    function r() {
      let t;
      try {
        t = h.storage.getItem("debug");
      } catch {
      }
      return !t && typeof process < "u" && "env" in process && (t = process.env.DEBUG), t;
    }
    function e() {
      try {
        return localStorage;
      } catch {
      }
    }
    o.exports = Fu()(h);
    const { formatters: n } = o.exports;
    n.j = function(t) {
      try {
        return JSON.stringify(t);
      } catch (a) {
        return "[UnexpectedJSONParseError]: " + a.message;
      }
    };
  }(Or, Or.exports)), Or.exports;
}
var Dr = { exports: {} }, nn, ss;
function bf() {
  return ss || (ss = 1, nn = (o, h = process.argv) => {
    const f = o.startsWith("-") ? "" : o.length === 1 ? "-" : "--", d = h.indexOf(f + o), c = h.indexOf("--");
    return d !== -1 && (c === -1 || d < c);
  }), nn;
}
var on, as;
function Tf() {
  if (as) return on;
  as = 1;
  const o = ut, h = Du, f = bf(), { env: d } = process;
  let c;
  f("no-color") || f("no-colors") || f("color=false") || f("color=never") ? c = 0 : (f("color") || f("colors") || f("color=true") || f("color=always")) && (c = 1), "FORCE_COLOR" in d && (d.FORCE_COLOR === "true" ? c = 1 : d.FORCE_COLOR === "false" ? c = 0 : c = d.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(d.FORCE_COLOR, 10), 3));
  function r(t) {
    return t === 0 ? !1 : {
      level: t,
      hasBasic: !0,
      has256: t >= 2,
      has16m: t >= 3
    };
  }
  function e(t, a) {
    if (c === 0)
      return 0;
    if (f("color=16m") || f("color=full") || f("color=truecolor"))
      return 3;
    if (f("color=256"))
      return 2;
    if (t && !a && c === void 0)
      return 0;
    const i = c || 0;
    if (d.TERM === "dumb")
      return i;
    if (process.platform === "win32") {
      const l = o.release().split(".");
      return Number(l[0]) >= 10 && Number(l[2]) >= 10586 ? Number(l[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in d)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((l) => l in d) || d.CI_NAME === "codeship" ? 1 : i;
    if ("TEAMCITY_VERSION" in d)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(d.TEAMCITY_VERSION) ? 1 : 0;
    if (d.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in d) {
      const l = parseInt((d.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (d.TERM_PROGRAM) {
        case "iTerm.app":
          return l >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(d.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(d.TERM) || "COLORTERM" in d ? 1 : i;
  }
  function n(t) {
    const a = e(t, t && t.isTTY);
    return r(a);
  }
  return on = {
    supportsColor: n,
    stdout: r(e(!0, h.isatty(1))),
    stderr: r(e(!0, h.isatty(2)))
  }, on;
}
var ls;
function Rf() {
  return ls || (ls = 1, function(o, h) {
    const f = Du, d = jr;
    h.init = i, h.log = n, h.formatArgs = r, h.save = t, h.load = a, h.useColors = c, h.destroy = d.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), h.colors = [6, 2, 3, 4, 5, 1];
    try {
      const s = Tf();
      s && (s.stderr || s).level >= 2 && (h.colors = [
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
    h.inspectOpts = Object.keys(process.env).filter((s) => /^debug_/i.test(s)).reduce((s, p) => {
      const g = p.substring(6).toLowerCase().replace(/_([a-z])/g, (m, b) => b.toUpperCase());
      let v = process.env[p];
      return /^(yes|on|true|enabled)$/i.test(v) ? v = !0 : /^(no|off|false|disabled)$/i.test(v) ? v = !1 : v === "null" ? v = null : v = Number(v), s[g] = v, s;
    }, {});
    function c() {
      return "colors" in h.inspectOpts ? !!h.inspectOpts.colors : f.isatty(process.stderr.fd);
    }
    function r(s) {
      const { namespace: p, useColors: g } = this;
      if (g) {
        const v = this.color, m = "\x1B[3" + (v < 8 ? v : "8;5;" + v), b = `  ${m};1m${p} \x1B[0m`;
        s[0] = b + s[0].split(`
`).join(`
` + b), s.push(m + "m+" + o.exports.humanize(this.diff) + "\x1B[0m");
      } else
        s[0] = e() + p + " " + s[0];
    }
    function e() {
      return h.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function n(...s) {
      return process.stderr.write(d.formatWithOptions(h.inspectOpts, ...s) + `
`);
    }
    function t(s) {
      s ? process.env.DEBUG = s : delete process.env.DEBUG;
    }
    function a() {
      return process.env.DEBUG;
    }
    function i(s) {
      s.inspectOpts = {};
      const p = Object.keys(h.inspectOpts);
      for (let g = 0; g < p.length; g++)
        s.inspectOpts[p[g]] = h.inspectOpts[p[g]];
    }
    o.exports = Fu()(h);
    const { formatters: l } = o.exports;
    l.o = function(s) {
      return this.inspectOpts.colors = this.useColors, d.inspect(s, this.inspectOpts).split(`
`).map((p) => p.trim()).join(" ");
    }, l.O = function(s) {
      return this.inspectOpts.colors = this.useColors, d.inspect(s, this.inspectOpts);
    };
  }(Dr, Dr.exports)), Dr.exports;
}
var us;
function Cf() {
  return us || (us = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Cr.exports = Af() : Cr.exports = Rf()), Cr.exports;
}
var Pr = {}, cs;
function Hr() {
  if (cs) return Pr;
  cs = 1, Object.defineProperty(Pr, "__esModule", { value: !0 }), Pr.newError = o;
  function o(h, f) {
    const d = new Error(h);
    return d.code = f, d;
  }
  return Pr;
}
var Wt = {}, fs;
function xu() {
  if (fs) return Wt;
  fs = 1, Object.defineProperty(Wt, "__esModule", { value: !0 }), Wt.ProgressCallbackTransform = void 0;
  const o = mr;
  let h = class extends o.Transform {
    constructor(d, c, r) {
      super(), this.total = d, this.cancellationToken = c, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(d, c, r) {
      if (this.cancellationToken.cancelled) {
        r(new Error("cancelled"), null);
        return;
      }
      this.transferred += d.length, this.delta += d.length;
      const e = Date.now();
      e >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = e + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((e - this.start) / 1e3))
      }), this.delta = 0), r(null, d);
    }
    _flush(d) {
      if (this.cancellationToken.cancelled) {
        d(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, d(null);
    }
  };
  return Wt.ProgressCallbackTransform = h, Wt;
}
var ds;
function Of() {
  if (ds) return Be;
  ds = 1, Object.defineProperty(Be, "__esModule", { value: !0 }), Be.DigestTransform = Be.HttpExecutor = Be.HttpError = void 0, Be.createHttpError = a, Be.parseJson = s, Be.configureRequestOptionsFromUrl = g, Be.configureRequestUrl = v, Be.safeGetHeader = R, Be.configureRequestOptions = D, Be.safeStringifyJson = $;
  const o = kt, h = Cf(), f = Ve, d = mr, c = Ut, r = Do(), e = Hr(), n = xu(), t = (0, h.default)("electron-builder");
  function a(w, _ = null) {
    return new l(w.statusCode || -1, `${w.statusCode} ${w.statusMessage}` + (_ == null ? "" : `
` + JSON.stringify(_, null, "  ")) + `
Headers: ` + $(w.headers), _);
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
    constructor(_, S = `HTTP error: ${i.get(_) || _}`, E = null) {
      super(S), this.statusCode = _, this.description = E, this.name = "HttpError", this.code = `HTTP_ERROR_${_}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  Be.HttpError = l;
  function s(w) {
    return w.then((_) => _ == null || _.length === 0 ? null : JSON.parse(_));
  }
  class p {
    constructor() {
      this.maxRedirects = 10;
    }
    request(_, S = new r.CancellationToken(), E) {
      D(_);
      const q = E == null ? void 0 : JSON.stringify(E), F = q ? Buffer.from(q) : void 0;
      if (F != null) {
        t(q);
        const { headers: N, ...k } = _;
        _ = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": F.length,
            ...N
          },
          ...k
        };
      }
      return this.doApiRequest(_, S, (N) => N.end(F));
    }
    doApiRequest(_, S, E, q = 0) {
      return t.enabled && t(`Request: ${$(_)}`), S.createPromise((F, N, k) => {
        const P = this.createRequest(_, (I) => {
          try {
            this.handleResponse(I, _, S, F, N, q, E);
          } catch (L) {
            N(L);
          }
        });
        this.addErrorAndTimeoutHandlers(P, N, _.timeout), this.addRedirectHandlers(P, _, N, q, (I) => {
          this.doApiRequest(I, S, E, q).then(F).catch(N);
        }), E(P, N), k(() => P.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(_, S, E, q, F) {
    }
    addErrorAndTimeoutHandlers(_, S, E = 60 * 1e3) {
      this.addTimeOutHandler(_, S, E), _.on("error", S), _.on("aborted", () => {
        S(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(_, S, E, q, F, N, k) {
      var P;
      if (t.enabled && t(`Response: ${_.statusCode} ${_.statusMessage}, request options: ${$(S)}`), _.statusCode === 404) {
        F(a(_, `method: ${S.method || "GET"} url: ${S.protocol || "https:"}//${S.hostname}${S.port ? `:${S.port}` : ""}${S.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (_.statusCode === 204) {
        q();
        return;
      }
      const I = (P = _.statusCode) !== null && P !== void 0 ? P : 0, L = I >= 300 && I < 400, M = R(_, "location");
      if (L && M != null) {
        if (N > this.maxRedirects) {
          F(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(p.prepareRedirectUrlOptions(M, S), E, k, N).then(q).catch(F);
        return;
      }
      _.setEncoding("utf8");
      let K = "";
      _.on("error", F), _.on("data", (V) => K += V), _.on("end", () => {
        try {
          if (_.statusCode != null && _.statusCode >= 400) {
            const V = R(_, "content-type"), ne = V != null && (Array.isArray(V) ? V.find((ce) => ce.includes("json")) != null : V.includes("json"));
            F(a(_, `method: ${S.method || "GET"} url: ${S.protocol || "https:"}//${S.hostname}${S.port ? `:${S.port}` : ""}${S.path}

          Data:
          ${ne ? JSON.stringify(JSON.parse(K)) : K}
          `));
          } else
            q(K.length === 0 ? null : K);
        } catch (V) {
          F(V);
        }
      });
    }
    async downloadToBuffer(_, S) {
      return await S.cancellationToken.createPromise((E, q, F) => {
        const N = [], k = {
          headers: S.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        v(_, k), D(k), this.doDownload(k, {
          destination: null,
          options: S,
          onCancel: F,
          callback: (P) => {
            P == null ? E(Buffer.concat(N)) : q(P);
          },
          responseHandler: (P, I) => {
            let L = 0;
            P.on("data", (M) => {
              if (L += M.length, L > 524288e3) {
                I(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              N.push(M);
            }), P.on("end", () => {
              I(null);
            });
          }
        }, 0);
      });
    }
    doDownload(_, S, E) {
      const q = this.createRequest(_, (F) => {
        if (F.statusCode >= 400) {
          S.callback(new Error(`Cannot download "${_.protocol || "https:"}//${_.hostname}${_.path}", status ${F.statusCode}: ${F.statusMessage}`));
          return;
        }
        F.on("error", S.callback);
        const N = R(F, "location");
        if (N != null) {
          E < this.maxRedirects ? this.doDownload(p.prepareRedirectUrlOptions(N, _), S, E++) : S.callback(this.createMaxRedirectError());
          return;
        }
        S.responseHandler == null ? O(S, F) : S.responseHandler(F, S.callback);
      });
      this.addErrorAndTimeoutHandlers(q, S.callback, _.timeout), this.addRedirectHandlers(q, _, S.callback, E, (F) => {
        this.doDownload(F, S, E++);
      }), q.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(_, S, E) {
      _.on("socket", (q) => {
        q.setTimeout(E, () => {
          _.abort(), S(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(_, S) {
      const E = g(_, { ...S }), q = E.headers;
      if (q != null && q.authorization) {
        const F = new c.URL(_);
        (F.hostname.endsWith(".amazonaws.com") || F.searchParams.has("X-Amz-Credential")) && delete q.authorization;
      }
      return E;
    }
    static retryOnServerError(_, S = 3) {
      for (let E = 0; ; E++)
        try {
          return _();
        } catch (q) {
          if (E < S && (q instanceof l && q.isServerError() || q.code === "EPIPE"))
            continue;
          throw q;
        }
    }
  }
  Be.HttpExecutor = p;
  function g(w, _) {
    const S = D(_);
    return v(new c.URL(w), S), S;
  }
  function v(w, _) {
    _.protocol = w.protocol, _.hostname = w.hostname, w.port ? _.port = w.port : _.port && delete _.port, _.path = w.pathname + w.search;
  }
  class m extends d.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(_, S = "sha512", E = "base64") {
      super(), this.expected = _, this.algorithm = S, this.encoding = E, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, o.createHash)(S);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(_, S, E) {
      this.digester.update(_), E(null, _);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(_) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (S) {
          _(S);
          return;
        }
      _(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, e.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, e.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  Be.DigestTransform = m;
  function b(w, _, S) {
    return w != null && _ != null && w !== _ ? (S(new Error(`checksum mismatch: expected ${_} but got ${w} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function R(w, _) {
    const S = w.headers[_];
    return S == null ? null : Array.isArray(S) ? S.length === 0 ? null : S[S.length - 1] : S;
  }
  function O(w, _) {
    if (!b(R(_, "X-Checksum-Sha2"), w.options.sha2, w.callback))
      return;
    const S = [];
    if (w.options.onProgress != null) {
      const N = R(_, "content-length");
      N != null && S.push(new n.ProgressCallbackTransform(parseInt(N, 10), w.options.cancellationToken, w.options.onProgress));
    }
    const E = w.options.sha512;
    E != null ? S.push(new m(E, "sha512", E.length === 128 && !E.includes("+") && !E.includes("Z") && !E.includes("=") ? "hex" : "base64")) : w.options.sha2 != null && S.push(new m(w.options.sha2, "sha256", "hex"));
    const q = (0, f.createWriteStream)(w.destination);
    S.push(q);
    let F = _;
    for (const N of S)
      N.on("error", (k) => {
        q.close(), w.options.cancellationToken.cancelled || w.callback(k);
      }), F = F.pipe(N);
    q.on("finish", () => {
      q.close(w.callback);
    });
  }
  function D(w, _, S) {
    S != null && (w.method = S), w.headers = { ...w.headers };
    const E = w.headers;
    return _ != null && (E.authorization = _.startsWith("Basic") || _.startsWith("Bearer") ? _ : `token ${_}`), E["User-Agent"] == null && (E["User-Agent"] = "electron-builder"), (S == null || S === "GET" || E["Cache-Control"] == null) && (E["Cache-Control"] = "no-cache"), w.protocol == null && process.versions.electron != null && (w.protocol = "https:"), w;
  }
  function $(w, _) {
    return JSON.stringify(w, (S, E) => S.endsWith("Authorization") || S.endsWith("authorization") || S.endsWith("Password") || S.endsWith("PASSWORD") || S.endsWith("Token") || S.includes("password") || S.includes("token") || _ != null && _.has(S) ? "<stripped sensitive data>" : E, 2);
  }
  return Be;
}
var zt = {}, hs;
function Df() {
  if (hs) return zt;
  hs = 1, Object.defineProperty(zt, "__esModule", { value: !0 }), zt.githubUrl = o, zt.getS3LikeProviderBaseUrl = h;
  function o(r, e = "github.com") {
    return `${r.protocol || "https"}://${r.host || e}`;
  }
  function h(r) {
    const e = r.provider;
    if (e === "s3")
      return f(r);
    if (e === "spaces")
      return c(r);
    throw new Error(`Not supported provider: ${e}`);
  }
  function f(r) {
    let e;
    if (r.accelerate == !0)
      e = `https://${r.bucket}.s3-accelerate.amazonaws.com`;
    else if (r.endpoint != null)
      e = `${r.endpoint}/${r.bucket}`;
    else if (r.bucket.includes(".")) {
      if (r.region == null)
        throw new Error(`Bucket name "${r.bucket}" includes a dot, but S3 region is missing`);
      r.region === "us-east-1" ? e = `https://s3.amazonaws.com/${r.bucket}` : e = `https://s3-${r.region}.amazonaws.com/${r.bucket}`;
    } else r.region === "cn-north-1" ? e = `https://${r.bucket}.s3.${r.region}.amazonaws.com.cn` : e = `https://${r.bucket}.s3.amazonaws.com`;
    return d(e, r.path);
  }
  function d(r, e) {
    return e != null && e.length > 0 && (e.startsWith("/") || (r += "/"), r += e), r;
  }
  function c(r) {
    if (r.name == null)
      throw new Error("name is missing");
    if (r.region == null)
      throw new Error("region is missing");
    return d(`https://${r.name}.${r.region}.digitaloceanspaces.com`, r.path);
  }
  return zt;
}
var Ir = {}, ps;
function Pf() {
  if (ps) return Ir;
  ps = 1, Object.defineProperty(Ir, "__esModule", { value: !0 }), Ir.parseDn = o;
  function o(h) {
    let f = !1, d = null, c = "", r = 0;
    h = h.trim();
    const e = /* @__PURE__ */ new Map();
    for (let n = 0; n <= h.length; n++) {
      if (n === h.length) {
        d !== null && e.set(d, c);
        break;
      }
      const t = h[n];
      if (f) {
        if (t === '"') {
          f = !1;
          continue;
        }
      } else {
        if (t === '"') {
          f = !0;
          continue;
        }
        if (t === "\\") {
          n++;
          const a = parseInt(h.slice(n, n + 2), 16);
          Number.isNaN(a) ? c += h[n] : (n++, c += String.fromCharCode(a));
          continue;
        }
        if (d === null && t === "=") {
          d = c, c = "";
          continue;
        }
        if (t === "," || t === ";" || t === "+") {
          d !== null && e.set(d, c), d = null, c = "";
          continue;
        }
      }
      if (t === " " && !f) {
        if (c.length === 0)
          continue;
        if (n > r) {
          let a = n;
          for (; h[a] === " "; )
            a++;
          r = a;
        }
        if (r >= h.length || h[r] === "," || h[r] === ";" || d === null && h[r] === "=" || d !== null && h[r] === "+") {
          n = r - 1;
          continue;
        }
      }
      c += t;
    }
    return e;
  }
  return Ir;
}
var bt = {}, ms;
function If() {
  if (ms) return bt;
  ms = 1, Object.defineProperty(bt, "__esModule", { value: !0 }), bt.nil = bt.UUID = void 0;
  const o = kt, h = Hr(), f = "options.name must be either a string or a Buffer", d = (0, o.randomBytes)(16);
  d[0] = d[0] | 1;
  const c = {}, r = [];
  for (let l = 0; l < 256; l++) {
    const s = (l + 256).toString(16).substr(1);
    c[s] = l, r[l] = s;
  }
  class e {
    constructor(s) {
      this.ascii = null, this.binary = null;
      const p = e.check(s);
      if (!p)
        throw new Error("not a UUID");
      this.version = p.version, p.format === "ascii" ? this.ascii = s : this.binary = s;
    }
    static v5(s, p) {
      return a(s, "sha1", 80, p);
    }
    toString() {
      return this.ascii == null && (this.ascii = i(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(s, p = 0) {
      if (typeof s == "string")
        return s = s.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(s) ? s === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (c[s[14] + s[15]] & 240) >> 4,
          variant: n((c[s[19] + s[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(s)) {
        if (s.length < p + 16)
          return !1;
        let g = 0;
        for (; g < 16 && s[p + g] === 0; g++)
          ;
        return g === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (s[p + 6] & 240) >> 4,
          variant: n((s[p + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, h.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(s) {
      const p = Buffer.allocUnsafe(16);
      let g = 0;
      for (let v = 0; v < 16; v++)
        p[v] = c[s[g++] + s[g++]], (v === 3 || v === 5 || v === 7 || v === 9) && (g += 1);
      return p;
    }
  }
  bt.UUID = e, e.OID = e.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function n(l) {
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
  var t;
  (function(l) {
    l[l.ASCII = 0] = "ASCII", l[l.BINARY = 1] = "BINARY", l[l.OBJECT = 2] = "OBJECT";
  })(t || (t = {}));
  function a(l, s, p, g, v = t.ASCII) {
    const m = (0, o.createHash)(s);
    if (typeof l != "string" && !Buffer.isBuffer(l))
      throw (0, h.newError)(f, "ERR_INVALID_UUID_NAME");
    m.update(g), m.update(l);
    const R = m.digest();
    let O;
    switch (v) {
      case t.BINARY:
        R[6] = R[6] & 15 | p, R[8] = R[8] & 63 | 128, O = R;
        break;
      case t.OBJECT:
        R[6] = R[6] & 15 | p, R[8] = R[8] & 63 | 128, O = new e(R);
        break;
      default:
        O = r[R[0]] + r[R[1]] + r[R[2]] + r[R[3]] + "-" + r[R[4]] + r[R[5]] + "-" + r[R[6] & 15 | p] + r[R[7]] + "-" + r[R[8] & 63 | 128] + r[R[9]] + "-" + r[R[10]] + r[R[11]] + r[R[12]] + r[R[13]] + r[R[14]] + r[R[15]];
        break;
    }
    return O;
  }
  function i(l) {
    return r[l[0]] + r[l[1]] + r[l[2]] + r[l[3]] + "-" + r[l[4]] + r[l[5]] + "-" + r[l[6]] + r[l[7]] + "-" + r[l[8]] + r[l[9]] + "-" + r[l[10]] + r[l[11]] + r[l[12]] + r[l[13]] + r[l[14]] + r[l[15]];
  }
  return bt.nil = new e("00000000-0000-0000-0000-000000000000"), bt;
}
var Ft = {}, sn = {}, gs;
function Nf() {
  return gs || (gs = 1, function(o) {
    (function(h) {
      h.parser = function(T, y) {
        return new d(T, y);
      }, h.SAXParser = d, h.SAXStream = i, h.createStream = a, h.MAX_BUFFER_LENGTH = 64 * 1024;
      var f = [
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
      h.EVENTS = [
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
      function d(T, y) {
        if (!(this instanceof d))
          return new d(T, y);
        var j = this;
        r(j), j.q = j.c = "", j.bufferCheckPosition = h.MAX_BUFFER_LENGTH, j.opt = y || {}, j.opt.lowercase = j.opt.lowercase || j.opt.lowercasetags, j.looseCase = j.opt.lowercase ? "toLowerCase" : "toUpperCase", j.tags = [], j.closed = j.closedRoot = j.sawRoot = !1, j.tag = j.error = null, j.strict = !!T, j.noscript = !!(T || j.opt.noscript), j.state = E.BEGIN, j.strictEntities = j.opt.strictEntities, j.ENTITIES = j.strictEntities ? Object.create(h.XML_ENTITIES) : Object.create(h.ENTITIES), j.attribList = [], j.opt.xmlns && (j.ns = Object.create(v)), j.opt.unquotedAttributeValues === void 0 && (j.opt.unquotedAttributeValues = !T), j.trackPosition = j.opt.position !== !1, j.trackPosition && (j.position = j.line = j.column = 0), F(j, "onready");
      }
      Object.create || (Object.create = function(T) {
        function y() {
        }
        y.prototype = T;
        var j = new y();
        return j;
      }), Object.keys || (Object.keys = function(T) {
        var y = [];
        for (var j in T) T.hasOwnProperty(j) && y.push(j);
        return y;
      });
      function c(T) {
        for (var y = Math.max(h.MAX_BUFFER_LENGTH, 10), j = 0, x = 0, le = f.length; x < le; x++) {
          var me = T[f[x]].length;
          if (me > y)
            switch (f[x]) {
              case "textNode":
                k(T);
                break;
              case "cdata":
                N(T, "oncdata", T.cdata), T.cdata = "";
                break;
              case "script":
                N(T, "onscript", T.script), T.script = "";
                break;
              default:
                I(T, "Max buffer length exceeded: " + f[x]);
            }
          j = Math.max(j, me);
        }
        var pe = h.MAX_BUFFER_LENGTH - j;
        T.bufferCheckPosition = pe + T.position;
      }
      function r(T) {
        for (var y = 0, j = f.length; y < j; y++)
          T[f[y]] = "";
      }
      function e(T) {
        k(T), T.cdata !== "" && (N(T, "oncdata", T.cdata), T.cdata = ""), T.script !== "" && (N(T, "onscript", T.script), T.script = "");
      }
      d.prototype = {
        end: function() {
          L(this);
        },
        write: ye,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          e(this);
        }
      };
      var n;
      try {
        n = require("stream").Stream;
      } catch {
        n = function() {
        };
      }
      n || (n = function() {
      });
      var t = h.EVENTS.filter(function(T) {
        return T !== "error" && T !== "end";
      });
      function a(T, y) {
        return new i(T, y);
      }
      function i(T, y) {
        if (!(this instanceof i))
          return new i(T, y);
        n.apply(this), this._parser = new d(T, y), this.writable = !0, this.readable = !0;
        var j = this;
        this._parser.onend = function() {
          j.emit("end");
        }, this._parser.onerror = function(x) {
          j.emit("error", x), j._parser.error = null;
        }, this._decoder = null, t.forEach(function(x) {
          Object.defineProperty(j, "on" + x, {
            get: function() {
              return j._parser["on" + x];
            },
            set: function(le) {
              if (!le)
                return j.removeAllListeners(x), j._parser["on" + x] = le, le;
              j.on(x, le);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      i.prototype = Object.create(n.prototype, {
        constructor: {
          value: i
        }
      }), i.prototype.write = function(T) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(T)) {
          if (!this._decoder) {
            var y = pf.StringDecoder;
            this._decoder = new y("utf8");
          }
          T = this._decoder.write(T);
        }
        return this._parser.write(T.toString()), this.emit("data", T), !0;
      }, i.prototype.end = function(T) {
        return T && T.length && this.write(T), this._parser.end(), !0;
      }, i.prototype.on = function(T, y) {
        var j = this;
        return !j._parser["on" + T] && t.indexOf(T) !== -1 && (j._parser["on" + T] = function() {
          var x = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          x.splice(0, 0, T), j.emit.apply(j, x);
        }), n.prototype.on.call(j, T, y);
      };
      var l = "[CDATA[", s = "DOCTYPE", p = "http://www.w3.org/XML/1998/namespace", g = "http://www.w3.org/2000/xmlns/", v = { xml: p, xmlns: g }, m = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, b = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, R = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, O = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function D(T) {
        return T === " " || T === `
` || T === "\r" || T === "	";
      }
      function $(T) {
        return T === '"' || T === "'";
      }
      function w(T) {
        return T === ">" || D(T);
      }
      function _(T, y) {
        return T.test(y);
      }
      function S(T, y) {
        return !_(T, y);
      }
      var E = 0;
      h.STATE = {
        BEGIN: E++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: E++,
        // leading whitespace
        TEXT: E++,
        // general stuff
        TEXT_ENTITY: E++,
        // &amp and such.
        OPEN_WAKA: E++,
        // <
        SGML_DECL: E++,
        // <!BLARG
        SGML_DECL_QUOTED: E++,
        // <!BLARG foo "bar
        DOCTYPE: E++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: E++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: E++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: E++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: E++,
        // <!-
        COMMENT: E++,
        // <!--
        COMMENT_ENDING: E++,
        // <!-- blah -
        COMMENT_ENDED: E++,
        // <!-- blah --
        CDATA: E++,
        // <![CDATA[ something
        CDATA_ENDING: E++,
        // ]
        CDATA_ENDING_2: E++,
        // ]]
        PROC_INST: E++,
        // <?hi
        PROC_INST_BODY: E++,
        // <?hi there
        PROC_INST_ENDING: E++,
        // <?hi "there" ?
        OPEN_TAG: E++,
        // <strong
        OPEN_TAG_SLASH: E++,
        // <strong /
        ATTRIB: E++,
        // <a
        ATTRIB_NAME: E++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: E++,
        // <a foo _
        ATTRIB_VALUE: E++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: E++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: E++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: E++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: E++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: E++,
        // <foo bar=&quot
        CLOSE_TAG: E++,
        // </a
        CLOSE_TAG_SAW_WHITE: E++,
        // </a   >
        SCRIPT: E++,
        // <script> ...
        SCRIPT_ENDING: E++
        // <script> ... <
      }, h.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, h.ENTITIES = {
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
      }, Object.keys(h.ENTITIES).forEach(function(T) {
        var y = h.ENTITIES[T], j = typeof y == "number" ? String.fromCharCode(y) : y;
        h.ENTITIES[T] = j;
      });
      for (var q in h.STATE)
        h.STATE[h.STATE[q]] = q;
      E = h.STATE;
      function F(T, y, j) {
        T[y] && T[y](j);
      }
      function N(T, y, j) {
        T.textNode && k(T), F(T, y, j);
      }
      function k(T) {
        T.textNode = P(T.opt, T.textNode), T.textNode && F(T, "ontext", T.textNode), T.textNode = "";
      }
      function P(T, y) {
        return T.trim && (y = y.trim()), T.normalize && (y = y.replace(/\s+/g, " ")), y;
      }
      function I(T, y) {
        return k(T), T.trackPosition && (y += `
Line: ` + T.line + `
Column: ` + T.column + `
Char: ` + T.c), y = new Error(y), T.error = y, F(T, "onerror", y), T;
      }
      function L(T) {
        return T.sawRoot && !T.closedRoot && M(T, "Unclosed root tag"), T.state !== E.BEGIN && T.state !== E.BEGIN_WHITESPACE && T.state !== E.TEXT && I(T, "Unexpected end"), k(T), T.c = "", T.closed = !0, F(T, "onend"), d.call(T, T.strict, T.opt), T;
      }
      function M(T, y) {
        if (typeof T != "object" || !(T instanceof d))
          throw new Error("bad call to strictFail");
        T.strict && I(T, y);
      }
      function K(T) {
        T.strict || (T.tagName = T.tagName[T.looseCase]());
        var y = T.tags[T.tags.length - 1] || T, j = T.tag = { name: T.tagName, attributes: {} };
        T.opt.xmlns && (j.ns = y.ns), T.attribList.length = 0, N(T, "onopentagstart", j);
      }
      function V(T, y) {
        var j = T.indexOf(":"), x = j < 0 ? ["", T] : T.split(":"), le = x[0], me = x[1];
        return y && T === "xmlns" && (le = "xmlns", me = ""), { prefix: le, local: me };
      }
      function ne(T) {
        if (T.strict || (T.attribName = T.attribName[T.looseCase]()), T.attribList.indexOf(T.attribName) !== -1 || T.tag.attributes.hasOwnProperty(T.attribName)) {
          T.attribName = T.attribValue = "";
          return;
        }
        if (T.opt.xmlns) {
          var y = V(T.attribName, !0), j = y.prefix, x = y.local;
          if (j === "xmlns")
            if (x === "xml" && T.attribValue !== p)
              M(
                T,
                "xml: prefix must be bound to " + p + `
Actual: ` + T.attribValue
              );
            else if (x === "xmlns" && T.attribValue !== g)
              M(
                T,
                "xmlns: prefix must be bound to " + g + `
Actual: ` + T.attribValue
              );
            else {
              var le = T.tag, me = T.tags[T.tags.length - 1] || T;
              le.ns === me.ns && (le.ns = Object.create(me.ns)), le.ns[x] = T.attribValue;
            }
          T.attribList.push([T.attribName, T.attribValue]);
        } else
          T.tag.attributes[T.attribName] = T.attribValue, N(T, "onattribute", {
            name: T.attribName,
            value: T.attribValue
          });
        T.attribName = T.attribValue = "";
      }
      function ce(T, y) {
        if (T.opt.xmlns) {
          var j = T.tag, x = V(T.tagName);
          j.prefix = x.prefix, j.local = x.local, j.uri = j.ns[x.prefix] || "", j.prefix && !j.uri && (M(T, "Unbound namespace prefix: " + JSON.stringify(T.tagName)), j.uri = x.prefix);
          var le = T.tags[T.tags.length - 1] || T;
          j.ns && le.ns !== j.ns && Object.keys(j.ns).forEach(function(B) {
            N(T, "onopennamespace", {
              prefix: B,
              uri: j.ns[B]
            });
          });
          for (var me = 0, pe = T.attribList.length; me < pe; me++) {
            var _e = T.attribList[me], Ee = _e[0], xe = _e[1], Oe = V(Ee, !0), qe = Oe.prefix, vt = Oe.local, ot = qe === "" ? "" : j.ns[qe] || "", u = {
              name: Ee,
              value: xe,
              prefix: qe,
              local: vt,
              uri: ot
            };
            qe && qe !== "xmlns" && !ot && (M(T, "Unbound namespace prefix: " + JSON.stringify(qe)), u.uri = qe), T.tag.attributes[Ee] = u, N(T, "onattribute", u);
          }
          T.attribList.length = 0;
        }
        T.tag.isSelfClosing = !!y, T.sawRoot = !0, T.tags.push(T.tag), N(T, "onopentag", T.tag), y || (!T.noscript && T.tagName.toLowerCase() === "script" ? T.state = E.SCRIPT : T.state = E.TEXT, T.tag = null, T.tagName = ""), T.attribName = T.attribValue = "", T.attribList.length = 0;
      }
      function ue(T) {
        if (!T.tagName) {
          M(T, "Weird empty close tag."), T.textNode += "</>", T.state = E.TEXT;
          return;
        }
        if (T.script) {
          if (T.tagName !== "script") {
            T.script += "</" + T.tagName + ">", T.tagName = "", T.state = E.SCRIPT;
            return;
          }
          N(T, "onscript", T.script), T.script = "";
        }
        var y = T.tags.length, j = T.tagName;
        T.strict || (j = j[T.looseCase]());
        for (var x = j; y--; ) {
          var le = T.tags[y];
          if (le.name !== x)
            M(T, "Unexpected close tag");
          else
            break;
        }
        if (y < 0) {
          M(T, "Unmatched closing tag: " + T.tagName), T.textNode += "</" + T.tagName + ">", T.state = E.TEXT;
          return;
        }
        T.tagName = j;
        for (var me = T.tags.length; me-- > y; ) {
          var pe = T.tag = T.tags.pop();
          T.tagName = T.tag.name, N(T, "onclosetag", T.tagName);
          var _e = {};
          for (var Ee in pe.ns)
            _e[Ee] = pe.ns[Ee];
          var xe = T.tags[T.tags.length - 1] || T;
          T.opt.xmlns && pe.ns !== xe.ns && Object.keys(pe.ns).forEach(function(Oe) {
            var qe = pe.ns[Oe];
            N(T, "onclosenamespace", { prefix: Oe, uri: qe });
          });
        }
        y === 0 && (T.closedRoot = !0), T.tagName = T.attribValue = T.attribName = "", T.attribList.length = 0, T.state = E.TEXT;
      }
      function ie(T) {
        var y = T.entity, j = y.toLowerCase(), x, le = "";
        return T.ENTITIES[y] ? T.ENTITIES[y] : T.ENTITIES[j] ? T.ENTITIES[j] : (y = j, y.charAt(0) === "#" && (y.charAt(1) === "x" ? (y = y.slice(2), x = parseInt(y, 16), le = x.toString(16)) : (y = y.slice(1), x = parseInt(y, 10), le = x.toString(10))), y = y.replace(/^0+/, ""), isNaN(x) || le.toLowerCase() !== y ? (M(T, "Invalid character entity"), "&" + T.entity + ";") : String.fromCodePoint(x));
      }
      function Te(T, y) {
        y === "<" ? (T.state = E.OPEN_WAKA, T.startTagPosition = T.position) : D(y) || (M(T, "Non-whitespace before first tag."), T.textNode = y, T.state = E.TEXT);
      }
      function J(T, y) {
        var j = "";
        return y < T.length && (j = T.charAt(y)), j;
      }
      function ye(T) {
        var y = this;
        if (this.error)
          throw this.error;
        if (y.closed)
          return I(
            y,
            "Cannot write after close. Assign an onready handler."
          );
        if (T === null)
          return L(y);
        typeof T == "object" && (T = T.toString());
        for (var j = 0, x = ""; x = J(T, j++), y.c = x, !!x; )
          switch (y.trackPosition && (y.position++, x === `
` ? (y.line++, y.column = 0) : y.column++), y.state) {
            case E.BEGIN:
              if (y.state = E.BEGIN_WHITESPACE, x === "\uFEFF")
                continue;
              Te(y, x);
              continue;
            case E.BEGIN_WHITESPACE:
              Te(y, x);
              continue;
            case E.TEXT:
              if (y.sawRoot && !y.closedRoot) {
                for (var le = j - 1; x && x !== "<" && x !== "&"; )
                  x = J(T, j++), x && y.trackPosition && (y.position++, x === `
` ? (y.line++, y.column = 0) : y.column++);
                y.textNode += T.substring(le, j - 1);
              }
              x === "<" && !(y.sawRoot && y.closedRoot && !y.strict) ? (y.state = E.OPEN_WAKA, y.startTagPosition = y.position) : (!D(x) && (!y.sawRoot || y.closedRoot) && M(y, "Text data outside of root node."), x === "&" ? y.state = E.TEXT_ENTITY : y.textNode += x);
              continue;
            case E.SCRIPT:
              x === "<" ? y.state = E.SCRIPT_ENDING : y.script += x;
              continue;
            case E.SCRIPT_ENDING:
              x === "/" ? y.state = E.CLOSE_TAG : (y.script += "<" + x, y.state = E.SCRIPT);
              continue;
            case E.OPEN_WAKA:
              if (x === "!")
                y.state = E.SGML_DECL, y.sgmlDecl = "";
              else if (!D(x)) if (_(m, x))
                y.state = E.OPEN_TAG, y.tagName = x;
              else if (x === "/")
                y.state = E.CLOSE_TAG, y.tagName = "";
              else if (x === "?")
                y.state = E.PROC_INST, y.procInstName = y.procInstBody = "";
              else {
                if (M(y, "Unencoded <"), y.startTagPosition + 1 < y.position) {
                  var me = y.position - y.startTagPosition;
                  x = new Array(me).join(" ") + x;
                }
                y.textNode += "<" + x, y.state = E.TEXT;
              }
              continue;
            case E.SGML_DECL:
              if (y.sgmlDecl + x === "--") {
                y.state = E.COMMENT, y.comment = "", y.sgmlDecl = "";
                continue;
              }
              y.doctype && y.doctype !== !0 && y.sgmlDecl ? (y.state = E.DOCTYPE_DTD, y.doctype += "<!" + y.sgmlDecl + x, y.sgmlDecl = "") : (y.sgmlDecl + x).toUpperCase() === l ? (N(y, "onopencdata"), y.state = E.CDATA, y.sgmlDecl = "", y.cdata = "") : (y.sgmlDecl + x).toUpperCase() === s ? (y.state = E.DOCTYPE, (y.doctype || y.sawRoot) && M(
                y,
                "Inappropriately located doctype declaration"
              ), y.doctype = "", y.sgmlDecl = "") : x === ">" ? (N(y, "onsgmldeclaration", y.sgmlDecl), y.sgmlDecl = "", y.state = E.TEXT) : ($(x) && (y.state = E.SGML_DECL_QUOTED), y.sgmlDecl += x);
              continue;
            case E.SGML_DECL_QUOTED:
              x === y.q && (y.state = E.SGML_DECL, y.q = ""), y.sgmlDecl += x;
              continue;
            case E.DOCTYPE:
              x === ">" ? (y.state = E.TEXT, N(y, "ondoctype", y.doctype), y.doctype = !0) : (y.doctype += x, x === "[" ? y.state = E.DOCTYPE_DTD : $(x) && (y.state = E.DOCTYPE_QUOTED, y.q = x));
              continue;
            case E.DOCTYPE_QUOTED:
              y.doctype += x, x === y.q && (y.q = "", y.state = E.DOCTYPE);
              continue;
            case E.DOCTYPE_DTD:
              x === "]" ? (y.doctype += x, y.state = E.DOCTYPE) : x === "<" ? (y.state = E.OPEN_WAKA, y.startTagPosition = y.position) : $(x) ? (y.doctype += x, y.state = E.DOCTYPE_DTD_QUOTED, y.q = x) : y.doctype += x;
              continue;
            case E.DOCTYPE_DTD_QUOTED:
              y.doctype += x, x === y.q && (y.state = E.DOCTYPE_DTD, y.q = "");
              continue;
            case E.COMMENT:
              x === "-" ? y.state = E.COMMENT_ENDING : y.comment += x;
              continue;
            case E.COMMENT_ENDING:
              x === "-" ? (y.state = E.COMMENT_ENDED, y.comment = P(y.opt, y.comment), y.comment && N(y, "oncomment", y.comment), y.comment = "") : (y.comment += "-" + x, y.state = E.COMMENT);
              continue;
            case E.COMMENT_ENDED:
              x !== ">" ? (M(y, "Malformed comment"), y.comment += "--" + x, y.state = E.COMMENT) : y.doctype && y.doctype !== !0 ? y.state = E.DOCTYPE_DTD : y.state = E.TEXT;
              continue;
            case E.CDATA:
              x === "]" ? y.state = E.CDATA_ENDING : y.cdata += x;
              continue;
            case E.CDATA_ENDING:
              x === "]" ? y.state = E.CDATA_ENDING_2 : (y.cdata += "]" + x, y.state = E.CDATA);
              continue;
            case E.CDATA_ENDING_2:
              x === ">" ? (y.cdata && N(y, "oncdata", y.cdata), N(y, "onclosecdata"), y.cdata = "", y.state = E.TEXT) : x === "]" ? y.cdata += "]" : (y.cdata += "]]" + x, y.state = E.CDATA);
              continue;
            case E.PROC_INST:
              x === "?" ? y.state = E.PROC_INST_ENDING : D(x) ? y.state = E.PROC_INST_BODY : y.procInstName += x;
              continue;
            case E.PROC_INST_BODY:
              if (!y.procInstBody && D(x))
                continue;
              x === "?" ? y.state = E.PROC_INST_ENDING : y.procInstBody += x;
              continue;
            case E.PROC_INST_ENDING:
              x === ">" ? (N(y, "onprocessinginstruction", {
                name: y.procInstName,
                body: y.procInstBody
              }), y.procInstName = y.procInstBody = "", y.state = E.TEXT) : (y.procInstBody += "?" + x, y.state = E.PROC_INST_BODY);
              continue;
            case E.OPEN_TAG:
              _(b, x) ? y.tagName += x : (K(y), x === ">" ? ce(y) : x === "/" ? y.state = E.OPEN_TAG_SLASH : (D(x) || M(y, "Invalid character in tag name"), y.state = E.ATTRIB));
              continue;
            case E.OPEN_TAG_SLASH:
              x === ">" ? (ce(y, !0), ue(y)) : (M(y, "Forward-slash in opening tag not followed by >"), y.state = E.ATTRIB);
              continue;
            case E.ATTRIB:
              if (D(x))
                continue;
              x === ">" ? ce(y) : x === "/" ? y.state = E.OPEN_TAG_SLASH : _(m, x) ? (y.attribName = x, y.attribValue = "", y.state = E.ATTRIB_NAME) : M(y, "Invalid attribute name");
              continue;
            case E.ATTRIB_NAME:
              x === "=" ? y.state = E.ATTRIB_VALUE : x === ">" ? (M(y, "Attribute without value"), y.attribValue = y.attribName, ne(y), ce(y)) : D(x) ? y.state = E.ATTRIB_NAME_SAW_WHITE : _(b, x) ? y.attribName += x : M(y, "Invalid attribute name");
              continue;
            case E.ATTRIB_NAME_SAW_WHITE:
              if (x === "=")
                y.state = E.ATTRIB_VALUE;
              else {
                if (D(x))
                  continue;
                M(y, "Attribute without value"), y.tag.attributes[y.attribName] = "", y.attribValue = "", N(y, "onattribute", {
                  name: y.attribName,
                  value: ""
                }), y.attribName = "", x === ">" ? ce(y) : _(m, x) ? (y.attribName = x, y.state = E.ATTRIB_NAME) : (M(y, "Invalid attribute name"), y.state = E.ATTRIB);
              }
              continue;
            case E.ATTRIB_VALUE:
              if (D(x))
                continue;
              $(x) ? (y.q = x, y.state = E.ATTRIB_VALUE_QUOTED) : (y.opt.unquotedAttributeValues || I(y, "Unquoted attribute value"), y.state = E.ATTRIB_VALUE_UNQUOTED, y.attribValue = x);
              continue;
            case E.ATTRIB_VALUE_QUOTED:
              if (x !== y.q) {
                x === "&" ? y.state = E.ATTRIB_VALUE_ENTITY_Q : y.attribValue += x;
                continue;
              }
              ne(y), y.q = "", y.state = E.ATTRIB_VALUE_CLOSED;
              continue;
            case E.ATTRIB_VALUE_CLOSED:
              D(x) ? y.state = E.ATTRIB : x === ">" ? ce(y) : x === "/" ? y.state = E.OPEN_TAG_SLASH : _(m, x) ? (M(y, "No whitespace between attributes"), y.attribName = x, y.attribValue = "", y.state = E.ATTRIB_NAME) : M(y, "Invalid attribute name");
              continue;
            case E.ATTRIB_VALUE_UNQUOTED:
              if (!w(x)) {
                x === "&" ? y.state = E.ATTRIB_VALUE_ENTITY_U : y.attribValue += x;
                continue;
              }
              ne(y), x === ">" ? ce(y) : y.state = E.ATTRIB;
              continue;
            case E.CLOSE_TAG:
              if (y.tagName)
                x === ">" ? ue(y) : _(b, x) ? y.tagName += x : y.script ? (y.script += "</" + y.tagName, y.tagName = "", y.state = E.SCRIPT) : (D(x) || M(y, "Invalid tagname in closing tag"), y.state = E.CLOSE_TAG_SAW_WHITE);
              else {
                if (D(x))
                  continue;
                S(m, x) ? y.script ? (y.script += "</" + x, y.state = E.SCRIPT) : M(y, "Invalid tagname in closing tag.") : y.tagName = x;
              }
              continue;
            case E.CLOSE_TAG_SAW_WHITE:
              if (D(x))
                continue;
              x === ">" ? ue(y) : M(y, "Invalid characters in closing tag");
              continue;
            case E.TEXT_ENTITY:
            case E.ATTRIB_VALUE_ENTITY_Q:
            case E.ATTRIB_VALUE_ENTITY_U:
              var pe, _e;
              switch (y.state) {
                case E.TEXT_ENTITY:
                  pe = E.TEXT, _e = "textNode";
                  break;
                case E.ATTRIB_VALUE_ENTITY_Q:
                  pe = E.ATTRIB_VALUE_QUOTED, _e = "attribValue";
                  break;
                case E.ATTRIB_VALUE_ENTITY_U:
                  pe = E.ATTRIB_VALUE_UNQUOTED, _e = "attribValue";
                  break;
              }
              if (x === ";") {
                var Ee = ie(y);
                y.opt.unparsedEntities && !Object.values(h.XML_ENTITIES).includes(Ee) ? (y.entity = "", y.state = pe, y.write(Ee)) : (y[_e] += Ee, y.entity = "", y.state = pe);
              } else _(y.entity.length ? O : R, x) ? y.entity += x : (M(y, "Invalid character in entity name"), y[_e] += "&" + y.entity + x, y.entity = "", y.state = pe);
              continue;
            default:
              throw new Error(y, "Unknown state: " + y.state);
          }
        return y.position >= y.bufferCheckPosition && c(y), y;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      String.fromCodePoint || function() {
        var T = String.fromCharCode, y = Math.floor, j = function() {
          var x = 16384, le = [], me, pe, _e = -1, Ee = arguments.length;
          if (!Ee)
            return "";
          for (var xe = ""; ++_e < Ee; ) {
            var Oe = Number(arguments[_e]);
            if (!isFinite(Oe) || // `NaN`, `+Infinity`, or `-Infinity`
            Oe < 0 || // not a valid Unicode code point
            Oe > 1114111 || // not a valid Unicode code point
            y(Oe) !== Oe)
              throw RangeError("Invalid code point: " + Oe);
            Oe <= 65535 ? le.push(Oe) : (Oe -= 65536, me = (Oe >> 10) + 55296, pe = Oe % 1024 + 56320, le.push(me, pe)), (_e + 1 === Ee || le.length > x) && (xe += T.apply(null, le), le.length = 0);
          }
          return xe;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: j,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = j;
      }();
    })(o);
  }(sn)), sn;
}
var vs;
function Ff() {
  if (vs) return Ft;
  vs = 1, Object.defineProperty(Ft, "__esModule", { value: !0 }), Ft.XElement = void 0, Ft.parseXml = e;
  const o = Nf(), h = Hr();
  class f {
    constructor(t) {
      if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
        throw (0, h.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!c(t))
        throw (0, h.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(t) {
      const a = this.attributes === null ? null : this.attributes[t];
      if (a == null)
        throw (0, h.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return a;
    }
    removeAttribute(t) {
      this.attributes !== null && delete this.attributes[t];
    }
    element(t, a = !1, i = null) {
      const l = this.elementOrNull(t, a);
      if (l === null)
        throw (0, h.newError)(i || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
      return l;
    }
    elementOrNull(t, a = !1) {
      if (this.elements === null)
        return null;
      for (const i of this.elements)
        if (r(i, t, a))
          return i;
      return null;
    }
    getElements(t, a = !1) {
      return this.elements === null ? [] : this.elements.filter((i) => r(i, t, a));
    }
    elementValueOrEmpty(t, a = !1) {
      const i = this.elementOrNull(t, a);
      return i === null ? "" : i.value;
    }
  }
  Ft.XElement = f;
  const d = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function c(n) {
    return d.test(n);
  }
  function r(n, t, a) {
    const i = n.name;
    return i === t || a === !0 && i.length === t.length && i.toLowerCase() === t.toLowerCase();
  }
  function e(n) {
    let t = null;
    const a = o.parser(!0, {}), i = [];
    return a.onopentag = (l) => {
      const s = new f(l.name);
      if (s.attributes = l.attributes, t === null)
        t = s;
      else {
        const p = i[i.length - 1];
        p.elements == null && (p.elements = []), p.elements.push(s);
      }
      i.push(s);
    }, a.onclosetag = () => {
      i.pop();
    }, a.ontext = (l) => {
      i.length > 0 && (i[i.length - 1].value = l);
    }, a.oncdata = (l) => {
      const s = i[i.length - 1];
      s.value = l, s.isCData = !0;
    }, a.onerror = (l) => {
      throw l;
    }, a.write(n), t;
  }
  return Ft;
}
var Yt = {}, ys;
function xf() {
  if (ys) return Yt;
  ys = 1, Object.defineProperty(Yt, "__esModule", { value: !0 }), Yt.MemoLazy = void 0;
  let o = class {
    constructor(d, c) {
      this.selector = d, this.creator = c, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const d = this.selector();
      if (this._value !== void 0 && h(this.selected, d))
        return this._value;
      this.selected = d;
      const c = this.creator(d);
      return this.value = c, c;
    }
    set value(d) {
      this._value = d;
    }
  };
  Yt.MemoLazy = o;
  function h(f, d) {
    if (typeof f == "object" && f !== null && (typeof d == "object" && d !== null)) {
      const e = Object.keys(f), n = Object.keys(d);
      return e.length === n.length && e.every((t) => h(f[t], d[t]));
    }
    return f === d;
  }
  return Yt;
}
var Nr = {}, Es;
function Lf() {
  if (Es) return Nr;
  Es = 1, Object.defineProperty(Nr, "__esModule", { value: !0 }), Nr.retry = h;
  const o = Do();
  async function h(f, d, c, r = 0, e = 0, n) {
    var t;
    const a = new o.CancellationToken();
    try {
      return await f();
    } catch (i) {
      if ((!((t = n == null ? void 0 : n(i)) !== null && t !== void 0) || t) && d > 0 && !a.cancelled)
        return await new Promise((l) => setTimeout(l, c + r * e)), await h(f, d - 1, c, r, e + 1, n);
      throw i;
    }
  }
  return Nr;
}
var ws;
function ke() {
  return ws || (ws = 1, function(o) {
    Object.defineProperty(o, "__esModule", { value: !0 }), o.CURRENT_APP_PACKAGE_FILE_NAME = o.CURRENT_APP_INSTALLER_FILE_NAME = o.retry = o.MemoLazy = o.newError = o.XElement = o.parseXml = o.ProgressCallbackTransform = o.UUID = o.parseDn = o.githubUrl = o.getS3LikeProviderBaseUrl = o.configureRequestUrl = o.parseJson = o.safeStringifyJson = o.configureRequestOptionsFromUrl = o.configureRequestOptions = o.safeGetHeader = o.DigestTransform = o.HttpExecutor = o.createHttpError = o.HttpError = o.CancellationError = o.CancellationToken = void 0, o.asArray = l;
    var h = Do();
    Object.defineProperty(o, "CancellationToken", { enumerable: !0, get: function() {
      return h.CancellationToken;
    } }), Object.defineProperty(o, "CancellationError", { enumerable: !0, get: function() {
      return h.CancellationError;
    } });
    var f = Of();
    Object.defineProperty(o, "HttpError", { enumerable: !0, get: function() {
      return f.HttpError;
    } }), Object.defineProperty(o, "createHttpError", { enumerable: !0, get: function() {
      return f.createHttpError;
    } }), Object.defineProperty(o, "HttpExecutor", { enumerable: !0, get: function() {
      return f.HttpExecutor;
    } }), Object.defineProperty(o, "DigestTransform", { enumerable: !0, get: function() {
      return f.DigestTransform;
    } }), Object.defineProperty(o, "safeGetHeader", { enumerable: !0, get: function() {
      return f.safeGetHeader;
    } }), Object.defineProperty(o, "configureRequestOptions", { enumerable: !0, get: function() {
      return f.configureRequestOptions;
    } }), Object.defineProperty(o, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return f.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(o, "safeStringifyJson", { enumerable: !0, get: function() {
      return f.safeStringifyJson;
    } }), Object.defineProperty(o, "parseJson", { enumerable: !0, get: function() {
      return f.parseJson;
    } }), Object.defineProperty(o, "configureRequestUrl", { enumerable: !0, get: function() {
      return f.configureRequestUrl;
    } });
    var d = Df();
    Object.defineProperty(o, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return d.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(o, "githubUrl", { enumerable: !0, get: function() {
      return d.githubUrl;
    } });
    var c = Pf();
    Object.defineProperty(o, "parseDn", { enumerable: !0, get: function() {
      return c.parseDn;
    } });
    var r = If();
    Object.defineProperty(o, "UUID", { enumerable: !0, get: function() {
      return r.UUID;
    } });
    var e = xu();
    Object.defineProperty(o, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return e.ProgressCallbackTransform;
    } });
    var n = Ff();
    Object.defineProperty(o, "parseXml", { enumerable: !0, get: function() {
      return n.parseXml;
    } }), Object.defineProperty(o, "XElement", { enumerable: !0, get: function() {
      return n.XElement;
    } });
    var t = Hr();
    Object.defineProperty(o, "newError", { enumerable: !0, get: function() {
      return t.newError;
    } });
    var a = xf();
    Object.defineProperty(o, "MemoLazy", { enumerable: !0, get: function() {
      return a.MemoLazy;
    } });
    var i = Lf();
    Object.defineProperty(o, "retry", { enumerable: !0, get: function() {
      return i.retry;
    } }), o.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", o.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function l(s) {
      return s == null ? [] : Array.isArray(s) ? s : [s];
    }
  }(en)), en;
}
var an = {}, Fr = {}, _s;
function Ye() {
  return _s || (_s = 1, Fr.fromCallback = function(o) {
    return Object.defineProperty(function(...h) {
      if (typeof h[h.length - 1] == "function") o.apply(this, h);
      else
        return new Promise((f, d) => {
          h.push((c, r) => c != null ? d(c) : f(r)), o.apply(this, h);
        });
    }, "name", { value: o.name });
  }, Fr.fromPromise = function(o) {
    return Object.defineProperty(function(...h) {
      const f = h[h.length - 1];
      if (typeof f != "function") return o.apply(this, h);
      h.pop(), o.apply(this, h).then((d) => f(null, d), f);
    }, "name", { value: o.name });
  }), Fr;
}
var ln, Ss;
function $f() {
  if (Ss) return ln;
  Ss = 1;
  var o = mf, h = process.cwd, f = null, d = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return f || (f = h.call(process)), f;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var c = process.chdir;
    process.chdir = function(e) {
      f = null, c.call(process, e);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, c);
  }
  ln = r;
  function r(e) {
    o.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && n(e), e.lutimes || t(e), e.chown = l(e.chown), e.fchown = l(e.fchown), e.lchown = l(e.lchown), e.chmod = a(e.chmod), e.fchmod = a(e.fchmod), e.lchmod = a(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = p(e.stat), e.fstat = p(e.fstat), e.lstat = p(e.lstat), e.statSync = g(e.statSync), e.fstatSync = g(e.fstatSync), e.lstatSync = g(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(m, b, R) {
      R && process.nextTick(R);
    }, e.lchmodSync = function() {
    }), e.chown && !e.lchown && (e.lchown = function(m, b, R, O) {
      O && process.nextTick(O);
    }, e.lchownSync = function() {
    }), d === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(m) {
      function b(R, O, D) {
        var $ = Date.now(), w = 0;
        m(R, O, function _(S) {
          if (S && (S.code === "EACCES" || S.code === "EPERM" || S.code === "EBUSY") && Date.now() - $ < 6e4) {
            setTimeout(function() {
              e.stat(O, function(E, q) {
                E && E.code === "ENOENT" ? m(R, O, _) : D(S);
              });
            }, w), w < 100 && (w += 10);
            return;
          }
          D && D(S);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(b, m), b;
    }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(m) {
      function b(R, O, D, $, w, _) {
        var S;
        if (_ && typeof _ == "function") {
          var E = 0;
          S = function(q, F, N) {
            if (q && q.code === "EAGAIN" && E < 10)
              return E++, m.call(e, R, O, D, $, w, S);
            _.apply(this, arguments);
          };
        }
        return m.call(e, R, O, D, $, w, S);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(b, m), b;
    }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(m) {
      return function(b, R, O, D, $) {
        for (var w = 0; ; )
          try {
            return m.call(e, b, R, O, D, $);
          } catch (_) {
            if (_.code === "EAGAIN" && w < 10) {
              w++;
              continue;
            }
            throw _;
          }
      };
    }(e.readSync);
    function n(m) {
      m.lchmod = function(b, R, O) {
        m.open(
          b,
          o.O_WRONLY | o.O_SYMLINK,
          R,
          function(D, $) {
            if (D) {
              O && O(D);
              return;
            }
            m.fchmod($, R, function(w) {
              m.close($, function(_) {
                O && O(w || _);
              });
            });
          }
        );
      }, m.lchmodSync = function(b, R) {
        var O = m.openSync(b, o.O_WRONLY | o.O_SYMLINK, R), D = !0, $;
        try {
          $ = m.fchmodSync(O, R), D = !1;
        } finally {
          if (D)
            try {
              m.closeSync(O);
            } catch {
            }
          else
            m.closeSync(O);
        }
        return $;
      };
    }
    function t(m) {
      o.hasOwnProperty("O_SYMLINK") && m.futimes ? (m.lutimes = function(b, R, O, D) {
        m.open(b, o.O_SYMLINK, function($, w) {
          if ($) {
            D && D($);
            return;
          }
          m.futimes(w, R, O, function(_) {
            m.close(w, function(S) {
              D && D(_ || S);
            });
          });
        });
      }, m.lutimesSync = function(b, R, O) {
        var D = m.openSync(b, o.O_SYMLINK), $, w = !0;
        try {
          $ = m.futimesSync(D, R, O), w = !1;
        } finally {
          if (w)
            try {
              m.closeSync(D);
            } catch {
            }
          else
            m.closeSync(D);
        }
        return $;
      }) : m.futimes && (m.lutimes = function(b, R, O, D) {
        D && process.nextTick(D);
      }, m.lutimesSync = function() {
      });
    }
    function a(m) {
      return m && function(b, R, O) {
        return m.call(e, b, R, function(D) {
          v(D) && (D = null), O && O.apply(this, arguments);
        });
      };
    }
    function i(m) {
      return m && function(b, R) {
        try {
          return m.call(e, b, R);
        } catch (O) {
          if (!v(O)) throw O;
        }
      };
    }
    function l(m) {
      return m && function(b, R, O, D) {
        return m.call(e, b, R, O, function($) {
          v($) && ($ = null), D && D.apply(this, arguments);
        });
      };
    }
    function s(m) {
      return m && function(b, R, O) {
        try {
          return m.call(e, b, R, O);
        } catch (D) {
          if (!v(D)) throw D;
        }
      };
    }
    function p(m) {
      return m && function(b, R, O) {
        typeof R == "function" && (O = R, R = null);
        function D($, w) {
          w && (w.uid < 0 && (w.uid += 4294967296), w.gid < 0 && (w.gid += 4294967296)), O && O.apply(this, arguments);
        }
        return R ? m.call(e, b, R, D) : m.call(e, b, D);
      };
    }
    function g(m) {
      return m && function(b, R) {
        var O = R ? m.call(e, b, R) : m.call(e, b);
        return O && (O.uid < 0 && (O.uid += 4294967296), O.gid < 0 && (O.gid += 4294967296)), O;
      };
    }
    function v(m) {
      if (!m || m.code === "ENOSYS")
        return !0;
      var b = !process.getuid || process.getuid() !== 0;
      return !!(b && (m.code === "EINVAL" || m.code === "EPERM"));
    }
  }
  return ln;
}
var un, As;
function Uf() {
  if (As) return un;
  As = 1;
  var o = mr.Stream;
  un = h;
  function h(f) {
    return {
      ReadStream: d,
      WriteStream: c
    };
    function d(r, e) {
      if (!(this instanceof d)) return new d(r, e);
      o.call(this);
      var n = this;
      this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, e = e || {};
      for (var t = Object.keys(e), a = 0, i = t.length; a < i; a++) {
        var l = t[a];
        this[l] = e[l];
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
          n._read();
        });
        return;
      }
      f.open(this.path, this.flags, this.mode, function(s, p) {
        if (s) {
          n.emit("error", s), n.readable = !1;
          return;
        }
        n.fd = p, n.emit("open", p), n._read();
      });
    }
    function c(r, e) {
      if (!(this instanceof c)) return new c(r, e);
      o.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, e = e || {};
      for (var n = Object.keys(e), t = 0, a = n.length; t < a; t++) {
        var i = n[t];
        this[i] = e[i];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = f.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return un;
}
var cn, bs;
function kf() {
  if (bs) return cn;
  bs = 1, cn = h;
  var o = Object.getPrototypeOf || function(f) {
    return f.__proto__;
  };
  function h(f) {
    if (f === null || typeof f != "object")
      return f;
    if (f instanceof Object)
      var d = { __proto__: o(f) };
    else
      var d = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(f).forEach(function(c) {
      Object.defineProperty(d, c, Object.getOwnPropertyDescriptor(f, c));
    }), d;
  }
  return cn;
}
var xr, Ts;
function We() {
  if (Ts) return xr;
  Ts = 1;
  var o = Ve, h = $f(), f = Uf(), d = kf(), c = jr, r, e;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (r = Symbol.for("graceful-fs.queue"), e = Symbol.for("graceful-fs.previous")) : (r = "___graceful-fs.queue", e = "___graceful-fs.previous");
  function n() {
  }
  function t(m, b) {
    Object.defineProperty(m, r, {
      get: function() {
        return b;
      }
    });
  }
  var a = n;
  if (c.debuglog ? a = c.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (a = function() {
    var m = c.format.apply(c, arguments);
    m = "GFS4: " + m.split(/\n/).join(`
GFS4: `), console.error(m);
  }), !o[r]) {
    var i = Ze[r] || [];
    t(o, i), o.close = function(m) {
      function b(R, O) {
        return m.call(o, R, function(D) {
          D || g(), typeof O == "function" && O.apply(this, arguments);
        });
      }
      return Object.defineProperty(b, e, {
        value: m
      }), b;
    }(o.close), o.closeSync = function(m) {
      function b(R) {
        m.apply(o, arguments), g();
      }
      return Object.defineProperty(b, e, {
        value: m
      }), b;
    }(o.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      a(o[r]), Pu.equal(o[r].length, 0);
    });
  }
  Ze[r] || t(Ze, o[r]), xr = l(d(o)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !o.__patched && (xr = l(o), o.__patched = !0);
  function l(m) {
    h(m), m.gracefulify = l, m.createReadStream = ce, m.createWriteStream = ue;
    var b = m.readFile;
    m.readFile = R;
    function R(J, ye, T) {
      return typeof ye == "function" && (T = ye, ye = null), y(J, ye, T);
      function y(j, x, le, me) {
        return b(j, x, function(pe) {
          pe && (pe.code === "EMFILE" || pe.code === "ENFILE") ? s([y, [j, x, le], pe, me || Date.now(), Date.now()]) : typeof le == "function" && le.apply(this, arguments);
        });
      }
    }
    var O = m.writeFile;
    m.writeFile = D;
    function D(J, ye, T, y) {
      return typeof T == "function" && (y = T, T = null), j(J, ye, T, y);
      function j(x, le, me, pe, _e) {
        return O(x, le, me, function(Ee) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? s([j, [x, le, me, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var $ = m.appendFile;
    $ && (m.appendFile = w);
    function w(J, ye, T, y) {
      return typeof T == "function" && (y = T, T = null), j(J, ye, T, y);
      function j(x, le, me, pe, _e) {
        return $(x, le, me, function(Ee) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? s([j, [x, le, me, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var _ = m.copyFile;
    _ && (m.copyFile = S);
    function S(J, ye, T, y) {
      return typeof T == "function" && (y = T, T = 0), j(J, ye, T, y);
      function j(x, le, me, pe, _e) {
        return _(x, le, me, function(Ee) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? s([j, [x, le, me, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var E = m.readdir;
    m.readdir = F;
    var q = /^v[0-5]\./;
    function F(J, ye, T) {
      typeof ye == "function" && (T = ye, ye = null);
      var y = q.test(process.version) ? function(le, me, pe, _e) {
        return E(le, j(
          le,
          me,
          pe,
          _e
        ));
      } : function(le, me, pe, _e) {
        return E(le, me, j(
          le,
          me,
          pe,
          _e
        ));
      };
      return y(J, ye, T);
      function j(x, le, me, pe) {
        return function(_e, Ee) {
          _e && (_e.code === "EMFILE" || _e.code === "ENFILE") ? s([
            y,
            [x, le, me],
            _e,
            pe || Date.now(),
            Date.now()
          ]) : (Ee && Ee.sort && Ee.sort(), typeof me == "function" && me.call(this, _e, Ee));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var N = f(m);
      M = N.ReadStream, V = N.WriteStream;
    }
    var k = m.ReadStream;
    k && (M.prototype = Object.create(k.prototype), M.prototype.open = K);
    var P = m.WriteStream;
    P && (V.prototype = Object.create(P.prototype), V.prototype.open = ne), Object.defineProperty(m, "ReadStream", {
      get: function() {
        return M;
      },
      set: function(J) {
        M = J;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(m, "WriteStream", {
      get: function() {
        return V;
      },
      set: function(J) {
        V = J;
      },
      enumerable: !0,
      configurable: !0
    });
    var I = M;
    Object.defineProperty(m, "FileReadStream", {
      get: function() {
        return I;
      },
      set: function(J) {
        I = J;
      },
      enumerable: !0,
      configurable: !0
    });
    var L = V;
    Object.defineProperty(m, "FileWriteStream", {
      get: function() {
        return L;
      },
      set: function(J) {
        L = J;
      },
      enumerable: !0,
      configurable: !0
    });
    function M(J, ye) {
      return this instanceof M ? (k.apply(this, arguments), this) : M.apply(Object.create(M.prototype), arguments);
    }
    function K() {
      var J = this;
      Te(J.path, J.flags, J.mode, function(ye, T) {
        ye ? (J.autoClose && J.destroy(), J.emit("error", ye)) : (J.fd = T, J.emit("open", T), J.read());
      });
    }
    function V(J, ye) {
      return this instanceof V ? (P.apply(this, arguments), this) : V.apply(Object.create(V.prototype), arguments);
    }
    function ne() {
      var J = this;
      Te(J.path, J.flags, J.mode, function(ye, T) {
        ye ? (J.destroy(), J.emit("error", ye)) : (J.fd = T, J.emit("open", T));
      });
    }
    function ce(J, ye) {
      return new m.ReadStream(J, ye);
    }
    function ue(J, ye) {
      return new m.WriteStream(J, ye);
    }
    var ie = m.open;
    m.open = Te;
    function Te(J, ye, T, y) {
      return typeof T == "function" && (y = T, T = null), j(J, ye, T, y);
      function j(x, le, me, pe, _e) {
        return ie(x, le, me, function(Ee, xe) {
          Ee && (Ee.code === "EMFILE" || Ee.code === "ENFILE") ? s([j, [x, le, me, pe], Ee, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    return m;
  }
  function s(m) {
    a("ENQUEUE", m[0].name, m[1]), o[r].push(m), v();
  }
  var p;
  function g() {
    for (var m = Date.now(), b = 0; b < o[r].length; ++b)
      o[r][b].length > 2 && (o[r][b][3] = m, o[r][b][4] = m);
    v();
  }
  function v() {
    if (clearTimeout(p), p = void 0, o[r].length !== 0) {
      var m = o[r].shift(), b = m[0], R = m[1], O = m[2], D = m[3], $ = m[4];
      if (D === void 0)
        a("RETRY", b.name, R), b.apply(null, R);
      else if (Date.now() - D >= 6e4) {
        a("TIMEOUT", b.name, R);
        var w = R.pop();
        typeof w == "function" && w.call(null, O);
      } else {
        var _ = Date.now() - $, S = Math.max($ - D, 1), E = Math.min(S * 1.2, 100);
        _ >= E ? (a("RETRY", b.name, R), b.apply(null, R.concat([D]))) : o[r].push(m);
      }
      p === void 0 && (p = setTimeout(v, 0));
    }
  }
  return xr;
}
var Rs;
function qt() {
  return Rs || (Rs = 1, function(o) {
    const h = Ye().fromCallback, f = We(), d = [
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
    ].filter((c) => typeof f[c] == "function");
    Object.assign(o, f), d.forEach((c) => {
      o[c] = h(f[c]);
    }), o.exists = function(c, r) {
      return typeof r == "function" ? f.exists(c, r) : new Promise((e) => f.exists(c, e));
    }, o.read = function(c, r, e, n, t, a) {
      return typeof a == "function" ? f.read(c, r, e, n, t, a) : new Promise((i, l) => {
        f.read(c, r, e, n, t, (s, p, g) => {
          if (s) return l(s);
          i({ bytesRead: p, buffer: g });
        });
      });
    }, o.write = function(c, r, ...e) {
      return typeof e[e.length - 1] == "function" ? f.write(c, r, ...e) : new Promise((n, t) => {
        f.write(c, r, ...e, (a, i, l) => {
          if (a) return t(a);
          n({ bytesWritten: i, buffer: l });
        });
      });
    }, typeof f.writev == "function" && (o.writev = function(c, r, ...e) {
      return typeof e[e.length - 1] == "function" ? f.writev(c, r, ...e) : new Promise((n, t) => {
        f.writev(c, r, ...e, (a, i, l) => {
          if (a) return t(a);
          n({ bytesWritten: i, buffers: l });
        });
      });
    }), typeof f.realpath.native == "function" ? o.realpath.native = h(f.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(an)), an;
}
var Lr = {}, fn = {}, Cs;
function qf() {
  if (Cs) return fn;
  Cs = 1;
  const o = be;
  return fn.checkPath = function(f) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(f.replace(o.parse(f).root, ""))) {
      const c = new Error(`Path contains invalid characters: ${f}`);
      throw c.code = "EINVAL", c;
    }
  }, fn;
}
var Os;
function Mf() {
  if (Os) return Lr;
  Os = 1;
  const o = /* @__PURE__ */ qt(), { checkPath: h } = /* @__PURE__ */ qf(), f = (d) => {
    const c = { mode: 511 };
    return typeof d == "number" ? d : { ...c, ...d }.mode;
  };
  return Lr.makeDir = async (d, c) => (h(d), o.mkdir(d, {
    mode: f(c),
    recursive: !0
  })), Lr.makeDirSync = (d, c) => (h(d), o.mkdirSync(d, {
    mode: f(c),
    recursive: !0
  })), Lr;
}
var dn, Ds;
function it() {
  if (Ds) return dn;
  Ds = 1;
  const o = Ye().fromPromise, { makeDir: h, makeDirSync: f } = /* @__PURE__ */ Mf(), d = o(h);
  return dn = {
    mkdirs: d,
    mkdirsSync: f,
    // alias
    mkdirp: d,
    mkdirpSync: f,
    ensureDir: d,
    ensureDirSync: f
  }, dn;
}
var hn, Ps;
function Ct() {
  if (Ps) return hn;
  Ps = 1;
  const o = Ye().fromPromise, h = /* @__PURE__ */ qt();
  function f(d) {
    return h.access(d).then(() => !0).catch(() => !1);
  }
  return hn = {
    pathExists: o(f),
    pathExistsSync: h.existsSync
  }, hn;
}
var pn, Is;
function Lu() {
  if (Is) return pn;
  Is = 1;
  const o = We();
  function h(d, c, r, e) {
    o.open(d, "r+", (n, t) => {
      if (n) return e(n);
      o.futimes(t, c, r, (a) => {
        o.close(t, (i) => {
          e && e(a || i);
        });
      });
    });
  }
  function f(d, c, r) {
    const e = o.openSync(d, "r+");
    return o.futimesSync(e, c, r), o.closeSync(e);
  }
  return pn = {
    utimesMillis: h,
    utimesMillisSync: f
  }, pn;
}
var mn, Ns;
function Mt() {
  if (Ns) return mn;
  Ns = 1;
  const o = /* @__PURE__ */ qt(), h = be, f = jr;
  function d(s, p, g) {
    const v = g.dereference ? (m) => o.stat(m, { bigint: !0 }) : (m) => o.lstat(m, { bigint: !0 });
    return Promise.all([
      v(s),
      v(p).catch((m) => {
        if (m.code === "ENOENT") return null;
        throw m;
      })
    ]).then(([m, b]) => ({ srcStat: m, destStat: b }));
  }
  function c(s, p, g) {
    let v;
    const m = g.dereference ? (R) => o.statSync(R, { bigint: !0 }) : (R) => o.lstatSync(R, { bigint: !0 }), b = m(s);
    try {
      v = m(p);
    } catch (R) {
      if (R.code === "ENOENT") return { srcStat: b, destStat: null };
      throw R;
    }
    return { srcStat: b, destStat: v };
  }
  function r(s, p, g, v, m) {
    f.callbackify(d)(s, p, v, (b, R) => {
      if (b) return m(b);
      const { srcStat: O, destStat: D } = R;
      if (D) {
        if (a(O, D)) {
          const $ = h.basename(s), w = h.basename(p);
          return g === "move" && $ !== w && $.toLowerCase() === w.toLowerCase() ? m(null, { srcStat: O, destStat: D, isChangingCase: !0 }) : m(new Error("Source and destination must not be the same."));
        }
        if (O.isDirectory() && !D.isDirectory())
          return m(new Error(`Cannot overwrite non-directory '${p}' with directory '${s}'.`));
        if (!O.isDirectory() && D.isDirectory())
          return m(new Error(`Cannot overwrite directory '${p}' with non-directory '${s}'.`));
      }
      return O.isDirectory() && i(s, p) ? m(new Error(l(s, p, g))) : m(null, { srcStat: O, destStat: D });
    });
  }
  function e(s, p, g, v) {
    const { srcStat: m, destStat: b } = c(s, p, v);
    if (b) {
      if (a(m, b)) {
        const R = h.basename(s), O = h.basename(p);
        if (g === "move" && R !== O && R.toLowerCase() === O.toLowerCase())
          return { srcStat: m, destStat: b, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (m.isDirectory() && !b.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${p}' with directory '${s}'.`);
      if (!m.isDirectory() && b.isDirectory())
        throw new Error(`Cannot overwrite directory '${p}' with non-directory '${s}'.`);
    }
    if (m.isDirectory() && i(s, p))
      throw new Error(l(s, p, g));
    return { srcStat: m, destStat: b };
  }
  function n(s, p, g, v, m) {
    const b = h.resolve(h.dirname(s)), R = h.resolve(h.dirname(g));
    if (R === b || R === h.parse(R).root) return m();
    o.stat(R, { bigint: !0 }, (O, D) => O ? O.code === "ENOENT" ? m() : m(O) : a(p, D) ? m(new Error(l(s, g, v))) : n(s, p, R, v, m));
  }
  function t(s, p, g, v) {
    const m = h.resolve(h.dirname(s)), b = h.resolve(h.dirname(g));
    if (b === m || b === h.parse(b).root) return;
    let R;
    try {
      R = o.statSync(b, { bigint: !0 });
    } catch (O) {
      if (O.code === "ENOENT") return;
      throw O;
    }
    if (a(p, R))
      throw new Error(l(s, g, v));
    return t(s, p, b, v);
  }
  function a(s, p) {
    return p.ino && p.dev && p.ino === s.ino && p.dev === s.dev;
  }
  function i(s, p) {
    const g = h.resolve(s).split(h.sep).filter((m) => m), v = h.resolve(p).split(h.sep).filter((m) => m);
    return g.reduce((m, b, R) => m && v[R] === b, !0);
  }
  function l(s, p, g) {
    return `Cannot ${g} '${s}' to a subdirectory of itself, '${p}'.`;
  }
  return mn = {
    checkPaths: r,
    checkPathsSync: e,
    checkParentPaths: n,
    checkParentPathsSync: t,
    isSrcSubdir: i,
    areIdentical: a
  }, mn;
}
var gn, Fs;
function Bf() {
  if (Fs) return gn;
  Fs = 1;
  const o = We(), h = be, f = it().mkdirs, d = Ct().pathExists, c = Lu().utimesMillis, r = /* @__PURE__ */ Mt();
  function e(F, N, k, P) {
    typeof k == "function" && !P ? (P = k, k = {}) : typeof k == "function" && (k = { filter: k }), P = P || function() {
    }, k = k || {}, k.clobber = "clobber" in k ? !!k.clobber : !0, k.overwrite = "overwrite" in k ? !!k.overwrite : k.clobber, k.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), r.checkPaths(F, N, "copy", k, (I, L) => {
      if (I) return P(I);
      const { srcStat: M, destStat: K } = L;
      r.checkParentPaths(F, M, N, "copy", (V) => V ? P(V) : k.filter ? t(n, K, F, N, k, P) : n(K, F, N, k, P));
    });
  }
  function n(F, N, k, P, I) {
    const L = h.dirname(k);
    d(L, (M, K) => {
      if (M) return I(M);
      if (K) return i(F, N, k, P, I);
      f(L, (V) => V ? I(V) : i(F, N, k, P, I));
    });
  }
  function t(F, N, k, P, I, L) {
    Promise.resolve(I.filter(k, P)).then((M) => M ? F(N, k, P, I, L) : L(), (M) => L(M));
  }
  function a(F, N, k, P, I) {
    return P.filter ? t(i, F, N, k, P, I) : i(F, N, k, P, I);
  }
  function i(F, N, k, P, I) {
    (P.dereference ? o.stat : o.lstat)(N, (M, K) => M ? I(M) : K.isDirectory() ? D(K, F, N, k, P, I) : K.isFile() || K.isCharacterDevice() || K.isBlockDevice() ? l(K, F, N, k, P, I) : K.isSymbolicLink() ? E(F, N, k, P, I) : K.isSocket() ? I(new Error(`Cannot copy a socket file: ${N}`)) : K.isFIFO() ? I(new Error(`Cannot copy a FIFO pipe: ${N}`)) : I(new Error(`Unknown file: ${N}`)));
  }
  function l(F, N, k, P, I, L) {
    return N ? s(F, k, P, I, L) : p(F, k, P, I, L);
  }
  function s(F, N, k, P, I) {
    if (P.overwrite)
      o.unlink(k, (L) => L ? I(L) : p(F, N, k, P, I));
    else return P.errorOnExist ? I(new Error(`'${k}' already exists`)) : I();
  }
  function p(F, N, k, P, I) {
    o.copyFile(N, k, (L) => L ? I(L) : P.preserveTimestamps ? g(F.mode, N, k, I) : R(k, F.mode, I));
  }
  function g(F, N, k, P) {
    return v(F) ? m(k, F, (I) => I ? P(I) : b(F, N, k, P)) : b(F, N, k, P);
  }
  function v(F) {
    return (F & 128) === 0;
  }
  function m(F, N, k) {
    return R(F, N | 128, k);
  }
  function b(F, N, k, P) {
    O(N, k, (I) => I ? P(I) : R(k, F, P));
  }
  function R(F, N, k) {
    return o.chmod(F, N, k);
  }
  function O(F, N, k) {
    o.stat(F, (P, I) => P ? k(P) : c(N, I.atime, I.mtime, k));
  }
  function D(F, N, k, P, I, L) {
    return N ? w(k, P, I, L) : $(F.mode, k, P, I, L);
  }
  function $(F, N, k, P, I) {
    o.mkdir(k, (L) => {
      if (L) return I(L);
      w(N, k, P, (M) => M ? I(M) : R(k, F, I));
    });
  }
  function w(F, N, k, P) {
    o.readdir(F, (I, L) => I ? P(I) : _(L, F, N, k, P));
  }
  function _(F, N, k, P, I) {
    const L = F.pop();
    return L ? S(F, L, N, k, P, I) : I();
  }
  function S(F, N, k, P, I, L) {
    const M = h.join(k, N), K = h.join(P, N);
    r.checkPaths(M, K, "copy", I, (V, ne) => {
      if (V) return L(V);
      const { destStat: ce } = ne;
      a(ce, M, K, I, (ue) => ue ? L(ue) : _(F, k, P, I, L));
    });
  }
  function E(F, N, k, P, I) {
    o.readlink(N, (L, M) => {
      if (L) return I(L);
      if (P.dereference && (M = h.resolve(process.cwd(), M)), F)
        o.readlink(k, (K, V) => K ? K.code === "EINVAL" || K.code === "UNKNOWN" ? o.symlink(M, k, I) : I(K) : (P.dereference && (V = h.resolve(process.cwd(), V)), r.isSrcSubdir(M, V) ? I(new Error(`Cannot copy '${M}' to a subdirectory of itself, '${V}'.`)) : F.isDirectory() && r.isSrcSubdir(V, M) ? I(new Error(`Cannot overwrite '${V}' with '${M}'.`)) : q(M, k, I)));
      else
        return o.symlink(M, k, I);
    });
  }
  function q(F, N, k) {
    o.unlink(N, (P) => P ? k(P) : o.symlink(F, N, k));
  }
  return gn = e, gn;
}
var vn, xs;
function jf() {
  if (xs) return vn;
  xs = 1;
  const o = We(), h = be, f = it().mkdirsSync, d = Lu().utimesMillisSync, c = /* @__PURE__ */ Mt();
  function r(_, S, E) {
    typeof E == "function" && (E = { filter: E }), E = E || {}, E.clobber = "clobber" in E ? !!E.clobber : !0, E.overwrite = "overwrite" in E ? !!E.overwrite : E.clobber, E.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: q, destStat: F } = c.checkPathsSync(_, S, "copy", E);
    return c.checkParentPathsSync(_, q, S, "copy"), e(F, _, S, E);
  }
  function e(_, S, E, q) {
    if (q.filter && !q.filter(S, E)) return;
    const F = h.dirname(E);
    return o.existsSync(F) || f(F), t(_, S, E, q);
  }
  function n(_, S, E, q) {
    if (!(q.filter && !q.filter(S, E)))
      return t(_, S, E, q);
  }
  function t(_, S, E, q) {
    const N = (q.dereference ? o.statSync : o.lstatSync)(S);
    if (N.isDirectory()) return b(N, _, S, E, q);
    if (N.isFile() || N.isCharacterDevice() || N.isBlockDevice()) return a(N, _, S, E, q);
    if (N.isSymbolicLink()) return $(_, S, E, q);
    throw N.isSocket() ? new Error(`Cannot copy a socket file: ${S}`) : N.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${S}`) : new Error(`Unknown file: ${S}`);
  }
  function a(_, S, E, q, F) {
    return S ? i(_, E, q, F) : l(_, E, q, F);
  }
  function i(_, S, E, q) {
    if (q.overwrite)
      return o.unlinkSync(E), l(_, S, E, q);
    if (q.errorOnExist)
      throw new Error(`'${E}' already exists`);
  }
  function l(_, S, E, q) {
    return o.copyFileSync(S, E), q.preserveTimestamps && s(_.mode, S, E), v(E, _.mode);
  }
  function s(_, S, E) {
    return p(_) && g(E, _), m(S, E);
  }
  function p(_) {
    return (_ & 128) === 0;
  }
  function g(_, S) {
    return v(_, S | 128);
  }
  function v(_, S) {
    return o.chmodSync(_, S);
  }
  function m(_, S) {
    const E = o.statSync(_);
    return d(S, E.atime, E.mtime);
  }
  function b(_, S, E, q, F) {
    return S ? O(E, q, F) : R(_.mode, E, q, F);
  }
  function R(_, S, E, q) {
    return o.mkdirSync(E), O(S, E, q), v(E, _);
  }
  function O(_, S, E) {
    o.readdirSync(_).forEach((q) => D(q, _, S, E));
  }
  function D(_, S, E, q) {
    const F = h.join(S, _), N = h.join(E, _), { destStat: k } = c.checkPathsSync(F, N, "copy", q);
    return n(k, F, N, q);
  }
  function $(_, S, E, q) {
    let F = o.readlinkSync(S);
    if (q.dereference && (F = h.resolve(process.cwd(), F)), _) {
      let N;
      try {
        N = o.readlinkSync(E);
      } catch (k) {
        if (k.code === "EINVAL" || k.code === "UNKNOWN") return o.symlinkSync(F, E);
        throw k;
      }
      if (q.dereference && (N = h.resolve(process.cwd(), N)), c.isSrcSubdir(F, N))
        throw new Error(`Cannot copy '${F}' to a subdirectory of itself, '${N}'.`);
      if (o.statSync(E).isDirectory() && c.isSrcSubdir(N, F))
        throw new Error(`Cannot overwrite '${N}' with '${F}'.`);
      return w(F, E);
    } else
      return o.symlinkSync(F, E);
  }
  function w(_, S) {
    return o.unlinkSync(S), o.symlinkSync(_, S);
  }
  return vn = r, vn;
}
var yn, Ls;
function Po() {
  if (Ls) return yn;
  Ls = 1;
  const o = Ye().fromCallback;
  return yn = {
    copy: o(/* @__PURE__ */ Bf()),
    copySync: /* @__PURE__ */ jf()
  }, yn;
}
var En, $s;
function Hf() {
  if ($s) return En;
  $s = 1;
  const o = We(), h = be, f = Pu, d = process.platform === "win32";
  function c(g) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((m) => {
      g[m] = g[m] || o[m], m = m + "Sync", g[m] = g[m] || o[m];
    }), g.maxBusyTries = g.maxBusyTries || 3;
  }
  function r(g, v, m) {
    let b = 0;
    typeof v == "function" && (m = v, v = {}), f(g, "rimraf: missing path"), f.strictEqual(typeof g, "string", "rimraf: path should be a string"), f.strictEqual(typeof m, "function", "rimraf: callback function required"), f(v, "rimraf: invalid options argument provided"), f.strictEqual(typeof v, "object", "rimraf: options should be object"), c(v), e(g, v, function R(O) {
      if (O) {
        if ((O.code === "EBUSY" || O.code === "ENOTEMPTY" || O.code === "EPERM") && b < v.maxBusyTries) {
          b++;
          const D = b * 100;
          return setTimeout(() => e(g, v, R), D);
        }
        O.code === "ENOENT" && (O = null);
      }
      m(O);
    });
  }
  function e(g, v, m) {
    f(g), f(v), f(typeof m == "function"), v.lstat(g, (b, R) => {
      if (b && b.code === "ENOENT")
        return m(null);
      if (b && b.code === "EPERM" && d)
        return n(g, v, b, m);
      if (R && R.isDirectory())
        return a(g, v, b, m);
      v.unlink(g, (O) => {
        if (O) {
          if (O.code === "ENOENT")
            return m(null);
          if (O.code === "EPERM")
            return d ? n(g, v, O, m) : a(g, v, O, m);
          if (O.code === "EISDIR")
            return a(g, v, O, m);
        }
        return m(O);
      });
    });
  }
  function n(g, v, m, b) {
    f(g), f(v), f(typeof b == "function"), v.chmod(g, 438, (R) => {
      R ? b(R.code === "ENOENT" ? null : m) : v.stat(g, (O, D) => {
        O ? b(O.code === "ENOENT" ? null : m) : D.isDirectory() ? a(g, v, m, b) : v.unlink(g, b);
      });
    });
  }
  function t(g, v, m) {
    let b;
    f(g), f(v);
    try {
      v.chmodSync(g, 438);
    } catch (R) {
      if (R.code === "ENOENT")
        return;
      throw m;
    }
    try {
      b = v.statSync(g);
    } catch (R) {
      if (R.code === "ENOENT")
        return;
      throw m;
    }
    b.isDirectory() ? s(g, v, m) : v.unlinkSync(g);
  }
  function a(g, v, m, b) {
    f(g), f(v), f(typeof b == "function"), v.rmdir(g, (R) => {
      R && (R.code === "ENOTEMPTY" || R.code === "EEXIST" || R.code === "EPERM") ? i(g, v, b) : R && R.code === "ENOTDIR" ? b(m) : b(R);
    });
  }
  function i(g, v, m) {
    f(g), f(v), f(typeof m == "function"), v.readdir(g, (b, R) => {
      if (b) return m(b);
      let O = R.length, D;
      if (O === 0) return v.rmdir(g, m);
      R.forEach(($) => {
        r(h.join(g, $), v, (w) => {
          if (!D) {
            if (w) return m(D = w);
            --O === 0 && v.rmdir(g, m);
          }
        });
      });
    });
  }
  function l(g, v) {
    let m;
    v = v || {}, c(v), f(g, "rimraf: missing path"), f.strictEqual(typeof g, "string", "rimraf: path should be a string"), f(v, "rimraf: missing options"), f.strictEqual(typeof v, "object", "rimraf: options should be object");
    try {
      m = v.lstatSync(g);
    } catch (b) {
      if (b.code === "ENOENT")
        return;
      b.code === "EPERM" && d && t(g, v, b);
    }
    try {
      m && m.isDirectory() ? s(g, v, null) : v.unlinkSync(g);
    } catch (b) {
      if (b.code === "ENOENT")
        return;
      if (b.code === "EPERM")
        return d ? t(g, v, b) : s(g, v, b);
      if (b.code !== "EISDIR")
        throw b;
      s(g, v, b);
    }
  }
  function s(g, v, m) {
    f(g), f(v);
    try {
      v.rmdirSync(g);
    } catch (b) {
      if (b.code === "ENOTDIR")
        throw m;
      if (b.code === "ENOTEMPTY" || b.code === "EEXIST" || b.code === "EPERM")
        p(g, v);
      else if (b.code !== "ENOENT")
        throw b;
    }
  }
  function p(g, v) {
    if (f(g), f(v), v.readdirSync(g).forEach((m) => l(h.join(g, m), v)), d) {
      const m = Date.now();
      do
        try {
          return v.rmdirSync(g, v);
        } catch {
        }
      while (Date.now() - m < 500);
    } else
      return v.rmdirSync(g, v);
  }
  return En = r, r.sync = l, En;
}
var wn, Us;
function Gr() {
  if (Us) return wn;
  Us = 1;
  const o = We(), h = Ye().fromCallback, f = /* @__PURE__ */ Hf();
  function d(r, e) {
    if (o.rm) return o.rm(r, { recursive: !0, force: !0 }, e);
    f(r, e);
  }
  function c(r) {
    if (o.rmSync) return o.rmSync(r, { recursive: !0, force: !0 });
    f.sync(r);
  }
  return wn = {
    remove: h(d),
    removeSync: c
  }, wn;
}
var _n, ks;
function Gf() {
  if (ks) return _n;
  ks = 1;
  const o = Ye().fromPromise, h = /* @__PURE__ */ qt(), f = be, d = /* @__PURE__ */ it(), c = /* @__PURE__ */ Gr(), r = o(async function(t) {
    let a;
    try {
      a = await h.readdir(t);
    } catch {
      return d.mkdirs(t);
    }
    return Promise.all(a.map((i) => c.remove(f.join(t, i))));
  });
  function e(n) {
    let t;
    try {
      t = h.readdirSync(n);
    } catch {
      return d.mkdirsSync(n);
    }
    t.forEach((a) => {
      a = f.join(n, a), c.removeSync(a);
    });
  }
  return _n = {
    emptyDirSync: e,
    emptydirSync: e,
    emptyDir: r,
    emptydir: r
  }, _n;
}
var Sn, qs;
function Vf() {
  if (qs) return Sn;
  qs = 1;
  const o = Ye().fromCallback, h = be, f = We(), d = /* @__PURE__ */ it();
  function c(e, n) {
    function t() {
      f.writeFile(e, "", (a) => {
        if (a) return n(a);
        n();
      });
    }
    f.stat(e, (a, i) => {
      if (!a && i.isFile()) return n();
      const l = h.dirname(e);
      f.stat(l, (s, p) => {
        if (s)
          return s.code === "ENOENT" ? d.mkdirs(l, (g) => {
            if (g) return n(g);
            t();
          }) : n(s);
        p.isDirectory() ? t() : f.readdir(l, (g) => {
          if (g) return n(g);
        });
      });
    });
  }
  function r(e) {
    let n;
    try {
      n = f.statSync(e);
    } catch {
    }
    if (n && n.isFile()) return;
    const t = h.dirname(e);
    try {
      f.statSync(t).isDirectory() || f.readdirSync(t);
    } catch (a) {
      if (a && a.code === "ENOENT") d.mkdirsSync(t);
      else throw a;
    }
    f.writeFileSync(e, "");
  }
  return Sn = {
    createFile: o(c),
    createFileSync: r
  }, Sn;
}
var An, Ms;
function Wf() {
  if (Ms) return An;
  Ms = 1;
  const o = Ye().fromCallback, h = be, f = We(), d = /* @__PURE__ */ it(), c = Ct().pathExists, { areIdentical: r } = /* @__PURE__ */ Mt();
  function e(t, a, i) {
    function l(s, p) {
      f.link(s, p, (g) => {
        if (g) return i(g);
        i(null);
      });
    }
    f.lstat(a, (s, p) => {
      f.lstat(t, (g, v) => {
        if (g)
          return g.message = g.message.replace("lstat", "ensureLink"), i(g);
        if (p && r(v, p)) return i(null);
        const m = h.dirname(a);
        c(m, (b, R) => {
          if (b) return i(b);
          if (R) return l(t, a);
          d.mkdirs(m, (O) => {
            if (O) return i(O);
            l(t, a);
          });
        });
      });
    });
  }
  function n(t, a) {
    let i;
    try {
      i = f.lstatSync(a);
    } catch {
    }
    try {
      const p = f.lstatSync(t);
      if (i && r(p, i)) return;
    } catch (p) {
      throw p.message = p.message.replace("lstat", "ensureLink"), p;
    }
    const l = h.dirname(a);
    return f.existsSync(l) || d.mkdirsSync(l), f.linkSync(t, a);
  }
  return An = {
    createLink: o(e),
    createLinkSync: n
  }, An;
}
var bn, Bs;
function zf() {
  if (Bs) return bn;
  Bs = 1;
  const o = be, h = We(), f = Ct().pathExists;
  function d(r, e, n) {
    if (o.isAbsolute(r))
      return h.lstat(r, (t) => t ? (t.message = t.message.replace("lstat", "ensureSymlink"), n(t)) : n(null, {
        toCwd: r,
        toDst: r
      }));
    {
      const t = o.dirname(e), a = o.join(t, r);
      return f(a, (i, l) => i ? n(i) : l ? n(null, {
        toCwd: a,
        toDst: r
      }) : h.lstat(r, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), n(s)) : n(null, {
        toCwd: r,
        toDst: o.relative(t, r)
      })));
    }
  }
  function c(r, e) {
    let n;
    if (o.isAbsolute(r)) {
      if (n = h.existsSync(r), !n) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: r,
        toDst: r
      };
    } else {
      const t = o.dirname(e), a = o.join(t, r);
      if (n = h.existsSync(a), n)
        return {
          toCwd: a,
          toDst: r
        };
      if (n = h.existsSync(r), !n) throw new Error("relative srcpath does not exist");
      return {
        toCwd: r,
        toDst: o.relative(t, r)
      };
    }
  }
  return bn = {
    symlinkPaths: d,
    symlinkPathsSync: c
  }, bn;
}
var Tn, js;
function Yf() {
  if (js) return Tn;
  js = 1;
  const o = We();
  function h(d, c, r) {
    if (r = typeof c == "function" ? c : r, c = typeof c == "function" ? !1 : c, c) return r(null, c);
    o.lstat(d, (e, n) => {
      if (e) return r(null, "file");
      c = n && n.isDirectory() ? "dir" : "file", r(null, c);
    });
  }
  function f(d, c) {
    let r;
    if (c) return c;
    try {
      r = o.lstatSync(d);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  return Tn = {
    symlinkType: h,
    symlinkTypeSync: f
  }, Tn;
}
var Rn, Hs;
function Xf() {
  if (Hs) return Rn;
  Hs = 1;
  const o = Ye().fromCallback, h = be, f = /* @__PURE__ */ qt(), d = /* @__PURE__ */ it(), c = d.mkdirs, r = d.mkdirsSync, e = /* @__PURE__ */ zf(), n = e.symlinkPaths, t = e.symlinkPathsSync, a = /* @__PURE__ */ Yf(), i = a.symlinkType, l = a.symlinkTypeSync, s = Ct().pathExists, { areIdentical: p } = /* @__PURE__ */ Mt();
  function g(b, R, O, D) {
    D = typeof O == "function" ? O : D, O = typeof O == "function" ? !1 : O, f.lstat(R, ($, w) => {
      !$ && w.isSymbolicLink() ? Promise.all([
        f.stat(b),
        f.stat(R)
      ]).then(([_, S]) => {
        if (p(_, S)) return D(null);
        v(b, R, O, D);
      }) : v(b, R, O, D);
    });
  }
  function v(b, R, O, D) {
    n(b, R, ($, w) => {
      if ($) return D($);
      b = w.toDst, i(w.toCwd, O, (_, S) => {
        if (_) return D(_);
        const E = h.dirname(R);
        s(E, (q, F) => {
          if (q) return D(q);
          if (F) return f.symlink(b, R, S, D);
          c(E, (N) => {
            if (N) return D(N);
            f.symlink(b, R, S, D);
          });
        });
      });
    });
  }
  function m(b, R, O) {
    let D;
    try {
      D = f.lstatSync(R);
    } catch {
    }
    if (D && D.isSymbolicLink()) {
      const S = f.statSync(b), E = f.statSync(R);
      if (p(S, E)) return;
    }
    const $ = t(b, R);
    b = $.toDst, O = l($.toCwd, O);
    const w = h.dirname(R);
    return f.existsSync(w) || r(w), f.symlinkSync(b, R, O);
  }
  return Rn = {
    createSymlink: o(g),
    createSymlinkSync: m
  }, Rn;
}
var Cn, Gs;
function Jf() {
  if (Gs) return Cn;
  Gs = 1;
  const { createFile: o, createFileSync: h } = /* @__PURE__ */ Vf(), { createLink: f, createLinkSync: d } = /* @__PURE__ */ Wf(), { createSymlink: c, createSymlinkSync: r } = /* @__PURE__ */ Xf();
  return Cn = {
    // file
    createFile: o,
    createFileSync: h,
    ensureFile: o,
    ensureFileSync: h,
    // link
    createLink: f,
    createLinkSync: d,
    ensureLink: f,
    ensureLinkSync: d,
    // symlink
    createSymlink: c,
    createSymlinkSync: r,
    ensureSymlink: c,
    ensureSymlinkSync: r
  }, Cn;
}
var On, Vs;
function Io() {
  if (Vs) return On;
  Vs = 1;
  function o(f, { EOL: d = `
`, finalEOL: c = !0, replacer: r = null, spaces: e } = {}) {
    const n = c ? d : "";
    return JSON.stringify(f, r, e).replace(/\n/g, d) + n;
  }
  function h(f) {
    return Buffer.isBuffer(f) && (f = f.toString("utf8")), f.replace(/^\uFEFF/, "");
  }
  return On = { stringify: o, stripBom: h }, On;
}
var Dn, Ws;
function Kf() {
  if (Ws) return Dn;
  Ws = 1;
  let o;
  try {
    o = We();
  } catch {
    o = Ve;
  }
  const h = Ye(), { stringify: f, stripBom: d } = Io();
  async function c(l, s = {}) {
    typeof s == "string" && (s = { encoding: s });
    const p = s.fs || o, g = "throws" in s ? s.throws : !0;
    let v = await h.fromCallback(p.readFile)(l, s);
    v = d(v);
    let m;
    try {
      m = JSON.parse(v, s ? s.reviver : null);
    } catch (b) {
      if (g)
        throw b.message = `${l}: ${b.message}`, b;
      return null;
    }
    return m;
  }
  const r = h.fromPromise(c);
  function e(l, s = {}) {
    typeof s == "string" && (s = { encoding: s });
    const p = s.fs || o, g = "throws" in s ? s.throws : !0;
    try {
      let v = p.readFileSync(l, s);
      return v = d(v), JSON.parse(v, s.reviver);
    } catch (v) {
      if (g)
        throw v.message = `${l}: ${v.message}`, v;
      return null;
    }
  }
  async function n(l, s, p = {}) {
    const g = p.fs || o, v = f(s, p);
    await h.fromCallback(g.writeFile)(l, v, p);
  }
  const t = h.fromPromise(n);
  function a(l, s, p = {}) {
    const g = p.fs || o, v = f(s, p);
    return g.writeFileSync(l, v, p);
  }
  return Dn = {
    readFile: r,
    readFileSync: e,
    writeFile: t,
    writeFileSync: a
  }, Dn;
}
var Pn, zs;
function Qf() {
  if (zs) return Pn;
  zs = 1;
  const o = Kf();
  return Pn = {
    // jsonfile exports
    readJson: o.readFile,
    readJsonSync: o.readFileSync,
    writeJson: o.writeFile,
    writeJsonSync: o.writeFileSync
  }, Pn;
}
var In, Ys;
function No() {
  if (Ys) return In;
  Ys = 1;
  const o = Ye().fromCallback, h = We(), f = be, d = /* @__PURE__ */ it(), c = Ct().pathExists;
  function r(n, t, a, i) {
    typeof a == "function" && (i = a, a = "utf8");
    const l = f.dirname(n);
    c(l, (s, p) => {
      if (s) return i(s);
      if (p) return h.writeFile(n, t, a, i);
      d.mkdirs(l, (g) => {
        if (g) return i(g);
        h.writeFile(n, t, a, i);
      });
    });
  }
  function e(n, ...t) {
    const a = f.dirname(n);
    if (h.existsSync(a))
      return h.writeFileSync(n, ...t);
    d.mkdirsSync(a), h.writeFileSync(n, ...t);
  }
  return In = {
    outputFile: o(r),
    outputFileSync: e
  }, In;
}
var Nn, Xs;
function Zf() {
  if (Xs) return Nn;
  Xs = 1;
  const { stringify: o } = Io(), { outputFile: h } = /* @__PURE__ */ No();
  async function f(d, c, r = {}) {
    const e = o(c, r);
    await h(d, e, r);
  }
  return Nn = f, Nn;
}
var Fn, Js;
function ed() {
  if (Js) return Fn;
  Js = 1;
  const { stringify: o } = Io(), { outputFileSync: h } = /* @__PURE__ */ No();
  function f(d, c, r) {
    const e = o(c, r);
    h(d, e, r);
  }
  return Fn = f, Fn;
}
var xn, Ks;
function td() {
  if (Ks) return xn;
  Ks = 1;
  const o = Ye().fromPromise, h = /* @__PURE__ */ Qf();
  return h.outputJson = o(/* @__PURE__ */ Zf()), h.outputJsonSync = /* @__PURE__ */ ed(), h.outputJSON = h.outputJson, h.outputJSONSync = h.outputJsonSync, h.writeJSON = h.writeJson, h.writeJSONSync = h.writeJsonSync, h.readJSON = h.readJson, h.readJSONSync = h.readJsonSync, xn = h, xn;
}
var Ln, Qs;
function rd() {
  if (Qs) return Ln;
  Qs = 1;
  const o = We(), h = be, f = Po().copy, d = Gr().remove, c = it().mkdirp, r = Ct().pathExists, e = /* @__PURE__ */ Mt();
  function n(s, p, g, v) {
    typeof g == "function" && (v = g, g = {}), g = g || {};
    const m = g.overwrite || g.clobber || !1;
    e.checkPaths(s, p, "move", g, (b, R) => {
      if (b) return v(b);
      const { srcStat: O, isChangingCase: D = !1 } = R;
      e.checkParentPaths(s, O, p, "move", ($) => {
        if ($) return v($);
        if (t(p)) return a(s, p, m, D, v);
        c(h.dirname(p), (w) => w ? v(w) : a(s, p, m, D, v));
      });
    });
  }
  function t(s) {
    const p = h.dirname(s);
    return h.parse(p).root === p;
  }
  function a(s, p, g, v, m) {
    if (v) return i(s, p, g, m);
    if (g)
      return d(p, (b) => b ? m(b) : i(s, p, g, m));
    r(p, (b, R) => b ? m(b) : R ? m(new Error("dest already exists.")) : i(s, p, g, m));
  }
  function i(s, p, g, v) {
    o.rename(s, p, (m) => m ? m.code !== "EXDEV" ? v(m) : l(s, p, g, v) : v());
  }
  function l(s, p, g, v) {
    f(s, p, {
      overwrite: g,
      errorOnExist: !0
    }, (b) => b ? v(b) : d(s, v));
  }
  return Ln = n, Ln;
}
var $n, Zs;
function nd() {
  if (Zs) return $n;
  Zs = 1;
  const o = We(), h = be, f = Po().copySync, d = Gr().removeSync, c = it().mkdirpSync, r = /* @__PURE__ */ Mt();
  function e(l, s, p) {
    p = p || {};
    const g = p.overwrite || p.clobber || !1, { srcStat: v, isChangingCase: m = !1 } = r.checkPathsSync(l, s, "move", p);
    return r.checkParentPathsSync(l, v, s, "move"), n(s) || c(h.dirname(s)), t(l, s, g, m);
  }
  function n(l) {
    const s = h.dirname(l);
    return h.parse(s).root === s;
  }
  function t(l, s, p, g) {
    if (g) return a(l, s, p);
    if (p)
      return d(s), a(l, s, p);
    if (o.existsSync(s)) throw new Error("dest already exists.");
    return a(l, s, p);
  }
  function a(l, s, p) {
    try {
      o.renameSync(l, s);
    } catch (g) {
      if (g.code !== "EXDEV") throw g;
      return i(l, s, p);
    }
  }
  function i(l, s, p) {
    return f(l, s, {
      overwrite: p,
      errorOnExist: !0
    }), d(l);
  }
  return $n = e, $n;
}
var Un, ea;
function id() {
  if (ea) return Un;
  ea = 1;
  const o = Ye().fromCallback;
  return Un = {
    move: o(/* @__PURE__ */ rd()),
    moveSync: /* @__PURE__ */ nd()
  }, Un;
}
var kn, ta;
function gt() {
  return ta || (ta = 1, kn = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ qt(),
    // Export extra methods:
    .../* @__PURE__ */ Po(),
    .../* @__PURE__ */ Gf(),
    .../* @__PURE__ */ Jf(),
    .../* @__PURE__ */ td(),
    .../* @__PURE__ */ it(),
    .../* @__PURE__ */ id(),
    .../* @__PURE__ */ No(),
    .../* @__PURE__ */ Ct(),
    .../* @__PURE__ */ Gr()
  }), kn;
}
var Xt = {}, Tt = {}, je = {}, $r = {}, ht = {}, ra;
function vr() {
  if (ra) return ht;
  ra = 1;
  function o(e) {
    return typeof e > "u" || e === null;
  }
  function h(e) {
    return typeof e == "object" && e !== null;
  }
  function f(e) {
    return Array.isArray(e) ? e : o(e) ? [] : [e];
  }
  function d(e, n) {
    var t, a, i, l;
    if (n)
      for (l = Object.keys(n), t = 0, a = l.length; t < a; t += 1)
        i = l[t], e[i] = n[i];
    return e;
  }
  function c(e, n) {
    var t = "", a;
    for (a = 0; a < n; a += 1)
      t += e;
    return t;
  }
  function r(e) {
    return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
  }
  return ht.isNothing = o, ht.isObject = h, ht.toArray = f, ht.repeat = c, ht.isNegativeZero = r, ht.extend = d, ht;
}
var qn, na;
function yr() {
  if (na) return qn;
  na = 1;
  function o(f, d) {
    var c = "", r = f.reason || "(unknown reason)";
    return f.mark ? (f.mark.name && (c += 'in "' + f.mark.name + '" '), c += "(" + (f.mark.line + 1) + ":" + (f.mark.column + 1) + ")", !d && f.mark.snippet && (c += `

` + f.mark.snippet), r + " " + c) : r;
  }
  function h(f, d) {
    Error.call(this), this.name = "YAMLException", this.reason = f, this.mark = d, this.message = o(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return h.prototype = Object.create(Error.prototype), h.prototype.constructor = h, h.prototype.toString = function(d) {
    return this.name + ": " + o(this, d);
  }, qn = h, qn;
}
var Mn, ia;
function od() {
  if (ia) return Mn;
  ia = 1;
  var o = vr();
  function h(c, r, e, n, t) {
    var a = "", i = "", l = Math.floor(t / 2) - 1;
    return n - r > l && (a = " ... ", r = n - l + a.length), e - n > l && (i = " ...", e = n + l - i.length), {
      str: a + c.slice(r, e).replace(/\t/g, "→") + i,
      pos: n - r + a.length
      // relative position
    };
  }
  function f(c, r) {
    return o.repeat(" ", r - c.length) + c;
  }
  function d(c, r) {
    if (r = Object.create(r || null), !c.buffer) return null;
    r.maxLength || (r.maxLength = 79), typeof r.indent != "number" && (r.indent = 1), typeof r.linesBefore != "number" && (r.linesBefore = 3), typeof r.linesAfter != "number" && (r.linesAfter = 2);
    for (var e = /\r?\n|\r|\0/g, n = [0], t = [], a, i = -1; a = e.exec(c.buffer); )
      t.push(a.index), n.push(a.index + a[0].length), c.position <= a.index && i < 0 && (i = n.length - 2);
    i < 0 && (i = n.length - 1);
    var l = "", s, p, g = Math.min(c.line + r.linesAfter, t.length).toString().length, v = r.maxLength - (r.indent + g + 3);
    for (s = 1; s <= r.linesBefore && !(i - s < 0); s++)
      p = h(
        c.buffer,
        n[i - s],
        t[i - s],
        c.position - (n[i] - n[i - s]),
        v
      ), l = o.repeat(" ", r.indent) + f((c.line - s + 1).toString(), g) + " | " + p.str + `
` + l;
    for (p = h(c.buffer, n[i], t[i], c.position, v), l += o.repeat(" ", r.indent) + f((c.line + 1).toString(), g) + " | " + p.str + `
`, l += o.repeat("-", r.indent + g + 3 + p.pos) + `^
`, s = 1; s <= r.linesAfter && !(i + s >= t.length); s++)
      p = h(
        c.buffer,
        n[i + s],
        t[i + s],
        c.position - (n[i] - n[i + s]),
        v
      ), l += o.repeat(" ", r.indent) + f((c.line + s + 1).toString(), g) + " | " + p.str + `
`;
    return l.replace(/\n$/, "");
  }
  return Mn = d, Mn;
}
var Bn, oa;
function He() {
  if (oa) return Bn;
  oa = 1;
  var o = yr(), h = [
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
  ], f = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function d(r) {
    var e = {};
    return r !== null && Object.keys(r).forEach(function(n) {
      r[n].forEach(function(t) {
        e[String(t)] = n;
      });
    }), e;
  }
  function c(r, e) {
    if (e = e || {}, Object.keys(e).forEach(function(n) {
      if (h.indexOf(n) === -1)
        throw new o('Unknown option "' + n + '" is met in definition of "' + r + '" YAML type.');
    }), this.options = e, this.tag = r, this.kind = e.kind || null, this.resolve = e.resolve || function() {
      return !0;
    }, this.construct = e.construct || function(n) {
      return n;
    }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.representName = e.representName || null, this.defaultStyle = e.defaultStyle || null, this.multi = e.multi || !1, this.styleAliases = d(e.styleAliases || null), f.indexOf(this.kind) === -1)
      throw new o('Unknown kind "' + this.kind + '" is specified for "' + r + '" YAML type.');
  }
  return Bn = c, Bn;
}
var jn, sa;
function $u() {
  if (sa) return jn;
  sa = 1;
  var o = yr(), h = He();
  function f(r, e) {
    var n = [];
    return r[e].forEach(function(t) {
      var a = n.length;
      n.forEach(function(i, l) {
        i.tag === t.tag && i.kind === t.kind && i.multi === t.multi && (a = l);
      }), n[a] = t;
    }), n;
  }
  function d() {
    var r = {
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
    }, e, n;
    function t(a) {
      a.multi ? (r.multi[a.kind].push(a), r.multi.fallback.push(a)) : r[a.kind][a.tag] = r.fallback[a.tag] = a;
    }
    for (e = 0, n = arguments.length; e < n; e += 1)
      arguments[e].forEach(t);
    return r;
  }
  function c(r) {
    return this.extend(r);
  }
  return c.prototype.extend = function(e) {
    var n = [], t = [];
    if (e instanceof h)
      t.push(e);
    else if (Array.isArray(e))
      t = t.concat(e);
    else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
      e.implicit && (n = n.concat(e.implicit)), e.explicit && (t = t.concat(e.explicit));
    else
      throw new o("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    n.forEach(function(i) {
      if (!(i instanceof h))
        throw new o("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (i.loadKind && i.loadKind !== "scalar")
        throw new o("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (i.multi)
        throw new o("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), t.forEach(function(i) {
      if (!(i instanceof h))
        throw new o("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var a = Object.create(c.prototype);
    return a.implicit = (this.implicit || []).concat(n), a.explicit = (this.explicit || []).concat(t), a.compiledImplicit = f(a, "implicit"), a.compiledExplicit = f(a, "explicit"), a.compiledTypeMap = d(a.compiledImplicit, a.compiledExplicit), a;
  }, jn = c, jn;
}
var Hn, aa;
function Uu() {
  if (aa) return Hn;
  aa = 1;
  var o = He();
  return Hn = new o("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(h) {
      return h !== null ? h : "";
    }
  }), Hn;
}
var Gn, la;
function ku() {
  if (la) return Gn;
  la = 1;
  var o = He();
  return Gn = new o("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(h) {
      return h !== null ? h : [];
    }
  }), Gn;
}
var Vn, ua;
function qu() {
  if (ua) return Vn;
  ua = 1;
  var o = He();
  return Vn = new o("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(h) {
      return h !== null ? h : {};
    }
  }), Vn;
}
var Wn, ca;
function Mu() {
  if (ca) return Wn;
  ca = 1;
  var o = $u();
  return Wn = new o({
    explicit: [
      Uu(),
      ku(),
      qu()
    ]
  }), Wn;
}
var zn, fa;
function Bu() {
  if (fa) return zn;
  fa = 1;
  var o = He();
  function h(c) {
    if (c === null) return !0;
    var r = c.length;
    return r === 1 && c === "~" || r === 4 && (c === "null" || c === "Null" || c === "NULL");
  }
  function f() {
    return null;
  }
  function d(c) {
    return c === null;
  }
  return zn = new o("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: h,
    construct: f,
    predicate: d,
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
  }), zn;
}
var Yn, da;
function ju() {
  if (da) return Yn;
  da = 1;
  var o = He();
  function h(c) {
    if (c === null) return !1;
    var r = c.length;
    return r === 4 && (c === "true" || c === "True" || c === "TRUE") || r === 5 && (c === "false" || c === "False" || c === "FALSE");
  }
  function f(c) {
    return c === "true" || c === "True" || c === "TRUE";
  }
  function d(c) {
    return Object.prototype.toString.call(c) === "[object Boolean]";
  }
  return Yn = new o("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: h,
    construct: f,
    predicate: d,
    represent: {
      lowercase: function(c) {
        return c ? "true" : "false";
      },
      uppercase: function(c) {
        return c ? "TRUE" : "FALSE";
      },
      camelcase: function(c) {
        return c ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), Yn;
}
var Xn, ha;
function Hu() {
  if (ha) return Xn;
  ha = 1;
  var o = vr(), h = He();
  function f(t) {
    return 48 <= t && t <= 57 || 65 <= t && t <= 70 || 97 <= t && t <= 102;
  }
  function d(t) {
    return 48 <= t && t <= 55;
  }
  function c(t) {
    return 48 <= t && t <= 57;
  }
  function r(t) {
    if (t === null) return !1;
    var a = t.length, i = 0, l = !1, s;
    if (!a) return !1;
    if (s = t[i], (s === "-" || s === "+") && (s = t[++i]), s === "0") {
      if (i + 1 === a) return !0;
      if (s = t[++i], s === "b") {
        for (i++; i < a; i++)
          if (s = t[i], s !== "_") {
            if (s !== "0" && s !== "1") return !1;
            l = !0;
          }
        return l && s !== "_";
      }
      if (s === "x") {
        for (i++; i < a; i++)
          if (s = t[i], s !== "_") {
            if (!f(t.charCodeAt(i))) return !1;
            l = !0;
          }
        return l && s !== "_";
      }
      if (s === "o") {
        for (i++; i < a; i++)
          if (s = t[i], s !== "_") {
            if (!d(t.charCodeAt(i))) return !1;
            l = !0;
          }
        return l && s !== "_";
      }
    }
    if (s === "_") return !1;
    for (; i < a; i++)
      if (s = t[i], s !== "_") {
        if (!c(t.charCodeAt(i)))
          return !1;
        l = !0;
      }
    return !(!l || s === "_");
  }
  function e(t) {
    var a = t, i = 1, l;
    if (a.indexOf("_") !== -1 && (a = a.replace(/_/g, "")), l = a[0], (l === "-" || l === "+") && (l === "-" && (i = -1), a = a.slice(1), l = a[0]), a === "0") return 0;
    if (l === "0") {
      if (a[1] === "b") return i * parseInt(a.slice(2), 2);
      if (a[1] === "x") return i * parseInt(a.slice(2), 16);
      if (a[1] === "o") return i * parseInt(a.slice(2), 8);
    }
    return i * parseInt(a, 10);
  }
  function n(t) {
    return Object.prototype.toString.call(t) === "[object Number]" && t % 1 === 0 && !o.isNegativeZero(t);
  }
  return Xn = new h("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: r,
    construct: e,
    predicate: n,
    represent: {
      binary: function(t) {
        return t >= 0 ? "0b" + t.toString(2) : "-0b" + t.toString(2).slice(1);
      },
      octal: function(t) {
        return t >= 0 ? "0o" + t.toString(8) : "-0o" + t.toString(8).slice(1);
      },
      decimal: function(t) {
        return t.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(t) {
        return t >= 0 ? "0x" + t.toString(16).toUpperCase() : "-0x" + t.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), Xn;
}
var Jn, pa;
function Gu() {
  if (pa) return Jn;
  pa = 1;
  var o = vr(), h = He(), f = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function d(t) {
    return !(t === null || !f.test(t) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    t[t.length - 1] === "_");
  }
  function c(t) {
    var a, i;
    return a = t.replace(/_/g, "").toLowerCase(), i = a[0] === "-" ? -1 : 1, "+-".indexOf(a[0]) >= 0 && (a = a.slice(1)), a === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : a === ".nan" ? NaN : i * parseFloat(a, 10);
  }
  var r = /^[-+]?[0-9]+e/;
  function e(t, a) {
    var i;
    if (isNaN(t))
      switch (a) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === t)
      switch (a) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === t)
      switch (a) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (o.isNegativeZero(t))
      return "-0.0";
    return i = t.toString(10), r.test(i) ? i.replace("e", ".e") : i;
  }
  function n(t) {
    return Object.prototype.toString.call(t) === "[object Number]" && (t % 1 !== 0 || o.isNegativeZero(t));
  }
  return Jn = new h("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: d,
    construct: c,
    predicate: n,
    represent: e,
    defaultStyle: "lowercase"
  }), Jn;
}
var Kn, ma;
function Vu() {
  return ma || (ma = 1, Kn = Mu().extend({
    implicit: [
      Bu(),
      ju(),
      Hu(),
      Gu()
    ]
  })), Kn;
}
var Qn, ga;
function Wu() {
  return ga || (ga = 1, Qn = Vu()), Qn;
}
var Zn, va;
function zu() {
  if (va) return Zn;
  va = 1;
  var o = He(), h = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), f = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function d(e) {
    return e === null ? !1 : h.exec(e) !== null || f.exec(e) !== null;
  }
  function c(e) {
    var n, t, a, i, l, s, p, g = 0, v = null, m, b, R;
    if (n = h.exec(e), n === null && (n = f.exec(e)), n === null) throw new Error("Date resolve error");
    if (t = +n[1], a = +n[2] - 1, i = +n[3], !n[4])
      return new Date(Date.UTC(t, a, i));
    if (l = +n[4], s = +n[5], p = +n[6], n[7]) {
      for (g = n[7].slice(0, 3); g.length < 3; )
        g += "0";
      g = +g;
    }
    return n[9] && (m = +n[10], b = +(n[11] || 0), v = (m * 60 + b) * 6e4, n[9] === "-" && (v = -v)), R = new Date(Date.UTC(t, a, i, l, s, p, g)), v && R.setTime(R.getTime() - v), R;
  }
  function r(e) {
    return e.toISOString();
  }
  return Zn = new o("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: d,
    construct: c,
    instanceOf: Date,
    represent: r
  }), Zn;
}
var ei, ya;
function Yu() {
  if (ya) return ei;
  ya = 1;
  var o = He();
  function h(f) {
    return f === "<<" || f === null;
  }
  return ei = new o("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: h
  }), ei;
}
var ti, Ea;
function Xu() {
  if (Ea) return ti;
  Ea = 1;
  var o = He(), h = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function f(e) {
    if (e === null) return !1;
    var n, t, a = 0, i = e.length, l = h;
    for (t = 0; t < i; t++)
      if (n = l.indexOf(e.charAt(t)), !(n > 64)) {
        if (n < 0) return !1;
        a += 6;
      }
    return a % 8 === 0;
  }
  function d(e) {
    var n, t, a = e.replace(/[\r\n=]/g, ""), i = a.length, l = h, s = 0, p = [];
    for (n = 0; n < i; n++)
      n % 4 === 0 && n && (p.push(s >> 16 & 255), p.push(s >> 8 & 255), p.push(s & 255)), s = s << 6 | l.indexOf(a.charAt(n));
    return t = i % 4 * 6, t === 0 ? (p.push(s >> 16 & 255), p.push(s >> 8 & 255), p.push(s & 255)) : t === 18 ? (p.push(s >> 10 & 255), p.push(s >> 2 & 255)) : t === 12 && p.push(s >> 4 & 255), new Uint8Array(p);
  }
  function c(e) {
    var n = "", t = 0, a, i, l = e.length, s = h;
    for (a = 0; a < l; a++)
      a % 3 === 0 && a && (n += s[t >> 18 & 63], n += s[t >> 12 & 63], n += s[t >> 6 & 63], n += s[t & 63]), t = (t << 8) + e[a];
    return i = l % 3, i === 0 ? (n += s[t >> 18 & 63], n += s[t >> 12 & 63], n += s[t >> 6 & 63], n += s[t & 63]) : i === 2 ? (n += s[t >> 10 & 63], n += s[t >> 4 & 63], n += s[t << 2 & 63], n += s[64]) : i === 1 && (n += s[t >> 2 & 63], n += s[t << 4 & 63], n += s[64], n += s[64]), n;
  }
  function r(e) {
    return Object.prototype.toString.call(e) === "[object Uint8Array]";
  }
  return ti = new o("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: f,
    construct: d,
    predicate: r,
    represent: c
  }), ti;
}
var ri, wa;
function Ju() {
  if (wa) return ri;
  wa = 1;
  var o = He(), h = Object.prototype.hasOwnProperty, f = Object.prototype.toString;
  function d(r) {
    if (r === null) return !0;
    var e = [], n, t, a, i, l, s = r;
    for (n = 0, t = s.length; n < t; n += 1) {
      if (a = s[n], l = !1, f.call(a) !== "[object Object]") return !1;
      for (i in a)
        if (h.call(a, i))
          if (!l) l = !0;
          else return !1;
      if (!l) return !1;
      if (e.indexOf(i) === -1) e.push(i);
      else return !1;
    }
    return !0;
  }
  function c(r) {
    return r !== null ? r : [];
  }
  return ri = new o("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: d,
    construct: c
  }), ri;
}
var ni, _a;
function Ku() {
  if (_a) return ni;
  _a = 1;
  var o = He(), h = Object.prototype.toString;
  function f(c) {
    if (c === null) return !0;
    var r, e, n, t, a, i = c;
    for (a = new Array(i.length), r = 0, e = i.length; r < e; r += 1) {
      if (n = i[r], h.call(n) !== "[object Object]" || (t = Object.keys(n), t.length !== 1)) return !1;
      a[r] = [t[0], n[t[0]]];
    }
    return !0;
  }
  function d(c) {
    if (c === null) return [];
    var r, e, n, t, a, i = c;
    for (a = new Array(i.length), r = 0, e = i.length; r < e; r += 1)
      n = i[r], t = Object.keys(n), a[r] = [t[0], n[t[0]]];
    return a;
  }
  return ni = new o("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: f,
    construct: d
  }), ni;
}
var ii, Sa;
function Qu() {
  if (Sa) return ii;
  Sa = 1;
  var o = He(), h = Object.prototype.hasOwnProperty;
  function f(c) {
    if (c === null) return !0;
    var r, e = c;
    for (r in e)
      if (h.call(e, r) && e[r] !== null)
        return !1;
    return !0;
  }
  function d(c) {
    return c !== null ? c : {};
  }
  return ii = new o("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: f,
    construct: d
  }), ii;
}
var oi, Aa;
function Fo() {
  return Aa || (Aa = 1, oi = Wu().extend({
    implicit: [
      zu(),
      Yu()
    ],
    explicit: [
      Xu(),
      Ju(),
      Ku(),
      Qu()
    ]
  })), oi;
}
var ba;
function sd() {
  if (ba) return $r;
  ba = 1;
  var o = vr(), h = yr(), f = od(), d = Fo(), c = Object.prototype.hasOwnProperty, r = 1, e = 2, n = 3, t = 4, a = 1, i = 2, l = 3, s = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, p = /[\x85\u2028\u2029]/, g = /[,\[\]\{\}]/, v = /^(?:!|!!|![a-z\-]+!)$/i, m = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function b(u) {
    return Object.prototype.toString.call(u);
  }
  function R(u) {
    return u === 10 || u === 13;
  }
  function O(u) {
    return u === 9 || u === 32;
  }
  function D(u) {
    return u === 9 || u === 32 || u === 10 || u === 13;
  }
  function $(u) {
    return u === 44 || u === 91 || u === 93 || u === 123 || u === 125;
  }
  function w(u) {
    var B;
    return 48 <= u && u <= 57 ? u - 48 : (B = u | 32, 97 <= B && B <= 102 ? B - 97 + 10 : -1);
  }
  function _(u) {
    return u === 120 ? 2 : u === 117 ? 4 : u === 85 ? 8 : 0;
  }
  function S(u) {
    return 48 <= u && u <= 57 ? u - 48 : -1;
  }
  function E(u) {
    return u === 48 ? "\0" : u === 97 ? "\x07" : u === 98 ? "\b" : u === 116 || u === 9 ? "	" : u === 110 ? `
` : u === 118 ? "\v" : u === 102 ? "\f" : u === 114 ? "\r" : u === 101 ? "\x1B" : u === 32 ? " " : u === 34 ? '"' : u === 47 ? "/" : u === 92 ? "\\" : u === 78 ? "" : u === 95 ? " " : u === 76 ? "\u2028" : u === 80 ? "\u2029" : "";
  }
  function q(u) {
    return u <= 65535 ? String.fromCharCode(u) : String.fromCharCode(
      (u - 65536 >> 10) + 55296,
      (u - 65536 & 1023) + 56320
    );
  }
  for (var F = new Array(256), N = new Array(256), k = 0; k < 256; k++)
    F[k] = E(k) ? 1 : 0, N[k] = E(k);
  function P(u, B) {
    this.input = u, this.filename = B.filename || null, this.schema = B.schema || d, this.onWarning = B.onWarning || null, this.legacy = B.legacy || !1, this.json = B.json || !1, this.listener = B.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = u.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function I(u, B) {
    var G = {
      name: u.filename,
      buffer: u.input.slice(0, -1),
      // omit trailing \0
      position: u.position,
      line: u.line,
      column: u.position - u.lineStart
    };
    return G.snippet = f(G), new h(B, G);
  }
  function L(u, B) {
    throw I(u, B);
  }
  function M(u, B) {
    u.onWarning && u.onWarning.call(null, I(u, B));
  }
  var K = {
    YAML: function(B, G, re) {
      var W, te, Z;
      B.version !== null && L(B, "duplication of %YAML directive"), re.length !== 1 && L(B, "YAML directive accepts exactly one argument"), W = /^([0-9]+)\.([0-9]+)$/.exec(re[0]), W === null && L(B, "ill-formed argument of the YAML directive"), te = parseInt(W[1], 10), Z = parseInt(W[2], 10), te !== 1 && L(B, "unacceptable YAML version of the document"), B.version = re[0], B.checkLineBreaks = Z < 2, Z !== 1 && Z !== 2 && M(B, "unsupported YAML version of the document");
    },
    TAG: function(B, G, re) {
      var W, te;
      re.length !== 2 && L(B, "TAG directive accepts exactly two arguments"), W = re[0], te = re[1], v.test(W) || L(B, "ill-formed tag handle (first argument) of the TAG directive"), c.call(B.tagMap, W) && L(B, 'there is a previously declared suffix for "' + W + '" tag handle'), m.test(te) || L(B, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        te = decodeURIComponent(te);
      } catch {
        L(B, "tag prefix is malformed: " + te);
      }
      B.tagMap[W] = te;
    }
  };
  function V(u, B, G, re) {
    var W, te, Z, oe;
    if (B < G) {
      if (oe = u.input.slice(B, G), re)
        for (W = 0, te = oe.length; W < te; W += 1)
          Z = oe.charCodeAt(W), Z === 9 || 32 <= Z && Z <= 1114111 || L(u, "expected valid JSON character");
      else s.test(oe) && L(u, "the stream contains non-printable characters");
      u.result += oe;
    }
  }
  function ne(u, B, G, re) {
    var W, te, Z, oe;
    for (o.isObject(G) || L(u, "cannot merge mappings; the provided source object is unacceptable"), W = Object.keys(G), Z = 0, oe = W.length; Z < oe; Z += 1)
      te = W[Z], c.call(B, te) || (B[te] = G[te], re[te] = !0);
  }
  function ce(u, B, G, re, W, te, Z, oe, ge) {
    var ve, Re;
    if (Array.isArray(W))
      for (W = Array.prototype.slice.call(W), ve = 0, Re = W.length; ve < Re; ve += 1)
        Array.isArray(W[ve]) && L(u, "nested arrays are not supported inside keys"), typeof W == "object" && b(W[ve]) === "[object Object]" && (W[ve] = "[object Object]");
    if (typeof W == "object" && b(W) === "[object Object]" && (W = "[object Object]"), W = String(W), B === null && (B = {}), re === "tag:yaml.org,2002:merge")
      if (Array.isArray(te))
        for (ve = 0, Re = te.length; ve < Re; ve += 1)
          ne(u, B, te[ve], G);
      else
        ne(u, B, te, G);
    else
      !u.json && !c.call(G, W) && c.call(B, W) && (u.line = Z || u.line, u.lineStart = oe || u.lineStart, u.position = ge || u.position, L(u, "duplicated mapping key")), W === "__proto__" ? Object.defineProperty(B, W, {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        value: te
      }) : B[W] = te, delete G[W];
    return B;
  }
  function ue(u) {
    var B;
    B = u.input.charCodeAt(u.position), B === 10 ? u.position++ : B === 13 ? (u.position++, u.input.charCodeAt(u.position) === 10 && u.position++) : L(u, "a line break is expected"), u.line += 1, u.lineStart = u.position, u.firstTabInLine = -1;
  }
  function ie(u, B, G) {
    for (var re = 0, W = u.input.charCodeAt(u.position); W !== 0; ) {
      for (; O(W); )
        W === 9 && u.firstTabInLine === -1 && (u.firstTabInLine = u.position), W = u.input.charCodeAt(++u.position);
      if (B && W === 35)
        do
          W = u.input.charCodeAt(++u.position);
        while (W !== 10 && W !== 13 && W !== 0);
      if (R(W))
        for (ue(u), W = u.input.charCodeAt(u.position), re++, u.lineIndent = 0; W === 32; )
          u.lineIndent++, W = u.input.charCodeAt(++u.position);
      else
        break;
    }
    return G !== -1 && re !== 0 && u.lineIndent < G && M(u, "deficient indentation"), re;
  }
  function Te(u) {
    var B = u.position, G;
    return G = u.input.charCodeAt(B), !!((G === 45 || G === 46) && G === u.input.charCodeAt(B + 1) && G === u.input.charCodeAt(B + 2) && (B += 3, G = u.input.charCodeAt(B), G === 0 || D(G)));
  }
  function J(u, B) {
    B === 1 ? u.result += " " : B > 1 && (u.result += o.repeat(`
`, B - 1));
  }
  function ye(u, B, G) {
    var re, W, te, Z, oe, ge, ve, Re, de = u.kind, Le = u.result, A;
    if (A = u.input.charCodeAt(u.position), D(A) || $(A) || A === 35 || A === 38 || A === 42 || A === 33 || A === 124 || A === 62 || A === 39 || A === 34 || A === 37 || A === 64 || A === 96 || (A === 63 || A === 45) && (W = u.input.charCodeAt(u.position + 1), D(W) || G && $(W)))
      return !1;
    for (u.kind = "scalar", u.result = "", te = Z = u.position, oe = !1; A !== 0; ) {
      if (A === 58) {
        if (W = u.input.charCodeAt(u.position + 1), D(W) || G && $(W))
          break;
      } else if (A === 35) {
        if (re = u.input.charCodeAt(u.position - 1), D(re))
          break;
      } else {
        if (u.position === u.lineStart && Te(u) || G && $(A))
          break;
        if (R(A))
          if (ge = u.line, ve = u.lineStart, Re = u.lineIndent, ie(u, !1, -1), u.lineIndent >= B) {
            oe = !0, A = u.input.charCodeAt(u.position);
            continue;
          } else {
            u.position = Z, u.line = ge, u.lineStart = ve, u.lineIndent = Re;
            break;
          }
      }
      oe && (V(u, te, Z, !1), J(u, u.line - ge), te = Z = u.position, oe = !1), O(A) || (Z = u.position + 1), A = u.input.charCodeAt(++u.position);
    }
    return V(u, te, Z, !1), u.result ? !0 : (u.kind = de, u.result = Le, !1);
  }
  function T(u, B) {
    var G, re, W;
    if (G = u.input.charCodeAt(u.position), G !== 39)
      return !1;
    for (u.kind = "scalar", u.result = "", u.position++, re = W = u.position; (G = u.input.charCodeAt(u.position)) !== 0; )
      if (G === 39)
        if (V(u, re, u.position, !0), G = u.input.charCodeAt(++u.position), G === 39)
          re = u.position, u.position++, W = u.position;
        else
          return !0;
      else R(G) ? (V(u, re, W, !0), J(u, ie(u, !1, B)), re = W = u.position) : u.position === u.lineStart && Te(u) ? L(u, "unexpected end of the document within a single quoted scalar") : (u.position++, W = u.position);
    L(u, "unexpected end of the stream within a single quoted scalar");
  }
  function y(u, B) {
    var G, re, W, te, Z, oe;
    if (oe = u.input.charCodeAt(u.position), oe !== 34)
      return !1;
    for (u.kind = "scalar", u.result = "", u.position++, G = re = u.position; (oe = u.input.charCodeAt(u.position)) !== 0; ) {
      if (oe === 34)
        return V(u, G, u.position, !0), u.position++, !0;
      if (oe === 92) {
        if (V(u, G, u.position, !0), oe = u.input.charCodeAt(++u.position), R(oe))
          ie(u, !1, B);
        else if (oe < 256 && F[oe])
          u.result += N[oe], u.position++;
        else if ((Z = _(oe)) > 0) {
          for (W = Z, te = 0; W > 0; W--)
            oe = u.input.charCodeAt(++u.position), (Z = w(oe)) >= 0 ? te = (te << 4) + Z : L(u, "expected hexadecimal character");
          u.result += q(te), u.position++;
        } else
          L(u, "unknown escape sequence");
        G = re = u.position;
      } else R(oe) ? (V(u, G, re, !0), J(u, ie(u, !1, B)), G = re = u.position) : u.position === u.lineStart && Te(u) ? L(u, "unexpected end of the document within a double quoted scalar") : (u.position++, re = u.position);
    }
    L(u, "unexpected end of the stream within a double quoted scalar");
  }
  function j(u, B) {
    var G = !0, re, W, te, Z = u.tag, oe, ge = u.anchor, ve, Re, de, Le, A, H = /* @__PURE__ */ Object.create(null), X, z, Q, ee;
    if (ee = u.input.charCodeAt(u.position), ee === 91)
      Re = 93, A = !1, oe = [];
    else if (ee === 123)
      Re = 125, A = !0, oe = {};
    else
      return !1;
    for (u.anchor !== null && (u.anchorMap[u.anchor] = oe), ee = u.input.charCodeAt(++u.position); ee !== 0; ) {
      if (ie(u, !0, B), ee = u.input.charCodeAt(u.position), ee === Re)
        return u.position++, u.tag = Z, u.anchor = ge, u.kind = A ? "mapping" : "sequence", u.result = oe, !0;
      G ? ee === 44 && L(u, "expected the node content, but found ','") : L(u, "missed comma between flow collection entries"), z = X = Q = null, de = Le = !1, ee === 63 && (ve = u.input.charCodeAt(u.position + 1), D(ve) && (de = Le = !0, u.position++, ie(u, !0, B))), re = u.line, W = u.lineStart, te = u.position, xe(u, B, r, !1, !0), z = u.tag, X = u.result, ie(u, !0, B), ee = u.input.charCodeAt(u.position), (Le || u.line === re) && ee === 58 && (de = !0, ee = u.input.charCodeAt(++u.position), ie(u, !0, B), xe(u, B, r, !1, !0), Q = u.result), A ? ce(u, oe, H, z, X, Q, re, W, te) : de ? oe.push(ce(u, null, H, z, X, Q, re, W, te)) : oe.push(X), ie(u, !0, B), ee = u.input.charCodeAt(u.position), ee === 44 ? (G = !0, ee = u.input.charCodeAt(++u.position)) : G = !1;
    }
    L(u, "unexpected end of the stream within a flow collection");
  }
  function x(u, B) {
    var G, re, W = a, te = !1, Z = !1, oe = B, ge = 0, ve = !1, Re, de;
    if (de = u.input.charCodeAt(u.position), de === 124)
      re = !1;
    else if (de === 62)
      re = !0;
    else
      return !1;
    for (u.kind = "scalar", u.result = ""; de !== 0; )
      if (de = u.input.charCodeAt(++u.position), de === 43 || de === 45)
        a === W ? W = de === 43 ? l : i : L(u, "repeat of a chomping mode identifier");
      else if ((Re = S(de)) >= 0)
        Re === 0 ? L(u, "bad explicit indentation width of a block scalar; it cannot be less than one") : Z ? L(u, "repeat of an indentation width identifier") : (oe = B + Re - 1, Z = !0);
      else
        break;
    if (O(de)) {
      do
        de = u.input.charCodeAt(++u.position);
      while (O(de));
      if (de === 35)
        do
          de = u.input.charCodeAt(++u.position);
        while (!R(de) && de !== 0);
    }
    for (; de !== 0; ) {
      for (ue(u), u.lineIndent = 0, de = u.input.charCodeAt(u.position); (!Z || u.lineIndent < oe) && de === 32; )
        u.lineIndent++, de = u.input.charCodeAt(++u.position);
      if (!Z && u.lineIndent > oe && (oe = u.lineIndent), R(de)) {
        ge++;
        continue;
      }
      if (u.lineIndent < oe) {
        W === l ? u.result += o.repeat(`
`, te ? 1 + ge : ge) : W === a && te && (u.result += `
`);
        break;
      }
      for (re ? O(de) ? (ve = !0, u.result += o.repeat(`
`, te ? 1 + ge : ge)) : ve ? (ve = !1, u.result += o.repeat(`
`, ge + 1)) : ge === 0 ? te && (u.result += " ") : u.result += o.repeat(`
`, ge) : u.result += o.repeat(`
`, te ? 1 + ge : ge), te = !0, Z = !0, ge = 0, G = u.position; !R(de) && de !== 0; )
        de = u.input.charCodeAt(++u.position);
      V(u, G, u.position, !1);
    }
    return !0;
  }
  function le(u, B) {
    var G, re = u.tag, W = u.anchor, te = [], Z, oe = !1, ge;
    if (u.firstTabInLine !== -1) return !1;
    for (u.anchor !== null && (u.anchorMap[u.anchor] = te), ge = u.input.charCodeAt(u.position); ge !== 0 && (u.firstTabInLine !== -1 && (u.position = u.firstTabInLine, L(u, "tab characters must not be used in indentation")), !(ge !== 45 || (Z = u.input.charCodeAt(u.position + 1), !D(Z)))); ) {
      if (oe = !0, u.position++, ie(u, !0, -1) && u.lineIndent <= B) {
        te.push(null), ge = u.input.charCodeAt(u.position);
        continue;
      }
      if (G = u.line, xe(u, B, n, !1, !0), te.push(u.result), ie(u, !0, -1), ge = u.input.charCodeAt(u.position), (u.line === G || u.lineIndent > B) && ge !== 0)
        L(u, "bad indentation of a sequence entry");
      else if (u.lineIndent < B)
        break;
    }
    return oe ? (u.tag = re, u.anchor = W, u.kind = "sequence", u.result = te, !0) : !1;
  }
  function me(u, B, G) {
    var re, W, te, Z, oe, ge, ve = u.tag, Re = u.anchor, de = {}, Le = /* @__PURE__ */ Object.create(null), A = null, H = null, X = null, z = !1, Q = !1, ee;
    if (u.firstTabInLine !== -1) return !1;
    for (u.anchor !== null && (u.anchorMap[u.anchor] = de), ee = u.input.charCodeAt(u.position); ee !== 0; ) {
      if (!z && u.firstTabInLine !== -1 && (u.position = u.firstTabInLine, L(u, "tab characters must not be used in indentation")), re = u.input.charCodeAt(u.position + 1), te = u.line, (ee === 63 || ee === 58) && D(re))
        ee === 63 ? (z && (ce(u, de, Le, A, H, null, Z, oe, ge), A = H = X = null), Q = !0, z = !0, W = !0) : z ? (z = !1, W = !0) : L(u, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), u.position += 1, ee = re;
      else {
        if (Z = u.line, oe = u.lineStart, ge = u.position, !xe(u, G, e, !1, !0))
          break;
        if (u.line === te) {
          for (ee = u.input.charCodeAt(u.position); O(ee); )
            ee = u.input.charCodeAt(++u.position);
          if (ee === 58)
            ee = u.input.charCodeAt(++u.position), D(ee) || L(u, "a whitespace character is expected after the key-value separator within a block mapping"), z && (ce(u, de, Le, A, H, null, Z, oe, ge), A = H = X = null), Q = !0, z = !1, W = !1, A = u.tag, H = u.result;
          else if (Q)
            L(u, "can not read an implicit mapping pair; a colon is missed");
          else
            return u.tag = ve, u.anchor = Re, !0;
        } else if (Q)
          L(u, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return u.tag = ve, u.anchor = Re, !0;
      }
      if ((u.line === te || u.lineIndent > B) && (z && (Z = u.line, oe = u.lineStart, ge = u.position), xe(u, B, t, !0, W) && (z ? H = u.result : X = u.result), z || (ce(u, de, Le, A, H, X, Z, oe, ge), A = H = X = null), ie(u, !0, -1), ee = u.input.charCodeAt(u.position)), (u.line === te || u.lineIndent > B) && ee !== 0)
        L(u, "bad indentation of a mapping entry");
      else if (u.lineIndent < B)
        break;
    }
    return z && ce(u, de, Le, A, H, null, Z, oe, ge), Q && (u.tag = ve, u.anchor = Re, u.kind = "mapping", u.result = de), Q;
  }
  function pe(u) {
    var B, G = !1, re = !1, W, te, Z;
    if (Z = u.input.charCodeAt(u.position), Z !== 33) return !1;
    if (u.tag !== null && L(u, "duplication of a tag property"), Z = u.input.charCodeAt(++u.position), Z === 60 ? (G = !0, Z = u.input.charCodeAt(++u.position)) : Z === 33 ? (re = !0, W = "!!", Z = u.input.charCodeAt(++u.position)) : W = "!", B = u.position, G) {
      do
        Z = u.input.charCodeAt(++u.position);
      while (Z !== 0 && Z !== 62);
      u.position < u.length ? (te = u.input.slice(B, u.position), Z = u.input.charCodeAt(++u.position)) : L(u, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; Z !== 0 && !D(Z); )
        Z === 33 && (re ? L(u, "tag suffix cannot contain exclamation marks") : (W = u.input.slice(B - 1, u.position + 1), v.test(W) || L(u, "named tag handle cannot contain such characters"), re = !0, B = u.position + 1)), Z = u.input.charCodeAt(++u.position);
      te = u.input.slice(B, u.position), g.test(te) && L(u, "tag suffix cannot contain flow indicator characters");
    }
    te && !m.test(te) && L(u, "tag name cannot contain such characters: " + te);
    try {
      te = decodeURIComponent(te);
    } catch {
      L(u, "tag name is malformed: " + te);
    }
    return G ? u.tag = te : c.call(u.tagMap, W) ? u.tag = u.tagMap[W] + te : W === "!" ? u.tag = "!" + te : W === "!!" ? u.tag = "tag:yaml.org,2002:" + te : L(u, 'undeclared tag handle "' + W + '"'), !0;
  }
  function _e(u) {
    var B, G;
    if (G = u.input.charCodeAt(u.position), G !== 38) return !1;
    for (u.anchor !== null && L(u, "duplication of an anchor property"), G = u.input.charCodeAt(++u.position), B = u.position; G !== 0 && !D(G) && !$(G); )
      G = u.input.charCodeAt(++u.position);
    return u.position === B && L(u, "name of an anchor node must contain at least one character"), u.anchor = u.input.slice(B, u.position), !0;
  }
  function Ee(u) {
    var B, G, re;
    if (re = u.input.charCodeAt(u.position), re !== 42) return !1;
    for (re = u.input.charCodeAt(++u.position), B = u.position; re !== 0 && !D(re) && !$(re); )
      re = u.input.charCodeAt(++u.position);
    return u.position === B && L(u, "name of an alias node must contain at least one character"), G = u.input.slice(B, u.position), c.call(u.anchorMap, G) || L(u, 'unidentified alias "' + G + '"'), u.result = u.anchorMap[G], ie(u, !0, -1), !0;
  }
  function xe(u, B, G, re, W) {
    var te, Z, oe, ge = 1, ve = !1, Re = !1, de, Le, A, H, X, z;
    if (u.listener !== null && u.listener("open", u), u.tag = null, u.anchor = null, u.kind = null, u.result = null, te = Z = oe = t === G || n === G, re && ie(u, !0, -1) && (ve = !0, u.lineIndent > B ? ge = 1 : u.lineIndent === B ? ge = 0 : u.lineIndent < B && (ge = -1)), ge === 1)
      for (; pe(u) || _e(u); )
        ie(u, !0, -1) ? (ve = !0, oe = te, u.lineIndent > B ? ge = 1 : u.lineIndent === B ? ge = 0 : u.lineIndent < B && (ge = -1)) : oe = !1;
    if (oe && (oe = ve || W), (ge === 1 || t === G) && (r === G || e === G ? X = B : X = B + 1, z = u.position - u.lineStart, ge === 1 ? oe && (le(u, z) || me(u, z, X)) || j(u, X) ? Re = !0 : (Z && x(u, X) || T(u, X) || y(u, X) ? Re = !0 : Ee(u) ? (Re = !0, (u.tag !== null || u.anchor !== null) && L(u, "alias node should not have any properties")) : ye(u, X, r === G) && (Re = !0, u.tag === null && (u.tag = "?")), u.anchor !== null && (u.anchorMap[u.anchor] = u.result)) : ge === 0 && (Re = oe && le(u, z))), u.tag === null)
      u.anchor !== null && (u.anchorMap[u.anchor] = u.result);
    else if (u.tag === "?") {
      for (u.result !== null && u.kind !== "scalar" && L(u, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + u.kind + '"'), de = 0, Le = u.implicitTypes.length; de < Le; de += 1)
        if (H = u.implicitTypes[de], H.resolve(u.result)) {
          u.result = H.construct(u.result), u.tag = H.tag, u.anchor !== null && (u.anchorMap[u.anchor] = u.result);
          break;
        }
    } else if (u.tag !== "!") {
      if (c.call(u.typeMap[u.kind || "fallback"], u.tag))
        H = u.typeMap[u.kind || "fallback"][u.tag];
      else
        for (H = null, A = u.typeMap.multi[u.kind || "fallback"], de = 0, Le = A.length; de < Le; de += 1)
          if (u.tag.slice(0, A[de].tag.length) === A[de].tag) {
            H = A[de];
            break;
          }
      H || L(u, "unknown tag !<" + u.tag + ">"), u.result !== null && H.kind !== u.kind && L(u, "unacceptable node kind for !<" + u.tag + '> tag; it should be "' + H.kind + '", not "' + u.kind + '"'), H.resolve(u.result, u.tag) ? (u.result = H.construct(u.result, u.tag), u.anchor !== null && (u.anchorMap[u.anchor] = u.result)) : L(u, "cannot resolve a node with !<" + u.tag + "> explicit tag");
    }
    return u.listener !== null && u.listener("close", u), u.tag !== null || u.anchor !== null || Re;
  }
  function Oe(u) {
    var B = u.position, G, re, W, te = !1, Z;
    for (u.version = null, u.checkLineBreaks = u.legacy, u.tagMap = /* @__PURE__ */ Object.create(null), u.anchorMap = /* @__PURE__ */ Object.create(null); (Z = u.input.charCodeAt(u.position)) !== 0 && (ie(u, !0, -1), Z = u.input.charCodeAt(u.position), !(u.lineIndent > 0 || Z !== 37)); ) {
      for (te = !0, Z = u.input.charCodeAt(++u.position), G = u.position; Z !== 0 && !D(Z); )
        Z = u.input.charCodeAt(++u.position);
      for (re = u.input.slice(G, u.position), W = [], re.length < 1 && L(u, "directive name must not be less than one character in length"); Z !== 0; ) {
        for (; O(Z); )
          Z = u.input.charCodeAt(++u.position);
        if (Z === 35) {
          do
            Z = u.input.charCodeAt(++u.position);
          while (Z !== 0 && !R(Z));
          break;
        }
        if (R(Z)) break;
        for (G = u.position; Z !== 0 && !D(Z); )
          Z = u.input.charCodeAt(++u.position);
        W.push(u.input.slice(G, u.position));
      }
      Z !== 0 && ue(u), c.call(K, re) ? K[re](u, re, W) : M(u, 'unknown document directive "' + re + '"');
    }
    if (ie(u, !0, -1), u.lineIndent === 0 && u.input.charCodeAt(u.position) === 45 && u.input.charCodeAt(u.position + 1) === 45 && u.input.charCodeAt(u.position + 2) === 45 ? (u.position += 3, ie(u, !0, -1)) : te && L(u, "directives end mark is expected"), xe(u, u.lineIndent - 1, t, !1, !0), ie(u, !0, -1), u.checkLineBreaks && p.test(u.input.slice(B, u.position)) && M(u, "non-ASCII line breaks are interpreted as content"), u.documents.push(u.result), u.position === u.lineStart && Te(u)) {
      u.input.charCodeAt(u.position) === 46 && (u.position += 3, ie(u, !0, -1));
      return;
    }
    if (u.position < u.length - 1)
      L(u, "end of the stream or a document separator is expected");
    else
      return;
  }
  function qe(u, B) {
    u = String(u), B = B || {}, u.length !== 0 && (u.charCodeAt(u.length - 1) !== 10 && u.charCodeAt(u.length - 1) !== 13 && (u += `
`), u.charCodeAt(0) === 65279 && (u = u.slice(1)));
    var G = new P(u, B), re = u.indexOf("\0");
    for (re !== -1 && (G.position = re, L(G, "null byte is not allowed in input")), G.input += "\0"; G.input.charCodeAt(G.position) === 32; )
      G.lineIndent += 1, G.position += 1;
    for (; G.position < G.length - 1; )
      Oe(G);
    return G.documents;
  }
  function vt(u, B, G) {
    B !== null && typeof B == "object" && typeof G > "u" && (G = B, B = null);
    var re = qe(u, G);
    if (typeof B != "function")
      return re;
    for (var W = 0, te = re.length; W < te; W += 1)
      B(re[W]);
  }
  function ot(u, B) {
    var G = qe(u, B);
    if (G.length !== 0) {
      if (G.length === 1)
        return G[0];
      throw new h("expected a single document in the stream, but found more");
    }
  }
  return $r.loadAll = vt, $r.load = ot, $r;
}
var si = {}, Ta;
function ad() {
  if (Ta) return si;
  Ta = 1;
  var o = vr(), h = yr(), f = Fo(), d = Object.prototype.toString, c = Object.prototype.hasOwnProperty, r = 65279, e = 9, n = 10, t = 13, a = 32, i = 33, l = 34, s = 35, p = 37, g = 38, v = 39, m = 42, b = 44, R = 45, O = 58, D = 61, $ = 62, w = 63, _ = 64, S = 91, E = 93, q = 96, F = 123, N = 124, k = 125, P = {};
  P[0] = "\\0", P[7] = "\\a", P[8] = "\\b", P[9] = "\\t", P[10] = "\\n", P[11] = "\\v", P[12] = "\\f", P[13] = "\\r", P[27] = "\\e", P[34] = '\\"', P[92] = "\\\\", P[133] = "\\N", P[160] = "\\_", P[8232] = "\\L", P[8233] = "\\P";
  var I = [
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
  ], L = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function M(A, H) {
    var X, z, Q, ee, fe, se, he;
    if (H === null) return {};
    for (X = {}, z = Object.keys(H), Q = 0, ee = z.length; Q < ee; Q += 1)
      fe = z[Q], se = String(H[fe]), fe.slice(0, 2) === "!!" && (fe = "tag:yaml.org,2002:" + fe.slice(2)), he = A.compiledTypeMap.fallback[fe], he && c.call(he.styleAliases, se) && (se = he.styleAliases[se]), X[fe] = se;
    return X;
  }
  function K(A) {
    var H, X, z;
    if (H = A.toString(16).toUpperCase(), A <= 255)
      X = "x", z = 2;
    else if (A <= 65535)
      X = "u", z = 4;
    else if (A <= 4294967295)
      X = "U", z = 8;
    else
      throw new h("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + X + o.repeat("0", z - H.length) + H;
  }
  var V = 1, ne = 2;
  function ce(A) {
    this.schema = A.schema || f, this.indent = Math.max(1, A.indent || 2), this.noArrayIndent = A.noArrayIndent || !1, this.skipInvalid = A.skipInvalid || !1, this.flowLevel = o.isNothing(A.flowLevel) ? -1 : A.flowLevel, this.styleMap = M(this.schema, A.styles || null), this.sortKeys = A.sortKeys || !1, this.lineWidth = A.lineWidth || 80, this.noRefs = A.noRefs || !1, this.noCompatMode = A.noCompatMode || !1, this.condenseFlow = A.condenseFlow || !1, this.quotingType = A.quotingType === '"' ? ne : V, this.forceQuotes = A.forceQuotes || !1, this.replacer = typeof A.replacer == "function" ? A.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function ue(A, H) {
    for (var X = o.repeat(" ", H), z = 0, Q = -1, ee = "", fe, se = A.length; z < se; )
      Q = A.indexOf(`
`, z), Q === -1 ? (fe = A.slice(z), z = se) : (fe = A.slice(z, Q + 1), z = Q + 1), fe.length && fe !== `
` && (ee += X), ee += fe;
    return ee;
  }
  function ie(A, H) {
    return `
` + o.repeat(" ", A.indent * H);
  }
  function Te(A, H) {
    var X, z, Q;
    for (X = 0, z = A.implicitTypes.length; X < z; X += 1)
      if (Q = A.implicitTypes[X], Q.resolve(H))
        return !0;
    return !1;
  }
  function J(A) {
    return A === a || A === e;
  }
  function ye(A) {
    return 32 <= A && A <= 126 || 161 <= A && A <= 55295 && A !== 8232 && A !== 8233 || 57344 <= A && A <= 65533 && A !== r || 65536 <= A && A <= 1114111;
  }
  function T(A) {
    return ye(A) && A !== r && A !== t && A !== n;
  }
  function y(A, H, X) {
    var z = T(A), Q = z && !J(A);
    return (
      // ns-plain-safe
      (X ? (
        // c = flow-in
        z
      ) : z && A !== b && A !== S && A !== E && A !== F && A !== k) && A !== s && !(H === O && !Q) || T(H) && !J(H) && A === s || H === O && Q
    );
  }
  function j(A) {
    return ye(A) && A !== r && !J(A) && A !== R && A !== w && A !== O && A !== b && A !== S && A !== E && A !== F && A !== k && A !== s && A !== g && A !== m && A !== i && A !== N && A !== D && A !== $ && A !== v && A !== l && A !== p && A !== _ && A !== q;
  }
  function x(A) {
    return !J(A) && A !== O;
  }
  function le(A, H) {
    var X = A.charCodeAt(H), z;
    return X >= 55296 && X <= 56319 && H + 1 < A.length && (z = A.charCodeAt(H + 1), z >= 56320 && z <= 57343) ? (X - 55296) * 1024 + z - 56320 + 65536 : X;
  }
  function me(A) {
    var H = /^\n* /;
    return H.test(A);
  }
  var pe = 1, _e = 2, Ee = 3, xe = 4, Oe = 5;
  function qe(A, H, X, z, Q, ee, fe, se) {
    var he, we = 0, De = null, Ne = !1, Ce = !1, It = z !== -1, Ke = -1, yt = j(le(A, 0)) && x(le(A, A.length - 1));
    if (H || fe)
      for (he = 0; he < A.length; we >= 65536 ? he += 2 : he++) {
        if (we = le(A, he), !ye(we))
          return Oe;
        yt = yt && y(we, De, se), De = we;
      }
    else {
      for (he = 0; he < A.length; we >= 65536 ? he += 2 : he++) {
        if (we = le(A, he), we === n)
          Ne = !0, It && (Ce = Ce || // Foldable line = too long, and not more-indented.
          he - Ke - 1 > z && A[Ke + 1] !== " ", Ke = he);
        else if (!ye(we))
          return Oe;
        yt = yt && y(we, De, se), De = we;
      }
      Ce = Ce || It && he - Ke - 1 > z && A[Ke + 1] !== " ";
    }
    return !Ne && !Ce ? yt && !fe && !Q(A) ? pe : ee === ne ? Oe : _e : X > 9 && me(A) ? Oe : fe ? ee === ne ? Oe : _e : Ce ? xe : Ee;
  }
  function vt(A, H, X, z, Q) {
    A.dump = function() {
      if (H.length === 0)
        return A.quotingType === ne ? '""' : "''";
      if (!A.noCompatMode && (I.indexOf(H) !== -1 || L.test(H)))
        return A.quotingType === ne ? '"' + H + '"' : "'" + H + "'";
      var ee = A.indent * Math.max(1, X), fe = A.lineWidth === -1 ? -1 : Math.max(Math.min(A.lineWidth, 40), A.lineWidth - ee), se = z || A.flowLevel > -1 && X >= A.flowLevel;
      function he(we) {
        return Te(A, we);
      }
      switch (qe(
        H,
        se,
        A.indent,
        fe,
        he,
        A.quotingType,
        A.forceQuotes && !z,
        Q
      )) {
        case pe:
          return H;
        case _e:
          return "'" + H.replace(/'/g, "''") + "'";
        case Ee:
          return "|" + ot(H, A.indent) + u(ue(H, ee));
        case xe:
          return ">" + ot(H, A.indent) + u(ue(B(H, fe), ee));
        case Oe:
          return '"' + re(H) + '"';
        default:
          throw new h("impossible error: invalid scalar style");
      }
    }();
  }
  function ot(A, H) {
    var X = me(A) ? String(H) : "", z = A[A.length - 1] === `
`, Q = z && (A[A.length - 2] === `
` || A === `
`), ee = Q ? "+" : z ? "" : "-";
    return X + ee + `
`;
  }
  function u(A) {
    return A[A.length - 1] === `
` ? A.slice(0, -1) : A;
  }
  function B(A, H) {
    for (var X = /(\n+)([^\n]*)/g, z = function() {
      var we = A.indexOf(`
`);
      return we = we !== -1 ? we : A.length, X.lastIndex = we, G(A.slice(0, we), H);
    }(), Q = A[0] === `
` || A[0] === " ", ee, fe; fe = X.exec(A); ) {
      var se = fe[1], he = fe[2];
      ee = he[0] === " ", z += se + (!Q && !ee && he !== "" ? `
` : "") + G(he, H), Q = ee;
    }
    return z;
  }
  function G(A, H) {
    if (A === "" || A[0] === " ") return A;
    for (var X = / [^ ]/g, z, Q = 0, ee, fe = 0, se = 0, he = ""; z = X.exec(A); )
      se = z.index, se - Q > H && (ee = fe > Q ? fe : se, he += `
` + A.slice(Q, ee), Q = ee + 1), fe = se;
    return he += `
`, A.length - Q > H && fe > Q ? he += A.slice(Q, fe) + `
` + A.slice(fe + 1) : he += A.slice(Q), he.slice(1);
  }
  function re(A) {
    for (var H = "", X = 0, z, Q = 0; Q < A.length; X >= 65536 ? Q += 2 : Q++)
      X = le(A, Q), z = P[X], !z && ye(X) ? (H += A[Q], X >= 65536 && (H += A[Q + 1])) : H += z || K(X);
    return H;
  }
  function W(A, H, X) {
    var z = "", Q = A.tag, ee, fe, se;
    for (ee = 0, fe = X.length; ee < fe; ee += 1)
      se = X[ee], A.replacer && (se = A.replacer.call(X, String(ee), se)), (ve(A, H, se, !1, !1) || typeof se > "u" && ve(A, H, null, !1, !1)) && (z !== "" && (z += "," + (A.condenseFlow ? "" : " ")), z += A.dump);
    A.tag = Q, A.dump = "[" + z + "]";
  }
  function te(A, H, X, z) {
    var Q = "", ee = A.tag, fe, se, he;
    for (fe = 0, se = X.length; fe < se; fe += 1)
      he = X[fe], A.replacer && (he = A.replacer.call(X, String(fe), he)), (ve(A, H + 1, he, !0, !0, !1, !0) || typeof he > "u" && ve(A, H + 1, null, !0, !0, !1, !0)) && ((!z || Q !== "") && (Q += ie(A, H)), A.dump && n === A.dump.charCodeAt(0) ? Q += "-" : Q += "- ", Q += A.dump);
    A.tag = ee, A.dump = Q || "[]";
  }
  function Z(A, H, X) {
    var z = "", Q = A.tag, ee = Object.keys(X), fe, se, he, we, De;
    for (fe = 0, se = ee.length; fe < se; fe += 1)
      De = "", z !== "" && (De += ", "), A.condenseFlow && (De += '"'), he = ee[fe], we = X[he], A.replacer && (we = A.replacer.call(X, he, we)), ve(A, H, he, !1, !1) && (A.dump.length > 1024 && (De += "? "), De += A.dump + (A.condenseFlow ? '"' : "") + ":" + (A.condenseFlow ? "" : " "), ve(A, H, we, !1, !1) && (De += A.dump, z += De));
    A.tag = Q, A.dump = "{" + z + "}";
  }
  function oe(A, H, X, z) {
    var Q = "", ee = A.tag, fe = Object.keys(X), se, he, we, De, Ne, Ce;
    if (A.sortKeys === !0)
      fe.sort();
    else if (typeof A.sortKeys == "function")
      fe.sort(A.sortKeys);
    else if (A.sortKeys)
      throw new h("sortKeys must be a boolean or a function");
    for (se = 0, he = fe.length; se < he; se += 1)
      Ce = "", (!z || Q !== "") && (Ce += ie(A, H)), we = fe[se], De = X[we], A.replacer && (De = A.replacer.call(X, we, De)), ve(A, H + 1, we, !0, !0, !0) && (Ne = A.tag !== null && A.tag !== "?" || A.dump && A.dump.length > 1024, Ne && (A.dump && n === A.dump.charCodeAt(0) ? Ce += "?" : Ce += "? "), Ce += A.dump, Ne && (Ce += ie(A, H)), ve(A, H + 1, De, !0, Ne) && (A.dump && n === A.dump.charCodeAt(0) ? Ce += ":" : Ce += ": ", Ce += A.dump, Q += Ce));
    A.tag = ee, A.dump = Q || "{}";
  }
  function ge(A, H, X) {
    var z, Q, ee, fe, se, he;
    for (Q = X ? A.explicitTypes : A.implicitTypes, ee = 0, fe = Q.length; ee < fe; ee += 1)
      if (se = Q[ee], (se.instanceOf || se.predicate) && (!se.instanceOf || typeof H == "object" && H instanceof se.instanceOf) && (!se.predicate || se.predicate(H))) {
        if (X ? se.multi && se.representName ? A.tag = se.representName(H) : A.tag = se.tag : A.tag = "?", se.represent) {
          if (he = A.styleMap[se.tag] || se.defaultStyle, d.call(se.represent) === "[object Function]")
            z = se.represent(H, he);
          else if (c.call(se.represent, he))
            z = se.represent[he](H, he);
          else
            throw new h("!<" + se.tag + '> tag resolver accepts not "' + he + '" style');
          A.dump = z;
        }
        return !0;
      }
    return !1;
  }
  function ve(A, H, X, z, Q, ee, fe) {
    A.tag = null, A.dump = X, ge(A, X, !1) || ge(A, X, !0);
    var se = d.call(A.dump), he = z, we;
    z && (z = A.flowLevel < 0 || A.flowLevel > H);
    var De = se === "[object Object]" || se === "[object Array]", Ne, Ce;
    if (De && (Ne = A.duplicates.indexOf(X), Ce = Ne !== -1), (A.tag !== null && A.tag !== "?" || Ce || A.indent !== 2 && H > 0) && (Q = !1), Ce && A.usedDuplicates[Ne])
      A.dump = "*ref_" + Ne;
    else {
      if (De && Ce && !A.usedDuplicates[Ne] && (A.usedDuplicates[Ne] = !0), se === "[object Object]")
        z && Object.keys(A.dump).length !== 0 ? (oe(A, H, A.dump, Q), Ce && (A.dump = "&ref_" + Ne + A.dump)) : (Z(A, H, A.dump), Ce && (A.dump = "&ref_" + Ne + " " + A.dump));
      else if (se === "[object Array]")
        z && A.dump.length !== 0 ? (A.noArrayIndent && !fe && H > 0 ? te(A, H - 1, A.dump, Q) : te(A, H, A.dump, Q), Ce && (A.dump = "&ref_" + Ne + A.dump)) : (W(A, H, A.dump), Ce && (A.dump = "&ref_" + Ne + " " + A.dump));
      else if (se === "[object String]")
        A.tag !== "?" && vt(A, A.dump, H, ee, he);
      else {
        if (se === "[object Undefined]")
          return !1;
        if (A.skipInvalid) return !1;
        throw new h("unacceptable kind of an object to dump " + se);
      }
      A.tag !== null && A.tag !== "?" && (we = encodeURI(
        A.tag[0] === "!" ? A.tag.slice(1) : A.tag
      ).replace(/!/g, "%21"), A.tag[0] === "!" ? we = "!" + we : we.slice(0, 18) === "tag:yaml.org,2002:" ? we = "!!" + we.slice(18) : we = "!<" + we + ">", A.dump = we + " " + A.dump);
    }
    return !0;
  }
  function Re(A, H) {
    var X = [], z = [], Q, ee;
    for (de(A, X, z), Q = 0, ee = z.length; Q < ee; Q += 1)
      H.duplicates.push(X[z[Q]]);
    H.usedDuplicates = new Array(ee);
  }
  function de(A, H, X) {
    var z, Q, ee;
    if (A !== null && typeof A == "object")
      if (Q = H.indexOf(A), Q !== -1)
        X.indexOf(Q) === -1 && X.push(Q);
      else if (H.push(A), Array.isArray(A))
        for (Q = 0, ee = A.length; Q < ee; Q += 1)
          de(A[Q], H, X);
      else
        for (z = Object.keys(A), Q = 0, ee = z.length; Q < ee; Q += 1)
          de(A[z[Q]], H, X);
  }
  function Le(A, H) {
    H = H || {};
    var X = new ce(H);
    X.noRefs || Re(A, X);
    var z = A;
    return X.replacer && (z = X.replacer.call({ "": z }, "", z)), ve(X, 0, z, !0, !0) ? X.dump + `
` : "";
  }
  return si.dump = Le, si;
}
var Ra;
function xo() {
  if (Ra) return je;
  Ra = 1;
  var o = sd(), h = ad();
  function f(d, c) {
    return function() {
      throw new Error("Function yaml." + d + " is removed in js-yaml 4. Use yaml." + c + " instead, which is now safe by default.");
    };
  }
  return je.Type = He(), je.Schema = $u(), je.FAILSAFE_SCHEMA = Mu(), je.JSON_SCHEMA = Vu(), je.CORE_SCHEMA = Wu(), je.DEFAULT_SCHEMA = Fo(), je.load = o.load, je.loadAll = o.loadAll, je.dump = h.dump, je.YAMLException = yr(), je.types = {
    binary: Xu(),
    float: Gu(),
    map: qu(),
    null: Bu(),
    pairs: Ku(),
    set: Qu(),
    timestamp: zu(),
    bool: ju(),
    int: Hu(),
    merge: Yu(),
    omap: Ju(),
    seq: ku(),
    str: Uu()
  }, je.safeLoad = f("safeLoad", "load"), je.safeLoadAll = f("safeLoadAll", "loadAll"), je.safeDump = f("safeDump", "dump"), je;
}
var Jt = {}, Ca;
function ld() {
  if (Ca) return Jt;
  Ca = 1, Object.defineProperty(Jt, "__esModule", { value: !0 }), Jt.Lazy = void 0;
  class o {
    constructor(f) {
      this._value = null, this.creator = f;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const f = this.creator();
      return this.value = f, f;
    }
    set value(f) {
      this._value = f, this.creator = null;
    }
  }
  return Jt.Lazy = o, Jt;
}
var Ur = { exports: {} }, ai, Oa;
function Vr() {
  if (Oa) return ai;
  Oa = 1;
  const o = "2.0.0", h = 256, f = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, d = 16, c = h - 6;
  return ai = {
    MAX_LENGTH: h,
    MAX_SAFE_COMPONENT_LENGTH: d,
    MAX_SAFE_BUILD_LENGTH: c,
    MAX_SAFE_INTEGER: f,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: o,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, ai;
}
var li, Da;
function Wr() {
  return Da || (Da = 1, li = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...h) => console.error("SEMVER", ...h) : () => {
  }), li;
}
var Pa;
function Er() {
  return Pa || (Pa = 1, function(o, h) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: f,
      MAX_SAFE_BUILD_LENGTH: d,
      MAX_LENGTH: c
    } = Vr(), r = Wr();
    h = o.exports = {};
    const e = h.re = [], n = h.safeRe = [], t = h.src = [], a = h.safeSrc = [], i = h.t = {};
    let l = 0;
    const s = "[a-zA-Z0-9-]", p = [
      ["\\s", 1],
      ["\\d", c],
      [s, d]
    ], g = (m) => {
      for (const [b, R] of p)
        m = m.split(`${b}*`).join(`${b}{0,${R}}`).split(`${b}+`).join(`${b}{1,${R}}`);
      return m;
    }, v = (m, b, R) => {
      const O = g(b), D = l++;
      r(m, D, b), i[m] = D, t[D] = b, a[D] = O, e[D] = new RegExp(b, R ? "g" : void 0), n[D] = new RegExp(O, R ? "g" : void 0);
    };
    v("NUMERICIDENTIFIER", "0|[1-9]\\d*"), v("NUMERICIDENTIFIERLOOSE", "\\d+"), v("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${s}*`), v("MAINVERSION", `(${t[i.NUMERICIDENTIFIER]})\\.(${t[i.NUMERICIDENTIFIER]})\\.(${t[i.NUMERICIDENTIFIER]})`), v("MAINVERSIONLOOSE", `(${t[i.NUMERICIDENTIFIERLOOSE]})\\.(${t[i.NUMERICIDENTIFIERLOOSE]})\\.(${t[i.NUMERICIDENTIFIERLOOSE]})`), v("PRERELEASEIDENTIFIER", `(?:${t[i.NUMERICIDENTIFIER]}|${t[i.NONNUMERICIDENTIFIER]})`), v("PRERELEASEIDENTIFIERLOOSE", `(?:${t[i.NUMERICIDENTIFIERLOOSE]}|${t[i.NONNUMERICIDENTIFIER]})`), v("PRERELEASE", `(?:-(${t[i.PRERELEASEIDENTIFIER]}(?:\\.${t[i.PRERELEASEIDENTIFIER]})*))`), v("PRERELEASELOOSE", `(?:-?(${t[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${t[i.PRERELEASEIDENTIFIERLOOSE]})*))`), v("BUILDIDENTIFIER", `${s}+`), v("BUILD", `(?:\\+(${t[i.BUILDIDENTIFIER]}(?:\\.${t[i.BUILDIDENTIFIER]})*))`), v("FULLPLAIN", `v?${t[i.MAINVERSION]}${t[i.PRERELEASE]}?${t[i.BUILD]}?`), v("FULL", `^${t[i.FULLPLAIN]}$`), v("LOOSEPLAIN", `[v=\\s]*${t[i.MAINVERSIONLOOSE]}${t[i.PRERELEASELOOSE]}?${t[i.BUILD]}?`), v("LOOSE", `^${t[i.LOOSEPLAIN]}$`), v("GTLT", "((?:<|>)?=?)"), v("XRANGEIDENTIFIERLOOSE", `${t[i.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), v("XRANGEIDENTIFIER", `${t[i.NUMERICIDENTIFIER]}|x|X|\\*`), v("XRANGEPLAIN", `[v=\\s]*(${t[i.XRANGEIDENTIFIER]})(?:\\.(${t[i.XRANGEIDENTIFIER]})(?:\\.(${t[i.XRANGEIDENTIFIER]})(?:${t[i.PRERELEASE]})?${t[i.BUILD]}?)?)?`), v("XRANGEPLAINLOOSE", `[v=\\s]*(${t[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${t[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${t[i.XRANGEIDENTIFIERLOOSE]})(?:${t[i.PRERELEASELOOSE]})?${t[i.BUILD]}?)?)?`), v("XRANGE", `^${t[i.GTLT]}\\s*${t[i.XRANGEPLAIN]}$`), v("XRANGELOOSE", `^${t[i.GTLT]}\\s*${t[i.XRANGEPLAINLOOSE]}$`), v("COERCEPLAIN", `(^|[^\\d])(\\d{1,${f}})(?:\\.(\\d{1,${f}}))?(?:\\.(\\d{1,${f}}))?`), v("COERCE", `${t[i.COERCEPLAIN]}(?:$|[^\\d])`), v("COERCEFULL", t[i.COERCEPLAIN] + `(?:${t[i.PRERELEASE]})?(?:${t[i.BUILD]})?(?:$|[^\\d])`), v("COERCERTL", t[i.COERCE], !0), v("COERCERTLFULL", t[i.COERCEFULL], !0), v("LONETILDE", "(?:~>?)"), v("TILDETRIM", `(\\s*)${t[i.LONETILDE]}\\s+`, !0), h.tildeTrimReplace = "$1~", v("TILDE", `^${t[i.LONETILDE]}${t[i.XRANGEPLAIN]}$`), v("TILDELOOSE", `^${t[i.LONETILDE]}${t[i.XRANGEPLAINLOOSE]}$`), v("LONECARET", "(?:\\^)"), v("CARETTRIM", `(\\s*)${t[i.LONECARET]}\\s+`, !0), h.caretTrimReplace = "$1^", v("CARET", `^${t[i.LONECARET]}${t[i.XRANGEPLAIN]}$`), v("CARETLOOSE", `^${t[i.LONECARET]}${t[i.XRANGEPLAINLOOSE]}$`), v("COMPARATORLOOSE", `^${t[i.GTLT]}\\s*(${t[i.LOOSEPLAIN]})$|^$`), v("COMPARATOR", `^${t[i.GTLT]}\\s*(${t[i.FULLPLAIN]})$|^$`), v("COMPARATORTRIM", `(\\s*)${t[i.GTLT]}\\s*(${t[i.LOOSEPLAIN]}|${t[i.XRANGEPLAIN]})`, !0), h.comparatorTrimReplace = "$1$2$3", v("HYPHENRANGE", `^\\s*(${t[i.XRANGEPLAIN]})\\s+-\\s+(${t[i.XRANGEPLAIN]})\\s*$`), v("HYPHENRANGELOOSE", `^\\s*(${t[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${t[i.XRANGEPLAINLOOSE]})\\s*$`), v("STAR", "(<|>)?=?\\s*\\*"), v("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), v("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(Ur, Ur.exports)), Ur.exports;
}
var ui, Ia;
function Lo() {
  if (Ia) return ui;
  Ia = 1;
  const o = Object.freeze({ loose: !0 }), h = Object.freeze({});
  return ui = (d) => d ? typeof d != "object" ? o : d : h, ui;
}
var ci, Na;
function Zu() {
  if (Na) return ci;
  Na = 1;
  const o = /^[0-9]+$/, h = (d, c) => {
    const r = o.test(d), e = o.test(c);
    return r && e && (d = +d, c = +c), d === c ? 0 : r && !e ? -1 : e && !r ? 1 : d < c ? -1 : 1;
  };
  return ci = {
    compareIdentifiers: h,
    rcompareIdentifiers: (d, c) => h(c, d)
  }, ci;
}
var fi, Fa;
function Ge() {
  if (Fa) return fi;
  Fa = 1;
  const o = Wr(), { MAX_LENGTH: h, MAX_SAFE_INTEGER: f } = Vr(), { safeRe: d, safeSrc: c, t: r } = Er(), e = Lo(), { compareIdentifiers: n } = Zu();
  class t {
    constructor(i, l) {
      if (l = e(l), i instanceof t) {
        if (i.loose === !!l.loose && i.includePrerelease === !!l.includePrerelease)
          return i;
        i = i.version;
      } else if (typeof i != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof i}".`);
      if (i.length > h)
        throw new TypeError(
          `version is longer than ${h} characters`
        );
      o("SemVer", i, l), this.options = l, this.loose = !!l.loose, this.includePrerelease = !!l.includePrerelease;
      const s = i.trim().match(l.loose ? d[r.LOOSE] : d[r.FULL]);
      if (!s)
        throw new TypeError(`Invalid Version: ${i}`);
      if (this.raw = i, this.major = +s[1], this.minor = +s[2], this.patch = +s[3], this.major > f || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > f || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > f || this.patch < 0)
        throw new TypeError("Invalid patch version");
      s[4] ? this.prerelease = s[4].split(".").map((p) => {
        if (/^[0-9]+$/.test(p)) {
          const g = +p;
          if (g >= 0 && g < f)
            return g;
        }
        return p;
      }) : this.prerelease = [], this.build = s[5] ? s[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(i) {
      if (o("SemVer.compare", this.version, this.options, i), !(i instanceof t)) {
        if (typeof i == "string" && i === this.version)
          return 0;
        i = new t(i, this.options);
      }
      return i.version === this.version ? 0 : this.compareMain(i) || this.comparePre(i);
    }
    compareMain(i) {
      return i instanceof t || (i = new t(i, this.options)), n(this.major, i.major) || n(this.minor, i.minor) || n(this.patch, i.patch);
    }
    comparePre(i) {
      if (i instanceof t || (i = new t(i, this.options)), this.prerelease.length && !i.prerelease.length)
        return -1;
      if (!this.prerelease.length && i.prerelease.length)
        return 1;
      if (!this.prerelease.length && !i.prerelease.length)
        return 0;
      let l = 0;
      do {
        const s = this.prerelease[l], p = i.prerelease[l];
        if (o("prerelease compare", l, s, p), s === void 0 && p === void 0)
          return 0;
        if (p === void 0)
          return 1;
        if (s === void 0)
          return -1;
        if (s === p)
          continue;
        return n(s, p);
      } while (++l);
    }
    compareBuild(i) {
      i instanceof t || (i = new t(i, this.options));
      let l = 0;
      do {
        const s = this.build[l], p = i.build[l];
        if (o("build compare", l, s, p), s === void 0 && p === void 0)
          return 0;
        if (p === void 0)
          return 1;
        if (s === void 0)
          return -1;
        if (s === p)
          continue;
        return n(s, p);
      } while (++l);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(i, l, s) {
      if (i.startsWith("pre")) {
        if (!l && s === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (l) {
          const p = new RegExp(`^${this.options.loose ? c[r.PRERELEASELOOSE] : c[r.PRERELEASE]}$`), g = `-${l}`.match(p);
          if (!g || g[1] !== l)
            throw new Error(`invalid identifier: ${l}`);
        }
      }
      switch (i) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", l, s);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", l, s);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", l, s), this.inc("pre", l, s);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", l, s), this.inc("pre", l, s);
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
          const p = Number(s) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [p];
          else {
            let g = this.prerelease.length;
            for (; --g >= 0; )
              typeof this.prerelease[g] == "number" && (this.prerelease[g]++, g = -2);
            if (g === -1) {
              if (l === this.prerelease.join(".") && s === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(p);
            }
          }
          if (l) {
            let g = [l, p];
            s === !1 && (g = [l]), n(this.prerelease[0], l) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = g) : this.prerelease = g;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${i}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return fi = t, fi;
}
var di, xa;
function Bt() {
  if (xa) return di;
  xa = 1;
  const o = Ge();
  return di = (f, d, c = !1) => {
    if (f instanceof o)
      return f;
    try {
      return new o(f, d);
    } catch (r) {
      if (!c)
        return null;
      throw r;
    }
  }, di;
}
var hi, La;
function ud() {
  if (La) return hi;
  La = 1;
  const o = Bt();
  return hi = (f, d) => {
    const c = o(f, d);
    return c ? c.version : null;
  }, hi;
}
var pi, $a;
function cd() {
  if ($a) return pi;
  $a = 1;
  const o = Bt();
  return pi = (f, d) => {
    const c = o(f.trim().replace(/^[=v]+/, ""), d);
    return c ? c.version : null;
  }, pi;
}
var mi, Ua;
function fd() {
  if (Ua) return mi;
  Ua = 1;
  const o = Ge();
  return mi = (f, d, c, r, e) => {
    typeof c == "string" && (e = r, r = c, c = void 0);
    try {
      return new o(
        f instanceof o ? f.version : f,
        c
      ).inc(d, r, e).version;
    } catch {
      return null;
    }
  }, mi;
}
var gi, ka;
function dd() {
  if (ka) return gi;
  ka = 1;
  const o = Bt();
  return gi = (f, d) => {
    const c = o(f, null, !0), r = o(d, null, !0), e = c.compare(r);
    if (e === 0)
      return null;
    const n = e > 0, t = n ? c : r, a = n ? r : c, i = !!t.prerelease.length;
    if (!!a.prerelease.length && !i) {
      if (!a.patch && !a.minor)
        return "major";
      if (a.compareMain(t) === 0)
        return a.minor && !a.patch ? "minor" : "patch";
    }
    const s = i ? "pre" : "";
    return c.major !== r.major ? s + "major" : c.minor !== r.minor ? s + "minor" : c.patch !== r.patch ? s + "patch" : "prerelease";
  }, gi;
}
var vi, qa;
function hd() {
  if (qa) return vi;
  qa = 1;
  const o = Ge();
  return vi = (f, d) => new o(f, d).major, vi;
}
var yi, Ma;
function pd() {
  if (Ma) return yi;
  Ma = 1;
  const o = Ge();
  return yi = (f, d) => new o(f, d).minor, yi;
}
var Ei, Ba;
function md() {
  if (Ba) return Ei;
  Ba = 1;
  const o = Ge();
  return Ei = (f, d) => new o(f, d).patch, Ei;
}
var wi, ja;
function gd() {
  if (ja) return wi;
  ja = 1;
  const o = Bt();
  return wi = (f, d) => {
    const c = o(f, d);
    return c && c.prerelease.length ? c.prerelease : null;
  }, wi;
}
var _i, Ha;
function et() {
  if (Ha) return _i;
  Ha = 1;
  const o = Ge();
  return _i = (f, d, c) => new o(f, c).compare(new o(d, c)), _i;
}
var Si, Ga;
function vd() {
  if (Ga) return Si;
  Ga = 1;
  const o = et();
  return Si = (f, d, c) => o(d, f, c), Si;
}
var Ai, Va;
function yd() {
  if (Va) return Ai;
  Va = 1;
  const o = et();
  return Ai = (f, d) => o(f, d, !0), Ai;
}
var bi, Wa;
function $o() {
  if (Wa) return bi;
  Wa = 1;
  const o = Ge();
  return bi = (f, d, c) => {
    const r = new o(f, c), e = new o(d, c);
    return r.compare(e) || r.compareBuild(e);
  }, bi;
}
var Ti, za;
function Ed() {
  if (za) return Ti;
  za = 1;
  const o = $o();
  return Ti = (f, d) => f.sort((c, r) => o(c, r, d)), Ti;
}
var Ri, Ya;
function wd() {
  if (Ya) return Ri;
  Ya = 1;
  const o = $o();
  return Ri = (f, d) => f.sort((c, r) => o(r, c, d)), Ri;
}
var Ci, Xa;
function zr() {
  if (Xa) return Ci;
  Xa = 1;
  const o = et();
  return Ci = (f, d, c) => o(f, d, c) > 0, Ci;
}
var Oi, Ja;
function Uo() {
  if (Ja) return Oi;
  Ja = 1;
  const o = et();
  return Oi = (f, d, c) => o(f, d, c) < 0, Oi;
}
var Di, Ka;
function ec() {
  if (Ka) return Di;
  Ka = 1;
  const o = et();
  return Di = (f, d, c) => o(f, d, c) === 0, Di;
}
var Pi, Qa;
function tc() {
  if (Qa) return Pi;
  Qa = 1;
  const o = et();
  return Pi = (f, d, c) => o(f, d, c) !== 0, Pi;
}
var Ii, Za;
function ko() {
  if (Za) return Ii;
  Za = 1;
  const o = et();
  return Ii = (f, d, c) => o(f, d, c) >= 0, Ii;
}
var Ni, el;
function qo() {
  if (el) return Ni;
  el = 1;
  const o = et();
  return Ni = (f, d, c) => o(f, d, c) <= 0, Ni;
}
var Fi, tl;
function rc() {
  if (tl) return Fi;
  tl = 1;
  const o = ec(), h = tc(), f = zr(), d = ko(), c = Uo(), r = qo();
  return Fi = (n, t, a, i) => {
    switch (t) {
      case "===":
        return typeof n == "object" && (n = n.version), typeof a == "object" && (a = a.version), n === a;
      case "!==":
        return typeof n == "object" && (n = n.version), typeof a == "object" && (a = a.version), n !== a;
      case "":
      case "=":
      case "==":
        return o(n, a, i);
      case "!=":
        return h(n, a, i);
      case ">":
        return f(n, a, i);
      case ">=":
        return d(n, a, i);
      case "<":
        return c(n, a, i);
      case "<=":
        return r(n, a, i);
      default:
        throw new TypeError(`Invalid operator: ${t}`);
    }
  }, Fi;
}
var xi, rl;
function _d() {
  if (rl) return xi;
  rl = 1;
  const o = Ge(), h = Bt(), { safeRe: f, t: d } = Er();
  return xi = (r, e) => {
    if (r instanceof o)
      return r;
    if (typeof r == "number" && (r = String(r)), typeof r != "string")
      return null;
    e = e || {};
    let n = null;
    if (!e.rtl)
      n = r.match(e.includePrerelease ? f[d.COERCEFULL] : f[d.COERCE]);
    else {
      const p = e.includePrerelease ? f[d.COERCERTLFULL] : f[d.COERCERTL];
      let g;
      for (; (g = p.exec(r)) && (!n || n.index + n[0].length !== r.length); )
        (!n || g.index + g[0].length !== n.index + n[0].length) && (n = g), p.lastIndex = g.index + g[1].length + g[2].length;
      p.lastIndex = -1;
    }
    if (n === null)
      return null;
    const t = n[2], a = n[3] || "0", i = n[4] || "0", l = e.includePrerelease && n[5] ? `-${n[5]}` : "", s = e.includePrerelease && n[6] ? `+${n[6]}` : "";
    return h(`${t}.${a}.${i}${l}${s}`, e);
  }, xi;
}
var Li, nl;
function Sd() {
  if (nl) return Li;
  nl = 1;
  class o {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(f) {
      const d = this.map.get(f);
      if (d !== void 0)
        return this.map.delete(f), this.map.set(f, d), d;
    }
    delete(f) {
      return this.map.delete(f);
    }
    set(f, d) {
      if (!this.delete(f) && d !== void 0) {
        if (this.map.size >= this.max) {
          const r = this.map.keys().next().value;
          this.delete(r);
        }
        this.map.set(f, d);
      }
      return this;
    }
  }
  return Li = o, Li;
}
var $i, il;
function tt() {
  if (il) return $i;
  il = 1;
  const o = /\s+/g;
  class h {
    constructor(I, L) {
      if (L = c(L), I instanceof h)
        return I.loose === !!L.loose && I.includePrerelease === !!L.includePrerelease ? I : new h(I.raw, L);
      if (I instanceof r)
        return this.raw = I.value, this.set = [[I]], this.formatted = void 0, this;
      if (this.options = L, this.loose = !!L.loose, this.includePrerelease = !!L.includePrerelease, this.raw = I.trim().replace(o, " "), this.set = this.raw.split("||").map((M) => this.parseRange(M.trim())).filter((M) => M.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const M = this.set[0];
        if (this.set = this.set.filter((K) => !v(K[0])), this.set.length === 0)
          this.set = [M];
        else if (this.set.length > 1) {
          for (const K of this.set)
            if (K.length === 1 && m(K[0])) {
              this.set = [K];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let I = 0; I < this.set.length; I++) {
          I > 0 && (this.formatted += "||");
          const L = this.set[I];
          for (let M = 0; M < L.length; M++)
            M > 0 && (this.formatted += " "), this.formatted += L[M].toString().trim();
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
    parseRange(I) {
      const M = ((this.options.includePrerelease && p) | (this.options.loose && g)) + ":" + I, K = d.get(M);
      if (K)
        return K;
      const V = this.options.loose, ne = V ? t[a.HYPHENRANGELOOSE] : t[a.HYPHENRANGE];
      I = I.replace(ne, N(this.options.includePrerelease)), e("hyphen replace", I), I = I.replace(t[a.COMPARATORTRIM], i), e("comparator trim", I), I = I.replace(t[a.TILDETRIM], l), e("tilde trim", I), I = I.replace(t[a.CARETTRIM], s), e("caret trim", I);
      let ce = I.split(" ").map((J) => R(J, this.options)).join(" ").split(/\s+/).map((J) => F(J, this.options));
      V && (ce = ce.filter((J) => (e("loose invalid filter", J, this.options), !!J.match(t[a.COMPARATORLOOSE])))), e("range list", ce);
      const ue = /* @__PURE__ */ new Map(), ie = ce.map((J) => new r(J, this.options));
      for (const J of ie) {
        if (v(J))
          return [J];
        ue.set(J.value, J);
      }
      ue.size > 1 && ue.has("") && ue.delete("");
      const Te = [...ue.values()];
      return d.set(M, Te), Te;
    }
    intersects(I, L) {
      if (!(I instanceof h))
        throw new TypeError("a Range is required");
      return this.set.some((M) => b(M, L) && I.set.some((K) => b(K, L) && M.every((V) => K.every((ne) => V.intersects(ne, L)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(I) {
      if (!I)
        return !1;
      if (typeof I == "string")
        try {
          I = new n(I, this.options);
        } catch {
          return !1;
        }
      for (let L = 0; L < this.set.length; L++)
        if (k(this.set[L], I, this.options))
          return !0;
      return !1;
    }
  }
  $i = h;
  const f = Sd(), d = new f(), c = Lo(), r = Yr(), e = Wr(), n = Ge(), {
    safeRe: t,
    t: a,
    comparatorTrimReplace: i,
    tildeTrimReplace: l,
    caretTrimReplace: s
  } = Er(), { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: g } = Vr(), v = (P) => P.value === "<0.0.0-0", m = (P) => P.value === "", b = (P, I) => {
    let L = !0;
    const M = P.slice();
    let K = M.pop();
    for (; L && M.length; )
      L = M.every((V) => K.intersects(V, I)), K = M.pop();
    return L;
  }, R = (P, I) => (e("comp", P, I), P = w(P, I), e("caret", P), P = D(P, I), e("tildes", P), P = S(P, I), e("xrange", P), P = q(P, I), e("stars", P), P), O = (P) => !P || P.toLowerCase() === "x" || P === "*", D = (P, I) => P.trim().split(/\s+/).map((L) => $(L, I)).join(" "), $ = (P, I) => {
    const L = I.loose ? t[a.TILDELOOSE] : t[a.TILDE];
    return P.replace(L, (M, K, V, ne, ce) => {
      e("tilde", P, M, K, V, ne, ce);
      let ue;
      return O(K) ? ue = "" : O(V) ? ue = `>=${K}.0.0 <${+K + 1}.0.0-0` : O(ne) ? ue = `>=${K}.${V}.0 <${K}.${+V + 1}.0-0` : ce ? (e("replaceTilde pr", ce), ue = `>=${K}.${V}.${ne}-${ce} <${K}.${+V + 1}.0-0`) : ue = `>=${K}.${V}.${ne} <${K}.${+V + 1}.0-0`, e("tilde return", ue), ue;
    });
  }, w = (P, I) => P.trim().split(/\s+/).map((L) => _(L, I)).join(" "), _ = (P, I) => {
    e("caret", P, I);
    const L = I.loose ? t[a.CARETLOOSE] : t[a.CARET], M = I.includePrerelease ? "-0" : "";
    return P.replace(L, (K, V, ne, ce, ue) => {
      e("caret", P, K, V, ne, ce, ue);
      let ie;
      return O(V) ? ie = "" : O(ne) ? ie = `>=${V}.0.0${M} <${+V + 1}.0.0-0` : O(ce) ? V === "0" ? ie = `>=${V}.${ne}.0${M} <${V}.${+ne + 1}.0-0` : ie = `>=${V}.${ne}.0${M} <${+V + 1}.0.0-0` : ue ? (e("replaceCaret pr", ue), V === "0" ? ne === "0" ? ie = `>=${V}.${ne}.${ce}-${ue} <${V}.${ne}.${+ce + 1}-0` : ie = `>=${V}.${ne}.${ce}-${ue} <${V}.${+ne + 1}.0-0` : ie = `>=${V}.${ne}.${ce}-${ue} <${+V + 1}.0.0-0`) : (e("no pr"), V === "0" ? ne === "0" ? ie = `>=${V}.${ne}.${ce}${M} <${V}.${ne}.${+ce + 1}-0` : ie = `>=${V}.${ne}.${ce}${M} <${V}.${+ne + 1}.0-0` : ie = `>=${V}.${ne}.${ce} <${+V + 1}.0.0-0`), e("caret return", ie), ie;
    });
  }, S = (P, I) => (e("replaceXRanges", P, I), P.split(/\s+/).map((L) => E(L, I)).join(" ")), E = (P, I) => {
    P = P.trim();
    const L = I.loose ? t[a.XRANGELOOSE] : t[a.XRANGE];
    return P.replace(L, (M, K, V, ne, ce, ue) => {
      e("xRange", P, M, K, V, ne, ce, ue);
      const ie = O(V), Te = ie || O(ne), J = Te || O(ce), ye = J;
      return K === "=" && ye && (K = ""), ue = I.includePrerelease ? "-0" : "", ie ? K === ">" || K === "<" ? M = "<0.0.0-0" : M = "*" : K && ye ? (Te && (ne = 0), ce = 0, K === ">" ? (K = ">=", Te ? (V = +V + 1, ne = 0, ce = 0) : (ne = +ne + 1, ce = 0)) : K === "<=" && (K = "<", Te ? V = +V + 1 : ne = +ne + 1), K === "<" && (ue = "-0"), M = `${K + V}.${ne}.${ce}${ue}`) : Te ? M = `>=${V}.0.0${ue} <${+V + 1}.0.0-0` : J && (M = `>=${V}.${ne}.0${ue} <${V}.${+ne + 1}.0-0`), e("xRange return", M), M;
    });
  }, q = (P, I) => (e("replaceStars", P, I), P.trim().replace(t[a.STAR], "")), F = (P, I) => (e("replaceGTE0", P, I), P.trim().replace(t[I.includePrerelease ? a.GTE0PRE : a.GTE0], "")), N = (P) => (I, L, M, K, V, ne, ce, ue, ie, Te, J, ye) => (O(M) ? L = "" : O(K) ? L = `>=${M}.0.0${P ? "-0" : ""}` : O(V) ? L = `>=${M}.${K}.0${P ? "-0" : ""}` : ne ? L = `>=${L}` : L = `>=${L}${P ? "-0" : ""}`, O(ie) ? ue = "" : O(Te) ? ue = `<${+ie + 1}.0.0-0` : O(J) ? ue = `<${ie}.${+Te + 1}.0-0` : ye ? ue = `<=${ie}.${Te}.${J}-${ye}` : P ? ue = `<${ie}.${Te}.${+J + 1}-0` : ue = `<=${ue}`, `${L} ${ue}`.trim()), k = (P, I, L) => {
    for (let M = 0; M < P.length; M++)
      if (!P[M].test(I))
        return !1;
    if (I.prerelease.length && !L.includePrerelease) {
      for (let M = 0; M < P.length; M++)
        if (e(P[M].semver), P[M].semver !== r.ANY && P[M].semver.prerelease.length > 0) {
          const K = P[M].semver;
          if (K.major === I.major && K.minor === I.minor && K.patch === I.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return $i;
}
var Ui, ol;
function Yr() {
  if (ol) return Ui;
  ol = 1;
  const o = Symbol("SemVer ANY");
  class h {
    static get ANY() {
      return o;
    }
    constructor(i, l) {
      if (l = f(l), i instanceof h) {
        if (i.loose === !!l.loose)
          return i;
        i = i.value;
      }
      i = i.trim().split(/\s+/).join(" "), e("comparator", i, l), this.options = l, this.loose = !!l.loose, this.parse(i), this.semver === o ? this.value = "" : this.value = this.operator + this.semver.version, e("comp", this);
    }
    parse(i) {
      const l = this.options.loose ? d[c.COMPARATORLOOSE] : d[c.COMPARATOR], s = i.match(l);
      if (!s)
        throw new TypeError(`Invalid comparator: ${i}`);
      this.operator = s[1] !== void 0 ? s[1] : "", this.operator === "=" && (this.operator = ""), s[2] ? this.semver = new n(s[2], this.options.loose) : this.semver = o;
    }
    toString() {
      return this.value;
    }
    test(i) {
      if (e("Comparator.test", i, this.options.loose), this.semver === o || i === o)
        return !0;
      if (typeof i == "string")
        try {
          i = new n(i, this.options);
        } catch {
          return !1;
        }
      return r(i, this.operator, this.semver, this.options);
    }
    intersects(i, l) {
      if (!(i instanceof h))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new t(i.value, l).test(this.value) : i.operator === "" ? i.value === "" ? !0 : new t(this.value, l).test(i.semver) : (l = f(l), l.includePrerelease && (this.value === "<0.0.0-0" || i.value === "<0.0.0-0") || !l.includePrerelease && (this.value.startsWith("<0.0.0") || i.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && i.operator.startsWith(">") || this.operator.startsWith("<") && i.operator.startsWith("<") || this.semver.version === i.semver.version && this.operator.includes("=") && i.operator.includes("=") || r(this.semver, "<", i.semver, l) && this.operator.startsWith(">") && i.operator.startsWith("<") || r(this.semver, ">", i.semver, l) && this.operator.startsWith("<") && i.operator.startsWith(">")));
    }
  }
  Ui = h;
  const f = Lo(), { safeRe: d, t: c } = Er(), r = rc(), e = Wr(), n = Ge(), t = tt();
  return Ui;
}
var ki, sl;
function Xr() {
  if (sl) return ki;
  sl = 1;
  const o = tt();
  return ki = (f, d, c) => {
    try {
      d = new o(d, c);
    } catch {
      return !1;
    }
    return d.test(f);
  }, ki;
}
var qi, al;
function Ad() {
  if (al) return qi;
  al = 1;
  const o = tt();
  return qi = (f, d) => new o(f, d).set.map((c) => c.map((r) => r.value).join(" ").trim().split(" ")), qi;
}
var Mi, ll;
function bd() {
  if (ll) return Mi;
  ll = 1;
  const o = Ge(), h = tt();
  return Mi = (d, c, r) => {
    let e = null, n = null, t = null;
    try {
      t = new h(c, r);
    } catch {
      return null;
    }
    return d.forEach((a) => {
      t.test(a) && (!e || n.compare(a) === -1) && (e = a, n = new o(e, r));
    }), e;
  }, Mi;
}
var Bi, ul;
function Td() {
  if (ul) return Bi;
  ul = 1;
  const o = Ge(), h = tt();
  return Bi = (d, c, r) => {
    let e = null, n = null, t = null;
    try {
      t = new h(c, r);
    } catch {
      return null;
    }
    return d.forEach((a) => {
      t.test(a) && (!e || n.compare(a) === 1) && (e = a, n = new o(e, r));
    }), e;
  }, Bi;
}
var ji, cl;
function Rd() {
  if (cl) return ji;
  cl = 1;
  const o = Ge(), h = tt(), f = zr();
  return ji = (c, r) => {
    c = new h(c, r);
    let e = new o("0.0.0");
    if (c.test(e) || (e = new o("0.0.0-0"), c.test(e)))
      return e;
    e = null;
    for (let n = 0; n < c.set.length; ++n) {
      const t = c.set[n];
      let a = null;
      t.forEach((i) => {
        const l = new o(i.semver.version);
        switch (i.operator) {
          case ">":
            l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
          /* fallthrough */
          case "":
          case ">=":
            (!a || f(l, a)) && (a = l);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${i.operator}`);
        }
      }), a && (!e || f(e, a)) && (e = a);
    }
    return e && c.test(e) ? e : null;
  }, ji;
}
var Hi, fl;
function Cd() {
  if (fl) return Hi;
  fl = 1;
  const o = tt();
  return Hi = (f, d) => {
    try {
      return new o(f, d).range || "*";
    } catch {
      return null;
    }
  }, Hi;
}
var Gi, dl;
function Mo() {
  if (dl) return Gi;
  dl = 1;
  const o = Ge(), h = Yr(), { ANY: f } = h, d = tt(), c = Xr(), r = zr(), e = Uo(), n = qo(), t = ko();
  return Gi = (i, l, s, p) => {
    i = new o(i, p), l = new d(l, p);
    let g, v, m, b, R;
    switch (s) {
      case ">":
        g = r, v = n, m = e, b = ">", R = ">=";
        break;
      case "<":
        g = e, v = t, m = r, b = "<", R = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (c(i, l, p))
      return !1;
    for (let O = 0; O < l.set.length; ++O) {
      const D = l.set[O];
      let $ = null, w = null;
      if (D.forEach((_) => {
        _.semver === f && (_ = new h(">=0.0.0")), $ = $ || _, w = w || _, g(_.semver, $.semver, p) ? $ = _ : m(_.semver, w.semver, p) && (w = _);
      }), $.operator === b || $.operator === R || (!w.operator || w.operator === b) && v(i, w.semver))
        return !1;
      if (w.operator === R && m(i, w.semver))
        return !1;
    }
    return !0;
  }, Gi;
}
var Vi, hl;
function Od() {
  if (hl) return Vi;
  hl = 1;
  const o = Mo();
  return Vi = (f, d, c) => o(f, d, ">", c), Vi;
}
var Wi, pl;
function Dd() {
  if (pl) return Wi;
  pl = 1;
  const o = Mo();
  return Wi = (f, d, c) => o(f, d, "<", c), Wi;
}
var zi, ml;
function Pd() {
  if (ml) return zi;
  ml = 1;
  const o = tt();
  return zi = (f, d, c) => (f = new o(f, c), d = new o(d, c), f.intersects(d, c)), zi;
}
var Yi, gl;
function Id() {
  if (gl) return Yi;
  gl = 1;
  const o = Xr(), h = et();
  return Yi = (f, d, c) => {
    const r = [];
    let e = null, n = null;
    const t = f.sort((s, p) => h(s, p, c));
    for (const s of t)
      o(s, d, c) ? (n = s, e || (e = s)) : (n && r.push([e, n]), n = null, e = null);
    e && r.push([e, null]);
    const a = [];
    for (const [s, p] of r)
      s === p ? a.push(s) : !p && s === t[0] ? a.push("*") : p ? s === t[0] ? a.push(`<=${p}`) : a.push(`${s} - ${p}`) : a.push(`>=${s}`);
    const i = a.join(" || "), l = typeof d.raw == "string" ? d.raw : String(d);
    return i.length < l.length ? i : d;
  }, Yi;
}
var Xi, vl;
function Nd() {
  if (vl) return Xi;
  vl = 1;
  const o = tt(), h = Yr(), { ANY: f } = h, d = Xr(), c = et(), r = (l, s, p = {}) => {
    if (l === s)
      return !0;
    l = new o(l, p), s = new o(s, p);
    let g = !1;
    e: for (const v of l.set) {
      for (const m of s.set) {
        const b = t(v, m, p);
        if (g = g || b !== null, b)
          continue e;
      }
      if (g)
        return !1;
    }
    return !0;
  }, e = [new h(">=0.0.0-0")], n = [new h(">=0.0.0")], t = (l, s, p) => {
    if (l === s)
      return !0;
    if (l.length === 1 && l[0].semver === f) {
      if (s.length === 1 && s[0].semver === f)
        return !0;
      p.includePrerelease ? l = e : l = n;
    }
    if (s.length === 1 && s[0].semver === f) {
      if (p.includePrerelease)
        return !0;
      s = n;
    }
    const g = /* @__PURE__ */ new Set();
    let v, m;
    for (const S of l)
      S.operator === ">" || S.operator === ">=" ? v = a(v, S, p) : S.operator === "<" || S.operator === "<=" ? m = i(m, S, p) : g.add(S.semver);
    if (g.size > 1)
      return null;
    let b;
    if (v && m) {
      if (b = c(v.semver, m.semver, p), b > 0)
        return null;
      if (b === 0 && (v.operator !== ">=" || m.operator !== "<="))
        return null;
    }
    for (const S of g) {
      if (v && !d(S, String(v), p) || m && !d(S, String(m), p))
        return null;
      for (const E of s)
        if (!d(S, String(E), p))
          return !1;
      return !0;
    }
    let R, O, D, $, w = m && !p.includePrerelease && m.semver.prerelease.length ? m.semver : !1, _ = v && !p.includePrerelease && v.semver.prerelease.length ? v.semver : !1;
    w && w.prerelease.length === 1 && m.operator === "<" && w.prerelease[0] === 0 && (w = !1);
    for (const S of s) {
      if ($ = $ || S.operator === ">" || S.operator === ">=", D = D || S.operator === "<" || S.operator === "<=", v) {
        if (_ && S.semver.prerelease && S.semver.prerelease.length && S.semver.major === _.major && S.semver.minor === _.minor && S.semver.patch === _.patch && (_ = !1), S.operator === ">" || S.operator === ">=") {
          if (R = a(v, S, p), R === S && R !== v)
            return !1;
        } else if (v.operator === ">=" && !d(v.semver, String(S), p))
          return !1;
      }
      if (m) {
        if (w && S.semver.prerelease && S.semver.prerelease.length && S.semver.major === w.major && S.semver.minor === w.minor && S.semver.patch === w.patch && (w = !1), S.operator === "<" || S.operator === "<=") {
          if (O = i(m, S, p), O === S && O !== m)
            return !1;
        } else if (m.operator === "<=" && !d(m.semver, String(S), p))
          return !1;
      }
      if (!S.operator && (m || v) && b !== 0)
        return !1;
    }
    return !(v && D && !m && b !== 0 || m && $ && !v && b !== 0 || _ || w);
  }, a = (l, s, p) => {
    if (!l)
      return s;
    const g = c(l.semver, s.semver, p);
    return g > 0 ? l : g < 0 || s.operator === ">" && l.operator === ">=" ? s : l;
  }, i = (l, s, p) => {
    if (!l)
      return s;
    const g = c(l.semver, s.semver, p);
    return g < 0 ? l : g > 0 || s.operator === "<" && l.operator === "<=" ? s : l;
  };
  return Xi = r, Xi;
}
var Ji, yl;
function nc() {
  if (yl) return Ji;
  yl = 1;
  const o = Er(), h = Vr(), f = Ge(), d = Zu(), c = Bt(), r = ud(), e = cd(), n = fd(), t = dd(), a = hd(), i = pd(), l = md(), s = gd(), p = et(), g = vd(), v = yd(), m = $o(), b = Ed(), R = wd(), O = zr(), D = Uo(), $ = ec(), w = tc(), _ = ko(), S = qo(), E = rc(), q = _d(), F = Yr(), N = tt(), k = Xr(), P = Ad(), I = bd(), L = Td(), M = Rd(), K = Cd(), V = Mo(), ne = Od(), ce = Dd(), ue = Pd(), ie = Id(), Te = Nd();
  return Ji = {
    parse: c,
    valid: r,
    clean: e,
    inc: n,
    diff: t,
    major: a,
    minor: i,
    patch: l,
    prerelease: s,
    compare: p,
    rcompare: g,
    compareLoose: v,
    compareBuild: m,
    sort: b,
    rsort: R,
    gt: O,
    lt: D,
    eq: $,
    neq: w,
    gte: _,
    lte: S,
    cmp: E,
    coerce: q,
    Comparator: F,
    Range: N,
    satisfies: k,
    toComparators: P,
    maxSatisfying: I,
    minSatisfying: L,
    minVersion: M,
    validRange: K,
    outside: V,
    gtr: ne,
    ltr: ce,
    intersects: ue,
    simplifyRange: ie,
    subset: Te,
    SemVer: f,
    re: o.re,
    src: o.src,
    tokens: o.t,
    SEMVER_SPEC_VERSION: h.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: h.RELEASE_TYPES,
    compareIdentifiers: d.compareIdentifiers,
    rcompareIdentifiers: d.rcompareIdentifiers
  }, Ji;
}
var xt = {}, pr = { exports: {} };
pr.exports;
var El;
function Fd() {
  return El || (El = 1, function(o, h) {
    var f = 200, d = "__lodash_hash_undefined__", c = 1, r = 2, e = 9007199254740991, n = "[object Arguments]", t = "[object Array]", a = "[object AsyncFunction]", i = "[object Boolean]", l = "[object Date]", s = "[object Error]", p = "[object Function]", g = "[object GeneratorFunction]", v = "[object Map]", m = "[object Number]", b = "[object Null]", R = "[object Object]", O = "[object Promise]", D = "[object Proxy]", $ = "[object RegExp]", w = "[object Set]", _ = "[object String]", S = "[object Symbol]", E = "[object Undefined]", q = "[object WeakMap]", F = "[object ArrayBuffer]", N = "[object DataView]", k = "[object Float32Array]", P = "[object Float64Array]", I = "[object Int8Array]", L = "[object Int16Array]", M = "[object Int32Array]", K = "[object Uint8Array]", V = "[object Uint8ClampedArray]", ne = "[object Uint16Array]", ce = "[object Uint32Array]", ue = /[\\^$.*+?()[\]{}|]/g, ie = /^\[object .+?Constructor\]$/, Te = /^(?:0|[1-9]\d*)$/, J = {};
    J[k] = J[P] = J[I] = J[L] = J[M] = J[K] = J[V] = J[ne] = J[ce] = !0, J[n] = J[t] = J[F] = J[i] = J[N] = J[l] = J[s] = J[p] = J[v] = J[m] = J[R] = J[$] = J[w] = J[_] = J[q] = !1;
    var ye = typeof Ze == "object" && Ze && Ze.Object === Object && Ze, T = typeof self == "object" && self && self.Object === Object && self, y = ye || T || Function("return this")(), j = h && !h.nodeType && h, x = j && !0 && o && !o.nodeType && o, le = x && x.exports === j, me = le && ye.process, pe = function() {
      try {
        return me && me.binding && me.binding("util");
      } catch {
      }
    }(), _e = pe && pe.isTypedArray;
    function Ee(C, U) {
      for (var Y = -1, ae = C == null ? 0 : C.length, Pe = 0, Se = []; ++Y < ae; ) {
        var Fe = C[Y];
        U(Fe, Y, C) && (Se[Pe++] = Fe);
      }
      return Se;
    }
    function xe(C, U) {
      for (var Y = -1, ae = U.length, Pe = C.length; ++Y < ae; )
        C[Pe + Y] = U[Y];
      return C;
    }
    function Oe(C, U) {
      for (var Y = -1, ae = C == null ? 0 : C.length; ++Y < ae; )
        if (U(C[Y], Y, C))
          return !0;
      return !1;
    }
    function qe(C, U) {
      for (var Y = -1, ae = Array(C); ++Y < C; )
        ae[Y] = U(Y);
      return ae;
    }
    function vt(C) {
      return function(U) {
        return C(U);
      };
    }
    function ot(C, U) {
      return C.has(U);
    }
    function u(C, U) {
      return C == null ? void 0 : C[U];
    }
    function B(C) {
      var U = -1, Y = Array(C.size);
      return C.forEach(function(ae, Pe) {
        Y[++U] = [Pe, ae];
      }), Y;
    }
    function G(C, U) {
      return function(Y) {
        return C(U(Y));
      };
    }
    function re(C) {
      var U = -1, Y = Array(C.size);
      return C.forEach(function(ae) {
        Y[++U] = ae;
      }), Y;
    }
    var W = Array.prototype, te = Function.prototype, Z = Object.prototype, oe = y["__core-js_shared__"], ge = te.toString, ve = Z.hasOwnProperty, Re = function() {
      var C = /[^.]+$/.exec(oe && oe.keys && oe.keys.IE_PROTO || "");
      return C ? "Symbol(src)_1." + C : "";
    }(), de = Z.toString, Le = RegExp(
      "^" + ge.call(ve).replace(ue, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), A = le ? y.Buffer : void 0, H = y.Symbol, X = y.Uint8Array, z = Z.propertyIsEnumerable, Q = W.splice, ee = H ? H.toStringTag : void 0, fe = Object.getOwnPropertySymbols, se = A ? A.isBuffer : void 0, he = G(Object.keys, Object), we = Nt(y, "DataView"), De = Nt(y, "Map"), Ne = Nt(y, "Promise"), Ce = Nt(y, "Set"), It = Nt(y, "WeakMap"), Ke = Nt(Object, "create"), yt = _t(we), gc = _t(De), vc = _t(Ne), yc = _t(Ce), Ec = _t(It), Go = H ? H.prototype : void 0, Kr = Go ? Go.valueOf : void 0;
    function Et(C) {
      var U = -1, Y = C == null ? 0 : C.length;
      for (this.clear(); ++U < Y; ) {
        var ae = C[U];
        this.set(ae[0], ae[1]);
      }
    }
    function wc() {
      this.__data__ = Ke ? Ke(null) : {}, this.size = 0;
    }
    function _c(C) {
      var U = this.has(C) && delete this.__data__[C];
      return this.size -= U ? 1 : 0, U;
    }
    function Sc(C) {
      var U = this.__data__;
      if (Ke) {
        var Y = U[C];
        return Y === d ? void 0 : Y;
      }
      return ve.call(U, C) ? U[C] : void 0;
    }
    function Ac(C) {
      var U = this.__data__;
      return Ke ? U[C] !== void 0 : ve.call(U, C);
    }
    function bc(C, U) {
      var Y = this.__data__;
      return this.size += this.has(C) ? 0 : 1, Y[C] = Ke && U === void 0 ? d : U, this;
    }
    Et.prototype.clear = wc, Et.prototype.delete = _c, Et.prototype.get = Sc, Et.prototype.has = Ac, Et.prototype.set = bc;
    function st(C) {
      var U = -1, Y = C == null ? 0 : C.length;
      for (this.clear(); ++U < Y; ) {
        var ae = C[U];
        this.set(ae[0], ae[1]);
      }
    }
    function Tc() {
      this.__data__ = [], this.size = 0;
    }
    function Rc(C) {
      var U = this.__data__, Y = Sr(U, C);
      if (Y < 0)
        return !1;
      var ae = U.length - 1;
      return Y == ae ? U.pop() : Q.call(U, Y, 1), --this.size, !0;
    }
    function Cc(C) {
      var U = this.__data__, Y = Sr(U, C);
      return Y < 0 ? void 0 : U[Y][1];
    }
    function Oc(C) {
      return Sr(this.__data__, C) > -1;
    }
    function Dc(C, U) {
      var Y = this.__data__, ae = Sr(Y, C);
      return ae < 0 ? (++this.size, Y.push([C, U])) : Y[ae][1] = U, this;
    }
    st.prototype.clear = Tc, st.prototype.delete = Rc, st.prototype.get = Cc, st.prototype.has = Oc, st.prototype.set = Dc;
    function wt(C) {
      var U = -1, Y = C == null ? 0 : C.length;
      for (this.clear(); ++U < Y; ) {
        var ae = C[U];
        this.set(ae[0], ae[1]);
      }
    }
    function Pc() {
      this.size = 0, this.__data__ = {
        hash: new Et(),
        map: new (De || st)(),
        string: new Et()
      };
    }
    function Ic(C) {
      var U = Ar(this, C).delete(C);
      return this.size -= U ? 1 : 0, U;
    }
    function Nc(C) {
      return Ar(this, C).get(C);
    }
    function Fc(C) {
      return Ar(this, C).has(C);
    }
    function xc(C, U) {
      var Y = Ar(this, C), ae = Y.size;
      return Y.set(C, U), this.size += Y.size == ae ? 0 : 1, this;
    }
    wt.prototype.clear = Pc, wt.prototype.delete = Ic, wt.prototype.get = Nc, wt.prototype.has = Fc, wt.prototype.set = xc;
    function _r(C) {
      var U = -1, Y = C == null ? 0 : C.length;
      for (this.__data__ = new wt(); ++U < Y; )
        this.add(C[U]);
    }
    function Lc(C) {
      return this.__data__.set(C, d), this;
    }
    function $c(C) {
      return this.__data__.has(C);
    }
    _r.prototype.add = _r.prototype.push = Lc, _r.prototype.has = $c;
    function ct(C) {
      var U = this.__data__ = new st(C);
      this.size = U.size;
    }
    function Uc() {
      this.__data__ = new st(), this.size = 0;
    }
    function kc(C) {
      var U = this.__data__, Y = U.delete(C);
      return this.size = U.size, Y;
    }
    function qc(C) {
      return this.__data__.get(C);
    }
    function Mc(C) {
      return this.__data__.has(C);
    }
    function Bc(C, U) {
      var Y = this.__data__;
      if (Y instanceof st) {
        var ae = Y.__data__;
        if (!De || ae.length < f - 1)
          return ae.push([C, U]), this.size = ++Y.size, this;
        Y = this.__data__ = new wt(ae);
      }
      return Y.set(C, U), this.size = Y.size, this;
    }
    ct.prototype.clear = Uc, ct.prototype.delete = kc, ct.prototype.get = qc, ct.prototype.has = Mc, ct.prototype.set = Bc;
    function jc(C, U) {
      var Y = br(C), ae = !Y && nf(C), Pe = !Y && !ae && Qr(C), Se = !Y && !ae && !Pe && Zo(C), Fe = Y || ae || Pe || Se, $e = Fe ? qe(C.length, String) : [], Ue = $e.length;
      for (var Ie in C)
        ve.call(C, Ie) && !(Fe && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Ie == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Pe && (Ie == "offset" || Ie == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Se && (Ie == "buffer" || Ie == "byteLength" || Ie == "byteOffset") || // Skip index properties.
        Qc(Ie, Ue))) && $e.push(Ie);
      return $e;
    }
    function Sr(C, U) {
      for (var Y = C.length; Y--; )
        if (Xo(C[Y][0], U))
          return Y;
      return -1;
    }
    function Hc(C, U, Y) {
      var ae = U(C);
      return br(C) ? ae : xe(ae, Y(C));
    }
    function Gt(C) {
      return C == null ? C === void 0 ? E : b : ee && ee in Object(C) ? Jc(C) : rf(C);
    }
    function Vo(C) {
      return Vt(C) && Gt(C) == n;
    }
    function Wo(C, U, Y, ae, Pe) {
      return C === U ? !0 : C == null || U == null || !Vt(C) && !Vt(U) ? C !== C && U !== U : Gc(C, U, Y, ae, Wo, Pe);
    }
    function Gc(C, U, Y, ae, Pe, Se) {
      var Fe = br(C), $e = br(U), Ue = Fe ? t : ft(C), Ie = $e ? t : ft(U);
      Ue = Ue == n ? R : Ue, Ie = Ie == n ? R : Ie;
      var ze = Ue == R, Qe = Ie == R, Me = Ue == Ie;
      if (Me && Qr(C)) {
        if (!Qr(U))
          return !1;
        Fe = !0, ze = !1;
      }
      if (Me && !ze)
        return Se || (Se = new ct()), Fe || Zo(C) ? zo(C, U, Y, ae, Pe, Se) : Yc(C, U, Ue, Y, ae, Pe, Se);
      if (!(Y & c)) {
        var Xe = ze && ve.call(C, "__wrapped__"), Je = Qe && ve.call(U, "__wrapped__");
        if (Xe || Je) {
          var dt = Xe ? C.value() : C, at = Je ? U.value() : U;
          return Se || (Se = new ct()), Pe(dt, at, Y, ae, Se);
        }
      }
      return Me ? (Se || (Se = new ct()), Xc(C, U, Y, ae, Pe, Se)) : !1;
    }
    function Vc(C) {
      if (!Qo(C) || ef(C))
        return !1;
      var U = Jo(C) ? Le : ie;
      return U.test(_t(C));
    }
    function Wc(C) {
      return Vt(C) && Ko(C.length) && !!J[Gt(C)];
    }
    function zc(C) {
      if (!tf(C))
        return he(C);
      var U = [];
      for (var Y in Object(C))
        ve.call(C, Y) && Y != "constructor" && U.push(Y);
      return U;
    }
    function zo(C, U, Y, ae, Pe, Se) {
      var Fe = Y & c, $e = C.length, Ue = U.length;
      if ($e != Ue && !(Fe && Ue > $e))
        return !1;
      var Ie = Se.get(C);
      if (Ie && Se.get(U))
        return Ie == U;
      var ze = -1, Qe = !0, Me = Y & r ? new _r() : void 0;
      for (Se.set(C, U), Se.set(U, C); ++ze < $e; ) {
        var Xe = C[ze], Je = U[ze];
        if (ae)
          var dt = Fe ? ae(Je, Xe, ze, U, C, Se) : ae(Xe, Je, ze, C, U, Se);
        if (dt !== void 0) {
          if (dt)
            continue;
          Qe = !1;
          break;
        }
        if (Me) {
          if (!Oe(U, function(at, St) {
            if (!ot(Me, St) && (Xe === at || Pe(Xe, at, Y, ae, Se)))
              return Me.push(St);
          })) {
            Qe = !1;
            break;
          }
        } else if (!(Xe === Je || Pe(Xe, Je, Y, ae, Se))) {
          Qe = !1;
          break;
        }
      }
      return Se.delete(C), Se.delete(U), Qe;
    }
    function Yc(C, U, Y, ae, Pe, Se, Fe) {
      switch (Y) {
        case N:
          if (C.byteLength != U.byteLength || C.byteOffset != U.byteOffset)
            return !1;
          C = C.buffer, U = U.buffer;
        case F:
          return !(C.byteLength != U.byteLength || !Se(new X(C), new X(U)));
        case i:
        case l:
        case m:
          return Xo(+C, +U);
        case s:
          return C.name == U.name && C.message == U.message;
        case $:
        case _:
          return C == U + "";
        case v:
          var $e = B;
        case w:
          var Ue = ae & c;
          if ($e || ($e = re), C.size != U.size && !Ue)
            return !1;
          var Ie = Fe.get(C);
          if (Ie)
            return Ie == U;
          ae |= r, Fe.set(C, U);
          var ze = zo($e(C), $e(U), ae, Pe, Se, Fe);
          return Fe.delete(C), ze;
        case S:
          if (Kr)
            return Kr.call(C) == Kr.call(U);
      }
      return !1;
    }
    function Xc(C, U, Y, ae, Pe, Se) {
      var Fe = Y & c, $e = Yo(C), Ue = $e.length, Ie = Yo(U), ze = Ie.length;
      if (Ue != ze && !Fe)
        return !1;
      for (var Qe = Ue; Qe--; ) {
        var Me = $e[Qe];
        if (!(Fe ? Me in U : ve.call(U, Me)))
          return !1;
      }
      var Xe = Se.get(C);
      if (Xe && Se.get(U))
        return Xe == U;
      var Je = !0;
      Se.set(C, U), Se.set(U, C);
      for (var dt = Fe; ++Qe < Ue; ) {
        Me = $e[Qe];
        var at = C[Me], St = U[Me];
        if (ae)
          var es = Fe ? ae(St, at, Me, U, C, Se) : ae(at, St, Me, C, U, Se);
        if (!(es === void 0 ? at === St || Pe(at, St, Y, ae, Se) : es)) {
          Je = !1;
          break;
        }
        dt || (dt = Me == "constructor");
      }
      if (Je && !dt) {
        var Tr = C.constructor, Rr = U.constructor;
        Tr != Rr && "constructor" in C && "constructor" in U && !(typeof Tr == "function" && Tr instanceof Tr && typeof Rr == "function" && Rr instanceof Rr) && (Je = !1);
      }
      return Se.delete(C), Se.delete(U), Je;
    }
    function Yo(C) {
      return Hc(C, af, Kc);
    }
    function Ar(C, U) {
      var Y = C.__data__;
      return Zc(U) ? Y[typeof U == "string" ? "string" : "hash"] : Y.map;
    }
    function Nt(C, U) {
      var Y = u(C, U);
      return Vc(Y) ? Y : void 0;
    }
    function Jc(C) {
      var U = ve.call(C, ee), Y = C[ee];
      try {
        C[ee] = void 0;
        var ae = !0;
      } catch {
      }
      var Pe = de.call(C);
      return ae && (U ? C[ee] = Y : delete C[ee]), Pe;
    }
    var Kc = fe ? function(C) {
      return C == null ? [] : (C = Object(C), Ee(fe(C), function(U) {
        return z.call(C, U);
      }));
    } : lf, ft = Gt;
    (we && ft(new we(new ArrayBuffer(1))) != N || De && ft(new De()) != v || Ne && ft(Ne.resolve()) != O || Ce && ft(new Ce()) != w || It && ft(new It()) != q) && (ft = function(C) {
      var U = Gt(C), Y = U == R ? C.constructor : void 0, ae = Y ? _t(Y) : "";
      if (ae)
        switch (ae) {
          case yt:
            return N;
          case gc:
            return v;
          case vc:
            return O;
          case yc:
            return w;
          case Ec:
            return q;
        }
      return U;
    });
    function Qc(C, U) {
      return U = U ?? e, !!U && (typeof C == "number" || Te.test(C)) && C > -1 && C % 1 == 0 && C < U;
    }
    function Zc(C) {
      var U = typeof C;
      return U == "string" || U == "number" || U == "symbol" || U == "boolean" ? C !== "__proto__" : C === null;
    }
    function ef(C) {
      return !!Re && Re in C;
    }
    function tf(C) {
      var U = C && C.constructor, Y = typeof U == "function" && U.prototype || Z;
      return C === Y;
    }
    function rf(C) {
      return de.call(C);
    }
    function _t(C) {
      if (C != null) {
        try {
          return ge.call(C);
        } catch {
        }
        try {
          return C + "";
        } catch {
        }
      }
      return "";
    }
    function Xo(C, U) {
      return C === U || C !== C && U !== U;
    }
    var nf = Vo(/* @__PURE__ */ function() {
      return arguments;
    }()) ? Vo : function(C) {
      return Vt(C) && ve.call(C, "callee") && !z.call(C, "callee");
    }, br = Array.isArray;
    function of(C) {
      return C != null && Ko(C.length) && !Jo(C);
    }
    var Qr = se || uf;
    function sf(C, U) {
      return Wo(C, U);
    }
    function Jo(C) {
      if (!Qo(C))
        return !1;
      var U = Gt(C);
      return U == p || U == g || U == a || U == D;
    }
    function Ko(C) {
      return typeof C == "number" && C > -1 && C % 1 == 0 && C <= e;
    }
    function Qo(C) {
      var U = typeof C;
      return C != null && (U == "object" || U == "function");
    }
    function Vt(C) {
      return C != null && typeof C == "object";
    }
    var Zo = _e ? vt(_e) : Wc;
    function af(C) {
      return of(C) ? jc(C) : zc(C);
    }
    function lf() {
      return [];
    }
    function uf() {
      return !1;
    }
    o.exports = sf;
  }(pr, pr.exports)), pr.exports;
}
var wl;
function xd() {
  if (wl) return xt;
  wl = 1, Object.defineProperty(xt, "__esModule", { value: !0 }), xt.DownloadedUpdateHelper = void 0, xt.createTempUpdateFile = n;
  const o = kt, h = Ve, f = Fd(), d = /* @__PURE__ */ gt(), c = be;
  let r = class {
    constructor(a) {
      this.cacheDir = a, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
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
      return c.join(this.cacheDir, "pending");
    }
    async validateDownloadedPath(a, i, l, s) {
      if (this.versionInfo != null && this.file === a && this.fileInfo != null)
        return f(this.versionInfo, i) && f(this.fileInfo.info, l.info) && await (0, d.pathExists)(a) ? a : null;
      const p = await this.getValidCachedUpdateFile(l, s);
      return p === null ? null : (s.info(`Update has already been downloaded to ${a}).`), this._file = p, p);
    }
    async setDownloadedFile(a, i, l, s, p, g) {
      this._file = a, this._packageFile = i, this.versionInfo = l, this.fileInfo = s, this._downloadedFileInfo = {
        fileName: p,
        sha512: s.info.sha512,
        isAdminRightsRequired: s.info.isAdminRightsRequired === !0
      }, g && await (0, d.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, d.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(a, i) {
      const l = this.getUpdateInfoFile();
      if (!await (0, d.pathExists)(l))
        return null;
      let p;
      try {
        p = await (0, d.readJson)(l);
      } catch (b) {
        let R = "No cached update info available";
        return b.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), R += ` (error on read: ${b.message})`), i.info(R), null;
      }
      if (!((p == null ? void 0 : p.fileName) !== null))
        return i.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (a.info.sha512 !== p.sha512)
        return i.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${p.sha512}, expected: ${a.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const v = c.join(this.cacheDirForPendingUpdate, p.fileName);
      if (!await (0, d.pathExists)(v))
        return i.info("Cached update file doesn't exist"), null;
      const m = await e(v);
      return a.info.sha512 !== m ? (i.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${m}, expected: ${a.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = p, v);
    }
    getUpdateInfoFile() {
      return c.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  xt.DownloadedUpdateHelper = r;
  function e(t, a = "sha512", i = "base64", l) {
    return new Promise((s, p) => {
      const g = (0, o.createHash)(a);
      g.on("error", p).setEncoding(i), (0, h.createReadStream)(t, {
        ...l,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", p).on("end", () => {
        g.end(), s(g.read());
      }).pipe(g, { end: !1 });
    });
  }
  async function n(t, a, i) {
    let l = 0, s = c.join(a, t);
    for (let p = 0; p < 3; p++)
      try {
        return await (0, d.unlink)(s), s;
      } catch (g) {
        if (g.code === "ENOENT")
          return s;
        i.warn(`Error on remove temp update file: ${g}`), s = c.join(a, `${l++}-${t}`);
      }
    return s;
  }
  return xt;
}
var Kt = {}, kr = {}, _l;
function Ld() {
  if (_l) return kr;
  _l = 1, Object.defineProperty(kr, "__esModule", { value: !0 }), kr.getAppCacheDir = f;
  const o = be, h = ut;
  function f() {
    const d = (0, h.homedir)();
    let c;
    return process.platform === "win32" ? c = process.env.LOCALAPPDATA || o.join(d, "AppData", "Local") : process.platform === "darwin" ? c = o.join(d, "Library", "Caches") : c = process.env.XDG_CACHE_HOME || o.join(d, ".cache"), c;
  }
  return kr;
}
var Sl;
function $d() {
  if (Sl) return Kt;
  Sl = 1, Object.defineProperty(Kt, "__esModule", { value: !0 }), Kt.ElectronAppAdapter = void 0;
  const o = be, h = Ld();
  let f = class {
    constructor(c = mt.app) {
      this.app = c;
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
      return this.isPackaged ? o.join(process.resourcesPath, "app-update.yml") : o.join(this.app.getAppPath(), "dev-app-update.yml");
    }
    get userDataPath() {
      return this.app.getPath("userData");
    }
    get baseCachePath() {
      return (0, h.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(c) {
      this.app.once("quit", (r, e) => c(e));
    }
  };
  return Kt.ElectronAppAdapter = f, Kt;
}
var Ki = {}, Al;
function Ud() {
  return Al || (Al = 1, function(o) {
    Object.defineProperty(o, "__esModule", { value: !0 }), o.ElectronHttpExecutor = o.NET_SESSION_NAME = void 0, o.getNetSession = f;
    const h = ke();
    o.NET_SESSION_NAME = "electron-updater";
    function f() {
      return mt.session.fromPartition(o.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class d extends h.HttpExecutor {
      constructor(r) {
        super(), this.proxyLoginCallback = r, this.cachedSession = null;
      }
      async download(r, e, n) {
        return await n.cancellationToken.createPromise((t, a, i) => {
          const l = {
            headers: n.headers || void 0,
            redirect: "manual"
          };
          (0, h.configureRequestUrl)(r, l), (0, h.configureRequestOptions)(l), this.doDownload(l, {
            destination: e,
            options: n,
            onCancel: i,
            callback: (s) => {
              s == null ? t(e) : a(s);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(r, e) {
        r.headers && r.headers.Host && (r.host = r.headers.Host, delete r.headers.Host), this.cachedSession == null && (this.cachedSession = f());
        const n = mt.net.request({
          ...r,
          session: this.cachedSession
        });
        return n.on("response", e), this.proxyLoginCallback != null && n.on("login", this.proxyLoginCallback), n;
      }
      addRedirectHandlers(r, e, n, t, a) {
        r.on("redirect", (i, l, s) => {
          r.abort(), t > this.maxRedirects ? n(this.createMaxRedirectError()) : a(h.HttpExecutor.prepareRedirectUrlOptions(s, e));
        });
      }
    }
    o.ElectronHttpExecutor = d;
  }(Ki)), Ki;
}
var Qt = {}, Rt = {}, Qi, bl;
function kd() {
  if (bl) return Qi;
  bl = 1;
  var o = "[object Symbol]", h = /[\\^$.*+?()[\]{}|]/g, f = RegExp(h.source), d = typeof Ze == "object" && Ze && Ze.Object === Object && Ze, c = typeof self == "object" && self && self.Object === Object && self, r = d || c || Function("return this")(), e = Object.prototype, n = e.toString, t = r.Symbol, a = t ? t.prototype : void 0, i = a ? a.toString : void 0;
  function l(m) {
    if (typeof m == "string")
      return m;
    if (p(m))
      return i ? i.call(m) : "";
    var b = m + "";
    return b == "0" && 1 / m == -1 / 0 ? "-0" : b;
  }
  function s(m) {
    return !!m && typeof m == "object";
  }
  function p(m) {
    return typeof m == "symbol" || s(m) && n.call(m) == o;
  }
  function g(m) {
    return m == null ? "" : l(m);
  }
  function v(m) {
    return m = g(m), m && f.test(m) ? m.replace(h, "\\$&") : m;
  }
  return Qi = v, Qi;
}
var Tl;
function Ot() {
  if (Tl) return Rt;
  Tl = 1, Object.defineProperty(Rt, "__esModule", { value: !0 }), Rt.newBaseUrl = f, Rt.newUrlFromBase = d, Rt.getChannelFilename = c, Rt.blockmapFiles = r;
  const o = Ut, h = kd();
  function f(e) {
    const n = new o.URL(e);
    return n.pathname.endsWith("/") || (n.pathname += "/"), n;
  }
  function d(e, n, t = !1) {
    const a = new o.URL(e, n), i = n.search;
    return i != null && i.length !== 0 ? a.search = i : t && (a.search = `noCache=${Date.now().toString(32)}`), a;
  }
  function c(e) {
    return `${e}.yml`;
  }
  function r(e, n, t) {
    const a = d(`${e.pathname}.blockmap`, e);
    return [d(`${e.pathname.replace(new RegExp(h(t), "g"), n)}.blockmap`, e), a];
  }
  return Rt;
}
var lt = {}, Rl;
function rt() {
  if (Rl) return lt;
  Rl = 1, Object.defineProperty(lt, "__esModule", { value: !0 }), lt.Provider = void 0, lt.findFile = c, lt.parseUpdateInfo = r, lt.getFileList = e, lt.resolveFiles = n;
  const o = ke(), h = xo(), f = Ot();
  let d = class {
    constructor(a) {
      this.runtimeOptions = a, this.requestHeaders = null, this.executor = a.executor;
    }
    get isUseMultipleRangeRequest() {
      return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
    }
    getChannelFilePrefix() {
      if (this.runtimeOptions.platform === "linux") {
        const a = process.env.TEST_UPDATER_ARCH || process.arch;
        return "-linux" + (a === "x64" ? "" : `-${a}`);
      } else
        return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
    // due to historical reasons for windows we use channel name without platform specifier
    getDefaultChannelName() {
      return this.getCustomChannelName("latest");
    }
    getCustomChannelName(a) {
      return `${a}${this.getChannelFilePrefix()}`;
    }
    get fileExtraDownloadHeaders() {
      return null;
    }
    setRequestHeaders(a) {
      this.requestHeaders = a;
    }
    /**
     * Method to perform API request only to resolve update info, but not to download update.
     */
    httpRequest(a, i, l) {
      return this.executor.request(this.createRequestOptions(a, i), l);
    }
    createRequestOptions(a, i) {
      const l = {};
      return this.requestHeaders == null ? i != null && (l.headers = i) : l.headers = i == null ? this.requestHeaders : { ...this.requestHeaders, ...i }, (0, o.configureRequestUrl)(a, l), l;
    }
  };
  lt.Provider = d;
  function c(t, a, i) {
    if (t.length === 0)
      throw (0, o.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const l = t.find((s) => s.url.pathname.toLowerCase().endsWith(`.${a}`));
    return l ?? (i == null ? t[0] : t.find((s) => !i.some((p) => s.url.pathname.toLowerCase().endsWith(`.${p}`))));
  }
  function r(t, a, i) {
    if (t == null)
      throw (0, o.newError)(`Cannot parse update info from ${a} in the latest release artifacts (${i}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let l;
    try {
      l = (0, h.load)(t);
    } catch (s) {
      throw (0, o.newError)(`Cannot parse update info from ${a} in the latest release artifacts (${i}): ${s.stack || s.message}, rawData: ${t}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return l;
  }
  function e(t) {
    const a = t.files;
    if (a != null && a.length > 0)
      return a;
    if (t.path != null)
      return [
        {
          url: t.path,
          sha2: t.sha2,
          sha512: t.sha512
        }
      ];
    throw (0, o.newError)(`No files provided: ${(0, o.safeStringifyJson)(t)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function n(t, a, i = (l) => l) {
    const s = e(t).map((v) => {
      if (v.sha2 == null && v.sha512 == null)
        throw (0, o.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, o.safeStringifyJson)(v)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, f.newUrlFromBase)(i(v.url), a),
        info: v
      };
    }), p = t.packages, g = p == null ? null : p[process.arch] || p.ia32;
    return g != null && (s[0].packageInfo = {
      ...g,
      path: (0, f.newUrlFromBase)(i(g.path), a).href
    }), s;
  }
  return lt;
}
var Cl;
function ic() {
  if (Cl) return Qt;
  Cl = 1, Object.defineProperty(Qt, "__esModule", { value: !0 }), Qt.GenericProvider = void 0;
  const o = ke(), h = Ot(), f = rt();
  let d = class extends f.Provider {
    constructor(r, e, n) {
      super(n), this.configuration = r, this.updater = e, this.baseUrl = (0, h.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const r = this.updater.channel || this.configuration.channel;
      return r == null ? this.getDefaultChannelName() : this.getCustomChannelName(r);
    }
    async getLatestVersion() {
      const r = (0, h.getChannelFilename)(this.channel), e = (0, h.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let n = 0; ; n++)
        try {
          return (0, f.parseUpdateInfo)(await this.httpRequest(e), r, e);
        } catch (t) {
          if (t instanceof o.HttpError && t.statusCode === 404)
            throw (0, o.newError)(`Cannot find channel "${r}" update info: ${t.stack || t.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (t.code === "ECONNREFUSED" && n < 3) {
            await new Promise((a, i) => {
              try {
                setTimeout(a, 1e3 * n);
              } catch (l) {
                i(l);
              }
            });
            continue;
          }
          throw t;
        }
    }
    resolveFiles(r) {
      return (0, f.resolveFiles)(r, this.baseUrl);
    }
  };
  return Qt.GenericProvider = d, Qt;
}
var Zt = {}, er = {}, Ol;
function qd() {
  if (Ol) return er;
  Ol = 1, Object.defineProperty(er, "__esModule", { value: !0 }), er.BitbucketProvider = void 0;
  const o = ke(), h = Ot(), f = rt();
  let d = class extends f.Provider {
    constructor(r, e, n) {
      super({
        ...n,
        isUseMultipleRangeRequest: !1
      }), this.configuration = r, this.updater = e;
      const { owner: t, slug: a } = r;
      this.baseUrl = (0, h.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${t}/${a}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const r = new o.CancellationToken(), e = (0, h.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, h.newUrlFromBase)(e, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const t = await this.httpRequest(n, void 0, r);
        return (0, f.parseUpdateInfo)(t, e, n);
      } catch (t) {
        throw (0, o.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${t.stack || t.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(r) {
      return (0, f.resolveFiles)(r, this.baseUrl);
    }
    toString() {
      const { owner: r, slug: e } = this.configuration;
      return `Bitbucket (owner: ${r}, slug: ${e}, channel: ${this.channel})`;
    }
  };
  return er.BitbucketProvider = d, er;
}
var pt = {}, Dl;
function oc() {
  if (Dl) return pt;
  Dl = 1, Object.defineProperty(pt, "__esModule", { value: !0 }), pt.GitHubProvider = pt.BaseGitHubProvider = void 0, pt.computeReleaseNotes = a;
  const o = ke(), h = nc(), f = Ut, d = Ot(), c = rt(), r = /\/tag\/([^/]+)$/;
  class e extends c.Provider {
    constructor(l, s, p) {
      super({
        ...p,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = l, this.baseUrl = (0, d.newBaseUrl)((0, o.githubUrl)(l, s));
      const g = s === "github.com" ? "api.github.com" : s;
      this.baseApiUrl = (0, d.newBaseUrl)((0, o.githubUrl)(l, g));
    }
    computeGithubBasePath(l) {
      const s = this.options.host;
      return s && !["github.com", "api.github.com"].includes(s) ? `/api/v3${l}` : l;
    }
  }
  pt.BaseGitHubProvider = e;
  let n = class extends e {
    constructor(l, s, p) {
      super(l, "github.com", p), this.options = l, this.updater = s;
    }
    get channel() {
      const l = this.updater.channel || this.options.channel;
      return l == null ? this.getDefaultChannelName() : this.getCustomChannelName(l);
    }
    async getLatestVersion() {
      var l, s, p, g, v;
      const m = new o.CancellationToken(), b = await this.httpRequest((0, d.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, m), R = (0, o.parseXml)(b);
      let O = R.element("entry", !1, "No published versions on GitHub"), D = null;
      try {
        if (this.updater.allowPrerelease) {
          const q = ((l = this.updater) === null || l === void 0 ? void 0 : l.channel) || ((s = h.prerelease(this.updater.currentVersion)) === null || s === void 0 ? void 0 : s[0]) || null;
          if (q === null)
            D = r.exec(O.element("link").attribute("href"))[1];
          else
            for (const F of R.getElements("entry")) {
              const N = r.exec(F.element("link").attribute("href"));
              if (N === null)
                continue;
              const k = N[1], P = ((p = h.prerelease(k)) === null || p === void 0 ? void 0 : p[0]) || null, I = !q || ["alpha", "beta"].includes(q), L = P !== null && !["alpha", "beta"].includes(String(P));
              if (I && !L && !(q === "beta" && P === "alpha")) {
                D = k;
                break;
              }
              if (P && P === q) {
                D = k;
                break;
              }
            }
        } else {
          D = await this.getLatestTagName(m);
          for (const q of R.getElements("entry"))
            if (r.exec(q.element("link").attribute("href"))[1] === D) {
              O = q;
              break;
            }
        }
      } catch (q) {
        throw (0, o.newError)(`Cannot parse releases feed: ${q.stack || q.message},
XML:
${b}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if (D == null)
        throw (0, o.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let $, w = "", _ = "";
      const S = async (q) => {
        w = (0, d.getChannelFilename)(q), _ = (0, d.newUrlFromBase)(this.getBaseDownloadPath(String(D), w), this.baseUrl);
        const F = this.createRequestOptions(_);
        try {
          return await this.executor.request(F, m);
        } catch (N) {
          throw N instanceof o.HttpError && N.statusCode === 404 ? (0, o.newError)(`Cannot find ${w} in the latest release artifacts (${_}): ${N.stack || N.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : N;
        }
      };
      try {
        let q = this.channel;
        this.updater.allowPrerelease && (!((g = h.prerelease(D)) === null || g === void 0) && g[0]) && (q = this.getCustomChannelName(String((v = h.prerelease(D)) === null || v === void 0 ? void 0 : v[0]))), $ = await S(q);
      } catch (q) {
        if (this.updater.allowPrerelease)
          $ = await S(this.getDefaultChannelName());
        else
          throw q;
      }
      const E = (0, c.parseUpdateInfo)($, w, _);
      return E.releaseName == null && (E.releaseName = O.elementValueOrEmpty("title")), E.releaseNotes == null && (E.releaseNotes = a(this.updater.currentVersion, this.updater.fullChangelog, R, O)), {
        tag: D,
        ...E
      };
    }
    async getLatestTagName(l) {
      const s = this.options, p = s.host == null || s.host === "github.com" ? (0, d.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new f.URL(`${this.computeGithubBasePath(`/repos/${s.owner}/${s.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const g = await this.httpRequest(p, { Accept: "application/json" }, l);
        return g == null ? null : JSON.parse(g).tag_name;
      } catch (g) {
        throw (0, o.newError)(`Unable to find latest version on GitHub (${p}), please ensure a production release exists: ${g.stack || g.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(l) {
      return (0, c.resolveFiles)(l, this.baseUrl, (s) => this.getBaseDownloadPath(l.tag, s.replace(/ /g, "-")));
    }
    getBaseDownloadPath(l, s) {
      return `${this.basePath}/download/${l}/${s}`;
    }
  };
  pt.GitHubProvider = n;
  function t(i) {
    const l = i.elementValueOrEmpty("content");
    return l === "No content." ? "" : l;
  }
  function a(i, l, s, p) {
    if (!l)
      return t(p);
    const g = [];
    for (const v of s.getElements("entry")) {
      const m = /\/tag\/v?([^/]+)$/.exec(v.element("link").attribute("href"))[1];
      h.lt(i, m) && g.push({
        version: m,
        note: t(v)
      });
    }
    return g.sort((v, m) => h.rcompare(v.version, m.version));
  }
  return pt;
}
var tr = {}, Pl;
function Md() {
  if (Pl) return tr;
  Pl = 1, Object.defineProperty(tr, "__esModule", { value: !0 }), tr.KeygenProvider = void 0;
  const o = ke(), h = Ot(), f = rt();
  let d = class extends f.Provider {
    constructor(r, e, n) {
      super({
        ...n,
        isUseMultipleRangeRequest: !1
      }), this.configuration = r, this.updater = e, this.baseUrl = (0, h.newBaseUrl)(`https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const r = new o.CancellationToken(), e = (0, h.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, h.newUrlFromBase)(e, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const t = await this.httpRequest(n, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, r);
        return (0, f.parseUpdateInfo)(t, e, n);
      } catch (t) {
        throw (0, o.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${t.stack || t.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(r) {
      return (0, f.resolveFiles)(r, this.baseUrl);
    }
    toString() {
      const { account: r, product: e, platform: n } = this.configuration;
      return `Keygen (account: ${r}, product: ${e}, platform: ${n}, channel: ${this.channel})`;
    }
  };
  return tr.KeygenProvider = d, tr;
}
var rr = {}, Il;
function Bd() {
  if (Il) return rr;
  Il = 1, Object.defineProperty(rr, "__esModule", { value: !0 }), rr.PrivateGitHubProvider = void 0;
  const o = ke(), h = xo(), f = be, d = Ut, c = Ot(), r = oc(), e = rt();
  let n = class extends r.BaseGitHubProvider {
    constructor(a, i, l, s) {
      super(a, "api.github.com", s), this.updater = i, this.token = l;
    }
    createRequestOptions(a, i) {
      const l = super.createRequestOptions(a, i);
      return l.redirect = "manual", l;
    }
    async getLatestVersion() {
      const a = new o.CancellationToken(), i = (0, c.getChannelFilename)(this.getDefaultChannelName()), l = await this.getLatestVersionInfo(a), s = l.assets.find((v) => v.name === i);
      if (s == null)
        throw (0, o.newError)(`Cannot find ${i} in the release ${l.html_url || l.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const p = new d.URL(s.url);
      let g;
      try {
        g = (0, h.load)(await this.httpRequest(p, this.configureHeaders("application/octet-stream"), a));
      } catch (v) {
        throw v instanceof o.HttpError && v.statusCode === 404 ? (0, o.newError)(`Cannot find ${i} in the latest release artifacts (${p}): ${v.stack || v.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : v;
      }
      return g.assets = l.assets, g;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(a) {
      return {
        accept: a,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(a) {
      const i = this.updater.allowPrerelease;
      let l = this.basePath;
      i || (l = `${l}/latest`);
      const s = (0, c.newUrlFromBase)(l, this.baseUrl);
      try {
        const p = JSON.parse(await this.httpRequest(s, this.configureHeaders("application/vnd.github.v3+json"), a));
        return i ? p.find((g) => g.prerelease) || p[0] : p;
      } catch (p) {
        throw (0, o.newError)(`Unable to find latest version on GitHub (${s}), please ensure a production release exists: ${p.stack || p.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(a) {
      return (0, e.getFileList)(a).map((i) => {
        const l = f.posix.basename(i.url).replace(/ /g, "-"), s = a.assets.find((p) => p != null && p.name === l);
        if (s == null)
          throw (0, o.newError)(`Cannot find asset "${l}" in: ${JSON.stringify(a.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new d.URL(s.url),
          info: i
        };
      });
    }
  };
  return rr.PrivateGitHubProvider = n, rr;
}
var Nl;
function jd() {
  if (Nl) return Zt;
  Nl = 1, Object.defineProperty(Zt, "__esModule", { value: !0 }), Zt.isUrlProbablySupportMultiRangeRequests = e, Zt.createClient = n;
  const o = ke(), h = qd(), f = ic(), d = oc(), c = Md(), r = Bd();
  function e(t) {
    return !t.includes("s3.amazonaws.com");
  }
  function n(t, a, i) {
    if (typeof t == "string")
      throw (0, o.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const l = t.provider;
    switch (l) {
      case "github": {
        const s = t, p = (s.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || s.token;
        return p == null ? new d.GitHubProvider(s, a, i) : new r.PrivateGitHubProvider(s, a, p, i);
      }
      case "bitbucket":
        return new h.BitbucketProvider(t, a, i);
      case "keygen":
        return new c.KeygenProvider(t, a, i);
      case "s3":
      case "spaces":
        return new f.GenericProvider({
          provider: "generic",
          url: (0, o.getS3LikeProviderBaseUrl)(t),
          channel: t.channel || null
        }, a, {
          ...i,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const s = t;
        return new f.GenericProvider(s, a, {
          ...i,
          isUseMultipleRangeRequest: s.useMultipleRangeRequest !== !1 && e(s.url)
        });
      }
      case "custom": {
        const s = t, p = s.updateProvider;
        if (!p)
          throw (0, o.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new p(s, a, i);
      }
      default:
        throw (0, o.newError)(`Unsupported provider: ${l}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return Zt;
}
var nr = {}, ir = {}, Lt = {}, $t = {}, Fl;
function Bo() {
  if (Fl) return $t;
  Fl = 1, Object.defineProperty($t, "__esModule", { value: !0 }), $t.OperationKind = void 0, $t.computeOperations = h;
  var o;
  (function(e) {
    e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
  })(o || ($t.OperationKind = o = {}));
  function h(e, n, t) {
    const a = r(e.files), i = r(n.files);
    let l = null;
    const s = n.files[0], p = [], g = s.name, v = a.get(g);
    if (v == null)
      throw new Error(`no file ${g} in old blockmap`);
    const m = i.get(g);
    let b = 0;
    const { checksumToOffset: R, checksumToOldSize: O } = c(a.get(g), v.offset, t);
    let D = s.offset;
    for (let $ = 0; $ < m.checksums.length; D += m.sizes[$], $++) {
      const w = m.sizes[$], _ = m.checksums[$];
      let S = R.get(_);
      S != null && O.get(_) !== w && (t.warn(`Checksum ("${_}") matches, but size differs (old: ${O.get(_)}, new: ${w})`), S = void 0), S === void 0 ? (b++, l != null && l.kind === o.DOWNLOAD && l.end === D ? l.end += w : (l = {
        kind: o.DOWNLOAD,
        start: D,
        end: D + w
        // oldBlocks: null,
      }, d(l, p, _, $))) : l != null && l.kind === o.COPY && l.end === S ? l.end += w : (l = {
        kind: o.COPY,
        start: S,
        end: S + w
        // oldBlocks: [checksum]
      }, d(l, p, _, $));
    }
    return b > 0 && t.info(`File${s.name === "file" ? "" : " " + s.name} has ${b} changed blocks`), p;
  }
  const f = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function d(e, n, t, a) {
    if (f && n.length !== 0) {
      const i = n[n.length - 1];
      if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
        const l = [i.start, i.end, e.start, e.end].reduce((s, p) => s < p ? s : p);
        throw new Error(`operation (block index: ${a}, checksum: ${t}, kind: ${o[e.kind]}) overlaps previous operation (checksum: ${t}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - l} until ${i.end - l} and ${e.start - l} until ${e.end - l}`);
      }
    }
    n.push(e);
  }
  function c(e, n, t) {
    const a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    let l = n;
    for (let s = 0; s < e.checksums.length; s++) {
      const p = e.checksums[s], g = e.sizes[s], v = i.get(p);
      if (v === void 0)
        a.set(p, l), i.set(p, g);
      else if (t.debug != null) {
        const m = v === g ? "(same size)" : `(size: ${v}, this size: ${g})`;
        t.debug(`${p} duplicated in blockmap ${m}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      l += g;
    }
    return { checksumToOffset: a, checksumToOldSize: i };
  }
  function r(e) {
    const n = /* @__PURE__ */ new Map();
    for (const t of e)
      n.set(t.name, t);
    return n;
  }
  return $t;
}
var xl;
function sc() {
  if (xl) return Lt;
  xl = 1, Object.defineProperty(Lt, "__esModule", { value: !0 }), Lt.DataSplitter = void 0, Lt.copyData = e;
  const o = ke(), h = Ve, f = mr, d = Bo(), c = Buffer.from(`\r
\r
`);
  var r;
  (function(t) {
    t[t.INIT = 0] = "INIT", t[t.HEADER = 1] = "HEADER", t[t.BODY = 2] = "BODY";
  })(r || (r = {}));
  function e(t, a, i, l, s) {
    const p = (0, h.createReadStream)("", {
      fd: i,
      autoClose: !1,
      start: t.start,
      // end is inclusive
      end: t.end - 1
    });
    p.on("error", l), p.once("end", s), p.pipe(a, {
      end: !1
    });
  }
  let n = class extends f.Writable {
    constructor(a, i, l, s, p, g) {
      super(), this.out = a, this.options = i, this.partIndexToTaskIndex = l, this.partIndexToLength = p, this.finishHandler = g, this.partIndex = -1, this.headerListBuffer = null, this.readState = r.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = s.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(a, i, l) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${a.length} bytes`);
        return;
      }
      this.handleData(a).then(l).catch(l);
    }
    async handleData(a) {
      let i = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, o.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const l = Math.min(this.ignoreByteCount, a.length);
        this.ignoreByteCount -= l, i = l;
      } else if (this.remainingPartDataCount > 0) {
        const l = Math.min(this.remainingPartDataCount, a.length);
        this.remainingPartDataCount -= l, await this.processPartData(a, 0, l), i = l;
      }
      if (i !== a.length) {
        if (this.readState === r.HEADER) {
          const l = this.searchHeaderListEnd(a, i);
          if (l === -1)
            return;
          i = l, this.readState = r.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === r.BODY)
            this.readState = r.INIT;
          else {
            this.partIndex++;
            let g = this.partIndexToTaskIndex.get(this.partIndex);
            if (g == null)
              if (this.isFinished)
                g = this.options.end;
              else
                throw (0, o.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const v = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (v < g)
              await this.copyExistingData(v, g);
            else if (v > g)
              throw (0, o.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (i = this.searchHeaderListEnd(a, i), i === -1) {
              this.readState = r.HEADER;
              return;
            }
          }
          const l = this.partIndexToLength[this.partIndex], s = i + l, p = Math.min(s, a.length);
          if (await this.processPartStarted(a, i, p), this.remainingPartDataCount = l - (p - i), this.remainingPartDataCount > 0)
            return;
          if (i = s + this.boundaryLength, i >= a.length) {
            this.ignoreByteCount = this.boundaryLength - (a.length - s);
            return;
          }
        }
      }
    }
    copyExistingData(a, i) {
      return new Promise((l, s) => {
        const p = () => {
          if (a === i) {
            l();
            return;
          }
          const g = this.options.tasks[a];
          if (g.kind !== d.OperationKind.COPY) {
            s(new Error("Task kind must be COPY"));
            return;
          }
          e(g, this.out, this.options.oldFileFd, s, () => {
            a++, p();
          });
        };
        p();
      });
    }
    searchHeaderListEnd(a, i) {
      const l = a.indexOf(c, i);
      if (l !== -1)
        return l + c.length;
      const s = i === 0 ? a : a.slice(i);
      return this.headerListBuffer == null ? this.headerListBuffer = s : this.headerListBuffer = Buffer.concat([this.headerListBuffer, s]), -1;
    }
    onPartEnd() {
      const a = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== a)
        throw (0, o.newError)(`Expected length: ${a} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(a, i, l) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(a, i, l);
    }
    processPartData(a, i, l) {
      this.actualPartLength += l - i;
      const s = this.out;
      return s.write(i === 0 && a.length === l ? a : a.slice(i, l)) ? Promise.resolve() : new Promise((p, g) => {
        s.on("error", g), s.once("drain", () => {
          s.removeListener("error", g), p();
        });
      });
    }
  };
  return Lt.DataSplitter = n, Lt;
}
var or = {}, Ll;
function Hd() {
  if (Ll) return or;
  Ll = 1, Object.defineProperty(or, "__esModule", { value: !0 }), or.executeTasksUsingMultipleRangeRequests = d, or.checkIsRangesSupported = r;
  const o = ke(), h = sc(), f = Bo();
  function d(e, n, t, a, i) {
    const l = (s) => {
      if (s >= n.length) {
        e.fileMetadataBuffer != null && t.write(e.fileMetadataBuffer), t.end();
        return;
      }
      const p = s + 1e3;
      c(e, {
        tasks: n,
        start: s,
        end: Math.min(n.length, p),
        oldFileFd: a
      }, t, () => l(p), i);
    };
    return l;
  }
  function c(e, n, t, a, i) {
    let l = "bytes=", s = 0;
    const p = /* @__PURE__ */ new Map(), g = [];
    for (let b = n.start; b < n.end; b++) {
      const R = n.tasks[b];
      R.kind === f.OperationKind.DOWNLOAD && (l += `${R.start}-${R.end - 1}, `, p.set(s, b), s++, g.push(R.end - R.start));
    }
    if (s <= 1) {
      const b = (R) => {
        if (R >= n.end) {
          a();
          return;
        }
        const O = n.tasks[R++];
        if (O.kind === f.OperationKind.COPY)
          (0, h.copyData)(O, t, n.oldFileFd, i, () => b(R));
        else {
          const D = e.createRequestOptions();
          D.headers.Range = `bytes=${O.start}-${O.end - 1}`;
          const $ = e.httpExecutor.createRequest(D, (w) => {
            r(w, i) && (w.pipe(t, {
              end: !1
            }), w.once("end", () => b(R)));
          });
          e.httpExecutor.addErrorAndTimeoutHandlers($, i), $.end();
        }
      };
      b(n.start);
      return;
    }
    const v = e.createRequestOptions();
    v.headers.Range = l.substring(0, l.length - 2);
    const m = e.httpExecutor.createRequest(v, (b) => {
      if (!r(b, i))
        return;
      const R = (0, o.safeGetHeader)(b, "content-type"), O = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(R);
      if (O == null) {
        i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${R}"`));
        return;
      }
      const D = new h.DataSplitter(t, n, p, O[1] || O[2], g, a);
      D.on("error", i), b.pipe(D), b.on("end", () => {
        setTimeout(() => {
          m.abort(), i(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    e.httpExecutor.addErrorAndTimeoutHandlers(m, i), m.end();
  }
  function r(e, n) {
    if (e.statusCode >= 400)
      return n((0, o.createHttpError)(e)), !1;
    if (e.statusCode !== 206) {
      const t = (0, o.safeGetHeader)(e, "accept-ranges");
      if (t == null || t === "none")
        return n(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
    }
    return !0;
  }
  return or;
}
var sr = {}, $l;
function Gd() {
  if ($l) return sr;
  $l = 1, Object.defineProperty(sr, "__esModule", { value: !0 }), sr.ProgressDifferentialDownloadCallbackTransform = void 0;
  const o = mr;
  var h;
  (function(d) {
    d[d.COPY = 0] = "COPY", d[d.DOWNLOAD = 1] = "DOWNLOAD";
  })(h || (h = {}));
  let f = class extends o.Transform {
    constructor(c, r, e) {
      super(), this.progressDifferentialDownloadInfo = c, this.cancellationToken = r, this.onProgress = e, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = h.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(c, r, e) {
      if (this.cancellationToken.cancelled) {
        e(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == h.COPY) {
        e(null, c);
        return;
      }
      this.transferred += c.length, this.delta += c.length;
      const n = Date.now();
      n >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = n + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((n - this.start) / 1e3))
      }), this.delta = 0), e(null, c);
    }
    beginFileCopy() {
      this.operationType = h.COPY;
    }
    beginRangeDownload() {
      this.operationType = h.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
    _flush(c) {
      if (this.cancellationToken.cancelled) {
        c(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, this.transferred = 0, c(null);
    }
  };
  return sr.ProgressDifferentialDownloadCallbackTransform = f, sr;
}
var Ul;
function ac() {
  if (Ul) return ir;
  Ul = 1, Object.defineProperty(ir, "__esModule", { value: !0 }), ir.DifferentialDownloader = void 0;
  const o = ke(), h = /* @__PURE__ */ gt(), f = Ve, d = sc(), c = Ut, r = Bo(), e = Hd(), n = Gd();
  let t = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(s, p, g) {
      this.blockAwareFileInfo = s, this.httpExecutor = p, this.options = g, this.fileMetadataBuffer = null, this.logger = g.logger;
    }
    createRequestOptions() {
      const s = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, o.configureRequestUrl)(this.options.newUrl, s), (0, o.configureRequestOptions)(s), s;
    }
    doDownload(s, p) {
      if (s.version !== p.version)
        throw new Error(`version is different (${s.version} - ${p.version}), full download is required`);
      const g = this.logger, v = (0, r.computeOperations)(s, p, g);
      g.debug != null && g.debug(JSON.stringify(v, null, 2));
      let m = 0, b = 0;
      for (const O of v) {
        const D = O.end - O.start;
        O.kind === r.OperationKind.DOWNLOAD ? m += D : b += D;
      }
      const R = this.blockAwareFileInfo.size;
      if (m + b + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== R)
        throw new Error(`Internal error, size mismatch: downloadSize: ${m}, copySize: ${b}, newSize: ${R}`);
      return g.info(`Full: ${a(R)}, To download: ${a(m)} (${Math.round(m / (R / 100))}%)`), this.downloadFile(v);
    }
    downloadFile(s) {
      const p = [], g = () => Promise.all(p.map((v) => (0, h.close)(v.descriptor).catch((m) => {
        this.logger.error(`cannot close file "${v.path}": ${m}`);
      })));
      return this.doDownloadFile(s, p).then(g).catch((v) => g().catch((m) => {
        try {
          this.logger.error(`cannot close files: ${m}`);
        } catch (b) {
          try {
            console.error(b);
          } catch {
          }
        }
        throw v;
      }).then(() => {
        throw v;
      }));
    }
    async doDownloadFile(s, p) {
      const g = await (0, h.open)(this.options.oldFile, "r");
      p.push({ descriptor: g, path: this.options.oldFile });
      const v = await (0, h.open)(this.options.newFile, "w");
      p.push({ descriptor: v, path: this.options.newFile });
      const m = (0, f.createWriteStream)(this.options.newFile, { fd: v });
      await new Promise((b, R) => {
        const O = [];
        let D;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const N = [];
          let k = 0;
          for (const I of s)
            I.kind === r.OperationKind.DOWNLOAD && (N.push(I.end - I.start), k += I.end - I.start);
          const P = {
            expectedByteCounts: N,
            grandTotal: k
          };
          D = new n.ProgressDifferentialDownloadCallbackTransform(P, this.options.cancellationToken, this.options.onProgress), O.push(D);
        }
        const $ = new o.DigestTransform(this.blockAwareFileInfo.sha512);
        $.isValidateOnEnd = !1, O.push($), m.on("finish", () => {
          m.close(() => {
            p.splice(1, 1);
            try {
              $.validate();
            } catch (N) {
              R(N);
              return;
            }
            b(void 0);
          });
        }), O.push(m);
        let w = null;
        for (const N of O)
          N.on("error", R), w == null ? w = N : w = w.pipe(N);
        const _ = O[0];
        let S;
        if (this.options.isUseMultipleRangeRequest) {
          S = (0, e.executeTasksUsingMultipleRangeRequests)(this, s, _, g, R), S(0);
          return;
        }
        let E = 0, q = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const F = this.createRequestOptions();
        F.redirect = "manual", S = (N) => {
          var k, P;
          if (N >= s.length) {
            this.fileMetadataBuffer != null && _.write(this.fileMetadataBuffer), _.end();
            return;
          }
          const I = s[N++];
          if (I.kind === r.OperationKind.COPY) {
            D && D.beginFileCopy(), (0, d.copyData)(I, _, g, R, () => S(N));
            return;
          }
          const L = `bytes=${I.start}-${I.end - 1}`;
          F.headers.range = L, (P = (k = this.logger) === null || k === void 0 ? void 0 : k.debug) === null || P === void 0 || P.call(k, `download range: ${L}`), D && D.beginRangeDownload();
          const M = this.httpExecutor.createRequest(F, (K) => {
            K.on("error", R), K.on("aborted", () => {
              R(new Error("response has been aborted by the server"));
            }), K.statusCode >= 400 && R((0, o.createHttpError)(K)), K.pipe(_, {
              end: !1
            }), K.once("end", () => {
              D && D.endRangeDownload(), ++E === 100 ? (E = 0, setTimeout(() => S(N), 1e3)) : S(N);
            });
          });
          M.on("redirect", (K, V, ne) => {
            this.logger.info(`Redirect to ${i(ne)}`), q = ne, (0, o.configureRequestUrl)(new c.URL(q), F), M.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers(M, R), M.end();
        }, S(0);
      });
    }
    async readRemoteBytes(s, p) {
      const g = Buffer.allocUnsafe(p + 1 - s), v = this.createRequestOptions();
      v.headers.range = `bytes=${s}-${p}`;
      let m = 0;
      if (await this.request(v, (b) => {
        b.copy(g, m), m += b.length;
      }), m !== g.length)
        throw new Error(`Received data length ${m} is not equal to expected ${g.length}`);
      return g;
    }
    request(s, p) {
      return new Promise((g, v) => {
        const m = this.httpExecutor.createRequest(s, (b) => {
          (0, e.checkIsRangesSupported)(b, v) && (b.on("error", v), b.on("aborted", () => {
            v(new Error("response has been aborted by the server"));
          }), b.on("data", p), b.on("end", () => g()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(m, v), m.end();
      });
    }
  };
  ir.DifferentialDownloader = t;
  function a(l, s = " KB") {
    return new Intl.NumberFormat("en").format((l / 1024).toFixed(2)) + s;
  }
  function i(l) {
    const s = l.indexOf("?");
    return s < 0 ? l : l.substring(0, s);
  }
  return ir;
}
var kl;
function Vd() {
  if (kl) return nr;
  kl = 1, Object.defineProperty(nr, "__esModule", { value: !0 }), nr.GenericDifferentialDownloader = void 0;
  const o = ac();
  let h = class extends o.DifferentialDownloader {
    download(d, c) {
      return this.doDownload(d, c);
    }
  };
  return nr.GenericDifferentialDownloader = h, nr;
}
var ql;
function jo() {
  if (ql) return Tt;
  ql = 1, Object.defineProperty(Tt, "__esModule", { value: !0 }), Tt.NoOpLogger = Tt.AppUpdater = void 0;
  const o = ke(), h = kt, f = ut, d = Br, c = /* @__PURE__ */ gt(), r = xo(), e = ld(), n = be, t = nc(), a = xd(), i = $d(), l = Ud(), s = ic(), p = jt(), g = jd(), v = Iu, m = Ot(), b = Vd();
  let R = class lc extends d.EventEmitter {
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
    set channel(w) {
      if (this._channel != null) {
        if (typeof w != "string")
          throw (0, o.newError)(`Channel must be a string, but got: ${w}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (w.length === 0)
          throw (0, o.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = w, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(w) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: w
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
    set logger(w) {
      this._logger = w ?? new D();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(w) {
      this.clientPromise = null, this._appUpdateConfigPath = w, this.configOnDisk = new e.Lazy(() => this.loadUpdateConfig());
    }
    constructor(w, _) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new p.UpdaterSignal(this), this._appUpdateConfigPath = null, this.clientPromise = null, this.stagingUserIdPromise = new e.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new e.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (q) => {
        this._logger.error(`Error: ${q.stack || q.message}`);
      }), _ == null ? (this.app = new i.ElectronAppAdapter(), this.httpExecutor = new l.ElectronHttpExecutor((q, F) => this.emit("login", q, F))) : (this.app = _, this.httpExecutor = null);
      const S = this.app.version, E = (0, t.parse)(S);
      if (E == null)
        throw (0, o.newError)(`App version is not a valid semver version: "${S}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = E, this.allowPrerelease = O(E), w != null && (this.setFeedURL(w), typeof w != "string" && w.requestHeaders && (this.requestHeaders = w.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(w) {
      const _ = this.createProviderRuntimeOptions();
      let S;
      typeof w == "string" ? S = new s.GenericProvider({ provider: "generic", url: w }, this, {
        ..._,
        isUseMultipleRangeRequest: (0, g.isUrlProbablySupportMultiRangeRequests)(w)
      }) : S = (0, g.createClient)(w, this, _), this.clientPromise = Promise.resolve(S);
    }
    /**
     * Asks the server whether there is an update.
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let w = this.checkForUpdatesPromise;
      if (w != null)
        return this._logger.info("Checking for update (already in progress)"), w;
      const _ = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), w = this.doCheckForUpdates().then((S) => (_(), S)).catch((S) => {
        throw _(), this.emit("error", S, `Cannot check for updates: ${(S.stack || S).toString()}`), S;
      }), this.checkForUpdatesPromise = w, w;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(w) {
      return this.checkForUpdates().then((_) => _ != null && _.downloadPromise ? (_.downloadPromise.then(() => {
        const S = lc.formatDownloadNotification(_.updateInfo.version, this.app.name, w);
        new mt.Notification(S).show();
      }), _) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), _));
    }
    static formatDownloadNotification(w, _, S) {
      return S == null && (S = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), S = {
        title: S.title.replace("{appName}", _).replace("{version}", w),
        body: S.body.replace("{appName}", _).replace("{version}", w)
      }, S;
    }
    async isStagingMatch(w) {
      const _ = w.stagingPercentage;
      let S = _;
      if (S == null)
        return !0;
      if (S = parseInt(S, 10), isNaN(S))
        return this._logger.warn(`Staging percentage is NaN: ${_}`), !0;
      S = S / 100;
      const E = await this.stagingUserIdPromise.value, F = o.UUID.parse(E).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${S}, percentage: ${F}, user id: ${E}`), F < S;
    }
    computeFinalHeaders(w) {
      return this.requestHeaders != null && Object.assign(w, this.requestHeaders), w;
    }
    async isUpdateAvailable(w) {
      const _ = (0, t.parse)(w.version);
      if (_ == null)
        throw (0, o.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${w.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const S = this.currentVersion;
      if ((0, t.eq)(_, S))
        return !1;
      const E = w == null ? void 0 : w.minimumSystemVersion, q = (0, f.release)();
      if (E)
        try {
          if ((0, t.lt)(q, E))
            return this._logger.info(`Current OS version ${q} is less than the minimum OS version required ${E} for version ${q}`), !1;
        } catch (P) {
          this._logger.warn(`Failed to compare current OS version(${q}) with minimum OS version(${E}): ${(P.message || P).toString()}`);
        }
      if (!await this.isStagingMatch(w))
        return !1;
      const N = (0, t.gt)(_, S), k = (0, t.lt)(_, S);
      return N ? !0 : this.allowDowngrade && k;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((S) => (0, g.createClient)(S, this, this.createProviderRuntimeOptions())));
      const w = await this.clientPromise, _ = await this.stagingUserIdPromise.value;
      return w.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": _ })), {
        info: await w.getLatestVersion(),
        provider: w
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
      const w = await this.getUpdateInfoAndProvider(), _ = w.info;
      if (!await this.isUpdateAvailable(_))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${_.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", _), {
          versionInfo: _,
          updateInfo: _
        };
      this.updateInfoAndProvider = w, this.onUpdateAvailable(_);
      const S = new o.CancellationToken();
      return {
        versionInfo: _,
        updateInfo: _,
        cancellationToken: S,
        downloadPromise: this.autoDownload ? this.downloadUpdate(S) : null
      };
    }
    onUpdateAvailable(w) {
      this._logger.info(`Found version ${w.version} (url: ${(0, o.asArray)(w.files).map((_) => _.url).join(", ")})`), this.emit("update-available", w);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(w = new o.CancellationToken()) {
      const _ = this.updateInfoAndProvider;
      if (_ == null) {
        const E = new Error("Please check update first");
        return this.dispatchError(E), Promise.reject(E);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, o.asArray)(_.info.files).map((E) => E.url).join(", ")}`);
      const S = (E) => {
        if (!(E instanceof o.CancellationError))
          try {
            this.dispatchError(E);
          } catch (q) {
            this._logger.warn(`Cannot dispatch error event: ${q.stack || q}`);
          }
        return E;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: _,
        requestHeaders: this.computeRequestHeaders(_.provider),
        cancellationToken: w,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((E) => {
        throw S(E);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(w) {
      this.emit("error", w, (w.stack || w).toString());
    }
    dispatchUpdateDownloaded(w) {
      this.emit(p.UPDATE_DOWNLOADED, w);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, r.load)(await (0, c.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(w) {
      const _ = w.fileExtraDownloadHeaders;
      if (_ != null) {
        const S = this.requestHeaders;
        return S == null ? _ : {
          ..._,
          ...S
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const w = n.join(this.app.userDataPath, ".updaterId");
      try {
        const S = await (0, c.readFile)(w, "utf-8");
        if (o.UUID.check(S))
          return S;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${S}`);
      } catch (S) {
        S.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${S}`);
      }
      const _ = o.UUID.v5((0, h.randomBytes)(4096), o.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${_}`);
      try {
        await (0, c.outputFile)(w, _);
      } catch (S) {
        this._logger.warn(`Couldn't write out staging user ID: ${S}`);
      }
      return _;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const w = this.requestHeaders;
      if (w == null)
        return !0;
      for (const _ of Object.keys(w)) {
        const S = _.toLowerCase();
        if (S === "authorization" || S === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let w = this.downloadedUpdateHelper;
      if (w == null) {
        const _ = (await this.configOnDisk.value).updaterCacheDirName, S = this._logger;
        _ == null && S.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const E = n.join(this.app.baseCachePath, _ || this.app.name);
        S.debug != null && S.debug(`updater cache dir: ${E}`), w = new a.DownloadedUpdateHelper(E), this.downloadedUpdateHelper = w;
      }
      return w;
    }
    async executeDownload(w) {
      const _ = w.fileInfo, S = {
        headers: w.downloadUpdateOptions.requestHeaders,
        cancellationToken: w.downloadUpdateOptions.cancellationToken,
        sha2: _.info.sha2,
        sha512: _.info.sha512
      };
      this.listenerCount(p.DOWNLOAD_PROGRESS) > 0 && (S.onProgress = (ie) => this.emit(p.DOWNLOAD_PROGRESS, ie));
      const E = w.downloadUpdateOptions.updateInfoAndProvider.info, q = E.version, F = _.packageInfo;
      function N() {
        const ie = decodeURIComponent(w.fileInfo.url.pathname);
        return ie.endsWith(`.${w.fileExtension}`) ? n.basename(ie) : w.fileInfo.info.url;
      }
      const k = await this.getOrCreateDownloadHelper(), P = k.cacheDirForPendingUpdate;
      await (0, c.mkdir)(P, { recursive: !0 });
      const I = N();
      let L = n.join(P, I);
      const M = F == null ? null : n.join(P, `package-${q}${n.extname(F.path) || ".7z"}`), K = async (ie) => (await k.setDownloadedFile(L, M, E, _, I, ie), await w.done({
        ...E,
        downloadedFile: L
      }), M == null ? [L] : [L, M]), V = this._logger, ne = await k.validateDownloadedPath(L, E, _, V);
      if (ne != null)
        return L = ne, await K(!1);
      const ce = async () => (await k.clear().catch(() => {
      }), await (0, c.unlink)(L).catch(() => {
      })), ue = await (0, a.createTempUpdateFile)(`temp-${I}`, P, V);
      try {
        await w.task(ue, S, M, ce), await (0, o.retry)(() => (0, c.rename)(ue, L), 60, 500, 0, 0, (ie) => ie instanceof Error && /^EBUSY:/.test(ie.message));
      } catch (ie) {
        throw await ce(), ie instanceof o.CancellationError && (V.info("cancelled"), this.emit("update-cancelled", E)), ie;
      }
      return V.info(`New version ${q} has been downloaded to ${L}`), await K(!0);
    }
    async differentialDownloadInstaller(w, _, S, E, q) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const F = (0, m.blockmapFiles)(w.url, this.app.version, _.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${F[0]}", new: ${F[1]})`);
        const N = async (I) => {
          const L = await this.httpExecutor.downloadToBuffer(I, {
            headers: _.requestHeaders,
            cancellationToken: _.cancellationToken
          });
          if (L == null || L.length === 0)
            throw new Error(`Blockmap "${I.href}" is empty`);
          try {
            return JSON.parse((0, v.gunzipSync)(L).toString());
          } catch (M) {
            throw new Error(`Cannot parse blockmap "${I.href}", error: ${M}`);
          }
        }, k = {
          newUrl: w.url,
          oldFile: n.join(this.downloadedUpdateHelper.cacheDir, q),
          logger: this._logger,
          newFile: S,
          isUseMultipleRangeRequest: E.isUseMultipleRangeRequest,
          requestHeaders: _.requestHeaders,
          cancellationToken: _.cancellationToken
        };
        this.listenerCount(p.DOWNLOAD_PROGRESS) > 0 && (k.onProgress = (I) => this.emit(p.DOWNLOAD_PROGRESS, I));
        const P = await Promise.all(F.map((I) => N(I)));
        return await new b.GenericDifferentialDownloader(w.info, this.httpExecutor, k).download(P[0], P[1]), !1;
      } catch (F) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${F.stack || F}`), this._testOnlyOptions != null)
          throw F;
        return !0;
      }
    }
  };
  Tt.AppUpdater = R;
  function O($) {
    const w = (0, t.prerelease)($);
    return w != null && w.length > 0;
  }
  class D {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(w) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(w) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(w) {
    }
  }
  return Tt.NoOpLogger = D, Tt;
}
var Ml;
function wr() {
  if (Ml) return Xt;
  Ml = 1, Object.defineProperty(Xt, "__esModule", { value: !0 }), Xt.BaseUpdater = void 0;
  const o = gr, h = jo();
  let f = class extends h.AppUpdater {
    constructor(c, r) {
      super(c, r), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(c = !1, r = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(c, c ? r : this.autoRunAppAfterInstall) ? setImmediate(() => {
        mt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(c) {
      return super.executeDownload({
        ...c,
        done: (r) => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
      });
    }
    // must be sync (because quit even handler is not async)
    install(c = !1, r = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const e = this.downloadedUpdateHelper, n = e && e.file ? process.platform === "linux" ? e.file.replace(/ /g, "\\ ") : e.file : null, t = e == null ? null : e.downloadedFileInfo;
      if (n == null || t == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${c}, isForceRunAfter: ${r}`), this.doInstall({
          installerPath: n,
          isSilent: c,
          isForceRunAfter: r,
          isAdminRightsRequired: t.isAdminRightsRequired
        });
      } catch (a) {
        return this.dispatchError(a), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((c) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (c !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${c}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    wrapSudo() {
      const { name: c } = this.app, r = `"${c} would like to update"`, e = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), n = [e];
      return /kdesudo/i.test(e) ? (n.push("--comment", r), n.push("-c")) : /gksudo/i.test(e) ? n.push("--message", r) : /pkexec/i.test(e) && n.push("--disable-internal-agent"), n.join(" ");
    }
    spawnSyncLog(c, r = [], e = {}) {
      return this._logger.info(`Executing: ${c} with args: ${r}`), (0, o.spawnSync)(c, r, {
        env: { ...process.env, ...e },
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
    async spawnLog(c, r = [], e = void 0, n = "ignore") {
      return this._logger.info(`Executing: ${c} with args: ${r}`), new Promise((t, a) => {
        try {
          const i = { stdio: n, env: e, detached: !0 }, l = (0, o.spawn)(c, r, i);
          l.on("error", (s) => {
            a(s);
          }), l.unref(), l.pid !== void 0 && t(!0);
        } catch (i) {
          a(i);
        }
      });
    }
  };
  return Xt.BaseUpdater = f, Xt;
}
var ar = {}, lr = {}, Bl;
function uc() {
  if (Bl) return lr;
  Bl = 1, Object.defineProperty(lr, "__esModule", { value: !0 }), lr.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const o = /* @__PURE__ */ gt(), h = ac(), f = Iu;
  let d = class extends h.DifferentialDownloader {
    async download() {
      const n = this.blockAwareFileInfo, t = n.size, a = t - (n.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(a, t - 1);
      const i = c(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await r(this.options.oldFile), i);
    }
  };
  lr.FileWithEmbeddedBlockMapDifferentialDownloader = d;
  function c(e) {
    return JSON.parse((0, f.inflateRawSync)(e).toString());
  }
  async function r(e) {
    const n = await (0, o.open)(e, "r");
    try {
      const t = (await (0, o.fstat)(n)).size, a = Buffer.allocUnsafe(4);
      await (0, o.read)(n, a, 0, a.length, t - a.length);
      const i = Buffer.allocUnsafe(a.readUInt32BE(0));
      return await (0, o.read)(n, i, 0, i.length, t - a.length - i.length), await (0, o.close)(n), c(i);
    } catch (t) {
      throw await (0, o.close)(n), t;
    }
  }
  return lr;
}
var jl;
function Hl() {
  if (jl) return ar;
  jl = 1, Object.defineProperty(ar, "__esModule", { value: !0 }), ar.AppImageUpdater = void 0;
  const o = ke(), h = gr, f = /* @__PURE__ */ gt(), d = Ve, c = be, r = wr(), e = uc(), n = jt(), t = rt();
  let a = class extends r.BaseUpdater {
    constructor(l, s) {
      super(l, s);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(l) {
      const s = l.updateInfoAndProvider.provider, p = (0, t.findFile)(s.resolveFiles(l.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: p,
        downloadUpdateOptions: l,
        task: async (g, v) => {
          const m = process.env.APPIMAGE;
          if (m == null)
            throw (0, o.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          let b = !1;
          try {
            const R = {
              newUrl: p.url,
              oldFile: m,
              logger: this._logger,
              newFile: g,
              isUseMultipleRangeRequest: s.isUseMultipleRangeRequest,
              requestHeaders: l.requestHeaders,
              cancellationToken: l.cancellationToken
            };
            this.listenerCount(n.DOWNLOAD_PROGRESS) > 0 && (R.onProgress = (O) => this.emit(n.DOWNLOAD_PROGRESS, O)), await new e.FileWithEmbeddedBlockMapDifferentialDownloader(p.info, this.httpExecutor, R).download();
          } catch (R) {
            this._logger.error(`Cannot download differentially, fallback to full download: ${R.stack || R}`), b = process.platform === "linux";
          }
          b && await this.httpExecutor.download(p.url, g, v), await (0, f.chmod)(g, 493);
        }
      });
    }
    doInstall(l) {
      const s = process.env.APPIMAGE;
      if (s == null)
        throw (0, o.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, d.unlinkSync)(s);
      let p;
      const g = c.basename(s);
      c.basename(l.installerPath) === g || !/\d+\.\d+\.\d+/.test(g) ? p = s : p = c.join(c.dirname(s), c.basename(l.installerPath)), (0, h.execFileSync)("mv", ["-f", l.installerPath, p]), p !== s && this.emit("appimage-filename-updated", p);
      const v = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return l.isForceRunAfter ? this.spawnLog(p, [], v) : (v.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, h.execFileSync)(p, [], { env: v })), !0;
    }
  };
  return ar.AppImageUpdater = a, ar;
}
var ur = {}, Gl;
function Vl() {
  if (Gl) return ur;
  Gl = 1, Object.defineProperty(ur, "__esModule", { value: !0 }), ur.DebUpdater = void 0;
  const o = wr(), h = jt(), f = rt();
  let d = class extends o.BaseUpdater {
    constructor(r, e) {
      super(r, e);
    }
    /*** @private */
    doDownloadUpdate(r) {
      const e = r.updateInfoAndProvider.provider, n = (0, f.findFile)(e.resolveFiles(r.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: n,
        downloadUpdateOptions: r,
        task: async (t, a) => {
          this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (i) => this.emit(h.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(n.url, t, a);
        }
      });
    }
    doInstall(r) {
      const e = this.wrapSudo(), n = /pkexec/i.test(e) ? "" : '"', t = ["dpkg", "-i", r.installerPath, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(e, [`${n}/bin/bash`, "-c", `'${t.join(" ")}'${n}`]), r.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return ur.DebUpdater = d, ur;
}
var cr = {}, Wl;
function zl() {
  if (Wl) return cr;
  Wl = 1, Object.defineProperty(cr, "__esModule", { value: !0 }), cr.RpmUpdater = void 0;
  const o = wr(), h = jt(), f = rt();
  let d = class extends o.BaseUpdater {
    constructor(r, e) {
      super(r, e);
    }
    /*** @private */
    doDownloadUpdate(r) {
      const e = r.updateInfoAndProvider.provider, n = (0, f.findFile)(e.resolveFiles(r.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: n,
        downloadUpdateOptions: r,
        task: async (t, a) => {
          this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (i) => this.emit(h.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(n.url, t, a);
        }
      });
    }
    doInstall(r) {
      const e = r.installerPath, n = this.wrapSudo(), t = /pkexec/i.test(n) ? "" : '"', a = this.spawnSyncLog("which zypper");
      let i;
      return a ? i = [a, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", e] : i = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", e], this.spawnSyncLog(n, [`${t}/bin/bash`, "-c", `'${i.join(" ")}'${t}`]), r.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return cr.RpmUpdater = d, cr;
}
var fr = {}, Yl;
function Xl() {
  if (Yl) return fr;
  Yl = 1, Object.defineProperty(fr, "__esModule", { value: !0 }), fr.MacUpdater = void 0;
  const o = ke(), h = /* @__PURE__ */ gt(), f = Ve, d = be, c = Nu, r = jo(), e = rt(), n = gr, t = kt;
  let a = class extends r.AppUpdater {
    constructor(l, s) {
      super(l, s), this.nativeUpdater = mt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (p) => {
        this._logger.warn(p), this.emit("error", p);
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
      let s = l.updateInfoAndProvider.provider.resolveFiles(l.updateInfoAndProvider.info);
      const p = this._logger, g = "sysctl.proc_translated";
      let v = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), v = (0, n.execFileSync)("sysctl", [g], { encoding: "utf8" }).includes(`${g}: 1`), p.info(`Checked for macOS Rosetta environment (isRosetta=${v})`);
      } catch ($) {
        p.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${$}`);
      }
      let m = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const w = (0, n.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        p.info(`Checked 'uname -a': arm64=${w}`), m = m || w;
      } catch ($) {
        p.warn(`uname shell command to check for arm64 failed: ${$}`);
      }
      m = m || process.arch === "arm64" || v;
      const b = ($) => {
        var w;
        return $.url.pathname.includes("arm64") || ((w = $.info.url) === null || w === void 0 ? void 0 : w.includes("arm64"));
      };
      m && s.some(b) ? s = s.filter(($) => m === b($)) : s = s.filter(($) => !b($));
      const R = (0, e.findFile)(s, "zip", ["pkg", "dmg"]);
      if (R == null)
        throw (0, o.newError)(`ZIP file not provided: ${(0, o.safeStringifyJson)(s)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const O = l.updateInfoAndProvider.provider, D = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: R,
        downloadUpdateOptions: l,
        task: async ($, w) => {
          const _ = d.join(this.downloadedUpdateHelper.cacheDir, D), S = () => (0, h.pathExistsSync)(_) ? !l.disableDifferentialDownload : (p.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let E = !0;
          S() && (E = await this.differentialDownloadInstaller(R, l, $, O, D)), E && await this.httpExecutor.download(R.url, $, w);
        },
        done: ($) => {
          if (!l.disableDifferentialDownload)
            try {
              const w = d.join(this.downloadedUpdateHelper.cacheDir, D);
              (0, f.copyFileSync)($.downloadedFile, w);
            } catch (w) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${w.message}`);
            }
          return this.updateDownloaded(R, $);
        }
      });
    }
    async updateDownloaded(l, s) {
      var p;
      const g = s.downloadedFile, v = (p = l.info.size) !== null && p !== void 0 ? p : (await (0, h.stat)(g)).size, m = this._logger, b = `fileToProxy=${l.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${b})`), this.server = (0, c.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${b})`), this.server.on("close", () => {
        m.info(`Proxy server for native Squirrel.Mac is closed (${b})`);
      });
      const R = (O) => {
        const D = O.address();
        return typeof D == "string" ? D : `http://127.0.0.1:${D == null ? void 0 : D.port}`;
      };
      return await new Promise((O, D) => {
        const $ = (0, t.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), w = Buffer.from(`autoupdater:${$}`, "ascii"), _ = `/${(0, t.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (S, E) => {
          const q = S.url;
          if (m.info(`${q} requested`), q === "/") {
            if (!S.headers.authorization || S.headers.authorization.indexOf("Basic ") === -1) {
              E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), m.warn("No authenthication info");
              return;
            }
            const k = S.headers.authorization.split(" ")[1], P = Buffer.from(k, "base64").toString("ascii"), [I, L] = P.split(":");
            if (I !== "autoupdater" || L !== $) {
              E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), m.warn("Invalid authenthication credentials");
              return;
            }
            const M = Buffer.from(`{ "url": "${R(this.server)}${_}" }`);
            E.writeHead(200, { "Content-Type": "application/json", "Content-Length": M.length }), E.end(M);
            return;
          }
          if (!q.startsWith(_)) {
            m.warn(`${q} requested, but not supported`), E.writeHead(404), E.end();
            return;
          }
          m.info(`${_} requested by Squirrel.Mac, pipe ${g}`);
          let F = !1;
          E.on("finish", () => {
            F || (this.nativeUpdater.removeListener("error", D), O([]));
          });
          const N = (0, f.createReadStream)(g);
          N.on("error", (k) => {
            try {
              E.end();
            } catch (P) {
              m.warn(`cannot end response: ${P}`);
            }
            F = !0, this.nativeUpdater.removeListener("error", D), D(new Error(`Cannot pipe "${g}": ${k}`));
          }), E.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": v
          }), N.pipe(E);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${b})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${R(this.server)}, ${b})`), this.nativeUpdater.setFeedURL({
            url: R(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${w.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(s), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", D), this.nativeUpdater.checkForUpdates()) : O([]);
        });
      });
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists()) : (this.nativeUpdater.on("update-downloaded", () => {
        this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
      }), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return fr.MacUpdater = a, fr;
}
var dr = {}, qr = {}, Jl;
function Wd() {
  if (Jl) return qr;
  Jl = 1, Object.defineProperty(qr, "__esModule", { value: !0 }), qr.verifySignature = c;
  const o = ke(), h = gr, f = ut, d = be;
  function c(t, a, i) {
    return new Promise((l, s) => {
      const p = a.replace(/'/g, "''");
      i.info(`Verifying signature ${p}`), (0, h.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${p}' | ConvertTo-Json -Compress"`], {
        shell: !0,
        timeout: 20 * 1e3
      }, (g, v, m) => {
        var b;
        try {
          if (g != null || m) {
            e(i, g, m, s), l(null);
            return;
          }
          const R = r(v);
          if (R.Status === 0) {
            try {
              const w = d.normalize(R.Path), _ = d.normalize(a);
              if (i.info(`LiteralPath: ${w}. Update Path: ${_}`), w !== _) {
                e(i, new Error(`LiteralPath of ${w} is different than ${_}`), m, s), l(null);
                return;
              }
            } catch (w) {
              i.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(b = w.message) !== null && b !== void 0 ? b : w.stack}`);
            }
            const D = (0, o.parseDn)(R.SignerCertificate.Subject);
            let $ = !1;
            for (const w of t) {
              const _ = (0, o.parseDn)(w);
              if (_.size ? $ = Array.from(_.keys()).every((E) => _.get(E) === D.get(E)) : w === D.get("CN") && (i.warn(`Signature validated using only CN ${w}. Please add your full Distinguished Name (DN) to publisherNames configuration`), $ = !0), $) {
                l(null);
                return;
              }
            }
          }
          const O = `publisherNames: ${t.join(" | ")}, raw info: ` + JSON.stringify(R, (D, $) => D === "RawData" ? void 0 : $, 2);
          i.warn(`Sign verification failed, installer signed with incorrect certificate: ${O}`), l(O);
        } catch (R) {
          e(i, R, null, s), l(null);
          return;
        }
      });
    });
  }
  function r(t) {
    const a = JSON.parse(t);
    delete a.PrivateKey, delete a.IsOSBinary, delete a.SignatureType;
    const i = a.SignerCertificate;
    return i != null && (delete i.Archived, delete i.Extensions, delete i.Handle, delete i.HasPrivateKey, delete i.SubjectName), a;
  }
  function e(t, a, i, l) {
    if (n()) {
      t.warn(`Cannot execute Get-AuthenticodeSignature: ${a || i}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, h.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
    } catch (s) {
      t.warn(`Cannot execute ConvertTo-Json: ${s.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    a != null && l(a), i && l(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${i}. Failing signature validation due to unknown stderr.`));
  }
  function n() {
    const t = f.release();
    return t.startsWith("6.") && !t.startsWith("6.3");
  }
  return qr;
}
var Kl;
function Ql() {
  if (Kl) return dr;
  Kl = 1, Object.defineProperty(dr, "__esModule", { value: !0 }), dr.NsisUpdater = void 0;
  const o = ke(), h = be, f = wr(), d = uc(), c = jt(), r = rt(), e = /* @__PURE__ */ gt(), n = Wd(), t = Ut;
  let a = class extends f.BaseUpdater {
    constructor(l, s) {
      super(l, s), this._verifyUpdateCodeSignature = (p, g) => (0, n.verifySignature)(p, g, this._logger);
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
      const s = l.updateInfoAndProvider.provider, p = (0, r.findFile)(s.resolveFiles(l.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: l,
        fileInfo: p,
        task: async (g, v, m, b) => {
          const R = p.packageInfo, O = R != null && m != null;
          if (O && l.disableWebInstaller)
            throw (0, o.newError)(`Unable to download new version ${l.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !O && !l.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (O || l.disableDifferentialDownload || await this.differentialDownloadInstaller(p, l, g, s, o.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(p.url, g, v);
          const D = await this.verifySignature(g);
          if (D != null)
            throw await b(), (0, o.newError)(`New version ${l.updateInfoAndProvider.info.version} is not signed by the application owner: ${D}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (O && await this.differentialDownloadWebPackage(l, R, m, s))
            try {
              await this.httpExecutor.download(new t.URL(R.path), m, {
                headers: l.requestHeaders,
                cancellationToken: l.cancellationToken,
                sha512: R.sha512
              });
            } catch ($) {
              try {
                await (0, e.unlink)(m);
              } catch {
              }
              throw $;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(l) {
      let s;
      try {
        if (s = (await this.configOnDisk.value).publisherName, s == null)
          return null;
      } catch (p) {
        if (p.code === "ENOENT")
          return null;
        throw p;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(s) ? s : [s], l);
    }
    doInstall(l) {
      const s = ["--updated"];
      l.isSilent && s.push("/S"), l.isForceRunAfter && s.push("--force-run"), this.installDirectory && s.push(`/D=${this.installDirectory}`);
      const p = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      p != null && s.push(`--package-file=${p}`);
      const g = () => {
        this.spawnLog(h.join(process.resourcesPath, "elevate.exe"), [l.installerPath].concat(s)).catch((v) => this.dispatchError(v));
      };
      return l.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), g(), !0) : (this.spawnLog(l.installerPath, s).catch((v) => {
        const m = v.code;
        this._logger.info(`Cannot run installer: error code: ${m}, error message: "${v.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), m === "UNKNOWN" || m === "EACCES" ? g() : m === "ENOENT" ? mt.shell.openPath(l.installerPath).catch((b) => this.dispatchError(b)) : this.dispatchError(v);
      }), !0);
    }
    async differentialDownloadWebPackage(l, s, p, g) {
      if (s.blockMapSize == null)
        return !0;
      try {
        const v = {
          newUrl: new t.URL(s.path),
          oldFile: h.join(this.downloadedUpdateHelper.cacheDir, o.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: p,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: g.isUseMultipleRangeRequest,
          cancellationToken: l.cancellationToken
        };
        this.listenerCount(c.DOWNLOAD_PROGRESS) > 0 && (v.onProgress = (m) => this.emit(c.DOWNLOAD_PROGRESS, m)), await new d.FileWithEmbeddedBlockMapDifferentialDownloader(s, this.httpExecutor, v).download();
      } catch (v) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${v.stack || v}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return dr.NsisUpdater = a, dr;
}
var Zl;
function jt() {
  return Zl || (Zl = 1, function(o) {
    Object.defineProperty(o, "__esModule", { value: !0 }), o.UpdaterSignal = o.UPDATE_DOWNLOADED = o.DOWNLOAD_PROGRESS = o.NsisUpdater = o.MacUpdater = o.RpmUpdater = o.DebUpdater = o.AppImageUpdater = o.Provider = o.CancellationToken = o.NoOpLogger = o.AppUpdater = o.BaseUpdater = void 0;
    const h = ke();
    Object.defineProperty(o, "CancellationToken", { enumerable: !0, get: function() {
      return h.CancellationToken;
    } });
    const f = /* @__PURE__ */ gt(), d = be;
    var c = wr();
    Object.defineProperty(o, "BaseUpdater", { enumerable: !0, get: function() {
      return c.BaseUpdater;
    } });
    var r = jo();
    Object.defineProperty(o, "AppUpdater", { enumerable: !0, get: function() {
      return r.AppUpdater;
    } }), Object.defineProperty(o, "NoOpLogger", { enumerable: !0, get: function() {
      return r.NoOpLogger;
    } });
    var e = rt();
    Object.defineProperty(o, "Provider", { enumerable: !0, get: function() {
      return e.Provider;
    } });
    var n = Hl();
    Object.defineProperty(o, "AppImageUpdater", { enumerable: !0, get: function() {
      return n.AppImageUpdater;
    } });
    var t = Vl();
    Object.defineProperty(o, "DebUpdater", { enumerable: !0, get: function() {
      return t.DebUpdater;
    } });
    var a = zl();
    Object.defineProperty(o, "RpmUpdater", { enumerable: !0, get: function() {
      return a.RpmUpdater;
    } });
    var i = Xl();
    Object.defineProperty(o, "MacUpdater", { enumerable: !0, get: function() {
      return i.MacUpdater;
    } });
    var l = Ql();
    Object.defineProperty(o, "NsisUpdater", { enumerable: !0, get: function() {
      return l.NsisUpdater;
    } });
    let s;
    function p() {
      if (process.platform === "win32")
        s = new (Ql()).NsisUpdater();
      else if (process.platform === "darwin")
        s = new (Xl()).MacUpdater();
      else {
        s = new (Hl()).AppImageUpdater();
        try {
          const m = d.join(process.resourcesPath, "package-type");
          if (!(0, f.existsSync)(m))
            return s;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const b = (0, f.readFileSync)(m).toString().trim();
          switch (console.info("Found package-type:", b), b) {
            case "deb":
              s = new (Vl()).DebUpdater();
              break;
            case "rpm":
              s = new (zl()).RpmUpdater();
              break;
            default:
              break;
          }
        } catch (m) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", m.message);
        }
      }
      return s;
    }
    Object.defineProperty(o, "autoUpdater", {
      enumerable: !0,
      get: () => s || p()
    }), o.DOWNLOAD_PROGRESS = "download-progress", o.UPDATE_DOWNLOADED = "update-downloaded";
    class g {
      constructor(b) {
        this.emitter = b;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(b) {
        v(this.emitter, "login", b);
      }
      progress(b) {
        v(this.emitter, o.DOWNLOAD_PROGRESS, b);
      }
      updateDownloaded(b) {
        v(this.emitter, o.UPDATE_DOWNLOADED, b);
      }
      updateCancelled(b) {
        v(this.emitter, "update-cancelled", b);
      }
    }
    o.UpdaterSignal = g;
    function v(m, b, R) {
      m.on(b, R);
    }
  }(Zr)), Zr;
}
var Dt = jt(), hr = { exports: {} }, Zi = { exports: {} }, eu;
function cc() {
  return eu || (eu = 1, function(o) {
    let h = {};
    try {
      h = require("electron");
    } catch {
    }
    h.ipcRenderer && f(h), o.exports = f;
    function f({ contextBridge: d, ipcRenderer: c }) {
      if (!c)
        return;
      c.on("__ELECTRON_LOG_IPC__", (e, n) => {
        window.postMessage({ cmd: "message", ...n });
      }), c.invoke("__ELECTRON_LOG__", { cmd: "getOptions" }).catch((e) => console.error(new Error(
        `electron-log isn't initialized in the main process. Please call log.initialize() before. ${e.message}`
      )));
      const r = {
        sendToMain(e) {
          try {
            c.send("__ELECTRON_LOG__", e);
          } catch (n) {
            console.error("electronLog.sendToMain ", n, "data:", e), c.send("__ELECTRON_LOG__", {
              cmd: "errorHandler",
              error: { message: n == null ? void 0 : n.message, stack: n == null ? void 0 : n.stack },
              errorName: "sendToMain"
            });
          }
        },
        log(...e) {
          r.sendToMain({ data: e, level: "info" });
        }
      };
      for (const e of ["error", "warn", "info", "verbose", "debug", "silly"])
        r[e] = (...n) => r.sendToMain({
          data: n,
          level: e
        });
      if (d && process.contextIsolated)
        try {
          d.exposeInMainWorld("__electronLog", r);
        } catch {
        }
      typeof window == "object" ? window.__electronLog = r : __electronLog = r;
    }
  }(Zi)), Zi.exports;
}
var eo = { exports: {} }, to, tu;
function zd() {
  if (tu) return to;
  tu = 1, to = o;
  function o(h) {
    return Object.defineProperties(f, {
      defaultLabel: { value: "", writable: !0 },
      labelPadding: { value: !0, writable: !0 },
      maxLabelLength: { value: 0, writable: !0 },
      labelLength: {
        get() {
          switch (typeof f.labelPadding) {
            case "boolean":
              return f.labelPadding ? f.maxLabelLength : 0;
            case "number":
              return f.labelPadding;
            default:
              return 0;
          }
        }
      }
    });
    function f(d) {
      f.maxLabelLength = Math.max(f.maxLabelLength, d.length);
      const c = {};
      for (const r of h.levels)
        c[r] = (...e) => h.logData(e, { level: r, scope: d });
      return c.log = c.info, c;
    }
  }
  return to;
}
var ro, ru;
function Yd() {
  if (ru) return ro;
  ru = 1;
  class o {
    constructor({ processMessage: f }) {
      this.processMessage = f, this.buffer = [], this.enabled = !1, this.begin = this.begin.bind(this), this.commit = this.commit.bind(this), this.reject = this.reject.bind(this);
    }
    addMessage(f) {
      this.buffer.push(f);
    }
    begin() {
      this.enabled = [];
    }
    commit() {
      this.enabled = !1, this.buffer.forEach((f) => this.processMessage(f)), this.buffer = [];
    }
    reject() {
      this.enabled = !1, this.buffer = [];
    }
  }
  return ro = o, ro;
}
var no, nu;
function fc() {
  if (nu) return no;
  nu = 1;
  const o = zd(), h = Yd(), d = class d {
    constructor({
      allowUnknownLevel: r = !1,
      dependencies: e = {},
      errorHandler: n,
      eventLogger: t,
      initializeFn: a,
      isDev: i = !1,
      levels: l = ["error", "warn", "info", "verbose", "debug", "silly"],
      logId: s,
      transportFactories: p = {},
      variables: g
    } = {}) {
      Ae(this, "dependencies", {});
      Ae(this, "errorHandler", null);
      Ae(this, "eventLogger", null);
      Ae(this, "functions", {});
      Ae(this, "hooks", []);
      Ae(this, "isDev", !1);
      Ae(this, "levels", null);
      Ae(this, "logId", null);
      Ae(this, "scope", null);
      Ae(this, "transports", {});
      Ae(this, "variables", {});
      this.addLevel = this.addLevel.bind(this), this.create = this.create.bind(this), this.initialize = this.initialize.bind(this), this.logData = this.logData.bind(this), this.processMessage = this.processMessage.bind(this), this.allowUnknownLevel = r, this.buffering = new h(this), this.dependencies = e, this.initializeFn = a, this.isDev = i, this.levels = l, this.logId = s, this.scope = o(this), this.transportFactories = p, this.variables = g || {};
      for (const v of this.levels)
        this.addLevel(v, !1);
      this.log = this.info, this.functions.log = this.log, this.errorHandler = n, n == null || n.setOptions({ ...e, logFn: this.error }), this.eventLogger = t, t == null || t.setOptions({ ...e, logger: this });
      for (const [v, m] of Object.entries(p))
        this.transports[v] = m(this, e);
      d.instances[s] = this;
    }
    static getInstance({ logId: r }) {
      return this.instances[r] || this.instances.default;
    }
    addLevel(r, e = this.levels.length) {
      e !== !1 && this.levels.splice(e, 0, r), this[r] = (...n) => this.logData(n, { level: r }), this.functions[r] = this[r];
    }
    catchErrors(r) {
      return this.processMessage(
        {
          data: ["log.catchErrors is deprecated. Use log.errorHandler instead"],
          level: "warn"
        },
        { transports: ["console"] }
      ), this.errorHandler.startCatching(r);
    }
    create(r) {
      return typeof r == "string" && (r = { logId: r }), new d({
        dependencies: this.dependencies,
        errorHandler: this.errorHandler,
        initializeFn: this.initializeFn,
        isDev: this.isDev,
        transportFactories: this.transportFactories,
        variables: { ...this.variables },
        ...r
      });
    }
    compareLevels(r, e, n = this.levels) {
      const t = n.indexOf(r), a = n.indexOf(e);
      return a === -1 || t === -1 ? !0 : a <= t;
    }
    initialize(r = {}) {
      this.initializeFn({ logger: this, ...this.dependencies, ...r });
    }
    logData(r, e = {}) {
      this.buffering.enabled ? this.buffering.addMessage({ data: r, ...e }) : this.processMessage({ data: r, ...e });
    }
    processMessage(r, { transports: e = this.transports } = {}) {
      if (r.cmd === "errorHandler") {
        this.errorHandler.handle(r.error, {
          errorName: r.errorName,
          processType: "renderer",
          showDialog: !!r.showDialog
        });
        return;
      }
      let n = r.level;
      this.allowUnknownLevel || (n = this.levels.includes(r.level) ? r.level : "info");
      const t = {
        date: /* @__PURE__ */ new Date(),
        logId: this.logId,
        ...r,
        level: n,
        variables: {
          ...this.variables,
          ...r.variables
        }
      };
      for (const [a, i] of this.transportEntries(e))
        if (!(typeof i != "function" || i.level === !1) && this.compareLevels(i.level, r.level))
          try {
            const l = this.hooks.reduce((s, p) => s && p(s, i, a), t);
            l && i({ ...l, data: [...l.data] });
          } catch (l) {
            this.processInternalErrorFn(l);
          }
    }
    processInternalErrorFn(r) {
    }
    transportEntries(r = this.transports) {
      return (Array.isArray(r) ? r : Object.entries(r)).map((n) => {
        switch (typeof n) {
          case "string":
            return this.transports[n] ? [n, this.transports[n]] : null;
          case "function":
            return [n.name, n];
          default:
            return Array.isArray(n) ? n : null;
        }
      }).filter(Boolean);
    }
  };
  Ae(d, "instances", {});
  let f = d;
  return no = f, no;
}
var io, iu;
function Xd() {
  if (iu) return io;
  iu = 1;
  const o = console.error;
  class h {
    constructor({ logFn: d = null } = {}) {
      Ae(this, "logFn", null);
      Ae(this, "onError", null);
      Ae(this, "showDialog", !1);
      Ae(this, "preventDefault", !0);
      this.handleError = this.handleError.bind(this), this.handleRejection = this.handleRejection.bind(this), this.startCatching = this.startCatching.bind(this), this.logFn = d;
    }
    handle(d, {
      logFn: c = this.logFn,
      errorName: r = "",
      onError: e = this.onError,
      showDialog: n = this.showDialog
    } = {}) {
      try {
        (e == null ? void 0 : e({ error: d, errorName: r, processType: "renderer" })) !== !1 && c({ error: d, errorName: r, showDialog: n });
      } catch {
        o(d);
      }
    }
    setOptions({ logFn: d, onError: c, preventDefault: r, showDialog: e }) {
      typeof d == "function" && (this.logFn = d), typeof c == "function" && (this.onError = c), typeof r == "boolean" && (this.preventDefault = r), typeof e == "boolean" && (this.showDialog = e);
    }
    startCatching({ onError: d, showDialog: c } = {}) {
      this.isActive || (this.isActive = !0, this.setOptions({ onError: d, showDialog: c }), window.addEventListener("error", (r) => {
        var e;
        this.preventDefault && ((e = r.preventDefault) == null || e.call(r)), this.handleError(r.error || r);
      }), window.addEventListener("unhandledrejection", (r) => {
        var e;
        this.preventDefault && ((e = r.preventDefault) == null || e.call(r)), this.handleRejection(r.reason || r);
      }));
    }
    handleError(d) {
      this.handle(d, { errorName: "Unhandled" });
    }
    handleRejection(d) {
      const c = d instanceof Error ? d : new Error(JSON.stringify(d));
      this.handle(c, { errorName: "Unhandled rejection" });
    }
  }
  return io = h, io;
}
var oo, ou;
function Pt() {
  if (ou) return oo;
  ou = 1, oo = { transform: o };
  function o({
    logger: h,
    message: f,
    transport: d,
    initialData: c = (f == null ? void 0 : f.data) || [],
    transforms: r = d == null ? void 0 : d.transforms
  }) {
    return r.reduce((e, n) => typeof n == "function" ? n({ data: e, logger: h, message: f, transport: d }) : e, c);
  }
  return oo;
}
var so, su;
function Jd() {
  if (su) return so;
  su = 1;
  const { transform: o } = Pt();
  so = f;
  const h = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    verbose: console.info,
    debug: console.debug,
    silly: console.debug,
    log: console.log
  };
  function f(c) {
    return Object.assign(r, {
      format: "{h}:{i}:{s}.{ms}{scope} › {text}",
      transforms: [d],
      writeFn({ message: { level: e, data: n } }) {
        const t = h[e] || h.info;
        setTimeout(() => t(...n));
      }
    });
    function r(e) {
      r.writeFn({
        message: { ...e, data: o({ logger: c, message: e, transport: r }) }
      });
    }
  }
  function d({
    data: c = [],
    logger: r = {},
    message: e = {},
    transport: n = {}
  }) {
    if (typeof n.format == "function")
      return n.format({
        data: c,
        level: (e == null ? void 0 : e.level) || "info",
        logger: r,
        message: e,
        transport: n
      });
    if (typeof n.format != "string")
      return c;
    c.unshift(n.format), typeof c[1] == "string" && c[1].match(/%[1cdfiOos]/) && (c = [`${c[0]} ${c[1]}`, ...c.slice(2)]);
    const t = e.date || /* @__PURE__ */ new Date();
    return c[0] = c[0].replace(/\{(\w+)}/g, (a, i) => {
      var l, s;
      switch (i) {
        case "level":
          return e.level;
        case "logId":
          return e.logId;
        case "scope": {
          const p = e.scope || ((l = r.scope) == null ? void 0 : l.defaultLabel);
          return p ? ` (${p})` : "";
        }
        case "text":
          return "";
        case "y":
          return t.getFullYear().toString(10);
        case "m":
          return (t.getMonth() + 1).toString(10).padStart(2, "0");
        case "d":
          return t.getDate().toString(10).padStart(2, "0");
        case "h":
          return t.getHours().toString(10).padStart(2, "0");
        case "i":
          return t.getMinutes().toString(10).padStart(2, "0");
        case "s":
          return t.getSeconds().toString(10).padStart(2, "0");
        case "ms":
          return t.getMilliseconds().toString(10).padStart(3, "0");
        case "iso":
          return t.toISOString();
        default:
          return ((s = e.variables) == null ? void 0 : s[i]) || a;
      }
    }).trim(), c;
  }
  return so;
}
var ao, au;
function Kd() {
  if (au) return ao;
  au = 1;
  const { transform: o } = Pt();
  ao = f;
  const h = /* @__PURE__ */ new Set([Promise, WeakMap, WeakSet]);
  function f(r) {
    return Object.assign(e, {
      depth: 5,
      transforms: [c]
    });
    function e(n) {
      if (!window.__electronLog) {
        r.processMessage(
          {
            data: ["electron-log: logger isn't initialized in the main process"],
            level: "error"
          },
          { transports: ["console"] }
        );
        return;
      }
      try {
        const t = o({
          initialData: n,
          logger: r,
          message: n,
          transport: e
        });
        __electronLog.sendToMain(t);
      } catch (t) {
        r.transports.console({
          data: ["electronLog.transports.ipc", t, "data:", n.data],
          level: "error"
        });
      }
    }
  }
  function d(r) {
    return Object(r) !== r;
  }
  function c({
    data: r,
    depth: e,
    seen: n = /* @__PURE__ */ new WeakSet(),
    transport: t = {}
  } = {}) {
    const a = e || t.depth || 5;
    return n.has(r) ? "[Circular]" : a < 1 ? d(r) ? r : Array.isArray(r) ? "[Array]" : `[${typeof r}]` : ["function", "symbol"].includes(typeof r) ? r.toString() : d(r) ? r : h.has(r.constructor) ? `[${r.constructor.name}]` : Array.isArray(r) ? r.map((i) => c({
      data: i,
      depth: a - 1,
      seen: n
    })) : r instanceof Date ? r.toISOString() : r instanceof Error ? r.stack : r instanceof Map ? new Map(
      Array.from(r).map(([i, l]) => [
        c({ data: i, depth: a - 1, seen: n }),
        c({ data: l, depth: a - 1, seen: n })
      ])
    ) : r instanceof Set ? new Set(
      Array.from(r).map(
        (i) => c({ data: i, depth: a - 1, seen: n })
      )
    ) : (n.add(r), Object.fromEntries(
      Object.entries(r).map(
        ([i, l]) => [
          i,
          c({ data: l, depth: a - 1, seen: n })
        ]
      )
    ));
  }
  return ao;
}
var lu;
function Qd() {
  return lu || (lu = 1, function(o) {
    const h = fc(), f = Xd(), d = Jd(), c = Kd();
    o.exports = r(), o.exports.Logger = h, o.exports.default = o.exports;
    function r() {
      const e = new h({
        allowUnknownLevel: !0,
        errorHandler: new f(),
        initializeFn: () => {
        },
        logId: "default",
        transportFactories: {
          console: d,
          ipc: c
        },
        variables: {
          processType: "renderer"
        }
      });
      return e.errorHandler.setOptions({
        logFn({ error: n, errorName: t, showDialog: a }) {
          e.transports.console({
            data: [t, n].filter(Boolean),
            level: "error"
          }), e.transports.ipc({
            cmd: "errorHandler",
            error: {
              cause: n == null ? void 0 : n.cause,
              code: n == null ? void 0 : n.code,
              name: n == null ? void 0 : n.name,
              message: n == null ? void 0 : n.message,
              stack: n == null ? void 0 : n.stack
            },
            errorName: t,
            logId: e.logId,
            showDialog: a
          });
        }
      }), typeof window == "object" && window.addEventListener("message", (n) => {
        const { cmd: t, logId: a, ...i } = n.data || {}, l = h.getInstance({ logId: a });
        t === "message" && l.processMessage(i, { transports: ["console"] });
      }), new Proxy(e, {
        get(n, t) {
          return typeof n[t] < "u" ? n[t] : (...a) => e.logData(a, { level: t });
        }
      });
    }
  }(eo)), eo.exports;
}
var lo, uu;
function Zd() {
  if (uu) return lo;
  uu = 1;
  const o = Ve, h = be;
  lo = {
    findAndReadPackageJson: f,
    tryReadJsonAt: d
  };
  function f() {
    return d(e()) || d(r()) || d(process.resourcesPath, "app.asar") || d(process.resourcesPath, "app") || d(process.cwd()) || { name: void 0, version: void 0 };
  }
  function d(...n) {
    if (n[0])
      try {
        const t = h.join(...n), a = c("package.json", t);
        if (!a)
          return;
        const i = JSON.parse(o.readFileSync(a, "utf8")), l = (i == null ? void 0 : i.productName) || (i == null ? void 0 : i.name);
        return !l || l.toLowerCase() === "electron" ? void 0 : l ? { name: l, version: i == null ? void 0 : i.version } : void 0;
      } catch {
        return;
      }
  }
  function c(n, t) {
    let a = t;
    for (; ; ) {
      const i = h.parse(a), l = i.root, s = i.dir;
      if (o.existsSync(h.join(a, n)))
        return h.resolve(h.join(a, n));
      if (a === l)
        return null;
      a = s;
    }
  }
  function r() {
    const n = process.argv.filter((a) => a.indexOf("--user-data-dir=") === 0);
    return n.length === 0 || typeof n[0] != "string" ? null : n[0].replace("--user-data-dir=", "");
  }
  function e() {
    var n;
    try {
      return (n = require.main) == null ? void 0 : n.filename;
    } catch {
      return;
    }
  }
  return lo;
}
var uo, cu;
function dc() {
  if (cu) return uo;
  cu = 1;
  const o = gr, h = ut, f = be, d = Zd();
  class c {
    constructor() {
      Ae(this, "appName");
      Ae(this, "appPackageJson");
      Ae(this, "platform", process.platform);
    }
    getAppLogPath(e = this.getAppName()) {
      return this.platform === "darwin" ? f.join(this.getSystemPathHome(), "Library/Logs", e) : f.join(this.getAppUserDataPath(e), "logs");
    }
    getAppName() {
      var n;
      const e = this.appName || ((n = this.getAppPackageJson()) == null ? void 0 : n.name);
      if (!e)
        throw new Error(
          "electron-log can't determine the app name. It tried these methods:\n1. Use `electron.app.name`\n2. Use productName or name from the nearest package.json`\nYou can also set it through log.transports.file.setAppName()"
        );
      return e;
    }
    /**
     * @private
     * @returns {undefined}
     */
    getAppPackageJson() {
      return typeof this.appPackageJson != "object" && (this.appPackageJson = d.findAndReadPackageJson()), this.appPackageJson;
    }
    getAppUserDataPath(e = this.getAppName()) {
      return e ? f.join(this.getSystemPathAppData(), e) : void 0;
    }
    getAppVersion() {
      var e;
      return (e = this.getAppPackageJson()) == null ? void 0 : e.version;
    }
    getElectronLogPath() {
      return this.getAppLogPath();
    }
    getMacOsVersion() {
      const e = Number(h.release().split(".")[0]);
      return e <= 19 ? `10.${e - 4}` : e - 9;
    }
    /**
     * @protected
     * @returns {string}
     */
    getOsVersion() {
      let e = h.type().replace("_", " "), n = h.release();
      return e === "Darwin" && (e = "macOS", n = this.getMacOsVersion()), `${e} ${n}`;
    }
    /**
     * @return {PathVariables}
     */
    getPathVariables() {
      const e = this.getAppName(), n = this.getAppVersion(), t = this;
      return {
        appData: this.getSystemPathAppData(),
        appName: e,
        appVersion: n,
        get electronDefaultDir() {
          return t.getElectronLogPath();
        },
        home: this.getSystemPathHome(),
        libraryDefaultDir: this.getAppLogPath(e),
        libraryTemplate: this.getAppLogPath("{appName}"),
        temp: this.getSystemPathTemp(),
        userData: this.getAppUserDataPath(e)
      };
    }
    getSystemPathAppData() {
      const e = this.getSystemPathHome();
      switch (this.platform) {
        case "darwin":
          return f.join(e, "Library/Application Support");
        case "win32":
          return process.env.APPDATA || f.join(e, "AppData/Roaming");
        default:
          return process.env.XDG_CONFIG_HOME || f.join(e, ".config");
      }
    }
    getSystemPathHome() {
      var e;
      return ((e = h.homedir) == null ? void 0 : e.call(h)) || process.env.HOME;
    }
    getSystemPathTemp() {
      return h.tmpdir();
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
    onAppEvent(e, n) {
    }
    onAppReady(e) {
      e();
    }
    onEveryWebContentsEvent(e, n) {
    }
    /**
     * Listen to async messages sent from opposite process
     * @param {string} channel
     * @param {function} listener
     */
    onIpc(e, n) {
    }
    onIpcInvoke(e, n) {
    }
    /**
     * @param {string} url
     * @param {Function} [logFunction]
     */
    openUrl(e, n = console.error) {
      const a = { darwin: "open", win32: "start", linux: "xdg-open" }[process.platform] || "xdg-open";
      o.exec(`${a} ${e}`, {}, (i) => {
        i && n(i);
      });
    }
    setAppName(e) {
      this.appName = e;
    }
    setPlatform(e) {
      this.platform = e;
    }
    setPreloadFileForSessions({
      filePath: e,
      // eslint-disable-line no-unused-vars
      includeFutureSession: n = !0,
      // eslint-disable-line no-unused-vars
      getSessions: t = () => []
      // eslint-disable-line no-unused-vars
    }) {
    }
    /**
     * Sent a message to opposite process
     * @param {string} channel
     * @param {any} message
     */
    sendIpc(e, n) {
    }
    showErrorBox(e, n) {
    }
  }
  return uo = c, uo;
}
var co, fu;
function eh() {
  if (fu) return co;
  fu = 1;
  const o = be, h = dc();
  class f extends h {
    /**
     * @param {object} options
     * @param {typeof Electron} [options.electron]
     */
    constructor({ electron: r } = {}) {
      super();
      /**
       * @type {typeof Electron}
       */
      Ae(this, "electron");
      this.electron = r;
    }
    getAppName() {
      var e, n;
      let r;
      try {
        r = this.appName || ((e = this.electron.app) == null ? void 0 : e.name) || ((n = this.electron.app) == null ? void 0 : n.getName());
      } catch {
      }
      return r || super.getAppName();
    }
    getAppUserDataPath(r) {
      return this.getPath("userData") || super.getAppUserDataPath(r);
    }
    getAppVersion() {
      var e;
      let r;
      try {
        r = (e = this.electron.app) == null ? void 0 : e.getVersion();
      } catch {
      }
      return r || super.getAppVersion();
    }
    getElectronLogPath() {
      return this.getPath("logs") || super.getElectronLogPath();
    }
    /**
     * @private
     * @param {any} name
     * @returns {string|undefined}
     */
    getPath(r) {
      var e;
      try {
        return (e = this.electron.app) == null ? void 0 : e.getPath(r);
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
      var r;
      return ((r = this.electron.app) == null ? void 0 : r.isPackaged) !== void 0 ? !this.electron.app.isPackaged : typeof process.execPath == "string" ? o.basename(process.execPath).toLowerCase().startsWith("electron") : super.isDev();
    }
    onAppEvent(r, e) {
      var n;
      return (n = this.electron.app) == null || n.on(r, e), () => {
        var t;
        (t = this.electron.app) == null || t.off(r, e);
      };
    }
    onAppReady(r) {
      var e, n, t;
      (e = this.electron.app) != null && e.isReady() ? r() : (n = this.electron.app) != null && n.once ? (t = this.electron.app) == null || t.once("ready", r) : r();
    }
    onEveryWebContentsEvent(r, e) {
      var t, a, i;
      return (a = (t = this.electron.webContents) == null ? void 0 : t.getAllWebContents()) == null || a.forEach((l) => {
        l.on(r, e);
      }), (i = this.electron.app) == null || i.on("web-contents-created", n), () => {
        var l, s;
        (l = this.electron.webContents) == null || l.getAllWebContents().forEach((p) => {
          p.off(r, e);
        }), (s = this.electron.app) == null || s.off("web-contents-created", n);
      };
      function n(l, s) {
        s.on(r, e);
      }
    }
    /**
     * Listen to async messages sent from opposite process
     * @param {string} channel
     * @param {function} listener
     */
    onIpc(r, e) {
      var n;
      (n = this.electron.ipcMain) == null || n.on(r, e);
    }
    onIpcInvoke(r, e) {
      var n, t;
      (t = (n = this.electron.ipcMain) == null ? void 0 : n.handle) == null || t.call(n, r, e);
    }
    /**
     * @param {string} url
     * @param {Function} [logFunction]
     */
    openUrl(r, e = console.error) {
      var n;
      (n = this.electron.shell) == null || n.openExternal(r).catch(e);
    }
    setPreloadFileForSessions({
      filePath: r,
      includeFutureSession: e = !0,
      getSessions: n = () => {
        var t;
        return [(t = this.electron.session) == null ? void 0 : t.defaultSession];
      }
    }) {
      for (const a of n().filter(Boolean))
        t(a);
      e && this.onAppEvent("session-created", (a) => {
        t(a);
      });
      function t(a) {
        typeof a.registerPreloadScript == "function" ? a.registerPreloadScript({
          filePath: r,
          id: "electron-log-preload",
          type: "frame"
        }) : a.setPreloads([...a.getPreloads(), r]);
      }
    }
    /**
     * Sent a message to opposite process
     * @param {string} channel
     * @param {any} message
     */
    sendIpc(r, e) {
      var n, t;
      (t = (n = this.electron.BrowserWindow) == null ? void 0 : n.getAllWindows()) == null || t.forEach((a) => {
        var i, l;
        ((i = a.webContents) == null ? void 0 : i.isDestroyed()) === !1 && ((l = a.webContents) == null ? void 0 : l.isCrashed()) === !1 && a.webContents.send(r, e);
      });
    }
    showErrorBox(r, e) {
      var n;
      (n = this.electron.dialog) == null || n.showErrorBox(r, e);
    }
  }
  return co = f, co;
}
var fo, du;
function th() {
  if (du) return fo;
  du = 1;
  const o = Ve, h = ut, f = be, d = cc();
  fo = {
    initialize({
      externalApi: e,
      getSessions: n,
      includeFutureSession: t,
      logger: a,
      preload: i = !0,
      spyRendererConsole: l = !1
    }) {
      e.onAppReady(() => {
        try {
          i && c({
            externalApi: e,
            getSessions: n,
            includeFutureSession: t,
            preloadOption: i
          }), l && r({ externalApi: e, logger: a });
        } catch (s) {
          a.warn(s);
        }
      });
    }
  };
  function c({
    externalApi: e,
    getSessions: n,
    includeFutureSession: t,
    preloadOption: a
  }) {
    let i = typeof a == "string" ? a : void 0;
    try {
      i = f.resolve(
        __dirname,
        "../renderer/electron-log-preload.js"
      );
    } catch {
    }
    if (!i || !o.existsSync(i)) {
      i = f.join(
        e.getAppUserDataPath() || h.tmpdir(),
        "electron-log-preload.js"
      );
      const l = `
      try {
        (${d.toString()})(require('electron'));
      } catch(e) {
        console.error(e);
      }
    `;
      o.writeFileSync(i, l, "utf8");
    }
    e.setPreloadFileForSessions({
      filePath: i,
      includeFutureSession: t,
      getSessions: n
    });
  }
  function r({ externalApi: e, logger: n }) {
    const t = ["verbose", "info", "warning", "error"];
    e.onEveryWebContentsEvent(
      "console-message",
      (a, i, l) => {
        n.processMessage({
          data: [l],
          level: t[i],
          variables: { processType: "renderer" }
        });
      }
    );
  }
  return fo;
}
var ho, hu;
function rh() {
  if (hu) return ho;
  hu = 1;
  class o {
    constructor({
      externalApi: d,
      logFn: c = void 0,
      onError: r = void 0,
      showDialog: e = void 0
    } = {}) {
      Ae(this, "externalApi");
      Ae(this, "isActive", !1);
      Ae(this, "logFn");
      Ae(this, "onError");
      Ae(this, "showDialog", !0);
      this.createIssue = this.createIssue.bind(this), this.handleError = this.handleError.bind(this), this.handleRejection = this.handleRejection.bind(this), this.setOptions({ externalApi: d, logFn: c, onError: r, showDialog: e }), this.startCatching = this.startCatching.bind(this), this.stopCatching = this.stopCatching.bind(this);
    }
    handle(d, {
      logFn: c = this.logFn,
      onError: r = this.onError,
      processType: e = "browser",
      showDialog: n = this.showDialog,
      errorName: t = ""
    } = {}) {
      var a;
      d = h(d);
      try {
        if (typeof r == "function") {
          const i = ((a = this.externalApi) == null ? void 0 : a.getVersions()) || {}, l = this.createIssue;
          if (r({
            createIssue: l,
            error: d,
            errorName: t,
            processType: e,
            versions: i
          }) === !1)
            return;
        }
        t ? c(t, d) : c(d), n && !t.includes("rejection") && this.externalApi && this.externalApi.showErrorBox(
          `A JavaScript error occurred in the ${e} process`,
          d.stack
        );
      } catch {
        console.error(d);
      }
    }
    setOptions({ externalApi: d, logFn: c, onError: r, showDialog: e }) {
      typeof d == "object" && (this.externalApi = d), typeof c == "function" && (this.logFn = c), typeof r == "function" && (this.onError = r), typeof e == "boolean" && (this.showDialog = e);
    }
    startCatching({ onError: d, showDialog: c } = {}) {
      this.isActive || (this.isActive = !0, this.setOptions({ onError: d, showDialog: c }), process.on("uncaughtException", this.handleError), process.on("unhandledRejection", this.handleRejection));
    }
    stopCatching() {
      this.isActive = !1, process.removeListener("uncaughtException", this.handleError), process.removeListener("unhandledRejection", this.handleRejection);
    }
    createIssue(d, c) {
      var r;
      (r = this.externalApi) == null || r.openUrl(
        `${d}?${new URLSearchParams(c).toString()}`
      );
    }
    handleError(d) {
      this.handle(d, { errorName: "Unhandled" });
    }
    handleRejection(d) {
      const c = d instanceof Error ? d : new Error(JSON.stringify(d));
      this.handle(c, { errorName: "Unhandled rejection" });
    }
  }
  function h(f) {
    if (f instanceof Error)
      return f;
    if (f && typeof f == "object") {
      if (f.message)
        return Object.assign(new Error(f.message), f);
      try {
        return new Error(JSON.stringify(f));
      } catch (d) {
        return new Error(`Couldn't normalize error ${String(f)}: ${d}`);
      }
    }
    return new Error(`Can't normalize error ${String(f)}`);
  }
  return ho = o, ho;
}
var po, pu;
function nh() {
  if (pu) return po;
  pu = 1;
  class o {
    constructor(f = {}) {
      Ae(this, "disposers", []);
      Ae(this, "format", "{eventSource}#{eventName}:");
      Ae(this, "formatters", {
        app: {
          "certificate-error": ({ args: f }) => this.arrayToObject(f.slice(1, 4), [
            "url",
            "error",
            "certificate"
          ]),
          "child-process-gone": ({ args: f }) => f.length === 1 ? f[0] : f,
          "render-process-gone": ({ args: [f, d] }) => d && typeof d == "object" ? { ...d, ...this.getWebContentsDetails(f) } : []
        },
        webContents: {
          "console-message": ({ args: [f, d, c, r] }) => {
            if (!(f < 3))
              return { message: d, source: `${r}:${c}` };
          },
          "did-fail-load": ({ args: f }) => this.arrayToObject(f, [
            "errorCode",
            "errorDescription",
            "validatedURL",
            "isMainFrame",
            "frameProcessId",
            "frameRoutingId"
          ]),
          "did-fail-provisional-load": ({ args: f }) => this.arrayToObject(f, [
            "errorCode",
            "errorDescription",
            "validatedURL",
            "isMainFrame",
            "frameProcessId",
            "frameRoutingId"
          ]),
          "plugin-crashed": ({ args: f }) => this.arrayToObject(f, ["name", "version"]),
          "preload-error": ({ args: f }) => this.arrayToObject(f, ["preloadPath", "error"])
        }
      });
      Ae(this, "events", {
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
      Ae(this, "externalApi");
      Ae(this, "level", "error");
      Ae(this, "scope", "");
      this.setOptions(f);
    }
    setOptions({
      events: f,
      externalApi: d,
      level: c,
      logger: r,
      format: e,
      formatters: n,
      scope: t
    }) {
      typeof f == "object" && (this.events = f), typeof d == "object" && (this.externalApi = d), typeof c == "string" && (this.level = c), typeof r == "object" && (this.logger = r), (typeof e == "string" || typeof e == "function") && (this.format = e), typeof n == "object" && (this.formatters = n), typeof t == "string" && (this.scope = t);
    }
    startLogging(f = {}) {
      this.setOptions(f), this.disposeListeners();
      for (const d of this.getEventNames(this.events.app))
        this.disposers.push(
          this.externalApi.onAppEvent(d, (...c) => {
            this.handleEvent({ eventSource: "app", eventName: d, handlerArgs: c });
          })
        );
      for (const d of this.getEventNames(this.events.webContents))
        this.disposers.push(
          this.externalApi.onEveryWebContentsEvent(
            d,
            (...c) => {
              this.handleEvent(
                { eventSource: "webContents", eventName: d, handlerArgs: c }
              );
            }
          )
        );
    }
    stopLogging() {
      this.disposeListeners();
    }
    arrayToObject(f, d) {
      const c = {};
      return d.forEach((r, e) => {
        c[r] = f[e];
      }), f.length > d.length && (c.unknownArgs = f.slice(d.length)), c;
    }
    disposeListeners() {
      this.disposers.forEach((f) => f()), this.disposers = [];
    }
    formatEventLog({ eventName: f, eventSource: d, handlerArgs: c }) {
      var l;
      const [r, ...e] = c;
      if (typeof this.format == "function")
        return this.format({ args: e, event: r, eventName: f, eventSource: d });
      const n = (l = this.formatters[d]) == null ? void 0 : l[f];
      let t = e;
      if (typeof n == "function" && (t = n({ args: e, event: r, eventName: f, eventSource: d })), !t)
        return;
      const a = {};
      return Array.isArray(t) ? a.args = t : typeof t == "object" && Object.assign(a, t), d === "webContents" && Object.assign(a, this.getWebContentsDetails(r == null ? void 0 : r.sender)), [this.format.replace("{eventSource}", d === "app" ? "App" : "WebContents").replace("{eventName}", f), a];
    }
    getEventNames(f) {
      return !f || typeof f != "object" ? [] : Object.entries(f).filter(([d, c]) => c).map(([d]) => d);
    }
    getWebContentsDetails(f) {
      if (!(f != null && f.loadURL))
        return {};
      try {
        return {
          webContents: {
            id: f.id,
            url: f.getURL()
          }
        };
      } catch {
        return {};
      }
    }
    handleEvent({ eventName: f, eventSource: d, handlerArgs: c }) {
      var e;
      const r = this.formatEventLog({ eventName: f, eventSource: d, handlerArgs: c });
      if (r) {
        const n = this.scope ? this.logger.scope(this.scope) : this.logger;
        (e = n == null ? void 0 : n[this.level]) == null || e.call(n, ...r);
      }
    }
  }
  return po = o, po;
}
var mo, mu;
function hc() {
  if (mu) return mo;
  mu = 1;
  const { transform: o } = Pt();
  mo = {
    concatFirstStringElements: h,
    formatScope: d,
    formatText: r,
    formatVariables: c,
    timeZoneFromOffset: f,
    format({ message: e, logger: n, transport: t, data: a = e == null ? void 0 : e.data }) {
      switch (typeof t.format) {
        case "string":
          return o({
            message: e,
            logger: n,
            transforms: [c, d, r],
            transport: t,
            initialData: [t.format, ...a]
          });
        case "function":
          return t.format({
            data: a,
            level: (e == null ? void 0 : e.level) || "info",
            logger: n,
            message: e,
            transport: t
          });
        default:
          return a;
      }
    }
  };
  function h({ data: e }) {
    return typeof e[0] != "string" || typeof e[1] != "string" || e[0].match(/%[1cdfiOos]/) ? e : [`${e[0]} ${e[1]}`, ...e.slice(2)];
  }
  function f(e) {
    const n = Math.abs(e), t = e > 0 ? "-" : "+", a = Math.floor(n / 60).toString().padStart(2, "0"), i = (n % 60).toString().padStart(2, "0");
    return `${t}${a}:${i}`;
  }
  function d({ data: e, logger: n, message: t }) {
    const { defaultLabel: a, labelLength: i } = (n == null ? void 0 : n.scope) || {}, l = e[0];
    let s = t.scope;
    s || (s = a);
    let p;
    return s === "" ? p = i > 0 ? "".padEnd(i + 3) : "" : typeof s == "string" ? p = ` (${s})`.padEnd(i + 3) : p = "", e[0] = l.replace("{scope}", p), e;
  }
  function c({ data: e, message: n }) {
    let t = e[0];
    if (typeof t != "string")
      return e;
    t = t.replace("{level}]", `${n.level}]`.padEnd(6, " "));
    const a = n.date || /* @__PURE__ */ new Date();
    return e[0] = t.replace(/\{(\w+)}/g, (i, l) => {
      var s;
      switch (l) {
        case "level":
          return n.level || "info";
        case "logId":
          return n.logId;
        case "y":
          return a.getFullYear().toString(10);
        case "m":
          return (a.getMonth() + 1).toString(10).padStart(2, "0");
        case "d":
          return a.getDate().toString(10).padStart(2, "0");
        case "h":
          return a.getHours().toString(10).padStart(2, "0");
        case "i":
          return a.getMinutes().toString(10).padStart(2, "0");
        case "s":
          return a.getSeconds().toString(10).padStart(2, "0");
        case "ms":
          return a.getMilliseconds().toString(10).padStart(3, "0");
        case "z":
          return f(a.getTimezoneOffset());
        case "iso":
          return a.toISOString();
        default:
          return ((s = n.variables) == null ? void 0 : s[l]) || i;
      }
    }).trim(), e;
  }
  function r({ data: e }) {
    const n = e[0];
    if (typeof n != "string")
      return e;
    if (n.lastIndexOf("{text}") === n.length - 6)
      return e[0] = n.replace(/\s?{text}/, ""), e[0] === "" && e.shift(), e;
    const a = n.split("{text}");
    let i = [];
    return a[0] !== "" && i.push(a[0]), i = i.concat(e.slice(1)), a[1] !== "" && i.push(a[1]), i;
  }
  return mo;
}
var go = { exports: {} }, gu;
function Jr() {
  return gu || (gu = 1, function(o) {
    const h = jr;
    o.exports = {
      serialize: d,
      maxDepth({ data: c, transport: r, depth: e = (r == null ? void 0 : r.depth) ?? 6 }) {
        if (!c)
          return c;
        if (e < 1)
          return Array.isArray(c) ? "[array]" : typeof c == "object" && c ? "[object]" : c;
        if (Array.isArray(c))
          return c.map((t) => o.exports.maxDepth({
            data: t,
            depth: e - 1
          }));
        if (typeof c != "object" || c && typeof c.toISOString == "function")
          return c;
        if (c === null)
          return null;
        if (c instanceof Error)
          return c;
        const n = {};
        for (const t in c)
          Object.prototype.hasOwnProperty.call(c, t) && (n[t] = o.exports.maxDepth({
            data: c[t],
            depth: e - 1
          }));
        return n;
      },
      toJSON({ data: c }) {
        return JSON.parse(JSON.stringify(c, f()));
      },
      toString({ data: c, transport: r }) {
        const e = (r == null ? void 0 : r.inspectOptions) || {}, n = c.map((t) => {
          if (t !== void 0)
            try {
              const a = JSON.stringify(t, f(), "  ");
              return a === void 0 ? void 0 : JSON.parse(a);
            } catch {
              return t;
            }
        });
        return h.formatWithOptions(e, ...n);
      }
    };
    function f(c = {}) {
      const r = /* @__PURE__ */ new WeakSet();
      return function(e, n) {
        if (typeof n == "object" && n !== null) {
          if (r.has(n))
            return;
          r.add(n);
        }
        return d(e, n, c);
      };
    }
    function d(c, r, e = {}) {
      const n = (e == null ? void 0 : e.serializeMapAndSet) !== !1;
      return r instanceof Error ? r.stack : r && (typeof r == "function" ? `[function] ${r.toString()}` : r instanceof Date ? r.toISOString() : n && r instanceof Map && Object.fromEntries ? Object.fromEntries(r) : n && r instanceof Set && Array.from ? Array.from(r) : r);
    }
  }(go)), go.exports;
}
var vo, vu;
function Ho() {
  if (vu) return vo;
  vu = 1, vo = {
    transformStyles: d,
    applyAnsiStyles({ data: c }) {
      return d(c, h, f);
    },
    removeStyles({ data: c }) {
      return d(c, () => "");
    }
  };
  const o = {
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
  function h(c) {
    const r = c.replace(/color:\s*(\w+).*/, "$1").toLowerCase();
    return o[r] || "";
  }
  function f(c) {
    return c + o.unset;
  }
  function d(c, r, e) {
    const n = {};
    return c.reduce((t, a, i, l) => {
      if (n[i])
        return t;
      if (typeof a == "string") {
        let s = i, p = !1;
        a = a.replace(/%[1cdfiOos]/g, (g) => {
          if (s += 1, g !== "%c")
            return g;
          const v = l[s];
          return typeof v == "string" ? (n[s] = !0, p = !0, r(v, a)) : g;
        }), p && e && (a = e(a));
      }
      return t.push(a), t;
    }, []);
  }
  return vo;
}
var yo, yu;
function ih() {
  if (yu) return yo;
  yu = 1;
  const {
    concatFirstStringElements: o,
    format: h
  } = hc(), { maxDepth: f, toJSON: d } = Jr(), {
    applyAnsiStyles: c,
    removeStyles: r
  } = Ho(), { transform: e } = Pt(), n = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    verbose: console.info,
    debug: console.debug,
    silly: console.debug,
    log: console.log
  };
  yo = i;
  const a = `%c{h}:{i}:{s}.{ms}{scope}%c ${process.platform === "win32" ? ">" : "›"} {text}`;
  Object.assign(i, {
    DEFAULT_FORMAT: a
  });
  function i(v) {
    return Object.assign(m, {
      format: a,
      level: "silly",
      transforms: [
        l,
        h,
        p,
        o,
        f,
        d
      ],
      useStyles: process.env.FORCE_STYLES,
      writeFn({ message: b }) {
        (n[b.level] || n.info)(...b.data);
      }
    });
    function m(b) {
      const R = e({ logger: v, message: b, transport: m });
      m.writeFn({
        message: { ...b, data: R }
      });
    }
  }
  function l({ data: v, message: m, transport: b }) {
    return b.format !== a ? v : [`color:${g(m.level)}`, "color:unset", ...v];
  }
  function s(v, m) {
    if (typeof v == "boolean")
      return v;
    const R = m === "error" || m === "warn" ? process.stderr : process.stdout;
    return R && R.isTTY;
  }
  function p(v) {
    const { message: m, transport: b } = v;
    return (s(b.useStyles, m.level) ? c : r)(v);
  }
  function g(v) {
    const m = { error: "red", warn: "yellow", info: "cyan", default: "unset" };
    return m[v] || m.default;
  }
  return yo;
}
var Eo, Eu;
function pc() {
  if (Eu) return Eo;
  Eu = 1;
  const o = Br, h = Ve, f = ut;
  class d extends o {
    constructor({
      path: n,
      writeOptions: t = { encoding: "utf8", flag: "a", mode: 438 },
      writeAsync: a = !1
    }) {
      super();
      Ae(this, "asyncWriteQueue", []);
      Ae(this, "bytesWritten", 0);
      Ae(this, "hasActiveAsyncWriting", !1);
      Ae(this, "path", null);
      Ae(this, "initialSize");
      Ae(this, "writeOptions", null);
      Ae(this, "writeAsync", !1);
      this.path = n, this.writeOptions = t, this.writeAsync = a;
    }
    get size() {
      return this.getSize();
    }
    clear() {
      try {
        return h.writeFileSync(this.path, "", {
          mode: this.writeOptions.mode,
          flag: "w"
        }), this.reset(), !0;
      } catch (n) {
        return n.code === "ENOENT" ? !0 : (this.emit("error", n, this), !1);
      }
    }
    crop(n) {
      try {
        const t = c(this.path, n || 4096);
        this.clear(), this.writeLine(`[log cropped]${f.EOL}${t}`);
      } catch (t) {
        this.emit(
          "error",
          new Error(`Couldn't crop file ${this.path}. ${t.message}`),
          this
        );
      }
    }
    getSize() {
      if (this.initialSize === void 0)
        try {
          const n = h.statSync(this.path);
          this.initialSize = n.size;
        } catch {
          this.initialSize = 0;
        }
      return this.initialSize + this.bytesWritten;
    }
    increaseBytesWrittenCounter(n) {
      this.bytesWritten += Buffer.byteLength(n, this.writeOptions.encoding);
    }
    isNull() {
      return !1;
    }
    nextAsyncWrite() {
      const n = this;
      if (this.hasActiveAsyncWriting || this.asyncWriteQueue.length === 0)
        return;
      const t = this.asyncWriteQueue.join("");
      this.asyncWriteQueue = [], this.hasActiveAsyncWriting = !0, h.writeFile(this.path, t, this.writeOptions, (a) => {
        n.hasActiveAsyncWriting = !1, a ? n.emit(
          "error",
          new Error(`Couldn't write to ${n.path}. ${a.message}`),
          this
        ) : n.increaseBytesWrittenCounter(t), n.nextAsyncWrite();
      });
    }
    reset() {
      this.initialSize = void 0, this.bytesWritten = 0;
    }
    toString() {
      return this.path;
    }
    writeLine(n) {
      if (n += f.EOL, this.writeAsync) {
        this.asyncWriteQueue.push(n), this.nextAsyncWrite();
        return;
      }
      try {
        h.writeFileSync(this.path, n, this.writeOptions), this.increaseBytesWrittenCounter(n);
      } catch (t) {
        this.emit(
          "error",
          new Error(`Couldn't write to ${this.path}. ${t.message}`),
          this
        );
      }
    }
  }
  Eo = d;
  function c(r, e) {
    const n = Buffer.alloc(e), t = h.statSync(r), a = Math.min(t.size, e), i = Math.max(0, t.size - e), l = h.openSync(r, "r"), s = h.readSync(l, n, 0, a, i);
    return h.closeSync(l), n.toString("utf8", 0, s);
  }
  return Eo;
}
var wo, wu;
function oh() {
  if (wu) return wo;
  wu = 1;
  const o = pc();
  class h extends o {
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
  return wo = h, wo;
}
var _o, _u;
function sh() {
  if (_u) return _o;
  _u = 1;
  const o = Br, h = Ve, f = be, d = pc(), c = oh();
  class r extends o {
    constructor() {
      super();
      Ae(this, "store", {});
      this.emitError = this.emitError.bind(this);
    }
    /**
     * Provide a File object corresponding to the filePath
     * @param {string} filePath
     * @param {WriteOptions} [writeOptions]
     * @param {boolean} [writeAsync]
     * @return {File}
     */
    provide({ filePath: t, writeOptions: a = {}, writeAsync: i = !1 }) {
      let l;
      try {
        if (t = f.resolve(t), this.store[t])
          return this.store[t];
        l = this.createFile({ filePath: t, writeOptions: a, writeAsync: i });
      } catch (s) {
        l = new c({ path: t }), this.emitError(s, l);
      }
      return l.on("error", this.emitError), this.store[t] = l, l;
    }
    /**
     * @param {string} filePath
     * @param {WriteOptions} writeOptions
     * @param {boolean} async
     * @return {File}
     * @private
     */
    createFile({ filePath: t, writeOptions: a, writeAsync: i }) {
      return this.testFileWriting({ filePath: t, writeOptions: a }), new d({ path: t, writeOptions: a, writeAsync: i });
    }
    /**
     * @param {Error} error
     * @param {File} file
     * @private
     */
    emitError(t, a) {
      this.emit("error", t, a);
    }
    /**
     * @param {string} filePath
     * @param {WriteOptions} writeOptions
     * @private
     */
    testFileWriting({ filePath: t, writeOptions: a }) {
      h.mkdirSync(f.dirname(t), { recursive: !0 }), h.writeFileSync(t, "", { flag: "a", mode: a.mode });
    }
  }
  return _o = r, _o;
}
var So, Su;
function ah() {
  if (Su) return So;
  Su = 1;
  const o = Ve, h = ut, f = be, d = sh(), { transform: c } = Pt(), { removeStyles: r } = Ho(), {
    format: e,
    concatFirstStringElements: n
  } = hc(), { toString: t } = Jr();
  So = i;
  const a = new d();
  function i(s, { registry: p = a, externalApi: g } = {}) {
    let v;
    return p.listenerCount("error") < 1 && p.on("error", ($, w) => {
      R(`Can't write to ${w}`, $);
    }), Object.assign(m, {
      fileName: l(s.variables.processType),
      format: "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}",
      getFile: O,
      inspectOptions: { depth: 5 },
      level: "silly",
      maxSize: 1024 ** 2,
      readAllLogs: D,
      sync: !0,
      transforms: [r, e, n, t],
      writeOptions: { flag: "a", mode: 438, encoding: "utf8" },
      archiveLogFn($) {
        const w = $.toString(), _ = f.parse(w);
        try {
          o.renameSync(w, f.join(_.dir, `${_.name}.old${_.ext}`));
        } catch (S) {
          R("Could not rotate log", S);
          const E = Math.round(m.maxSize / 4);
          $.crop(Math.min(E, 256 * 1024));
        }
      },
      resolvePathFn($) {
        return f.join($.libraryDefaultDir, $.fileName);
      },
      setAppName($) {
        s.dependencies.externalApi.setAppName($);
      }
    });
    function m($) {
      const w = O($);
      m.maxSize > 0 && w.size > m.maxSize && (m.archiveLogFn(w), w.reset());
      const S = c({ logger: s, message: $, transport: m });
      w.writeLine(S);
    }
    function b() {
      v || (v = Object.create(
        Object.prototype,
        {
          ...Object.getOwnPropertyDescriptors(
            g.getPathVariables()
          ),
          fileName: {
            get() {
              return m.fileName;
            },
            enumerable: !0
          }
        }
      ), typeof m.archiveLog == "function" && (m.archiveLogFn = m.archiveLog, R("archiveLog is deprecated. Use archiveLogFn instead")), typeof m.resolvePath == "function" && (m.resolvePathFn = m.resolvePath, R("resolvePath is deprecated. Use resolvePathFn instead")));
    }
    function R($, w = null, _ = "error") {
      const S = [`electron-log.transports.file: ${$}`];
      w && S.push(w), s.transports.console({ data: S, date: /* @__PURE__ */ new Date(), level: _ });
    }
    function O($) {
      b();
      const w = m.resolvePathFn(v, $);
      return p.provide({
        filePath: w,
        writeAsync: !m.sync,
        writeOptions: m.writeOptions
      });
    }
    function D({ fileFilter: $ = (w) => w.endsWith(".log") } = {}) {
      b();
      const w = f.dirname(m.resolvePathFn(v));
      return o.existsSync(w) ? o.readdirSync(w).map((_) => f.join(w, _)).filter($).map((_) => {
        try {
          return {
            path: _,
            lines: o.readFileSync(_, "utf8").split(h.EOL)
          };
        } catch {
          return null;
        }
      }).filter(Boolean) : [];
    }
  }
  function l(s = process.type) {
    switch (s) {
      case "renderer":
        return "renderer.log";
      case "worker":
        return "worker.log";
      default:
        return "main.log";
    }
  }
  return So;
}
var Ao, Au;
function lh() {
  if (Au) return Ao;
  Au = 1;
  const { maxDepth: o, toJSON: h } = Jr(), { transform: f } = Pt();
  Ao = d;
  function d(c, { externalApi: r }) {
    return Object.assign(e, {
      depth: 3,
      eventId: "__ELECTRON_LOG_IPC__",
      level: c.isDev ? "silly" : !1,
      transforms: [h, o]
    }), r != null && r.isElectron() ? e : void 0;
    function e(n) {
      var t;
      ((t = n == null ? void 0 : n.variables) == null ? void 0 : t.processType) !== "renderer" && (r == null || r.sendIpc(e.eventId, {
        ...n,
        data: f({ logger: c, message: n, transport: e })
      }));
    }
  }
  return Ao;
}
var bo, bu;
function uh() {
  if (bu) return bo;
  bu = 1;
  const o = Nu, h = gf, { transform: f } = Pt(), { removeStyles: d } = Ho(), { toJSON: c, maxDepth: r } = Jr();
  bo = e;
  function e(n) {
    return Object.assign(t, {
      client: { name: "electron-application" },
      depth: 6,
      level: !1,
      requestOptions: {},
      transforms: [d, c, r],
      makeBodyFn({ message: a }) {
        return JSON.stringify({
          client: t.client,
          data: a.data,
          date: a.date.getTime(),
          level: a.level,
          scope: a.scope,
          variables: a.variables
        });
      },
      processErrorFn({ error: a }) {
        n.processMessage(
          {
            data: [`electron-log: can't POST ${t.url}`, a],
            level: "warn"
          },
          { transports: ["console", "file"] }
        );
      },
      sendRequestFn({ serverUrl: a, requestOptions: i, body: l }) {
        const p = (a.startsWith("https:") ? h : o).request(a, {
          method: "POST",
          ...i,
          headers: {
            "Content-Type": "application/json",
            "Content-Length": l.length,
            ...i.headers
          }
        });
        return p.write(l), p.end(), p;
      }
    });
    function t(a) {
      if (!t.url)
        return;
      const i = t.makeBodyFn({
        logger: n,
        message: { ...a, data: f({ logger: n, message: a, transport: t }) },
        transport: t
      }), l = t.sendRequestFn({
        serverUrl: t.url,
        requestOptions: t.requestOptions,
        body: Buffer.from(i, "utf8")
      });
      l.on("error", (s) => t.processErrorFn({
        error: s,
        logger: n,
        message: a,
        request: l,
        transport: t
      }));
    }
  }
  return bo;
}
var To, Tu;
function mc() {
  if (Tu) return To;
  Tu = 1;
  const o = fc(), h = rh(), f = nh(), d = ih(), c = ah(), r = lh(), e = uh();
  To = n;
  function n({ dependencies: t, initializeFn: a }) {
    var l;
    const i = new o({
      dependencies: t,
      errorHandler: new h(),
      eventLogger: new f(),
      initializeFn: a,
      isDev: (l = t.externalApi) == null ? void 0 : l.isDev(),
      logId: "default",
      transportFactories: {
        console: d,
        file: c,
        ipc: r,
        remote: e
      },
      variables: {
        processType: "main"
      }
    });
    return i.default = i, i.Logger = o, i.processInternalErrorFn = (s) => {
      i.transports.console.writeFn({
        message: {
          data: ["Unhandled electron-log error", s],
          level: "error"
        }
      });
    }, i;
  }
  return To;
}
var Ro, Ru;
function ch() {
  if (Ru) return Ro;
  Ru = 1;
  const o = mt, h = eh(), { initialize: f } = th(), d = mc(), c = new h({ electron: o }), r = d({
    dependencies: { externalApi: c },
    initializeFn: f
  });
  Ro = r, c.onIpc("__ELECTRON_LOG__", (n, t) => {
    t.scope && r.Logger.getInstance(t).scope(t.scope);
    const a = new Date(t.date);
    e({
      ...t,
      date: a.getTime() ? a : /* @__PURE__ */ new Date()
    });
  }), c.onIpcInvoke("__ELECTRON_LOG__", (n, { cmd: t = "", logId: a }) => {
    switch (t) {
      case "getOptions":
        return {
          levels: r.Logger.getInstance({ logId: a }).levels,
          logId: a
        };
      default:
        return e({ data: [`Unknown cmd '${t}'`], level: "error" }), {};
    }
  });
  function e(n) {
    var t;
    (t = r.Logger.getInstance(n)) == null || t.processMessage(n);
  }
  return Ro;
}
var Co, Cu;
function fh() {
  if (Cu) return Co;
  Cu = 1;
  const o = dc(), h = mc(), f = new o();
  return Co = h({
    dependencies: { externalApi: f }
  }), Co;
}
var Ou;
function dh() {
  if (Ou) return hr.exports;
  Ou = 1;
  const o = typeof process > "u" || process.type === "renderer" || process.type === "worker", h = typeof process == "object" && process.type === "browser";
  return o ? (cc(), hr.exports = Qd()) : h ? hr.exports = ch() : hr.exports = fh(), hr.exports;
}
var hh = dh();
const Ht = /* @__PURE__ */ vf(hh), ph = hf(import.meta.url), Oo = be.dirname(ph);
_f.config({ path: be.join(Oo, `../../.env.${process.env.NODE_ENV}`) });
async function mh() {
  const o = new df({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: be.join(Oo, "../preload/preload.js"),
      contextIsolation: !0,
      nodeIntegration: !1,
      devTools: !0,
      webSecurity: !0
    },
    frame: !1
  });
  !Mr.isPackaged ? (o.loadURL(`${process.env.VITE_APP_URL}:${process.env.VITE_APP_PORT}`), o.webContents.openDevTools()) : (o.loadFile(be.join(Oo, "../renderer/index.html")), o.webContents.openDevTools());
}
Dt.autoUpdater.on("checking-for-update", () => {
  Ht.info("업데이트 확인 중...");
});
Dt.autoUpdater.on("update-available", (o) => {
  Ht.info("업데이트가 가능합니다.");
});
Dt.autoUpdater.on("update-not-available", (o) => {
  Ht.info("현재 최신버전입니다.");
});
Dt.autoUpdater.on("error", (o) => {
  Ht.info("에러가 발생하였습니다. 에러내용 : " + o);
});
Dt.autoUpdater.on("download-progress", (o) => {
  let h = "다운로드 속도: " + o.bytesPerSecond;
  h = h + " - 현재 " + o.percent + "%", h = h + " (" + o.transferred + "/" + o.total + ")", Ht.info(h);
});
Dt.autoUpdater.on("update-downloaded", (o) => {
  Ht.info("업데이트가 완료되었습니다.");
});
Mr.on("ready", () => {
  mh(), Dt.autoUpdater.checkForUpdates();
});
Mr.on("window-all-closed", () => {
  Mr.quit();
});
