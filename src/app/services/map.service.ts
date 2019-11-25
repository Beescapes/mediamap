import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentChangeAction,
  Action,
  DocumentSnapshotDoesNotExist,
  DocumentSnapshotExists,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { GeoJson } from './map';
import * as mapboxgl from 'mapbox-gl';
import { map } from 'rxjs/operators';
import { VideosService } from './videos.service';

@Injectable()
export class MapService {

  locations: Observable<any[]>;
  db: AngularFirestore;

  videos: any;

  constructor(
    db: AngularFirestore,
    private videosService: VideosService
    ) {
    mapboxgl.accessToken = environment.mapbox.accessToken;

    this.videos = this.videosService.videos;
    this.videosService.loadAll();

    /*

    this.db = db;

    this.locations = this.db
      .collection<GeoJson>('locations', ref => ref.orderBy('properties.index'))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            //Get document data
            const data = a.payload.doc.data() as GeoJson;
            //Get document id
            const id = a.payload.doc.id;
            // Add short label for map
            data.properties.shortname = data.properties.name.replace('Location', 'Loc');
            //Use spread operator to add the id to the document data
            return { id, ...data };
          })
        })
      );*/
  }

  getMarkers() {
    return this.videos;
  }

  /*
  createMarker(data: GeoJson) {

    // Why is this really neccessary, c'mon AngularFirebase
    const markerObject = {
      geometry: data.geometry,
      properties: data,
      type: data.type
    }

    this.db
      .collection<GeoJson>('locations').add(markerObject);
  }*/

  removeMarker($key: string) {
    return this.locations;
  }

}