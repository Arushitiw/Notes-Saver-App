import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Viewpaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.pastes.pastes);
  const paste = allPastes.find((p) => p._id === id);

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (paste) {
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [paste]);

  if (!paste) {
    return (
      <div className="text-white text-center mt-10 text-xl">
        Paste not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10 text-white">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-lg w-full max-w-3xl border border-gray-800">
        <h1 className="text-3xl font-bold text-cyan-300 text-center mb-8 tracking-wide">
          {title}
        </h1>

        <div className="relative mb-4">
          <button
            onClick={() => {
              navigator.clipboard.writeText(value);
              toast.success('Content copied!');
            }}
            className="absolute top-0 right-0 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded"
            title="Copy to clipboard"
          >
            <Copy size={18} />
          </button>

          <SyntaxHighlighter
            language="javascript"
            style={atomOneDark}
            customStyle={{
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#1f2937',
            }}
          >
            {value}
          </SyntaxHighlighter>
        </div>

        <Link
          to="/pastes"
          className="block text-center mt-4 text-sm text-cyan-400 hover:underline"
        >
          ← Back to All Pastes
        </Link>
      </div>
    </div>
  );
};

export default Viewpaste;
