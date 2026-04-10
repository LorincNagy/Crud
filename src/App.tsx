import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { images } from "./assets/images";
import Footer from "./Footer";
import Header from "./Header";
import AppRouter from "./router/Approuter";

function App() {
  const [bgUrl, setBgUrl] = useState(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  });

  // Szükségünk van az előző képre is, hogy ne fekete legyen alatta
  const [prevBg, setPrevBg] = useState(bgUrl);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgUrl((currentBg) => {
        setPrevBg(currentBg); // Mielőtt váltunk, elmentjük a régit háttérnek
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * images.length);
        } while (images[nextIndex] === currentBg && images.length > 1);
        return images[nextIndex];
      });
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen w-full flex flex-col bg-black">
        {/* ALSÓ RÉTEG: Mindig az előző kép van itt fixen */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${prevBg})` }}
        />

        {/* FELSŐ RÉTEG: Ez úszik be az új képpel */}
        <div
          key={bgUrl}
          className="absolute inset-0 bg-cover bg-center transition-opacity animate-fade-in"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />

        {/* TARTALOM */}
        <div className="relative z-10 flex flex-col min-h-screen">
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
