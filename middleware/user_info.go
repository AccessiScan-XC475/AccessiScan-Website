package middleware

import (
	"AccessiScan-Website/cookies"
	"AccessiScan-Website/db/users_collection"
	"context"
	"log"
	"net/http"
)

func UserInfo(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// get user from db
		sessionId := cookies.GetSessionId(r)
		if sessionId == "" {
			next.ServeHTTP(w, r)
			return
		}

		user, err := users_collection.GetUserBySessionId(sessionId)
		if err != nil {
			if err.Error() == "redirect" {
				log.Println("expired sessionId")
			}
			next.ServeHTTP(w, r)
			return
		}

		log.Println("got user")
		ctx := context.WithValue(r.Context(), "user", user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
