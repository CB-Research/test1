import { Moment } from 'moment';

export interface Sensor {
  id: number;
  type: string;
  //   location: {
  //     coordinates: number[];
  //   };
  latitude: number;
  longitude: number;
  //   dateObserved: Date;
  TimeInstant: Moment;
  NO: string;
  NO2: string;
  //   NOx: string;
  O3: string;
}
