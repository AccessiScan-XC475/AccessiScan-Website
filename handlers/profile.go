package handlers

import (
	"AccessiScan-Website/db"
	"encoding/json"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AccessiScanProfileSelf struct {
	Id           string `json:"id"`
	Username     string `json:"name"`
	Name         string `json:"username"`
	ScoreHistory []int  `json:"scoreHistory"`
}

func GetProfileSelf(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var user db.AccessiScanUser
	user, ok := ctx.Value("user").(db.AccessiScanUser)
	if !ok {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	// only send the 10 most recent scores
	var history []int
	if len(user.ScoreHistory) <= 10 {
		history = user.ScoreHistory
	} else {
		history = user.ScoreHistory[len(user.ScoreHistory)-10:]
	}

	profile := AccessiScanProfileSelf{
		Id:           user.Id.Hex(),
		Username:     user.Username,
		Name:         user.Name,
		ScoreHistory: history,
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(profile)
	return
}

type AccessiScanProfileOther struct {
	Id       string `json:"id"`
	Username string `json:"name"`
	Name     string `json:"username"`
}

func GetProfileOther(w http.ResponseWriter, r *http.Request) {
	log.Println("get profile other")
	id := r.URL.Query().Get("id")
	userId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Println("invalid user id")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid user id"))
		return
	}

	// get user profile from database
	user, err := db.GetUserById(userId)
	if err != nil {
		log.Println("no user found")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("could not find user with this id"))
		return
	}

	profile := AccessiScanProfileOther{
		Id:       id,
		Username: user.Username,
		Name:     user.Name,
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(profile)
	return
}
