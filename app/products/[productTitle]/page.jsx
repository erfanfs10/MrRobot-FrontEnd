import getProductDetail from "@/services/GetProductDetail";
import ProductDetail from "@/components/product/ProductDetail";
import { Suspense } from "react";
import Loading from "./loading";

const ProductDetailPage = async ({ params }) => {
  const { productTitle } = await params;
  const product = await getProductDetail({
    url: `products/${productTitle}/`,
  });
  return (
    <Suspense fallback={<Loading />}>
      <ProductDetail product={product} />
    </Suspense>
  );
};

export default ProductDetailPage;
