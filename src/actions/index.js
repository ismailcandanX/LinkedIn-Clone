import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider).then((payload) => {
            console.log(payload)
        }).catch((error) => {
            console.log(error)
        })
    }
}