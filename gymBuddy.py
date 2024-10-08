from flask import Flask, jsonify, request
from flask_cors import CORS
import nltk
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from training_data import training_data  # Import the training data

app = Flask(__name__)
CORS(app)

# Download necessary NLTK data
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')

# Initialize chatbot
chatbot = ChatBot('Gym Buddy')

# Wipe the database
chatbot.storage.drop()

trainer = ListTrainer(chatbot)

# Train the chatbot with the imported data
trainer.train(training_data)

# Define API route to receive responses
@app.route('/chat', methods=['POST'])
def chatBot():
    data = request.json
    user_message = data.get('message')
    
    if not user_message:
        return jsonify({"error": "Message Content missing"}), 400
    
    response = chatbot.get_response(user_message)
    
    return jsonify({"response": str(response)})

if __name__ == "__main__":
    app.run(debug=True)
