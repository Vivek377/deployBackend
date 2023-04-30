const express = require("express");
const jwt = require("jsonwebtoken");
const NoteModel = require("../models/notes.model");
const notesRoute = express.Router();

notesRoute.get("/", async (req, res) => {
    const { token } = req.headers.authorization;
    const decoded = jwt.verify(token, "secret");
    try {
        if (decoded) {
            const notes = NoteModel.find({ "userId": decoded.userId });
            res.status(200).send(notes);
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

notesRoute.post("/add", async (req, res) => {
    try {
        const note = new NoteModel(req.body);
        await note.save();
        res.status(200).send({ msg: "note saved" })
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

notesRoute.patch("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        await NoteModel.findByIdAndUpdate({ _id: id }, payload)
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

notesRoute.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await NoteModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "note deleted" });
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

module.exports = notesRoute;
