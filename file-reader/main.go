package main

import (
	"fmt"
	"io"
	"os"
)

func main()  {
	filename := os.Args[1]

	io.Copy(os.Stdout, readFile(filename))
	
	fmt.Println()
}

func readFile(filename string) *os.File {
	file, err := os.Open(filename)

	if err != nil {
		fmt.Println("Error: ", err)
		os.Exit(1)
	}

	return file
}