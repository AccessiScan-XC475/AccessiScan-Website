package feedback_handlers

import (
	"AccessiScan-Website/db/feedback_collection"
	"AccessiScan-Website/db/users_collection"
	"encoding/json"
	"log"
	"net/http"
	"slices"
)

var admins []string = []string{
	"KingTingTheGreat",
	"ethanrkey",
	"amelia-liston",
	"josiekim",
	"Hangi32",
}

func GetFeedbackSubmissions(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var user users_collection.AccessiScanUser
	user, ok := ctx.Value("user").(users_collection.AccessiScanUser)
	if !ok {
		log.Println("NO USER")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	if !slices.Contains(admins, user.Username) {
		log.Println("UNAUTHORIZAED")
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("unauthorizaed. please sign in to admin account"))
		return
	}
	log.Println("ALL GOOD")

	allFeedbackSubmissions, err := feedback_collection.AllFeedbackSubmissions()
	if err != nil {
		log.Println(err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong. please try again."))
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(allFeedbackSubmissions)
}
