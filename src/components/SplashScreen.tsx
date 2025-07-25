import React from 'react'
import BottomNavigation from './BottomNavigation'

const splashScreen: React.FC = () => {
  return (
    <div className="mobile-container bg-white flex flex-col justify-between items-center min-h-screen py-16">
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center mb-4">
          <span className="text-[#4F9DE8] text-xl font-extrabold">α</span>
        </div>
      </div>

      {/* Branding Text */}
      <div className="text-center mb-6 text-sm flex items-center justify-center">
        <span className="text-black mr-2">from</span>
        <span className="text-[#4F9DE8] font-semibold">El-Aenon</span>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />
    </div>
  )
}

export default splashScreen
