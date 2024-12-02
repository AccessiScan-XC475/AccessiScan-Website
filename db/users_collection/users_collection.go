package users_collection

import (
	"AccessiScan-Website/db"
	gh "AccessiScan-Website/github"
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const USERS_COLLECTION = "UsersCollection"

type ScoreElement struct {
	Score int                   `bson:"score" json:"score"`
	Href  string                `bson:"href" json:"href"`
	Type  db.ACCESSIBILITY_TYPE `bson:"type" json:"type"`
}

type AccessiScanUser struct {
	Id                    primitive.ObjectID `bson:"_id" json:"id"`
	Name                  string             `bson:"name" json:"name"`
	Username              string             `bson:"username" json:"username"`
	ScoreHistory          []ScoreElement     `bson:"scoreHistory" json:"scoreHistory"`
	GitHubProfile         gh.GitHubUserInfo  `bson:"githubProfile" json:"githubProfile"`
	SessionIdList         []SessionWithExp   `bson:"sessionIdList" json:"sessionIdList"`
	GitHubAccessToken     string             `bson:"githubAccessToken" json:"githubAccessToken"`
	ChromeExtensionSecret string             `bson:"chromeExtensionSecret" json:"chromeExtensionSecret"`
}

func AppendScore(secret string, score int, href string, accessibility_type db.ACCESSIBILITY_TYPE) bool {
	collection := db.GetCollection(USERS_COLLECTION)

	newScoreElement := ScoreElement{
		Score: score,
		Href:  href,
		Type:  accessibility_type,
	}
	res, err := collection.UpdateOne(context.Background(), bson.M{
		"chromeExtensionSecret": secret,
	}, bson.M{
		"$push": bson.M{"scoreHistory": newScoreElement},
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
