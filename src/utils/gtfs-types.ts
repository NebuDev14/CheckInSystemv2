export type TripUpdate = {
  trip: {
    tripId: string;
  };

  stopTimeUpdate: {
    stopSequence: number;
    departure?: {
      time: string;
    };
    arrival?: {
      time: string;
    };
    
    stopId: string;
  }[];

  vehicle: {
    id: string;
    label: string;
  }
}