import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExperimentDetail from './pages/ExperimentDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experiment/:id" element={<ExperimentDetail />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 border-t border-gray-700 py-8 text-center text-gray-500 text-sm">
          <p>© 2026 CloudLab Prep Portal. Built for BCT Cloud Computing Lab Exam.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
