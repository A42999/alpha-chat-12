import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, QrCode, Share2, Settings, Bell, Shield, Database,
  HelpCircle, Info, LogOut, Smartphone, Globe2, Wallpaper,
  MessageSquare, UserPlus
} from 'lucide-react'

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate()
  const [addedContact, setAddedContact] = useState<string | null>(
    localStorage.getItem('qrContact')
  )

  const handleQRScan = () => {
    const contactName = prompt('Scan successful! Add contact named:')
    if (contactName) {
      localStorage.setItem('qrContact', contactName)
      setAddedContact(contactName)
      alert(`"${contactName}" added to your contact list ✅`)
    }
  }

  const quickActions = [
    {
      icon: QrCode,
      label: 'QR Code',
      action: handleQRScan
    },
    {
      icon: Share2,
      label: 'Share Profile',
      action: () => alert('Profile shared!')
    }
  ]

  const settings = [
    {
      section: 'Account',
      items: [
        {
          icon: Settings,
          label: 'Security',
          subtitle: 'Two-step verification',
          action: () => alert('Open Security Settings')
        },
        {
          icon: Smartphone,
          label: 'Change Number',
          subtitle: 'Transfer to new number',
          action: () => alert('Change number flow started')
        }
      ]
    },
    {
      section: 'Chats',
      items: [
        {
          icon: Wallpaper,
          label: 'Wallpaper',
          subtitle: 'Change chat background',
          action: () => alert('Wallpaper picker opened')
        },
        {
          icon: MessageSquare,
          label: 'Backup',
          subtitle: 'Chat backup settings',
          action: () => alert('Backup screen opened')
        }
      ]
    },
    {
      section: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Sounds & Alerts',
          subtitle: 'Tone, vibration, popup',
          action: () => alert('Notification settings opened')
        }
      ]
    },
    {
      section: 'Privacy',
      items: [
        {
          icon: Shield,
          label: 'Privacy Settings',
          subtitle: 'Last seen, groups, read receipts',
          action: () => alert('Privacy settings opened')
        }
      ]
    },
    {
      section: 'Storage & Data',
      items: [
        {
          icon: Database,
          label: 'Storage Usage',
          subtitle: 'Manage space & downloads',
          action: () => alert('Storage screen opened')
        }
      ]
    },
    {
      section: 'Linked Devices',
      items: [
        {
          icon: Smartphone,
          label: 'Manage Devices',
          subtitle: 'View logged-in devices',
          action: () => alert('Linked devices list opened')
        }
      ]
    },
    {
      section: 'App Settings',
      items: [
        {
          icon: Globe2,
          label: 'Language',
          subtitle: 'Change app language',
          action: () => alert('Language selection opened')
        },
        {
          icon: UserPlus,
          label: 'Invite Friends',
          subtitle: 'Share Alpha Chat with contacts',
          action: () => alert('Invite link shared')
        }
      ]
    },
    {
      section: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help',
          subtitle: 'FAQs & contact support',
          action: () => alert('Help screen opened')
        },
        {
          icon: Info,
          label: 'About',
          subtitle: 'App info, terms, privacy',
          action: () => alert('About screen opened')
        }
      ]
    }
  ]

  return (
    <div className="mobile-container bg-white min-h-screen pb-16">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <button onClick={() => navigate('/')}>
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-medium text-gray-900">Profile</h1>
        <div className="w-6" />
      </div>

      {/* Profile Info */}
      <div className="px-6 py-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Rosie Anderson</h2>
        <p className="text-gray-600 mb-1">+1 234 567 8900</p>
        <p className="text-sm text-[#4F9DE8] font-medium">Hi, I’m using Alpha Chat</p>
      </div>

      {/* QR & Share */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="bg-gray-100 rounded-xl p-4 flex flex-col items-center hover:bg-gray-200 transition"
            >
              <item.icon className="w-6 h-6 text-[#4F9DE8] mb-2" />
              <span className="text-sm text-gray-700 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Added via QR */}
      {addedContact && (
        <div className="px-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl border">
            <p className="text-sm text-gray-700">
              📇 Added Contact: <strong>{addedContact}</strong>
            </p>
            <p className="text-xs text-gray-500">via QR scan</p>
          </div>
        </div>
      )}

      {/* Settings Sections */}
      <div className="px-6 space-y-6">
        {settings.map((section, sIndex) => (
          <div key={sIndex} className="bg-white rounded-xl shadow-sm">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-800">{section.section}</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {section.items.map((item, iIndex) => (
                <button
                  key={iIndex}
                  onClick={item.action}
                  className="flex items-center w-full py-4 px-4 hover:bg-gray-50"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <item.icon className="w-5 h-5 text-[#4F9DE8]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
                    <p className="text-xs text-gray-500">{item.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => alert('Logged out')}
            className="flex items-center w-full py-4 px-4 hover:bg-red-50"
          >
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <h4 className="text-sm font-medium text-red-600">Log Out</h4>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm">
        <span className="text-gray-400">from </span>
        <span className="text-[#4F9DE8] font-semibold">El-Aenon</span>
      </div>
    </div>
  )
}

export default ProfileScreen
