// LaunchBar Action Script

function run() {
  LaunchBar.openURL('https://developer.mozilla.org/en-US/')
}

function runWithString(argument) {
  var url = 'https://developer.mozilla.org/en-US/search?q=' + encodeURIComponent(argument)

  var html = HTTP.get(url)

  if (html.data == undefined) {
    LaunchBar.alert("Something wrong with your network.")
    return []
  }

  try {
    var results = /<ul class="result-list">(.+)<\/ul>/i.exec(html.data.replace(/[\n\t\r]|\s{2,}/g, ''))

    if (!results || !results[1]) {
      // LaunchBar.alert('Somthing wrong. Please contact developer(i91935058@gmail.com)')
      return []
    } else {
      // var returnItems = [{
      //   url: url,
      //   title: 'Open Search results page',
      //   icon: 'mdn.png',
      // }]
      var returnItems = []
      var results_li = results[1].match(/<li class="result-\d+">.+?<\/li>/gi)
      results_li.forEach(function (li) {
        // LaunchBar.alert(li)
        var datas = li.match(/<h4><a(?:.+?)href="(.+?)"(?:.*?)>(.+?)<\/a><\/h4>/)
        // LaunchBar.alert(datas[1])
        returnItems.push({
          url: datas[1],
          title: datas[2],
          icon: 'mdn.png',
        })
      })

      return returnItems
    }
  } catch (e) {
    LaunchBar.alert(e.message)
  }

}
