# DevMate – Multi-Model AI Chat Assistant with Contextual Memory  

**DevMate** is an advanced AI chat platform that enables **multi-model conversations** powered by **Google Gemini AI** with full **contextual memory**.  
It allows seamless model switching, persistent chat history, and secure user authentication — offering a natural, continuous AI interaction experience.  

---

## Overview  

DevMate bridges intelligent model selection with real-time conversational memory.  
It’s not just a chat — it’s your **developer companion** capable of understanding, reasoning, and remembering.  

Users can dynamically select from multiple **Gemini models** (like *2.5 Flash*, *2.5 Pro*, etc.) depending on their needs — whether for fast responses, coding, or deep reasoning — without losing conversation context.  

---

## Multi-Model AI Intelligence  

DevMate supports multiple Gemini models for different kinds of tasks. Each model brings unique advantages:

| Model | Ideal Use Case | Key Highlights |
|:------|:----------------|:----------------|
| **Gemini 2.5 Flash Lite** | Lightweight, quick responses | Fastest and most efficient |
| **Gemini 2.5 Pro** | Coding, reasoning, and advanced logic | Deep contextual understanding |
| **Gemini 2.5 Flash** | Balanced speed and capability | All-round performance |
| **Gemini 2.0 Flash** | Previous-gen reliability | Stable and consistent |
| **Gemini 2.0 Flash Lite** | Simple Q&A or quick ideas | Lightweight model |
| **Gemini Experimental** | Testing edge capabilities | Experimental and adaptive |

---

## Context Management System  

DevMate maintains **conversation continuity** across model switches using a smart context memory engine.  

| Feature | Description |
|:---------|:-------------|
| **Persistent Memory** | Retains full chat history even after model changes |
| **Smart Session Handling** | Each user has isolated, auto-synced sessions |
| **Dynamic Context Transfer** | Preserves discussion flow while switching models |
| **Token Optimization** | Efficient handling of large context windows |
| **Thread History** | Every chat session is stored as a retrievable thread |

---

## ⚙️ System Architecture  

<p align="center">
  <img src="" alt="DevMate System Architecture" width="700">
</p>

---

## Tech Stack  

| Category | Technologies Used |
|:-----------|:------------------|
| **Frontend** | React.js, CSS3, React Markdown, Rehype Highlight, Dark-Github |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **AI Integration** | Google Gemini AI (`@google/genai` SDK) |
| **Authentication** | JWT, bcrypt.js |
| **Deployment** | Render, MongoDB Atlas, Vercel |
| **State Management** | Context API |

---

## Security & User Management  

Your data, your privacy. DevMate integrates **JWT authentication**, **bcrypt encryption**, and **MongoDB data isolation** to ensure secure chat access.  

| Layer | Technology | Purpose |
|:------|:------------|:---------|
| **Authentication** | JWT Tokens | Secure login and user validation |
| **Password Hashing** | bcrypt | Protects credentials |
| **Data Isolation** | MongoDB user linkage | Each user accesses only their own threads |
| **Session Persistence** | localStorage + Context API | Smooth re-login experience |
| **Protected Routes** | Auth middleware | Prevents unauthorized access |

---

## 🗂️ Folder Structure  

```bash
DevMate  
├── Backend  
│   ├── middleware  
│   │   └── auth.js  
│   ├── models  
│   │   ├── Thread.js  
│   │   └── User.js  
│   ├── routes  
│   │   ├── auth.js  
│   │   └── chat.js  
│   ├── utils  
│   │   └── gemini.js  
│   ├── .env  
│   ├── package-lock.json  
│   ├── package.json  
│   └── server.js  
│  
├── Frontend  
│   ├── public  
│   ├── src  
│   │   ├── components  
│   │   │   ├── AuthContainer.jsx  
│   │   │   ├── Chat.jsx  
│   │   │   ├── ChatWindow.jsx  
│   │   │   ├── Login.jsx  
│   │   │   ├── ModelInfo.jsx  
│   │   │   ├── ModelSelector.jsx  
│   │   │   ├── Register.jsx  
│   │   │   └── Sidebar.jsx  
│   │   ├── contexts  
│   │   │   └── AuthContext.jsx  
│   │   ├── styles  
│   │   │   ├── chat.css  
│   │   │   ├── chatWindow.css  
│   │   │   ├── login.css  
│   │   │   ├── modelInfo.css  
│   │   │   ├── modelSelector.css  
│   │   │   ├── sidebar.css  
│   │   │   ├── App.css  
│   │   │   └── index.css  
│   │   ├── App.jsx  
│   │   ├── main.jsx  
│   │   ├── MyContext.jsx  
│   │   └── index.html  
│   ├── .gitignore  
│   ├── eslint.config.js  
│   ├── package-lock.json  
│   ├── package.json  
│   └── vite.config.js  
│  
└── README.md
```

---

## Installation  

### 1. Clone Repository  
```bash
git clone https://github.com/kasaudhanshivam/DevMate.git
cd DevMate
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create .env file:
```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEN_API_KEY=your_google_gemini_api_key
PORT=8000
```

Run server:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```

Update API base URL in src/components and AuthContext.jsx to enable local development:
```bash
const serverURL = 'http://localhost:8000/api'
```

Start frontend development server:
```bash
npm run dev
```

Visit:

Frontend → http://localhost:5173

Backend → http://localhost:8000

## Future Enhancements

DevMate is designed with scalability, personalization, and extensibility in mind.  
Below are the planned upgrades and advanced modules aimed at enhancing its intelligence, usability, and developer experience:  

- **Document Intelligence Module** — Allow users to upload files (PDFs, Docs, or Text) and chat with their contents, enabling context-driven responses using embedded document vectors.
- **Voice & Speech Integration** — Add speech-to-text and text-to-speech capabilities for hands-free AI interaction and accessibility support.  
- **Dockerized Cloud Deployment** — Offer containerized deployment with Nginx proxy and CI/CD pipelines for production scalability.
- **Model Performance Optimizer** — Automatically recommend the most suitable AI model based on user intent, task type, and conversation context.  

---

## Contributing

Contributions are always welcome!  

If you’d like to add new features or fix bugs:
1. **Fork** the repository  
2. **Create a new branch** (`git checkout -b feature-name`)  
3. **Commit your changes** (`git commit -m "Added new feature"`)  
4. **Push to your branch** (`git push origin feature-name`)  
5. **Open a Pull Request**

---

## 💙 Developed By

**Shivam Kasaudhan**  
If you like this project, don’t forget to **⭐ star the repo** on GitHub!  
_Think, Build, and Chat — smarter with DevMate._