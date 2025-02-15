'use client'
import { useDispatch } from 'react-redux'
import Button from '../Atoms/Button'
import InputField from '../Atoms/InputField'
import { AppDispatch } from '@/redux/store/store'
import { addMovieList } from '@/redux/slice/movieSlice'
import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Select from '../Atoms/Select'
import { imageToBase64 } from '@/utils/image'
import { openModal } from '@/redux/slice/modalSlice'

const FormSchema = z.object({
    title: z
        .string()
        .min(2, 'Title must be length more than 2.')
        .max(200, 'Title must be not over 200 characters.'),
    year: z
        .string()
        .min(4, 'Year must be 4 digits.')
        .max(4, 'Year must be 4 digits.')
        .regex(/^\d{4}$/, 'Year must be 4 digits.')
        .transform((val) => Number(val))
        .refine(
            (val) => val >= 1900 && val <= new Date().getFullYear(),
            'Year must be not over current year.',
        ),
    duration: z
        .string()
        .min(1, 'Duration must be 1 or more than.')
        .transform((val) => Number(val))
        .refine((val) => val > 0, 'Duration must be 1 or more than.'),
    actors: z.array(
        z.object({
            id: z.string(),
            name: z.string().min(1, 'Name must be more than 1 characters.'),            
        })
    ).min(1, 'Actors must be more than 1 name.').max(5, 'Actors must be not over 5 name/'),
    synopsis: z
        .string()
        .min(5, 'Synopsis must be length more than 5')
        .max(2000, 'Synopsis must be not over 2000 characters.'),
    rating: z
        .string()
        .min(1, 'Rating must be 1 - 10')
        .max(2, 'Raiting must be 1- 10')
        .transform((val) => Number(val))
        .refine((val) => val >= 1 && val <= 10, 'Raiting must be 1 - 10'),
    poster: z
        .custom<FileList>(
            (files) => files instanceof FileList && files?.length > 0,
            'Please upload poster image.',
        )
        .refine((files: FileList) =>
            Array.from(files).every(
                (file) => file.size <= 5 * 1024 * 1024,
                'Poster must be not over 5 mb.',
            ),
        ),
    backdrop: z
    .custom<FileList>(
        (files) => files instanceof FileList && files?.length > 0,
        'Please upload backdrop image.',
    )
    .refine((files: FileList) =>
        Array.from(files).every(
            (file) => file.size <= 5 * 1024 * 1024,
            'Backdrop must be not over 5 mb.',
        ),
    ),     
})

type FormData = z.infer<typeof FormSchema>

