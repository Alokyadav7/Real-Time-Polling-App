import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePoll = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const navigate = useNavigate();

    const addOption = () => {
        setOptions([...options, '']);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const submitPoll = async () => {
        if (question.trim() === '' || options.some(option => option.trim() === '')) {
            alert('Question and all options must be filled out');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/polls', {
                question,
                options: options.map(option => ({ text: option, votes: 0 }))
            });
            navigate('/');
        } catch (error) {
            console.error('Error creating poll:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Create a New Poll</h2>
            <div className="mb-4">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Poll question"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))}
            </div>
            <div className="flex justify-between mb-6">
                <button
                    onClick={addOption}
                    className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Add Another Option
                </button>
                <button
                    onClick={submitPoll}
                    className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Submit Poll
                </button>
            </div>
        </div>
    );
};

export default CreatePoll;
