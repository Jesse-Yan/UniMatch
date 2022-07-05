## Backend Introduction

### API
-------------
#### GET 
- /schools/all  **_(response is an array, each element is an object with detailed information of a college)_**
- /schools/byname  
    - /basic/**string:name**
    - /full/**string:name**
    - /score/**string:name**
- /schools/byid  
[Search for OPEID of US colleges](https://opecode.com/)
    - /basic/**int:opeid**
    - /full/**int:opeid**
    - /score/**int:opeid**
- /users/**string:username**
#### POST
- /signup (username, password, highschool, dreamschool required)
- /auth (username, password required)
- /users/**string:username**  _**(jwt_required)**_

Note:  <br />
200 to 299: good status code <br />
400 to 499: bad request

### JSON Format
-----
#### Full college information
``` JSON
  "ACT_25": 28,
  "ACT_75": 33,
  "ACT_AVG": 31,
  "ACT_EN_25": 27,
  "ACT_EN_75": 34,
  "ACT_EN_AVG": 31,
  "ACT_M_25": 28,
  "ACT_M_75": 33,
  "ACT_M_AVG": 31,
  "SAT_AVG": 1383,
  "SAT_M_25": 660,
  "SAT_M_75": 740,
  "SAT_M_MID": 700,
  "SAT_R_25": 630,
  "SAT_R_75": 710,
  "SAT_R_MID": 670,
  "admission_rate": 0.492,
  "attendance_fee": 33038,
  "city": "Golden",
  "enrollment": 4906,
  "graduates": 1373,
  "latitude": 39.75,
  "longitude": -105.22,
  "name": "Colorado School of Mines",
  "race_asian": 0.045,
  "race_black": 0.01,
  "race_hispanic": 0.092,
  "race_white": 0.722,
  "retention_rate": 0.921,
  "state": "CO",
  "transfer_rate": 0.061,
  "tuition_IN": 18964,
  "tuition_OUT": 38584,
  "url": "www.mines.edu",
  "image": "https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,q_75,w_1200/https://assets.simpleviewinc.com/simpleview/image/upload/crm/sanmateoca/shutterstock_4189008910-9b68011a5056a36_9b6802fa-5056-a36a-0bbb53c8e971b411.jpg"
```

#### Basic college information
``` JSON
"admission_rate": 0.067,
"enrollment": 4550,
"name": "Massachusetts Institute of Technology",
"state": "MA"
```

#### Admission score information
``` JSON
  "ACT_25": 34,
  "ACT_75": 36,
  "ACT_AVG": 35,
  "ACT_EN_25": 34,
  "ACT_EN_75": 36,
  "ACT_EN_AVG": 35,
  "ACT_M_25": 34,
  "ACT_M_75": 36,
  "ACT_M_AVG": 35,
  "SAT_AVG": 1545,
  "SAT_M_25": 780,
  "SAT_M_75": 800,
  "SAT_M_MID": 790,
  "SAT_R_25": 720,
  "SAT_R_75": 770,
  "SAT_R_MID": 745
```

#### Documentation
- _"ACT_AVG"_ is the average cumulative ACT score
- _"ACT_M_AVG"_ is the average ACT math score
- _"Enrollment"_ is only the undergraduate enrollment
- _"graduates"_ is the number of graduate students
- _"attendance fee"_ is the estimated cost a student will spend in an academic year (tuition, personal expense...)

### How to run Backend
-------------
First install Numpy library globally
```
pip install numpy
```
Then, install virtual environment inside the "./python-backend"
```shell
pip install virtualenv

virtualenv venv --python=python3.7
```
_Note that python3.7 is my version. Change it to your current version_ <br />

To activate it:
```shell
./venv/Scripts/activate
```
To install necessary python library after you activate the virtual environment:
```shell
pip install Flask
pip install Flask-RESTful
pip install Flask-JWT
pip install -U flask-cors
```
Run backend:
```
python run.py
```
To quit:
```
deactivate
```

