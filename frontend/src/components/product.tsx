import { FlexBetweenRow } from '../styles/main';
import { ProductDiv, ProductHeader, ProductImg, ProductTitle, OriginalPrice, IconButton } from '../styles/product';
import { FaCartArrowDown } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Product() {
  return (
    <ProductDiv>
      <Link to='#'>
        <ProductHeader>
          <ProductTitle>tablet</ProductTitle>
        </ProductHeader>
        <ProductImg src='https://electro.madrasthemes.com/wp-content/uploads/2016/03/apptablet-300x300.png' alt='There is a problem showing your photos' />
        <FlexBetweenRow>
          <span>$1000</span>
          <small><OriginalPrice>$1200</OriginalPrice></small>
        </FlexBetweenRow>
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
