# SQL Statements

For this worksheet you will need to provide an example of your own SQL statement. The two given are examples.

## INSERT

Example:
```sql
INSERT INTO table_name (attr1, attr2,...) VALUES (value1, value2, ...);
```

```sql
insert into dbo.festivalInfo (performanceId,festivalId,startTime,endTime,popularity) VALUES (?,?,?,?,?);
```

## SELECT with Filtering and Pagination

Example:
```sql
SELECT * FROM table_name WHERE attr1 == value1 AND attr2 >= value2 LIMIT 10 OFFSET 20;

```
```sql
SELECT * FROM dbo.festivalInfo where  + Info.attribute + " " + Info.operation + " + " + Info.userInput +

```
```sql
SELECT * FROM dbo.festivalInfo where performanceId = + Info.userInput + 


```sql
SELECT * FROM dbo.festivalInfo where performanceId =  + id
```

```sql
SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'festivalInfo' ORDER BY ORDINAL_POSITION
```

```sql
SELECT count(*) as recordCount from dbo.festivalInfo
```
