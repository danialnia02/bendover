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

## Reset Table

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /reset |
 
### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| None        | None | None |

### Response Body

```json
{
    "success":string,
}
```

### Error

```json
{
	"error": string,	
}
```

### Sample Request

```http
GET /reset
```

### Sample Response

```json
{
    "success":"true"
}   


```

### Sample Error

```json
    {
        "error": {
            "code": "ER_PARSE_ERROR",
            "errno": 1064,
            "sqlMessage": "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'CREATE TABLE festivalinfo (performanceId BIGINT(50) NOT NULL, festivalId BIGINT(' at line 1",
            "sqlState": "42000",
            "index": 0,
            "sql": "DROP TABLE IF EXISTS festivalinfo; CREATE TABLE festivalinfo (performanceId BIGINT(50) NOT NULL, festivalId BIGINT(50)  NOT NULL, startTime TIME NOT NULL, endTime TIME NOT NULL, popularity BIGINT(50) NOT NULL, primary KEY(performanceId))"
        }        
    }
```
----------------------------------------------------------------
## Get Data

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/data |
 
### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| None        | None | None |

### Response Body

```json
{
    "result": [
        {
            "performanceId": BIGINT(50),
            "festivalId": BIGINT(50),
            "startTime": Time,
            "endTime": Time,
            "popularity":BIGINT(50)
            ...
        }
    ]
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
GET /basic/data
```

### Sample Response

```json
[
    {
        "performanceId": 9000000001,
        "festivalId": 9900000001,
        "startTime": "00:10:00",
        "endTime": "00:11:00",
        "popularity": 1
    },
    ...
]

```

### Sample Error

```json
{
	"error": "Server Error",
	"code": 500
}
```
----------------------------------------------------------------
## Get Advance Data  
| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /advance/data |
 
### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| None        | None | None |

### Response Body

```json
{
    "result": [
        {
            "performanceId": BIGINT(50),
            "festivalId": BIGINT(50),
            "startTime": Time,
            "endTime": Time,
            "popularity":BIGINT(50)
            ...
        }
    ]
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
GET /advance/data
```

### Sample Response

```json
[
    {
        "performanceId": 9000000001,
        "festivalId": 9900000001,
        "startTime": "00:10:00",
        "endTime": "00:11:00",
        "popularity": 1
    },
    ...
]

```

### Sample Error

```json
{
	"error": "Server Error",
	"code": 500
}
```
----------------------------------------------------------------

## Get Basic Data based on Parameter

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/result|

### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| festivalId        | String | festivalId=1234567890 |

### Response Body

```json

{
    "result": [
        {
            "performanceId": BIGINT(50),
            "festivalId": BIGINT(50),
            "startTime": Time,
            "endTime": Time,            
            ...
        }
    ]
}
```

### Error

```json
{
	"result":[]
}
```

### Sample Request

```http
GET /basic/result?festivalId=9999999999
```

### Sample Response

```json
{
  "result": [
    {
      "performanceId": 9999999999,
      "startTime": "0900",
      "endTime": "1200",      
    }
  ]
}
```

### Sample Error

```json
{
	result:[]
}
```

----------------------------------------------------------------    
## Get Advance Data based on Parameter

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /advance/result|

### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| festivalId        | String | festivalId=1234567890 |

### Response Body

```json

{
    "result": [
        {
            "performanceId": BIGINT(50),
            "festivalId": BIGINT(50),
            "startTime": Time,
            "endTime": Time,
            "popularity":BIGINT(50)
            ...
        }
    ]
}
```

### Error

```json
{
	"result":[]
}
```

### Sample Request

```http
GET /advance/result?festivalId=9999999999
```

### Sample Response

```json
{
  "result": [
    {
      "performanceId": 9999999999,
      "startTime": "0900",
      "endTime": "1200",
      "popularity": 5
    }
  ]
}
```

### Sample Error

