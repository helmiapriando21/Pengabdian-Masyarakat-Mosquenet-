import Swal from "sweetalert2";

const confirmAlert = async (message: string, confirmationMessage: string, cancelMessage: string) => {
    const confirm = await Swal.fire({
        title: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#308526',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmationMessage,
        cancelButtonText: cancelMessage,
    }).then((result) => {
      if(result.isConfirmed) return true;
      else return false;
    })
      .catch(() => false);

    return confirm;
}

export default confirmAlert;