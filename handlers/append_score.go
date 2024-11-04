package handlers

import (
	"AccessiScan-Website/db/users_collection"
	"net/http"
	"slices"
	"strconv"
)

var admin []string = []string{
	"KingTingTheGreat",
	"ethanrkey",
	"amelia-liston",
	"josiekim",
}

func AppendScore(w http.ResponseWriter, r *http.Request) {
	scoreString := r.URL.Query().Get("score")
	if scoreString == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("no score provided"))
		return
	}
	score, err := strconv.Atoi(scoreString)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid score"))
		return
	}

	ctx := r.Context()
	var user users_collection.AccessiScanUser
	user, ok := ctx.Value("user").(users_collection.AccessiScanUser)
	if !ok || !slices.Contains(admin, user.GitHubProfile.Login) {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	success := users_collection.AppendScore(user.Id, score)
	if !success {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("success"))
}
