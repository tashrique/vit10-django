from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

quotes = [
    {"text": "Life is what happens when you're busy making other plans.",
        "author": "John Lennon"},
    {"text": "The way to get started is to quit talking and begin doing.",
        "author": "Walt Disney"},
    {"text": "The future belongs to those who believe in the beauty of their dreams.",
        "author": "Eleanor Roosevelt"},
    {"text": "In the end, we will remember not the words of our enemies, but the silence of our friends.",
        "author": "Martin Luther King Jr."},
    {"text": "The only way to do great work is to love what you do.",
        "author": "Steve Jobs"}
]


@app.route('/api/quote', methods=['GET'])
def get_random_quote():
    """Return a random quote from the quotes list"""
    quote = random.choice(quotes)
    return jsonify(quote)


@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({"status": "OK"})


if __name__ == '__main__':
    app.run(debug=True, port=5001)
