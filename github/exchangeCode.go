package gh

import (
	"bytes"
	"encoding/json"
	"io"
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

	req, err := http.NewRequest("POST", "https://github.com/login/oauth/access_token", bytes.NewBuffer(jsonData))
	if err != nil {
		log.Println("error creating json data to send to github")
		return "", err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Println("error in post request to github")
		return "", err
	}
	defer res.Body.Close()

	// parse response
	var result GitHubAccessTokenResponse
	err = json.NewDecoder(res.Body).Decode(&result)
	if err != nil {
		log.Println("error reading response from github")
		return "", err
	}

	log.Println(result)
	return result.AccessToken, nil
}
