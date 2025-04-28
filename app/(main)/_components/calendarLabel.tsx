interface CalendarLabelProps {
  label: string
}

export default function CalendarLabel({ label }: CalendarLabelProps) {
    return (
        <div className="bg-[#FFDE72] hover:bg-[#EBBB20] hover:text-white mx-1 px-2 sm:px-6 font-bold text-[10px] sm:text-lg rounded-md">
            {label}
        </div>
    );

}