import type { NextApiRequest, NextApiResponse } from 'next'

import { google } from "googleapis";
require("dotenv").config()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const inst = google.calendar({
    version: "v3",
    auth: process.env.CAL_KEY
  })

  inst.events.list({
    calendarId: "nycfirst.org_tj6mah4fu3tup7871n70mlva88@group.calendar.google.com",
    orderBy: "startTime",
    // timeMin: `${new Date().getUTCFullYear()}{-${new Date().getMonth() + 1}-${new Date().getUTCDate()}T00:00:00Z`,
    // timeMax: `${new Date().getUTCFullYear()}-${new Date().getMonth() + 1}-${new Date().getUTCDate()}T23:59:00Z`,
    timeMin: `2023-9-1T00:00:00Z`,
    timeMax: `2023-9-1T23:59:00Z`,
    maxResults: 10,
    singleEvents: true,
  }, (e, resp) => {

    const data = resp?.data.items?.map((event: any) => {
      return {
        name: event.summary,
        start: event.start.dateTime,
        end: event.end.dateTime
      }
    })
    res.status(200).send(data)
  })

}