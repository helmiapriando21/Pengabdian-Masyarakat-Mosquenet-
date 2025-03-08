interface CalendarLabelProps {
  label: string
}

export default function CalendarLabel({ label }: CalendarLabelProps) {
    return (
        <div className="bg-[#FFDE72] hover:bg-[#EBBB20] hover:text-white mx-4 px-6 font-bold text-lg rounded-md">
            {label}
        </div>
    );

}