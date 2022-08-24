import fs from "fs/promises";
import path from "path";

export default function ProducDetailsPage(props) {
  const { loadedProps } = props;
  return (
    <>
      <h1>{loadedProps.title}</h1>
      <p>{loadedProps.description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context; // useQuery is used only client side

  const productId = params.pid;

  const pathFile = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = await fs.readFile(pathFile);
  const data = JSON.parse(jsonData);

  const product = data.products.find((p) => p.id === productId);

  return {
    props: {
      product,
    },
  };
}
