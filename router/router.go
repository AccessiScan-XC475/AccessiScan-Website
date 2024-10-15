package router

import (
	"AccessiScan-Website/handlers"
	"net/http"
)

// declare api routes
func Router() *http.ServeMux {
	router := http.NewServeMux()

	router.HandleFunc("GET /api/health", handlers.GetHealth)

	router.HandleFunc("GET /api/accessibility-selection", handlers.GetAccessibilitySelections)

	router.HandleFunc("POST /api/accessibility-selection", handlers.PostAccessibilitySelection)

	router.HandleFunc(("GET /api/community-post"), handlers.GetCommunityPost)

	router.HandleFunc(("POST /api/community-post"), handlers.PostCommunityPost)

	return router
}
