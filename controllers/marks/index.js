const Mark = require("../../models/Mark");
const Event = require("../../models/Event");

exports.getAllMarks = async (req, res) => {
	try {
		const marks = await Mark.find({});
		res.status(200).json({ marks });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Something went wrong" });
	}
};

exports.createMark = async (req, res) => {
	const { mark, event } = req.body;

	const isExistEvent = await Event.findOne({ title: event.title, mark });

	if (isExistEvent) {
		return res.status(400).json({ error: "event already exists" });
	}

	const newMark = new Mark(mark);
	const newEvent = new Event(event);

	newMark.events.push(newEvent._id);
	newEvent.mark = mark;
	newEvent.creater = req.user.id;

	await newMark.save();
	await newEvent.save();

	res.status(200).json({
		created: true,
		mark: newMark
	});
};
