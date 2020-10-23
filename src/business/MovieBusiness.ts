import { Movie, MovieInputDTO } from '../model/Movie';
import { MovieDatabase } from '../data/MovieDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { InvalidParameterError } from '../error/InvalidParameterError';
import { NotFoundError } from '../error/NotFoundError';

export class MovieBusiness {
  async createMovie(movie: MovieInputDTO): Promise<Movie> {
    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    if (!movie.title || !movie.director) {
      throw new InvalidParameterError(
        'Missing movie information, check title, director',
      );
    }

    const movieDatabase = new MovieDatabase();
    const newMovie = await movieDatabase.createMovie(
      id,
      movie.title,
      movie.director,
      movie.available,
    );
    return newMovie!;
  }

  async getAvailableMovies(): Promise<Movie[] | Movie | void> {
    const movieDatabase = new MovieDatabase();
    const availableMovies = await movieDatabase.getAvailableMovies()
    return availableMovies;

  }

  async returnMovie(movieId: string): Promise<void> {

    if (!movieId) {
      throw new InvalidParameterError("Check movie id to return")
    }

    const movieDatabase = new MovieDatabase();

    const movieExists = await movieDatabase.getMovieById(movieId)

    if (!movieExists) {
      throw new NotFoundError("Movie not found")
    }

    await movieDatabase.returnMovie(movieId)
  }

  async checkAvailability(movieId: string): Promise<string> {
    if (!movieId) {
      throw new InvalidParameterError("Check movie id")
    }
    const movieDatabase = new MovieDatabase();

    const movieAvailability = movieDatabase.checkAvailability(movieId)

    return movieAvailability
  }

  async filterMovieByName(title: string): Promise<Movie | Movie[]> {
    if (!title) {
      throw new InvalidParameterError("Check movie title")
    }
    const movieDatabase = new MovieDatabase();

    const movieAvailability = await movieDatabase.getMovieByTitle(title)

    if (movieAvailability.length < 1) {
      throw new NotFoundError("Movie not found")
    }

    return movieAvailability
  }
}
