import idb from 'idb';
import axios from 'axios';

const IDB_VERSION = 1;

const dbPromise = idb.open('pdx-biker', IDB_VERSION, upgradeDb => {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('geoJSON', {
        keyPath: 'properties.OBJECTID'
      });
  }
});

export const idbGeoJSON = {
  getAll: () => {
    return dbPromise
      .then(db => {
        return db
          .transaction('geoJSON')
          .objectStore('geoJSON')
          .getAll();
      })
      .then(geoJSON => {
        // console.log('idbFeatures.getAll, routes:', routes);
        return geoJSON;
      })
      .catch(err => console.error(err));
  },
  setAll: data => {
    dbPromise.then(db => {
      const tx = db.transaction('geoJSON', 'readwrite');
      data.forEach(item => {
        tx.objectStore('geoJSON').put(item);
      });
      return tx.complete;
    });
  }
};

export const requestGeoJSON = url => {
  return axios
    .get(url)
    .then(response => response.data.features)
    .catch(err => console.error('Could not request geoJSON:', err));
};
