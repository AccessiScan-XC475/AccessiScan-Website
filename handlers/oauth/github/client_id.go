package github_handlers

import (
	"net/http"
	"os"
)

func GitHubExtensionClientId(w http.ResponseWriter, r *http.Request) {
	client_id_ext := os.Getenv("GITHUB_CLIENT_ID_EXT")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(client_id_ext))
}
