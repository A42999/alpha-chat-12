import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Sparkles, Phone } from 'lucide-react'

interface BottomNavigationProps {
  activeTab: 'chats' | 'updates' | 'calls'
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab }) => {
  const navigate = useNavigate()

  const tabs = [
    {
      id: 'chats',
      label: 'Chats',
      icon: MessageCircle,
      path: '/'
    },
    {
      id: 'updates',
      label: 'Updates',
      icon: Sparkles,
      path: '/updates'
    },
    {
      id: 'calls',
      label: 'Calls',
      icon: Phone,
      path: '/calls'
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 shadow-sm">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center py-3 transition-all duration-200 ease-in-out ${
                isActive
                  ? 'text-[#4F9DE8] border-t-2 border-[#4F9DE8] bg-white/90 font-semibold'
                  : 'text-gray-400'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-[11px]">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation
