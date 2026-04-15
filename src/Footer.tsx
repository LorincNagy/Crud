function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 p-6 text-center relative overflow-hidden">
      {/* Vékony neon vonal a footer tetején, hogy meglegyen az összhang a Headerrel */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent"></div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-cyan-500 font-black text-2 rem  uppercase italic">
          Family Todo <span className="text-slate-200 font-light">App</span>
        </p>

        <p className="text-1rem text-slate-200 uppercase tracking-widest font-bold">
          &copy; {new Date().getFullYear()} — System Operational
        </p>
      </div>

      {/* Kis dekorációs elem: egy halvány cián ragyogás a sarkokban */}
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-cyan-500/5 blur-[50px]"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-cyan-500/5 blur-[50px]"></div>
    </footer>
  );
}

export default Footer;
