const express = require('express');
const router = express.Router();
const { Registry, Gauge } = require('prom-client');

const registry = new Registry();

const totalGuildsMetric = new Gauge({
	name: 'bot_guilds',
	help: 'Total number of guilds',
	registers: [registry]
});

const totalChannelsMetric = new Gauge({
	name: 'bot_channels',
	help: 'Total number of channels',
	registers: [registry]
});

const totalMembersMetric = new Gauge({
	name: 'bot_members',
	help: 'Total number of members',
	registers: [registry]
});

const totalPingMetric = new Gauge({
	name: 'bot_ping',
	help: 'Ping',
	registers: [registry]
});

const totalCommandsMetric = new Gauge({
	name: 'bot_commands',
	help: 'Commands',
	registers: [registry]
});

const commandStatMetric = new Gauge({
	name: 'bot_command_stat',
	help: 'Count of commands',
	labelNames: ['command'],
	registers: [registry]
});

const updateMetrics = (data) => {
	try {
		totalGuildsMetric.set(data.bot.totalGuilds);
		totalChannelsMetric.set(data.bot.totalChannels);
		totalMembersMetric.set(data.bot.totalMembers);
		totalPingMetric.set(data.bot.ping);
		totalCommandsMetric.set(data.bot.cmds);

		if (data.commandsStats && Array.isArray(data.commandsStats.commandStats)) {
			data.commandsStats.commandStats.forEach(commandStat => {
				commandStatMetric.labels(commandStat.name).set(commandStat.count);
			});
		}
	} catch (error) {
		console.error('Error updating metrics:', error);
	}
};

router.get('/', async (req, res) => {
	try {
		const metricsData = await registry.metrics();
		res.set('Content-Type', registry.contentType);
		res.send(metricsData);
	} catch (error) {
		console.error('Error fetching metrics:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = { router, updateMetrics };
