import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import AppRouter from "./router/Approuter";

function App() {
  const bgUrl =
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=3840";

  return (
    <BrowserRouter>
      <div
        className="flex min-h-screen flex-col bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="grow p-4 md:p-8">
            <AppRouter />
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
