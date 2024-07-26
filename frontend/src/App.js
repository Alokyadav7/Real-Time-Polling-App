import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PollList from './components/PollList';
import CreatePoll from './components/CreatePoll';

function App() {
    return (
        <Router>
            <div className="bg-gray-200 min-h-screen flex flex-col">
                <header className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white shadow-md rounded-b-lg">
                    <h1 className="text-4xl font-extrabold text-center">Real-Time Polling System</h1>
                </header>
                <main className="flex-1 p-6 md:p-12 bg-white shadow-lg rounded-lg mt-6 mx-4 md:mx-12 mb-6">
                    <Routes>
                        <Route path="/" element={<PollList />} />
                        <Route path="/create" element={<CreatePoll />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
