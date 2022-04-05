package main

import "fmt"

func main() {
	color := map[string]string{
		"red": "#ff0000",
		"green": "#4bf745",
	}

	fmt.Println(color)

	color["white"] = "#ffffff"

	fmt.Println(color)

	delete(color, "red")

	fmt.Println(color)
}