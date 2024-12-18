package handler

// THIS IS THE VERCEL ENTRY POINT FOR GOLANG
// THIS FILE SHOULD NOT NEED TO BE EDITED
import (
	"AccessiScan-Website/handlers"
	"AccessiScan-Website/server"
	"net/http"
)

// Vercel entrypoint
func HandlerFunc(w http.ResponseWriter, r *http.Request) {
	handlers.InitHistoryLimit()
	server := server.NewServer()
	server.Handler.ServeHTTP(w, r)
}
