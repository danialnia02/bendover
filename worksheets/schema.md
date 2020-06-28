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
CREATE TABLE [dbo].[festivalInfo](
	[performanceId] [int] NOT NULL,
	[festivalId] [int] NOT NULL,
	[startTime] [int] NOT NULL,
	[endTime] [int] NOT NULL,
	[popularity] [int] NOT NULL
) ON [PRIMARY]

CREATE TABLE [dbo].[pollUser](
	[pollid] [int] NOT NULL,
	[name] [varchar](1) NOT NULL,
	[email] [varchar](1) NOT NULL,
	[popularChosen] [int] NOT NULL
) ON [PRIMARY]

```