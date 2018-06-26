import pandas
import sqlite3
import sys

conn = sqlite3.connect('database.db')

df = pandas.read_csv(sys.argv[1])
df.to_sql('test', conn, if_exists='append', index=False)

conn.commit()
conn.close()