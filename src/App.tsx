
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LandingPage } from './pages/landing/landing'
import ListPage from './pages/notelist/notelist'

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/notes" element={<ListPage />} />
    </Routes>
  </Router>
  )
}

export default App
