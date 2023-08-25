import type { NextApiRequest, NextApiResponse } from 'next'

require("dotenv").config()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const data = await fetch(`https://bustime.mta.info/api/siri/vehicle-monitoring.json?key=${process.env.BUS_API}&VehicleMonitoringDetailLevel=calls&LineRef=Q102`)
    .then(res => res.json())

    res.status(200).json(data.Siri.ServiceDelivery.VehicleMonitoringDelivery[0].VehicleActivity.filter((bus: any) => bus.MonitoredVehicleJourney.DestinationName.includes("ASTORIA")))
}


/**
 * import type { NextApiRequest, NextApiResponse } from 'next'

require("dotenv").config()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rawData = await fetch(`http://bustime.mta.info/api/siri/stop-monitoring.json?key=${process.env.BUS_API}&MonitoringRef=450146&?OperatorRef=MTA&?MinimumStopVisitsPerLine=3?DirectionRef=1`)
    .then(res => res.json())

  const filtered = rawData.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit?.filter((stop: any) => stop.MonitoredVehicleJourney.DestinationName.includes("ASTORIA")).map((stop: any) => {
    return {
      destination: stop.DestinationName,
      time: stop.MonitoredCall.AimedArrivalTime,
      distance: stop.MonitoredCall.Extensions.PresentableDistance
    }

  })

  res.status(200).json(rawData)
}

 */