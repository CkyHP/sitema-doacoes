import React from "react";
import FazerDoacao from "./components/FazerDoacao";
import Navbar from "./components/Navbar";

function Doar() {
  return (
    <div>
        <Navbar />
      <h1 className="text-3xl font-bold text-[#00df9a]">Doar Alimentos</h1>
      <FazerDoacao />
    </div>
  );
}

export default Doar;