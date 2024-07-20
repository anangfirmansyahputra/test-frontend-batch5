import React from "react";
import styled from "styled-components";
import { formatPrice } from "../../helpers/helpers";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProductsContext } from "context/product_context";

const Product = ({ image, name, price, id }) => {
  const { getProductById } = useProductsContext();
  return (
    <Wrapper>
      <div className="container">
        <img src={image} alt={name} className="h-80" />
        <Link
          to={`/detail-product/${id}`}
          className="link"
          onClick={() => getProductById(id)}
        >
          <FaSearch />
        </Link>
      </div>
      <footer>
        <h5>{name}</h5>
        <p>{formatPrice(price)}</p>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
    overflow: hidden; /* Hide overflowing content */
  }

  img {
    width: 100%;
    object-fit: cover; /* Maintain aspect ratio while covering the container */
    display: block;
    border-radius: var(--radius);
    transition: var(--transition);
  }

  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }

  .container:hover img {
    opacity: 0.5;
  }

  .container:hover .link {
    opacity: 1;
  }

  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
`;

export default Product;
