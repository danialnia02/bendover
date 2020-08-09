
var functions = {    
    calculateTime: function (festivalArray, userInput) {
        if (festivalArray.length == 0) {
            return {result:[]}
        }

        festivalArray = functions.convertTimeBasic(festivalArray);



        var result = [festivalArray[0]];
        var currentArray = festivalArray;

        //get the earliest end Time
        for (var i = 0; i < festivalArray.length; i++) {

            //get the earliest start and end time
            if (parseInt(festivalArray[i].startTime) < result[0].startTime) {
                if (parseInt(festivalArray[i].endTime) < result[0].endTime) {
                    result[0] = festivalArray[i];
                }
            }
        }
        //1: 1000 and 1100                            

        var ArrayCount = 0;
        var doCount = 0;
        do {
            //removed current time from the array
            try {
                for (var i = 0; i < currentArray.length; i++) {
                    if (currentArray[i].performanceId == result[ArrayCount].performanceId) {
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
                if (parseInt(currentArray[i].startTime) < result[ArrayCount].endTime) {
                } else if (parseInt(currentArray[i].startTime) >= result[ArrayCount].endTime) {
                    var raveEnd = parseInt(result[ArrayCount].endTime)
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
                result[ArrayCount] = {
                    performanceId: currentArray[arrayId].performanceId,
                    startTime: currentArray[arrayId].startTime,
                    endTime: currentArray[arrayId].endTime
                }
                    console.log(result[ArrayCount])
            }
        } while (doCount < festivalArray.length)

        console.log(result);
        return ({result})
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////
    calculateTime2: function (festivalArray, userInput) {

        if (festivalArray.length == 0) {
            return {result:[]}
        }

        festivalArray = functions.convertTimeAdvance(festivalArray);

        var result = [festivalArray[0]];
        
        var currentArray = festivalArray;
        var firstRave;



        //get the earliest end Time
        for (var i = 0; i < festivalArray.length; i++) {
            //get the earliest start and end time
            if (parseInt(festivalArray[i].startTime) < result[0].startTime) {
                if (parseInt(festivalArray[i].endTime) < result[0].endTime) {
                    result[0] = festivalArray[i];
                }
            }
        }
        firstRave = result[0];

        for (var y = 0; y < festivalArray.length; y++) {
            if (parseInt(festivalArray[y].startTime) <= firstRave.startTime && (parseInt(firstRave.popularity) < parseInt(festivalArray[y].popularity))) {                
                firstRave = festivalArray[y]
                result[0] = firstRave                
            }
        };        

        var ArrayCount = 0;
        var doCount = 0;
        do {
            //removed current time from the array
            try {
                for (var i = 0; i < currentArray.length; i++) {
                    if (currentArray[i].performanceId == result[ArrayCount].performanceId) {
                        currentArray.splice(i, 1);                        
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
                if (parseInt(currentArray[i].startTime) < result[ArrayCount].endTime) {
                } else if (parseInt(currentArray[i].startTime) >= result[ArrayCount].endTime) {
                    var raveEnd = parseInt(result[ArrayCount].endTime)
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
                result[ArrayCount] = nextRave;

            }
            if (result.length == 1) {
                for (var y = 0; y < festivalArray.length; y++) {
                    if (parseInt(festivalArray[y].startTime) >= result[0].popularity) {
                        result[0] = festivalArray[y];
                    }
                };
            }
        } while (doCount < festivalArray.length)

        // console.log(timeArray);
        return ({result})
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////
    exportTime: function (array) {
        try {
            var resultArray = [[
                { type: 'string', label: 'count' },
                { type: 'string', label: 'popularity' },
                { type: 'string', label: 'peformanceId' },
                { type: 'date', label: 'startTime' },
                { type: 'date', label: 'endTime' },
                { type: 'number', label: 'popularity' },
                { type: 'number', label: 'Percent Complete' },
                { type: 'string', label: 'Dependencies' },
            ]];

            for (var i = 0; i < array.length; i++) {
                var firstTime = parseInt(array[i].startTime)
                var endTime = parseInt(array[i].endTime);
                var firstTimeSeconds = functions.convertTime(firstTime)
                var endTimeSeconds = functions.convertTime(endTime)

                resultArray[i + 1] = [
                    i,
                    array[i].performanceId,
                    array[i].performanceId,
                    // new Date(firstTimeSeconds),
                    // new Date(endTimeSeconds),
                    firstTimeSeconds,
                    endTimeSeconds,
                    array[i].popularity,
                    100,
                    null
                ]
            }
            // console.log(resultArray)
            return resultArray
        } catch (err) {
            return null;
        }

    },
    convertTime: function (numberString) {
        var number = parseInt(numberString);
        if (number > 2399 || number < 0) {
            console.log("broken");
            return false;
        }
        var ones = Math.floor(number % 10)
        // console.log(ones+ " 1")
        var tenths = Math.floor(number / 10 % 10)
        // console.log(tenths+" 2")
        var minute = (tenths * 10) + ones
        // console.log(minute+ " 3")
        var hundreds = Math.floor(number / 100 % 10)
        // console.log(hundreds+ "4 ");
        var thousands = Math.floor(number / 1000 % 10)
        var hours = (thousands * 10) + hundreds
        // console.log(hours+ " 5")
        var milisecs = (hours * 3600000) + (minute * 60000)

        var returnN = milisecs + 1592841600000
        // console.log(returnN)
        return (returnN)
    },
    convertTimeBasic: function (timeArray) {
        var currentArray = [];
        for (var i = 0; i < timeArray.length; i++) {
            var newStartTime = timeArray[i].startTime.split(/[.:]/);
            newStartTime = newStartTime[1] + newStartTime[2]

            var newEndTime = timeArray[i].endTime.split(/[.:]/);
            newEndTime = newEndTime[1] + newEndTime[2]


            currentArray.push({
                performanceId: timeArray[i].performanceId,
                festivalId: timeArray[i].festivalArray,
                startTime: newStartTime,
                endTime: newEndTime,                
            })
        }
        return currentArray
    },
    convertTimeAdvance: function (timeArray) {
        var currentArray = [];
        for (var i = 0; i < timeArray.length; i++) {
            var newStartTime = timeArray[i].startTime.split(/[.:]/);
            newStartTime = newStartTime[1] + newStartTime[2]

            var newEndTime = timeArray[i].endTime.split(/[.:]/);
            newEndTime = newEndTime[1] + newEndTime[2]


            currentArray.push({
                performanceId: timeArray[i].performanceId,
                festivalId: timeArray[i].festivalArray,
                startTime: newStartTime,
                endTime: newEndTime,
                popularity: timeArray[i].popularity
            })
        }
        return currentArray
    }
}

module.exports = functions
