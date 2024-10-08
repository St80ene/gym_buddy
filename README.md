# **Gym Buddy** 🤖💪

**Gym Buddy** is an AI-powered chatbot designed to answer all your gym-related questions. Whether you're looking for workout advice, nutritional tips, or just need some fitness motivation, Gym Buddy has you covered! Built using **React** for the frontend and **Flask (Python)** for the backend, this bot leverages AI to provide users with real-time responses tailored to their fitness needs.

## **Features** ✨

- **Interactive Chat Interface**: Users can engage in real-time conversations with the chatbot for workout tips, fitness advice, and more.
  
- **AI-Powered Responses**: The bot leverages machine learning to provide accurate, personalized fitness answers.
  
- **Responsive Design**: The UI is optimized for all devices, ensuring a seamless experience on desktop and mobile.

- **Clear and Send Functionality**: Users can easily type in their questions, send them with the integrated button, or clear the input to start over.

- **Motivational Quotes**: In addition to answering questions, the bot occasionally sends motivational fitness quotes to keep users motivated(coming soon).

- **Workout Recommendations**: Based on user input, Gym Buddy suggests workout routines, targeting specific muscles or fitness goals.

- **Nutrition Tips**: Gym Buddy also provides nutritional advice, helping users plan meals and stay on track with their fitness goals.

## **Tech Stack** 🛠️

- **Frontend**: React
- **Backend**: Flask (Python)
- **Styling**: vanilla CSS
- **API Integration**: Axios for handling API requests between frontend and backend

## **Getting Started** 🚀

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/gym_buddy.git
cd gym_buddy
```
## 2. Setting Up the Backend
Navigate to the backend/ directory and set up your Python virtual environment:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # for Windows use `venv\Scripts\activate`
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Run the Flask server:

```bash
flask run
```

## 3. Setting Up the Frontend

Navigate to the frontend/ directory:

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm start
```
## 4. Run the App
Once both the backend and frontend servers are running, visit http://localhost:3000 in your browser to interact with Gym Buddy.

File Structure 📂
```plaintext

gym_buddy/
│
├── backend/
│   ├── app.py          # Flask API routes
│   ├── chatbot.py      # Core chatbot logic
│   ├── requirements.txt # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── assets/     # Images, icons, and other static assets
│   │   ├── components/ # React components including ChatBot
│   ├── App.jsx         # Main React component
│   ├── index.jsx       # Entry point for React
│   └── package.json    # Frontend dependencies
│
└── README.md           # Project documentation
```

## How to Contribute 🤝

We welcome contributions! If you’d like to contribute to the project, follow these steps:

- Fork the repository.
- Create a new feature branch (git checkout -b feature-branch-name).
- Make your changes and commit them (git commit -m 'Add some feature').
- Push to the branch (git push origin feature-branch-name).
- Open a pull request!

## License 📜
This project is licensed under the MIT License. See the LICENSE file for details.

## Future Features 🛠️
- AI-Driven Personal Trainer: Tailor workouts based on user preferences and fitness goals.
- User Authentication: Allow users to log in and save their workout progress and routines.
- Advanced Analytics: Track and display workout progress over time.
- Voice-Enabled Chat: Integrate voice recognition for hands-free gym advice.
