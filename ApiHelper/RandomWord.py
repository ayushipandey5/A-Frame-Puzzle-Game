from flask import Flask, jsonify ,request
import pandas as pd
import random 
import ApiHelper.Constants as const
from bs4 import BeautifulSoup as soup
import urllib3 as urlHelper
import ApiHelper.WordFinder as wordFinder

class json_format:
    def __init__(self,current_level,points_nextlevel,jumble_letters,total_answer,words):
        self.current_level=current_level
        self.points_nextlevel=points_nextlevel
        self.jumble_letters=jumble_letters
        self.total_answer=total_answer
        self.words=words 

    def create_dict(self):
        message = {
        "CurrentLevel": self.current_level,
        "PointstoNextLevel": self.points_nextlevel,
        "JumbleLetters":self.jumble_letters,
        "TotalAnswers":self.total_answer,
        "Words":self.words
        }
        return message
  
            
app=Flask(__name__)
@app.route('/level1')
def func():
    #data = pd.read_excel (r'/home/mahak/Documents/ssdproject/level1.ods') 
    excel_file='ApiHelper/level1.csv'
    df = pd.read_csv(excel_file)
    index_list = df["Level1"].tolist()
    random_num = random.choice(index_list)
    #return("<p>" + "</p><p>".join(random_num) + "</p>")
    finalword= wordFinder.AnagramFinder(random_num)
    level=1
    points_nextlevel=50
    jumble_letters=list(random_num)
    jumble_letters=random.sample(jumble_letters,len(random_num))

    
    word_list=[]
    count=0
    for i in finalword:
            word_dict={}
            word_dict["word"]=i.word
            word_dict["score"]=i.score
            count+=1
            word_list.append(word_dict)    
    obj=json_format(level,points_nextlevel,jumble_letters,count,word_list)
    message=obj.create_dict()
    resp = jsonify(message)
    resp.status_code = 200
    print(resp)
    return after_request(resp)




@app.route('/level2')
def func2(): 
    excel_file='ApiHelper/level2.csv'
    df = pd.read_csv(excel_file)
    index_list = df["Level2"].tolist()
    random_num = random.choice(index_list)
    #return("<p>" + "</p><p>".join(random_num) + "</p>")
    finalword= wordFinder.AnagramFinder(random_num)
    level=2
    points_nextlevel=70
    jumble_letters=list(random_num)
    jumble_letters=random.sample(jumble_letters,len(random_num))

    
    word_list=[]
    count=0
    for i in finalword:
            word_dict={}
            word_dict["word"]=i.word
            word_dict["score"]=i.score
            count+=1
            word_list.append(word_dict)    
    obj=json_format(level,points_nextlevel,jumble_letters,count,word_list)
    message=obj.create_dict()
    resp = jsonify(message)
    resp.status_code = 200
    print(resp)
    return after_request(resp)

    

@app.route('/level3')
def func3():
    #data = pd.read_excel (r'/home/mahak/Documents/ssdproject/level1.ods') 
    excel_file='ApiHelper/level3.csv'
    df = pd.read_csv(excel_file)
    index_list = df["Level3"].tolist()
    random_num = random.choice(index_list)
    #return("<p>" + "</p><p>".join(random_num) + "</p>")
    finalword= wordFinder.AnagramFinder(random_num)
    level=3
    points_nextlevel=100
    jumble_letters=list(random_num)
    jumble_letters=random.sample(jumble_letters,k=len(random_num))

    
    word_list=[]
    count=0
    for i in finalword:
            word_dict={}
            word_dict["word"]=i.word
            word_dict["score"]=i.score
            count+=1
            word_list.append(word_dict)    
    obj=json_format(level,points_nextlevel,jumble_letters,count,word_list)
    message=obj.create_dict()
    resp = jsonify(message)
    resp.status_code = 200
    print(resp)
    return after_request(resp)

def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response



