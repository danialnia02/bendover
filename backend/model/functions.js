

// calculateTime(value)

var functions = {
    calculateTime: function (festivalArray) {
        // console.log(festivalArray)
        var timeArray = [festivalArray[0]];

        // var latestEndTime = festivalArray[0];
        var currentArray = festivalArray;
        var nextClosestTime;



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
        // console.log("here" + JSON.stringify(currentArray))

        var ArrayCount = 0;
        var doCount = 0;
        do {
            console.log("ArrayCount :" + ArrayCount)

            //removed current time from the array
            for (var i = 0; i < currentArray.length; i++) {
                if (currentArray[i].performanceId == timeArray[ArrayCount].performanceId) {
                    currentArray.splice(i, 1);
                    // console.log("here" + JSON.stringify(currentArray))
                }
            }

            var minStartTime = 4000;
            var minEndTime = 4000;
            var test = -100;
            var timediff = 0;

            for (var i = 0; i < currentArray.length; i++) {


                //get the next closest start time
                // console.log(currentArray[i])
                //check if number is before
                if (parseInt(currentArray[i].startTime) < timeArray[ArrayCount].endTime) {
                } else if (parseInt(currentArray[i].startTime) >= timeArray[ArrayCount].endTime) {
                    var raveEnd = parseInt(timeArray[ArrayCount].endTime)
                    var raveStart = parseInt(currentArray[i].startTime)
                    console.log("rave ends at :" + raveEnd)
                    console.log("next rave ends at :" + raveStart + "\n")
                    // timediff = parseInt(currentArray[i].startTime) - timeArray[ArrayCount].endTime
                    timediff = raveStart - raveEnd
                    if (timediff < minStartTime) {
                        // console.log("rave ends at :" + raveEnd)
                        // console.log("next rave ends at :" + raveStart + "\n")
                        minStartTime = timediff
                        test = i;
                        // console.log("here")
                    }
                }
            }
            doCount++;
            ArrayCount++;
            if (test !== -100) {
                timeArray[ArrayCount] = currentArray[test];
            }
        } while (doCount < festivalArray.length)

        console.log(timeArray);
        return (timeArray)
    }
}

module.exports = functions
