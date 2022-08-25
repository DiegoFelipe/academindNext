import { useEffect, useState } from "react";
import useSWR from "swr";

// https://nextjs-course-77e23-default-rtdb.firebaseio.com/
export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  //   const [loading, setLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-course-77e23-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          value: data[key].value,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  // useEffect(() => {
  //   setLoading(true);
  //   (async function getData() {
  //     const resp = await fetch(
  //       "https://nextjs-course-77e23-default-rtdb.firebaseio.com/sales.json"
  //     );
  //     const data = await resp.json();
  //     const transformedSales = [];

  //     for (const key in data) {
  //       transformedSales.push({
  //         id: key,
  //         username: data[key].username,
  //         value: data[key].value,
  //       });
  //     }
  //     setSales(transformedSales);
  //     setLoading(false);
  //   })();
  // }, []);

  if (error) {
    return <div>Error</div>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.value}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const responde = await fetch(
    "https://nextjs-course-77e23-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await responde.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      value: data[key].value,
    });
  }
  return { props: { sales: transformedSales } };
}
