import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import IndexPage from "@/pages/index";
import LoginPage from "@/pages/login";
import CalendarPage from "@/pages/calendar";
import NotFoundPage from "@/pages/not-found";
import OrderPage from "@/pages/order";

function App() {
  const qClient = new QueryClient({
    defaultOptions: {
      queries: { refetchInterval: 1800000, refetchOnWindowFocus: false },
    },
  });

  return (
    <QueryClientProvider client={qClient}>
      <Routes>
        <Route element={<NotFoundPage />} path="*" />
        <Route element={<IndexPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<CalendarPage />} path="/calendar" />
        <Route element={<OrderPage />} path="/order/:orderId" />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
