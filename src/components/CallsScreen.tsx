import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Video, MoreVertical } from 'lucide-react'
import BottomNavigation from './BottomNavigation'
import injectCallAudio from './injectCallAudio'

const callTabs = ['All', 'Voice', 'Video', 'Missed']

const CallsScreen: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = React.useState('All')

  const calls = [
    {
      id: 1,
      name: 'Jenny!',
      time: '9:34 am',
      avatar: '/images/jenny.jpg',
      type: 'outgoing',
      callType: 'voice'
    },
    {
      id: 2,
      name: 'Daniel Johnson',
      time: 'Yesterday',
      avatar: '/images/daniel.jpg',
      type: 'missed',
      callType: 'voice'
    },
    {
      id: 3,
      name: 'Sally Rooney',
      time: 'Yesterday',
      avatar: '/images/sally.jpg',
      type: 'incoming',
      callType: 'video'
    }
  ]

  const filtered = calls.filter(call => {
    if (activeTab === 'All') return true
    if (activeTab === 'Missed') return call.type === 'missed'
    return call.callType.toLowerCase() === activeTab.toLowerCase()
  })

  const handleReplayAudioInjection = (call: any) => {
    injectCallAudio(call)
    navigate('/updates')
  }

  return (
    <div className="mobile-container pb-16">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Calls</h1>
        <div className="relative">
          <button onClick={() => document.getElementById('calls-menu')?.classList.toggle('hidden')}>
            <MoreVertical className="w-6 h-6 text-gray-600" />
          </button>
          <div id="calls-menu" className="absolute top-8 right-0 w-40 bg-white border shadow rounded-lg py-2 hidden z-50">
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100">Clear Call Log</button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100">Settings</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-6 space-x-6 text-sm font-medium border-b border-gray-100">
        {callTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab ? 'text-[#4F9DE8] border-b-2 border-[#4F9DE8]' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Call List */}
      <div className="px-6 py-4 space-y-4">
        {filtered.map(call => (
          <div key={call.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={call.avatar} alt={call.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="text-gray-900 font-medium">{call.name}</p>
                <p className="text-sm text-gray-500">{call.time}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {call.callType === 'voice' && (
                <button onClick={() => handleReplayAudioInjection(call)}>
                  <Phone className="w-5 h-5 text-green-500" />
                </button>
              )}
              {call.callType === 'video' && (
                <button onClick={() => handleReplayAudioInjection(call)}>
                  <Video className="w-5 h-5 text-[#4F9DE8]" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation activeTab="calls" />
    </div>
  )
}

export default CallsScreen
