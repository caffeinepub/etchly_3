import React, { createContext, useContext } from 'react';
import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartSidebar } from './components/CartSidebar';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ArtisanStoryPage } from './pages/ArtisanStoryPage';
import { OrderConciergePage } from './pages/OrderConciergePage';
import { useCart } from './hooks/useCart';

// Cart context
interface CartContextType {
  addItem: ReturnType<typeof useCart>['addItem'];
}
const CartContext = createContext<CartContextType>({ addItem: () => {} });
export const useCartContext = () => useContext(CartContext);

// Layout component
function Layout() {
  const cart = useCart();

  return (
    <CartContext.Provider value={{ addItem: cart.addItem }}>
      <div className="min-h-screen bg-etchly-white flex flex-col">
        <Header cartCount={cart.items.length} onCartOpen={() => cart.setIsOpen(true)} />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
        <CartSidebar
          isOpen={cart.isOpen}
          onClose={() => cart.setIsOpen(false)}
          items={cart.items}
          subtotal={cart.subtotal}
          onRemove={cart.removeItem}
        />
      </div>
    </CartContext.Provider>
  );
}

// Routes
const rootRoute = createRootRoute({ component: Layout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/catalog',
  component: CatalogPage,
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$id',
  component: ProductDetailPageWrapper,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: ArtisanStoryPage,
});

const trackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/track',
  component: OrderConciergePage,
});

function ProductDetailPageWrapper() {
  const { addItem } = useCartContext();
  return (
    <ProductDetailPage
      onAddToBag={item => addItem(item)}
    />
  );
}

const routeTree = rootRoute.addChildren([
  homeRoute,
  catalogRoute,
  productDetailRoute,
  aboutRoute,
  trackRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
