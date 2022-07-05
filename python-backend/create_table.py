import sqlite3

def create_table():
    connection = sqlite3.connect("user-data.db")

    cursor = connection.cursor()

    # Create a table for "users"
    create_table_users = "CREATE TABLE if NOT EXISTS users (id INTEGER PRIMARY KEY, username text, password text, highschool text, dreamschool text)"
    cursor.execute(create_table_users)

    connection.commit()

    connection.close()