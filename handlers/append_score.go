package handlers

import (
	"AccessiScan-Website/db"
	"net/http"
	"slices"
	"strconv"
)

var admin []string = []string{
	"jting@bu.edu",
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
	var user db.AccessiScanUser
	user, ok := ctx.Value("user").(db.AccessiScanUser)
	if !ok || !slices.Contains(admin, user.GitHubProfile.Email) {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	success := db.AppendScore(user.Id, score)
	if !success {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("success"))
}
