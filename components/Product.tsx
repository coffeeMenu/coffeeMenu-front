import { getPictureUrl } from '@/../coffeeMenu-shared-logic/lib';
import { apiUrl } from '@/modules/pocketbase';
import Image from 'next/image';

type Props = {
  background: string;
};

const Product = ({ product }: { product: any }) => {
  return (
    <div key={product.id} className={'relative m-2'}>
      <div className="rounded-xl productInnerShadow">
        <Image
          className="rounded-xl"
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
      </div>
      <div className="absolute bottom-2 left-16 text-lg text-center text-white">
        {product.name}
        <br />

        <span className="flex text-sm">
          <span>{product.price}</span>
          <span className="mr-1">هزار تومان</span>
        </span>
      </div>
    </div>
  );
};

export default Product;
