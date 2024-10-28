package db

import (
	"context"
	"slices"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const ACCESSIBILITY_SELECTION_COLLECTION = "AccessibilitySelectionCollection"

var AccessibilitySelections []string = []string{"audio", "visual", "mobility"}

type AccessibilitySelection struct {
	Name  string `bson:"name" json:"name"`
	Count int    `bson:"count" json:"count"`
}

// increments the count for the input selection
func IncrementAccessibilitySelection(name string) error {
	filter := bson.M{"name": name}
	update := bson.M{"$inc": bson.M{"count": 1}} // increment count field by 1
	opts := options.Update().SetUpsert(true)     // create obj if not yet in db

	_, err := GetCollection(ACCESSIBILITY_SELECTION_COLLECTION).UpdateOne(context.Background(), filter, update, opts)
	if err != nil {
		return err
	}

	return nil
}

// returns stats for all accessibility selections
func AllAccessibilitySelection() ([]AccessibilitySelection, error) {
	cursor, err := GetCollection(ACCESSIBILITY_SELECTION_COLLECTION).Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}

	// iterate over all selections from database
	var selectionList []AccessibilitySelection
	for cursor.Next(context.Background()) {
		var curSelection AccessibilitySelection
		if err := cursor.Decode(&curSelection); err != nil {
			return nil, err
		}
		selectionList = append(selectionList, curSelection)
	}

	// if selection is not present in db, manually add element for it with count of 0
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
