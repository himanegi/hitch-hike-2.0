import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

function ChatBox({ socket, onClose ,messages, setMessages,senderId,receiverId}) {
//   const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, [socket]);

  const handleSendClick = () => {
    socket.emit('message', {message,senderId,receiverId});
    setMessage('');
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <button 
        onClick={handleOpenDialog} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-1 rounded"
      >
        Open Chat
      </button>
  
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Chat</DialogTitle>
        <div className="p-4">
          {messages.map((message, index) => (
            <p key={index} className="mb-2">{message}</p>
          ))}
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button 
            onClick={handleSendClick} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Send
          </button>
          <button 
            onClick={handleCloseDialog} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Close
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default ChatBox;