
interface ResourceBadgeProps {
    icon: string;
    fuel: number;
    credit: number;
}

const ResourceBadge = ({ icon, fuel, credit }: ResourceBadgeProps) => {
  return (
    <div className="resourceBadge">
      <span className="text-3xl">
        <img id="img" src={icon} alt="" />
        </span>
      
      <div className="flex-1 space-y-2">
        <div className="text-[10px] flex justify-between"><span>CASH</span> <span>${credit}</span></div>
        <div className="text-[10px] flex justify-between"><span>FUEL</span> <span>{fuel}%</span></div>
        
      </div>
    </div>
  );
};

export default ResourceBadge;