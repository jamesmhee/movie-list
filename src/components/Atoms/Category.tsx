import { RootState } from '@/redux/store/store'
import { useSelector } from 'react-redux'
import Select from './Select'
import { useRouter } from 'next/navigation'
import { useView } from '@/context/ViewContext'

interface Props {}
const Category = (props: Props) => {
    const router = useRouter()
    const { view } = useView()
    const { category } = useSelector((state: RootState) => state.movie)
    const selectCategoryItems = category?.map((elm) => {
        return {
            name: elm.name,
            value: elm.name,
        }
    })

    const handleSelect = (e: React.ChangeEvent) => {
        const target = e?.currentTarget as HTMLSelectElement
        router?.replace(`/?category=${target?.value}`)
    }

    return (
        <div className="flex gap-3 py-3! items-center">
            <b className="whitespace-nowrap">Category :</b>
            <div className="w-full flex-auto gap-1 flex-col md:flex-row flex-wrap flex">
                <Select
                    className="px-3!"
                    onChange={(e) => handleSelect(e)}
                    placeholder="Select Category"
                    items={selectCategoryItems}
                />
            </div>
        </div>
    )
}
export default Category
