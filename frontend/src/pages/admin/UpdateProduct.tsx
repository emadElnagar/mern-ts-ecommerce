import {
  Fragment,
  useEffect,
  Key,
  useState,
  SetStateAction,
  ChangeEvent,
} from "react";
import { Helmet } from "react-helmet";
import { Button, HeaderCenter, Main, Section } from "../../styles/main";
import { Content } from "../../styles/admin";
import SideNav from "../../components/SideNav";
import {
  CloseButton,
  Field,
  ImageContainer,
  ImagePreview,
  ImgPreview,
  Input,
  Select,
  Textarea,
} from "../../styles/form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetSingleProduct,
  resetProductState,
  UpdateProduct,
} from "../../features/ProductFeatures";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import Swal from "sweetalert2";
import { IoCloseOutline } from "react-icons/io5";

const UpdatePage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: any) => state.category);
  const { slug } = useParams();
  const { error, loading, product } = useSelector(
    (state: any) => state.product
  );
  useEffect(() => {
    dispatch(GetSingleProduct(slug));
  }, [dispatch, slug]);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [countInStock, setCountInStock] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);
  useEffect(() => {
    if (product !== null) {
      setName(product.name);
      setDescription(product.description);
      setBrand(product.brand);
      setPrice(product.price);
      setDiscount(product.discount);
      setCountInStock(product.countInStock);
      if (
        product.category &&
        typeof product.category === "object" &&
        product.category._id
      ) {
        setCategory(product.category._id);
      } else {
        setCategory(product.category);
      }

      setImages([product.images]);
    }
  }, [product]);

  // Change price
  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : null;
    setPrice(value);
  };
  // Change discount
  const onDiscountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : null;
    setDiscount(value);
  };
  // Change count in stock
  const onCountInStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : null;
    setCountInStock(value);
  };
  // Handle images
  const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const files = target.files;
    if (files) {
      const fileArray = Array.from(files); // Convert FileList to array
      setImages((prev) => [...prev, ...fileArray]); // Properly update state
    }
  };
  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetProductState());
    const formData = new FormData();
    if (typeof images === "undefined") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select images",
      });
      return;
    }
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      return;
    }
    images.forEach((item) => {
      if (item instanceof File) {
        formData.append("imgnames", item.name);
        formData.append("images", item);
      }
    });
    formData.append("name", name);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("price", price!.toString());
    formData.append("countInStock", countInStock!.toString());
    formData.append("category", category.toString());
    discount !== null &&
      discount !== undefined &&
      discount > 0 &&
      formData.append("discount", discount!.toString());
    dispatch(UpdateProduct({ data: formData, slug }))
      .unwrap()
      .then(() => {
        setImages([]);
        navigate("/");
      });
  };
  return (
    <Fragment>
      <Helmet>
        <title>update product</title>
      </Helmet>
      <Main>
        <SideNav />
        <Content>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorBox message={error.message} />
          ) : (
            product && (
              <Section>
                <HeaderCenter>update product</HeaderCenter>
                <form
                  method="POST"
                  className="product-form"
                  encType="multipart/form-data"
                  acceptCharset="*/images"
                  onSubmit={handleSubmit}
                >
                  <Field>
                    <Input
                      type="text"
                      id="name"
                      defaultValue={product.name}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setName(e.target.value)}
                    />
                    <label htmlFor="name">name</label>
                  </Field>
                  <Field>
                    <Textarea
                      id="description"
                      defaultValue={product.description}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setDescription(e.target.value)}
                    ></Textarea>
                    <label htmlFor="description">description</label>
                  </Field>
                  <Field>
                    <Input
                      type="text"
                      id="brand"
                      defaultValue={product.brand}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setBrand(e.target.value)}
                    />
                    <label htmlFor="brand">brand</label>
                  </Field>
                  <Field>
                    <Input
                      type="number"
                      min="0"
                      id="price"
                      defaultValue={product.price}
                      onChange={onPriceChange}
                    />
                    <label htmlFor="price">price</label>
                  </Field>
                  <Field>
                    <Input
                      type="number"
                      min="0"
                      id="discount"
                      defaultValue={product.discount}
                      onChange={onDiscountChange}
                    />
                    <label htmlFor="discount">discount</label>
                  </Field>
                  <Field>
                    <Input
                      type="number"
                      min="0"
                      id="countinstock"
                      defaultValue={product.countInStock}
                      onChange={onCountInStockChange}
                    />
                    <label htmlFor="countinstock">count in stock</label>
                  </Field>
                  <Field>
                    <Select
                      name="category"
                      id="category"
                      value={category}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setCategory(e.target.value)
                      }
                    >
                      {categories.map((cat: { title: string; _id: Key }) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.title}
                        </option>
                      ))}
                    </Select>
                    <label htmlFor="category">category</label>
                  </Field>
                  <Field>
                    <Input
                      onChange={onImagesChange}
                      type="file"
                      id="images"
                      name="images"
                      accept="image/*"
                      multiple
                    />
                    <label htmlFor="images">images</label>
                  </Field>
                  {images.length > 0 && (
                    <ImagePreview>
                      {images.map((image, index) => {
                        if (!(image instanceof Blob)) {
                          return null;
                        }
                        return (
                          <ImageContainer key={index}>
                            <ImgPreview
                              src={URL.createObjectURL(image)}
                              alt="problem showing image"
                              className="img-preview"
                            />
                            <CloseButton
                              type="button"
                              className="btn-close"
                              onClick={() => {
                                setImages((prevImages) =>
                                  prevImages.filter(
                                    (_img, imgIndex) => imgIndex !== index
                                  )
                                );
                              }}
                            >
                              <IoCloseOutline />
                            </CloseButton>
                          </ImageContainer>
                        );
                      })}
                    </ImagePreview>
                  )}
                  <Button type="submit">submit</Button>
                </form>
              </Section>
            )
          )}
        </Content>
      </Main>
    </Fragment>
  );
};

export default UpdatePage;
