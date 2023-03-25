# backend
from flask import Flask, request, jsonify
from ExternalAPIs import ExternalAPIs
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
        captions = ExternalAPIs.getCaptions(url)
        # get the response
        prompt, captions = get_prompt(search_text, captions)
        responses = []
        responses.append(ExternalAPIs.getGPT(prompt))
        while prompt != '':
            prompt, captions = get_prompt(search_text, captions)
            responses.append(' ' + ExternalAPIs.getGPT(prompt))

        if search_text == 'summarize':
            response = ' '.join(responses)
            prompt, captions = get_prompt(
                'Here is a summary you previously gave me, can you resummarize this to be less repetitive?', response)
            response = ExternalAPIs.getGPT(prompt)
        else:
            response = max(responses, key=len)
        return jsonify(message=response)


def get_prompt(search_text, captions):
    if captions != '':
        captions_clip = captions[0:9500]
        if search_text == 'summarize':
            question = 'Summarize the following captions from a Youtube video: '
            context = captions_clip
        else:
            question = 'Here is a question that I want you to answer: '
            question += search_text + '. '
            context = 'Here are the captions for you to use to answer the question, answer in a concise manner: ' + captions_clip

        prompt = question + context

        return prompt, captions[9500:]
    else:
        return '', ''


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
