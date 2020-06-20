
var functions = {
    calculateTime: function (festivalArray) {
        var timeArray = [festivalArray[0]];

        // var latestEndTime = festivalArray[0];
        var currentArray = festivalArray;



        //get the earliest end Time
        for (var i = 0; i < festivalArray.length; i++) {
            // if (parseInt(festivalArray[i].endTime) > latestEndTime.endTime) {
            //     latestEndTime = festivalArray[i];
            // }
            //get the earliest start and end time
            if (parseInt(festivalArray[i].startTime) < timeArray[0].startTime) {
                if (parseInt(festivalArray[i].endTime) < timeArray[0].endTime) {
                    timeArray[0] = festivalArray[i];
                }
            }
        }
        //1: 1000 and 1100                    
        // console.log("here " + JSON.stringify(currentArray))

        var ArrayCount = 0;
        var doCount = 0;
        do {
            //removed current time from the array
            try {
                for (var i = 0; i < currentArray.length; i++) {
                    if (currentArray[i].performanceId == timeArray[ArrayCount].performanceId) {
                        currentArray.splice(i, 1);
                        // console.log("here" + JSON.stringify(currentArray))
                    }
                }
            } catch (err) {
                break;
            }

            var minStartTime = 4000;
            var minEndTime = 4000;
            var arrayId = -100;
            var timediff = 0;

            for (var i = 0; i < currentArray.length; i++) {


                //get the next closest start time                
                //check if number is before
                if (parseInt(currentArray[i].startTime) < timeArray[ArrayCount].endTime) {
                } else if (parseInt(currentArray[i].startTime) >= timeArray[ArrayCount].endTime) {
                    var raveEnd = parseInt(timeArray[ArrayCount].endTime)
                    var raveStart = parseInt(currentArray[i].startTime)
                    // timediff = parseInt(currentArray[i].startTime) - timeArray[ArrayCount].endTime
                    timediff = raveStart - raveEnd

                    if (timediff < minStartTime) {
                        minStartTime = timediff
                        arrayId = i;
                    }
                }
            }
            doCount++;
            ArrayCount++;
            if (arrayId !== -100) {
                timeArray[ArrayCount] = currentArray[arrayId];
            }
        } while (doCount < festivalArray.length)

        // console.log(timeArray);
        return (timeArray)
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////
    calculateTime2: function (festivalArray) {
        var timeArray = [festivalArray[0]];

        // var latestEndTime = festivalArray[0];
        var currentArray = festivalArray;
        var firstRave;



        //get the earliest end Time
        for (var i = 0; i < festivalArray.length; i++) {
            //get the earliest start and end time
            if (parseInt(festivalArray[i].startTime) < timeArray[0].startTime) {
                if (parseInt(festivalArray[i].endTime) < timeArray[0].endTime) {
                    timeArray[0] = festivalArray[i];
                }
            }
        }
        firstRave = timeArray[0];

        for (var y = 0; y < festivalArray.length; y++) {
            if (parseInt(festivalArray[y].startTime) <= firstRave.startTime && (parseInt(firstRave.popularity) < parseInt(festivalArray[y].popularity))) {
                // if (parseInt(festivalArray[y].endTime) <= firstRave.endTime) {
                // if (parseInt(firstRave.popularity) < parseInt(festivalArray[y].popularity)) {
                firstRave = festivalArray[y]
                timeArray[0] = firstRave
                // }
                // }
            }
        };
        // console.log(firstRave)

        var ArrayCount = 0;
        var doCount = 0;
        do {
            //removed current time from the array
            try {
                for (var i = 0; i < currentArray.length; i++) {
                    if (currentArray[i].performanceId == timeArray[ArrayCount].performanceId) {
                        currentArray.splice(i, 1);
                        // console.log("here" + JSON.stringify(currentArray))
                    }
                }
            } catch (err) {
                break;
            }

            var minStartTime = 4000;
            var minEndTime = 4000;
            var arrayId = -100;
            var timediff = 0;

            for (var i = 0; i < currentArray.length; i++) {


                //get the next closest start time                
                //check if number is before
                if (parseInt(currentArray[i].startTime) < timeArray[ArrayCount].endTime) {
                } else if (parseInt(currentArray[i].startTime) >= timeArray[ArrayCount].endTime) {
                    var raveEnd = parseInt(timeArray[ArrayCount].endTime)
                    var raveStart = parseInt(currentArray[i].startTime)
                    timediff = raveStart - raveEnd

                    if (timediff < minStartTime) {
                        minStartTime = timediff
                        arrayId = i;
                    }
                }
            }
            doCount++;
            ArrayCount++;
            if (arrayId !== -100) {
                nextRave = currentArray[arrayId]

                //check if there is another event that has a start,end and popularity more than nextRave
                for (var y = 0; y < festivalArray.length; y++) {
                    if (parseInt(festivalArray[y].startTime) >= nextRave.startTime) {
                        if (parseInt(festivalArray[y].endTime) >= nextRave.endTime) {
                            if (parseInt(nextRave.popularity) < parseInt(festivalArray[y].popularity)) {
                                nextRave = festivalArray[y]
                            }
                        }
                    }
                };
                timeArray[ArrayCount] = nextRave;

            }
            if (timeArray.length == 1) {
                for (var y = 0; y < festivalArray.length; y++) {
                    if (parseInt(festivalArray[y].startTime) >= timeArray[0].popularity) {
                        timeArray[0] = festivalArray[y];
                    }
                };
            }
        } while (doCount < festivalArray.length)

        // console.log(timeArray);
        return (timeArray)
    }
}

module.exports = functions
