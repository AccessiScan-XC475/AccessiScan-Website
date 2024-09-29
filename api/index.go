package handler

// THIS IS THE VERCEL ENTRY POINT FOR GOLANG
// THIS FILE SHOULD NOT NEED TO BE EDITED
import (
	"AccessiScan-Website/server"
	"net/http"
)

func HandlerFunc(w http.ResponseWriter, r *http.Request) {
    server := server.NewServer()
    server.Handler.ServeHTTP(w, r)
}
