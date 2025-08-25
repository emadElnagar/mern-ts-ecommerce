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
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../features/CartFeatures";

type productProps = {
  _id: Key;
  name: string;
  slug: string;
  image: string;
  price: number;
  discount: number;
};

function Product(product: productProps) {
  const dispatch = useDispatch();
  // Add to cart
  const hanldeAddToCart = () => {
    dispatch(addToCart({ _id: product._id, quantity: 1 }));
  };
  // Add to wishlist
  const handleAddWishList = () => {
    dispatch(addToWishlist({ _id: product._id }));
  };
  const realPrice = product.price - product.discount;
  return (
    <ProductDiv>
      <Link to={`/products/${product.slug}`}>
        <ProductHeader>
          <ProductTitle>{product.name}</ProductTitle>
        </ProductHeader>
        <ProductImg
          src={`${process.env.REACT_APP_URL}/${product.image}`}
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
      </Link>
      <FlexBetweenRow>
        <IconButton onClick={() => hanldeAddToCart()}>
          <FaCartArrowDown /> add to cart
        </IconButton>
        <IconButton onClick={() => handleAddWishList()}>
          <AiOutlineHeart /> wishlist
        </IconButton>
      </FlexBetweenRow>
    </ProductDiv>
  );
}

export default Product;
