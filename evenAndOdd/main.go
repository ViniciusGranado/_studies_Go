package main

import "fmt"

func main() {
	numbers := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

	for _, number := range numbers {
		var isEvenOrOdd string

		if number%2 == 0 {
			isEvenOrOdd = "even"
		} else {
			isEvenOrOdd = "odd"
		}

		fmt.Printf("%v is %v\n", number, isEvenOrOdd)
	}
}
