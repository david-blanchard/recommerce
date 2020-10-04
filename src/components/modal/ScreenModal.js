import React from 'react'

const ScreenModal = ({ children }) => {
  return (
    <div id='screen-layout'>
      <div className='frame-layout'>
        {children}
      </div>
    </div>
  )
}

export default ScreenModal
