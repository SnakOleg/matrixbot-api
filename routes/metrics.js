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

const updateMetrics = (req, res, next) => {
	try {
		const { bot, shards, commandsStats } = req.body;

		totalGuildsMetric.set(bot.totalGuilds);
		totalChannelsMetric.set(bot.totalChannels);
		totalMembersMetric.set(bot.totalMembers);
		totalPingMetric.set(bot.ping);
		totalCommandsMetric.set(bot.cmds);

		if (commandsStats && Array.isArray(commandsStats.commandStats)) {
			commandsStats.commandStats.forEach(commandStat => {
				commandStatMetric.labels(commandStat.name).set(commandStat.count);
			});
		}

		next();
	} catch (error) {
		console.error('Error updating metrics:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

router.use(express.json());

router.get('/api/statistics', async (req, res) => {
	try {
		const metrics = await registry.metrics();
		res.set('Content-Type', registry.contentType);
		res.send(metrics);
	} catch (error) {
		console.error('Error updating metrics:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.use(updateMetrics);

module.exports = router;
