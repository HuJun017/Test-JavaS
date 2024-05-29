function getCitta(nazione) {

    //display ON/OFF
    document.getElementById('elencoNazioni').style.display = 'none'
    document.getElementById('elencoCitta').style.display = 'block'

    //dizionario con le informazioni
    let nationDict = {
        'nazioneSelezionato': nazione
    };
    fetch('/elencoCitta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nationDict)
    })
    .then(response => response.json())
    //risposta
    .then(data => {
        console.log(data)
        let listaCitta = document.getElementById('listaCitta');
        listaCitta.innerHTML = '';
        for (let citta in data) {
            if (data.hasOwnProperty(citta)) {
                let clientCount = data[citta];
                let p = document.createElement('p');
                p.innerHTML = `<input type="radio" name="citta" value="{{ citta }}"> ${citta} (${clientCount})`;
                listaCitta.appendChild(p);
            }
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}