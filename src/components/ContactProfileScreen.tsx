import React from 'react';
import { ArrowLeft, Phone, Video, MessageCircle, MoreVertical, Star, Blocks as Block, Delete, Image, FileText, Music } from 'lucide-react';
import { Chat } from '../App';

interface ContactProfileScreenProps {
  contact: Chat;
  onBack: () => void;
  onVideoCall: () => void;
}

const ContactProfileScreen: React.FC<ContactProfileScreenProps> = ({ contact, onBack, onVideoCall }) => {
  const mediaItems = [
    { type: 'image', url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { type: 'image', url: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { type: 'video', url: 'https://images.pexels.com/photos/1366942/pexels-photo-1366942.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { type: 'image', url: 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { type: 'document', url: 'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { type: 'audio', url: 'https://images.pexels.com/photos/1366925/pexels-photo-1366925.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' }
  ];

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={16} className="text-white" />;
      case 'document': return <FileText size={16} className="text-white" />;
      case 'audio': return <Music size={16} className="text-white" />;
      default: return null;
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-3 text-sm font-semibold">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <div className="w-6 h-3 bg-black rounded-sm"></div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Contact Info</h1>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <MoreVertical size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="px-6 py-8 text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={contact.avatar} 
                alt={contact.name}
                className="w-full h-full object-cover"
              />
            </div>
            {contact.isOnline && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-blue-500 rounded-full border-3 border-white"></div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{contact.name}</h2>
          <p className="text-gray-600 mt-2">{contact.bio || 'Hey there! I am using Alpha Chat.'}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-8 px-6 py-4">
          <button className="flex flex-col items-center space-y-2 p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle size={20} className="text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Message</span>
          </button>
          
          <button className="flex flex-col items-center space-y-2 p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Phone size={20} className="text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Call</span>
          </button>
          
          <button 
            onClick={onVideoCall}
            className="flex flex-col items-center space-y-2 p-4 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Video size={20} className="text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Video</span>
          </button>
        </div>

        {/* Contact Info */}
        <div className="px-6 py-4 space-y-4">
          <button className="w-full flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Phone size={18} className="text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-800 font-medium">{contact.phone || '+91 98765 43210'}</p>
            </div>
          </button>
        </div>

        {/* Media Section */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Media, Links & Docs</h3>
            <span className="text-sm text-blue-500">See all</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {mediaItems.map((item, index) => (
              <button
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform"
              >
                <img 
                  src={item.url} 
                  alt={`Media ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {item.type !== 'image' && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    {getMediaIcon(item.type)}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="px-6 py-4 space-y-2">
          <button className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Star size={18} className="text-yellow-600" />
            </div>
            <span className="flex-1 text-left text-gray-800 font-medium">Starred Messages</span>
          </button>

          <button className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Block size={18} className="text-red-600" />
            </div>
            <span className="flex-1 text-left text-gray-800 font-medium">Block Contact</span>
          </button>

          <button className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Delete size={18} className="text-red-600" />
            </div>
            <span className="flex-1 text-left text-gray-800 font-medium">Delete Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactProfileScreen;