package handlers

import (
	"AccessiScan-Website/db/users_collection"
	"net/http"
)

func GetPicture(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var user users_collection.AccessiScanUser
	user, ok := ctx.Value("user").(users_collection.AccessiScanUser)
	if !ok {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(user.GitHubProfile.AvatarUrl))
}
