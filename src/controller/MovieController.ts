import { Request, Response } from 'express';
import { MovieInputDTO } from '../model/Movie';
import { MovieBusiness } from '../business/MovieBusiness';
import { BaseDatabase } from '../data/BaseDatabase';
import { Authenticator } from '../services/Authenticator';

export class MovieController {
  async createMovie(req: Request, res: Response) {
    try {
      const input: MovieInputDTO = {
        title: req.body.title,
        director: req.body.director,
        available: req.body.available,
      };

      const movieBusiness = new MovieBusiness();
      await movieBusiness.createMovie(input)
      res.sendStatus(201)
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message,
      });
    }
  }

  async getAvailableMovies(req: Request, res: Response) {
    try {
      const authenticator = new Authenticator();
      const token = req.headers.authorization;


      if (!token) {
        return res.status(401).send({ error: 'Unauthorized, check token' });
      }

      const renterId = authenticator.getData(token);

      if (!renterId) {
        return res.status(401).send({ error: 'Unauthorized, check token' });
      }


      const movieBusiness = new MovieBusiness();
      const availableMovies = await movieBusiness.getAvailableMovies()

      res.status(200).send({ movies: availableMovies });
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message,
      });
    }
  }

  async returnMovie(req: Request, res: Response) {
    try {

      const authenticator = new Authenticator();
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).send({ error: 'Unauthorized, check token' });
      }

      const renterId = authenticator.getData(token);

      if (!renterId) {
        return res.status(401).send({ error: 'Unauthorized, check token' });
      }

      const movieId = req.params.id;

      if (!movieId) {
        return res.status(400).send({ error: "Check movie id to return" })
      }

      const movieBusiness = new MovieBusiness();
      const movieAvailability = await movieBusiness.checkAvailability(movieId)

      if (movieAvailability) {
        return res.status(422).send({ error: "Movie is already available" })
      }
      await movieBusiness.returnMovie(movieId)
      res.status(200).send({ sucess: "Movie returned sucessefully" });
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message,
      });
    }
  }

  async rentMovie(req: Request, res: Response) {
    try {
      const authenticator = new Authenticator();
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).send({ error: 'Unauthorized, check token' });
      }

      const renterId = authenticator.getData(token);

      if (!renterId) {
        return res.status(401).send({ error: 'Unauthorized, check token' });
      }

      const movieId = req.params.id;

      if (!movieId) {
        return res.status(400).send({ error: "Check movie id to rent" })
      }

      const movieBusiness = new MovieBusiness();
      const movieAvailability = await movieBusiness.checkAvailability(movieId)

      if (!movieAvailability) {
        return res.status(422).send({ error: "This movie isn't available" })
      }
      await movieBusiness.returnMovie(movieId)
      res.status(200).send({ sucess: "Movie rented sucessefully" });
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message,
      });
    }
  }

  async filterByMovieTitle(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      const authenticator = new Authenticator();

      if (!token) {
        return res.status(401).send({ error: 'Unauthorized, check token' });
      }

      const renterId = authenticator.getData(token);

      if (!renterId) {
        return res.status(401).send({ error: 'Unauthorized, check token' });
      }

      const movieTitle = req.query.title as string;

      const movieBusiness = new MovieBusiness();
      const filteredMovies = await movieBusiness.filterMovieByName(movieTitle)

      res.status(200).send({ movies: filteredMovies });
    } catch (error) {
      res.status(error.customErrorCode || 400).send({
        message: error.message,
      });
    }
  }
}
