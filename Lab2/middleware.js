function logRequest(req, res, next) {
  res.send("Request received for: ${req.method} ${req.url}");
  next();
}

const validapi = "abcd";

function apiKeyMiddleware(req, res, next) {
  const apiKey = req.query.apiKey;

  if (!apiKey || apiKey !== validapi) {
    return res.status(401).json({ error: "Unauthorized - Invalid API key" });
  }
  res.send("Valid api");

  next();
}

module.exports = {
  logRequest,
  apiKeyMiddleware,
};
