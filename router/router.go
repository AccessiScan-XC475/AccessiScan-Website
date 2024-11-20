package router

import (
	"AccessiScan-Website/handlers"
	community_post_handlers "AccessiScan-Website/handlers/community_post"
	"net/http"
)

// declare api routes
func Router() *http.ServeMux {
	router := http.NewServeMux()

	router.HandleFunc("GET /api/health", handlers.GetHealth)

	router.HandleFunc("GET /api/accessibility-selection", handlers.GetAccessibilitySelections)
	router.HandleFunc("POST /api/accessibility-selection", handlers.PostAccessibilitySelection)

	router.HandleFunc(("GET /api/community-post"), community_post_handlers.GetCommunityPost)
	router.HandleFunc(("POST /api/community-post"), community_post_handlers.PostCommunityPost)
	router.HandleFunc("PUT /api/community-post", community_post_handlers.PutCommunityPost)

	// perhaps enable OAuth with other providers in the future
	router.HandleFunc(("GET /api/login/github"), handlers.RedirectGHLogin)
	router.HandleFunc(("/api/callback/github"), handlers.GitHubCallback)

	// get own profile
	router.HandleFunc(("GET /api/auth/profile"), handlers.GetProfileSelf)
	// get own chrome extension secret
	router.HandleFunc(("GET /api/auth/chromeExtensionSecret"), handlers.GetSecret)
	// refresh own chrome extension secret
	router.HandleFunc(("POST /api/auth/chromeExtensionSecret"), handlers.RefreshSecret)
	// get a profile of particular id but with less information
	router.HandleFunc(("GET /api/profile"), handlers.GetProfileOther)

	// endpoint for manually testing score history
	router.HandleFunc(("POST /api/auth/append"), handlers.AppendScore)

	return router
}
