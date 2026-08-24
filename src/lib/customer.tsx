import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  provider: "google" | "apple" | "email";
};

type CustomerContextValue = {
  customer: Customer | null;
  setCustomer: (customer: Customer) => void;
  signOut: () => void;
};

const STORAGE_KEY = "shanzen-customer";
const CustomerContext = createContext<CustomerContextValue | null>(null);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomerState] = useState<Customer | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        typeof parsed.firstName === "string" &&
        typeof parsed.lastName === "string" &&
        typeof parsed.email === "string" &&
        ["google", "apple", "email"].includes(parsed.provider)
      ) {
        setCustomerState(parsed as Customer);
      }
    } catch {
      /* ignore invalid local storage */
    }
  }, []);

  const setCustomer = useCallback((next: Customer) => {
    setCustomerState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore storage failures */
    }
  }, []);

  const signOut = useCallback(() => {
    setCustomerState(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ customer, setCustomer, signOut }), [customer, setCustomer, signOut]);
  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}

export function useCustomer(): CustomerContextValue {
  const ctx = useContext(CustomerContext);
  if (!ctx) {
    return {
      customer: null,
      setCustomer: () => {},
      signOut: () => {},
    };
  }
  return ctx;
}
