package users_collection

import (
	"AccessiScan-Website/db"
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func genChromeExtensionSecret() (string, error) {
	newSecret := func() (string, error) {
		const length int = 32
		bytes := make([]byte, length)

		_, err := rand.Read(bytes)
		if err != nil {
			return "", err
		}

		return base64.RawURLEncoding.EncodeToString(bytes)[:length], nil
	}

	secret, err := newSecret()
	if err != nil {
		return "", err
	}

	for {
		_, err := GetUserBySecret(secret)
		if err != nil {
			break
		}
		secret, err = newSecret()
		if err != nil {
			return "", err
		}
	}

	return secret, nil
}

func NewChromeExtensionSecret(id primitive.ObjectID) (string, error) {
	secret, err := genChromeExtensionSecret()
	if err != nil {
		return "", err
	}

	collection := db.GetCollection(USERS_COLLECTION)
	res, err := collection.UpdateByID(context.Background(), id, bson.M{
		"$set": bson.M{"chromeExtensionSecret": secret}})
	if err != nil {
		log.Println("nothing updated", id)
		return "", err
	}

	if res.MatchedCount == 0 || res.ModifiedCount == 0 {
		log.Println("nothing modified")
		return "", fmt.Errorf("invalid id")
	}

	return secret, nil
}
