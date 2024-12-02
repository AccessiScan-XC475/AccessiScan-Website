package feedback_handlers

import (
	"AccessiScan-Website/db/feedback_collection"
	"encoding/json"
	"log"
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

	err = feedback_collection.CreateFeedbackSubmission(feedback.Name, feedback.Message, feedback.Email)
	if err != nil {
		log.Println(err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong. please try again"))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("success"))
}
