import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Posts from "./pages/Posts";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import styles from "./App.module.css";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
