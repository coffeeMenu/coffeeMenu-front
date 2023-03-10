import Product from '@/components/Product';
import { groupByCategory } from '@/modules/category';
import { errorHandler } from '@/modules/errorHandler';
import { apiUrl, pb } from '@/modules/pocketbase';
import { getPictureUrl } from 'coffeemenu-shard-logic';
import Image from 'next/image';

// TODO dynamic favicon => logo of store
// TODO SEO

export async function getServerSideProps(context: any) {
  const { username } = context.params;
  const resStore = await pb
    .collection('stores')
    .getFirstListItem(`username="${username}"`)
    .catch((err: any) => {
      errorHandler(err, `[username], getServerSideProps`);
    });

  if (resStore === undefined) {
    return {
      notFound: true,
    };
  }

  const { id } = resStore;
  const records = await pb
    .collection('products')
    .getFullList(200 /* batch size */, {
      filter: `store="${id}"`,
      sort: '-created',
    })
    .catch((err: any) => {
      errorHandler(err, `[username], getServerSideProps`);
    });

  const groupedRecords = await groupByCategory(records);

  return {
    props: {
      store: JSON.stringify(resStore),
      groupedRecords: JSON.stringify(groupedRecords),
    },
  };
}

type Props = {
  store: any;
  groupedRecords: any;
};

export default function Username(props: Props) {
  const store = JSON.parse(props.store);
  const groupedRecords = JSON.parse(props.groupedRecords);
  const groups = Object.keys(groupedRecords);

  console.log(groupedRecords);

  // TODO group by category

  return (
    <div>
      {/* if not exist 404 */}
      {store.name}
      <br />
      <br />
      <br />
      {groups.map((group: any) => {
        return (
          <div key={group}>
            <h2 className="p-2 text-2xl">{group}</h2>
            <hr />
            <div
              id={'productGroup-' + group}
              className="flex overflow-hidden flex-wrap justify-center"
            >
              {groupedRecords[group].map((product: any) => {
                return (
                  <>
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                    <Product key={product.id} product={product} />
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
