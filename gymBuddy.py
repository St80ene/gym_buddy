import os
import socket
from flask import Flask, jsonify, request
from flask_cors import CORS
import nltk
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from dotenv import load_dotenv
from training_data import training_data  # Import the training data

app = Flask(__name__)
CORS(app)

load_dotenv() 

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

def find_free_port():
    new_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    new_socket.bind('', 0) # Bind to an available port
    port = new_socket.getsockname()[1]
    new_socket.close()
    
    print(f"The OS has assigned port: {port}")
    return port

# Define API route to receive responses
@app.route('/chat', methods=['POST'])
def chatBot():
    data = request.json
    user_message = data.get('message')
    
    if not user_message:
        return jsonify({"error": "Message Content missing"}), 400
    
    response = chatbot.get_response(user_message)
    stringifiedResponse = str(response)
    
    print(stringifiedResponse)
    
    return jsonify({"response": str(stringifiedResponse)})

if __name__ == "__main__":
    # Get port number form the environment variables and cast to integer
    assigned_port = int(os.getenv('PORT', 5000))
    
    try:
        app.run(debug=True, port=assigned_port)
    except OSError:
        # Find free port of desired is in use
        print(f"Port {assigned_port} is already in use. Trying another port...")
        free_port = find_free_port()
        app.run(debug=True, port=free_port)