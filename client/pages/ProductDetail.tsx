import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";
import { getProducts } from "../services/api";
import { Button } from "../components/ui/button";
import { LoadingScreen } from "../components/ui/loading";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Globe,
  Store as StoreIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import AddToCartDialog from "../components/AddToCartDialog";
import CartSidebar from "../components/CartSidebar";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  variants: Array<{
    id: string;
    name: string;
    stock: number;
  }>;
  totalStock: number;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const { getTotalItems, setIsCartOpen, isCartOpen } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddToCartOpen, setIsAddToCartOpen] = useState(false);

  const cartItemsCount = getTotalItems();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        const foundProduct = products.find((p) => p.id === id);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      setIsAddToCartOpen(true);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg text-center">{t("empty.noProductsFound")}</p>
          <Button onClick={() => navigate("/")} variant="outline">
            {t("store.continueShopping")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="h-20 flex items-center">
              <img
                src={language === "ar"
                  ? "https://cdn.builder.io/api/v1/image/assets%2F82efd381682b4c5f90191340367e0cd7%2F6b2c342f55b24cd1ab05853aa15523c9?format=webp&width=800"
                  : "https://cdn.builder.io/api/v1/image/assets%2F82efd381682b4c5f90191340367e0cd7%2F72cfed7b1096405dbe2a7a56980b2907?format=webp&width=800"
                }
                alt="Azhar Store"
                className="h-16 w-auto max-w-[200px] object-contain"
              />
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Language Switch */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  {language === "ar" ? "العربية" : "English"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ar")}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart Button */}
            <Button
              variant="outline"
              onClick={() => setIsCartOpen(true)}
              className="relative hover:bg-primary/5 hover:border-primary transition-colors"
            >
              <ShoppingCart className="h-5 w-5 [dir=rtl]:ml-2 [dir=ltr]:mr-2" />
              {t("store.cart")}
              {cartItemsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Product Detail Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("store.continueShopping")}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              {product.images.length > 0 ? (
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <span>{t("products.noImages")}</span>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">
                {product.description}
              </p>

              <div className="text-3xl font-bold text-primary mb-4">
                BD {product.price.toFixed(2)}
              </div>

              {product.totalStock > 0 ? (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  {product.totalStock} {t("products.stock")}
                </Badge>
              ) : (
                <Badge variant="secondary">{t("store.outOfStock")}</Badge>
              )}
            </div>

            {/* Variants */}
            {product.variants.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">
                    {t("products.variants")}:
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="p-3 border rounded-lg text-center"
                      >
                        <div className="font-medium">{variant.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {variant.stock} {t("products.stock")}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={product.totalStock === 0}
              size="lg"
              className="w-full"
            >
              <Plus className="h-5 w-5 [dir=rtl]:ml-2 [dir=ltr]:mr-2" />
              {t("store.addToCart")}
            </Button>
          </div>
        </div>
      </main>

      {/* Add to Cart Dialog */}
      <AddToCartDialog
        product={product}
        open={isAddToCartOpen}
        onClose={() => setIsAddToCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <CartSidebar open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
