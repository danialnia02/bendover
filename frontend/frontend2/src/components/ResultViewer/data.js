// var functions = require('./functions.js');

// value = [{
//     performanceId: '1000000013',
//     festivalId: '1100000004',
//     startTime: '1000',
//     endTime: '1100',
//     popularity: '1'
// },
// {
//     performanceId: '1000000014',
//     festivalId: '1100000004',
//     startTime: '1100',
//     endTime: '1200',
//     popularity: '1'
// },
// {
//     performanceId: '1000000015',
//     festivalId: '1100000004',
//     startTime: '1200',
//     endTime: '1300',
//     popularity: '2'
// },
// {
//     performanceId: '1000000016',
//     festivalId: '1100000004',
//     startTime: '1030',
//     endTime: '1230',
//     popularity: '3'
// },
// {
//     performanceId: '1000000017',
//     festivalId: '1100000004',
//     startTime: '1130',
//     endTime: '1330',
//     popularity: '4'
// },
// {
//     performanceId: '1000000018',
//     festivalId: '1100000001',
//     startTime: '0900',
//     endTime: '1200',
//     popularity: '5'
// }]
////////////////////////////////////////////////////////////////////////////////////////////////
// festival1 = [{
//     performanceId: '1000000001',
//     festivalId: '1100000001',
//     startTime: '1000',
//     endTime: '1100',
//     popularity: '1'
// },
// {
//     performanceId: '1000000002',
//     festivalId: '1100000001',
//     startTime: '1000',
//     endTime: '1100',
//     popularity: '1'
// },
// {
//     performanceId: '1000000003',
//     festivalId: '1100000001',
//     startTime: '1030',
//     endTime: '1130',
//     popularity: '10'
// },
// ]
////////////////////////////////////////////////////////////////////////////////////////////////
// festival2 = [{
//     performanceId: '1000000004',
//     festivalId: '1100000002',
//     startTime: '1000',
//     endTime: '1100',
//     popularity: '1'
// },
// {
//     performanceId: '1000000005',
//     festivalId: '1100000002',
//     startTime: '1100',
//     endTime: '1200',
//     popularity: '1'
// },
// {
//     performanceId: '1000000006',
//     festivalId: '1100000002',
//     startTime: '1200',
//     endTime: '1300',
//     popularity: '1'
// },
// {
//     performanceId: '1000000007',
//     festivalId: '1100000002',
//     startTime: '1030',
//     endTime: '1230',
//     popularity: '3'
// },
// ]
////////////////////////////////////////////////////////////////////////////////////////////////
// festival3 = [{
//     performanceId: '1000000008',
//     festivalId: '1100000003',
//     startTime: '1000',
//     endTime: '1100',
//     popularity: '1'
// },
// {
//     performanceId: '1000000009',
//     festivalId: '1100000003',
//     startTime: '1100',
//     endTime: '1200',
//     popularity: '1'
// },
// {
//     performanceId: '1000000010',
//     festivalId: '1100000003',
//     startTime: '1200',
//     endTime: '1300',
//     popularity: '1'
// },
// {
//     performanceId: '1000000011',
//     festivalId: '1100000003',
//     startTime: '1030',
//     endTime: '1230',
//     popularity: '1'
// },
// {
//     performanceId: '1000000012',
//     festivalId: '1100000003',
//     startTime: '1130',
//     endTime: '1300',
//     popularity: '3'
// },
// ]
////////////////////////////////////////////////////////////////////////////////////////////////
var festival4 = [{
    performanceId: 1000000013,
    festivalId: 1100000004,
    startTime: '1000',
    endTime: '1100',
    popularity: '1'
},
{
    performanceId: 1000000014,
    festivalId: 1100000004,
    startTime: '1100',
    endTime: '1200',
    popularity: '1'
},
{
    performanceId: 1000000015,
    festivalId: 1100000004,
    startTime: '1200',
    endTime: '1300',
    popularity: '2'
},
// {
//     performanceId: 1000000016,
//     festivalId: 1100000004,
//     startTime: '1030',
//     endTime: '1230',
//     popularity: '3'
// },
// {
//     performanceId: 1000000017,
//     festivalId: 1100000004,
//     startTime: '1130',
//     endTime: '1330',
//     popularity: '4'
// },
// {
//     performanceId: 1000000018,
//     festivalId: 1100000004,
//     startTime: '0900',
//     endTime: '1200',
//     popularity: '5'
// },
]

var functions = {
    exportTime: function () {
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

        for (var i = 0; i < festival4.length; i++) {
            var firstTime = parseInt(festival4[i].startTime)
            var endTime = parseInt(festival4[i].endTime);
            var firstTimeSeconds = functions.convertTime(firstTime)
            var endTimeSeconds = functions.convertTime(endTime)

            resultArray[i+1] = [
                i,
                festival4[i].performanceId,
                festival4[i].performanceId,
                new Date(firstTimeSeconds),
                new Date(endTimeSeconds),
                festival4[i].popularity,
                100,
                null
            ]
        }
        // console.log(resultArray)
        return resultArray
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
    }

}

// console.log(functions.exportTime())

module.exports = functions