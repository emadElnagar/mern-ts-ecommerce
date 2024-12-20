import { FlexBetweenRow } from "../styles/main";
import {
  ProductDiv,
  ProductHeader,
  ProductImg,
  ProductTitle,
  OriginalPrice,
  IconButton,
} from "../styles/product";
import { FaCartArrowDown } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Key } from "react";

type productProps = {
  _id: Key;
  name: string;
  image: string;
  price: number;
  discount: number;
};

function Product(product: productProps) {
  const realPrice = product.price - product.discount;
  return (
    <ProductDiv>
      <Link to="#">
        <ProductHeader>
          <ProductTitle>{product.name}</ProductTitle>
        </ProductHeader>
        <ProductImg
          src={`http://localhost:5000/${product.image}`}
          alt="There is a problem showing your photos"
        />
        {product.discount ? (
          <FlexBetweenRow>
            <span>{realPrice}$</span>
            <small>
              <OriginalPrice>{product.price}$</OriginalPrice>
            </small>
          </FlexBetweenRow>
        ) : (
          <FlexBetweenRow>
            <span>{product.price}$</span>
          </FlexBetweenRow>
        )}

        <FlexBetweenRow>
          <IconButton>
            <FaCartArrowDown /> add to cart
          </IconButton>
          <IconButton>
            <AiOutlineHeart /> wishlist
          </IconButton>
        </FlexBetweenRow>
      </Link>
    </ProductDiv>
  );
}

export default Product;
