package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"time"
)

func main() {
	reader := bufio.NewReader(os.Stdin);
	ticker := time.NewTicker(time.Minute)

	fmt.Print("What is the time for your break: ")
	usrInput, errInput := reader.ReadString('\n')

	if errInput != nil {
		fmt.Println("Error: ", errInput)
		os.Exit(1)
	}

	now := time.Now()
	breakTime, errParse := time.Parse("15:04", usrInput[:5])
	
	if errParse != nil {
		fmt.Println("Error: ", errParse)
		os.Exit(1)
	}

	breakTime = time.Date(
		now.Year(),
		now.Month(),
		now.Day(),
		breakTime.Hour(),
		breakTime.Minute(),
		0,
		0,
		time.Local,
	)

	if (time.Until(breakTime) < 0) {
		breakTime = breakTime.Add(24 * time.Hour)
	}

	for {
		ut := time.Until(breakTime)

		if ut <= 0 {
			break
		}

		fmt.Println("\nSO SAD ):")
		fmt.Printf("There are still %v hours and %v minutes left for the break\n", math.Floor(ut.Hours()), math.Ceil(ut.Minutes()))

		<- ticker.C
	}

	fmt.Println("\nIT'S BREAK TIME!!!")
}