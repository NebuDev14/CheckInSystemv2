import type { NextApiRequest, NextApiResponse } from 'next'

require("dotenv").config()

type Data = {
  destination: string;
  time: Date;
  distances: {
    PresentableDistance: string;
    DistanceFromCall: number;
        "StopsFromCall": number;
        "CallDistanceAlongRoute": 144.18
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rawData = await fetch(`http://bustime.mta.info/api/siri/stop-monitoring.json?key=${process.env.BUS_API}&MonitoringRef=450143&?MinimumStopVisitsPerLine=3`)
    .then(res => res.json())

  const filtered = rawData.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit?.at(0).MonitoredVehicleJourney

  res.status(200).json({
    destination: filtered?.DestinationName,
    time: new Date(filtered?.MonitoredCall.AimedArrivalTime as string),
    distances: filtered?.MonitoredCall.Extensions.Distances
  })
}

