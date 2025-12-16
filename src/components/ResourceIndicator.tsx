
interface ResourceBadgeProps {
    icon: string;
    fuel: number;
    credit: number;
}

const ResourceBadge = ({ icon, fuel, credit }: ResourceBadgeProps) => {
  return (
    <div className="flex items-center bg-black/80 text-white p-3 rounded-xl border border-cyan-500 shadow-lg space-x-4 w-72">
      <span className="text-3xl">
        <img src={icon} alt="20" />
        </span>
      
      <div className="flex-1 space-y-2">
        
        <div className="text-[10px] flex justify-between"><span>CASH</span> <span>${credit}</span></div>
        <div className="h-1.5 w-full bg-gray-700 rounded-full">
          <div className="h-full bg-yellow-400 rounded-full" style={{ width: '100%' }}></div>
        </div>

       
        <div className="text-[10px] flex justify-between"><span>FUEL</span> <span>{fuel}%</span></div>
        <div className="h-1.5 w-full bg-gray-700 rounded-full">
          <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${fuel}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default ResourceBadge;