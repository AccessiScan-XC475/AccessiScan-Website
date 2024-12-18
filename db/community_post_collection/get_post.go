package community_post_collection

import (
	"AccessiScan-Website/db"
	"context"
	"log"
	"slices"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AllParentCommunityPosts(tagFilter string) ([]CommunityPostNumReplies, error) {
	filter := bson.M{"parentId": nil}
	if tagFilter != "" {
		filter["tag"] = tagFilter
	}

	cursor, err := db.GetCollection(COMMUNITY_POST_COLLECTION).Find(context.Background(), filter)
	if err != nil {
		return []CommunityPostNumReplies{}, err
	}

	// iterate over all parent posts from database
	var communityPostList []CommunityPostNumReplies
	for cursor.Next(context.Background()) {
		var curCommunityPost CommunityPostDB
		if err := cursor.Decode(&curCommunityPost); err != nil {
			log.Println("error decoding")
			return []CommunityPostNumReplies{}, err
		}

		repliesDB, err := GetRepliesById(curCommunityPost.Id)
		if err != nil {
			// if something goes wrong, skip this post
			continue
		}

		communityPostList = append(communityPostList, CommunityPostNumReplies{
			Id:         curCommunityPost.Id,
			Author:     curCommunityPost.Author,
			Title:      curCommunityPost.Title,
			Content:    curCommunityPost.Content,
			Upvotes:    len(curCommunityPost.UpvoteUsers),
			Downvotes:  len(curCommunityPost.DownvoteUsers),
			NumReplies: len(repliesDB),
			Tag:        curCommunityPost.Tag,
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

	return communityPostDB, nil
}

func GetRepliesById(id primitive.ObjectID) ([]CommunityPostReplyDB, error) {
	collection := db.GetCollection(COMMUNITY_POST_COLLECTION)

	cursor, err := collection.Find(context.Background(), bson.M{"parentId": id})
	if err != nil {
		return nil, err
	}

	var repliesList []CommunityPostReplyDB
	for cursor.Next(context.Background()) {
		var curReply CommunityPostReplyDB
		if err := cursor.Decode(&curReply); err != nil {
			return nil, err
		}
		repliesList = append(repliesList, curReply)
	}

	slices.Reverse(repliesList)
	return repliesList, nil
}
