import { TableDetail } from '@/types/ModalMovie'
import { CoreRow, createColumnHelper } from '@tanstack/react-table'
import CustomTable from '../Molecules/CustomTable'
import Button from '../Atoms/Button'
import { UseMovieAll } from '@/hooks/UseMovieAll'
import { useEffect, useState } from 'react'
import { config } from '@/utils/config'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store/store'
import { openModal, updateModal } from '@/redux/slice/modalSlice'
import ModalMovie from '../Molecules/ModalMovie'
import { UseMovieDetails } from '@/hooks/UseMovieDetails'
import { addWatchList, removeWatchList } from '@/redux/slice/movieSlice'
import Select from '../Atoms/Select'
import { yearOptions } from '@/utils/date'
import Range from '../Atoms/Range'
import { UseCompare } from '@/context/CompareContext'
import ModalCompare from '../Molecules/ModalCompare'

const columnHelper = createColumnHelper<TableDetail>()

const TableView = () => {
    const { compare, setCompare } = UseCompare()
    const dispatch = useDispatch<AppDispatch>()
    const { watchList, category } = useSelector((state: RootState) => state.movie)
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [searchValue, setSearchValue] = useState({
        genre: null,
        year: '',
        rating: 0,
    })
    const { mutateAsync } = UseMovieDetails()
    const { data } = UseMovieAll({
        options: {
            ...pagination,
            searchValue: searchValue,
        },
    })
    const [rowCount, setRowCount] = useState(0)
    const [movieData, setMovieData] = useState<TableDetail[]>()

    const genreOptions = category?.map((elm) => {
        return {
            name: elm?.name,
            value: elm?.id,
        }
    })

    const columns = [
        columnHelper.accessor('poster_path', {
            header: (head) => <p className="text-center">Poster</p>,
            cell: (cell) => (
                <img
                    width={200}
                    height={200}
                    style={{
                        width: '100%',
                        height: '100%',
                        maxWidth: '150px',
                        maxHeight: '150px',
                    }}
                    src={`${config?.url?.img + cell?.getValue()}`}
                    alt={cell?.getValue()}
                />
            ),
        }),
        columnHelper.accessor('title', {
            header: (head) => <p className="text-center">Name</p>,
            cell: (cell) => (
                <p
                    className="cursor-pointer text-center"
                    onClick={() => console.log(cell.row.original.id)}
                >
                    {cell?.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor('genre_ids', {
            header: 'Genre',
            cell: (cell) => {
                const findValue = cell
                    ?.getValue()
                    ?.map((id) => {
                        return category.find((cat) => cat.id === id)?.name
                    })
                    .join(' , ')

                return <span>{findValue}</span>
            },
        }),
        columnHelper.accessor('vote_average', {
            header: 'Rating',
            cell: (cell) => <p className="">{cell.getValue().toFixed(2)}</p>,
        }),
        columnHelper.accessor('release_date', {
            header: 'Release Date',
            cell: (cell) => cell.getValue(),
        }),
        columnHelper.accessor('id', {
            header: (head) => <p className="text-center">Action</p>,
            cell: (cell) => {
                const isWatchlisted = watchList.find((item) => item === cell?.getValue()) || false
                const isCompared = compare?.find((item) => item.id === cell?.getValue()) || false
                const isFull = compare?.length === 2
                return (
                    <div className="flex flex-col gap-2 justify-center">
                        <Button
                            className="btn-neutral px-2!"
                            onClick={(event) =>
                                handleWatchlist(
                                    event,
                                    !isWatchlisted ? 'add' : 'remove',
                                    cell?.getValue(),
                                )
                            }
                        >
                            {isWatchlisted ? 'Watchlisted' : '+ Watchlist'}
                        </Button>
                        <Button
                            disabled={isFull && !isCompared}
                            className="btn-neutral px-2!"
                            onClick={(event) => handleCompare(event, cell?.row?.original)}
                        >
                            {!isCompared ? '+ Compare' : 'Selected'}
                        </Button>
                    </div>
                )
            },
        }),
    ]

    const handleCompare = (event: React.ChangeEvent, data: CoreRow<TableDetail>['original']) => {
        event?.stopPropagation()
        const isListed = compare.find((e) => e.id === data?.id)

        if (isListed) {
            const newList = compare.filter((e) => e.id !== data?.id)
            setCompare(newList)
        } else {
            if (compare.length === 0) {
                setCompare([{ id: data?.id }])
                return
            }
            setCompare((prev) => [...prev, { id: data?.id }])
        }
    }

    const getMovie = async (event?: React.FormEvent) => {
        event?.preventDefault()
        if (data) {
            const format: TableDetail[] = []
            data?.results?.map((elm) => {
                format.push({
                    id: elm?.id,
                    title: elm?.title,
                    poster_path: elm?.poster_path,
                    genre_ids: elm?.genre_ids,
                    release_date: elm?.release_date,
                    vote_average: elm?.vote_average,
                })
            })
            setRowCount(Math.ceil(data?.total_pages / 20))
            setMovieData(format)
        }
    }

    const handleRowClick = async (
        event: React.ChangeEvent,
        data: CoreRow<TableDetail>['original'],
    ) => {
        event.stopPropagation()
        dispatch(
            openModal({
                type: 'element',
                props: {
                    element: <ModalMovie data={null} isLoading={true} />,
                },
            }),
        )
        try {
            const movieDetail = await mutateAsync(data?.id)
            dispatch(
                updateModal({
                    props: {
                        element: <ModalMovie data={movieDetail} isLoading={false} />,
                    },
                }),
            )
        } catch (error) {
            console.log(error)
        }
    }

    const handleReset = () => {
        setSearchValue({ genre: null, year: '', rating: 0 })
        setPagination({ pageIndex: 0, pageSize: 10 })
    }

    useEffect(() => {
        getMovie()
    }, [data, pagination.pageIndex, searchValue.genre, searchValue.rating, searchValue.year])

    const handleWatchlist = (
        event: React.ChangeEvent,
        type: 'add' | 'remove',
        movieId: string | number,
    ) => {
        event.stopPropagation()
        if (type === 'add') {
            dispatch(addWatchList({ movieId }))
        } else {
            dispatch(removeWatchList({ movieId }))
        }
    }

    useEffect(() => {
        if (compare?.length === 2) {
            dispatch(
                openModal({
                    type: 'element',
                    props: {
                        element: <ModalCompare compare={compare} />,
                    },
                }),
            )
        }
    }, [compare])

    return (
        <div className="w-full">
            <p onClick={() => console.log(compare)}>asd</p>
            <form onSubmit={getMovie} className="my-2! space-x-2! flex flex-wrap items-center">
                <label htmlFor="category">
                    <span>Genre</span>
                    <Select
                        onChange={(e) =>
                            setSearchValue((prev) => ({ ...prev, genre: e.target.value }))
                        }
                        defaultValue={'Select Genre'}
                        name="category"
                        id="category"
                        placeholder="Select Genre"
                        items={genreOptions}
                    />
                </label>
                <label htmlFor="year">
                    <span>Release</span>
                    <Select
                        onChange={(e) =>
                            setSearchValue((prev) => ({ ...prev, year: e.target.value }))
                        }
                        defaultValue={'Select Release year'}
                        name="year"
                        id="year"
                        placeholder="Select Release year"
                        items={yearOptions()}
                    />
                </label>
                <label htmlFor="rating">
                    <span>Rating ({searchValue.rating})</span>
                    <Range
                        defaultValue={searchValue.rating}
                        onChange={(e) =>
                            setSearchValue((prev) => ({
                                ...prev,
                                rating: parseFloat(e.target.value),
                            }))
                        }
                    />
                </label>
                <Button
                    type="reset"
                    onClick={handleReset}
                    placeholder="Search"
                    className="px-2! btn-neutral"
                >
                    Reset
                </Button>
            </form>

            <div className="w-full overflow-x-auto">
                <CustomTable
                    data={movieData || []}
                    rowCount={rowCount}
                    columns={columns}
                    headClassName="dark:bg-neutral bg-zinc-200 h-10"
                    bodyClassName="p-2!"
                    rowClassName="hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
                    onRowClick={handleRowClick}
                    pagination={pagination}
                    setPagination={setPagination}
                />
            </div>
        </div>
    )
}
export default TableView
