import path from "path";
import fs from "fs/promises";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const pathFile = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = await fs.readFile(pathFile);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // 10 seconds it's ISG
  };
}

export default HomePage;
