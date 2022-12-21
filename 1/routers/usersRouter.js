const express = require("express");
const { json } = require("express/lib/response");
const router = express.Router();
const fs = require("fs")

router.get("/", (req, res) => {
    console.log("users router");
    res.send(fs.readFileSync("./routers/users.json", { encoding: "utf-8" }));
});
router.get("/:id", (req, res) => {
    const id = +req.params.id;
    const usersArray = JSON.parse(fs.readFileSync("./routers/users.json", { encoding: "utf-8" }));
    const user = usersArray.find(user => user.id === id);
    res.send(user);
});
router.post("/", (req, res) => {
    const usersArray = JSON.parse(fs.readFileSync("./routers/users.json", { encoding: "utf-8" }));
    fs.writeFileSync("./routers/users.json", JSON.stringify([...usersArray, { id: usersArray[usersArray.length-1].id + 1 || 1, name: req.body.name }]));
    res.send("users added");
});
router.delete("/:id", (req, res) => {
    const id = +req.params.id;
    const usersArray = JSON.parse(fs.readFileSync("./routers/users.json", { encoding: "utf-8" }));
    fs.writeFileSync("./routers/users.json", JSON.stringify(usersArray.filter(user => user.id !== id)))
    res.send("User deleted");
});
// router.delete("/", (req, res) => {  
//     const usersArray = JSON.parse(fs.readFileSync("./routers/users.json", { encoding: "utf-8" }));
//     fs.writeFileSync("./routers/users.json", "")
//     res.send("Users clear");
// });


module.exports = router;