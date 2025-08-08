import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Translation dictionaries
const translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.products": "Products",
    "nav.orders": "Orders",
    "nav.customers": "Customers",
    "nav.revenue": "Revenue",
    "nav.analytics": "Analytics",
    "nav.logout": "Logout",
    "nav.adminPanel": "Admin Panel",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.totalRevenue": "Total Revenue",
    "dashboard.totalOrders": "Total Orders",
    "dashboard.recentOrders": "Recent Orders",
    "dashboard.welcome": "Welcome to Admin Dashboard",

    // Products
    "products.title": "Products",
    "products.subtitle": "Manage your product inventory",
    "products.addNew": "Add New Product",
    "products.search": "Search products...",
    "products.name": "Name",
    "products.price": "Price",
    "products.stock": "Stock",
    "products.variants": "Variants",
    "products.actions": "Actions",
    "products.edit": "Edit",
    "products.delete": "Delete",
    "products.noProducts": "No products found",
    "products.addProduct": "Add Product",
    "products.editProduct": "Edit Product",
    "products.productName": "Product Name",
    "products.productPrice": "Product Price",
    "products.productDescription": "Product Description",
    "products.productImages": "Product Images",
    "products.addVariant": "Add Variant",
    "products.variantName": "Variant Name",
    "products.variantStock": "Variant Stock",
    "products.save": "Save",
    "products.cancel": "Cancel",
    "products.removeVariant": "Remove",
    "products.dragImages": "Drag and drop images here, or click to select",
    "products.maxImages": "Maximum 10 images allowed",
    "products.primaryImage": "Primary",
    "products.uploadImages": "Upload Images",
    "products.images": "images",
    "products.noImages": "No images uploaded yet",

    // Orders
    "orders.title": "Orders",
    "orders.subtitle": "Manage customer orders and deliveries",
    "orders.addNew": "Add New Order",
    "orders.search": "Search orders...",
    "orders.orderId": "Order ID",
    "orders.customer": "Customer",
    "orders.total": "Total",
    "orders.status": "Status",
    "orders.deliveryType": "Delivery Type",
    "orders.date": "Date",
    "orders.actions": "Actions",
    "orders.view": "View",
    "orders.edit": "Edit",
    "orders.delete": "Delete",
    "orders.noOrders": "No orders found",
    "orders.addOrder": "Add Order",
    "orders.editOrder": "Edit Order",
    "orders.selectCustomer": "Select Customer",
    "orders.addItem": "Add Item",
    "orders.product": "Product",
    "orders.variant": "Variant",
    "orders.quantity": "Quantity",
    "orders.price": "Price",
    "orders.subtotal": "Subtotal",
    "orders.remove": "Remove",
    "orders.notes": "Notes",
    "orders.delivery": "Delivery",
    "orders.pickup": "Pickup",
    "orders.processing": "Processing",
    "orders.ready": "Ready",
    "orders.delivered": "Delivered",
    "orders.pickedUp": "Picked Up",
    "orders.orderDetails": "Order Details",
    "orders.items": "Items",
    "orders.orderTotal": "Order Total",
    "orders.save": "Save",
    "orders.orderDetailsTitle": "Order Details",
    "orders.orderDetailsDesc":
      "Complete order information for delivery and tracking",
    "orders.customerInfo": "Customer Information",
    "orders.customerName": "Name",
    "orders.customerPhone": "Phone",
    "orders.deliveryAddress": "Delivery Address",
    "orders.customerNotFound": "Customer not found",
    "orders.orderItems": "Order Items",
    "orders.unknownProduct": "Unknown Product",
    "orders.orderSummary": "Order Summary",
    "orders.created": "Created",
    "orders.lastUpdated": "Last Updated",
    "orders.close": "Close",
    "orders.selectProduct": "Select product",
    "orders.selectVariant": "Select variant",
    "orders.notesPlaceholder": "Special instructions or notes...",

    // Customers
    "customers.title": "Customers",
    "customers.subtitle": "Manage your customer database",
    "customers.addNew": "Add New Customer",
    "customers.search": "Search customers...",
    "customers.name": "Name",
    "customers.phone": "Phone",
    "customers.address": "Address",
    "customers.actions": "Actions",
    "customers.edit": "Edit",
    "customers.delete": "Delete",
    "customers.noCustomers": "No customers found",
    "customers.addCustomer": "Add Customer",
    "customers.editCustomer": "Edit Customer",
    "customers.customerName": "Customer Name",
    "customers.customerPhone": "Customer Phone",
    "customers.customerAddress": "Customer Address",
    "customers.customerHome": "Home Number",
    "customers.customerRoad": "Road Number",
    "customers.customerBlock": "Block Number",
    "customers.customerTown": "Town/Area",
    "customers.save": "Save",

    // Analytics
    "analytics.title": "Analytics",
    "analytics.overview": "Analytics Overview",
    "analytics.visitors": "Total Visitors",
    "analytics.pageViews": "Page Views",
    "analytics.avgSession": "Avg. Session Duration",
    "analytics.bounceRate": "Bounce Rate",
    "analytics.newUsers": "New Customers",
    "analytics.returningUsers": "Returning Customers",
    "analytics.visitorTrends": "Visitor Trends",
    "analytics.deviceBreakdown": "Device Breakdown",
    "analytics.topPages": "Top Pages",
    "analytics.views": "Views",
    "analytics.uniqueViews": "Unique Views",
    "analytics.minutes": "minutes",
    "analytics.refresh": "Refresh Data",
    "analytics.last7days": "Last 7 Days",
    "analytics.last30days": "Last 30 Days",
    "analytics.last90days": "Last 90 Days",
    "analytics.userTypes": "Customer Types",

    // Revenue
    "revenue.title": "Revenue Analytics",
    "revenue.overview": "Revenue Overview",
    "revenue.totalRevenue": "Total Revenue",
    "revenue.ordersCount": "Orders Count",
    "revenue.avgOrderValue": "Avg Order Value",
    "revenue.monthlyTrend": "Monthly Revenue Trend",
    "revenue.dailyRevenue": "Daily Revenue (This Month)",
    "revenue.topProducts": "Top Products by Revenue",
    "revenue.deliveryAnalysis": "Delivery Type Analysis",
    "revenue.revenueByStatus": "Revenue by Order Status",
    "revenue.month": "Month",
    "revenue.revenue": "Revenue",
    "revenue.day": "Day",
    "revenue.productRevenue": "Product Revenue",
    "revenue.deliveryType": "Delivery Type",
    "revenue.orderStatus": "Order Status",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.add": "Add",
    "common.search": "Search",
    "common.actions": "Actions",
    "common.loading": "Loading...",
    "common.noData": "No data found",
    "common.confirm": "Confirm",
    "common.close": "Close",
    "common.yes": "Yes",
    "common.no": "No",
    "common.back": "Back",
    "common.next": "Next",

    // Empty states
    "empty.noProductsFound": "No products found",
    "empty.noCustomersFound": "No customers found",
    "empty.noOrdersFound": "No orders found",
    "empty.adjustSearch": "Try adjusting your search terms",
    "empty.addFirstProduct": "Start by adding your first product",
    "empty.addFirstCustomer": "Start by adding your first customer",
    "empty.addFirstOrder": "Start by creating your first order",
    "empty.addProduct": "Add Product",
    "empty.addCustomer": "Add Customer",
    "empty.createOrder": "Create Order",

    // Messages
    "message.deleteConfirm": "Are you sure you want to delete this item?",
    "message.productAdded": "Product added successfully",
    "message.productUpdated": "Product updated successfully",
    "message.productDeleted": "Product deleted successfully",
    "message.orderAdded": "Order added successfully",
    "message.orderUpdated": "Order updated successfully",
    "message.orderDeleted": "Order deleted successfully",
    "message.customerAdded": "Customer added successfully",
    "message.customerUpdated": "Customer updated successfully",
    "message.customerDeleted": "Customer deleted successfully",
    "message.error": "An error occurred",
    "message.success": "Operation completed successfully",

    // Login
    "login.title": "Admin Login",
    "login.password": "Password",
    "login.signIn": "Sign In",
    "login.invalidPassword": "Invalid password",

    // Language
    "language.english": "English",
    "language.arabic": "العربية",
    "language.switch": "Switch Language",

    // Store
    "store.title": "Store",
    "store.cart": "Cart",
    "store.addToCart": "Add to Cart",
    "store.quantity": "Quantity",
    "store.variant": "Variant",
    "store.selectVariant": "Select Variant",
    "store.cartEmpty": "Your cart is empty",
    "store.cartTotal": "Cart Total",
    "store.checkout": "Checkout",
    "store.continueShopping": "Continue Shopping",
    "store.removeFromCart": "Remove from Cart",
    "store.updateQuantity": "Update Quantity",
    "store.clearCart": "Clear Cart",

    // Checkout
    "checkout.title": "Checkout",
    "checkout.customerInfo": "Customer Information",
    "checkout.customerName": "Full Name",
    "checkout.customerPhone": "Phone Number",
    "checkout.customerAddress": "Address",
    "checkout.customerHome": "Home Number",
    "checkout.customerRoad": "Road Number",
    "checkout.customerBlock": "Block Number",
    "checkout.customerTown": "Town/Area",
    "checkout.deliveryOptions": "Delivery Options",
    "checkout.delivery": "Delivery",
    "checkout.pickup": "Pickup",
    "checkout.orderSummary": "Order Summary",
    "checkout.placeOrder": "Place Order",
    "checkout.noCreditCard": "No credit card required - Pay on delivery/pickup",
    "checkout.orderSuccess": "Order placed successfully!",
    "checkout.thankYou": "Thank you for your order",
    "checkout.orderNumber": "Order Number",
    "checkout.backToStore": "Back to Store",
    "checkout.processingMessage":
      "The order will be processed in 1-3 days, we will contact you when delivery",
    "checkout.orderSuccessMessage": "Thank you for your order",
    "checkout.subtotal": "Subtotal",
    "checkout.deliveryFee": "Delivery Fee",
    "checkout.total": "Total",
    "checkout.orderItems": "Order Items",
    "checkout.paymentMethod": "Payment Method",
    "checkout.cashOnDelivery": "Cash on Delivery",
    "checkout.free": "Free",
    "checkout.deliveryDescription": "We'll deliver to your address",
    "checkout.pickupDescription": "Pick up from our store",

    // Additional store keys
    "store.outOfStock": "Out of Stock",
    "store.inStock": "In Stock",
    "store.viewDetails": "View Details",
    "store.productDetails": "Product Details",
  },
  ar: {
    // Navigation
    "nav.dashboard": "لوحة التحكم",
    "nav.products": "المنتجات",
    "nav.orders": "الطلبات",
    "nav.customers": "العملاء",
    "nav.revenue": "الإيرادات",
    "nav.analytics": "التحليلات",
    "nav.logout": "تسجيل الخروج",
    "nav.adminPanel": "لوحة الإدارة",

    // Dashboard
    "dashboard.title": "لوحة التحكم",
    "dashboard.totalRevenue": "إجمالي الإيرادات",
    "dashboard.totalOrders": "إجمالي الطلبات",
    "dashboard.recentOrders": "الطلبات الأخيرة",
    "dashboard.welcome": "مرحباً بك في لوحة الإدارة",

    // Products
    "products.title": "المنتجات",
    "products.subtitle": "إدارة مخزون المنتجات",
    "products.addNew": "إضافة منتج جديد",
    "products.search": "البحث في المنتجات...",
    "products.name": "الاسم",
    "products.price": "السعر",
    "products.stock": "المخزون",
    "products.variants": "الأنواع",
    "products.actions": "الإجراءات",
    "products.edit": "تعديل",
    "products.delete": "��ذف",
    "products.noProducts": "لا توجد منتجات",
    "products.addProduct": "إضافة منتج",
    "products.editProduct": "تعديل منتج",
    "products.productName": "اسم المنتج",
    "products.productPrice": "سعر المنتج",
    "products.productDescription": "وصف المنتج",
    "products.productImages": "صور المنتج",
    "products.addVariant": "إضافة نوع",
    "products.variantName": "اسم النوع",
    "products.variantStock": "مخزون النوع",
    "products.save": "حفظ",
    "products.cancel": "إلغاء",
    "products.removeVariant": "إزالة",
    "products.dragImages": "اسحب وأفلت الصور هنا، أو انقر للاختيار",
    "products.maxImages": "الحد الأقصى 10 صور",
    "products.primaryImage": "أساسية",
    "products.uploadImages": "رفع الصور",
    "products.images": "صور",
    "products.noImages": "لم يتم رفع أي صور بعد",

    // Orders
    "orders.title": "الطلبات",
    "orders.subtitle": "إدارة طلبات العملاء والتوصيل",
    "orders.addNew": "إضافة طلب جديد",
    "orders.search": "البحث في الطلبات...",
    "orders.orderId": "رقم الطلب",
    "orders.customer": "العميل",
    "orders.total": "الإجمالي",
    "orders.status": "الحالة",
    "orders.deliveryType": "نوع التسليم",
    "orders.date": "التاريخ",
    "orders.actions": "الإجراءات",
    "orders.view": "عرض",
    "orders.edit": "تعديل",
    "orders.delete": "حذف",
    "orders.noOrders": "لا توجد طلبات",
    "orders.addOrder": "إضافة طلب",
    "orders.editOrder": "تعديل طلب",
    "orders.selectCustomer": "اختر العميل",
    "orders.addItem": "إضافة عنصر",
    "orders.product": "المنتج",
    "orders.variant": "النوع",
    "orders.quantity": "الكمية",
    "orders.price": "السعر",
    "orders.subtotal": "المجموع الفرعي",
    "orders.remove": "إزالة",
    "orders.notes": "ملاحظات",
    "orders.delivery": "توصيل",
    "orders.pickup": "استلام",
    "orders.processing": "قيد المعالجة",
    "orders.ready": "جاهز",
    "orders.delivered": "تم التسليم",
    "orders.pickedUp": "تم الاستلام",
    "orders.orderDetails": "تفاصيل الطلب",
    "orders.items": "العناصر",
    "orders.orderTotal": "إجمالي الطلب",
    "orders.save": "حفظ",
    "orders.orderDetailsTitle": "تفاصيل الطلب",
    "orders.orderDetailsDesc": "معلومات الطلب الكاملة للتوصيل والتتبع",
    "orders.customerInfo": "معلومات العميل",
    "orders.customerName": "الاسم",
    "orders.customerPhone": "الهاتف",
    "orders.deliveryAddress": "عنوان التوصيل",
    "orders.customerNotFound": "العميل غير موجود",
    "orders.orderItems": "عناصر الطلب",
    "orders.unknownProduct": "منتج غير معروف",
    "orders.orderSummary": "ملخص الطلب",
    "orders.created": "تاريخ الإنشاء",
    "orders.lastUpdated": "آخر تحديث",
    "orders.close": "إغلاق",
    "orders.selectProduct": "اختر المنتج",
    "orders.selectVariant": "اختر النوع",
    "orders.notesPlaceholder": "تعليمات خاصة أو ملاحظات...",

    // Customers
    "customers.title": "العملاء",
    "customers.subtitle": "إدارة قاعدة بيانات العملاء",
    "customers.addNew": "إضافة عميل جديد",
    "customers.search": "البحث في العملاء...",
    "customers.name": "الاسم",
    "customers.phone": "الهاتف",
    "customers.address": "العنوان",
    "customers.actions": "الإجراءات",
    "customers.edit": "تعديل",
    "customers.delete": "حذف",
    "customers.noCustomers": "لا يوجد عملاء",
    "customers.addCustomer": "إضافة عميل",
    "customers.editCustomer": "تعديل عميل",
    "customers.customerName": "اسم العميل",
    "customers.customerPhone": "هاتف العميل",
    "customers.customerAddress": "عنوان العميل",
    "customers.customerHome": "المنزل:",
    "customers.customerRoad": "الطريق:",
    "customers.customerBlock": "المجمع:",
    "customers.customerTown": "المنطقة:",
    "customers.save": "حفظ",

    // Analytics
    "analytics.title": "التحليلات",
    "analytics.overview": "نظرة عامة على التحليلات",
    "analytics.visitors": "إجمالي الزوار",
    "analytics.pageViews": "مشاهدات الصفحة",
    "analytics.avgSession": "متوسط مدة الجلسة",
    "analytics.bounceRate": "معدل الارتداد",
    "analytics.newUsers": "العملاء الجدد",
    "analytics.returningUsers": "العملاء العائدين",
    "analytics.visitorTrends": "اتجاهات الزوار",
    "analytics.deviceBreakdown": "تفصيل الأجهزة",
    "analytics.topPages": "أهم الصفحات",
    "analytics.views": "المشاهدات",
    "analytics.uniqueViews": "المشاهدات الفريدة",
    "analytics.minutes": "دقائق",
    "analytics.refresh": "تحديث البيانات",
    "analytics.last7days": "آخر 7 أيام",
    "analytics.last30days": "آخر 30 يوم",
    "analytics.last90days": "آخر 90 يوم",
    "analytics.userTypes": "أنواع العملاء",

    // Revenue
    "revenue.title": "تحليلات الإيرادات",
    "revenue.overview": "نظرة عامة على الإيرادات",
    "revenue.totalRevenue": "إجمالي الإيرادات",
    "revenue.ordersCount": "عدد الطلبات",
    "revenue.avgOrderValue": "متوسط قيمة الطلب",
    "revenue.monthlyTrend": "اتجاه الإيرادات الشهرية",
    "revenue.dailyRevenue": "الإيرادات اليومية (هذا الشهر)",
    "revenue.topProducts": "أفضل المنتجات من حيث الإيرادات",
    "revenue.deliveryAnalysis": "تحليل نوع التسليم",
    "revenue.revenueByStatus": "الإيرادات حسب حالة الطلب",
    "revenue.month": "الشهر",
    "revenue.revenue": "الإيرادات",
    "revenue.day": "اليوم",
    "revenue.productRevenue": "إيرادات المنتج",
    "revenue.deliveryType": "نوع التسليم",
    "revenue.orderStatus": "حالة الطلب",

    // Common
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.add": "إضافة",
    "common.search": "بحث",
    "common.actions": "الإجراءات",
    "common.loading": "جارٍ التحميل...",
    "common.noData": "لا توجد بيانات",
    "common.confirm": "تأكيد",
    "common.close": "إغلاق",
    "common.yes": "نعم",
    "common.no": "لا",
    "common.back": "السابق",
    "common.next": "التالي",

    // Empty states
    "empty.noProductsFound": "لا توجد منتجات",
    "empty.noCustomersFound": "لا يوجد عملاء",
    "empty.noOrdersFound": "لا توجد طلبات",
    "empty.adjustSearch": "حاول تعديل مصطلحات البحث",
    "empty.addFirstProduct": "ابدأ بإضافة أول منتج لك",
    "empty.addFirstCustomer": "ابدأ بإضافة أول عميل لك",
    "empty.addFirstOrder": "ابدأ بإنشاء أول طلب لك",
    "empty.addProduct": "إضافة منتج",
    "empty.addCustomer": "إضافة عميل",
    "empty.createOrder": "إنشاء طلب",

    // Messages
    "message.deleteConfirm": "هل أنت متأكد من حذف هذا العنصر؟",
    "message.productAdded": "تم إضافة المنتج بنجاح",
    "message.productUpdated": "تم تحديث المنتج بنجاح",
    "message.productDeleted": "تم حذف المنتج بنجاح",
    "message.orderAdded": "تم إضافة الطلب بنجاح",
    "message.orderUpdated": "تم تحديث الطلب بنجاح",
    "message.orderDeleted": "تم حذف الطلب بنجاح",
    "message.customerAdded": "تم إضافة العميل بنجاح",
    "message.customerUpdated": "تم تحديث العميل بنجاح",
    "message.customerDeleted": "تم حذف العميل بنجاح",
    "message.error": "حدث خطأ",
    "message.success": "تمت العملية بنجاح",

    // Login
    "login.title": "تسجيل دخول الإدارة",
    "login.password": "كلمة المرور",
    "login.signIn": "تسجيل الدخول",
    "login.invalidPassword": "كلمة مرور غير صحيحة",

    // Language
    "language.english": "English",
    "language.arabic": "العربية",
    "language.switch": "تغيير اللغة",

    // Store
    "store.title": "المتجر",
    "store.cart": "السلة",
    "store.addToCart": "إضافة للسلة",
    "store.quantity": "الكمية",
    "store.variant": "النوع",
    "store.selectVariant": "اختر النوع",
    "store.cartEmpty": "سلتك فارغة",
    "store.cartTotal": "إجمالي السلة",
    "store.checkout": "إتمام الطلب",
    "store.continueShopping": "متابعة التسوق",
    "store.removeFromCart": "إزالة من السلة",
    "store.updateQuantity": "تحديث الكمية",
    "store.clearCart": "إفراغ السلة",

    // Checkout
    "checkout.title": "إتمام الطلب",
    "checkout.customerInfo": "معلومات العميل",
    "checkout.customerName": "الاسم الكامل",
    "checkout.customerPhone": "رقم الهاتف",
    "checkout.customerAddress": "العنوان",
    "checkout.customerHome": "المنزل:",
    "checkout.customerRoad": "الطريق:",
    "checkout.customerBlock": "��لمجمع:",
    "checkout.customerTown": "المنطقة:",
    "checkout.deliveryOptions": "خيارات التسليم",
    "checkout.delivery": "توصيل",
    "checkout.pickup": "استلام",
    "checkout.orderSummary": "ملخص الطلب",
    "checkout.placeOrder": "تأكيد الطلب",
    "checkout.noCreditCard":
      "لا تحتاج بطاقة ائتمان - ادفع عند التسليم/الاستلام",
    "checkout.orderSuccess": "تم تأكيد الطلب بنجاح!",
    "checkout.thankYou": "شكراً لك على طلبك",
    "checkout.orderNumber": "رقم الطلب",
    "checkout.backToStore": "العودة للمتجر",
    "checkout.processingMessage":
      "سيتم معالجة الطلب خلال 1-3 أيام، سنتواصل معك عند التوصيل",
    "checkout.orderSuccessMessage": "شكراً لك على طلبك",
    "checkout.subtotal": "المجموع الفرعي",
    "checkout.deliveryFee": "رسوم التوصيل",
    "checkout.total": "المجموع الكلي",
    "checkout.orderItems": "محتويات الطلب",
    "checkout.paymentMethod": "طريقة الدفع",
    "checkout.cashOnDelivery": "الدفع عند التسليم",
    "checkout.free": "مجاني",
    "checkout.deliveryDescription": "سيتم التوصيل إلى عنوانك",
    "checkout.pickupDescription": "الاستلام من المتجر",

    // Additional store keys
    "store.outOfStock": "نفد المخزون",
    "store.inStock": "متوفر",
    "store.viewDetails": "عرض التفاصيل",
    "store.productDetails": "تفاصيل المنتج",
  },
} as const;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("adminLanguage") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Update document direction and lang attribute
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;

    // Update font family
    const fontFamily =
      language === "ar"
        ? '"Noto Kufi Arabic", sans-serif'
        : '"Funnel Display", sans-serif';
    document.documentElement.style.fontFamily = fontFamily;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("adminLanguage", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
