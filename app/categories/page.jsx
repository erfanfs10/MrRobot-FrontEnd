import getData from '@/services/GetData'
import Categories from '@/components/Categories'

const CategoriesPage = async () => {
    const categories = await getData({url: "categories/"})
    return (
        <Categories items={categories} />
    )
}

export default CategoriesPage