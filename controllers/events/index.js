const Event = require("../../models/Event");
const Mark = require("../../models/Mark");

exports.createEvnet = async (req, res) => {
	const { id } = req.body;

	const mark = await Mark.findOneById(id);

	const newEvent = new Event({
		...req.body,
		mark
	});

	await newEvent.save();

	res.status(200).json(newEvent);
};
