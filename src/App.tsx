import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import AppRouter from "./router/Approuter";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen flex-col">
        <Header />
        <main className="grow">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
