package middleware

import (
	"AccessiScan-Website/cookies"
	"AccessiScan-Website/db"
	"context"
	"log"
	"net/http"
	"strings"
)

func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// only certain routes need this middleware
		if !strings.HasPrefix(r.URL.Path, "/api/auth") {
			log.Println("not auth route")
			next.ServeHTTP(w, r)
			return
		}

		log.Println("auth route", r.URL.Path)

		// get user from db
		sessionId := cookies.GetSessionId(r)
		if sessionId == "" {
			log.Println("no session id cookie")
			// change to redirect
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte(http.StatusText(http.StatusUnauthorized)))
			return
		}

		user, err := db.GetUserBySessionId(sessionId)
		if err != nil {
			if err.Error() == "redirect" {
				log.Println("expired sessionId")
				// change to redirect
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte(http.StatusText(http.StatusUnauthorized)))
				return
			}
			log.Println("no user in db")
			// change to redirect
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte(http.StatusText(http.StatusUnauthorized)))
			return
		}

		ctx := context.WithValue(r.Context(), "user", user)

		// call next handlers with new context
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
