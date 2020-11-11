from flask import Flask, jsonify ,request
import pandas as pd
import random 
import Constants as const
from bs4 import BeautifulSoup as soup
import urllib3 as urlHelper


request_headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
class words:
    def __init__(self, word, length, score):
        self.length = length
        self.word = word
        self.score = score

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



def AnagramFinder(word):
    my_url = const.apiUrl.replace("[Word]", word)
    https = urlHelper.PoolManager()
    url_client=https.request('Get', my_url, headers = request_headers)
    page_html=url_client.data
    url_client.close()
    page_soup = soup(page_html, "html.parser")
    orderedList = page_soup.findAll("div", {"class": "wordblock"})
    anagramWords = []
    for lists in orderedList:
        try:
            currWord = lists.find("a").get_text()
        except: 
            currWord = ""
        try:
            score = lists.find("sub").get_text()
        except: 
            score = ""
        try:
            length = lists.find("a")['data-length']
        except: 
            length = len(currWord)
        anagramWords.append(words(currWord, length, score))
    return anagramWords
  
            
app=Flask(__name__)
@app.route('/')
def func():
    #data = pd.read_excel (r'/home/mahak/Documents/ssdproject/level1.ods') 
    excel_file='level1.csv'
    df = pd.read_csv(excel_file)
    index_list = df["Level1"].tolist()
    random_num = random.choice(index_list)
    #return("<p>" + "</p><p>".join(random_num) + "</p>")
    finalword= AnagramFinder(random_num)
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
    return resp




@app.route('/level2')
def func2(): 
    excel_file='level2.csv'
    df = pd.read_csv(excel_file)
    index_list = df["Level2"].tolist()
    random_num = random.choice(index_list)
    #return("<p>" + "</p><p>".join(random_num) + "</p>")
    finalword= AnagramFinder(random_num)
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
    return resp

    

@app.route('/level3')
def func3():
    #data = pd.read_excel (r'/home/mahak/Documents/ssdproject/level1.ods') 
    excel_file='level3.csv'
    df = pd.read_csv(excel_file)
    index_list = df["Level3"].tolist()
    random_num = random.choice(index_list)
    #return("<p>" + "</p><p>".join(random_num) + "</p>")
    finalword= AnagramFinder(random_num)
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
    return resp



if __name__ == "__main__":
    app.run(port=5000,debug=True)

