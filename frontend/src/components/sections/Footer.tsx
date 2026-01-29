const Footer = () => {
  return (
    <div>
      <footer className="relative z-10 py-8 border-t border-zinc-900 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-zinc-600 text-sm">
          <p>
            © {new Date().getFullYear()} IPU Ranks. Not affiliated with GGSIPU
            directly.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
