import { BrowserRouter } from 'react-router-dom';
import './scss/index.scss';

import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container"></div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
