from flask import Flask, jsonify, request
from flask_jwt import JWT
from flask_restful import Api
from flask_cors import CORS
import numpy as np

from helper.formatHelper import formatScore, formatBasic, formatFull
from helper.dataHelper import getData, getAll
from resource.user import UserRegister, UserInfo
from security import authenticate, identiy
from create_table import create_table

app = Flask(__name__)
CORS(app)

app.secret_key = "00001"

api = Api(app)

jwt = JWT(app, authenticate, identiy)  ## /auth endpoint. return {"access_token": <value>}

## Get schools by name
@app.route("/schools/byname/score/<string:name>")
def get_score_school_by_name(name):
    row = getData(name, "name")
    return jsonify(formatScore(row))

@app.route("/schools/byname/basic/<string:name>")
def get_basic_school_by_name(name):
    row = getData(name, "name")
    return jsonify(formatBasic(row))

@app.route("/schools/byname/full/<string:name>")
def get_full_school_by_name(name):
    row = getData(name, "name")
    return jsonify(formatFull(row))

## Get schools by OPEID
@app.route("/schools/byid/score/<int:opeid>")
def get_score_school_by_id(opeid):
    row = getData(opeid, "OPEID")
    return jsonify(formatScore(row))

@app.route("/schools/byid/basic/<int:opeid>")
def get_basic_school_by_id(opeid):
    row = getData(opeid, "OPEID")
    return jsonify(formatBasic(row))

@app.route("/schools/byid/full/<int:opeid>")
def get_full_school_by_id(opeid):
    row = getData(opeid, "OPEID")
    return jsonify(formatFull(row))

## Get all data from the databse
@app.route("/schools/all")
def get_all_data():
    rows = getAll()
    result = []
    for row in rows:
        result.append(formatFull(row))
    return jsonify(result)

## This route is to find the best-fit school for a student based on one's scores and preference
@app.route("/schools/analyze")
def analyze_school():
    data = request.json
    student_score_dict = data["score"] # {"scores": {"value": 1540, "type": "SAT"} }
    student_score = student_score_dict["value"]
    exam_type = student_score_dict["type"]
    max_expense = data["expense"]  ## Maximum attendance fee one can endure

    ## Get all schools' information
    allSchools = getAll()
    usefulInfo = []

    # Construct the array to store useful information
    for school in allSchools:
        schoolInfo = []
        schoolInfo.append(school[1])
        schoolInfo.append(school[35])
        if exam_type == 'SAT':
            if isinstance(school[15], int):
                schoolInfo.append(school[15])
            else:
                schoolInfo.append(0)
        else:
            if (isinstance(school[22], int)):
                schoolInfo.append(school[22])
            else:
                schoolInfo.append(0)
        usefulInfo.append(schoolInfo)

    # Make analysis
    array = np.array(usefulInfo)
    filtered_array = array[array[:,1] < max_expense]
    idx = (np.abs(filtered_array[:,2] - student_score)).argmin()
    data["opeid"] = str(filtered_array[idx][0])
    return jsonify(data)

## Add signup and get user resource
api.add_resource(UserRegister, "/signup")
api.add_resource(UserInfo, "/user/<string:username>")

if __name__ == "__main__":
    create_table()
    app.run(port=5000, debug=True)
