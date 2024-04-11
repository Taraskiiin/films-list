class Movie {
    constructor(
        id,
        title,
        description,
        rating,
        release_date,
        genre,
        actors,
        director,
        image
    ) {
        (this.id = id),
            (this.title = title),
            (this.description = description),
            (this.rating = rating),
            (this.release_date = release_date),
            (this.genre = genre),
            (this.actors = actors),
            (this.director = director),
            (this.image = image);
    }
}

export default Movie;
