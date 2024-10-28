package db

import (
	"context"
	"fmt"
	"log"
	"slices"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const COMMUNITY_POST_COLLECTION = "CommunityPostCollection"

type CommunityPostDB struct {
	Id            primitive.ObjectID     `bson:"_id,omitempty" json:"id"`
	Author        string                 `bson:"author" json:"author"`
	Title         string                 `bson:"title" json:"title"`
	Content       string                 `bson:"content" json:"content"`
	UpvoteUsers   []primitive.ObjectID   `bson:"upvoteUsers" json:"upvoteUsers"`
	DownvoteUsers []primitive.ObjectID   `bson:"downvoteUsers" json:"downvoteUsers"`
	Replies       []CommunityPostReplyDB `bson:"replies" json:"replies"`
}

type CommunityPostNumReplies struct {
	Id         primitive.ObjectID `json:"id,omitempty"`
	Author     string             `json:"author"`
	Title      string             `json:"title"`
	Content    string             `json:"content"`
	Upvotes    int                `json:"upvotes"`
	Downvotes  int                `json:"downvotes"`
	NumReplies int                `json:"numReplies"`
}

type CommunityPostReplyDB struct {
	ParentId      primitive.ObjectID   `bson:"parentId" json:"parentId"`
	Id            primitive.ObjectID   `bson:"_id,omitempty" json:"id"`
	Author        string               `bson:"author" json:"author"`
	Content       string               `bson:"content" json:"content"`
	UpvoteUsers   []primitive.ObjectID `bson:"upvoteUsers" json:"upvoteUsers"`
	DownvoteUsers []primitive.ObjectID `bson:"downvoteUsers" json:"downvoteUsers"`
}

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
		Replies:       []CommunityPostReplyDB{},
	}

	res, err := getCollection(COMMUNITY_POST_COLLECTION).InsertOne(context.Background(), newPost)
	if err != nil {
		return primitive.ObjectID{}, err
	}

	return res.InsertedID.(primitive.ObjectID), nil
}

// create a new reply to the post associated with the id parentId
func ReplyToPost(parentId primitive.ObjectID, author, content string) error {
	if author == "" || content == "" {
		return fmt.Errorf("autho content missing")
	}
	collection := getCollection(COMMUNITY_POST_COLLECTION)

	newReply := CommunityPostReplyDB{
		ParentId:      parentId,
		Author:        author,
		Content:       content,
		UpvoteUsers:   []primitive.ObjectID{},
		DownvoteUsers: []primitive.ObjectID{},
	}

	res, err := collection.UpdateByID(context.Background(), parentId, bson.M{
		"$push": map[string]interface{}{"replies": newReply},
	})
	if err != nil {
		return err
	}
	if res.ModifiedCount != 1 {
		return fmt.Errorf("invalid post id")
	}

	return nil
}

// returns a preview of all parent community posts
func AllCommunityPosts() ([]CommunityPostNumReplies, error) {
	cursor, err := getCollection(COMMUNITY_POST_COLLECTION).Find(context.Background(), bson.M{})
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
	collection := getCollection(COMMUNITY_POST_COLLECTION)

	res := collection.FindOne(context.Background(), bson.M{"_id": id})

	var communityPostDB CommunityPostDB
	err := res.Decode(&communityPostDB)
	if err != nil {
		return CommunityPostDB{}, err
	}

	slices.Reverse(communityPostDB.Replies)

	return communityPostDB, nil
}
