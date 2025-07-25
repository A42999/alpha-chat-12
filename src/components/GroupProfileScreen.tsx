import React from 'react'
import {
  Phone, Video, UserPlus, UserMinus, Trash,
  Image as ImgIcon, FileText, Mic, Pin
} from 'lucide-react'

const members = [
  { name: 'You', role: 'Admin', avatar: '/images/you.jpg' },
  { name: 'Daniel Johnson', role: 'Member', avatar: '/images/daniel.jpg' },
  { name: 'Ayesha Sharma', role: 'Member', avatar: '/images/ayesha.jpg' },
  { name: 'Rahul Kumar', role: 'Member', avatar: '/images/rahul.jpg' }
]

const media = [
  '/images/media1.jpg', '/images/media2.jpg', '/images/media3.jpg'
]

const docs = [
  { name: 'ProjectPlan.pdf', icon: <FileText className="w-4 h-4 text-blue-600" /> },
  { name: 'VoiceNote.mp3', icon: <Mic className="w-4 h-4 text-green-600" /> }
]

const pinned = [
  {
    id: 1, sender: 'Daniel', text: 'Client confirmed the proposal 🎉',
    time: 'Yesterday'
  },
  {
    id: 2, sender: 'You', text: 'Live demo scheduled for 3 PM',
    time: 'Today'
  }
]

const GroupProfileScreen: React.FC = () => {
  const removeMember = (name: string) => alert(`Removed ${name}`)
  const addMember = () => alert('Opened add member screen')
  const startCall = (type: string) => alert(`${type} call initiated`)
  const exitGroup = () => alert('Exited group')

  return (
    <div className="mobile-container bg-white font-sf pb-16">
      {/* Header */}
      <div className="relative w-full h-44 bg-wave-ring-from flex items-end justify-start p-4">
        <img src="/images/group-banner.jpg" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="z-10">
          <h1 className="text-2xl font-bold text-white">Design Team 💡</h1>
          <div className="flex space-x-3 mt-2">
            <button onClick={() => startCall('Voice')}><Phone className="w-5 h-5 text-white" /></button>
            <button onClick={() => startCall('Video')}><Video className="w-5 h-5 text-white" /></button>
          </div>
        </div>
      </div>

      {/* Members */}
      <section className="px-6 py-4">
        <h2 className="text-lg font-semibold mb-3">Members</h2>
        <ul className="space-y-3">
          {members.map(m => (
            <li key={m.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={m.avatar} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.role}</p>
                </div>
              </div>
              {m.name !== 'You' && (
                <button onClick={() => removeMember(m.name)}><UserMinus className="w-4 h-4 text-red-500" /></button>
              )}
            </li>
          ))}
        </ul>
        <button onClick={addMember} className="mt-4 px-4 py-2 bg-alpha-blue text-white rounded-xl flex items-center space-x-2">
          <UserPlus className="w-4 h-4" /><span>Add Member</span>
        </button>
      </section>

      {/* Shared Media */}
      <section className="px-6 py-4">
        <h2 className="text-lg font-semibold mb-3">Shared Media</h2>
        <div className="flex space-x-3 overflow-x-auto hide-scrollbar">
          {media.map((src, idx) => (
            <img key={idx} src={src} className="w-20 h-20 rounded-xl object-cover shadow-card" />
          ))}
        </div>
      </section>

      {/* Documents & Audio */}
      <section className="px-6 py-4">
        <h2 className="text-lg font-semibold mb-3">Documents & Audio</h2>
        <ul className="space-y-2">
          {docs.map((doc, idx) => (
            <li key={idx} className="flex items-center space-x-2 border px-3 py-2 rounded-xl bg-chat-gray">
              {doc.icon}
              <span className="text-sm">{doc.name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Pinned Messages */}
      <section className="px-6 py-4">
        <h2 className="text-lg font-semibold mb-3">Pinned Messages</h2>
        {pinned.map(p => (
          <div key={p.id} className="border-l-4 border-yellow-400 px-4 py-3 bg-white shadow-card rounded-xl mb-2">
            <p className="text-sm font-semibold flex items-center space-x-2">
              <Pin className="w-3 h-3 text-yellow-500" /><span>{p.sender}</span>
            </p>
            <p className="text-sm mt-1">{p.text}</p>
            <p className="text-xs text-gray-500 mt-1">{p.time}</p>
          </div>
        ))}
      </section>

      {/* Exit Group */}
      <section className="px-6 py-4">
        <button onClick={exitGroup} className="w-full text-sm text-red-600 flex items-center justify-center space-x-2 pt-3 border-t">
          <Trash className="w-4 h-4" /><span>Exit Group</span>
        </button>
      </section>
    </div>
  )
}

export default GroupProfileScreen
