# API Documentation

This document allows you to define your API schema.

Each API should include

1. HTTP Method
2. Endpoint
3. Request body/Parameters
4. Response body
5. Error Body
6. Sample Request
7. Sample Response
8. Sample Error

> Errors and it's corresponding code can be defined by yourself. You need not follow HTTP errors.

## Get Data
1)
| attribute   | value                    |
| ----------- | -----------              |
| HTTP Method | GET                      |
| Endpoint    | /basic/result/1100000001 |
2)
|             | /advance/result          |
3)
|             | /advance/result/individual|
4)
|             | /advance/result/:id       |
### Parameters
1)
| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| none      | none            | none      |
2)
| none      | none            | none      |
3)
| userInput | Int             | 13091321  |
| operation | String          | <,==,>    |
| pagination| Int             | 5,10,15   |
| attribute | String          | performanceid|
4)
| userInput | Int             | 13091321  |


### Response Body
1) none

2)none

3)
```json
{
    "result": [
        {
            "performanceId": number,
            "festivalId": number,
            "startTime": number,
            "endTime": number,
            "popularity": number,
            ...
        }
    ]
}
```
4)
```json
{
    "result": [
        {
            "performanceId": number,
            "festivalId": number,
            "startTime": number,
            "endTime": number,
            "popularity": number,
            ...
        }
    ]
}
```
5)
```json
{
    "result": [
        {
            "performanceId": number,
            "festivalId": number,
            "startTime": number,
            "endTime": number,
            "popularity": number,
            ...
        }
    ]
}
```
6)
```json
{
    "result": [
        {
            "performanceId": number,
            "festivalId": number,
            "startTime": number,
            "endTime": number,
            "popularity": number,
            ...
        }
    ]
}
```
### Error
1)
```json
{
	"error": 'string',
	"code": 'number'
}
```
2)
```json
{
	"error": 'string',
	"code": 'number'
}
```
3)
```json
{
    "error": 'Unkown error
    Code:500 Internal Server Error.',
	
}
```
4)
```json
{
    "error": 'string',
	"code": 'number'
	
}
```

### Sample Request
1)
```http
GET /basic/data/result/1234567890
```
2)
```http
GET /advance/result
```
3)
```http
post /advance/result/individual
```
4)
```http
get /advance/result/individual
```
4)
```http
get /advance/result/:id
```
### Sample Response
1)
```json
{
    "result": [
        {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": 1030,
        "endTime": 1130,
        "popularity": 10
            ...
        }
    ]
}
```
2)
```json
{
    "result": [
        {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": 1030,
        "endTime": 1130,
        "popularity": 10
            ...
        }
    ]
}
```
3)
```json
{
    "result": [
        {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": 1030,
        "endTime": 1130,
        "popularity": 10
            ...
        }
    ]
}
```
4)
```json
{
    "result": [
        {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": 1030,
        "endTime": 1130,
        "popularity": 10
            ...
        }
    ]
}
```
5)
```json
{
    "result": [
        {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": 1030,
        "endTime": 1130,
        "popularity": 10
            ...
        }
    ]
}
```
6)
```json
{
    "result": [
        {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": 1030,
        "endTime": 1130,
        "popularity": 10
            ...
        }
    ]
}
```
7)
```json
{
    "result": [
        {
        "performanceId": 1000000003,
        "festivalId": 1100000001,
        "startTime": 1030,
        "endTime": 1130,
        "popularity": 10
            ...
        }
    ]
}
```
### Sample Error
1)
```json
{
	"error": "String",
	"code": 500
}
```
2)
```json
{
	"error": "String",
	"code": 500
}
```
3)
```json
{
	"error": 'Unkown error
    Code:500 Internal Server Error.'
}
```
4)
```json
{
	"error": 'Unkown error
    Code:500 Internal Server Error.'
}
```
5)
```json
{
	"error": 'Unkown error
    Code:500 Internal Server Error.'
}
```
6)
```json
{
	"error": 'Unkown error
    Code:500 Internal Server Error.'
}
```
7)
```json
{
	"error": 'Unkown error
    Code:500 Internal Server Error.'
}
```