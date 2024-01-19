import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header>
      <div className="container header-container">
        <img src={logo} alt="logo Deliveroo" className="header-logo" />
      </div>
    </header>
  );
};

export default Header;
