package main

import (
	"bufio"
	"fmt"
	"os"
	"time"
)

func main() {
	reader := bufio.NewReader(os.Stdin);

	fmt.Print("What is the time for your break: ")
	usrInput, errInput := reader.ReadString('\n')

	if errInput != nil {
		fmt.Println("Error: ", errInput)
		os.Exit(1)
	}

	breakTime, errParse := time.Parse("15:04", usrInput[:5])

	if errParse != nil {
		fmt.Println("Error: ", errParse)
		os.Exit(1)
	}


	breakHour := breakTime.Hour()
	breakMinute := breakTime.Minute()

	for {
		currentTime := time.Now()

		currentHour := currentTime.Hour()
		currentMinute:= currentTime.Minute()

		if (currentHour == breakHour) && (currentMinute == breakMinute) {
			break
		}

		var missingHours int;
		var missingMinutes int;


		if breakMinute > currentMinute {
			missingHours = breakHour - currentHour
			missingMinutes = breakMinute - currentMinute
		} else {
			missingHours = (breakHour - currentHour) - 1
			missingMinutes = (60 + breakMinute) - currentMinute
		}

		fmt.Println("\nSO SAD ):")
		fmt.Printf("There are still %v hours and %v minutes left for the break\n", missingHours, missingMinutes)

		time.Sleep(time.Minute)
	}

	fmt.Println("\nIT'S BREAK TIME!!!")
}