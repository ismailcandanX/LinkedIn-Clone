import { auth, provider } from "../firebase";
import db from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";


export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
})

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
})

export const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload,
})

export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider).then((payload) => {
            dispatch(setUser(payload.user))
        }).catch((error) => alert(error.message))
    }
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user))
            }
        })
    }
}

export function signOutAPI() {
    return (dispatch) => {
        signOut(auth).then(() => {
            dispatch(setUser(null))
        }).catch((error) => console.log(error))
    }
}

export function postArticleAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true))

        if (payload.image != "") {
            const storage = getStorage();
            const metadata = {
                contentType: 'image/jpeg'
            };
            const storageRef = ref(storage, 'images/' + payload.image.name);
            const uploadTask = uploadBytesResumable(storageRef, payload.image, metadata);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + `${progress}` + '% done');
                    if (snapshot.state === "RUNNING") {
                        console.log(`Progress: ${progress}`);
                    }
                },
                (error) => console.log(error),
                async () => {
                    const downloadURL = await getDownloadURL(storageRef);

                    const docRef = await addDoc(collection(db, "articles"), {
                        actor: {
                            description: payload.user.email,
                            title: payload.user.displayName,
                            date: payload.timestamp,
                            image: payload.user.photoURL,
                        },
                        video: payload.video,
                        sharedImg: downloadURL,
                        comments: 0,
                        description: payload.description,
                    });
                    dispatch(setLoading(false))
                }
            );
        } else if (payload.video) {
            addDoc(collection(db, "articles"), {
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                video: payload.video,
                sharedImg: "",
                comments: 0,
                description: payload.description,
            });
            dispatch(setLoading(false))
        }
    }
}

export function getArticlesAPI() {
    return (dispatch) => {
        let payload;
        const q = query(collection(db, 'articles'))
        const unsub = onSnapshot(q, (querySnapshot) => {
            payload = querySnapshot.docs.map((doc) => doc.data())
            dispatch(getArticles(payload))
        });
    }
}