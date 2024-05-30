from flask import Flask, request, jsonify, render_template
import pandas as pd

app = Flask(__name__)

df = pd.read_csv('/workspace/Test-JavaS/data/data.csv')

@app.route('/')
def homepage(): 
    nazioni = sorted(list(set(df['Country'])))
    return render_template('index.html', elenco = nazioni)

@app.route('/elencoCitta', methods=['POST'])
def elencoCitta():
    data = request.json
    nazione = data.get('nazioneSelezionato')
    city_client_count = df[df['Country'] == nazione].groupby('City').size().to_dict()
    return jsonify(city_client_count), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3245, debug=True)