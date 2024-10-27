package db

import (
	gh "AccessiScan-Website/github"
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const USERS_COLLECTION = "UsersCollection"

type AccessiScanUser struct {
	Id                primitive.ObjectID `bson:"_id" json:"id"`
	Name              string             `bson:"name" json:"name"`
	Username          string             `bson:"username" json:"username"`
	ScoreHistory      []int              `bson:"scoreHistory" json:"scoreHistory"`
	GitHubProfile     gh.GitHubUserInfo  `bson:"githubProfile" json:"githubProfile"`
	SessionId         string             `bson:"sessionId" json:"sessionId"`
	GitHubAccessToken string             `bson:"githubAccessToken" json:"githubAccessToken"`
}

func genSessionId() (string, error) {
	const length int = 128
	// create byte slice of length 128
	bytes := make([]byte, length)

	// read random bytes from crypto/rand
	_, err := rand.Read(bytes)
	if err != nil {
		return "", err
	}

	// encode bytes to a base64 string
	return base64.RawURLEncoding.EncodeToString(bytes)[:length], nil
}

// get a user by their database id
func GetUserById(id primitive.ObjectID) (AccessiScanUser, error) {
	collection := getCollection(USERS_COLLECTION)

	res := collection.FindOne(context.Background(), bson.M{"_id": id})

	var user AccessiScanUser
	err := res.Decode(&user)
	if err != nil {
		return AccessiScanUser{}, err
	}

	return user, nil
}

// get a user by their sessionId
func GetUserBySessionId(sessionId string) (AccessiScanUser, error) {
	collection := getCollection(USERS_COLLECTION)

	res := collection.FindOne(context.Background(), bson.M{"sessionId": sessionId})

	var user AccessiScanUser
	err := res.Decode(&user)
	if err != nil {
		return AccessiScanUser{}, err
	}

	log.Println("GOT USER GOT USER")

	return user, nil
}

// insert/update user in database and receive a new sessionId
func GetSessionId(user AccessiScanUser) (string, error) {
	// create session id
	sessionId, err := genSessionId()
	if err != nil {
		return "", err
	}
	// ensure unique session id
	for {
		_, err := GetUserBySessionId(sessionId)
		if err != nil {
			log.Println("found unique sessionId")
			break
		}
		log.Println("creating new sessionId")
		sessionId, err = genSessionId()
		if err != nil {
			return "", err
		}
	}

	// user.SessionId = sessionId

	collection := getCollection(USERS_COLLECTION)
	res, err := collection.UpdateOne(context.Background(), bson.M{"githubProfile.id": user.GitHubProfile.Id}, bson.M{
		"$set": bson.M{
			"sessionId":         sessionId,
			"githubProfile":     user.GitHubProfile,
			"githubAccessToken": user.GitHubAccessToken,
		},
		"$setOnInsert": bson.M{
			"name":         user.GitHubProfile.Name,
			"username":     user.GitHubProfile.Login,
			"scoreHistory": []int{},
		}}, options.Update().SetUpsert(true))
	if err != nil {
		log.Println("error with mongodb operation", err.Error())
		return "", err
	}
	if res.ModifiedCount == 0 && res.UpsertedCount == 0 && res.MatchedCount == 0 {
		log.Println("no entry in db")
		return "", fmt.Errorf("no db update")
	}

	return sessionId, nil
}

func AppendScore(id primitive.ObjectID, score int) bool {
	collection := getCollection(USERS_COLLECTION)

	res, err := collection.UpdateOne(context.Background(), bson.M{"_id": id}, bson.M{
		"$push": bson.M{"scoreHistory": score},
	})
	if err != nil {
		log.Println("error with mongodb operation", err.Error())
		return false
	}

	if res.ModifiedCount != 1 {
		log.Println("did not update 1 document")
		return false
	}

	return true
}
