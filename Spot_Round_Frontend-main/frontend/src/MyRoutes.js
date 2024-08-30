import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Admportal from "./Pages/admportal";
import Collpred from "./Pages/Collpred";
import LoginForm from "./LoginPage";
export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admportal" element={<Admportal />} />
      <Route path="/collpred" element={<Collpred />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}
