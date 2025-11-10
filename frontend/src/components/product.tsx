import { FlexBetweenRow } from "../styles/main";
import {
  ProductCard,
  ProductImg,
  ProductName,
  CardButton,
  Price,
  OldPrice,
  Badge,
} from "../styles/product";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { Link } from "react-router-dom";
import { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWishlist,
  getWithlist,
} from "../features/CartFeatures";
import { API_URL } from "../API";
import { danger } from "../styles/variables";

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
  const { wishlist } = useSelector((state: any) => state.cart);
  // Add to cart
  const hanldeAddToCart = () => {
    dispatch(addToCart({ _id: product._id, quantity: 1 }));
  };
  // Add to wishlist
  const handleAddWishList = () => {
    dispatch(addToWishlist({ _id: product._id }));
  };
  const realPrice = product.price - product.discount;
  const discountPercentage = (product.discount / product.price) * 100;
  // Get wishlist items
  useEffect(() => {
    dispatch(getWithlist());
  }, [dispatch]);
  return (
    <ProductCard>
      <Link to={`/products/${product.slug}`}>
        {product.discount && (
          <Badge className="discount">-{discountPercentage.toFixed(0)}%</Badge>
        )}
        <ProductImg
          src={`${API_URL}/${product.image}`}
          alt="There is a problem showing your photos"
        />
        <ProductName>{product.name}</ProductName>
        {product.discount ? (
          <FlexBetweenRow>
            <Price>{realPrice}$</Price>
            <OldPrice>{product.price}$</OldPrice>
          </FlexBetweenRow>
        ) : (
          <FlexBetweenRow>
            <Price>{product.price}$</Price>
          </FlexBetweenRow>
        )}
      </Link>
      <FlexBetweenRow>
        <CardButton className="cart-btn" onClick={() => hanldeAddToCart()}>
          <FaShoppingCart /> add to cart
        </CardButton>
        <CardButton className="wish-btn" onClick={() => handleAddWishList()}>
          <IoMdHeart
            style={
              wishlist.find(
                (item: { _id: Key }) => item._id === product._id
              ) && { color: danger }
            }
          />
        </CardButton>
      </FlexBetweenRow>
    </ProductCard>
  );
}

export default Product;
