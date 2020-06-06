var functions = require('./functions.js');

value = [{
    performanceId: '1000000013',
    festivalId: '1100000004',
    startTime: '1000',
    endTime: '1100',
    popularity: '1'
},
{
    performanceId: '1000000014',
    festivalId: '1100000004',
    startTime: '1100',
    endTime: '1200',
    popularity: '1'
},
{
    performanceId: '1000000015',
    festivalId: '1100000004',
    startTime: '1200',
    endTime: '1300',
    popularity: '2'
},
{
    performanceId: '1000000016',
    festivalId: '1100000004',
    startTime: '1030',
    endTime: '1230',
    popularity: '3'
},
{
    performanceId: '1000000017',
    festivalId: '1100000004',
    startTime: '1130',
    endTime: '1330',
    popularity: '4'
},
{
    performanceId: '1000000018',
    festivalId: '1100000004',
    startTime: '0900',
    endTime: '1200',
    popularity: '5'
}]

console.log(functions.calculateTime(value))