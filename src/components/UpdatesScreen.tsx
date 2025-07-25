// UpdatesScreen.tsx

import React, { useState, useEffect } from 'react'
import {
  Search, MoreVertical, Shield, Plus, Settings, UserPlus,
  Heart, Flame, ThumbsUp
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BottomNavigation from './BottomNavigation'

const UpdatesScreen: React.FC = () => {
  const navigate = useNavigate()
  const [audioMsg, setAudioMsg] = useState<any | null>(null)
  const [showQRModal, setShowQRModal] = useState(false)
  const [storyPreview, setStoryPreview] = useState<any | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('latest-call-audio')
    if (stored) setAudioMsg(JSON.parse(stored))
  }, [])

  const openCamera = () => alert('Camera opened to create a new Wave')
  const handleMenuClick = (action: string) => {
    switch (action) {
      case 'privacy': alert('Wave Privacy opened'); break
      case 'add': openCamera(); break
      case 'wave-settings': navigate('/wave-settings'); break
      case 'profile': navigate('/profile'); break
      case 'qr': setShowQRModal(true); break
    }
  }
  const handleAddContact = (name: string) => {
    alert(`✅ ${name} added to contacts`)
    setShowQRModal(false)
  }
  const reactToUpdate = (emoji: string, name: string) =>
    alert(`${emoji} reacted to ${name}'s update`)

  const stories = [
    { id: 1, name: 'You', avatar: '/images/you.jpg', hasStory: true, isOwn: true },
    { id: 2, name: 'Alice', avatar: '/images/alice.jpg', hasStory: true },
    { id: 3, name: 'Jake', avatar: '/images/jake.jpg', hasStory: true },
    { id: 4, name: 'Luna', avatar: '/images/luna.jpg', hasStory: true }
  ]

  const updates = [
    { id: 1, name: 'Pedro', action: 'liked your wave', avatar: '/images/pedro.jpg' },
    { id: 2, name: 'Brian', action: 'commented on your wave', avatar: '/images/brian.jpg' },
    { id: 3, name: 'Luis', action: 'audio call message', avatar: '/images/luis.jpg', isAudio: true, audioUrl: '/audio/sample.mp3', time: '10:21am' },
    { id: 4, name: 'Matthew', action: 'wants to connect', avatar: '/images/matthew.jpg', isAdd: true },
    { id: 5, name: 'Ryan', action: 'added you in family group', avatar: '/images/ryan.jpg' }
  ]

  const finalUpdates = audioMsg
    ? [
        ...updates,
        {
          id: 999,
          name: 'Call Audio',
          action: audioMsg.caption,
          avatar: '/images/call-audio.jpg',
          isAudio: true,
          audioUrl: audioMsg.audioUrl,
          time: audioMsg.time
        }
      ]
    : updates

  return (
    <div className="mobile-container bg-white pb-16">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Wave</h1>
        <div className="flex space-x-4">
          <button onClick={() => alert('Search opened')}>
            <Search className="w-6 h-6 text-gray-600" />
          </button>
          <div className="relative">
            <button onClick={() => document.getElementById('updates-menu')?.classList.toggle('hidden')}>
              <MoreVertical className="w-6 h-6 text-gray-600" />
            </button>
            <div id="updates-menu" className="absolute top-8 right-0 bg-white shadow rounded w-48 border py-2 hidden z-50">
              <button onClick={() => handleMenuClick('privacy')} className="w-full px-4 py-2 text-left hover:bg-gray-50">
                <Shield className="inline w-4 h-4 mr-2" /> Wave Privacy
              </button>
              <button onClick={() => handleMenuClick('add')} className="w-full px-4 py-2 text-left hover:bg-gray-50">
                <Plus className="inline w-4 h-4 mr-2" /> Add Wave
              </button>
              <button onClick={() => handleMenuClick('wave-settings')} className="w-full px-4 py-2 text-left hover:bg-gray-50">
                <Settings className="inline w-4 h-4 mr-2" /> Wave Settings
              </button>
              <button onClick={() => handleMenuClick('profile')} className="w-full px-4 py-2 text-left hover:bg-gray-50">
                <Settings className="inline w-4 h-4 mr-2" /> App Settings
              </button>
              <button onClick={() => handleMenuClick('qr')} className="w-full px-4 py-2 text-left hover:bg-gray-50">
                <UserPlus className="inline w-4 h-4 mr-2" /> Add via QR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Story Viewer Modal */}
      {storyPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-72 text-center shadow-xl">
            <img src={storyPreview.avatar} alt={storyPreview.name} className="w-48 h-48 object-cover rounded-lg mx-auto mb-3" />
            <p className="text-lg font-semibold">{storyPreview.name}'s Wave</p>
            <button onClick={() => setStoryPreview(null)} className="mt-4 px-4 py-1 bg-blue-500 text-white rounded-full">Close</button>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 shadow-xl text-center">
            <img src="/images/qr-contact.jpg" className="w-20 h-20 rounded-full mx-auto mb-3" />
            <p className="text-xl font-bold">Zoya Sharma</p>
            <p className="text-sm text-gray-500 mb-4">Found via QR</p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => handleAddContact('Zoya')} className="px-4 py-2 bg-blue-500 text-white rounded">Add Contact</button>
              <button onClick={() => setShowQRModal(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Stories */}
      <div className="px-6 mb-6">
        <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-2">
          {stories.map(story => (
            <div key={story.id} className="flex flex-col items-center space-y-2 flex-shrink-0 cursor-pointer" onClick={() => setStoryPreview(story)}>
              <div className={`relative ${story.hasStory ? 'p-1 bg-gradient-to-r from-[#4F9DE8] to-[#84C5FF] rounded-full' : ''}`}>
                <img src={story.avatar} alt={story.name} className="w-16 h-16 rounded-full object-cover border-2 border-white" />
                {story.isOwn && (
                  <button onClick={openCamera} className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#4F9DE8] text-white rounded-full flex items-center justify-center border-2 border-white text-xs font-bold">+</button>
                )}
              </div>
              <span className="text-xs text-gray-600 text-center">{story.name}</span>
            </div>
          ))}
              {/* Updates */}
              <div className="px-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Updates</h2>
                <div className="space-y-4 overflow-y-auto hide-scrollbar">
                  {finalUpdates.map((update) => (
                    <div key={update.id} className="flex items-start space-x-4">
                      <img src={update.avatar} alt={update.name} className="w-12 h-12 rounded-full object-cover mt-1" />
                      <div className="flex-1">
                        <p className="text-gray-800">
                          <span className="font-medium">{update.name}</span>
                          <span className="text-gray-600 ml-1">{update.action}</span>
                        </p>

                        {/* Voice or Call Audio Playback */}
                        {update.audioUrl && (
                          <div className="mt-2">
                            <audio controls src={update.audioUrl} className="w-full rounded-md" />
                            <p className="text-xs text-gray-500 mt-1">{update.time}</p>
                          </div>
                        )}

                        {/* Emoji Reactions */}
                        <div className="flex space-x-3 mt-2">
                          <button onClick={() => reactToUpdate('❤️', update.name)} className="hover:scale-110 transition">
                            <Heart className="w-4 h-4 text-red-500" />
                          </button>
                          <button onClick={() => reactToUpdate('🔥', update.name)} className="hover:scale-110 transition">
                            <Flame className="w-4 h-4 text-orange-500" />
                          </button>
                          <button onClick={() => reactToUpdate('👍', update.name)} className="hover:scale-110 transition">
                            <ThumbsUp className="w-4 h-4 text-blue-500" />
                          </button>
                        </div>

                        {/* Contact Request Actions */}
                        {update.isAdd && (
                          <div className="flex space-x-2 mt-3">
                            <button onClick={() => handleAddContact(update.name)} className="px-3 py-1 text-sm font-medium text-blue-500 border border-blue-500 rounded">Add</button>
                            <button onClick={() => alert(`Declined ${update.name}`)} className="px-3 py-1 text-sm font-medium text-red-500 border border-red-500 rounded">Ignore</button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <BottomNavigation activeTab="updates" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdatesScreen
