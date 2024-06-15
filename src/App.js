import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
      );
      const data = await res.json();
      if (data && data.products) {
        setProducts(data.products);
        setTotalPages(parseInt(data.total / 10));
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div>
      <h1 className="text-center my-5 font-bold text-3xl">Products</h1>
      {loading ? (
        <div className="flex items-center justify-center h-[88vh]">
        <div className="loader"></div>
        </div>
      ) : (
        <div className="w-11/12 mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {products.length > 0 &&
            products.map((product) => (
              <div
                key={product.id}
                className="p-5 bg-gray-200 flex flex-col justify-center items-center rounded-md"
              >
                <img src={product.thumbnail} className="mb-5" />
                <span className="text-xl font-semibold">{product.title}</span>
              </div>
            ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 bg-red-50 py-5">
          {page > 1 && (
            <span className="cursor-pointer" onClick={() => setPage(page - 1)}>
              ⬅️
            </span>
          )}
          {[...Array(totalPages)].map((_, index) => (
            <span
              className={`cursor-pointer px-3 py-1 ${
                index + 1 === page ? "bg-red-300" : ""
              } hover:bg-red-300 rounded-md`}
              key={index}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </span>
          ))}
          {page < totalPages && (
            <span className="cursor-pointer" onClick={() => setPage(page + 1)}>
              ➡️
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
