import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Edit,
  Eye,
  Trash2,
  Copy,
  Share2,
} from 'lucide-react';
import { removeAllPastes } from '../redux/PasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
  const pastes = useSelector((state) => state.pastes.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeAllPastes(pasteId));
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  const handleShare = (id) => {
    const shareURL = `${window.location.origin}/?pasteId=${id}`;

    navigator.clipboard.writeText(shareURL)
      .then(() => {
        toast.success('Shareable link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link.');
      });

    if (navigator.share) {
      navigator.share({
        title: 'Check out this Paste!',
        url: shareURL,
      }).catch((error) => {
        console.error('Sharing failed:', error);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-10">
        <input
          type="search"
          placeholder="Search your pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      {/* Paste Cards */}
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-cyan-600/40 transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-cyan-300 mb-2">{paste.title}</h2>
              <pre className="text-sm text-gray-200 font-mono whitespace-pre-wrap mb-4">
                {paste.content.length > 300
                  ? paste.content.slice(0, 300) + '...'
                  : paste.content}
              </pre>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-3">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors">
                  <Edit size={16} /> <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors">
                  <Eye size={16} /> 
                  <a href={`/pastes/${paste?._id}`}>
                  View
                  </a>
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-500 transition-colors"
                  onClick={() => handleDelete(paste._id)}
                >
                  <Trash2 size={16} /> Delete
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors"
                  onClick={() => handleCopy(paste.content)}
                >
                  <Copy size={16} /> Copy
                </button>
                <button
                  onClick={() => handleShare(paste._id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors"
                >
                  <Share2 size={16} /> Share
                </button>
              </div>

              <p className="text-sm font-medium text-gray-300">
                📅 Created on:{" "}
                <span className="text-cyan-400 font-semibold">
                  {new Date(paste.createdAt).toLocaleString()}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 italic">No matching pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
