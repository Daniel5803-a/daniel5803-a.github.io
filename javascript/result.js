queryParams = new URLSearchParams(window.location.search)

if(queryParams.get('s') === null)
{
    window.location = './puzzles.html'
}

div = document.getElementById("result")
div.innerHTML = 'Resultado: ' + queryParams.get('s') + '/5 <br>' + parseInt(queryParams.get('s'))*20 + '%' + '<br>' + queryParams.get('time')