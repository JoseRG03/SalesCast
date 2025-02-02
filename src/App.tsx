import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import LoginPage from "@/pages/login";
import CalendarPage from "@/pages/calendar";
import NotFoundPage from "@/pages/not-found";

function App() {
  return (
    <Routes>
      <Route element={<NotFoundPage />} path="*" />
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<CalendarPage />} path="/calendar"/>
    </Routes>
  );
}

export default App;
