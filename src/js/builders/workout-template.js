// used with the buildSavedWorkoutData object

function buildWorkoutTemplate(id, name, listOfExercises, date) {
  workoutTemplate = {
    // uuid
    templateID: id,

    // string
    templateName: name,

    // ordered list of exercises saved with this template
    exercises: listOfExercises,

    // string
    dateCreated: date,
  };

  return workoutTemplate;
}
