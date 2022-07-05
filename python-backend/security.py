from model.user import User

def authenticate(username, password):
    user = User.find_by_username(username)
    if user and user.password == password:
        return user

def identiy(payloads):
    user_id = payloads["identity"]
    return User.find_by_id(user_id)