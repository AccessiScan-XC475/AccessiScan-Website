package community_post_collection

import (
	"AccessiScan-Website/db"
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// function needs the author/user attempting to create a new post
// as well as the title and content of that post
// returns the id of the newly created post or an error
func CreateNewPost(author, title, content string) (primitive.ObjectID, error) {
	if author == "" || title == "" || content == "" {
		return primitive.ObjectID{}, fmt.Errorf("author, title, or content missing")
	}

	newPost := CommunityPostDB{
		Author:        author,
		Title:         title,
		Content:       content,
		UpvoteUsers:   []primitive.ObjectID{},
		DownvoteUsers: []primitive.ObjectID{},
	}

	res, err := db.GetCollection(COMMUNITY_POST_COLLECTION).InsertOne(context.Background(), newPost)
	if err != nil {
		return primitive.ObjectID{}, err
	}

	return res.InsertedID.(primitive.ObjectID), nil
}

// create a new reply to the post associated with the id parentId
func ReplyToPost(parentId primitive.ObjectID, author, content string) (primitive.ObjectID, error) {
	if author == "" || content == "" {
		return primitive.ObjectID{}, fmt.Errorf("author or content missing")
	}

	// confirm parent is a valid post
	_, err := FindPostById(parentId)
	if err != nil {
		log.Println("parent post does not exist")
		return primitive.ObjectID{}, err
	}

	collection := db.GetCollection(COMMUNITY_POST_COLLECTION)

	newReply := CommunityPostReplyDB{
		ParentId:      parentId,
		Author:        author,
		Content:       content,
		UpvoteUsers:   []primitive.ObjectID{},
		DownvoteUsers: []primitive.ObjectID{},
	}

	res, err := collection.InsertOne(context.Background(), newReply)

	if err != nil {
		return primitive.ObjectID{}, err
	}

	return res.InsertedID.(primitive.ObjectID), nil
}
