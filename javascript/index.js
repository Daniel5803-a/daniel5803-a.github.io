function playButton()
{
    var div = document.getElementById("playMenu")
    div.style.zIndex = 1

    var background = document.createElement("div")
    background.classList.add("background")
    div.appendChild(background)

    var menu = document.createElement("div")
    menu.classList.add("pop-up")
    menu.style = "min-width: 400px; min-height:300px;"
    
    var topBar = document.createElement("ul")
    topBar.style = "border-width: 0px;"
    var option1 = document.createElement("li")
    var a = document.createElement("p")
    a.innerHTML = "Jugar contra bots"
    option1.addEventListener('click', () => changeOption(1))
    option1.classList.add("active")
    var option2 = document.createElement("li")
    var b = document.createElement("p")
    b.innerHTML = "Jugar multijugador"
    option2.addEventListener('click', () => changeOption(2))
    var exit = document.createElement("li")
    exit.style = "float:right;min-width:40px;min-height:40px"
    exit.addEventListener("click", exitMenu)
    var c = document.createElement("p")
    c.innerHTML = "x"

    option1.appendChild(a)
    option2.appendChild(b)
    exit.appendChild(c)
    topBar.appendChild(option1)
    topBar.appendChild(option2)
    topBar.appendChild(exit)
    menu.appendChild(topBar)
    

    var contents1 = document.createElement("div")
    contents1.classList.add("option")
    contents1.innerHTML = "Elige el bot contra el que jugar:"
    contents1.id = "option1"

    var list = document.createElement("select")
    var opt1 = document.createElement("option")
    opt1.innerHTML = "maia1"
    var opt2 = document.createElement("option")
    opt2.innerHTML = "maia5"
    var opt3 = document.createElement("option")
    opt3.innerHTML = "maia9"

    list.appendChild(opt1)
    list.appendChild(opt2)
    list.appendChild(opt3)

    button1 = document.createElement("button")
    button1.innerHTML = "Jugar"
    button1.classList.add("button")
    button1.addEventListener("click", acceptMenu1)
    
    contents1.appendChild(document.createElement("br"))
    contents1.appendChild(list)
    contents1.appendChild(document.createElement("br"))
    contents1.appendChild(button1)

    menu.appendChild(contents1)

    var contents2 = document.createElement("div")
    contents2.classList.add("option")
    contents2.innerHTML = "Jugar contra personas reales de la p\u00e1gina web <a href='https://lichess.org/'>lichess.org</a>."
    contents2.id = "option2"
    contents2.style = "display: none;"

    button2 = document.createElement("button")
    button2.innerHTML = "Jugar"
    button2.classList.add("button")
    button2.addEventListener("click", acceptMenu2)
    
    contents2.appendChild(document.createElement("br"))
    contents2.appendChild(button2)
    
    menu.appendChild(contents2)

    div.appendChild(menu)
}

function exitMenu()
{
    const l = document.getElementById("playMenu").children.length
    for(var i = 0; i < l; i++)
    {
        document.getElementById("playMenu").children[0].remove()
    }

    document.getElementById("playMenu").style = ""
}

function acceptMenu1()
{
    window.location = "./play.html?player=" + document.getElementsByTagName('Select')[0].value
}
function acceptMenu2()
{
    window.location = "./play.html?random=true"
}

function changeOption(opt)
{
    document.getElementById("option1").style = ((opt == 1) ? '' : "display: none;")
    document.getElementById("option2").style = ((opt == 2) ? '' : "display: none;")

    document.getElementsByTagName('ul')[1].children[0].classList.remove('active')
    document.getElementsByTagName('ul')[1].children[1].classList.remove('active')

    document.getElementsByTagName('ul')[1].children[opt-1].classList.add('active')
}

function question()
{
    if (confirm ("¿Te gusta la pagina web?"))
    {
        alert("Ponme un 10")
    }
    else
    {
        alert("Ponme un 10")
    }
}