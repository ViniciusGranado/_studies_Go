package main

func main() {
	cards := newDeckFromFile("my_cards.txt")
	cards.print()
}
