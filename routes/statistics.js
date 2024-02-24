// api/statistics.js
const express = require('express');
const router = express.Router();
const { updateMetrics } = require('./metrics');

let statisticsData = require('../models/statistics.js');

const getStatistics = (req, res) => {
  try {
    res.status(200).json(statisticsData);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const postStatistics = (req, res) => {
  try {
    const { bot, shards, commandsStats } = req.body;
    statisticsData.bot = bot;
    statisticsData.shards = shards;
    statisticsData.commandsStats = commandsStats;

    updateMetrics(statisticsData);

    res.status(201).json({ success: 'Statistics have been successfully posted' });
  } catch (error) {
    console.error('Error posting statistics:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

router.get('/', getStatistics);
router.post('/', postStatistics);

module.exports = router;
