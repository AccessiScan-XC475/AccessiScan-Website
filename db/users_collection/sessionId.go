package users_collection

import (
	"AccessiScan-Website/db"
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func numDays() time.Duration {
	numStr := os.Getenv("NUM_DAYS")
	num, err := strconv.Atoi(numStr)
	if err != nil {
		return 7 // default to one week
	}
	return time.Duration(num)
}

type SessionWithExp struct {
	SessionId string `bson:"sessionId"`
	Expires   string `bson:"expires"` // string representing time when expires
}

func genSessionId() (string, error) {
	newSessionId := func() (string, error) {
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

	// create new session id
	sessionId, err := newSessionId()
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
		sessionId, err = newSessionId()
		if err != nil {
			return "", err
		}
	}
	return sessionId, nil
}

// insert/update user in database and receive a new sessionId
func GetSessionId(user AccessiScanUser) (string, error) {
	sessionId, err := genSessionId()
	if err != nil {
		return "", err
	}

	expires := time.Now().Add(24 * time.Hour * numDays())
	expiresString, err := expires.MarshalText()
	if err != nil {
		return "", err
	}

	secret, err := genChromeExtensionSecret()
	if err != nil {
		return "", err
	}

	collection := db.GetCollection(USERS_COLLECTION)
	res, err := collection.UpdateOne(context.Background(), bson.M{"githubProfile.id": user.GitHubProfile.Id}, bson.M{
		"$set": bson.M{
			"githubProfile":     user.GitHubProfile,
			"githubAccessToken": user.GitHubAccessToken,
		},
		"$setOnInsert": bson.M{
			"name":                  user.GitHubProfile.Name,
			"username":              user.GitHubProfile.Login,
			"scoreHistory":          []int{},
			"chromeExtensionSecret": secret,
		},
		"$push": bson.M{
			"sessionIdList": SessionWithExp{
				SessionId: sessionId,
				Expires:   string(expiresString),
			},
		},
	}, options.Update().SetUpsert(true))
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
