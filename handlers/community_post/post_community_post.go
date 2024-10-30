package community_post_handlers

import (
	"AccessiScan-Website/db/community_post_collection"
	"encoding/json"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// endpoint to create a new community post or reply
func PostCommunityPost(w http.ResponseWriter, r *http.Request) {
	parentIdString := r.URL.Query().Get("parentId")

	if parentIdString == "" {
		// create a new post
		// parse the new post data
		var postData community_post_collection.CommunityPostDB
		err := json.NewDecoder(r.Body).Decode(&postData)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("incomplete post information"))
			return
		}

		// create a new post
		id, err := community_post_collection.CreateNewPost(postData.Author, postData.Title, postData.Content)
		if err != nil {
			log.Println(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("something went wrong, please try again."))
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte(id.Hex()))
		return
	} else {
		// create a new reply
		// convert input parentId to correct type
		parentId, err := primitive.ObjectIDFromHex(parentIdString)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("invalid parent id"))
			return
		}

		// parse reply data
		var replyData CommunityPostReply
		err = json.NewDecoder(r.Body).Decode(&replyData)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("incomplete reply information"))
			return
		}

		// reply to the parent post
		replyId, err := community_post_collection.ReplyToPost(parentId, replyData.Author, replyData.Content)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("something went wrong, please try again."))
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte(replyId.Hex()))
		return
	}
}
