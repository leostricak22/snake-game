import { createPortal } from "react-dom";

export default function Credit() {
    return createPortal(
        <>
            <p>
                Made by <u>@leostricak22</u>
            </p>
        </>,
        document.getElementById("credit")
    );
}
