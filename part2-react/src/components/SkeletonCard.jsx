// src/components/SkeletonCard.jsx
import React from 'react';
import './SkeletonCard.css';

function SkeletonCard() {
    return (
        <div className="skeleton-card">
            <div className="skeleton skeleton-img"></div>
            <div className="skeleton skeleton-text"></div>
        </div>
    );
}
export default SkeletonCard;