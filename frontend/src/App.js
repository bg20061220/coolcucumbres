import { useState } from 'react';
import './App.css';
import MapComponent from './MapComponent';

function App() {
  const [position, setPosition] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const handleLocationClick = (latlng) => {
    setPosition(latlng);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handlePredictFuture = () => {
    if (position && selectedDate) {
      console.log('Latitude:', position.lat);
      console.log('Longitude:', position.lng);
      console.log('Date:', selectedDate);
    }
  };

  const isButtonDisabled = !position || !selectedDate;

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Cool Cucumbers</h1>
        <p className="tagline">Find out the future of your house.</p>

        <div className="map-container">
          <MapComponent position={position} onLocationClick={handleLocationClick} />
        </div>

        {position && (
          <p className="coordinates">
            Latitude: {position.lat.toFixed(6)}, Longitude: {position.lng.toFixed(6)}
          </p>
        )}

        <div className="date-picker-container">
          <label htmlFor="date-picker" className="date-label">
            Select a date:
          </label>
          <input
            id="date-picker"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="date-input"
          />
        </div>

        {selectedDate && (
          <p className="selected-date">
            Selected Date: {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        )}

        <button
          onClick={handlePredictFuture}
          disabled={isButtonDisabled}
          className="predict-button"
        >
          Predict Future
        </button>
      </div>
    </div>
  );
}

export default App;
