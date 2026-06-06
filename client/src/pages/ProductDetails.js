import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    // console.log(pid, cid);
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {}
  };
  useEffect(() => {
    if (params?.slug) getAllProducts();
  }, [params?.slug]);
  return (
    <Layout>
      <div className="container row">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={"300px"}
            width={"200px"}
          />
        </div>
        <div className="col-md-6">
          <h2 className="text-center">Products Details</h2>
          <h4>Name: {product.name}</h4>
          <h4>Description: {product.description}</h4>
          <h4>Price: {product.price}</h4>
          <h4>Category: {product?.category?.name}</h4>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h5>Similar Products</h5>
        {!relatedProducts.length && (
          <p className="text-center">No related Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.category.name}</p>
                <p className="card-text">{p.description.substring(0, 30)}</p>
                <p className="card-text">$ {p.price}</p>
                <button className="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
