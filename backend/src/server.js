const http = require("http");

const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 0 || port > 65535) {
  throw new Error("PORT must be an integer between 0 and 65535");
}

const data = {
  health: {
    status: "ok",
    service: "ResiliNER API",
  },
  zones: [
    { id: "NER-001", name: "Guwahati-Shillong NH-6 Corridor", score: 94, level: "HIGH" },
    { id: "NER-002", name: "Mangan-Lachen Sector", score: 91, level: "HIGH" },
    { id: "NER-003", name: "Tawang Sela Pass", score: 88, level: "CRITICAL" },
  ],
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": process.env.FRONTEND_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(payload));
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url || "/", "http://localhost");

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": process.env.FRONTEND_ORIGIN || "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "X-Content-Type-Options": "nosniff",
    });
    response.end();
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/health") {
    sendJson(response, 200, data.health);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/risk-zones") {
    sendJson(response, 200, { zones: data.zones });
    return;
  }

  sendJson(response, 404, { error: "Route not found" });
});

if (require.main === module) {
  server.listen(port, "0.0.0.0", () => {
    console.log(`ResiliNER API listening on port ${port}`);
  });
}

module.exports = server;
