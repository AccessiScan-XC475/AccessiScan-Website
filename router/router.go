package router

import (
	"AccessiScan-Website/db"
	"encoding/json"
	"net/http"
	"slices"
	"strings"
)

// declare api routes
func Router() *http.ServeMux {
	router := http.NewServeMux()

	// health endpoint to check if its up
	router.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// returns array representing accessibility selection statistics
	router.HandleFunc("GET /api/accessibility-selection", func(w http.ResponseWriter, r *http.Request) {
		allSelections, err := db.AllAccessibilitySelection()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("something went wrong, please try again."))
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(allSelections)
		return
	})

	// endpoint to add to accessibility selection count
	router.HandleFunc("POST /api/accessibility-selection", func(w http.ResponseWriter, r *http.Request) {
		selectionName := strings.ToLower(r.URL.Query().Get("name"))
		if selectionName == "" || !slices.Contains(db.AccessibilitySelections, selectionName) {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("invalid selection"))
			return
		}

		err := db.InsertAccessibilitySeletion(selectionName)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("something went wrong, please try again."))
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("success"))
		return
	})

	return router
}
