const jwt = require("jsonwebtoken");

const authRequired = ["/api/marks/create"];

exports.decodeJWT = (req, res, next) => {
	jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, (err, data) => {
		if (err && authRequired.indexOf(req.url) > -1) {
			return res.status(401).json({ authorization: false });
		}

		req.user = data;
	});

	next();
};

exports.logger = (req, res, next) => {
	console.log(`${req.method} ---> ${req.url}`);

	next();
};

//utilits