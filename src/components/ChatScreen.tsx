import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, Phone, Video, MoreVertical, Smile,
  Camera, Send, Mic, Wand2, Search
} from 'lucide-react'

const ChatScreen: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const [typing, setTyping] = useState(false)
  const [wallpaper, setWallpaper] = useState('bg-white')
  const [searchTerm, setSearchTerm] = useState('')
  const [replyPreview, setReplyPreview] = useState<any | null>(null)

  const currentUser = {
    name: 'Daniel Johnson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
  }

  useEffect(() => {
    setMessages([
      { id: 1, text: 'Hi there! 😊', time: '2:30 am', sent: false },
      { id: 2, text: 'How are you doing today?', time: '2:32 am', sent: false },
      { id: 3, text: 'Great, thanks! 🔥', time: '2:33 am', sent: true }
    ])
    setTyping(true)
    const timer = setTimeout(() => setTyping(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSend = () => {
    if (!message.trim()) return
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: message,
        time: 'Now',
        sent: true,
        replyTo: replyPreview?.text || null
      }
    ])
    setMessage('')
    setReplyPreview(null)
  }

  const handleReaction = (msgId: number, emoji: string) => {
    alert(`Reacted to message ${msgId} with ${emoji}`)
  }

  const handleVoiceMessage = () => {
    alert('🎙️ Voice recording started… (simulated)')
  }

  const handleWallpaperToggle = () => {
    setWallpaper(prev => prev === 'bg-white' ? 'bg-gray-50' : 'bg-white')
  }

  const handleReply = (msg: any) => {
    setReplyPreview(msg)
  }

  const handleLongPress = (msg: any) => {
    const action = prompt(`Actions for message:\n\n1. Reply\n2. Forward\n3. Star\n\nType number:`)
    if (action === '1') handleReply(msg)
    else if (action === '2') alert('Message forwarded (simulated)')
    else if (action === '3') alert('Message starred ✨')
  }

  const filteredMessages = messages.filter(m =>
    m.text.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={`mobile-container min-h-screen flex flex-col ${wallpaper}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <button onClick={() => navigate('/')}><ArrowLeft className="w-6 h-6 text-gray-600" /></button>
          <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-r from-[#4F9DE8] to-[#4F9DE8]">
            <img src={currentUser.avatar} className="w-full h-full rounded-full border-[3px] border-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{currentUser.name}</p>
            <p className="text-xs text-[#4F9DE8]">{typing ? 'typing...' : 'online'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => navigate(`/call/${id}/voice`)}><Phone className="w-5 h-5 text-[#4F9DE8]" /></button>
          <button onClick={() => navigate(`/call/${id}/video`)}><Video className="w-5 h-5 text-[#4F9DE8]" /></button>
          <button onClick={handleWallpaperToggle}><Wand2 className="w-5 h-5 text-[#4F9DE8]" /></button>
          <div className="relative">
            <button onClick={() => document.getElementById('chat-menu')?.classList.toggle('hidden')}><MoreVertical className="w-5 h-5 text-gray-600" /></button>
            <div id="chat-menu" className="absolute top-8 right-0 w-56 bg-white border rounded-xl shadow-xl py-2 z-50 hidden">
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100">View Contact</button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100">Search</button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100">Disappearing Messages</button>
              <button onClick={handleWallpaperToggle} className="w-full px-4 py-2 text-left hover:bg-gray-100">Wallpaper</button>
              <div className="border-t border-gray-200 pt-2">
                <button onClick={() => window.confirm('Clear chat?') && setMessages([])} className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-50">Clear Chat</button>
                <button onClick={() => window.confirm('Delete chat?') && navigate('/')} className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-50">Delete Chat</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-2 border-b border-gray-100 flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search messages"
          className="flex-1 text-sm bg-gray-100 rounded-full px-3 py-1 focus:outline-none" />
      </div>

      {/* Reply Preview */}
      {replyPreview && (
        <div className="px-4 py-2 bg-[#EDF6FF] text-xs text-gray-700 flex justify-between items-center">
          <span>Replying to: {replyPreview.text}</span>
          <button onClick={() => setReplyPreview(null)} className="text-[#4F9DE8] font-semibold text-xs">Cancel</button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
        {filteredMessages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
            <div className="relative max-w-[75%]" onContextMenu={(e) => { e.preventDefault(); handleLongPress(msg) }}>
              <div className="bg-white rounded-xl shadow p-3 text-sm text-gray-800">
                {msg.replyTo && (
                  <div className="text-xs text-gray-500 border-l-2 border-[#4F9DE8] pl-2 mb-1">Replying to: {msg.replyTo}</div>
                )}
                <p>{msg.text}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                  <span>{msg.time}</span>
                  {msg.sent && <span className="text-blue-500">✓✓</span>}
                </div>
                <div className="mt-2 flex space-x-1">
                  {['❤️', '🔥', '👍', '🥺'].map((emoji) => (
                    <button key={emoji} onClick={() => handleReaction(msg.id, emoji)} className="text-sm">{emoji}</button>
                  ))}
                </div>
              </div>
              <div className={`absolute bottom-0 ${msg.sent ? 'right-0' : 'left-0'}`}>
                {msg.sent ? (
                  <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[8px] border-t-transparent translate-x-1"></div>
                ) : (
                  <div className="w-0 h-0 border-r-[8px] border-r-white border-t-[8px] border-t-transparent -translate-x-1"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <button onClick={handleVoiceMessage}><Mic className="w-5 h-5 text-gray-600" /></button>
          <button><Camera className="w-5 h-5 text-gray-600" /></button>
          <div className="flex-1 relative">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message"
              className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F9DE8]"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Smile className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <button onClick={handleSend}><Send className="w-5 h-5 text-[#4F9DE8]" /></button>
        </div>
      </div>
    </div>
  )
}

export default ChatScreen
