package handlers

import (
	"AccessiScan-Website/cookies"
	"AccessiScan-Website/db/users_collection"
	"AccessiScan-Website/domain"
	gh "AccessiScan-Website/github"
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

	user := users_collection.AccessiScanUser{
		GitHubProfile:     userGithubProfile,
		GitHubAccessToken: token,
	}

	sessionId, err := users_collection.GetSessionId(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	cookies.SetSessionId(w, sessionId)

	http.Redirect(w, r, domain.DOMAIN+"/profile", http.StatusTemporaryRedirect)
}
