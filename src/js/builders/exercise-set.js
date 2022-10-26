function buildExerciseSet(
  setNum,
  weightNum,
  weightUnit,
  repNum,
  intensityNum,
  intensityUnit,
  form
) {
  // this object holds data for an exercise working-set performed during a workout

  exerciseEvent = {
    // string
    eventType: "set",

    // number
    setNumber: setNum,

    // number
    weightNumber: weightNum,

    // string (lb or kg)
    weightUnit: weightUnit,

    // number
    repNumber: repNum,

    // number
    intensityNumber: intensityNum,

    // string
    intensityUnit: intensityUnit,

    // string
    form: form,
  };

  return exerciseEvent;
}
