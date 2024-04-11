import express from "express";

import {
    addMovie,
    getMovie,
    getMovies,
    updateMovie,
    deleteMovie,
} from "../controllers/moviesController.js";

const router = express.Router();

router.get("/all/:page/:perPage", getMovies);
router.post("/new", addMovie);
router.get("/movie/:id", getMovie);
router.put("/update/:id", updateMovie);
router.delete("/delete/:id", deleteMovie);

export default router;
