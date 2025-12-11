import getProductDetail from "@/services/GetProductDetail";
import ProductDetail from "@/components/product/ProductDetail";

const ProductDetailPage = async ({ params }) => {
  const { productTitle } = await params;
  const product = await getProductDetail({
    url: `products/${productTitle}/`,
  });
  return (
    <ProductDetail product={product} />
  );
};

export default ProductDetailPage;
