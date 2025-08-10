#!/usr/bin/env node
const http = require("http");
const url = require("url");

const PORT = process.env.MOCK_EASYPOST_PORT
  ? Number(process.env.MOCK_EASYPOST_PORT)
  : 4010;

const purchasedIds = new Set();

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url || "", true);
  const method = req.method || "GET";

  // Simple health
  if (parsed.pathname === "/__health" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  // GET /shipments/:id
  const shipmentMatch = parsed.pathname?.match(/^\/shipments\/([^/]+)$/);
  if (shipmentMatch && method === "GET") {
    const id = shipmentMatch[1];
    const hasLabel = purchasedIds.has(id);
    const body = hasLabel
      ? {
          id,
          tracking_code: "9400 1000 0000 0000 0000 00",
          postage_label: {
            label_url:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
          },
        }
      : {
          id,
          postage_label: null,
        };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(body));
    return;
  }

  // POST /shipments/:id/buy
  const buyMatch = parsed.pathname?.match(/^\/shipments\/([^/]+)\/buy$/);
  if (buyMatch && method === "POST") {
    const id = buyMatch[1];
    purchasedIds.add(id);
    const body = {
      id,
      tracking_code: "9400 1000 0000 0000 0000 00",
      postage_label: {
        label_url:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
      },
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(body));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock EasyPost server listening on http://localhost:${PORT}`);
});
