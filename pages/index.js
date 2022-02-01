import React, { useEffect, useState } from 'react'
import firebase from "firebase/app";
import "firebase/messaging";
import { v4 as uuidv4 } from 'uuid';

import { firebaseCloudMessaging } from '../utils/webPush'
import axios from 'axios';

function App() {
  const [notifications, setNotifications] = useState([])
  const [token, setTokenShared] = useState(null)

  useEffect(() => {
    setToken()

    const messaging = firebase.messaging();
    messaging.onMessage((payload) => {
      console.log(notifications)
      setNotifications([...notifications, payload])
    });

    async function setToken() {
      const token = await firebaseCloudMessaging.init()
      if (token) {
        setTokenShared(token)
      }
    }
  })

  const sendNotification = async () => {
    await axios.post('/api/hello', { token, uuid: uuidv4() })
  }

  return (
    <>
      <button onClick={sendNotification}>Send Notification</button>
      <div>
        {notifications.length}
      </div>
    </>
  )
}
export default App