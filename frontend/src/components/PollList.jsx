import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Poll from './Poll';
import { Link } from 'react-router-dom';

const socket = io('http://localhost:5000');

const PollList = () => {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const result = await axios.get('http://localhost:5000/api/polls');
                setPolls(result.data);
            } catch (error) {
                console.error('Error fetching polls:', error);
            }
        };
        fetchPolls();

        const handlePollUpdate = (poll) => {
            setPolls((polls) => polls.map((p) => (p._id === poll._id ? poll : p)));
        };

        socket.on('pollUpdated', handlePollUpdate);

        return () => {
            socket.off('pollUpdated', handlePollUpdate);
        };
    }, []);

    const deletePoll = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/polls/${id}`);
            setPolls(polls.filter(poll => poll._id !== id));
        } catch (error) {
            console.error('Error deleting poll:', error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
            <Link to="/create">
                <button className="mb-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                    Create Poll
                </button>
            </Link>
            <div className="w-full max-w-4xl">
                {polls.length > 0 ? (
                    polls.map((poll) => (
                        <div key={poll._id} className="bg-white shadow-xl rounded-lg p-6 mb-6">
                            <Poll poll={poll} />
                            <button
                                onClick={() => deletePoll(poll._id)}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                            >
                                Delete Poll
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No polls available.</p>
                )}
            </div>
        </div>
    );
};

export default PollList;
