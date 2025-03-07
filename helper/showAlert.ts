import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Swal, { SweetAlertIcon } from "sweetalert2";

const showAlert = async (message: string, router: AppRouterInstance, icon: SweetAlertIcon, redirectTo: string) => {
    await Swal.fire({
        title: message,
        icon: icon,
        showConfirmButton: false,
        toast: true,
        timer: 1500,
    }).then(() => {
        if (typeof window !== "undefined" && icon === "success" && redirectTo !== '/verification' && redirectTo !== '/this-page') {
            router.push(redirectTo);
        } else if(redirectTo === '/this-page') {
          window.location.reload();
        }
    });
}

export default showAlert;