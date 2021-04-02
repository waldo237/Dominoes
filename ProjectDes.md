**Plan and analysis**

Read, understand, and process the feature.

El juego de domino

- 28 fichas
- 0 hasta 6
- Todas las combinaciones posibles de 0-6 (can use recursión)
- 7 fichas diferentes para cada uno de los números (can be the base case of a recursive function).
- ficha tiene un valor igual a la suma de los puntos en sus espacios:doble
- 4 jugadores
- 2 equipos
- 7 fichas a cada jugador (base case of recursión)
-  Si algún jugador tiene más de 3 dobles, el reparto se repite.
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
- En caso de empate, la mano no cuenta a efectos de puntuación.
- Al terminar la partida, la pareja ganadora obtiene la suma de todos los puntos de las fichas que no han sido colocadas por los cuatro jugadores.
- Vence la partida la pareja que alcanza la puntuación acordada.



1.

  - Haz un programa que juegue un juego hasta los 200 puntos
  - la primera mano abre con doble seis
  - Debes imprimir en la consola cada jugada, o alguna otra forma gráfica de validarlas.
  - ![diagram](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=Prueba%20Intellisys%20D.%20Corp.drawio#R7Z1dc6M4FoZ%2FjavSF%2Bni2%2FgyTrp7t6qnqjfp6dnZmy3FyIZqjDyA43h%2B%2FUogYUCHhNgWeNOaSk2DLMsgPZKO3qOPiX27fv6Sok34GwlwPLGM4Hli300sy3Qsa8L%2BjGBfhkxtHrBKo4BHOgQ8RH9jHmjw0G0U4KwRMSckzqNNM3BBkgQv8kYYSlOya0Zbkrj5qxu0wlLAwwLFcugfUZCHPNQ0jMMH%2F8DRKuQ%2F7bv8g0e0%2BLlKyTbhvzex7GXxX%2FnxGom0ePwsRAHZ1YLsTxP7NiUkL6%2FWz7c4Znkrsq383ueOT6vnTnGS9%2FnC1J95punOloaHZz72r81pmcQTirc8M76gNeZPm%2B9FDmW7aB2jhN7Nw3wd00CTXi5Jkj%2FwSOwexdEqodcL%2Bjg4pQFPOM0jms83%2FIOcbGjoIozi4Cvaky176CynmSju5iFJo79pskj8Bv04zTkylteI8cC%2BSYMNGprijMb5JnLCrIK%2BoizncRYkjtEmix6rB16jdBUlc5LnZM0jiTf9HMXxLYlJWmSAKFaaKittHIjYokDL9NfRgl%2FH6BHH8woPkVJCijzM8pT8rFgrsrL2czwSy93PaB3FrFb9wGmAEiQyvcwP05IB4EywnMfPtSAOxBdM1jhP9zSK%2BNTjcIrKy293tZogooS1SmBOOTuI175VlfSBQHrBIewJZPX8ByCv77cxax1uyn%2FbaNLXzJtYlrnbzk05gwWuMV7mnbBmG7SIktXXIs6dcwi551nBgnZhlOMHGs6eaUcbSRpGaHrLuIAjjIIAJwU8OcpRyR%2BjZEOiJC%2Byz53TP5rLt8ZHd%2BLS97ql9%2Bbhnv6x6Gl%2BSxL6figqyhtTuHeYAT6XSeiu7K%2BzwVmgFa4XCyLeWVEwZxIKUuHHUbtN6lW1Xin5NS2vGB%2BK%2Bjsj4e7alHCwZRxsoJiLxuAbyaI8Iiz9tIzbKv5RSti1%2BpWwr6KuG0AB09c07rfJVb7f4A%2B00rPPCU1CV%2FvhoPB6dgFKqr0lmyScClzYAleainGo8AfsDMh%2Ff9zn%2Bx%2FB1v9jNvtXvHr%2B6z%2FLa0e2DUoyNinNgcI60HD0hUMq9168dMJhmj07EiVthi33JHOCUhkBPY55t%2BMYx26OY1y5E7NsAEjbclQQCYxjCllj843XZNpMeWjNOEoes01RL704L1uNpEGt99eWCQRFjl0veU6yVq5KgRas7ZScFrnbDmdxi%2F%2BzJvCa481S4IRXP0GvVuzfZLt%2BxOmVZRgfxGPRLCifrIyhW9eju96qtTplHAayrKzrdV0YZ4zW5oWj%2FJ0%2Bo2Z4AAvBNl5kGBhpKmNYfjark19L8%2Fs%2B%2BT1zGzz1R26DLRtkuLDLSnvCKLttjcWAzZppOCNzMZV1UsZFQgud%2BXIe2MCDjWIYIN9itNeADAuI3XMgoq7h8DoB4TxoNkZiwx3bsPdl5YSxsdim7K00HuPi4Y9qMwP2RkDWUUJwdhdlG8rDhZvOd%2Fxpb0NaYPd4qc3o8c1oy%2BhpR4uw8zLtS0xLpa99yqcWsd2ziFU4lW1o1gBrNFK8xFmo%2Fcpj1n1nbHNnKsvyv2fydDecBDdsXiG9I5siq2nIwVlhzwOUhYXzxGyygoMVFp4kmrshWZEExZ8OoXNqWT1V36SZm%2B7%2FzUrv49QV93%2Fy0ixu7p4bd3t%2BVz4x%2B7W3Ghu090TpCndFKi0OuQQht16KY5RHT81HgIqMJ1d4PiaVw8ZqOWwsszWhLCPbdIH5tw4FLyVkm24jIdtr4VO%2BsZRQQVD1jsc1Nw5sPxce6d83RaW%2BKs2QD7qpGbKpmQ5oOsOjblhyLsh4iAK8Q%2FtMozHCqMqaDajkyg2GPKqibxwDI2s9V%2BHdzlXwrWbX5wASoQONiUwVgyLHAVsqMXrmo3SXD6eL6zvdYh3dmVUtwEnufwgPZX2ZB7oYhhd%2BiiR2%2FI1ZElO2ROcUVahLEiqErcsUsrSKNYANUVbSN01mUFUjpWdzoXmwWsQ6b5sLufuhElahYQm6JA0rC7fLZYyvWp2x1rPGYQSYET9gKyAPJDgkOBf9BQRKSUm779bUDEYNNFV%2BWHPOgrwgDJ2AjkTFEgpt8I9nXpiQB2VYRLrW2iwJ02SLuQBXLbOU%2FlJtUokWtQYlxgOmoYESgqWIGFdWEXijEgVsHtqnJGDd0aacRlL2RY%2BExJgNYTQpw5Ey62m1KCPF6%2Bx%2BouCeKXcMFaBt0fSMT0814HmVHmWrQLsc%2FFFG3z74ShY%2FNTwXCs%2BQnZQ8YJKnwXbMadSel3freWltduNAq0QNiEhDhefFlXtC7XlRN1avWoCTPC8QHkoUHg9eQ5ywDboKMmg%2B0HLQQAwIBCT8DwcENMTSwv95SxgS%2FqESViH8e%2FIya77DCTVUCmFO9ARavx2tCYBU%2F%2BGaANmIFdObFzh6wpXyL2aWac%2FQGIyAGv9wkHQJLBuUZfUZ8OxSczEkF5Cwr4oLUD4BV8AwNkKUVY2HFkgUCSQlMW9T8UE8lKn4XX6fDOc5TrMrlOwPXmSNxnBo9DY7VKHRubJqxdFgXFA8NBYDYgEup1SFhWxoyEiU29VoQfVXEVTtYxXVahnGWYkUu5e3V90cNt3Tm%2BScavZWtf4iZVSw7zJhLHZRoqFQ1nWVnFymlAosBL7mOhtOL31LQ%2BG21OsAxm7Y%2BorF6obzHf1dQcilb22oOb6UthjcxW64xhja8l%2F7tc7bVIH70A3l2AL2KCy1A2qBFVP%2BtCo9Yi82qCotbznSdQwMTTokmoxRyegtSCsho0uM1mSMT8as78w5ZaZv12QJ7aoY15jsL%2Fcoc1V0rUXRrooRsXDGdFWIrVTr%2B%2B40Vwlon8Wv4rNwZ22fBSBFgjtCKfFZ%2BPDG%2FiFGQWnciEl%2FurE60rypKv9FnrgjPy68IVOOolgDMRIQox5f48PHLz2SYN9eI6IXiAyKxZCnwkiPO4OUE62bnreEex%2FwosI0mHUpINTSw%2Foo3LFqPTi9e7hq3zW6RUFQ9gLN2f96Ju8IhPTdA%2F8czQY85aVrovcCJff1xSIaFuXKSNeu6pXK3ne0oQoWu2tZkdZSR0Zj1vd4OWVaKuSc11rquFjQJmM4LGQDRB6OdigSWkR9tyKq3xZRhQ8ROiqkaROr2EpjJvdgTCLJogCbeorvWazgqtqfoqJ2IKGCCLnjEkRYmoiRiABk1AGJgLfbyUnRbWgiRiECUFCHI8I0LBCJZUp7y38m30NcOoc1HOPAAYmvQ9IB7bGtBfYzlzEwMRksYxUCewUYtJ0k2dIMvNLC2HjVH1BR4eqvSv0wuyYZCjweomdNiEIhpITmBem0Z%2BOhTh%2BTLQitj42OBXBy%2BsBYvHA8h1bUR0TD6m1SqpBOTfEK9dOGa4cG4%2FiR7OrnBdcYeE0bRGnO1EdeDnUB1J8UJxiLM42DCK1JEnwP2ciGfVD7Wu2gY6%2BvmEi%2FxR6b3gjeQINAvHlxrG9X%2FnDR5sVDioXB2Dr%2FWC7yU08odpsSp%2BXOPvq%2BZbvWzDHNqSdWILxyYPER5wzDtojzi6CDn6O8PBXb5Xd%2F8vdg14cjsdnNvvrx6ijtc5%2Bk3YfbXodrd02QPxFTp7UFi%2B0avbiUEvKcVxI630HaMODeLwe41Z%2FwM5EqDqw66hj4E0n1W0e%2B27MjSW3P4B%2BaVEc2%2Bu%2B3Mc4kfrUD9JIdoK%2BYli87QM12syu0gtcMS%2FMcpzjDWAIrSYqVsfYNTrbyvmx6nNF%2FnPFCO3AR%2Fk%2F4%2BQCPV4CzRRptSiH4Rp8hMAoZQ%2FpB4efTZwkMU9J9%2FZuqpnZ6suDw%2F28314zmwyBRqdksdrB5eYDnKzGbbc9uWBqe04JFsfAgjqV4FwjVBpS0OQjJiiQoro8qj1EfzgRZ12a%2FJ%2FJjTpuW6lSo428dds3aCdn9hl20hNG%2BFo03zd0P3DKtp9x12Pu5mvHpRfkEZ60VU2jOfFu%2BeCvdltPscEeEEZJi39QBQj3eqYqs1VJkp0cKCLb%2FSkJHCwj0NiVsm8NDdGq6hr%2BRALMY%2FwM%3D)
  

**Design** :
Translate the requirement by writing a unit test. If you have hot reloading set up, the unit test will run and fail as no code is implemented yet.

    -test0:🧪 There are 4 players🧪: verifica que en el juego solo hayan 4 jugadores despues de aplicar • createPlayers() 
    -test1: 🧪teams have 2 players🧪: • verifica la existencia de 2 equipos y que tengan sus dos jugadores despues de aplicar createTeams()
    -test2: 🧪There are 7 combinations por numero en lado de domino🧪: •	Todas las combinaciones posibles de 0-6 por cada numero
    -test3: 🧪The dealer has 28 dominoes🧪: • retorna el numero total de dominos existentes en el Dealer(storage), esta tiene que ser exactamente 28
    -test4: 🧪each player has 7 dominoes🧪: • una vez creados los jugadores y los equipos, se reparte, cada jugador debe tener 7 fichas(in their hashtable) al final de la reparticion.
    -test5: 🧪Round restarted when a player has 3 doubles🧪: • verifica que la partida es reiniciada en si algún jugador tiene más de 3 dobles. in function playerHas3Doubles
    🧪The very first game was started by the player with [6|6]🧪: •  que inicie el jugador que tenga doble seis.
  
    - y que siga jugando el próximo jugador.
    -test6: 🧪The next player plays if domino matches 🧪: • cada jugador coloca una ficha en uno de los extremos de la cadena si va por un solo lado.
    - test7: 🧪The dealer forced the next move 🧪: • Cuando un jugador tiene una sola opción de colocar ficha, después de 3 segundos,  el programa lo hace automáticamente.
    - test8:🧪 The next move was randomized 🧪: • Cuando un jugador tiene más de una opción para jugar: utiliza un algoritmo random para decidir la jugada.
    - test9:🧪 Next player is skipped if dominoes don't have match 🧪: • en caso contrario debe pasar.
    - test10: 🧪 The next matching domino is added to the correct end of the chain with the frontInTheChain property properly pointed outwards 🧪: •  Las fichas van formando una cadena, los extremos iguales de las fichas se colocan juntos.

    - test 11: 🧪 On the console, the doubles go horizontally 🧪 : • Las fichas dobles, que se colocan en dirección perpendicular a la cadena.
   
    -  🧪 a win is triggered and properly recorded when a player runs out of dominoes 🧪 : • Cuando uno de los 4 jugadores coloca todas sus fichas: la mano es ganada por la pareja a la que pertenece dicho jugador.
    -  🧪a deadlock is declared when there are no more matches🧪: • Tranque: cuando ninguno de los 4 jugadores puede seguir colocando ninguna de sus fichas
    - 🧪 currentPlayer vs. nextPlayer, player with les points wins 🧪: • se comparan las sumas de el jugador actual y el proximo.
    - 🧪The resulting poings from a deadlock go to the winning team 🧪: • se suman los puntos de las fichas que no han sido jugadas de cada pareja.
     - 🧪The round is restarted if the points of both players are even 🧪: • En caso de empate, la mano no cuenta a efectos de puntuación.
    -  🧪After a player wins the sum of all the available dominoes go to the winning team 🧪: • Al terminar la partida, la pareja ganadora obtiene la suma de todos los puntos de las fichas que no han sido colocadas por los cuatro jugadores.
 
    - 🧪The game was ended when one of the teams.points gets to 200 🧪: • Vence la partida la pareja que alcanza la puntuación acordada.
    - 🧪All the details of changes in the game were outputed to the console🧪: •

**Implementation:**

Write and implement the code that fulfills the requirement. Run all tests and they should pass, if not repeat this step.

**Test:**

Clean up your code by refactoring.

Rinse, lather and repeat.