# vch-project
chatting application project

# deploy api to heroku
heroku git:remote -a vch-chat-api
git subtree push --prefix api heroku master

# deploy web to heroku
heroku git:remote -a vch-chat-app
git subtree push --prefix web heroku master
