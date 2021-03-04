const { Chess } = require('chess.js')

// Node.js required
fs = require('fs')
chess = require('chess.js')

fs.readFile('./javascript/tools/exercises.txt', 'utf-8', (err, data) => {
    if(err)
    {
        console.error(err)
    }

    const list = data.split('\n')
    board = new chess.Chess()

    str = '['    

    for (var i = 0; i < list.length; i++)
    {
        if(board.validate_fen(list[i].slice(0,-1) + "1").valid)
        {
            sol = ""
            rawSolutionList = list[i+1].split(' ')
            for (var j = 0; j < rawSolutionList.length; j++)
            {
                if(isNaN(parseInt(rawSolutionList[j].charAt(0))) && rawSolutionList[j] != '')
                {
                    sol += rawSolutionList[j] + ' '
                }
            }

            obj = { position: list[i].slice(0,-1) + '1', solution: sol.slice(0,-1)}
            str += JSON.stringify(obj) + ',\n'

        }
    }

    str += "]"

    console.log(str)

    fs.writeFile('./javascript/tools/problems.txt', str, (err) => {
        if (err) {console.error(err)}
    })
})