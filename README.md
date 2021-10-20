# smv-project
share movie project

# deploy api to heroku
heroku git:remote -a shared-movie
git subtree push --prefix api heroku master

# deploy web to heroku
heroku git:remote -a shared-movie-app
git subtree push --prefix web heroku master