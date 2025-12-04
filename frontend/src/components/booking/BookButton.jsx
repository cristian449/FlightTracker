import { useState } from "react";
import BookingModal from "./BookingModal.jsx";

export default function BookButton({ flight }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => setOpen(true)}>
                Book
            </button>

            {open && (
                <BookingModal
                    flight={flight}
                    closeModal={() => setOpen(false)}
                />
            )}
        </>
    );
}
