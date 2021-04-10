**Plan and analysis**

Read, understand, and process the feature.

El juego de domino

- 28 fichas
- 0 hasta 6
- Todas las combinaciones posibles de 0-6.
- 7 fichas diferentes para cada uno de los números .
- ficha tiene un valor igual a la suma de los puntos en sus espacios:doble
- 4 jugadores
- 2 equipos
- 7 fichas a cada jugador
- que inicie el jugador que tenga doble seis
- y que siga jugando el próximo jugador.
- cada jugador coloca una ficha en uno de los extremos de la cadena si va por un solo lado.
- Cuando un jugador tiene más de una opción para jugar: utiliza un algoritmo random para decidir la jugada.
- en caso contrario debe pasar.
- Las fichas van formando una cadena, los extremos iguales de las fichas se colocan juntos.
- Las fichas dobles, que se colocan en dirección perpendicular a la cadena.
- Cuando un jugador tiene una sola opción de colocar ficha, después periodo de 3 segundos el programa lo hace automáticamente.
- Cuando uno de los 4 jugadores coloca todas sus fichas: la mano es ganada por la pareja a la que pertenece dicho jugador.
- Tranque: cuando ninguno de los 4 jugadores puede seguir colocando ninguna de sus fichas: se suman los puntos de las fichas que no han sido jugadas de cada pareja, gana la suma menor.
- Al terminar la partida, la pareja ganadora obtiene la suma de todos los puntos de las fichas que no han sido colocadas por los cuatro jugadores.
- Vence la partida la pareja que alcanza la puntuación acordada.
- Haz un programa que juegue un juego hasta los 200 puntos
- la primera mano abre con doble seis
- Debes imprimir en la consola cada jugada, o alguna otra forma gráfica de validarlas.

**classes and entities**
  <img src="src\Prueba Intellisys D. Corp.jpg"
     alt="diagram"
     style="float: left; margin-right: 10px;" />

**Utility functions interaction**
 <img src="src\functionInteractions.png"
     alt="diagram"
     style="float: left; margin-right: 10px;" />

**Design** :
Translate the requirement by writing a unit test. If you have hot reloading set up, the unit test will run and fail as no code is implemented yet.

    - test0:🧪 There are 4 players🧪: verifica que en el juego solo hayan 4 jugadores despues de aplicar • createPlayers()
    - test1: 🧪teams have 2 players🧪: • verifica la existencia de 2 equipos y que tengan sus dos jugadores despues de aplicar createTeams()
    - test2: 🧪There are 7 combinations por numero en lado de domino🧪: •	Todas las combinaciones posibles de 0-6 por cada numero
    - test3: 🧪The dealer has 28 dominoes🧪: • retorna el numero total de dominos existentes en el Dealer(storage), esta tiene que ser exactamente 28
    - test4: 🧪each player has 7 dominoes🧪: • una vez creados los jugadores y los equipos, se reparte, cada jugador debe tener 7 fichas(in their hashtable) al final de la reparticion.
    - test5: 🧪Round restarted when a player has 3 doubles🧪: • verifica que la partida es reiniciada en si algún jugador tiene más de 3 dobles. in function playerHas3Doubles
     - test5.1: 🧪The very first game was started by the player with [6|6]🧪: •  que inicie el jugador que tenga doble seis.
    - test5.1: 🧪After round starter, player1 from the opposite team continued playing🧪: - y que siga jugando el próximo jugador.
    - test6: 🧪The next player plays if domino matches 🧪: • cada jugador coloca una ficha en uno de los extremos de la cadena si va por un solo lado.
    - test7: 🧪The dealer forced the next move 🧪: • Cuando un jugador tiene una sola opción de colocar ficha, después de 3 segundos,  el programa lo hace automáticamente.
    - test8:🧪 The next move was randomized 🧪: • Cuando un jugador tiene más de una opción para jugar: utiliza un algoritmo random para decidir la jugada.
    - test9:🧪 Next player is skipped if dominoes don't have match 🧪: • en caso contrario debe pasar.
    - test10: 🧪 The next matching domino is added to the correct end of the chain with the next property properly pointed outwards 🧪: •  Las fichas van formando una cadena, los extremos iguales de las fichas se colocan juntos.

    - test 11: 🧪 On the console, the doubles go horizontally 🧪 : • Las fichas dobles, que se colocan en dirección perpendicular a la cadena.

    - test 12: 🧪 a win is triggered and properly recorded when a player runs out of dominoes 🧪 : • Cuando uno de los 4 jugadores coloca todas sus fichas: la mano es ganada por la pareja a la que pertenece dicho jugador.
    - test 13: 🧪a deadlock is declared when there are no more matches🧪: • Tranque: cuando ninguno de los 4 jugadores puede seguir colocando ninguna de sus fichas
    - test 14: 🧪 currentPlayer vs. nextPlayer, player with les points wins 🧪: • se comparan las sumas de el jugador actual y el proximo.
    - test 15: 🧪The resulting poings after a game is ended go to the winning team 🧪: • se suman los puntos de las fichas que no han sido jugadas de cada pareja.
    - test 16: 🧪The round is restarted if the points of both players are even 🧪: • En caso de empate, la mano no cuenta a efectos de puntuación.
    - test 17: 🧪After a player wins the sum of all the available dominoes go to the winning team 🧪: • Al terminar la partida, la pareja ganadora obtiene la suma de todos los puntos de las fichas que no han sido colocadas por los cuatro jugadores.

    - test 18: 🧪The game was ended when one of the teams.points gets to 200 🧪: • Vence la partida la pareja que alcanza la puntuación acordada.
    - test 19: 🧪All the details of changes in the game were outputed to the console🧪: •
