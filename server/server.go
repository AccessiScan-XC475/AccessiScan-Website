package server

// THIS FILE WILL MOST LIKELY NOT NEED CHANGES
// TO CREATE/EDIT/DELETE ROUTES GO TO /api/router/router.go
import (
	"AccessiScan-Website/middleware"
	"AccessiScan-Website/router"
	"net/http"
)

func NewServer() *http.Server {
    router := router.Router()
    middlewareStack := middleware.Stack()

    server := http.Server {
        Addr: ":8080", // run on port 8080 
        Handler: middlewareStack(router),
    }

    return &server
}
