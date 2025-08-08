import { useState } from "react";
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
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import CheckoutDialog from "./CheckoutDialog";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function CartSidebar({ open, onClose }: CartSidebarProps) {
  const { t } = useLanguage();
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } =
    useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleQuantityChange = (
    productId: string,
    variantId: string,
    newQuantity: number,
  ) => {
    if (newQuantity <= 0) {
      removeItem(productId, variantId);
    } else {
      updateQuantity(productId, variantId, newQuantity);
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] sm:max-w-lg max-h-[95vh] flex flex-col p-0 rounded-lg sm:rounded-md overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <ShoppingBag className="h-6 w-6" />
              {t("store.cart")}
            </DialogTitle>
          </DialogHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground text-lg">
                  {t("store.cartEmpty")}
                </p>
                <Button variant="outline" onClick={onClose} size="lg" className="min-h-[44px]">
                  {t("store.continueShopping")}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 px-3 sm:px-6 overflow-y-auto">
                <div className="space-y-4 py-4">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.variantId}`}
                      className="space-y-3 pb-4 border-b last:border-b-0"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        {item.productImage && (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base truncate">
                            {item.productName}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {item.variantName}
                          </p>
                          <p className="text-base sm:text-lg font-bold text-primary">
                            BD {item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeItem(item.productId, item.variantId)
                          }
                          className="shrink-0 h-9 w-9 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.variantId,
                                item.quantity - 1,
                              )
                            }
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.productId,
                                item.variantId,
                                parseInt(e.target.value) || 1,
                              )
                            }
                            min={1}
                            className="w-16 sm:w-20 h-8 text-center text-sm"
                          />

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.variantId,
                                item.quantity + 1,
                              )
                            }
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-base sm:text-lg font-bold">
                          BD {(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <DialogFooter className="flex-col space-y-4 px-3 sm:px-6 py-4 border-t bg-white sticky bottom-0 shrink-0">
                {/* Total */}
                <div className="flex justify-between items-center text-lg sm:text-xl font-bold w-full">
                  <span>{t("store.cartTotal")}:</span>
                  <span className="text-primary">
                    BD {totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex-1 min-h-[44px]"
                    disabled={items.length === 0}
                    size="lg"
                  >
                    {t("store.clearCart")}
                  </Button>
                  <Button
                    onClick={handleCheckout}
                    className="flex-1 min-h-[48px]"
                    disabled={items.length === 0}
                    size="lg"
                  >
                    {t("store.checkout")}
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <CheckoutDialog
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
}
