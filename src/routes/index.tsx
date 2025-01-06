import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";
import Layout from "../Layout";
import EditProject from "../pages/EditProject";

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
        </Routes>
      </Layout>
  </BrowserRouter>
  )
}

export default Router