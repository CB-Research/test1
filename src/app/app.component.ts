import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'test1';

  map;

  customIcon = L.icon({
    iconUrl: 'assets/marker-icon.png',
    shadowUrl: 'assets/marker-shadow.png',

    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });



  constructor(private http: HttpClient) {

  }

  getData() {

    // let heads = new HttpHeaders();
    // heads = heads.set('Access-Control-Allow-Origin', '*');

    this.http.get('/broker/v2/entities?type=Sensor').subscribe((sensor: Sensor[]) => {
      sensor.forEach(s => {
        const coordinates: number[] = s.location.value.coordinates;
        const marker = L.marker(coordinates, { icon: this.customIcon }).addTo(this.map);
        marker.bindPopup('Cerca Ca Ángel');
      });
    });
  }

  ngAfterViewInit(): void {
    console.log('holi');
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.map.setView([37.9922399, -1.1306544], 12);



    this.getData();
  }

}
