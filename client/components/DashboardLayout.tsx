import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  BarChart3,
  LogOut,
  Menu,
  X,
  Languages,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const getNavigation = (t: (key: string) => string) => [
  { name: t("nav.dashboard"), href: "/admin/", icon: LayoutDashboard },
  { name: t("nav.products"), href: "/admin/products", icon: Package },
  { name: t("nav.orders"), href: "/admin/orders", icon: ShoppingCart },
  { name: t("nav.customers"), href: "/admin/customers", icon: Users },
  { name: t("nav.revenue"), href: "/admin/revenue", icon: TrendingUp },
  { name: t("nav.analytics"), href: "/admin/analytics", icon: BarChart3 },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const { language, setLanguage, isRTL, t } = useLanguage();
  const location = useLocation();

  const navigation = getNavigation(t);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isRTL ? "right-0" : "left-0",
          sidebarOpen
            ? "translate-x-0"
            : isRTL
              ? "translate-x-full"
              : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 [dir=rtl]:flex-row-reverse">
          <div className="flex items-center gap-3 [dir=rtl]:flex-row-reverse">
            <img
              src={
                language === "ar"
                  ? "https://cdn.builder.io/api/v1/image/assets%2F82efd381682b4c5f90191340367e0cd7%2F6b2c342f55b24cd1ab05853aa15523c9?format=webp&width=800"
                  : "https://cdn.builder.io/api/v1/image/assets%2F82efd381682b4c5f90191340367e0cd7%2F72cfed7b1096405dbe2a7a56980b2907?format=webp&width=800"
              }
              alt="Azhar Store Logo"
              className="h-10 w-auto max-w-[120px] object-contain"
            />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors [dir=rtl]:flex-row-reverse [dir=rtl]:text-right [dir=ltr]:text-left",
                      isActive
                        ? "bg-dashboard-primary text-white"
                        : "text-gray-700 hover:bg-gray-100",
                    )}
                  >
                    <item.icon
                      className={cn("w-5 h-5", isRTL ? "ml-3" : "mr-3")}
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 space-y-2">
          <Button
            onClick={toggleLanguage}
            variant="outline"
            className="w-full justify-start [dir=rtl]:justify-end [dir=rtl]:flex-row-reverse"
          >
            <Languages className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
            {t("language.switch")}
          </Button>
          <Button
            onClick={logout}
            variant="outline"
            className="w-full justify-start [dir=rtl]:justify-end [dir=rtl]:flex-row-reverse"
          >
            <LogOut className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
            {t("nav.logout")}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4 [dir=rtl]:flex-row-reverse">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 [dir=rtl]:text-right [dir=ltr]:text-left">
              {t("dashboard.title")}
            </h1>
            <div className="w-6" /> {/* Spacer */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
