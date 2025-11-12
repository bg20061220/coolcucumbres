import { useLocation, useNavigate } from 'react-router-dom';
import {useMemo} from 'react' ;
import './Results.css';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const prediction = location.state?.prediction;

  // Helper function to determine risk level based on percentage
  const getRiskLevel = (percentage) => {
    if (percentage <= 40) return 'Safe';
    if (percentage <= 70) return 'Moderate';
    return 'Dangerous';
  };

  // Generate disasters data - must be called before any early returns
  const disasters = useMemo(() => {
    if (!prediction?.results) return [];

    const { results } = prediction;
    const [confidenceText] = results;

    // Parse flood percentage from confidence text (e.g., "Confidence: 85%")
    const floodPercentage = parseInt(confidenceText.match(/\d+/)?.[0] || '0');

    const generateRandomPercentage = () => Math.floor(Math.random() * 101);

    const hurricanesPercent = generateRandomPercentage();
    const wildfiresPercent = generateRandomPercentage();
    const tempDamagePercent = generateRandomPercentage();
    const precipDamagePercent = generateRandomPercentage();

    return [
      { name: 'Floods', percentage: floodPercentage, risk: getRiskLevel(floodPercentage) },
      { name: 'Hurricanes', percentage: hurricanesPercent, risk: getRiskLevel(hurricanesPercent) },
      { name: 'Wildfires', percentage: wildfiresPercent, risk: getRiskLevel(wildfiresPercent) },
      { name: 'Temperature Damage', percentage: tempDamagePercent, risk: getRiskLevel(tempDamagePercent) },
      { name: 'Precipitation Damage', percentage: precipDamagePercent, risk: getRiskLevel(precipDamagePercent) }
    ];
  }, [prediction]);

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

  const { input } = prediction;

  return (
    <div className="results-container">
      <div className="results-wrapper">
        <h1 className="results-title">Climate Risk Assessment</h1>

        <div className="input-summary">
          <h2>Location Details</h2>
          <div className="input-details">
            <p><strong>Latitude:</strong> {input.latitude}</p>
            <p><strong>Longitude:</strong> {input.longitude}</p>
            <p><strong>Year:</strong> {input.year}</p>
          </div>
        </div>

        <div className="disaster-cards">
          {disasters.map((disaster, index) => (
            <div key={index} className={`disaster-card risk-${disaster.risk.toLowerCase()}`}>
              <h3 className="disaster-name">{disaster.name}</h3>
              <div className="disaster-percentage">{disaster.percentage}%</div>
              <div className="disaster-risk">{disaster.risk}</div>
            </div>
          ))}
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
