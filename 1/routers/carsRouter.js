const express = require("express");
const router = express.Router();
const fs = require("fs")

router.get("/", (req, res) => {
    console.log("cars router");
    res.send(fs.readFileSync("./routers/cars.json", { encoding: "utf-8" }));
});
router.get("/:id", (req, res) => {
    const id = +req.params.id;
    const carsArray = JSON.parse(fs.readFileSync("./routers/cars.json", { encoding: "utf-8" }));
    const car = carsArray.find(car => car.id === id);
    res.send(car);
});
router.post("/", (req, res) => {
    const carsArray = JSON.parse(fs.readFileSync("./routers/cars.json", { encoding: "utf-8" }));

    fs.writeFileSync("./routers/cars.json", JSON.stringify([...carsArray, { id: carsArray[carsArray.length -1].id + 1 || 1, model: req.body.model }]));
    res.send("cars added");
});

router.delete("/:id", (req, res) => {
    const id = +req.params.id;
    const carsArray = JSON.parse(fs.readFileSync("./routers/cars.json", { encoding: "utf-8" }));
    fs.writeFileSync("./routers/cars.json", JSON.stringify(carsArray.filter(user => user.id !== id)))
    res.send("Car deleted");
});

module.exports = router;