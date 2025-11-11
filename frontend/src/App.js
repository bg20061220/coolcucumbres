import { useState } from 'react';
import './App.css';
import MapComponent from './MapComponent';

function App() {
  const [position, setPosition] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [cityName, setCityName] = useState('');

  const handleLocationClick = (latlng) => {
    setPosition(latlng);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleCityChange = (e) => {
    setCityName(e.target.value);
  };

  const handleCitySearch = async () => {
    if (!cityName.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        alert('City not found. Please try a different name.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Failed to search for city. Please try again.');
    }
  };

  const handleCityKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCitySearch();
    }
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

        <div className="city-input-container">
          <label htmlFor="city-input" className="city-label">
            Enter city name:
          </label>
          <div className="city-input-wrapper">
            <input
              id="city-input"
              type="text"
              value={cityName}
              onChange={handleCityChange}
              onKeyPress={handleCityKeyPress}
              placeholder="e.g., San Francisco"
              className="city-input"
            />
            <button onClick={handleCitySearch} className="search-button">
              Search
            </button>
          </div>
        </div>

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
