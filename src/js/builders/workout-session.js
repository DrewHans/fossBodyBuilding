function buildWorkoutSession(startdate, finishdate, listOfExercises) {
  // this object holds exercise data for a workout

  workoutSession = {
    // uuid
    sessionID: id,

    // string
    dateStarted: startdate,

    // string
    dateFinished: finishdate,

    // ordered list of exercises to be performed during the workout
    exercises: listOfExercises,
  };

  return workoutSession;
}