const FormAdd = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {
        register,
        handleSubmit,                
        reset,
        control,
        formState: { errors, isSubmitting },        
    } = useForm<FormData>({
        defaultValues: {
            actors: [{
                id: new Date().getTime().toString(),
                name: '',                
            }]
        },
        resolver: zodResolver(FormSchema),
        mode: 'all',        
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'actors'
      });

    const onSubmit = async (data: FormData) => {                
        const format = {
            id: `ADD-${new Date().getTime()}`,
            adult: false,
            title: data?.title,                
            original_language: '',
            original_title: '',
            overview: data?.synopsis,
            popularity: 0,
            release_date: data?.year.toString(),
            poster_path: await imageToBase64(data?.poster[0]),
            backdrop_path: await imageToBase64(data?.backdrop[0]),
            video: false,
            vote_average: data?.rating,
            vote_count: 0
        }
        try{
            dispatch(addMovieList({
                movie: format
            }))
            dispatch(openModal({
                type: "modal",
                props: {
                    title: "Alert",
                    text: "Added movie successful."
                }
            }))
            reset()
        }catch(error){
            if(error instanceof Error){
                dispatch(openModal({
                    type: "modal",
                    props: {
                        title: "Alert",
                        text: error.message
                    }
                }))
            }
        }
    }

    return (
        <div className="flex justify-center">
            <div className="p-5! w-full h-full max-w-xl space-y-3!">
                <h2 className="text-2xl text-start w-full underline underline-offset-4">
                    Add Movie
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-2">
                    <label htmlFor="title">Movie Title</label>
                    <InputField
                        {...register('title')}
                        type="text"
                        name="title"
                        placeholder="Movie Tile"
                        className={`px-2! w-full ${errors?.title?.message && 'border-rose-700'}`}
                    />
                    {errors?.title && <p>{errors?.title?.message}</p>}
                    <label htmlFor="year">Release Year</label>
                    <InputField
                        {...register('year')}
                        type="text"
                        name="year"
                        placeholder="Release Year"
                        className={`px-2! w-full ${errors?.year?.message && 'border-rose-700'}`}
                    />
                    {errors?.year && <p>{errors?.year?.message}</p>}
                    <label htmlFor="duration">Duration (Minutes)</label>
                    <InputField
                        {...register('duration')}
                        type="text"
                        name="duration"
                        placeholder="Duration"
                        className={`px-2! w-full ${errors?.duration?.message && 'border-rose-700'}`}
                    />
                    {errors?.duration && <p>{errors?.duration?.message}</p>}
                    <label htmlFor="actors">Actors</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex flex-col gap-2">
                            <div className='flex items-center w-full'>
                                <InputField
                                    type="text"                                                        
                                    {...register(`actors.${index}.name`)}
                                    placeholder={`Actor ${index + 1}`}
                                    className={`px-2! w-full ${errors?.actors?.[index]?.message && 'border-rose-700'}`}
                                />
                                {fields.length > 1 && (
                                    <Button                                
                                    onClick={() => remove(index)}
                                    className="text-red-500 btn-ghost p-1! py-0!"
                                    >
                                    ✖
                                </Button>
                                )}
                            </div>
                            {errors?.actors?.[index]?.name && <p>{errors.actors[index]?.name?.message}</p>}
                        </div>
                    ))}
                    <Button onClick={() => fields.length < 5 && append({id: new Date().getTime().toString(), name: ''})} className="btn-neutral text-white px-4 py-2 rounded">
                        + Add Actor
                    </Button>                    
                    <label htmlFor="synopsis">Synopsis</label>
                    <InputField
                        {...register('synopsis')}
                        type="text"
                        name="synopsis"
                        placeholder="Synopsis"
                        className={`px-2! w-full ${errors?.synopsis?.message && 'border-rose-700'}`}
                    />
                    {errors?.synopsis && <p>{errors?.synopsis?.message}</p>}
                    <label htmlFor="rating">Rating</label>
                    <InputField
                        {...register('rating')}
                        type="text"
                        name="rating"
                        placeholder="Raiting"
                        className={`px-2! w-full ${errors?.rating?.message && 'border-rose-700'}`}
                    />
                    {errors?.rating && <p>{errors?.rating?.message}</p>}
                    <label htmlFor="poster">Poster</label>
                    <InputField
                        {...register('poster')}
                        type="file"
                        name="poster"
                        placeholder="Poster"                        
                        className={`file-input! w-full! ${errors?.poster?.message && 'border-rose-700!'}`}
                        accept="image/jpg, image/png, image/jpeg"
                    />
                    {errors?.poster && <p>{errors?.poster?.message}</p>}
                    <label htmlFor="poster">Backdrop</label>
                    <InputField
                        {...register('backdrop')}
                        type="file"
                        name="backdrop"
                        placeholder="Backdrop"                        
                        className={`file-input! w-full! ${errors?.backdrop?.message && 'border-rose-700!'}`}
                        accept="image/jpg, image/png, image/jpeg"
                    />
                    {errors?.backdrop && <p>{errors?.backdrop?.message}</p>}                    
                    <Button className='btn-neutral' type="submit" disabled={isSubmitting ? true : false}>Add</Button>
                </form>
            </div>
        </div>
    )
}
export default FormAdd
