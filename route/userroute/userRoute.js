import express from "express";
import connection from "../../myconnection/connectme.js";
const myrouter = express.Router();

//for user page
myrouter.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "you are in user page" });
});
//for user adding
myrouter.post("/add", async (req, res) => {
  const { name, location } = req.body;

  const [rows, fields] = await connection.execute(
    `INSERT INTO mytable(name,location)VALUES(?,?)`,
    [name, location]
  );
  res.status(200).json(rows);
});
//for reading
myrouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const [rows, fields] = await connection.execute(
    `SELECT * FROM mytable WHERE id=?;`,
    [id]
  );
});
//for updating
myrouter.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;
  const [rows, fields] = await connection.execute(
    `UPDATE mytable SET name = ?, location = ? WHERE id=?;`,
    [name, location, id]
  );
  res.status(200).json(rows);
});
//for deleting
myrouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const [rows, fields] = await connection.query(
    `DELETE FROM mytable WHERE id=?;`,
    [id]
  );
  if (rows.affectedRows == 1) {
    res.send("successfully deleted");
  } else
    res
      .status(200)
      .json({ success: false, message: "please check your request" });
});
export default myrouter;
