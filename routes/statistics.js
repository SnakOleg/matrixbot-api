const express = require('express');
const router = express.Router();
const statistics = require('../models/statistics.js');

const getStatistics = (req, res) => {
  res.status(200).json(statistics);
};

const postStatistics = (req, res) => {
  const { bot, shards, commandsStats } = req.body;

  statistics.bot = bot;
  statistics.shards = shards;
  statistics.commandsStats = commandsStats;

  res.status(201).json({ success: 'Statistics have been successfully posted' });
};

router.get('/', getStatistics);
router.post('/', postStatistics);

module.exports = router;
