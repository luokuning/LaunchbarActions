// LaunchBar Action Script

function run() {
  LaunchBar.openURL('https://github.com')
}

function runWithString(string) {
  var intention = parseString(string)
  var type = intention.type
  string = intention.string

  var url
  var iconType
  var titleType
  if (type === 'USER') {
    url = 'https://api.github.com/search/users?q='
    iconType = 'icons8-male-user-100.png'
    titleType = 'login'
  } else if (type === 'REPO') {
    url = 'https://api.github.com/search/repositories?q='
    iconType = 'icons8-repository-100.png'
    titleType = 'full_name'
  }

  // Press cmd+enter, Open github search page
  if (LaunchBar.options.commandKey) {
    return LaunchBar.openURL('https://github.com/search?q=' + encodeURIComponent(string))
  }

  var suggestions = []
  var queryString = encodeURIComponent(string)

  var result = HTTP.getJSON(url + encodeURIComponent(string))
  LaunchBar.debugLog(
    'Custom Search result',
    JSON.stringify(result.response.headerFields['X-RateLimit-Remaining']),
    JSON.stringify(result.data),
  )


  if (result == undefined) {
    LaunchBar.alert('HTTP.getJSON() returned undefined')
  }

  if (result.error != undefined) {
    LaunchBar.log('Error in HTTP request: ' + result.error)
  }

  result = result.data

  try {
    // Rate limit
    if (result.message && result.message.indexOf('rate limit') > -1) {
      throw new Error('Rate Limit')
    }
    result.items && result.items.slice(0, 20).forEach(function (item) {
      suggestions.push({
        icon: iconType,
        alwaysShowsSubtitle: true,
        title: item[titleType],
        subtitle: item.description || '',
        url: item.html_url,
      })
    })
  } catch (e) {
    LaunchBar.alert(e.message)
  }

  return suggestions
}

function parseString(string) {
  string = string.trim()
  if (string.indexOf('u ') > -1) {
    return {
      string: string.slice(2),
      type: 'USER'
    }
  } else {
    return {
      string: string,
      type: 'REPO'
    }
  }
}