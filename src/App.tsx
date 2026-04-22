import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { images } from "./assets/images";
import Footer from "./Footer";
import Header from "./Header";
import AppRouter from "./router/Approuter";

function App() {
  const [bgUrl, setBgUrl] = useState<string>(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  });

  // Szükségünk van az előző képre is, hogy ne fekete legyen alatta
  const [prevBg, setPrevBg] = useState<string>(bgUrl);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgUrl((currentBg: string) => {
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

  // Segédfüggvény a tartalom típusának eldöntéséhez
  const renderBackground = (url: string) => {
    const isVideo = url.toLowerCase().endsWith(".mp4");

    if (isVideo) {
      return (
        <video
          src={url}
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      );
    }

    return (
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${url})` }}
      />
    );
  };

  return (
    <BrowserRouter>
      <div className="relative min-h-screen w-full flex flex-col bg-black overflow-hidden">
        {/* ALSÓ RÉTEG */}
        <div>{renderBackground(prevBg)}</div>

        {/* FELSŐ RÉTEG (Animált) */}
        <div key={bgUrl} className="animate-fade-in z-0">
          {renderBackground(bgUrl)}
        </div>

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
