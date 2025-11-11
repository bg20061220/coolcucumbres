import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const prediction = location.state?.prediction;

  if (!prediction) {
    return (
      <div className="results-container">
        <div className="results-card">
          <h1>No Prediction Data</h1>
          <p>Please make a prediction first.</p>
          <button onClick={() => navigate('/')} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { results, input } = prediction;
  const [confidenceText, statusText] = results;
  const isFlood = statusText.includes('Flood') && !statusText.includes('No Flood');

  return (
    <div className="results-container">
      <div className="results-card">
        <h1>Flood Prediction Results</h1>

        <div className="input-summary">
          <h2>Input Details</h2>
          <div className="input-details">
            <p><strong>Latitude:</strong> {input.latitude}</p>
            <p><strong>Longitude:</strong> {input.longitude}</p>
            <p><strong>Year:</strong> {input.year}</p>
          </div>
        </div>

        <div className={`prediction-result ${isFlood ? 'flood-warning' : 'no-flood'}`}>
          <div className="status-icon">
            {isFlood ? '⚠️' : '✅'}
          </div>
          <h2>{statusText}</h2>
          <p className="confidence-score">{confidenceText}</p>
        </div>

        <div className="actions">
          <button onClick={() => navigate('/')} className="back-button">
            Make Another Prediction
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
