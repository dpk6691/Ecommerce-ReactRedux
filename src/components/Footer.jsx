import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-200">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a
          href="#"
          className="text-xl font-bold text-slate-500 hover:text-slate-400"
        >
          Brand
        </a>
        <p className="py-2 text-slate-500 sm:py-0">All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
