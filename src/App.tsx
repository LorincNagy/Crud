import { BrowserRouter } from "react-router-dom";
import backgroundImage from "./assets/japan.jpg";
import Footer from "./Footer";
import Header from "./Header";
import AppRouter from "./router/Approuter";

function App() {
  return (
    <BrowserRouter>
      <div
        className="flex h-screen flex-col bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Header />
        <main className="grow p-4">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
