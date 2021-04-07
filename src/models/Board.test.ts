import Board from "./Board";
import { Dealer } from "./Dealer";

const teamSchema1 = {
    player1: 'juan',
    player2: 'Maria'
},
    teamSchema2 = {
        player1: 'Carla',
        player2: 'Pedro'
    };

Board.getInstance().init(teamSchema1, teamSchema2);


describe("🧪 There are 4 players🧪", () => {
    test("test0:The first name was inserted correctly", async () => {
        const { playersArray}= Board.getInstance();

        expect(playersArray.filter(p=> p.name === 'juan')).toHaveLength(1)
        expect(playersArray.filter(p=> p.name === 'Maria')).toHaveLength(1)
        expect(playersArray.filter(p=> p.name === 'Carla')).toHaveLength(1)
        expect(playersArray.filter(p=> p.name === 'Pedro')).toHaveLength(1)
    });

    test("test0:🧪 There are 4 players🧪", async () => {
        expect(Board.getInstance().playersArray.length).toBe(4);
    });
});


describe("🧪 The Dominoes were created correctly 🧪", () => {

    test(" test3: 🧪The dealer has 28 dominoes🧪", async () => {
        const domLength = await Dealer.getInstance().dominoesLength()
        expect(domLength).toBe(28);
    });
});
