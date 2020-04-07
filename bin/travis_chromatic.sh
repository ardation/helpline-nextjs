if ["$TRAVIS_PULL_REQUEST" = "false" ];
then
  npm chromatic --auto-accept-changes
else
  npm chromatic
fi
