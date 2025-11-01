import React, { useState } from 'react';
import '../styles/modelInfo.css';

const ModelInfo = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="simple-model-info">
            <div 
                className="info-icon"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <i className="fa-solid fa-circle-question"></i>
            </div>

            {showTooltip && (
                <div className="simple-tooltip">
                    <div className="tooltip-content">
                        <strong>Model Info:</strong>
                        <div><strong>2.5 Flash Lite:</strong> For fastest response (Default)</div>
                        <div><strong>2.5 Pro:</strong> For complex tasks</div>
                        <div><strong>2.5 Flash:</strong> For balanced speed</div>
                        <div><strong>2.0 Flash:</strong> Previous generation flash</div>
                        <div><strong>2.0 Flash Lite:</strong> Previous generation lite</div>
                        <div><strong>1.0 Flash:</strong> Old generation flash</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModelInfo;