function buildLiftingLibraryRecord(id, name, muscles, equipment, date) {
  // this object holds exercise info for an exercise in the lifting library

  liftingLibraryRecord = {
    // uuid
    exerciseID: id,

    // string
    exerciseName: name,

    // list of string
    musclesWorked: muscles,

    // list of string
    requiredEquipment: equipment,

    // string
    dateCreated: date,
  };

  return liftingLibraryRecord;
}
