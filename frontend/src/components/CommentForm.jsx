import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ pollId }) => {
    const [comment, setComment] = useState('');

    const submitComment = async () => {
        if (comment.trim() === '') {
            alert('Comment cannot be empty');
            return;
        }
        try {
            await axios.post(`http://localhost:5000/api/polls/${pollId}/comment`, { user: 'User', text: comment });
            setComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
            />
            <button
                onClick={submitComment}
                className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Submit Comment
            </button>
        </div>
    );
};

export default CommentForm;
