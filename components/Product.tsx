import { getPictureUrl } from '@/../coffeeMenu-shared-logic/lib';
import { apiUrl } from '@/modules/pocketbase';
import Image from 'next/image';

type Props = {
  background: string;
};

const Product = ({ product }: { product: any }) => {
  return (
    <div key={product.id} className={'m-3'}>
      <Image
        className="rounded"
        src={
          product.pictures[0]
            ? getPictureUrl(
                apiUrl,
                product.collectionId,
                product.id,
                product.pictures[0]
              )
            : '/fallbacks/product_fallback.png'
        }
        alt={product.name + ' ' + product.description}
        width={200}
        height={200}
      />
      {product.name} | {product.price}$
    </div>
  );
};

export default Product;
