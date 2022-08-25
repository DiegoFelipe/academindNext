import { useEffect, useState } from "react";

// https://nextjs-course-77e23-default-rtdb.firebaseio.com/
export default function LastSalesPage() {
  const [sales, setSales] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async function getData() {
      const resp = await fetch(
        "https://nextjs-course-77e23-default-rtdb.firebaseio.com/sales.json"
      );
      const data = await resp.json();
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          value: data[key].value,
        });
      }
      setSales(transformedSales);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!sales) {
    return <p>No data yet</p>;
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
