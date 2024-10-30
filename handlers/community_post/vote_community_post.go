package community_post_handlers

import (
	"AccessiScan-Website/db/community_post_collection"
	"AccessiScan-Website/db/users_collection"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func PutCommunityPost(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var user users_collection.AccessiScanUser
	user, ok := ctx.Value("user").(users_collection.AccessiScanUser)
	if !ok {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	postIdString := r.URL.Query().Get("id")
	if postIdString == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("no post id"))
		return
	}

	postId, err := primitive.ObjectIDFromHex(postIdString)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid post id"))
		return
	}

	switch vote := r.URL.Query().Get("vote"); vote {
	case "upvote":
		err := community_post_collection.UpvotePost(postId, user.Id)
		if err != nil {
			log.Println(err.Error())
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("post not found"))
			return
		}
	case "downvote":
		err := community_post_collection.DownvotePost(postId, user.Id)
		if err != nil {
			log.Println(err.Error())
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("post not found"))
			return
		}
	case "remove":
		err := community_post_collection.RemovePostVote(postId, user.Id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("post not found"))
			return
		}
	default:
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("missing or invalid operation"))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("SUCCESS!"))
}
