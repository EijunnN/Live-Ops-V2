import React, { useState  } from "react";
import ChaskiWeb from "./components/ChaskiWeb";
import WazeIframe from "./components/WazeIframe";
import useChaski from "./hooks/useChazkitest2";

export default function App() {
  const [search, setSearch] = useState("");
  
  
  const link = useChaski(search);

  const handleCopyToClipboard = () => {
    if (link) {
      const copyText = `Datos del trackCode TONY\n${link.dropNotes}\nNombre de contacto: ${link.dropContactName}\nTeléfono de contacto: ${link.dropContactPhone}`;
      navigator.clipboard.writeText(copyText).then(() => {
        console.log("Texto copiado al portapapeles");
      });
    }
  };

  return (
    <> 
      
      <div className="w-[350px] flex justify-center m-auto mt-[80px] " >
        <img src="public/logo-chazki.png" alt="logo" />
      </div>
      <div className="flex  items-center space-y-4">
        <ChaskiWeb key={search} id={search} className="w-[75%] h-[100%]" />
      
      <div className="space-y-4">
      <input
          placeholder="Ingrese el trackcode"
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className=" absolute top-[220px] right-[400px] m-2 border border-blue-950 rounded-lg p-2 w-64 md:w-96 focus:ring focus:ring-blue-300 focus:outline-none transform transition-transform hover:-translate-y-1  "
          value={search}
        />
        {link && (
          <div className="bg-white p-2   rounded-lg shadow-md space-y-2 w-[800px]">
            <p className="font-bold text-xl">Datos del trackCode TONY</p>
            <p>TrackCode: {link.trackCode}</p>
            <p className=" max-w-[32ch] lg:max-w-[64ch] inline-block truncate">Notas : {link.dropNotes}</p>
            <p>Nombre de contacto: {link.dropContactName}</p>
            <p>Teléfono de contacto: {link.dropContactPhone}</p>
            <button
              onClick={handleCopyToClipboard}
              
              className="bg-black hover:bg-white hover:text-black border border-black transition-all hover:translate-y-1 hover:translate-x-1  duration-500 hover:scale-105 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Copiar al portapapeles
            </button>
          </div>
        )}
        <WazeIframe trackcode={search} />
      </div>
      </div>
      
    </>
  );
}
