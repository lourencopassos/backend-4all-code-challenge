export class Movie {
  constructor(
    private id: string,

    private title: string,

    private director: string,

    private available: boolean,
  ) {}

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getDirector() {
    return this.director;
  }

  getAvailable() {
    return this.available;
  }

  setId(id: string) {
    this.id = id;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDirector(director: string) {
    this.director = director;
  }

  setAvailable(available: boolean) {
    this.available = available;
  }

  static toMovieModel(movie: any): Movie {
    return new Movie(movie.id, movie.title, movie.director, movie.available);
  }
}

export interface MovieInputDTO {
  available: boolean;

  title: string;

  director: string;
}
