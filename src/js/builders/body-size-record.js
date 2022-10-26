function buildBodySizeRecord(id, size, unit, date) {
  // this object holds the user's body size data

  record = {
    // uuid
    bodyPartID: id,

    // number
    bodySizeNumber: size,

    // string
    measurementUnit: unit,

    // string
    dateCreated: date,
  };

  return record;
}
