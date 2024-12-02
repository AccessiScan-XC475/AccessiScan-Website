package feedback_collection

const FEEDBACK_SUBMISSION_COLLECTION = "FeedbackSubmissionCollection"

type FeedbackSubmission struct {
	Name    string `bson:"name" json:"name"`
	Message string `bson:"message" json:"message"`
	Email   string `bson:"email,omitempty" json:"email,omitempty"`
}
