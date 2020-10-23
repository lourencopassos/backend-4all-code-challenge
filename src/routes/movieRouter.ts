import express from "express";
import { MovieController } from "../controller/MovieController";


export const movieRouter = express.Router();

const movieController = new MovieController();

movieRouter.post("/create", movieController.createMovie);
movieRouter.get("/available", movieController.getAvailableMovies);
movieRouter.get("/filter", movieController.filterByMovieTitle);
movieRouter.put("/return/:id", movieController.returnMovie);
movieRouter.put("/rent/:id", movieController.rentMovie);