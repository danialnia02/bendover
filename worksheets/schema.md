# Schema
```sql
CREATE TABLE table_name(
   id SERIAL PRIMARY KEY,
   name VARCHAR UNIQUE NOT NULL,
);

CREATE TABLE table_name_2(
   id SERIAL PRIMARY KEY,
   table_name_id VARCHAR NOT NULL REFERENCES table_name(id)
);
```

```sql
CREATE TABLE festivalinfo(
	performanceId BIGINT(50) NOT NULL,
	festivalId BIGINT(50) NOT NULL,
	startTime TIME NOT NULL,
	endTime TIME NOT NULL,
	popularity BIGINT(50) NULL,
	primary Key(performanceId)
)
```