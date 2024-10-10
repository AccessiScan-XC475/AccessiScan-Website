package db

import (
	"context"
	"log"
	"os"
	"slices"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var AccessibilitySelections []string = []string{"audio", "visual", "mobility"}

type AccessibilitySelection struct {
	Name  string `bson:"name" json:"name"`
	Count int    `bson:"count" json:"count"`
}

func ConnectDB() *mongo.Client {
	godotenv.Load(".env.local")
	bg := context.Background()
	ctxWT, cancel := context.WithTimeout(bg, 5000*time.Millisecond)
	defer cancel()

	client, err := mongo.Connect(ctxWT, options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	if err != nil {
		log.Fatal(err)
	}

	// ping db to check connection
	err = client.Ping(ctxWT, nil)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to MongoDB")
	return client
}

var db *mongo.Client = ConnectDB()
var collectionCache = map[string]*mongo.Collection{}

func getCollection(collectionName string) *mongo.Collection {
	env := os.Getenv("ENVIRONMENT")
	if env == "" {
		env = "dev"
	}

	collection, ok := collectionCache[collectionName]
	if ok {
		return collection
	}

	collection = db.Database(os.Getenv("DB_NAME") + env).Collection(collectionName)
	collectionCache[collectionName] = collection
	return collection
}

const ACCESSIBILITY_SELECTION_COLLECTION = "AccessibilitySelectionCollection"

// specific db stuff should probably be moved to its own file in the future
func InsertAccessibilitySeletion(name string) error {
	filter := bson.M{"name": name}
	update := bson.M{"$inc": bson.M{"count": 1}} // increment count field by 1
	opts := options.Update().SetUpsert(true)     // create obj if not found in db

	_, err := getCollection(ACCESSIBILITY_SELECTION_COLLECTION).UpdateOne(context.Background(), filter, update, opts)
	if err != nil {
		return err
	}

	return nil
}

func AllAccessibilitySelection() ([]AccessibilitySelection, error) {
	cursor, err := getCollection(ACCESSIBILITY_SELECTION_COLLECTION).Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}

	var selectionList []AccessibilitySelection
	for cursor.Next(context.Background()) {
		var curSelection AccessibilitySelection
		if err := cursor.Decode(&curSelection); err != nil {
			return nil, err
		}
		selectionList = append(selectionList, curSelection)
	}

	for _, selection := range AccessibilitySelections {
		if !slices.ContainsFunc(selectionList, func(dbSel AccessibilitySelection) bool {
			return dbSel.Name == selection
		}) {
			selectionList = append(selectionList, AccessibilitySelection{
				Name:  selection,
				Count: 0,
			})
		}
	}

	return selectionList, nil
}
