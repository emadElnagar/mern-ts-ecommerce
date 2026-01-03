import { ChangeEvent, Fragment, Key, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, HeaderCenter, Section } from "../../styles/main";
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
  const [loading, setLoading] = useState(false);

  // Handle numeric input changes safely
  const handleNumberChange =
    (setter: (v: number | null) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = !Number.isNaN(e.target.valueAsNumber)
        ? e.target.valueAsNumber
        : null;
      setter(value);
    };

  // Add feature
  const handleAddFeature = () => {
    if (!feature.trim()) {
      Swal.fire("Error", "Please enter a feature", "error");
      return;
    }
    setFeatures((prev) => [...prev, feature.trim()]);
    setFeature("");
  };

  // Remove feature
  const handleRemoveFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle images (fixed immutability)
  const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setImages((prev) => [...prev, ...selected]);
    }
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Validate form fields before submit
  const validateForm = () => {
    if (!name || !brand || !price || !countInStock || !category) {
      Swal.fire("Missing Fields", "Please fill all required fields", "error");
      return false;
    }
    if (images.length === 0) {
      Swal.fire("No Images", "Please upload at least one image", "error");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(resetProductState());
    setLoading(true);

    try {
      const formData = new FormData();
      images.forEach((img) => {
        formData.append("images", img);
        formData.append("imgnames", img.name);
      });
      features.forEach((f) => formData.append("features", f));

      formData.append("name", name);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("price", price!.toString());
      formData.append("countInStock", countInStock!.toString());
      formData.append("category", category);
      formData.append("seller", user._id);
      if (discount !== null) formData.append("discount", discount.toString());

      await dispatch(NewProduct(formData)).unwrap();

      Swal.fire("Success!", "Product added successfully", "success");
      setImages([]);
      navigate("/admin");
    } catch (err: any) {
      Swal.fire("Error", err.message || "Failed to add product", "error");
    } finally {
      setLoading(false);
    }
  };

  // Load categories
  useEffect(() => {
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
        <title>Voltaro-Add New Product</title>
      </Helmet>

      <Content>
        <Section>
          <HeaderCenter>Add New Product</HeaderCenter>

          <form
            method="POST"
            onSubmit={handleSubmit}
            className="product-form"
            encType="multipart/form-data"
          >
            {/* Product Name */}
            <Field>
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                id="name"
                placeholder="Product name"
                required
              />
              <label htmlFor="name">Name</label>
            </Field>

            {/* Description */}
            <Field>
              <Textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                id="description"
                placeholder="Describe your product..."
              />
              <label htmlFor="description">Description</label>
            </Field>

            {/* Features */}
            <Field>
              <SpecialField>
                <Input
                  onChange={(e) => setFeature(e.target.value)}
                  value={feature}
                  type="text"
                  id="features"
                  placeholder="Enter feature"
                />
                <Button type="button" onClick={handleAddFeature}>
                  Add
                </Button>
              </SpecialField>
              <label htmlFor="features">Features</label>
            </Field>

            {features.length > 0 && (
              <ul>
                {features.map((f: string, i: Key) => (
                  <FeatureContainer key={i}>
                    <span>{f}</span>
                    <CloseButtonCenter
                      type="button"
                      onClick={() => handleRemoveFeature(i as number)}
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
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                type="text"
                id="brand"
                placeholder="Brand name"
                required
              />
              <label htmlFor="brand">Brand</label>
            </Field>

            {/* Price */}
            <Field>
              <Input
                onChange={handleNumberChange(setPrice)}
                type="number"
                min="0"
                id="price"
                placeholder="Enter price"
                required
              />
              <label htmlFor="price">Price</label>
            </Field>

            {/* Discount */}
            <Field>
              <Input
                onChange={handleNumberChange(setDiscount)}
                type="number"
                min="0"
                id="discount"
                placeholder="Enter discount (optional)"
              />
              <label htmlFor="discount">Discount</label>
            </Field>

            {/* Count in stock */}
            <Field>
              <Input
                onChange={handleNumberChange(setCountInStock)}
                type="number"
                min="0"
                id="countinstock"
                placeholder="Available quantity"
                required
              />
              <label htmlFor="countinstock">Count In Stock</label>
            </Field>

            {/* Category */}
            <Field>
              <Select
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                id="category"
                value={category}
              >
                {categories?.map((c: { _id: string; title: string }) => (
                  <option key={c._id} value={c._id}>
                    {c.title}
                  </option>
                ))}
              </Select>
              <label htmlFor="category">Category</label>
            </Field>

            {/* Images */}
            <Field>
              <Input
                onChange={onImagesChange}
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
              />
              <label htmlFor="images">Images</label>
            </Field>

            {images.length > 0 && (
              <ImagePreview>
                {images.map((image, index) => (
                  <ImageContainer key={index}>
                    <ImgPreview
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                    />
                    <CloseButton
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <IoCloseOutline />
                    </CloseButton>
                  </ImageContainer>
                ))}
              </ImagePreview>
            )}
            {/* Submit Button */}
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Section>
      </Content>
    </Fragment>
  );
};

export default NewProductPage;
