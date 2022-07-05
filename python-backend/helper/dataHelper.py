import sqlite3

## input is the value, search is either "OPEID" or "name"
def getData(input, search):
    connection = sqlite3.connect("school-data.db")
    cursor = connection.cursor()    
    query = "SELECT * FROM schools where {}=?".format(search)
    result = cursor.execute(query, (input,))
    row = result.fetchone()
    connection.close()
    return row

## Get all data from the database
def getAll():
    connection = sqlite3.connect("school-data.db")
    cursor = connection.cursor()
    query = "SELECT * FROM schools"
    cursor.execute(query)
    result = cursor.fetchall()
    connection.close()
    return result