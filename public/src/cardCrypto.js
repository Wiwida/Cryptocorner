const cardModule = {
    // On passe l'URL à nulle car on va l'attribuer derrière
    base_URL: null,
    img_up: '../assets/images/right-up.svg',
    img_low: '../assets/images/right-down.svg',

    setBaseUrl: url => {
        cardModule.base_URL = url;
    },
    // Fabriquer les 'cards' crypto
    makeCardFromApiInDOM: (data) => {
        const containerCrypto = document.getElementById('container_crypto');
        const template = document.getElementById('card_crypto');
        // On récupère les données de la template et on crée un nouveau noeud
        const node = document.importNode(template.content, true);

        node.querySelector('.container_card').setAttribute('data-coin-id', data.id);
        node.querySelector('.img_crypto').setAttribute('src', data.image);
        node.querySelector('.curent_price').textContent = data.current_price + ' $';
        // Etape ou on définit le contour de la 'card' en fonction de l'évolution du prix de la crypto sur la monnaie
        if (data.price_change_percentage_24h > 0) {
           node.querySelector('.img_upandlow').setAttribute('src', cardModule.img_up);
           node.querySelector('.crypto').classList.add('green');
        } else {
            node.querySelector('.img_upandlow').setAttribute('src', cardModule.img_low);
            node.querySelector('.crypto').classList.add('red');
        };

        node.querySelector('.key_numbers > span').textContent = data.price_change_percentage_24h + ' %';
        // On filtre les noms trop long qui casserai l'harmonie des 'cards' de même taille dans tout l'app
        if (data.name.split('').length > 19) {
            // Soit si le nom de la crypto est trop long on lui assigne plutot son symbole en majuscule
            node.querySelector('.name_crypto').textContent = data.symbol.toUpperCase();
        } else {
            node.querySelector('.name_crypto').textContent = data.name;
        }

        node.querySelector('.symbol').textContent = data.symbol.toUpperCase();

        containerCrypto.appendChild(node);
        
        cardModule.findNumberEvoPriceCoin(data);
    },

    makeCardChart: (id, numbers) => {
        // On créé chaque graphique en faisant attention à le relier à la card crypto correspondante
        const chart = document.querySelector(`[data-coin-id="${id}"] #myChart`).getContext('2d');

        const chartEvoCoinInWeek = new Chart(chart, {
            // Création du graphique 
            type: 'line',
            data: {
                // Jour de la semaine
                labels: ['D-7', 'D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1'],
                datasets: [{
                    label: 'Valeur ',
                    backgroundColor: 'rgb(255, 211, 113)',
                    // Valeur moyennisée (grace à findNumberEvoPriceCoin plus bas) passé en arguments de la fonction
                    data: numbers,
                    fill: false,
                    borderColor: 'rgb(255, 211, 113)',
                }]
            },
            options: {        
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    // On parlera en USD
                    text: 'EVOLUTION EN $',
                    fontStyle: 'bold',
                    fontColor: 'white',
                },
                tooltips: {
                    titleFontSize: 9,
                },
                scales: {
                    xAxes: [{ 
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                          fontColor: "white",
                        },
                    }],
                    yAxes: [{ 
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                          fontColor: "white",
                        },
                    }],
                }
            }
        });

        
    },
    // Apparition du graphique de la monnaie correspondante au click de l'utilisateur sur la card
    showChartAfterClick: (event) => {

        const cardCryptoActive = event.target.closest('.crypto').querySelector('.container_nothidden');
        const chartHidden = event.target.closest('.crypto').querySelector('.hidden_card');

        if (cardCryptoActive.style.display === 'block' || cardCryptoActive.style.display === '') {
            cardCryptoActive.style.display = 'none';
            chartHidden.style.display = 'block'
        } else {
            cardCryptoActive.style.display = 'block';
            chartHidden.style.display = 'none';
        }

    },
    
    findNumberEvoPriceCoin: (data) => {
        // Ayant voulu faire une seule requête pour casiment tout récuperer en BDD j'ai du faire des calculs par la suite
        const dataPriceEvolution7Days = data.sparkline_in_7d.price;
        // On reçoit les données de toutes la semaine et heure par heure dans le resultat de la requete. On doit donc regrouper les resultats correspondant par tranche de 24h ( un resultat par heure donc pour la semaine 24h * 7). Je range ensuite les resultats dans le tableau ci-dessous et je les envois à la fonction makeCardChart pour création du graphique.
        const averageCoinPerDay = [];

        numDayAverage = (numbers) => {
            totalNum = 0;

            for (const number of numbers) {
                totalNum += number
            };

            return averageCoinPerDay.push((totalNum / numbers.length).toFixed(4));
        };

        while (dataPriceEvolution7Days.length) {
            numDayAverage(dataPriceEvolution7Days.splice(0, 23));
        };
        console.log(averageCoinPerDay)
        cardModule.makeCardChart(data.id, averageCoinPerDay);

    },

}

// module.exports = cardModule;
