from flask import Flask
import WordHelperLibrary as helper
app = Flask(__name__)
@app.route('/')
def hello_world():
    dictionary = Dictionary()
    return 'Hello, World! asdfafdafdadfafa'

@app.route('/urlTest')
def hello_worlds():
    return 'Hello, World! urlTest'

dictionary = []
if __name__ == '__main__':
    dictionary = helper.Dictionary()
    #app.run(host='0.0.0.0', debug=True)