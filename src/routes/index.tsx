import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";
import Layout from "../Layout";
import EditProject from "../pages/EditProject";
import { Provider } from "../Provider";



function Router() {
  return (
    <Provider>
      <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/edit-project/:id" element={<EditProject />} />
              </Routes>
            </Layout>
        </BrowserRouter>
    </Provider>
   
  )
}

export default Router