import React from 'react';

interface ResourceBadgeProps {
    icon:string,
    fuel:number,
    credit:number
}
const ResourceBadge = ({ icon, fuel, credit }:ResourceBadgeProps) => {
  return (
    <div className="flex items-center bg-gray-800 text-white px-3 py-1 rounded-full space-x-2 shadow-md">
      {/* Icono */}
      <span className="text-xl">{icon}</span>
      {/* Gasolina */}
      <span className="font-medium">{fuel}:</span>
      {/* Monedas*/}
      <span className="font-bold">{credit}</span>
    </div>
  );
};

export default ResourceBadge;
