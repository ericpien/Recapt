# backend
from flask import Flask, request, jsonify
from ExternalAPIs import ExternalAPIs
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


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
        if captions == "Sorry, this video's captions are not available to us.":
            return jsonify(message=captions)

        if len(captions.split(' ')) <= 5000:
            sum1 = 'Here is a summary you previously gave me. Rewrite this in better English for a video description, immediately act as if you were writing a video description as the content creator. Use "we" pronouns. Max word count is 400 words.'
            sum2 = 'Summarize the following captions from a Youtube video as if you were the content creator: '
        else:
            sum1 = 'Summarize: '
            sum2 = 'Summarize: '
        # get the response
        prompt, captions = get_prompt(search_text, captions, sum2)
        responses = []
        responses.append(ExternalAPIs.getGPT(prompt))
        while prompt != '':
            prompt, captions = get_prompt(search_text, captions, sum2)
            responses.append(' ' + ExternalAPIs.getGPT(prompt))

        if search_text == 'summarize':
            response = ' '.join(responses)
            prompt, captions = get_prompt(
                sum1, response, sum2)
            response = ExternalAPIs.getGPT(prompt)
        else:
            response = max(responses, key=len)
        return jsonify(message=response)


def get_prompt(search_text, captions, sum2):
    if captions != '':
        captions_clip = captions[0:9500]
        if search_text == 'summarize':
            question = sum2
            context = captions_clip
        else:
            question = 'Here is a question that I want you to answer: '
            question += search_text + '. '
            context = 'Here are the captions for you to use to answer the question, answer immediately and as if you were answering this question about your own video. Use we pronouns. ' + captions_clip

        prompt = question + context

        return prompt, captions[9500:]
    else:
        return '', ''


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
