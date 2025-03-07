import RedirectSolution from "./redirectSolution";

export default function SelectMenu({ setMenu, setIsChoose, setSelectedRegisterMenu }: any) {
    return (
        <>
            <button
                onClick={() => {
                    setSelectedRegisterMenu('admin');
                    setIsChoose(true);
                }}
                className="p-[10px] bg-[#6FD365] font-bold uppercase text-white rounded-md"
            >
                Register sebagai admin
            </button>
            <button
                onClick={() => {
                    setSelectedRegisterMenu('jamaah');
                    setIsChoose(true);
                }}
                className="p-[10px] bg-[#6FD365] font-bold uppercase text-white rounded-md"
            >
                Register sebagai jamaah
            </button>
            <RedirectSolution
              question="Sudah punya akun?"
              answer="Klik disini"
              solution={() => {
                setMenu('login');
                setIsChoose(false);
              }}
              textAlign="text-center"
            />
        </>
    );
}