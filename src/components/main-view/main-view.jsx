import React from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: "The Godfather",
          Description:
            "The Godfather follows Vito Corleone Don of the Corleone family as he passes the mantel to his son Michael",
          Genre: {
            Name: "Crime",
            Description:
              "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection. Stylistically, the genre may overlap and combine with many other genres, such as drama or gangster film, but also include comedy, and, in turn, is divided into many sub-genres, such as mystery, suspense or noir. Crime films are often based on real events or are adaptations of plays or novels, or a remake or adoption of a previous film. Some plots are original and entirely fictional. For example, the 1957 film version of Witness for the Prosecution is an adaptation of a 1953 stage play of that name, which is in turn based on Agatha Christie's short story, originally published in 1933. The film version was remade in 1982, and there have been other adaptations. However, each of these media has its own advantages and limitations, which in the case of cinema is the time constraint.",
          },
          Director: {
            Name: "Francis Ford Coppola",
            Bio: "Francis Ford Coppola was born in 1939 in Detroit",
            Birth: "1939-04-07",
            Death: "--",
          },
          ImagePath: new URL(
            "../../img/theGodfather.jpg?as=webp&width=250",
            import.meta.url
          ),
          Featured: true,
        },
        {
          _id: 2,
          Title: "The Shawshank Redemption",
          Description:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          Genre: {
            Name: "Drama",
            Description:
              "In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, such as soap opera (operatic drama), police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy). These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods. All forms of cinema or television that involve fictional stories are forms of drama in the broader sense if their storytelling is achieved by means of actors who represent (mimesis) characters. In this broader sense, drama is a mode distinct from novels, short stories, and narrative poetry or songs. In the modern era before the birth of cinema or television, 'drama' within theatre was a type of play that was neither a comedy nor a tragedy. It is this narrower sense that the film and television industries, along with film studies, adopted. 'Radio drama' has been used in both senses—originally transmitted in a live performance, it has also been used to describe the more high-brow and serious end of the dramatic output of radio.",
          },
          Director: {
            Name: "Frank Darabont",
            Bio: "Frank Darabont was born in a refugee camp in 1959 in Montbeliard",
            Birth: "1959-01-28",
            Death: "--",
          },
          ImagePath: new URL(
            "../../img/TheShawshankRedemption.jpg?as=webp&width=250",
            import.meta.url
          ),
          Featured: true,
        },
        {
          _id: 3,
          Title: "Schindler's List",
          Description:
            "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
          Genre: {
            Name: "Biography",
            Description:
              "A biographical film, or biopic (/ˈbaɪoʊpɪk/; abbreviation for biographical motion picture), is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character's real name is used. They differ from docudrama films and historical drama films in that they attempt to comprehensively tell a single person's life story or at least the most historically important years of their lives.",
          },
          Director: {
            Name: "Steven Spielberg",
            Bio: "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world.",
            Birth: "1946-12-18",
            Death: "--",
          },
          ImagePath: new URL(
            "../../img/SchindlersList.jpg?as=webp&width=250",
            import.meta.url
          ),
          Featured: true,
        },
      ],
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
