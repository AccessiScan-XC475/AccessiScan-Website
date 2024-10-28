package gh

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type GitHubAccessTokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	Scope       string `json:"scope"`
}

func ExchangeCode(code string) (string, error) {
	// post request payload
	data := map[string]string{
		"client_id":     GITHUB_CLIENT_ID,
		"client_secret": GITHUB_CLIENT_SECRET,
		"code":          code,
	}
	jsonData, err := json.Marshal(data)
	if err != nil {
		log.Println("error creating json data to send to github")
		return "", err
	}

	// create request to github
	req, err := http.NewRequest("POST", "https://github.com/login/oauth/access_token", bytes.NewBuffer(jsonData))
	if err != nil {
		log.Println("error creating json data to send to github")
		return "", err
	}

	// set headers
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")

	// perform request
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Println("error in post request to github")
		return "", err
	} else if res.StatusCode != 200 {
		log.Println("received status code" + string(res.StatusCode) + "from github")
		return "", fmt.Errorf("bad response from github")
	}
	defer res.Body.Close()

	// parse response
	var result GitHubAccessTokenResponse
	err = json.NewDecoder(res.Body).Decode(&result)
	if err != nil {
		log.Println("error reading response from github")
		return "", err
	} else if result.AccessToken == "" {
		log.Println("did not receive access token from github")
		return "", fmt.Errorf("did not received access token")
	}

	return result.AccessToken, nil
}
