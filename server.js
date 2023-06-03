const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
//dotenv conig
dotenv.config();

//mongodb connection
mongoose.set("strickQuery",true);
connectDB();

//rest obejct
const app = express();

//middlewares
app.use(express.json());
app.use(moragan("dev"));
app.use(cors());

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

//static files
// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("*", function (req, res) {
// 	res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.get('/',(req,res) => {
	res.setHeader("Access-Control-Allow-Credentials","true");
	res.send("Api is running");
})
//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
	console.log(
		`Server Running in ${process.env.NODE_MODE} Mode on port ${PORT}`
			.bgCyan.white
	);
});
