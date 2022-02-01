// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import admin from './firebase'
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  console.log(req.body)
  if (req.method === 'POST') {
    const { token, uuid } = req.body
    const message = {
      data: { uuid },
      token
    };

    try {
      const response = await admin.messaging().send(message)
      return res.status(200).json(response)
    } catch (e) {
      console.log(e)
    }
  } else {
    return res.status(200)
  }
}
