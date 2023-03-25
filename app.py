# backend
from flask import Flask, request, jsonify
app = Flask(__name__)


@app.route('/response', methods=['GET'])
def get_gpt_response():
    if(request.method == 'GET'):
        args = request.args
        url = args.get('url', '')
        search_text = args.get('search_text', '')
        # handle if the request is missing info
        if url == '':
            return jsonify(status="error", message="Sorry, there was a problem retrieving this video's info.")
        if search_text == '':
            return jsonify(status="error", message="You must provide a question to get a response.")
        # get the captions
        captions = ''
        # get the response
        prompt = get_prompt(search_text, captions)
        response =''
        return jsonify(message=response)


def get_prompt(search_text, captions):
    if search_text == 'summarize':
        question = 'Summarize the following captions from a Youtube video: '
        context = captions
    else:
        question = 'Here is a question that I want you to answer: '
        question += search_text + '. '
        context = 'Here are the captions for you to use to answer the question, if you are not sure of the answer using these captions say "Sorry, I do not know.": ' + captions

    prompt = question + context
    return prompt


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
