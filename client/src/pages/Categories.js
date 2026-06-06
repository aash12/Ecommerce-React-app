import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <h4>All Categories</h4>
      <div className="container">
        <div className="row">
          {categories?.map((c) => (
            <div className="col-md-6 my-3" key={c._id}>
              <Link
                to={`/category/${c.slug}`}
                className="btn btn-primary text-white"
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
