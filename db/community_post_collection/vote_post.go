package community_post_collection

import (
	"AccessiScan-Website/db"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpvotePost(postId primitive.ObjectID, userId primitive.ObjectID) error {
	collection := db.GetCollection(COMMUNITY_POST_COLLECTION)

	res, err := collection.UpdateByID(context.Background(), postId, bson.M{
		// add to upvotes
		"$push": bson.M{"upvoteUsers": userId},
		// remove from dowvotes
		"$pull": bson.M{"downvoteUsers": userId},
	})
	if err != nil {
		return err
	}

	if res.ModifiedCount != 1 {
		return fmt.Errorf("did not update document")
	}

	return nil
}

func DownvotePost(postId primitive.ObjectID, userId primitive.ObjectID) error {
	collection := db.GetCollection(COMMUNITY_POST_COLLECTION)

	res, err := collection.UpdateByID(context.Background(), postId, bson.M{
		// add to downvotes
		"$push": bson.M{"downvoteUsers": userId},
		// remove from upvotes
		"$pull": bson.M{"upvoteUsers": userId},
	})
	if err != nil {
		return err
	}

	if res.ModifiedCount != 1 {
		return fmt.Errorf("did not update document")
	}

	return nil
}

func RemovePostVote(postId primitive.ObjectID, userId primitive.ObjectID) error {
	collection := db.GetCollection(COMMUNITY_POST_COLLECTION)

	res, err := collection.UpdateByID(context.Background(), postId, bson.M{
		// remove from upvotes and dowvotes
		"$pull": bson.M{
			"upvoteUsers":   userId,
			"downvoteUsers": userId,
		},
	})
	if err != nil {
		return err
	}

	if res.ModifiedCount != 1 {
		return fmt.Errorf("did not update document")
	}

	return nil
}
