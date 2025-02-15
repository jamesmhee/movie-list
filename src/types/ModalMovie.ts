export interface ModalMovieData {
    actors: Actor[]
    trailer: Trailer | null
    detail: Detail
    similar: Similar
}

export interface Actor {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export interface Trailer {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}

export type DetailShort = Omit<
    Detail,
    | 'belongs_to_collection'
    | 'budget'
    | 'genres'
    | 'homepage'
    | 'imdb_id'
    | 'origin_country'
    | 'production_companies'
    | 'production_countries'
    | 'revenue'
    | 'runtime'
    | 'spoken_languages'
    | 'status'
    | 'tagline'
>

export type AddMovie = DetailShort

export interface Detail {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: BelongsToCollection
    budget: number
    genres: Genre[]
    homepage: string
    id: number | string
    imdb_id: string
    origin_country: string[]
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface BelongsToCollection {
    id: number
    name: string
    poster_path: string
    backdrop_path: any
}

export interface Genre {
    id: number
    name: string
}

export interface ProductionCompany {
    id: number
    logo_path?: string
    name: string
    origin_country: string
}

export interface ProductionCountry {
    iso_3166_1: string
    name: string
}

export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

export interface Similar {
    page: number
    results: Result[]
    total_pages: number
    total_results: number
}

export interface Result {
    adult: boolean
    backdrop_path?: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path?: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}
