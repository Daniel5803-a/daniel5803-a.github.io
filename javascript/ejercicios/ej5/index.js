var z = 0
var aleatorio = Math.floor(Math.random()*5+1);
var i = 1
while (i <= 4)
{
	var numeroElegido = parseInt(prompt("\u00bfQu\u00e9 n\u00famero es?"));

	if (aleatorio == numeroElegido) 
	{
		document.write("\u00a1\u00a1\u00a1Eres un fen\u00f3meno, acertaste!!" )
		break
	}
	else
	{
		document.write("Has fallado" + "<br>")
		z = z + 1
	}

	if (z == 4) 
	{
		document.write("\u00a1\u00a1\u00a1Volviste a fallar y ya no tienes más intentos!!" )
	}
	i++
} 
