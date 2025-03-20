// Import SweetAlert2 CDN in HTML or via npm
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

// ✅ Success Alert
export function showSuccessAlert(message, title = 'Success') {
    window.Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        position: 'top-end'
    });
}

// ✅ Error Alert
export function showErrorAlert(message, title = 'Error') {
    window.Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        position: 'top-end'
    });
}

// ✅ Info Alert
export function showInfoAlert(message, title = 'Info') {
    window.Swal.fire({
        icon: 'info',
        title: title,
        text: message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        position: 'top-end'
    });
}
