package github_handlers

import (
	"AccessiScan-Website/db/users_collection"
	gh "AccessiScan-Website/github"
	"fmt"
	"log"
	"net/http"
)

func GitHubExtensionExchange(w http.ResponseWriter, r *http.Request) {
	state := r.URL.Query().Get("state")
	if state == "" {
		log.Println("no state (extension id) present")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("something went wrong, please try again"))
		return
	}

	code := r.URL.Query().Get("code")
	if code == "" {
		log.Println("no code present")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	token, err := gh.ExchangeCodeExt(code)
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

	user := users_collection.AccessiScanUser{
		GitHubProfile:     userGithubProfile,
		GitHubAccessToken: token,
	}
	secret, err := users_collection.GetExtensionSecret(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	http.Redirect(w, r, fmt.Sprintf("https://%s.chromiumapp.org?secret=%s", state, secret), http.StatusTemporaryRedirect)
}
