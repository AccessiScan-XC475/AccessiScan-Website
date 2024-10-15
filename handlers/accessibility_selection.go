package handlers

import (
	"AccessiScan-Website/db"
	"encoding/json"
	"net/http"
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
	selectionName := strings.ToLower(r.URL.Query().Get("name"))

	// check if valid selection
	if selectionName == "" || !slices.Contains(db.AccessibilitySelections, selectionName) {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid selection"))
		return
	}

	// uppdate count for this selection
	err := db.IncrementAccessibilitySelection(selectionName)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("success"))
	return
}
