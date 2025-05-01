import Swal, { SweetAlertIcon } from "sweetalert2";

const notificationAlert = async (message: string, icon: SweetAlertIcon, action: () => void) => {
    await Swal.fire({
        title: message,
        icon: icon,
        showConfirmButton: false,
        toast: true,
        timer: 1500,
    }).then(() => {
        action()
    });
}

export default notificationAlert;