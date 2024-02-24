const express = require('express');
const statistics = require('./statistics.js');
const { router: updateMetrics } = require('./metrics.js');

const router = express.Router();
const message = {
  status: 200,
  message: '/api root path',
  routes: {
    '/statistics': 'Bot statistics',
    '/metrics': 'Bot metrics for Prometheus'
  },
};

router.get('/', (req, res) => {
  res.status(200).json(message);
});

router.use('/statistics', statistics);
router.use('/metrics', updateMetrics);

module.exports = router;
exports.message = message;
