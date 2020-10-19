from flask import Flask, jsonify

app=Flask(__name__)
@app.route('/')
def home():
        return "<h1>Hello world</h1>"

@app.route('/json')
def json():
         return jsonify({'fn': 'Mahak', 'ln': 'Modani'})
@app.route('/jsons')
def jsons():
         return jsonify({'fn':'Mahak','ln' : 'Modani'})

if __name__  == '__main__':
       app.run(port=3000, debug=True)