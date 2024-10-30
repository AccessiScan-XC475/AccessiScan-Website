package community_post_handlers

import (
	"AccessiScan-Website/db/community_post_collection"
	"AccessiScan-Website/db/users_collection"
	"encoding/json"
	"log"
	"net/http"
	"slices"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CommunityPostFull struct {
	Id        primitive.ObjectID   `bson:"_id,omitempty" json:"id"`
	Author    string               `bson:"author" json:"author"`
	Title     string               `bson:"title" json:"title"`
	Content   string               `bson:"content" json:"content"`
	Upvotes   int                  `bson:"upvotes" json:"upvotes"`
	Downvotes int                  `bson:"downvotes" json:"downvotes"`
	UserVote  *bool                `json:"userVote"`
	Replies   []CommunityPostReply `bson:"replies" json:"replies"`
}

type CommunityPostReply struct {
	ParentId  primitive.ObjectID `bson:"parentId" json:"parentId"`
	Id        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Author    string             `bson:"author" json:"author"`
	Content   string             `bson:"content" json:"content"`
	Upvotes   int                `bson:"upvotes" json:"upvotes"`
	Downvotes int                `bson:"downvotes" json:"downvotes"`
	UserVote  *bool              `json:"userVote"`
}

// returns a simplified version of all community posts
// or the full version of a single community post if an id is provided
func GetCommunityPost(w http.ResponseWriter, r *http.Request) {
	idString := r.URL.Query().Get("id")

	if idString == "" {
		// retrieve a preview of all posts
		allCommunityPosts, err := community_post_collection.AllCommunityPosts()
		if err != nil {
			log.Println(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("something went wrong, please try again."))
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(allCommunityPosts)
		return
	} else {
		ctx := r.Context()
		user, userOk := ctx.Value("user").(users_collection.AccessiScanUser)

		// retrieve a particular post
		// convert input post id to correct type
		postId, err := primitive.ObjectIDFromHex(idString)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("invalid post id"))
			return
		}

		// get the specific post from database
		communityPostDB, err := community_post_collection.FindPostById(postId)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("could not find post with this id"))
			return
		}

		// convert arrays to ints and indicate whether this user as liked the post//
		replies := []CommunityPostReply{}
		for i, replyDB := range communityPostDB.Replies {
			log.Println("reply id", replyDB.Id)
			replies = append(replies, CommunityPostReply{
				ParentId:  replyDB.ParentId,
				Id:        replyDB.Id,
				Author:    replyDB.Author,
				Content:   replyDB.Content,
				Upvotes:   len(replyDB.UpvoteUsers),
				Downvotes: len(replyDB.DownvoteUsers),
			})
			// indicate whether the user has liked this reply
			var vote bool
			if userOk {
				if slices.Contains(replyDB.UpvoteUsers, user.Id) {
					vote = true
					replies[i].UserVote = &vote
				} else if slices.Contains(replyDB.DownvoteUsers, user.Id) {
					vote = false
					replies[i].UserVote = &vote
				}
			}
		}

		communityPost := CommunityPostFull{
			Id:        communityPostDB.Id,
			Author:    communityPostDB.Author,
			Title:     communityPostDB.Title,
			Content:   communityPostDB.Content,
			Upvotes:   len(communityPostDB.UpvoteUsers),
			Downvotes: len(communityPostDB.DownvoteUsers),
			Replies:   replies,
		}
		// indicate whether the user has liked this post
		if userOk {
			if slices.Contains(communityPostDB.UpvoteUsers, user.Id) {
				vote := true
				communityPost.UserVote = &vote
			} else if slices.Contains(communityPostDB.DownvoteUsers, user.Id) {
				vote := false
				communityPost.UserVote = &vote
			}
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(communityPost)
		return
	}
}
