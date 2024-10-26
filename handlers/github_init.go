package handlers

import (
	"AccessiScan-Website/db"
	gh "AccessiScan-Website/github"
	"AccessiScan-Website/middleware"
	"log"
	"net/http"
)

func RedirectGHLogin(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, gh.LoginUrl(), http.StatusSeeOther)
}

func GitHubCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	if code == "" {
		log.Println("no code present")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	token, err := gh.ExchangeCode(code)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	log.Println(token)

	userGithubProfile, err := gh.GetUserInfo(token)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	log.Println(userGithubProfile)

	user := db.AccessiScanUser{
		GitHubProfile:     userGithubProfile,
		GitHubAccessToken: token,
	}

	sessionId, err := db.GetSessionId(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	middleware.SetSessionId(w, sessionId)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(sessionId))
}
