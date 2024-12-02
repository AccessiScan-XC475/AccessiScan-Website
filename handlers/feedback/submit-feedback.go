package feedback_handlers

import (
	"AccessiScan-Website/db/feedback_collection"
	"encoding/json"
	"net/http"
)

func SubmitFeedback(w http.ResponseWriter, r *http.Request) {
	var feedback feedback_collection.FeedbackSubmission
	err := json.NewDecoder(r.Body).Decode(&feedback)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("bad request"))
		return
	}

}
