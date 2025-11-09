require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const dns = require("dns"); // Core Node.js DNS module
const { URL } = require("url"); // Core Node.js URL module

// Basic Configuration
const port = process.env.PORT || 5000;

const urlDatabase = {};
let nextShortId = 1;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", (req, res) => {
  const originalUrl = req.body.url;

  if (!originalUrl) {
    return res.json({ error: "invalid url" });
  }

  let hostname;
  let normalizedUrl;

  try {
    // 1. Attempt to parse the URL
    // Prepend 'https://' if the protocol is missing to make the URL object valid,
    // as the DNS lookup only works with a valid hostname.
    const urlToParse = originalUrl.startsWith("http")
      ? originalUrl
      : `https://${originalUrl}`;
    const urlObject = new URL(urlToParse);

    // Check for valid protocols (http or https)
    if (!["http:", "https:"].includes(urlObject.protocol)) {
      throw new Error("Invalid protocol");
    }

    hostname = urlObject.hostname;
    // Use the href for storage, which is the normalized URL
    normalizedUrl = urlObject.href;
  } catch (err) {
    // If URL parsing fails (e.g., just 'invalid-text'), return invalid url error
    return res.json({ error: "invalid url" });
  }

  // 2. DNS Lookup Validation (Async check for existence)
  dns.lookup(hostname, (err) => {
    if (err) {
      // DNS lookup failed (host doesn't exist or is unreachable)
      console.error(`DNS lookup failed for ${hostname}:`, err.message);
      return res.json({ error: "invalid url" });
    }

    // 3. DNS is valid, check if already in DB
    const existingEntry = Object.entries(urlDatabase).find(
      ([, url]) => url === normalizedUrl,
    );

    if (existingEntry) {
      const shortUrl = parseInt(existingEntry[0]);
      return res.json({
        original_url: normalizedUrl,
        short_url: shortUrl,
      });
    }

    // 4. Create new entry
    const shortUrl = nextShortId;
    urlDatabase[shortUrl] = normalizedUrl;
    nextShortId++;

    res.json({
      original_url: normalizedUrl,
      short_url: shortUrl,
    });
  });
});

app.get("/api/shorturl/:short_url", (req, res) => {
  const shortUrl = parseInt(req.params.short_url);

  if (isNaN(shortUrl)) {
    // Should generally not happen if the route is hit, but good practice
    return res.json({ error: "Wrong format" });
  }

  const originalUrl = urlDatabase[shortUrl];

  if (originalUrl) {
    // Test requirement 3: Redirect to the original URL
    res.redirect(301, originalUrl);
  } else {
    // URL not found
    res.json({ error: "No short URL found for the given input" });
  }
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, "0.0.0.0", function () {
  console.log(`Listening on port ${port}`);
});
