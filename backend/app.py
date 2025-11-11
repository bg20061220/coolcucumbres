from flask import Flask, request, jsonify
from flask_cors import CORS
from classification import predict_floods
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()

        # Extract parameters
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        date = data.get('date')

        # Validate required parameters
        if latitude is None or longitude is None or date is None:
            return jsonify({
                'error': 'Missing required parameters. Please provide latitude, longitude, and date.'
            }), 400

        # Parse year from date (supports formats like "2024-01-15" or "2024")
        try:
            if isinstance(date, str):
                # Try to parse as full date first
                if '-' in date:
                    year = datetime.strptime(date, '%Y-%m-%d').year
                else:
                    year = int(date)
            else:
                year = int(date)
        except ValueError:
            return jsonify({
                'error': 'Invalid date format. Please provide date as YYYY-MM-DD or YYYY.'
            }), 400

        # Call the prediction function
        results = predict_floods(float(latitude), float(longitude), year)

        # Return the results as JSON
        return jsonify({
            'success': True,
            'results': results,
            'input': {
                'latitude': latitude,
                'longitude': longitude,
                'year': year
            }
        }), 200

    except Exception as e:
        return jsonify({
            'error': f'An error occurred: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
