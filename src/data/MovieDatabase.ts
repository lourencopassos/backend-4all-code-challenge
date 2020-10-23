import { BaseDatabase } from "./BaseDatabase";
import { Movie } from "../model/Movie";

export class MovieDatabase extends BaseDatabase {

  private static TABLE_NAME = "Movies";

  public async createMovie(
    id: string,
    title: string,
    director: string,
    available: boolean,
  ): Promise<Movie | undefined> {
    try {
      const movie = await this.getConnection()
        .insert({
          id,
          title,
          director,
          available,
        })
        .into(MovieDatabase.TABLE_NAME);
      return Movie.toMovieModel(movie[0])
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getMovieByTitle(title: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(MovieDatabase.TABLE_NAME)
      .where({ title });

    const mappedMovies = result.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      director: movie.director,
      available: movie.available
    }))

    return mappedMovies
  }

  public async getMovieById(id: string): Promise<Movie | Movie[]> {
    const result = await this.getConnection()
      .select("*")
      .from(MovieDatabase.TABLE_NAME)
      .where({ id });

    return Movie.toMovieModel(result[0]);
  }

  public async getAvailableMovies(): Promise<any> {

    try {
      const movies = await this.getConnection()
        .select("*")
        .from(MovieDatabase.TABLE_NAME)
        .where({ available: true })

      const mappedMovies = movies.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        director: movie.director,
        available: movie.available
      }))

      return mappedMovies
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async rentMovie(id: string): Promise<void> {

    try {
      await this.getConnection()
        .update({ available: false })
        .where({ id })
        .from(MovieDatabase.TABLE_NAME)

    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async returnMovie(id: string): Promise<void> {

    try {
      await this.getConnection()
        .where({ id })
        .update({ available: true })
        .from(MovieDatabase.TABLE_NAME)

    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async checkAvailability(id: string): Promise<any> {

    try {
      const available = await this.getConnection()
        .where({ id })
        .select("available")
        .from(MovieDatabase.TABLE_NAME)
      return available[0].available
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

}
