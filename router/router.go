package router

import (
	"AccessiScan-Website/db"
	"encoding/json"
	"log"
	"net/http"
	"slices"
	"strings"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// declare api routes
func Router() *http.ServeMux {
	router := http.NewServeMux()

	// health endpoint to check if its up
	router.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// returns array representing accessibility selection statistics
	router.HandleFunc("GET /api/accessibility-selection", func(w http.ResponseWriter, r *http.Request) {
		allSelections, err := db.AllAccessibilitySelection()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("something went wrong, please try again."))
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(allSelections)
		return
	})

	// endpoint to add to accessibility selection count
	router.HandleFunc("POST /api/accessibility-selection", func(w http.ResponseWriter, r *http.Request) {
		selectionName := strings.ToLower(r.URL.Query().Get("name"))
		if selectionName == "" || !slices.Contains(db.AccessibilitySelections, selectionName) {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("invalid selection"))
			return
		}

		err := db.InsertAccessibilitySeletion(selectionName)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("something went wrong, please try again."))
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("success"))
		return
	})

	// returns a simplified version of all community posts
	// or the full version of a single community post if an id is provided
	router.HandleFunc(("GET /api/community-post"), func(w http.ResponseWriter, r *http.Request) {
		idString := r.URL.Query().Get("id")
		log.Println(idString)

		if idString == "" {
			log.Println("getting all posts")
			allCommunityPosts, err := db.AllCommunityPosts()
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte("something went wrong, please try again."))
				return
			}

			log.Println("posts", allCommunityPosts)

			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(allCommunityPosts)
			return
		} else {
			log.Println("getting a particular post")
			postId, err := primitive.ObjectIDFromHex(idString)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte("invalid post id"))
				return
			}

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
	})

	// endpoint to create a new community post or reply
	router.HandleFunc(("POST /api/community-post"), func(w http.ResponseWriter, r *http.Request) {
		parentIdString := r.URL.Query().Get("parentId")

		if parentIdString == "" {
			// create a new post
			var postData db.CommunityPost
			err := json.NewDecoder(r.Body).Decode(&postData)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte("incomplete post information"))
				return
			}

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
			var replyData db.CommunityPostReply
			err := json.NewDecoder(r.Body).Decode(&replyData)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte("incomplete reply information"))
				return
			}

			parentId, err := primitive.ObjectIDFromHex(parentIdString)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte("invalid parent id"))
				return
			}

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
	})

	return router
}
