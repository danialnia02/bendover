# SQL Statements

For this worksheet you will need to provide an example of your own SQL statement. The two given are examples.

 ## GET

 ```sql
SELECT * FROM festivalInfo
 ```

 ```sql
 SELECT * from festivalInfo where Info.attribute like '%input%'
 ```
 
 ```sql
SELECT * FROM festivalInfo where  + Info.attribute1 +  like "'%" + Info.input + "%'"+ Info.attribute2 + like "'%" + Info.input2 + "%'"
 ```

 ```sql
 SELECT * from festivalInfo where festivalId = Info.userInput
 ```

 ```sql
 SELECT * from festivalInfo where festivalId = Info.userInput
 ```

 ```sql
 SELECT * FORM festivalInfo where performaceId = + id
```

```sql
SELECT count(*) as recordcount from festivalInfo
```

```sql
SELECT column_name as name from information_schema.columns where table_name = 'festivalInfo'
```

## INSERT

```sql
INSERT INTO festivalInfo(performanceId,festivalId,startTime,endTime) values ( + data2[i].performanceId + "," + data2[i].festivalId + ",'" + data2[i].startTime + "','" + data2[i].endTime + )
```

```sql
INSERT INTO festivalInfo(performanceId,festivalId,startTime,endTime) values ( + data2[i].performanceId + "," + data2[i].festivalId + ",'" + data2[i].startTime + "','" + data2[i].endTime + "'," + data2[i].popularity + )
```
