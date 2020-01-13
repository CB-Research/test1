interface Sensor {
  id: number;
  type: string;
  location: {
    coordinates: number[];
  };
  dateObserved: Date;
  NO: string;
  NO2: string;
  NOx: string;
  O3: string;
}
