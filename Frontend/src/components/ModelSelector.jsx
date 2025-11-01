import React from 'react';
import '../styles/modelSelector.css';
import ModelInfo from './ModelInfo';

const ModelSelector = ({ selectedModel, onModelChange }) => {
    const models = [
        { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite (Default)" },
        { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
        { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
        { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
        { id: "gemini-2.0-flash-lite", name: "Gemini 2.0 Flash Lite" },
        { id: "gemini-1.0-flash", name: "Gemini 1.0 Flash" },
    ];

    return (
        <div className="model-selector">
            <select 
                value={selectedModel}
                onChange={(e) => onModelChange(e.target.value)}
                className="model-dropdown"
            >
                {models.map((model) => (
                    <option key={model.id} value={model.id}>
                        {model.name}
                    </option>
                ))}
            </select>
            <ModelInfo/>
        </div>
    );
};

export default ModelSelector;