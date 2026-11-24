const test = require("node:test");
const assert = require("node:assert/strict");
const { once } = require("node:events");
const server = require("../src/server");

test("project backend module loads", () => {
  assert.equal(typeof server.listen, "function");
});

test("API routes return JSON and support preflight requests", async (t) => {
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));

  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  const healthResponse = await fetch(`${baseUrl}/api/health`);
  assert.equal(healthResponse.status, 200);
  assert.equal(healthResponse.headers.get("content-type"), "application/json; charset=utf-8");
  assert.deepEqual(await healthResponse.json(), {
    status: "ok",
    service: "ResiliNER API",
  });

  const zonesResponse = await fetch(`${baseUrl}/api/risk-zones`);
  const zonesPayload = await zonesResponse.json();
  assert.equal(zonesResponse.status, 200);
  assert.equal(zonesPayload.zones.length, 3);

  const missingResponse = await fetch(`${baseUrl}/api/missing`);
  assert.equal(missingResponse.status, 404);

  const preflightResponse = await fetch(`${baseUrl}/api/health`, { method: "OPTIONS" });
  assert.equal(preflightResponse.status, 204);
  assert.equal(preflightResponse.headers.get("access-control-allow-methods"), "GET, OPTIONS");
});
