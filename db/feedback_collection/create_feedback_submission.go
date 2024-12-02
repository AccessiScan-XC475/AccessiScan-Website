package feedback_collection

import (
	"AccessiScan-Website/db"
	"context"
	"fmt"
)

func CreateFeedbackSubmission(name, message, email string) error {
	if name == "" || message == "" {
		return fmt.Errorf("name or message missing")
	}

	newFeedbackSubmission := FeedbackSubmission{
		Name:    name,
		Message: message,
		Email:   email,
	}

	_, err := db.GetCollection(FEEDBACK_SUBMISSION_COLLECTION).InsertOne(
		context.Background(),
		newFeedbackSubmission,
	)
	if err != nil {
		return err
	}

	return nil
}
