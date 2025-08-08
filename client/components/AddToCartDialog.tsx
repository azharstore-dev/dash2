import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Minus, Plus } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

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

interface AddToCartDialogProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export default function AddToCartDialog({
  product,
  open,
  onClose,
}: AddToCartDialogProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId,
  );
  const maxQuantity = selectedVariant?.stock || 0;

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedVariantId("");
      setQuantity(1);
    }
  }, [open]);

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
      price: product.price,
      productName: product.name,
      variantName: selectedVariant.name,
      productImage: product.images[0] || undefined,
    });

    onClose();
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const isValidSelection =
    selectedVariant && quantity > 0 && quantity <= maxQuantity;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-md max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="space-y-4 px-1">
          {/* Product Image */}
          {product.images.length > 0 && (
            <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Product Description */}
          <p className="text-sm text-muted-foreground">{product.description}</p>

          {/* Price */}
          <div className="text-lg font-bold text-primary">
            BD {product.price.toFixed(2)}
          </div>

          {/* Variant Selection */}
          {product.variants.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="variant">{t("store.variant")}</Label>
              <Select
                value={selectedVariantId}
                onValueChange={setSelectedVariantId}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("store.selectVariant")} />
                </SelectTrigger>
                <SelectContent>
                  {product.variants
                    .filter((variant) => variant.stock > 0)
                    .map((variant) => (
                      <SelectItem key={variant.id} value={variant.id}>
                        {variant.name} ({variant.stock} {t("products.stock")})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Quantity Selection */}
          {selectedVariant && (
            <div className="space-y-2">
              <Label htmlFor="quantity">{t("store.quantity")}</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value) || 1)
                  }
                  min={1}
                  max={maxQuantity}
                  className="w-20 text-center"
                />

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= maxQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {selectedVariant && (
                <p className="text-xs text-muted-foreground">
                  {t("products.stock")}: {selectedVariant.stock}
                </p>
              )}
            </div>
          )}

          {/* Total Price */}
          {isValidSelection && (
            <div className="border-t pt-4">
              <div className="flex justify-between items-center font-semibold">
                <span>{t("orders.subtotal")}:</span>
                <span>BD {(product.price * quantity).toFixed(2)}</span>
              </div>
            </div>
          )}
          </div>
        </ScrollArea>

        <DialogFooter className="gap-3 px-3 sm:px-6 py-4 border-t bg-white sticky bottom-0 shrink-0 flex-col sm:flex-row">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 min-h-[44px]"
            size="lg"
          >
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={!isValidSelection}
            className="flex-1 min-h-[48px]"
            size="lg"
          >
            {t("store.addToCart")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
