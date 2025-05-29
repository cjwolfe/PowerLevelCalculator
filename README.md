# PowerLevelCalculator
Victor and Chris make a thing.

## Project Scope
- Create a deck power level evaluator given any 99 card EDH Decklist
- Given a decklist, recommend cards to cut or add to improve or diminish deck power level.
- Utilize Moxfield/TappedOut/Archidekt APIs to fetch decklists based on links
- Utilize copy/paste for text decklists.

## To Do
- [x] Create cssgrid frame for website
- [ ] Make upload button be able to process text file input
- [ ] Create a basic rendered view for after the program processes the input from user
- [ ] Add in a textbox alternative input to the form
- [ ] Use Scryfall json to get card info
- [ ] Find a way of importing scryfall data regularly
- [ ] Webhosting??


## Model Description

Every model should express ideas that are logical consequences of a goal, given the assumptions behind it. My assumptions are as follows:

My assumptions for a deck: most every card has intrinsic value. This value is determined by the card's ability to uniquely solve problems when drawn (when drawing a counterspell in a hand with 6 counterspells, the card will likely not add any value). So the odds of the card being drawn when it will add value, modified by how much value it adds to the hand, and the intrinsic value of the card, all determine its value metric. Summed values of cards then determine the power level of a deck.

Cards that don’t have intrinsic value are tutors and lands. Rather, we assume that tutors will always fetch the best card available, which will be the card that solves any unanswered problems on the board. Tutors can thus be modeled via an argmax function of the tutor’s expected value of its ability to uniquely address a class of problems in a given board (problems include addressing threats and making more threats on one's board). Lands

Bulleted version / ideas:

A card’s value is its expected marginal contribution to winning when drawn.??
Value depends on when drawn (early vs. late game) and current hand state.??
Total power aggregates individual values, adjusted for redundancy/synergy.??


### Assumptions (Defined)
1. Each deck wants to win
    - winning is achieved through specific actions
        - The ability to perform actions determines deck value
        - The summed value of a deck (per relative card value) is the deck’s power level
        - This summation is of the cdfs of all value problems
        - Damage, counterspells, removal, stax
    - Cards have intrinsic value
        1. Card Advantage vs opp
        2. Mana Advantage vs opp
        3. Situational value
        - Value is determined by
            - How likely one is to draw the card
            - The degree to which the card performs actions other cards don’t
            - The ability to cast the card (mana, etc.)
            - Relative value is determined by the value matrix, ∑
            - Tutors have no intrinsic value—instead, they let us find cards that do. Therefore tutors are not a dimension on the value matrix but instead influence the predicted ability to play each card the card can tutor for when that card would add the most value
        - Assume tutors will always seek cards that solve problems other available cards cannot
        - Lands / mana sources have no intrinsic value—they let us cast cards that do.
        - Card advantage cards have no intrinsic value—they instead improve the chances of us finding cards that do.
    - Graveyard recursion cards have no intrinsic value—they instead allow us to immediately access the value of cards in our graveyards (I disagree, zone management is very important. The graveyard is just another zone you have access to other than your hand, like the command zone -cw)
2. Intrinsic value is determined by how a card improves the chance of winning
    - Winning the game means getting closer to winning, so cards that improve the odds of winning or an opponent losing have intrinsic value
    - Win conditions
    Infinite combos
    Does not scale relatively linearly with other problems
    Damage
    Scales relatively linearly with other problems
    - Winning the same means not losing, so cards that decrease the odds of us losing or an opponent not winning have intrinsic value
    Stax
    Removal
    Counterspells
3. Infinite combos
    - Value depends on the probability of the combo resolving
    Playable probability
    User’s tutoring, card advantage count? (model these first!)
    Interruption
    User’s counterspell count
    User’s stax removal count?
    User’s recursion count
    Expected value of opponents’ counterspell count
4. Tutoring
5. Card Advantage

Formulae ideas

Design matrix X is m-x-n-dimensioned
z = number of cards drawn before  specific problem emerges

Total value
V=D+W

Deck value
D=i=1mwi

Card value
c=i=1nviTv							

Ɑ is determined by how long value (damage, removal, counterspells, stax, all augmented by tutors and card draw) is expected to be relevant given combo potential and the deck’s control capacity
Weights vector = cdf on probability of drawing to solve respective problem * cdf on playable
wi=i=1zi			

Value covariance ∑ is an n-x-n covariance matrix 
=(covariance of the degree to which each dimension solves problems in other columns)

W=(High power)·(Probability played via interaction, GA effects, recursion)

∑ can be estimated via an estimated law of total probability with a set of common problems to solve for each dimension and the sum total of the relative weighted probability of a card in a value dimension solving a typical problem in each dimension.

The win-con value term should not be modeled in the value matrix because win conditions do not solve problems in other dimensions of the value matrix and contain latent values.



where ∑ is the covariance matrix of all v vectors with a weight vector wi to be used initially penalize too much of one type of card where is the sum of all initial vectors is , where u is the set of initial card vectors, , such that vi=wui, or something of the like.





## Notes from phone call

Probability density
Cumulative density

Summing the CDFs * how many turns you have access to those cards



Interaction -- Gameplan -- Card Advantage(incl tutors) -- Mana Advantage

Mathematically, tutoring and card draw are different things?
Can a card be drawn and cast? Multiply by the value that the card gives.

Stax Removal Counterspells Damage