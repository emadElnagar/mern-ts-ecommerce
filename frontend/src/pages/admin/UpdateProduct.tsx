import { Fragment, useEffect, Key, useState, ChangeEvent } from "react";
import { Helmet } from "react-helmet";
import { Button, HeaderCenter, Section } from "../../styles/main";
import { Content } from "../../styles/admin";
import {
  Field,
  ImageContainer,
  ImagePreview,
  ImgPreview,
  Input,
  Select,
  SpecialField,
  Textarea,
  CloseButton,
  CloseButtonCenter,
  FeatureContainer,
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
  const { error, isLoading, product } = useSelector(
    (state: any) => state.product
  );
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [feature, setFeature] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(0);
  const [countInStock, setCountInStock] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removeImages, setRemoveImages] = useState<string[]>([]);

  // Fetch product
  useEffect(() => {
    dispatch(GetSingleProduct(slug));
  }, [dispatch, slug]);

  // Populate data
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setBrand(product.brand || "");
      setPrice(product.price || 0);
      setDiscount(product.discount || 0);
      setCountInStock(product.countInStock || 0);
      setFeatures(product.features || []);
      setExistingImages(product.images || []);
      if (product.category && typeof product.category === "object") {
        setCategory(product.category._id);
      } else {
        setCategory(product.category);
      }
    }
  }, [product]);

  const handleAddFeature = () => {
    if (!feature.trim()) {
      Swal.fire("Error", "Please enter a feature", "error");
      return;
    }
    setFeatures([...features, feature.trim()]);
    setFeature("");
  };

  const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setNewImages((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const handleRemoveExistingImage = (imgName: string) => {
    setExistingImages((prev) => prev.filter((i) => i !== imgName));
    setRemoveImages((prev) => [...prev, imgName]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetProductState());

    if (
      !name ||
      !description ||
      !brand ||
      !price ||
      !countInStock ||
      !category
    ) {
      Swal.fire("Error", "Please fill in all required fields", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("price", String(price));
    formData.append("discount", String(discount || 0));
    formData.append("countInStock", String(countInStock));
    formData.append("category", category);

    features.forEach((f) => formData.append("features", f));
    removeImages.forEach((r) => formData.append("removeImages", r));

    newImages.forEach((file) => {
      formData.append("imgnames", file.name);
      formData.append("images", file);
    });

    dispatch(UpdateProduct({ data: formData, slug }))
      .unwrap()
      .then(() => {
        Swal.fire("Success", "Product updated successfully", "success");
        navigate("/admin");
      })
      .catch((err: any) => {
        Swal.fire("Error", err.message || "Failed to update product", "error");
      });
  };

  if (isLoading) return <LoadingBox />;
  if (error) return <ErrorBox message={error.message} />;

  return (
    <Fragment>
      <Helmet>
        <title>Update Product</title>
      </Helmet>
      <Content>
        {product && (
          <Section>
            <HeaderCenter>Update Product</HeaderCenter>
            <form
              className="product-form"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              {/* Name */}
              <Field>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name">Name</label>
              </Field>

              {/* Description */}
              <Field>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="description">Description</label>
              </Field>

              {/* Features */}
              <Field>
                <SpecialField>
                  <Input
                    type="text"
                    value={feature}
                    onChange={(e) => setFeature(e.target.value)}
                  />
                  <Button type="button" onClick={handleAddFeature}>
                    Add
                  </Button>
                </SpecialField>
                <label htmlFor="features">Features</label>
              </Field>

              {features.length > 0 && (
                <ul>
                  {features.map((f, index) => (
                    <FeatureContainer key={index}>
                      <span>{f}</span>
                      <CloseButtonCenter
                        type="button"
                        onClick={() =>
                          setFeatures(features.filter((_f, i) => i !== index))
                        }
                      >
                        <IoCloseOutline />
                      </CloseButtonCenter>
                    </FeatureContainer>
                  ))}
                </ul>
              )}

              {/* Brand */}
              <Field>
                <Input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
                <label htmlFor="brand">Brand</label>
              </Field>

              {/* Price */}
              <Field>
                <Input
                  type="number"
                  min="0"
                  value={price ?? ""}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <label htmlFor="price">Price</label>
              </Field>

              {/* Discount */}
              <Field>
                <Input
                  type="number"
                  min="0"
                  value={discount ?? ""}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
                <label htmlFor="discount">Discount</label>
              </Field>

              {/* Count In Stock */}
              <Field>
                <Input
                  type="number"
                  min="0"
                  value={countInStock ?? ""}
                  onChange={(e) => setCountInStock(Number(e.target.value))}
                />
                <label htmlFor="countInStock">Count in Stock</label>
              </Field>

              {/* Category */}
              <Field>
                <Select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat: { title: string; _id: Key }) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))}
                </Select>
                <label htmlFor="category">Category</label>
              </Field>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <ImagePreview>
                  {existingImages.map((img, i) => (
                    <ImageContainer key={i}>
                      <ImgPreview
                        src={`/uploads/images/${img}`}
                        alt="existing"
                      />
                      <CloseButton
                        type="button"
                        onClick={() => handleRemoveExistingImage(img)}
                      >
                        <IoCloseOutline />
                      </CloseButton>
                    </ImageContainer>
                  ))}
                </ImagePreview>
              )}

              {/* New Images */}
              <Field>
                <Input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={onImagesChange}
                />
                <label htmlFor="images">Upload New Images</label>
              </Field>

              {newImages.length > 0 && (
                <ImagePreview>
                  {newImages.map((file, index) => (
                    <ImageContainer key={index}>
                      <ImgPreview
                        src={URL.createObjectURL(file)}
                        alt="preview"
                      />
                      <CloseButton
                        type="button"
                        onClick={() =>
                          setNewImages(newImages.filter((_, i) => i !== index))
                        }
                      >
                        <IoCloseOutline />
                      </CloseButton>
                    </ImageContainer>
                  ))}
                </ImagePreview>
              )}

              <Button type="submit">Update Product</Button>
            </form>
          </Section>
        )}
      </Content>
    </Fragment>
  );
};

export default UpdatePage;
