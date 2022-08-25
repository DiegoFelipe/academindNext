import fs from "fs/promises";
import path from "path";

export default function ProducDetailsPage(props) {
  const { product } = props;

  if (!product) {
    return <>Loading</>;
  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
    },
  };
}

// This function tells nextjs that this page should be pre-generated 3 time with p1, p3 and p3
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    // fallback: true, // Usefull when have multiple products to be pre-generated
    fallback: false, // when true it needs a fallback, because it will be generated JIT
  };
}
