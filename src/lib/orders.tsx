import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type OrderStatus = "placed" | "processing" | "shipped" | "out-for-delivery" | "delivered";

export type DemoOrder = {
  orderNumber: string;
  trackingNumber: string;
  productSlug?: string;
  productName?: string;
  createdAt: string;
  status: OrderStatus;
};

type OrdersValue = {
  orders: DemoOrder[];
  saveOrder: (order: DemoOrder) => void;
  findByTracking: (trackingNumber: string) => DemoOrder | undefined;
};

const STORAGE_KEY = "shanzen-orders";
const OrdersContext = createContext<OrdersValue | null>(null);

function readOrders(): DemoOrder[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((order) => order && typeof order.trackingNumber === "string");
  } catch {
    return [];
  }
}

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<DemoOrder[]>([]);

  useEffect(() => {
    setOrders(readOrders());
  }, []);

  const saveOrder = useCallback((order: DemoOrder) => {
    setOrders((prev) => {
      const next = [order, ...prev.filter((item) => item.trackingNumber !== order.trackingNumber)].slice(0, 25);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore storage failures */
      }
      return next;
    });
  }, []);

  const findByTracking = useCallback(
    (trackingNumber: string) => {
      const normalized = trackingNumber.trim().toUpperCase();
      return orders.find((order) => order.trackingNumber.toUpperCase() === normalized);
    },
    [orders],
  );

  const value = useMemo(() => ({ orders, saveOrder, findByTracking }), [orders, saveOrder, findByTracking]);
  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders(): OrdersValue {
  const ctx = useContext(OrdersContext);
  if (!ctx) {
    return { orders: [], saveOrder: () => {}, findByTracking: () => undefined };
  }
  return ctx;
}

export const trackingStages: Array<{ status: OrderStatus; title: string; detail: string }> = [
  { status: "placed", title: "Order placed", detail: "Your order has been received and confirmed." },
  { status: "processing", title: "Preparing your order", detail: "Your items are being picked and packed." },
  { status: "shipped", title: "Shipped", detail: "Your package has left the fulfillment facility." },
  { status: "out-for-delivery", title: "Out for delivery", detail: "Your package is on the way to your address." },
  { status: "delivered", title: "Delivered", detail: "Your package has been delivered." },
];

export function getStageIndex(status: OrderStatus) {
  return trackingStages.findIndex((stage) => stage.status === status);
}
