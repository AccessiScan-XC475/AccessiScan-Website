package gh

import (
	"net/url"
	"os"
)

var GITHUB_CLIENT_ID string = os.Getenv("GITHUB_CLIENT_ID")
var GITHUB_CLIENT_SECRET string = os.Getenv("GITHUB_CLIENT_SECRET")
var GITHUB_REDIRECT_URI string = os.Getenv("GITHUB_REDIRECT_URI")
var GITHUB_CLIENT_ID_EXT string = os.Getenv("GITHUB_CLIENT_ID_EXT")
var GITHUB_CLIENT_SECRET_EXT string = os.Getenv("GITHUB_CLIENT_SECRET_EXT")

// Set vars from environment. Only needs to be called if environment vars were initialized during the program (e.g. loading an env file)
func Initialize() {
	GITHUB_CLIENT_ID = os.Getenv("GITHUB_CLIENT_ID")
	GITHUB_CLIENT_SECRET = os.Getenv("GITHUB_CLIENT_SECRET")
	GITHUB_REDIRECT_URI = os.Getenv("GITHUB_REDIRECT_URI")
	GITHUB_CLIENT_ID_EXT = os.Getenv("GITHUB_CLIENT_ID_EXT")
	GITHUB_CLIENT_SECRET_EXT = os.Getenv("GITHUB_CLIENT_SECRET_EXT")
}

func LoginUrl() string {
	params := url.Values{
		// "scope": {"read:user"},
		"scope":     {"user:email"},
		"client_id": {GITHUB_CLIENT_ID},
	}

	return "https://github.com/login/oauth/authorize?" + params.Encode()
}
