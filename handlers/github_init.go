package handlers

import (
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

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("github callback"))
}
