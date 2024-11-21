package handlers

import (
	"AccessiScan-Website/db/users_collection"
	"log"
	"net/http"
)

func GetSecret(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var user users_collection.AccessiScanUser
	user, ok := ctx.Value("user").(users_collection.AccessiScanUser)
	if !ok {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(user.ChromeExtensionSecret))
}

func RefreshSecret(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var user users_collection.AccessiScanUser
	user, ok := ctx.Value("user").(users_collection.AccessiScanUser)
	if !ok {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	secret, err := users_collection.NewChromeExtensionSecret(user.Id)
	if err != nil {
		log.Println("could not refresh")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(secret))
}
