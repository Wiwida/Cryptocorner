const cardModule = {

    base_URL: null,
    img_up: '../assets/images/right-up.svg',
    img_low: '../assets/images/right-down.svg',

    setBaseUrl: url => {
        cardModule.base_URL = url;
    },

    makeCardFromApiInDOM: (data) => {

        const containerCrypto = document.getElementById('container_crypto');
        const template = document.getElementById('card_crypto');

        const node = document.importNode(template.content, true);

        node.querySelector('.container_card').setAttribute('data-coin-id', data.id);
        node.querySelector('.img_crypto').setAttribute('src', data.image);
        node.querySelector('.curent_price').textContent = data.current_price + ' $';

        if (data.price_change_percentage_24h > 0) {
           node.querySelector('.img_upandlow').setAttribute('src', cardModule.img_up);
           node.querySelector('.crypto').classList.add('green');
        } else {
            node.querySelector('.img_upandlow').setAttribute('src', cardModule.img_low);
            node.querySelector('.crypto').classList.add('red');
        };

        node.querySelector('.key_numbers > span').textContent = data.price_change_percentage_24h + ' %';
        node.querySelector('.name_crypto').textContent = data.name;
        node.querySelector('.symbol').textContent = data.symbol.toUpperCase();

        containerCrypto.appendChild(node);
        
        cardModule.findNumberEvoPriceCoin(data);
    },

    makeCardChart: (id, numbers) => {

        const chart = document.querySelector(`[data-coin-id="${id}"] #myChart`).getContext('2d');

        const chartEvoCoinInWeek = new Chart(chart, {

            type: 'line',
            data: {
                labels: ['D-7', 'D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'TODAY'],
                datasets: [{
                    label: 'Valeur ',
                    backgroundColor: 'rgb(255, 211, 113)',
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

    showChartAfterClick: (event) => {

        const cardCryptoActive = event.target.closest('.crypto').querySelector('.container_nothidden');
        const chartHidden = event.target.closest('.crypto').querySelector('.hidden_card');
        debugger
        if (cardCryptoActive.style.display === 'block') {
            cardCryptoActive.style.display = 'none';
            chartHidden.style.display = 'block'
        } else {
            cardCryptoActive.style.display = 'block';
            chartHidden.style.display = 'none';
        }

    },
    
    findNumberEvoPriceCoin: (data) => {

        const dataPriceEvolution7Days = data.sparkline_in_7d.price;
        const averageCoinPerDay = [];

        numDayAverage = (numbers) => {
            totalNum = 0;

            for (const number of numbers) {
                totalNum += number
            };

            return averageCoinPerDay.push(totalNum / numbers.length);
        };

        while (dataPriceEvolution7Days.length) {
            numDayAverage(dataPriceEvolution7Days.splice(0, 23));
        };

        cardModule.makeCardChart(data.id, averageCoinPerDay);

    },

}

// module.exports = cardModule;
