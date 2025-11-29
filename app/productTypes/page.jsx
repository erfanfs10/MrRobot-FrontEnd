import getData from '@/services/GetData'
import ProductTypes from '@/components/ProductTypes'

const ProductTypesPage = async () => {
    const productTypes = await getData({url: "product-types/"})
    return (
        <ProductTypes items={productTypes} />
    )
}

export default ProductTypesPage