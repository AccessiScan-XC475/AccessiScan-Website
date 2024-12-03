package router

import (
	"AccessiScan-Website/handlers"
	community_post_handlers "AccessiScan-Website/handlers/community_post"
	feedback_handlers "AccessiScan-Website/handlers/feedback"
	oauth_handlers "AccessiScan-Website/handlers/oauth"
	github_handlers "AccessiScan-Website/handlers/oauth/github"
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
	router.HandleFunc(("GET /api/login/github"), github_handlers.RedirectGHLogin)
	router.HandleFunc(("/api/callback/github"), github_handlers.GitHubCallback)
	router.HandleFunc(("/api/extension-exchange/github"), github_handlers.GitHubExtensionExchange)

	router.HandleFunc(("GET /api/logout"), oauth_handlers.RedirectLogout)

	// get own profile
	router.HandleFunc(("GET /api/auth/profile"), handlers.GetProfileSelf)
	// get own chrome extension secret
	// router.HandleFunc(("GET /api/auth/chromeExtensionSecret"), handlers.GetSecret)
	// refresh own chrome extension secret
	// router.HandleFunc(("POST /api/auth/chromeExtensionSecret"), handlers.RefreshSecret)
	// get a profile of particular id but with less information
	router.HandleFunc(("GET /api/profile"), handlers.GetProfileOther)

	// get profile pic using chrome extension secret
	router.HandleFunc(("GET /api/picture/github"), handlers.GetPicture)
  
	// submit and retrieve feedback form entries
	router.HandleFunc(("POST /api/feedback"), feedback_handlers.SubmitFeedback)
	router.HandleFunc(("GET /api/feedback-submissions"), feedback_handlers.GetFeedbackSubmissions)

	// endpoint for adding to score history
	router.HandleFunc(("POST /api/append"), handlers.AppendScore)

	return router
}
