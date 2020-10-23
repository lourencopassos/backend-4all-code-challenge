import { BaseDatabase } from "./BaseDatabase";
import { Movie } from "../model/Movie";

export class MovieDatabase extends BaseDatabase {

  private static TABLE_NAME = "Movies";

  public async createMovie(
    id: string,
    title: string,
    director: string,
    available: boolean,
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          title,
          director,
          available,
        })
        .into(MovieDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getMovieByTitle(title: string): Promise<Movie | Movie[]> {
    const result = await this.getConnection()
      .select("*")
      .from(MovieDatabase.TABLE_NAME)
      .where({ title });

    return Movie.toMovieModel(result[0]);
  }

  public async getAvailableMovies(): Promise<Movie[] | Movie | void> {

    try {
    const movies = await this.getConnection()
    .select("*")
    .from(MovieDatabase.TABLE_NAME)
    .where({available: true})

    return movies[0].map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      director: movie.director,
      available: movie.available
    }))
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }    
  }

  public async rentMovie(movieId: string): Promise<void> {

    try {
      await this.getConnection()
      .update({available: false})
      .where({movieId})
      
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

    public async returnMovie(movieId: string): Promise<void> {

    try {
      await this.getConnection()
      .update({available: true})
      .where({movieId})
      
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

}
