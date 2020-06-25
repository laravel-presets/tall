const { Preset, flags } = require('use-preset');

module.exports = Preset.make({
	name: 'preset',
	parse: () => ({
		// flags: {
		// 	auth: flags.boolean({
		// 		default: false,
		// 	}),
		// },
	}),
	actions: context => [
		// {
		// 	type: 'copy',
		// },
	],
});
