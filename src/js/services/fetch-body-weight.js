// this service is responsible for getting the user's body-weight data

var fetchBodyWeightService = {
  getAllRecords: function () {
    // this stub should be replaced
    return [];
  },
  getRecordByDate: function (recordDate) {
    // this stub should be replaced
    return {};
  },
  getRecordsBetweenDates: function (startDate, endDate) {
    // this stub should be replaced
    return [];
  },
  getRecordsForHomeBodyTabChart: function () {
    // this stub data should be replaced with a db call (last 7 data points)
    return [
      { x: '10-23', y: 287.0 },
      { x: '10-25', y: 284.5 },
      { x: '10-26', y: 285 },
      { x: '10-28', y: 287 },
      { x: '10-29', y: 285 },
      { x: '10-30', y: 283 },
      { x: '11-01', y: 284 }
    ];
  },
};

export default fetchBodyWeightService;
