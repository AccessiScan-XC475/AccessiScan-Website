package handlers

import (
	"AccessiScan-Website/db"
	"encoding/json"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// returns a simplified version of all community posts
// or the full version of a single community post if an id is provided
func GetCommunityPost(w http.ResponseWriter, r *http.Request) {
	idString := r.URL.Query().Get("id")

	if idString == "" {
		// retrieve a preview of all posts
		allCommunityPosts, err := db.AllCommunityPosts()
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
		// retrieve a particular post
		// convert input post id to correct type
		postId, err := primitive.ObjectIDFromHex(idString)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("invalid post id"))
			return
		}

		// get the specific post from database
		communityPost, err := db.FindPostById(postId)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("could not find post with this id"))
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(communityPost)
		return
	}
}

// endpoint to create a new community post or reply
func PostCommunityPost(w http.ResponseWriter, r *http.Request) {
	parentIdString := r.URL.Query().Get("parentId")

	if parentIdString == "" {
		// create a new post
		// parse the new post data
		var postData db.CommunityPostDB
		err := json.NewDecoder(r.Body).Decode(&postData)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("incomplete post information"))
			return
		}

		// create a new post
		id, err := db.CreateNewPost(postData.Author, postData.Title, postData.Content)
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
		var replyData db.CommunityPostReply
		err = json.NewDecoder(r.Body).Decode(&replyData)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("incomplete reply information"))
			return
		}

		// reply to the parent post
		err = db.ReplyToPost(parentId, replyData.Author, replyData.Content)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("something went wrong, please try again."))
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("success"))
		return
	}
}
