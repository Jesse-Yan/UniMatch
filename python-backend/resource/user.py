from flask_restful import Resource, reqparse
from flask_jwt import jwt_required

from model.user import User

class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("username",
        type=str, required=True, 
        help="cannot leave blank")
    parser.add_argument("password",
        type=str, required=True,
        help="cannot leave blank")
    parser.add_argument("highschool",
        type=str, required=True, 
        help="cannot leave blank")
    parser.add_argument("dreamschool",
        type=str, required=True,
        help="cannot leave blank")

    def post(self):
        data = UserRegister.parser.parse_args()
        result = User.store_to_db(**data)
        return {"message": result["message"]}, result["status code"]

class UserInfo(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("dreamschool",
        type=str, required=True, 
        help="cannot leave blank")

    def get(self, username):
        user = User.find_by_username(username)
        if user:
            return user.json()
        else:
            return {"message": "user not found"}, 404

    @jwt_required()
    def post(self, username):
        user = User.find_by_username(username)
        if not user:
            return {"message": "user not found"}, 404
        result = User.update(username, UserInfo.parser.parse_args()["dreamschool"])
        return {"message": result["message"]}, result["status code"]
        