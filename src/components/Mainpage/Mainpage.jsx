// import React from 'react'
// import './Mainpage.css'


// function Mainpage() {
  
//   return (
//     <div
//       className='branding'>
        
//       </div>

//   );
// }

// export default Mainpage


// Mainpage.jsx
import  { useRef, useState } from 'react';
import Background from '../../assets/Background.mp4'; // Adjust the path if necessary
import EndFrame from '../../assets/EndFrame.png'; // Adjust the path if necessary

function Mainpage({ resumeData }) {
  const videoRef = useRef(null);
  const [showEndFrame, setShowEndFrame] = useState(false);

  const handleVideoEnd = () => {
    setShowEndFrame(true);
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        onEnded={handleVideoEnd}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          display: showEndFrame ? 'none' : 'block',
        }}
      >
        <source src={Background} type="video/mp4" />
      </video>
      {showEndFrame && (
        <img
          src={EndFrame}
          alt="End Frame"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />
      )}
      {/* Render other main page content here */}
      <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
        <h1>Main Page</h1>
        <p>Number of shortlisted resumes: {resumeData.filter((resume) => resume.status === 'Shortlisted').length}</p>
      </div>
    </div>
  );
}

export default Mainpage;
