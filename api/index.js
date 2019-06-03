module.exports = app => {
	app.use("/api", require("./authentification"));
	app.use("/api/marks", require("./marks"));
};
