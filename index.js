import express from "express";
const myserver = express();
import myrouter from "./route/userroute/userRoute.js";
myserver.use(express.json());

//for home page
myserver.get("/", (req, res) => {
  res.status(200).send("you are in home page");
});
myserver.use("/user", myrouter);

//for server listening
myserver.listen(8001, () => {
  console.log("server is working");
});
