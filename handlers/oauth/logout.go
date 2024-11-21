package oauth_handlers

import (
	"AccessiScan-Website/cookies"
	"AccessiScan-Website/db/users_collection"
	"AccessiScan-Website/domain"
	"net/http"
)

func RedirectLogout(w http.ResponseWriter, r *http.Request) {
	sessionId := cookies.GetSessionId(r)
	if sessionId == "" {
		http.Redirect(w, r, domain.DOMAIN, http.StatusSeeOther)
		return
	}

	users_collection.RemoveSessionId(sessionId)

	cookies.RemoveSessionId(w)

	http.Redirect(w, r, domain.DOMAIN, http.StatusSeeOther)
}
