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

func ExchangeCodeExt(code string) (string, error) {
	// Post request payload
	data := map[string]string{
		"client_id":     GITHUB_CLIENT_ID_EXT,   // New client ID for the extension
		"client_secret": GITHUB_CLIENT_SECRET_EXT, // New client secret for the extension
		"code":          code,
	}
	jsonData, err := json.Marshal(data)
	if err != nil {
		log.Println("error creating JSON data to send to GitHub (extension)")
		return "", err
	}

	// Create request to GitHub
	req, err := http.NewRequest("POST", "https://github.com/login/oauth/access_token", bytes.NewBuffer(jsonData))
	if err != nil {
		log.Println("error creating request to GitHub (extension)")
		return "", err
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")

	// Perform request
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Println("error in POST request to GitHub (extension)")
		return "", err
	} else if res.StatusCode != 200 {
		log.Printf("received status code %d from GitHub (extension)\n", res.StatusCode)
		return "", fmt.Errorf("bad response from GitHub")
	}
	defer res.Body.Close()

	// Parse response
	var result GitHubAccessTokenResponse
	err = json.NewDecoder(res.Body).Decode(&result)
	if err != nil {
		log.Println("error reading response from GitHub (extension)")
		return "", err
	} else if result.AccessToken == "" {
		log.Println("did not receive access token from GitHub (extension)")
		return "", fmt.Errorf("did not receive access token")
	}

	return result.AccessToken, nil
}
