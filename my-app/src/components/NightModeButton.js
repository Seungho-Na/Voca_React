import React from 'react';
import 'css/NightModeButton.css';

const NightModeButton = () => {
  const onToggleChange = () => {
    const element = document.body;
    element.classList.toggle("dark-mode");
  }
  return (
    <div className='toggle-box__dark'>
      <label className="switch__dark">
        <input
          type="checkbox"
          onChange={onToggleChange}
        />
        <span className="slider__dark round"></span>
      </label>
    </div>
  );
};
export default NightModeButton;
