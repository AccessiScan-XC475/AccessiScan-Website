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

	// perhaps enable OAuth with other providers in the future
	router.HandleFunc(("GET /api/login/github"), handlers.RedirectGHLogin)
	router.HandleFunc(("/api/callback/github"), handlers.GitHubCallback)

	// get own profile
	router.HandleFunc(("GET /api/auth/profile"), handlers.GetProfileSelf)
	// get a profile of particular id but with less information
	router.HandleFunc(("GET /api/profile"), handlers.GetProfileOther)

	return router
}
