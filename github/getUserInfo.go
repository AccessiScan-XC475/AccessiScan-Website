package gh

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type GitHubUserInfo struct {
	Login             string `json:"login"`
	Id                int    `json:"id"`
	AvatarUrl         string `json:"avatar_url"`
	Url               string `json:"url"`
	HtmlUrl           string `json:"html_url"`
	FollowersUrl      string `json:"followers_url"`
	FollowingUrl      string `json:"following_url"`
	StarredUrl        string `json:"starred_url"`
	OrganizationsUrls string `json:"organizations_url"`
	ReposUrl          string `json:"repos_url"`
	EventsUrl         string `json:"events_url"`
	ReceivedEventsUrl string `json:"received_events_url"`
	Type              string `json:"type"`
	UserViewType      string `json:"user_view_type"`
	Name              string `json:"name"`
	Company           string `json:"company"`
	Blog              string `json:"blog"`
	Location          string `json:"location"`
	Email             string `json:"email"`
	Bio               string `json:"bio"`
	NotifcationEmail  string `json:"notification_email"`
	PublicRepos       int    `json:"public_repos"`
	Followers         int    `json:"followers"`
	Following         int    `json:"following"`
	CreatedAt         string `json:"created_at"`
	UpdatedAt         string `json:"updated_at"`
}

func GetUserInfo(accessToken string) (GitHubUserInfo, error) {
	// create request to github
	req, err := http.NewRequest("GET", "https://api.github.com/user", nil)
	if err != nil {
		return GitHubUserInfo{}, err
	}

	// set headers
	req.Header.Set("Authorization", "Bearer "+accessToken)
	req.Header.Set("Accept", "application/json")

	// perform request
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return GitHubUserInfo{}, err
	} else if res.StatusCode != 200 {
		log.Println("received status code" + string(res.StatusCode) + "from github")
		return GitHubUserInfo{}, fmt.Errorf("bad response from github")
	}
	defer res.Body.Close()

	// parse response
	var result GitHubUserInfo
	err = json.NewDecoder(res.Body).Decode(&result)
	if err != nil {
		return GitHubUserInfo{}, err
	}

	return result, nil
}
