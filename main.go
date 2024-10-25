package main

import (
	"AccessiScan-Website/domain"
	gh "AccessiScan-Website/github"
	"AccessiScan-Website/server"
	"log"

	"github.com/joho/godotenv"
)

// entrypoint for local development
func main() {
	godotenv.Load(".env.local")

	// set domain to local development homepage
	domain.DOMAIN = "http://localhost:3000"

	// initialize GitHub environment vars
	gh.Initialize()

	server := server.NewServer()
	log.Println("Server running at http://localhost:8080")
	server.ListenAndServe()
}
