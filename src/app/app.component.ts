import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    title = 'test1';

    map;

    realTimeData: string = 'This is the real-time data container';

    customIcon = L.icon({
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',

        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    });

    markers;

    constructor(private http: HttpClient) {

    }

    getData() {

        let heads = new HttpHeaders();
        heads = heads.set('fiware-service', 'openiot');
        heads = heads.set('fiware-servicepath', '/EEA_POLLUTION');
        // heads = heads.set('fiware-service', 'environment');
        // heads = heads.set('fiware-servicepath', '/Madrid');
        let pams = new HttpParams();
        pams = pams.set('type', 'EEA_POLLUTION');
        // pams = pams.set('type', 'AirQualityObserved');
        pams = pams.set('options', 'keyValues');
        pams = pams.set('limit', '500');

        this.http.get('/broker/v2/entities', { headers: heads, params: pams }).subscribe((sensor: Sensor[]) => {
            console.log('SENSOOOOOR:' + sensor.length);
            this.markers = L.layerGroup();
            sensor.forEach(s => {
                const coordinates: number[] = [s.latitude, s.longitude];
                const marker = L.marker(coordinates, {
                    icon: this.customIcon,
                    clickable: true
                }).on('click', (data) => {
                    console.log(coordinates);
                    this.realTimeData = 'Latitude: ' + s.latitude +
                        '\nLongitude: ' + s.longitude +
                        '\nDate: ' + s.TimeInstant.toLocaleString() +
                        '\nNO: ' + s.NO +
                        '\nNO2: ' + s.NO2 +
                        '\nO3: ' + s.O3;
                }).addTo(this.map);
                this.markers.addLayer(marker).addTo(this.map);
                marker.bindPopup('Latitude: ' + s.latitude +
                    '<br />Longitude: ' + s.longitude +
                    '<br />Date: ' + s.TimeInstant.toLocaleString()
                );
            });
        });
    }

    ngAfterViewInit(): void {
        console.log('holi');
        this.map = L.map('map', {
            center: [40.4167, -3.70325],
            zoom: 11
        });

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.map);

        this.map.on('zoom', this.onMapReset.bind(this));

        this.map.on('click', this.onMapClick);

        this.getData();
    }

    onMapClick() {
        console.log('click');
    }

    onMapReset() {
        if (this.map.getZoom() < 6) {
            console.log(this.markers);
            // this.markers.remove();
        }
    }

}
