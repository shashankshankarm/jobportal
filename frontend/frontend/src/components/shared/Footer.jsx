import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -translate-y-32 translate-x-32 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800 rounded-full translate-y-48 -translate-x-48 opacity-10"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  Job Hunt
                </h2>
                <p className="text-blue-100 text-lg mb-4 max-w-md">
                  Your trusted partner in finding the perfect career opportunity. 
                  Connect with top employers and build your dream career.
                </p>
                <div className="flex items-center space-x-2 text-blue-100">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2z"/>
                    <path d="M13 7h-2v5l4.28 2.54.72-1.21-3.5-2.08V7z"/>
                  </svg>
                  <span className="text-sm">Available 24/7 for job seekers</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/jobs" className="text-blue-100 hover:text-white transition-colors duration-300">Browse Jobs</a></li>
                <li><a href="/companies" className="text-blue-100 hover:text-white transition-colors duration-300">Companies</a></li>
                <li><a href="/about" className="text-blue-100 hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="/contact" className="text-blue-100 hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-2">
                <li><a href="/help" className="text-blue-100 hover:text-white transition-colors duration-300">Help Center</a></li>
                <li><a href="/privacy" className="text-blue-100 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="/terms" className="text-blue-100 hover:text-white transition-colors duration-300">Terms of Service</a></li>
                <li><a href="/faq" className="text-blue-100 hover:text-white transition-colors duration-300">FAQ</a></li>
              </ul>
            </div>
          </div>


        </div>

        {/* Bottom Footer */}
        <div className="mt-8 pt-8 border-t border-blue-500 bg-blue-800/30">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              
              {/* Copyright */}
              <div className="mb-4 md:mb-0">
                <p className="text-blue-100 text-sm">
                  © 2024 Job Hunt. All rights reserved. | Made with ❤️ for job seekers
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  className="bg-blue-500/20 hover:bg-blue-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110" 
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
                  </svg>
                </a>
                
                <a 
                  href="https://x.com" 
                  className="bg-blue-500/20 hover:bg-blue-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110" 
                  aria-label="X (Twitter)"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                
                <a 
                  href="https://linkedin.com" 
                  className="bg-blue-500/20 hover:bg-blue-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110" 
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
                  </svg>
                </a>
                
                <a 
                  href="https://instagram.com" 
                  className="bg-blue-500/20 hover:bg-blue-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110" 
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;