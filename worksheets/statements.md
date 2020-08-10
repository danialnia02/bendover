# SQL Statements

For this worksheet you will need to provide an example of your own SQL statement. The two given are examples.

 ## GET

```sql
DROP TABLE IF EXISTS festivalinfo:
```

```sql
CREATE TABLE festivalinfo (
        performanceId BIGINT(10) NOT NULL,
        festivalId BIGINT(10) NOT NULL,
        startTime TIME NOT NULL,
        endTime TIME NOT NULL,
        popularity BIGINT(10) NOT NULL,
        primary KEY(performanceId)
    )
```

 ```sql
SELECT * FROM festivalInfo
 ```

```sql
SELECT * from festivalInfo where festivalId = Info.userInput
```

```sql
SELECT * from festivalInfo where festivalId = Info.userInput
```

 ```sql
 SELECT * from festivalInfo where performanceId = "'"+ id+"'"
 ```
 
```sql
SELECT * FROM festivalInfo where  + Info.attribute1 +  like "'%" + Info.input + "%'"+ Info.attribute2 + like "'%" + Info.input2 + "%'"
```
## INSERT

```sql
INSERT INTO festivalInfo(performanceId,festivalId,startTime,endTime) values ( + data2[i].performanceId + "," + data2[i].festivalId + ",'" + data2[i].startTime + "','" + data2[i].endTime + )
```

```sql
INSERT INTO festivalInfo(performanceId,festivalId,startTime,endTime) values ( + data2[i].performanceId + "," + data2[i].festivalId + ",'" + data2[i].startTime + "','" + data2[i].endTime + "'," + data2[i].popularity + )
```
```sql
SELECT count(*) as recordcount from festivalInfo
```