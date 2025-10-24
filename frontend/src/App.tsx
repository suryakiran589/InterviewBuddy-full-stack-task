import { BrowserRouter, Route, Routes } from "react-router-dom"
import OrganizationsList from "./pages/OrganizationList"
import OrganizationDetails from "./pages/OrganisationDetails"


function App() {
return  (<>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<OrganizationsList />} />
        <Route path="/organization/:id" element={<OrganizationDetails />} />
      </Routes>
    </BrowserRouter>
</>)

}

export default App
