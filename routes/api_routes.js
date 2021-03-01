const router = require("express").Router();
const db = require("../models")

router.get("/api/workouts", (req, res) => {
    db.Workout.find().then(data => { res.json(data) })
        .catch(error => {
            res.json(error);
        })
});

router.post("/api/workouts", (req, res) => {
    let day = Date.now()
    db.Workout.create({day : day}).then(data => { res.json(data) })
        .catch(error => {
            res.json(error);
        })
});

router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate({_id: req.params.id}, 
        {$push:{ exercises: req.body}},
        {new : true})
        .then(data => { 
            let totalDuration = 0;
            let arr = JSON.parse(JSON.stringify(data)).exercises
            
            for(let i = 0; i < arr.length; i++) {
                totalDuration += arr[i].duration;
            }
            
            db.Workout.findOneAndUpdate({_id: req.params.id},{totalDuration: totalDuration}).then(info => { res.json(info) })
            .catch(error => {
                res.json(error);
            })
        
        })
        .catch(error => {
            res.json(error);
        })
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).limit(7).then(data => { res.json(data) })
        .catch(error => {
            res.json(error);
        })
});

module.exports = router;
