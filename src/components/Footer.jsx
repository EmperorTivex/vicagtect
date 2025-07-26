function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-black py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-6 text-sm">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-orange-600 mb-2">
            Vicagtect Nigeria Ltd.
          </h2>
          <p className="text-gray-700">Where Housing Meets Trust.</p>
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-2"> Quick Links </h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:text-orange-600">
                {" "}
                Home{" "}
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-orange-600">
                {" "}
                About Us
              </a>
            </li>
            <li>
              <a href="/estates" className="hover:text-orange-600">
                Our Estates
              </a>
            </li>
            <li>
              <a href="/draw-and-build" className="hover:text-orange-600">
                {" "}
                Draw & Build
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-orange-600">
                {" "}
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-2"> Contact</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:vicagtectnigerialimited@gmail.com"
              className="text-orange-600 hover:underline"
            >
              {" "}
              vicagtectnigerialimited@gmail.com{" "}
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:+2348035021494"
              className="text-orange-600 hover:underline"
            >
              {" "}
              +2348035021494
            </a>
          </p>
          <p>Location: Ogun & Lagos State, Nigeria</p>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Vicagtect Nigeria Ltd. All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
