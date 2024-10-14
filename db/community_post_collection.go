package db

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const COMMUNITY_POST_COLLECTION = "CommunityPostCollection"

type CommunityPost struct {
	Id        primitive.ObjectID   `bson:"_id,omitempty" json:"id,omitempty"`
	Author    string               `bson:"author" json:"author"`
	Title     string               `bson:"title" json:"title"`
	Content   string               `bson:"content" json:"content"`
	Upvotes   int                  `bson:"upvotes" json:"upvotes,omitempty"`
	Downvotes int                  `bson:"downvotes" json:"downvotes,omitempty"`
	Replies   []CommunityPostReply `bson:"replies" json:"replies,omitempty"`
}

type CommunityPostNumReplies struct {
	Id         primitive.ObjectID `json:"id,omitempty"`
	Author     string             `json:"author"`
	Title      string             `json:"title"`
	Content    string             `json:"content"`
	Upvotes    int                `json:"upvotes,omitempty"`
	Downvotes  int                `json:"downvotes,omitempty"`
	NumReplies int                `json:"numReplies,omitempty"`
}

type CommunityPostReply struct {
	ParentId  primitive.ObjectID `bson:"parentId" json:"parentId,omitempty"`
	Id        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Author    string             `bson:"author" json:"author"`
	Content   string             `bson:"content" json:"content"`
	Upvotes   int                `bson:"upvotes" json:"upvotes,omitempty"`
	Downvotes int                `bson:"downvotes" json:"downvotes,omitempty"`
}

// function needs the author/user attempting to create a new post
// as well as the title and content of that post
// returns the id of the newly created post or an error
func CreateNewPost(author, title, content string) (primitive.ObjectID, error) {
	newPost := CommunityPost{
		Author:    author,
		Title:     title,
		Content:   content,
		Upvotes:   0,
		Downvotes: 0,
		Replies:   []CommunityPostReply{},
	}

	res, err := getCollection(COMMUNITY_POST_COLLECTION).InsertOne(context.Background(), newPost)
	if err != nil {
		return primitive.ObjectID{}, err
	}

	return res.InsertedID.(primitive.ObjectID), nil
}

func ReplyToPost(parentId primitive.ObjectID, author, content string) error {
	collection := getCollection(COMMUNITY_POST_COLLECTION)

	newReply := CommunityPostReply{
		ParentId:  parentId,
		Author:    author,
		Content:   content,
		Upvotes:   0,
		Downvotes: 0,
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

func AllCommunityPosts() ([]CommunityPostNumReplies, error) {
	cursor, err := getCollection(COMMUNITY_POST_COLLECTION).Find(context.Background(), bson.M{})
	if err != nil {
		return []CommunityPostNumReplies{}, err
	}

	var communityPostList []CommunityPostNumReplies
	for cursor.Next(context.Background()) {
		var curCommunityPost CommunityPost
		if err := cursor.Decode(&curCommunityPost); err != nil {
			return []CommunityPostNumReplies{}, err
		}
		communityPostList = append(communityPostList, CommunityPostNumReplies{
			Id:         curCommunityPost.Id,
			Author:     curCommunityPost.Author,
			Title:      curCommunityPost.Title,
			Content:    curCommunityPost.Content,
			Upvotes:    curCommunityPost.Upvotes,
			Downvotes:  curCommunityPost.Downvotes,
			NumReplies: len(curCommunityPost.Replies),
		})
	}

	return communityPostList, nil
}
