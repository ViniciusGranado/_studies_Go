package main

import "fmt"

type colorMap map[string]string

func main() {
	color := colorMap{
		"red": "#ff0000",
		"green": "#4bf745",
	}

	color["white"] = "#ffffff"

	delete(color, "red")

	color.printColorMap()
}

func (c colorMap) printColorMap() {
	for color, hex := range c {
		fmt.Printf("Hex color for %v is %v\n", color, hex)
	}
}