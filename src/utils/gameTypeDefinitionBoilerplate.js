export const gameTypeDefinitionBoilerplate = `package main

func (g *GameDefinition) WinCondition() (bool, *WinCondition) {
	return false, nil
}

func (g *GameDefinition) BetweenRound() {

}
`
