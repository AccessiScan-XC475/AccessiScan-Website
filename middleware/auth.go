package middleware

import (
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

		// check if user data
		ctx := r.Context()
		user := ctx.Value("user")
		if user == nil {
			// perhaps change to redirect
			log.Println("unauthorized")
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte(http.StatusText(http.StatusUnauthorized)))
			return
		}

		next.ServeHTTP(w, r)
	})
}
