interface Sensor {
  id: number;
  type: string;
  location: {
    value: {
      coordinates: number[];
    };
  };
}
