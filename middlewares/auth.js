exports.authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    if (token === process.env.AUTHENTICATION_TOKEN) {
      next();
    } else {
      res.status(403).json({ error: 'Wrong access token' });
    }
  } else {
    res.status(401).json({ error: 'Missing authentication token' });
  }
};
