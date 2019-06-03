const jwt = require("jsonwebtoken");

exports.decodeJWT = (req, res, next) => {
	jwt.verify(
		req.cookies && req.cookies.token,
		process.env.TOKEN_SECRET,
		(err, data) => {
			if (!err) req.user = data;
		}
	);

	next();
};

exports.logger = (req, res, next) => {
	console.log(`${req.method} ---> ${req.url}`);

	next();
};
