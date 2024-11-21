package handlers

import (
	"AccessiScan-Website/db/users_collection"
	"log"
	"net/http"
	"os"
	"strconv"
)

func AppendScore(w http.ResponseWriter, r *http.Request) {
	// check that this request is coming from scanner
	accessiscanSecret := r.URL.Query().Get("accessiscanSecret")
	if accessiscanSecret == "" {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("no secret"))
		return
	}
	if accessiscanSecret != os.Getenv("ACCESSISCAN_SECRET") {
		log.Println("invalid secret")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid secret"))
		return
	}

	// get score to append to history
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

	// get secret
	secret := r.URL.Query().Get("secret")
	if secret == "" {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("no secret"))
		return
	}
	// append to user history by secret
	success := users_collection.AppendScore(secret, score)
	if !success {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid secret"))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("success"))
}
