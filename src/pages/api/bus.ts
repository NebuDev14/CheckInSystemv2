import type { NextApiRequest, NextApiResponse } from 'next'

require("dotenv").config()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const data = await fetch(`https://bustime.mta.info/api/siri/vehicle-monitoring.json?key=${process.env.BUS_API}&VehicleMonitoringDetailLevel=calls&LineRef=Q102`)
    .then(res => res.json())

    res.status(200).json(data)
}
