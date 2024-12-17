const Header = () => {
  return (
    <header className="app-header bg-gradient-to-r from-blue-500 to-red-700 p-8 shadow-lg">
      <h1 className="text-center text-3xl font-bold text-white tracking-wide uppercase">
        T Cell Prediction - <span className="text-yellow-300">Class I</span>
      </h1>
      <p className="text-center text-white mt-2 text-sm italic">
        Analyze MHC-peptide binding predictions with cutting-edge models
      </p>
    </header>
  );
};

export default Header;
