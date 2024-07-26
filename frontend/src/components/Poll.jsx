import React, { useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Poll = ({ poll }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleVote = async (optionId) => {
        try {
            await axios.post(`http://localhost:5000/api/polls/${poll._id}/vote`, { optionId });
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    const data = {
        labels: poll.options.map(option => option.text),
        datasets: [
            {
                label: 'Votes',
                data: poll.options.map(option => option.votes),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="p-6 mb-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-center">{poll.question}</h3>
            <div className="flex justify-center mb-6">
                <div className="w-full max-w-full" style={{ height: '500px' }}>
                    <Bar data={data} options={{ maintainAspectRatio: false, responsive: true }} />
                </div>
            </div>
            <div className="mb-6">
                {poll.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleVote(option._id)}
                        className="block w-full text-left px-4 py-2 mb-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        {option.text} - {option.votes} votes
                    </button>
                ))}
            </div>
            <CommentForm pollId={poll._id} />
            <div>
                <h4 className="text-xl font-semibold mb-2">Comments:</h4>
                {poll.comments.length > 0 ? (
                    poll.comments.map((comment, index) => (
                        <div key={index}>
                            <p><strong>{comment.user}:</strong> {comment.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No comments yet.</p>
                )}
            </div>
        </div>
    );
};

export default Poll;
