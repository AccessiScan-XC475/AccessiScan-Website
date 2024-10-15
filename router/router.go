package router

import (
	"AccessiScan-Website/handlers"
	"net/http"
)

// declare api routes
func Router() *http.ServeMux {
	router := http.NewServeMux()

	// health endpoint to check if its up
	router.HandleFunc("GET /api/health", handlers.GetHealth)

	// returns array representing accessibility selection statistics
	router.HandleFunc("GET /api/accessibility-selection", handlers.GetAccessibilitySelections)

	// endpoint to add to accessibility selection count
	router.HandleFunc("POST /api/accessibility-selection", handlers.PostAccessibilitySelection)

	// returns a simplified version of all community posts
	// or the full version of a single community post if an id is provided
	router.HandleFunc(("GET /api/community-post"), handlers.GetCommunityPost)

	// endpoint to create a new community post or reply
	router.HandleFunc(("POST /api/community-post"), handlers.PostCommunityPost)

	return router
}
