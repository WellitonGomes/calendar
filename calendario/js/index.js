document.addEventListener('DOMContentLoaded', function () {
    const monthsBR = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    let feriados = [];

    // Função para carregar os feriados
    function carregarFeriados(ano) {
        return fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`)
            .then(res => res.json())
            .then(data => {
                feriados = data.map(f => {
                    // Convertendo a data do formato 'YYYY-MM-DD' para componentes separados
                    const [ano, mes, dia] = f.date.split('-').map(Number);
                    return {
                        dia: dia,
                        mes: mes - 1, // Ajusta o mês para o formato 0-11 do JavaScript
                        nome: f.name
                    };
                });
            })
            .catch(err => {
                console.error('Erro ao carregar feriados:', err);
                feriados = []; // Fallback vazio
            });
    }

    const tableDays = document.getElementById('dias');

    // Função para preencher o calendário
    function GetDaysCalendar(mes, ano) {
        document.getElementById('mes').innerHTML = monthsBR[mes];
        document.getElementById('ano').innerHTML = ano;

        let firstDayOfWeek = new Date(ano, mes, 1).getDay() - 1;
        let getLastDayThisMonth = new Date(ano, mes + 1, 0).getDate();

        // Loop para preencher os dias no calendário
        for (var i = -firstDayOfWeek, index = 0; i < (35 - firstDayOfWeek); i++, index++) {
            let dt = new Date(ano, mes, i);
            let dtNow = new Date();
            let dayTable = tableDays.getElementsByTagName('td')[index];
            dayTable.classList.remove('mes-anterior');
            dayTable.classList.remove('proximo-mes');
            dayTable.classList.remove('dia-atual');
            dayTable.classList.remove('feriado');
            dayTable.innerHTML = dt.getDate();

            // Verifica se é feriado
            const feriado = feriados.find(f => f.dia === dt.getDate() && f.mes === dt.getMonth());

            if (feriado) {
                dayTable.classList.add('feriado');
                dayTable.title = feriado.nome; // Mostra o nome do feriado como tooltip
            }

            // Marca o dia atual
            if (dt.getFullYear() == dtNow.getFullYear() && dt.getMonth() == dtNow.getMonth() && dt.getDate() == dtNow.getDate()) {
                dayTable.classList.add('dia-atual');
            }

            // Marca o mês anterior
            if (i < 1) {
                dayTable.classList.add('mes-anterior');
            }

            // Marca o próximo mês
            if (i > getLastDayThisMonth) {
                dayTable.classList.add('proximo-mes');
            }
        }
    }

    let now = new Date();
    let mes = now.getMonth();
    let ano = now.getFullYear();

    // Carregar feriados e gerar o calendário
    carregarFeriados(ano).then(() => {
        GetDaysCalendar(mes, ano);
    });

    const botaoProximoMes = document.getElementById('btn_prev');
    const botaoMesAnterior = document.getElementById('btn_ant');

    // Navegar para o próximo mês
    botaoProximoMes.onclick = function () {
        mes++;

        if (mes > 11) {
            mes = 0;
            ano++;
        }

        carregarFeriados(ano).then(() => {
            GetDaysCalendar(mes, ano);
        });
    };

    // Navegar para o mês anterior
    botaoMesAnterior.onclick = function () {
        mes--;

        if (mes < 0) {
            mes = 11;
            ano--;
        }

        carregarFeriados(ano).then(() => {
            GetDaysCalendar(mes, ano);
        });
    };
});
