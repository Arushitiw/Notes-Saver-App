import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/PasteSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { Copy } from 'lucide-react'; 

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.pastes.pastes);

  // Load paste content if pasteId exists
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  const createPaste = () => {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

      if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10 text-white">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-lg w-full max-w-3xl border border-gray-800">
        <h1 className="text-3xl font-bold text-cyan-300 text-center mb-8 tracking-wide">
          {pasteId ? "Update Your Paste" : "Create Your Paste"}
        </h1>

        <input
          type="text"
          className="w-full p-3 mb-5 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

       <div className="relative flex items-start w-full mb-6">
  <textarea
    value={value}
    placeholder="Enter your content here..."
    onChange={(e) => setValue(e.target.value)}
    rows={10}
    className="w-full p-4 pr-12 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
  />

  {/* Copy Icon Button */}
  <button
    type="button"
    onClick={() => {
      navigator.clipboard.writeText(value);
      toast.success("Content copied!");
    }}
    className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
    title="Copy to clipboard"
  >
    <Copy size={20} />
  </button>
</div>

        <button
          onClick={createPaste}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 rounded-lg transition-all duration-300"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
    </div>
  );
};

export default Home;
