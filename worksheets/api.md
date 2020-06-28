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

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/data |
 
### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| id        | 10 digit number | 123456789 |

### Response Body

```json
{
    "result": [
        {
            "id": number,
            "property1": number,
            "property2": string,
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
GET /basic/data?id=1234567890
```

### Sample Response

```json
{
    "result": [
        {
            "id": 1234567890,
            "property1": 1234567890,
            "property2": "haha",
            ...
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

## Get All Data

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/result |

### Parameters

No parameters

### Response Body

```json

[
    {
        "performanceId": number,
        "festivalId": number,
        "startTime": string,
        "endTime": string,
        "popularity":number   
    }
]
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
GET /basic/results
```

### Sample Response

```json
[
    {
        "performanceId": 123457,
        "festivalId": 123456,
        "startTime": "2100",
        "endTime": "2230",
        "popularity":0   
    }
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
## Get Data based on festivalId

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/result/:festivalid |

### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| festivalid | number | 123456789 |

### Response Body

```json
{
    "result": [
        {
            "performanceId": number,
            "festivalId": number,
            "startTime": string,
            "endTime": string,
            "popularity":number            
        }
    ]
}
[
    [
        {
            "type": "string",
            "label":"count"
        },
        {
            "type": "string",
            "label":"popularity"
        },
        {
            "type": "string",
            "label":"performanceId"
        },
        {
            "type": "date",
            "label":"startTime"
        },
        {
            "type": "date",
            "label":"endTime"
        },
        {
            "type": "number",
            "label":"popularity"
        },
        {
            "type": "number",
            "label":"Percent Complete"
        },
        {
            "type": "string",
            "label":"Dependencies"
        }
    ],
    [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        null,
    ]
]
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
GET /basic/result/:festivalid=123456
```

### Sample Response

```json
[
    [
        {
            "type": "string",
            "label": "count"
        },
        {
            "type": "string",
            "label": "peformanceId"
        },
        {
            "type": "string",
            "label": "peformanceId"
        },
        {
            "type": "date",
            "label": "startTime"
        },
        {
            "type": "date",
            "label": "endTime"
        },
        {
            "type": "number",
            "label": "popularity"
        },
        {
            "type": "number",
            "label": "Percent Complete"
        },
        {
            "type": "string",
            "label": "Dependencies"
        }
    ],
    [
        0,
        1000000001,
        1000000001,
        1592877600000,
        1592881200000,
        1,
        100,
        null
    ]
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
## Get Data based on performanceId

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/result/:performanceId |

### Parameters

| parameter | datatype        | example   |
| --------- | --------------- | --------- |
| performanceId        | 10 digit number | 123456789 |

### Response Body

```json
{
    "result": [
        {
            "performanceId": number,
            "festivalId": number,
            "startTime": string,
            "endTime": string,
            "popularity":number            
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
GET /basic/result/:festivalid=123456
```

### Sample Response

```json
{
    "result": [
        {
            "performanceId": 123457,
            "festivalId": 123456,
            "startTime": "2100",
            "endTime": "2230",
            "popularity":0            
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
| operation| String | +,=,<,> |
| attribute1(performanceId)| String | 12345678 |
| input1| String | 12345678 |
| attribute2(festivalId)| String | 12345678 |
| input2| String | 12345678 |

### Response Body

```json
{
    "result": [
        {
            "performanceId": number,
            "festivalId": number,
            "startTime": string,
            "endTime": string,
            "popularity":number            
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
GET /search
```

### Sample Response

```json
{
    "result": [
        {
            "performanceId": 123457,
            "festivalId": 123456,
            "startTime": "2100",
            "endTime": "2230",
            "popularity":0            
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

### Response Body

```json
{
    "result": [
        {
            "performanceId": number,
            "festivalId": number,
            "startTime": string,
            "endTime": string,
            "popularity":number            
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
    "result": [
        {
            "performanceId": number,
            "festivalId": number,
            "startTime": string,
            "endTime": string,
            "popularity":number            
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
| Endpoint    | /advance/recordCount |

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