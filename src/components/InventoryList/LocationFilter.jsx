// src/components/LocationFilter.js
import React, { useState } from "react";

const LocationFilter = ({ onLocationChange }) => {
    const [location, setLocation] = useState("");

    const handleChange = (e) => {
        setLocation(e.target.value);
        onLocationChange(e.target.value);
    };

    return (
        <div>
            <label htmlFor="location">Location:</label>
            <input
                type="text"
                id="location"
                value={location}
                onChange={handleChange}
            />
        </div>
    );
};

export default LocationFilter;
