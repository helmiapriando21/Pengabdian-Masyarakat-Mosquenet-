interface CardNavigationProps {
  action: React.MouseEventHandler;
  label: string;
}

export default function CardNavigation({action, label}: CardNavigationProps){
  return (
    <div 
      className="flex sm:min-w-40 w-full h-20 sm:w-max sm:min-h-full px-3 py-2 items-center justify-center bg-green-300 rounded-lg hover:bg-green-500 shadow-lg "
      onClick={action}
    >
      <p className="font-bold text-black text-center">{label}</p>
    </div>
  );
}