```json
{
	result:[]
}
```
----------------------------------------------------------------
## Get Basic Data based on performanceId

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/result/:performanceId |

### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| performanceId        | 10 digit number | 1000000001 |

### Response Body

```json
{
    "result": [
        {
            "performanceId": BIGINT(50),
            "festivalId": BIGINT(50),
            "startTime": Time,
            "endTime": Time,
            "popularity":BIGINT(50)            
        }
    ]
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
GET /basic/result/1000000001
```

### Sample Response

```json
{
    "result": [
        {
            "performanceId": 1000000001,
            "festivalId": 1100000001,
            "startTime": "1030",
            "endTime": "1130",
            "popularity":10            
        },
        
    ]
}
```

### Sample Error

```json
{
	"error": "Server Error",
	"code": 500
}
```
----------------------------------------------------------------
## Get Advance Data based on performanceId

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /advance/result/:performanceId |

### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| performanceId        | 10 digit number | 1000000001 |

### Response Body

```json
{
    "result": [
        {
            "performanceId": BIGINT(50),
            "festivalId": BIGINT(50),
            "startTime": Time,
            "endTime": Time,
            "popularity":BIGINT(50)            
        }
    ]
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
GET /advance/result/1000000001
```

### Sample Response

```json
{
    "result": [
        {
            "performanceId": 1000000001,
            "festivalId": 1100000001,
            "startTime": "1030",
            "endTime": "1130",
            "popularity":10            
        },
        
    ]
}
```

### Sample Error

```json
{
	"error": "Server Error",
	"code": 500
}
```
----------------------------------------------------------------

## Get Data based on search bar in Data Viewer

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | POST     |
| Endpoint    | /search |

### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| attribute1(performanceId)| String | performanceId |
| input1| String | 1000000001 |
| attribute2(festivalId)| String | "" |
| input2| String | "" |

### Response Body

```json
{
    "result": [
        {
            "performanceId": BIGINT(50),
            "festivalId": BIGINT(50),
            "startTime": Time,
            "endTime": Time,
            "popularity":BIGINT(50)            
        }
    ]
}
```

### Error

```json
{
    "result":[]
}
```

### Sample Request

```http
GET /search
```

### Sample Response

```json
{
    "result": [
        {
            "performanceId": 1000000002,
            "festivalId": 1100000001,
            "startTime": "1000",
            "endTime": "1100",
            "popularity":1  
        }
    ]
}
```

### Sample Error

```json
{
    "result":[]
}
```
----------------------------------------------------------------
## Insert data into database(basic)

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | POST     |
| Endpoint    | /basic/insert |

### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| performanceId| bigint |12345678 |
| festivalId| bigint | 12345678 |
| startTime| String | "2200" |
| endTime| String | "2300" |

### Response Body

```json
{
    "result":string
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
POST /search
```

### Sample Response

```json
{
    "result":"succes"
}   
```

### Sample Error

```json
{
	"error": "Invalid Input",
	"code": 207
}
```
----------------------------------------------------------------
## Insert data into database(advanced)

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | POST     |
| Endpoint    | /advance/insert |

### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| performanceId| bigint |12345678 |
| festivalId| bigint | 12345678 |
| startTime| String | "2200" |
| endTime| String | "2300" |
| popularity| number | 1 |

### Response Body

```json
{
    "result":string
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
POST /search
```

### Sample Response

```json
"Your data has been inserted!"
```

### Sample Error

```json
{
	"error": "Server Error",
	"code": 500
}
```
----------------------------------------------------------------
## Get The Number Of Records In The Database

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | get     |
| Endpoint    | /advance/recordCount|

### Parameters

No Parameter

### Response Body

```json
{
    "result": [
        {
            "recordCount":number 
        }
    ]
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
POST /search
```

### Sample Response

```json
{
    "result": [
        {
            "recordCount":100         
        }
    ]
}
```

### Sample Error

```json
{
	"error": "Server Error",
	"code": 500
}
```
----------------------------------------------------------------