function buildExerciseRest(minutes, seconds) {
  // this object holds data for an exercise rest-period during a workout

  exerciseEvent = {
    // string
    eventType: "rest",

    // number
    minutesRested: minutes,

    // number
    secondsRested: seconds,
  };

  return exerciseEvent;
}
