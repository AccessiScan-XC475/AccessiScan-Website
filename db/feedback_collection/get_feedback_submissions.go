package feedback_collection

import (
	"AccessiScan-Website/db"
	"context"

	"go.mongodb.org/mongo-driver/bson"
)

func AllFeedbackSubmissions() ([]FeedbackSubmission, error) {
	cursor, err := db.GetCollection(FEEDBACK_SUBMISSION_COLLECTION).Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}

	var feedbackList []FeedbackSubmission
	for cursor.Next(context.Background()) {
		var curFeedback FeedbackSubmission
		if err := cursor.Decode(&curFeedback); err != nil {
			continue
		}
		feedbackList = append(feedbackList, curFeedback)
	}

	return feedbackList, err
}
