export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface PaginatedMovies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieFilters {
  page: number;
  genreId?: number;
  sortBy: "popularity.desc" | "vote_average.desc" | "release_date.desc";
  query?: string;
}
