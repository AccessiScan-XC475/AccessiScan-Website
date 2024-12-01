package handlers

import (
	"AccessiScan-Website/db"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"slices"
	"strings"
)

// returns array representing accessibility selection statistics
func GetAccessibilitySelections(w http.ResponseWriter, r *http.Request) {
	// retrieve data on all selections
	allSelections, err := db.AllAccessibilitySelection()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(allSelections)
	return
}

// endpoint to add to accessibility selection count
func PostAccessibilitySelection(w http.ResponseWriter, r *http.Request) {
	selectionName := strings.ToLower(r.URL.Query().Get("selection"))

	// check if valid selection
	if selectionName == "" || !slices.Contains(db.ALL_ACCESSIBILITY_TYPES, db.ACCESSIBILITY_TYPE(selectionName)) {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid selection"))
		return
	}

	// check that this request is coming from scanner
	accessiscanSecret := r.URL.Query().Get("accessiscanSecret")
	if accessiscanSecret == "" {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("no secret"))
		return
	}
	if accessiscanSecret != os.Getenv("ACCESSISCAN_SECRET") {
		log.Println("invalid secret")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid secret"))
		return
	}

	// uppdate count for this selection
	err := db.IncrementAccessibilitySelection(db.ACCESSIBILITY_TYPE(selectionName))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("success"))
	return
}
