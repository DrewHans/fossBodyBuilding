function buildExercise(liftingLibraryID, listOfExerciseActions) {
  // this object holds exercise data for a workout

  exerciseData = {
    // string
    exerciseID: liftingLibraryID,

    // list of objects (either exercise-set or exercise-rest)
    actions: listOfExerciseActions,
  };

  return exerciseData;
}
