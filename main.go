package main

import (
	"AccessiScan-Website/server"
	"log"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load(".env.local")

	server := server.NewServer()
	log.Println("Server running at http://localhost:8080")
	server.ListenAndServe()
}
