
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CafeListContext = createContext(null);

export function CafeListProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cafe-list")) || [];
    } catch {
      return [];
    }
  });

  // Save data automatically
  useEffect(() => {
    localStorage.setItem("cafe-list", JSON.stringify(items));
  }, [items]);

  // Add product
  const addToList = (product) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.name === product.name
      );

      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Increase quantity
  const increaseQuantity = (name) => {
    setItems((prev) =>
      prev.map((item) =>
        item.name === name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (name) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product
  const removeItem = (name) => {
    setItems((prev) =>
      prev.filter((item) => item.name !== name)
    );
  };

  // Clear all products
  const clearList = () => setItems([]);

  // Total quantity
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  // Total amount
  const totalPrice = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [items]
  );

  return (
    <CafeListContext.Provider
      value={{
        items,
        addToList,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearList,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CafeListContext.Provider>
  );
}

export function useCafeList() {
  const context = useContext(CafeListContext);

  if (!context) {
    throw new Error(
      "useCafeList must be used inside CafeListProvider"
    );
  }

  return context;
}
