package community_post_collection

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const COMMUNITY_POST_COLLECTION = "CommunityPostCollection"

type CommunityPostDB struct {
	Id            primitive.ObjectID   `bson:"_id,omitempty" json:"id"`
	Author        string               `bson:"author" json:"author"`
	Title         string               `bson:"title" json:"title"`
	Content       string               `bson:"content" json:"content"`
	UpvoteUsers   []primitive.ObjectID `bson:"upvoteUsers" json:"upvoteUsers"`
	DownvoteUsers []primitive.ObjectID `bson:"downvoteUsers" json:"downvoteUsers"`
	Tag           string               `bson:"tag,omitempty" json:"tag,omitempty"`
}

type CommunityPostNumReplies struct {
	Id         primitive.ObjectID `json:"id,omitempty"`
	Author     string             `json:"author"`
	Title      string             `json:"title"`
	Content    string             `json:"content"`
	Upvotes    int                `json:"upvotes"`
	Downvotes  int                `json:"downvotes"`
	NumReplies int                `json:"numReplies"`
	Tag        string             `json:"tag,omitempty"`
}

type CommunityPostReplyDB struct {
	ParentId      primitive.ObjectID   `bson:"parentId" json:"parentId"`
	Id            primitive.ObjectID   `bson:"_id,omitempty" json:"id"`
	Author        string               `bson:"author" json:"author"`
	Content       string               `bson:"content" json:"content"`
	UpvoteUsers   []primitive.ObjectID `bson:"upvoteUsers" json:"upvoteUsers"`
	DownvoteUsers []primitive.ObjectID `bson:"downvoteUsers" json:"downvoteUsers"`
}
