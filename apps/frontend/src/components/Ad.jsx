import { createPortal } from "react-dom";

export default function Ad() {
    return createPortal(
        <>
            <p>
                Na kraju mjeseca (30.09.2024. u 23:59), najbolji igrač osvaja McFlurry!
            </p>
        </>,
        document.getElementById("ad")
    );
}
