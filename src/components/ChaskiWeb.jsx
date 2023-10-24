import React from 'react';

export default function ChaskiWeb({ id }) {
  return (
    
    <iframe className="w-[75%] h-[1200px] mx-auto scale-75 " src={`https://atari.chazki.com/#/public/seguimiento/1/${id}`} />
    
  );
}
