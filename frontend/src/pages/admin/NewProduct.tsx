import {
  ChangeEvent,
  Fragment,
  Key,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Helmet } from "react-helmet";
import { Button, HeaderCenter, Main, Section } from "../../styles/main";
import SideNav from "../../components/SideNav";
import { Content } from "../../styles/admin";
import {
  CloseButton,
  CloseButtonCenter,
  FeatureContainer,
  Field,
  ImageContainer,
  ImagePreview,
  ImgPreview,
  Input,
  Select,
  SpecialField,
  Textarea,
} from "../../styles/form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { NewProduct, resetProductState } from "../../features/ProductFeatures";
import { GetAllCategories } from "../../features/CategoryFeatures";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

const NewProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state: any) => state.category);
  const { error } = useSelector((state: any) => state.product);
  const { user } = useSelector((state: any) => state.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [feature, setFeature] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [countInStock, setCountInStock] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);
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
  // Handle add feature
  const handleAddFeature = () => {
    if (feature.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a feature",
      });
      return;
    }
    setFeatures((prevFeatures) => [...prevFeatures, feature.trim()]);
    setFeature("");
  };
  // Handle images
  const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const files = target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        images.push(files[i]);
      }
    }
  };
  // Handle form submit
  const handleSbmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        text: error,
      });
      return;
    }
    images.forEach(function (item, index, arr) {
      arr[index] = item;
      formData.append(`imgnames`, item.name);
      formData.append(`images`, item);
    });
    features.forEach((feature: string) => {
      formData.append("features", feature);
    });
    formData.append("name", name);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("price", price!.toString());
    formData.append("countInStock", countInStock!.toString());
    formData.append("category", category);
    formData.append("seller", user._id);
    discount !== null && formData.append("discount", discount!.toString());
    dispatch(NewProduct(formData))
      .unwrap()
      .then(() => {
        setImages([]);
        navigate("/admin");
      });
  };
  useEffect(() => {
    // Get all categories
    dispatch(GetAllCategories());
  }, [dispatch]);
  useEffect(() => {
    if (categories && categories.length > 0 && category === "") {
      setCategory(categories[0]._id);
    }
  }, [categories, category]);
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-admin</title>
      </Helmet>
      <Content>
        <Section>
          <HeaderCenter>add new product</HeaderCenter>
          <form
            method="POST"
            onSubmit={handleSbmit}
            className="product-form"
            encType="multipart/form-data"
            acceptCharset="*/images"
          >
            <Field>
              <Input
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setName(e.target.value)
                }
                type="text"
                id="name"
              />
              <label htmlFor="name">name</label>
            </Field>
            <Field>
              <Textarea
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setDescription(e.target.value)
                }
                id="description"
              ></Textarea>
              <label htmlFor="description">description</label>
            </Field>
            <Field>
              <SpecialField>
                <Input
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setFeature(e.target.value)}
                  value={feature}
                  type="text"
                  id="features"
                />
                <Button type="button" onClick={handleAddFeature}>
                  Add
                </Button>
              </SpecialField>
              <label htmlFor="features">features</label>
            </Field>
            {features.length > 0 && (
              <>
                <ul>
                  {features.map((feature: string, index: Key) => (
                    <FeatureContainer key={index}>
                      <span>{feature}</span>
                      <CloseButtonCenter
                        key={`${index}-close`}
                        type="button"
                        className="btn-close"
                        onClick={() => {
                          setFeatures((prevFeatures) =>
                            prevFeatures.filter(
                              (_feature, featureIndex) => featureIndex !== index
                            )
                          );
                        }}
                      >
                        <IoCloseOutline />
                      </CloseButtonCenter>
                    </FeatureContainer>
                  ))}
                </ul>
              </>
            )}
            <Field>
              <Input
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setBrand(e.target.value)
                }
                type="text"
                id="brand"
              />
              <label htmlFor="brand">brand</label>
            </Field>
            <Field>
              <Input
                onChange={onPriceChange}
                type="number"
                min="0"
                id="price"
              />
              <label htmlFor="price">price</label>
            </Field>
            <Field>
              <Input
                onChange={onDiscountChange}
                type="number"
                min="0"
                id="discount"
              />
              <label htmlFor="discount">discount</label>
            </Field>
            <Field>
              <Input
                onChange={onCountInStockChange}
                type="number"
                min="0"
                id="countinstock"
              />
              <label htmlFor="countinstock">count in stock</label>
            </Field>
            <Field>
              <Select
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setCategory(e.target.value)
                }
                name="category"
                id="category"
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map((category: { _id: Key; title: string }) => (
                    <option key={category._id} value={`${category._id}`}>
                      {category.title}
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
                {images.map((image, index) => (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <ImageContainer key={index}>
                    <ImgPreview
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt="problem showing image"
                      className="img-preview"
                    />
                    <CloseButton
                      key={`${index}-close`}
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
                ))}
              </ImagePreview>
            )}
            <Button type="submit">submit</Button>
          </form>
        </Section>
      </Content>
    </Fragment>
  );
};

export default NewProductPage;
