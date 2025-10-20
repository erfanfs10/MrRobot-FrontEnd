import getData from "@/services/GetData";
import Products from "@/components/product/Products";

const CategoryProductsPage = async ({ params }) => {
  const { categoryTitle } = await params;
  const products = await getData({ url: `products/category/${categoryTitle}/` });

  return <Products products={products} />;
};

export default CategoryProductsPage;
