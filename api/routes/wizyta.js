const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Wizyta = require("../models/wizyta");
const checkAuth = require("../middleware/check-auth")

router.get("/", (req,res,next)=>{
    Wizyta.find().exec()
    .then(docs=> {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({error: err}));
});

router.post("/", (req,res,next)=>{
    const wizyta = new Wizyta({
        _id: new mongoose.Types.WizytaId(),
        PESEL: req.body.PESEL,
        Date: req.body.Date,
        Type_of_Appointment: req.body.Type_of_Appointment
    });
    wizyta.save()
    .then(result => {
        res.status(200).json({
            message: "Dodano nową wizytę",
            createdProduct: wizyta
        });
    })
    .catch(err => res.status(500).json({error: err})); 
});

router.get("/:id_wizyta", checkAuth, (req,res,next) =>{
    const id = req.params.id_wizyta;
    Wizyta.findById(id).exec()
    .then(doc => {
        res.status(200).json(doc);
    }).catch(err => res.status(500).json({error: err}));
});
router.delete("/:id_wizyta", checkAuth, (req,res,next) =>{
    const id = req.params.id_wizyta;
    Wizyta.remove({_id: id}).exec()
    .then(result=> {
        res.status(200).json({message: "usunięcie wizyty o nr "+id});
    })
    .catch(err => res.status(500).json({error: err}));
    
});
module.exports = router;
