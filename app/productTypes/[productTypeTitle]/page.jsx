import getData from "@/services/GetData";
import Products from "@/components/product/Products";

const ProductTypeProductsPage = async ({ params }) => {
  const { productTypeTitle } = await params;
  const products = await getData({ url: `products/product-type/${productTypeTitle}/` });
  const productFilters = await getData({ url: `filters/${productTypeTitle}/` });
  return <Products products={products} productFilters={productFilters} productTypeTitle={productTypeTitle}/>;
};

export default ProductTypeProductsPage;
