#!/usr/bin/env node
"use strict";
const http = require("http");

const CHECKS = [
  { name: "API", url: "http://localhost:4000/health" },
  { name: "Web", url: "http://localhost:3000" },
  { name: "Admin", url: "http://localhost:3001" },
];

function check(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 3000 }, (res) =>
      resolve(res.statusCode >= 200 && res.statusCode < 400)
    );
    req.on("error", () => resolve(false));
    req.on("timeout", () => { req.destroy(); resolve(false); });
  });
}

(async () => {
  console.log("Health checks:\n");
  let passed = 0;
  for (const { name, url } of CHECKS) {
    const ok = await check(url);
    console.log(`${ok ? "✓" : "✗"} ${name} (${url})`);
    if (ok) passed++;
  }
  console.log(`\n${passed}/${CHECKS.length} OK`);
  process.exit(passed === CHECKS.length ? 0 : 1);
})();
