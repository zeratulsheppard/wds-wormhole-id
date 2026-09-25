const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3015;

app.disable("x-powered-by");

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
});

app.get("/healthz", (_req, res) => res.type("text/plain").send("ok"));

app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: "1h",
    etag: true,
  })
);

app.listen(PORT, () => {
  console.log(`wds-wormhole-id listening on :${PORT}`);
});
