'use client'
import { useDispatch } from "react-redux";
import Button from "../Atoms/Button";
import InputField from "../Atoms/InputField";
import { AppDispatch } from "@/redux/store/store";
import { addMovieList } from "@/redux/slice/movieSlice";

// Movie Title (min 2 chars, max 200 chars)
// Release Year (valid year format)
// Duration (minutes)
// Genre (multiple select, max 5)
// Synopsis (min 50 chars, max 2000 chars)
// Rating (1-10, allow half points)
// Poster Image (max 5MB, JPG/PNG)
let json = {
    adult: undefined,
    backdrop_path: '',
    id: 1,
    original_language: undefined,
    original_title: undefined,
    overview: '',
    popularity: undefined,
    poster_path: '',
    release_date: '',
    title: '',
    video: undefined,
    vote_average: 10,
    vote_count: undefined
}
const FormAdd = () => {
    const dispatch = useDispatch<AppDispatch>()
    const handleSubmit = () =>{
        dispatch(addMovieList({
            movie: json
        }))
    }

  return (    
    <div className="flex justify-center">
        <div className="p-5! w-full h-full max-w-xl space-y-3!">
            <h2 className="text-2xl text-start w-full underline underline-offset-4">
                Add Movie
            </h2>
            <form className="flex flex-col w-full gap-2">                
                <label htmlFor="title">Movie Title</label>
                <InputField
                    type="text"
                    name="title"
                    placeholder="Movie Tile"                       
                    className="px-2! w-full"                    
                />
                <label htmlFor="year">Release Year</label>
                <InputField
                    type="text"
                    name="year"
                    placeholder="Release Year"
                    className="px-2! w-full"
                />
                <label htmlFor="duration">Duration</label>
                <InputField
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    className="px-2! w-full"
                />
                <label htmlFor="actors">Actors</label>
                <InputField
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    className="px-2! w-full"
                />
                <label htmlFor="synopsis">Synopsis</label>
                <InputField
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    className="px-2! w-full"
                />
                <label htmlFor="rating">Rating</label>
                <InputField
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    className="px-2! w-full"
                />
                <label htmlFor="poster">Poster</label>
                <InputField
                    type="file"
                    name="poster"
                    placeholder="Poster"
                    className="px-2! w-full"
                />
                <label htmlFor="poster">Backdrop</label>
                <InputField
                    type="file"
                    name="backdrop"
                    placeholder="Backdrop"
                    className="px-2! w-full"
                />
                <Button type="submit">Add</Button>
            </form>
        </div>
    </div>
  )
};
export default FormAdd;
