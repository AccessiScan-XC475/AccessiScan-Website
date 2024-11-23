package handlers

import (
	"AccessiScan-Website/db/users_collection"
	"encoding/json"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type GitHubUserInfoPub struct {
	AvatarUrl string `json:"avatarUrl"`
	Name      string `json:"name"`
	Email     string `json:"email"`
}

type AccessiScanProfileSelf struct {
	Id            string            `json:"id"`
	Username      string            `json:"username"`
	Name          string            `json:"name"`
	ScoreHistory  []int             `json:"scoreHistory"`
	GitHubProfile GitHubUserInfoPub `json:"githubProfile"`
}

func GetProfileSelf(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var user users_collection.AccessiScanUser
	user, ok := ctx.Value("user").(users_collection.AccessiScanUser)
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
		GitHubProfile: GitHubUserInfoPub{
			AvatarUrl: user.GitHubProfile.AvatarUrl,
			Name:      user.GitHubProfile.Name,
			Email:     user.GitHubProfile.Email,
		},
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
	id := r.URL.Query().Get("id")
	userId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Println("invalid user id")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid user id"))
		return
	}

	// get user profile from database
	user, err := users_collection.GetUserById(userId)
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
