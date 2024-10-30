package users_collection

import (
	"AccessiScan-Website/db"
	"context"
	"fmt"
	"log"
	"slices"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// get a user by their database id
func GetUserById(id primitive.ObjectID) (AccessiScanUser, error) {
	collection := db.GetCollection(USERS_COLLECTION)

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
	collection := db.GetCollection(USERS_COLLECTION)

	// res := collection.FindOne(context.Background(), bson.M{"sessionId": sessionId})
	res := collection.FindOne(context.Background(), bson.M{"sessionIdList": bson.M{"$elemMatch": bson.M{"sessionId": sessionId}}})

	var user AccessiScanUser
	err := res.Decode(&user)
	if err != nil {
		return AccessiScanUser{}, err
	}

	// check if sessionId is expired
	i := slices.IndexFunc(user.SessionIdList, func(sessionIdWithExp SessionWithExp) bool {
		return sessionIdWithExp.SessionId == sessionId
	})
	if i == -1 {
		return AccessiScanUser{}, fmt.Errorf("could not validate sessionId")
	}
	var expires time.Time
	err = expires.UnmarshalText([]byte(user.SessionIdList[i].Expires))
	if err != nil {
		return AccessiScanUser{}, err
	}
	now := time.Now()
	if now.After(expires) {
		// remove this sessionId from database
		log.Println("removing expired sessionIds from db")
		newSessionIdList := user.SessionIdList[i+1:]
		res, err := collection.UpdateByID(context.Background(), user.Id, bson.M{
			"$set": bson.M{
				"sessionIdList": newSessionIdList,
			},
		})
		if err != nil {
			// it's okay if something goes wrong with this operation, should not affect user flow
			log.Println("error removing", err.Error())
		}
		log.Println(res.MatchedCount, "matches found", res.ModifiedCount, "modified")

		// reject this sessionId and redirect to login flow
		return AccessiScanUser{}, fmt.Errorf("redirect")
	}

	return user, nil
}
