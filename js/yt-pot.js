var YTPOT = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);

  // entry.js
  var entry_exports = {};
  __export(entry_exports, {
    BgError: () => BgError,
    BotGuardClient: () => BotGuardClient,
    DeferredPromise: () => DeferredPromise,
    GOOG_API_KEY: () => GOOG_API_KEY,
    GOOG_BASE_URL: () => GOOG_BASE_URL,
    USER_AGENT: () => USER_AGENT,
    WebPoMinter: () => WebPoMinter,
    YT_BASE_URL: () => YT_BASE_URL,
    base64ToU8: () => base64ToU8,
    buildURL: () => buildURL,
    createColdStartToken: () => createColdStartToken,
    decodeColdStartToken: () => decodeColdStartToken,
    descrambleChallenge: () => descrambleChallenge,
    getChallenge: () => getChallenge,
    getHeaders: () => getHeaders,
    isBrowser: () => isBrowser,
    parseChallengeData: () => parseChallengeData,
    parseLooseJSON: () => parseLooseJSON,
    u8ToBase64: () => u8ToBase64
  });

  // node_modules/bgutils-js/dist/utils/constants.js
  var GOOG_BASE_URL = "https://jnn-pa.googleapis.com";
  var YT_BASE_URL = "https://www.youtube.com";
  var GOOG_API_KEY = "AIzaSyDyT5W0Jh49F30Pqqtyfdf7pDLFKLJoAnw";
  var USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36(KHTML, like Gecko)";

  // node_modules/bgutils-js/dist/utils/helpers.js
  var base64urlCharRegex = /[-_.]/g;
  var base64urlToBase64Map = {
    "-": "+",
    _: "/",
    ".": "="
  };
  var DeferredPromise = class {
    constructor() {
      __publicField(this, "promise");
      __publicField(this, "resolve");
      __publicField(this, "reject");
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    }
  };
  var BgError = class extends TypeError {
    constructor(message, info) {
      super(message);
      __publicField(this, "info");
      this.name = "BgError";
      if (info)
        this.info = info;
    }
  };
  function base64ToU8(base64) {
    let base64Mod;
    if (base64urlCharRegex.test(base64)) {
      base64Mod = base64.replace(base64urlCharRegex, function(match) {
        return base64urlToBase64Map[match];
      });
    } else {
      base64Mod = base64;
    }
    base64Mod = atob(base64Mod);
    return new Uint8Array([...base64Mod].map((char) => char.charCodeAt(0)));
  }
  function u8ToBase64(u8, base64url = false) {
    const result = btoa(String.fromCharCode(...u8));
    if (base64url) {
      return result.replace(/\+/g, "-").replace(/\//g, "_");
    }
    return result;
  }
  function parseLooseJSON(looseJson) {
    const sanitizedString = looseJson.replace(/\\x([0-9A-Fa-f]{2})/g, (_match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
    let jsonStr = sanitizedString.replace(/,\s*([\]}])/g, "$1");
    jsonStr = jsonStr.replace(/'((?:[^'\\]|\\[\s\S])*)'/g, (_match, innerStr) => {
      const unescaped = innerStr.replace(/\\'/g, "'");
      return JSON.stringify(unescaped);
    });
    jsonStr = jsonStr.replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":');
    const parsedData = JSON.parse(jsonStr);
    for (const key in parsedData) {
      const val = parsedData[key];
      if (typeof val === "string" && (val.trim().startsWith("{") || val.trim().startsWith("["))) {
        try {
          parsedData[key] = JSON.parse(val);
        } catch {
        }
      }
    }
    return parsedData;
  }
  function isBrowser() {
    const isBrowser2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" && typeof window.HTMLElement !== "undefined" && typeof window.navigator !== "undefined" && typeof window.getComputedStyle === "function" && typeof window.requestAnimationFrame === "function" && typeof window.matchMedia === "function";
    const hasValidWindow = Object.getOwnPropertyDescriptor(globalThis, "window")?.get?.toString().includes("[native code]") ?? false;
    return isBrowser2 && hasValidWindow;
  }
  function getHeaders() {
    const headers = {
      "content-type": "application/json+protobuf",
      "x-goog-api-key": GOOG_API_KEY,
      "x-user-agent": "grpc-web-javascript/0.1"
    };
    if (!isBrowser()) {
      headers["user-agent"] = USER_AGENT;
    }
    return headers;
  }
  function buildURL(endpointName, useYouTubeAPI) {
    return `${useYouTubeAPI ? YT_BASE_URL : GOOG_BASE_URL}/${useYouTubeAPI ? "api/jnn/v1" : "$rpc/google.internal.waa.v1.Waa"}/${endpointName}`;
  }

  // node_modules/bgutils-js/dist/utils/EventEmitterLike.js
  var _listeners, _onceWrappers;
  var EventEmitterLike = class {
    constructor() {
      __privateAdd(this, _listeners, /* @__PURE__ */ new Map());
      __privateAdd(this, _onceWrappers, /* @__PURE__ */ new Map());
    }
    emit(type, ...args) {
      const listeners = __privateGet(this, _listeners).get(type);
      if (!listeners || listeners.size === 0)
        return;
      for (const listener of [...listeners]) {
        listener(...args);
      }
    }
    on(type, listener) {
      let listeners = __privateGet(this, _listeners).get(type);
      if (!listeners) {
        listeners = /* @__PURE__ */ new Set();
        __privateGet(this, _listeners).set(type, listeners);
      }
      listeners.add(listener);
    }
    once(type, listener) {
      const wrapper = (...args) => {
        this.off(type, listener);
        listener(...args);
      };
      let wrappersByType = __privateGet(this, _onceWrappers).get(listener);
      if (!wrappersByType) {
        wrappersByType = /* @__PURE__ */ new Map();
        __privateGet(this, _onceWrappers).set(listener, wrappersByType);
      }
      wrappersByType.set(type, wrapper);
      this.on(type, wrapper);
    }
    off(type, listener) {
      const listeners = __privateGet(this, _listeners).get(type);
      if (!listeners)
        return;
      let target = listener;
      const wrappersByType = __privateGet(this, _onceWrappers).get(listener);
      if (wrappersByType) {
        const onceWrapper = wrappersByType.get(type);
        if (onceWrapper) {
          target = onceWrapper;
          wrappersByType.delete(type);
          if (wrappersByType.size === 0)
            __privateGet(this, _onceWrappers).delete(listener);
        }
      }
      listeners.delete(target);
      if (listeners.size === 0)
        __privateGet(this, _listeners).delete(type);
    }
    removeAllListeners(type) {
      if (!type) {
        __privateGet(this, _listeners).clear();
        __privateGet(this, _onceWrappers).clear();
        return;
      }
      __privateGet(this, _listeners).delete(type);
      for (const [listener, wrappersByType] of __privateGet(this, _onceWrappers).entries()) {
        wrappersByType.delete(type);
        if (wrappersByType.size === 0)
          __privateGet(this, _onceWrappers).delete(listener);
      }
    }
  };
  _listeners = new WeakMap();
  _onceWrappers = new WeakMap();

  // node_modules/bgutils-js/dist/core/BotGuardClient.js
  var BotGuardClient = class _BotGuardClient extends EventEmitterLike {
    constructor(options) {
      super();
      __publicField(this, "vm");
      __publicField(this, "program");
      __publicField(this, "userInteractionElement");
      __publicField(this, "syncSnapshotFunction");
      __publicField(this, "deferredVmFunctions", new DeferredPromise());
      __publicField(this, "defaultTimeout", 3e3);
      if (!options.globalObject || !options.globalName || !options.program) {
        throw new BgError("Invalid options", { options });
      }
      this.userInteractionElement = options.userInteractionElement;
      this.vm = options.globalObject[options.globalName];
      this.program = options.program;
    }
    on(type, listener) {
      super.on(type, listener);
    }
    off(type, listener) {
      super.off(type, listener);
    }
    /**
     * Factory method to create and load a BotGuardClient instance.
     * @param options - Configuration options for the BotGuardClient.
     * @returns A loaded BotGuardClient instance.
     */
    static async create(options) {
      return await new _BotGuardClient(options).load();
    }
    async load() {
      if (!this.vm)
        throw new BgError("EGOU: BotGuard unavailable");
      if (!this.vm.a)
        throw new BgError("ELIU: BotGuard initialization function unavailable");
      const vmSetupCallback = (asyncSnapshotFunction, shutdownFunction, passEventFunction, checkCameraFunction) => {
        this.deferredVmFunctions.resolve({
          asyncSnapshotFunction,
          shutdownFunction,
          passEventFunction,
          checkCameraFunction
        });
      };
      const logEvent = (event, elapsedTime) => {
        this.emit("record-bg-event", { event, elapsedTime });
      };
      const incrementClientErrorCount = (errorCode) => {
        this.emit("increment-client-error-count", { errorCode });
      };
      const recordPayloadSize = (payloadSize) => {
        this.emit("record-payload-size", { payloadSize });
      };
      const recordLatency = (latency, et) => {
        this.emit("record-latency", { latency, et });
      };
      const incrementEventCount = (event) => {
        this.emit("increment-bg-event-count", { event });
      };
      const loggerFunctions = [
        logEvent,
        incrementClientErrorCount,
        recordPayloadSize,
        recordLatency,
        incrementEventCount
      ];
      const vmTelemetryCallback = (latency, eventFlag1, eventFlag2) => {
        let event = "k";
        if (eventFlag1) {
          event = "h";
        } else if (eventFlag2) {
          event = "u";
        }
        incrementEventCount(event);
        logEvent(event, latency);
      };
      try {
        this.syncSnapshotFunction = await this.vm.a(this.program, vmSetupCallback, true, this.userInteractionElement, vmTelemetryCallback, [[], []], void 0, false, loggerFunctions)?.[0];
      } catch (error) {
        throw new BgError("Could not load program", { error });
      }
      return this;
    }
    /**
     * Calls a VM function with a timeout.
     * @param vmFunctionName - The name of the VM function to execute.
     * @param timeout - The timeout in milliseconds.
     * @param args - The arguments to pass to the VM function.
     */
    async execute(vmFunctionName, timeout, ...args) {
      return await Promise.race([
        (async () => {
          const vmFunctions = await this.deferredVmFunctions.promise;
          const vmFunction = vmFunctions[vmFunctionName];
          if (!vmFunction)
            throw new BgError(`${vmFunctionName} function not found`);
          return vmFunction(...args);
        })(),
        new Promise((_, reject) => setTimeout(() => reject(new BgError("VM operation timed out")), timeout))
      ]);
    }
    /**
     * Takes a snapshot asynchronously.
     * @returns The snapshot result.
     * @example
     * ```ts
     * const result = await botguard.snapshot({
     *   contentBinding: {
     *     c: "a=6&a2=10&b=SZWDwKVIuixOp7Y4euGTgwckbJA&c=1729143849&d=1&t=7200&c1a=1&c6a=1&c6b=1&hh=HrMb5mRWTyxGJphDr0nW2Oxonh0_wl2BDqWuLHyeKLo",
     *     e: "ENGAGEMENT_TYPE_VIDEO_LIKE",
     *     encryptedVideoId: "P-vC09ZJcnM"
     *    }
     * });
     *
     * console.log(result);
     * ```
     */
    async snapshot(args, timeout = this.defaultTimeout) {
      return await new Promise(async (resolve, reject) => {
        await this.execute("asyncSnapshotFunction", timeout, (response) => resolve(response), [
          args.contentBinding,
          args.signedTimestamp,
          args.webPoSignalOutput,
          args.skipPrivacyBuffer
        ]).catch(reject);
      });
    }
    /**
     * Passes an event to the VM.
     */
    async passEvent(args, timeout = this.defaultTimeout) {
      return this.execute("passEventFunction", timeout, args);
    }
    /**
     * Checks the "camera".
     */
    async checkCamera(args, timeout = this.defaultTimeout) {
      return this.execute("checkCameraFunction", timeout, args);
    }
    /**
     * Shuts down the VM. Once called, the VM is no longer usable.
     */
    async shutdown(timeout = this.defaultTimeout) {
      return this.execute("shutdownFunction", timeout);
    }
    /**
     * Takes a snapshot synchronously.
     * @returns The snapshot result.
     */
    async snapshotSynchronous(args) {
      if (!this.syncSnapshotFunction)
        throw new BgError("Synchronous snapshot function not found");
      return this.syncSnapshotFunction([
        args.contentBinding,
        args.signedTimestamp,
        args.webPoSignalOutput,
        args.skipPrivacyBuffer
      ]);
    }
  };

  // node_modules/bgutils-js/dist/core/ChallengeFetcher.js
  async function getChallenge(config) {
    const { requestKey, interpreterHash, fetchFunction, useYouTubeAPI } = config;
    if (!fetchFunction)
      throw new BgError("No fetch function provided");
    if (!requestKey)
      throw new BgError("No request key provided");
    const payload = [requestKey];
    if (interpreterHash)
      payload.push(interpreterHash);
    const response = await fetchFunction(buildURL("Create", useYouTubeAPI), {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    if (!response.ok)
      throw new BgError("Failed to fetch challenge", { status: response.status });
    const rawData = await response.json();
    return parseChallengeData(rawData);
  }
  function parseChallengeData(rawData) {
    let challengeData = [];
    if (rawData.length > 1 && typeof rawData[1] === "string") {
      const descrambled = descrambleChallenge(rawData[1]);
      challengeData = JSON.parse(descrambled || "[]");
    } else if (rawData.length && typeof rawData[0] === "object") {
      challengeData = rawData[0];
    }
    const [messageId, wrappedScript, wrappedUrl, interpreterHash, program, globalName, , clientExperimentsStateBlob] = challengeData;
    const privateDoNotAccessOrElseSafeScriptWrappedValue = Array.isArray(wrappedScript) ? wrappedScript.find((value) => value && typeof value === "string") : void 0;
    const privateDoNotAccessOrElseTrustedResourceUrlWrappedValue = Array.isArray(wrappedUrl) ? wrappedUrl.find((value) => value && typeof value === "string") : void 0;
    const clientSideBgChallenge = {
      messageId,
      interpreterHash,
      program,
      globalName,
      clientExperimentsStateBlob
    };
    if (privateDoNotAccessOrElseSafeScriptWrappedValue) {
      clientSideBgChallenge.interpreterJavascript = {
        privateDoNotAccessOrElseSafeScriptWrappedValue
      };
    }
    if (privateDoNotAccessOrElseTrustedResourceUrlWrappedValue) {
      clientSideBgChallenge.interpreterUrl = {
        privateDoNotAccessOrElseTrustedResourceUrlWrappedValue
      };
    }
    return clientSideBgChallenge;
  }
  function descrambleChallenge(scrambledChallenge) {
    const buffer = base64ToU8(scrambledChallenge);
    if (buffer.length)
      return new TextDecoder().decode(buffer.map((b) => b + 97));
  }

  // node_modules/bgutils-js/dist/core/WebPoMinter.js
  var WebPoMinter = class _WebPoMinter {
    constructor(mintCallback) {
      __publicField(this, "mintCallback");
      this.mintCallback = mintCallback;
    }
    /**
     * Factory method to create a WebPoMinter instance.
     * @param integrityTokenResponse - The integrity token response object.
     * @param webPoSignalOutput - The output array containing the minter function.
     */
    static async create(integrityTokenResponse, webPoSignalOutput) {
      const getMinter = webPoSignalOutput[0];
      if (!getMinter)
        throw new BgError("PMD:Undefined");
      if (!integrityTokenResponse.integrityToken)
        throw new BgError("No integrity token provided", { integrityTokenResponse });
      const mintCallback = await getMinter(base64ToU8(integrityTokenResponse.integrityToken));
      if (!(mintCallback instanceof Function))
        throw new BgError("APF:Failed");
      return new _WebPoMinter(mintCallback);
    }
    /**
     * Mints a proof and returns it as a web-safe base64 string.
     * @param contentBinding - A Visitor ID, Video ID, or Data Sync ID.
     */
    async mintAsWebsafeString(contentBinding) {
      return u8ToBase64(await this.mint(contentBinding), true);
    }
    /**
     * Mints a proof and returns it as a Uint8Array.
     * @param contentBinding - A Visitor ID, Video ID, or Data Sync ID.
     */
    async mint(contentBinding) {
      const result = await this.mintCallback(new TextEncoder().encode(contentBinding));
      if (!result)
        throw new BgError("YNJ:Undefined");
      if (!(result instanceof Uint8Array))
        throw new BgError("ODM:Invalid");
      return result;
    }
  };
  function createColdStartToken(contentBinding, clientState) {
    const contentBindingBytes = new TextEncoder().encode(contentBinding);
    const timestamp = Math.floor(Date.now() / 1e3);
    const randomKeys = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
    const header = randomKeys.concat([
      0,
      clientState ?? 1
    ], [
      timestamp >> 24 & 255,
      timestamp >> 16 & 255,
      timestamp >> 8 & 255,
      timestamp & 255
    ]);
    const packet = new Uint8Array(2 + header.length + contentBindingBytes.length);
    packet[0] = 34;
    packet[1] = header.length + contentBindingBytes.length;
    packet.set(header, 2);
    packet.set(contentBindingBytes, 2 + header.length);
    const payload = packet.subarray(2);
    const keyLength = randomKeys.length;
    for (let i = keyLength; i < payload.length; i++) {
      payload[i] ^= payload[i % keyLength];
    }
    return u8ToBase64(packet, true);
  }
  function decodeColdStartToken(token) {
    const packet = base64ToU8(token);
    const payloadLength = packet[1];
    const totalPacketLength = 2 + payloadLength;
    if (packet.length !== totalPacketLength)
      throw new BgError("Invalid packet length.", { packetLength: packet.length, expectedLength: totalPacketLength });
    const payload = packet.subarray(2);
    const keyLength = 2;
    for (let i = keyLength; i < payload.length; ++i) {
      payload[i] ^= payload[i % keyLength];
    }
    const keys = [payload[0], payload[1]];
    const unknownVal = payload[2];
    const clientState = payload[3];
    const timestamp = payload[4] << 24 | payload[5] << 16 | payload[6] << 8 | payload[7];
    const date = new Date(timestamp * 1e3);
    const contentBinding = new TextDecoder().decode(payload.subarray(8));
    return {
      contentBinding,
      timestamp,
      unknownVal,
      clientState,
      keys,
      date
    };
  }
  return __toCommonJS(entry_exports);
})();
