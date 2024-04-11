import asyncHandler from "express-async-handler";
import firebase from "../firebase.js";
import Movie from "../models/movieModel.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebase);

export const addMovie = asyncHandler(async (req, res) => {
    try {
        const data = req.body;
        await addDoc(collection(db, "movies"), data);
        res.status(200).send("movie added successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export const getMovies = asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const perPage = parseInt(req.params.perPage);

    try {
        const moviesSnapshot = await getDocs(collection(db, "movies"));

        if (moviesSnapshot.empty) {
            return res.status(404).json({ error: "No movies found" });
        }

        const moviesArray = moviesSnapshot.docs.map((movieDoc) => {
            const data = movieDoc.data();
            return new Movie(
                movieDoc.id,
                data.title,
                data.description,
                data.rating,
                data.release_date,
                data.genre,
                data.actors,
                data.director,
                data.image
            );
        });

        let paginatedMovies = [];

        if (page && perPage) {
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            paginatedMovies = moviesArray.slice(startIndex, endIndex);
        }

        const totalPages = Math.ceil(moviesArray.length / perPage);
        const currentPage = page || 1;
        res.json({
            movies: paginatedMovies,
            pagination: {
                currentPage,
                totalPages,
            },
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export const getMovie = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const movie = doc(db, "movies", id);
        const data = await getDoc(movie);
        if (data.exists()) {
            res.status(200).send(data.data());
        } else {
            res.status(404).send("movie not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export const updateMovie = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const movie = doc(db, "movies", id);
        await updateDoc(movie, data);
        res.status(200).send("movie updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export const deleteMovie = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        await deleteDoc(doc(db, "movies", id));
        res.status(200).send("movie deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});
