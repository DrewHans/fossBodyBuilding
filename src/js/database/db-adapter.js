// responsible for wrapping all db functions into a single, importable module
// reference: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

var dbAdapter = {
  DB: {},

  initializeDb: function () {
    return new Promise(function (resolve, reject) {
      var databaseName = "fossBodyBuildingDatabase";
      var databaseVersion = 1;

      const openDBRequest = indexedDB.open(databaseName, databaseVersion);

      openDBRequest.onerror = (e) => {
        console.log("Error: database failed to open", e);
        reject(); // may need to remove this
      };

      openDBRequest.onsuccess = (e) => {
        DB = openDBRequest.result;
        resolve();
      };

      // called when version number changed or when a new database created
      openDBRequest.onupgradeneeded = (e) => {
        DB = e.target.result;
        let upgradeTransaction = e.target.transaction;
        let objectStore;

        // helper function to simplify object store creation
        function initObjectStore(objectStoreName) {
          let objectStore;

          // create / upgrade the objectStore
          if (!DB.objectStoreNames.contains(objectStoreName)) {
            objectStore = DB.createObjectStore(objectStoreName, {
              keyPath: "id",
              autoIncrement: true,
            });
          } else {
            objectStore = upgradeTransaction.objectStore(objectStoreName);
          }

          // delete all previously created indexes on the object store
          while (objectStore.indexNames.length !== 0) {
            const index = objectStore.indexNames.item(0);
            objectStore.deleteIndex(index);
          }

          return objectStore;
        }

        objectStore = initObjectStore("BodySizeRecords")
        objectStore.createIndex("dateCreated", "dateCreated", { unique: false });

        objectStore = initObjectStore("BodyWeightRecords")
        objectStore.createIndex("dateCreated", "dateCreated", { unique: false });

        objectStore = initObjectStore("LiftingLibraryRecords")
        objectStore.createIndex("exerciseName", "exerciseName", { unique: false});
        objectStore.createIndex("dateCreated", "dateCreated", { unique: false });

        objectStore = initObjectStore("WorkoutTemplates")
        objectStore.createIndex("templateName", "templateName", { unique: false});
        objectStore.createIndex("dateCreated", "dateCreated", { unique: false });

        objectStore = initObjectStore("WorkoutSessions")
        objectStore.createIndex("dateStarted", "dateStarted", { unique: false});
        objectStore.createIndex("dateFinished", "dateFinished", { unique: false });

        upgradeTransaction.oncomplete = () => {
          console.log("DB Created/Updated");
          resolve();
        };
      };
    });
  },

  delete: function (objectStoreName, key) {
  return new Promise(function (resolve, reject) {
    const transaction = DB.transaction(objectStoreName, "readwrite");
    const objectStore = transaction.objectStore(objectStoreName);
    const deleteRequest = objectStore.delete(key);

    deleteRequest.oncomplete = (e) => {
      resolve();
    };

    deleteRequest.onerror = (e) => {
      reject("db delete request failed");
    };

    return request;
  });
},

  getAll: function (objectStoreName) {
    return new Promise(function (resolve, reject) {
      var results = [];
      const transaction = DB.transaction(objectStoreName);
      const objectStore = transaction.objectStore(objectStoreName);
      const openCursorRequest = objectStore.openCursor();

      openCursorRequest.onsuccess = (e) => {
        var cursor = e.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
    });
  },

  get: function (objectStoreName, key) {
    return new Promise(function (resolve, reject) {
      const transaction = DB.transaction(objectStoreName);
      const objectStore = transaction.objectStore(objectStoreName);
      const getRequest = objectStore.get(key);

      getRequest.onsuccess = (e) => {
        resolve(getRequest.result);
      };

      getRequest.onerror = (e) => {
        reject("db get request failed");
      };
    });
  },

  getFromIndex: function (objectStoreName, indexName, key) {
    return new Promise(function (resolve, reject) {
      const transaction = DB.transaction(objectStoreName);
      const objectStore = transaction.objectStore(objectStoreName);
      const objectStoreIndex = objectStore.index(indexName);
      const getRequest = objectStoreIndex.get(key);

      getRequest.onsuccess = (e) => {
        resolve(request.result);
      };

      getRequest.onerror = (e) => {
        reject("db get request failed");
      };
    });
  },

  put: function (objectStoreName, key, data) {
    return new Promise(function (resolve, reject) {
      const transaction = DB.transaction(objectStoreName, "readwrite");
      const objectStore = transaction.objectStore(objectStoreName);
      const putRequest = objectStore.put(data, key);

      putRequest.onsuccess = (e) => {
        resolve();
      };

      putRequest.onerror = (e) => {
        reject("db put request failed");
      };
    });
  },

  update: function (objectStoreName, key, data) {
    return new Promise(function (resolve, reject) {
      const transaction = DB.transaction(objectStoreName, "readwrite");
      const objectStore = transaction.objectStore(objectStoreName);
      const getRequest = objectStore.get(key);

      getRequest.onsuccess = (e) => {
        var dbResult = e.target.result;

        if (dbResult) {
          // update the result with values from the passed data object
          for (let k in data) {
            dbResult[k] = data[k];
          }
        } else {
          // valid key passed, but no data found
          dbResult = data;
        }

        const putRequest = objectStore.put(result);
        putRequest.onsuccess = (e) => {
          resolve();
        };
        putRequest.onerror = (e) => {
          reject("db put request failed");
        };
      };

      getRequest.onerror = (e) => {
        reject("db get request failed");
      };
    });
  },

  export: function () {
    return new Promise(function (resolve, reject) {
      if (DB.objectStoreNames.length <= 0) {
        reject();  // no object stores to export
      }

      let exportData = {};

      let objectStoreNamesArray = Array.from(DB.objectStoreNames);

      if (objectStoreNamesArray.length <= 0) {
        reject();
      }

      // Get values from each store
      const transaction = DB.transaction(DB.objectStoreNames, "readonly");
      objectStoreNamesArray.forEach(function (objectStoreName) {
        let data = [];
        objectStore = transaction.objectStore(objectStoreName);
        const openCursorRequest = objectStore.openCursor();

        openCursorRequest.onsuccess = (e) => {
          const cursor = e.target.result;
          if (cursor) {
            // cursor.value contains the current record being iterated through
            data.push(cursor.value);
            cursor.continue();
          } else {
            // no more results
            exportData[objectStoreName] = data;
          }
        };
      });

      if (objectStoreNamesArray.length === Object.keys(exportData).length) {
        exportData.version = DB.version;
        resolve(exportData);
      }
      else {
        reject("exportData did not pass validation check");
      }
    });
  },

  import: function (importData) {
    return new Promise(function (resolve, reject) {
      const transaction = DB.transaction(DB.objectStoreNames, "readwrite");

      transaction.onerror = (e) => {
        console.log("Error importing data.", e.target.error.message);
        reject(e);
      };

      transaction.oncomplete = async (e) => {
        console.log("Database import was successful");

        let div = document.createElement("div");
        div.className = "dialog-text";
        div.innerText = "Import Complete";

        app.f7.preloader.hide();
        app.f7.dialog
          .create({
            title: "The backup has been restored",
            content: div.outerHTML,
            buttons: [
              {
                text: app.strings.dialogs.ok || "OK",
                keyCodes: [13],
              },
            ],
          })
          .open();
        resolve(e);
      };

      // Remove version key from imported data (to prevent accidental overwrite)
      delete importData.version;
      delete importData._version;

      // call special Preloader overlay to block user action until finished
      app.f7.preloader.show("red");

      // Go through each object store, clear existing data, and import new data
      let objectStoreNamesArray = Array.from(DB.objectStoreNames);
      let storeCount = 0;
      objectStoreNamesArray.forEach((x) => {

        if (importData[x] === undefined || importData[x].length <= 0) {
          storeCount++;
          return;  // equivalent to continue in a conventional forloop
        }

        const objectStore = transaction.objectStore(x);

        // delete all current data in the object store
        const clearRequest = objectStore.clear();

        clearRequest.onsuccess = () => {
          importData[x].forEach(async (dataEntry) => {
            const addRequest = objectStore.add(dataEntry);

            addRequest.onsuccess = async (e) => {
              // do nothing, move on to next dataEntry
            };

            addRequest.onerror = (e) => {
              console.log(e.target.error);
            };

          });
        };
      });
    });
  },
};
