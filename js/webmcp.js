// InstaScript WebMCP registration.
// Exposes the same read-only tasks as the server API and the MCP endpoint.
// Feature-detected: browsers without navigator.modelContext are untouched.
(function () {
  var mc = navigator.modelContext;
  if (!mc || typeof mc.registerTool !== "function") return;

  function call(path) {
    return fetch(path, { headers: { Accept: "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        return { content: [{ type: "text", text: JSON.stringify(d, null, 2) }] };
      })
      .catch(function (e) {
        return { content: [{ type: "text", text: "Request failed: " + e.message }], isError: true };
      });
  }

  var tools = [
    {
      name: "find_page",
      description: "Find the InstaScript page that handles a task, for example 'tiktok', 'mp3 to text' or 'facebook video'. Returns the matching pages with their URLs, what each accepts and its limits.",
      inputSchema: {
        type: "object",
        properties: { query: { type: "string", description: "Words describing the job." } },
        required: ["query"]
      },
      execute: function (args) {
        return call("/api/pages?q=" + encodeURIComponent(args && args.query ? args.query : ""));
      }
    },
    {
      name: "get_benchmark",
      description: "Get the measured in-browser transcription times for a given audio length in seconds. Values are single measurements on one machine, not averages.",
      inputSchema: {
        type: "object",
        properties: { length_seconds: { type: "number", description: "Audio length in seconds. Omit to get every measured row." } }
      },
      execute: function (args) {
        var n = args && args.length_seconds;
        return call("/api/benchmark" + (n ? "?length_seconds=" + encodeURIComponent(n) : ""));
      }
    },
    {
      name: "site_info",
      description: "Explain what InstaScript does, the file types and links it accepts, and its limits (English only, 100 MB, ~30 second chunks, no upload).",
      inputSchema: { type: "object", properties: {} },
      execute: function () { return call("/api/pages?q=about"); }
    }
  ];

  var controller = new AbortController();
  tools.forEach(function (tool) {
    try {
      mc.registerTool(tool, controller.signal);
    } catch (e) {
      try { mc.registerTool(tool); } catch (e2) { /* unsupported signature */ }
    }
  });

  window.addEventListener("pagehide", function () { controller.abort(); });
})();
