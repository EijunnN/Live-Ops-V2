import React, { useEffect, useState } from "react";


export default function WazeIframe({ trackcode }) {
  const [isCopied, setIsCopied] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [notes, setNotes] = useState("");
  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [track, setTrack] = useState("");
  const contentRef = React.createRef();

  const handleCopyToClipboard = () => {
    const contentToCopy = contentRef.current;
    const range = document.createRange();
    range.selectNode(contentToCopy);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
      document.execCommand("copy");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000); // Muestra "Copiado" durante 2 segundos
    } catch (err) {
      console.error("No se pudo copiar el texto al portapapeles: ", err);
    }

    window.getSelection().removeAllRanges();
  };

  useEffect(() => {
    const apiUrl = `https://atariboxcore.chazki.com:8443/ataribox-core/api/order/find/1/${trackcode}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw Error("Error en la solicitud: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.map && data.map.order) {
          const lat = data.map.order.distanceDirect.latShip;
          const lon = data.map.order.distanceDirect.lngShip;
          const urlWaze = `https://embed.waze.com/es/iframe?zoom=16&lat=${lat}&lon=${lon}&pin=1`;
          const vehicle = data.map.order.requestedVehicleType;
          const notes = data.map.order.notes;
          const client = data.map.order.clientDto.name;
          const phone = data.map.order.clientDto.phone;
          const track = data.map.order.trackCode; 

          setIframeUrl(urlWaze);
          setVehicle(vehicle);
          setNotes(notes);
          setClient(client);
          setPhone(phone);
          setTrack(track);
        }
      })
      .catch((error) => {
        console.error("Ocurrió un error:", error.message);
      });
  }, [trackcode]);

  return (
    <div  id="agregar" >
      {vehicle && notes && client && phone && (
        <div ref={contentRef} className="bg-white p-2   rounded-lg shadow-md space-y-2 w-[800px]">
          <p className="font-bold text-xl mb-4">Datos del trackCode ATARI</p>
          <p>TrackCode: {track}</p>
          <p>Vehiculo: {vehicle}</p>
          <p className="max-w-[32ch] lg:max-w-[64ch] inline-block truncate">Notas: {notes}</p>
          <p>Nombre de contacto: {client}</p>
          <p>Telefono de contacto: {phone}</p>
          
        </div>
      )}
      {vehicle && notes && client && phone && (
      <button onClick={handleCopyToClipboard} className="bg-purple-950 hover:bg-purple-600 hover:text-white border border-white transition-all hover:translate-y-1 hover:translate-x-1  duration-500 hover:scale-105 text-white font-semibold py-2 px-4 rounded-lg">
          {isCopied ? "Copiado" : "Copiar al portapapeles"}
        </button>
      )}
      {vehicle && notes && client && phone && (
        <div className="flex items-center justify-center w-[800px]" >
          <iframe src={iframeUrl} className="scale-90 w-[800px] h-[500px]"  />
        </div>
      )}
    </div>
  );
}
