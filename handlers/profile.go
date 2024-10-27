package handlers

import (
	"AccessiScan-Website/db"
	"encoding/json"
	"net/http"
)

type AccessiScanProfile struct {
	Id           string `json:"id"`
	Username     string `json:"name"`
	Name         string `json:"username"`
	ScoreHistory []int  `json:"scoreHistory"`
}

func GetProfile(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var user db.AccessiScanUser
	user, ok := ctx.Value("user").(db.AccessiScanUser)
	if !ok {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	profile := AccessiScanProfile{
		Id:           user.Id.Hex(),
		Username:     user.Username,
		Name:         user.Name,
		ScoreHistory: user.ScoreHistory,
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(profile)
	return
}
