const Mark = require("../../models/Mark");
const Event = require("../../models/Event");

exports.createMark = async (req, res) => {
	const { mark, event } = req.body;

	const isExistEvent = await Event.findOne({ title: event.title, mark });

	if (isExistEvent) {
		return res.status(400).json({ error: "event already exists" });
	}

	const newMark = new Mark(mark);
	const newEvent = new Event(event);

	newMark.events.push(mark);
	newEvent.mark = mark;
	newEvent.creater = req.user._id;

	const createdMark = await newMark.save();
	await newEvent.save();

	res.status(200).json({
		created: true,
		...createdMark
	});
};
