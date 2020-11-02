from flask import Flask, jsonify ,request
import pandas as pd
import random 

#from twilio.twiml.messaging_response import MessagingResponse
#from openpyxl import load_workbook, Workbook

app=Flask(__name__)
@app.route('/')
def func():
    #data = pd.read_excel (r'/home/mahak/Documents/ssdproject/level1.ods') 
    excel_file='/home/mahak/Documents/floder1/level1.csv'
    df = pd.read_csv(excel_file)

    #wb = load_workbook(excel_file)
    #ws = wb[wb.sheetnames[0]]
    #return ws.to_html()
    #lis=[]
    index_list = df["Level1"].tolist()
    random_num = random.choice(index_list)
    #return("<p>" + "</p><p>".join(random_num) + "</p>")
    return  random_num

@app.route('/level2')
def func2():
    #data = pd.read_excel (r'/home/mahak/Documents/ssdproject/level1.ods') 
    excel_file='/home/mahak/Documents/floder1/level2.csv'
    df = pd.read_csv(excel_file)

    #wb = load_workbook(excel_file)
    #ws = wb[wb.sheetnames[0]]
    #return ws.to_html()
    #lis=[]
    index_list = df["Level2"].tolist()
    random_num = random.choice(index_list)
    #return("<p>" + "</p><p>".join(random_num) + "</p>")
    return  random_num

@app.route('/level3')
def func3():
    #data = pd.read_excel (r'/home/mahak/Documents/ssdproject/level1.ods') 
    excel_file='/home/mahak/Documents/floder1/level3.csv'
    df = pd.read_csv(excel_file)

    #wb = load_workbook(excel_file)
    #ws = wb[wb.sheetnames[0]]
    #return ws.to_html()
    #lis=[]
    index_list = df["Level3"].tolist()
    random_num = random.choice(index_list)
    #return("<p>" + "</p><p>".join(random_num) + "</p>")
    return  random_num
if __name__ == "__main__":
    app.run(port=5000,debug=True)

