var GitHubApi = require("github");

var github = new GitHubApi({
  // optional
  //debug: true
});


github.authenticate({
  type: "basic",
  username: 'ajfranzoia',
  password: 'enabend87'
});


github.repos.getReleases({
  owner: 'Artear',
  repo: 'tn.com.ar-mogul',
  per_page: 100
}, getNextReleases);


function getNextReleases(err, res) {
  res.data.forEach(function(release) {
    console.log(release.tag_name);
    if (release.tag_name.substr(0, 1) !== 'v') {
      console.log('DELETE RELEASE ', release.tag_name);
      /*github.repos.deleteRelease({
       owner: 'Artear',
       repo: 'tn.com.ar-mogul',
       id: release.id
       });*/
    }
  });

  if (github.hasNextPage(res)) {
    github.getNextPage(res, getNextReleases);
  }
}