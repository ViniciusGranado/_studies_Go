package main

func main() {
	cards := newDeck()
	cards.shufle()

	cards.print()
}
