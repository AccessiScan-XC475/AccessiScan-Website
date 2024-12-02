package handlers

import (
	"AccessiScan-Website/db"
	"AccessiScan-Website/db/users_collection"
	"log"
	"net/http"
	"os"
	"slices"
	"strconv"
)

func AppendScore(w http.ResponseWriter, r *http.Request) {
	log.Println("append score")
	// check that this request is coming from scanner
	accessiscanSecret := r.URL.Query().Get("accessiscanSecret")
	if accessiscanSecret == "" {
		log.Println("no accessiscan secret")
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("no secret"))
		return
	}
	if accessiscanSecret != os.Getenv("ACCESSISCAN_SECRET") {
		log.Println("invalid accessiscan secret")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid secret"))
		return
	}

	// get score to append to history
	scoreString := r.URL.Query().Get("score")
	if scoreString == "" {
		log.Println("no score")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("no score provided"))
		return
	}
	score, err := strconv.Atoi(scoreString)
	if err != nil {
		log.Println("score is not a number")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid score"))
		return
	}

	href := r.URL.Query().Get("href")
	if href == "" {
		log.Println("no href")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("no href provided"))
		return
	}

	selectionName := r.URL.Query().Get("selection")
	if selectionName == "" || !slices.Contains(db.ALL_ACCESSIBILITY_TYPES, db.ACCESSIBILITY_TYPE(selectionName)) {
		log.Println("missing or invalid selection")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("missing or invalid selection"))
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
	success := users_collection.AppendScore(secret, score, href, db.ACCESSIBILITY_TYPE(selectionName))
	if !success {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid secret"))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("success"))
}
