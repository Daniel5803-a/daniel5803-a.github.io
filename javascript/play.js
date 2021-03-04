var config = {
    position: 'start',
    draggable: true,
    onDrop: onDrop,
    onDragStart: onDragStart,
}

var api = new LichessApi('fXPF3hzqm8qxvXgp')
var game = new Chess();
var board1 = Chessboard('board1', config)
var isWhite = null
var gameId = null


queryParams = new URLSearchParams(window.location.search)
console.log(queryParams.get('id'))
if (queryParams.get('id') != null && queryParams.get('id') != 'none')
{
    gameId = queryParams.get('id')

    api.streamGameBoard(gameId, (data) =>{
        if(data.type == "gameFull")
        {
            isWhite = (data.white.id == 'board5803');
            board1.orientation(isWhite ? 'white' : 'black')
            
            activateBoard()

            queryParams.set("id", gameId)
            history.replaceState('', '', window.location.href.split('?')[0] + '?' + queryParams.toString())

            var g = new Chess()

            gameMoves = data.state.moves.split(' ');
            for(var i = 0; i < gameMoves.length; i++)
            {
                g.move(gameMoves[i], { sloppy: true })
            }
            
            game = g
            updateBoard(g.fen())
        }

        if(data.type == 'gameState')
        {
            var g = new Chess()

            gameMoves = data.moves.split(' ')
            for(var i = 0; i < gameMoves.length; i++)
            {
                g.move(gameMoves[i], { sloppy: true })
            }
            
            game = g
            updateBoard(g.fen())

            if(data.status != "started" && data.winner != null)
            {
                queryParams.set("id", 'none')
                history.replaceState('', '', window.location.href.split('?')[0] + '?' + queryParams.toString())
                alert((data.winner == (isWhite ? 'white' : 'black')) ? 'Has ganado!' : "Has perdido")
            }
            else if(data.status != "started")
            {
                queryParams.set("id", 'none')
                history.replaceState('', '', window.location.href.split('?')[0] + '?' + queryParams.toString())
                alert('Tablas')
            }
        }
    })
}
else if(queryParams.get('player') != null)
{
    console.log(queryParams.get('player'))
    params = {
        rated: false,
        color: 'random',
        variant: 'standard'
    }
    api.challenge(queryParams.get('player'), $.param(params) + '&clock.limit=600&clock.increment=10')
        .then((data) => {
            console.log(data)
            gameId = data.data.challenge.id
            api.streamEvents((event) => {
                switch(event.type)
                {
                    case "gameStart":
                        console.log(gameId)
                        if (event.game.id != gameId) break;
                        api.streamGameBoard(gameId, (data) => {
                            console.log("aaaa")
                            if(data.type == "gameFull")
                            {
                                isWhite = (data.white.id == 'board5803');
                                board1.orientation(isWhite ? 'white' : 'black')
                                
                                activateBoard()

                                queryParams.set("id", gameId)
                                history.replaceState('', '', window.location.href.split('?')[0] + '?' + queryParams.toString())
                    
                                var g = new Chess()
                    
                                gameMoves = data.state.moves.split(' ');
                                for(var i = 0; i < gameMoves.length; i++)
                                {
                                    g.move(gameMoves[i], { sloppy: true })
                                }
                                
                                game = g
                                updateBoard(g.fen())
                            }
                    
                            if(data.type == 'gameState')
                            {
                                var g = new Chess()
                    
                                gameMoves = data.moves.split(' ')
                                for(var i = 0; i < gameMoves.length; i++)
                                {
                                    g.move(gameMoves[i], { sloppy: true })
                                }
                                
                                game = g
                                updateBoard(g.fen())

                                if(data.status != "started" && data.winner != null)
                                {
                                    queryParams.set("id", 'none')
                                    history.replaceState('', '', window.location.href.split('?')[0] + '?' + queryParams.toString())
                                    alert((data.winner == (isWhite ? 'white' : 'black')) ? 'Has ganado!' : "Has perdido")
                                }
                                else if(data.status != "started")
                                {
                                    queryParams.set("id", 'none')
                                    history.replaceState('', '', window.location.href.split('?')[0] + '?' + queryParams.toString())
                                    alert('Tablas')
                                }
                            }
                        })
                        break;

                    default:
                        console.log('???')
                        break;
                }
            })
        })
}
else if(queryParams.get('random') != null)
{
    params = {
        rated: false,
        time: 10,
        increment: 10,
        color: 'random',
        variant: 'standard'
    }
    api.streamEvents((event) => {
        switch(event.type)
        {
            case "gameStart":
                console.log(gameId)
                if (event.game.id != gameId && gameId != null) break;
                api.streamGameBoard(event.game.id, (data) => {
                    console.log("aaaa")
                    if(data.type == "gameFull")
                    {
                        isWhite = (data.white.id == 'board5803');
                        board1.orientation(isWhite ? 'white' : 'black')
                        
                        activateBoard()

                        if(gameId === null) gameId = event.game.id;
                        console.log(gameId)
                        queryParams.set("id", gameId)
                        history.replaceState('', '', window.location.href.split('?')[0] + '?' + queryParams.toString())
            
                        var g = new Chess()
            
                        gameMoves = data.state.moves.split(' ');
                        for(var i = 0; i < gameMoves.length; i++)
                        {
                            g.move(gameMoves[i], { sloppy: true })
                        }
                        
                        game = g
                        updateBoard(g.fen())
                    }
            
                    if(data.type == 'gameState')
                    {
                        var g = new Chess()
            
                        gameMoves = data.moves.split(' ')
                        for(var i = 0; i < gameMoves.length; i++)
                        {
                            g.move(gameMoves[i], { sloppy: true })
                        }
                        
                        game = g
                        updateBoard(g.fen())

                        if(data.status != "started" && data.winner != null)
                        {
                            queryParams.set("id", 'none')
                            history.replaceState('', '', window.location.href.split('?')[0] + '?' + queryParams.toString())
                            alert((data.winner == (isWhite ? 'white' : 'black')) ? 'Has ganado!' : "Has perdido")
                        }
                        else if(data.status != "started")
                        {
                            queryParams.set("id", 'none')
                            history.replaceState('', '', window.location.href.split('?')[0] + '?' + queryParams.toString())
                            alert('Tablas')
                        }
                    }
                })
                break;

            default:
                console.log('???')
                break;
        }
    })

    api.seek($.param(params))
        .then((data) => {
            console.log(data)            
        })
}
else
{
    params = {
        level: 2,
        color: 'random'
    }
    api.challengeAI($.param(params))
        .then((data) => {
            gameId = data.data.id
            api.streamEvents((event) => {
                switch(event.type)
                {
                    case "gameStart":
                        console.log(gameId)
                        if (event.game.id != gameId) break;
                        api.streamGameBoard(gameId, (data) =>{
                            if(data.type == "gameFull")
                            {
                                isWhite = (data.white.id == 'board5803');
                                board1.orientation(isWhite ? 'white' : 'black')
                                
                                activateBoard()

                                queryParams.set("id", gameId)
                                history.replaceState('', '', window.location.href.split('?')[0] + '?' + queryParams.toString())
                    
                                var g = new Chess()
                    
                                gameMoves = data.state.moves.split(' ');
                                for(var i = 0; i < gameMoves.length; i++)
                                {
                                    g.move(gameMoves[i], { sloppy: true })
                                }
                                
                                game = g
                                updateBoard(g.fen())
                            }
                    
                            if(data.type == 'gameState')
                            {
                                var g = new Chess()
                    
                                gameMoves = data.moves.split(' ')
                                for(var i = 0; i < gameMoves.length; i++)
                                {
                                    g.move(gameMoves[i], { sloppy: true })
                                }
                                
                                game = g
                                updateBoard(g.fen())

                                if(data.status != "started" && data.winner != null)
                                {
                                    queryParams.set("id", 'none')
                                    history.replaceState('', '', window.location.href.split('?')[0] + '?' + queryParams.toString())
                                    alert((data.winner == (isWhite ? 'white' : 'black')) ? 'Has ganado!' : "Has perdido")
                                }
                                else if(data.status != "started")
                                {
                                    queryParams.set("id", 'none')
                                    history.replaceState('', '', window.location.href.split('?')[0] + '?' + queryParams.toString())
                                    alert('Tablas')
                                }
                            }
                        })
                        break;

                    default:
                        console.log('???')
                        break;
                }
            })
        });
}

function activateBoard()
{
    document.getElementById('loading').style='display:none;'
    document.getElementById('board1').style=''
}

function onDrop(source, target)
{
    if (game.turn() != (isWhite ? 'w' : 'b')) return 'snapback'

    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' 
    })
    if (move === null) return 'snapback'

    api.makeMoveBoard(gameId, source+target)
}

function onDragStart(source, piece, position, orientation)
{
    if (game.game_over()) return false
  
    if (piece.search(isWhite ? /^b/ : /^w/) !== -1) return false
}

function updateBoard(fen)
{
    board1.position(fen);
}

function verboseToSloppy(move)
{
    if(move != null && move.from != null && move.to != null)
    {
        return move.from + move.to
    }
    else
    {
        console.log('\x1b[31m%s\x1b[0m', 'ERROR verboseToSloppy: ' + move)
        return null
    }
}