
function runWithString(argument) {
    var sourceLang = 'auto'
    var targetLang = 'zh-CN'
    if (!/[a-zA-Z]/.test(argument)) {
      targetLang = 'en'
    }
    // dt 跟 ie 参数很重要
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
    + sourceLang + "&tl=" + targetLang + "&dt=t&dt=bd&ie=UTF-8&q="
    var result = HTTP.getJSON(url + encodeURIComponent(argument));

    if (result == undefined) {
        LaunchBar.alert('HTTP.getJSON() returned undefined');
        return [];
    }

    if (result.error != undefined) {
      LaunchBar.log('Error in HTTP request: ' + result.error);
      return [];
    }

    result = result.data

    var suggestions = []

    try {
      if (result && result[0] && result[0][0] && result[0][0][0]) {
        if (!result[1])
          suggestions.push({
            title: result[0][0][0],
            icon: 'Google_Translate_Icon.png',
          })

        result[0].forEach(function(r, i) {
          if (i == 0) return
          if (Array.isArray(r) && r[0]) {
            suggestions.push({
              title: r[0],
              icon: 'Google_Translate_Icon.png',
            })
          }
        })

        if (Array.isArray(result[1]) && Array.isArray(result[1][0]) && Array.isArray(result[1][0][1])) {
          result[1][0][1].forEach(function(t) {
            suggestions.push({
              title: t,
              icon: 'Google_Translate_Icon.png',
            })
          })
        }
      }
    } catch(e) {
      LaunchBar.alert(e.message)
    }

    return suggestions
}

