# backend
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/response', methods=['GET'])
def get_gpt_response():
    if(request.method == 'GET'):
        data = {"data": "Hello World"}
        return jsonify(data)

if __name__ == '__main__':
   app.run(debug=True, host='0.0.0.0', port=8080)