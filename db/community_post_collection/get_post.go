package community_post_collection

import (
	"AccessiScan-Website/db"
	"context"
	"log"
	"slices"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// returns a preview of all parent community posts
func AllCommunityPosts() ([]CommunityPostNumReplies, error) {
	cursor, err := db.GetCollection(COMMUNITY_POST_COLLECTION).Find(context.Background(), bson.M{})
	if err != nil {
		return []CommunityPostNumReplies{}, err
	}

	// iterate over all parent posts from database
	var communityPostList []CommunityPostNumReplies
	for cursor.Next(context.Background()) {
		log.Println("decoding a post")
		var curCommunityPost CommunityPostDB
		log.Println("decoding all")
		if err := cursor.Decode(&curCommunityPost); err != nil {
			log.Println("error decoding")
			return []CommunityPostNumReplies{}, err
		}
		communityPostList = append(communityPostList, CommunityPostNumReplies{
			Id:         curCommunityPost.Id,
			Author:     curCommunityPost.Author,
			Title:      curCommunityPost.Title,
			Content:    curCommunityPost.Content,
			Upvotes:    len(curCommunityPost.UpvoteUsers),
			Downvotes:  len(curCommunityPost.DownvoteUsers),
			NumReplies: len(curCommunityPost.Replies),
		})
	}

	slices.Reverse(communityPostList)

	return communityPostList, nil
}

// returns the full data for a particular post
func FindPostById(id primitive.ObjectID) (CommunityPostDB, error) {
	collection := db.GetCollection(COMMUNITY_POST_COLLECTION)

	res := collection.FindOne(context.Background(), bson.M{"_id": id})

	var communityPostDB CommunityPostDB
	err := res.Decode(&communityPostDB)
	if err != nil {
		return CommunityPostDB{}, err
	}

	slices.Reverse(communityPostDB.Replies)

	return communityPostDB, nil
}
