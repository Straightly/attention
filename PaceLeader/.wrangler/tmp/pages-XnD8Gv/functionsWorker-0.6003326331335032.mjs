var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/admin/get-lists.js
var DEFAULT_ADMINS = ["jianame@gmail.com"];
var DEFAULT_PACERS = ["jianame@gmail.com"];
var DEFAULT_RUNNERS = ["jianame@gmail.com"];
function normalizeList(raw, role) {
  if (!Array.isArray(raw)) return [];
  return raw.map((entry) => {
    if (typeof entry === "string") {
      const email2 = entry;
      const displayName2 = email2.split("@")[0] || email2;
      const id2 = role + ":" + email2;
      return { id: id2, email: email2, displayName: displayName2 };
    }
    const email = entry.email;
    const displayName = entry.displayName && entry.displayName.length > 0 ? entry.displayName : email && email.split("@")[0] || email;
    const id = entry.id && entry.id.length > 0 ? entry.id : role + ":" + email;
    return { id, email, displayName };
  });
}
__name(normalizeList, "normalizeList");
async function onRequestPost(context) {
  try {
    const KV = context.env.PACELEADER_KV;
    let admins, pacers, runners;
    try {
      const rawAdmins = await KV.get("admins", "json");
      const rawPacers = await KV.get("pacers", "json");
      const rawRunners = await KV.get("runners", "json");
      const baseAdmins = !rawAdmins || rawAdmins.length === 0 ? DEFAULT_ADMINS : rawAdmins;
      const basePacers = !rawPacers || rawPacers.length === 0 ? DEFAULT_PACERS : rawPacers;
      const baseRunners = !rawRunners || rawRunners.length === 0 ? DEFAULT_RUNNERS : rawRunners;
      admins = normalizeList(baseAdmins, "admins");
      pacers = normalizeList(basePacers, "pacers");
      runners = normalizeList(baseRunners, "runners");
    } catch (kvError) {
      console.error("KV read failed, using fallback:", kvError);
      admins = normalizeList(DEFAULT_ADMINS, "admins");
      pacers = normalizeList(DEFAULT_PACERS, "pacers");
      runners = normalizeList(DEFAULT_RUNNERS, "runners");
    }
    return new Response(JSON.stringify({
      admins,
      pacers,
      runners
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      admins: DEFAULT_ADMINS,
      pacers: DEFAULT_PACERS,
      runners: DEFAULT_RUNNERS
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost, "onRequestPost");

// api/admin/update-lists.js
async function onRequestPost2(context) {
  try {
    let validateList = function(list, role) {
      for (const entry of list) {
        if (!entry || typeof entry.email !== "string") {
          return `Invalid entry in ${role} list`;
        }
        const email = entry.email;
        if (!email.includes("@gmail.com")) {
          return `Invalid email: ${email}`;
        }
      }
      return null;
    };
    __name(validateList, "validateList");
    const { request } = context;
    const body = await request.json();
    const { admins, pacers, runners } = body;
    if (!Array.isArray(admins) || !Array.isArray(pacers) || !Array.isArray(runners)) {
      return new Response(JSON.stringify({ error: "Invalid data format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const errAdmins = validateList(admins, "admins");
    const errPacers = validateList(pacers, "pacers");
    const errRunners = validateList(runners, "runners");
    const firstError = errAdmins || errPacers || errRunners;
    if (firstError) {
      return new Response(JSON.stringify({ error: firstError }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const KV = context.env.PACELEADER_KV;
    if (!KV) {
      console.error("KV namespace not available");
      return new Response(JSON.stringify({
        error: "KV storage not available. Changes saved locally but not persisted."
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    await KV.put("admins", JSON.stringify(admins));
    await KV.put("pacers", JSON.stringify(pacers));
    await KV.put("runners", JSON.stringify(runners));
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error updating lists:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost2, "onRequestPost");

// api/auth/verify.js
var DEFAULT_ADMINS2 = ["jianame@gmail.com"];
var DEFAULT_PACERS2 = ["jianame@gmail.com"];
var DEFAULT_RUNNERS2 = ["jianame@gmail.com"];
function normalizeList2(raw, role) {
  if (!Array.isArray(raw)) return [];
  return raw.map((entry) => {
    if (typeof entry === "string") {
      const email2 = entry;
      const displayName2 = email2.split("@")[0] || email2;
      const id2 = role + ":" + email2;
      return { id: id2, email: email2, displayName: displayName2 };
    }
    const email = entry.email;
    const displayName = entry.displayName && entry.displayName.length > 0 ? entry.displayName : email && email.split("@")[0] || email;
    const id = entry.id && entry.id.length > 0 ? entry.id : role + ":" + email;
    return { id, email, displayName };
  });
}
__name(normalizeList2, "normalizeList");
async function getUserLists(KV) {
  if (!KV) {
    console.warn("KV not available, using hardcoded defaults");
    return {
      admins: normalizeList2(DEFAULT_ADMINS2, "admins"),
      pacers: normalizeList2(DEFAULT_PACERS2, "pacers"),
      runners: normalizeList2(DEFAULT_RUNNERS2, "runners")
    };
  }
  try {
    let admins = await KV.get("admins", "json");
    if (!admins) {
      await KV.put("admins", JSON.stringify(DEFAULT_ADMINS2));
      await KV.put("pacers", JSON.stringify(DEFAULT_PACERS2));
      await KV.put("runners", JSON.stringify(DEFAULT_RUNNERS2));
      return {
        admins: normalizeList2(DEFAULT_ADMINS2, "admins"),
        pacers: normalizeList2(DEFAULT_PACERS2, "pacers"),
        runners: normalizeList2(DEFAULT_RUNNERS2, "runners")
      };
    }
    const pacers = await KV.get("pacers", "json");
    const runners = await KV.get("runners", "json");
    return {
      admins: normalizeList2(admins, "admins"),
      pacers: normalizeList2(pacers || [], "pacers"),
      runners: normalizeList2(runners || [], "runners")
    };
  } catch (error) {
    console.error("KV read failed, using fallback:", error);
    return {
      admins: normalizeList2(DEFAULT_ADMINS2, "admins"),
      pacers: normalizeList2(DEFAULT_PACERS2, "pacers"),
      runners: normalizeList2(DEFAULT_RUNNERS2, "runners")
    };
  }
}
__name(getUserLists, "getUserLists");
async function onRequestPost3(context) {
  try {
    const { request } = context;
    const body = await request.json();
    const { credential } = body;
    if (!credential) {
      return new Response(JSON.stringify({ error: "No credential provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const tokenInfoResponse = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    );
    if (!tokenInfoResponse.ok) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const tokenInfo = await tokenInfoResponse.json();
    const email = tokenInfo.email;
    const { admins, pacers, runners } = await getUserLists(context.env.PACELEADER_KV);
    const roles = [];
    if (admins.some((u) => u.email === email)) roles.push("admin");
    if (pacers.some((u) => u.email === email)) roles.push("pacer");
    if (runners.some((u) => u.email === email)) roles.push("runner");
    if (roles.includes("admin") && !roles.includes("pacer")) {
      roles.push("pacer");
    }
    if (roles.includes("pacer") && !roles.includes("runner")) {
      roles.push("runner");
    }
    if (roles.length === 0) {
      return new Response(JSON.stringify({
        authorized: false,
        roles: [],
        message: "To be admitted, please consult SU WeChat group to sign up."
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      authorized: true,
      roles,
      email,
      name: tokenInfo.name
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Verify error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost3, "onRequestPost");

// api/pacer/runs.js
async function onRequestPost4(context) {
  const KV = context.env.PACELEADER_KV;
  if (!KV) {
    return new Response(JSON.stringify({ error: "KV storage not available" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const { request } = context;
    const body = await request.json();
    const { mode, pacer, date, startTime, pace, startPlace, removed, runnerEmail, selected } = body || {};
    let runs = [];
    try {
      const stored = await KV.get("runs", "json");
      if (Array.isArray(stored)) {
        runs = stored;
      }
    } catch (e) {
      runs = [];
    }
    if (mode === "getByPacer") {
      if (!pacer) {
        return new Response(JSON.stringify({ error: "Missing pacer" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const pacerRuns = runs.filter((r) => r.pacer === pacer);
      return new Response(JSON.stringify({ runs: pacerRuns }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (mode === "getByDate") {
      if (!date) {
        return new Response(JSON.stringify({ error: "Missing date" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const dateRuns = runs.filter((r) => r.date === date);
      return new Response(JSON.stringify({ runs: dateRuns }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (mode === "upsert") {
      if (!pacer || !date) {
        return new Response(JSON.stringify({ error: "Missing pacer or date" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const defaults = {
        startTime: "8:00am",
        pace: "10:00/ml",
        startPlace: "WF"
      };
      let run = runs.find((r) => r.pacer === pacer && r.date === date);
      if (!run) {
        run = {
          date,
          pacer,
          startTime: startTime || defaults.startTime,
          pace: pace || defaults.pace,
          startPlace: startPlace || defaults.startPlace,
          signedUpRunners: [pacer],
          removed: typeof removed === "boolean" ? removed : false
        };
        runs.push(run);
      } else {
        if (typeof startTime === "string") run.startTime = startTime;
        if (typeof pace === "string") run.pace = pace;
        if (typeof startPlace === "string") run.startPlace = startPlace;
        if (typeof removed === "boolean") run.removed = removed;
        if (!Array.isArray(run.signedUpRunners)) {
          run.signedUpRunners = [pacer];
        } else if (!run.signedUpRunners.includes(pacer)) {
          run.signedUpRunners.push(pacer);
        }
      }
      await KV.put("runs", JSON.stringify(runs));
      return new Response(JSON.stringify({ run }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (mode === "runnerSelect") {
      if (!date || !pacer || !runnerEmail || typeof selected !== "boolean") {
        return new Response(JSON.stringify({ error: "Missing date, pacer, runnerEmail, or selected" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      for (const r of runs) {
        if (r.date === date && Array.isArray(r.signedUpRunners)) {
          r.signedUpRunners = r.signedUpRunners.filter((email) => email !== runnerEmail);
        }
      }
      if (selected) {
        const target = runs.find((r) => r.date === date && r.pacer === pacer);
        if (!target) {
          return new Response(JSON.stringify({ error: "Target run not found for given date and pacer" }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
          });
        }
        if (!Array.isArray(target.signedUpRunners)) {
          target.signedUpRunners = [];
        }
        if (!target.signedUpRunners.includes(runnerEmail)) {
          target.signedUpRunners.push(runnerEmail);
        }
      }
      await KV.put("runs", JSON.stringify(runs));
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: "Unknown mode" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Pacer runs API error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost4, "onRequestPost");

// ../.wrangler/tmp/pages-XnD8Gv/functionsRoutes-0.6823629839874963.mjs
var routes = [
  {
    routePath: "/api/admin/get-lists",
    mountPath: "/api/admin",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/admin/update-lists",
    mountPath: "/api/admin",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/auth/verify",
    mountPath: "/api/auth",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/pacer/runs",
    mountPath: "/api/pacer",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost4]
  }
];

// ../../../../Users/zhian/AppData/Roaming/npm/node_modules/wrangler/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../../Users/zhian/AppData/Roaming/npm/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");

// ../../../../Users/zhian/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../Users/zhian/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-pmUznt/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;

// ../../../../Users/zhian/AppData/Roaming/npm/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-pmUznt/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=functionsWorker-0.6003326331335032.mjs.map
