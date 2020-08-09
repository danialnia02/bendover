var functions = {
    search: function (cacheData, info) {

        cacheData=JSON.parse(cacheData)
        console.log(cacheData);
        // console.log(info);
        // console.log(info.attribute1);
        // console.log(info.input1);
        // console.log(info.attribute2);
        // console.log(info.input2);
        var attribute1 = info.attribute1;
        var input1 = info.input1;
        var attribute2 = info.attribute2;
        var input2 = info.input2;


        if (attribute1 != "" && input1 != "" && attribute2 != "" && input2 != "") {
            //check for both attributes
            var resultArray = functions.checkFor2(attribute1, input1, attribute2, input2, cacheData);
            console.log("here1");
            console.log(resultArray);
            return resultArray;

        } else if (attribute1 != "" && input1 != "") {
            //check for attribute 1
            var resultArray = functions.checkFor1(attribute1, input1, cacheData);
            console.log("here2");
            console.log(resultArray);
            return resultArray;

        } else if (attribute2 != "" && input2 != "") {
            //check for attribute 2
            var resultArray = functions.checkFor1(attribute2, input2, cacheData);
            console.log("here3");
            console.log(resultArray);
            return resultArray;
        }        


    },

    checkFor1: function (attribute, input, cacheData) {
        //festivalId //1100000001
        var resultArray = [];

        for (var i = 0; i < cacheData.length; i++) {
            if (attribute != "startTime" || attribute != "endTime") {
                input = parseInt(input);
            }
            if (cacheData[i][attribute] == input) {

                resultArray.push(cacheData[i]);
            }

        };
        console.log(resultArray);
        return resultArray;
    },
    checkFor2: function (attribute1, input1, attribute2, input2, cacheData) {

        var resultArray = [];

        for (var i = 0; i < cacheData.length; i++) {


            if (attribute1 != "startTime" || attribute1 != "endTime") {
                input1 = parseInt(input1);
            }

            if (attribute2 != "startTime" || attribute2 != "endTime") {
                input2 = parseInt(input2);
            }

            if (cacheData[i][attribute1] == input1 && cacheData[i][attribute2] == input2) {
                resultArray.push(cacheData[i]);
            }
        };
        return resultArray;
    }


}

module.exports = functions;