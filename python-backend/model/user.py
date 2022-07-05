import sqlite3

class User(object):
    def __init__(self, id, username, password, highschool, dreamschool):
        self.id = id
        self.username = username
        self.password = password
        self.highschool = highschool
        self.dreamschool = dreamschool
    
    @classmethod
    def store_to_db(self, username, password, highschool, dreamschool):
        if User.find_by_username(username):
            return {"message": "user already exists", "status code": 400}

        try:
            connection = sqlite3.connect("user-data.db")
            cursor = connection.cursor()
        except:
            return {"message": "fail to connect to the datbase", "status code": 500}

        query = "INSERT INTO users VALUES (NULL,?,?,?,?)"
        try:
            cursor.execute(query, (username, password, highschool, dreamschool,))
        except:
            return {"message": "fail to store to the database", "status code": 500}

        connection.commit()
        connection.close()
        return {"message": "new user has been successfully stored", "status code": 201}

    @classmethod
    def update(cls, username, dreamschool):
        try:
            connection = sqlite3.connect("user-data.db")
            cursor = connection.cursor()
        except:
            return {"message": "fail to connect to the datbase", "status code": 500}

        query = "UPDATE users SET dreamschool=? where username=?"
        try:
            cursor.execute(query, (dreamschool, username))
        except:
            return {"message": "fail to store to the database", "status code": 500}

        connection.commit()
        connection.close()
        return {"message": "successfully updated", "status code": 201}

    @classmethod
    def find_by_username(cls, username):
        try:
            connection = sqlite3.connect("user-data.db")
            cursor = connection.cursor()
        except:
            return {"message": "fail to connect to the datbase", "status code": 500}

        query = "SELECT * FROM users where username=?"
        try:
            result = cursor.execute(query, (username, ))
        except:
            return {"message": "fail to search in the database", "status code": 500}

        row = result.fetchone()
        if row:
            user = cls(*row)
        else:
            user = None
        
        connection.close()
        return user
    
    @classmethod
    def find_by_id(cls, id):
        try:
            connection = sqlite3.connect("user-data.db")
            cursor = connection.cursor()
        except:
            return {"message": "fail to connect to the datbase", "status code": 500}

        query = "SELECT * FROM users where id=?"
        try:
            result = cursor.execute(query, (id, ))
        except:
            return {"message": "fail to search in the database", "status code": 500}

        row = result.fetchone()
        if row:
            user = cls(*row)
        else:
            user = None
        
        connection.close()
        return user

    def json(self):
        return {
            "username": self.username,
            "highschool": self.highschool,
            "dreamschool": self.dreamschool
        }