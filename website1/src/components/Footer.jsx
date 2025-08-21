function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4" style={{ width: '100%', position: 'relative', left: 0, margin: 0, padding: 0 }}>
      <div className="row text-center text-md-left m-0 p-0">
        <div className="row align-items-center m-0 p-0">
          
          {/* Logo & About */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">BagVerse</h5>
            <p>Your one-stop destination for stylish, modern, and durable bags for every occasion. Travel light, travel right!</p>
          </div>

          {/* Products */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Products</h5>
            <p><a href="/" className="text-white text-decoration-none">Backpacks</a></p>
            <p><a href="/" className="text-white text-decoration-none">Handbags</a></p>
            <p><a href="/" className="text-white text-decoration-none">Laptop Bags</a></p>
            <p><a href="/" className="text-white text-decoration-none">Travel Bags</a></p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Quick Links</h5>
            <p><a href="/About " className="text-white text-decoration-none">About </a></p>
            <p><a href="/Contact " className="text-white text-decoration-none">Contact</a></p>
            <p><a href="/Wishlist" className="text-white text-decoration-none">Wishlist</a></p>
            <p><a href="Cart" className="text-white text-decoration-none">Cart</a></p>
          </div>

          {/* Contact */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
            <p><i className="fas fa-home me-3"></i> Rawalpindi, Pakistan</p>
            <p>
              <i className="fas fa-envelope me-3"></i>
              <a href="mailto:info@bagverse.com" className="text-white text-decoration-none">
                info@bagverse.com
              </a>
            </p>
            <p><i className="fas fa-phone me-3"></i> +92 300 1234567</p>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Social icons & Copyright */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p>© {new Date().getFullYear()} <strong className="text-warning">BagVerse</strong> — All rights reserved.</p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-right">
              <a href="/" className="text-white me-4"><i className="fab fa-facebook-f"></i></a>
              <a href="/" className="text-white me-4"><i className="fab fa-twitter"></i></a>
              <a href="/" className="text-white me-4"><i className="fab fa-instagram"></i></a>
              <a href="/" className="text-white"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
