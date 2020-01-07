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

  constructor(private http: HttpClient) {

  }

  getData() {

    // let heads = new HttpHeaders();
    // heads = heads.set('Access-Control-Allow-Origin', '*');

    this.http.get('/broker/v2/entities/urn:ngsi-ld:Sensor:001').subscribe(res => {
      console.log(res);
    });
  }

  ngAfterViewInit(): void {
    console.log('holi');
    const map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(map);

    map.setView([37.9922399, -1.1306544], 13);

    const marker1 = L.marker([38.019988, -1.097616]).addTo(map);

    const marker2 = L.marker([37.9922399, -1.1306544]).addTo(map);

    marker1.bindPopup("Cerca Ca'ngel");

    this.getData();
  }

}
