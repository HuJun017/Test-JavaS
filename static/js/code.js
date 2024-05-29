function getCitta(nazione) {
    document.getElementById('elencoNazioni').style.display = 'none'
    document.getElementById('elencoCitta').style.display = 'block'
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
    .then(data => {
        let listaCitta = document.getElementById('listaCitta');
        listaCitta.innerHTML = '';
        //verifica se data è un array
        if (Array.isArray(data)) {
            //ciclo per aggiungere le radio button
            data.forEach(citta => {
                let p = document.createElement('p');
                let radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'citta';
                radio.value = citta;
                p.appendChild(radio);
                p.appendChild(document.createTextNode(citta));
                listaCitta.appendChild(p);
            });
        } else {
            console.error('Si è verificato un errore:', data.error);
        }
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}