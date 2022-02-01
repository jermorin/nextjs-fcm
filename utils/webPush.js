import 'firebase/messaging'
import firebase from 'firebase/app'
import localforage from 'localforage'

const firebaseConfig = {
    apiKey: "AIzaSyACQfm6qaPluVIDGS6pW2LU2dj5mrBAxmQ",
    authDomain: "poc-firebase-ea72e.firebaseapp.com",
    projectId: "poc-firebase-ea72e",
    storageBucket: "poc-firebase-ea72e.appspot.com",
    messagingSenderId: "356250369617",
    appId: "1:356250369617:web:fd3b1f845591b8742bc270"
};

const firebaseCloudMessaging = {
    //checking whether token is available in indexed DB
    tokenInlocalforage: async () => {
        return localforage.getItem('fcm_token')
    },
    //initializing firebase app
    init: async function () {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);

            try {
                const messaging = firebase.messaging()
                const tokenInLocalForage = await this.tokenInlocalforage()
                //if FCM token is already there just return the token
                if (tokenInLocalForage !== null) {
                    return tokenInLocalForage
                }
                //requesting notification permission from browser
                const status = await Notification.requestPermission()
                if (status && status === 'granted') {
                    //getting token from FCM
                    const fcm_token = await messaging.getToken({
                        vapidKey: 'BCx0ekEyxHmjP_dH-4xg0JxtbsspvadOl2kpITvYYdcgmQv-wBsS8ms6eyXv8C8ZoKybL7J6g9AvBYOANa4BLRo'
                    })
                    console.log(fcm_token)
                    if (fcm_token) {
                        //setting FCM token in indexed db using localforage
                        localforage.setItem('fcm_token', fcm_token)
                        console.log('fcm token', fcm_token)
                        //return the FCM token after saving it
                        return fcm_token
                    }
                }
            } catch (error) {
                console.error(error)
                return null
            }
        }
    }
}
export { firebaseCloudMessaging }